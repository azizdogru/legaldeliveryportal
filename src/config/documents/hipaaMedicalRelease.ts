import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const hipaaMedicalReleaseConfig: DocumentConfig = {
  id: "hipaa-medical-release",
  slug: "hipaa-medical-release",
  title: "HIPAA Medical Records Release Authorization",
  shortTitle: "HIPAA Medical Release",
  category: "Healthcare & Privacy",
  description: "Federal HIPAA-compliant authorization form permitting healthcare providers and hospitals to disclose protected health information (PHI) and billing records.",
  metaDescription: "Generate a federal HIPAA-compliant Medical Records Release Authorization (45 C.F.R. Section 164.508). For litigation, insurance, or personal use. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "45 CFR 164.508",
  iconName: "FileHeart",
  searchKeywords: [
    "hipaa authorization form template",
    "medical records release form",
    "hipaa compliant disclosure authorization",
    "request medical records authorization",
    "doctor records release form pdf",
  ],
  features: [
    "Strictly satisfies all federal core elements of 45 C.F.R. Section 164.508(c)",
    "Includes granular checkboxes for clinical notes, billing, imaging, and test results",
    "Contains mandatory federal statements on revocation and redisclosure",
    "Acceptable by major hospital systems, clinics, and health insurance plans",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    patientName: "",
    patientDob: "",
    patientLastFour: "",
    patientAddress: "",
    providerName: "",
    providerAddress: "",
    recipientName: "",
    recipientAddress: "",
    recordScope: "complete_record",
    purposeOfDisclosure: "legal_investigation",
    expirationType: "one_year",
    specificDateRange: "All treatment records to date",
  },
  steps: [
    {
      id: "patient_info",
      title: "Patient Identification",
      description: "Enter identifying details for the patient whose records are to be released.",
      fields: [
        {
          name: "patientName",
          label: "Patient Full Legal Name",
          type: "text",
          placeholder: "e.g., Sarah Catherine Connor",
          required: true,
          gridCols: 1,
        },
        {
          name: "patientDob",
          label: "Patient Date of Birth",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "patientLastFour",
          label: "Last 4 Digits of SSN / Medical Record Number",
          type: "text",
          placeholder: "e.g., 4821",
          required: false,
          gridCols: 2,
        },
        {
          name: "patientAddress",
          label: "Patient Residential Address",
          type: "text",
          placeholder: "e.g., 901 Westwood Boulevard, Los Angeles, CA 90024",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "providers_recipient",
      title: "Disclosing Provider & Designated Recipient",
      description: "Specify which healthcare entity is releasing records and who is authorized to receive them.",
      fields: [
        {
          name: "providerName",
          label: "Name of Healthcare Facility, Hospital, or Physician Disclosing Records",
          type: "text",
          placeholder: "e.g., Cedars-Sinai Medical Center / Health Information Management",
          required: true,
          gridCols: 1,
        },
        {
          name: "providerAddress",
          label: "Provider Facility Address",
          type: "text",
          placeholder: "e.g., 8700 Beverly Blvd, Los Angeles, CA 90048",
          required: true,
          gridCols: 1,
        },
        {
          name: "recipientName",
          label: "Authorized Recipient Name / Law Firm / Entity",
          type: "text",
          placeholder: "e.g., Vance & Associates Legal Group / Jane Vance Esq.",
          required: true,
          gridCols: 1,
        },
        {
          name: "recipientAddress",
          label: "Recipient Address for Delivery",
          type: "text",
          placeholder: "e.g., 1800 Century Park East, Suite 900, Los Angeles, CA 90067",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "records_scope",
      title: "Scope of Records & Statutory Terms",
      description: "Define the specific healthcare information to be released and purpose.",
      fields: [
        {
          name: "recordScope",
          label: "Scope of Medical Records Authorized for Release",
          type: "select",
          required: true,
          options: [
            { label: "Complete Medical Chart and Clinical Record", value: "complete_record" },
            { label: "Billing Invoices and Itemized Financial Statements Only", value: "billing_only" },
            { label: "Diagnostic Imaging (MRI, CT, X-Ray) and Radiology Reports", value: "imaging_reports" },
            { label: "Operative Reports and Discharge Summaries Only", value: "operative_discharge" },
            { label: "Emergency Department and Trauma Records", value: "emergency_only" },
          ],
        },
        {
          name: "specificDateRange",
          label: "Date Range of Treatment / Records",
          type: "text",
          placeholder: "e.g., January 1, 2024 through December 31, 2026 (or 'All Records')",
          required: true,
        },
        {
          name: "purposeOfDisclosure",
          label: "Purpose of Disclosure",
          type: "select",
          required: true,
          options: [
            { label: "Legal Representation and Litigation Claims", value: "legal_investigation" },
            { label: "Insurance Claim Evaluation / Underwriting", value: "insurance_claim" },
            { label: "Personal Medical Review by Patient", value: "personal_review" },
            { label: "Continuing Healthcare Treatment by New Physician", value: "continuing_care" },
          ],
        },
        {
          name: "expirationType",
          label: "Authorization Expiration Term",
          type: "select",
          required: true,
          options: [
            { label: "One (1) Year from Date of Signature", value: "one_year" },
            { label: "Two (2) Years from Date of Signature", value: "two_years" },
            { label: "Upon Formal Conclusion of Pending Legal Matter", value: "case_conclusion" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date of Execution",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const patient = data.patientName || "Patient";
    const dob = data.patientDob || "On File";
    const last4 = data.patientLastFour ? `XXX-XX-${data.patientLastFour}` : "Confidential";
    const provider = data.providerName || "Healthcare Provider";
    const recipient = data.recipientName || "Designated Recipient";
    const dates = data.specificDateRange || "All Treatment Dates";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "PATIENT FULL NAME", value: `${patient}` },
          { label: "DATE OF BIRTH", value: `${dob} | ID Ref: ${last4}` },
          { label: "DISCLOSING HEALTHCARE PROVIDER", value: `${provider}, ${data.providerAddress || ""}` },
          { label: "AUTHORIZED RECIPIENT", value: `${recipient}, ${data.recipientAddress || ""}` },
          { label: "STATUTORY COMPLIANCE", value: "Federal HIPAA Privacy Rule: 45 C.F.R. Section 164.508" },
        ],
      },
      {
        title: "1. Explicit Authorization to Disclose Protected Health Information",
        type: "body",
        paragraphs: [
          `Pursuant to the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and 45 C.F.R. Section 164.508, I hereby voluntarily authorize the healthcare facility or provider named above to disclose, copy, and deliver my Protected Health Information (PHI) to the designated recipient listed herein.`,
          `This authorization covers records relating to treatment dates: ${dates}.`,
        ],
      },
      {
        title: "2. Specific Scope of Information Authorized for Release",
        type: "body",
        paragraphs: [
          `The disclosing entity is authorized to produce the following categories of records:`,
        ],
        bulletPoints: [
          `Category 1: Complete physician notes, clinical charts, progress records, nursing logs, and consultation reports.`,
          `Category 2: Diagnostic test results, pathology findings, MRI/CT/X-ray imaging reports, and laboratory evaluations.`,
          `Category 3: Complete itemized billing statements, account ledgers, insurance claims (UB-04 / CMS-1500), and payment histories.`,
          `Category 4: Emergency department records, operative reports, anesthesia records, and post-discharge orders.`,
        ],
      },
      {
        title: "3. Purpose of Disclosure and Expiration",
        type: "body",
        paragraphs: [
          `Purpose: The information disclosed pursuant to this authorization is to be utilized exclusively for: ${data.purposeOfDisclosure === "legal_investigation" ? "Legal evaluation, dispute resolution, and civil litigation representation" : "Insurance evaluation, patient review, or continuity of clinical care"}.`,
          `Expiration: This authorization shall remain valid until one (1) year from the date of signature below, or upon the formal conclusion of the legal proceedings or claim for which it was requested, unless revoked sooner in writing.`,
        ],
      },
      {
        title: "4. Mandatory Federal Statements under 45 C.F.R. Section 164.508(c)(2)",
        type: "body",
        paragraphs: [
          `Right to Revoke: I understand that I have the right to revoke this authorization in writing at any time by delivering written notice to the privacy officer of the disclosing healthcare facility, except to the extent that action has already been taken in reliance upon it.`,
          `Treatment Conditioning: I understand that the healthcare provider may not condition treatment, payment, enrollment, or eligibility for benefits on whether I sign this authorization, unless permitted by federal law.`,
          `Potential for Redisclosure: I understand that once information is disclosed pursuant to this authorization, it may be subject to redisclosure by the recipient and may no longer be protected by the federal HIPAA Privacy Rule.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
    ];
  },
};
