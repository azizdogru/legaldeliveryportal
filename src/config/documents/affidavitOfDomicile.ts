import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const affidavitOfDomicileConfig: DocumentConfig = {
  id: "affidavit-of-domicile",
  slug: "affidavit-of-domicile",
  title: "Affidavit of Domicile (Probate Residency & Asset Transfer)",
  shortTitle: "Affidavit of Domicile",
  category: "Estate Planning & Real Estate",
  description: "Official sworn statutory affidavit executed by an executor, personal representative, or surviving heir certifying the legal permanent domicile and primary tax residency of a decedent, legally required by banks, brokerage institutions, and stock transfer agents to release funds and transfer securities.",
  metaDescription: "Create an official Affidavit of Domicile for probate and estate administration. Certifies decedent permanent residence for banks, transfer agents, and brokerage firms across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Asset Transfer Affidavit",
  iconName: "Scroll",
  searchKeywords: [
    "affidavit of domicile template pdf",
    "decedent residency affidavit stock transfer",
    "executor affidavit of domicile form",
    "transfer agent affidavit of domicile",
    "probate estate tax domicile form",
    "bank release affidavit of domicile",
  ],
  features: [
    "Required by major stock transfer agents (Computershare, Equiniti, AST) and financial brokerages",
    "Establishes decedent primary legal residence for state estate tax and inheritance tax clearance",
    "Executed under penalty of perjury by appointed Executor, Administrator, or surviving family heir",
    "Includes formal Notary Public jurat acknowledgment for verified bank and court acceptance",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "NY",
    countyName: "New York County",
    affiantName: "Sarah Elizabeth Sterling",
    affiantAddress: "750 Park Avenue, Apt 11B, New York, NY 10021",
    affiantFiduciaryCapacity: "Executor of the Last Will and Testament",
    decedentName: "Arthur Montgomery Sterling",
    dateOfDeath: new Date(Date.now() - 45 * 86400000).toISOString().split("T")[0],
    decedentResidenceAddress: "750 Park Avenue, Apt 11B, New York, NY 10021",
    domicileCityCountyState: "City of New York, County of New York, State of New York",
    yearsAtResidence: "18 Years",
    financialInstitution: "Computershare Trust Company, N.A. / Charles Schwab & Co.",
    securitiesOrAccountsHeld: "5,000 shares of Apple Inc. (AAPL) common stock and Schwab Brokerage Account ending in #9412.",
  },
  steps: [
    {
      id: "affiant_parties",
      title: "Executor & Decedent Profile",
      description: "Enter identifying details for the executing fiduciary and the deceased person.",
      fields: [
        {
          name: "affiantName",
          label: "Affiant (Executor / Administrator) Full Legal Name",
          type: "text",
          placeholder: "e.g., Sarah Elizabeth Sterling",
          required: true,
          gridCols: 2,
        },
        {
          name: "affiantFiduciaryCapacity",
          label: "Affiant Fiduciary Title / Legal Capacity",
          type: "text",
          placeholder: "e.g., Executor of the Estate / Surviving Heir",
          required: true,
          gridCols: 2,
        },
        {
          name: "affiantAddress",
          label: "Affiant Current Mailing Address",
          type: "text",
          placeholder: "e.g., 750 Park Avenue, Apt 11B, New York, NY 10021",
          required: true,
          gridCols: 1,
        },
        {
          name: "decedentName",
          label: "Deceased Person (Decedent) Full Name",
          type: "text",
          placeholder: "e.g., Arthur Montgomery Sterling",
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
      ],
    },
    {
      id: "domicile_specs",
      title: "Domicile & Financial Asset Specifics",
      description: "Certify decedent permanent residence and target stock or bank accounts.",
      fields: [
        {
          name: "decedentResidenceAddress",
          label: "Decedent Last Permanent Street Address",
          type: "text",
          placeholder: "e.g., 750 Park Avenue, Apt 11B, New York, NY 10021",
          required: true,
          gridCols: 1,
        },
        {
          name: "domicileCityCountyState",
          label: "City, County & State of Primary Domicile",
          type: "text",
          placeholder: "e.g., City of New York, County of New York, State of New York",
          required: true,
          gridCols: 2,
        },
        {
          name: "yearsAtResidence",
          label: "Duration Lived at Said Domicile",
          type: "text",
          placeholder: "e.g., 18 Years (Prior to demise)",
          required: true,
          gridCols: 2,
        },
        {
          name: "financialInstitution",
          label: "Target Bank / Transfer Agent Name",
          type: "text",
          placeholder: "e.g., Computershare / Charles Schwab / Fidelity Investments",
          required: true,
          gridCols: 1,
        },
        {
          name: "securitiesOrAccountsHeld",
          label: "Description of Stock Certificates or Accounts",
          type: "textarea",
          placeholder: "e.g., 5,000 shares of Apple Inc. (AAPL) common stock, CUSIP #037833100...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Sworn & Subscribed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const affiant = data.affiantName || "Affiant";
    const decedent = data.decedentName || "Decedent";
    const county = data.countyName || "County of Record";
    const domicile = data.domicileCityCountyState || "County and State of domicile";
    const statuteCite = statute?.statuteCitation || "Uniform Probate Code & State Estates Powers and Trusts Law";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT TITLE", value: "AFFIDAVIT OF DOMICILE (PROBATE & STOCK TRANSFER)" },
          { label: "STATE & COUNTY", value: `${statute?.stateName || "State"}, County of ${county}` },
          { label: "AFFIANT / FIDUCIARY", value: `${affiant} (${data.affiantFiduciaryCapacity || "Executor"})` },
          { label: "DECEASED PERSON", value: `${decedent} (Deceased on ${data.dateOfDeath || "Date on file"})` },
          { label: "DOMICILE OF RECORD", value: `${data.decedentResidenceAddress || "Address on file"} (${domicile})` },
          { label: "TENURE AT DOMICILE", value: `${data.yearsAtResidence || "Continuous permanent residence"}` },
          { label: "FINANCIAL INSTITUTION", value: `${data.financialInstitution || "Stock Transfer Agent / Bank"}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Sworn Deposition as to Domicile & Permanent Residence",
        type: "body",
        paragraphs: [
          `STATE OF ${statute?.stateName?.toUpperCase() || "THE STATE"} )`,
          `COUNTY OF ${county.toUpperCase()} ) SS.`,
          `${affiant} ("Affiant"), being first duly sworn according to law, deposes and states under oath as follows:`,
          `1. Affiant resides at ${data.affiantAddress || "the address above"} and is the duly qualified and acting ${data.affiantFiduciaryCapacity || "Executor / Administrator"} of the estate of ${decedent} ("Decedent"), who died on ${data.dateOfDeath || "the date of death"}.`,
          `2. At the time of demise, and for ${data.yearsAtResidence || "many years"} immediately preceding death, the legal residence, primary tax domicile, and principal fixed habitation of Decedent was located at: ${data.decedentResidenceAddress || "the domicile address on file"}, in the ${domicile}.`,
        ],
      },
      {
        title: "2. Tax Jurisdiction & Freedom from Claims",
        type: "body",
        paragraphs: [
          `3. Domicile Intent: During said period, Decedent lived and maintained their permanent home at said address, voted in said jurisdiction, filed income and real property tax returns in said State, and had no intention of establishing a domicile elsewhere.`,
          `4. Debts & Tax Clearance: All estate, inheritance, transfer, and succession taxes applicable to the estate or due to the jurisdiction of domicile have been paid in full or adequately reserved, and no unpaid creditor liens exist against the transferred assets.`,
        ],
      },
      {
        title: "3. Purpose of Transfer & Inducement",
        type: "body",
        paragraphs: [
          `5. Transfer Agent Inducement: This Affidavit is made for the express purpose of inducing ${data.financialInstitution || "the transfer agent or financial institution"} to transfer, deliver, assign, or pay over the following securities, stock certificates, funds, or assets standing in the name of or belonging to Decedent:`,
          `"${data.securitiesOrAccountsHeld || "Target financial assets and securities on file"}"`,
          `6. Indemnification: Affiant, individually and in their representative capacity, agrees to defend, hold harmless, and indemnify the financial institution and its transfer agents against all claims, loss, or expense arising from reliance on this sworn affidavit under ${statuteCite}.`,
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
