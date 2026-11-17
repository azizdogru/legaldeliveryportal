import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const cateringEventContractConfig: DocumentConfig = {
  id: "catering-event-contract",
  slug: "catering-event-contract",
  title: "Event Catering Agreement (Food Service & Deposit Terms)",
  shortTitle: "Catering Event Contract",
  category: "Contracts & Releases",
  description: "Professional event food and beverage catering contract establishing guest headcount guarantees, customized menu selections, bar service, non-refundable retainer deposits, allergy disclosures, and cancellation liquidated damages.",
  metaDescription: "Create an official Event Catering Contract. Covers menu specifications, guest headcount guarantee, non-refundable deposits, and cancellation terms across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Event Food Service",
  iconName: "Utensils",
  searchKeywords: [
    "event catering agreement template",
    "food service catering contract pdf",
    "wedding catering contract template",
    "catering deposit cancellation agreement",
    "catering guest headcount guarantee form",
    "private chef and banquet contract",
  ],
  features: [
    "Establishes binding guaranteed guest headcount lock deadline (e.g., 14 days prior to event)",
    "Itemizes menu courses, cocktail hour hors d'oeuvres, bar beverage service, and serving staff ratios",
    "Enforces non-refundable retainer deposit and phased milestone payment schedule",
    "Includes food allergy disclaimers, health department food safety limits, and cancellation formulas",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "IL",
    catererName: "Artisan Culinary Experiences, LLC",
    catererAddress: "800 North Michigan Avenue, Suite 1200, Chicago, IL 60611",
    clientName: "David Sterling & Katherine Holmes",
    clientAddress: "1420 Lake Shore Drive, Apt 18B, Chicago, IL 60610",
    eventDate: new Date(Date.now() + 60 * 86400000).toISOString().split("T")[0],
    eventVenue: "The Grand Ballroom at Symphony Center, 220 South Michigan Avenue, Chicago, IL 60604",
    guestCountGuarantee: "150",
    menuDescription: "Four-course plated dinner service: artisanal burrata salad, prime filet mignon or Chilean sea bass, truffle mashed potatoes, and dessert trio bar.",
    totalContractPrice: "18500.00",
    depositAmount: "5000.00",
    finalPaymentDeadlineDays: "14",
  },
  steps: [
    {
      id: "catering_parties",
      title: "Caterer & Client Information",
      description: "Enter identifying details for the catering company and the event host/client.",
      fields: [
        {
          name: "catererName",
          label: "Catering Company Legal Business Name",
          type: "text",
          placeholder: "e.g., Artisan Culinary Experiences, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "catererAddress",
          label: "Caterer Kitchen / Business Address",
          type: "text",
          placeholder: "e.g., 800 North Michigan Avenue, Suite 1200, Chicago, IL 60611",
          required: true,
          gridCols: 2,
        },
        {
          name: "clientName",
          label: "Client / Event Host Full Name(s)",
          type: "text",
          placeholder: "e.g., David Sterling & Katherine Holmes",
          required: true,
          gridCols: 2,
        },
        {
          name: "clientAddress",
          label: "Client Residential / Billing Address",
          type: "text",
          placeholder: "e.g., 1420 Lake Shore Drive, Apt 18B, Chicago, IL 60610",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "event_terms",
      title: "Event Venue, Menu & Financials",
      description: "Specify event date, venue location, guest headcount, menu, and payment terms.",
      fields: [
        {
          name: "eventDate",
          label: "Date of Scheduled Event",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "eventVenue",
          label: "Event Venue Name & Street Address",
          type: "text",
          placeholder: "e.g., The Grand Ballroom, 220 South Michigan Avenue, Chicago, IL",
          required: true,
          gridCols: 2,
        },
        {
          name: "guestCountGuarantee",
          label: "Guaranteed Minimum Guest Headcount",
          type: "text",
          placeholder: "e.g., 150",
          required: true,
          gridCols: 2,
        },
        {
          name: "totalContractPrice",
          label: "Total Estimated Catering Contract Sum ($ USD)",
          type: "currency",
          placeholder: "e.g., 18500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "depositAmount",
          label: "Non-Refundable Initial Retainer Deposit ($ USD)",
          type: "currency",
          placeholder: "e.g., 5000.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "finalPaymentDeadlineDays",
          label: "Final Balance Due Deadline (Days Prior to Event)",
          type: "text",
          placeholder: "e.g., 14 (along with locked headcount)",
          required: true,
          gridCols: 2,
        },
        {
          name: "menuDescription",
          label: "Menu Courses & Beverage Service Scope",
          type: "textarea",
          placeholder: "Detail courses, cocktail appetizers, entrees, desserts, and bar packages...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Agreement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const caterer = data.catererName || "Catering Company";
    const client = data.clientName || "Event Client";
    const total = parseFloat(data.totalContractPrice || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const deposit = parseFloat(data.depositAmount || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const guests = data.guestCountGuarantee || "100";
    const eventDate = data.eventDate || "Scheduled Date";
    const statuteCite = statute?.statuteCitation || "Uniform Commercial Code Article 2 & Commercial Hospitality Contract Standards";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: "PROFESSIONAL EVENT CATERING CONTRACT" },
          { label: "CATERER / VENDOR", value: `${caterer}` },
          { label: "CLIENT / HOST", value: `${client}` },
          { label: "EVENT DATE & TIME", value: `${eventDate}` },
          { label: "EVENT VENUE", value: `${data.eventVenue || "Venue on file"}` },
          { label: "MINIMUM GUEST COUNT", value: `${guests} Guaranteed Guests` },
          { label: "TOTAL ESTIMATED PRICE", value: `$${total} USD (Deposit: $${deposit} USD)` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Food Service Scope & Menu Deliverables",
        type: "body",
        paragraphs: [
          `THIS EVENT CATERING AGREEMENT is entered into as of ${data.noticeDate || "the date of execution"}, by and between ${caterer} ("Caterer") and ${client} ("Client").`,
          `Services: Caterer agrees to provide food preparation, culinary service staff, and banquet presentation for the event taking place on ${eventDate} at ${data.eventVenue || "the designated venue"}.`,
          `Menu Specifications: Caterer shall prepare and serve the agreed menu: "${data.menuDescription || "Catering menu as agreed in event banquet order"}" for a minimum guaranteed guest count of ${guests} attendees.`,
        ],
      },
      {
        title: "2. Headcount Guarantee & Final Balance Schedule",
        type: "body",
        paragraphs: [
          `Guest Guarantee: Client must notify Caterer in writing of the final locked guest count no later than ${data.finalPaymentDeadlineDays || "14"} calendar days prior to the event date. This figure shall constitute the binding minimum headcount for food purchase and billing purposes. If actual attendance exceeds the guarantee, Client shall pay the agreed per-person surcharge.`,
          `Payment Terms: Client shall pay the non-refundable initial deposit of $${deposit} USD upon execution of this Agreement to secure the calendar date. The remaining balance shall be paid in full no later than ${data.finalPaymentDeadlineDays || "14"} days prior to the event date.`,
        ],
      },
      {
        title: "3. Cancellation Liquidated Damages & Food Safety",
        type: "body",
        paragraphs: [
          `Cancellation: Because Caterer reserves kitchen prep time, orders perishable provisions, and turns away competing booking requests, the initial deposit is strictly NON-REFUNDABLE. If Client cancels within 30 days of the event, Client shall be liable for 50% of the total contract price; cancellations within 14 days require payment of 100% of the contract total.`,
          `Food Safety: In compliance with state public health department regulations, Caterer cannot permit remaining unconsumed perishable food to be packaged for take-home consumption by guests following the event conclusion.`,
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
