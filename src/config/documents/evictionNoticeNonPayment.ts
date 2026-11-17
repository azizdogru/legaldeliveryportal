import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const evictionNoticeNonPaymentConfig: DocumentConfig = {
  id: "eviction-notice-non-payment",
  slug: "eviction-notice-non-payment",
  title: "Notice to Pay Rent or Quit (Non-Payment of Rent)",
  shortTitle: "Notice to Pay or Quit",
  category: "Landlord & Tenant",
  description: "Statutory legal notice demanding tenant pay past-due rent or vacate the premises within state-mandated cure windows (3, 5, 7, 10, or 14 days) before formal unlawful detainer court proceedings.",
  metaDescription: "Generate a state-specific Notice to Pay Rent or Quit. Includes mandatory state statutory cure deadlines, rent ledger breakdown, and certificate of service for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Eviction Filing Prerequisite",
  iconName: "AlertCircle",
  searchKeywords: [
    "notice to pay rent or quit template",
    "3 day notice to pay rent or vacate",
    "5 day notice for unpaid rent",
    "eviction notice non payment form",
    "past due rent demand letter",
    "landlord eviction notice pdf",
  ],
  features: [
    "Strictly adheres to state statutory cure periods (3, 5, 7, 10, or 14 calendar days)",
    "Itemized delinquent rent ledger with base rent, late fees, and accepted payment methods",
    "Mandatory pre-lawsuit judicial language required for court unlawful detainer actions",
    "Includes legal Certificate of Service and process server affidavit",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "",
    landlordPhone: "",
    landlordAddress: "",
    tenantNames: "",
    premisesAddress: "",
    delinquentMonths: "October 2026 and November 2026",
    pastDueRent: "3200.00",
    lateFees: "150.00",
    totalAmountDue: "3350.00",
    paymentMethods: "Cashier check, certified bank draft, or landlord tenant portal at secure.portal.com",
    cureDays: "3",
    serviceMethod: "Personal in-hand delivery to tenant",
  },
  steps: [
    {
      id: "parties_premises",
      title: "Parties & Premises",
      description: "Enter the landlord, tenant names, and physical leased premises.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord / Property Manager Name",
          type: "text",
          placeholder: "e.g., Summit Ridge Property Holdings LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordPhone",
          label: "Landlord Contact Phone",
          type: "text",
          placeholder: "e.g., (555) 345-6789",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordAddress",
          label: "Payment Delivery Physical Address",
          type: "text",
          placeholder: "e.g., 742 Evergreen Terrace, Suite 100, Springfield, OR 97477",
          required: true,
          gridCols: 2,
        },
        {
          name: "tenantNames",
          label: "Tenant Name(s) (All Adult Lessees)",
          type: "text",
          placeholder: "e.g., John Doe, Jane Doe, and All Other Occupants in Possession",
          required: true,
          gridCols: 1,
        },
        {
          name: "premisesAddress",
          label: "Leased Rental Premises Address",
          type: "text",
          placeholder: "e.g., 1042 Maple Street, Apt 4C, Springfield, OR 97477",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "delinquent_rent_ledger",
      title: "Past Due Rent Ledger",
      description: "Itemize delinquent months, base rent, allowable late fees, and accepted payment types.",
      fields: [
        {
          name: "delinquentMonths",
          label: "Rental Period(s) Past Due",
          type: "text",
          placeholder: "e.g., Current month rent due on 1st of month",
          required: true,
          gridCols: 1,
        },
        {
          name: "pastDueRent",
          label: "Total Delinquent Base Rent ($ USD)",
          type: "currency",
          placeholder: "e.g., 3200.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "lateFees",
          label: "Allowable Late Fees ($ USD)",
          type: "currency",
          placeholder: "e.g., 150.00",
          required: false,
          gridCols: 2,
        },
        {
          name: "totalAmountDue",
          label: "Total Delinquent Balance Due ($ USD)",
          type: "currency",
          placeholder: "e.g., 3350.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "cureDays",
          label: "Statutory Notice Period (Days to Pay or Vacate)",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "3 Calendar Days (e.g. CA, TX, OH, ID)", value: "3" },
            { label: "5 Calendar Days (e.g. NV, VA, WI, LA)", value: "5" },
            { label: "7 Calendar Days (e.g. FL, IA, MI, ME)", value: "7" },
            { label: "10 Calendar Days (e.g. CO, IL, NC, IN)", value: "10" },
            { label: "14 Calendar Days (e.g. MA, TN, KS, AL)", value: "14" },
          ],
        },
        {
          name: "paymentMethods",
          label: "Payment Instructions & Accepted Delivery",
          type: "text",
          placeholder: "e.g., Cashier check or money order delivered to landlord office, or via online tenant portal",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "service_details",
      title: "Notice Date & Service Method",
      description: "Define service execution details for court evidentiary proof.",
      fields: [
        {
          name: "noticeDate",
          label: "Date Notice Served",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "serviceMethod",
          label: "Manner of Service",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Personal in-hand delivery to named tenant", value: "Personal in-hand delivery to named tenant" },
            { label: "Substituted service upon person of suitable age and discretion with follow-up mail", value: "Substituted service with follow-up first-class mail" },
            { label: "Conspicuous posting on entryway door and USPS Certified Mail (Nail and Mail)", value: "Posting on front entrance and USPS Certified Mail" },
          ],
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantNames || "Tenant(s)";
    const totalDue = parseFloat(data.totalAmountDue || "0").toFixed(2);
    const rentDue = parseFloat(data.pastDueRent || "0").toFixed(2);
    const lateDue = parseFloat(data.lateFees || "0").toFixed(2);
    const days = data.cureDays || statute?.noticePeriodDays || "3";
    const statuteCite = statute?.statuteCitation || "State Unlawful Detainer and Eviction Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE TYPE", value: `${days}-DAY NOTICE TO PAY RENT OR QUIT PREMISES` },
          { label: "TO TENANT(S)", value: `${tenant}` },
          { label: "PREMISES IN POSSESSION", value: `${data.premisesAddress || ""}` },
          { label: "FROM LANDLORD", value: `${landlord} (Phone: ${data.landlordPhone || "On File"})` },
          { label: "TOTAL AMOUNT DUE", value: `$${totalDue} USD (Rent: $${rentDue} | Fees: $${lateDue})` },
          { label: "STATUTORY CURE PERIOD", value: `${days} Calendar Days from Date of Delivery` },
          { label: "STATUTORY AUTHORITY", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Demand for Payment of Past Due Rent",
        type: "body",
        paragraphs: [
          `PLEASE TAKE NOTICE that you are indebted to Landlord in the total amount of $${totalDue} USD for delinquent rent and lawful charges for the rental premises located at ${data.premisesAddress || "the premises"}.`,
          `Itemization of Delinquent Balances: For rental period(s) (${data.delinquentMonths || "Past due period"}), base unpaid rent equals $${rentDue} USD, plus allowable accrued late charges of $${lateDue} USD, totaling $${totalDue} USD.`,
        ],
      },
      {
        title: `2. Statutory ${days}-Day Demand to Pay or Surrender Possession`,
        type: "body",
        paragraphs: [
          `WITHIN ${days} CALENDAR DAYS after service of this notice upon you, excluding date of service, you are required to either:`,
          `(a) PAY IN FULL the entire delinquent sum of $${totalDue} USD to Landlord at the payment location or portal specified below: ${data.paymentMethods || "To Landlord notice address"}, OR`,
          `(b) VACATE AND SURRENDER POSSESSION of the premises to Landlord, delivering all keys and removing all personal property.`,
        ],
      },
      {
        title: "3. Legal Consequences of Noncompliance (Unlawful Detainer Action)",
        type: "body",
        paragraphs: [
          `If you fail either to pay the past-due rent in full or to vacate and surrender possession of the premises within the statutory ${days}-day period, Landlord shall immediately commence summary unlawful detainer legal proceedings against you in ${statute?.courtJurisdiction || "the competent court"}.`,
          `Landlord will seek a judicial judgment of eviction, immediate writ of possession directing the Sheriff or Marshal to physically restore possession, judgment for all delinquent rent, statutory damages, court costs, and reasonable attorney fees as permitted by law.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        title: "Certificate and Affidavit of Service",
        type: "body",
        paragraphs: [
          `I, the undersigned server, certify under penalty of perjury under the laws of ${statute?.stateName || "this state"} that on ${data.noticeDate || "the notice date"}, I served this Notice to Pay Rent or Quit on the above-named tenant(s) by: ${data.serviceMethod || "Personal Service"}.`,
        ],
      },
    ];
  },
};
