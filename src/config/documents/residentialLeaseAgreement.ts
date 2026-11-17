import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const residentialLeaseAgreementConfig: DocumentConfig = {
  id: "residential-lease-agreement",
  slug: "residential-lease-agreement",
  title: "Residential Lease Agreement (Fixed Term)",
  shortTitle: "Residential Lease Agreement",
  category: "Landlord & Tenant",
  description: "Comprehensive residential lease contract establishing rent, security deposit terms, maintenance covenants, occupancy limits, and landlord statutory disclosures for houses, apartments, and condominiums.",
  metaDescription: "Create a state-specific Residential Lease Agreement. Includes statutory security deposit limits, maintenance rules, and disclosures for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Standard 1-Year Form",
  iconName: "Home",
  searchKeywords: [
    "residential lease agreement template",
    "standard 1 year apartment lease",
    "house rental agreement pdf",
    "landlord tenant lease contract",
    "state specific residential lease form",
    "residential rental agreement template",
  ],
  features: [
    "Formatted for standard 12-month fixed-term or periodic residential tenancies",
    "Statutory security deposit accounting and return terms pursuant to state law",
    "Strict tenant maintenance, quiet enjoyment, and guest limitation covenants",
    "Comprehensive lead-based paint disclosure and statutory habitability warranties",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "",
    landlordAddress: "",
    tenantNames: "",
    premisesAddress: "",
    leaseTermType: "fixed_one_year",
    leaseStartDate: new Date().toISOString().split("T")[0],
    leaseEndDate: "",
    monthlyRent: "2400.00",
    rentDueDay: "1st",
    securityDeposit: "2400.00",
    lateFeeAmount: "75.00",
    utilitiesTenant: "Electricity, gas, internet, and interior trash.",
    utilitiesLandlord: "Water, sewer, and common area maintenance.",
    petPolicy: "no_pets_except_assistance",
  },
  steps: [
    {
      id: "parties_premises",
      title: "Parties & Dwelling Premises",
      description: "Enter identifying details for the landlord, tenants, and rental property.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord / Property Owner / Management Company",
          type: "text",
          placeholder: "e.g., Golden State Residential Properties LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordAddress",
          label: "Landlord Notice Address",
          type: "text",
          placeholder: "e.g., 1200 Wilshire Boulevard, Suite 500, Los Angeles, CA 90017",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantNames",
          label: "Tenant Full Legal Name(s) (All Adult Occupants)",
          type: "text",
          placeholder: "e.g., Michael Scott Adams and Sarah Jane Adams",
          required: true,
          gridCols: 1,
        },
        {
          name: "premisesAddress",
          label: "Leased Premises Physical Address",
          type: "text",
          placeholder: "e.g., 450 North Rossmore Avenue, Apt 3B, Los Angeles, CA 90004",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "term_rent_deposit",
      title: "Lease Term, Rent & Deposits",
      description: "Define the tenancy period, monthly rent, due date, and security deposit.",
      fields: [
        {
          name: "leaseTermType",
          label: "Lease Duration",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Fixed One-Year Term (12 Months)", value: "fixed_one_year" },
            { label: "Month-to-Month Periodic Tenancy", value: "month_to_month" },
            { label: "Fixed Six-Month Term", value: "fixed_six_month" },
          ],
        },
        {
          name: "leaseStartDate",
          label: "Lease Commencement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "monthlyRent",
          label: "Monthly Rent Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 2400.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "securityDeposit",
          label: "Security Deposit Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 2400.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "lateFeeAmount",
          label: "Late Fee After Grace Period ($ USD)",
          type: "currency",
          placeholder: "e.g., 75.00",
          required: false,
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
      ],
    },
    {
      id: "utilities_rules",
      title: "Utilities, Pets & Execution",
      description: "Specify utility responsibilities, pet rules, and execution date.",
      fields: [
        {
          name: "utilitiesTenant",
          label: "Utilities Paid by Tenant",
          type: "text",
          placeholder: "e.g., Electricity, gas, internet, cable, interior trash",
          required: true,
        },
        {
          name: "utilitiesLandlord",
          label: "Utilities Provided by Landlord",
          type: "text",
          placeholder: "e.g., Water, sewer, trash collection, HOA fees",
          required: true,
        },
        {
          name: "petPolicy",
          label: "Pet Policy",
          type: "select",
          required: true,
          options: [
            { label: "No Pets Allowed (Except Qualified Service / Assistance Animals)", value: "no_pets_except_assistance" },
            { label: "Pets Allowed Subject to Signed Pet Addendum and Deposit", value: "pets_allowed_with_addendum" },
            { label: "Cats Only Allowed (Maximum 2)", value: "cats_only" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date of Agreement",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantNames || "Tenant";
    const rent = parseFloat(data.monthlyRent || "0").toFixed(2);
    const deposit = parseFloat(data.securityDeposit || "0").toFixed(2);
    const lateFee = parseFloat(data.lateFeeAmount || "0").toFixed(2);
    const premises = data.premisesAddress || "the premises";
    const statuteCite = statute?.statuteCitation || "State Residential Landlord and Tenant Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LANDLORD / LESSOR", value: `${landlord}, ${data.landlordAddress || ""}` },
          { label: "TENANT(S) / LESSEE", value: `${tenant}` },
          { label: "LEASED PREMISES", value: `${premises}` },
          { label: "LEASE TERM", value: `${data.leaseTermType === "month_to_month" ? "Month-to-Month Periodic Tenancy" : "Fixed Term"} commencing ${data.leaseStartDate || "upon execution"}` },
          { label: "MONTHLY RENT", value: `$${rent} USD due on the ${data.rentDueDay || "1st"} of each month (Late Fee: $${lateFee} USD)` },
          { label: "SECURITY DEPOSIT", value: `$${deposit} USD held pursuant to state statute` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Term of Lease & Possession",
        type: "body",
        paragraphs: [
          `THIS RESIDENTIAL LEASE AGREEMENT is entered into on ${data.noticeDate || "the date of execution"}, by and between ${landlord} ("Landlord") and ${tenant} ("Tenant"). Landlord leases to Tenant, and Tenant leases from Landlord, the real property located at ${premises} ("Premises") for residential use only.`,
          `Commencement: Tenancy commences on ${data.leaseStartDate || "the effective date"}. If a fixed-term lease, it shall terminate automatically on the agreed end date unless renewed in writing or converted to a periodic month-to-month tenancy pursuant to ${statute?.stateName || "state"} law.`,
        ],
      },
      {
        title: "2. Monthly Rent, Late Fees & Security Deposit",
        type: "body",
        paragraphs: [
          `Tenant covenants to pay monthly rent of $${rent} USD on or before the ${data.rentDueDay || "1st"} day of each calendar month without deduction or setoff. If rent is not received by Landlord within five (5) calendar days of the due date, Tenant shall pay a late fee of $${lateFee} USD.`,
          `Security Deposit: Tenant has deposited $${deposit} USD with Landlord as security for faithful performance of all covenants herein. Landlord shall hold, account for, and return the deposit within the statutory timeframe mandated by ${statute?.stateName || "state"} law following surrender of possession, less lawful deductions for unpaid rent or repair of damages exceeding normal wear and tear.`,
        ],
      },
      {
        title: "3. Maintenance, Habitability & Utilities",
        type: "body",
        paragraphs: [
          `Tenant shall maintain the Premises in a clean, sanitary, and undamaged condition, and promptly notify Landlord of any plumbing, electrical, or structural defects. Tenant shall be responsible for paying: "${data.utilitiesTenant || "All tenant utilities"}". Landlord shall be responsible for: "${data.utilitiesLandlord || "Water and sewer"}".`,
          `Landlord shall maintain the structural components, heating systems, and common areas in compliance with applicable building and housing codes materially affecting health and safety.`,
        ],
      },
      {
        title: "4. Statutory Entry Rights & Default Remedies",
        type: "body",
        paragraphs: [
          `Landlord may enter the Premises upon delivering statutory written notice (at least ${statute?.noticePeriodDays || "24"} hours advance notice, or as required by state law) during reasonable business hours for inspections, necessary repairs, or showings to prospective tenants or purchasers.`,
          `If Tenant fails to pay rent or breaches any material lease condition, Landlord may serve statutory notice to cure or quit and initiate unlawful detainer proceedings in ${statute?.courtJurisdiction || "the Court"}.`,
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
