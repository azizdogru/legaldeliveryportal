import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const llcOperatingAgreementConfig: DocumentConfig = {
  id: "llc-operating-agreement",
  slug: "llc-operating-agreement",
  title: "LLC Operating Agreement (Single & Multi-Member)",
  shortTitle: "LLC Operating Agreement",
  category: "Business & Corporate",
  description: "Comprehensive statutory LLC operating agreement establishing company governance, capital contributions, profit distributions, management voting, and limited liability protection for member-managed or manager-managed LLCs.",
  metaDescription: "Generate a state-compliant LLC Operating Agreement for single-member or multi-member LLCs. Protects personal assets and sets capital and profit rules for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Corporate Veil Shield",
  iconName: "Briefcase",
  searchKeywords: [
    "llc operating agreement template",
    "single member llc operating agreement pdf",
    "multi member llc agreement form",
    "llc company bylaws document",
    "llc banking resolution operating agreement",
    "llc membership interest agreement",
  ],
  features: [
    "Crucial legal document required to open corporate bank accounts and satisfy IRS audits",
    "Reinforces the corporate veil shielding owners personal assets from business liabilities",
    "Supports both Member-Managed and Manager-Managed operational governance structures",
    "Establishes precise capital contributions, voting thresholds, and profit allocation schedules",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "DE",
    companyName: "Apex Ventures LLC",
    stateOfFormation: "Delaware",
    principalOffice: "1209 Orange Street, Wilmington, DE 19801",
    registeredAgent: "The Corporation Trust Company, 1209 Orange Street, Wilmington, DE 19801",
    managementType: "member_managed",
    memberStructure: "single_member",
    primaryMemberName: "Michael Sterling",
    primaryMemberContribution: "10000.00",
    primaryMemberPercentage: "100",
    secondMemberName: "",
    secondMemberContribution: "0.00",
    secondMemberPercentage: "0",
    taxClassification: "disregarded_entity",
  },
  steps: [
    {
      id: "company_identification",
      title: "Company & Registration",
      description: "Enter company legal name, state of formation, and principal executive office.",
      fields: [
        {
          name: "companyName",
          label: "LLC Full Legal Name (Including 'LLC' or 'L.L.C.')",
          type: "text",
          placeholder: "e.g., Apex Ventures LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "stateOfFormation",
          label: "State of Formation / Organization",
          type: "text",
          placeholder: "e.g., Delaware",
          required: true,
          gridCols: 2,
        },
        {
          name: "managementType",
          label: "Management Structure",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Member-Managed (Managed directly by owner members)", value: "member_managed" },
            { label: "Manager-Managed (Managed by designated appointed manager)", value: "manager_managed" },
          ],
        },
        {
          name: "principalOffice",
          label: "Principal Executive Business Office",
          type: "text",
          placeholder: "e.g., 100 Main Street, Suite 500, Wilmington, DE 19801",
          required: true,
          gridCols: 1,
        },
        {
          name: "registeredAgent",
          label: "Registered Agent Name & Street Address",
          type: "text",
          placeholder: "e.g., National Registered Agents Inc., 160 Greentree Dr, Dover, DE 19904",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "membership_capital",
      title: "Members & Capital Contributions",
      description: "Define ownership percentages, member names, and cash/asset contributions.",
      fields: [
        {
          name: "memberStructure",
          label: "Membership Structure",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Single-Member LLC (100% Owned by One Individual/Entity)", value: "single_member" },
            { label: "Multi-Member LLC (Two or More Ownership Partners)", value: "multi_member" },
          ],
        },
        {
          name: "taxClassification",
          label: "IRS Federal Tax Classification",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Disregarded Entity (Sole Proprietorship / Schedule C)", value: "disregarded_entity" },
            { label: "Partnership (IRS Form 1065 / K-1)", value: "partnership" },
            { label: "S-Corporation (IRS Form 2553)", value: "s_corp" },
          ],
        },
        {
          name: "primaryMemberName",
          label: "Primary Member Full Legal Name",
          type: "text",
          placeholder: "e.g., Michael Sterling",
          required: true,
          gridCols: 1,
        },
        {
          name: "primaryMemberContribution",
          label: "Primary Member Capital Contribution ($ USD)",
          type: "currency",
          placeholder: "e.g., 10000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "primaryMemberPercentage",
          label: "Primary Member Ownership Interest (%)",
          type: "text",
          placeholder: "e.g., 100 or 50",
          required: true,
          gridCols: 2,
        },
        {
          name: "secondMemberName",
          label: "Second Member Full Legal Name (If Multi-Member)",
          type: "text",
          placeholder: "e.g., Sarah Jenkins (Leave blank if single-member)",
          required: false,
          gridCols: 1,
        },
        {
          name: "secondMemberContribution",
          label: "Second Member Capital Contribution ($ USD)",
          type: "currency",
          placeholder: "e.g., 10000.00",
          required: false,
          gridCols: 2,
        },
        {
          name: "secondMemberPercentage",
          label: "Second Member Ownership Interest (%)",
          type: "text",
          placeholder: "e.g., 50",
          required: false,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Effective Date of Agreement",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const company = data.companyName || "Company LLC";
    const stateFormed = data.stateOfFormation || statute?.stateName || "Delaware";
    const m1 = data.primaryMemberName || "Primary Member";
    const m1Pct = data.primaryMemberPercentage || "100";
    const m1Cap = parseFloat(data.primaryMemberContribution || "0").toFixed(2);
    const m2 = data.secondMemberName;
    const m2Pct = data.secondMemberPercentage || "0";
    const m2Cap = parseFloat(data.secondMemberContribution || "0").toFixed(2);
    const mgmt = data.managementType === "manager_managed" ? "Manager-Managed" : "Member-Managed";
    const statuteCite = statute?.statuteCitation || "Uniform Limited Liability Company Act (ULLCA)";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "GOVERNING INSTRUMENT", value: "LIMITED LIABILITY COMPANY OPERATING AGREEMENT" },
          { label: "COMPANY NAME", value: `${company}` },
          { label: "STATE OF FORMATION", value: `${stateFormed}` },
          { label: "MANAGEMENT STRUCTURE", value: `${mgmt}` },
          { label: "PRINCIPAL OFFICE", value: `${data.principalOffice || "On file"}` },
          { label: "REGISTERED AGENT", value: `${data.registeredAgent || "On file"}` },
          { label: "CAPITAL & MEMBERSHIP", value: `${m1} (${m1Pct}%, $${m1Cap})${m2 ? ` | ${m2} (${m2Pct}%, $${m2Cap})` : ""}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Formation, Purpose & Limited Liability Protection",
        type: "body",
        paragraphs: [
          `THIS OPERATING AGREEMENT of ${company} is entered into and made effective as of ${data.noticeDate || "the date of execution"}, by and among the Member(s) executing this instrument.`,
          `Organization: The Company was formed as a limited liability company pursuant to the limited liability company act of the State of ${stateFormed}. The rights and liabilities of the Members shall be determined in accordance with said statute and this Agreement.`,
          `Limitation of Liability: Except as expressly required by statute, no Member or Manager shall be personally liable for any debt, obligation, or liability of the Company, whether arising in contract, tort, or otherwise, solely by reason of being a Member or Manager of the Company. The debts and liabilities of the Company belong solely to the Company.`,
        ],
      },
      {
        title: "2. Capital Contributions, Accounts & Tax Status",
        type: "body",
        paragraphs: [
          `Initial Contributions: Members have contributed the initial capital amounts recited in the company ledger: Member ${m1} has contributed $${m1Cap} USD (${m1Pct}% ownership interest)${m2 ? `; Member ${m2} has contributed $${m2Cap} USD (${m2Pct}% ownership interest)` : ""}. No Member shall be required to make additional capital contributions unless unanimously agreed in writing.`,
          `Profits, Losses and Distributions: Net profits and losses of the Company shall be allocated among the Members in proportion to their respective membership percentage interests. Cash distributions shall be determined and disbursed at such times as the Members or Managers deem prudent, consistent with working capital and creditor obligations.`,
          `Federal Tax Status: The Company shall be treated for federal and state income tax purposes as: ${data.taxClassification === "disregarded_entity" ? "a Disregarded Entity (sole proprietorship)" : data.taxClassification === "partnership" ? "a Partnership" : "an S-Corporation"}.`,
        ],
      },
      {
        title: `3. Management & Voting Authority (${mgmt})`,
        type: "body",
        paragraphs: [
          `Governance: Management of the Company is vested in the: ${mgmt}. ${data.managementType === "manager_managed" ? "The designated Manager shall hold full authority to conduct day-to-day business operations." : "The Members shall manage company affairs directly in proportion to their membership percentage interests."}`,
          `Banking Authority: Any Member or designated Manager is fully authorized to open, maintain, and manage bank accounts, sign checks, enter into commercial contracts, incur liabilities, and execute commercial financing instruments on behalf of the Company.`,
          `Transfers & Dissolution: No Member may sell, assign, pledge, or transfer any portion of their membership interest without the prior unanimous written consent of the non-transferring Members. The Company shall dissolve only upon unanimous vote of Members, judicial decree, or administrative dissolution pursuant to state law.`,
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
