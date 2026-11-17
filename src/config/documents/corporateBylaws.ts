import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const corporateBylawsConfig: DocumentConfig = {
  id: "corporate-bylaws",
  slug: "corporate-bylaws",
  title: "Corporate Bylaws (S-Corp & C-Corp Governance)",
  shortTitle: "Corporate Bylaws",
  category: "Business & Corporate",
  description: "Comprehensive statutory corporate bylaws establishing board of directors structure, annual shareholder meeting rules, officer duties, stock certificates, and corporate indemnification rules for S-Corporations and C-Corporations.",
  metaDescription: "Generate official Corporate Bylaws for C-Corp or S-Corp entities. Covers shareholder meetings, board powers, officer roles, stock transfer rules, and indemnification for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Corporate Governance",
  iconName: "Building2",
  searchKeywords: [
    "corporate bylaws template pdf",
    "s corp bylaws form",
    "c corporation bylaws template",
    "corporate governance rules",
    "board of directors bylaws",
    "shareholder meeting corporate bylaws",
  ],
  features: [
    "Drafted for both C-Corporations and S-Corporations under statutory corporate codes",
    "Defines shareholder meeting protocols, quorum thresholds, and annual meeting calendar",
    "Outlines Board of Directors powers, voting procedures, and executive officer duties",
    "Includes corporate indemnification clauses protecting officers and directors from liability",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "DE",
    corporationName: "Vanguard Global Technologies, Inc.",
    stateOfIncorporation: "Delaware",
    principalOffice: "1209 Orange Street, Wilmington, DE 19801",
    fiscalYearEnd: "December 31",
    annualMeetingMonth: "May",
    numberOfDirectors: "3",
    quorumPercentage: "50",
    presidentName: "Alexander Vance Wright",
    secretaryName: "Elena Sophia Martinez",
    treasurerName: "Elena Sophia Martinez",
  },
  steps: [
    {
      id: "corp_identity",
      title: "Corporation Profile & Jurisdiction",
      description: "Enter corporation legal name, jurisdiction of incorporation, and principal office.",
      fields: [
        {
          name: "corporationName",
          label: "Full Legal Corporate Name",
          type: "text",
          placeholder: "e.g., Vanguard Global Technologies, Inc.",
          required: true,
          gridCols: 1,
        },
        {
          name: "stateOfIncorporation",
          label: "State of Incorporation",
          type: "text",
          placeholder: "e.g., Delaware",
          required: true,
          gridCols: 2,
        },
        {
          name: "fiscalYearEnd",
          label: "Fiscal Year End Date",
          type: "text",
          placeholder: "e.g., December 31",
          required: true,
          gridCols: 2,
        },
        {
          name: "principalOffice",
          label: "Principal Executive Office Address",
          type: "text",
          placeholder: "e.g., 1209 Orange Street, Wilmington, DE 19801",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "governance_structure",
      title: "Board & Meeting Rules",
      description: "Define director count, shareholder meeting schedule, and executive officers.",
      fields: [
        {
          name: "annualMeetingMonth",
          label: "Annual Shareholder Meeting Month",
          type: "text",
          placeholder: "e.g., May (or third Tuesday in May)",
          required: true,
          gridCols: 2,
        },
        {
          name: "numberOfDirectors",
          label: "Initial Number of Directors",
          type: "text",
          placeholder: "e.g., 3",
          required: true,
          gridCols: 2,
        },
        {
          name: "quorumPercentage",
          label: "Meeting Quorum Percentage (%)",
          type: "text",
          placeholder: "e.g., 50 (Majority of outstanding shares)",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Adoption Date of Bylaws",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "presidentName",
          label: "President / Chief Executive Officer Name",
          type: "text",
          placeholder: "e.g., Alexander Vance Wright",
          required: true,
          gridCols: 2,
        },
        {
          name: "secretaryName",
          label: "Corporate Secretary Name",
          type: "text",
          placeholder: "e.g., Elena Sophia Martinez",
          required: true,
          gridCols: 2,
        },
        {
          name: "treasurerName",
          label: "Treasurer / Chief Financial Officer Name",
          type: "text",
          placeholder: "e.g., Elena Sophia Martinez",
          required: true,
          gridCols: 1,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const corpName = data.corporationName || "Corporation Name";
    const incState = data.stateOfIncorporation || statute?.stateName || "State";
    const directorsCount = data.numberOfDirectors || "3";
    const quorumPct = data.quorumPercentage || "50";
    const statuteCite = statute?.statuteCitation || "State General Corporation Law";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "RECORD TYPE", value: "STATUTORY CORPORATE BYLAWS" },
          { label: "CORPORATE ENTITY", value: `${corpName}` },
          { label: "STATE OF INCORPORATION", value: `${incState}` },
          { label: "PRINCIPAL EXECUTIVE OFFICE", value: `${data.principalOffice || "Office on file"}` },
          { label: "BOARD SEATS", value: `${directorsCount} Designated Directors` },
          { label: "FISCAL CALENDAR", value: `Year ending ${data.fiscalYearEnd || "December 31"}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "Article I: Offices & Corporate Purpose",
        type: "body",
        paragraphs: [
          `1.01 Principal Office: The principal executive office of ${corpName} (the "Corporation") shall be located at ${data.principalOffice || "the address designated in the corporate records"}. The Corporation may establish other branch offices within or outside ${incState} as determined by the Board of Directors.`,
          `1.02 Corporate Seal: The Corporation may adopt a corporate seal bearing the name of the Corporation, the year of incorporation, and the jurisdiction of incorporation.`,
        ],
      },
      {
        title: "Article II: Shareholders Meetings & Voting Rights",
        type: "body",
        paragraphs: [
          `2.01 Annual Meeting: An annual meeting of shareholders shall be held each year during the month of ${data.annualMeetingMonth || "May"} for the election of Directors and the transaction of general corporate business.`,
          `2.02 Special Meetings: Special meetings of shareholders may be called at any time by the Board of Directors, the President, or shareholders owning not less than ten percent (10%) of all votes entitled to be cast.`,
          `2.03 Quorum & Voting: Representation in person or by written proxy of the holders of ${quorumPct}% of the outstanding shares entitled to vote shall constitute a quorum at any meeting of shareholders. Action approved by a majority of shares present at a quorate meeting shall constitute corporate action.`,
        ],
      },
      {
        title: "Article III: Board of Directors & Corporate Powers",
        type: "body",
        paragraphs: [
          `3.01 General Powers: All corporate powers shall be exercised by or under the authority of, and the business and affairs of the Corporation managed under the direction of, its Board of Directors consisting of ${directorsCount} Director(s).`,
          `3.02 Term & Vacancies: Directors shall hold office until the next annual meeting of shareholders and until their successors have been elected and qualified. Any vacancy occurring on the Board may be filled by affirmative vote of a majority of the remaining directors.`,
          `3.03 Action Without Meeting: Any action required or permitted to be taken at any meeting of the Board of Directors may be taken without a meeting if unanimous written consent is executed by all members of the Board.`,
        ],
      },
      {
        title: "Article IV: Officers & Executive Authority",
        type: "body",
        paragraphs: [
          `4.01 Officers Designated: The executive officers shall consist of a President (${data.presidentName || "Designated"}), a Secretary (${data.secretaryName || "Designated"}), and a Treasurer (${data.treasurerName || "Designated"}). Any two or more offices may be held by the same person, except President and Secretary where prohibited by statute.`,
          `4.02 President Duties: The President shall serve as the chief executive officer, preside at meetings, and execute all formal contracts, mortgages, and commercial instruments in the name of the Corporation.`,
          `4.03 Secretary & Treasurer Duties: The Secretary shall record meeting minutes and maintain the corporate stock ledger. The Treasurer shall retain custody of corporate funds, maintain financial ledgers, and disburse corporate monies under Board guidance.`,
        ],
      },
      {
        title: "Article V: Indemnification & Corporate Records",
        type: "body",
        paragraphs: [
          `5.01 Statutory Indemnification: The Corporation shall indemnify and hold harmless each director and officer from and against all liabilities, expenses, claims, and settlements arising out of service to the Corporation to the fullest extent permitted under ${statuteCite}.`,
          `5.02 Amendments: These Bylaws may be amended, altered, or repealed, and new Bylaws adopted, by the affirmative vote of a majority of the full Board of Directors or by the affirmative vote of holders of a majority of outstanding voting shares.`,
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
