import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const prenuptialAgreementConfig: DocumentConfig = {
  id: "prenuptial-agreement",
  slug: "prenuptial-agreement",
  title: "Prenuptial Agreement (Premarital Financial Contract)",
  shortTitle: "Prenuptial Agreement",
  category: "Family & Personal",
  description: "Comprehensive statutory prenuptial contract defining separate vs marital property, debt liabilities, spousal support terms, and inheritance rights under the Uniform Premarital Agreement Act (UPAA).",
  metaDescription: "Generate a state-compliant Prenuptial Agreement under the Uniform Premarital Agreement Act (UPAA). Protects separate assets and defines spousal support for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "UPAA Statutory Standards",
  iconName: "HeartHandshake",
  searchKeywords: [
    "prenuptial agreement template pdf",
    "premarital contract form",
    "upaa prenuptial agreement form",
    "protect separate assets prenuptial",
    "spousal support waiver prenuptial",
    "notarized prenuptial agreement document",
  ],
  features: [
    "Conforms to the Uniform Premarital Agreement Act (UPAA) and state family codes",
    "Clearly demarcates separate pre-marital property, business equity, and real estate",
    "Includes mutual waivers of spousal support / alimony in event of dissolution",
    "Features recitals of full financial disclosure, independent counsel advice, and voluntary execution",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "NY",
    spouse1Name: "",
    spouse1Address: "",
    spouse2Name: "",
    spouse2Address: "",
    anticipatedMarriageDate: "",
    spouse1AssetsSummary: "Real estate in Westchester ($650k equity), brokerage accounts ($350k), and ownership interest in consulting firm.",
    spouse2AssetsSummary: "Retirement 401(k) accounts ($180k), vehicle ($25k), and savings accounts ($45k).",
    spousalSupportPolicy: "mutual_waiver",
    debtLiabilityPolicy: "separate_debts_remain_separate",
  },
  steps: [
    {
      id: "parties_marriage",
      title: "Prospective Spouses & Wedding Date",
      description: "Enter identifying details for both prospective spouses and planned marriage date.",
      fields: [
        {
          name: "spouse1Name",
          label: "Prospective Spouse #1 Full Legal Name",
          type: "text",
          placeholder: "e.g., Alexander David Sterling",
          required: true,
          gridCols: 1,
        },
        {
          name: "spouse1Address",
          label: "Spouse #1 Current Legal Address",
          type: "text",
          placeholder: "e.g., 450 Park Avenue, Apt 18B, New York, NY 10022",
          required: true,
          gridCols: 1,
        },
        {
          name: "spouse2Name",
          label: "Prospective Spouse #2 Full Legal Name",
          type: "text",
          placeholder: "e.g., Victoria Christine Howard",
          required: true,
          gridCols: 1,
        },
        {
          name: "spouse2Address",
          label: "Spouse #2 Current Legal Address",
          type: "text",
          placeholder: "e.g., 120 Central Park South, New York, NY 10019",
          required: true,
          gridCols: 1,
        },
        {
          name: "anticipatedMarriageDate",
          label: "Anticipated Date of Marriage",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Date Agreement Executed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "financial_assets",
      title: "Financial Disclosures & Covenants",
      description: "Summarize separate assets, debt allocations, and spousal support covenants.",
      fields: [
        {
          name: "spouse1AssetsSummary",
          label: "Spouse #1 Separate Assets & Net Worth Summary",
          type: "textarea",
          placeholder: "e.g., Real estate equity ($500k), investment accounts ($300k), business equity...",
          required: true,
          gridCols: 1,
        },
        {
          name: "spouse2AssetsSummary",
          label: "Spouse #2 Separate Assets & Net Worth Summary",
          type: "textarea",
          placeholder: "e.g., 401(k) accounts ($200k), personal property ($50k), checking/savings...",
          required: true,
          gridCols: 1,
        },
        {
          name: "spousalSupportPolicy",
          label: "Spousal Support / Alimony Covenant",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Mutual Waiver of Spousal Support / Maintenance", value: "mutual_waiver" },
            { label: "Limited Support Based on Duration of Marriage", value: "limited_support" },
            { label: "Support Determined Pursuant to Statutory Guidelines", value: "statutory_guidelines" },
          ],
        },
        {
          name: "debtLiabilityPolicy",
          label: "Pre-Marital & Individual Debt Allocation",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Each party remains solely liable for their own debts (Separate Debt)", value: "separate_debts_remain_separate" },
            { label: "Debts incurred during marriage shared equally", value: "marital_debts_shared" },
          ],
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const s1 = data.spouse1Name || "Prospective Spouse 1";
    const s2 = data.spouse2Name || "Prospective Spouse 2";
    const mDate = data.anticipatedMarriageDate || "the marriage date";
    const statuteCite = statute?.statuteCitation || "Uniform Premarital Agreement Act (UPAA) & State Domestic Relations Law";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CONTRACT TYPE", value: "STATUTORY PRENUPTIAL (PREMARITAL) AGREEMENT" },
          { label: "PROSPECTIVE SPOUSE 1", value: `${s1}, ${data.spouse1Address || ""}` },
          { label: "PROSPECTIVE SPOUSE 2", value: `${s2}, ${data.spouse2Address || ""}` },
          { label: "ANTICIPATED WEDDING", value: `${mDate}` },
          { label: "SPOUSAL SUPPORT", value: data.spousalSupportPolicy === "mutual_waiver" ? "MUTUAL WAIVER OF ALIMONY & MAINTENANCE" : "Limited / Statutory Guidelines" },
          { label: "DEBT RESPONSIBILITY", value: "Each spouse solely responsible for individual debts" },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Recitals & Legal Intent to Marry",
        type: "body",
        paragraphs: [
          `THIS PRENUPTIAL AGREEMENT is made and entered into on ${data.noticeDate || "the date of execution"}, by and between ${s1} and ${s2} (collectively the "Parties"). The Parties contemplate marriage on or about ${mDate}.`,
          `This Agreement is entered into in contemplation of marriage under the Uniform Premarital Agreement Act (UPAA) and applicable state family codes. The Parties desire to define and fix their respective property rights, financial interests, and support obligations in the event of legal separation, divorce, annulment, or the death of either party.`,
        ],
      },
      {
        title: "2. Full Financial Disclosure & Separate Property Retention",
        type: "body",
        paragraphs: [
          `Financial Disclosure: Each Party certifies that they have made a fair, full, and reasonable disclosure of all assets, liabilities, and income to the other Party, summarized as follows: Spouse 1 Assets: "${data.spouse1AssetsSummary || "Disclosed in writing"}"; Spouse 2 Assets: "${data.spouse2AssetsSummary || "Disclosed in writing"}".`,
          `Separate Property: All property owned by either Party prior to the marriage, along with any property acquired during the marriage by gift, inheritance, devise, or personal descent, together with all appreciation, rents, dividends, and proceeds thereof, shall remain the sole and exclusive separate property of that Party forever. Neither Party shall acquire any marital or community property interest therein.`,
        ],
      },
      {
        title: "3. Spousal Support, Debts & Voluntary Execution",
        type: "body",
        paragraphs: [
          `Alimony & Maintenance: ${data.spousalSupportPolicy === "mutual_waiver" ? "In the event of dissolution of the marriage, each Party knowingly and voluntarily waives, forfeits, and renounces any and all claims to temporary or permanent spousal support, maintenance, alimony, or separate maintenance from the other Party under state law." : "Spousal support shall be determined strictly pursuant to the agreed formula or applicable state statutory guidelines."}`,
          `Pre-Existing Debts: Each Party shall be solely responsible for paying all debts, mortgages, loans, and credit liabilities incurred by that Party prior to or during the marriage. Each Party covenants to indemnify and hold harmless the other Party from any liability thereon.`,
          `Voluntary Execution: The Parties acknowledge having had full opportunity to consult with independent legal counsel, that this Agreement is entered into freely and voluntarily, without duress, coercion, or undue influence, and that its terms are fair, reasonable, and not unconscionable.`,
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
