import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const noticeOfBeliefOfAbandonmentConfig: DocumentConfig = {
  id: "notice-of-belief-of-abandonment",
  slug: "notice-of-belief-of-abandonment",
  title: "Notice of Belief of Abandonment (Real & Personal Property)",
  shortTitle: "Notice of Abandonment",
  category: "Landlord & Tenant",
  description: "Official statutory notice terminating tenancy and authorizing landlord reclamation of real property and disposal of abandoned tenant personal property following unpaid rent and vacancy.",
  metaDescription: "Generate a state-specific Notice of Belief of Abandonment. Reclaims real estate and authorizes disposal of tenant personal property pursuant to state statutes. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Statutory Property Reclamation",
  iconName: "Key",
  searchKeywords: [
    "notice of belief of abandonment template",
    "california civil code 1951.3 abandonment notice",
    "abandoned tenant property disposal notice",
    "landlord notice of abandonment form",
    "abandoned apartment reclamation letter",
    "unpaid rent abandonment notice pdf",
  ],
  features: [
    "Adheres strictly to state abandonment statutes (e.g., Cal. Civ. Code 1951.3, Fla. Stat. 83.59)",
    "Provides mandatory 15-day or 18-day statutory waiting window before landlord changes locks",
    "Protects landlord against unlawful eviction lawsuits, civil trespass, and conversion damages",
    "Itemizes abandoned personal property with statutory storage and public auction terms",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "",
    landlordPhone: "",
    landlordAddress: "",
    tenantNames: "",
    premisesAddress: "",
    rentUnpaidSinceDate: "",
    abandonmentEvidence: "Rent has remained delinquent for more than 14 consecutive days, utilities have been shut off or dormant, neighbors report tenant moved out, and tenant failed to respond to telephone inquiries.",
    personalPropertyEstimatedValue: "Less than $700.00 (authorizing disposal or donation under state code)",
    abandonmentCureDays: "18",
    serviceMethod: "First-Class Mail and Conspicuous Posting on Entry Door",
  },
  steps: [
    {
      id: "parties_premises",
      title: "Landlord, Tenant & Premises",
      description: "Enter identifying details for the landlord, tenant, and allegedly abandoned premises.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord / Property Management Company",
          type: "text",
          placeholder: "e.g., Pacific Real Estate Holdings LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordPhone",
          label: "Landlord Contact Phone",
          type: "text",
          placeholder: "e.g., (555) 789-0123",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordAddress",
          label: "Landlord Mailing Address",
          type: "text",
          placeholder: "e.g., 500 South Grand Avenue, Suite 1800, Los Angeles, CA 90071",
          required: true,
          gridCols: 2,
        },
        {
          name: "tenantNames",
          label: "Tenant(s) Legal Name (All Named Lessees)",
          type: "text",
          placeholder: "e.g., Brandon Cole, Lisa Cole, and All Occupants",
          required: true,
          gridCols: 1,
        },
        {
          name: "premisesAddress",
          label: "Rental Property Physical Address",
          type: "text",
          placeholder: "e.g., 1045 South Olive Street, Apt 7C, Los Angeles, CA 90015",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "abandonment_facts",
      title: "Abandonment Evidence & Waiting Period",
      description: "Document delinquent rent dates, factual indicators of vacancy, and statutory response window.",
      fields: [
        {
          name: "rentUnpaidSinceDate",
          label: "Date Rent Has Remained Continuously Unpaid Since",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "abandonmentCureDays",
          label: "Statutory Waiting Period (Days)",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "18 Calendar Days (If Served via Mail / Postal Delivery)", value: "18" },
            { label: "15 Calendar Days (If Personally Hand-Delivered)", value: "15" },
            { label: "30 Calendar Days (Commercial or Extended Tenancies)", value: "30" },
          ],
        },
        {
          name: "abandonmentEvidence",
          label: "Factual Observations Supporting Belief of Abandonment",
          type: "textarea",
          placeholder: "e.g., Rent unpaid for 21 days; keys not surrendered; essential utilities turned off; furniture removed...",
          required: true,
          gridCols: 1,
        },
        {
          name: "personalPropertyEstimatedValue",
          label: "Estimated Resale Value of Leftover Personal Belongings",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Less than statutory threshold ($700) - May be disposed of or donated", value: "less_than_threshold" },
            { label: "Exceeds statutory threshold ($700) - Subject to formal public warehouse auction", value: "exceeds_threshold" },
            { label: "No personal property remaining on premises (completely vacant)", value: "no_property" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date Notice Issued & Dispatched",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "serviceMethod",
          label: "Delivery Method",
          type: "text",
          placeholder: "e.g., First-Class Mail with Certificate of Mailing and Conspicuous Door Posting",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantNames || "Tenant(s)";
    const premises = data.premisesAddress || "Rental dwelling";
    const days = data.abandonmentCureDays || "18";
    const statuteCite = statute?.statuteCitation || "State Real Property Abandonment Act (e.g. Cal. Civ. Code 1951.3)";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "STATUTORY NOTICE", value: `NOTICE OF BELIEF OF ABANDONMENT OF REAL PROPERTY (${days}-DAY NOTICE)` },
          { label: "FROM LANDLORD", value: `${landlord}, ${data.landlordAddress || ""} (Phone: ${data.landlordPhone || "On File"})` },
          { label: "TO TENANT(S)", value: `${tenant}` },
          { label: "PREMISES INVOLVED", value: `${premises}` },
          { label: "RENT DELINQUENT SINCE", value: `${data.rentUnpaidSinceDate || "Delinquent Date"}` },
          { label: "STATUTORY RESPONSE WINDOW", value: `${days} Calendar Days from Date of Notice` },
          { label: "LEFTOVER PROPERTY STATUS", value: data.personalPropertyEstimatedValue === "less_than_threshold" ? "Estimated under $700 (Authorizing Disposal)" : "Subject to Public Auction / Storage" },
          { label: "STATUTORY CITATION", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Notice of Landlord Reasonable Belief of Abandonment",
        type: "body",
        paragraphs: [
          `PLEASE TAKE NOTICE that this notice is given pursuant to ${statuteCite} concerning the real property leased by you located at ${premises}.`,
          `The rent on this property has remained continuously unpaid and delinquent for at least fourteen (14) consecutive days, specifically since ${data.rentUnpaidSinceDate || "the stated date"}. Furthermore, Landlord reasonably believes that you have abandoned the real property based upon the following factual observations: ${data.abandonmentEvidence || "Lack of occupancy, delinquent rent, dormant utilities, and absence of communication."}`,
        ],
      },
      {
        title: `2. Statutory ${days}-Day Demand to Contest Abandonment`,
        type: "body",
        paragraphs: [
          `The real property will be deemed abandoned pursuant to law, and your lease will terminate on the ${days}th CALENDAR DAY following service of this notice, unless before that date Landlord receives at the address stated above a written notice from you stating BOTH of the following:`,
          `(a) Your intent not to abandon the real property, AND`,
          `(b) An address at which you may be served by certified mail in any action for unlawful detainer of the real property.`,
        ],
      },
      {
        title: "3. Disposal of Abandoned Personal Property Remaining on Premises",
        type: "body",
        paragraphs: [
          `If you fail to reclaim possession and this property is deemed abandoned, any personal property, clothing, furniture, or belongings left behind on the premises will be stored and inventoried.`,
          `Pursuant to state abandoned property statutes, if the estimated total resale value of the property is ${data.personalPropertyEstimatedValue === "less_than_threshold" ? "less than the statutory threshold (under $700), it may be retained, donated to charity, or permanently disposed of without further notice." : "in excess of the statutory threshold, it shall be sold at a public auction following statutory advertising, and auction proceeds applied to storage and moving costs."}`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        title: "Certificate of Service / Proof of Notice",
        type: "body",
        paragraphs: [
          `I certify under penalty of perjury that on ${data.noticeDate || "the date indicated"}, this Notice of Belief of Abandonment was served via ${data.serviceMethod || "First-Class Mail and Door Posting"} upon the named tenant(s).`,
        ],
      },
    ];
  },
};
