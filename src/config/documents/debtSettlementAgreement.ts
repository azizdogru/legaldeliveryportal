import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const debtSettlementAgreementConfig: DocumentConfig = {
  id: "debt-settlement-agreement",
  slug: "debt-settlement-agreement",
  title: "Debt Settlement Agreement & Release of Claim",
  shortTitle: "Debt Settlement Agreement",
  category: "Finance & Debt Relief",
  description: "Legally enforceable accord and satisfaction debt compromise agreement settling an outstanding debt balance for a discounted lump-sum or structured payment, featuring pay-for-delete credit reporting terms and mutual liability release.",
  metaDescription: "Create a binding Debt Settlement Agreement. Settle delinquent balances with pay-for-delete credit reporting and formal accord and satisfaction release. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Pay-for-Delete Terms",
  iconName: "CreditCard",
  searchKeywords: [
    "debt settlement agreement template",
    "accord and satisfaction contract",
    "pay for delete agreement letter",
    "debt compromise settlement form",
    "credit card settlement contract",
    "unpaid balance settlement agreement",
  ],
  features: [
    "Structured under Uniform Commercial Code Section 3-311 accord and satisfaction standards",
    "Includes pay-for-delete credit reporting deletion instructions for Experian, Equifax, and TransUnion",
    "Provides for full and complete release of debtor upon receipt of agreed settlement funds",
    "Includes IRS Form 1099-C cancellation of debt tax reporting disclosure",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "NY",
    creditorName: "",
    creditorAddress: "",
    debtorName: "",
    debtorAddress: "",
    accountNumber: "",
    originalBalance: "8400.00",
    settlementAmount: "3750.00",
    paymentType: "lump_sum",
    paymentDueDate: "",
    paymentMethod: "Certified Cashier Check or Bank Wire",
    creditReportingAction: "delete_tradeline",
  },
  steps: [
    {
      id: "parties_account",
      title: "Creditor, Debtor & Account",
      description: "Enter identifying details for the debt owner, debtor, and reference account.",
      fields: [
        {
          name: "creditorName",
          label: "Creditor / Collection Agency / Assignee Name",
          type: "text",
          placeholder: "e.g., Apex Financial Recovery Services LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "creditorAddress",
          label: "Creditor Business Address",
          type: "text",
          placeholder: "e.g., 100 Wall Street, 14th Floor, New York, NY 10005",
          required: true,
          gridCols: 1,
        },
        {
          name: "debtorName",
          label: "Debtor Full Legal Name",
          type: "text",
          placeholder: "e.g., Thomas Alan Reynolds",
          required: true,
          gridCols: 1,
        },
        {
          name: "debtorAddress",
          label: "Debtor Residential Address",
          type: "text",
          placeholder: "e.g., 345 West 58th Street, Apt 8B, New York, NY 10019",
          required: true,
          gridCols: 1,
        },
        {
          name: "accountNumber",
          label: "Account / Reference Number (Masked or Full)",
          type: "text",
          placeholder: "e.g., Acct # ending in 7104 or File Ref #98214",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "compromise_accounting",
      title: "Settlement Sum & Payment Terms",
      description: "Define the original debt, negotiated compromise sum, and payment schedule.",
      fields: [
        {
          name: "originalBalance",
          label: "Claimed Original Balance ($ USD)",
          type: "currency",
          placeholder: "e.g., 8400.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "settlementAmount",
          label: "Agreed Discounted Settlement Sum ($ USD)",
          type: "currency",
          placeholder: "e.g., 3750.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "paymentType",
          label: "Payment Schedule",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "One-Time Lump Sum Settlement", value: "lump_sum" },
            { label: "Two Equal Consecutive Monthly Installments", value: "two_installments" },
            { label: "Three Equal Consecutive Monthly Installments", value: "three_installments" },
          ],
        },
        {
          name: "paymentDueDate",
          label: "Settlement Payment Due Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "paymentMethod",
          label: "Remittance Instructions",
          type: "text",
          placeholder: "e.g., Certified cashier check, bank wire, or online payment portal",
          required: true,
        },
      ],
    },
    {
      id: "credit_execution",
      title: "Credit Reporting & Delivery",
      description: "Establish credit bureau tradeline deletion terms and execution date.",
      fields: [
        {
          name: "creditReportingAction",
          label: "Credit Bureau Reporting Stipulation (Pay-for-Delete)",
          type: "select",
          required: true,
          options: [
            { label: "Complete Deletion of Tradeline (Full Pay-for-Delete from Equifax, Experian, TransUnion)", value: "delete_tradeline" },
            { label: "Update Status to 'Paid in Full / Settled in Full' with Zero Balance", value: "settled_zero_balance" },
            { label: "Creditor does not report to consumer credit reporting agencies", value: "no_reporting" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date of Agreement",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const creditor = data.creditorName || "Creditor";
    const debtor = data.debtorName || "Debtor";
    const original = parseFloat(data.originalBalance || "0").toFixed(2);
    const settled = parseFloat(data.settlementAmount || "0").toFixed(2);
    const savings = (parseFloat(data.originalBalance || "0") - parseFloat(data.settlementAmount || "0")).toFixed(2);
    const statuteCite = statute?.statuteCitation || "Uniform Commercial Code Section 3-311 and State Debt Law";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CREDITOR / OWNER OF CLAIM", value: `${creditor}, ${data.creditorAddress || ""}` },
          { label: "DEBTOR (ACCOUNT HOLDER)", value: `${debtor}, ${data.debtorAddress || ""}` },
          { label: "ACCOUNT / CLAIM NUMBER", value: `${data.accountNumber || "Account on File"}` },
          { label: "ORIGINAL CLAIMED BALANCE", value: `$${original} USD` },
          { label: "AGREED SETTLEMENT SUM", value: `$${settled} USD (Debt Reduction: $${savings} USD)` },
          { label: "SETTLEMENT DUE DATE", value: `${data.paymentDueDate || "Upon execution"} via ${data.paymentMethod || "Certified Funds"}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Accord and Satisfaction Agreement",
        type: "body",
        paragraphs: [
          `THIS DEBT SETTLEMENT AGREEMENT AND RELEASE is entered into on ${data.noticeDate || "the date of execution"}, by and between ${creditor} ("Creditor") and ${debtor} ("Debtor").`,
          `WHEREAS, Creditor asserts a monetary claim against Debtor in the disputed principal sum of $${original} USD under Account No. ${data.accountNumber || "specified above"}; and`,
          `WHEREAS, the parties desire to amicably compromise, settle, and satisfy said claim fully, finally, and forever pursuant to the principles of accord and satisfaction under Uniform Commercial Code Section 3-311 and state common law.`,
          `NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree that Creditor shall accept the total compromise sum of $${settled} USD as full, complete, and final satisfaction of the entire debt.`,
        ],
      },
      {
        title: "2. Payment Terms & Method of Remittance",
        type: "body",
        paragraphs: [
          `Debtor shall remit the agreed settlement amount of $${settled} USD on or before ${data.paymentDueDate || "the agreed due date"} via ${data.paymentMethod || "certified bank funds"}.`,
          `Upon timely receipt and bank clearance of said funds, the debt shall be deemed fully satisfied, discharged, and extinguished. Creditor covenants that Creditor shall not seek, demand, or collect any deficiency, remaining balance, interest, or collection fees from Debtor.`,
        ],
      },
      {
        title: "3. Credit Bureau Reporting & Tradeline Deletion (Pay-for-Delete)",
        type: "body",
        paragraphs: [
          data.creditReportingAction === "delete_tradeline"
            ? `Within thirty (30) calendar days of receiving cleared settlement funds, Creditor covenants and agrees to submit automated universal data (AUD) deletion requests to all major consumer credit reporting agencies (including Equifax, Experian, and TransUnion), requesting the complete and permanent deletion of any collection tradeline or negative reporting associated with this account.`
            : `Within thirty (30) calendar days of cleared settlement funds, Creditor shall report the account to all credit bureaus with which Creditor maintains data furnishing agreements as "Paid in Full / Settled in Full" with a $0.00 balance, removing any past due or delinquent status notation.`,
        ],
      },
      {
        title: "4. Full Mutual Release & Tax Notification (IRS Form 1099-C)",
        type: "body",
        paragraphs: [
          `Conditioned upon receipt and clearance of the settlement sum, Creditor completely releases, acquits, and forever discharges Debtor from all actions, claims, and demands arising from or related to the account. Creditor agrees never to sell, assign, transfer, or place the remaining discharged balance with any third-party debt buyer or collection agency.`,
          `Debtor acknowledges that if the forgiven principal debt exceeds $600.00 USD, Creditor may be required under federal tax regulations (Internal Revenue Code Section 6050P) to issue an IRS Form 1099-C (Cancellation of Debt). Debtor is advised to consult a tax advisor regarding any tax implications.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        type: "notary",
        paragraphs: [],
      },
    ];
  },
};
