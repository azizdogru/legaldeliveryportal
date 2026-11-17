import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const bouncedCheckDemandLetterConfig: DocumentConfig = {
  id: "bounced-check-demand-letter",
  slug: "bounced-check-demand-letter",
  title: "Bad Check Demand Letter (Dishonored Check Treble Damages)",
  shortTitle: "Bad Check Demand Notice",
  category: "Debt & Financial",
  description: "Formal statutory demand notice served on drawers of bad, bounced, or dishonored checks (NSF) citing state bad check civil recovery laws and potential treble (3x) damages.",
  metaDescription: "Create an official Bad Check Demand Letter for NSF / dishonored checks. Cites state bad check statutes, statutory grace periods, and treble (3x) civil damages for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "NSF Treble Damages",
  iconName: "AlertCircle",
  searchKeywords: [
    "bad check demand letter template",
    "bounced check notice form pdf",
    "nsf dishonored check demand letter",
    "treble damages bad check statute",
    "insufficient funds demand letter",
    "statutory bad check notice",
  ],
  features: [
    "Statutorily required formal condition precedent before filing civil court actions for bad checks",
    "Itemizes dishonored check number, face amount, processing bank, and returned check fee",
    "Provides mandatory 30-day (or state statutory) cure window to remit cash or certified funds",
    "Warns drawer of statutory treble (3x) civil liability plus court costs and attorney fees",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    payeeName: "Golden State Supply, LLC",
    payeeAddress: "2200 Corporate Center Drive, Suite 300, Irvine, CA 92606",
    payeePhone: "(949) 555-0188",
    drawerName: "Robert James Miller",
    drawerAddress: "1450 Elm Street, Santa Ana, CA 92701",
    checkNumber: "4192",
    checkDate: new Date(Date.now() - 14 * 86400000).toISOString().split("T")[0],
    bankName: "Wells Fargo Bank, N.A.",
    checkAmount: "1850.00",
    statutoryServiceFee: "25.00",
    statutoryCureDays: "30",
  },
  steps: [
    {
      id: "bad_check_parties",
      title: "Payee & Drawer Information",
      description: "Enter payee (creditor) contact details and the check issuer (drawer) info.",
      fields: [
        {
          name: "payeeName",
          label: "Payee / Holder in Due Course Legal Name",
          type: "text",
          placeholder: "e.g., Golden State Supply, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "payeeAddress",
          label: "Payee Business Mailing Address",
          type: "text",
          placeholder: "e.g., 2200 Corporate Center Drive, Suite 300, Irvine, CA 92606",
          required: true,
          gridCols: 2,
        },
        {
          name: "payeePhone",
          label: "Payee Contact Telephone",
          type: "phone",
          placeholder: "e.g., (949) 555-0188",
          required: true,
          gridCols: 2,
        },
        {
          name: "drawerName",
          label: "Check Issuer / Drawer Full Name",
          type: "text",
          placeholder: "e.g., Robert James Miller",
          required: true,
          gridCols: 2,
        },
        {
          name: "drawerAddress",
          label: "Drawer Residence / Business Address",
          type: "text",
          placeholder: "e.g., 1450 Elm Street, Santa Ana, CA 92701",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "check_details",
      title: "Check & Banking Specifics",
      description: "Provide check number, original date, bank, face value, and statutory fee.",
      fields: [
        {
          name: "checkNumber",
          label: "Dishonored Check Number",
          type: "text",
          placeholder: "e.g., 4192",
          required: true,
          gridCols: 2,
        },
        {
          name: "checkDate",
          label: "Date Written on Check",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "bankName",
          label: "Drawee Bank Name",
          type: "text",
          placeholder: "e.g., Wells Fargo Bank, N.A.",
          required: true,
          gridCols: 2,
        },
        {
          name: "checkAmount",
          label: "Check Face Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 1850.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "statutoryServiceFee",
          label: "Statutory Returned Check Service Charge ($ USD)",
          type: "currency",
          placeholder: "e.g., 25.00 (or $35.00 per state statute)",
          required: true,
          gridCols: 2,
        },
        {
          name: "statutoryCureDays",
          label: "Statutory Cure Period (Days)",
          type: "text",
          placeholder: "e.g., 30",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Date Demand Notice Mailed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const payee = data.payeeName || "Payee";
    const drawer = data.drawerName || "Check Drawer";
    const checkAmt = parseFloat(data.checkAmount || "0").toFixed(2);
    const feeAmt = parseFloat(data.statutoryServiceFee || "25").toFixed(2);
    const totalDue = (parseFloat(checkAmt) + parseFloat(feeAmt)).toFixed(2);
    const trebleDamages = (parseFloat(checkAmt) * 3).toFixed(2);
    const cureDays = data.statutoryCureDays || "30";
    const statuteCite = statute?.statuteCitation || "State Civil Code Dishonored Check Provisions";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE TYPE", value: "STATUTORY DEMAND FOR PAYMENT OF DISHONORED CHECK" },
          { label: "PAYEE (CREDITOR)", value: `${payee}` },
          { label: "DRAWER (ISSUER)", value: `${drawer}` },
          { label: "DISHONORED CHECK NO.", value: `Check #${data.checkNumber || "N/A"}` },
          { label: "DRAWEE BANK", value: `${data.bankName || "Financial Institution"}` },
          { label: "CHECK FACE AMOUNT", value: `$${checkAmt} USD` },
          { label: "RETURNED CHECK FEE", value: `$${feeAmt} USD` },
          { label: "TOTAL DEMAND NOW DUE", value: `$${totalDue} USD (Certified Funds Only)` },
          { label: "TREBLE LIABILITY POTENTIAL", value: `$${trebleDamages} USD (3x Face Amount)` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "Formal Notice of Dishonor & Statutory Demand",
        type: "body",
        paragraphs: [
          `TO: ${drawer}, residing at ${data.drawerAddress || "address on file"}.`,
          `PLEASE TAKE FORMAL NOTICE that check number ${data.checkNumber || "N/A"}, drawn by you on ${data.bankName || "your bank"}, dated ${data.checkDate || "recently"}, in the amount of $${checkAmt} USD, made payable to ${payee}, has been dishonored and returned by your financial institution due to insufficient funds (NSF) or account closure.`,
          `Pursuant to ${statuteCite}, you are hereby given formal written notice that you must make full and complete payment of the dishonored check along with the legal returned check service charge within ${cureDays} days following receipt of this notice.`,
        ],
      },
      {
        title: "Itemization of Demanded Sum & Payment Instructions",
        type: "body",
        paragraphs: [
          `Original Check Face Value: $${checkAmt} USD`,
          `Statutory Processing & Service Charge: $${feeAmt} USD`,
          `Total Certified Sum Demanded: $${totalDue} USD`,
          `Payment must be delivered in cash, cashier's check, or money order payable to "${payee}" and delivered to: ${data.payeeAddress || "Payee business address"}. Personal checks or electronic bank drafts will not be accepted.`,
        ],
      },
      {
        title: "Warning of Treble Damages & Civil Litigation",
        type: "body",
        paragraphs: [
          `IF YOU FAIL TO REMIT FULL PAYMENT WITHIN ${cureDays} DAYS, legal action will be commenced against you under ${statuteCite}.`,
          `Under state civil code, any person who fails to pay a dishonored check following formal written demand shall be liable to the payee for the face amount of the check PLUS statutory damages equal to treble (three times) the face amount, amounting to an additional $${trebleDamages} USD, together with court costs, process server fees, and reasonable attorney fees.`,
          `Govern yourself accordingly to avoid substantial civil court judgments and adverse credit bureau reporting.`,
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
