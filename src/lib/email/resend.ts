interface SendDocumentEmailOptions {
  toEmail: string;
  documentTitle: string;
  stateName: string;
  stateCode: string;
  customerName?: string;
  pdfBase64?: string;
  pdfFileName?: string;
}

export async function sendDocumentDeliveryEmail({
  toEmail,
  documentTitle,
  stateName,
  stateCode,
  customerName,
  pdfBase64,
  pdfFileName,
}: SendDocumentEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY || "";
  const fromAddress = process.env.EMAIL_FROM || "Legal Delivery Portal <orders@legaldeliveryportal.com>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not defined in environment variables");
    return { success: false, error: "Email delivery service not configured" };
  }

  if (!toEmail || !toEmail.includes("@")) {
    return { success: false, error: "Invalid recipient email address" };
  }

  const safeFileName =
    pdfFileName ||
    `${documentTitle.replace(/[^a-zA-Z0-9]/g, "-")}-${stateCode}-OFFICIAL.pdf`;

  const safeCustomerName = customerName ? customerName.trim() : "Valued Customer";

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your Official Legal Document: ${documentTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #f1f5f9; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%); padding: 32px 28px; text-align: center; border-bottom: 1px solid #334155; }
    .header h1 { font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 6px 0; letter-spacing: -0.5px; }
    .header p { font-size: 13px; color: #93c5fd; margin: 0; }
    .body-content { padding: 28px; }
    .card { background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .card-title { font-size: 11px; text-transform: uppercase; color: #60a5fa; font-weight: 700; letter-spacing: 0.8px; margin-bottom: 12px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #334155; font-size: 13px; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #94a3b8; }
    .detail-value { color: #ffffff; font-weight: 600; text-align: right; }
    .instructions { background-color: #0b1329; border: 1px solid #1d4ed8; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .instructions h2 { font-size: 14px; font-weight: 700; color: #93c5fd; margin: 0 0 12px 0; }
    .instructions ol { margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.6; }
    .badge { display: inline-block; background-color: #065f46; color: #6ee7b7; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; }
    .footer { padding: 20px 28px; background-color: #0b1120; border-top: 1px solid #1e293b; text-align: center; font-size: 11px; color: #64748b; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Legal Delivery Portal</h1>
      <p>Official Legal Document & Notice Delivery System</p>
    </div>

    <div class="body-content">
      <p style="font-size: 15px; color: #e2e8f0; margin-top: 0;">
        Hello <strong>${safeCustomerName}</strong>,
      </p>
      <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
        Your court-ready official legal document has been generated and validated under state statutes. The official vector PDF is attached to this email and ready for immediate printing and formal service.
      </p>

      <div class="card">
        <div class="card-title">Order & Document Summary</div>
        <div class="detail-row">
          <span class="detail-label">Document:</span>
          <span class="detail-value">${documentTitle}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Jurisdiction:</span>
          <span class="detail-value">${stateName} (${stateCode})</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value"><span class="badge">Official PDF Issued</span></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Pricing:</span>
          <span class="detail-value">$9.90 USD (One-Time Flat Fee)</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Billing Model:</span>
          <span class="detail-value">Zero Subscriptions: No Recurring Charges</span>
        </div>
      </div>

      <div class="instructions">
        <h2>Next Steps for Formal Legal Service</h2>
        <ol>
          <li><strong>Review & Print:</strong> Open the attached PDF (<strong>${safeFileName}</strong>) and print on standard US Letter paper.</li>
          <li><strong>Execute & Sign:</strong> Sign the dual signature lines under penalty of perjury. If required by your transaction, have the signature acknowledged before a licensed Notary Public.</li>
          <li><strong>Serve the Recipient:</strong> Deliver the notice pursuant to your state rules of civil procedure (e.g. USPS Certified Mail Return Receipt Requested or personal hand delivery).</li>
          <li><strong>Retain Proof:</strong> Complete the integrated Certificate of Service and keep the postmarked certified mail slip with your records.</li>
        </ol>
      </div>

      <p style="font-size: 12px; color: #94a3b8; line-height: 1.5; margin-bottom: 0;">
        If you need to make corrections or re-download your document, you may access it anytime through your browser session on LegalDeliveryPortal.com.
      </p>
    </div>

    <div class="footer">
      <p>Legal Delivery Portal &bull; State-Specific Legal Notice Infrastructure</p>
      <p>This automated message was sent to ${toEmail}. LegalDeliveryPortal.com is a document delivery platform and not an attorney. For legal advice, consult an attorney licensed in ${stateName}.</p>
    </div>
  </div>
</body>
</html>
`.trim();

  const payload: Record<string, any> = {
    from: fromAddress,
    to: [toEmail],
    subject: `Your Official Legal Document: ${documentTitle} (${stateCode})`,
    html: emailHtml,
  };

  if (pdfBase64) {
    payload.attachments = [
      {
        filename: safeFileName,
        content: pdfBase64,
      },
    ];
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error response:", data);
      return {
        success: false,
        error: data.message || "Failed to dispatch email via Resend",
      };
    }

    return { success: true, id: data.id };
  } catch (err: any) {
    console.error("Resend API network error:", err);
    return { success: false, error: err.message || "Network error contacting Resend API" };
  }
}
