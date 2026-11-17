import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const vehicleDmvPowerOfAttorneyConfig: DocumentConfig = {
  id: "vehicle-dmv-power-of-attorney",
  slug: "vehicle-dmv-power-of-attorney",
  title: "Motor Vehicle Limited Power of Attorney (DMV Titling & Registration)",
  shortTitle: "Vehicle DMV Power of Attorney",
  category: "Vehicles & DMV",
  description: "Official statutory Department of Motor Vehicles (DMV/BMV/MVD) limited power of attorney specifically appointing an attorney-in-fact to execute certificate of title assignments, apply for vehicle registration, obtain duplicate titles, and complete federal odometer disclosure statements.",
  metaDescription: "Create an official Motor Vehicle Limited Power of Attorney for DMV title transfers. Authorizes vehicle registration, title signing, and odometer disclosures across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "DMV Title Power",
  iconName: "Truck",
  searchKeywords: [
    "motor vehicle power of attorney template pdf",
    "dmv power of attorney for vehicle title",
    "limited poa for car title transfer",
    "odometer disclosure power of attorney",
    "auto registration power of attorney form",
    "bmv vehicle titling poa form",
  ],
  features: [
    "Strictly limited to motor vehicle titling, registration, duplicate title issuance, and license plate renewals",
    "Complies with federal Truth in Mileage Act (49 U.S.C. 32705) odometer statement authority",
    "Records complete vehicle specifics: 17-character VIN, model year, make, model, and state title certificate number",
    "Includes formal Notary Public jurat acknowledgment mandated by state motor vehicle licensing divisions",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    principalOwnerName: "Alexander Robert Sterling",
    principalOwnerAddress: "4200 North Loop West, Apt 812, Houston, TX 77092",
    principalDriverLicense: "TX DL #08492019",
    agentName: "Lone Star Automotive Group, LLC (Dealership Agent)",
    agentAddress: "11200 Southwest Freeway, Houston, TX 77074",
    vehicleYear: "2023",
    vehicleMake: "Toyota",
    vehicleModel: "Tundra CrewMax 4x4",
    vehicleVin: "4T1B11HK5PU094821",
    vehicleTitleNumber: "TX-78401924B",
    specificPowersGranted: "Sign certificate of title transfer, execute federal odometer disclosure statement, submit county registration paperwork, and receive duplicate certificate of title.",
  },
  steps: [
    {
      id: "poa_parties",
      title: "Vehicle Owner & Appointed Agent",
      description: "Enter identifying details for the legal vehicle owner (Principal) and authorized Agent.",
      fields: [
        {
          name: "principalOwnerName",
          label: "Vehicle Owner / Principal Full Legal Name",
          type: "text",
          placeholder: "e.g., Alexander Robert Sterling",
          required: true,
          gridCols: 2,
        },
        {
          name: "principalDriverLicense",
          label: "Principal State Driver License / ID Number",
          type: "text",
          placeholder: "e.g., TX DL #08492019",
          required: true,
          gridCols: 2,
        },
        {
          name: "principalOwnerAddress",
          label: "Principal Residential Address",
          type: "text",
          placeholder: "e.g., 4200 North Loop West, Apt 812, Houston, TX 77092",
          required: true,
          gridCols: 1,
        },
        {
          name: "agentName",
          label: "Appointed Agent (Attorney-in-Fact) Name / Dealership",
          type: "text",
          placeholder: "e.g., Lone Star Automotive Group, LLC (or Individual)",
          required: true,
          gridCols: 2,
        },
        {
          name: "agentAddress",
          label: "Agent Business / Residential Address",
          type: "text",
          placeholder: "e.g., 11200 Southwest Freeway, Houston, TX 77074",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "vehicle_specs",
      title: "Vehicle Specifications & Authority",
      description: "Enter vehicle VIN, year, make, model, title number, and authorized DMV powers.",
      fields: [
        {
          name: "vehicleYear",
          label: "Vehicle Model Year",
          type: "text",
          placeholder: "e.g., 2023",
          required: true,
          gridCols: 2,
        },
        {
          name: "vehicleMake",
          label: "Vehicle Manufacturer / Make",
          type: "text",
          placeholder: "e.g., Toyota, Ford, Chevrolet",
          required: true,
          gridCols: 2,
        },
        {
          name: "vehicleModel",
          label: "Vehicle Model & Body Type",
          type: "text",
          placeholder: "e.g., Tundra CrewMax 4x4",
          required: true,
          gridCols: 2,
        },
        {
          name: "vehicleVin",
          label: "17-Character Vehicle Identification Number (VIN)",
          type: "text",
          placeholder: "e.g., 4T1B11HK5PU094821",
          required: true,
          gridCols: 2,
        },
        {
          name: "vehicleTitleNumber",
          label: "State Title Certificate Number",
          type: "text",
          placeholder: "e.g., TX-78401924B (or N/A)",
          required: false,
          gridCols: 2,
        },
        {
          name: "specificPowersGranted",
          label: "Specific DMV Authority Granted",
          type: "textarea",
          placeholder: "e.g., Transfer title, execute odometer disclosure, apply for registration, obtain duplicate title...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Power of Attorney Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const owner = data.principalOwnerName || "Vehicle Owner (Principal)";
    const agent = data.agentName || "Appointed Agent";
    const vin = data.vehicleVin || "VIN on file";
    const statuteCite = statute?.statuteCitation || "State Transportation Code & Motor Vehicle Titling Regulations";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT", value: "MOTOR VEHICLE LIMITED POWER OF ATTORNEY (DMV)" },
          { label: "PRINCIPAL (VEHICLE OWNER)", value: `${owner} (DL: ${data.principalDriverLicense || "On file"})` },
          { label: "ATTORNEY-IN-FACT (AGENT)", value: `${agent}` },
          { label: "VEHICLE DESCRIPTION", value: `${data.vehicleYear || ""} ${data.vehicleMake || ""} ${data.vehicleModel || ""}` },
          { label: "VEHICLE IDENTIFICATION (VIN)", value: `${vin}` },
          { label: "TITLE CERTIFICATE NO.", value: `${data.vehicleTitleNumber || "Title on file"}` },
          { label: "SCOPE OF AUTHORITY", value: "Limited Exclusively to Motor Vehicle Administration" },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Limited Appointment & Scope of Vehicle Authority",
        type: "body",
        paragraphs: [
          `KNOW ALL PERSONS BY THESE PRESENTS that the undersigned Principal (${owner}), residing at ${data.principalOwnerAddress || "address on file"}, does hereby make, constitute, and appoint ${agent}, whose address is ${data.agentAddress || "address on file"}, as Principal's true and lawful attorney-in-fact (Agent).`,
          `Agent is appointed for the sole, express, and limited purpose of executing, signing, and delivering all required instruments and documents necessary to affect the transfer, assignment, registration, or licensing with the state department of motor vehicles regarding the following vehicle:`,
          `Year: ${data.vehicleYear || "N/A"} | Make: ${data.vehicleMake || "N/A"} | Model: ${data.vehicleModel || "N/A"} | VIN: ${vin} | Title Number: ${data.vehicleTitleNumber || "N/A"}.`,
        ],
      },
      {
        title: "2. Enumerated Powers & Odometer Disclosure Authorization",
        type: "body",
        paragraphs: [
          `Agent is granted full power and authority to perform the following acts on Principal's behalf: "${data.specificPowersGranted || "Execute title assignments, odometer disclosures, and registration filings."}"`,
          `Odometer Disclosure Statement: In accordance with federal law (49 U.S.C. Section 32705) and state motor vehicle statutes, Agent is specifically authorized to sign federal and state odometer disclosure statements certifying vehicle mileage.`,
          `Ratification: Principal hereby ratifies, confirms, and validates all lawful acts that Agent shall do or cause to be done in connection with the titling and registration of the vehicle.`,
        ],
      },
      {
        title: "3. Durability & Revocation",
        type: "body",
        paragraphs: [
          `This Limited Power of Attorney shall remain valid until completion of the transaction or upon receipt of formal written revocation by Principal. This instrument is not durable and terminates upon Principal's legal disability or death pursuant to ${statuteCite}.`,
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
