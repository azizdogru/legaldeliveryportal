import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const noticeOfIntentToVacateConfig: DocumentConfig = {
  id: "notice-of-intent-to-vacate",
  slug: "notice-of-intent-to-vacate",
  title: "Tenant Notice of Intent to Vacate (30/60 Day Notice)",
  shortTitle: "Notice of Intent to Vacate",
  category: "Landlord & Tenant",
  description: "Formal written notice from tenant to landlord terminating a periodic tenancy or fixed lease at term expiration, requesting pre-move inspection and providing forwarding address for security deposit refund.",
  metaDescription: "Generate a formal Tenant Notice of Intent to Vacate. Compliant with 30-day and 60-day state statutory tenancy termination laws and deposit accounting requirements for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Tenant Lease Termination",
  iconName: "LogOut",
  searchKeywords: [
    "notice of intent to vacate template",
    "30 day notice to vacate tenant to landlord",
    "60 day notice moving out letter",
    "tenant lease termination letter",
    "security deposit forwarding address letter",
    "apartment move out notice pdf",
  ],
  features: [
    "Meets state statutory notice requirements for month-to-month and fixed-lease expirations",
    "Formal demand for statutory pre-move walkthrough inspection pursuant to state law",
    "Designates formal forwarding address for mandatory security deposit itemization and refund",
    "Preserves tenant rights to statutory deposit refund penalties (2x/3x deposit amount)",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    tenantNames: "",
    tenantPhone: "",
    tenantEmail: "",
    landlordName: "",
    landlordAddress: "",
    rentalAddress: "",
    unitNumber: "",
    vacateDate: "",
    noticePeriodType: "30_day",
    forwardingAddress: "",
    inspectionRequested: "yes",
    preferredInspectionDate: "",
  },
  steps: [
    {
      id: "parties_property",
      title: "Parties & Tenancy",
      description: "Enter your contact details and the landlord information.",
      fields: [
        {
          name: "tenantNames",
          label: "Tenant Full Legal Name(s)",
          type: "text",
          placeholder: "e.g., Jennifer Lawrence and David Miller",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantPhone",
          label: "Tenant Phone Number",
          type: "text",
          placeholder: "e.g., (555) 234-5678",
          required: true,
          gridCols: 2,
        },
        {
          name: "tenantEmail",
          label: "Tenant Email Address",
          type: "email",
          placeholder: "e.g., tenant@example.com",
          required: true,
          gridCols: 2,
        },
        {
          name: "rentalAddress",
          label: "Rental Property Physical Address",
          type: "text",
          placeholder: "e.g., 850 Ocean Avenue, Apt 4B, Santa Monica, CA 90403",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordName",
          label: "Landlord / Property Manager Name",
          type: "text",
          placeholder: "e.g., Pacific Coast Rentals Inc.",
          required: true,
          gridCols: 1,
        },
        {
          name: "landlordAddress",
          label: "Landlord Notice Delivery Address",
          type: "text",
          placeholder: "e.g., 100 Wilshire Blvd, Suite 200, Santa Monica, CA 90401",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "vacate_details",
      title: "Move-Out & Inspection Dates",
      description: "Specify your planned surrender date, notice timeline, and inspection preferences.",
      fields: [
        {
          name: "noticePeriodType",
          label: "Statutory Notice Period",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "30-Day Notice (Standard Periodic Tenancy)", value: "30_day" },
            { label: "60-Day Notice (Extended Tenancy / Leases Over 1 Year)", value: "60_day" },
            { label: "End of Fixed Lease Term Expiration", value: "lease_expiration" },
          ],
        },
        {
          name: "vacateDate",
          label: "Official Date of Surrender & Move-Out",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "inspectionRequested",
          label: "Request Pre-Move-Out Joint Walkthrough Inspection?",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Yes - Request joint inspection with itemized repair opportunity", value: "yes" },
            { label: "No - Waive initial joint walkthrough inspection", value: "no" },
          ],
        },
        {
          name: "preferredInspectionDate",
          label: "Preferred Inspection Window (Optional)",
          type: "text",
          placeholder: "e.g., Within 2 weeks prior to surrender date during weekday business hours",
          required: false,
          gridCols: 2,
        },
        {
          name: "forwardingAddress",
          label: "Forwarding Address for Security Deposit Refund",
          type: "text",
          placeholder: "e.g., 1400 Grand Avenue, Unit 12, Denver, CO 80202",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Notice Signed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const tenant = data.tenantNames || "Tenant";
    const landlord = data.landlordName || "Landlord";
    const premises = data.rentalAddress || "the rental premises";
    const vacateDate = data.vacateDate || "the stated surrender date";
    const forwarding = data.forwardingAddress || "To be provided in writing";
    const noticeType = data.noticePeriodType === "60_day" ? "60-Day" : "30-Day";
    const statuteCite = statute?.statuteCitation || "State Residential Landlord and Tenant Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "NOTICE DOCUMENT", value: `TENANT ${noticeType.toUpperCase()} NOTICE OF INTENT TO VACATE` },
          { label: "FROM TENANT(S)", value: `${tenant} (Phone: ${data.tenantPhone || "On File"} | Email: ${data.tenantEmail || "On File"})` },
          { label: "TO LANDLORD", value: `${landlord}, ${data.landlordAddress || ""}` },
          { label: "RENTAL DWELLING", value: `${premises}` },
          { label: "EFFECTIVE SURRENDER DATE", value: `${vacateDate}` },
          { label: "FORWARDING ADDRESS", value: `${forwarding}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Formal Notice of Tenancy Termination",
        type: "body",
        paragraphs: [
          `PLEASE TAKE NOTICE that tenant ${tenant} hereby gives formal written notice to landlord ${landlord} of intention to terminate tenancy and vacate the premises located at ${premises} on or before ${vacateDate}.`,
          `This notice satisfies all statutory and contractual notice prerequisites under ${statute?.stateName || "state"} law and the governing rental agreement. On or before the stated vacate date, Tenant will remove all personal property, clean the premises, and surrender all door keys, parking remotes, and access fobs.`,
        ],
      },
      {
        title: "2. Request for Statutory Pre-Move Walkthrough Inspection",
        type: "body",
        paragraphs: [
          data.inspectionRequested === "yes"
            ? `Pursuant to state statutory tenant rights, Tenant formally requests a joint pre-move-out walkthrough inspection during the two weeks preceding the surrender date. Please contact Tenant immediately to confirm a mutually convenient inspection time. The purpose of this walkthrough is to identify any conditions alleged to exceed normal wear and tear and provide Tenant an opportunity to rectify them before surrender.`
            : `Tenant elects to surrender the premises on the scheduled date without requesting a formal pre-move preliminary walkthrough inspection.`,
        ],
      },
      {
        title: "3. Forwarding Address & Security Deposit Accounting Demand",
        type: "body",
        paragraphs: [
          `Tenant's official forwarding address for all future legal notices and for the transmission of the security deposit refund is: ${forwarding}.`,
          `Pursuant to ${statuteCite}, Landlord is required within the statutory deadline following vacancy to remit the full security deposit refund, together with a detailed written itemization and receipts for any lawful deductions. Failure to comply within the statutory timeframe forfeits Landlord right to retain any portion of the deposit and may subject Landlord to statutory treble damages and attorney fees in ${statute?.courtJurisdiction || "court"}.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        title: "Certificate of Mailing / Service Verification",
        type: "body",
        paragraphs: [
          `I certify that on ${data.noticeDate || "the date below"}, a true and complete copy of this Notice of Intent to Vacate was delivered to Landlord via First-Class Mail or Certified Mail Return Receipt Requested to the designated landlord address.`,
        ],
      },
    ];
  },
};
