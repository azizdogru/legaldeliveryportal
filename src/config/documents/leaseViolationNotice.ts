import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const leaseViolationNoticeConfig: DocumentConfig = {
  id: "lease-violation-notice",
  slug: "lease-violation-notice",
  title: "Lease Violation Notice / Notice to Cure or Quit",
  shortTitle: "Notice to Cure or Quit",
  category: "Landlord & Tenant",
  description: "Official pre-eviction statutory notice demanding tenant correct non-monetary lease violations (unauthorized occupants, pets, noise, or nuisance) within state cure windows.",
  metaDescription: "Generate a legally enforceable Lease Violation Notice to Cure or Quit. Formatted for all 50 states with exact statutory cure deadlines (3, 7, 10 days). Court-ready PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Eviction Prerequisite",
  iconName: "AlertTriangle",
  searchKeywords: [
    "lease violation notice template",
    "notice to cure or quit form",
    "notice to perform covenant or quit",
    "unauthorized pet violation notice",
    "unauthorized occupant notice",
    "tenant noise complaint letter",
  ],
  features: [
    "Adheres strictly to state statutory cure periods (3, 7, 10, or 14 days)",
    "Specifically addresses unauthorized pets, unauthorized guests, noise, and damage",
    "Meets strict judicial standards required for subsequent eviction filings",
    "Includes formal server Affidavit and Certificate of Service",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "",
    landlordAddress: "",
    tenantName: "",
    rentalAddress: "",
    unitNumber: "",
    leaseDate: "",
    violationType: "unauthorized_occupant",
    violationDescription: "Unauthorized long-term occupant residing on premises without written landlord consent.",
    cureInstructions: "The unauthorized individual must permanently vacate the premises, or submit an adult rental application for screening and written approval.",
    cureDays: "3",
    serviceMethod: "Personal Delivery",
  },
  steps: [
    {
      id: "tenancy",
      title: "Tenancy & Premises",
      description: "Enter identifying details for the landlord, tenant, and leased premises.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord / Property Manager Name",
          type: "text",
          placeholder: "e.g., Sterling Property Management LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordAddress",
          label: "Landlord Mailing Address",
          type: "text",
          placeholder: "e.g., 400 Grand Ave, Suite 100",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantName",
          label: "Tenant Name(s) (All adults named on lease)",
          type: "text",
          placeholder: "e.g., Robert Jenkins and Emily Jenkins",
          required: true,
          gridCols: 1,
        },
        {
          name: "rentalAddress",
          label: "Rental Property Street Address",
          type: "text",
          placeholder: "e.g., 1420 Lincoln Boulevard",
          required: true,
          gridCols: 2,
        },
        {
          name: "unitNumber",
          label: "Unit / Apartment Number",
          type: "text",
          placeholder: "e.g., Apt 204",
          required: false,
          gridCols: 2,
        },
        {
          name: "leaseDate",
          label: "Date of Original Lease Agreement",
          type: "text",
          placeholder: "e.g., January 15, 2026",
          required: true,
        },
      ],
    },
    {
      id: "violation_details",
      title: "Lease Violation & Cure Action",
      description: "Specify the exact nature of the non-monetary breach and required corrective actions.",
      fields: [
        {
          name: "violationType",
          label: "Category of Non-Monetary Violation",
          type: "select",
          required: true,
          options: [
            { label: "Unauthorized Long-Term Occupant / Guest", value: "unauthorized_occupant" },
            { label: "Unauthorized Pet / Animal on Premises", value: "unauthorized_pet" },
            { label: "Excessive Noise / Disturbance / Breach of Peace", value: "noise_nuisance" },
            { label: "Subletting or Short-Term Vacation Rental (Airbnb)", value: "unauthorized_sublet" },
            { label: "Failure to Maintain Sanitary Standards / Clutter / Trash", value: "sanitation_hazard" },
            { label: "Unauthorized Alterations or Physical Property Damage", value: "property_alteration" },
            { label: "Unauthorized Parking or Inoperable Vehicle on Site", value: "parking_violation" },
          ],
        },
        {
          name: "violationDescription",
          label: "Detailed Description of Violation (Dates, Times, Facts)",
          type: "textarea",
          placeholder: "Specify the facts of the noncompliance, including dates observed, witness reports, or photographic evidence...",
          required: true,
        },
        {
          name: "cureInstructions",
          label: "Exact Mandatory Action Tenant Must Take to Cure",
          type: "textarea",
          placeholder: "Describe the specific remedy the tenant must execute to return the tenancy into compliance...",
          required: true,
        },
        {
          name: "cureDays",
          label: "Statutory Cure Window (Calendar Days)",
          type: "select",
          required: true,
          options: [
            { label: "3 Calendar Days (e.g. CA, TX, NV)", value: "3" },
            { label: "5 Calendar Days", value: "5" },
            { label: "7 Calendar Days (e.g. FL, NC, MI)", value: "7" },
            { label: "10 Calendar Days (e.g. NY, IL, WA)", value: "10" },
            { label: "14 Calendar Days (e.g. MA, OH, MN)", value: "14" },
            { label: "30 Calendar Days", value: "30" },
          ],
        },
      ],
    },
    {
      id: "service",
      title: "Service of Notice",
      description: "Select the statutory delivery method and notice date.",
      fields: [
        {
          name: "noticeDate",
          label: "Date of Service",
          type: "date",
          required: true,
        },
        {
          name: "serviceMethod",
          label: "Method of Formal Service",
          type: "select",
          required: true,
          options: [
            { label: "Personal Service directly on Tenant", value: "Personal Delivery to Tenant" },
            { label: "Substituted Service with Person of Suitable Age & First-Class Mail", value: "Substituted Service with Mail" },
            { label: "Posting Conspicuously on Entry Door and First-Class Mail (Nail and Mail)", value: "Posting and Mail" },
            { label: "USPS Certified Mail Return Receipt Requested", value: "Certified Mail Return Receipt" },
          ],
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantName || "Tenant";
    const cureDays = data.cureDays || "3";
    const statuteCite = statute?.statuteCitation || "Applicable State Tenancy and Eviction Code";
    const statuteName = statute?.statuteName || "Notice to Perform or Quit Statute";
    const courtName = statute?.courtJurisdiction || "Court of Competent Jurisdiction";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LANDLORD / AGENT", value: `${landlord}, ${data.landlordAddress || ""}` },
          { label: "TENANT(S)", value: `${tenant} and all other occupants in possession` },
          { label: "PREMISES", value: `${data.rentalAddress || "Rental Property"}, Unit ${data.unitNumber || "N/A"}` },
          { label: "LEASE AGREEMENT DATE", value: `${data.leaseDate || "Existing Active Lease"}` },
          { label: "NOTICE CLASSIFICATION", value: `FORMAL ${cureDays}-DAY NOTICE TO CURE LEASE VIOLATION OR QUIT` },
          { label: "STATUTORY CITATION", value: `${statuteCite} (${statuteName})` },
        ],
      },
      {
        title: "1. Formal Notification of Material Lease Default",
        type: "body",
        paragraphs: [
          `PLEASE TAKE FORMAL LEGAL NOTICE that you are in material violation of your residential lease agreement dated ${data.leaseDate || "governing your tenancy"} and the laws of this state pursuant to ${statuteCite}.`,
          `You have committed and permitted the following specific breach of your tenancy covenants:`,
          `"${data.violationDescription || "Material failure to abide by lease terms and property regulations."}"`,
          `This conduct substantially interferes with the orderly operation of the premises, violates health and safety codes, and constitutes an impermissible breach of contract.`,
        ],
      },
      {
        title: "2. Required Mandatory Corrective Action (Opportunity to Cure)",
        type: "body",
        paragraphs: [
          `YOU ARE HEREBY REQUIRED within ${cureDays} calendar days from the service of this notice to cure this breach completely by executing the following mandatory actions:`,
          `"${data.cureInstructions || "Immediately rectify and cease the non-compliant conduct described above."}"`,
        ],
      },
      {
        title: "3. Alternative Election to Surrender Possession",
        type: "body",
        paragraphs: [
          `If you fail or refuse to cure this breach within ${cureDays} calendar days, you are hereby required to immediately surrender and deliver up quiet possession of the premises to the Landlord on or before the expiration of said ${cureDays}-day period.`,
        ],
      },
      {
        title: "4. Warning of Immediate Unlawful Detainer Eviction Lawsuit",
        type: "warning",
        paragraphs: [
          `If you do not cure the violation or vacate the premises within ${cureDays} calendar days, the Landlord will institute legal proceedings against you in ${courtName} to recover possession of the dwelling unit, plus damages for unlawful detention.`,
          `In such judicial action, the Landlord will seek: (a) a formal judgment for immediate possession, (b) forfeiture of your lease agreement, (c) all statutory damages and holdover rent, and (d) full recovery of court costs and reasonable attorney fees.`,
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
