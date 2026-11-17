import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const employmentSeparationAgreementConfig: DocumentConfig = {
  id: "employment-separation-agreement",
  slug: "employment-separation-agreement",
  title: "Employment Separation & Severance Agreement (General Release)",
  shortTitle: "Severance Agreement",
  category: "Business & Corporate",
  description: "Comprehensive corporate employment termination and severance release contract incorporating OWBPA statutory 21-day review and 7-day revocation periods, full waiver of employment claims, and non-disparagement covenants.",
  metaDescription: "Generate a state-compliant Employment Separation & Severance Agreement. Meets federal OWBPA 21-day and 7-day rules and releases all employment claims for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "OWBPA & EEOC Compliant",
  iconName: "UserMinus",
  searchKeywords: [
    "employment separation agreement template",
    "severance agreement and general release pdf",
    "employee termination agreement form",
    "owbpa 21 day severance agreement",
    "employer waiver of claims contract",
    "severance pay agreement template",
  ],
  features: [
    "Incorporates federal Older Workers Benefit Protection Act (OWBPA 29 U.S.C. 626(f)) statutory requirements",
    "Includes mandatory 21-day consideration period and statutory 7-day post-signature revocation window",
    "Comprehensive general release waiving Title VII, ADA, ADEA, FMLA, and state wage claims",
    "Protects employer with ironclad non-disparagement, trade secret return, and cooperation clauses",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "NY",
    employerName: "Beacon Media Holdings Inc.",
    employerAddress: "1250 Avenue of the Americas, 24th Floor, New York, NY 10020",
    employeeName: "",
    employeeAddress: "",
    separationDate: new Date().toISOString().split("T")[0],
    severanceAmount: "12500.00",
    severancePaymentMethod: "Lump sum via standard payroll direct deposit within 14 days of revocation period expiration",
    accruedPtoPayout: "2400.00",
    healthBenefitSubsidy: "Employer will pay the employer-share of COBRA health continuation premiums for a period of 3 calendar months.",
    reviewPeriodDays: "21",
  },
  steps: [
    {
      id: "employer_employee",
      title: "Employer & Employee",
      description: "Enter identifying details for the corporate employer and separating employee.",
      fields: [
        {
          name: "employerName",
          label: "Employer Company Full Legal Name",
          type: "text",
          placeholder: "e.g., Beacon Media Holdings Inc.",
          required: true,
          gridCols: 1,
        },
        {
          name: "employerAddress",
          label: "Employer Notice Address",
          type: "text",
          placeholder: "e.g., 1250 Avenue of the Americas, 24th Floor, New York, NY 10020",
          required: true,
          gridCols: 1,
        },
        {
          name: "employeeName",
          label: "Separating Employee Full Legal Name",
          type: "text",
          placeholder: "e.g., Katherine Elizabeth Brooks",
          required: true,
          gridCols: 1,
        },
        {
          name: "employeeAddress",
          label: "Employee Physical Address",
          type: "text",
          placeholder: "e.g., 45 Sutton Place South, Apt 8G, New York, NY 10022",
          required: true,
          gridCols: 1,
        },
        {
          name: "separationDate",
          label: "Official Employment Termination Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "severance_consideration",
      title: "Severance Pay & Benefits",
      description: "Define the monetary severance consideration, accrued PTO payout, and COBRA terms.",
      fields: [
        {
          name: "severanceAmount",
          label: "Gross Severance Pay Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 12500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "accruedPtoPayout",
          label: "Earned Unused PTO / Vacation Payout ($ USD)",
          type: "currency",
          placeholder: "e.g., 2400.00",
          required: false,
          gridCols: 2,
        },
        {
          name: "severancePaymentMethod",
          label: "Severance Payment Timing & Form",
          type: "text",
          placeholder: "e.g., Lump sum direct deposit upon expiration of 7-day revocation window",
          required: true,
          gridCols: 1,
        },
        {
          name: "healthBenefitSubsidy",
          label: "COBRA / Health Benefits Continuation Terms",
          type: "text",
          placeholder: "e.g., Employer pays full COBRA premiums for 3 months following separation",
          required: true,
          gridCols: 1,
        },
        {
          name: "reviewPeriodDays",
          label: "OWBPA Consideration Window",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "21 Calendar Days (Individual Employee Separation)", value: "21" },
            { label: "45 Calendar Days (Group Layoff / Reduction in Force)", value: "45" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date Agreement Tendered to Employee",
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
    const severance = parseFloat(data.severanceAmount || "0").toFixed(2);
    const pto = parseFloat(data.accruedPtoPayout || "0").toFixed(2);
    const days = data.reviewPeriodDays || "21";
    const statuteCite = statute?.statuteCitation || "Title VII, ADA, ADEA, OWBPA & State Labor Law";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CONTRACT TYPE", value: "SEPARATION AGREEMENT AND GENERAL RELEASE OF CLAIMS" },
          { label: "EMPLOYER", value: `${employer}, ${data.employerAddress || ""}` },
          { label: "EMPLOYEE", value: `${employee}, ${data.employeeAddress || ""}` },
          { label: "TERMINATION DATE", value: `${data.separationDate || "Separation Date"}` },
          { label: "SEVERANCE CONSIDERATION", value: `$${severance} USD gross subject to statutory tax withholding` },
          { label: "ACCRUED PTO PAYOUT", value: `$${pto} USD (Paid regardless of signing release)` },
          { label: "COBRA CONTINUATION", value: `${data.healthBenefitSubsidy || "Per agreement"}` },
          { label: "OWBPA STATUTORY PERIODS", value: `${days}-Day Review Window | 7-Day Irrevocable Revocation Period` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Separation of Employment & Final Compensation",
        type: "body",
        paragraphs: [
          `THIS EMPLOYMENT SEPARATION AGREEMENT AND RELEASE is entered into by and between ${employer} ("Employer") and ${employee} ("Employee"). Employee's active employment shall terminate effective ${data.separationDate || "the separation date"}.`,
          `Earned Wages & PTO: Regardless of whether Employee signs this Agreement, Employer shall pay Employee all earned, unpaid base wages through the separation date, along with accrued unused paid time off (PTO) in the gross amount of $${pto} USD, in accordance with applicable state wage payment laws.`,
        ],
      },
      {
        title: "2. Severance Consideration & Benefits Continuation",
        type: "body",
        paragraphs: [
          `In exchange for Employee's execution and non-revocation of this Agreement and release of all claims, Employer agrees to provide Employee with severance pay in the gross amount of $${severance} USD, less standard applicable payroll tax withholdings and deductions, payable via ${data.severancePaymentMethod || "standard direct deposit"}.`,
          `Employee acknowledges that this severance payment constitutes substantial consideration over and above anything to which Employee is already legally entitled.`,
          `Health Continuation: ${data.healthBenefitSubsidy || "Employer will provide COBRA health continuation assistance as specified."}`,
        ],
      },
      {
        title: "3. Comprehensive General Release & Waiver of Claims",
        type: "body",
        paragraphs: [
          `In consideration of the severance benefits provided herein, Employee knowingly and voluntarily releases, acquits, and forever discharges Employer, its parent corporations, affiliates, officers, directors, and agents from any and all claims, liabilities, lawsuits, causes of action, or demands of any nature whatsoever, known or unknown, arising on or before the date of execution.`,
          `This release includes, without limitation: Title VII of the Civil Rights Act of 1964; the Americans with Disabilities Act (ADA); the Age Discrimination in Employment Act (ADEA); the Family and Medical Leave Act (FMLA); the Fair Labor Standards Act (FLSA); the Employee Retirement Income Security Act (ERISA); and any state or municipal civil rights, fair employment, wage payment, or wrongful discharge statutes.`,
        ],
      },
      {
        title: `4. Older Workers Benefit Protection Act (OWBPA) Statutory Notices`,
        type: "body",
        paragraphs: [
          `Pursuant to the Older Workers Benefit Protection Act (29 U.S.C. Section 626(f)), Employee is expressly advised of the following:`,
          `(a) Advice of Counsel: Employee is advised to consult with an independent attorney prior to signing this Agreement.`,
          `(b) Review Period: Employee is granted up to ${days} calendar days from receipt of this Agreement to consider its terms before signing.`,
          `(c) 7-Day Revocation Period: Following execution, Employee has seven (7) calendar days to revoke this Agreement in writing delivered to Employer. This Agreement shall not become effective or enforceable, and no severance funds shall be disbursed, until this 7-day revocation period has expired without revocation.`,
        ],
      },
      {
        title: "5. Non-Disparagement & Confidentiality",
        type: "body",
        paragraphs: [
          `Employee agrees not to make, publish, or communicate to any person or entity any defamatory, derogatory, or disparaging remarks concerning Employer, its services, officers, or commercial practices. Employee further agrees to return all company property, laptops, access keys, documents, and proprietary materials on or before the separation date.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
    ];
  },
};
