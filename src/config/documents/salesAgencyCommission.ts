import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const salesAgencyCommissionConfig: DocumentConfig = {
  id: "sales-agency-commission",
  slug: "sales-agency-commission",
  title: "Independent Sales Representative & Commission Agreement",
  shortTitle: "Sales Commission Agreement",
  category: "Business & Corporate",
  description: "Comprehensive statutory independent sales representative contract defining sales territory, product lines, tiered commission percentage schedules, invoice collection timing, chargeback rules, and IRS 1099 contractor status.",
  metaDescription: "Create an enforceable Independent Sales Representative Agreement with commission schedules, sales territory, invoice terms, and 1099 contractor status for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Sales Commission",
  iconName: "TrendingUp",
  searchKeywords: [
    "independent sales rep agreement template",
    "sales commission contract pdf",
    "manufacturers sales representative agreement",
    "commission sales contract 1099",
    "exclusive sales territory agreement",
    "sales rep commission clawback clause",
  ],
  features: [
    "Defines geographic sales territory and authorized product lines or service offerings",
    "Establishes precise commission percentages (e.g., 10% to 20%) calculated on net invoice collections",
    "Includes customer return chargeback mechanisms and post-termination tail commission rights",
    "Reinforces IRS Form 1099 independent contractor status and autonomous business operations",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "IL",
    companyName: "Vanguard Medical Systems, Inc.",
    companyAddress: "100 North Riverside Plaza, Suite 1800, Chicago, IL 60606",
    representativeName: "Marcus Christopher Bennett",
    representativeAddress: "450 Prairie Avenue, Naperville, IL 60540",
    salesTerritory: "Midwest Region: Illinois, Indiana, Michigan, and Wisconsin (Exclusive)",
    productLines: "Orthopedic surgical implants, endoscopic visualization hardware, and associated disposable clinical supplies.",
    commissionRatePercentage: "12",
    commissionPaymentTiming: "Paid monthly on or before the 15th calendar day following customer invoice collection.",
    terminationNoticeDays: "30",
    tailPeriodDays: "90",
  },
  steps: [
    {
      id: "sales_parties",
      title: "Company & Sales Representative",
      description: "Enter identifying details for the hiring company and the independent sales representative.",
      fields: [
        {
          name: "companyName",
          label: "Principal Company Name",
          type: "text",
          placeholder: "e.g., Vanguard Medical Systems, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "companyAddress",
          label: "Company Corporate Address",
          type: "text",
          placeholder: "e.g., 100 North Riverside Plaza, Suite 1800, Chicago, IL 60606",
          required: true,
          gridCols: 2,
        },
        {
          name: "representativeName",
          label: "Sales Representative Legal Name / Entity",
          type: "text",
          placeholder: "e.g., Marcus Christopher Bennett",
          required: true,
          gridCols: 2,
        },
        {
          name: "representativeAddress",
          label: "Representative Business Address",
          type: "text",
          placeholder: "e.g., 450 Prairie Avenue, Naperville, IL 60540",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "commission_terms",
      title: "Territory, Rates & Payouts",
      description: "Define assigned sales territory, product line, commission percentage, and payment terms.",
      fields: [
        {
          name: "salesTerritory",
          label: "Designated Sales Territory",
          type: "text",
          placeholder: "e.g., Midwest Region: IL, IN, MI, WI (Exclusive)",
          required: true,
          gridCols: 1,
        },
        {
          name: "productLines",
          label: "Authorized Product / Service Line",
          type: "textarea",
          placeholder: "List specific products, commercial equipment, software, or services...",
          required: true,
          gridCols: 1,
        },
        {
          name: "commissionRatePercentage",
          label: "Sales Commission Rate (% of Net Collected Revenue)",
          type: "text",
          placeholder: "e.g., 12",
          required: true,
          gridCols: 2,
        },
        {
          name: "commissionPaymentTiming",
          label: "Commission Disbursement Schedule",
          type: "text",
          placeholder: "e.g., Monthly on the 15th following actual invoice payment collection",
          required: true,
          gridCols: 2,
        },
        {
          name: "tailPeriodDays",
          label: "Post-Termination Commission Tail Period (Days)",
          type: "text",
          placeholder: "e.g., 90 (Commissions on orders booked before exit)",
          required: true,
          gridCols: 2,
        },
        {
          name: "terminationNoticeDays",
          label: "Written Notice to Terminate (Days)",
          type: "text",
          placeholder: "e.g., 30",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Effective Agreement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const comp = data.companyName || "Principal Company";
    const rep = data.representativeName || "Sales Representative";
    const rate = data.commissionRatePercentage || "12";
    const tail = data.tailPeriodDays || "90";
    const statuteCite = statute?.statuteCitation || "State Sales Representative Act and Commercial Contract Law";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: "INDEPENDENT SALES REPRESENTATIVE AGREEMENT" },
          { label: "PRINCIPAL COMPANY", value: `${comp}` },
          { label: "SALES REPRESENTATIVE", value: `${rep}` },
          { label: "ASSIGNED TERRITORY", value: `${data.salesTerritory || "Designated territory on file"}` },
          { label: "COMMISSION RATE", value: `${rate}% of Net Collected Invoices` },
          { label: "DISBURSEMENT SCHEDULE", value: `${data.commissionPaymentTiming || "Monthly upon receipt"}` },
          { label: "POST-TERMINATION TAIL", value: `${tail} Calendar Days` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Appointment & Sales Territory",
        type: "body",
        paragraphs: [
          `THIS INDEPENDENT SALES REPRESENTATIVE AGREEMENT is entered into as of ${data.noticeDate || "the date of execution"}, by and between ${comp} ("Company") and ${rep} ("Representative").`,
          `Appointment: Company hereby appoints Representative as its sales representative to solicit orders for Company's products described as: "${data.productLines || "Authorized company products"}" within the designated territory: "${data.salesTerritory || "Designated territory"}".`,
          `Independent Status: Representative is an independent contractor and not an employee or legal partner. Representative maintains sole control over working hours and methods and is solely responsible for all federal, state, and local self-employment taxes under IRS Form 1099-NEC.`,
        ],
      },
      {
        title: "2. Commission Computation & Payment Schedule",
        type: "body",
        paragraphs: [
          `Commission Calculation: Company shall pay Representative a commission equal to ${rate}% of the net invoiced amount (gross sales price less freight, sales taxes, and documented customer discounts) actually collected by Company for orders solicited by Representative.`,
          `Payment Timing: Commissions earned during each calendar month shall be disbursed on or before the schedule: "${data.commissionPaymentTiming || "monthly following customer payment"}", accompanied by an itemized commission statement listing customer names, invoice numbers, and collections.`,
          `Chargebacks: If a customer defaults on payment or returns merchandise for credit, any previously advanced commission on that sale may be charged back or offset against future commissions.`,
        ],
      },
      {
        title: "3. Termination & Post-Termination Tail Commissions",
        type: "body",
        paragraphs: [
          `Termination Notice: Either party may terminate this Agreement without cause upon providing ${data.terminationNoticeDays || "30"} calendar days prior written notice to the other party.`,
          `Tail Commissions: Following termination, Representative shall remain entitled to receive full commissions on all accepted purchase orders procured by Representative prior to the effective termination date that are delivered and collected within ${tail} calendar days following termination.`,
        ],
      },
      {
        title: "4. Trade Secrets, Non-Solicitation & Statutory Compliance",
        type: "body",
        paragraphs: [
          `Confidentiality: Representative shall maintain the absolute confidentiality of Company's pricing structures, customer lists, and proprietary trade secrets both during and after the term of this Agreement.`,
          `Statutory Sales Rep Protection: This Agreement complies with state sales representative protection acts requiring timely commission remittances upon termination pursuant to ${statuteCite}.`,
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
