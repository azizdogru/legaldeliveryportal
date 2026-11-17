import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const debtValidationLetterConfig: DocumentConfig = {
  id: "debt-validation-letter",
  slug: "debt-validation-letter",
  title: "Debt Validation Letter (FDCPA 15 U.S.C. 1692g Dispute)",
  shortTitle: "Debt Validation Letter",
  category: "Financial & Loans",
  description: "Official statutory dispute letter under the Fair Debt Collection Practices Act (FDCPA) halting collection activities and demanding debt collectors prove account accuracy, chain of assignment, and state licensing.",
  metaDescription: "Generate a federal FDCPA Debt Validation Letter under 15 U.S.C. 1692g. Stops collector calls and forces proof of balance and ownership for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Federal FDCPA Notice",
  iconName: "Shield",
  searchKeywords: [
    "debt validation letter template pdf",
    "fdcpa 15 usc 1692g dispute letter",
    "stop debt collector harassment notice",
    "debt verification demand letter",
    "dispute collection agency debt form",
    "debt validation request within 30 days",
  ],
  features: [
    "Statutory dispute invoke within 30 days under federal Fair Debt Collection Practices Act (FDCPA)",
    "Legally forces collector to immediately cease all collection efforts until full verification is mailed",
    "Demands chain of title assignment, complete ledger accounting, and original creditor contract",
    "Instructs collector to communicate exclusively in writing, barring telephone calls to consumer and workplace",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    consumerName: "",
    consumerAddress: "",
    consumerPhone: "",
    collectorName: "",
    collectorAddress: "",
    accountReferenceNumber: "COL-984210",
    allegedDebtAmount: "3450.00",
    originalCreditorName: "Citibank N.A.",
    dateOfCollectorNotice: new Date().toISOString().split("T")[0],
  },
  steps: [
    {
      id: "consumer_collector",
      title: "Consumer & Collection Agency",
      description: "Enter your contact details and the collection agency information.",
      fields: [
        {
          name: "consumerName",
          label: "Consumer Full Legal Name",
          type: "text",
          placeholder: "e.g., Jonathan David Reynolds",
          required: true,
          gridCols: 1,
        },
        {
          name: "consumerAddress",
          label: "Consumer Current Mailing Address",
          type: "text",
          placeholder: "e.g., 7500 San Felipe Street, Suite 400, Houston, TX 77063",
          required: true,
          gridCols: 2,
        },
        {
          name: "consumerPhone",
          label: "Consumer Phone Number",
          type: "text",
          placeholder: "e.g., (555) 321-9876",
          required: true,
          gridCols: 2,
        },
        {
          name: "collectorName",
          label: "Collection Agency / Debt Buyer Name",
          type: "text",
          placeholder: "e.g., Midland Credit Management Inc.",
          required: true,
          gridCols: 1,
        },
        {
          name: "collectorAddress",
          label: "Collection Agency Mailing Address",
          type: "text",
          placeholder: "e.g., PO Box 939069, San Diego, CA 92193",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "debt_dispute_data",
      title: "Alleged Debt & Account Details",
      description: "Enter the account number, original creditor, and disputed balance.",
      fields: [
        {
          name: "accountReferenceNumber",
          label: "Collection Account / File Reference Number",
          type: "text",
          placeholder: "e.g., MCM-89421098 or Agency Reference #",
          required: true,
          gridCols: 2,
        },
        {
          name: "allegedDebtAmount",
          label: "Alleged Amount Demanded ($ USD)",
          type: "currency",
          placeholder: "e.g., 3450.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "originalCreditorName",
          label: "Name of Alleged Original Creditor",
          type: "text",
          placeholder: "e.g., Citibank N.A., Synchrony Bank, Chase",
          required: true,
          gridCols: 2,
        },
        {
          name: "dateOfCollectorNotice",
          label: "Date of Collector's Initial Written Notice",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Date Dispute Letter Sent",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const consumer = data.consumerName || "Consumer";
    const collector = data.collectorName || "Collection Agency";
    const balance = parseFloat(data.allegedDebtAmount || "0").toFixed(2);
    const original = data.originalCreditorName || "Alleged Original Creditor";
    const refNum = data.accountReferenceNumber || "ON FILE";
    const statuteCite = statute?.statuteCitation || "Fair Debt Collection Practices Act (15 U.S.C. Section 1692g)";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE DOCUMENT", value: "STATUTORY DEBT VALIDATION DEMAND (15 U.S.C. SECTION 1692g)" },
          { label: "FROM CONSUMER", value: `${consumer}, ${data.consumerAddress || ""}` },
          { label: "TO DEBT COLLECTOR", value: `${collector}, ${data.collectorAddress || ""}` },
          { label: "AGENCY ACCOUNT NUMBER", value: `${refNum}` },
          { label: "ALLEGED ORIGINAL CREDITOR", value: `${original}` },
          { label: "ALLEGED BALANCE CLAIMED", value: `$${balance} USD` },
          { label: "DISPUTE TIMING", value: `Disputed within 30 days of initial notice (${data.dateOfCollectorNotice || "Initial contact"})` },
          { label: "FEDERAL STATUTORY BASIS", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Formal Dispute of Alleged Debt & Cease Activity Demand",
        type: "body",
        paragraphs: [
          `PLEASE TAKE NOTICE that I am writing in formal response to your collection communication concerning the alleged debt referenced above. Pursuant to the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. Section 1692g(b), I hereby formally DISPUTE THE VALIDITY of this alleged debt in its entirety.`,
          `This letter serves as my timely written request for verification and competent legal validation of this alleged debt. Under federal law, you are legally required to IMMEDIATELY CEASE AND DESIST all collection activities, including reporting or updating information on my credit reports, until you have mailed me competent verification of the debt.`,
        ],
      },
      {
        title: "2. Specific Verification Documentation Demanded",
        type: "body",
        paragraphs: [
          `To validate this debt, please provide:`,
          `(a) Complete Accounting Ledger: An itemized breakdown of the principal debt, contractual interest, collection charges, and late fees, showing how the alleged sum of $${balance} USD was calculated from a zero balance.`,
          `(b) Original Agreement: A legible copy of the original signed credit agreement, promissory note, or contract establishing my legal obligation to the original creditor (${original}).`,
          `(c) Chain of Title & Assignment: Documentary proof demonstrating complete, unbroken chain of assignment and legal title transferring the debt from ${original} to ${collector}.`,
          `(d) State Licensing Verification: Evidence that your agency is currently licensed and bonded to collect consumer debts in the State of ${statute?.stateName || "my state"}.`,
        ],
      },
      {
        title: "3. Directives Regarding Communication & Telephone Harassment",
        type: "body",
        paragraphs: [
          `Under 15 U.S.C. Section 1692c, you are instructed that it is inconvenient for me to receive telephone calls regarding this matter at any time, whether at home, on my mobile phone, or at my place of employment.`,
          `ALL FUTURE COMMUNICATIONS MUST BE IN WRITING delivered to my mailing address set forth above. Any continued telephonic contact or reporting of this unverified debt to consumer reporting agencies (Equifax, Experian, TransUnion) shall constitute a willful violation of the FDCPA, subjecting your agency to statutory civil damages of $1,000 per violation, actual damages, and attorney fees under 15 U.S.C. Section 1692k.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        title: "Certificate of Certified Mailing",
        type: "body",
        paragraphs: [
          `I certify that on ${data.noticeDate || "the date below"}, this Debt Validation Demand was transmitted via USPS Certified Mail Return Receipt Requested to the designated collection agency address.`,
        ],
      },
    ];
  },
};
