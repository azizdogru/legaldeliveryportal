import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const landlordVerificationFormConfig: DocumentConfig = {
  id: "landlord-verification-form",
  slug: "landlord-verification-form",
  title: "Landlord Verification Form (Rental Reference & Tenancy History)",
  shortTitle: "Landlord Verification Form",
  category: "Landlord & Tenant",
  description: "Official rental verification inquiry and questionnaire executed by prospective landlords and completed by past landlords to verify rental applicant payment timeliness, lease violations, property maintenance, and re-rental eligibility.",
  metaDescription: "Create an official Landlord Verification Form. Evaluates rental applicant payment timeliness, lease violations, deposit refunds, and re-rental eligibility for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Tenant Reference Check",
  iconName: "ClipboardCheck",
  searchKeywords: [
    "landlord verification form template pdf",
    "rental history verification form",
    "past landlord reference questionnaire",
    "tenant screening landlord verification",
    "proof of prior tenancy form",
    "landlord reference check document",
  ],
  features: [
    "Includes signed applicant Fair Credit Reporting Act (FCRA) consent releasing rental records",
    "Audits lease duration, monthly rent paid, payment timeliness, and bounced check frequency",
    "Documents unauthorized pets, occupants, noise complaints, or property damage incidents",
    "Asks the decisive landlord question: 'Would you re-rent to this applicant?'",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "GA",
    requestingLandlord: "Peachtree Property Group, LLC",
    requestingAgent: "Amanda Leigh Foster, Leasing Director",
    requestingEmail: "leasing@peachtreeprop.com",
    previousLandlord: "Highland Terrace Apartments",
    previousLandlordAgent: "Marcus Wayne Vance, Property Manager",
    previousLandlordPhone: "(404) 555-0192",
    applicantName: "Jordan Michael Taylor",
    applicantAddress: "1420 Piedmont Avenue NE, Apt 5B, Atlanta, GA 30309",
    tenancyDates: "June 1, 2024 to May 31, 2026 (24 Months)",
    monthlyRentAmount: "2150.00",
    paymentPunctuality: "Always paid on or before the 1st of the month; zero late fees or NSF checks.",
    leaseViolations: "None. No noise complaints, no unauthorized pets, and premises maintained in excellent condition.",
    securityDepositRefunded: "Full deposit refunded with zero damage deductions.",
    wouldReRent: "Yes, without reservation",
  },
  steps: [
    {
      id: "inquiry_parties",
      title: "Applicant & Landlord Entities",
      description: "Enter details for the rental applicant, requesting management company, and prior landlord.",
      fields: [
        {
          name: "applicantName",
          label: "Rental Applicant Full Name",
          type: "text",
          placeholder: "e.g., Jordan Michael Taylor",
          required: true,
          gridCols: 2,
        },
        {
          name: "applicantAddress",
          label: "Subject Prior Rental Premises Address",
          type: "text",
          placeholder: "e.g., 1420 Piedmont Avenue NE, Apt 5B, Atlanta, GA 30309",
          required: true,
          gridCols: 2,
        },
        {
          name: "requestingLandlord",
          label: "Prospective / Requesting Landlord Entity",
          type: "text",
          placeholder: "e.g., Peachtree Property Group, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "requestingAgent",
          label: "Requesting Leasing Agent Name & Title",
          type: "text",
          placeholder: "e.g., Amanda Leigh Foster, Leasing Director",
          required: true,
          gridCols: 2,
        },
        {
          name: "previousLandlord",
          label: "Prior Landlord / Management Company",
          type: "text",
          placeholder: "e.g., Highland Terrace Apartments",
          required: true,
          gridCols: 2,
        },
        {
          name: "previousLandlordAgent",
          label: "Prior Landlord Verifying Agent Name",
          type: "text",
          placeholder: "e.g., Marcus Wayne Vance, Property Manager",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "tenancy_eval",
      title: "Rental History & Conduct Evaluation",
      description: "Document lease duration, rent rate, payment punctuality, and conduct history.",
      fields: [
        {
          name: "tenancyDates",
          label: "Dates of Tenancy (Move-In to Move-Out)",
          type: "text",
          placeholder: "e.g., June 1, 2024 to May 31, 2026",
          required: true,
          gridCols: 2,
        },
        {
          name: "monthlyRentAmount",
          label: "Monthly Rent Rate ($ USD)",
          type: "currency",
          placeholder: "e.g., 2150.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "paymentPunctuality",
          label: "Rent Payment Timeliness & NSF History",
          type: "text",
          placeholder: "e.g., Always on time / Paid late 1 time / Zero returned checks",
          required: true,
          gridCols: 1,
        },
        {
          name: "leaseViolations",
          label: "Notices of Violation, Noise, Pets or Damage",
          type: "textarea",
          placeholder: "List any written notices served, unauthorized occupants, or enter 'None'...",
          required: true,
          gridCols: 1,
        },
        {
          name: "securityDepositRefunded",
          label: "Security Deposit Refund Status",
          type: "text",
          placeholder: "e.g., Full deposit refunded / $150 deducted for carpet cleaning",
          required: true,
          gridCols: 2,
        },
        {
          name: "wouldReRent",
          label: "Would You Re-Rent to this Tenant?",
          type: "select",
          options: [
            { label: "Yes, without reservation", value: "Yes, without reservation" },
            { label: "Yes, with conditions", value: "Yes, with conditions" },
            { label: "No, would not re-rent", value: "No, would not re-rent" },
          ],
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Verification Completion Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const applicant = data.applicantName || "Rental Applicant";
    const reqLandlord = data.requestingLandlord || "Requesting Management";
    const prevLandlord = data.previousLandlord || "Previous Landlord";
    const wouldRent = data.wouldReRent || "Yes, without reservation";
    const statuteCite = statute?.statuteCitation || "Fair Credit Reporting Act (15 U.S.C. 1681) & State Tenant Screening Laws";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "DOCUMENT TYPE", value: "OFFICIAL LANDLORD VERIFICATION & RENTAL REFERENCE" },
          { label: "RENTAL APPLICANT", value: `${applicant}` },
          { label: "PRIOR RENTAL PREMISES", value: `${data.applicantAddress || "Address on file"}` },
          { label: "REQUESTING LANDLORD", value: `${reqLandlord} (Attn: ${data.requestingAgent || "Leasing Office"})` },
          { label: "VERIFYING LANDLORD", value: `${prevLandlord} (Agent: ${data.previousLandlordAgent || "Manager"})` },
          { label: "REPORTED TENANCY DATES", value: `${data.tenancyDates || "Dates on file"} ($${parseFloat(data.monthlyRentAmount || "0").toFixed(2)}/mo)` },
          { label: "RE-RENTAL ELIGIBILITY", value: `${wouldRent.toUpperCase()}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Tenancy History & Financial Ledger Verification",
        type: "body",
        paragraphs: [
          `The undersigned prior landlord/property manager hereby certifies the following factual rental history regarding former tenant ${applicant}, who occupied the premises at ${data.applicantAddress || "the subject premises"}:`,
          `Occupancy Window: ${data.tenancyDates || "As indicated on lease records"}. Monthly Rent Paid: $${parseFloat(data.monthlyRentAmount || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })} USD.`,
          `Payment Record: "${data.paymentPunctuality || "Rent was tendered timely throughout the duration of tenancy with zero default proceedings."}"`,
        ],
      },
      {
        title: "2. Lease Compliance, Property Condition & Deposit Accounting",
        type: "body",
        paragraphs: [
          `Lease Violations & Notices: "${data.leaseViolations || "No formal written notices of lease violations, noise disturbances, or unauthorized occupants were issued."}"`,
          `Property Care & Housekeeping: Tenant maintained the rental premises in good and sanitary order. No abnormal physical waste or tenant negligence occurred.`,
          `Deposit Disposition: "${data.securityDepositRefunded || "Security deposit was accounted for and refunded pursuant to state statutory deposit deadlines."}"`,
        ],
      },
      {
        title: "3. Re-Rental Recommendation & Evaluator Certification",
        type: "body",
        paragraphs: [
          `Re-Rental Recommendation: In response to whether this management office would re-rent to applicant ${applicant}, the evaluating landlord confirms: "${wouldRent}".`,
          `Truthfulness of Disclosures: Evaluator certifies that all statements made herein are true, objective, and based upon contemporaneous rental ledger records, completed pursuant to the applicant's signed information release authorization.`,
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
