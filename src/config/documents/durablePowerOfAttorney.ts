import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const durablePowerOfAttorneyConfig: DocumentConfig = {
  id: "durable-power-of-attorney",
  slug: "durable-power-of-attorney",
  title: "Durable Financial Power of Attorney (General Statutory POA)",
  shortTitle: "Durable Power of Attorney",
  category: "Estate Planning",
  description: "Comprehensive statutory durable power of attorney delegating broad financial, banking, real estate, tax, and business management authority to a trusted agent, remaining effective upon principal incapacity.",
  metaDescription: "Generate a state-compliant Statutory Durable Financial Power of Attorney. Authorizes banking, property, and tax powers surviving incapacity for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Survives Incapacity",
  iconName: "FileCheck",
  searchKeywords: [
    "durable power of attorney template",
    "financial power of attorney form pdf",
    "statutory durable poa document",
    "power of attorney for elderly parent",
    "general financial power of attorney",
    "bank power of attorney form",
  ],
  features: [
    "Conforms to the Uniform Power of Attorney Act (UPOAA) adopted across US jurisdictions",
    "Express durability clause ensures powers survive subsequent physical or mental incapacity",
    "Grants broad powers over real estate, banking, investments, tax filings, and retirement benefits",
    "Includes designated Successor Agent to prevent judicial guardianship proceedings",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "FL",
    principalName: "",
    principalAddress: "",
    agentName: "",
    agentAddress: "",
    agentPhone: "",
    successorAgentName: "",
    successorAgentAddress: "",
    powersGranted: "all_powers",
    effectiveImmediately: "yes",
  },
  steps: [
    {
      id: "principal_agent",
      title: "Principal & Designated Agent",
      description: "Enter identifying details for the granting principal and chosen attorney-in-fact (Agent).",
      fields: [
        {
          name: "principalName",
          label: "Principal Full Legal Name (Person Granting Powers)",
          type: "text",
          placeholder: "e.g., Arthur James Pendelton",
          required: true,
          gridCols: 1,
        },
        {
          name: "principalAddress",
          label: "Principal Legal Residence Address",
          type: "text",
          placeholder: "e.g., 4200 Ocean Boulevard, Boca Raton, FL 33431",
          required: true,
          gridCols: 1,
        },
        {
          name: "agentName",
          label: "Primary Agent (Attorney-in-Fact) Legal Name",
          type: "text",
          placeholder: "e.g., Catherine Pendelton Davis (Daughter)",
          required: true,
          gridCols: 1,
        },
        {
          name: "agentAddress",
          label: "Primary Agent Physical Address",
          type: "text",
          placeholder: "e.g., 1850 Biscayne Blvd, Miami, FL 33132",
          required: true,
          gridCols: 2,
        },
        {
          name: "agentPhone",
          label: "Primary Agent Phone Number",
          type: "text",
          placeholder: "e.g., (555) 654-3210",
          required: true,
          gridCols: 2,
        },
        {
          name: "successorAgentName",
          label: "Successor Alternate Agent Legal Name (Optional)",
          type: "text",
          placeholder: "e.g., Thomas Arthur Pendelton (Son)",
          required: false,
          gridCols: 1,
        },
        {
          name: "successorAgentAddress",
          label: "Successor Agent Address (Optional)",
          type: "text",
          placeholder: "e.g., 900 North Michigan Ave, Chicago, IL 60611",
          required: false,
          gridCols: 1,
        },
      ],
    },
    {
      id: "powers_scope",
      title: "Scope of Authority & Durability",
      description: "Select granted powers and specify when the authority takes effect.",
      fields: [
        {
          name: "powersGranted",
          label: "Scope of Financial & Business Powers",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Full Broad Powers (Banking, Real Estate, Investments, Tax, Business & Personal Affairs)", value: "all_powers" },
            { label: "Banking & Bill Paying Only (Check signing, deposit accounts, recurring debts)", value: "banking_only" },
            { label: "Real Estate & Property Transactions Only", value: "real_estate_only" },
          ],
        },
        {
          name: "effectiveImmediately",
          label: "Effective Timing of Authority",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Effective Immediately upon Execution (Standard Durable)", value: "yes" },
            { label: "Springing Power (Effective Only upon Certified Physician Incapacity)", value: "springing" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date of Instrument Execution",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const principal = data.principalName || "Principal";
    const agent = data.agentName || "Agent (Attorney-in-Fact)";
    const successor = data.successorAgentName || "None designated";
    const timing = data.effectiveImmediately === "yes" ? "Immediately upon execution and survives subsequent incapacity" : "Springing upon medical determination of incapacity";
    const statuteCite = statute?.statuteCitation || "Uniform Power of Attorney Act (UPOAA)";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT TITLE", value: "STATUTORY GENERAL DURABLE POWER OF ATTORNEY" },
          { label: "PRINCIPAL", value: `${principal}, ${data.principalAddress || ""}` },
          { label: "DESIGNATED AGENT", value: `${agent}, ${data.agentAddress || ""} (Phone: ${data.agentPhone || "On File"})` },
          { label: "SUCCESSOR AGENT", value: `${successor}${data.successorAgentAddress ? `, ${data.successorAgentAddress}` : ""}` },
          { label: "EFFECTIVE COMMENCEMENT", value: `${timing}` },
          { label: "DURABILITY CLAUSE", value: "THIS POWER OF ATTORNEY IS NOT TERMINATED BY SUBSEQUENT INCAPACITY" },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Appointment & Express Grant of Authority",
        type: "body",
        paragraphs: [
          `I, ${principal}, residing at ${data.principalAddress || "Principal residence"}, hereby appoint ${agent} as my attorney-in-fact ("Agent") to act in my name, place, and stead in any way which I myself could do, if I were personally present, with respect to the matters described below.`,
          `Successor Agent: If my Agent is unable, unwilling, or unavailable to act, or resigns or dies, I designate ${successor} as my successor alternate attorney-in-fact, with identical powers.`,
          `DURABILITY NOTICE: This power of attorney is durable. It shall not be affected or terminated by my subsequent disability, mental impairment, or incapacity. It is my intention that the powers granted herein remain fully exercisable notwithstanding any subsequent mental or physical infirmity.`,
        ],
      },
      {
        title: "2. Enumeration of Authorized Financial Powers",
        type: "body",
        paragraphs: [
          `My Agent shall have full power and lawful authority to execute all transactions concerning:`,
          `(a) Banking & Financial Institutions: To open, maintain, or close checking, savings, and certificate of deposit accounts; write checks; deposit funds; conduct electronic fund transfers; and access safe deposit boxes.`,
          `(b) Real & Personal Property: To buy, sell, lease, mortgage, encumber, maintain, repair, and convey any interest in real property or tangible personal property.`,
          `(c) Business Operations: To manage, vote shares, control, reorganize, or liquidate any business entities, partnerships, or LLCs in which I hold an interest.`,
          `(d) Tax Matters: To prepare, execute, and file federal, state, and local income tax returns (including IRS Form 2848 representation authority) and negotiate or settle tax liabilities.`,
          `(e) Government Benefits: To apply for, execute forms, and receive Social Security, Medicare, Medicaid, and Veterans Administration benefits on my behalf.`,
        ],
      },
      {
        title: "3. Agent Fiduciary Duties & Third-Party Protection",
        type: "body",
        paragraphs: [
          `Agent Fiduciary Standard: My Agent must act in good faith, in accordance with my reasonable expectations to the extent actually known by the Agent, and otherwise in my best interest. My Agent must keep a detailed record of all receipts, disbursements, and transactions conducted on my behalf.`,
          `Third-Party Reliance: Third parties (including banks, title companies, and financial institutions) may rely without inquiry upon the continuing validity and binding authority of this instrument. No third party who acts in good-faith reliance on this instrument shall incur any liability to me, my estate, or my personal representatives.`,
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
