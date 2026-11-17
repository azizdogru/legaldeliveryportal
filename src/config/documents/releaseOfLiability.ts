import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const releaseOfLiabilityConfig: DocumentConfig = {
  id: "release-of-liability",
  slug: "release-of-liability",
  title: "Release of Liability & Mutual Settlement Agreement",
  shortTitle: "Release of Liability",
  category: "Contracts & Releases",
  description: "Binding legal settlement contract releasing all claims, property damage, or bodily injury liabilities arising from an accident or dispute in exchange for settlement payment.",
  metaDescription: "Create a binding Release of Liability and Settlement Agreement. Includes statutory unknown claims waiver (e.g. Cal. Civ. Code 1542) and indemnity. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Full Legal Bar",
  iconName: "FileCheck",
  searchKeywords: [
    "release of liability form",
    "general release and settlement agreement",
    "car accident release of liability",
    "property damage release form",
    "california civil code 1542 waiver",
    "covenant not to sue template",
  ],
  features: [
    "Contains express statutory waiver of unknown claims (including Cal. Civ. Code Section 1542)",
    "Comprehensive discharge of property damage, personal injury, and financial claims",
    "Includes mutual covenant not to sue and third-party indemnity defense clauses",
    "Formatted with dual execution lines and formal Notary Jurat block",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    releasorName: "",
    releasorAddress: "",
    releaseeName: "",
    releaseeAddress: "",
    incidentType: "vehicular_accident",
    incidentDate: "",
    incidentLocation: "",
    incidentDescription: "Minor traffic collision resulting in bumper and quarter-panel damage.",
    settlementAmount: "2500.00",
    paymentTiming: "Upon execution of this agreement via certified bank draft",
    mutualRelease: "yes",
  },
  steps: [
    {
      id: "parties",
      title: "Settling Parties",
      description: "Enter identifying details for the party releasing claims and the party being released.",
      fields: [
        {
          name: "releasorName",
          label: "Releasing Party (Person Giving Up Rights)",
          type: "text",
          placeholder: "e.g., Jennifer Hayes",
          required: true,
          gridCols: 1,
        },
        {
          name: "releasorAddress",
          label: "Releasing Party Address",
          type: "text",
          placeholder: "e.g., 340 Oak Street, Pasadena, CA 91101",
          required: true,
          gridCols: 1,
        },
        {
          name: "releaseeName",
          label: "Released Party (Person Being Released from Liability)",
          type: "text",
          placeholder: "e.g., Michael Turner",
          required: true,
          gridCols: 1,
        },
        {
          name: "releaseeAddress",
          label: "Released Party Address",
          type: "text",
          placeholder: "e.g., 780 Elm Avenue, Glendale, CA 91202",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "incident_details",
      title: "Dispute / Incident Background",
      description: "Specify the facts, location, and date of the underlying incident.",
      fields: [
        {
          name: "incidentType",
          label: "Category of Incident / Dispute",
          type: "select",
          required: true,
          options: [
            { label: "Motor Vehicle Collision / Minor Traffic Accident", value: "vehicular_accident" },
            { label: "Real or Personal Property Damage", value: "property_damage" },
            { label: "Commercial or Contractual Dispute", value: "contract_dispute" },
            { label: "Personal Injury / Slip and Fall / Premises Claim", value: "personal_injury" },
            { label: "General Neighbor or Civil Dispute", value: "general_dispute" },
          ],
        },
        {
          name: "incidentDate",
          label: "Date of Incident / Occurrence",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "incidentLocation",
          label: "Location of Incident (City, State, Intersection)",
          type: "text",
          placeholder: "e.g., Intersection of Colorado Blvd and Lake Ave, Pasadena, CA",
          required: true,
          gridCols: 2,
        },
        {
          name: "incidentDescription",
          label: "Brief Description of the Incident and Damages",
          type: "textarea",
          placeholder: "Describe the collision or occurrence and damages involved...",
          required: true,
        },
      ],
    },
    {
      id: "settlement_terms",
      title: "Financial Consideration & Terms",
      description: "State the monetary settlement amount and terms of execution.",
      fields: [
        {
          name: "settlementAmount",
          label: "Settlement Consideration Sum ($)",
          type: "currency",
          placeholder: "e.g., 2500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "paymentTiming",
          label: "Payment Delivery Method and Timing",
          type: "text",
          placeholder: "e.g., Delivered via certified cashier's check simultaneously with signing",
          required: true,
          gridCols: 2,
        },
        {
          name: "mutualRelease",
          label: "Is this a Mutual Release? (Both parties release each other)",
          type: "select",
          required: true,
          options: [
            { label: "Yes, both parties mutually release all reciprocal claims", value: "yes" },
            { label: "No, unilateral release (Releasor alone releases Releasee)", value: "no" },
          ],
        },
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
    const releasor = data.releasorName || "Releasor";
    const releasee = data.releaseeName || "Releasee";
    const amount = parseFloat(data.settlementAmount || "0").toFixed(2);
    const incidentDate = data.incidentDate || "the date of incident";
    const location = data.incidentLocation || "the agreed location";
    const statuteCite = statute?.statuteCitation || "Applicable State Contract and Release Law";
    const isMutual = data.mutualRelease === "yes";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "RELEASING PARTY (RELEASOR)", value: `${releasor}, ${data.releasorAddress || ""}` },
          { label: "RELEASED PARTY (RELEASEE)", value: `${releasee}, ${data.releaseeAddress || ""}` },
          { label: "SETTLEMENT CONSIDERATION", value: `$${amount} USD (${data.paymentTiming || "Certified Funds"})` },
          { label: "INCIDENT / DISPUTE DATE", value: `${incidentDate} at ${location}` },
          { label: "NATURE OF RELEASE", value: isMutual ? "MUTUAL GENERAL RELEASE AND SETTLEMENT" : "GENERAL RELEASE AND WAIVER" },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Recitals and Purpose of Settlement",
        type: "body",
        paragraphs: [
          `THIS RELEASE OF LIABILITY AND SETTLEMENT AGREEMENT is entered into on this ${data.noticeDate || "effective date"}, by and between ${releasor} and ${releasee}.`,
          `WHEREAS, a dispute, collision, or occurrence took place on or about ${incidentDate}, at or near ${location}, involving:`,
          `"${data.incidentDescription || "Disputed claims, physical damages, and occurrences between the parties."}"`,
          `WHEREAS, the parties desire to fully, finally, and forever resolve, compromise, and settle all differences, disputes, claims, and controversies between them arising from or relating to said occurrence, without admission of fault or liability.`,
        ],
      },
      {
        title: "2. Settlement Consideration",
        type: "body",
        paragraphs: [
          `In consideration of the total sum of $${amount} USD paid by or on behalf of Releasee to Releasor, the receipt and legal sufficiency of which are hereby acknowledged, the parties agree as follows:`,
        ],
      },
      {
        title: "3. Full and Complete Release and Discharge",
        type: "body",
        paragraphs: [
          `Releasor hereby completely and irrevocably releases, acquits, satisfies, and forever discharges Releasee, together with Releasee's heirs, executors, administrators, agents, insurers, successors, and assigns, of and from any and all past, present, or future claims, demands, obligations, actions, causes of action, rights, damages, costs, losses of service, expenses, and compensation of whatsoever kind or nature, whether based on tort, contract, statutory violation, or other theory of recovery.`,
          isMutual
            ? `Releasee likewise releases, acquits, and forever discharges Releasor from any and all reciprocal claims, counterclaims, cross-claims, or demands arising out of the specified occurrence.`
            : `This release operates as a full defense in bar to any claim asserted by Releasor.`,
        ],
      },
      {
        title: "4. Express Waiver of Unknown and Unsuspected Claims",
        type: "body",
        paragraphs: [
          `The parties acknowledge that they may hereafter discover facts different from or in addition to those now known or believed to be true regarding the matters settled herein, and agree that this Agreement shall remain in all respects a full and final release notwithstanding such discovery.`,
          `The Releasor expressly waives and relinquishes all rights and benefits under California Civil Code Section 1542 (and any analogous common law or statutory provision of any other state jurisdiction), which provides:`,
          `"A general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party."`,
        ],
      },
      {
        title: "5. Covenant Not to Sue and Third-Party Indemnity",
        type: "body",
        paragraphs: [
          `Releasor expressly covenants and agrees never to institute, prosecute, or participate in any lawsuit, arbitration, or administrative proceeding against Releasee on account of the matters released herein.`,
          `Releasor further agrees to defend, indemnify, and hold Releasee harmless from any third-party claims, hospital liens, healthcare subrogation demands, or insurance reimbursement actions arising from the released incident.`,
        ],
      },
      {
        title: "6. No Admission of Liability",
        type: "body",
        paragraphs: [
          `It is understood and agreed that this settlement is the compromise of a doubtful and disputed claim, and that the consideration paid is not to be construed as an admission of liability or wrongdoing on the part of any party, all liability being expressly denied.`,
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
