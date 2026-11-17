import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const employeeInventionAgreementConfig: DocumentConfig = {
  id: "employee-invention-agreement",
  slug: "employee-invention-agreement",
  title: "Proprietary Information & Inventions Agreement (PIIA)",
  shortTitle: "Inventions Agreement (PIIA)",
  category: "Employment & HR",
  description: "Comprehensive employee proprietary information, intellectual property assignment, work-for-hire, trade secrets, and patent assignment contract with statutory prior invention carve-outs.",
  metaDescription: "Create an enforceable Proprietary Information and Inventions Agreement (PIIA). Secures IP assignments, trade secrets, and prior inventions carve-outs for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "IP Assignment & PIIA",
  iconName: "Shield",
  searchKeywords: [
    "proprietary information and inventions agreement piia",
    "employee intellectual property assignment template",
    "confidential information and inventions agreement",
    "piia patent assignment form",
    "prior inventions exclusion schedule",
    "trade secrets assignment contract",
  ],
  features: [
    "Full assignment of all patents, copyrights, algorithms, and trade secrets created during employment",
    "Statutory prior inventions carve-out schedule protecting pre-existing employee inventions",
    "Strict non-disclosure obligations covering proprietary source code, customer lists, and financials",
    "Complies with state invention assignment statutes (e.g., California Labor Code 2870)",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    employerName: "Apex Cybernetics Corporation",
    employerAddress: "500 Howard Street, Suite 800, San Francisco, CA 94105",
    employeeName: "David Michael Sterling",
    employeeAddress: "1420 Mission Street, Apt 5B, San Francisco, CA 94103",
    jobTitle: "Senior Systems Architect",
    priorInventions: "None. All prior personal side projects have been disclosed or disclaimed.",
    nonSolicitPeriodMonths: "12",
  },
  steps: [
    {
      id: "piia_parties",
      title: "Employer & Employee Identity",
      description: "Enter company and employee legal names and addresses.",
      fields: [
        {
          name: "employerName",
          label: "Company / Employer Legal Name",
          type: "text",
          placeholder: "e.g., Apex Cybernetics Corporation",
          required: true,
          gridCols: 2,
        },
        {
          name: "employerAddress",
          label: "Company Principal Address",
          type: "text",
          placeholder: "e.g., 500 Howard Street, Suite 800, San Francisco, CA 94105",
          required: true,
          gridCols: 2,
        },
        {
          name: "employeeName",
          label: "Employee Full Legal Name",
          type: "text",
          placeholder: "e.g., David Michael Sterling",
          required: true,
          gridCols: 2,
        },
        {
          name: "jobTitle",
          label: "Job Title / Role",
          type: "text",
          placeholder: "e.g., Senior Systems Architect",
          required: true,
          gridCols: 2,
        },
        {
          name: "employeeAddress",
          label: "Employee Residential Address",
          type: "text",
          placeholder: "e.g., 1420 Mission Street, Apt 5B, San Francisco, CA 94103",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "piia_terms",
      title: "Invention Disclosures & Terms",
      description: "Declare prior excluded inventions and non-solicitation restrictions.",
      fields: [
        {
          name: "priorInventions",
          label: "Prior Inventions Schedule (Excluded from Assignment)",
          type: "textarea",
          placeholder: "List any prior patents, software codebases, or inventions created before employment. If none, enter 'None'.",
          required: true,
          gridCols: 1,
        },
        {
          name: "nonSolicitPeriodMonths",
          label: "Employee Non-Solicitation Duration (Months)",
          type: "text",
          placeholder: "e.g., 12",
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
    const employer = data.employerName || "Employer";
    const employee = data.employeeName || "Employee";
    const prior = data.priorInventions || "None";
    const statuteCite = statute?.statuteCitation || "Uniform Trade Secrets Act & Labor Code Invention Provisions";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: "PROPRIETARY INFORMATION & INVENTIONS AGREEMENT (PIIA)" },
          { label: "EMPLOYER ENTITY", value: `${employer}` },
          { label: "EMPLOYEE", value: `${employee} (${data.jobTitle || "Employee"})` },
          { label: "EFFECTIVE DATE", value: `${data.noticeDate || "Date of Execution"}` },
          { label: "PRIOR INVENTIONS", value: prior.length > 50 ? `${prior.substring(0, 50)}...` : prior },
          { label: "COVENANT DURATION", value: `${data.nonSolicitPeriodMonths || "12"} Months Post-Employment` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Confidentiality & Proprietary Information",
        type: "body",
        paragraphs: [
          `THIS PROPRIETARY INFORMATION AND INVENTIONS AGREEMENT is entered into as of ${data.noticeDate || "the date of execution"}, by and between ${employer} ("Company") and ${employee} ("Employee").`,
          `Nondisclosure: Employee acknowledges that during employment, Employee will have access to secret, confidential, and proprietary information, including algorithms, source code, customer databases, technical architectures, and financial plans. Employee shall hold all Proprietary Information in strict trust and confidence and shall never disclose or use such information except for the sole benefit of Company.`,
        ],
      },
      {
        title: "2. Assignment of Inventions & Works Made for Hire",
        type: "body",
        paragraphs: [
          `Ownership: All inventions, computer code, software programs, designs, patentable discoveries, workflows, and copyrightable works created, conceived, or reduced to practice by Employee (solely or jointly) during employment that relate to Company business or result from tasks performed for Company are the sole and exclusive property of Company.`,
          `Work Made for Hire: All copyrightable materials prepared by Employee within the scope of employment are "works made for hire" under the United States Copyright Act. To the extent any invention or work does not qualify, Employee hereby irrevocably assigns all worldwide title, copyright, and patent rights to Company.`,
        ],
      },
      {
        title: "3. Statutory Carve-Out & Excluded Inventions",
        type: "body",
        paragraphs: [
          `Statutory Carve-Out Notice: In accordance with state labor codes (e.g., California Labor Code Section 2870), this Agreement does NOT apply to an invention for which no equipment, supplies, facility, or trade secret information of Company was used, and which was developed entirely on Employee's own time, unless the invention relates directly to Company business or results from work performed by Employee for Company.`,
          `Prior Inventions Schedule: Employee certifies that the following represents a complete list of all prior inventions created prior to employment that are excluded from this assignment: "${prior}".`,
        ],
      },
      {
        title: "4. Return of Materials & Post-Employment Restraints",
        type: "body",
        paragraphs: [
          `Surrender of Property: Upon termination of employment, Employee shall promptly deliver to Company all devices, records, data, notes, blueprints, and files containing Company Proprietary Information.`,
          `Non-Solicitation: For a period of ${data.nonSolicitPeriodMonths || "12"} months following termination of employment, Employee shall not directly or indirectly solicit, induce, or encourage any employee or independent contractor of Company to leave their employment.`,
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
