import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const generalWarrantyDeedConfig: DocumentConfig = {
  id: "general-warranty-deed",
  slug: "general-warranty-deed",
  title: "General Warranty Deed (Full Title Covenants & Warranty)",
  shortTitle: "General Warranty Deed",
  category: "Real Estate",
  description: "Official statutory real estate conveyance deed transferring fee simple title with full title covenants of seisin, freedom from encumbrances, quiet enjoyment, and perpetual title defense.",
  metaDescription: "Generate a state-compliant General Warranty Deed. Includes full statutory title covenants, APN parcel legal description, and county recorder jurat for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Full Title Warranty",
  iconName: "Shield",
  searchKeywords: [
    "general warranty deed template pdf",
    "statutory warranty deed form",
    "real property warranty deed transfer",
    "fee simple deed with title covenants",
    "county recorder general warranty deed",
    "warranty deed for home sale",
  ],
  features: [
    "Transfers fee simple absolute title with comprehensive statutory title covenants",
    "Expressly guarantees property is free of liens, clouds on title, and past encumbrances",
    "Obligates Grantor to forever defend Grantee's title against all lawful claims whatsoever",
    "Includes County Recorder 3-inch margin standards and formal Notary Public jurat",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    grantorName: "",
    grantorAddress: "",
    granteeName: "",
    granteeAddress: "",
    propertyCounty: "Harris",
    propertyAddress: "",
    assessorParcelNumber: "104-921-002",
    purchaseConsideration: "275000.00",
    legalDescription: "Lot 12, Block 4, of Briargrove Subdivision, Section 3, an addition in Harris County, Texas, according to the map or plat thereof recorded in Volume 84, Page 22 of the Map Records of Harris County, Texas.",
    taxStatementAddress: "Same as Grantee Address",
  },
  steps: [
    {
      id: "grantor_grantee",
      title: "Grantor & Grantee (Parties)",
      description: "Enter identifying details for the property seller (Grantor) and purchaser (Grantee).",
      fields: [
        {
          name: "grantorName",
          label: "Grantor Legal Name(s) (Seller / Conveyor)",
          type: "text",
          placeholder: "e.g., Jonathan Michael Harrison and Mary Harrison",
          required: true,
          gridCols: 1,
        },
        {
          name: "grantorAddress",
          label: "Grantor Legal Notice Address",
          type: "text",
          placeholder: "e.g., 5200 Memorial Drive, Houston, TX 77007",
          required: true,
          gridCols: 1,
        },
        {
          name: "granteeName",
          label: "Grantee Legal Name(s) (Purchaser / Receiving Party)",
          type: "text",
          placeholder: "e.g., Christopher Alan Vance and Kelly Vance",
          required: true,
          gridCols: 1,
        },
        {
          name: "granteeAddress",
          label: "Grantee Legal Mailing Address",
          type: "text",
          placeholder: "e.g., 6100 Westheimer Road, Suite 300, Houston, TX 77057",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "property_data",
      title: "Property, County & Consideration",
      description: "Enter parcel ID, purchase consideration, county, and legal description.",
      fields: [
        {
          name: "propertyCounty",
          label: "County Where Real Property is Located",
          type: "text",
          placeholder: "e.g., Harris County",
          required: true,
          gridCols: 2,
        },
        {
          name: "assessorParcelNumber",
          label: "Assessor Parcel Number (APN / Tax ID)",
          type: "text",
          placeholder: "e.g., 104-921-002",
          required: true,
          gridCols: 2,
        },
        {
          name: "propertyAddress",
          label: "Physical Real Property Street Address",
          type: "text",
          placeholder: "e.g., 7800 Briargrove Drive, Houston, TX 77057",
          required: true,
          gridCols: 1,
        },
        {
          name: "purchaseConsideration",
          label: "Total Monetary Consideration Paid ($ USD)",
          type: "currency",
          placeholder: "e.g., 275000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "taxStatementAddress",
          label: "Tax Statement Mailing Address",
          type: "text",
          placeholder: "e.g., 6100 Westheimer Road, Suite 300, Houston, TX 77057",
          required: true,
          gridCols: 2,
        },
        {
          name: "legalDescription",
          label: "Formal Legal Description (Lot, Block, Subdivision / Metes & Bounds)",
          type: "textarea",
          placeholder: "e.g., Lot 12, Block 4, of Briargrove Subdivision, Section 3, as recorded in Volume 84, Page 22...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Deed Executed",
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
    const county = data.propertyCounty || "County";
    const consideration = parseFloat(data.purchaseConsideration || "0").toFixed(2);
    const apn = data.assessorParcelNumber || "N/A";
    const statuteCite = statute?.statuteCitation || "State Real Property Conveyance and Warranty Deed Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT TITLE", value: "STATUTORY GENERAL WARRANTY DEED" },
          { label: "RECORDING REQUESTED BY", value: `${grantee}, ${data.granteeAddress || ""}` },
          { label: "MAIL TAX STATEMENTS TO", value: `${data.taxStatementAddress || data.granteeAddress || ""}` },
          { label: "GRANTOR(S) (SELLER)", value: `${grantor}, ${data.grantorAddress || ""}` },
          { label: "GRANTEE(S) (PURCHASER)", value: `${grantee}, ${data.granteeAddress || ""}` },
          { label: "COUNTY & PARCEL APN", value: `${county} County | APN: ${apn}` },
          { label: "PURCHASE CONSIDERATION", value: `$${consideration} USD and other good and valuable consideration` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "Conveyance & Grant of Fee Simple Title",
        type: "body",
        paragraphs: [
          `FOR VALUABLE CONSIDERATION of $${consideration} USD in hand paid, receipt and sufficiency of which are hereby acknowledged, Grantor ${grantor} hereby GRANTS, SELLS, AND CONVEYS unto Grantee ${grantee}, all that certain real property situated in the County of ${county}, State of ${statute?.stateName || "State"}, described as follows:`,
          `PHYSICAL ADDRESS: ${data.propertyAddress || "Physical property premises"}.`,
          `ASSESSOR'S PARCEL NUMBER: ${apn}.`,
          `LEGAL DESCRIPTION: ${data.legalDescription || "Legal description on file with County Clerk"}.`,
        ],
      },
      {
        title: "Covenants of Title & General Warranty",
        type: "body",
        paragraphs: [
          `Grantor covenants that Grantor is seized of an indefeasible estate in fee simple in said premises, has full legal authority to convey the same, that said property is free and clear of all encumbrances, liens, or claims, and that Grantee shall quietly enjoy said premises.`,
          `GENERAL WARRANTY: Grantor hereby binds Grantor, and Grantor's heirs, executors, administrators, and successors, to FOREVER WARRANT AND DEFEND all and singular the said premises unto Grantee, Grantee's heirs, and assigns, against every person whomsoever lawfully claiming or to claim the same or any part thereof.`,
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
