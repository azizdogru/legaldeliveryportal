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
  marginLeft = 54;
  marginRight = 54;
  marginTop = 54;
  marginBottom = 54;
  contentWidth = 612 - 54 * 2; // 504 pt
  currentY = 792 - 54;

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
    if (this.currentY - neededHeight < this.marginBottom + 20) {
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
          // If a single word is wider than maxWidth, let it wrap or draw
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
    fontSize = 10.5,
    lineHeight = 14,
    color = rgb(0.12, 0.12, 0.14)
  ) {
    const lines = this.wrapText(text, font, fontSize, this.contentWidth);
    for (const line of lines) {
      this.ensureSpace(lineHeight);
      if (line === "") {
        this.currentY -= lineHeight * 0.5;
        continue;
      }
      this.drawText(line, font, fontSize, color, this.marginLeft);
      this.currentY -= lineHeight;
    }
  }

  drawBullet(
    text: string,
    font = this.fontRegular,
    fontSize = 10,
    lineHeight = 13.5
  ) {
    const indent = 20;
    const bulletWidth = this.contentWidth - indent;
    const lines = this.wrapText(text, font, fontSize, bulletWidth);

    for (let i = 0; i < lines.length; i++) {
      this.ensureSpace(lineHeight);
      if (i === 0) {
        // Draw bullet symbol
        this.drawText("-", this.fontBold, fontSize, rgb(0.2, 0.2, 0.2), this.marginLeft + 6);
      }
      this.drawText(lines[i], font, fontSize, rgb(0.15, 0.15, 0.15), this.marginLeft + indent);
      this.currentY -= lineHeight;
    }
    this.currentY -= 3;
  }

  drawDivider() {
    this.ensureSpace(12);
    this.currentPage.drawLine({
      start: { x: this.marginLeft, y: this.currentY },
      end: { x: this.pageWidth - this.marginRight, y: this.currentY },
      thickness: 0.75,
      color: rgb(0.75, 0.78, 0.82),
    });
    this.currentY -= 10;
  }
}

/**
 * Universal PDF Generator for LegalDeliveryPortal.com
 */
export async function generateDocumentPdf(options: GeneratePdfOptions): Promise<Uint8Array> {
  const { title, documentId, stateInfo, sections, formData, previewMode = false } = options;

  const engine = new PDFLayoutEngine();
  await engine.init();

  // Top Formal Caption Box
  engine.ensureSpace(90);
  const boxTop = engine.currentY;
  const boxHeight = 82;
  const boxWidth = engine.contentWidth;

  // Header border box
  engine.currentPage.drawRectangle({
    x: engine.marginLeft,
    y: boxTop - boxHeight,
    width: boxWidth,
    height: boxHeight,
    borderWidth: 1.5,
    borderColor: rgb(0.12, 0.18, 0.28),
    color: rgb(0.97, 0.98, 0.99),
  });

  // Inner top banner text
  const cleanTitle = cleanText(title).toUpperCase();
  const titleSize = cleanTitle.length > 40 ? 11.5 : 13;
  const titleWidth = engine.fontHeading.widthOfTextAtSize(cleanTitle, titleSize);
  const titleX = engine.marginLeft + (boxWidth - titleWidth) / 2;

  engine.currentPage.drawText(cleanTitle, {
    x: Math.max(engine.marginLeft + 10, titleX),
    y: boxTop - 22,
    size: titleSize,
    font: engine.fontHeading,
    color: rgb(0.08, 0.14, 0.24),
  });

  // State Court Jurisdiction Subheader
  const jurisText = cleanText(
    `STATE OF ${stateInfo.stateName.toUpperCase()} | JURISDICTION: ${stateInfo.courtJurisdiction.toUpperCase()}`
  );
  const jurisSize = 8;
  const jurisWidth = engine.fontBold.widthOfTextAtSize(jurisText, jurisSize);
  const jurisX = engine.marginLeft + (boxWidth - jurisWidth) / 2;

  engine.currentPage.drawText(jurisText, {
    x: Math.max(engine.marginLeft + 10, jurisX),
    y: boxTop - 36,
    size: jurisSize,
    font: engine.fontBold,
    color: rgb(0.3, 0.35, 0.42),
  });

  // Inner divider inside box
  engine.currentPage.drawLine({
    start: { x: engine.marginLeft + 14, y: boxTop - 44 },
    end: { x: engine.pageWidth - engine.marginRight - 14, y: boxTop - 44 },
    thickness: 0.5,
    color: rgb(0.7, 0.75, 0.8),
  });

  // Tracking and date details inside caption box
  const trackingNumber = `LDP-${stateInfo.stateCode}-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateFormatted = cleanText(formData.noticeDate || new Date().toISOString().split("T")[0]);

  engine.currentPage.drawText(`OFFICIAL NOTICE REF: ${trackingNumber}`, {
    x: engine.marginLeft + 16,
    y: boxTop - 58,
    size: 8.5,
    font: engine.fontBold,
    color: rgb(0.2, 0.25, 0.35),
  });

  engine.currentPage.drawText(`DATE OF ISSUANCE: ${dateFormatted}`, {
    x: engine.marginLeft + boxWidth - 190,
    y: boxTop - 58,
    size: 8.5,
    font: engine.fontBold,
    color: rgb(0.2, 0.25, 0.35),
  });

  engine.currentPage.drawText(`STATUTE AUTHORITY: ${cleanText(stateInfo.statuteCitation)}`, {
    x: engine.marginLeft + 16,
    y: boxTop - 72,
    size: 7.8,
    font: engine.fontItalic,
    color: rgb(0.35, 0.4, 0.48),
  });

  engine.currentY = boxTop - boxHeight - 20;

  // Render all structured sections
  for (const section of sections) {
    if (section.title) {
      engine.ensureSpace(28);
      engine.currentY -= 6;
      engine.drawText(section.title.toUpperCase(), engine.fontHeading, 11, rgb(0.1, 0.16, 0.26));
      engine.currentY -= 14;

      // Small accent underline under section title
      engine.currentPage.drawLine({
        start: { x: engine.marginLeft, y: engine.currentY + 2 },
        end: { x: engine.marginLeft + 60, y: engine.currentY + 2 },
        thickness: 1.5,
        color: rgb(0.2, 0.35, 0.55),
      });
      engine.currentY -= 6;
    }

    if (section.metaTable && section.metaTable.length > 0) {
      engine.ensureSpace(section.metaTable.length * 16 + 10);
      for (const row of section.metaTable) {
        engine.ensureSpace(16);
        engine.drawText(row.label + ":", engine.fontBold, 9.5, rgb(0.2, 0.24, 0.3), engine.marginLeft + 8);
        engine.drawText(row.value, engine.fontRegular, 9.5, rgb(0.1, 0.1, 0.1), engine.marginLeft + 150);
        engine.currentY -= 15;
      }
      engine.currentY -= 6;
    }

    if (section.paragraphs && section.paragraphs.length > 0) {
      for (const p of section.paragraphs) {
        if (!p) continue;
        engine.drawParagraph(p);
        engine.currentY -= 6;
      }
    }

    if (section.bulletPoints && section.bulletPoints.length > 0) {
      for (const bp of section.bulletPoints) {
        if (!bp) continue;
        engine.drawBullet(bp);
      }
      engine.currentY -= 4;
    }

    if (section.type === "signatures") {
      engine.ensureSpace(90);
      engine.currentY -= 12;

      // Two columns for signatures: Sender / Landlord / First Party & Recipient / Second Party
      const colWidth = 220;
      const col1X = engine.marginLeft + 10;
      const col2X = engine.marginLeft + 260;
      const sigLineY = engine.currentY - 35;

      // First Party Signature Line
      engine.currentPage.drawLine({
        start: { x: col1X, y: sigLineY },
        end: { x: col1X + colWidth, y: sigLineY },
        thickness: 1,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentPage.drawText("Authorized Signature / Issuer", {
        x: col1X,
        y: sigLineY - 14,
        size: 8.5,
        font: engine.fontBold,
        color: rgb(0.2, 0.2, 0.2),
      });

      const signerName = cleanText(formData.senderName || formData.landlordName || formData.claimantName || "Authorized Signer");
      engine.currentPage.drawText(`Printed Name: ${signerName}`, {
        x: col1X,
        y: sigLineY - 26,
        size: 8,
        font: engine.fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentPage.drawText(`Date: ${dateFormatted}`, {
        x: col1X,
        y: sigLineY - 38,
        size: 8,
        font: engine.fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      // Second Party Signature Line (or Verifying Witness)
      engine.currentPage.drawLine({
        start: { x: col2X, y: sigLineY },
        end: { x: col2X + colWidth, y: sigLineY },
        thickness: 1,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentPage.drawText("Recipient / Counterparty / Witness", {
        x: col2X,
        y: sigLineY - 14,
        size: 8.5,
        font: engine.fontBold,
        color: rgb(0.2, 0.2, 0.2),
      });

      const recipientName = cleanText(formData.recipientName || formData.tenantName || formData.debtorName || "Recipient / Second Party");
      engine.currentPage.drawText(`Printed Name: ${recipientName}`, {
        x: col2X,
        y: sigLineY - 26,
        size: 8,
        font: engine.fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentPage.drawText("Date: ________________________", {
        x: col2X,
        y: sigLineY - 38,
        size: 8,
        font: engine.fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentY = sigLineY - 50;
    }

    if (section.type === "notary") {
      engine.ensureSpace(110);
      engine.currentY -= 10;

      // Notary acknowledgment box
      const juratHeight = 90;
      engine.currentPage.drawRectangle({
        x: engine.marginLeft,
        y: engine.currentY - juratHeight,
        width: engine.contentWidth,
        height: juratHeight,
        borderWidth: 0.8,
        borderColor: rgb(0.65, 0.7, 0.75),
        color: rgb(0.98, 0.99, 1.0),
      });

      const nTop = engine.currentY - 14;
      engine.currentPage.drawText("NOTARY JURAT / ACKNOWLEDGMENT (OPTIONAL OR AS REQUIRED BY RECORDING)", {
        x: engine.marginLeft + 12,
        y: nTop,
        size: 8,
        font: engine.fontBold,
        color: rgb(0.2, 0.25, 0.35),
      });

      engine.currentPage.drawText(
        `State of ${stateInfo.stateName}, County of ___________________, ss:`,
        {
          x: engine.marginLeft + 12,
          y: nTop - 14,
          size: 8,
          font: engine.fontItalic,
          color: rgb(0.3, 0.3, 0.3),
        }
      );

      const juratP1 = `Subscribed and sworn to (or affirmed) before me on this _____ day of _______________, 20____,`;
      const juratP2 = `by _____________________________________, proved to me on the basis of satisfactory evidence to be the person(s) who appeared before me.`;
      engine.currentPage.drawText(juratP1, {
        x: engine.marginLeft + 12,
        y: nTop - 28,
        size: 7.5,
        font: engine.fontRegular,
        color: rgb(0.2, 0.2, 0.2),
      });
      engine.currentPage.drawText(juratP2, {
        x: engine.marginLeft + 12,
        y: nTop - 40,
        size: 7.5,
        font: engine.fontRegular,
        color: rgb(0.2, 0.2, 0.2),
      });

      // Notary signature line & Seal area
      engine.currentPage.drawLine({
        start: { x: engine.marginLeft + 12, y: nTop - 64 },
        end: { x: engine.marginLeft + 220, y: nTop - 64 },
        thickness: 0.75,
        color: rgb(0.3, 0.3, 0.3),
      });
      engine.currentPage.drawText("Notary Public Signature & Commission Expiration", {
        x: engine.marginLeft + 12,
        y: nTop - 74,
        size: 7,
        font: engine.fontBold,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentPage.drawRectangle({
        x: engine.marginLeft + engine.contentWidth - 110,
        y: nTop - 72,
        width: 95,
        height: 52,
        borderWidth: 0.5,
        borderColor: rgb(0.7, 0.7, 0.7),
        borderDashArray: [3, 2],
      });
      engine.currentPage.drawText("[ OFFICIAL NOTARY SEAL ]", {
        x: engine.marginLeft + engine.contentWidth - 100,
        y: nTop - 48,
        size: 6.5,
        font: engine.fontBold,
        color: rgb(0.5, 0.5, 0.5),
      });

      engine.currentY = engine.currentY - juratHeight - 14;
    }

    if (section.type === "certificate_of_service") {
      engine.ensureSpace(95);
      engine.currentY -= 8;

      const certHeight = 80;
      engine.currentPage.drawRectangle({
        x: engine.marginLeft,
        y: engine.currentY - certHeight,
        width: engine.contentWidth,
        height: certHeight,
        borderWidth: 0.75,
        borderColor: rgb(0.65, 0.7, 0.75),
        color: rgb(0.97, 0.98, 0.99),
      });

      const cTop = engine.currentY - 14;
      engine.currentPage.drawText("CERTIFICATE OF SERVICE / PROOF OF DELIVERY", {
        x: engine.marginLeft + 12,
        y: cTop,
        size: 8,
        font: engine.fontBold,
        color: rgb(0.18, 0.24, 0.32),
      });

      const certText1 = `I hereby certify that on ${dateFormatted}, a true and correct copy of this legal notice was served`;
      const certText2 = `upon the recipient in accordance with state statutory requirements via ${cleanText(formData.serviceMethod || "Certified Mail Return Receipt Requested")}.`;

      engine.currentPage.drawText(certText1, {
        x: engine.marginLeft + 12,
        y: cTop - 14,
        size: 7.5,
        font: engine.fontRegular,
        color: rgb(0.2, 0.2, 0.2),
      });
      engine.currentPage.drawText(certText2, {
        x: engine.marginLeft + 12,
        y: cTop - 26,
        size: 7.5,
        font: engine.fontRegular,
        color: rgb(0.2, 0.2, 0.2),
      });

      // Declarant line
      engine.currentPage.drawLine({
        start: { x: engine.marginLeft + 12, y: cTop - 52 },
        end: { x: engine.marginLeft + 220, y: cTop - 52 },
        thickness: 0.75,
        color: rgb(0.3, 0.3, 0.3),
      });
      engine.currentPage.drawText("Server / Declarant Signature under Penalty of Perjury", {
        x: engine.marginLeft + 12,
        y: cTop - 62,
        size: 7,
        font: engine.fontBold,
        color: rgb(0.3, 0.3, 0.3),
      });

      engine.currentY = engine.currentY - certHeight - 12;
    }
  }

  // Multi-page Footers and Watermark Overlay
  const totalPages = engine.pages.length;
  for (let idx = 0; idx < totalPages; idx++) {
    const page = engine.pages[idx];
    const pageNumber = idx + 1;

    // Bottom Divider
    page.drawLine({
      start: { x: engine.marginLeft, y: 44 },
      end: { x: engine.pageWidth - engine.marginRight, y: 44 },
      thickness: 0.5,
      color: rgb(0.8, 0.82, 0.85),
    });

    // Left Footer
    const footerLeft = cleanText(`LEGALDELIVERYPORTAL.COM - FORM ${documentId.toUpperCase()} - ${stateInfo.stateCode}`);
    page.drawText(footerLeft, {
      x: engine.marginLeft,
      y: 32,
      size: 7,
      font: engine.fontBold,
      color: rgb(0.45, 0.5, 0.55),
    });

    // Right Footer: Page X of Y
    const footerRight = `Page ${pageNumber} of ${totalPages}`;
    const pageStrWidth = engine.fontRegular.widthOfTextAtSize(footerRight, 7.5);
    page.drawText(footerRight, {
      x: engine.pageWidth - engine.marginRight - pageStrWidth,
      y: 32,
      size: 7.5,
      font: engine.fontRegular,
      color: rgb(0.35, 0.4, 0.45),
    });

    // TWO-PHASE RENDER: PREVIEW MODE (WATERMARK & LOCK OVERLAY)
    if (previewMode) {
      // 1. Prominent Diagonal Watermark across the page
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
        size: 16,
        font: engine.fontHeading,
        color: rgb(0.6, 0.2, 0.2),
        opacity: 0.2,
        rotate: degrees(45),
      });

      // On Page 1: Shaded overlay on lower portion
      if (pageNumber === 1 && engine.currentY < 400) {
        // Draw subtle lock notification banner at the bottom of the content
        page.drawRectangle({
          x: engine.marginLeft,
          y: 60,
          width: engine.contentWidth,
          height: 70,
          borderWidth: 1.5,
          borderColor: rgb(0.8, 0.2, 0.2),
          color: rgb(0.99, 0.95, 0.95),
          opacity: 0.92,
        });

        const lockTitle = "PREVIEW WATERMARK ACTIVE - DIGITAL UNLOCK REQUIRED ($9.90)";
        const lockTitleWidth = engine.fontHeading.widthOfTextAtSize(lockTitle, 9.5);
        page.drawText(lockTitle, {
          x: engine.marginLeft + (engine.contentWidth - lockTitleWidth) / 2,
          y: 110,
          size: 9.5,
          font: engine.fontHeading,
          color: rgb(0.7, 0.1, 0.1),
        });

        const lockDesc1 = "This preview displays formatting and state statute citations.";
        const lockDesc2 = "Instant unlock delivers a clean, high-resolution court-ready PDF without watermarks.";
        page.drawText(lockDesc1, {
          x: engine.marginLeft + 18,
          y: 92,
          size: 8,
          font: engine.fontRegular,
          color: rgb(0.3, 0.3, 0.3),
        });
        page.drawText(lockDesc2, {
          x: engine.marginLeft + 18,
          y: 78,
          size: 8,
          font: engine.fontBold,
          color: rgb(0.2, 0.2, 0.2),
        });
      }
    }
  }

  return await engine.doc.save();
}
