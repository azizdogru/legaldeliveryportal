import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const unconditionalNoticeToQuitConfig: DocumentConfig = {
  id: "unconditional-notice-to-quit",
  slug: "unconditional-notice-to-quit",
  title: "Unconditional Notice to Quit (Non-Curable Lease Termination)",
  shortTitle: "Unconditional Notice to Quit",
  category: "Landlord & Tenant",
  description: "Official non-curable statutory lease termination notice demanding immediate tenant vacation within expedited statutory periods (typically 24 hours to 5 days) for severe illegal acts, narcotics offenses, violence, or intentional property destruction.",
  metaDescription: "Create an official Unconditional Notice to Quit for immediate tenant eviction. Mandatory for illegal drug activity, violent felonies, and severe property waste across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Non-Curable Eviction",
  iconName: "AlertTriangle",
  searchKeywords: [
    "unconditional notice to quit template pdf",
    "non curable eviction notice to vacate",
    "notice to quit for illegal activity",
    "immediate lease termination notice",
    "24 hour eviction notice form",
    "notice to vacate severe property waste",
  ],
  features: [
    "Strict non-curable notice: tenant has zero legal right to cure or correct the lease breach",
    "Itemizes statutory grounds: controlled substances, firearm violence, severe physical waste, or repeat violations",
    "Provides statutory expedited vacation deadline (e.g., 24 hours, 3 days, or 5 days per state statute)",
    "Includes formal Certificate of Service establishing personal delivery or statutory substituted service",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "Pacific Coast Property Management, LLC",
    landlordAddress: "1200 Ocean Avenue, Suite 400, Santa Monica, CA 90401",
    landlordPhone: "(310) 555-0144",
    tenantName: "Derrick Tyler Morrison, and All Other Occupants",
    rentalAddress: "840 4th Street, Apt 3B, Santa Monica, CA 90403",
    statutoryGrounds: "Illegal drug manufacturing / possession of controlled substances on premises with police department incident report #SMPD-2026-09418 and verified firearms discharge.",
    statutoryVacateDays: "3",
    moveOutDeadlineDate: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
  },
  steps: [
    {
      id: "eviction_parties",
      title: "Landlord & Tenant Profile",
      description: "Enter identifying details for the landlord/property owner and tenant.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord / Management Entity Legal Name",
          type: "text",
          placeholder: "e.g., Pacific Coast Property Management, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordPhone",
          label: "Landlord Emergency Contact Phone",
          type: "phone",
          placeholder: "e.g., (310) 555-0144",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordAddress",
          label: "Landlord Business Mailing Address",
          type: "text",
          placeholder: "e.g., 1200 Ocean Avenue, Suite 400, Santa Monica, CA 90401",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantName",
          label: "Tenant(s) and All Unauthorized Occupants",
          type: "text",
          placeholder: "e.g., Derrick Tyler Morrison, and All Other Occupants",
          required: true,
          gridCols: 2,
        },
        {
          name: "rentalAddress",
          label: "Leased Rental Premises Physical Address",
          type: "text",
          placeholder: "e.g., 840 4th Street, Apt 3B, Santa Monica, CA 90403",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "violation_facts",
      title: "Grounds & Vacate Deadline",
      description: "Detail the non-curable criminal act or waste and statutory deadline.",
      fields: [
        {
          name: "statutoryGrounds",
          label: "Specific Factual Grounds for Unconditional Termination",
          type: "textarea",
          placeholder: "Specify dates, police report numbers, felony narcotics offenses, violence, or intentional property destruction...",
          required: true,
          gridCols: 1,
        },
        {
          name: "statutoryVacateDays",
          label: "Statutory Vacate Period (Days / Hours)",
          type: "text",
          placeholder: "e.g., 3 (or 24 Hours, 5 Days per state code)",
          required: true,
          gridCols: 2,
        },
        {
          name: "moveOutDeadlineDate",
          label: "Absolute Final Vacate & Surrender Deadline Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Date Notice Formally Served",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantName || "Tenant";
    const premises = data.rentalAddress || "Leased Premises";
    const days = data.statutoryVacateDays || "3";
    const deadline = data.moveOutDeadlineDate || "Three days from service";
    const statuteCite = statute?.statuteCitation || "State Unlawful Detainer Non-Curable Notice Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE TYPE", value: "UNCONDITIONAL NOTICE TO QUIT (NON-CURABLE)" },
          { label: "LANDLORD / OWNER", value: `${landlord}` },
          { label: "TENANT OF RECORD", value: `${tenant}` },
          { label: "LEASED PREMISES", value: `${premises}` },
          { label: "STATUTORY NOTICE PERIOD", value: `${days} Days (Immediate Vacation Required)` },
          { label: "SURRENDER DEADLINE", value: `${deadline} at 11:59 PM` },
          { label: "RIGHT TO REMEDY", value: "NONE - LEASE IS UNCONDITIONALLY TERMINATED" },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "Immediate Demand to Vacate & Surrender Possession",
        type: "body",
        paragraphs: [
          `TO: ${tenant}, AND ALL SUBTENANTS AND OCCUPANTS IN POSSESSION OF: ${premises}.`,
          `PLEASE TAKE FORMAL STATUTORY NOTICE that your tenancy of the above-described premises is hereby UNCONDITIONALLY TERMINATED pursuant to ${statuteCite}.`,
          `YOU ARE HEREBY REQUIRED TO VACATE AND DELIVER UP POSSESSION OF THE PREMISES TO LANDLORD WITHIN ${days.toUpperCase()} DAYS, SPECIFICALLY ON OR BEFORE ${deadline} AT 11:59 PM.`,
          `THIS NOTICE IS UNCONDITIONAL. YOU HAVE NO RIGHT TO CURE OR REMEDY THIS VIOLATION. NO PAYMENT OF RENT WILL BE ACCEPTED TO REINSTATE YOUR TENANCY.`,
        ],
      },
      {
        title: "Specific Factual Grounds for Unconditional Termination",
        type: "body",
        paragraphs: [
          `This unconditional lease cancellation is predicated upon your commission or permitting of severe statutory violations, criminal conduct, or irreparable property destruction on the premises, specifically:`,
          `"${data.statutoryGrounds || "Severe criminal activity, illegal narcotics, violence, or intentional property destruction in direct violation of state law and lease covenants."}"`,
          `The conduct described above creates a substantial nuisance, threatens the safety of surrounding residents, and irreparably breaches the covenants of your lease.`,
        ],
      },
      {
        title: "Warning of Legal Action & Statutory Damages",
        type: "body",
        paragraphs: [
          `IF YOU FAIL TO VACATE THE PREMISES ON OR BEFORE ${deadline}, legal proceedings will be commenced against you immediately in ${statute?.courtJurisdiction || "the competent court"} for Unlawful Detainer and Eviction.`,
          `Under state civil procedure, Landlord will seek: (a) immediate judicial writ of restitution removing you and your personal property by sheriff, (b) statutory holdover damages and unpaid rent, (c) court costs and process server fees, and (d) statutory attorney fees.`,
          `Surrender Keys: To avoid legal judgment and sheriff eviction, remove all belongings and surrender all keys to ${data.landlordAddress || "Landlord"}.`,
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
