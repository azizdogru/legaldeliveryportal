import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const affidavitSurvivingSpouseConfig: DocumentConfig = {
  id: "affidavit-surviving-spouse",
  slug: "affidavit-surviving-spouse",
  title: "Affidavit of Surviving Spouse (Death of Joint Tenant Title Transfer)",
  shortTitle: "Affidavit of Surviving Spouse",
  category: "Estate Planning & Real Estate",
  description: "Official sworn statutory affidavit executed by a surviving spouse or surviving joint tenant to terminate survivorship tenancy, remove the deceased co-owner from title, and record unencumbered sole ownership in county land records.",
  metaDescription: "Create an official Affidavit of Surviving Spouse / Death of Joint Tenant to clear real estate title. Removes deceased co-owner in county records for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Survivorship Title Clearance",
  iconName: "FileSpreadsheet",
  searchKeywords: [
    "affidavit of surviving spouse template",
    "affidavit of death of joint tenant pdf",
    "surviving spouse deed transfer form",
    "clear title deceased spouse real estate",
    "joint tenancy with right of survivorship affidavit",
    "county recorder death of joint tenant",
  ],
  features: [
    "Recorded directly in county land records with certified death certificate attached",
    "Terminates Joint Tenancy with Right of Survivorship (JTWROS) or Tenancy by the Entirety",
    "Establishes marketable, insurable sole legal title in the surviving spouse or co-owner",
    "Includes mandatory statutory notary acknowledgment jurat for county land recording",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "AZ",
    countyName: "Maricopa County",
    affiantName: "Margaret Eleanor Campbell",
    affiantAddress: "8420 East Camelback Road, Scottsdale, AZ 85251",
    decedentName: "Arthur Douglas Campbell",
    dateOfDeath: new Date(Date.now() - 60 * 86400000).toISOString().split("T")[0],
    placeOfDeath: "Scottsdale, Maricopa County, Arizona",
    propertyAddress: "8420 East Camelback Road, Scottsdale, AZ 85251",
    parcelId: "173-42-019-B",
    originalDeedDate: "2014-06-18",
    originalDeedRecording: "Recorded in Maricopa County Recorder Records as Document No. 2014-0492102, Book 9812, Page 144",
    titleVestingType: "Joint Tenancy with Right of Survivorship (JTWROS)",
  },
  steps: [
    {
      id: "affidavit_parties",
      title: "Surviving Spouse & Decedent",
      description: "Enter identifying details for the surviving spouse (affiant) and deceased co-owner.",
      fields: [
        {
          name: "affiantName",
          label: "Surviving Spouse / Affiant Full Legal Name",
          type: "text",
          placeholder: "e.g., Margaret Eleanor Campbell",
          required: true,
          gridCols: 2,
        },
        {
          name: "affiantAddress",
          label: "Surviving Spouse Current Residence",
          type: "text",
          placeholder: "e.g., 8420 East Camelback Road, Scottsdale, AZ 85251",
          required: true,
          gridCols: 2,
        },
        {
          name: "decedentName",
          label: "Deceased Spouse / Co-Owner Full Name",
          type: "text",
          placeholder: "e.g., Arthur Douglas Campbell",
          required: true,
          gridCols: 2,
        },
        {
          name: "dateOfDeath",
          label: "Exact Date of Death",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "placeOfDeath",
          label: "City, County & State of Death",
          type: "text",
          placeholder: "e.g., Scottsdale, Maricopa County, Arizona",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "property_vesting",
      title: "Property & Deed Recording",
      description: "Specify real estate parcel ID, county, and original recorded deed reference.",
      fields: [
        {
          name: "propertyAddress",
          label: "Real Property Street Address",
          type: "text",
          placeholder: "e.g., 8420 East Camelback Road, Scottsdale, AZ 85251",
          required: true,
          gridCols: 1,
        },
        {
          name: "parcelId",
          label: "Assessor Parcel Number (APN) / Tax ID",
          type: "text",
          placeholder: "e.g., 173-42-019-B",
          required: true,
          gridCols: 2,
        },
        {
          name: "countyName",
          label: "Recording County / Parish",
          type: "text",
          placeholder: "e.g., Maricopa County",
          required: true,
          gridCols: 2,
        },
        {
          name: "titleVestingType",
          label: "Original Survivorship Vesting Tenancy",
          type: "select",
          options: [
            { label: "Joint Tenancy with Right of Survivorship (JTWROS)", value: "Joint Tenancy with Right of Survivorship (JTWROS)" },
            { label: "Tenancy by the Entirety (Husband and Wife)", value: "Tenancy by the Entirety (Husband and Wife)" },
            { label: "Community Property with Right of Survivorship", value: "Community Property with Right of Survivorship" },
          ],
          required: true,
          gridCols: 2,
        },
        {
          name: "originalDeedDate",
          label: "Original Vesting Deed Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "originalDeedRecording",
          label: "Original Deed Recording Reference / Document No.",
          type: "text",
          placeholder: "e.g., Recorded as Document No. 2014-0492102, Book 9812, Page 144",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Affidavit Sworn and Signed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const affiant = data.affiantName || "Surviving Spouse";
    const decedent = data.decedentName || "Deceased Co-Owner";
    const county = data.countyName || "County of Record";
    const vesting = data.titleVestingType || "Joint Tenancy with Right of Survivorship";
    const statuteCite = statute?.statuteCitation || "State Real Property and Survivorship Vesting Statutes";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "RECORDING TITLE", value: "AFFIDAVIT OF SURVIVING SPOUSE / DEATH OF JOINT TENANT" },
          { label: "RECORDING COUNTY", value: `${county}, ${statute?.stateName || "State"}` },
          { label: "SURVIVING SPOUSE (AFFIANT)", value: `${affiant}` },
          { label: "DECEASED SPOUSE (DECEDENT)", value: `${decedent} (Deceased)` },
          { label: "DATE & PLACE OF DEATH", value: `${data.dateOfDeath || "On file"} at ${data.placeOfDeath || "County of death"}` },
          { label: "SUBJECT REAL PROPERTY", value: `${data.propertyAddress || "Property on file"}` },
          { label: "ASSESSOR PARCEL NUMBER", value: `${data.parcelId || "APN on file"}` },
          { label: "SURVIVORSHIP TENANCY", value: `${vesting}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Sworn Statement of Survivorship & Identity",
        type: "body",
        paragraphs: [
          `STATE OF ${statute?.stateName?.toUpperCase() || "THE STATE"} )`,
          `COUNTY OF ${county.toUpperCase()} ) SS.`,
          `${affiant} ("Affiant"), being first duly sworn according to law, deposes and states under oath as follows:`,
          `1. Affiant is of legal age and resides at ${data.affiantAddress || "the address above"}. Affiant is the surviving spouse and designated survivorship co-owner of ${decedent} ("Decedent"), who died on ${data.dateOfDeath || "the date of death"} in ${data.placeOfDeath || "the county of death"}. A certified copy of Decedent's official certificate of death is attached hereto and made a part hereof.`,
          `2. Affiant and Decedent are the identical persons named as grantees in that certain deed dated ${data.originalDeedDate || "previously"}, ${data.originalDeedRecording || "recorded in county records"}, which conveyed the real property located at ${data.propertyAddress || "the subject property"}, identified as Assessor's Parcel Number: ${data.parcelId || "N/A"}.`,
        ],
      },
      {
        title: "2. Termination of Co-Tenancy & Vesting in Survivor",
        type: "body",
        paragraphs: [
          `3. Survivorship Vesting: By virtue of said recorded deed, title to the subject property was vested in Affiant and Decedent as ${vesting}.`,
          `4. Operation of Law: By operation of law and the right of survivorship established under ${statuteCite}, upon the death of Decedent, all right, title, interest, and estate of Decedent in and to the above-described real property ceased and terminated, and absolute sole title became immediately vested in ${affiant}, as the surviving joint tenant / surviving spouse.`,
          `5. Debts and Liens: All medical, funeral, and estate debts of Decedent have been paid or adequately provided for, and the property is not subject to any federal or state estate tax liens resulting from Decedent's demise.`,
          `6. Recording Request: This Affidavit is made for the express purpose of placing of record formal notice of Decedent's death and verifying that fee simple absolute title to said property is now held solely by ${affiant}.`,
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
