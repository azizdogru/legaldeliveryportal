import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const rentReceiptDocumentConfig: DocumentConfig = {
  id: "rent-receipt-document",
  slug: "rent-receipt-document",
  title: "Official Rent Payment Receipt (Landlord Rent Proof Certificate)",
  shortTitle: "Rent Payment Receipt",
  category: "Landlord & Tenant",
  description: "Official statutory rent payment receipt certificate legally required by state residential landlord-tenant codes to provide contemporaneous written proof of rent payment, payment method, rental period, and remaining balance.",
  metaDescription: "Generate an official Rent Payment Receipt compliant with state tenant protection laws. Documents payment method, rental period, landlord signature, and zero balance for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Statutory Rent Receipt",
  iconName: "Receipt",
  searchKeywords: [
    "rent receipt template pdf",
    "official landlord rent receipt",
    "proof of rent payment form",
    "monthly rental payment receipt certificate",
    "cash rent receipt form state law",
    "tenant rent ledger receipt",
  ],
  features: [
    "Complies with state statutes mandating written receipts for cash, money orders, or electronic rent",
    "Itemizes rental payment breakdown: base monthly rent, late fees, utilities, and security deposits",
    "Clearly indicates rental coverage period (e.g., November 1 to November 30) and remaining account balance",
    "Features landlord/property manager authorized signature certifying receipt in full",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "NY",
    landlordName: "Manhattan Residential Properties, LLC",
    landlordAddress: "550 Madison Avenue, 22nd Floor, New York, NY 10022",
    tenantName: "Alexander James Morgan",
    rentalAddress: "320 West 84th Street, Apt 4C, New York, NY 10024",
    receiptNumber: "RR-2026-1104",
    amountPaid: "3250.00",
    paymentMethod: "Electronic ACH Bank Transfer",
    rentalPeriod: "November 1, 2026 to November 30, 2026",
    paymentAllocation: "Base Rent: $3,250.00 USD | Outstanding Balance Remaining: $0.00 USD (Paid in Full)",
    receivedByAgent: "David Ross, Senior Property Manager",
  },
  steps: [
    {
      id: "receipt_parties",
      title: "Landlord & Tenant Information",
      description: "Enter names and addresses for both the property landlord and paying tenant.",
      fields: [
        {
          name: "receiptNumber",
          label: "Receipt Tracking Number",
          type: "text",
          placeholder: "e.g., RR-2026-1104",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Payment Received Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordName",
          label: "Landlord / Management Entity Name",
          type: "text",
          placeholder: "e.g., Manhattan Residential Properties, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordAddress",
          label: "Landlord Office Address",
          type: "text",
          placeholder: "e.g., 550 Madison Avenue, 22nd Floor, New York, NY 10022",
          required: true,
          gridCols: 2,
        },
        {
          name: "tenantName",
          label: "Tenant(s) Full Name",
          type: "text",
          placeholder: "e.g., Alexander James Morgan",
          required: true,
          gridCols: 2,
        },
        {
          name: "rentalAddress",
          label: "Leased Rental Property Address",
          type: "text",
          placeholder: "e.g., 320 West 84th Street, Apt 4C, New York, NY 10024",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "payment_breakdown",
      title: "Amount, Period & Method",
      description: "Specify amount received, payment method, rental period covered, and balance.",
      fields: [
        {
          name: "amountPaid",
          label: "Total Amount Received ($ USD)",
          type: "currency",
          placeholder: "e.g., 3250.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "paymentMethod",
          label: "Payment Method Tendered",
          type: "select",
          options: [
            { label: "Electronic ACH Bank Transfer", value: "Electronic ACH Bank Transfer" },
            { label: "Cashier Check / Money Order", value: "Cashier Check / Money Order" },
            { label: "Personal Check", value: "Personal Check" },
            { label: "Cash (Formal Statutory Receipt)", value: "Cash" },
            { label: "Credit Card / Online Portal", value: "Credit Card / Online Portal" },
          ],
          required: true,
          gridCols: 2,
        },
        {
          name: "rentalPeriod",
          label: "Rental Period Covered",
          type: "text",
          placeholder: "e.g., November 1, 2026 to November 30, 2026",
          required: true,
          gridCols: 1,
        },
        {
          name: "paymentAllocation",
          label: "Payment Allocation & Account Balance Notes",
          type: "text",
          placeholder: "e.g., Base Rent: $3,250.00 | Remaining Balance: $0.00 (Paid in Full)",
          required: true,
          gridCols: 1,
        },
        {
          name: "receivedByAgent",
          label: "Name & Title of Person Receiving Payment",
          type: "text",
          placeholder: "e.g., David Ross, Senior Property Manager",
          required: true,
          gridCols: 1,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantName || "Tenant";
    const amt = parseFloat(data.amountPaid || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const method = data.paymentMethod || "Electronic Transfer";
    const period = data.rentalPeriod || "Current Month";
    const statuteCite = statute?.statuteCitation || "State Real Property Law Mandated Rent Receipt Statutes";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "RECEIPT NUMBER", value: `RECEIPT #${data.receiptNumber || "N/A"}` },
          { label: "DATE ISSUED", value: `${data.noticeDate || "Date on file"}` },
          { label: "LANDLORD / PAYEE", value: `${landlord}` },
          { label: "TENANT / PAYER", value: `${tenant}` },
          { label: "RENTAL PREMISES", value: `${data.rentalAddress || "Premises on file"}` },
          { label: "AMOUNT RECEIVED", value: `$${amt} USD (${method})` },
          { label: "RENTAL COVERAGE PERIOD", value: `${period}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Formal Certification of Payment",
        type: "body",
        paragraphs: [
          `THIS OFFICIAL RENT RECEIPT certifies that ${landlord} ("Landlord") has received from ${tenant} ("Tenant") the total sum of $${amt} USD on ${data.noticeDate || "the date of receipt"}, tendered via ${method}.`,
          `Application of Funds: The payment received has been credited towards the occupancy of the rental premises located at ${data.rentalAddress || "the subject premises"} for the rental coverage period: ${period}.`,
        ],
      },
      {
        title: "2. Payment Allocation & Account Standing",
        type: "body",
        paragraphs: [
          `Allocation Breakdown: ${data.paymentAllocation || "Base Rent: Full payment credited to monthly rent obligations."}`,
          `Account Status: Following the application of this payment, Tenant's rental ledger reflects that all accrued monthly rent through the end of the specified rental period is paid in full, unless an itemized balance is explicitly stated above.`,
        ],
      },
      {
        title: "3. Statutory Landlord Acknowledgment",
        type: "body",
        paragraphs: [
          `Statutory Receipt Notice: This receipt is issued in full compliance with ${statuteCite}, requiring landlords to provide contemporaneous written proof of all rental payments received.`,
          `This document serves as permanent, binding written evidence of payment satisfaction. Please retain this receipt for your personal tax, housing, and financial records.`,
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
