import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const resignationLetterConfig: DocumentConfig = {
  id: "resignation-letter",
  slug: "resignation-letter",
  title: "Formal Letter of Resignation (Two-Week Notice)",
  shortTitle: "Resignation Letter",
  category: "Employment & HR",
  description: "Professional formal employee resignation letter providing official two-week advance notice, project transition assistance, company property return, and final compensation demand under state labor law.",
  metaDescription: "Create an official Formal Letter of Resignation with standard two-week notice, knowledge transfer plan, and final compensation demand compliant with all 50 state labor codes. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Professional Resignation",
  iconName: "Mail",
  searchKeywords: [
    "formal letter of resignation template",
    "two week notice letter pdf",
    "resignation letter with transition plan",
    "professional employee resignation letter",
    "final paycheck demand resignation",
    "simple resignation letter form",
  ],
  features: [
    "Provides clear formal notice of voluntary resignation with exact final working day",
    "Commits to comprehensive transition plan and knowledge transfer to colleagues",
    "Confirms return of all company equipment, security credentials, and confidential files",
    "Formally cites state statutory requirements for final paycheck delivery and PTO payout",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    employeeName: "Jonathan Tyler Vance",
    employeeAddress: "742 Evergreen Terrace, Austin, TX 78701",
    employeePhone: "(512) 555-0199",
    employeeEmail: "jvance.executive@gmail.com",
    companyName: "Nexus Enterprise Solutions, Inc.",
    supervisorName: "Patricia Ann Gomez",
    supervisorTitle: "Vice President of Engineering",
    companyAddress: "100 Congress Avenue, Suite 1200, Austin, TX 78701",
    jobTitle: "Senior Software Engineering Lead",
    lastWorkingDay: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
    reasonForLeaving: "To accept a new executive career opportunity aligned with long-term professional objectives.",
  },
  steps: [
    {
      id: "resignation_parties",
      title: "Employee & Employer Details",
      description: "Enter employee contact details and employer recipient information.",
      fields: [
        {
          name: "employeeName",
          label: "Resigning Employee Full Name",
          type: "text",
          placeholder: "e.g., Jonathan Tyler Vance",
          required: true,
          gridCols: 2,
        },
        {
          name: "jobTitle",
          label: "Current Job Title",
          type: "text",
          placeholder: "e.g., Senior Software Engineering Lead",
          required: true,
          gridCols: 2,
        },
        {
          name: "employeeAddress",
          label: "Employee Personal Mailing Address",
          type: "text",
          placeholder: "e.g., 742 Evergreen Terrace, Austin, TX 78701",
          required: true,
          gridCols: 2,
        },
        {
          name: "employeePhone",
          label: "Personal Contact Phone Number",
          type: "phone",
          placeholder: "e.g., (512) 555-0199",
          required: true,
          gridCols: 2,
        },
        {
          name: "companyName",
          label: "Company / Employer Legal Name",
          type: "text",
          placeholder: "e.g., Nexus Enterprise Solutions, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "supervisorName",
          label: "Supervisor / Manager Name",
          type: "text",
          placeholder: "e.g., Patricia Ann Gomez",
          required: true,
          gridCols: 2,
        },
        {
          name: "supervisorTitle",
          label: "Supervisor Title",
          type: "text",
          placeholder: "e.g., Vice President of Engineering",
          required: true,
          gridCols: 2,
        },
        {
          name: "companyAddress",
          label: "Company Office Address",
          type: "text",
          placeholder: "e.g., 100 Congress Avenue, Suite 1200, Austin, TX 78701",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "resignation_terms",
      title: "Notice & Final Day",
      description: "Specify effective notice date, last working day, and optional departure statement.",
      fields: [
        {
          name: "noticeDate",
          label: "Date Notice Delivered",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "lastWorkingDay",
          label: "Final Working Day (Effective Departure)",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "reasonForLeaving",
          label: "Departure Statement (Optional)",
          type: "textarea",
          placeholder: "e.g., To accept a new professional opportunity, or express gratitude for experience...",
          required: false,
          gridCols: 1,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const employee = data.employeeName || "Employee";
    const company = data.companyName || "Employer";
    const supervisor = data.supervisorName || "Supervisor";
    const lastDay = data.lastWorkingDay || "Two weeks from notice";
    const statuteCite = statute?.statuteCitation || "State Labor Code Final Wage Payment Laws";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE TYPE", value: "FORMAL LETTER OF RESIGNATION" },
          { label: "EMPLOYEE", value: `${employee} (${data.jobTitle || "Employee"})` },
          { label: "EMPLOYER ENTITY", value: `${company}` },
          { label: "ATTENTION", value: `${supervisor}, ${data.supervisorTitle || "Management"}` },
          { label: "NOTICE SUBMISSION DATE", value: `${data.noticeDate || "Current Date"}` },
          { label: "EFFECTIVE DEPARTURE DATE", value: `${lastDay}` },
          { label: "MAILING ADDRESS FOR W2", value: `${data.employeeAddress || "On file"}` },
          { label: "WAGE PAYMENT CODE", value: `${statuteCite}` },
        ],
      },
      {
        title: "Formal Notice of Resignation",
        type: "body",
        paragraphs: [
          `Dear ${supervisor},`,
          `Please accept this formal letter as official notification that I am resigning from my position as ${data.jobTitle || "an employee"} at ${company}. My last working day with the organization will be ${lastDay}.`,
          data.reasonForLeaving
            ? `Reason: ${data.reasonForLeaving}`
            : `I have appreciated the professional opportunities and collegial experiences afforded to me during my tenure with the company.`,
        ],
      },
      {
        title: "Transition Assistance & Handover Protocol",
        type: "body",
        paragraphs: [
          `During the remaining notice period leading up to ${lastDay}, I will dedicate my full efforts to completing pending assignments, organizing client and project documentation, and training colleagues or my successor to ensure a seamless operational transition.`,
          `Return of Property: On or before my final day, I will surrender all company property in my possession, including laptop hardware, security access badges, keys, company credit cards, and confidential digital credentials.`,
        ],
      },
      {
        title: "Final Compensation & Statutory Notice",
        type: "body",
        paragraphs: [
          `Final Wages & Accruals: Pursuant to ${statuteCite}, please arrange for the timely payment of my final earned wages, accrued but unused paid time off (PTO) or vacation pay, and any outstanding reimbursable business expenses.`,
          `Tax Documents: Please ensure that my year-end IRS Form W-2 and all benefits continuation disclosures (including COBRA notices, if applicable) are forwarded to my mailing address: ${data.employeeAddress || "the address on file"}.`,
          `I wish ${company} continued prosperity and success in all future endeavors.`,
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
