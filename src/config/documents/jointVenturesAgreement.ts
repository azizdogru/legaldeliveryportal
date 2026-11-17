import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const jointVenturesAgreementConfig: DocumentConfig = {
  id: "joint-ventures-agreement",
  slug: "joint-ventures-agreement",
  title: "Joint Venture Agreement (Commercial JV Partnership)",
  shortTitle: "Joint Venture Agreement",
  category: "Business & Corporate",
  description: "Comprehensive statutory joint venture contract between corporate entities or investors for a specific commercial project, real estate development, or technology enterprise, defining capital contributions, profit distributions, and steering governance.",
  metaDescription: "Create an official Joint Venture Agreement for real estate or business syndications. Establishes capital contributions, voting rights, profit sharing, and dissolution rules across all 50 states. PDF for $9.90.`",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Commercial JV",
  iconName: "Briefcase",
  searchKeywords: [
    "joint venture agreement template pdf",
    "commercial jv contract form",
    "real estate joint venture agreement",
    "business joint venture partnership",
    "joint venture profit sharing agreement",
    "steering committee jv operating agreement",
  ],
  features: [
    "Formed for a limited commercial purpose or single-asset development without creating general entity liability",
    "Itemizes initial capital funding obligations, capital call mechanics, and default dilution formulas",
    "Establishes a Management Steering Committee with designated representatives and voting rights",
    "Governs waterfall distributions: return of capital, preferred return, and remaining profit splits",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "DE",
    ventureName: "Apex Meridian Development JV",
    venturePurpose: "Acquisition, architectural entitlement, permitting, and commercial construction of a mixed-use retail center in Austin, Texas.",
    principalOffice: "1209 Orange Street, Wilmington, DE 19801",
    venturer1Name: "Meridian Capital Group, LLC",
    venturer1Address: "500 West 2nd Street, Suite 1900, Austin, TX 78701",
    venturer1Contribution: "1500000.00",
    venturer1SharePct: "60",
    venturer2Name: "Apex Development Partners, Inc.",
    venturer2Address: "300 Colorado Street, Suite 1200, Austin, TX 78701",
    venturer2Contribution: "1000000.00",
    venturer2SharePct: "40",
    managerVenturer: "Apex Development Partners, Inc. (Managing Venturer)",
    termYears: "5",
  },
  steps: [
    {
      id: "jv_parties",
      title: "Joint Venturers Profile",
      description: "Enter legal entities and addresses for the co-venturers entering into the joint venture.",
      fields: [
        {
          name: "ventureName",
          label: "Joint Venture Legal Name",
          type: "text",
          placeholder: "e.g., Apex Meridian Development JV",
          required: true,
          gridCols: 1,
        },
        {
          name: "venturer1Name",
          label: "First Co-Venturer Legal Name",
          type: "text",
          placeholder: "e.g., Meridian Capital Group, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "venturer1Address",
          label: "First Venturer Principal Address",
          type: "text",
          placeholder: "e.g., 500 West 2nd Street, Suite 1900, Austin, TX 78701",
          required: true,
          gridCols: 2,
        },
        {
          name: "venturer2Name",
          label: "Second Co-Venturer Legal Name",
          type: "text",
          placeholder: "e.g., Apex Development Partners, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "venturer2Address",
          label: "Second Venturer Principal Address",
          type: "text",
          placeholder: "e.g., 300 Colorado Street, Suite 1200, Austin, TX 78701",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "jv_financials",
      title: "Purpose, Capital & Governance",
      description: "Define project purpose, capital commitments, ownership shares, and managing entity.",
      fields: [
        {
          name: "venturePurpose",
          label: "Specific Scope & Commercial Purpose of JV",
          type: "textarea",
          placeholder: "e.g., Acquisition, entitlement, and development of commercial mixed-use real estate...",
          required: true,
          gridCols: 1,
        },
        {
          name: "venturer1Contribution",
          label: "Venturer #1 Capital Commitment ($ USD)",
          type: "currency",
          placeholder: "e.g., 1500000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "venturer1SharePct",
          label: "Venturer #1 Venture Interest (%)",
          type: "text",
          placeholder: "e.g., 60",
          required: true,
          gridCols: 2,
        },
        {
          name: "venturer2Contribution",
          label: "Venturer #2 Capital Commitment ($ USD)",
          type: "currency",
          placeholder: "e.g., 1000000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "venturer2SharePct",
          label: "Venturer #2 Venture Interest (%)",
          type: "text",
          placeholder: "e.g., 40",
          required: true,
          gridCols: 2,
        },
        {
          name: "managerVenturer",
          label: "Designated Managing Venturer / Operator",
          type: "text",
          placeholder: "e.g., Apex Development Partners, Inc. (Managing Venturer)",
          required: true,
          gridCols: 2,
        },
        {
          name: "termYears",
          label: "Venture Term (Years)",
          type: "text",
          placeholder: "e.g., 5",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Effective Date of Joint Venture",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const v1 = data.venturer1Name || "Venturer 1";
    const v1Pct = data.venturer1SharePct || "60";
    const v1Cap = parseFloat(data.venturer1Contribution || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const v2 = data.venturer2Name || "Venturer 2";
    const v2Pct = data.venturer2SharePct || "40";
    const v2Cap = parseFloat(data.venturer2Contribution || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const jvName = data.ventureName || "Commercial Joint Venture";
    const statuteCite = statute?.statuteCitation || "Uniform Partnership Act and Joint Venture Commercial Principles";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: "COMMERCIAL JOINT VENTURE AGREEMENT" },
          { label: "JOINT VENTURE ENTITY", value: `${jvName}` },
          { label: "VENTURER #1", value: `${v1} (${v1Pct}%, $${v1Cap} USD Capital)` },
          { label: "VENTURER #2", value: `${v2} (${v2Pct}%, $${v2Cap} USD Capital)` },
          { label: "MANAGING VENTURER", value: `${data.managerVenturer || "Designated Operator"}` },
          { label: "VENTURE TERM", value: `${data.termYears || "5"} Years from Effective Date` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Formation, Single Purpose & Term",
        type: "body",
        paragraphs: [
          `THIS JOINT VENTURE AGREEMENT is made effective as of ${data.noticeDate || "the date of execution"}, by and between ${v1} and ${v2} (individually a "Venturer" and collectively the "Venturers").`,
          `Special Purpose: The Venturers hereby establish a joint venture under the name ${jvName} solely for the limited purpose of: "${data.venturePurpose || "Commercial project development and investment"}". Nothing herein shall be construed to create a general partnership or authorize any Venturer to act as agent for another outside the express scope of this venture.`,
          `Term: The Joint Venture shall commence immediately and continue for a period of ${data.termYears || "5"} years, unless dissolved earlier pursuant to mutual written agreement or completion of the venture purpose.`,
        ],
      },
      {
        title: "2. Capital Contributions, Capital Calls & Ownership Shares",
        type: "body",
        paragraphs: [
          `Initial Contributions: Venturer 1 shall contribute $${v1Cap} USD (representing a ${v1Pct}% interest) and Venturer 2 shall contribute $${v2Cap} USD (representing a ${v2Pct}% interest) to the joint venture capital account.`,
          `Additional Capital Calls: If the Steering Committee determines that additional working capital is essential to achieve the venture purpose, capital calls shall be funded by the Venturers pro rata based on their percentage shares. Failure to fund within thirty (30) days shall result in dilution of the defaulting Venturer's interest.`,
        ],
      },
      {
        title: "3. Management Governance, Day-to-Day Operations & Major Decisions",
        type: "body",
        paragraphs: [
          `Managing Operator: ${data.managerVenturer || "The Managing Venturer"} shall oversee routine day-to-day administrative operations and project execution within approved budgetary parameters.`,
          `Major Decisions: Major decisions require the unanimous written consent of both Venturers, including: (a) borrowing funds or mortgaging venture assets, (b) expenditures exceeding the approved budget by more than $25,000, (c) selling or transferring venture real property, and (d) admitting new co-venturers or initiating litigation.`,
        ],
      },
      {
        title: "4. Waterfall Distributions, Accounting & Liquidation",
        type: "body",
        paragraphs: [
          `Distributions: Distributable cash proceeds shall be distributed as follows: first, to repay any third-party debts and member loans; second, to return unreturned capital contributions pro rata; and third, the remainder divided between Venturers in proportion to their percentage ownership interests.`,
          `Dissolution: Upon termination of the venture, the Managing Venturer shall liquidate remaining assets, pay all creditors, and distribute net proceeds in accordance with the capital accounts under ${statuteCite}.`,
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
