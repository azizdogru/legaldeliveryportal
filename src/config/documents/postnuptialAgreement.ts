import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const postnuptialAgreementConfig: DocumentConfig = {
  id: "postnuptial-agreement",
  slug: "postnuptial-agreement",
  title: "Postnuptial Agreement (Postmarital Property & Asset Agreement)",
  shortTitle: "Postnuptial Agreement",
  category: "Family & Personal",
  description: "Comprehensive statutory postmarital contract executed by legally married spouses to define separate and marital property rights, allocate existing and future debts, specify spousal maintenance terms, and avoid court disputes during marriage or upon dissolution.",
  metaDescription: "Create an enforceable Postnuptial Agreement. Establishes separate property rights, marital debt allocation, and spousal support terms during marriage across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Postmarital Contract",
  iconName: "HeartHandshake",
  searchKeywords: [
    "postnuptial agreement template pdf",
    "postmarital property agreement form",
    "married couple asset separation agreement",
    "postnuptial debt allocation contract",
    "separate property agreement during marriage",
    "spousal maintenance waiver postnup",
  ],
  features: [
    "Executed by legally married spouses intending to remain married while clarifying property ownership",
    "Itemizes separate real estate, business equity, and investment accounts to remain free from marital claims",
    "Allocates separate debts, credit cards, and business liabilities with mutual indemnification",
    "Conforms to family court enforceability standards requiring full financial disclosure and notary jurat",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    marriageDate: "2018-09-15",
    marriageLocation: "San Diego, California",
    spouse1Name: "William Robert Hayes",
    spouse1Address: "1280 Torrey Pines Road, La Jolla, CA 92037",
    spouse2Name: "Claire Alexandra Hayes",
    spouse2Address: "1280 Torrey Pines Road, La Jolla, CA 92037",
    spouse1SeparateProperty: "Commercial dental practice equity in Hayes Dental Group, Inc. and Charles Schwab retirement account ending in #4012.",
    spouse2SeparateProperty: "Residential real property inherited at 450 Ocean View Drive, Del Mar, CA and Vanguard brokerage account ending in #8921.",
    maritalDebtAllocation: "Each spouse assumes sole responsibility for debts incurred in their individual name; neither shall encumber the separate property of the other.",
    spousalSupportTerms: "In the event of dissolution, neither spouse shall seek temporary or permanent spousal support (alimony), each possessing independent earning capacity.",
  },
  steps: [
    {
      id: "spousal_parties",
      title: "Spouses & Marriage Details",
      description: "Enter identifying details for both spouses and their legal marriage.",
      fields: [
        {
          name: "spouse1Name",
          label: "First Spouse Full Legal Name",
          type: "text",
          placeholder: "e.g., William Robert Hayes",
          required: true,
          gridCols: 2,
        },
        {
          name: "spouse2Name",
          label: "Second Spouse Full Legal Name",
          type: "text",
          placeholder: "e.g., Claire Alexandra Hayes",
          required: true,
          gridCols: 2,
        },
        {
          name: "marriageDate",
          label: "Date of Marriage",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "marriageLocation",
          label: "City & State Where Married",
          type: "text",
          placeholder: "e.g., San Diego, California",
          required: true,
          gridCols: 2,
        },
        {
          name: "spouse1Address",
          label: "Primary Marital Residence Address",
          type: "text",
          placeholder: "e.g., 1280 Torrey Pines Road, La Jolla, CA 92037",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "property_division",
      title: "Separate Property & Debt Allocation",
      description: "Enumerate separate assets, business interests, and debt responsibilities.",
      fields: [
        {
          name: "spouse1SeparateProperty",
          label: "First Spouse Designated Separate Property",
          type: "textarea",
          placeholder: "List specific businesses, bank accounts, retirement plans, real estate...",
          required: true,
          gridCols: 1,
        },
        {
          name: "spouse2SeparateProperty",
          label: "Second Spouse Designated Separate Property",
          type: "textarea",
          placeholder: "List specific inherited real estate, investments, bank accounts...",
          required: true,
          gridCols: 1,
        },
        {
          name: "maritalDebtAllocation",
          label: "Debt Responsibility & Credit Protection",
          type: "textarea",
          placeholder: "e.g., Each spouse assumes individual credit cards, business lines of credit...",
          required: true,
          gridCols: 1,
        },
        {
          name: "spousalSupportTerms",
          label: "Spousal Support / Maintenance Waiver Terms",
          type: "textarea",
          placeholder: "e.g., Mutual waiver of spousal support, or specific agreed maintenance schedule...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Postnuptial Execution Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const s1 = data.spouse1Name || "First Spouse";
    const s2 = data.spouse2Name || "Second Spouse";
    const mDate = data.marriageDate || "Date on file";
    const statuteCite = statute?.statuteCitation || "Uniform Premarital and Marital Agreements Act & Family Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CONTRACT TYPE", value: "STATUTORY POSTNUPTIAL (POSTMARITAL) AGREEMENT" },
          { label: "FIRST SPOUSE", value: `${s1}` },
          { label: "SECOND SPOUSE", value: `${s2}` },
          { label: "DATE & PLACE OF MARRIAGE", value: `${mDate} in ${data.marriageLocation || "State on file"}` },
          { label: "MARITAL RESIDENCE", value: `${data.spouse1Address || "Residence on file"}` },
          { label: "STATUTORY CONTEXT", value: "Valid and Binding During Marriage and Upon Dissolution" },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Intent of the Spouses & Consideration",
        type: "body",
        paragraphs: [
          `THIS POSTNUPTIAL AGREEMENT is entered into as of ${data.noticeDate || "the date of execution"}, by and between ${s1} and ${s2} (collectively the "Spouses").`,
          `Marriage Status: The Spouses were lawfully married on ${mDate} and presently reside together as married spouses. The Spouses enter into this Agreement with the shared desire and intent to strengthen and preserve their marriage by fixing, settling, and determining their respective property rights and obligations.`,
          `Consideration: The consideration for this Agreement consists of the mutual covenants, releases, and waivers contained herein, and the mutual desire to avoid future litigation regarding marital assets.`,
        ],
      },
      {
        title: "2. Designation of Separate Property",
        type: "body",
        paragraphs: [
          `First Spouse Separate Property: All property, real or personal, listed as First Spouse's separate property: "${data.spouse1SeparateProperty || "Designated separate assets on file"}", together with all rents, issues, profits, and appreciation thereon, shall remain the sole and exclusive separate property of ${s1}, free from any community property or equitable distribution claims of Second Spouse.`,
          `Second Spouse Separate Property: All property, real or personal, listed as Second Spouse's separate property: "${data.spouse2SeparateProperty || "Designated separate assets on file"}", together with all proceeds and capital appreciation thereon, shall remain the sole and exclusive separate property of ${s2}, free from any community property or equitable claims of First Spouse.`,
        ],
      },
      {
        title: "3. Debt Allocation, Support Terms & Estate Elective Share Waiver",
        type: "body",
        paragraphs: [
          `Debt Obligations: ${data.maritalDebtAllocation || "Each spouse agrees to pay and indemnify the other against all debts, liabilities, and obligations incurred individually by said spouse."}`,
          `Spousal Support Terms: ${data.spousalSupportTerms || "The Spouses mutually waive and release all claims to spousal maintenance, support, or alimony in the event of divorce or legal separation."}`,
          `Waiver of Elective Share: Each Spouse hereby waives and relinquishes all statutory rights to inherit from the estate of the other under state probate intestacy laws, elective share provisions, or family allowances, preserving the right of each Spouse to direct the disposition of their separate property by Last Will and Testament.`,
        ],
      },
      {
        title: "4. Full Disclosure & Voluntary Execution",
        type: "body",
        paragraphs: [
          `Full Financial Disclosure: Each Spouse affirms that they have provided the other with a full, fair, and reasonable written disclosure of all assets, debts, and income, and that neither Spouse has concealed any material property interest.`,
          `Independent Counsel: Each Spouse acknowledges having had ample opportunity to consult with independent legal counsel of their own choosing, and confirms this Agreement is executed voluntarily, knowingly, and without duress, coercion, or undue influence pursuant to ${statuteCite}.`,
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
