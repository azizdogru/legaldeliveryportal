import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const parkingSpaceLeaseConfig: DocumentConfig = {
  id: "parking-space-lease",
  slug: "parking-space-lease",
  title: "Parking Space & Vehicle Storage Lease Agreement",
  shortTitle: "Parking Space Lease",
  category: "Real Estate & Storage",
  description: "Binding lease agreement for designated parking spaces, private driveways, residential garages, carports, and RV/trailer storage, establishing monthly rent, permitted vehicle specifications, state-mandated nonconsensual towing warnings, and property liability waivers.",
  metaDescription: "Draft a binding Parking Space and Vehicle Storage Lease Agreement. Includes statutory nonconsensual towing warnings and vehicle damage waivers. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Towing Notice Ready",
  iconName: "Car",
  searchKeywords: [
    "parking space lease agreement template",
    "garage rental contract",
    "driveway parking lease form",
    "rv storage lease agreement",
    "boat storage rental contract",
    "private parking towing notice contract",
  ],
  features: [
    "Covers open stalls, covered carports, private residential garages, and RV/boat storage",
    "Specific permitted vehicle identification (license plate, VIN, make, model)",
    "Mandatory state statutory nonconsensual vehicle towing warning notices",
    "Comprehensive landlord limitation of liability for vehicle theft, fire, or storm damage",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "IL",
    lessorName: "",
    lessorAddress: "",
    lesseeName: "",
    lesseeAddress: "",
    propertyAddress: "",
    spaceIdentifier: "Assigned Space No. 14 (Covered Stall)",
    spaceType: "assigned_stall",
    vehicleMakeModel: "",
    vehicleLicensePlate: "",
    vehicleState: "IL",
    monthlyRent: "175.00",
    securityDeposit: "175.00",
    leaseTerm: "month_to_month",
    towingNoticeHours: "24",
  },
  steps: [
    {
      id: "parties_space",
      title: "Lessor, Lessee & Location",
      description: "Enter identifying details for the space owner, tenant, and property location.",
      fields: [
        {
          name: "lessorName",
          label: "Lessor / Property Owner Name",
          type: "text",
          placeholder: "e.g., Lakeview Property Management LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "lessorAddress",
          label: "Lessor Contact Address",
          type: "text",
          placeholder: "e.g., 3200 North Lake Shore Drive, Chicago, IL 60657",
          required: true,
          gridCols: 1,
        },
        {
          name: "lesseeName",
          label: "Lessee / Vehicle Owner Name",
          type: "text",
          placeholder: "e.g., Brandon Scott Cole",
          required: true,
          gridCols: 1,
        },
        {
          name: "lesseeAddress",
          label: "Lessee Residential Address",
          type: "text",
          placeholder: "e.g., 3215 North Clark Street, Apt 3R, Chicago, IL 60657",
          required: true,
          gridCols: 1,
        },
        {
          name: "propertyAddress",
          label: "Parking Facility / Real Property Address",
          type: "text",
          placeholder: "e.g., 3208 North Lake Shore Drive Garage, Chicago, IL 60657",
          required: true,
          gridCols: 1,
        },
        {
          name: "spaceIdentifier",
          label: "Designated Space / Stall Number / Description",
          type: "text",
          placeholder: "e.g., Stall #14 (P1 Level) or East Driveway Bay",
          required: true,
          gridCols: 2,
        },
        {
          name: "spaceType",
          label: "Space Structure",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Assigned Outdoor Surface Stall", value: "assigned_stall" },
            { label: "Covered Carport Space", value: "covered_carport" },
            { label: "Enclosed Private Garage Bay", value: "enclosed_garage" },
            { label: "Residential Driveway Space", value: "driveway" },
            { label: "RV / Boat / Trailer Storage Pad", value: "rv_boat_pad" },
          ],
        },
      ],
    },
    {
      id: "vehicle_financial",
      title: "Permitted Vehicle & Financial Terms",
      description: "Define the sole authorized vehicle, monthly rental rate, and lease term.",
      fields: [
        {
          name: "vehicleMakeModel",
          label: "Permitted Vehicle Year, Make & Model",
          type: "text",
          placeholder: "e.g., 2023 Honda CR-V (Silver)",
          required: true,
          gridCols: 2,
        },
        {
          name: "vehicleLicensePlate",
          label: "License Plate Number",
          type: "text",
          placeholder: "e.g., IL Plate #7492-AB",
          required: true,
          gridCols: 2,
        },
        {
          name: "monthlyRent",
          label: "Monthly Rental Rate ($ USD)",
          type: "currency",
          placeholder: "e.g., 175.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "securityDeposit",
          label: "Remote / Gate Access Security Deposit ($ USD)",
          type: "currency",
          placeholder: "e.g., 175.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "leaseTerm",
          label: "Tenancy Duration",
          type: "select",
          required: true,
          options: [
            { label: "Month-to-Month Periodic Tenancy (30 Days Notice to Terminate)", value: "month_to_month" },
            { label: "Fixed Six-Month Lease Term", value: "six_month" },
            { label: "Fixed One-Year Lease Term", value: "one_year" },
          ],
        },
      ],
    },
    {
      id: "execution",
      title: "Towing Statutory Notice & Delivery",
      description: "Confirm vehicle towing notice standards and effective date.",
      fields: [
        {
          name: "towingNoticeHours",
          label: "Notice Window for Unauthorized Vehicle Towing",
          type: "select",
          required: true,
          options: [
            { label: "Immediate Towing for Unauthorized / Unregistered Vehicles", value: "immediate" },
            { label: "24 Hours Written Notice Prior to Towing", value: "24" },
            { label: "48 Hours Written Notice Prior to Towing", value: "48" },
          ],
        },
        {
          name: "noticeDate",
          label: "Lease Commencement Date",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const lessor = data.lessorName || "Lessor";
    const lessee = data.lesseeName || "Lessee";
    const rent = parseFloat(data.monthlyRent || "0").toFixed(2);
    const deposit = parseFloat(data.securityDeposit || "0").toFixed(2);
    const vehicle = `${data.vehicleMakeModel || "Authorized Vehicle"} (Plate: ${data.vehicleLicensePlate || "On File"})`;
    const statuteCite = statute?.statuteCitation || "State Real Property & Vehicle Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LESSOR (PROPERTY OWNER)", value: `${lessor}, ${data.lessorAddress || ""}` },
          { label: "LESSEE (SPACE TENANT)", value: `${lessee}, ${data.lesseeAddress || ""}` },
          { label: "DESIGNATED SPACE", value: `${data.spaceIdentifier || "Space #14"} at ${data.propertyAddress || "Premises"}` },
          { label: "AUTHORIZED VEHICLE", value: `${vehicle}` },
          { label: "MONTHLY RENT & DEPOSIT", value: `$${rent} USD/month (Deposit: $${deposit} USD)` },
          { label: "TENANCY TERM", value: `${data.leaseTerm === "month_to_month" ? "Month-to-Month Periodic Tenancy" : "Fixed Term Lease"}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Lease of Parking Space & Authorized Vehicle",
        type: "body",
        paragraphs: [
          `THIS PARKING SPACE LEASE AGREEMENT is made effective on ${data.noticeDate || "the commencement date"}, by and between ${lessor} ("Lessor") and ${lessee} ("Lessee").`,
          `Lessor leases to Lessee, and Lessee leases from Lessor, the designated parking space described as ${data.spaceIdentifier || "the space"} located at ${data.propertyAddress || "the premises"}.`,
          `The designated space shall be used exclusively for the parking and storage of the following registered, operable motor vehicle: "${vehicle}". No other vehicle, motorcycle, boat, trailer, inoperable machinery, commercial truck, or hazardous material may be parked or stored without Lessor's prior written consent.`,
        ],
      },
      {
        title: "2. Monthly Rent, Security Deposit & Operating Rules",
        type: "body",
        paragraphs: [
          `Lessee shall pay monthly rent of $${rent} USD on or before the first day of each calendar month. Lessee has deposited $${deposit} USD as security for the return of gate access remotes and key fobs and faithful compliance with this Agreement.`,
          `Lessee shall not perform vehicle mechanical repairs, oil changes, engine maintenance, or spray painting within the space or on the premises. Lessee must promptly clean any fluid or oil leakage. Vehicles with active fluid leaks may not be parked on the property.`,
        ],
      },
      {
        title: "3. Nonconsensual Towing Statutory Notice Warning",
        type: "body",
        paragraphs: [
          `STATUTORY WARNING: ANY UNAUTHORIZED, UNREGISTERED, EXPIRED-PLATE, LEAKING, OR INOPERABLE VEHICLE PARKED IN THE DESIGNATED SPACE OR BLOCKING DRIVE AISLES IS SUBJECT TO IMMEDIATE TOWING AND IMPOUNDMENT AT THE VEHICLE OWNER'S SOLE EXPENSE PURSUANT TO STATE VEHICLE AND TRESPASS LAWS.`,
          `Notice period prior to towing: ${data.towingNoticeHours === "immediate" ? "Immediate impoundment without prior notice for unauthorized vehicles" : `${data.towingNoticeHours} hours written notice posted on vehicle windshield`}. Lessee shall indemnify and hold Lessor harmless from all towing fees, storage lot charges, and administrative impound fees.`,
        ],
      },
      {
        title: "4. Limitation of Liability & Insurance Requirement",
        type: "body",
        paragraphs: [
          `PARKING IS AT LESSEE'S SOLE RISK. Lessor provides parking space only and does not maintain custody, control, or bailment of the vehicle or its contents. Lessor shall not be liable for any theft, vandalism, fire, water, storm, falling tree limbs, or collision damages to the vehicle or personal property contained therein, all of which are expressly waived by Lessee. Lessee warrants that the vehicle carries valid comprehensive motor vehicle liability and collision insurance.`,
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
