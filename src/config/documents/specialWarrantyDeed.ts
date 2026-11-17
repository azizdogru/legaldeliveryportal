import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const specialWarrantyDeedConfig: DocumentConfig = {
  id: "special-warranty-deed",
  slug: "special-warranty-deed",
  title: "Special Warranty Deed (Limited Warranty Real Property Conveyance)",
  shortTitle: "Special Warranty Deed",
  category: "Real Estate",
  description: "Official recorded conveyance of real property wherein Grantor warrants and covenants fee simple title solely against defects arising by, through, or under Grantor, standard in commercial transactions, bank REO transfers, and corporate asset sales.",
  metaDescription: "Generate an official Special Warranty Deed for real estate conveyances. Grants limited covenants against grantor acts for commercial, bank-owned, and builder properties across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Limited Warranty Deed",
  iconName: "Home",
  searchKeywords: [
    "special warranty deed template pdf",
    "limited warranty deed form",
    "commercial real estate special warranty deed",
    "grant deed limited warranty",
    "special warranty deed county recording",
    "reo bank property special warranty deed",
  ],
  features: [
    "Warrants title strictly against defects and encumbrances created during Grantor tenure of ownership",
    "Standard commercial and corporate real estate instrument balancing buyer protection and seller liability",
    "Includes full legal metes and bounds property description and county Assessor Parcel Number (APN)",
    "Conforms to state county clerk formatting with statutory Notary Public acknowledgment jurat",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    countyName: "Travis County",
    grantorName: "Lone Star Commercial Assets, LLC",
    grantorAddress: "100 Congress Avenue, Suite 1900, Austin, TX 78701",
    granteeName: "Capital Metro Investments, Inc.",
    granteeAddress: "401 West 15th Street, Suite 850, Austin, TX 78701",
    propertyAddress: "7200 North Mopac Expressway, Building B, Austin, TX 78731",
    parcelId: "02-1492-0402",
    legalDescription: "Lot 4, Block C, Resubdivision of Section 2, Mopac Commercial Center, an addition in Travis County, Texas, according to the map or plat recorded in Volume 88, Page 142, Plat Records of Travis County, Texas.",
    considerationAmount: "10.00 and other good and valuable consideration",
    taxExemptionsExceptions: "Subject to taxes for current year, valid easements, covenants, and restrictions of record.",
  },
  steps: [
    {
      id: "deed_parties",
      title: "Grantor & Grantee Identification",
      description: "Enter identifying details for the property seller (Grantor) and buyer (Grantee).",
      fields: [
        {
          name: "grantorName",
          label: "Grantor (Seller / Transferor) Full Legal Name",
          type: "text",
          placeholder: "e.g., Lone Star Commercial Assets, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "grantorAddress",
          label: "Grantor Mailing Address",
          type: "text",
          placeholder: "e.g., 100 Congress Avenue, Suite 1900, Austin, TX 78701",
          required: true,
          gridCols: 2,
        },
        {
          name: "granteeName",
          label: "Grantee (Buyer / Transferee) Full Legal Name",
          type: "text",
          placeholder: "e.g., Capital Metro Investments, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "granteeAddress",
          label: "Grantee Mailing Address",
          type: "text",
          placeholder: "e.g., 401 West 15th Street, Suite 850, Austin, TX 78701",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "property_data",
      title: "Legal Description & County Recording",
      description: "Enter real property street address, parcel ID, county, and metes and bounds description.",
      fields: [
        {
          name: "propertyAddress",
          label: "Physical Real Property Address",
          type: "text",
          placeholder: "e.g., 7200 North Mopac Expressway, Building B, Austin, TX 78731",
          required: true,
          gridCols: 1,
        },
        {
          name: "parcelId",
          label: "Assessor Parcel Number (APN) / Tax ID",
          type: "text",
          placeholder: "e.g., 02-1492-0402",
          required: true,
          gridCols: 2,
        },
        {
          name: "countyName",
          label: "Recording County / Parish",
          type: "text",
          placeholder: "e.g., Travis County",
          required: true,
          gridCols: 2,
        },
        {
          name: "legalDescription",
          label: "Full Statutory Legal Property Description",
          type: "textarea",
          placeholder: "Enter lot, block, subdivision plat recording data or metes and bounds...",
          required: true,
          gridCols: 1,
        },
        {
          name: "considerationAmount",
          label: "Consideration Stated",
          type: "text",
          placeholder: "e.g., $10.00 and other good and valuable consideration",
          required: true,
          gridCols: 1,
        },
        {
          name: "taxExemptionsExceptions",
          label: "Permitted Exceptions / Encumbrances of Record",
          type: "text",
          placeholder: "e.g., Subject to current ad valorem taxes, recorded easements, and restrictions",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Deed Execution Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const grantor = data.grantorName || "Grantor";
    const grantee = data.granteeName || "Grantee";
    const county = data.countyName || "Recording County";
    const statuteCite = statute?.statuteCitation || "State Real Property Code on Limited Warranty Deeds";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT TITLE", value: "SPECIAL WARRANTY DEED (LIMITED WARRANTY CONVEYANCE)" },
          { label: "RECORDING COUNTY", value: `${county}, ${statute?.stateName || "State"}` },
          { label: "GRANTOR (SELLER)", value: `${grantor}` },
          { label: "GRANTEE (BUYER)", value: `${grantee}` },
          { label: "REAL PROPERTY ADDRESS", value: `${data.propertyAddress || "Property on file"}` },
          { label: "ASSESSOR PARCEL ID", value: `${data.parcelId || "APN on file"}` },
          { label: "CONSIDERATION", value: `${data.considerationAmount || "Ten Dollars ($10.00) and other valuable consideration"}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Granting Clause & Property Description",
        type: "body",
        paragraphs: [
          `KNOW ALL PERSONS BY THESE PRESENTS that ${grantor} ("Grantor"), whose mailing address is ${data.grantorAddress || "address on file"}, for and in consideration of the sum of ${data.considerationAmount || "Ten Dollars ($10.00) and other good and valuable consideration"}, in hand paid by ${grantee} ("Grantee"), whose mailing address is ${data.granteeAddress || "address on file"}, the receipt and sufficiency of which are hereby acknowledged, has GRANTED, BARGAINED, SOLD, AND CONVEYED, and by these presents does hereby GRANT, BARGAIN, SELL, AND CONVEY unto Grantee, all that certain tract, piece, or parcel of real property located in ${county}, described as follows:`,
          `Legal Description: "${data.legalDescription || "Legal description on file"}" (Tax Parcel ID: ${data.parcelId || "N/A"}), together with all and singular the rights, members, hereditaments, and appurtenances thereunto belonging or in anywise appertaining.`,
        ],
      },
      {
        title: "2. Special Warranty Covenant of Title",
        type: "body",
        paragraphs: [
          `TO HAVE AND TO HOLD the above-described premises, together with all rights and appurtenances thereto in anywise belonging, unto Grantee, Grantee's heirs, successors, and assigns forever.`,
          `Grantor hereby binds Grantor, Grantor's successors and assigns, to WARRANT AND FOREVER DEFEND all and singular the said premises unto Grantee, Grantee's successors and assigns, against every person whomsoever lawfully claiming or to claim the same, or any part thereof, BY, THROUGH, OR UNDER GRANTOR, BUT NOT OTHERWISE.`,
          `Permitted Exceptions: This conveyance is made expressly subject to the following permitted exceptions: ${data.taxExemptionsExceptions || "Real property taxes for the current year, zoning ordinances, and recorded easements and restrictions of record."}`,
        ],
      },
      {
        title: "3. Execution & Taxes",
        type: "body",
        paragraphs: [
          `Taxes for the current calendar year have been prorated between Grantor and Grantee as of the date hereof, the payment of which Grantee assumes.`,
          `IN WITNESS WHEREOF, Grantor has caused this Special Warranty Deed to be formally executed under seal on this ${data.noticeDate || "date of execution"}.`,
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
