import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const mechanicsLienNoticeConfig: DocumentConfig = {
  id: "mechanics-lien-notice",
  slug: "mechanics-lien-notice",
  title: "Mechanic's Lien / Notice of Intent to File Lien",
  shortTitle: "Mechanic's Lien Notice",
  category: "Real Estate & Liens",
  description: "Official pre-lien demand warning property owner of imminent recording of a mechanics lien against real property title for unpaid construction labor or materials.",
  metaDescription: "Generate a state-specific Mechanic's Lien or Notice of Intent to Lien. Protects contractor payment rights with verified statutory notice. Download PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Title Encumbrance",
  iconName: "Hammer",
  searchKeywords: [
    "mechanics lien notice of intent",
    "notice of intent to lien template",
    "contractor lien notice form",
    "pre lien notice California 20 day",
    "texas mechanics lien trapping notice",
    "construction lien notice to owner",
  ],
  features: [
    "Meets strict state statutory pre-lien warning and notice requirements",
    "Itemizes labor, materials, equipment, and exact contract balances",
    "Includes formal Real Property legal description and parcel identifier fields",
    "Includes formal Notary Jurat and Affidavits of Service for County Recording",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    claimantName: "",
    claimantLicense: "",
    claimantAddress: "",
    ownerName: "",
    ownerAddress: "",
    propertyAddress: "",
    countyName: "",
    apnOrParcel: "",
    hiringParty: "Direct Contract with Property Owner",
    workDescription: "Carpentry, framing, drywall installation, and finish trim work.",
    firstDateFurnished: "",
    lastDateFurnished: "",
    totalContractValue: "18500.00",
    amountPaid: "10000.00",
    unpaidBalance: "8500.00",
    noticeDeadlineDays: "10",
    serviceMethod: "Certified Mail Return Receipt Requested",
  },
  steps: [
    {
      id: "claimant_owner",
      title: "Contractor & Property Owner",
      description: "Enter identifying details for the lien claimant and the title owner of the real property.",
      fields: [
        {
          name: "claimantName",
          label: "Lien Claimant / Contractor Legal Name",
          type: "text",
          placeholder: "e.g., Apex Builders & Renovations Inc.",
          required: true,
          gridCols: 1,
        },
        {
          name: "claimantLicense",
          label: "Contractor State License Number (if applicable)",
          type: "text",
          placeholder: "e.g., CSLB #1084920",
          required: false,
          gridCols: 2,
        },
        {
          name: "claimantAddress",
          label: "Claimant Business Address",
          type: "text",
          placeholder: "e.g., 2200 Industrial Parkway, Sacramento, CA 95825",
          required: true,
          gridCols: 2,
        },
        {
          name: "ownerName",
          label: "Property Owner Name(s) as Recorded on Title",
          type: "text",
          placeholder: "e.g., Kenneth Sterling and Barbara Sterling",
          required: true,
          gridCols: 1,
        },
        {
          name: "ownerAddress",
          label: "Property Owner Mailing Address (if different from site)",
          type: "text",
          placeholder: "e.g., 450 Vista Drive, Sacramento, CA 95864",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "property_details",
      title: "Real Property & Work Performed",
      description: "Identify the job site address, county, parcel number, and work provided.",
      fields: [
        {
          name: "propertyAddress",
          label: "Job Site / Real Property Physical Address",
          type: "text",
          placeholder: "e.g., 1845 Willow Creek Court, Folsom, CA 95630",
          required: true,
          gridCols: 1,
        },
        {
          name: "countyName",
          label: "County in which Property is Situated",
          type: "text",
          placeholder: "e.g., Sacramento County",
          required: true,
          gridCols: 2,
        },
        {
          name: "apnOrParcel",
          label: "Assessor Parcel Number (APN) or Legal Description",
          type: "text",
          placeholder: "e.g., APN: 072-0450-019-0000",
          required: false,
          gridCols: 2,
        },
        {
          name: "hiringParty",
          label: "Contractual Relationship",
          type: "text",
          placeholder: "e.g., Direct Contract with Owner (or General Contractor name)",
          required: true,
        },
        {
          name: "workDescription",
          label: "Detailed Description of Labor, Materials, or Services Furnished",
          type: "textarea",
          placeholder: "Specify trade labor, equipment, electrical/plumbing fixtures, lumber, roofing materials...",
          required: true,
        },
        {
          name: "firstDateFurnished",
          label: "Date Labor or Materials First Furnished",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "lastDateFurnished",
          label: "Date Labor or Materials Last Furnished",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "financials",
      title: "Accounting & Notice Window",
      description: "Itemize the contract balances and the pre-filing notice window.",
      fields: [
        {
          name: "totalContractValue",
          label: "Total Agreed Contract Price ($)",
          type: "currency",
          placeholder: "e.g., 18500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "amountPaid",
          label: "Total Amount Received to Date ($)",
          type: "currency",
          placeholder: "e.g., 10000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "unpaidBalance",
          label: "Net Unpaid Principal Balance Due ($)",
          type: "currency",
          placeholder: "e.g., 8500.00",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDeadlineDays",
          label: "Notice Compliance Window (Days before County Recording)",
          type: "select",
          required: true,
          options: [
            { label: "10 Calendar Days (Standard Notice of Intent)", value: "10" },
            { label: "15 Calendar Days", value: "15" },
            { label: "30 Calendar Days", value: "30" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date of Notice",
          type: "date",
          required: true,
        },
        {
          name: "serviceMethod",
          label: "Service Method",
          type: "select",
          required: true,
          options: [
            { label: "USPS Certified Mail Return Receipt Requested", value: "Certified Mail Return Receipt Requested" },
            { label: "Personal Hand Delivery to Owner", value: "Personal Hand Delivery" },
          ],
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const claimant = data.claimantName || "Claimant";
    const owner = data.ownerName || "Property Owner";
    const total = parseFloat(data.totalContractValue || "0").toFixed(2);
    const paid = parseFloat(data.amountPaid || "0").toFixed(2);
    const unpaid = parseFloat(data.unpaidBalance || "0").toFixed(2);
    const deadline = data.noticeDeadlineDays || "10";
    const statuteCite = statute?.statuteCitation || "Applicable State Mechanics Lien and Works of Improvement Law";
    const statuteName = statute?.statuteName || "Mechanics Lien Statute";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LIEN CLAIMANT", value: `${claimant} (${data.claimantLicense || "Licensed Contractor"}), ${data.claimantAddress || ""}` },
          { label: "RECORD PROPERTY OWNER", value: `${owner}, ${data.ownerAddress || ""}` },
          { label: "REAL PROPERTY SUBJECT TO LIEN", value: `${data.propertyAddress || "Subject Real Estate"}, County of ${data.countyName || "Local County"}` },
          { label: "PARCEL / APN NUMBER", value: `${data.apnOrParcel || "Recorded Parcel ID"}` },
          { label: "UNPAID BALANCE CLAIMED", value: `$${unpaid} USD (Total Contract: $${total}, Paid: $${paid})` },
          { label: "STATUTORY AUTHORITY", value: `${statuteCite} (${statuteName})` },
        ],
      },
      {
        title: "1. Formal Notice of Intent to Record Mechanics Lien",
        type: "body",
        paragraphs: [
          `PLEASE TAKE STATUTORY LEGAL NOTICE that pursuant to ${statuteCite}, the undersigned Claimant hereby demands payment of the unpaid balance of $${unpaid} USD for labor, services, equipment, and materials furnished for the improvement of the real property described above.`,
          `NOTICE IS HEREBY GIVEN that unless the total unpaid balance of $${unpaid} is paid in full within ${deadline} calendar days from your receipt of this notice, Claimant will immediately file and record a verified Claim of Mechanics Lien against your real property in the Official Records of the County Recorder of ${data.countyName || "the County"}.`,
        ],
      },
      {
        title: "2. Improvement of Real Property and Dates of Service",
        type: "body",
        paragraphs: [
          `Claimant furnished labor, equipment, and materials under agreement with ${data.hiringParty || "Property Owner"}, consisting of:`,
          `"${data.workDescription || "Construction, materials, and improvement services as contracted."}"`,
          `The first date of furnishing labor or materials was on or about ${data.firstDateFurnished || "commencement date"}, and the last date of furnishing was on or about ${data.lastDateFurnished || "completion date"}.`,
        ],
      },
      {
        title: "3. Accounting Summary of Indebtedness",
        type: "body",
        paragraphs: [
          `The financial basis of this lien claim is calculated as follows:`,
        ],
        bulletPoints: [
          `Total Agreed Contract Price and Authorized Extras: $${total}`,
          `Total Payments Received to Date: $${paid}`,
          `TOTAL DELINQUENT PRINCIPAL BALANCE NOW DUE: $${unpaid}`,
        ],
      },
      {
        title: "4. Warning of Cloud on Title and Judicial Foreclosure",
        type: "warning",
        paragraphs: [
          `WARNING TO PROPERTY OWNER: Recording a Mechanics Lien creates a legal encumbrance and cloud upon the title of your real property. This encumbrance will impede any sale, transfer, or refinancing of your property.`,
          `Furthermore, Claimant is authorized by state law to file a civil lawsuit in court to foreclose upon the Mechanics Lien, which may result in a court order directing the public auction and sale of your property to satisfy the unpaid balance, together with statutory interest, recording costs, and reasonable attorney fees.`,
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
      {
        type: "certificate_of_service",
        paragraphs: [],
      },
    ];
  },
};
