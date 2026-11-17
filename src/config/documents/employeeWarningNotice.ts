import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const employeeWarningNoticeConfig: DocumentConfig = {
  id: "employee-warning-notice",
  slug: "employee-warning-notice",
  title: "Employee Written Warning Notice (Progressive Discipline)",
  shortTitle: "Employee Warning Notice",
  category: "Employment & HR",
  description: "Formal HR progressive discipline document detailing employee performance deficiencies, attendance infractions, corrective action timelines, and consequences up to employment termination.",
  metaDescription: "Create an official Employee Written Warning Notice for HR progressive discipline. Details infractions, corrective action plans, and termination warnings for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "HR Progressive Discipline",
  iconName: "AlertTriangle",
  searchKeywords: [
    "employee written warning notice template",
    "disciplinary action form hr pdf",
    "employee write up form template",
    "progressive discipline warning letter",
    "corrective action plan employee",
    "unemployment defense documentation hr",
  ],
  features: [
    "Classifies discipline severity (First Written Warning, Second Warning, or Final Termination Notice)",
    "Documents specific violation categories (Attendance, Insubordination, Poor Performance, Safety)",
    "Establishes a mandatory Corrective Action Plan (CAP) with measurable review deadlines",
    "Protects employer legal position with signed employee acknowledgment and witness signature",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "OH",
    employerName: "Midwest Logistics Distribution, Inc.",
    employerAddress: "4200 Buckeye Industrial Parkway, Columbus, OH 43207",
    employeeName: "Marcus Anthony Reynolds",
    jobTitle: "Warehouse Fulfillment Specialist",
    supervisorName: "Sarah Lynn Jenkins, Operations Manager",
    warningLevel: "Final Written Warning",
    violationType: "Attendance & Unexcused Absences",
    incidentDescription: "Employee accumulated three (3) consecutive unexcused and unreported absences on October 12, 13, and 14, in direct violation of the Employee Handbook Attendance Policy Section 4.2.",
    correctiveActionPlan: "Immediate compliance with all scheduled shift reporting. Any subsequent unexcused absence, tardiness exceeding 10 minutes, or failure to give 2-hour advance notice will result in immediate termination.",
    reviewPeriodDays: "30",
  },
  steps: [
    {
      id: "warning_parties",
      title: "Employer & Employee Profile",
      description: "Enter company, supervisor, and employee identifying details.",
      fields: [
        {
          name: "employerName",
          label: "Employer / Company Name",
          type: "text",
          placeholder: "e.g., Midwest Logistics Distribution, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "employerAddress",
          label: "Company Facility Address",
          type: "text",
          placeholder: "e.g., 4200 Buckeye Industrial Parkway, Columbus, OH 43207",
          required: true,
          gridCols: 2,
        },
        {
          name: "employeeName",
          label: "Employee Full Name",
          type: "text",
          placeholder: "e.g., Marcus Anthony Reynolds",
          required: true,
          gridCols: 2,
        },
        {
          name: "jobTitle",
          label: "Employee Job Title",
          type: "text",
          placeholder: "e.g., Warehouse Fulfillment Specialist",
          required: true,
          gridCols: 2,
        },
        {
          name: "supervisorName",
          label: "Issuing Supervisor Name & Title",
          type: "text",
          placeholder: "e.g., Sarah Lynn Jenkins, Operations Manager",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "infraction_details",
      title: "Violation & Corrective Plan",
      description: "Classify disciplinary level, describe the infraction, and set improvement requirements.",
      fields: [
        {
          name: "warningLevel",
          label: "Disciplinary Action Level",
          type: "select",
          options: [
            { label: "First Written Warning", value: "First Written Warning" },
            { label: "Second Written Warning", value: "Second Written Warning" },
            { label: "Final Written Warning", value: "Final Written Warning" },
            { label: "Suspension with Warning", value: "Suspension with Warning" },
          ],
          required: true,
          gridCols: 2,
        },
        {
          name: "violationType",
          label: "Primary Infraction Category",
          type: "text",
          placeholder: "e.g., Attendance, Performance Deficiencies, Safety Violation, Conduct",
          required: true,
          gridCols: 2,
        },
        {
          name: "incidentDescription",
          label: "Specific Facts & Policy Violations",
          type: "textarea",
          placeholder: "Detail dates, times, affected handbook policies, and witness accounts...",
          required: true,
          gridCols: 1,
        },
        {
          name: "correctiveActionPlan",
          label: "Mandatory Corrective Action Plan (CAP)",
          type: "textarea",
          placeholder: "Describe required performance benchmarks and expected conduct changes...",
          required: true,
          gridCols: 1,
        },
        {
          name: "reviewPeriodDays",
          label: "Follow-Up Review Period (Days)",
          type: "text",
          placeholder: "e.g., 30 (or 60, 90)",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Date Notice Delivered",
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
    const level = data.warningLevel || "Written Warning";
    const statuteCite = statute?.statuteCitation || "At-Will Employment and State Labor Code Standards";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "DOCUMENT TYPE", value: `EMPLOYEE DISCIPLINARY NOTICE (${level.toUpperCase()})` },
          { label: "EMPLOYER ENTITY", value: `${employer}` },
          { label: "EMPLOYEE NAME", value: `${employee} (${data.jobTitle || "Employee"})` },
          { label: "ISSUING SUPERVISOR", value: `${data.supervisorName || "HR Department"}` },
          { label: "INFRACTION CATEGORY", value: `${data.violationType || "Policy Violation"}` },
          { label: "DATE OF ISSUANCE", value: `${data.noticeDate || "Current Date"}` },
          { label: "RE-EVALUATION WINDOW", value: `${data.reviewPeriodDays || "30"} Calendar Days` },
          { label: "EMPLOYMENT JURISDICTION", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Statement of Violation & Incident Facts",
        type: "body",
        paragraphs: [
          `This Written Warning Notice serves as formal notification under the progressive discipline policy of ${employer} that employee ${employee} has engaged in conduct or performance that fails to meet required company standards.`,
          `Incident Description: ${data.incidentDescription || "Failure to adhere to company performance, attendance, or safety standards."}`,
          `Policy Impact: The conduct detailed above directly violates company operating standards and disrupts business operations. Prior coaching or oral advisories, if any, are incorporated herein.`,
        ],
      },
      {
        title: "2. Corrective Action Plan & Performance Benchmarks",
        type: "body",
        paragraphs: [
          `Required Actions: Employee must immediately undertake and sustain the following corrective measures: "${data.correctiveActionPlan || "Immediate compliance with all job requirements and company rules"}".`,
          `Monitoring: Supervisor will monitor employee performance on a daily basis over the next ${data.reviewPeriodDays || "30"} calendar days. A formal re-evaluation meeting will occur at the conclusion of this period.`,
        ],
      },
      {
        title: "3. Consequences of Continued Non-Compliance",
        type: "body",
        paragraphs: [
          `Failure to satisfy the corrective action requirements, or any further infraction of company policy during or following this review period, will lead to immediate escalation of disciplinary measures, up to and including termination of employment.`,
          `At-Will Disclaimer: Nothing in this corrective notice alters the at-will status of the employment relationship, which may be terminated by either party at any time with or without cause.`,
        ],
      },
      {
        title: "4. Employee Acknowledgment & Right of Rebuttal",
        type: "body",
        paragraphs: [
          `Employee Signature Acknowledgment: By signing below, Employee acknowledges receipt of this Written Warning Notice. Employee's signature confirms receipt and discussion of the document, but does not necessarily indicate agreement with all statements contained herein. Employee retains the right to submit a written rebuttal within five (5) business days for inclusion in their permanent personnel file.`,
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
