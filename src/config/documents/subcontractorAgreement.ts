import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const subcontractorAgreementConfig: DocumentConfig = {
  id: "subcontractor-agreement",
  slug: "subcontractor-agreement",
  title: "Subcontractor Agreement (Trade Contractor Master Agreement)",
  shortTitle: "Subcontractor Agreement",
  category: "Real Estate & Construction",
  description: "Comprehensive master subcontractor contract between general contractor and trade subcontractor, establishing scope of work, milestone progress payments, retainage, change orders, OSHA safety, and mutual indemnification.",
  metaDescription: "Create an enforceable Subcontractor Agreement between general contractor and trade subcontractor. Covers progress payments, retainage, OSHA safety, and indemnification for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Trade Master Contract",
  iconName: "HardHat",
  searchKeywords: [
    "subcontractor agreement template pdf",
    "general contractor subcontractor contract",
    "trade subcontractor master agreement",
    "construction subcontractor scope of work",
    "subcontractor retainage and lien waiver",
    "osha subcontractor indemnification form",
  ],
  features: [
    "Defines trade scope of work, project milestones, and substantial completion deadlines",
    "Establishes progress payment schedule, retainage withholding (typically 5% to 10%), and final release",
    "Mandates comprehensive general liability insurance, workers compensation, and additional insured status",
    "Contains ironclad indemnification, change order protocols, and lien waiver requirements",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    contractorName: "Summit Commercial Builders, LLC",
    contractorAddress: "1400 Post Oak Boulevard, Suite 800, Houston, TX 77056",
    subcontractorName: "Precision Mechanical & HVAC, Inc.",
    subcontractorAddress: "4200 North Freeway, Houston, TX 77022",
    projectName: "Westchase Medical Pavilion Phase II",
    projectAddress: "10800 Richmond Avenue, Houston, TX 77042",
    tradeScope: "Complete installation of commercial HVAC ductwork, rooftop package units, VAV boxes, and digital temperature control automation per plan specifications Section 15000.",
    contractPrice: "185000.00",
    retainagePercentage: "10",
    commencementDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    completionDeadlineDays: "90",
  },
  steps: [
    {
      id: "contractor_parties",
      title: "General Contractor & Subcontractor",
      description: "Enter identifying details for the general contractor and the specialty trade subcontractor.",
      fields: [
        {
          name: "contractorName",
          label: "General Contractor Legal Name",
          type: "text",
          placeholder: "e.g., Summit Commercial Builders, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "contractorAddress",
          label: "General Contractor Office Address",
          type: "text",
          placeholder: "e.g., 1400 Post Oak Boulevard, Suite 800, Houston, TX 77056",
          required: true,
          gridCols: 2,
        },
        {
          name: "subcontractorName",
          label: "Subcontractor Legal Business Name",
          type: "text",
          placeholder: "e.g., Precision Mechanical & HVAC, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "subcontractorAddress",
          label: "Subcontractor Office Address",
          type: "text",
          placeholder: "e.g., 4200 North Freeway, Houston, TX 77022",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "project_and_scope",
      title: "Project & Trade Scope of Work",
      description: "Specify job site address, trade deliverables, price, and retainage terms.",
      fields: [
        {
          name: "projectName",
          label: "Construction Project Name",
          type: "text",
          placeholder: "e.g., Westchase Medical Pavilion Phase II",
          required: true,
          gridCols: 2,
        },
        {
          name: "projectAddress",
          label: "Job Site Physical Address",
          type: "text",
          placeholder: "e.g., 10800 Richmond Avenue, Houston, TX 77042",
          required: true,
          gridCols: 2,
        },
        {
          name: "tradeScope",
          label: "Detailed Trade Scope of Work (SOW)",
          type: "textarea",
          placeholder: "Detail specific labor, materials, equipment, and architectural plan specifications...",
          required: true,
          gridCols: 1,
        },
        {
          name: "contractPrice",
          label: "Total Subcontract Sum ($ USD)",
          type: "currency",
          placeholder: "e.g., 185000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "retainagePercentage",
          label: "Retainage Withheld (%)",
          type: "text",
          placeholder: "e.g., 10 (or 5 per state statute)",
          required: true,
          gridCols: 2,
        },
        {
          name: "commencementDate",
          label: "Work Commencement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "completionDeadlineDays",
          label: "Duration to Substantial Completion (Days)",
          type: "text",
          placeholder: "e.g., 90",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Agreement Execution Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const gc = data.contractorName || "General Contractor";
    const sub = data.subcontractorName || "Subcontractor";
    const price = parseFloat(data.contractPrice || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const retainage = data.retainagePercentage || "10";
    const statuteCite = statute?.statuteCitation || "State Construction Prompt Payment & Mechanic's Lien Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: "MASTER SUBCONTRACTOR TRADE AGREEMENT" },
          { label: "GENERAL CONTRACTOR", value: `${gc}` },
          { label: "SUBCONTRACTOR", value: `${sub}` },
          { label: "PROJECT SITE", value: `${data.projectName || "Commercial Project"} at ${data.projectAddress || "Job site on file"}` },
          { label: "SUBCONTRACT SUM", value: `$${price} USD (Retainage: ${retainage}%)` },
          { label: "COMMENCEMENT", value: `${data.commencementDate || "Upon execution"} (${data.completionDeadlineDays || "90"} days to completion)` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Scope of Work & Project Specifications",
        type: "body",
        paragraphs: [
          `THIS SUBCONTRACTOR AGREEMENT is made effective as of ${data.noticeDate || "the date of execution"}, by and between ${gc} ("Contractor") and ${sub} ("Subcontractor").`,
          `Trade Scope: Subcontractor shall furnish all labor, supervision, materials, scaffolding, tools, and equipment necessary to perform the following trade work for the project known as "${data.projectName || "the Project"}" located at ${data.projectAddress || "the job site"}:`,
          `"${data.tradeScope || "Trade construction services per approved project drawings and specifications"}"`,
          `Performance Standards: All work must strictly comply with project architectural specifications, local municipal building codes, and OSHA safety standards.`,
        ],
      },
      {
        title: "2. Contract Price, Progress Payments & Retainage",
        type: "body",
        paragraphs: [
          `Subcontract Sum: Contractor shall pay Subcontractor for the complete performance of the work the total fixed sum of $${price} USD, subject to authorized written change orders.`,
          `Progress Payments: Subcontractor shall submit monthly applications for payment based on the percentage of work physically in place. Contractor shall remit progress payments within thirty (30) days of owner funding, less a statutory retainage deduction of ${retainage}%.`,
          `Final Payment: Retainage and final payment shall be released within thirty (30) days after final architect inspection, municipal certificate of occupancy, and delivery of unconditional final lien waivers.`,
        ],
      },
      {
        title: "3. Insurance, Indemnification & Lien Waivers",
        type: "body",
        paragraphs: [
          `Insurance: Subcontractor shall maintain Commercial General Liability ($1,000,000 per occurrence / $2,000,000 aggregate), Workers' Compensation insurance at statutory limits, and Commercial Auto coverage, naming Contractor and Owner as additional insureds.`,
          `Indemnification: To the fullest extent permitted by law, Subcontractor agrees to defend, indemnify, and hold harmless Contractor and Owner from all claims, damages, losses, and expenses, including reasonable attorney fees, arising out of Subcontractor's performance or bodily injury caused by Subcontractor's personnel.`,
          `Lien Defense: Subcontractor covenants not to record or permit any mechanic's liens to encumber the real property and agrees to deliver statutory progress lien waivers with each payment draw.`,
        ],
      },
      {
        title: "4. Change Orders, Delays & Termination",
        type: "body",
        paragraphs: [
          `Written Change Orders: No alterations, additions, or deductions to the scope of work shall be performed or compensated without a prior written Change Order signed by an authorized executive officer of Contractor.`,
          `Default & Termination: If Subcontractor fails to supply adequate skilled workers, proper materials, or adhere to the project construction schedule, Contractor may, after forty-eight (48) hours written notice, terminate this Agreement, take possession of materials, and complete the work, deducting the cost from sums otherwise due.`,
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
