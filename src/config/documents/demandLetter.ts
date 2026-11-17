import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const demandLetterConfig: DocumentConfig = {
  id: "demand-letter",
  slug: "demand-letter",
  title: "General Demand Letter / Pre-Suit Notice to Pay",
  shortTitle: "Demand Letter",
  category: "Demands & Disputes",
  description: "Official pre-suit written collection demand for unpaid invoices, breach of contract, property damage, or unpaid loans before initiating court proceedings.",
  metaDescription: "Create a formal pre-suit Demand Letter for payment. Cites state statutes, calculates interest, and establishes prerequisite for attorney fees. Download court-ready PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Most Requested",
  iconName: "Receipt",
  searchKeywords: [
    "pre-suit demand letter template",
    "formal letter of demand payment",
    "small claims demand notice",
    "unpaid invoice collection letter",
    "breach of contract demand",
  ],
  features: [
    "Meets state statutory pre-suit notice prerequisites for attorney fees",
    "Itemizes principal debt, late charges, and statutory prejudgment interest",
    "Cites specific state court jurisdiction and small claims dollar limits",
    "Provides official Certificate of Service for court trial evidence",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    senderName: "",
    senderAddress: "",
    senderCityStateZip: "",
    recipientName: "",
    recipientAddress: "",
    recipientCityStateZip: "",
    claimType: "unpaid_invoice",
    principalAmount: "4500.00",
    interestAmount: "0.00",
    contractDate: "",
    claimDescription: "",
    paymentDeadlineDays: "14",
    paymentInstructions: "Payment via certified cashier's check or wire transfer to the address listed above.",
    serviceMethod: "Certified Mail Return Receipt Requested",
  },
  steps: [
    {
      id: "parties",
      title: "Creditor & Debtor Details",
      description: "Enter identifying contact details for both parties.",
      fields: [
        {
          name: "senderName",
          label: "Creditor Legal Name (You)",
          type: "text",
          placeholder: "e.g., Summit Ridge Contracting LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "senderAddress",
          label: "Creditor Street Address",
          type: "text",
          placeholder: "e.g., 500 Enterprise Way",
          required: true,
          gridCols: 2,
        },
        {
          name: "senderCityStateZip",
          label: "Creditor City, State, Zip",
          type: "text",
          placeholder: "e.g., Austin, TX 78701",
          required: true,
          gridCols: 2,
        },
        {
          name: "recipientName",
          label: "Debtor Legal Name / Business Name",
          type: "text",
          placeholder: "e.g., Westlake Development Corp.",
          required: true,
          gridCols: 1,
        },
        {
          name: "recipientAddress",
          label: "Debtor Street Address",
          type: "text",
          placeholder: "e.g., 880 Congress Ave, Suite 300",
          required: true,
          gridCols: 2,
        },
        {
          name: "recipientCityStateZip",
          label: "Debtor City, State, Zip",
          type: "text",
          placeholder: "e.g., Austin, TX 78704",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "claim_details",
      title: "Debt & Basis of Claim",
      description: "Itemize the exact financial balances and background of the transaction.",
      fields: [
        {
          name: "claimType",
          label: "Basis of Indebtedness",
          type: "select",
          required: true,
          options: [
            { label: "Unpaid Invoice or Commercial Account", value: "unpaid_invoice" },
            { label: "Breach of Written Contract", value: "breach_contract" },
            { label: "Unpaid Personal or Promissory Note Loan", value: "loan_default" },
            { label: "Property Damage or Tort Liability", value: "property_damage" },
            { label: "Failure to Return Security Deposit", value: "deposit_refund" },
          ],
        },
        {
          name: "principalAmount",
          label: "Principal Amount Owed ($)",
          type: "currency",
          placeholder: "e.g., 4500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "interestAmount",
          label: "Statutory Interest / Late Fees ($)",
          type: "currency",
          placeholder: "e.g., 225.00",
          required: false,
          gridCols: 2,
        },
        {
          name: "contractDate",
          label: "Date of Agreement / Invoice / Incident",
          type: "text",
          placeholder: "e.g., October 12, 2026",
          required: true,
        },
        {
          name: "claimDescription",
          label: "Detailed Factual Summary of Debt",
          type: "textarea",
          placeholder: "Provide invoice numbers, agreed delivery dates, scope of services performed, and dates of prior informal requests...",
          required: true,
        },
      ],
    },
    {
      id: "settlement_terms",
      title: "Settlement Terms & Delivery",
      description: "Define the cure period and remittance instructions.",
      fields: [
        {
          name: "paymentDeadlineDays",
          label: "Payment Window (Days from Receipt)",
          type: "select",
          required: true,
          options: [
            { label: "10 Calendar Days", value: "10" },
            { label: "14 Calendar Days", value: "14" },
            { label: "21 Calendar Days", value: "21" },
            { label: "30 Calendar Days", value: "30" },
          ],
        },
        {
          name: "paymentInstructions",
          label: "Payment Delivery Instructions",
          type: "textarea",
          placeholder: "e.g., Remit cashier check, certified funds, or wire to: Account Name, Bank Name, Routing...",
          required: true,
        },
        {
          name: "serviceMethod",
          label: "Formal Delivery Method",
          type: "select",
          required: true,
          options: [
            { label: "USPS Certified Mail Return Receipt Requested", value: "Certified Mail Return Receipt Requested" },
            { label: "First-Class Mail with Postal Certificate of Mailing", value: "First-Class Mail with Certificate of Mailing" },
            { label: "Personal Hand Delivery with Written Receipt", value: "Personal Hand Delivery" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date of Notice",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const sender = data.senderName || "Creditor";
    const recipient = data.recipientName || "Debtor";
    const principal = parseFloat(data.principalAmount || "0").toFixed(2);
    const interest = parseFloat(data.interestAmount || "0").toFixed(2);
    const totalDue = (parseFloat(data.principalAmount || "0") + parseFloat(data.interestAmount || "0")).toFixed(2);
    const deadline = data.paymentDeadlineDays || "14";
    const statuteName = statute?.statuteName || "Pre-Suit Notice and Debt Collection Rules";
    const statuteCite = statute?.statuteCitation || "Applicable State Rules of Civil Procedure";
    const courtName = statute?.courtJurisdiction || "Court of Competent Jurisdiction";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CREDITOR / CLAIMANT", value: `${sender}, ${data.senderAddress || ""}, ${data.senderCityStateZip || ""}` },
          { label: "DEBTOR / RESPONDENT", value: `${recipient}, ${data.recipientAddress || ""}, ${data.recipientCityStateZip || ""}` },
          { label: "SUBJECT MATTER", value: `FINAL FORMAL DEMAND FOR PAYMENT PRIOR TO LITIGATION` },
          { label: "PRINCIPAL DEBT DUE", value: `$${principal} USD` },
          { label: "ACCRUED STATUTORY CHARGES", value: `$${interest} USD` },
          { label: "TOTAL SETTLEMENT DEMAND", value: `$${totalDue} USD` },
        ],
      },
      {
        title: "1. Notice of Delinquency and Legal Presentment of Claim",
        type: "body",
        paragraphs: [
          `PLEASE TAKE FORMAL LEGAL NOTICE that this letter constitutes a formal presentment of claim and final written demand for payment pursuant to ${statuteCite}.`,
          `As of the date of this notice, your account with the undersigned is seriously delinquent and in material breach. Despite prior requests, the sum of $${totalDue} remains completely unpaid and past due.`,
          `This indebtedness arises from the transaction dated on or about ${data.contractDate || "the date agreed upon"}, described as follows:`,
          `"${data.claimDescription || "Unpaid commercial account and breach of contract obligations."}"`,
        ],
      },
      {
        title: "2. Itemized Financial Accounting",
        type: "body",
        paragraphs: [
          `The total sum demanded represents lawful amounts due and payable without lawful offset or defense:`,
        ],
        bulletPoints: [
          `Principal Debt Balance: $${principal}`,
          `Accrued Statutory Interest / Contractual Late Charges: $${interest}`,
          `TOTAL AMOUNT REQUIRED TO SATISFY OBLIGATION: $${totalDue}`,
        ],
      },
      {
        title: "3. Mandatory Settlement Window and Remittance",
        type: "body",
        paragraphs: [
          `DEMAND IS HEREBY MADE that the total liquidated balance of $${totalDue} be paid in full within ${deadline} calendar days of your receipt of this notice.`,
          `Payment must be delivered in accordance with the following instructions:`,
          `${data.paymentInstructions || "Remit certified funds to Creditor address listed above."}`,
        ],
      },
      {
        title: "4. Notice of Pending Judicial Action and Attorney Fee Claim",
        type: "warning",
        paragraphs: [
          `If payment in full is not received within ${deadline} calendar days, the undersigned has authorized the immediate preparation and filing of a formal civil complaint in ${courtName}.`,
          `In that judicial action, the undersigned will seek judgment for: (a) the full principal balance of $${principal}, (b) maximum pre-judgment and post-judgment interest authorized by law, (c) all court costs and process service fees, and (d) full recovery of reasonable statutory attorney fees.`,
          `Prompt satisfaction of this demand will avoid the entry of a public court judgment, credit bureau reporting, and post-judgment enforcement remedies including bank levies and property liens.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        type: "certificate_of_service",
        paragraphs: [],
      },
    ];
  },
};
