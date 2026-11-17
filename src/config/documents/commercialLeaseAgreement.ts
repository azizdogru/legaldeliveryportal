import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const commercialLeaseAgreementConfig: DocumentConfig = {
  id: "commercial-lease-agreement",
  slug: "commercial-lease-agreement",
  title: "Commercial Lease Agreement (Gross & Triple Net NNN)",
  shortTitle: "Commercial Lease",
  category: "Commercial Real Estate",
  description: "Comprehensive commercial real estate lease contract for retail storefronts, office suites, warehouses, and industrial facilities with customizable Gross, Modified Gross, or Triple Net (NNN) expense allocations.",
  metaDescription: "Generate a state-compliant Commercial Lease Agreement. Supports Gross, Modified Gross, and Triple Net (NNN) terms, CAM charges, and commercial remedies for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Gross & NNN Options",
  iconName: "Building2",
  searchKeywords: [
    "commercial lease agreement template",
    "triple net commercial lease form pdf",
    "retail storefront lease agreement",
    "office suite commercial lease contract",
    "warehouse commercial rental agreement",
    "nnn lease agreement template",
  ],
  features: [
    "Supports Full Service Gross, Modified Gross, and Triple Net (NNN) operational lease structures",
    "Itemizes Common Area Maintenance (CAM), real property tax escalations, and building casualty insurance",
    "Includes commercial permitted use covenants, tenant signage rights, and ADA accessibility provisions",
    "Features commercial default acceleration, statutory landlord lien rights, and personal guaranty riders",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    landlordName: "Lone Star Commercial Properties LLC",
    landlordAddress: "1200 Post Oak Blvd, Suite 800, Houston, TX 77056",
    tenantName: "Apex Retail Solutions Inc.",
    tenantAddress: "2400 West Loop South, Houston, TX 77027",
    premisesAddress: "5400 Richmond Avenue, Suite 104, Houston, TX 77056",
    rentableSquareFeet: "2400",
    leaseType: "triple_net",
    permittedUse: "General retail sales and commercial office operations.",
    leaseTermYears: "3",
    leaseStartDate: new Date().toISOString().split("T")[0],
    leaseEndDate: "",
    baseMonthlyRent: "4800.00",
    camEstimatedMonthly: "850.00",
    securityDeposit: "9600.00",
    personalGuarantorName: "",
  },
  steps: [
    {
      id: "parties_property",
      title: "Commercial Entities & Premises",
      description: "Enter identifying details for the commercial landlord, corporate tenant, and leased premises.",
      fields: [
        {
          name: "landlordName",
          label: "Commercial Landlord / Property Owner Entity",
          type: "text",
          placeholder: "e.g., Lone Star Commercial Properties LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordAddress",
          label: "Landlord Notice Physical Address",
          type: "text",
          placeholder: "e.g., 1200 Post Oak Blvd, Suite 800, Houston, TX 77056",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantName",
          label: "Tenant Company Legal Name (Corporate Lessee)",
          type: "text",
          placeholder: "e.g., Apex Retail Solutions Inc.",
          required: true,
          gridCols: 1,
        },
        {
          name: "premisesAddress",
          label: "Commercial Leased Premises Physical Address",
          type: "text",
          placeholder: "e.g., 5400 Richmond Avenue, Suite 104, Houston, TX 77056",
          required: true,
          gridCols: 1,
        },
        {
          name: "rentableSquareFeet",
          label: "Rentable Area (Square Feet)",
          type: "text",
          placeholder: "e.g., 2400",
          required: true,
          gridCols: 2,
        },
        {
          name: "permittedUse",
          label: "Exclusive Permitted Commercial Use",
          type: "text",
          placeholder: "e.g., Retail apparel sales and general administrative business offices",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "financial_structure",
      title: "Lease Type, Rent & CAM Expenses",
      description: "Define base rent, lease term, and operating expense allocation (Gross vs NNN).",
      fields: [
        {
          name: "leaseType",
          label: "Lease Expense Structure",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Triple Net (NNN) - Tenant pays base rent plus pro-rata share of taxes, insurance, and CAM", value: "triple_net" },
            { label: "Full Service Gross - Landlord pays taxes, building insurance, and structural CAM", value: "full_service_gross" },
            { label: "Modified Gross - Tenant pays base rent plus metered utilities and janitorial", value: "modified_gross" },
          ],
        },
        {
          name: "leaseTermYears",
          label: "Initial Lease Term (Years)",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "1 Year", value: "1" },
            { label: "2 Years", value: "2" },
            { label: "3 Years", value: "3" },
            { label: "5 Years", value: "5" },
            { label: "10 Years", value: "10" },
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
          name: "baseMonthlyRent",
          label: "Base Monthly Rent ($ USD)",
          type: "currency",
          placeholder: "e.g., 4800.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "camEstimatedMonthly",
          label: "Estimated Monthly CAM / Taxes / Insurance ($ USD)",
          type: "currency",
          placeholder: "e.g., 850.00",
          required: false,
          gridCols: 2,
        },
        {
          name: "securityDeposit",
          label: "Commercial Security Deposit ($ USD)",
          type: "currency",
          placeholder: "e.g., 9600.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "personalGuarantorName",
          label: "Personal Guarantor Legal Name (Optional)",
          type: "text",
          placeholder: "e.g., Marcus Alexander Reed (Leave blank if entity only)",
          required: false,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Date Agreement Signed",
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
    const baseRent = parseFloat(data.baseMonthlyRent || "0").toFixed(2);
    const cam = parseFloat(data.camEstimatedMonthly || "0").toFixed(2);
    const deposit = parseFloat(data.securityDeposit || "0").toFixed(2);
    const premises = data.premisesAddress || "the commercial premises";
    const leaseTypeDesc = data.leaseType === "triple_net" ? "Triple Net (NNN)" : data.leaseType === "modified_gross" ? "Modified Gross" : "Full Service Gross";
    const statuteCite = statute?.statuteCitation || "State Commercial Landlord and Tenant Code & UCC";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LEASE CLASSIFICATION", value: `COMMERCIAL REAL PROPERTY LEASE (${leaseTypeDesc.toUpperCase()})` },
          { label: "LANDLORD / LESSOR", value: `${landlord}, ${data.landlordAddress || ""}` },
          { label: "TENANT / LESSEE", value: `${tenant}, ${data.tenantAddress || ""}` },
          { label: "COMMERCIAL PREMISES", value: `${premises} (${data.rentableSquareFeet || "N/A"} RSF)` },
          { label: "PERMITTED USE", value: `${data.permittedUse || "General commercial and office operations"}` },
          { label: "INITIAL LEASE TERM", value: `${data.leaseTermYears || "3"} Years commencing ${data.leaseStartDate || "commencement date"}` },
          { label: "BASE MONTHLY RENT", value: `$${baseRent} USD/month${data.leaseType === "triple_net" ? ` plus estimated CAM/tax/insurance of $${cam} USD` : ""}` },
          { label: "SECURITY DEPOSIT", value: `$${deposit} USD` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Demise of Premises & Initial Lease Term",
        type: "body",
        paragraphs: [
          `THIS COMMERCIAL LEASE AGREEMENT is entered into on ${data.noticeDate || "the date of execution"}, by and between Landlord ${landlord} and Tenant ${tenant}. Landlord leases to Tenant, and Tenant hires from Landlord, the commercial real property located at ${premises}, containing approximately ${data.rentableSquareFeet || "2400"} rentable square feet.`,
          `Term: The lease term shall be for an initial period of ${data.leaseTermYears || "3"} years, commencing on ${data.leaseStartDate || "the commencement date"} and expiring at midnight on the anniversary date, unless renewed or terminated earlier pursuant to agreement.`,
        ],
      },
      {
        title: `2. Base Rent, Operating Expenses & Expense Allocation (${leaseTypeDesc})`,
        type: "body",
        paragraphs: [
          `Base Rent: Tenant covenants and agrees to pay to Landlord monthly base rent of $${baseRent} USD, in advance, on or before the first calendar day of each month without offset or deduction.`,
          `Expense Structure (${leaseTypeDesc}): ${data.leaseType === "triple_net" ? `In addition to Base Rent, Tenant covenants to pay Tenant's proportionate share of Operating Expenses, including Real Estate Taxes, Special Assessments, Building Casualty and Liability Insurance premiums, and Common Area Maintenance (CAM) charges, currently estimated at $${cam} USD per month, subject to annual reconciliation.` : `Landlord shall be responsible for paying real estate taxes and building casualty insurance, and Tenant shall pay all metered interior utilities and janitorial services.`}`,
        ],
      },
      {
        title: "3. Permitted Commercial Use & Maintenance Obligations",
        type: "body",
        paragraphs: [
          `Permitted Use: The premises shall be used solely and exclusively for: "${data.permittedUse || "General commercial business operations"}", and for no other purpose without Landlord prior written consent. Tenant shall comply with all zoning ordinances, environmental regulations, and Title III of the Americans with Disabilities Act (ADA).`,
          `Maintenance: Tenant shall keep the interior non-structural elements, storefront glass, electrical fixtures, plumbing, and HVAC systems in good operating order. Landlord shall maintain the structural foundations, exterior load-bearing walls, and roof integrity.`,
        ],
      },
      {
        title: "4. Commercial Default, Acceleration & Statutory Landlord Lien",
        type: "body",
        paragraphs: [
          `Default Remedies: If Tenant fails to pay rent within ten (10) calendar days after notice, or breaches any other covenant, Landlord may terminate the lease, accelerate all remaining unpaid rent through term expiration, re-enter the premises, and initiate commercial eviction proceedings in ${statute?.courtJurisdiction || "the competent Court"}.`,
          `Landlord Lien: Pursuant to ${statuteCite}, Landlord retains an express contractual and statutory lien upon all trade fixtures, inventory, machinery, and equipment of Tenant situated upon the premises to secure performance of all rent obligations.`,
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
