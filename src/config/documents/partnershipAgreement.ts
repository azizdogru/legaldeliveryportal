import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const partnershipAgreementConfig: DocumentConfig = {
  id: "partnership-agreement",
  slug: "partnership-agreement",
  title: "General Partnership Agreement (Business Partnership)",
  shortTitle: "Partnership Agreement",
  category: "Business & Corporate",
  description: "Comprehensive statutory general partnership contract governing capital contributions, profit and loss allocations, management voting, partner withdrawal, and buy-sell buyout provisions under RUPA.",
  metaDescription: "Generate a state-compliant General Partnership Agreement under the Revised Uniform Partnership Act (RUPA). Sets profit shares, management voting, and buyout terms for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "RUPA Statutory Form",
  iconName: "Briefcase",
  searchKeywords: [
    "general partnership agreement template",
    "business partnership contract pdf",
    "rupa general partnership agreement",
    "profit sharing partnership agreement",
    "partnership buy sell agreement form",
    "small business partnership template",
  ],
  features: [
    "Conforms to the Revised Uniform Partnership Act (RUPA) adopted nationwide",
    "Itemizes initial cash and property capital contributions and ownership percentage shares",
    "Defines management voting rights, major expenditure thresholds, and check-signing powers",
    "Includes ironclad buy-sell buyout mechanics triggered upon partner retirement, disability, or death",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "IL",
    partnershipName: "Apex Logistics Partners",
    principalOffice: "300 South Wacker Drive, Suite 1400, Chicago, IL 60606",
    businessPurpose: "Commercial freight brokerage, transportation logistics, and supply chain advisory services.",
    partner1Name: "Michael Thomas Clark",
    partner1Contribution: "25000.00",
    partner1Percentage: "50",
    partner2Name: "Daniel Joseph Evans",
    partner2Contribution: "25000.00",
    partner2Percentage: "50",
    bankingSignatureThreshold: "5000.00",
    buyoutValuationFormula: "Book value of assets plus 1x average net annual earnings over preceding 24 months.",
  },
  steps: [
    {
      id: "partnership_meta",
      title: "Partnership Name & Purpose",
      description: "Enter company name, principal office address, and primary commercial activity.",
      fields: [
        {
          name: "partnershipName",
          label: "Partnership Legal Commercial Name",
          type: "text",
          placeholder: "e.g., Apex Logistics Partners",
          required: true,
          gridCols: 1,
        },
        {
          name: "principalOffice",
          label: "Principal Place of Business",
          type: "text",
          placeholder: "e.g., 300 South Wacker Drive, Suite 1400, Chicago, IL 60606",
          required: true,
          gridCols: 1,
        },
        {
          name: "businessPurpose",
          label: "Primary Commercial Purpose",
          type: "text",
          placeholder: "e.g., Commercial freight brokerage, transportation logistics, and advisory services",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "partners_capital",
      title: "Partners, Capital & Voting",
      description: "Define partner names, capital contributions, ownership shares, and bank check rules.",
      fields: [
        {
          name: "partner1Name",
          label: "Partner #1 Full Legal Name",
          type: "text",
          placeholder: "e.g., Michael Thomas Clark",
          required: true,
          gridCols: 1,
        },
        {
          name: "partner1Contribution",
          label: "Partner #1 Initial Capital Contribution ($ USD)",
          type: "currency",
          placeholder: "e.g., 25000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "partner1Percentage",
          label: "Partner #1 Partnership Interest (%)",
          type: "text",
          placeholder: "e.g., 50",
          required: true,
          gridCols: 2,
        },
        {
          name: "partner2Name",
          label: "Partner #2 Full Legal Name",
          type: "text",
          placeholder: "e.g., Daniel Joseph Evans",
          required: true,
          gridCols: 1,
        },
        {
          name: "partner2Contribution",
          label: "Partner #2 Initial Capital Contribution ($ USD)",
          type: "currency",
          placeholder: "e.g., 25000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "partner2Percentage",
          label: "Partner #2 Partnership Interest (%)",
          type: "text",
          placeholder: "e.g., 50",
          required: true,
          gridCols: 2,
        },
        {
          name: "bankingSignatureThreshold",
          label: "Dual Signature Check Signing Threshold ($ USD)",
          type: "currency",
          placeholder: "e.g., 5000.00 (Checks exceeding this require both partner signatures)",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Effective Date of Partnership",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const p1 = data.partner1Name || "Partner 1";
    const p1Pct = data.partner1Percentage || "50";
    const p1Cap = parseFloat(data.partner1Contribution || "0").toFixed(2);
    const p2 = data.partner2Name || "Partner 2";
    const p2Pct = data.partner2Percentage || "50";
    const p2Cap = parseFloat(data.partner2Contribution || "0").toFixed(2);
    const firmName = data.partnershipName || "Partnership Firm";
    const statuteCite = statute?.statuteCitation || "Revised Uniform Partnership Act (RUPA)";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "GOVERNING CONTRACT", value: "GENERAL PARTNERSHIP AGREEMENT (RUPA)" },
          { label: "PARTNERSHIP FIRM", value: `${firmName}` },
          { label: "PRINCIPAL OFFICE", value: `${data.principalOffice || "Office on file"}` },
          { label: "BUSINESS PURPOSE", value: `${data.businessPurpose || "Lawful commercial business"}` },
          { label: "PARTNER #1 EQUITY", value: `${p1} (${p1Pct}%, $${p1Cap} USD capital)` },
          { label: "PARTNER #2 EQUITY", value: `${p2} (${p2Pct}%, $${p2Cap} USD capital)` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Formation, Term & Commercial Purpose",
        type: "body",
        paragraphs: [
          `THIS PARTNERSHIP AGREEMENT is made effective as of ${data.noticeDate || "the date of execution"}, by and between ${p1} and ${p2} (collectively the "Partners").`,
          `Organization: The Partners form a general partnership pursuant to the Revised Uniform Partnership Act (RUPA) as enacted in ${statute?.stateName || "the State"}. The firm shall operate under the legal name: ${firmName}. The partnership shall continue perpetually until dissolved pursuant to agreement or by operation of law.`,
          `Purpose: The primary purpose of the Partnership is: "${data.businessPurpose || "Lawful commercial enterprise"}".`,
        ],
      },
      {
        title: "2. Capital Contributions, Capital Accounts & Profit Allocation",
        type: "body",
        paragraphs: [
          `Capital Accounts: Partner 1 has contributed $${p1Cap} USD (${p1Pct}% interest) and Partner 2 has contributed $${p2Cap} USD (${p2Pct}% interest). No Partner shall be required to make additional capital contributions unless mutually agreed in writing.`,
          `Profits & Losses: Net profits and net losses of the Partnership shall be divided and borne by the Partners in direct proportion to their respective partnership percentage interests. Regular draws and profit distributions shall be made at such intervals as the Partners unanimously determine.`,
        ],
      },
      {
        title: "3. Management Voting, Banking & Buy-Sell Covenants",
        type: "body",
        paragraphs: [
          `Management & Voting: Each Partner shall participate equally in the management and conduct of partnership business. Ordinary business decisions require majority consent. Extraordinary transactions (borrowing money, purchasing real estate, entering leases over $10,000, or selling partnership assets) require unanimous written consent of all Partners.`,
          `Banking: All partnership funds shall be deposited in dedicated bank accounts. Check disbursements or withdrawals exceeding $${parseFloat(data.bankingSignatureThreshold || "5000").toFixed(2)} USD require the joint signatures of both Partners.`,
          `Buy-Sell Buyout: Upon the death, disability, bankruptcy, or voluntary withdrawal of either Partner, the remaining Partner shall have the primary right and option to purchase the departing Partner's interest at a valuation determined as follows: "${data.buyoutValuationFormula || "Book value plus 1x net annual profits"}".`,
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
