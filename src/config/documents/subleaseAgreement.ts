import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const subleaseAgreementConfig: DocumentConfig = {
  id: "sublease-agreement",
  slug: "sublease-agreement",
  title: "Residential Sublease Agreement (Sublet Contract)",
  shortTitle: "Sublease Agreement",
  category: "Landlord & Tenant",
  description: "Formal sublease contract allowing a prime tenant (sublessor) to sublet residential real estate or an individual room to a subtenant, incorporating master lease covenants and landlord written consent.",
  metaDescription: "Generate a state-compliant Residential Sublease Agreement. Legally binds subtenant to master lease terms, security deposits, and landlord consent rules for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Master Lease Rider",
  iconName: "FileCheck",
  searchKeywords: [
    "residential sublease agreement template",
    "sublet contract form pdf",
    "apartment sublease agreement",
    "room sublet lease contract",
    "master lease sublet addendum",
    "college summer sublease agreement",
  ],
  features: [
    "Incorporates all covenants and restrictions of the prime master lease agreement",
    "Protects original sublessor against unpaid subtenant rent and property damage",
    "Specifies separate sublet security deposit holding and refund accounting",
    "Includes formal Landlord Consent Rider ensuring full statutory enforceability",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    sublessorName: "",
    sublessorAddress: "",
    subtenantName: "",
    subtenantPhone: "",
    landlordName: "",
    premisesAddress: "",
    subleasedArea: "Entire apartment unit including private parking space",
    subleaseStartDate: new Date().toISOString().split("T")[0],
    subleaseEndDate: "",
    subleaseRent: "1800.00",
    rentDueDay: "1st of each month",
    securityDeposit: "1800.00",
    utilitiesPolicy: "Subtenant pays 100% of electric, gas, and internet; Sublessor pays water and trash.",
    landlordConsentObtained: "yes",
  },
  steps: [
    {
      id: "parties_premises",
      title: "Sublessor, Subtenant & Premises",
      description: "Enter identifying details for the original tenant, subtenant, landlord, and property.",
      fields: [
        {
          name: "sublessorName",
          label: "Current Prime Tenant (Sublessor) Legal Name",
          type: "text",
          placeholder: "e.g., Emily Richardson",
          required: true,
          gridCols: 2,
        },
        {
          name: "sublessorAddress",
          label: "Sublessor Forwarding / Notice Address",
          type: "text",
          placeholder: "e.g., 500 Market Street, Suite 400, San Francisco, CA 94105",
          required: true,
          gridCols: 2,
        },
        {
          name: "subtenantName",
          label: "New Subtenant Legal Name",
          type: "text",
          placeholder: "e.g., Lucas Bennett",
          required: true,
          gridCols: 2,
        },
        {
          name: "subtenantPhone",
          label: "Subtenant Phone Number",
          type: "text",
          placeholder: "e.g., (555) 678-9012",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordName",
          label: "Master Landlord / Property Management Company",
          type: "text",
          placeholder: "e.g., Bay Area Urban Housing LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "premisesAddress",
          label: "Leased Premises Physical Address",
          type: "text",
          placeholder: "e.g., 750 Mission Street, Apt 14E, San Francisco, CA 94103",
          required: true,
          gridCols: 1,
        },
        {
          name: "subleasedArea",
          label: "Description of Subleased Space",
          type: "text",
          placeholder: "e.g., Entire 1-bedroom apartment, or Private Master Bedroom with shared kitchen",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "term_finances",
      title: "Sublease Term & Rent",
      description: "Specify sublet dates, monthly rent, and security deposit.",
      fields: [
        {
          name: "subleaseStartDate",
          label: "Sublease Start Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "subleaseEndDate",
          label: "Sublease End Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "subleaseRent",
          label: "Monthly Sublease Rent ($ USD)",
          type: "currency",
          placeholder: "e.g., 1800.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "securityDeposit",
          label: "Sublease Security Deposit ($ USD)",
          type: "currency",
          placeholder: "e.g., 1800.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "rentDueDay",
          label: "Rent Due Calendar Day",
          type: "text",
          placeholder: "e.g., 1st day of each month",
          required: true,
          gridCols: 2,
        },
        {
          name: "landlordConsentObtained",
          label: "Has Landlord Granted Written Consent to Sublease?",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Yes - Landlord has consented or consent attached", value: "yes" },
            { label: "Pending - Subject to landlord formal execution below", value: "pending" },
          ],
        },
        {
          name: "utilitiesPolicy",
          label: "Utility & Internet Payment Terms",
          type: "text",
          placeholder: "e.g., Subtenant pays electricity, gas, internet directly or reimburses sublessor",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date Agreement Signed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const sublessor = data.sublessorName || "Sublessor (Prime Tenant)";
    const subtenant = data.subtenantName || "Subtenant";
    const landlord = data.landlordName || "Master Landlord";
    const rent = parseFloat(data.subleaseRent || "0").toFixed(2);
    const deposit = parseFloat(data.securityDeposit || "0").toFixed(2);
    const premises = data.premisesAddress || "the premises";
    const statuteCite = statute?.statuteCitation || "State Residential Landlord and Tenant Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CONTRACT TYPE", value: "RESIDENTIAL SUBLEASE AGREEMENT" },
          { label: "SUBLESSOR (PRIME TENANT)", value: `${sublessor}, ${data.sublessorAddress || ""}` },
          { label: "SUBTENANT", value: `${subtenant} (Phone: ${data.subtenantPhone || "On File"})` },
          { label: "MASTER LANDLORD", value: `${landlord}` },
          { label: "PREMISES & AREA", value: `${premises} (${data.subleasedArea || "Entire Dwelling"})` },
          { label: "SUBLEASE TERM", value: `${data.subleaseStartDate || "Start"} through ${data.subleaseEndDate || "End"}` },
          { label: "MONTHLY RENT & DEPOSIT", value: `$${rent} USD/month (Due: ${data.rentDueDay || "1st"}) | Deposit: $${deposit} USD` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Recitals & Incorporation of Master Lease",
        type: "body",
        paragraphs: [
          `THIS SUBLEASE AGREEMENT is entered into on ${data.noticeDate || "the date of execution"}, by and between Sublessor ${sublessor} and Subtenant ${subtenant}.`,
          `Sublessor currently leases the residential real property located at ${premises} pursuant to an underlying Master Lease with Landlord ${landlord}. A complete and accurate copy of the Master Lease has been delivered to and examined by Subtenant.`,
          `Subtenant expressly agrees that this Sublease is subordinate in all respects to the Master Lease. Subtenant covenants to perform and abide by all rules, restrictions, and obligations required of the tenant under the Master Lease. Subtenant shall not commit any act or omission that would constitute a default under the Master Lease.`,
        ],
      },
      {
        title: "2. Term of Sublease, Rent & Utilities",
        type: "body",
        paragraphs: [
          `Sublease Term: The sublease term shall commence on ${data.subleaseStartDate || "commencement date"} and terminate automatically on ${data.subleaseEndDate || "termination date"} without necessity of further notice, unless terminated earlier in accordance with law.`,
          `Rent: Subtenant agrees to pay Sublessor monthly rent of $${rent} USD on or before the ${data.rentDueDay || "1st day of each month"}. Failure to pay rent within five (5) days of due date authorizes Sublessor to serve statutory notice to cure or quit.`,
          `Utilities: Utilities and operating expenses shall be allocated as follows: "${data.utilitiesPolicy || "Subtenant pays all operating utilities"}".`,
        ],
      },
      {
        title: "3. Sublease Security Deposit & Condition of Premises",
        type: "body",
        paragraphs: [
          `Subtenant has deposited with Sublessor the sum of $${deposit} USD as security for faithful performance of all covenants herein. Sublessor shall hold and account for this deposit in accordance with ${statute?.stateName || "state"} statutory deposit refund laws.`,
          `Within the statutory timeframe following surrender, Sublessor shall return the deposit less lawful deductions for unpaid rent, necessary repairs beyond normal wear and tear, or contractual default.`,
          `Subtenant acknowledges inspecting the premises and accepts them in good, clean, and tenantable condition. Subtenant agrees to surrender the premises in substantially the same condition upon term expiration.`,
        ],
      },
      {
        title: "4. Indemnification & Master Landlord Consent",
        type: "body",
        paragraphs: [
          `Subtenant agrees to indemnify, defend, and hold harmless Sublessor and Master Landlord from and against any claims, liabilities, damages, fines, or losses arising from Subtenant's occupancy, acts, or breaches.`,
          `Enforceability of this agreement is contingent upon written consent of Master Landlord where required by the terms of the Master Lease.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
      {
        title: "Master Landlord Consent Endorsement",
        type: "body",
        paragraphs: [
          `The undersigned Master Landlord / Property Manager hereby acknowledges and consents to the sublease of the designated premises by Sublessor to Subtenant under the terms set forth above, without releasing Sublessor from prime lease liabilities.`,
          `Landlord Signature: _________________________________________ Date: ____________________`,
        ],
      },
    ];
  },
};
