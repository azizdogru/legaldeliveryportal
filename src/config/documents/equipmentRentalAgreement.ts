import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const equipmentRentalAgreementConfig: DocumentConfig = {
  id: "equipment-rental-agreement",
  slug: "equipment-rental-agreement",
  title: "Equipment & Personal Property Rental Agreement",
  shortTitle: "Equipment Rental Agreement",
  category: "Contracts & Releases",
  description: "Comprehensive commercial and personal property lease contract for machinery, power tools, audiovisual gear, trailers, or event equipment.",
  metaDescription: "Generate a legally binding Equipment Rental Agreement under UCC Article 2A. Covers damage deposit, risk of loss, indemnity, and late fees. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "UCC Article 2A",
  iconName: "Truck",
  searchKeywords: [
    "equipment rental agreement template",
    "tool rental contract form",
    "machinery lease agreement pdf",
    "camera audio equipment rental agreement",
    "trailer rental contract",
  ],
  features: [
    "Drafted under Uniform Commercial Code (UCC) Article 2A personal property lease principles",
    "Itemizes equipment make, model, serial numbers, and existing condition",
    "Includes full damage deposit escrow, late return penalty, and replacement cost terms",
    "Contains operational indemnity shielding owner from injury and third-party liabilities",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    ownerName: "",
    ownerAddress: "",
    renterName: "",
    renterAddress: "",
    renterPhone: "",
    equipmentName: "Kubota Compact Track Loader (Model SVL75-3)",
    serialNumber: "SN: KB-7539201",
    equipmentAccessories: "Standard 74-inch heavy dirt bucket, operator safety manuals, and ignition key set.",
    startDate: "",
    returnDate: "",
    rentalRate: "450.00",
    rateType: "per_day",
    securityDeposit: "1500.00",
    lateFeePerDay: "150.00",
    serviceMethod: "Signed Master Lease Counterparts",
  },
  steps: [
    {
      id: "parties",
      title: "Owner (Lessor) & Renter (Lessee)",
      description: "Enter identifying details for the equipment owner and the renting party.",
      fields: [
        {
          name: "ownerName",
          label: "Equipment Owner / Lessor Name",
          type: "text",
          placeholder: "e.g., Summit Equipment Rentals LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "ownerAddress",
          label: "Owner Business / Physical Address",
          type: "text",
          placeholder: "e.g., 3100 Heavy Machinery Way, Phoenix, AZ 85034",
          required: true,
          gridCols: 1,
        },
        {
          name: "renterName",
          label: "Renter / Lessee Legal Name",
          type: "text",
          placeholder: "e.g., Marcus Vance Construction",
          required: true,
          gridCols: 1,
        },
        {
          name: "renterAddress",
          label: "Renter Physical Address",
          type: "text",
          placeholder: "e.g., 812 Central Ave, Phoenix, AZ 85004",
          required: true,
          gridCols: 2,
        },
        {
          name: "renterPhone",
          label: "Renter Telephone Number",
          type: "text",
          placeholder: "e.g., (602) 555-8912",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "equipment_spec",
      title: "Equipment Specifications",
      description: "Identify the exact machinery, tools, or gear being leased.",
      fields: [
        {
          name: "equipmentName",
          label: "Equipment Make, Model, and General Description",
          type: "text",
          placeholder: "e.g., Bobcat Skid-Steer Loader / Sony Cinema Camera Kit / 16ft Utility Trailer",
          required: true,
          gridCols: 1,
        },
        {
          name: "serialNumber",
          label: "Serial Number / VIN / Asset Tag",
          type: "text",
          placeholder: "e.g., Serial # 839218A4 or VIN # 1T9...",
          required: true,
          gridCols: 2,
        },
        {
          name: "equipmentAccessories",
          label: "Included Attachments, Cases, Manuals, or Cables",
          type: "textarea",
          placeholder: "List all included accessories, remotes, battery chargers, buckets, or safety gear...",
          required: false,
        },
        {
          name: "startDate",
          label: "Rental Commencement Date & Time",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "returnDate",
          label: "Scheduled Return Date & Time",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "financial_terms",
      title: "Rates, Deposit & Penalties",
      description: "Establish the fee structure, damage deposit, and late return charges.",
      fields: [
        {
          name: "rentalRate",
          label: "Rental Rate Amount ($)",
          type: "currency",
          placeholder: "e.g., 450.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "rateType",
          label: "Billing Period",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Per Calendar Day", value: "per_day" },
            { label: "Per Week (7 Days)", value: "per_week" },
            { label: "Per Month (30 Days)", value: "per_month" },
            { label: "Flat Job / Project Total", value: "flat_rate" },
          ],
        },
        {
          name: "securityDeposit",
          label: "Refundable Security / Damage Deposit ($)",
          type: "currency",
          placeholder: "e.g., 1500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "lateFeePerDay",
          label: "Late Return Fee per Day ($)",
          type: "currency",
          placeholder: "e.g., 150.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Agreement Date",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const owner = data.ownerName || "Owner / Lessor";
    const renter = data.renterName || "Renter / Lessee";
    const rate = parseFloat(data.rentalRate || "0").toFixed(2);
    const deposit = parseFloat(data.securityDeposit || "0").toFixed(2);
    const lateFee = parseFloat(data.lateFeePerDay || "0").toFixed(2);
    const statuteCite = statute?.statuteCitation || "Uniform Commercial Code (UCC) Article 2A - Leases";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "OWNER (LESSOR)", value: `${owner}, ${data.ownerAddress || ""}` },
          { label: "RENTER (LESSEE)", value: `${renter} | Tel: ${data.renterPhone || "N/A"}` },
          { label: "EQUIPMENT", value: `${data.equipmentName || "Personal Property Equipment"}` },
          { label: "SERIAL / VIN", value: `${data.serialNumber || "Unassigned"}` },
          { label: "RENTAL TERM", value: `From ${data.startDate || "Start"} to ${data.returnDate || "Scheduled Return"}` },
          { label: "STATUTORY GOVERNANCE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Lease of Equipment and Scope",
        type: "body",
        paragraphs: [
          `This Master Equipment Rental Agreement is executed on ${data.noticeDate || "effective date"}, by and between ${owner} ("Lessor") and ${renter} ("Lessee").`,
          `Lessor hereby leases to Lessee, and Lessee hires from Lessor, the personal property equipment identified above, including the following accessories and components:`,
          `"${data.equipmentAccessories || "Standard operational manuals, attachments, and power components."}"`,
        ],
      },
      {
        title: "2. Financial Consideration, Deposit and Return Terms",
        type: "body",
        paragraphs: [
          `Lessee covenants and agrees to pay the rental charges and maintain deposit protection as follows:`,
        ],
        bulletPoints: [
          `Rental Rate: Lessee shall pay the rental fee of $${rate} USD ${data.rateType ? data.rateType.replace("_", " ") : "per day"}.`,
          `Refundable Security Deposit: Lessee shall deposit the sum of $${deposit} USD prior to taking possession, to secure return in good condition.`,
          `Late Return Charge: Any delay beyond the scheduled return date (${data.returnDate || "Agreed Date"}) shall incur a late charge of $${lateFee} USD per calendar day in addition to standard rental rates.`,
        ],
      },
      {
        title: "3. Inspection, Risk of Loss and Maintenance",
        type: "body",
        paragraphs: [
          `Condition Warranty: Lessee acknowledges having inspected the equipment, found it in clean, safe, and proper operating condition, and agrees to operate it strictly in accordance with manufacturer guidelines.`,
          `Risk of Loss: From the moment Lessee takes physical possession until returned to Lessor, Lessee assumes all risk of loss, damage, theft, destruction, or malfunction of the equipment. If damaged or lost, Lessee shall pay the full cost of repair or replacement.`,
        ],
      },
      {
        title: "4. Disclaimer of Warranties and Lessee Indemnification",
        type: "body",
        paragraphs: [
          `DISCLAIMER: PURSUANT TO UCC ARTICLE 2A, LESSOR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. THE EQUIPMENT IS LEASED "AS IS, WHERE IS."`,
          `INDEMNIFICATION: Lessee agrees to defend, indemnify, and hold Lessor completely harmless from all injuries, wrongful death, property damage, accidents, penalties, or claims arising from the transport, loading, possession, or operation of the equipment by Lessee or its agents.`,
        ],
      },
      {
        title: "5. Repossession on Default",
        type: "body",
        paragraphs: [
          `Upon default in payment, misuse, or failure to return the equipment upon demand, Lessor may enter any premises where the equipment is situated and repossess the same without notice or legal process, without liability for trespass.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
    ];
  },
};
