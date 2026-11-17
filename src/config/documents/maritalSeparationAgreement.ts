import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const maritalSeparationAgreementConfig: DocumentConfig = {
  id: "marital-separation-agreement",
  slug: "marital-separation-agreement",
  title: "Marital Separation Agreement (Property & Spousal Settlement)",
  shortTitle: "Marital Separation Agreement",
  category: "Family & Personal",
  description: "Comprehensive out-of-court legal separation contract dividing marital real estate, financial accounts, vehicles, and liabilities, establishing spousal maintenance and independent living covenants.",
  metaDescription: "Generate a state-compliant Marital Separation Agreement. Legally divides marital property, allocates debts, and sets spousal support terms for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Court-Incorporate Ready",
  iconName: "Split",
  searchKeywords: [
    "marital separation agreement template",
    "legal separation contract form pdf",
    "divorce property settlement agreement",
    "spousal separation and asset division",
    "out of court separation agreement",
    "uncontested divorce settlement form",
  ],
  features: [
    "Comprehensive division of marital real estate, bank accounts, retirement funds, and vehicles",
    "Establishes precise debt allocations and mutual hold-harmless indemnification covenants",
    "Includes non-interference living apart covenants and formal waiver of future estate claims",
    "Formulated for formal submission and incorporation into any subsequent court decree of divorce",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "FL",
    spouse1Name: "",
    spouse1Address: "",
    spouse2Name: "",
    spouse2Address: "",
    marriageDate: "",
    separationDate: new Date().toISOString().split("T")[0],
    maritalResidenceDisposition: "sell_and_divide",
    personalPropertyDivision: "Each spouse retains the tangible personal property, furniture, vehicles, and clothing currently in their possession.",
    spousalSupportTerms: "Neither party shall pay spousal support or alimony to the other, each being self-supporting.",
    debtAllocation: "Each party assumes and covenants to pay all debts and credit obligations incurred in their individual name.",
  },
  steps: [
    {
      id: "spouses_timeline",
      title: "Spouses & Marital Dates",
      description: "Enter identifying details for both spouses, marriage date, and date of physical separation.",
      fields: [
        {
          name: "spouse1Name",
          label: "Spouse #1 Full Legal Name",
          type: "text",
          placeholder: "e.g., Jonathan Robert Reynolds",
          required: true,
          gridCols: 1,
        },
        {
          name: "spouse1Address",
          label: "Spouse #1 Current Residence Address",
          type: "text",
          placeholder: "e.g., 1400 Brickell Avenue, Suite 1200, Miami, FL 33131",
          required: true,
          gridCols: 1,
        },
        {
          name: "spouse2Name",
          label: "Spouse #2 Full Legal Name",
          type: "text",
          placeholder: "e.g., Sarah Elizabeth Reynolds",
          required: true,
          gridCols: 1,
        },
        {
          name: "spouse2Address",
          label: "Spouse #2 Current Residence Address",
          type: "text",
          placeholder: "e.g., 850 Ocean Drive, Apt 4B, Miami Beach, FL 33139",
          required: true,
          gridCols: 1,
        },
        {
          name: "marriageDate",
          label: "Date of Marriage",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "separationDate",
          label: "Date of Physical Separation",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "property_settlement",
      title: "Property, Residence & Support",
      description: "Define real estate disposition, personal assets, debts, and spousal support.",
      fields: [
        {
          name: "maritalResidenceDisposition",
          label: "Marital Real Estate Disposition",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Sell marital home and divide net proceeds equally (50/50)", value: "sell_and_divide" },
            { label: "Spouse 1 retains home and refinances/buys out Spouse 2 equity", value: "spouse1_retains" },
            { label: "Spouse 2 retains home and refinances/buys out Spouse 1 equity", value: "spouse2_retains" },
            { label: "No marital real property owned (rental lease terminated or surrendered)", value: "no_real_property" },
          ],
        },
        {
          name: "spousalSupportTerms",
          label: "Spousal Support / Alimony Agreement",
          type: "text",
          placeholder: "e.g., Mutual waiver of all alimony, or Spouse 1 pays Spouse 2 $1,500/month for 24 months",
          required: true,
          gridCols: 1,
        },
        {
          name: "personalPropertyDivision",
          label: "Personal Property & Bank Accounts Division",
          type: "textarea",
          placeholder: "e.g., Each party retains personal items and bank accounts in their respective names...",
          required: true,
          gridCols: 1,
        },
        {
          name: "debtAllocation",
          label: "Marital & Individual Debt Allocation",
          type: "text",
          placeholder: "e.g., Each party assumes all debts incurred in their own name and indemnifies the other",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Agreement Signed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const s1 = data.spouse1Name || "Spouse 1";
    const s2 = data.spouse2Name || "Spouse 2";
    const statuteCite = statute?.statuteCitation || "State Domestic Relations and Marital Property Settlement Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "SETTLEMENT TITLE", value: "MARITAL SEPARATION & PROPERTY SETTLEMENT AGREEMENT" },
          { label: "SPOUSE #1", value: `${s1}, ${data.spouse1Address || ""}` },
          { label: "SPOUSE #2", value: `${s2}, ${data.spouse2Address || ""}` },
          { label: "DATE OF MARRIAGE", value: `${data.marriageDate || "Marriage Date"}` },
          { label: "SEPARATION DATE", value: `${data.separationDate || "Separation Date"}` },
          { label: "REAL ESTATE DISPOSITION", value: data.maritalResidenceDisposition === "sell_and_divide" ? "Sell marital home & divide net equity 50/50" : "Retained per equity buyout / No real property" },
          { label: "SPOUSAL SUPPORT", value: `${data.spousalSupportTerms || "Mutual waiver of maintenance"}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Separation & Independent Living Covenant",
        type: "body",
        paragraphs: [
          `THIS MARITAL SEPARATION AGREEMENT is entered into on ${data.noticeDate || "the date of execution"}, by and between ${s1} and ${s2}. The Parties were lawfully married on ${data.marriageDate || "the marriage date"}, and due to irreconcilable marital differences, separated on ${data.separationDate || "the separation date"}.`,
          `Living Apart: The Parties shall continue to live separate and apart. Neither Party shall disturb, harass, molest, or interfere with the peace, liberty, or privacy of the other, or assert any marital consortium rights. Each Party may reside, engage in commerce, and conduct personal affairs as though unmarried.`,
        ],
      },
      {
        title: "2. Division of Marital Real Estate & Personal Property",
        type: "body",
        paragraphs: [
          `Real Property Disposition: Concerning the marital real estate: ${data.maritalResidenceDisposition === "sell_and_divide" ? "The marital residence shall be placed on the open market for sale. Upon closing, all mortgages, broker commissions, and closing costs shall be paid, and remaining net equity divided equally between the Parties." : "One party shall retain the residence and refinance all encumbrances to remove the other party from liability."}`,
          `Personal Property: ${data.personalPropertyDivision || "Each Party shall retain all bank accounts, vehicles, retirement accounts, furniture, and personal effects currently in their physical possession or title."}`,
        ],
      },
      {
        title: "3. Debts, Spousal Support & Court Incorporation",
        type: "body",
        paragraphs: [
          `Debt Responsibility: ${data.debtAllocation || "Each Party covenants to pay all debts incurred in their respective names and agrees to hold harmless and indemnify the other Party from any liability thereon."}`,
          `Spousal Support / Alimony: ${data.spousalSupportTerms || "The Parties mutually waive and release all claims to temporary or permanent alimony, maintenance, or spousal support."}`,
          `Court Decree Incorporation: In the event of any subsequent action for divorce or dissolution in ${statute?.courtJurisdiction || "the competent Court"}, this Agreement shall be submitted to the court and incorporated into any final judgment, but shall survive the decree as an independent contractual covenant.`,
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
