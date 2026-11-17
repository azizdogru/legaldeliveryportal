import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const propertyManagementAgreementConfig: DocumentConfig = {
  id: "property-management-agreement",
  slug: "property-management-agreement",
  title: "Property Management Agreement (Owner & Agent Contract)",
  shortTitle: "Property Management Agreement",
  category: "Landlord & Tenant",
  description: "Official residential and commercial property management contract granting manager full authority to lease units, collect rents, hold security deposits in trust, coordinate maintenance, and charge management fees.",
  metaDescription: "Create an official Property Management Agreement. Authorizes tenant leasing, rent collections, maintenance reserves, and management commission fees across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Property Management",
  iconName: "Home",
  searchKeywords: [
    "property management agreement template pdf",
    "residential property manager contract",
    "landlord property management contract",
    "commercial property management agreement",
    "property manager fee and reserve agreement",
    "broker property management agreement form",
  ],
  features: [
    "Authorizes manager to market vacancies, screen tenants, and execute residential or commercial leases",
    "Establishes dedicated trust bank accounts for rental proceeds and statutory security deposits",
    "Defines monthly management commission percentage (e.g., 8% to 10%) and tenant placement leasing fees",
    "Includes maintenance expenditure authorization threshold and emergency repair authority",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "FL",
    ownerName: "Crestview Real Estate Holdings, LLC",
    ownerAddress: "1200 Brickell Avenue, Suite 1400, Miami, FL 33131",
    managerName: "Atlantic Premier Property Management, Inc.",
    managerAddress: "400 Las Olas Boulevard, Suite 500, Fort Lauderdale, FL 33301",
    propertyAddress: "Sunrise Gardens Luxury Apartments (24 Units), 8200 West Sunrise Boulevard, Plantation, FL 33322",
    managementFeePercentage: "8",
    leasingFeeAmount: "500.00",
    repairReserveLimit: "1000.00",
    contractTermMonths: "12",
    cancellationNoticeDays: "30",
  },
  steps: [
    {
      id: "management_parties",
      title: "Property Owner & Management Firm",
      description: "Enter legal contact details for the real estate property owner and the licensed property manager.",
      fields: [
        {
          name: "ownerName",
          label: "Property Owner Legal Name / Entity",
          type: "text",
          placeholder: "e.g., Crestview Real Estate Holdings, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "ownerAddress",
          label: "Owner Primary Mailing Address",
          type: "text",
          placeholder: "e.g., 1200 Brickell Avenue, Suite 1400, Miami, FL 33131",
          required: true,
          gridCols: 2,
        },
        {
          name: "managerName",
          label: "Property Management Company Name",
          type: "text",
          placeholder: "e.g., Atlantic Premier Property Management, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "managerAddress",
          label: "Management Firm Office Address",
          type: "text",
          placeholder: "e.g., 400 Las Olas Boulevard, Suite 500, Fort Lauderdale, FL 33301",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "property_terms",
      title: "Property & Compensation Terms",
      description: "Specify real estate premises, management fees, maintenance limits, and agreement duration.",
      fields: [
        {
          name: "propertyAddress",
          label: "Managed Real Property Description & Address",
          type: "textarea",
          placeholder: "e.g., Sunrise Gardens Luxury Apartments (24 Units), 8200 West Sunrise Boulevard, Plantation, FL 33322",
          required: true,
          gridCols: 1,
        },
        {
          name: "managementFeePercentage",
          label: "Monthly Management Fee (% of Gross Collected Rents)",
          type: "text",
          placeholder: "e.g., 8 (or 10)",
          required: true,
          gridCols: 2,
        },
        {
          name: "leasingFeeAmount",
          label: "New Tenant Placement / Leasing Fee ($ USD)",
          type: "currency",
          placeholder: "e.g., 500.00 (or half first month rent)",
          required: true,
          gridCols: 2,
        },
        {
          name: "repairReserveLimit",
          label: "Pre-Approved Repair Reserve Ceiling ($ USD)",
          type: "currency",
          placeholder: "e.g., 1000.00 (repairs over this require owner approval)",
          required: true,
          gridCols: 2,
        },
        {
          name: "contractTermMonths",
          label: "Management Initial Term (Months)",
          type: "text",
          placeholder: "e.g., 12 (typically 12 or 24 months)",
          required: true,
          gridCols: 2,
        },
        {
          name: "cancellationNoticeDays",
          label: "Termination Notice Period (Days)",
          type: "text",
          placeholder: "e.g., 30",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Agreement Effective Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const owner = data.ownerName || "Property Owner";
    const manager = data.managerName || "Property Manager";
    const feePct = data.managementFeePercentage || "8";
    const repairCeiling = parseFloat(data.repairReserveLimit || "1000").toFixed(2);
    const statuteCite = statute?.statuteCitation || "Real Estate Licensing and Residential Landlord-Tenant Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CONTRACT TYPE", value: "EXCLUSIVE PROPERTY MANAGEMENT AGREEMENT" },
          { label: "PROPERTY OWNER", value: `${owner}` },
          { label: "EXCLUSIVE MANAGER", value: `${manager}` },
          { label: "MANAGED REAL ESTATE", value: `${data.propertyAddress || "Property on file"}` },
          { label: "MANAGEMENT FEE", value: `${feePct}% of Gross Monthly Collected Rents` },
          { label: "LEASING PLACEMENT FEE", value: `$${parseFloat(data.leasingFeeAmount || "500").toFixed(2)} USD per New Tenant` },
          { label: "DISCRETIONARY REPAIR CAP", value: `$${repairCeiling} USD (Emergency Excluded)` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Appointment & Scope of Manager Agency",
        type: "body",
        paragraphs: [
          `THIS EXCLUSIVE PROPERTY MANAGEMENT AGREEMENT is entered into as of ${data.noticeDate || "the date of execution"}, by and between ${owner} ("Owner") and ${manager} ("Manager").`,
          `Exclusive Agency: Owner hereby designates Manager as the sole and exclusive managing agent of the real property described as: "${data.propertyAddress || "the subject premises"}".`,
          `Term: This Agreement shall be effective for an initial period of ${data.contractTermMonths || "12"} months and shall automatically renew on a year-to-year basis unless either party provides ${data.cancellationNoticeDays || "30"} days prior written notice of non-renewal.`,
        ],
      },
      {
        title: "2. Manager Duties: Leasing, Rent Collection & Maintenance",
        type: "body",
        paragraphs: [
          `Leasing Authority: Manager is authorized to market vacancies, screen prospective tenants through credit and background checks, negotiate lease terms, and execute lease agreements on Owner's standard approved forms.`,
          `Rent Collection & Trust Accounting: Manager shall collect all rents, late fees, and charges. Manager shall maintain all tenant security deposits in a segregated, interest-bearing escrow trust account conforming to ${statute?.stateName || "State"} security deposit laws.`,
          `Maintenance & Repairs: Manager is authorized to contract for routine maintenance, cleaning, and repairs not exceeding $${repairCeiling} USD per single item. Expenses exceeding this amount require Owner's prior written approval, except for emergency repairs threatening life, safety, or structural damage.`,
        ],
      },
      {
        title: "3. Manager Compensation & Financial Reporting",
        type: "body",
        paragraphs: [
          `Management Commission: As compensation for services, Owner shall pay Manager a monthly fee equal to ${feePct}% of gross rental receipts collected during each calendar month, deductible directly from rental revenues.`,
          `Leasing Commission: For each new tenant procured and executed lease, Manager shall receive a one-time leasing commission of $${parseFloat(data.leasingFeeAmount || "500").toFixed(2)} USD.`,
          `Monthly Accountings: On or before the fifteenth (15th) day of each calendar month, Manager shall remit to Owner the net rental proceeds accompanied by an itemized monthly income and expense statement.`,
        ],
      },
      {
        title: "4. Owner Indemnification & Liability Insurance",
        type: "body",
        paragraphs: [
          `Owner Insurance: Owner shall maintain comprehensive property and liability insurance on the premises with policy limits of not less than $1,000,000, naming Manager as an additional insured party.`,
          `Indemnification: Owner agrees to indemnify, defend, and hold Manager harmless from all claims, damages, liabilities, and legal defense fees arising out of the management of the property, except for claims resulting from Manager's gross negligence or willful misconduct.`,
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
