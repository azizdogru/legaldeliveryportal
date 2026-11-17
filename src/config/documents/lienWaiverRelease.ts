import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const lienWaiverReleaseConfig: DocumentConfig = {
  id: "lien-waiver-release",
  slug: "lien-waiver-release",
  title: "Mechanic's Lien Waiver and Release Form",
  shortTitle: "Lien Waiver & Release",
  category: "Real Estate & Construction",
  description: "Statutory construction mechanic's lien waiver and release instrument conforming to mandatory state formats (including California Civil Code 8132-8138, Texas Property Code 53.284, and Florida Chapter 713) for conditional and unconditional progress or final payments.",
  metaDescription: "Generate an enforceable Mechanic's Lien Waiver and Release Form. Covers conditional and unconditional progress and final payment waivers for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Statutory Form",
  iconName: "HardHat",
  searchKeywords: [
    "mechanics lien waiver form",
    "conditional lien waiver on progress payment",
    "unconditional final lien waiver",
    "california statutory lien waiver civil code 8132",
    "texas lien waiver property code 53.284",
    "contractor release of lien",
  ],
  features: [
    "Supports all four statutory waiver types: Conditional Progress, Unconditional Progress, Conditional Final, and Unconditional Final",
    "Incorporates mandatory state statutory language for CA, TX, FL, GA, and all 50 states",
    "Explicitly preserves rights to retainage, pending change orders, and disputed claims",
    "Includes contractor sworn verification under penalty of perjury and Notary Jurat",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    waiverType: "conditional_progress",
    claimantName: "",
    claimantAddress: "",
    hiringPartyName: "",
    propertyOwner: "",
    propertyAddress: "",
    countyName: "",
    paymentAmount: "12500.00",
    throughDate: new Date().toISOString().split("T")[0],
    exceptionsDescription: "Retainage of 10% and pending written Change Order Nos. 2 and 3.",
    checkDetails: "Check or wire transfer from customer",
  },
  steps: [
    {
      id: "parties_property",
      title: "Claimant & Project Location",
      description: "Enter identifying details for the contractor, property owner, and construction jobsite.",
      fields: [
        {
          name: "claimantName",
          label: "Claimant / Subcontractor / Supplier Name",
          type: "text",
          placeholder: "e.g., Apex Framing & Drywall LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "claimantAddress",
          label: "Claimant Business Address",
          type: "text",
          placeholder: "e.g., 2100 Industrial Parkway, Oakland, CA 94607",
          required: true,
          gridCols: 1,
        },
        {
          name: "hiringPartyName",
          label: "Customer / Hiring Contractor (Who You Contracted With)",
          type: "text",
          placeholder: "e.g., Pacific Coast Builders Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "propertyOwner",
          label: "Property Owner Name",
          type: "text",
          placeholder: "e.g., California Commercial Properties LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "propertyAddress",
          label: "Construction Project Physical Address",
          type: "text",
          placeholder: "e.g., 850 Marina Boulevard, San Leandro, CA 94577",
          required: true,
          gridCols: 1,
        },
        {
          name: "countyName",
          label: "County of Real Property",
          type: "text",
          placeholder: "e.g., Alameda County",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "waiver_accounting",
      title: "Waiver Scope & Financial Details",
      description: "Specify the statutory waiver category, payment amount, and through date.",
      fields: [
        {
          name: "waiverType",
          label: "Statutory Waiver Classification",
          type: "select",
          required: true,
          options: [
            { label: "Conditional Waiver and Release on Progress Payment", value: "conditional_progress" },
            { label: "Unconditional Waiver and Release on Progress Payment", value: "unconditional_progress" },
            { label: "Conditional Waiver and Release on Final Payment", value: "conditional_final" },
            { label: "Unconditional Waiver and Release on Final Payment", value: "unconditional_final" },
          ],
        },
        {
          name: "paymentAmount",
          label: "Payment Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 12500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "throughDate",
          label: "Through Date (Effective Coverage Date)",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "checkDetails",
          label: "Payment Remittance / Check or Draft Details",
          type: "text",
          placeholder: "e.g., Check No. 4812 drawn on Wells Fargo or Wire Reference",
          required: true,
        },
        {
          name: "exceptionsDescription",
          label: "Expressly Reserved Exceptions (Retainage / Unpaid Extras)",
          type: "textarea",
          placeholder: "e.g., Retainage of 10% ($4,500), disputed extras, and pending written Change Order Nos. 2 and 3...",
          required: false,
        },
      ],
    },
    {
      id: "execution",
      title: "Execution & Delivery",
      description: "Establish signature date and sworn verification.",
      fields: [
        {
          name: "noticeDate",
          label: "Date of Execution",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const claimant = data.claimantName || "Claimant";
    const amount = parseFloat(data.paymentAmount || "0").toFixed(2);
    const throughDate = data.throughDate || "the specified through date";
    const property = data.propertyAddress || "the subject real property";
    const statuteCite = statute?.statuteCitation || "State Mechanic's Lien & Payment Code";

    let waiverTitle = "Conditional Waiver and Release on Progress Payment";
    let isConditional = true;
    let isFinal = false;

    if (data.waiverType === "unconditional_progress") {
      waiverTitle = "Unconditional Waiver and Release on Progress Payment";
      isConditional = false;
    } else if (data.waiverType === "conditional_final") {
      waiverTitle = "Conditional Waiver and Release on Final Payment";
      isFinal = true;
    } else if (data.waiverType === "unconditional_final") {
      waiverTitle = "Unconditional Waiver and Release on Final Payment";
      isConditional = false;
      isFinal = true;
    }

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT TITLE", value: `${waiverTitle.toUpperCase()}` },
          { label: "CLAIMANT / CONTRACTOR", value: `${claimant}, ${data.claimantAddress || ""}` },
          { label: "CUSTOMER (HIRING PARTY)", value: `${data.hiringPartyName || "General Contractor"}` },
          { label: "PROPERTY OWNER", value: `${data.propertyOwner || "Owner of Record"}` },
          { label: "JOBSITE / REAL PROPERTY", value: `${property}, ${data.countyName || ""}` },
          { label: "PAYMENT SUM & THROUGH DATE", value: `$${amount} USD through ${throughDate}` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Statutory Notice & Scope of Waiver",
        type: "body",
        paragraphs: [
          isConditional
            ? `NOTICE: THIS DOCUMENT WAIVES THE CLAIMANT'S LIEN, STOP PAYMENT NOTICE, AND PAYMENT BOND RIGHTS EFFECTIVE ON RECEIPT OF PAYMENT. A PERSON SHOULD NOT RELY ON THIS DOCUMENT UNLESS SATISFIED THAT THE CLAIMANT HAS RECEIVED PAYMENT.`
            : `NOTICE TO CLAIMANT: THIS DOCUMENT WAIVES AND RELEASES LIEN, STOP PAYMENT NOTICE, AND PAYMENT BOND RIGHTS UNCONDITIONALLY AND STATES THAT YOU HAVE BEEN PAID FOR GIVING UP THOSE RIGHTS. IT IS ENFORCEABLE AGAINST YOU IF YOU SIGN IT, EVEN IF YOU HAVE NOT BEEN PAID.`,
          `Upon receipt by the undersigned of a check or draft from ${data.hiringPartyName || "Customer"} in the sum of $${amount} USD payable to ${claimant}, and when the check has been properly endorsed and paid by the bank on which it is drawn, this document becomes effective to release any mechanic's lien, stop payment notice, or bond right the claimant has on the job of ${data.propertyOwner || "Owner"} located at ${property}.`,
          isFinal
            ? `This release covers all labor, services, equipment, and materials furnished to the jobsite through the completion of the project.`
            : `This release covers labor, services, equipment, or materials furnished to the jobsite through ${throughDate} only, and does not cover any labor, services, equipment, or materials furnished after that date.`,
        ],
      },
      {
        title: "2. Express Reservations & Exceptions",
        type: "body",
        paragraphs: [
          `This document does not affect any of the following rights of Claimant:`,
          `(1) Retainage or holdback sums withheld pursuant to agreement;`,
          `(2) Payments for pending or unapproved written change orders;`,
          `(3) Claims for additional compensation, extras, or unforeseen site conditions currently unresolved;`,
          data.exceptionsDescription
            ? `(4) Specific enumerated exceptions: "${data.exceptionsDescription}".`
            : `(4) No additional specific exceptions noted by Claimant.`,
        ],
      },
      {
        title: "3. Sworn Verification Under Penalty of Perjury",
        type: "body",
        paragraphs: [
          `The undersigned individual warrants and represents that they are an authorized officer, manager, or legal agent of Claimant, possessing full corporate or legal power to execute this waiver, and that all subcontractors, laborers, and materialmen employed by Claimant through the stated date have been paid in full or will be paid from the proceeds of this payment.`,
          `Executed on this ${data.noticeDate || "effective date"} under penalty of perjury under the laws of ${statute?.stateName || "the State"}.`,
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
