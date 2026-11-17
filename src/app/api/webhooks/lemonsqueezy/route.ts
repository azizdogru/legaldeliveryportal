import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendDocumentDeliveryEmail } from "@/lib/email/resend";
import { getDocumentBySlug, ALL_DOCUMENTS } from "@/config/documents";
import { getStateByCode } from "@/data/usStates";
import { getStatuteForDocumentAndState } from "@/data/statutes";
import { generateDocumentPdf } from "@/lib/pdf/pdfGenerator";
import { uploadPdfToVault, getCheckoutSession } from "@/lib/storage/s3";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature") || "";
    const secret = process.env.LEMON_WEBHOOK_SECRET || "";

    // Verify webhook HMAC SHA256 signature
    if (secret && signature) {
      const hmac = crypto.createHmac("sha256", secret);
      const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
      const sigBuffer = Buffer.from(signature, "utf8");

      if (digest.length !== sigBuffer.length || !crypto.timingSafeEqual(digest, sigBuffer)) {
        console.error("Invalid LemonSqueezy webhook signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload?.meta?.event_name;

    if (eventName === "order_created") {
      const attributes = payload?.data?.attributes || {};
      const userEmail = attributes.user_email;
      const userName = attributes.user_name || "Valued Customer";
      const customData = payload?.meta?.custom_data || {};

      const docSlug = customData.doc || "demand-letter";
      const stateCode = (customData.state || "CA").toUpperCase();

      const doc = getDocumentBySlug(docSlug) || ALL_DOCUMENTS[1];
      const state = getStateByCode(stateCode) || { name: "California", code: "CA" };

      const sessionId = customData.session_id;
      let userFormData: Record<string, any> = { ...doc.defaultValues, stateCode: state.code };

      if (sessionId) {
        try {
          const session = await getCheckoutSession(sessionId);
          if (session && session.formData) {
            userFormData = { ...doc.defaultValues, ...session.formData, stateCode: state.code };
          }
        } catch (sErr) {
          console.error("Failed to load checkout session from S3 in webhook:", sErr);
        }
      }

      const effectiveCustomerName =
        userFormData.senderName ||
        userFormData.claimantName ||
        userFormData.landlordName ||
        userName;

      // Generate official clean PDF with real user input data
      let pdfBase64: string | undefined;
      let pdfBuffer: Buffer | undefined;

      try {
        const statute = getStatuteForDocumentAndState(doc.slug, state.code);
        const sections = doc.generatePdfSections(userFormData, statute);
        const pdfBytes = await generateDocumentPdf({
          title: doc.title,
          documentId: doc.id,
          stateInfo: statute,
          sections,
          formData: userFormData,
          previewMode: false,
        });

        pdfBuffer = Buffer.from(pdfBytes.buffer as ArrayBuffer);
        pdfBase64 = pdfBuffer.toString("base64");
      } catch (pdfErr) {
        console.error("Failed to generate PDF for webhook order:", pdfErr);
      }

      // Archive PDF to AWS S3 Vault
      if (pdfBuffer) {
        try {
          await uploadPdfToVault({
            pdfBuffer,
            fileName: `${doc.slug}-${state.code}-OFFICIAL.pdf`,
            docSlug: doc.slug,
            stateCode: state.code,
            customerEmail: userEmail,
            customerName: effectiveCustomerName,
          });
        } catch (s3Err) {
          console.error("Webhook S3 archive error:", s3Err);
        }
      }

      // Send email via Resend
      if (userEmail) {
        await sendDocumentDeliveryEmail({
          toEmail: userEmail,
          documentTitle: doc.title,
          stateName: state.name,
          stateCode: state.code,
          customerName: effectiveCustomerName,
          pdfBase64,
          pdfFileName: `${doc.slug}-${state.code}-OFFICIAL.pdf`,
        });
      }

      // Send Telegram notification if credentials present
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        try {
          const telegramMessage = `New Order Confirmed ($9.90 USD)\nDocument: ${doc.title}\nState: ${state.name} (${state.code})\nCustomer: ${effectiveCustomerName} (${userEmail})\nDelivery: Resend Dispatched & AWS S3 Archived`;
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage,
            }),
          });
        } catch (tgErr) {
          console.error("Telegram notification failed:", tgErr);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("LemonSqueezy webhook handling error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
