import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const livingWillDirectiveConfig: DocumentConfig = {
  id: "living-will-directive",
  slug: "living-will-directive",
  title: "Living Will & Advance Health Care Directive",
  shortTitle: "Living Will Directive",
  category: "Estate Planning & Healthcare",
  description: "Legally binding advance health care directive, medical power of attorney, and healthcare proxy conforming to state probate codes, documenting end-of-life medical instructions, artificial nutrition/hydration directives, and organ donation wishes.",
  metaDescription: "Create a legally binding Living Will and Advance Health Care Directive. Designate a healthcare surrogate and document end-of-life medical wishes. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Probate Code Ready",
  iconName: "HeartPulse",
  searchKeywords: [
    "living will template",
    "advance health care directive form",
    "medical power of attorney",
    "healthcare proxy form",
    "end of life directive template",
    "california probate code 4670 directive",
  ],
  features: [
    "Designates primary and alternate Healthcare Agents (Medical Power of Attorney)",
    "Clear directives on artificial nutrition, hydration, and cardiopulmonary resuscitation",
    "Full HIPAA authorization permitting immediate disclosure to designated medical agents",
    "Includes dual disinterested witness attestations and statutory Notary Jurat",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    principalName: "",
    principalAddress: "",
    agentName: "",
    agentRelationship: "Spouse",
    agentPhone: "",
    agentAddress: "",
    alternateAgentName: "",
    alternateAgentRelationship: "Adult Child or Sibling",
    alternateAgentPhone: "",
    lifeSupportDecision: "terminal_withhold",
    nutritionHydration: "withhold_if_terminal",
    painReliefDirective: "maximum_comfort",
    organDonation: "any_needed",
  },
  steps: [
    {
      id: "principal_agents",
      title: "Principal & Healthcare Agent",
      description: "Enter identifying details for yourself and your designated medical proxy.",
      fields: [
        {
          name: "principalName",
          label: "Principal Full Legal Name (Your Name)",
          type: "text",
          placeholder: "e.g., Robert Edward Davis",
          required: true,
          gridCols: 1,
        },
        {
          name: "principalAddress",
          label: "Principal Residential Address",
          type: "text",
          placeholder: "e.g., 742 Evergreen Terrace, San Diego, CA 92101",
          required: true,
          gridCols: 1,
        },
        {
          name: "agentName",
          label: "Primary Healthcare Agent Name",
          type: "text",
          placeholder: "e.g., Sarah Davis",
          required: true,
          gridCols: 2,
        },
        {
          name: "agentRelationship",
          label: "Agent Relationship to Principal",
          type: "text",
          placeholder: "e.g., Spouse / Sibling / Trusted Friend",
          required: true,
          gridCols: 2,
        },
        {
          name: "agentPhone",
          label: "Agent Telephone Number",
          type: "text",
          placeholder: "e.g., (619) 555-0194",
          required: true,
          gridCols: 2,
        },
        {
          name: "agentAddress",
          label: "Agent Residential Address",
          type: "text",
          placeholder: "e.g., 742 Evergreen Terrace, San Diego, CA 92101",
          required: true,
          gridCols: 2,
        },
        {
          name: "alternateAgentName",
          label: "Alternate / Successor Agent Name",
          type: "text",
          placeholder: "e.g., Michael Davis",
          required: false,
          gridCols: 2,
        },
        {
          name: "alternateAgentPhone",
          label: "Alternate Agent Telephone",
          type: "text",
          placeholder: "e.g., (619) 555-0182",
          required: false,
          gridCols: 2,
        },
      ],
    },
    {
      id: "treatment_choices",
      title: "Life Support & Medical Directives",
      description: "Specify instructions for life-sustaining treatment, artificial nutrition, and comfort care.",
      fields: [
        {
          name: "lifeSupportDecision",
          label: "Life-Sustaining Treatment Instructions",
          type: "select",
          required: true,
          options: [
            { label: "Do not prolong life if terminal condition or persistent vegetative state", value: "terminal_withhold" },
            { label: "Continue all available life-sustaining treatments regardless of prognosis", value: "prolong_life" },
            { label: "Rely completely on the discretionary decision of my designated agent", value: "agent_discretion" },
          ],
        },
        {
          name: "nutritionHydration",
          label: "Artificial Nutrition & Hydration (Feeding Tubes)",
          type: "select",
          required: true,
          options: [
            { label: "Withhold or withdraw tube feeding if death is imminent or in permanent coma", value: "withhold_if_terminal" },
            { label: "Provide artificial nutrition and hydration indefinitely", value: "provide_indefinitely" },
            { label: "Leave artificial nutrition decision to my healthcare agent", value: "agent_discretion" },
          ],
        },
        {
          name: "painReliefDirective",
          label: "Pain Relief & Palliative Care",
          type: "select",
          required: true,
          options: [
            { label: "Administer maximum medication for pain relief, even if it hastens death", value: "maximum_comfort" },
            { label: "Provide standard pain relief without risking respiratory suppression", value: "standard_comfort" },
          ],
        },
        {
          name: "organDonation",
          label: "Anatomical Gifts / Organ Donation",
          type: "select",
          required: true,
          options: [
            { label: "I authorize any needed organs or tissues for transplant or research", value: "any_needed" },
            { label: "I authorize organs for transplant therapy only (not research)", value: "transplant_only" },
            { label: "I do not authorize any organ or tissue donation", value: "none" },
          ],
        },
      ],
    },
    {
      id: "execution",
      title: "Execution & Witness Verification",
      description: "Confirm the execution date for dual witness and Notary attestation.",
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
    const principal = data.principalName || "Principal";
    const agent = data.agentName || "Healthcare Agent";
    const altAgent = data.alternateAgentName ? `${data.alternateAgentName} (${data.alternateAgentPhone || ""})` : "None Designated";
    const statuteCite = statute?.statuteCitation || "State Advance Health Care Directive Code";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "PRINCIPAL (MAKER)", value: `${principal}, ${data.principalAddress || ""}` },
          { label: "PRIMARY HEALTHCARE AGENT", value: `${agent} (${data.agentRelationship || "Proxy"}), ${data.agentPhone || ""}` },
          { label: "ALTERNATE SUCCESSOR AGENT", value: `${altAgent}` },
          { label: "END-OF-LIFE DIRECTIVE", value: data.lifeSupportDecision === "prolong_life" ? "PROLONG LIFE BY ALL MEASURES" : "WITHHOLD LIFE-SUSTAINING TREATMENT IF TERMINAL" },
          { label: "ARTIFICIAL NOURISHMENT", value: data.nutritionHydration === "provide_indefinitely" ? "MAINTAIN FEEDING TUBES" : "WITHHOLD / WITHDRAW FEEDING TUBES IF TERMINAL" },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Designation of Healthcare Agent (Medical Power of Attorney)",
        type: "body",
        paragraphs: [
          `I, ${principal}, being of sound mind, willfully and voluntarily execute this Advance Health Care Directive on ${data.noticeDate || "the date of execution"}, pursuant to the laws of ${statute?.stateName || "the State"}.`,
          `I designate ${agent} as my attorney-in-fact and healthcare agent to make all healthcare decisions on my behalf when I lack capacity to make or communicate informed decisions. If my primary agent is unable, unwilling, or unavailable to act, I designate ${altAgent} as my alternate successor agent.`,
          `My agent's authority includes full power to consent, refuse, or withdraw consent to any medical treatment, surgical procedure, diagnostic test, cardiopulmonary resuscitation (CPR), or life-sustaining measure, consistent with the instructions herein.`,
        ],
      },
      {
        title: "2. End-of-Life Healthcare Instructions (Living Will)",
        type: "body",
        paragraphs: [
          data.lifeSupportDecision === "prolong_life"
            ? `I direct that my life be prolonged for the greatest possible duration using all available medical treatments and life-sustaining interventions, regardless of my prognosis, mental status, or bodily condition.`
            : `If I am diagnosed by two qualified physicians to be in a terminal condition with no reasonable medical probability of recovery, or in an irreversible persistent vegetative state or permanent coma: I direct that life-sustaining treatments be withheld or withdrawn, and that I be permitted to die naturally.`,
          data.nutritionHydration === "provide_indefinitely"
            ? `I specifically direct that artificial nutrition and hydration (feeding tubes and intravenous fluids) be provided to me indefinitely, regardless of my prognosis.`
            : `I direct that artificial nutrition and hydration (feeding tubes and IV fluids) be withheld or withdrawn if their administration only serves to artificially prolong the dying process.`,
          data.painReliefDirective === "maximum_comfort"
            ? `I direct that I be provided with intensive palliative care and all medication necessary to alleviate pain and suffering, even if such medication unintentionally suppresses respiration or hastens the moment of death.`
            : `I direct that standard pain medication be administered to maintain comfort without unnecessary risk.`,
        ],
      },
      {
        title: "3. HIPAA Authorization & Medical Information Disclosure",
        type: "body",
        paragraphs: [
          `I intend for my designated healthcare agent to be treated as my personal representative under the Health Insurance Portability and Accountability Act of 1996 (HIPAA, 45 C.F.R. Section 164.502(g)). I authorize any physician, healthcare provider, hospital, or insurance carrier to disclose all protected health information, medical charts, and billing records to my agent immediately upon request.`,
        ],
      },
      {
        title: "4. Anatomical Gift / Organ Donation Declaration",
        type: "body",
        paragraphs: [
          data.organDonation === "none"
            ? `I do not authorize any anatomical gift or organ donation upon my death.`
            : `Upon my death, I hereby authorize the anatomical donation of any needed organs, tissues, or parts for transplantation, therapy, or medical education.`,
        ],
      },
      {
        title: "5. Revocation of Prior Directives",
        type: "body",
        paragraphs: [
          `I hereby revoke any prior advance directives, living wills, or medical powers of attorney executed by me. This directive shall remain in full force and effect until expressly revoked by me in writing.`,
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
