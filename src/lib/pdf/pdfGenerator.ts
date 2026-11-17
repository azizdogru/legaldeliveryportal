import { PDFDocument, StandardFonts, rgb, degrees, PDFPage, PDFFont } from "pdf-lib";
import { cleanText } from "./cleanText";
import { DocumentSection, StateStatuteInfo } from "@/types/document";

// Safe monkey-patch of PDFPage.prototype.drawText to ensure crash-proof rendering
let isPatched = false;
function patchPdfPage() {
  if (isPatched) return;
  const originalDrawText = PDFPage.prototype.drawText;
  PDFPage.prototype.drawText = function (text: string, options?: any) {
    const cleaned = cleanText(text);
    try {
      return originalDrawText.call(this, cleaned, options);
    } catch {
      // Fallback: replace any non-ascii strictly
      const asciiOnly = cleaned.replace(/[^\x20-\x7E]/g, " ");
      try {
        return originalDrawText.call(this, asciiOnly, options);
      } catch {
        // Silently prevent crash
        return originalDrawText.call(this, "[unsupported text]", options);
      }
    }
  };
  isPatched = true;
}

patchPdfPage();

export interface GeneratePdfOptions {
  title: string;
  documentId: string;
  stateInfo: StateStatuteInfo;
  sections: DocumentSection[];
  formData: Record<string, any>;
  previewMode?: boolean; // true = watermarked & blurred preview, false = unlocked original
}

export class PDFLayoutEngine {
  doc!: PDFDocument;
  pages: PDFPage[] = [];
  currentPage!: PDFPage;
  fontRegular!: PDFFont;
  fontBold!: PDFFont;
  fontItalic!: PDFFont;
  fontHeading!: PDFFont;

  pageWidth = 612;
  pageHeight = 792;
  marginLeft = 50;
  marginRight = 50;
  marginTop = 48;
  marginBottom = 44;
  contentWidth = 612 - 50 * 2; // 512 pt
  currentY = 792 - 48;

  async init() {
    this.doc = await PDFDocument.create();
    this.fontRegular = await this.doc.embedFont(StandardFonts.TimesRoman);
    this.fontBold = await this.doc.embedFont(StandardFonts.TimesRomanBold);
    this.fontItalic = await this.doc.embedFont(StandardFonts.TimesRomanItalic);
    this.fontHeading = await this.doc.embedFont(StandardFonts.HelveticaBold);
    this.addPage();
  }

  addPage() {
    this.currentPage = this.doc.addPage([this.pageWidth, this.pageHeight]);
    this.pages.push(this.currentPage);
    this.currentY = this.pageHeight - this.marginTop;
  }

  ensureSpace(neededHeight: number) {
    if (this.currentY - neededHeight < this.marginBottom + 10) {
      this.addPage();
    }
  }

  wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
    const safe = cleanText(text);
    if (!safe) return [""];

    const paragraphs = safe.split("\n");
    const resultLines: string[] = [];

    for (const paragraph of paragraphs) {
      if (paragraph.trim() === "") {
        resultLines.push("");
        continue;
      }

      const words = paragraph.split(" ");
      let currentLine = "";

      for (const word of words) {
        if (!word) continue;
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            resultLines.push(currentLine);
          }
          currentLine = word;
        }
      }

      if (currentLine) {
        resultLines.push(currentLine);
      }
    }

    return resultLines;
  }

  drawText(
    text: string,
    font: PDFFont,
    fontSize: number,
    color = rgb(0.1, 0.1, 0.1),
    x = this.marginLeft
  ) {
    const safe = cleanText(text);
    this.currentPage.drawText(safe, {
      x,
      y: this.currentY,
      size: fontSize,
      font,
      color,
    });
  }

  drawParagraph(
    text: string,
    font = this.fontRegular,
    fontSize = 9.2,
    lineHeight = 12,
    color = rgb(0.12, 0.12, 0.14)
  ) {
    const lines = this.wrapText(text, font, fontSize, this.contentWidth);
    for (const line of lines) {
      this.ensureSpace(lineHeight);
      if (line === "") {
        this.currentY -= lineHeight * 0.4;
        continue;
      }
      this.drawText(line, font, fontSize, color, this.marginLeft);
      this.currentY -= lineHeight;
    }
  }

  drawBullet(
    text: string,
    font = this.fontRegular,
    fontSize = 8.8,
    lineHeight = 11.5
  ) {
    const indent = 16;
    const bulletWidth = this.contentWidth - indent;
    const lines = this.wrapText(text, font, fontSize, bulletWidth);

    for (let i = 0; i < lines.length; i++) {
      this.ensureSpace(lineHeight);
      if (i === 0) {
        this.drawText("-", this.fontBold, fontSize, rgb(0.2, 0.2, 0.2), this.marginLeft + 4);
      }
      this.drawText(lines[i], font, fontSize, rgb(0.15, 0.15, 0.15), this.marginLeft + indent);
      this.currentY -= lineHeight;
    }
    this.currentY -= 2;
  }
}

/**
 * Universal PDF Generator for LegalDeliveryPortal.com
 * Formats court-admissible legal documents with optimized single-page and multi-page layouts.
 */
export async function generateDocumentPdf(options: GeneratePdfOptions): Promise<Uint8Array> {
  const { title, documentId, stateInfo, sections, formData, previewMode = false } = options;

  const engine = new PDFLayoutEngine();
  await engine.init();

  // Compact, Authoritative Top Caption Box (Height 58pt)
  const boxTop = engine.currentY;
  const boxHeight = 58;
  const boxWidth = engine.contentWidth;

  engine.currentPage.drawRectangle({
    x: engine.marginLeft,
    y: boxTop - boxHeight,
    width: boxWidth,
    height: boxHeight,
    borderWidth: 1.2,
    borderColor: rgb(0.12, 0.18, 0.28),
    color: rgb(0.97, 0.98, 0.99),
  });

  // Top Title in Caption Box
  const cleanTitle = cleanText(title).toUpperCase();
  const titleSize = cleanTitle.length > 40 ? 10.5 : 11.5;
  const titleWidth = engine.fontHeading.widthOfTextAtSize(cleanTitle, titleSize);
  const titleX = engine.marginLeft + (boxWidth - titleWidth) / 2;

  engine.currentPage.drawText(cleanTitle, {
    x: Math.max(engine.marginLeft + 8, titleX),
    y: boxTop - 16,
    size: titleSize,
    font: engine.fontHeading,
    color: rgb(0.08, 0.14, 0.24),
  });

  // State Court Jurisdiction Subheader
  const jurisText = cleanText(
    `STATE OF ${stateInfo.stateName.toUpperCase()} | COURT: ${stateInfo.courtJurisdiction.toUpperCase()}`
  );
  const jurisSize = 7.5;
  const jurisWidth = engine.fontBold.widthOfTextAtSize(jurisText, jurisSize);
  const jurisX = engine.marginLeft + (boxWidth - jurisWidth) / 2;

  engine.currentPage.drawText(jurisText, {
    x: Math.max(engine.marginLeft + 8, jurisX),
    y: boxTop - 28,
    size: jurisSize,
    font: engine.fontBold,
    color: rgb(0.28, 0.34, 0.42),
  });

  // Inner Divider Line
  engine.currentPage.drawLine({
    start: { x: engine.marginLeft + 10, y: boxTop - 34 },
    end: { x: engine.pageWidth - engine.marginRight - 10, y: boxTop - 34 },
    thickness: 0.5,
    color: rgb(0.72, 0.76, 0.82),
  });

  // Deterministic tracking reference based on document and party details (consistent across preview, download, and email)
  const hashSeed = `${documentId}_${stateInfo.stateCode}_${formData.senderName || formData.claimantName || formData.landlordName || "Issuer"}_${formData.recipientName || ""}_${formData.noticeDate || ""}`;
  let hashVal = 0;
  for (let i = 0; i < hashSeed.length; i++) {
    hashVal = (hashVal << 5) - hashVal + hashSeed.charCodeAt(i);
    hashVal |= 0;
  }
  const trackingNumber = formData.trackingNumber || `LDP-${stateInfo.stateCode}-${Math.abs(hashVal % 900000) + 100000}`;
  const dateFormatted = cleanText(formData.noticeDate || new Date().toISOString().split("T")[0]);

  engine.currentPage.drawText(`NOTICE REF: ${trackingNumber}`, {
    x: engine.marginLeft + 10,
    y: boxTop - 46,
    size: 7.5,
    font: engine.fontBold,
    color: rgb(0.2, 0.25, 0.35),
  });

  engine.currentPage.drawText(`ISSUE DATE: ${dateFormatted}`, {
    x: engine.marginLeft + boxWidth - 140,
    y: boxTop - 46,
    size: 7.5,
    font: engine.fontBold,
    color: rgb(0.2, 0.25, 0.35),
  });

  engine.currentPage.drawText(`STATUTE AUTHORITY: ${cleanText(stateInfo.statuteCitation)}`, {
    x: engine.marginLeft + 10,
    y: boxTop - 55,
    size: 6.8,
    font: engine.fontItalic,
    color: rgb(0.35, 0.4, 0.48),
  });

  engine.currentY = boxTop - boxHeight - 12;

  // Render All Structured Sections with Balanced Spacing
  for (const section of sections) {
    if (section.title) {
      engine.ensureSpace(20);
      engine.currentY -= 4;
      engine.drawText(section.title.toUpperCase(), engine.fontHeading, 9.5, rgb(0.1, 0.16, 0.26));
      engine.currentY -= 11;

      // Small accent underline under section title
      engine.currentPage.drawLine({
        start: { x: engine.marginLeft, y: engine.currentY + 2 },
        end: { x: engine.marginLeft + 45, y: engine.currentY + 2 },
        thickness: 1,
        color: rgb(0.2, 0.35, 0.55),
      });
      engine.currentY -= 3;
    }

    if (section.metaTable && section.metaTable.length > 0) {
      for (const row of section.metaTable) {
        const valText = cleanText(row.value || "");
        const valLines = engine.wrapText(valText, engine.fontRegular, 8.8, engine.contentWidth - 146);
        const rowHeight = Math.max(1, valLines.length) * 12 + 2;
        engine.ensureSpace(rowHeight);

        engine.drawText(row.label + ":", engine.fontBold, 8.8, rgb(0.2, 0.24, 0.3), engine.marginLeft + 6);
        for (let lIdx = 0; lIdx < valLines.length; lIdx++) {
          engine.drawText(valLines[lIdx], engine.fontRegular, 8.8, rgb(0.1, 0.1, 0.1), engine.marginLeft + 140);
          if (lIdx < valLines.length - 1) {
            engine.currentY -= 11;
          }
        }
        engine.currentY -= 13;
      }
      engine.currentY -= 2;
    }

    if (section.paragraphs && section.paragraphs.length > 0) {
      for (const p of section.paragraphs) {
        if (!p) continue;
        engine.drawParagraph(p);
        engine.currentY -= 3;
      }
    }

    if (section.bulletPoints && section.bulletPoints.length > 0) {
      for (const bp of section.bulletPoints) {
        if (!bp) continue;
        engine.drawBullet(bp);
      }
      engine.currentY -= 2;
    }

    // SIGNATURES BLOCK (Compact 50pt height)
    if (section.type === "signatures") {
      engine.ensureSpace(58);
      engine.currentY -= 6;

      const colWidth = 220;
      const col1X = engine.marginLeft + 6;
      const col2X = engine.marginLeft + 260;
      const sigLineY = engine.currentY - 22;

      // First Party Signature Line
      engine.currentPage.drawLine({
        start: { x: col1X, y: sigLineY },
        end: { x: col1X + colWidth, y: sigLineY },
        thickness: 0.8,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentPage.drawText("Authorized Signature / Issuer", {
        x: col1X,
        y: sigLineY - 10,
        size: 7.5,
        font: engine.fontBold,
        color: rgb(0.2, 0.2, 0.2),
      });

      const signerName = cleanText(formData.senderName || formData.landlordName || formData.claimantName || "Authorized Signer");
      const signerLine = `Printed Name: ${signerName} | Date: ${dateFormatted}`;
      const signerLines = engine.wrapText(signerLine, engine.fontRegular, 7, colWidth);
      engine.currentPage.drawText(signerLines[0] || signerLine, {
        x: col1X,
        y: sigLineY - 20,
        size: 7,
        font: engine.fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      // Second Party Signature Line
      engine.currentPage.drawLine({
        start: { x: col2X, y: sigLineY },
        end: { x: col2X + colWidth, y: sigLineY },
        thickness: 0.8,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentPage.drawText("Recipient / Counterparty / Witness", {
        x: col2X,
        y: sigLineY - 10,
        size: 7.5,
        font: engine.fontBold,
        color: rgb(0.2, 0.2, 0.2),
      });

      const recipientName = cleanText(formData.recipientName || formData.tenantName || formData.debtorName || "Recipient");
      const recipientLine = `Printed Name: ${recipientName} | Date: ____________`;
      const recipientLines = engine.wrapText(recipientLine, engine.fontRegular, 7, colWidth);
      engine.currentPage.drawText(recipientLines[0] || recipientLine, {
        x: col2X,
        y: sigLineY - 20,
        size: 7,
        font: engine.fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentY = sigLineY - 28;
    }

    // NOTARY BLOCK (Compact 68pt height)
    if (section.type === "notary") {
      engine.ensureSpace(74);
      engine.currentY -= 6;

      const juratHeight = 64;
      engine.currentPage.drawRectangle({
        x: engine.marginLeft,
        y: engine.currentY - juratHeight,
        width: engine.contentWidth,
        height: juratHeight,
        borderWidth: 0.75,
        borderColor: rgb(0.7, 0.74, 0.8),
        color: rgb(0.98, 0.99, 1.0),
      });

      const nTop = engine.currentY - 10;
      engine.currentPage.drawText("NOTARY JURAT / ACKNOWLEDGMENT", {
        x: engine.marginLeft + 8,
        y: nTop,
        size: 7.5,
        font: engine.fontBold,
        color: rgb(0.2, 0.25, 0.35),
      });

      engine.currentPage.drawText(
        `State of ${stateInfo.stateName}, County of ___________________, ss:`,
        {
          x: engine.marginLeft + 8,
          y: nTop - 11,
          size: 7,
          font: engine.fontItalic,
          color: rgb(0.3, 0.3, 0.3),
        }
      );

      const juratText = `Subscribed and sworn to before me on this _____ day of _______________, 20____, by __________________________, proved on satisfactory evidence.`;
      engine.currentPage.drawText(juratText, {
        x: engine.marginLeft + 8,
        y: nTop - 22,
        size: 6.8,
        font: engine.fontRegular,
        color: rgb(0.2, 0.2, 0.2),
      });

      // Signature line & Seal
      engine.currentPage.drawLine({
        start: { x: engine.marginLeft + 8, y: nTop - 42 },
        end: { x: engine.marginLeft + 180, y: nTop - 42 },
        thickness: 0.6,
        color: rgb(0.3, 0.3, 0.3),
      });
      engine.currentPage.drawText("Notary Public Signature & Commission Expiration", {
        x: engine.marginLeft + 8,
        y: nTop - 50,
        size: 6.5,
        font: engine.fontBold,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentPage.drawRectangle({
        x: engine.marginLeft + engine.contentWidth - 90,
        y: nTop - 50,
        width: 80,
        height: 42,
        borderWidth: 0.5,
        borderColor: rgb(0.7, 0.7, 0.7),
        borderDashArray: [2, 2],
      });
      engine.currentPage.drawText("[ OFFICIAL SEAL ]", {
        x: engine.marginLeft + engine.contentWidth - 80,
        y: nTop - 30,
        size: 6.2,
        font: engine.fontBold,
        color: rgb(0.5, 0.5, 0.5),
      });

      engine.currentY = engine.currentY - juratHeight - 8;
    }

    // CERTIFICATE OF SERVICE BLOCK (Compact 54pt height)
    if (section.type === "certificate_of_service") {
      engine.ensureSpace(60);
      engine.currentY -= 6;

      const certHeight = 52;
      engine.currentPage.drawRectangle({
        x: engine.marginLeft,
        y: engine.currentY - certHeight,
        width: engine.contentWidth,
        height: certHeight,
        borderWidth: 0.75,
        borderColor: rgb(0.7, 0.74, 0.8),
        color: rgb(0.97, 0.98, 0.99),
      });

      const cTop = engine.currentY - 10;
      engine.currentPage.drawText("CERTIFICATE OF SERVICE / PROOF OF DELIVERY", {
        x: engine.marginLeft + 8,
        y: cTop,
        size: 7.5,
        font: engine.fontBold,
        color: rgb(0.18, 0.24, 0.32),
      });

      const certText = `I hereby certify that on ${dateFormatted}, a true copy of this notice was served upon the recipient pursuant to state law via ${cleanText(formData.serviceMethod || "Certified Mail Return Receipt Requested")}.`;
      engine.currentPage.drawText(certText, {
        x: engine.marginLeft + 8,
        y: cTop - 12,
        size: 6.8,
        font: engine.fontRegular,
        color: rgb(0.2, 0.2, 0.2),
      });

      engine.currentPage.drawLine({
        start: { x: engine.marginLeft + 8, y: cTop - 32 },
        end: { x: engine.marginLeft + 180, y: cTop - 32 },
        thickness: 0.6,
        color: rgb(0.3, 0.3, 0.3),
      });
      engine.currentPage.drawText("Declarant Signature under Penalty of Perjury", {
        x: engine.marginLeft + 8,
        y: cTop - 40,
        size: 6.5,
        font: engine.fontBold,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentY = engine.currentY - certHeight - 6;
    }
  }

  // Multi-page Footers and Watermark Overlay
  const totalPages = engine.pages.length;
  for (let idx = 0; idx < totalPages; idx++) {
    const page = engine.pages[idx];
    const pageNumber = idx + 1;

    // Bottom Divider
    page.drawLine({
      start: { x: engine.marginLeft, y: 38 },
      end: { x: engine.pageWidth - engine.marginRight, y: 38 },
      thickness: 0.5,
      color: rgb(0.8, 0.82, 0.85),
    });

    // Left Footer
    const footerLeft = cleanText(`LEGALDELIVERYPORTAL.COM - FORM ${documentId.toUpperCase()} - ${stateInfo.stateCode}`);
    page.drawText(footerLeft, {
      x: engine.marginLeft,
      y: 28,
      size: 6.8,
      font: engine.fontBold,
      color: rgb(0.45, 0.5, 0.55),
    });

    // Right Footer: Page X of Y
    const footerRight = `Page ${pageNumber} of ${totalPages}`;
    const pageStrWidth = engine.fontRegular.widthOfTextAtSize(footerRight, 7);
    page.drawText(footerRight, {
      x: engine.pageWidth - engine.marginRight - pageStrWidth,
      y: 28,
      size: 7,
      font: engine.fontRegular,
      color: rgb(0.35, 0.4, 0.45),
    });

    // TWO-PHASE RENDER: PREVIEW MODE (WATERMARK & LOCK OVERLAY)
    if (previewMode) {
      const watermarkText = "OFFICIAL DRAFT - NOT VALID FOR FILING UNTIL ISSUED - LEGALDELIVERYPORTAL.COM";
      page.drawText(watermarkText, {
        x: 65,
        y: 220,
        size: 13,
        font: engine.fontHeading,
        color: rgb(0.78, 0.15, 0.15),
        opacity: 0.28,
        rotate: degrees(45),
      });

      page.drawText("SAMPLE PREVIEW ONLY - LEGAL DELIVERY PORTAL", {
        x: 100,
        y: 140,
        size: 15,
        font: engine.fontHeading,
        color: rgb(0.6, 0.2, 0.2),
        opacity: 0.2,
        rotate: degrees(45),
      });
    }
  }

  return await engine.doc.save();
}
