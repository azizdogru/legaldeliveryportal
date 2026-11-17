import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const ceaseAndDesistConfig: DocumentConfig = {
  id: "cease-and-desist",
  slug: "cease-and-desist",
  title: "Cease and Desist Letter",
  shortTitle: "Cease & Desist",
  category: "Demands & Disputes",
  description: "Official pre-suit formal notice demanding immediate termination of unlawful harassment, defamation, copyright infringement, debt collector abuse, or neighbor nuisance.",
  metaDescription: "Generate a state-specific Cease and Desist Letter compliant with all 50 states. Stop harassment, defamation, or IP infringement immediately. Download court-ready PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "High Enforcement",
  iconName: "ShieldAlert",
  searchKeywords: [
    "cease and desist letter template",
    "harassment cease and desist",
    "defamation demand letter",
    "slander notice to cease",
    "copyright infringement notice",
    "neighbor nuisance letter",
  ],
  features: [
    "State statute citations for civil harassment and tort injunctions",
    "Specific clauses for harassment, defamation, debt abuse, and IP theft",
    "Litigation hold instruction requiring preservation of digital records",
    "Complete Certificate of Service and declarant verification",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    disputeType: "harassment",
    senderName: "",
    senderAddress: "",
    senderCityStateZip: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientCityStateZip: "",
    conductDescription: "",
    datesOfIncident: "",
    cureDays: "10",
    serviceMethod: "Certified Mail Return Receipt Requested",
  },
  steps: [
    {
      id: "parties",
      title: "Parties Information",
      description: "Enter identifying details for the sender and the offending recipient.",
      fields: [
        {
          name: "senderName",
          label: "Your Full Legal Name (Sender)",
          type: "text",
          placeholder: "e.g., Jonathan Vance",
          required: true,
          gridCols: 1,
        },
        {
          name: "senderAddress",
          label: "Your Street Address",
          type: "text",
          placeholder: "e.g., 742 Evergreen Terrace",
          required: true,
          gridCols: 2,
        },
        {
          name: "senderCityStateZip",
          label: "Your City, State, and Zip",
          type: "text",
          placeholder: "e.g., Los Angeles, CA 90001",
          required: true,
          gridCols: 2,
        },
        {
          name: "recipientName",
          label: "Recipient Full Legal Name or Entity",
          type: "text",
          placeholder: "e.g., Marcus Sterling / Apex Media LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "recipientAddress",
          label: "Recipient Street Address",
          type: "text",
          placeholder: "e.g., 100 Corporate Parkway, Suite 400",
          required: true,
          gridCols: 2,
        },
        {
          name: "recipientCityStateZip",
          label: "Recipient City, State, and Zip",
          type: "text",
          placeholder: "e.g., Beverly Hills, CA 90210",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "dispute",
      title: "Dispute & Offending Conduct",
      description: "Specify the category and factual details of the unlawful conduct.",
      fields: [
        {
          name: "disputeType",
          label: "Dispute Classification",
          type: "select",
          required: true,
          options: [
            { label: "Personal Harassment & Intimidation", value: "harassment" },
            { label: "Defamation, Slander, or Libel", value: "defamation" },
            { label: "Intellectual Property / Copyright Infringement", value: "copyright" },
            { label: "Neighbor Nuisance & Encroachment", value: "nuisance" },
            { label: "Unlawful Debt Collection Harassment (FDCPA)", value: "debt_collection" },
          ],
        },
        {
          name: "datesOfIncident",
          label: "Dates or Timeframe of Unlawful Conduct",
          type: "text",
          placeholder: "e.g., Ongoing from September 14, 2026 to present date",
          required: true,
        },
        {
          name: "conductDescription",
          label: "Detailed Factual Summary of Unlawful Conduct",
          type: "textarea",
          placeholder: "Describe the specific wrongful acts, false statements published, copyrighted works used, or harassing communications in detail...",
          required: true,
          helperText: "Be factual, objective, and specific. Include platforms, dates, and direct quotations where applicable.",
        },
      ],
    },
    {
      id: "demand_terms",
      title: "Demand Terms & Deadlines",
      description: "Establish the mandatory response window and legal consequences.",
      fields: [
        {
          name: "cureDays",
          label: "Compliance Deadline (Calendar Days)",
          type: "select",
          required: true,
          options: [
            { label: "Immediately upon receipt", value: "immediate" },
            { label: "5 Calendar Days", value: "5" },
            { label: "7 Calendar Days", value: "7" },
            { label: "10 Calendar Days", value: "10" },
            { label: "14 Calendar Days", value: "14" },
            { label: "30 Calendar Days", value: "30" },
          ],
        },
        {
          name: "noticeDate",
          label: "Formal Notice Date",
          type: "date",
          required: true,
        },
        {
          name: "serviceMethod",
          label: "Method of Formal Delivery",
          type: "select",
          required: true,
          options: [
            { label: "USPS Certified Mail Return Receipt Requested", value: "Certified Mail Return Receipt Requested" },
            { label: "Personal In-Hand Delivery by Process Server", value: "Personal In-Hand Delivery" },
            { label: "Overnight Commercial Courier with Signature Confirmation", value: "Overnight Courier Delivery" },
            { label: "First-Class Mail with Certificate of Mailing", value: "First-Class Mail with Certificate of Mailing" },
          ],
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const sender = data.senderName || "Sender";
    const recipient = data.recipientName || "Recipient";
    const disputeType = data.disputeType || "harassment";
    const deadline = data.cureDays === "immediate" ? "immediately upon receipt" : `within ${data.cureDays || "10"} calendar days of receipt`;
    const statuteName = statute?.statuteName || "Civil Injunction and Tort Statutes";
    const statuteCite = statute?.statuteCitation || "Applicable State Law";

    let specificDemand = "";
    if (disputeType === "defamation") {
      specificDemand = "immediately retract and permanently remove all false, malicious, and defamatory statements, publications, and postings, and issue a written apology and retraction.";
    } else if (disputeType === "copyright") {
      specificDemand = "immediately cease all unauthorized reproduction, display, distribution, or commercial exploitation of copyrighted materials and destroy or transfer all infringing copies.";
    } else if (disputeType === "debt_collection") {
      specificDemand = "immediately cease all communications and telephone contact pursuant to the Fair Debt Collection Practices Act (15 U.S.C. Section 1692c(c)) and state consumer protection laws.";
    } else if (disputeType === "nuisance") {
      specificDemand = "immediately abate the unlawful nuisance, noise violations, boundary encroachment, and interference with the quiet enjoyment of real property.";
    } else {
      specificDemand = "immediately and permanently cease and desist all direct, indirect, electronic, telephonic, verbal, and physical harassment, stalking, contact, and surveillance.";
    }

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "FROM (SENDER)", value: `${sender}, ${data.senderAddress || ""}, ${data.senderCityStateZip || ""}` },
          { label: "TO (RECIPIENT)", value: `${recipient}, ${data.recipientAddress || ""}, ${data.recipientCityStateZip || ""}` },
          { label: "MATTER", value: `FORMAL CEASE AND DESIST DEMAND: UNLAWFUL ${disputeType.toUpperCase()}` },
          { label: "STATUTORY GOVERNANCE", value: `${statuteCite} (${statuteName})` },
        ],
      },
      {
        title: "1. Formal Written Notice and Statement of Offense",
        type: "body",
        paragraphs: [
          `PLEASE TAKE FORMAL LEGAL NOTICE that this communication constitutes an official pre-suit Cease and Desist demand served upon you pursuant to ${statuteCite}.`,
          `You are hereby placed on written notice that your continued, willful conduct directed toward the undersigned constitutes actionable wrongdoing under state and federal law. Specifically, during the period of ${data.datesOfIncident || "recent dates"}, you have engaged in the following unlawful acts:`,
          `"${data.conductDescription || "Unlawful conduct and unauthorized acts as outlined herein."}"`,
          `This conduct is intentional, non-consensual, harmful, and strictly prohibited by law. It has caused, and continues to cause, substantial emotional distress, financial damage, and irreparable harm.`,
        ],
      },
      {
        title: "2. Mandatory Cease and Desist Directives",
        type: "body",
        paragraphs: [
          `DEMAND IS HEREBY MADE that you ${deadline} comply strictly with the following mandatory terms:`,
        ],
        bulletPoints: [
          `Mandatory Directive 1: You must ${specificDemand}`,
          `Mandatory Directive 2: You must not contact the undersigned, whether in person, by telephone, via SMS text message, electronic mail, social media platforms, or through third parties.`,
          `Mandatory Directive 3: You must deliver written confirmation of your full compliance to the address set forth above ${deadline}.`,
        ],
      },
      {
        title: "3. Mandatory Litigation Hold and Evidence Preservation",
        type: "body",
        paragraphs: [
          `You are hereby instructed to place an immediate litigation hold on all documents, records, emails, text messages, phone logs, social media postings, and digital files relating directly or indirectly to the matters set forth herein. Failure to preserve such records will be treated as intentional spoliation of evidence in court.`,
        ],
      },
      {
        title: "4. Notice of Pending Judicial Action and Sanctions",
        type: "warning",
        paragraphs: [
          `Failure to comply strictly with this demand will leave the undersigned with no alternative but to commence immediate formal legal proceedings against you in ${statute?.courtJurisdiction || "Court"}.`,
          `Legal remedies sought will include: (a) emergency temporary and permanent injunctive orders, (b) actual compensatory and general damages, (c) exemplary and punitive damages for willful malice, and (d) full recovery of court costs and statutory attorney fees.`,
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
