import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const standardNdaConfig: DocumentConfig = {
  id: "standard-nda",
  slug: "standard-nda",
  title: "Non-Disclosure Agreement (Mutual & Unilateral NDA)",
  shortTitle: "Standard NDA",
  category: "Business & Corporate",
  description: "Comprehensive confidentiality agreement protecting trade secrets, customer data, proprietary technology, and business discussions with mutual or unilateral options and injunctive relief remedies.",
  metaDescription: "Generate a state-compliant Non-Disclosure Agreement (NDA). Protects trade secrets, intellectual property, and proprietary data with injunctive relief clauses for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Trade Secret Defense",
  iconName: "Lock",
  searchKeywords: [
    "non disclosure agreement template",
    "confidentiality agreement form pdf",
    "mutual nda agreement",
    "unilateral business nda",
    "trade secret protection agreement",
    "investor and employee nda form",
  ],
  features: [
    "Supports both Unilateral (one-way) and Mutual (two-way reciprocal) confidentiality disclosures",
    "Incorporates federal Defend Trade Secrets Act (18 U.S.C. 1833) immunity notice provisions",
    "Empowers disclosing party to seek immediate temporary restraining orders (TRO) and injunctions",
    "Protects trade secrets in perpetuity and proprietary business information for specified multi-year terms",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "DE",
    ndaType: "mutual",
    party1Name: "Vertex Technologies Inc.",
    party1Address: "100 Montgomery Street, Suite 1500, San Francisco, CA 94104",
    party2Name: "Apex Software Solutions LLC",
    party2Address: "500 West Madison Street, Chicago, IL 60661",
    purposeOfDisclosure: "Evaluating a potential strategic commercial partnership, software integration, and joint technological venture.",
    confidentialityTermYears: "2",
    tradeSecretPerpetuity: "yes",
    governingState: "Delaware",
  },
  steps: [
    {
      id: "parties_nature",
      title: "Parties & Structure",
      description: "Select whether the agreement is Mutual (reciprocal) or Unilateral (one-way), and enter party information.",
      fields: [
        {
          name: "ndaType",
          label: "NDA Structure",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Mutual Reciprocal NDA (Both parties disclose and receive confidential data)", value: "mutual" },
            { label: "Unilateral One-Way NDA (Party 1 discloses; Party 2 receives and protects)", value: "unilateral" },
          ],
        },
        {
          name: "governingState",
          label: "Governing Law State",
          type: "text",
          placeholder: "e.g., Delaware, California, New York, Texas",
          required: true,
          gridCols: 2,
        },
        {
          name: "party1Name",
          label: "Disclosing Party / Party #1 Legal Name",
          type: "text",
          placeholder: "e.g., Vertex Technologies Inc.",
          required: true,
          gridCols: 1,
        },
        {
          name: "party1Address",
          label: "Party #1 Legal Notice Address",
          type: "text",
          placeholder: "e.g., 100 Montgomery Street, Suite 1500, San Francisco, CA 94104",
          required: true,
          gridCols: 1,
        },
        {
          name: "party2Name",
          label: "Receiving Party / Party #2 Legal Name",
          type: "text",
          placeholder: "e.g., Apex Software Solutions LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "party2Address",
          label: "Party #2 Legal Notice Address",
          type: "text",
          placeholder: "e.g., 500 West Madison Street, Chicago, IL 60661",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "terms_purpose",
      title: "Purpose & Duration",
      description: "Define the specific business purpose and duration of non-disclosure obligations.",
      fields: [
        {
          name: "purposeOfDisclosure",
          label: "Permitted Business Purpose for Disclosure",
          type: "textarea",
          placeholder: "e.g., Evaluating a potential strategic joint venture, technology licensing, investment, or commercial supply relationship...",
          required: true,
          gridCols: 1,
        },
        {
          name: "confidentialityTermYears",
          label: "Term of Confidentiality Obligation",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "2 Years from Date of Disclosure", value: "2" },
            { label: "3 Years from Date of Disclosure", value: "3" },
            { label: "5 Years from Date of Disclosure", value: "5" },
            { label: "Indefinite / Permanent Non-Disclosure", value: "indefinite" },
          ],
        },
        {
          name: "tradeSecretPerpetuity",
          label: "Protect Trade Secrets in Perpetuity?",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Yes - Trade secrets protected forever until no longer secret under law", value: "yes" },
            { label: "No - Trade secrets expire with standard term", value: "no" },
          ],
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
    const p1 = data.party1Name || "Party 1";
    const p2 = data.party2Name || "Party 2";
    const typeLabel = data.ndaType === "mutual" ? "MUTUAL (RECIPROCAL)" : "UNILATERAL (ONE-WAY)";
    const termYears = data.confidentialityTermYears === "indefinite" ? "In Perpetuity" : `${data.confidentialityTermYears || "2"} Years`;
    const govState = data.governingState || statute?.stateName || "Delaware";
    const statuteCite = statute?.statuteCitation || "Uniform Trade Secrets Act (UTSA) & Defend Trade Secrets Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: `${typeLabel} NON-DISCLOSURE AGREEMENT` },
          { label: "PARTY #1", value: `${p1}, ${data.party1Address || ""}` },
          { label: "PARTY #2", value: `${p2}, ${data.party2Address || ""}` },
          { label: "BUSINESS PURPOSE", value: `${data.purposeOfDisclosure || "Evaluating prospective commercial transaction"}` },
          { label: "CONFIDENTIALITY DURATION", value: `${termYears} (Trade Secrets protected in perpetuity)` },
          { label: "GOVERNING JURISDICTION", value: `State of ${govState} & ${statuteCite}` },
        ],
      },
      {
        title: "1. Definition of Confidential Information",
        type: "body",
        paragraphs: [
          `THIS NON-DISCLOSURE AGREEMENT is entered into on ${data.noticeDate || "the date of execution"}, by and between ${p1} and ${p2} (collectively the "Parties").`,
          `"Confidential Information" means all non-public, proprietary information disclosed by one party ("Disclosing Party") to the other party ("Receiving Party"), whether orally, in writing, electronically, or by inspection of tangible objects, including but not limited to source code, algorithms, business models, financial projections, customer rosters, pricing structures, trade secrets, inventions, and marketing plans.`,
          `Exclusions: Confidential Information shall not include information that: (a) is or becomes publicly available through no breach of this Agreement; (b) was already known to Receiving Party without restriction prior to disclosure; (c) is independently developed by Receiving Party without reference to or reliance upon Disclosing Party's information; or (d) is lawfully obtained from a third party free of confidentiality restrictions.`,
        ],
      },
      {
        title: "2. Obligations of Receiving Party & Permitted Use",
        type: "body",
        paragraphs: [
          `Receiving Party agrees to: (a) hold Confidential Information in strict confidence using at least the same degree of care it uses to protect its own confidential data of like nature, but not less than a reasonable standard of care; (b) use Confidential Information solely and exclusively for the purpose of: "${data.purposeOfDisclosure || "Evaluating prospective business relationship"}"; and (c) disclose such information only to its directors, officers, employees, and legal advisors who have a strict need to know and who are bound by confidentiality obligations at least as restrictive as this Agreement.`,
          `Return of Materials: Upon written request of Disclosing Party or termination of discussions, Receiving Party shall promptly return or certify the permanent destruction of all documents, electronic files, and media containing Confidential Information.`,
        ],
      },
      {
        title: "3. Term, Injunctive Relief & Defend Trade Secrets Act Notice",
        type: "body",
        paragraphs: [
          `Term: The confidentiality obligations herein shall remain in effect for a period of ${termYears} from the date of disclosure; provided, however, that trade secrets under the Uniform Trade Secrets Act shall be protected in perpetuity for as long as such information remains a trade secret under applicable law.`,
          `Injunctive Relief: Receiving Party acknowledges that any unauthorized disclosure or use of Confidential Information will cause irreparable injury to Disclosing Party for which monetary damages alone would be inadequate. Disclosing Party shall be entitled to seek temporary and permanent injunctive relief and restraining orders without the necessity of posting a bond.`,
          `Notice of Immunity (18 U.S.C. Section 1833(b)): An individual shall not be held criminally or civilly liable under any federal or state trade secret law for the disclosure of a trade secret made in confidence to a government official or attorney solely for the purpose of reporting or investigating a suspected violation of law.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
    ];
  },
};
