import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const roommateAgreementConfig: DocumentConfig = {
  id: "roommate-agreement",
  slug: "roommate-agreement",
  title: "Roommate Agreement (Co-Tenant Living Rules)",
  shortTitle: "Roommate Agreement",
  category: "Landlord & Tenant",
  description: "Legally enforceable co-tenant contract dividing rent obligations, utility expenses, chore rotations, quiet hours, overnight guest limits, and security deposit refunds among roommates sharing a dwelling.",
  metaDescription: "Create a customized Roommate Agreement. Legally allocates rent shares, utility bills, chore duties, and deposit refunds among co-tenants for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Co-Tenant Contract",
  iconName: "Users",
  searchKeywords: [
    "roommate agreement template",
    "co tenant contract pdf",
    "room rental living agreement",
    "roommate chore and utility agreement",
    "split rent roommate contract",
    "college roommate agreement form",
  ],
  features: [
    "Itemizes individual monthly rent portions and utility bill split formulas (equal or percentage)",
    "Sets clear house rules regarding quiet hours, cleaning chores, and overnight guest limitations",
    "Protects individual security deposit shares and early termination / replacement roommate procedures",
    "Enforceable in local small claims court between co-tenants independently of the master landlord",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    roommate1Name: "",
    roommate1RentShare: "1200.00",
    roommate2Name: "",
    roommate2RentShare: "1200.00",
    additionalRoommates: "",
    premisesAddress: "",
    totalMonthlyRent: "2400.00",
    rentDueDay: "1st of each month",
    utilitySplitPolicy: "equal_split",
    quietHours: "10:00 PM to 7:00 AM on weekdays; 11:30 PM to 8:30 AM on weekends",
    guestPolicy: "Maximum 3 consecutive nights per guest and no more than 7 nights total in any calendar month without unanimous co-tenant consent.",
    chorePolicy: "Rotating weekly schedule for kitchen deep cleaning, trash removal, and common bathroom sanitation.",
    earlyDepartureNoticeDays: "30",
  },
  steps: [
    {
      id: "roommates_dwelling",
      title: "Co-Tenants & Dwelling",
      description: "Enter identifying details for the roommates and shared residential rental premises.",
      fields: [
        {
          name: "roommate1Name",
          label: "Roommate #1 Legal Name",
          type: "text",
          placeholder: "e.g., Alexander Cole",
          required: true,
          gridCols: 2,
        },
        {
          name: "roommate1RentShare",
          label: "Roommate #1 Monthly Rent Share ($ USD)",
          type: "currency",
          placeholder: "e.g., 1200.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "roommate2Name",
          label: "Roommate #2 Legal Name",
          type: "text",
          placeholder: "e.g., Jordan Taylor",
          required: true,
          gridCols: 2,
        },
        {
          name: "roommate2RentShare",
          label: "Roommate #2 Monthly Rent Share ($ USD)",
          type: "currency",
          placeholder: "e.g., 1200.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "additionalRoommates",
          label: "Additional Roommate Names & Shares (Optional)",
          type: "text",
          placeholder: "e.g., Roommate 3: Marcus Vance ($800.00/mo)",
          required: false,
          gridCols: 1,
        },
        {
          name: "premisesAddress",
          label: "Shared Rental Premises Address",
          type: "text",
          placeholder: "e.g., 2200 University Way NE, Apt 304, Seattle, WA 98105",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "finances_bills",
      title: "Rent & Utilities",
      description: "Define rent due dates, total rent, and how utility expenses are split.",
      fields: [
        {
          name: "totalMonthlyRent",
          label: "Total Master Monthly Rent ($ USD)",
          type: "currency",
          placeholder: "e.g., 2400.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "rentDueDay",
          label: "Rent Due Calendar Day",
          type: "text",
          placeholder: "e.g., 1st of every month (collected by 28th of prior month)",
          required: true,
          gridCols: 2,
        },
        {
          name: "utilitySplitPolicy",
          label: "Utility Bills Allocation Method",
          type: "select",
          required: true,
          gridCols: 1,
          options: [
            { label: "Divided Equally Among All Co-Tenants (Electricity, Gas, Water, WiFi)", value: "equal_split" },
            { label: "Proportional Split Based on Bedroom Square Footage", value: "proportional_split" },
            { label: "Fixed Monthly Utility Stipend per Roommate", value: "fixed_stipend" },
          ],
        },
      ],
    },
    {
      id: "house_rules",
      title: "House Rules & Early Departure",
      description: "Set rules for quiet hours, overnight guests, cleaning, and departure notice.",
      fields: [
        {
          name: "quietHours",
          label: "Agreed Quiet Hours",
          type: "text",
          placeholder: "e.g., 10:00 PM to 8:00 AM daily",
          required: true,
          gridCols: 1,
        },
        {
          name: "guestPolicy",
          label: "Overnight Guest Policy",
          type: "text",
          placeholder: "e.g., Maximum 3 consecutive nights; prior notice required",
          required: true,
          gridCols: 1,
        },
        {
          name: "chorePolicy",
          label: "Cleaning & Trash Responsibilities",
          type: "text",
          placeholder: "e.g., Common areas cleaned weekly on rotating basis",
          required: true,
          gridCols: 1,
        },
        {
          name: "earlyDepartureNoticeDays",
          label: "Advance Notice Required for Roommate Departure (Days)",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "30 Days Notice", value: "30" },
            { label: "60 Days Notice", value: "60" },
          ],
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
    const rm1 = data.roommate1Name || "Roommate 1";
    const rm2 = data.roommate2Name || "Roommate 2";
    const totalRent = parseFloat(data.totalMonthlyRent || "0").toFixed(2);
    const rm1Share = parseFloat(data.roommate1RentShare || "0").toFixed(2);
    const rm2Share = parseFloat(data.roommate2RentShare || "0").toFixed(2);
    const statuteCite = statute?.statuteCitation || "State Contract and Landlord-Tenant Law";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "CONTRACT TYPE", value: "CO-TENANT ROOMMATE AGREEMENT" },
          { label: "CO-TENANTS", value: `${rm1} ($${rm1Share}/mo) and ${rm2} ($${rm2Share}/mo)${data.additionalRoommates ? ` and ${data.additionalRoommates}` : ""}` },
          { label: "SHARED PREMISES", value: `${data.premisesAddress || "The rental residence"}` },
          { label: "TOTAL MASTER RENT", value: `$${totalRent} USD per month (Due: ${data.rentDueDay || "1st of month"})` },
          { label: "UTILITY ALLOCATION", value: data.utilitySplitPolicy === "equal_split" ? "Divided equally among all roommates" : "Proportional allocation" },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Purpose & Master Lease Acknowledgment",
        type: "body",
        paragraphs: [
          `THIS ROOMMATE AGREEMENT is entered into on ${data.noticeDate || "the date of execution"}, by and between the co-tenants named above residing at ${data.premisesAddress || "the premises"}.`,
          `All co-tenants acknowledge that they are joint signatories or lawful occupants under the underlying master residential lease agreement with the property owner. This contract establishes enforceable contractual obligations solely between the co-tenants regarding the division of expenses, shared responsibilities, and living conditions.`,
        ],
      },
      {
        title: "2. Monthly Rent & Utility Bill Allocation",
        type: "body",
        paragraphs: [
          `Rent Allocation: Total master monthly rent of $${totalRent} USD shall be paid timely to the landlord. Roommate 1 (${rm1}) agrees to pay $${rm1Share} USD and Roommate 2 (${rm2}) agrees to pay $${rm2Share} USD on or before the agreed due date: ${data.rentDueDay || "1st of each month"}.`,
          `Utilities & Internet: All monthly utility charges (electricity, gas, water, sewer, trash, high-speed internet, streaming services) shall be handled pursuant to policy: "${data.utilitySplitPolicy === "equal_split" ? "Divided equally among all co-tenants" : "Divided proportionally"}". Invoices must be reimbursed within seven (7) calendar days of receipt by the designated utility account manager.`,
        ],
      },
      {
        title: "3. House Rules, Chores & Overnight Guests",
        type: "body",
        paragraphs: [
          `Quiet Hours: All co-tenants agree to observe reasonable quiet hours: ${data.quietHours || "10:00 PM to 7:00 AM"}. Noise from music, televisions, or gatherings must be minimized during these hours.`,
          `Cleaning & Chores: Common living areas (kitchen, living room, hallways, shared bathrooms) shall be kept clean and clutter-free pursuant to policy: ${data.chorePolicy || "Rotating weekly chore schedule"}. Each roommate must clean their own dishes and cooking appliances immediately after meal preparation.`,
          `Overnight Guests: Guest visits must comply with rule: ${data.guestPolicy || "Maximum 3 consecutive nights without consent"}. No guest may take up permanent residence or receive mail at the premises without unanimous written consent of all co-tenants and landlord approval.`,
        ],
      },
      {
        title: "4. Early Move-Out, Security Deposits & Dispute Resolution",
        type: "body",
        paragraphs: [
          `Early Departure: If any roommate wishes to move out prior to master lease termination, that roommate must provide at least ${data.earlyDepartureNoticeDays || "30"} calendar days written notice and remain financially responsible for their rent and utility share until a qualified replacement roommate acceptable to all co-tenants and landlord is approved.`,
          `Security Deposit: Each roommate retains equity in the original security deposit in proportion to their contribution. Departed roommates will receive their deposit refund only after a replacement pays their deposit share or the master landlord releases the funds following lease termination.`,
          `Any breach of this agreement is subject to civil enforcement and recovery of unpaid rent, utility shares, and attorney fees in ${statute?.courtJurisdiction || "Small Claims Court"} (jurisdictional limit: $${statute?.courtJurisdiction ? "statutory limit" : "10,000"}).`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
    ];
  },
};
