import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const noticeOfIntentToEnterConfig: DocumentConfig = {
  id: "notice-of-intent-to-enter",
  slug: "notice-of-intent-to-enter",
  title: "Landlord's Notice of Intent to Enter",
  shortTitle: "Notice of Intent to Enter",
  category: "Landlord & Tenant",
  description: "Official written notice from landlord or property manager exercising statutory right of entry for inspections, repairs, or prospective buyer/tenant showings.",
  metaDescription: "Generate a legally compliant Landlord Notice of Intent to Enter. Adheres to 24-hour and 48-hour statutory rules across all 50 states. Instant PDF download for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "24/48 Hr Notice",
  iconName: "DoorOpen",
  searchKeywords: [
    "landlord notice of intent to enter",
    "24 hour notice to enter template",
    "notice of entry for inspection",
    "landlord right of entry form",
    "notice to enter rental unit California",
    "notice to enter property Texas",
  ],
  features: [
    "Complies with state 24-hour and 48-hour advance notice statutes",
    "Includes mandatory business hours and reasonable daytime entry limitations",
    "Covers routine repairs, annual inspections, appraisals, and showings",
    "Provides Certificate of Service for proof of lawful advance notification",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "",
    landlordPhone: "",
    tenantName: "",
    rentalAddress: "",
    unitNumber: "",
    entryDate: "",
    entryTimeWindow: "10:00 AM - 1:00 PM",
    entryPurpose: "routine_maintenance",
    purposeDetails: "Annual HVAC inspection and smoke detector testing",
    noticeWindow: "24_hours",
    serviceMethod: "Personal Delivery",
  },
  steps: [
    {
      id: "parties",
      title: "Parties & Dwelling Unit",
      description: "Enter landlord and tenant details and rental premises address.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord / Management Company Name",
          type: "text",
          placeholder: "e.g., Pacific Coast Property Management",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordPhone",
          label: "Contact Telephone Number for Inquiries",
          type: "text",
          placeholder: "e.g., (555) 234-5678",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantName",
          label: "Tenant Name(s)",
          type: "text",
          placeholder: "e.g., Jason Reynolds",
          required: true,
          gridCols: 1,
        },
        {
          name: "rentalAddress",
          label: "Rental Property Street Address",
          type: "text",
          placeholder: "e.g., 812 Coronado Ave",
          required: true,
          gridCols: 2,
        },
        {
          name: "unitNumber",
          label: "Unit / Apartment Number",
          type: "text",
          placeholder: "e.g., Unit 4",
          required: false,
          gridCols: 2,
        },
      ],
    },
    {
      id: "entry_schedule",
      title: "Entry Date & Statutory Purpose",
      description: "Specify the exact date, time window, and lawful justification for entry.",
      fields: [
        {
          name: "entryDate",
          label: "Scheduled Date of Entry",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "entryTimeWindow",
          label: "Approximate Time Window of Entry",
          type: "text",
          placeholder: "e.g., Between 9:00 AM and 12:00 PM",
          required: true,
          gridCols: 2,
        },
        {
          name: "entryPurpose",
          label: "Statutory Purpose of Entry",
          type: "select",
          required: true,
          options: [
            { label: "Routine Maintenance & Safety Inspection", value: "routine_maintenance" },
            { label: "Necessary or Agreed Repairs / Contractor Work", value: "necessary_repairs" },
            { label: "Showing to Prospective Buyers, Lenders, or Appraisers", value: "showing_buyers" },
            { label: "Showing to Prospective Tenants (End of Lease)", value: "showing_tenants" },
            { label: "Initial Move-Out Inspection (Pre-Termination)", value: "move_out_inspection" },
          ],
        },
        {
          name: "purposeDetails",
          label: "Specific Description of Work / Inspection to be Performed",
          type: "textarea",
          placeholder: "Describe the specific tasks, inspection items, or contractors who will enter...",
          required: true,
        },
        {
          name: "noticeWindow",
          label: "Advance Notice Period Provided",
          type: "select",
          required: true,
          options: [
            { label: "24 Hours Advance Notice", value: "24_hours" },
            { label: "48 Hours Advance Notice", value: "48_hours" },
          ],
        },
      ],
    },
    {
      id: "delivery",
      title: "Delivery & Service",
      description: "Select delivery method and date of issuance.",
      fields: [
        {
          name: "noticeDate",
          label: "Date Notice is Issued",
          type: "date",
          required: true,
        },
        {
          name: "serviceMethod",
          label: "Method of Service",
          type: "select",
          required: true,
          options: [
            { label: "Personal Hand Delivery to Tenant", value: "Personal Delivery" },
            { label: "Leaving Copy with Person of Suitable Age at Premises", value: "Substituted Delivery" },
            { label: "Affixing Notice Conspicuously to Entry Door", value: "Posting on Entry Door" },
            { label: "USPS First-Class Mail (Mailed 6 days in advance)", value: "First-Class Mail" },
          ],
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord / Agent";
    const tenant = data.tenantName || "Tenant";
    const entryDate = data.entryDate || "Scheduled Date";
    const timeWindow = data.entryTimeWindow || "Normal Business Hours";
    const statuteCite = statute?.statuteCitation || "Applicable State Landlord Right of Entry Statute";
    const statuteName = statute?.statuteName || "Right of Entry Law";
    const phone = data.landlordPhone || "Office Phone";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "FROM (LANDLORD/AGENT)", value: `${landlord} | Phone: ${phone}` },
          { label: "TO (TENANT)", value: `${tenant}` },
          { label: "PREMISES LOCATION", value: `${data.rentalAddress || "Rental Property"}, Unit ${data.unitNumber || "N/A"}` },
          { label: "SUBJECT", value: `STATUTORY NOTICE OF INTENT TO ENTER DWELLING UNIT` },
          { label: "ENTRY WINDOW", value: `${entryDate} (${timeWindow})` },
          { label: "STATUTORY AUTHORITY", value: `${statuteCite} (${statuteName})` },
        ],
      },
      {
        title: "1. Formal Notification of Scheduled Entry",
        type: "body",
        paragraphs: [
          `PLEASE TAKE FORMAL NOTICE that in accordance with ${statuteCite} and the terms of your residential lease agreement, the Landlord, property manager, or authorized contractors will enter your dwelling unit on:`,
          `DATE: ${entryDate}`,
          `TIME WINDOW: ${timeWindow}`,
          `This notice satisfies all statutory advance notice requirements. Entry will take place during regular business hours or reasonable daytime hours as mandated by state law.`,
        ],
      },
      {
        title: "2. Lawful Statutory Purpose of Entry",
        type: "body",
        paragraphs: [
          `The sole purpose of this scheduled entry is authorized by state law:`,
          `"${data.purposeDetails || "Inspection and necessary maintenance as authorized by state tenancy laws."}"`,
        ],
      },
      {
        title: "3. Tenant Presence and Access Obligations",
        type: "body",
        paragraphs: [
          `Your presence during this entry is welcome, but it is not strictly required. If you are not present, the landlord or authorized agent will enter using the master key, conduct the required work or inspection with due care, and securely lock the premises upon completion.`,
          `Under state law, tenants may not unreasonably withhold consent or refuse lawful access to the dwelling unit once proper statutory notice has been provided.`,
          `Please ensure that all pets are safely secured during the entire scheduled window of entry.`,
        ],
      },
      {
        title: "4. Rescheduling and Inquiries",
        type: "body",
        paragraphs: [
          `If the proposed date or time poses an extraordinary conflict, you must contact the landlord immediately at ${phone} to coordinate an alternative daytime window within 48 hours of this notice.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        type: "certificate_of_service",
        paragraphs: [],
      },
    ];
  },
};
