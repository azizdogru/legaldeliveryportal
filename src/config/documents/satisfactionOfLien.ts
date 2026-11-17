import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const satisfactionOfLienConfig: DocumentConfig = {
  id: "satisfaction-of-lien",
  slug: "satisfaction-of-lien",
  title: "Satisfaction of Lien (Full Release & Discharge of Mechanic's Lien)",
  shortTitle: "Satisfaction of Lien",
  category: "Real Estate & Liens",
  description: "Official county recorder instrument certifying that a previously recorded mechanic's lien, construction claim, or judgment encumbrance has been satisfied in full and is hereby canceled, discharged, and released of record.",
  metaDescription: "Generate an official Satisfaction of Lien for county recorder filing. Discharges mechanic's liens, contractor claims, and judgment encumbrances across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "County Lien Release",
  iconName: "FileCheck",
  searchKeywords: [
    "satisfaction of lien form template",
    "release of mechanics lien pdf",
    "lien discharge form county recorder",
    "cancellation of claim of lien",
    "full satisfaction of construction lien",
    "lien release certificate recorded",
  ],
  features: [
    "Drafted for immediate county land records recorder filing and title clearing",
    "References original recorded instrument number, book, page, and recording date",
    "Certifies complete payment and satisfaction of all underlying contractor/materialman debts",
    "Includes formal Notary Jurat required by county clerks for valid recordation",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    countyName: "Harris County",
    lienorName: "Lone Star Commercial Contractors, LLC",
    lienorAddress: "5100 Westheimer Road, Suite 400, Houston, TX 77056",
    lienorAuthorizedAgent: "Robert Wayne Callahan, Managing Member",
    propertyOwnerName: "Houston Heights Commercial Plaza, LLC",
    propertyOwnerAddress: "1200 Post Oak Boulevard, Houston, TX 77056",
    propertyAddress: "7400 North Shepherd Drive, Houston, TX 77091",
    parcelId: "104-892-003-0012",
    originalRecordingDate: new Date(Date.now() - 45 * 86400000).toISOString().split("T")[0],
    originalInstrumentNumber: "RP-2026-094182",
    originalBookPage: "Book 1482, Page 391",
    originalLienAmount: "48750.00",
  },
  steps: [
    {
      id: "lien_parties",
      title: "Lienholder & Property Owner",
      description: "Enter details for the lien claimant (lienor) and the record property owner.",
      fields: [
        {
          name: "lienorName",
          label: "Lienholder / Claimant Legal Name",
          type: "text",
          placeholder: "e.g., Lone Star Commercial Contractors, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "lienorAuthorizedAgent",
          label: "Lienor Authorized Signer & Title",
          type: "text",
          placeholder: "e.g., Robert Wayne Callahan, Managing Member",
          required: true,
          gridCols: 2,
        },
        {
          name: "lienorAddress",
          label: "Lienholder Office Address",
          type: "text",
          placeholder: "e.g., 5100 Westheimer Road, Suite 400, Houston, TX 77056",
          required: true,
          gridCols: 1,
        },
        {
          name: "propertyOwnerName",
          label: "Property Owner of Record",
          type: "text",
          placeholder: "e.g., Houston Heights Commercial Plaza, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "propertyOwnerAddress",
          label: "Owner Mailing Address",
          type: "text",
          placeholder: "e.g., 1200 Post Oak Boulevard, Houston, TX 77056",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "recorded_lien_specs",
      title: "Recording Data & Property Description",
      description: "Enter county recording reference numbers, parcel ID, and property address.",
      fields: [
        {
          name: "propertyAddress",
          label: "Encumbered Real Property Address",
          type: "text",
          placeholder: "e.g., 7400 North Shepherd Drive, Houston, TX 77091",
          required: true,
          gridCols: 1,
        },
        {
          name: "parcelId",
          label: "Assessor Parcel Number (APN) / Tax ID",
          type: "text",
          placeholder: "e.g., 104-892-003-0012",
          required: true,
          gridCols: 2,
        },
        {
          name: "countyName",
          label: "Recording County / Parish / Borough",
          type: "text",
          placeholder: "e.g., Harris County",
          required: true,
          gridCols: 2,
        },
        {
          name: "originalInstrumentNumber",
          label: "Original Recorded Instrument / File No.",
          type: "text",
          placeholder: "e.g., RP-2026-094182",
          required: true,
          gridCols: 2,
        },
        {
          name: "originalBookPage",
          label: "Original Recording Book & Page",
          type: "text",
          placeholder: "e.g., Book 1482, Page 391 (or N/A)",
          required: false,
          gridCols: 2,
        },
        {
          name: "originalRecordingDate",
          label: "Date Original Lien Was Recorded",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "originalLienAmount",
          label: "Original Lien Amount Paid in Full ($ USD)",
          type: "currency",
          placeholder: "e.g., 48750.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Date of Full Satisfaction Execution",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const lienor = data.lienorName || "Lien Claimant";
    const owner = data.propertyOwnerName || "Property Owner";
    const county = data.countyName || "County of Record";
    const amt = parseFloat(data.originalLienAmount || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const statuteCite = statute?.statuteCitation || "State Property Code Mechanic's Lien Discharge Statutes";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "RECORDING TITLE", value: "FULL SATISFACTION AND RELEASE OF LIEN" },
          { label: "RECORDING JURISDICTION", value: `${county}, ${statute?.stateName || "State"}` },
          { label: "LIENOR / CLAIMANT", value: `${lienor}` },
          { label: "RECORD OWNER", value: `${owner}` },
          { label: "SUBJECT REAL PROPERTY", value: `${data.propertyAddress || "Property on file"}` },
          { label: "PARCEL ID / APN", value: `${data.parcelId || "APN on file"}` },
          { label: "RECORDED INSTRUMENT NO.", value: `${data.originalInstrumentNumber || "On file"} (${data.originalBookPage || ""})` },
          { label: "SATISFIED AMOUNT", value: `$${amt} USD Paid in Full` },
          { label: "DISCHARGE STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Acknowledgment of Full Satisfaction & Payment",
        type: "body",
        paragraphs: [
          `KNOW ALL PERSONS BY THESE PRESENTS that ${lienor} ("Lienor"), whose address is ${data.lienorAddress || "address on file"}, does hereby certify and solemnly affirm that the debt secured by that certain Claim of Mechanic's Lien / Contractor Encumbrance in the principal amount of $${amt} USD has been PAID AND SATISFIED IN FULL.`,
          `Recording Reference: The aforementioned lien was filed against ${owner}, as property owner, and recorded on ${data.originalRecordingDate || "date on file"}, in the official land records of ${county}, as Instrument Number: ${data.originalInstrumentNumber || "on file"}, ${data.originalBookPage ? `in ${data.originalBookPage},` : ""} encumbering the real property located at ${data.propertyAddress || "the subject premises"}.`,
        ],
      },
      {
        title: "2. Full Discharge, Release & Cancellation of Record",
        type: "body",
        paragraphs: [
          `Discharge of Record: For valuable consideration received, the sufficiency whereof is hereby acknowledged, Lienor does hereby forever discharge, release, quitclaim, cancel, and extinguish said Claim of Lien, and hereby authorizes and requests the County Clerk and Recorder of ${county} to discharge and cancel said lien of record.`,
          `Lienor covenants and warrants that it has not assigned, transferred, or pledged said lien or underlying indebtedness to any third party and possesses the sole lawful power to execute this full release and discharge.`,
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
