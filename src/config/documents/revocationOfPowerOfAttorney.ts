import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const revocationOfPowerOfAttorneyConfig: DocumentConfig = {
  id: "revocation-of-power-of-attorney",
  slug: "revocation-of-power-of-attorney",
  title: "Revocation of Power of Attorney Notice",
  shortTitle: "Revocation of POA",
  category: "Estate Planning & Legal Authority",
  description: "Formal legal revocation instrument immediately terminating all legal authority, rights, and powers previously granted under a General, Financial, or Medical Power of Attorney pursuant to state probate and agency codes, formatted for service upon institutions and county land recording.",
  metaDescription: "Draft a legally binding Revocation of Power of Attorney. Revoke financial or medical agent authority, notify institutions, and record in county records. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Immediate Legal Effect",
  iconName: "Ban",
  searchKeywords: [
    "revocation of power of attorney template",
    "revoke poa form",
    "revocation of healthcare proxy",
    "cancel power of attorney document",
    "notice of poa termination to banks",
    "county recorder poa revocation",
  ],
  features: [
    "Immediately terminates agent legal authority under state uniform power of attorney acts",
    "Formatted for formal service upon banks, title companies, and healthcare providers",
    "Includes official county recorder document recording margin and legal block",
    "Includes dual execution lines, Notary Jurat, and Certificate of Service",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "FL",
    principalName: "",
    principalAddress: "",
    poaType: "general_financial",
    originalExecutionDate: "",
    agentName: "",
    agentAddress: "",
    alternateAgentName: "",
    recordingReference: "Instrument No. or Not Recorded",
    institutionsToNotify: "All banking institutions, brokerages, title companies, healthcare systems, and county clerk offices.",
    serviceMethod: "Certified Mail Return Receipt Requested",
  },
  steps: [
    {
      id: "principal_prior_poa",
      title: "Principal & Prior Instrument",
      description: "Enter identifying details for yourself and the power of attorney being revoked.",
      fields: [
        {
          name: "principalName",
          label: "Principal Full Legal Name (Your Name)",
          type: "text",
          placeholder: "e.g., Margaret Ann Sullivan",
          required: true,
          gridCols: 1,
        },
        {
          name: "principalAddress",
          label: "Principal Residential Address",
          type: "text",
          placeholder: "e.g., 1200 Brickell Avenue, Suite 1400, Miami, FL 33131",
          required: true,
          gridCols: 1,
        },
        {
          name: "poaType",
          label: "Category of Power of Attorney Being Revoked",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "General Durable Financial Power of Attorney", value: "general_financial" },
            { label: "Medical / Healthcare Power of Attorney & Proxy", value: "healthcare" },
            { label: "Limited / Special / Real Estate Power of Attorney", value: "limited_special" },
            { label: "All Powers of Attorney Ever Executed", value: "all_powers" },
          ],
        },
        {
          name: "originalExecutionDate",
          label: "Date Prior Power of Attorney Was Executed",
          type: "text",
          placeholder: "e.g., March 14, 2023",
          required: true,
          gridCols: 2,
        },
        {
          name: "recordingReference",
          label: "County Recording Book / Page / Instrument No. (If Recorded)",
          type: "text",
          placeholder: "e.g., Official Records Book 32104, Page 412 or Not Recorded",
          required: false,
          gridCols: 1,
        },
      ],
    },
    {
      id: "agent_institutions",
      title: "Revoked Agent & Third-Party Notice",
      description: "Specify the agent whose powers are terminated and institutions to be notified.",
      fields: [
        {
          name: "agentName",
          label: "Revoked Agent / Attorney-in-Fact Name",
          type: "text",
          placeholder: "e.g., Robert Vance Sullivan",
          required: true,
          gridCols: 1,
        },
        {
          name: "agentAddress",
          label: "Revoked Agent Address",
          type: "text",
          placeholder: "e.g., 450 Ocean Drive, Apt 6C, Miami Beach, FL 33139",
          required: true,
          gridCols: 1,
        },
        {
          name: "alternateAgentName",
          label: "Alternate / Successor Agent Name (If Applicable)",
          type: "text",
          placeholder: "e.g., Susan Sullivan Miller or None",
          required: false,
          gridCols: 1,
        },
        {
          name: "institutionsToNotify",
          label: "Third-Party Institutions Given Written Notice",
          type: "textarea",
          placeholder: "e.g., Bank of America, Wells Fargo, Vanguard, Title Agencies, Jackson Memorial Hospital...",
          required: true,
        },
      ],
    },
    {
      id: "delivery_recording",
      title: "Service Method & Delivery",
      description: "Select the legal delivery method and effective date.",
      fields: [
        {
          name: "serviceMethod",
          label: "Formal Method of Service Upon Agent & Banks",
          type: "select",
          required: true,
          options: [
            { label: "USPS Certified Mail Return Receipt Requested", value: "Certified Mail Return Receipt Requested" },
            { label: "Personal Hand Delivery with Written Receipt", value: "Personal Hand Delivery" },
            { label: "Formal Recording in Official County Public Records", value: "County Recorder Recording" },
          ],
        },
        {
          name: "noticeDate",
          label: "Effective Date of Revocation",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const principal = data.principalName || "Principal";
    const agent = data.agentName || "Agent";
    const originalDate = data.originalExecutionDate || "the date of execution";
    const statuteCite = statute?.statuteCitation || "Uniform Power of Attorney Act & State Probate Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "REVOKING PRINCIPAL", value: `${principal}, ${data.principalAddress || ""}` },
          { label: "REVOKED ATTORNEY-IN-FACT (AGENT)", value: `${agent}, ${data.agentAddress || ""}` },
          { label: "PRIOR INSTRUMENT REVOKED", value: `${data.poaType || "Power of Attorney"} executed on ${originalDate}` },
          { label: "COUNTY RECORDING REFERENCE", value: `${data.recordingReference || "Not Recorded in County Records"}` },
          { label: "METHOD OF SERVICE", value: `${data.serviceMethod || "Certified Mail Return Receipt Requested"}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Absolute Revocation of Authority & Power of Attorney",
        type: "body",
        paragraphs: [
          `KNOW ALL PERSONS BY THESE PRESENTS that I, ${principal}, residing at ${data.principalAddress || "the address above"}, being of sound mind and legal capacity, do hereby immediately and unconditionally REVOKE, RESCIND, CANCEL, and ANNUL:`,
          `That certain ${data.poaType || "Power of Attorney"} executed by me on or about ${originalDate}, wherein I appointed ${agent} (and any named alternate agent, including ${data.alternateAgentName || "any successor"}) as my attorney-in-fact and agent.`,
          `I hereby terminate, nullify, and declare void all powers, rights, privileges, and authorities granted in said instrument, whether general, special, financial, or healthcare-related. The designated agent has zero authority to act, contract, convey property, access accounts, or make decisions on my behalf.`,
        ],
      },
      {
        title: "2. Notice to Third Parties, Financial Institutions & Medical Providers",
        type: "body",
        paragraphs: [
          `NOTICE IS HEREBY GIVEN to all banks, trust companies, savings and loan associations, brokerages, title insurers, transfer agents, healthcare facilities, and third parties:`,
          `Any power of attorney granted by me to ${agent} is terminated. You are instructed not to recognize, honor, or rely upon any document or transaction executed or attempted by said individual on my behalf.`,
          `Under state law, any third party that honors a revoked power of attorney after receiving actual or constructive written notice of revocation does so at its own peril and faces liability for unauthorized conversions and damages.`,
          `Third parties provided notice: "${data.institutionsToNotify || "All financial institutions, title agencies, and healthcare facilities."}"`,
        ],
      },
      {
        title: "3. Demand for Return of All Originals & Agency Records",
        type: "body",
        paragraphs: [
          `I hereby demand that ${agent} immediately cease all actions as my agent and deliver to me within five (5) business days all original copies of the revoked instrument, all financial accounts, checks, debit cards, legal files, and books of account in the agent's possession or control.`,
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
