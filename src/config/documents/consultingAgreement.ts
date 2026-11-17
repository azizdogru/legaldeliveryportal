import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const consultingAgreementConfig: DocumentConfig = {
  id: "consulting-agreement",
  slug: "consulting-agreement",
  title: "Professional Consulting Agreement (Consultant SOW)",
  shortTitle: "Consulting Agreement",
  category: "Business & Corporate",
  description: "Legally binding professional consulting contract defining client scope of services, milestone or hourly fee compensation, intellectual property work-for-hire assignment, and nondisclosure covenants.",
  metaDescription: "Create an enforceable Consulting Agreement with Scope of Work, milestone compensation, IP assignment, and client confidentiality. Covers IRS 1099 compliance across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "SOW & IP Assignment",
  iconName: "Briefcase",
  searchKeywords: [
    "consulting agreement template pdf",
    "professional services contract",
    "consultant scope of work sow",
    "independent consultant agreement",
    "consulting retainer contract form",
    "consulting ip assignment clause",
  ],
  features: [
    "Includes customizable Scope of Work (SOW) and performance milestone criteria",
    "Covers monthly retainer, hourly billing, or lump-sum deliverable fee models",
    "Contains comprehensive work-made-for-hire Intellectual Property assignment clauses",
    "Reinforces IRS 1099 independent contractor status and self-employment tax autonomy",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "NY",
    clientName: "Metropolitan Financial Media, Inc.",
    clientAddress: "350 Fifth Avenue, 41st Floor, New York, NY 10118",
    consultantName: "Sterling Strategic Advisory, LLC",
    consultantAddress: "120 Broadway, Suite 1800, New York, NY 10271",
    scopeOfServices: "Executive marketing advisory, corporate brand repositioning, digital customer acquisition audit, and quarterly executive steering reports.",
    feeStructure: "Monthly retainer of $7,500.00 USD payable on the first day of each calendar month, plus pre-approved travel expenses.",
    termLength: "12 months",
    terminationNoticeDays: "30",
  },
  steps: [
    {
      id: "consulting_parties",
      title: "Client & Consultant Parties",
      description: "Enter full legal names and addresses for both the client entity and consulting firm.",
      fields: [
        {
          name: "clientName",
          label: "Client Company Name",
          type: "text",
          placeholder: "e.g., Metropolitan Financial Media, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "clientAddress",
          label: "Client Principal Address",
          type: "text",
          placeholder: "e.g., 350 Fifth Avenue, 41st Floor, New York, NY 10118",
          required: true,
          gridCols: 2,
        },
        {
          name: "consultantName",
          label: "Consultant / Contractor Name",
          type: "text",
          placeholder: "e.g., Sterling Strategic Advisory, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "consultantAddress",
          label: "Consultant Business Address",
          type: "text",
          placeholder: "e.g., 120 Broadway, Suite 1800, New York, NY 10271",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "engagement_terms",
      title: "Scope, Fees & Retainer",
      description: "Specify consulting deliverables, compensation structure, and contract term.",
      fields: [
        {
          name: "scopeOfServices",
          label: "Detailed Scope of Services (SOW)",
          type: "textarea",
          placeholder: "Describe deliverables, advisory tasks, software development, or strategic milestones...",
          required: true,
          gridCols: 1,
        },
        {
          name: "feeStructure",
          label: "Compensation & Fee Structure",
          type: "text",
          placeholder: "e.g., Monthly retainer of $7,500.00 USD payable on the 1st of each month",
          required: true,
          gridCols: 1,
        },
        {
          name: "termLength",
          label: "Engagement Term / Duration",
          type: "text",
          placeholder: "e.g., 12 months (or until completion of deliverables)",
          required: true,
          gridCols: 2,
        },
        {
          name: "terminationNoticeDays",
          label: "Termination Written Notice (Days)",
          type: "text",
          placeholder: "e.g., 30",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Effective Contract Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const client = data.clientName || "Client Entity";
    const consultant = data.consultantName || "Consultant";
    const term = data.termLength || "12 months";
    const notice = data.terminationNoticeDays || "30";
    const statuteCite = statute?.statuteCitation || "Common Law of Commercial Contracts and IP Assignment";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CONTRACT TYPE", value: "PROFESSIONAL CONSULTING AGREEMENT" },
          { label: "CLIENT ENTITY", value: `${client}` },
          { label: "CLIENT ADDRESS", value: `${data.clientAddress || "Address on file"}` },
          { label: "CONSULTANT / FIRM", value: `${consultant}` },
          { label: "CONSULTANT ADDRESS", value: `${data.consultantAddress || "Address on file"}` },
          { label: "TERM DURATION", value: `${term}` },
          { label: "TERMINATION NOTICE", value: `${notice} Calendar Days Written Notice` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Retention, Term & Scope of Services",
        type: "body",
        paragraphs: [
          `THIS CONSULTING AGREEMENT is entered into as of ${data.noticeDate || "the date of execution"}, by and between ${client} ("Client") and ${consultant} ("Consultant").`,
          `Services: Client hereby engages Consultant, and Consultant agrees to provide the following professional advisory and strategic services: "${data.scopeOfServices || "Professional consulting services as directed by Client"}".`,
          `Term: This Agreement shall commence on the effective date and continue for a period of ${term}, unless terminated earlier in accordance with the termination provisions herein.`,
        ],
      },
      {
        title: "2. Compensation, Invoicing & Expenses",
        type: "body",
        paragraphs: [
          `Compensation: As full consideration for the services rendered by Consultant, Client shall pay: ${data.feeStructure || "Mutually agreed consulting fees"}.`,
          `Expenses: Consultant shall be reimbursed only for reasonable, documented, out-of-pocket travel and lodging expenses pre-approved in writing by Client. Consultant shall invoice Client monthly, and Client shall remit payment within thirty (30) days of receipt.`,
        ],
      },
      {
        title: "3. Independent Contractor Status & Taxes",
        type: "body",
        paragraphs: [
          `Autonomous Status: Consultant is an independent contractor and not an employee, agent, partner, or joint venturer of Client. Consultant retains exclusive control over the manner, means, and hours of performing services.`,
          `Taxes: Consultant assumes sole responsibility for all federal, state, and local income, self-employment, and payroll taxes. Client shall issue an annual IRS Form 1099-NEC and will not withhold payroll taxes or provide employee benefits.`,
        ],
      },
      {
        title: "4. Intellectual Property & Work-for-Hire Assignment",
        type: "body",
        paragraphs: [
          `Work-for-Hire: All reports, software, designs, algorithms, analyses, documentation, and work product conceived or created by Consultant in connection with the services shall be deemed "works made for hire" for Client.`,
          `Assignment: To the extent any work product does not qualify as a work made for hire, Consultant hereby irrevocably assigns to Client all right, title, and interest, including all patent, copyright, and trade secret rights throughout the world.`,
        ],
      },
      {
        title: "5. Termination & Confidentiality",
        type: "body",
        paragraphs: [
          `Termination: Either party may terminate this Agreement without cause upon providing ${notice} days prior written notice. Either party may terminate immediately upon material breach of the other party.`,
          `Confidentiality: Consultant shall hold all non-public proprietary, technical, and commercial information of Client in strict confidence and shall not disclose such information to any third party without prior written consent.`,
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
