import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please include a detailed message for our support desk." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = (subject || "General Inquiry").trim();
    const cleanMessage = message.trim();

    const timestamp = new Date().toISOString();
    const refId = "LDP-SUP-" + Math.floor(100000 + Math.random() * 900000);

    const apiKey = process.env.RESEND_API_KEY;
    const fromAddress = process.env.EMAIL_FROM || "Legal Delivery Portal <orders@legaldeliveryportal.com>";
    const adminEmail = process.env.ADMIN_EMAIL || "dogruaziz@gmail.com";

    // 1. Send notification email to Admin desk via Resend
    if (apiKey) {
      try {
        const adminEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Support Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%); padding: 24px; text-align: center;">
      <h1 style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 0;">New Support Ticket</h1>
      <p style="font-size: 12px; color: #93c5fd; margin: 4px 0 0 0;">Reference: ${refId}</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; border-bottom: 1px solid #334155; width: 120px;">From:</td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: 600; border-bottom: 1px solid #334155;">${cleanName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; border-bottom: 1px solid #334155;">Customer Email:</td>
          <td style="padding: 8px 0; color: #60a5fa; font-weight: 600; border-bottom: 1px solid #334155;">
            <a href="mailto:${cleanEmail}" style="color: #60a5fa; text-decoration: none;">${cleanEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; border-bottom: 1px solid #334155;">Inquiry Topic:</td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: 600; border-bottom: 1px solid #334155;">${cleanSubject}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; border-bottom: 1px solid #334155;">Received At:</td>
          <td style="padding: 8px 0; color: #cbd5e1; border-bottom: 1px solid #334155;">${timestamp}</td>
        </tr>
      </table>

      <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 16px;">
        <div style="font-size: 11px; text-transform: uppercase; color: #60a5fa; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px;">Message Details:</div>
        <p style="font-size: 13px; line-height: 1.6; color: #f1f5f9; margin: 0; white-space: pre-wrap;">${cleanMessage}</p>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${cleanEmail}?subject=Re: [${refId}] ${encodeURIComponent(cleanSubject)}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 600; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none;">Reply to Customer</a>
      </div>
    </div>
    <div style="background-color: #0b1120; border-top: 1px solid #1e293b; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748b;">
      LegalDeliveryPortal.com Support Infrastructure
    </div>
  </div>
</body>
</html>
`.trim();

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [adminEmail],
            reply_to: cleanEmail,
            subject: `[Support Ticket ${refId}] ${cleanSubject} - ${cleanName}`,
            html: adminEmailHtml,
          }),
        });

        // 2. Send automated receipt to Customer
        const customerReceiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Support Request Received</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%); padding: 24px; text-align: center;">
      <h1 style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 0;">Support Request Received</h1>
      <p style="font-size: 12px; color: #93c5fd; margin: 4px 0 0 0;">Ticket Reference: ${refId}</p>
    </div>
    <div style="padding: 24px;">
      <p style="font-size: 14px; color: #e2e8f0; margin-top: 0;">Hello <strong>${cleanName}</strong>,</p>
      <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
        We have received your message regarding <strong>${cleanSubject}</strong>. A support specialist is reviewing your inquiry and will follow up with you directly within 2 to 4 business hours.
      </p>

      <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 16px; margin: 20px 0;">
        <div style="font-size: 11px; text-transform: uppercase; color: #60a5fa; font-weight: 700; margin-bottom: 8px;">Your Submitted Message:</div>
        <p style="font-size: 12px; line-height: 1.5; color: #cbd5e1; margin: 0; white-space: pre-wrap;">${cleanMessage}</p>
      </div>

      <p style="font-size: 12px; color: #94a3b8; line-height: 1.5; margin-bottom: 0;">
        If you have additional details or an order confirmation receipt to share, please reply directly to this email.
      </p>
    </div>
    <div style="background-color: #0b1120; border-top: 1px solid #1e293b; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748b;">
      Legal Delivery Portal &bull; Court-Ready Legal Document Delivery Infrastructure
    </div>
  </div>
</body>
</html>
`.trim();

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [cleanEmail],
            subject: `Support Request Received: ${cleanSubject} [Ref: ${refId}]`,
            html: customerReceiptHtml,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send contact emails via Resend:", emailErr);
      }
    }

    // 3. Send instant Telegram alert to admin
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      try {
        const tgText = `📩 *New Support Inquiry on LegalDeliveryPortal*\n\n*Ref:* \`${refId}\`\n*From:* ${cleanName}\n*Email:* ${cleanEmail}\n*Topic:* ${cleanSubject}\n\n*Message:*\n${cleanMessage}`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: tgText,
            parse_mode: "Markdown",
          }),
        });
      } catch (tgErr) {
        console.error("Telegram notification failed for contact:", tgErr);
      }
    }

    return NextResponse.json({
      success: true,
      refId,
      message: "Your message has been received by our support team.",
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process inquiry. Please try again." },
      { status: 500 }
    );
  }
}
