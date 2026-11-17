import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const codicilToWillConfig: DocumentConfig = {
  id: "codicil-to-will",
  slug: "codicil-to-will",
  title: "Codicil to Last Will and Testament (Amendment to Will)",
  shortTitle: "Codicil to Will",
  category: "Estate Planning",
  description: "Official statutory legal amendment modifying, updating, or revoking specific clauses of an existing Last Will and Testament (changing executor, updating beneficiaries, or adding bequests) without rewriting the entire will.",
  metaDescription: "Generate a state-compliant Codicil to Last Will and Testament. Updates executors, guardians, and bequests with a self-proving affidavit for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Probate Court Ready",
  iconName: "FileEdit",
  searchKeywords: [
    "codicil to last will and testament template",
    "amendment to will form pdf",
    "change executor codicil form",
    "add beneficiary codicil to will",
    "self proving codicil template",
    "legal codicil to existing will",
  ],
  features: [
    "Formally modifies an existing Last Will without revoking or rewriting the master instrument",
    "Amends executor nominations, successor guardians, or specific property bequests",
    "Expressly ratifies, republishes, and confirms all unchanged provisions of the original will",
    "Includes statutory Self-Proving Affidavit with dual attesting witnesses and Notary Public Jurat",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "FL",
    testatorName: "",
    testatorCounty: "Palm Beach",
    testatorAddress: "",
    originalWillDate: "",
    codicilNumber: "First",
    amendmentType: "change_executor",
    amendmentDetails: "I hereby revoke the appointment of my prior executor and instead nominate and appoint my daughter, Catherine Davis, as primary Executor (Personal Representative) of my estate, without bond.",
  },
  steps: [
    {
      id: "testator_original_will",
      title: "Testator & Original Will Date",
      description: "Enter identifying details for the testator and reference date of the underlying Last Will.",
      fields: [
        {
          name: "testatorName",
          label: "Testator Full Legal Name",
          type: "text",
          placeholder: "e.g., Arthur James Pendelton",
          required: true,
          gridCols: 1,
        },
        {
          name: "testatorCounty",
          label: "County of Legal Domicile",
          type: "text",
          placeholder: "e.g., Palm Beach County",
          required: true,
          gridCols: 2,
        },
        {
          name: "testatorAddress",
          label: "Testator Physical Residence Address",
          type: "text",
          placeholder: "e.g., 2400 Ocean Drive, Boca Raton, FL 33431",
          required: true,
          gridCols: 2,
        },
        {
          name: "originalWillDate",
          label: "Date Existing Original Will Was Executed",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "codicilNumber",
          label: "Codicil Sequence",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "First Codicil", value: "First" },
            { label: "Second Codicil", value: "Second" },
            { label: "Third Codicil", value: "Third" },
          ],
        },
      ],
    },
    {
      id: "codicil_amendments",
      title: "Amendments & Modifications",
      description: "Specify the exact changes being made to your existing Last Will and Testament.",
      fields: [
        {
          name: "amendmentType",
          label: "Primary Nature of Modification",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Change / Appoint New Executor or Personal Representative", value: "change_executor" },
            { label: "Change / Appoint New Guardian for Minor Children", value: "change_guardian" },
            { label: "Add or Modify Specific Gifts / Property Bequests", value: "modify_bequests" },
            { label: "Add or Remove an Estate Beneficiary", value: "update_beneficiaries" },
          ],
        },
        {
          name: "amendmentDetails",
          label: "Exact Legal Language of Modification / Amendment",
          type: "textarea",
          placeholder: "e.g., I hereby amend Article III of my Will to appoint Catherine Davis as Executor; or I bequeath my real property to...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Codicil Signed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const testator = data.testatorName || "Testator";
    const county = data.testatorCounty || "County";
    const seq = data.codicilNumber || "First";
    const willDate = data.originalWillDate || "the date of original will";
    const statuteCite = statute?.statuteCitation || "State Probate Code & Uniform Probate Code (UPC)";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "TESTAMENTARY INSTRUMENT", value: `${seq.toUpperCase()} CODICIL TO LAST WILL AND TESTAMENT` },
          { label: "TESTATOR", value: `${testator}, residing in ${county} County, ${statute?.stateName || "State"}` },
          { label: "ORIGINAL WILL DATE", value: `Last Will executed on ${willDate}` },
          { label: "MODIFICATION NATURE", value: `${data.amendmentType || "Amendment of terms"}` },
          { label: "GOVERNING JURISDICTION", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Declaration of Codicil & Domicile",
        type: "body",
        paragraphs: [
          `I, ${testator}, an adult resident of the County of ${county}, State of ${statute?.stateName || "Florida"}, declare this instrument to be the ${seq} Codicil to my Last Will and Testament, which original Will bears the execution date of ${willDate}.`,
          `I declare that I am of sound mind, disposing memory, and legal capacity, acting freely, voluntarily, and without any duress, menace, or undue influence whatsoever.`,
        ],
      },
      {
        title: "2. Specific Amendments and Additions to Original Will",
        type: "body",
        paragraphs: [
          `I hereby amend, alter, and supplement my said Last Will and Testament as follows:`,
          `"${data.amendmentDetails || "Amendments as stated in this instrument."}"`,
        ],
      },
      {
        title: "3. Ratification & Republication of All Remaining Will Provisions",
        type: "body",
        paragraphs: [
          `Except as specifically amended and modified by this ${seq} Codicil, I hereby ratify, republish, and confirm in all respects all the terms, conditions, appointments, and provisions of my said Last Will and Testament executed on ${willDate}.`,
          `It is my express testamentary intention that this Codicil and my original Last Will and Testament shall be construed together as a single harmonious testamentary instrument.`,
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
          `STATE OF ${statute?.stateName?.toUpperCase() || "STATE"}, COUNTY OF ${county.toUpperCase()}: We, the testator and the witnesses whose names are signed hereto, declare under oath that the testator executed this instrument as the ${seq} Codicil to the testator's Last Will and Testament in the presence of the witnesses, who signed at the request of the testator, in the testator's presence and sight, and that the testator was of sound mind and memory.`,
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
