import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const quitclaimDeedConfig: DocumentConfig = {
  id: "quitclaim-deed",
  slug: "quitclaim-deed",
  title: "Quitclaim Deed (Real Property Title Transfer)",
  shortTitle: "Quitclaim Deed",
  category: "Real Estate",
  description: "Official real property conveyance deed transferring all right, title, and interest from grantor to grantee without covenants or title warranties. Formatted for county land records recording.",
  metaDescription: "Generate a state-compliant Quitclaim Deed for real property transfers. Formatted with statutory county recorder margins, parcel APN, and notary jurat for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "County Recorder Ready",
  iconName: "Home",
  searchKeywords: [
    "quitclaim deed template pdf",
    "real property deed transfer form",
    "quit claim deed between spouses",
    "transfer house title to llc deed",
    "county recorder quitclaim deed",
    "statutory quitclaim deed form",
  ],
  features: [
    "Formatted to standard county recorder recording margins (3-inch top margin on first page)",
    "Includes legal parcel description, Assessor's Parcel Number (APN), and tax mailing address",
    "Specifically formulated for interspousal transfers, divorce settlements, and LLC capital contributions",
    "Features state-compliant Notary Public acknowledgment jurat for land records recording",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    grantorName: "",
    grantorAddress: "",
    granteeName: "",
    granteeAddress: "",
    propertyCounty: "Los Angeles",
    propertyAddress: "",
    assessorParcelNumber: "4348-012-005",
    nominalConsideration: "10.00",
    legalDescription: "Lot 14 in Block 5 of Tract No. 12840, in the City of Los Angeles, County of Los Angeles, State of California, as per Map recorded in Book 210, Pages 15 through 18, inclusive of Maps, in the Office of the County Recorder of said County.",
    taxStatementAddress: "Same as Grantee Address",
  },
  steps: [
    {
      id: "grantor_grantee",
      title: "Grantor & Grantee (Parties)",
      description: "Enter identifying details for the party releasing title (Grantor) and the party receiving title (Grantee).",
      fields: [
        {
          name: "grantorName",
          label: "Grantor Legal Name(s) (Transferring Party)",
          type: "text",
          placeholder: "e.g., William Harrison and Sarah Harrison (Husband and Wife)",
          required: true,
          gridCols: 1,
        },
        {
          name: "grantorAddress",
          label: "Grantor Mailing Address",
          type: "text",
          placeholder: "e.g., 1250 Elmwood Drive, Pasadena, CA 91105",
          required: true,
          gridCols: 1,
        },
        {
          name: "granteeName",
          label: "Grantee Legal Name(s) (Receiving Party)",
          type: "text",
          placeholder: "e.g., Harrison Family Living Trust, dated January 15, 2024",
          required: true,
          gridCols: 1,
        },
        {
          name: "granteeAddress",
          label: "Grantee Legal Address",
          type: "text",
          placeholder: "e.g., 1250 Elmwood Drive, Pasadena, CA 91105",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "property_legal_description",
      title: "Real Property & County Recording Data",
      description: "Enter county, parcel number, street address, and exact legal description.",
      fields: [
        {
          name: "propertyCounty",
          label: "County Where Property is Located",
          type: "text",
          placeholder: "e.g., Los Angeles County",
          required: true,
          gridCols: 2,
        },
        {
          name: "assessorParcelNumber",
          label: "Assessor Parcel Number (APN / Tax ID)",
          type: "text",
          placeholder: "e.g., 4348-012-005",
          required: true,
          gridCols: 2,
        },
        {
          name: "propertyAddress",
          label: "Physical Property Street Address",
          type: "text",
          placeholder: "e.g., 1250 Elmwood Drive, Pasadena, CA 91105",
          required: true,
          gridCols: 1,
        },
        {
          name: "nominalConsideration",
          label: "Recited Consideration ($ USD)",
          type: "currency",
          placeholder: "e.g., 10.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "taxStatementAddress",
          label: "Address Where Future Tax Statements Should Be Mailed",
          type: "text",
          placeholder: "e.g., 1250 Elmwood Drive, Pasadena, CA 91105",
          required: true,
          gridCols: 2,
        },
        {
          name: "legalDescription",
          label: "Official Legal Description (Lot/Block/Subdivision or Metes & Bounds)",
          type: "textarea",
          placeholder: "e.g., Lot 14 in Block 5 of Tract No. 12840, as per Map recorded in Book 210, Pages 15-18 of Maps...",
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
    const consideration = parseFloat(data.nominalConsideration || "10.00").toFixed(2);
    const apn = data.assessorParcelNumber || "N/A";
    const statuteCite = statute?.statuteCitation || "State Real Property Conveyance Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT TITLE", value: "STATUTORY QUITCLAIM DEED" },
          { label: "RECORDING REQUESTED BY", value: `${grantee}, ${data.granteeAddress || ""}` },
          { label: "MAIL TAX STATEMENTS TO", value: `${data.taxStatementAddress || data.granteeAddress || ""}` },
          { label: "GRANTOR(S) (TRANSFEROR)", value: `${grantor}, ${data.grantorAddress || ""}` },
          { label: "GRANTEE(S) (TRANSFEREE)", value: `${grantee}, ${data.granteeAddress || ""}` },
          { label: "COUNTY & APN PARCEL ID", value: `${county} County | APN: ${apn}` },
          { label: "PHYSICAL PREMISES", value: `${data.propertyAddress || "Real property as legally described"}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "Conveyance of Right, Title & Interest",
        type: "body",
        paragraphs: [
          `FOR VALUABLE CONSIDERATION of $${consideration} USD and other good and valuable consideration, the receipt and adequacy of which are hereby acknowledged, Grantor ${grantor} hereby REMISES, RELEASES, AND FOREVER QUITCLAIMS unto Grantee ${grantee}, all right, title, interest, claim, and equity which the Grantor has in and to the following described real property situated in the County of ${county}, State of ${statute?.stateName || "State"}:`,
          `PHYSICAL ADDRESS: ${data.propertyAddress || "Physical premises"}.`,
          `ASSESSOR'S PARCEL NUMBER: ${apn}.`,
          `LEGAL DESCRIPTION: ${data.legalDescription || "Legal description on file with County Recorder"}.`,
        ],
      },
      {
        title: "Habendum & Title Disclaimer",
        type: "body",
        paragraphs: [
          `TOGETHER WITH all and singular the hereditaments, appurtenances, tenements, and reversions thereunto belonging or in anywise appertaining, and the reversion and reversions, remainder and remainders, rents, issues, and profits thereof.`,
          `TO HAVE AND TO HOLD the said premises, with the appurtenances, unto the said Grantee and to Grantee's heirs and assigns forever. This conveyance is made strictly without covenants or warranties of title, either express or implied, conveying whatever title and interest Grantor may possess in the premises as of the date of execution.`,
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
