import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const llcMembershipTransferConfig: DocumentConfig = {
  id: "llc-membership-transfer",
  slug: "llc-membership-transfer",
  title: "LLC Membership Interest Transfer & Assignment Agreement",
  shortTitle: "LLC Membership Transfer",
  category: "Business & Corporate",
  description: "Comprehensive statutory contract transferring and assigning Limited Liability Company membership units, capital accounts, voting powers, and economic rights from an assignor member to an incoming assignee with company consent.",
  metaDescription: "Create an official LLC Membership Interest Transfer Agreement. Assigns capital accounts, economic rights, voting units, and company operating agreement consents across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "LLC Equity Assignment",
  iconName: "Briefcase",
  searchKeywords: [
    "llc membership interest transfer agreement template",
    "assignment of llc units form pdf",
    "llc buyout agreement template",
    "transfer of membership interest llc",
    "llc member resignation and assignment",
    "llc operating agreement consent to transfer",
  ],
  features: [
    "Assigns percentage equity units, capital accounts, and right to future profit distributions",
    "Conditions admission of assignee as a full substitute voting member upon manager/member approval",
    "Includes assignor representations of unencumbered title free of liens, pledges, or claims",
    "Complies with state Revised Uniform Limited Liability Company Act (RULLCA) transfer provisions",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "DE",
    companyName: "Horizon Ventures, LLC",
    stateOfOrganization: "Delaware",
    assignorName: "Richard Edward Sterling",
    assignorAddress: "720 Park Avenue, Apt 14A, New York, NY 10021",
    assigneeName: "Victoria Grace Kensington",
    assigneeAddress: "450 Lexington Avenue, Suite 2200, New York, NY 10017",
    transferredPercentage: "25",
    transferredUnits: "25000",
    purchasePrice: "125000.00",
    paymentTerms: "Full lump-sum payment via certified bank cashier check or wire transfer at closing.",
    effectiveClosingDate: new Date().toISOString().split("T")[0],
  },
  steps: [
    {
      id: "transfer_parties",
      title: "Company, Assignor & Assignee",
      description: "Enter legal names and addresses for the LLC company, transferring member, and buyer.",
      fields: [
        {
          name: "companyName",
          label: "Limited Liability Company Legal Name",
          type: "text",
          placeholder: "e.g., Horizon Ventures, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "stateOfOrganization",
          label: "LLC State of Organization",
          type: "text",
          placeholder: "e.g., Delaware",
          required: true,
          gridCols: 2,
        },
        {
          name: "assignorName",
          label: "Transferring Member (Assignor) Full Name",
          type: "text",
          placeholder: "e.g., Richard Edward Sterling",
          required: true,
          gridCols: 2,
        },
        {
          name: "assignorAddress",
          label: "Assignor Mailing Address",
          type: "text",
          placeholder: "e.g., 720 Park Avenue, Apt 14A, New York, NY 10021",
          required: true,
          gridCols: 2,
        },
        {
          name: "assigneeName",
          label: "Incoming Purchaser (Assignee) Full Name",
          type: "text",
          placeholder: "e.g., Victoria Grace Kensington",
          required: true,
          gridCols: 2,
        },
        {
          name: "assigneeAddress",
          label: "Assignee Mailing Address",
          type: "text",
          placeholder: "e.g., 450 Lexington Avenue, Suite 2200, New York, NY 10017",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "interest_terms",
      title: "Units, Valuation & Payment",
      description: "Specify equity percentage, number of units, consideration price, and closing date.",
      fields: [
        {
          name: "transferredPercentage",
          label: "Transferred Membership Percentage (%)",
          type: "text",
          placeholder: "e.g., 25",
          required: true,
          gridCols: 2,
        },
        {
          name: "transferredUnits",
          label: "Number of Membership Units Transferred",
          type: "text",
          placeholder: "e.g., 25000 Units",
          required: true,
          gridCols: 2,
        },
        {
          name: "purchasePrice",
          label: "Total Purchase Consideration ($ USD)",
          type: "currency",
          placeholder: "e.g., 125000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "paymentTerms",
          label: "Payment Tender Terms",
          type: "text",
          placeholder: "e.g., Certified cashier check or bank wire transfer at closing",
          required: true,
          gridCols: 2,
        },
        {
          name: "effectiveClosingDate",
          label: "Closing / Effective Transfer Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Agreement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const assignor = data.assignorName || "Assignor Member";
    const assignee = data.assigneeName || "Assignee Purchaser";
    const company = data.companyName || "LLC Company";
    const pct = data.transferredPercentage || "25";
    const units = data.transferredUnits || "Units";
    const price = parseFloat(data.purchasePrice || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const statuteCite = statute?.statuteCitation || "Revised Uniform Limited Liability Company Act (RULLCA)";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT", value: "ASSIGNMENT AND TRANSFER OF LLC MEMBERSHIP INTEREST" },
          { label: "LLC COMPANY", value: `${company} (${data.stateOfOrganization || "State of Organization"})` },
          { label: "ASSIGNOR (SELLER)", value: `${assignor}` },
          { label: "ASSIGNEE (BUYER)", value: `${assignee}` },
          { label: "ASSIGNED INTEREST", value: `${pct}% Membership Interest (${units})` },
          { label: "PURCHASE PRICE", value: `$${price} USD (${data.paymentTerms || "Certified Funds"})` },
          { label: "CLOSING DATE", value: `${data.effectiveClosingDate || "Date of Execution"}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Assignment and Sale of LLC Interest",
        type: "body",
        paragraphs: [
          `THIS ASSIGNMENT AND TRANSFER OF MEMBERSHIP INTEREST is made effective as of ${data.effectiveClosingDate || "the date of execution"}, by and between ${assignor} ("Assignor") and ${assignee} ("Assignee"), with respect to ${company} (the "Company").`,
          `Assignment: For and in consideration of the sum of $${price} USD and other good and valuable consideration, Assignor hereby sells, assigns, transfers, and conveys to Assignee all of Assignor's right, title, and interest in and to a ${pct}% membership interest in the Company, including all associated voting rights, capital account balances, and rights to profits, losses, and distributions.`,
        ],
      },
      {
        title: "2. Assignor Representations & Warranties",
        type: "body",
        paragraphs: [
          `Ownership: Assignor represents and warrants that Assignor is the sole lawful record and beneficial owner of the transferred membership interest, free and clear of all liens, claims, encumbrances, security interests, pledges, options, or voting proxies of any kind.`,
          `Authority: Assignor has full legal right, power, and authority to enter into and perform this Agreement without violating any statute, court decree, or contractual restriction.`,
        ],
      },
      {
        title: "3. Assignee Acceptance & Operating Agreement Covenants",
        type: "body",
        paragraphs: [
          `Bound by Operating Agreement: Assignee hereby accepts the assignment of the membership interest, agrees to be bound by all the terms, covenants, and restrictions of the Company's Operating Agreement, and assumes all liabilities associated with the interest arising from and after the effective date.`,
          `Tax Allocation: Profits, losses, and distributable cash for the current fiscal tax year shall be allocated between Assignor and Assignee based on the closing date in accordance with Section 706 of the Internal Revenue Code.`,
        ],
      },
      {
        title: "4. Company Consent & Admission as Substitute Member",
        type: "body",
        paragraphs: [
          `Admission as Member: The undersigned Manager(s) and/or requisite Members of the Company hereby formally consent to the transfer of the membership interest and approve the admission of Assignee as a substitute voting Member of the Company pursuant to ${statuteCite}.`,
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
