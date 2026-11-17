import { NextRequest, NextResponse } from "next/server";
import { sendDocumentDeliveryEmail } from "@/lib/email/resend";
import { getDocumentBySlug } from "@/config/documents";
import { getStateByCode } from "@/data/usStates";
import { getStatuteForDocumentAndState } from "@/data/statutes";
import { generateDocumentPdf } from "@/lib/pdf/pdfGenerator";
import { uploadPdfToVault } from "@/lib/storage/s3";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toEmail, docSlug, stateCode, customerName, formData, pdfBase64: incomingPdfBase64 } = body;

    if (!toEmail || typeof toEmail !== "string" || !toEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required for document delivery." },
        { status: 400 }
      );
    }

    const doc = getDocumentBySlug(docSlug || "demand-letter");
    if (!doc) {
      return NextResponse.json(
        { error: "Unknown legal document identifier." },
        { status: 404 }
      );
    }

    const state = getStateByCode(stateCode || "CA") || {
      name: "California",
      code: "CA",
    };

    let pdfBase64 = incomingPdfBase64;
    let pdfBuffer: Buffer | null = null;

    if (pdfBase64) {
      pdfBuffer = Buffer.from(pdfBase64, "base64");
    } else {
      try {
        const mergedFormData = {
          ...doc.defaultValues,
          ...(formData || {}),
          stateCode: state.code,
        };
        const statute = getStatuteForDocumentAndState(doc.slug, state.code);
        const sections = doc.generatePdfSections(mergedFormData, statute);
        const pdfBytes = await generateDocumentPdf({
          title: doc.title,
          documentId: doc.id,
          stateInfo: statute,
          sections,
          formData: mergedFormData,
          previewMode: false, // Official clean copy!
        });

        pdfBuffer = Buffer.from(pdfBytes.buffer as ArrayBuffer);
        pdfBase64 = pdfBuffer.toString("base64");
      } catch (pdfErr) {
        console.error("Server-side PDF generation error during delivery:", pdfErr);
      }
    }

    // Archive to AWS S3 Vault in the background
    let s3ArchiveResult: { success: boolean; s3Key?: string } = { success: false };
    if (pdfBuffer) {
      try {
        s3ArchiveResult = await uploadPdfToVault({
          pdfBuffer,
          fileName: `${doc.slug}-${state.code}-OFFICIAL.pdf`,
          docSlug: doc.slug,
          stateCode: state.code,
          customerEmail: toEmail,
          customerName: customerName || (formData ? formData.senderName || formData.claimantName || formData.landlordName : undefined),
        });
      } catch (s3Err) {
        console.error("S3 upload exception:", s3Err);
      }
    }

    const result = await sendDocumentDeliveryEmail({
      toEmail,
      documentTitle: doc.title,
      stateName: state.name,
      stateCode: state.code,
      customerName: customerName || (formData ? formData.senderName || formData.claimantName || formData.landlordName : undefined),
      pdfBase64,
      pdfFileName: `${doc.slug}-${state.code}-OFFICIAL.pdf`,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to dispatch email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Official document dispatched to ${toEmail}.`,
      emailId: result.id,
      s3Archived: s3ArchiveResult.success,
      s3Key: s3ArchiveResult.s3Key,
    });
  } catch (err: any) {
    console.error("Delivery API error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred during delivery." },
      { status: 500 }
    );
  }
}
