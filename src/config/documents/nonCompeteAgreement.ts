import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const nonCompeteAgreementConfig: DocumentConfig = {
  id: "non-compete-agreement",
  slug: "non-compete-agreement",
  title: "Non-Compete & Non-Solicitation Agreement",
  shortTitle: "Non-Compete Agreement",
  category: "Business & Employment",
  description: "Enforceable restrictive covenant and trade secret protection agreement carefully drafted to comply with evolving state non-compete statutes and reasonableness standards, featuring tailored geographic scopes, customer non-solicitation, employee anti-raiding terms, and judicial modification clauses.",
  metaDescription: "Draft an enforceable Non-Compete and Non-Solicitation Agreement. Features judicial blue-pencil severability and state-compliant restrictive covenants. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "FTC & State Compliant",
  iconName: "Lock",
  searchKeywords: [
    "non compete agreement template",
    "employee non-solicitation agreement form",
    "restrictive covenant agreement",
    "confidentiality and noncompete contract",
    "noncompete enforceability template",
    "customer non-solicitation clause",
  ],
  features: [
    "Features reasonable geographic radius and tailored temporal restrictions (12 or 24 months)",
    "Customer non-solicitation and employee anti-raiding protection covenants",
    "Trade secret protection and confidential business information safeguards",
    "Includes judicial blue-pencil, modification, and severability clause",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    employerName: "",
    employerAddress: "",
    employeeName: "",
    employeeAddress: "",
    employeeTitle: "Senior Director / Technical Specialist",
    restrictedIndustry: "Specialized technology services, proprietary software architecture, and commercial consulting.",
    geographicRadius: "Within a 30-mile radius of Employer facilities where Employee performed services",
    restrictionDuration: "12",
    nonSolicitationScope: "All active clients, accounts, and prospective customers serviced during the final 12 months of employment.",
  },
  steps: [
    {
      id: "parties_role",
      title: "Employer & Employee Details",
      description: "Enter identifying details for the company and the individual entering into covenants.",
      fields: [
        {
          name: "employerName",
          label: "Employer / Company Name",
          type: "text",
          placeholder: "e.g., Vanguard Strategic Systems LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "employerAddress",
          label: "Company Principal Business Address",
          type: "text",
          placeholder: "e.g., 600 Congress Avenue, Suite 1900, Austin, TX 78701",
          required: true,
          gridCols: 1,
        },
        {
          name: "employeeName",
          label: "Employee / Covenantor Full Legal Name",
          type: "text",
          placeholder: "e.g., Marcus Alexander Bennett",
          required: true,
          gridCols: 1,
        },
        {
          name: "employeeAddress",
          label: "Employee Residential Address",
          type: "text",
          placeholder: "e.g., 2201 Barton Springs Road, Austin, TX 78704",
          required: true,
          gridCols: 1,
        },
        {
          name: "employeeTitle",
          label: "Employee Position / Key Role",
          type: "text",
          placeholder: "e.g., Vice President of Enterprise Architecture",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "scope_restrictions",
      title: "Restrictive Scope & Geographic Limits",
      description: "Define the specific commercial industry, geographic boundary, and temporal duration.",
      fields: [
        {
          name: "restrictedIndustry",
          label: "Specific Restricted Commercial Industry / Line of Business",
          type: "textarea",
          placeholder: "Describe the specific competitive market, proprietary products, or customized software solutions...",
          required: true,
        },
        {
          name: "geographicRadius",
          label: "Reasonable Geographic Boundary",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Within a 25-mile radius of company operating facilities", value: "Within a 25-mile radius of Employer facilities where Employee performed services" },
            { label: "Within a 50-mile radius of company operating facilities", value: "Within a 50-mile radius of Employer facilities where Employee performed services" },
            { label: "Designated metropolitan statistical area (MSA)", value: "Within the designated Metropolitan Statistical Area of Employer" },
            { label: "Customer-specific territory (no broad geographic exclusion)", value: "Limited strictly to customers and territories specifically assigned to Employee" },
          ],
        },
        {
          name: "restrictionDuration",
          label: "Post-Termination Duration (Months)",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "12 Months (Statutorily Preferred Reasonable Standard)", value: "12" },
            { label: "6 Months", value: "6" },
            { label: "24 Months (Upper Statutory Limit)", value: "24" },
          ],
        },
      ],
    },
    {
      id: "solicitation_execution",
      title: "Non-Solicitation & Execution",
      description: "Establish client non-solicitation, employee anti-raiding, and execution date.",
      fields: [
        {
          name: "nonSolicitationScope",
          label: "Customer & Client Non-Solicitation Terms",
          type: "textarea",
          placeholder: "e.g., Prohibits soliciting any active client or customer serviced by Employee during the prior 12 months...",
          required: true,
        },
        {
          name: "noticeDate",
          label: "Effective Agreement Date",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const employer = data.employerName || "Employer";
    const employee = data.employeeName || "Employee";
    const duration = data.restrictionDuration || "12";
    const statuteCite = statute?.statuteCitation || "State Restrictive Covenant and Trade Secret Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "EMPLOYER (COMPANY)", value: `${employer}, ${data.employerAddress || ""}` },
          { label: "EMPLOYEE (COVENANTOR)", value: `${employee} (${data.employeeTitle || "Position"}), ${data.employeeAddress || ""}` },
          { label: "POST-TERMINATION DURATION", value: `${duration} Calendar Months following separation` },
          { label: "GEOGRAPHIC BOUNDARY", value: `${data.geographicRadius || "Designated Operating Territory"}` },
          { label: "PROTECTED INTERESTS", value: "Trade Secrets, Proprietary Customer Goodwill, and Specialized Technical Know-How" },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Consideration & Legitimate Business Interests",
        type: "body",
        paragraphs: [
          `THIS NON-COMPETE AND NON-SOLICITATION AGREEMENT is entered into on ${data.noticeDate || "the date of execution"}, by and between ${employer} ("Employer") and ${employee} ("Employee").`,
          `In consideration of employment, continued employment, specialized proprietary training, and access to Employer's valuable trade secrets, confidential customer data, and commercial goodwill, Employee agrees to the restrictive covenants set forth herein.`,
          `The parties acknowledge that Employer has invested substantial resources in developing its proprietary technology, client lists, and pricing models, which constitute legitimate business interests protectable under state law.`,
        ],
      },
      {
        title: "2. Restrictive Covenant Against Direct Competition",
        type: "body",
        paragraphs: [
          `During employment and for a period of ${duration} calendar months following the termination of employment for any reason, Employee shall not, directly or indirectly, own, manage, operate, join, control, or participate in the ownership, management, operation, or control of, or be connected as an officer, director, employee, partner, or consultant with, any business entity that directly competes with Employer in the following restricted line of business:`,
          `"${data.restrictedIndustry || "Employer's proprietary line of business."}"`,
          `Geographic Scope: This covenant is strictly limited to ${data.geographicRadius || "Employer operating territories"}.`,
          `State Statutory Carve-Out: In any state jurisdiction where post-employment non-compete agreements are void by statute (such as California under Business and Professions Code Section 16600, Minnesota, North Dakota, or Oklahoma), this Section 2 shall be deemed inapplicable to the extent prohibited by law, and the parties shall remain bound by the non-solicitation, confidentiality, and trade secret protections below.`,
        ],
      },
      {
        title: "3. Non-Solicitation of Customers & Anti-Raiding of Employees",
        type: "body",
        paragraphs: [
          `Customer Non-Solicitation: During the restriction period of ${duration} months, Employee shall not solicit, divert, take away, or attempt to solicit the business of any customer or prospective customer of Employer with whom Employee had personal contact, serviced, or accessed confidential data regarding during the preceding twelve (12) months.`,
          `Employee Anti-Raiding: During the restriction period, Employee shall not directly or indirectly recruit, solicit, induce, or encourage any employee, independent contractor, or key personnel of Employer to terminate their relationship with Employer.`,
        ],
      },
      {
        title: "4. Judicial Blue-Pencil & Severability Reformation",
        type: "body",
        paragraphs: [
          `If any court of competent jurisdiction finds that the duration, geographic scope, or activity restriction of this Agreement is overbroad or unenforceable, the parties expressly authorize and direct the court to reform, modify, and "blue-pencil" the restrictions to the maximum extent permitted by applicable state law, and to enforce the Agreement as so reformed.`,
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
