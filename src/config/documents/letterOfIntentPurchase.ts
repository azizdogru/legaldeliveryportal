import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const letterOfIntentPurchaseConfig: DocumentConfig = {
  id: "letter-of-intent-purchase",
  slug: "letter-of-intent-purchase",
  title: "Letter of Intent to Purchase (Real Estate & Business LOI)",
  shortTitle: "Letter of Intent (LOI)",
  category: "Business & Corporate",
  description: "Commercial and residential Letter of Intent (LOI) establishing proposed purchase price, earnest money escrow deposit, inspection due diligence timeline, financing terms, and binding exclusivity covenants.",
  metaDescription: "Create an official Letter of Intent (LOI) to purchase real estate or a business. Sets purchase price, earnest deposit, inspection contingencies, and exclusivity period for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Acquisition LOI",
  iconName: "FileSignature",
  searchKeywords: [
    "letter of intent to purchase template",
    "real estate loi form pdf",
    "commercial property letter of intent",
    "business purchase letter of intent",
    "loi earnest money due diligence",
    "binding exclusivity letter of intent",
  ],
  features: [
    "Drafted for commercial real estate, residential parcels, or business asset acquisitions",
    "Sets earnest money deposit amount and licensed escrow holder parameters",
    "Specifies formal inspection contingency period and buyer walkaway rights",
    "Contains enforceable binding provisions for seller exclusivity and strict confidentiality",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "FL",
    buyerName: "Beacon Equity Partners, LLC",
    buyerAddress: "100 Biscayne Boulevard, Suite 2100, Miami, FL 33132",
    sellerName: "Highland Commercial Properties, Inc.",
    sellerAddress: "450 Brickell Avenue, Miami, FL 33131",
    targetProperty: "Commercial Retail Strip Center located at 7800 North Kendall Drive, Miami, FL 33156 (Folio: 30-4015-002-0010)",
    offeredPurchasePrice: "3850000.00",
    earnestMoneyDeposit: "100000.00",
    dueDiligenceDays: "30",
    exclusivityDays: "45",
    closingDaysAfterInspection: "30",
    escrowAgent: "First American Title Insurance Company",
  },
  steps: [
    {
      id: "loi_parties",
      title: "Buyer & Seller Identification",
      description: "Enter full legal names and addresses of prospective buyer and seller.",
      fields: [
        {
          name: "buyerName",
          label: "Buyer / Purchaser Legal Name",
          type: "text",
          placeholder: "e.g., Beacon Equity Partners, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "buyerAddress",
          label: "Buyer Mailing Address",
          type: "text",
          placeholder: "e.g., 100 Biscayne Boulevard, Suite 2100, Miami, FL 33132",
          required: true,
          gridCols: 2,
        },
        {
          name: "sellerName",
          label: "Seller Legal Name",
          type: "text",
          placeholder: "e.g., Highland Commercial Properties, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "sellerAddress",
          label: "Seller Mailing Address",
          type: "text",
          placeholder: "e.g., 450 Brickell Avenue, Miami, FL 33131",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "deal_terms",
      title: "Property, Valuation & Escrow Terms",
      description: "Enter target property details, proposed price, deposit, and timelines.",
      fields: [
        {
          name: "targetProperty",
          label: "Target Property or Asset Description",
          type: "textarea",
          placeholder: "e.g., Commercial Retail Strip Center located at 7800 North Kendall Drive, Miami, FL 33156 (Parcel ID / Folio)",
          required: true,
          gridCols: 1,
        },
        {
          name: "offeredPurchasePrice",
          label: "Proposed Purchase Price ($ USD)",
          type: "currency",
          placeholder: "e.g., 3850000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "earnestMoneyDeposit",
          label: "Earnest Money Escrow Deposit ($ USD)",
          type: "currency",
          placeholder: "e.g., 100000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "escrowAgent",
          label: "Title Company / Escrow Agent",
          type: "text",
          placeholder: "e.g., First American Title Insurance Company",
          required: true,
          gridCols: 2,
        },
        {
          name: "dueDiligenceDays",
          label: "Inspection / Due Diligence Period (Days)",
          type: "text",
          placeholder: "e.g., 30",
          required: true,
          gridCols: 2,
        },
        {
          name: "exclusivityDays",
          label: "Seller No-Shop Exclusivity Period (Days)",
          type: "text",
          placeholder: "e.g., 45",
          required: true,
          gridCols: 2,
        },
        {
          name: "closingDaysAfterInspection",
          label: "Closing Window Following Due Diligence (Days)",
          type: "text",
          placeholder: "e.g., 30",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "LOI Offer Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const buyer = data.buyerName || "Prospective Buyer";
    const seller = data.sellerName || "Prospective Seller";
    const price = parseFloat(data.offeredPurchasePrice || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const deposit = parseFloat(data.earnestMoneyDeposit || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const dueDiligence = data.dueDiligenceDays || "30";
    const exclusivity = data.exclusivityDays || "45";
    const statuteCite = statute?.statuteCitation || "Commercial Contract Law and Escrow Provisions";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT", value: "LETTER OF INTENT TO PURCHASE (ACQUISITION LOI)" },
          { label: "BUYER / OFFEROR", value: `${buyer}` },
          { label: "SELLER / OWNER", value: `${seller}` },
          { label: "TARGET ASSET", value: `${data.targetProperty || "Property on file"}` },
          { label: "PROPOSED PRICE", value: `$${price} USD` },
          { label: "ESCROW DEPOSIT", value: `$${deposit} USD (${data.escrowAgent || "Escrow Holder"})` },
          { label: "DUE DILIGENCE", value: `${dueDiligence} Calendar Days from Execution` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Intent & Proposed Purchase Price",
        type: "body",
        paragraphs: [
          `This Letter of Intent ("LOI"), dated ${data.noticeDate || "the date of execution"}, sets forth the basic preliminary terms and conditions pursuant to which ${buyer} ("Buyer") offers to purchase from ${seller} ("Seller") the subject real property or business assets described as: ${data.targetProperty || "the target property"}.`,
          `Purchase Price: The total proposed gross purchase price shall be $${price} USD, payable in cash or immediate certified funds at closing, subject to standard credits, title adjustments, and prorations.`,
        ],
      },
      {
        title: "2. Earnest Money Deposit & Escrow",
        type: "body",
        paragraphs: [
          `Escrow Deposit: Within three (3) business days following the mutual execution of a definitive Purchase and Sale Agreement, Buyer shall deposit $${deposit} USD into an interest-bearing escrow account maintained by ${data.escrowAgent || "a licensed title insurance agent"}.`,
          `Refundability: The earnest money deposit shall be fully refundable to Buyer in the event Buyer terminates negotiations or cancels the transaction prior to the expiration of the Due Diligence Period for any reason or no reason.`,
        ],
      },
      {
        title: "3. Due Diligence Inspection & Closing",
        type: "body",
        paragraphs: [
          `Inspection Window: Buyer and its authorized architects, engineers, environmental consultants, and accountants shall have ${dueDiligence} calendar days from agreement signing to conduct all physical, environmental, zoning, and financial feasibility audits. Seller shall provide full access to books, records, and tenant leases.`,
          `Closing: Closing of the purchase transaction shall take place within ${data.closingDaysAfterInspection || "30"} calendar days following satisfaction or formal written waiver of Buyer's due diligence contingencies.`,
        ],
      },
      {
        title: "4. Exclusivity & Binding Covenants",
        type: "body",
        paragraphs: [
          `Binding Exclusivity: In consideration of the time, legal expense, and effort expended by Buyer, Seller agrees that for a period of ${exclusivity} calendar days following execution of this LOI, Seller shall not solicit, encourage, initiate, or engage in any negotiations or discussions with any third party regarding the sale, transfer, or refinancing of the subject property.`,
          `Non-Binding Nature: Except for the binding covenants of Exclusivity, Confidentiality, and Governing Jurisdiction, this LOI represents a non-binding statement of intent and is subject to the drafting, negotiation, and formal execution of a definitive Purchase and Sale Agreement.`,
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
