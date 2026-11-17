import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const loanDefaultAccelerationConfig: DocumentConfig = {
  id: "loan-default-acceleration",
  slug: "loan-default-acceleration",
  title: "Notice of Default and Acceleration of Promissory Note",
  shortTitle: "Loan Acceleration Notice",
  category: "Finance & Debt Relief",
  description: "Official statutory legal notice served by a lender or creditor upon a defaulting borrower declaring promissory note default, accelerating the entire remaining principal balance immediately, and setting final certified payment deadline before civil litigation.",
  metaDescription: "Create an official Notice of Default and Loan Acceleration. Declares promissory note breach, demands full accelerated balance, and warns of legal action for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Debt Acceleration Notice",
  iconName: "AlertCircle",
  searchKeywords: [
    "notice of default and acceleration template pdf",
    "promissory note acceleration notice",
    "loan default notice letter form",
    "demand letter accelerated balance promissory note",
    "commercial note default notice",
    "debt acceleration demand letter",
  ],
  features: [
    "Statutorily required formal condition precedent before filing civil court complaints on promissory notes",
    "Itemizes original note date, principal balance, delinquent installments, accrued default interest, and late fees",
    "Exercises contractual acceleration clause declaring 100% of entire unpaid debt balance immediately due",
    "Warns borrower of impending civil lawsuit, judicial judgment, wage garnishment, and legal fee liability",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "NY",
    lenderName: "Empire Commercial Capital, LLC",
    lenderAddress: "400 Park Avenue, 18th Floor, New York, NY 10022",
    lenderPhone: "(212) 555-0182",
    borrowerName: "Marcus Anthony Vance & Sterling Logistics, Inc.",
    borrowerAddress: "1280 Industrial Boulevard, Long Island City, NY 11101",
    originalNoteDate: "2025-06-15",
    originalPrincipalAmount: "150000.00",
    delinquentInstallmentSum: "14850.00",
    unpaidPrincipalBalance: "128450.00",
    accruedDefaultInterest: "3210.50",
    lateFeesSum: "750.00",
    totalAcceleratedSumDemanded: "132410.50",
    cureDeadlineDays: "10",
  },
  steps: [
    {
      id: "loan_parties",
      title: "Lender & Borrower Information",
      description: "Enter identifying details for the creditor/lender and the defaulting borrower.",
      fields: [
        {
          name: "lenderName",
          label: "Lender / Note Holder Legal Name",
          type: "text",
          placeholder: "e.g., Empire Commercial Capital, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "lenderPhone",
          label: "Lender Contact Phone",
          type: "phone",
          placeholder: "e.g., (212) 555-0182",
          required: true,
          gridCols: 2,
        },
        {
          name: "lenderAddress",
          label: "Lender Payment & Business Address",
          type: "text",
          placeholder: "e.g., 400 Park Avenue, 18th Floor, New York, NY 10022",
          required: true,
          gridCols: 1,
        },
        {
          name: "borrowerName",
          label: "Borrower / Debtor Full Legal Name(s)",
          type: "text",
          placeholder: "e.g., Marcus Anthony Vance & Sterling Logistics, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "borrowerAddress",
          label: "Borrower Mailing / Facility Address",
          type: "text",
          placeholder: "e.g., 1280 Industrial Boulevard, Long Island City, NY 11101",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "debt_breakdown",
      title: "Note Specifics & Accelerated Balances",
      description: "Itemize original promissory note date, arrears, and full accelerated payoff balance.",
      fields: [
        {
          name: "originalNoteDate",
          label: "Original Promissory Note Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "originalPrincipalAmount",
          label: "Original Loan Face Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 150000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "delinquentInstallmentSum",
          label: "Total Past-Due Installments in Arrears ($ USD)",
          type: "currency",
          placeholder: "e.g., 14850.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "unpaidPrincipalBalance",
          label: "Remaining Unpaid Principal Balance ($ USD)",
          type: "currency",
          placeholder: "e.g., 128450.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "accruedDefaultInterest",
          label: "Accrued Default Interest ($ USD)",
          type: "currency",
          placeholder: "e.g., 3210.50",
          required: true,
          gridCols: 2,
        },
        {
          name: "lateFeesSum",
          label: "Total Accrued Contractual Late Charges ($ USD)",
          type: "currency",
          placeholder: "e.g., 750.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "totalAcceleratedSumDemanded",
          label: "TOTAL ACCELERATED SUM NOW DEMANDED ($ USD)",
          type: "currency",
          placeholder: "e.g., 132410.50",
          required: true,
          gridCols: 2,
        },
        {
          name: "cureDeadlineDays",
          label: "Final Cure Window (Days)",
          type: "text",
          placeholder: "e.g., 10 (or 14, 30 per note terms)",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Notice Date Served",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const lender = data.lenderName || "Lender / Note Holder";
    const borrower = data.borrowerName || "Borrower";
    const origDate = data.originalNoteDate || "Date of Note";
    const origAmt = parseFloat(data.originalPrincipalAmount || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const acceleratedTotal = parseFloat(data.totalAcceleratedSumDemanded || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const days = data.cureDeadlineDays || "10";
    const statuteCite = statute?.statuteCitation || "Uniform Commercial Code Article 3 & State Pre-Suit Presentment Rules";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE TYPE", value: "FORMAL NOTICE OF DEFAULT & ACCELERATION OF DEBT" },
          { label: "NOTE HOLDER (CREDITOR)", value: `${lender}` },
          { label: "BORROWER (DEBTOR)", value: `${borrower}` },
          { label: "PROMISSORY NOTE DATE", value: `${origDate} (Original Face: $${origAmt} USD)` },
          { label: "DELINQUENT ARREARS", value: `$${parseFloat(data.delinquentInstallmentSum || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })} USD` },
          { label: "UNPAID PRINCIPAL", value: `$${parseFloat(data.unpaidPrincipalBalance || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })} USD` },
          { label: "TOTAL ACCELERATED DUE", value: `$${acceleratedTotal} USD (Certified Funds Only)` },
          { label: "CURE WINDOW", value: `${days} Calendar Days from Service` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Notice of Default & Event of Breach",
        type: "body",
        paragraphs: [
          `TO: ${borrower}, located at ${data.borrowerAddress || "address on file"}.`,
          `PLEASE TAKE FORMAL WRITTEN NOTICE that you are in material default of your obligations under that certain Promissory Note dated ${origDate}, in the original principal sum of $${origAmt} USD, executed by you in favor of ${lender} ("Holder").`,
          `Nature of Default: You have failed and refused to tender monthly scheduled installments as required by the terms of the Note. Delinquent installment payments in arrears total $${parseFloat(data.delinquentInstallmentSum || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })} USD, together with accrued contractual late charges.`,
        ],
      },
      {
        title: "2. Exercise of Acceleration Clause & Itemization of Claim",
        type: "body",
        paragraphs: [
          `BY REASON OF SAID UNCURED DEFAULT, Holder hereby exercises its contractual right under the Note and applicable law to ACCELERATE AND DECLARE THE ENTIRE OUTSTANDING PRINCIPAL BALANCE AND ALL ACCRUED INTEREST IMMEDIATELY DUE AND PAYABLE IN FULL.`,
          `Itemization of Accelerated Claim:`,
          `- Accelerated Unpaid Principal Balance: $${parseFloat(data.unpaidPrincipalBalance || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })} USD`,
          `- Accrued Default Interest: $${parseFloat(data.accruedDefaultInterest || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })} USD`,
          `- Contractual Late Fees: $${parseFloat(data.lateFeesSum || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })} USD`,
          `TOTAL CERTIFIED PAYOFF DEMANDED: $${acceleratedTotal} USD`,
        ],
      },
      {
        title: "3. Final Opportunity to Remit & Notice of Litigation",
        type: "body",
        paragraphs: [
          `YOU ARE HEREBY GIVEN FINAL FORMAL DEMAND to deliver certified cashier funds in the amount of $${acceleratedTotal} USD to ${lender} at ${data.lenderAddress || "the address above"} within ${days} calendar days of receipt of this notice.`,
          `IF YOU FAIL TO REMIT SAID PAYMENT IN FULL WITHIN ${days} DAYS, legal proceedings will be commenced against you in ${statute?.courtJurisdiction || "the court of competent jurisdiction"} for the entry of a money judgment, post-judgment enforcement, bank levies, asset seizure, and full recovery of statutory attorney fees and court costs pursuant to ${statuteCite}.`,
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
