import { NextRequest, NextResponse } from "next/server";
import { uploadPdfToVault } from "@/lib/storage/s3";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pdfBase64, docSlug, stateCode, customerEmail, customerName } = body;

    if (!pdfBase64) {
      return NextResponse.json({ error: "Missing pdfBase64 payload" }, { status: 400 });
    }

    const pdfBuffer = Buffer.from(pdfBase64, "base64");
    const result = await uploadPdfToVault({
      pdfBuffer,
      fileName: `${docSlug || "document"}-${stateCode || "US"}-OFFICIAL.pdf`,
      docSlug: docSlug || "general",
      stateCode: stateCode || "US",
      customerEmail: customerEmail || "download-direct",
      customerName: customerName || "Customer",
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, s3Key: result.s3Key, s3Url: result.s3Url });
  } catch (err: any) {
    console.error("Archive API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
