import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const independentContractorAgreementConfig: DocumentConfig = {
  id: "independent-contractor-agreement",
  slug: "independent-contractor-agreement",
  title: "Independent Contractor Agreement (1099 Service Contract)",
  shortTitle: "Independent Contractor Agreement",
  category: "Business & Employment",
  description: "Comprehensive 1099 independent contractor agreement structured to satisfy the IRS 20-factor classification guidelines and state ABC tests, including intellectual property assignment, confidentiality, and tax indemnity.",
  metaDescription: "Draft a compliant Independent Contractor Agreement. Protects against worker misclassification under IRS 20-factor and state ABC tests. Instant PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "IRS & AB-5 Ready",
  iconName: "Briefcase",
  searchKeywords: [
    "independent contractor agreement template",
    "1099 service contract form",
    "california ab5 contractor agreement",
    "freelance consulting agreement",
    "subcontractor contract template",
    "work made for hire agreement",
  ],
  features: [
    "Structured to satisfy IRS 20-factor guidelines and state ABC classification tests",
    "Includes comprehensive intellectual property work-for-hire assignment clauses",
    "Protects proprietary trade secrets with reciprocal non-disclosure covenants",
    "Explicit contractor self-employment tax indemnification and insurance warranties",
  ],
  defaultValues: {
    effectiveDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    clientName: "",
    clientAddress: "",
    clientEntityType: "Corporation or LLC",
    contractorName: "",
    contractorAddress: "",
    contractorEntityType: "Sole Proprietor or LLC",
    servicesDescription: "Professional consulting, specialized technical deliverables, and strategic development services.",
    compensationType: "hourly",
    rateAmount: "85.00",
    paymentTerms: "Net 15 calendar days upon receipt of itemized invoice",
    equipmentProvision: "contractor",
    ipAssignment: "yes",
    terminationNoticeDays: "14",
    noticeDate: new Date().toISOString().split("T")[0],
  },
  steps: [
    {
      id: "parties",
      title: "Contracting Parties",
      description: "Enter identifying details for the hiring company and the independent contractor.",
      fields: [
        {
          name: "clientName",
          label: "Hiring Client / Company Name",
          type: "text",
          placeholder: "e.g., Summit Innovations LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "clientAddress",
          label: "Client Principal Business Address",
          type: "text",
          placeholder: "e.g., 500 Financial Plaza, Suite 400, Los Angeles, CA 90071",
          required: true,
          gridCols: 1,
        },
        {
          name: "clientEntityType",
          label: "Client Entity Structure",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Limited Liability Company (LLC)", value: "Limited Liability Company (LLC)" },
            { label: "Corporation (C-Corp / S-Corp)", value: "Corporation" },
            { label: "Individual / Sole Proprietor", value: "Individual" },
            { label: "General Partnership", value: "Partnership" },
          ],
        },
        {
          name: "contractorEntityType",
          label: "Contractor Business Structure",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Independent Sole Proprietor (1099)", value: "Sole Proprietor" },
            { label: "Single-Member LLC", value: "Single-Member LLC" },
            { label: "Corporate Contractor", value: "Corporate Contractor" },
            { label: "Professional Partnership", value: "Partnership" },
          ],
        },
        {
          name: "contractorName",
          label: "Independent Contractor Name / Trade Name",
          type: "text",
          placeholder: "e.g., David Miller Consulting",
          required: true,
          gridCols: 1,
        },
        {
          name: "contractorAddress",
          label: "Contractor Business Address",
          type: "text",
          placeholder: "e.g., 1420 Sunset Boulevard, Suite 12, Los Angeles, CA 90028",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "scope_compensation",
      title: "Scope of Services & Compensation",
      description: "Define the specific deliverables, rate structure, and invoicing schedule.",
      fields: [
        {
          name: "servicesDescription",
          label: "Detailed Description of Services & Deliverables",
          type: "textarea",
          placeholder: "Specify project milestones, software deliverables, advisory duties, and measurable outputs...",
          required: true,
        },
        {
          name: "compensationType",
          label: "Fee Structure",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Hourly Professional Rate", value: "hourly" },
            { label: "Fixed Project Milestone Fee", value: "fixed_project" },
            { label: "Monthly Retainer", value: "monthly_retainer" },
          ],
        },
        {
          name: "rateAmount",
          label: "Rate / Compensation Amount ($ USD)",
          type: "currency",
          placeholder: "e.g., 85.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "paymentTerms",
          label: "Invoice Payment Terms",
          type: "select",
          required: true,
          options: [
            { label: "Net 15 calendar days from invoice receipt", value: "Net 15 calendar days upon receipt of itemized invoice" },
            { label: "Net 30 calendar days from invoice receipt", value: "Net 30 calendar days upon receipt of itemized invoice" },
            { label: "Due immediately upon milestone completion", value: "Immediate payment upon verified milestone delivery" },
            { label: "Bi-weekly regular invoicing cycle", value: "Bi-weekly payment on alternate Fridays" },
          ],
        },
      ],
    },
    {
      id: "classification_terms",
      title: "Classification Terms & Delivery",
      description: "Establish ABC test compliance, intellectual property rights, and termination.",
      fields: [
        {
          name: "equipmentProvision",
          label: "Tools & Equipment Provision",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Contractor provides all tools, computers, and equipment", value: "contractor" },
            { label: "Client provides specialized secure access credentials only", value: "client_access_only" },
          ],
        },
        {
          name: "ipAssignment",
          label: "Intellectual Property Ownership",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Complete Work-for-Hire Assignment to Client", value: "yes" },
            { label: "Contractor retains pre-existing tools with client license", value: "licensed" },
          ],
        },
        {
          name: "terminationNoticeDays",
          label: "Termination Without Cause Notice Window",
          type: "select",
          required: true,
          options: [
            { label: "14 Calendar Days Written Notice", value: "14" },
            { label: "30 Calendar Days Written Notice", value: "30" },
            { label: "7 Calendar Days Written Notice", value: "7" },
            { label: "Immediate upon written notice", value: "immediate" },
          ],
        },
        {
          name: "noticeDate",
          label: "Effective Agreement Date",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const client = data.clientName || "Client";
    const contractor = data.contractorName || "Contractor";
    const rate = parseFloat(data.rateAmount || "0").toFixed(2);
    const statuteCite = statute?.statuteCitation || "Applicable State Labor & Contract Law";
    const noticePeriod = data.terminationNoticeDays === "immediate" ? "immediate written notice" : `${data.terminationNoticeDays || "14"} calendar days written notice`;

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "HIRING CLIENT", value: `${client}, ${data.clientAddress || ""} (${data.clientEntityType || "Entity"})` },
          { label: "INDEPENDENT CONTRACTOR", value: `${contractor}, ${data.contractorAddress || ""} (${data.contractorEntityType || "Contractor"})` },
          { label: "COMPENSATION STRUCTURE", value: `$${rate} USD (${data.compensationType || "hourly"}) - ${data.paymentTerms || "Net 15"}` },
          { label: "TERMINATION NOTICE", value: `${noticePeriod}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Independent Contractor Classification & ABC Test Compliance",
        type: "body",
        paragraphs: [
          `THIS INDEPENDENT CONTRACTOR AGREEMENT is made effective on ${data.noticeDate || "the date of execution"}, by and between ${client} ("Client") and ${contractor} ("Contractor").`,
          `The parties intend that Contractor shall act strictly as an independent contractor under Section 530 of the Revenue Act of 1978, the IRS 20-Factor Common Law Standard, and state statutory ABC tests. Contractor is not an employee, agent, joint venturer, or partner of Client.`,
          `In accordance with statutory standards: (a) Contractor is free from Client direction and control in the manner and means of performing the services; (b) Contractor performs work outside the usual course of Client's core daily operations; and (c) Contractor is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed.`,
          `Contractor shall determine the methods, details, and specific manner of executing the services, retaining complete discretion over scheduling and location.`,
        ],
      },
      {
        title: "2. Scope of Services & Deliverables",
        type: "body",
        paragraphs: [
          `Contractor agrees to perform the following specialized professional services for Client:`,
          `"${data.servicesDescription || "Professional consulting and technical deliverables as requested by Client."}"`,
          `Contractor warrants that all work product delivered hereunder shall be performed in a professional, workmanlike manner conforming to commercially reasonable standards of the applicable industry.`,
        ],
      },
      {
        title: "3. Compensation, Invoicing & Tax Indemnification",
        type: "body",
        paragraphs: [
          `Client shall pay Contractor the agreed compensation rate of $${rate} USD pursuant to the following schedule: ${data.paymentTerms || "Net 15 calendar days from verified invoice"}.`,
          `Contractor acknowledges and agrees that Client will not withhold or pay any federal, state, or local income taxes, FICA, FUTA, state disability insurance, or workers compensation premiums. Contractor assumes sole, exclusive responsibility for reporting and paying all self-employment, excise, and income taxes on payments received hereunder.`,
          `Contractor agrees to defend, indemnify, and hold Client harmless from any claims, assessments, penalties, or interest asserted by taxing authorities or labor agencies arising from Contractor's tax status or classification.`,
        ],
      },
      {
        title: "4. Work Made for Hire & Intellectual Property Assignment",
        type: "body",
        paragraphs: [
          data.ipAssignment === "yes"
            ? `All copyrights, patents, trade secrets, trademarks, inventions, designs, and work product developed or delivered by Contractor in the performance of services under this Agreement shall be deemed a "work made for hire" owned exclusively by Client from creation. To the extent any work product is deemed not to be a work made for hire, Contractor hereby irrevocably assigns and transfers to Client all right, title, and interest therein worldwide.`
            : `Contractor grants Client an irrevocable, non-exclusive, perpetual, royalty-free license to use, reproduce, and incorporate all work product delivered hereunder for Client's internal business operations.`,
        ],
      },
      {
        title: "5. Confidentiality & Non-Disclosure",
        type: "body",
        paragraphs: [
          `Contractor shall keep confidential all non-public technical, commercial, financial, and strategic information disclosed by Client. Contractor shall not disclose or use any confidential information for any purpose other than performing the services contracted herein, both during the term of this Agreement and perpetually thereafter.`,
        ],
      },
      {
        title: "6. Term & Termination",
        type: "body",
        paragraphs: [
          `Either party may terminate this Agreement without cause upon ${noticePeriod}. Either party may terminate immediately upon written notice in the event of a material breach by the other party that remains uncured after 5 business days.`,
          `Upon termination, Client shall pay Contractor for all services satisfactorily completed prior to the effective termination date.`,
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
