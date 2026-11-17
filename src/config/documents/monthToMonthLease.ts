import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const monthToMonthLeaseConfig: DocumentConfig = {
  id: "month-to-month-lease",
  slug: "month-to-month-lease",
  title: "Month-to-Month Residential Lease Agreement (Rental at Will)",
  shortTitle: "Month-to-Month Lease",
  category: "Landlord & Tenant",
  description: "Flexible residential tenancy agreement renewing automatically each month until terminated by either party upon delivering statutory 30-day or 60-day written notice pursuant to state law.",
  metaDescription: "Generate a state-compliant Month-to-Month Lease Agreement. Includes automatic 30-day renewal terms, statutory termination notice periods, and deposit rules for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Flexible Periodic Tenancy",
  iconName: "Home",
  searchKeywords: [
    "month to month lease agreement template",
    "periodic tenancy agreement pdf",
    "rental agreement at will form",
    "30 day notice month to month rental",
    "month to month apartment lease",
    "state compliant monthly lease form",
  ],
  features: [
    "Automatically rolls over month-to-month until terminated with proper statutory notice",
    "Specifies state-mandated termination notice windows (30, 45, or 60 calendar days)",
    "Includes full security deposit accounting, late fee grace periods, and maintenance rules",
    "Enforceable in all 50 states with statutory quiet enjoyment and entry disclosures",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "",
    landlordAddress: "",
    tenantNames: "",
    premisesAddress: "",
    leaseStartDate: new Date().toISOString().split("T")[0],
    monthlyRent: "2100.00",
    rentDueDay: "1st",
    securityDeposit: "2100.00",
    lateFeeAmount: "65.00",
    terminationNoticeDays: "30",
    utilitiesTenant: "Electricity, cooking gas, internet, and interior trash.",
    utilitiesLandlord: "Water, sewer, and common area landscaping.",
    petPolicy: "no_pets_except_assistance",
  },
  steps: [
    {
      id: "parties_premises",
      title: "Parties & Rental Premises",
      description: "Enter identifying details for the landlord, tenants, and physical dwelling.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord / Property Owner / Management Company",
          type: "text",
          placeholder: "e.g., Golden State Housing Management LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordAddress",
          label: "Landlord Official Notice Address",
          type: "text",
          placeholder: "e.g., 900 Wilshire Blvd, Suite 400, Los Angeles, CA 90017",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantNames",
          label: "Tenant Full Legal Name(s) (All Adult Lessees)",
          type: "text",
          placeholder: "e.g., Marcus Alexander Reed and Clara Louise Reed",
          required: true,
          gridCols: 1,
        },
        {
          name: "premisesAddress",
          label: "Leased Rental Premises Physical Address",
          type: "text",
          placeholder: "e.g., 420 North Rossmore Ave, Unit 2A, Los Angeles, CA 90004",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "rent_finances",
      title: "Rent, Security Deposit & Notice",
      description: "Define the monthly rent, security deposit, and statutory notice period to terminate.",
      fields: [
        {
          name: "leaseStartDate",
          label: "Tenancy Commencement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "monthlyRent",
          label: "Monthly Rent Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 2100.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "rentDueDay",
          label: "Rent Due Calendar Day",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "1st of every month", value: "1st" },
            { label: "15th of every month", value: "15th" },
          ],
        },
        {
          name: "securityDeposit",
          label: "Security Deposit Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 2100.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "lateFeeAmount",
          label: "Late Fee After 5-Day Grace Period ($ USD)",
          type: "currency",
          placeholder: "e.g., 65.00",
          required: false,
          gridCols: 2,
        },
        {
          name: "terminationNoticeDays",
          label: "Termination Notice Period (Days)",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "30 Calendar Days (Standard Statutory Notice)", value: "30" },
            { label: "60 Calendar Days (Extended Notice / Over 1 Year Tenancy)", value: "60" },
          ],
        },
      ],
    },
    {
      id: "utilities_rules",
      title: "Utilities, Pets & Execution",
      description: "Specify utility assignments, pet covenants, and agreement execution date.",
      fields: [
        {
          name: "utilitiesTenant",
          label: "Utilities Paid by Tenant",
          type: "text",
          placeholder: "e.g., Electricity, gas, internet, interior trash",
          required: true,
          gridCols: 1,
        },
        {
          name: "utilitiesLandlord",
          label: "Utilities Provided by Landlord",
          type: "text",
          placeholder: "e.g., Water, sewer, and common area maintenance",
          required: true,
          gridCols: 1,
        },
        {
          name: "petPolicy",
          label: "Pet Policy",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "No Pets Allowed (Except Qualified Service / Assistance Animals)", value: "no_pets_except_assistance" },
            { label: "Pets Allowed Subject to Signed Pet Addendum and Deposit", value: "pets_allowed_with_addendum" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date of Agreement",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantNames || "Tenant(s)";
    const rent = parseFloat(data.monthlyRent || "0").toFixed(2);
    const deposit = parseFloat(data.securityDeposit || "0").toFixed(2);
    const lateFee = parseFloat(data.lateFeeAmount || "0").toFixed(2);
    const premises = data.premisesAddress || "the rental premises";
    const noticeDays = data.terminationNoticeDays || statute?.noticePeriodDays || "30";
    const statuteCite = statute?.statuteCitation || "State Residential Landlord and Tenant Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: "MONTH-TO-MONTH RESIDENTIAL LEASE (PERIODIC TENANCY)" },
          { label: "LANDLORD / LESSOR", value: `${landlord}, ${data.landlordAddress || ""}` },
          { label: "TENANT(S) / LESSEE", value: `${tenant}` },
          { label: "RENTAL DWELLING", value: `${premises}` },
          { label: "COMMENCEMENT DATE", value: `${data.leaseStartDate || "Commencement date"}` },
          { label: "MONTHLY RENT", value: `$${rent} USD due on the ${data.rentDueDay || "1st"} of each month (Late Fee: $${lateFee})` },
          { label: "SECURITY DEPOSIT", value: `$${deposit} USD held pursuant to state statute` },
          { label: "TERMINATION NOTICE", value: `${noticeDays} Calendar Days written advance notice required` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Term of Periodic Tenancy & Termination Notice",
        type: "body",
        paragraphs: [
          `THIS MONTH-TO-MONTH LEASE AGREEMENT is entered into on ${data.noticeDate || "the date of execution"}, by and between Landlord ${landlord} and Tenant ${tenant}. Landlord leases to Tenant, and Tenant rents from Landlord, the residential dwelling located at ${premises} on a month-to-month periodic tenancy commencing on ${data.leaseStartDate || "the effective date"}.`,
          `Automatic Renewal & Termination: This Agreement shall automatically renew on the first day of each successive calendar month under identical covenants and conditions, unless terminated by either party upon delivering at least ${noticeDays} calendar days advance written notice of termination prior to the end of the monthly rental cycle, pursuant to ${statute?.stateName || "state"} statutory requirements.`,
        ],
      },
      {
        title: "2. Monthly Rent, Late Charges & Security Deposit",
        type: "body",
        paragraphs: [
          `Monthly Rent: Tenant covenants to pay monthly rent of $${rent} USD in advance on or before the ${data.rentDueDay || "1st"} day of each calendar month. If rent is not received within five (5) calendar days after its due date, Tenant shall pay an administrative late charge of $${lateFee} USD.`,
          `Security Deposit: Tenant has deposited $${deposit} USD with Landlord as security for faithful performance. Landlord shall hold, account for, and return the deposit within the mandatory statutory timeframe following complete surrender of possession, less lawful deductions for unpaid rent or damage exceeding normal wear and tear.`,
        ],
      },
      {
        title: "3. Maintenance, Utilities & Landlord Entry Rights",
        type: "body",
        paragraphs: [
          `Utility Responsibilities: Tenant shall be solely responsible for: "${data.utilitiesTenant || "All tenant utilities"}". Landlord shall be responsible for: "${data.utilitiesLandlord || "Water and sewer"}".`,
          `Quiet Enjoyment & Statutory Entry: Landlord may enter the premises only upon delivering statutory written notice (at least ${statute?.noticePeriodDays || "24"} hours advance notice) during reasonable daytime business hours for necessary inspections, repairs, or prospective tenant showings.`,
        ],
      },
      {
        title: "4. Default & Eviction Remedies",
        type: "body",
        paragraphs: [
          `If Tenant fails to pay rent or breaches any material lease condition, Landlord may serve statutory notice to pay or quit and initiate unlawful detainer proceedings in ${statute?.courtJurisdiction || "the competent Court"} to recover possession, unpaid rent, court costs, and statutory attorney fees.`,
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
