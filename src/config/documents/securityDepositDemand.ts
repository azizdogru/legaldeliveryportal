import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const securityDepositDemandConfig: DocumentConfig = {
  id: "security-deposit-demand",
  slug: "security-deposit-demand",
  title: "Security Deposit Demand Letter (Statutory Penalty Notice)",
  shortTitle: "Security Deposit Demand",
  category: "Landlord & Tenant",
  description: "Formal statutory legal demand to former landlord for unreturned security deposit, citing state statutory deadlines (14, 21, 30 days) and bad-faith statutory penalty multipliers (2x or 3x deposit amount) prior to small claims court action.",
  metaDescription: "Generate a state-specific Security Deposit Demand Letter. Cites state return deadlines, itemized deduction rules, and 2x or 3x statutory penalty multipliers for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Small Claims Prerequisite",
  iconName: "DollarSign",
  searchKeywords: [
    "security deposit demand letter template",
    "demand letter for security deposit return",
    "landlord wrongfully withheld deposit",
    "2x penalty security deposit notice",
    "small claims court security deposit demand",
    "unreturned tenant deposit letter pdf",
  ],
  features: [
    "Cites specific state statutory return deadlines (14 to 45 calendar days depending on jurisdiction)",
    "Demands statutory punitive damages (up to double or treble the deposit amount for bad-faith withholding)",
    "Contests unsubstantiated repair deductions and demands copies of paid vendor receipts",
    "Serves as mandatory pre-lawsuit demand letter required to recover court costs and attorney fees",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    tenantNames: "",
    tenantPhone: "",
    tenantAddress: "",
    landlordName: "",
    landlordAddress: "",
    rentalAddress: "",
    moveOutDate: "",
    depositPaid: "2500.00",
    amountWithheldOrUnreturned: "2500.00",
    disputeReason: "Total failure to remit deposit or itemized accounting within the statutory window following move-out.",
    demandDeadlineDays: "10",
    smallClaimsCourtName: "",
  },
  steps: [
    {
      id: "parties_tenancy",
      title: "Tenant & Former Landlord",
      description: "Enter your contact details and the landlord information.",
      fields: [
        {
          name: "tenantNames",
          label: "Tenant Full Legal Name(s)",
          type: "text",
          placeholder: "e.g., Brandon Walsh and Kelly Taylor",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantPhone",
          label: "Tenant Phone Number",
          type: "text",
          placeholder: "e.g., (555) 432-1098",
          required: true,
          gridCols: 2,
        },
        {
          name: "tenantAddress",
          label: "Tenant Current Mailing / Payment Address",
          type: "text",
          placeholder: "e.g., 90210 Wilshire Blvd, Beverly Hills, CA 90212",
          required: true,
          gridCols: 2,
        },
        {
          name: "rentalAddress",
          label: "Vacated Rental Property Address",
          type: "text",
          placeholder: "e.g., 714 North Maple Drive, Apt 2B, Beverly Hills, CA 90210",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordName",
          label: "Landlord / Management Company Name",
          type: "text",
          placeholder: "e.g., Golden State Property Group LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordAddress",
          label: "Landlord Notice Delivery Address",
          type: "text",
          placeholder: "e.g., 1000 Century Park East, Suite 800, Los Angeles, CA 90067",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "deposit_dispute",
      title: "Deposit Amount & Dispute",
      description: "Specify deposit sums, move-out dates, and contested deductions.",
      fields: [
        {
          name: "moveOutDate",
          label: "Date Premises Vacated & Keys Surrendered",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "depositPaid",
          label: "Original Security Deposit Paid ($ USD)",
          type: "currency",
          placeholder: "e.g., 2500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "amountWithheldOrUnreturned",
          label: "Total Amount Now Demanded ($ USD)",
          type: "currency",
          placeholder: "e.g., 2500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "demandDeadlineDays",
          label: "Days to Remit Funds Before Court Action",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "10 Calendar Days", value: "10" },
            { label: "14 Calendar Days", value: "14" },
            { label: "7 Calendar Days (Final Urgency Notice)", value: "7" },
          ],
        },
        {
          name: "disputeReason",
          label: "Summary of Landlord Violation / Dispute",
          type: "textarea",
          placeholder: "e.g., Landlord failed to provide any written accounting or receipts within 21 days; or improper deductions for ordinary wear and tear (painting, carpet aging).",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Letter Sent",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const tenant = data.tenantNames || "Tenant";
    const landlord = data.landlordName || "Landlord / Management";
    const deposit = parseFloat(data.depositPaid || "0").toFixed(2);
    const demanded = parseFloat(data.amountWithheldOrUnreturned || "0").toFixed(2);
    const penaltyDouble = (parseFloat(demanded) * 2).toFixed(2);
    const penaltyTreble = (parseFloat(demanded) * 3).toFixed(2);
    const days = data.demandDeadlineDays || "10";
    const statuteCite = statute?.statuteCitation || "State Residential Security Deposit Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE TYPE", value: "STATUTORY DEMAND FOR RETURN OF SECURITY DEPOSIT" },
          { label: "FROM FORMER TENANT(S)", value: `${tenant} (Phone: ${data.tenantPhone || "On File"})` },
          { label: "TO LANDLORD / AGENT", value: `${landlord}, ${data.landlordAddress || ""}` },
          { label: "VACATED DWELLING", value: `${data.rentalAddress || "The rental property"}` },
          { label: "SURRENDER DATE", value: `${data.moveOutDate || "Date of surrender"}` },
          { label: "ORIGINAL DEPOSIT", value: `$${deposit} USD` },
          { label: "AMOUNT DEMANDED", value: `$${demanded} USD (Excluding statutory penalties)` },
          { label: "STATUTORY PENALTY EXPOSURE", value: `Up to $${penaltyTreble} USD (2x to 3x statutory multipliers)` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Demand for Return of Wrongfully Withheld Deposit",
        type: "body",
        paragraphs: [
          `PLEASE TAKE NOTICE that tenant ${tenant} hereby makes formal pre-litigation demand upon ${landlord} for immediate return of the security deposit in the sum of $${demanded} USD relating to the tenancy at ${data.rentalAddress || "the premises"}, vacated on ${data.moveOutDate || "the surrender date"}.`,
          `Under ${statuteCite}, landlords are required to return tenant security deposits in full, or deliver an itemized written statement supported by paid contractor invoices and material receipts within the mandatory statutory deadline following surrender of possession.`,
        ],
      },
      {
        title: "2. Statement of Violation & Unlawful Deductions",
        type: "body",
        paragraphs: [
          `Basis of Dispute: ${data.disputeReason || "Landlord failed to remit deposit funds or itemized accounting within statutory limits."}`,
          `Under ${statute?.stateName || "state"} law, landlords are strictly prohibited from deducting funds for normal wear and tear resulting from ordinary, non-abusive dwelling usage. Furthermore, failure to provide statutory written accounting within the mandated timeframe forfeits the landlord's right to withhold any portion of the deposit.`,
        ],
      },
      {
        title: `3. Pre-Suit Notice of Intent to Sue for Treble Damages (${days}-Day Final Window)`,
        type: "body",
        paragraphs: [
          `DEMAND IS HEREBY MADE that you remit a cashier check or electronic funds transfer in the full amount of $${demanded} USD payable to ${tenant} at ${data.tenantAddress || "the tenant mailing address"} within ${days} CALENDAR DAYS of receipt of this notice.`,
          `If this sum is not received within ${days} days, a lawsuit will be filed against you immediately in ${statute?.courtJurisdiction || "Small Claims Court"}. Pursuant to ${statuteCite}, Tenant will seek not only the unreturned deposit of $${demanded} USD, but also statutory bad-faith punitive damages of up to double or treble the deposit amount ($${penaltyDouble} to $${penaltyTreble} USD), plus court filing costs, process server fees, and reasonable attorney fees.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        title: "Certificate of Service / Proof of Delivery",
        type: "body",
        paragraphs: [
          `I certify that on ${data.noticeDate || "the date indicated"}, this Security Deposit Demand Letter was delivered to Landlord via USPS Certified Mail Return Receipt Requested and/or electronic transmission to the designated landlord address.`,
        ],
      },
    ];
  },
};
