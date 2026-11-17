import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const rentIncreaseNoticeConfig: DocumentConfig = {
  id: "rent-increase-notice",
  slug: "rent-increase-notice",
  title: "Notice of Rent Increase",
  shortTitle: "Rent Increase Notice",
  category: "Landlord & Tenant",
  description: "Official statutory notice of monthly rent adjustment compliant with state advance notice windows (30, 60, or 90 days) and state rent control caps.",
  metaDescription: "Generate a legally compliant Notice of Rent Increase. Pre-configured for state statutory notice periods (30, 60, 90 days) and rent control caps. Download PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Statutory Compliant",
  iconName: "TrendingUp",
  searchKeywords: [
    "notice of rent increase form",
    "landlord rent increase letter",
    "30 day notice rent increase",
    "60 day rent increase form",
    "rent increase notice California AB 1482",
    "rent increase letter New York",
  ],
  features: [
    "Calculates required statutory notice days based on state law",
    "Includes AB 1482 and state rent-cap statutory disclosure clauses",
    "Itemizes previous rent, dollar increase, and new monthly total",
    "Contains formal Certificate of Service for proof of delivery",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "",
    landlordAddress: "",
    landlordCityStateZip: "",
    tenantName: "",
    rentalAddress: "",
    unitNumber: "",
    currentRent: "2100.00",
    newRent: "2205.00",
    effectiveDate: "",
    noticePeriod: "30",
    rentControlExempt: "yes",
    serviceMethod: "Personal Delivery",
  },
  steps: [
    {
      id: "tenancy",
      title: "Tenancy & Premises",
      description: "Enter property address and parties to the residential lease.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord or Property Manager Full Name",
          type: "text",
          placeholder: "e.g., Oakwood Residential Holdings LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordAddress",
          label: "Landlord / Agent Mailing Address",
          type: "text",
          placeholder: "e.g., 1200 Wilshire Blvd, Suite 250",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordCityStateZip",
          label: "Landlord City, State, Zip",
          type: "text",
          placeholder: "e.g., Los Angeles, CA 90017",
          required: true,
          gridCols: 2,
        },
        {
          name: "tenantName",
          label: "All Adult Tenant Names (as listed on lease)",
          type: "text",
          placeholder: "e.g., David Miller and Sarah Miller",
          required: true,
          gridCols: 1,
        },
        {
          name: "rentalAddress",
          label: "Rental Property Street Address",
          type: "text",
          placeholder: "e.g., 445 North Orange Drive",
          required: true,
          gridCols: 2,
        },
        {
          name: "unitNumber",
          label: "Unit / Apartment Number (if applicable)",
          type: "text",
          placeholder: "e.g., Apt 3B",
          required: false,
          gridCols: 2,
        },
      ],
    },
    {
      id: "rent_details",
      title: "Rent Adjustment Figures",
      description: "Enter current and new rental rates and the effective start date.",
      fields: [
        {
          name: "currentRent",
          label: "Current Monthly Rent ($)",
          type: "currency",
          placeholder: "e.g., 2100.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "newRent",
          label: "New Monthly Rent ($)",
          type: "currency",
          placeholder: "e.g., 2205.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "effectiveDate",
          label: "Effective Date of New Rent",
          type: "date",
          required: true,
          helperText: "Must comply with minimum advance statutory notice window.",
        },
        {
          name: "noticePeriod",
          label: "Statutory Notice Window Provided",
          type: "select",
          required: true,
          options: [
            { label: "30 Calendar Days Notice", value: "30" },
            { label: "60 Calendar Days Notice", value: "60" },
            { label: "90 Calendar Days Notice", value: "90" },
          ],
        },
        {
          name: "rentControlExempt",
          label: "Is Property Exempt from State / Local Rent Control?",
          type: "select",
          required: true,
          options: [
            { label: "Yes, exempt from rent caps (e.g. single-family home or new construction)", value: "yes" },
            { label: "No, subject to statutory rent cap (increase complies with cap)", value: "no" },
          ],
        },
      ],
    },
    {
      id: "delivery",
      title: "Notice Delivery & Service",
      description: "Specify delivery date and statutory service method.",
      fields: [
        {
          name: "noticeDate",
          label: "Date Notice is Served",
          type: "date",
          required: true,
        },
        {
          name: "serviceMethod",
          label: "Method of Service",
          type: "select",
          required: true,
          options: [
            { label: "Personal Delivery directly to Tenant", value: "Personal Delivery" },
            { label: "Substituted Service with First-Class Mailing", value: "Substituted Service and Mail" },
            { label: "Affixing to Entry Door and Certified Mail", value: "Posting and Certified Mail" },
            { label: "USPS Certified Mail Return Receipt Requested", value: "Certified Mail Return Receipt Requested" },
          ],
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantName || "Tenant";
    const current = parseFloat(data.currentRent || "0").toFixed(2);
    const newRent = parseFloat(data.newRent || "0").toFixed(2);
    const increaseDollar = (parseFloat(data.newRent || "0") - parseFloat(data.currentRent || "0")).toFixed(2);
    const pct = parseFloat(data.currentRent || "1") > 0
      ? (((parseFloat(data.newRent || "0") - parseFloat(data.currentRent || "0")) / parseFloat(data.currentRent || "1")) * 100).toFixed(1)
      : "0";
    const effective = data.effectiveDate || "the upcoming rental term";
    const statuteCite = statute?.statuteCitation || "Applicable State Landlord and Tenant Law";
    const statuteName = statute?.statuteName || "Residential Rent Adjustment Statute";
    const isExempt = data.rentControlExempt === "yes";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LANDLORD / AGENT", value: `${landlord}, ${data.landlordAddress || ""}, ${data.landlordCityStateZip || ""}` },
          { label: "TENANT(S)", value: `${tenant}` },
          { label: "PREMISES", value: `${data.rentalAddress || "Subject Property"}, Unit ${data.unitNumber || "N/A"}` },
          { label: "SUBJECT", value: `FORMAL STATUTORY NOTICE OF RENT INCREASE` },
          { label: "STATUTORY NOTICE PERIOD", value: `${data.noticePeriod || "30"} Calendar Days` },
          { label: "GOVERNING STATUTE", value: `${statuteCite} (${statuteName})` },
        ],
      },
      {
        title: "1. Notice of Rental Rate Adjustment",
        type: "body",
        paragraphs: [
          `PLEASE TAKE NOTICE that pursuant to ${statuteCite} and the terms of your residential lease agreement, your monthly rent for the premises identified above will be adjusted effective ${effective}.`,
          `This notice serves as the formal statutory written notification required by law. The terms of your rental adjustment are itemized as follows:`,
        ],
        metaTable: [
          { label: "Current Monthly Rent", value: `$${current} USD` },
          { label: "Net Monthly Increase", value: `+$${increaseDollar} USD (${pct}%)` },
          { label: "NEW MONTHLY RENT", value: `$${newRent} USD` },
          { label: "Effective Commencement Date", value: `${effective}` },
          { label: "Payment Due Date", value: "1st day of each calendar month (or as specified in lease)" },
        ],
      },
      {
        title: "2. Statutory Rent Cap and Exemption Statement",
        type: "body",
        paragraphs: [
          isExempt
            ? `Notice of Exemption: This property is not subject to the statutory rent limits of statewide rent stabilization acts pursuant to applicable exemptions (including, but not limited to, alienable single-family residential properties, condominiums, or newly constructed dwellings).`
            : `Statutory Cap Compliance: The rent increase set forth herein is within the lawful statutory rent cap allowable under applicable state and local rent stabilization laws and does not exceed the annual allowable percentage plus cost of living adjustments.`,
        ],
      },
      {
        title: "3. Tenant Acceptance and Continued Tenancy",
        type: "body",
        paragraphs: [
          `All other terms, covenants, rules, and conditions of your existing rental agreement shall remain in full force and effect without modification.`,
          `Payment of the adjusted rent amount on or after ${effective} constitutes legal acceptance of the new rental terms. If you do not wish to continue your tenancy under the new rental rate, you must deliver written notice of non-renewal and vacate the premises on or before ${effective} in compliance with state statutory notice requirements.`,
        ],
      },
      {
        title: "4. Payment Remittance Instructions",
        type: "body",
        paragraphs: [
          `Please ensure your automatic recurring payments, electronic bank transfers, or physical checks are updated to reflect the new amount of $${newRent} beginning on ${effective}.`,
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
