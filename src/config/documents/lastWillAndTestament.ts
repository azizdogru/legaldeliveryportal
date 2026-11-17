import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const lastWillAndTestamentConfig: DocumentConfig = {
  id: "last-will-and-testament",
  slug: "last-will-and-testament",
  title: "Last Will and Testament (Simple Estate Will)",
  shortTitle: "Last Will and Testament",
  category: "Estate Planning",
  description: "Comprehensive statutory Last Will and Testament distributing property, nominating an Executor and alternate, designating minor child guardians, and including a self-proving affidavit for expedited probate.",
  metaDescription: "Generate a state-compliant Last Will and Testament. Nominates executors, minor child guardians, and disposes of estate property with a self-proving affidavit for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Probate Court Ready",
  iconName: "Scroll",
  searchKeywords: [
    "last will and testament template pdf",
    "simple will form for married or single",
    "self proving will affidavit form",
    "appoint executor and guardian will",
    "legal will document pdf",
    "estate planning will template",
  ],
  features: [
    "Conforms to state probate codes and the Uniform Probate Code (UPC)",
    "Includes formal appointment of Executor (Personal Representative) and alternate",
    "Designates testamentary guardians for minor children to prevent state custody disputes",
    "Incorporates statutory Self-Proving Affidavit with dual witness attestations and Notary Jurat",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    testatorName: "",
    testatorCounty: "Harris",
    testatorAddress: "",
    maritalStatus: "married",
    spouseName: "",
    hasMinorChildren: "yes",
    childrenNames: "",
    executorName: "",
    executorAddress: "",
    alternateExecutorName: "",
    guardianName: "",
    guardianAddress: "",
    residuaryBeneficiary: "spouse_then_children",
    specificBequests: "All personal effects, jewelry, automobiles, and household furnishings to my surviving spouse; or if my spouse predeceases me, equally among my surviving children.",
  },
  steps: [
    {
      id: "testator_family",
      title: "Testator & Family Details",
      description: "Enter identifying details for the person making the will and family members.",
      fields: [
        {
          name: "testatorName",
          label: "Testator Full Legal Name (Person Making Will)",
          type: "text",
          placeholder: "e.g., George Thomas Sterling",
          required: true,
          gridCols: 1,
        },
        {
          name: "testatorCounty",
          label: "County of Legal Domicile",
          type: "text",
          placeholder: "e.g., Harris County",
          required: true,
          gridCols: 2,
        },
        {
          name: "testatorAddress",
          label: "Physical Residence Address",
          type: "text",
          placeholder: "e.g., 3450 Westheimer Road, Houston, TX 77027",
          required: true,
          gridCols: 2,
        },
        {
          name: "maritalStatus",
          label: "Marital Status",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Married", value: "married" },
            { label: "Single / Unmarried", value: "single" },
            { label: "Divorced", value: "divorced" },
            { label: "Widowed", value: "widowed" },
          ],
        },
        {
          name: "spouseName",
          label: "Spouse Full Legal Name (If Married)",
          type: "text",
          placeholder: "e.g., Eleanor Vance Sterling",
          required: false,
          gridCols: 2,
        },
        {
          name: "childrenNames",
          label: "Child / Children Legal Name(s) & Dates of Birth",
          type: "text",
          placeholder: "e.g., Lucas Sterling (DOB: 05/12/2014) and Grace Sterling (DOB: 09/20/2017)",
          required: false,
          gridCols: 1,
        },
      ],
    },
    {
      id: "fiduciaries",
      title: "Executor & Minor Child Guardian",
      description: "Nominate your primary Executor, alternate Executor, and minor child Guardian.",
      fields: [
        {
          name: "executorName",
          label: "Primary Executor (Personal Representative) Legal Name",
          type: "text",
          placeholder: "e.g., Eleanor Vance Sterling",
          required: true,
          gridCols: 1,
        },
        {
          name: "executorAddress",
          label: "Primary Executor Address",
          type: "text",
          placeholder: "e.g., 3450 Westheimer Road, Houston, TX 77027",
          required: true,
          gridCols: 2,
        },
        {
          name: "alternateExecutorName",
          label: "Alternate Executor Legal Name & Address",
          type: "text",
          placeholder: "e.g., David Michael Sterling, 1200 Main St, Dallas, TX 75201",
          required: false,
          gridCols: 2,
        },
        {
          name: "guardianName",
          label: "Guardian for Minor Children Legal Name",
          type: "text",
          placeholder: "e.g., Katherine Sterling Adams (Sister)",
          required: false,
          gridCols: 1,
        },
        {
          name: "guardianAddress",
          label: "Guardian Address",
          type: "text",
          placeholder: "e.g., 400 South Lamar Blvd, Austin, TX 78704",
          required: false,
          gridCols: 1,
        },
      ],
    },
    {
      id: "property_disposition",
      title: "Estate Distribution & Execution",
      description: "Specify how your estate assets, real property, and personal effects are to be distributed.",
      fields: [
        {
          name: "residuaryBeneficiary",
          label: "Residuary Estate Distribution Scheme",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Entire Estate to Surviving Spouse, then Equally to Children per stirpes", value: "spouse_then_children" },
            { label: "Divided Equally Among All Surviving Children per stirpes", value: "children_equally" },
            { label: "Specific Named Beneficiary / Registered Charity", value: "named_beneficiary" },
          ],
        },
        {
          name: "specificBequests",
          label: "Specific Gifts & Tangible Personal Property Provisions",
          type: "textarea",
          placeholder: "e.g., I leave my vintage watch to my son Lucas; all remaining personal property to my spouse...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Will Executed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const testator = data.testatorName || "Testator";
    const county = data.testatorCounty || "County of Domicile";
    const executor = data.executorName || "Primary Executor";
    const altExecutor = data.alternateExecutorName || "None designated";
    const guardian = data.guardianName || "Designated Guardian";
    const statuteCite = statute?.statuteCitation || "State Estates and Probate Code & Uniform Probate Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "TESTAMENTARY INSTRUMENT", value: "LAST WILL AND TESTAMENT" },
          { label: "TESTATOR", value: `${testator}, residing in ${county} County, ${statute?.stateName || "State"}` },
          { label: "FAMILY DETAILS", value: `Status: ${data.maritalStatus || "Married"}${data.spouseName ? ` | Spouse: ${data.spouseName}` : ""}` },
          { label: "PRIMARY EXECUTOR", value: `${executor}, ${data.executorAddress || ""}` },
          { label: "ALTERNATE EXECUTOR", value: `${altExecutor}` },
          { label: "TESTAMENTARY GUARDIAN", value: `${guardian}${data.guardianAddress ? `, ${data.guardianAddress}` : ""}` },
          { label: "GOVERNING JURISDICTION", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Declaration & Revocation of Prior Wills",
        type: "body",
        paragraphs: [
          `I, ${testator}, an adult resident of the County of ${county}, State of ${statute?.stateName || "Texas"}, declare that this instrument is my Last Will and Testament. I hereby revoke all prior wills, codicils, and testamentary dispositions previously made by me.`,
          `I declare that I am of sound mind and disposing memory, and am acting freely, voluntarily, and without any duress, menace, or undue influence whatsoever.`,
        ],
      },
      {
        title: "2. Appointment of Executor & Fiduciary Powers",
        type: "body",
        paragraphs: [
          `I appoint ${executor} as the Executor (Personal Representative) of this my Last Will and Testament. If said Executor is unable, unwilling, or ceases to act, I appoint ${altExecutor} as alternate Successor Executor.`,
          `I direct that no Executor nominated herein shall be required to post bond, surety, or other security in any court or jurisdiction for the faithful performance of fiduciary duties.`,
          `My Executor shall have full authority to administer my estate independently, without court intervention, to sell, lease, or encumber property, settle debts, and distribute assets in accordance with law.`,
        ],
      },
      {
        title: "3. Appointment of Testamentary Guardian for Minor Children",
        type: "body",
        paragraphs: [
          `If at my death I leave minor children and my spouse does not survive me, I designate and appoint ${guardian} as the testamentary guardian of the person and estate of my minor children. I direct that no guardian named herein shall be required to post bond.`,
        ],
      },
      {
        title: "4. Disposition of Property & Residuary Estate",
        type: "body",
        paragraphs: [
          `Specific Bequests: I dispose of my tangible personal property as follows: ${data.specificBequests || "All personal property to my surviving spouse or children equally."}`,
          `Residuary Estate: I give, devise, and bequeath all the rest, residue, and remainder of my estate, of every kind and description, real and personal, wheresoever situated, to: ${data.residuaryBeneficiary === "spouse_then_children" ? "my surviving spouse; but if my spouse predeceases me, then to my surviving children in equal shares per stirpes." : "my surviving children in equal shares per stirpes."}`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        title: "Self-Proving Affidavit of Testator & Attesting Witnesses",
        type: "body",
        paragraphs: [
          `STATE OF ${statute?.stateName?.toUpperCase() || "TEXAS"}, COUNTY OF ${county.toUpperCase()}: We, the testator and the witnesses whose names are signed hereto, being first duly sworn, declare to the undersigned authority that the testator signed and executed this instrument as the testator's Last Will and Testament, in the presence of the witnesses, who signed at the request of the testator, in the testator's presence, and that the testator was at that time of sound mind and memory.`,
          `Witness 1: _____________________________________ Address: ____________________________________`,
          `Witness 2: _____________________________________ Address: ____________________________________`,
        ],
      },
      {
        type: "notary",
        paragraphs: [],
      },
    ];
  },
};
