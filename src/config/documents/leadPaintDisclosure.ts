import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const leadPaintDisclosureConfig: DocumentConfig = {
  id: "lead-paint-disclosure",
  slug: "lead-paint-disclosure",
  title: "Lead-Based Paint Hazard Disclosure (EPA Title X Mandate)",
  shortTitle: "Lead Paint Disclosure",
  category: "Real Estate",
  description: "Federally mandated EPA Title X lead-based paint disclosure statement required for residential sales and leases of properties built prior to 1978, shielding housing providers from severe federal civil penalties.",
  metaDescription: "Generate a federally compliant Lead-Based Paint Hazard Disclosure (EPA Title X). Required for all pre-1978 residential sales and leases in all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Federal EPA Title X",
  iconName: "AlertTriangle",
  searchKeywords: [
    "lead based paint disclosure template",
    "epa title x lead paint form pdf",
    "pre 1978 housing lead disclosure",
    "lead paint pamphlet acknowledgment form",
    "landlord lead based paint addendum",
    "hud lead hazard disclosure document",
  ],
  features: [
    "Mandatory federal disclosure under Section 1018 of the Residential Lead-Based Paint Hazard Reduction Act of 1992",
    "Includes federal Lead Warning Statement verbatim as codified under 40 C.F.R. Part 745 and 24 C.F.R. Part 35",
    "Records receipt of federally approved lead hazard information pamphlet (Protect Your Family From Lead in Your Home)",
    "Shields property owners and real estate agents from federal statutory penalties exceeding $19,000 per violation",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "IL",
    transactionType: "lease",
    housingProviderName: "",
    housingProviderAddress: "",
    recipientName: "",
    propertyAddress: "",
    builtYear: "1965",
    leadPaintKnown: "no_knowledge",
    leadReportsAvailable: "no_records",
    pamphletDelivered: "yes",
    inspectionPeriodWaived: "yes",
  },
  steps: [
    {
      id: "parties_property",
      title: "Parties & Property Age",
      description: "Enter identifying details for the housing provider, purchaser or tenant, and pre-1978 dwelling.",
      fields: [
        {
          name: "transactionType",
          label: "Transaction Nature",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Residential Lease / Rental Tenancy", value: "lease" },
            { label: "Residential Real Property Sale / Purchase", value: "sale" },
          ],
        },
        {
          name: "builtYear",
          label: "Approximate Year Dwelling Built",
          type: "text",
          placeholder: "e.g., 1968 (Must be prior to 1978)",
          required: true,
          gridCols: 2,
        },
        {
          name: "housingProviderName",
          label: "Landlord / Lessor / Property Seller Legal Name",
          type: "text",
          placeholder: "e.g., Midwest Heritage Residential Properties LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "housingProviderAddress",
          label: "Housing Provider Legal Address",
          type: "text",
          placeholder: "e.g., 200 East Randolph Street, Suite 5000, Chicago, IL 60601",
          required: true,
          gridCols: 1,
        },
        {
          name: "recipientName",
          label: "Tenant(s) / Purchaser(s) Full Legal Name(s)",
          type: "text",
          placeholder: "e.g., David Arthur Miller and Sarah Miller",
          required: true,
          gridCols: 1,
        },
        {
          name: "propertyAddress",
          label: "Dwelling Physical Street Address & Unit",
          type: "text",
          placeholder: "e.g., 1420 North Lake Shore Drive, Apt 8B, Chicago, IL 60610",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "disclosures_pamphlet",
      title: "EPA Disclosures & Records",
      description: "Certify presence of lead hazards and delivery of federal EPA safety pamphlets.",
      fields: [
        {
          name: "leadPaintKnown",
          label: "Lessor / Seller Disclosure of Known Lead Paint",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Lessor/Seller has NO KNOWLEDGE of lead-based paint or hazards in the housing", value: "no_knowledge" },
            { label: "Lead-based paint and/or hazards are KNOWN to be present (details attached)", value: "known_present" },
          ],
        },
        {
          name: "leadReportsAvailable",
          label: "Availability of Inspection Reports & Records",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Lessor/Seller has NO REPORTS or records pertaining to lead-based paint in the housing", value: "no_records" },
            { label: "Lessor/Seller has PROVIDED recipient with all available records and reports", value: "records_provided" },
          ],
        },
        {
          name: "pamphletDelivered",
          label: "Recipient Acknowledgment of EPA Pamphlet",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Yes - Recipient received 'Protect Your Family From Lead in Your Home'", value: "yes" },
          ],
        },
        {
          name: "inspectionPeriodWaived",
          label: "10-Day Lead Hazard Risk Assessment Opportunity",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Purchaser/Tenant WAIVED the 10-day opportunity to conduct risk assessment", value: "yes" },
            { label: "Purchaser/Tenant exercised 10-day risk assessment opportunity", value: "exercised" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date Disclosure Signed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const provider = data.housingProviderName || "Housing Provider (Lessor/Seller)";
    const recipient = data.recipientName || "Recipient (Lessee/Purchaser)";
    const premises = data.propertyAddress || "Residential dwelling";
    const builtYear = data.builtYear || "Pre-1978";
    const transType = data.transactionType === "sale" ? "REAL ESTATE SALE" : "RESIDENTIAL LEASE";
    const statuteCite = "42 U.S.C. Section 4852d & 40 C.F.R. Part 745";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "FEDERAL DISCLOSURE", value: "DISCLOSURE OF INFORMATION ON LEAD-BASED PAINT HAZARDS" },
          { label: "TRANSACTION TYPE", value: `${transType}` },
          { label: "HOUSING PROVIDER", value: `${provider}, ${data.housingProviderAddress || ""}` },
          { label: "PURCHASER / TENANT", value: `${recipient}` },
          { label: "SUBJECT PROPERTY", value: `${premises} (Constructed circa ${builtYear})` },
          { label: "FEDERAL STATUTORY BASIS", value: `${statuteCite} (EPA Title X Mandate)` },
          { label: "EPA PAMPHLET STATUS", value: "Pamphlet 'Protect Your Family From Lead in Your Home' Received" },
        ],
      },
      {
        title: "Federal Lead Warning Statement (42 U.S.C. 4852d)",
        type: "body",
        paragraphs: [
          `HOUSING BUILT BEFORE 1978 MAY CONTAIN LEAD-BASED PAINT. LEAD FROM PAINT, PAINT CHIPS, AND DUST CAN POSE SERIOUS HEALTH HAZARDS IF NOT MANAGED PROPERLY. LEAD EXPOSURE IS ESPECIALLY HARMFUL TO YOUNG CHILDREN AND PREGNANT WOMEN. BEFORE RENTING OR PURCHASING PRE-1978 HOUSING, LESSORS AND SELLERS MUST DISCLOSE THE PRESENCE OF KNOWN LEAD-BASED PAINT AND/OR LEAD-BASED PAINT HAZARDS IN THE DWELLING. LESSEES AND PURCHASERS MUST ALSO RECEIVE A FEDERALLY APPROVED PAMPHLET ON LEAD POISONING PREVENTION.`,
        ],
      },
      {
        title: "1. Lessor / Seller Disclosure & Certification",
        type: "body",
        paragraphs: [
          `Presence of Lead-Based Paint: ${data.leadPaintKnown === "known_present" ? "Known lead-based paint and/or hazards are present in the housing (attached are explanations of locations and condition)." : "Lessor/Seller has NO KNOWLEDGE of lead-based paint and/or lead-based paint hazards in the housing."}`,
          `Records and Reports Available: ${data.leadReportsAvailable === "records_provided" ? "Lessor/Seller has provided the purchaser/lessee with all available records and reports pertaining to lead-based paint in the housing." : "Lessor/Seller has NO REPORTS or records pertaining to lead-based paint or lead-based paint hazards in the housing."}`,
        ],
      },
      {
        title: "2. Lessee / Purchaser Acknowledgment",
        type: "body",
        paragraphs: [
          `Purchaser/Lessee acknowledges that: (a) Purchaser/Lessee has received copies of all information and records listed above; and (b) Purchaser/Lessee has received the federally approved pamphlet entitled 'Protect Your Family From Lead in Your Home'.`,
          `Purchaser/Lessee Opportunity to Inspect: ${data.inspectionPeriodWaived === "yes" ? "Purchaser/Lessee has WAIVED the opportunity to conduct a 10-day risk assessment or inspection for the presence of lead-based paint and/or lead-based paint hazards." : "Purchaser/Lessee has received a 10-day opportunity (or mutually agreed period) to conduct a risk assessment or inspection for the presence of lead-based paint and/or lead-based paint hazards."}`,
        ],
      },
      {
        title: "3. Agent Acknowledgment & Penalty Notice",
        type: "body",
        paragraphs: [
          `Any real estate agent involved in this transaction has informed the lessor/seller of the lessor's/seller's obligations under 42 U.S.C. 4852d and is aware of the agent's legal responsibility to ensure compliance. Failure to comply with federal lead disclosure requirements exposes violators to civil liability, statutory treble damages, and administrative fines exceeding $19,000 per violation under EPA enforcement regulations.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
    ];
  },
};
