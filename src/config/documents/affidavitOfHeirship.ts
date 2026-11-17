import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const affidavitOfHeirshipConfig: DocumentConfig = {
  id: "affidavit-of-heirship",
  slug: "affidavit-of-heirship",
  title: "Affidavit of Heirship for Real Property",
  shortTitle: "Affidavit of Heirship",
  category: "Estate Planning & Real Estate",
  description: "Sworn legal affidavit establishing the lawful heirs of a deceased property owner who died intestate (without a will), used to transfer title to real estate, acreage, and minerals without formal probate court administration pursuant to state probate and estates codes.",
  metaDescription: "Draft a sworn Affidavit of Heirship for real property. Transfer intestate estate land and real estate without probate court delay. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Probate Bypass",
  iconName: "FileSpreadsheet",
  searchKeywords: [
    "affidavit of heirship template",
    "affidavit of heirship texas estates code 203",
    "intestate real property transfer affidavit",
    "heirship affidavit for real estate",
    "small estate affidavit of heirship",
    "title company affidavit of heirship",
  ],
  features: [
    "Establishes complete family genealogy, marital history, and surviving descendants",
    "Formatted for recording in county real property deed records to clear chain of title",
    "Complies with state intestate succession laws (e.g. Texas Estates Code Section 203)",
    "Includes disinterested witness statements and formal Notary Jurat under penalty of perjury",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    affiantName: "",
    affiantAddress: "",
    affiantRelationship: "Disinterested Acquaintance / Family Friend of 20+ Years",
    yearsKnownDecedent: "25",
    decedentFullName: "",
    dateOfDeath: "",
    countyStateOfDeath: "Harris County, Texas",
    maritalHistory: "Married once to Jane Doe, who predeceased decedent in 2018.",
    survivingHeirsDescription: "Two adult biological children: Robert Miller (Son) and Sandra Miller Vance (Daughter). No deceased children or adopted children.",
    realPropertyAddress: "",
    legalDescription: "Lot 8, Block 12, Section 4 of River Oaks Addition, an addition in Harris County, Texas, according to the map or plat thereof recorded in Volume 45, Page 12 of the Map Records of Harris County, Texas.",
    countyName: "Harris County",
  },
  steps: [
    {
      id: "affiant_decedent",
      title: "Affiant & Deceased Owner",
      description: "Enter identifying details for the sworn affiant and the deceased property owner.",
      fields: [
        {
          name: "affiantName",
          label: "Affiant Full Legal Name (Person Swearing Under Oath)",
          type: "text",
          placeholder: "e.g., William Henry Thorne",
          required: true,
          gridCols: 1,
        },
        {
          name: "affiantAddress",
          label: "Affiant Residential Address",
          type: "text",
          placeholder: "e.g., 1840 Timberline Drive, Houston, TX 77077",
          required: true,
          gridCols: 1,
        },
        {
          name: "affiantRelationship",
          label: "Affiant Relationship to Deceased (Preferably Disinterested)",
          type: "text",
          placeholder: "e.g., Lifelong neighbor and family friend with no financial interest",
          required: true,
          gridCols: 2,
        },
        {
          name: "yearsKnownDecedent",
          label: "Number of Years Affiant Knew the Deceased",
          type: "text",
          placeholder: "e.g., 28 Years",
          required: true,
          gridCols: 2,
        },
        {
          name: "decedentFullName",
          label: "Deceased Property Owner (Decedent) Full Name",
          type: "text",
          placeholder: "e.g., Charles Arthur Miller",
          required: true,
          gridCols: 1,
        },
        {
          name: "dateOfDeath",
          label: "Date of Decedent's Death",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "countyStateOfDeath",
          label: "Place of Death (County and State)",
          type: "text",
          placeholder: "e.g., Harris County, Texas",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "family_genealogy",
      title: "Marital History & Surviving Heirs",
      description: "Document the decedent's marriages, biological or adopted children, and living heirs.",
      fields: [
        {
          name: "maritalHistory",
          label: "Complete Marital History of Decedent",
          type: "textarea",
          placeholder: "Detail all marriages: spouse names, dates of marriage, and dates of divorce or death...",
          required: true,
        },
        {
          name: "survivingHeirsDescription",
          label: "Itemized List of All Surviving Children & Lawful Heirs",
          type: "textarea",
          placeholder: "Include full names, current ages, addresses, and parentage of all children and heirs...",
          required: true,
        },
      ],
    },
    {
      id: "property_recording",
      title: "Real Property Legal Description",
      description: "Provide the deed legal description for county land title recording.",
      fields: [
        {
          name: "realPropertyAddress",
          label: "Physical Address of Real Property",
          type: "text",
          placeholder: "e.g., 4210 Memorial Drive, Houston, TX 77007",
          required: true,
          gridCols: 1,
        },
        {
          name: "countyName",
          label: "County of Recording",
          type: "text",
          placeholder: "e.g., Harris County",
          required: true,
          gridCols: 1,
        },
        {
          name: "legalDescription",
          label: "Formal Metes-and-Bounds or Lot/Block Legal Description",
          type: "textarea",
          placeholder: "e.g., Lot 8, Block 12 of River Oaks, Volume 45, Page 12 Map Records...",
          required: true,
        },
        {
          name: "noticeDate",
          label: "Date of Sworn Execution",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const affiant = data.affiantName || "Affiant";
    const decedent = data.decedentFullName || "Decedent";
    const dod = data.dateOfDeath || "the date of death";
    const statuteCite = statute?.statuteCitation || "State Estates Code & Intestate Succession Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "SWORN AFFIANT", value: `${affiant}, ${data.affiantAddress || ""}` },
          { label: "RELATIONSHIP & DURATION", value: `${data.affiantRelationship || "Friend"} (Known Decedent for ${data.yearsKnownDecedent || "many"} years)` },
          { label: "DECEASED OWNER (DECEDENT)", value: `${decedent} (Deceased on ${dod} in ${data.countyStateOfDeath || "State"})` },
          { label: "SUBJECT REAL PROPERTY", value: `${data.realPropertyAddress || "Real Property"}, ${data.countyName || ""}` },
          { label: "TITLE STATUS", value: "Died Intestate (Without a Will) - Surviving Heirs Identified" },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Sworn Statement & Knowledge of Decedent",
        type: "body",
        paragraphs: [
          `STATE OF ${statute?.stateName.toUpperCase() || "TEXAS"}, COUNTY OF ${(data.countyName || "THE COUNTY").toUpperCase()}:`,
          `BEFORE ME, the undersigned authority, personally appeared ${affiant} ("Affiant"), who being by me first duly sworn upon oath, deposes and states under penalty of perjury:`,
          `1. Affiant is of lawful age, competent to testify, and resides at ${data.affiantAddress || "the address above"}. Affiant personally knew ${decedent} ("Decedent") for ${data.yearsKnownDecedent || "many"} years prior to Decedent's death.`,
          `2. Decedent died on ${dod}, in ${data.countyStateOfDeath || "the County"}, without leaving any known last will and testament. No application for probate or administration has been granted or is pending in any court.`,
          `3. Affiant has no financial or beneficial interest in the estate of Decedent and is not an heir, devisee, or creditor thereof.`,
        ],
      },
      {
        title: "2. Marital History & Family Genealogy",
        type: "body",
        paragraphs: [
          `4. Marital History: "${data.maritalHistory || "Decedent was married once, and surviving heirs are set forth below."}"`,
          `5. Children and Descendants: All children born to or adopted by Decedent, and all surviving heirs who inherit under the intestate succession laws of ${statute?.stateName || "the State"}, are:`,
          `"${data.survivingHeirsDescription || "Surviving adult heirs as noted on file."}"`,
          `6. Decedent never adopted any other child, nor took any other child into Decedent's home to rear, and Decedent left no surviving descendants of any deceased child.`,
        ],
      },
      {
        title: "3. Legal Description of Real Property Affected",
        type: "body",
        paragraphs: [
          `7. At the time of death, Decedent owned legal title to that certain tract or parcel of real estate situated in ${data.countyName || "the County"}, ${statute?.stateName || "the State"}, described as:`,
          `"${data.legalDescription || "Real property as recorded in the official public deed records."}"`,
          `Commonly known as: ${data.realPropertyAddress || "the subject real property"}.`,
          `8. All debts, medical expenses of last illness, funeral costs, and state and federal inheritance or estate taxes against Decedent's estate have been paid in full. This Affidavit is given for the express purpose of confirming the chain of title and vesting of ownership in Decedent's lawful heirs.`,
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
