import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const rentalInspectionChecklistConfig: DocumentConfig = {
  id: "rental-inspection-checklist",
  slug: "rental-inspection-checklist",
  title: "Rental Walkthrough Inspection Checklist (Move-In & Move-Out)",
  shortTitle: "Rental Inspection Checklist",
  category: "Landlord & Tenant",
  description: "Comprehensive move-in and move-out condition report documenting dwelling defects, walls, flooring, appliances, and fixtures. Mandated by over 16 state statutes to lawfully deduct repair damages from security deposits.",
  metaDescription: "Generate a state-compliant Rental Walkthrough Inspection Checklist. Documents move-in and move-out conditions, appliance status, and key surrender for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Statutory Deposit Defense",
  iconName: "ClipboardCheck",
  searchKeywords: [
    "rental walkthrough inspection checklist",
    "move in condition report template",
    "move out inspection checklist pdf",
    "tenant landlord property inspection form",
    "apartment condition report for security deposit",
    "pre move out joint walkthrough form",
  ],
  features: [
    "Mandated by over 16 state residential landlord-tenant codes to preserve landlord damage deduction rights",
    "Room-by-room audit: living room, kitchen, appliances, bedrooms, bathrooms, windows, and smoke detectors",
    "Records key counts, garage remotes, utility meter readings, and existing pre-tenancy scuffs",
    "Features joint landlord and tenant execution blocks with statutory right of rebuttal",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "WA",
    inspectionType: "move_in",
    landlordName: "",
    landlordAddress: "",
    tenantNames: "",
    premisesAddress: "",
    unitNumber: "",
    inspectionDate: new Date().toISOString().split("T")[0],
    smokeDetectorsOperational: "yes",
    keyCountDelivered: "2 front door keys, 1 mailbox key, and 1 garage remote",
    overallConditionRating: "Clean, good condition throughout; minor paint touchups noted",
    preExistingDefectsNotes: "Minor scuff on living room baseboard; small hairline scratch on refrigerator door; all plumbing and appliances fully operational.",
  },
  steps: [
    {
      id: "inspection_meta",
      title: "Inspection Type & Parties",
      description: "Specify whether this is a Move-In or Move-Out walkthrough, and enter landlord/tenant information.",
      fields: [
        {
          name: "inspectionType",
          label: "Inspection Stage",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Move-In Preliminary Inspection (Commencement of Tenancy)", value: "move_in" },
            { label: "Move-Out Final Walkthrough (Tenancy Surrender)", value: "move_out" },
          ],
        },
        {
          name: "inspectionDate",
          label: "Date of Joint Walkthrough",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordName",
          label: "Landlord / Inspector Full Legal Name",
          type: "text",
          placeholder: "e.g., Pacific Northwest Property Management LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordAddress",
          label: "Landlord Physical Notice Address",
          type: "text",
          placeholder: "e.g., 1420 5th Avenue, Suite 2200, Seattle, WA 98101",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantNames",
          label: "Tenant(s) Participating in Walkthrough",
          type: "text",
          placeholder: "e.g., Jonathan Michael Evans and Sarah Evans",
          required: true,
          gridCols: 1,
        },
        {
          name: "premisesAddress",
          label: "Rental Property Physical Address & Unit",
          type: "text",
          placeholder: "e.g., 2800 Western Avenue, Apt 412, Seattle, WA 98121",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "condition_audit",
      title: "Condition Assessment & Keys",
      description: "Document pre-existing scuffs, smoke detector tests, and surrendered keys.",
      fields: [
        {
          name: "smokeDetectorsOperational",
          label: "Are Smoke & Carbon Monoxide Detectors Tested and Working?",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Yes - Tested in tenant presence and working properly", value: "yes" },
            { label: "No - Maintenance requested to replace detector batteries", value: "no" },
          ],
        },
        {
          name: "keyCountDelivered",
          label: "Keys & Access Devices Handed Over",
          type: "text",
          placeholder: "e.g., 2 unit door keys, 1 mailbox key, 1 garage remote fob",
          required: true,
          gridCols: 2,
        },
        {
          name: "overallConditionRating",
          label: "Overall Habitable Condition Summary",
          type: "text",
          placeholder: "e.g., Excellent, freshly painted, professionally cleaned carpets",
          required: true,
          gridCols: 1,
        },
        {
          name: "preExistingDefectsNotes",
          label: "Itemized Pre-Existing Wear, Blemishes or Defects",
          type: "textarea",
          placeholder: "e.g., Living Room: 2 inch scuff on south wall. Kitchen: Light scratch on stainless stove. Master Bath: Faucet drip repaired...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Report Executed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord / Agent";
    const tenant = data.tenantNames || "Tenant(s)";
    const premises = data.premisesAddress || "Rental dwelling";
    const stage = data.inspectionType === "move_out" ? "MOVE-OUT FINAL INSPECTION" : "MOVE-IN COMMENCEMENT INSPECTION";
    const statuteCite = statute?.statuteCitation || "State Residential Security Deposit and Condition Report Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSPECTION DOCUMENT", value: `RESIDENTIAL PREMISES CONDITION REPORT (${stage})` },
          { label: "LANDLORD / INSPECTOR", value: `${landlord}, ${data.landlordAddress || ""}` },
          { label: "TENANT(S)", value: `${tenant}` },
          { label: "DWELLING PREMISES", value: `${premises}` },
          { label: "INSPECTION DATE", value: `${data.inspectionDate || "Date of walkthrough"}` },
          { label: "SAFETY DETECTORS", value: `${data.smokeDetectorsOperational === "yes" ? "Smoke and Carbon Monoxide Detectors TESTED & OPERATIONAL" : "Maintenance Needed"}` },
          { label: "KEYS & ACCESS DEVICES", value: `${data.keyCountDelivered || "Standard key allocation"}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Purpose of Inspection & Statutory Deposit Protection",
        type: "body",
        paragraphs: [
          `THIS RESIDENTIAL CONDITION CHECKLIST is completed on ${data.inspectionDate || "the date of inspection"}, by and between Landlord ${landlord} and Tenant ${tenant} regarding the dwelling located at ${premises}.`,
          `Under ${statuteCite}, in states requiring a move-in condition checklist (including Washington, Georgia, Arizona, Nevada, Hawaii, and others), landlords are legally prohibited from withholding any portion of a tenant security deposit for alleged physical damages unless a signed, itemized written condition checklist was executed at the commencement of tenancy.`,
        ],
      },
      {
        title: "2. Specific Condition Findings & Pre-Existing Blemishes",
        type: "body",
        paragraphs: [
          `Overall Habitable Rating: ${data.overallConditionRating || "Clean, tenantable condition."}`,
          `Pre-Existing Defects and Wear: ${data.preExistingDefectsNotes || "No material defects or damages observed. All fixtures and appliances in good working order."}`,
          `Both parties stipulate that the noted defects represent pre-existing conditions and shall not be charged against the tenant upon move-out surrender, ordinary wear and tear excepted.`,
        ],
      },
      {
        title: "3. Smoke Detectors, Locks & Joint Execution Agreement",
        type: "body",
        paragraphs: [
          `Safety Devices: The parties certify that all smoke alarms, fire safety systems, and carbon monoxide detectors were inspected, tested, and verified to be in proper operational condition as mandated by state fire safety codes.`,
          `Keys & Surrender: The tenant acknowledges receipt of: "${data.keyCountDelivered || "Keys as agreed"}". All issued keys and access devices must be returned upon vacating to avoid re-keying charges.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
    ];
  },
};
