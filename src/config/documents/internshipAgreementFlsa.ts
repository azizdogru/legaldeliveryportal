import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const internshipAgreementFlsaConfig: DocumentConfig = {
  id: "internship-agreement-flsa",
  slug: "internship-agreement-flsa",
  title: "Student Internship Agreement (FLSA Educational Training)",
  shortTitle: "Internship Agreement",
  category: "Employment & HR",
  description: "Official student and professional internship contract complying with U.S. Department of Labor Fair Labor Standards Act (FLSA) Primary Beneficiary Test guidelines, establishing educational training milestones, academic credit, compensation stipend, and intellectual property assignment.",
  metaDescription: "Create an official Student Internship Agreement compliant with the Department of Labor FLSA Primary Beneficiary Test. Sets training milestones, stipend, and IP terms for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "FLSA Compliant",
  iconName: "GraduationCap",
  searchKeywords: [
    "internship agreement template pdf",
    "student internship contract flsa",
    "unpaid internship agreement form dol",
    "paid internship offer letter and contract",
    "internship intellectual property agreement",
    "summer internship contract college credit",
  ],
  features: [
    "Conforms to U.S. Department of Labor (DOL) Fact Sheet #71 Primary Beneficiary Test standards",
    "Articulates clear educational learning objectives, mentorship structure, and academic credit coordination",
    "Defines compensation structure: hourly wage, academic stipend, or qualifying unpaid educational status",
    "Secures company trade secrets and work-for-hire assignment of intellectual property created during training",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "MA",
    companyName: "Novus Biotherapeutics, Inc.",
    companyAddress: "100 Binney Street, 8th Floor, Cambridge, MA 02142",
    supervisorName: "Dr. Jonathan David Vance, Senior Director of Research",
    internName: "Samantha Nicole Reed",
    internAddress: "75 Mount Auburn Street, Cambridge, MA 02138",
    academicInstitution: "Harvard University (Department of Molecular Biology)",
    internshipProgramTitle: "Computational Biology & Drug Discovery Summer Research Internship",
    internshipTerm: "June 1, 2026 to August 21, 2026 (12 Weeks)",
    compensationType: "Paid Hourly Rate of $24.00 USD per hour (30 hours per week)",
    learningObjectives: "Hands-on laboratory training in molecular screening pipelines, bio-computational modeling, research data analytics, and weekly executive mentor coaching.",
  },
  steps: [
    {
      id: "intern_parties",
      title: "Employer & Intern Profile",
      description: "Enter identifying details for the host company, supervising mentor, and student intern.",
      fields: [
        {
          name: "companyName",
          label: "Host Company / Organization Name",
          type: "text",
          placeholder: "e.g., Novus Biotherapeutics, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "supervisorName",
          label: "Designated Mentor / Supervisor Name & Title",
          type: "text",
          placeholder: "e.g., Dr. Jonathan David Vance, Senior Director",
          required: true,
          gridCols: 2,
        },
        {
          name: "companyAddress",
          label: "Host Company Facility Address",
          type: "text",
          placeholder: "e.g., 100 Binney Street, Cambridge, MA 02142",
          required: true,
          gridCols: 1,
        },
        {
          name: "internName",
          label: "Student Intern Full Legal Name",
          type: "text",
          placeholder: "e.g., Samantha Nicole Reed",
          required: true,
          gridCols: 2,
        },
        {
          name: "academicInstitution",
          label: "College / University Enrolled",
          type: "text",
          placeholder: "e.g., Harvard University (Molecular Biology)",
          required: true,
          gridCols: 2,
        },
        {
          name: "internAddress",
          label: "Intern Residential Address",
          type: "text",
          placeholder: "e.g., 75 Mount Auburn Street, Cambridge, MA 02138",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "program_terms",
      title: "Program Term, Learning Goals & Pay",
      description: "Specify internship duration, learning objectives, academic credit, and compensation.",
      fields: [
        {
          name: "internshipProgramTitle",
          label: "Internship Program Role / Title",
          type: "text",
          placeholder: "e.g., Computational Biology Summer Research Internship",
          required: true,
          gridCols: 1,
        },
        {
          name: "internshipTerm",
          label: "Program Duration / Term",
          type: "text",
          placeholder: "e.g., June 1, 2026 to August 21, 2026 (12 Weeks)",
          required: true,
          gridCols: 2,
        },
        {
          name: "compensationType",
          label: "Compensation & Academic Credit Terms",
          type: "text",
          placeholder: "e.g., Paid Hourly Rate of $24.00/hr, or Academic Credit Stipend",
          required: true,
          gridCols: 2,
        },
        {
          name: "learningObjectives",
          label: "Educational Learning Objectives & Mentorship Scope",
          type: "textarea",
          placeholder: "Detail hands-on training, skills acquisition, faculty advisor collaboration, and mentor guidance...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Agreement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const comp = data.companyName || "Host Company";
    const intern = data.internName || "Intern";
    const supervisor = data.supervisorName || "Internship Supervisor";
    const term = data.internshipTerm || "Summer Program Term";
    const statuteCite = statute?.statuteCitation || "Fair Labor Standards Act (FLSA, 29 U.S.C. 201) & State Labor Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: "FLSA EDUCATIONAL TRAINING & INTERNSHIP CONTRACT" },
          { label: "HOST ORGANIZATION", value: `${comp}` },
          { label: "STUDENT INTERN", value: `${intern} (${data.academicInstitution || "University Student"})` },
          { label: "SUPERVISING MENTOR", value: `${supervisor}` },
          { label: "INTERNSHIP PROGRAM", value: `${data.internshipProgramTitle || "Educational Internship"}` },
          { label: "PROGRAM DURATION", value: `${term}` },
          { label: "COMPENSATION TERMS", value: `${data.compensationType || "Educational training stipend"}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Educational Purpose & DOL Primary Beneficiary Standard",
        type: "body",
        paragraphs: [
          `THIS INTERNSHIP AGREEMENT is entered into as of ${data.noticeDate || "the date of execution"}, by and between ${comp} ("Company") and ${intern} ("Intern").`,
          `Educational Objective: The primary purpose of this internship is to provide Intern with practical educational training, scientific mentorship, and professional skill development that complements Intern's academic program at ${data.academicInstitution || "Intern's university"}.`,
          `Learning Milestones: Company shall provide hands-on training and mentorship covering: "${data.learningObjectives || "Professional training and practical skill acquisition under assigned mentor guidance"}".`,
          `No Employment Entitlement: Intern understands and agrees that participation in this training program does not entitle Intern to a permanent job at the conclusion of the internship period.`,
        ],
      },
      {
        title: "2. Schedule, Supervision & Compensation",
        type: "body",
        paragraphs: [
          `Supervision: Intern shall report directly to ${supervisor}, who shall oversee Intern's learning plan, conduct regular performance reviews, and coordinate with Intern's academic faculty advisor if academic credit is sought.`,
          `Compensation Structure: As consideration for participation in the program, Intern shall receive: "${data.compensationType || "Agreed training compensation or academic credit"}". Applicable statutory tax withholdings shall be deducted in accordance with federal and state labor laws.`,
        ],
      },
      {
        title: "3. Proprietary Information & Work Product Assignment",
        type: "body",
        paragraphs: [
          `Confidentiality: During the internship, Intern may have access to Company trade secrets, proprietary algorithms, client lists, and research data. Intern agrees to hold all confidential information in strict confidence and shall not disclose or use such information outside the scope of the training program.`,
          `Ownership of Inventions: All research papers, software code, experimental data, algorithms, and discoveries conceived or developed by Intern during the program using Company facilities or relating to Company business are "works made for hire" and shall remain the sole and exclusive property of Company.`,
        ],
      },
      {
        title: "4. Code of Conduct & Program Termination",
        type: "body",
        paragraphs: [
          `Policies: Intern agrees to adhere to all Company safety rules, workplace harassment policies, and laboratory standards.`,
          `Early Termination: Either party may terminate this internship agreement at any time upon providing written notice to the other party, with or without cause.`,
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
