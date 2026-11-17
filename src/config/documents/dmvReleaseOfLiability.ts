import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const dmvReleaseOfLiabilityConfig: DocumentConfig = {
  id: "dmv-release-of-liability",
  slug: "dmv-release-of-liability",
  title: "Notice of Transfer and Release of Liability (DMV NRL)",
  shortTitle: "DMV Release of Liability",
  category: "Bill of Sale",
  description: "Official statutory notice of transfer and release of liability shielding vehicle sellers from subsequent parking tickets, toll road violations, towing fees, and civil traffic accident claims following private vehicle sale.",
  metaDescription: "Generate a state DMV Notice of Transfer and Release of Liability. Extinguishes seller liability for parking citations, toll violations, and accidents for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Civil Liability Defense",
  iconName: "ShieldAlert",
  searchKeywords: [
    "dmv release of liability form",
    "notice of transfer and release of liability template",
    "california dmv nrl form pdf",
    "car sale release of liability document",
    "seller notification of vehicle transfer",
    "stop parking tickets after selling car",
  ],
  features: [
    "Conforms to state motor vehicle code notification requirements (e.g. Cal. Veh. Code 5602, Tex. Transp. Code 501.147)",
    "Extinguishes civil liability for future traffic collisions, parking fines, and automated toll penalties",
    "Records purchaser full legal name, physical address, and exact timestamp of custody transfer",
    "Provides verified legal paper trail admissible before municipal traffic courts and toll agencies",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    transferorName: "",
    transferorAddress: "",
    transferorPhone: "",
    transfereeName: "",
    transfereeAddress: "",
    transfereePhone: "",
    vehicleVin: "",
    licensePlate: "",
    vehicleYear: "2019",
    vehicleMake: "Honda",
    vehicleModel: "Civic",
    saleDate: new Date().toISOString().split("T")[0],
    salePrice: "14200.00",
    odometerAtSale: "62400",
  },
  steps: [
    {
      id: "transferor_transferee",
      title: "Seller & Buyer Details",
      description: "Enter complete contact details for the vehicle seller and buyer.",
      fields: [
        {
          name: "transferorName",
          label: "Registered Owner / Seller (Transferor) Legal Name",
          type: "text",
          placeholder: "e.g., Jonathan Michael Davis",
          required: true,
          gridCols: 1,
        },
        {
          name: "transferorAddress",
          label: "Seller Physical Mailing Address",
          type: "text",
          placeholder: "e.g., 1420 Valley View Road, Glendale, CA 91202",
          required: true,
          gridCols: 2,
        },
        {
          name: "transferorPhone",
          label: "Seller Contact Phone",
          type: "text",
          placeholder: "e.g., (555) 876-5432",
          required: true,
          gridCols: 2,
        },
        {
          name: "transfereeName",
          label: "New Purchaser (Transferee) Full Legal Name",
          type: "text",
          placeholder: "e.g., Anthony Garcia",
          required: true,
          gridCols: 1,
        },
        {
          name: "transfereeAddress",
          label: "Purchaser Physical Address",
          type: "text",
          placeholder: "e.g., 950 South Brand Blvd, Glendale, CA 91204",
          required: true,
          gridCols: 2,
        },
        {
          name: "transfereePhone",
          label: "Purchaser Contact Phone",
          type: "text",
          placeholder: "e.g., (555) 234-9876",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "vehicle_transfer_data",
      title: "Vehicle Identification & Transfer Terms",
      description: "Enter VIN, license plate, sale date, odometer reading, and selling price.",
      fields: [
        {
          name: "vehicleVin",
          label: "17-Digit Vehicle Identification Number (VIN)",
          type: "text",
          placeholder: "e.g., 1HGFC2F69KE123456",
          required: true,
          gridCols: 1,
        },
        {
          name: "licensePlate",
          label: "License Plate Number",
          type: "text",
          placeholder: "e.g., 8ABC123",
          required: true,
          gridCols: 2,
        },
        {
          name: "vehicleYear",
          label: "Vehicle Year",
          type: "text",
          placeholder: "e.g., 2019",
          required: true,
          gridCols: 2,
        },
        {
          name: "vehicleMake",
          label: "Make",
          type: "text",
          placeholder: "e.g., Honda",
          required: true,
          gridCols: 2,
        },
        {
          name: "vehicleModel",
          label: "Model",
          type: "text",
          placeholder: "e.g., Civic EX",
          required: true,
          gridCols: 2,
        },
        {
          name: "saleDate",
          label: "Exact Date of Vehicle Custody Transfer",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "odometerAtSale",
          label: "Odometer Reading at Time of Transfer",
          type: "text",
          placeholder: "e.g., 62400",
          required: true,
          gridCols: 2,
        },
        {
          name: "salePrice",
          label: "Actual Selling Price ($ USD)",
          type: "currency",
          placeholder: "e.g., 14200.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Date Notice Signed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const seller = data.transferorName || "Transferor (Seller)";
    const buyer = data.transfereeName || "Transferee (Buyer)";
    const vin = data.vehicleVin || "VIN ON RECORD";
    const plate = data.licensePlate || "ON FILE";
    const price = parseFloat(data.salePrice || "0").toFixed(2);
    const vehicleDesc = `${data.vehicleYear || ""} ${data.vehicleMake || ""} ${data.vehicleModel || ""}`;
    const statuteCite = statute?.statuteCitation || "State Motor Vehicle Code & Transfer Liability Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE DOCUMENT", value: "STATUTORY NOTICE OF TRANSFER AND RELEASE OF CIVIL LIABILITY" },
          { label: "TRANSFEROR (SELLER)", value: `${seller}, ${data.transferorAddress || ""} (Phone: ${data.transferorPhone || "On File"})` },
          { label: "TRANSFEREE (BUYER)", value: `${buyer}, ${data.transfereeAddress || ""} (Phone: ${data.transfereePhone || "On File"})` },
          { label: "VEHICLE DETAILS", value: `${vehicleDesc} (Plate: ${plate})` },
          { label: "VEHICLE VIN", value: `${vin}` },
          { label: "TRANSFER DATE & ODOMETER", value: `Transferred on ${data.saleDate || "Date of Sale"} at ${data.odometerAtSale || "0"} Miles` },
          { label: "TRANSACTION SUM", value: `$${price} USD` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Notice of Disposition & Change of Ownership",
        type: "body",
        paragraphs: [
          `PLEASE TAKE NOTICE that under the provisions of ${statuteCite}, the registered owner named above (${seller}) has sold, transferred, and surrendered physical custody, title, and all legal interest in the motor vehicle described above to the purchaser (${buyer}) on ${data.saleDate || "the date indicated"}.`,
          `This document certifies that the endorsed Certificate of Title and physical possession of the vehicle have been delivered to the purchaser.`,
        ],
      },
      {
        title: "2. Statutory Release of Civil & Traffic Liability",
        type: "body",
        paragraphs: [
          `Pursuant to state motor vehicle law, timely delivery and submission of this Notice of Transfer and Release of Liability fully satisfies the seller statutory obligations and immediately cuts off and relieves the transferor from all subsequent civil and criminal liability arising out of the ownership, operation, or custody of the vehicle.`,
          `This release operates as an affirmative legal bar against: (a) civil damages resulting from negligent vehicle operation or traffic collisions; (b) automated red-light and speed camera citations; (c) municipal parking tickets; (d) toll road charges and toll evasion penalties; and (e) impoundment, towing, or lien storage expenses incurred subsequent to the transfer date.`,
        ],
      },
      {
        title: "3. Transferee Obligation to Transfer Registration",
        type: "body",
        paragraphs: [
          `The purchaser (${buyer}) is hereby formally advised of the statutory legal requirement under state law to apply for a transfer of registration and certificate of title with the Department of Motor Vehicles within ten (10) days of the date of sale.`,
          `Execution of this instrument creates a verified, binding evidentiary record of title transfer.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        title: "Official Verification Statement",
        type: "body",
        paragraphs: [
          `I certify under penalty of perjury under the laws of ${statute?.stateName || "this state"} that the foregoing statements and vehicle transfer facts are true, correct, and complete.`,
        ],
      },
    ];
  },
};
