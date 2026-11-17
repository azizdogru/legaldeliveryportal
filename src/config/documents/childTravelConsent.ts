import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const childTravelConsentConfig: DocumentConfig = {
  id: "child-travel-consent",
  slug: "child-travel-consent",
  title: "Child Travel Consent Form (Minor Domestic & International Travel)",
  shortTitle: "Child Travel Consent",
  category: "Family & Personal",
  description: "Official statutory child travel authorization letter permitting a minor to travel domestically or internationally with one parent, grandparents, school chaperones, or an airline, compliant with TSA and U.S. Customs and Border Protection (CBP) standards.",
  metaDescription: "Generate a state-compliant Minor Child Travel Consent Form. Meets TSA and CBP border requirements for domestic and international travel for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "TSA & CBP Compliant",
  iconName: "Plane",
  searchKeywords: [
    "child travel consent form template",
    "minor travel authorization letter pdf",
    "cbp minor travel consent letter",
    "single parent international travel consent",
    "grandparent child travel permission form",
    "notarized travel consent for child",
  ],
  features: [
    "Complies with U.S. Customs and Border Protection (CBP) and international border travel standards",
    "Permits minor to travel alone, with one parent, or with authorized third-party chaperones",
    "Includes granular travel itinerary, flight details, destination accommodations, and passport records",
    "Features emergency medical treatment consent authorization and formal Notary Jurat",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    consentingParentName: "",
    consentingParentAddress: "",
    consentingParentPhone: "",
    otherParentName: "",
    minorChildName: "",
    minorDateOfBirth: "",
    minorPassportNumber: "",
    travelCompanionName: "",
    travelCompanionRelationship: "Grandparent",
    travelCompanionPassport: "",
    travelDestination: "London, United Kingdom and Paris, France",
    departureDate: "",
    returnDate: "",
    emergencyMedicalAuthorized: "yes",
  },
  steps: [
    {
      id: "parents_minor",
      title: "Parents & Minor Child",
      description: "Enter identifying details for the consenting parent(s) and minor traveler.",
      fields: [
        {
          name: "consentingParentName",
          label: "Consenting Custodial Parent / Legal Guardian Name",
          type: "text",
          placeholder: "e.g., Jennifer Anne Miller",
          required: true,
          gridCols: 1,
        },
        {
          name: "consentingParentAddress",
          label: "Consenting Parent Legal Physical Address",
          type: "text",
          placeholder: "e.g., 500 South Beverly Drive, Beverly Hills, CA 90212",
          required: true,
          gridCols: 2,
        },
        {
          name: "consentingParentPhone",
          label: "Consenting Parent Emergency Contact Phone",
          type: "text",
          placeholder: "e.g., (555) 234-5678",
          required: true,
          gridCols: 2,
        },
        {
          name: "otherParentName",
          label: "Second Parent Legal Name (If Joint Custody)",
          type: "text",
          placeholder: "e.g., Robert David Miller (or leave blank if sole legal custody)",
          required: false,
          gridCols: 1,
        },
        {
          name: "minorChildName",
          label: "Minor Child Full Legal Name",
          type: "text",
          placeholder: "e.g., Ethan James Miller",
          required: true,
          gridCols: 1,
        },
        {
          name: "minorDateOfBirth",
          label: "Minor Child Date of Birth",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "minorPassportNumber",
          label: "Child US Passport / ID Number",
          type: "text",
          placeholder: "e.g., Passport # 123456789 or State ID",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "chaperone_itinerary",
      title: "Chaperone & Travel Itinerary",
      description: "Specify the accompanying adult, travel dates, and destination details.",
      fields: [
        {
          name: "travelCompanionName",
          label: "Accompanying Adult / Chaperone Full Legal Name",
          type: "text",
          placeholder: "e.g., Margaret Susan Miller (or Unaccompanied Minor Airline Service)",
          required: true,
          gridCols: 1,
        },
        {
          name: "travelCompanionRelationship",
          label: "Relationship to Child",
          type: "text",
          placeholder: "e.g., Grandparent, School Chaperone, Traveling Parent, Airline Escort",
          required: true,
          gridCols: 2,
        },
        {
          name: "travelCompanionPassport",
          label: "Chaperone Passport / Driver License #",
          type: "text",
          placeholder: "e.g., Passport # 987654321",
          required: false,
          gridCols: 2,
        },
        {
          name: "travelDestination",
          label: "Destination Cities & Countries",
          type: "text",
          placeholder: "e.g., Tokyo, Japan and Seoul, South Korea",
          required: true,
          gridCols: 1,
        },
        {
          name: "departureDate",
          label: "Departure Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "returnDate",
          label: "Anticipated Return Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "emergencyMedicalAuthorized",
          label: "Authorize Emergency Medical Consent During Trip?",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Yes - Full authority to consent to physician & surgical care", value: "yes" },
            { label: "Travel permission only (No medical authorization)", value: "no" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date Consent Executed",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const parent = data.consentingParentName || "Consenting Parent / Guardian";
    const child = data.minorChildName || "Minor Child";
    const companion = data.travelCompanionName || "Accompanying Adult";
    const statuteCite = statute?.statuteCitation || "U.S. Customs & Border Protection (CBP) Minor Travel Standards";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "TRAVEL DOCUMENT", value: "PARENTAL CONSENT LETTER FOR MINOR TRAVEL" },
          { label: "CONSENTING PARENT(S)", value: `${parent}${data.otherParentName ? ` and ${data.otherParentName}` : ""}` },
          { label: "PARENT CONTACT INFO", value: `Phone: ${data.consentingParentPhone || "On File"} | Address: ${data.consentingParentAddress || "On File"}` },
          { label: "MINOR CHILD", value: `${child} (DOB: ${data.minorDateOfBirth || "On Record"}, Passport: ${data.minorPassportNumber || "On Record"})` },
          { label: "ACCOMPANYING ADULT", value: `${companion} (${data.travelCompanionRelationship || "Chaperone"}, ID: ${data.travelCompanionPassport || "On File"})` },
          { label: "TRAVEL DATES & DESTINATION", value: `${data.travelDestination || "Destinations"} from ${data.departureDate || "Departure"} through ${data.returnDate || "Return"}` },
          { label: "GOVERNING STANDARDS", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Parental Authorization & Consent to Travel",
        type: "body",
        paragraphs: [
          `I/We, ${parent}${data.otherParentName ? ` and ${data.otherParentName}` : ""}, certify that I/we have lawful legal custody of the minor child: ${child}, born on ${data.minorDateOfBirth || "the date of birth"}.`,
          `I/We hereby grant full, free, and voluntary parental consent and authorization for my/our minor child to travel domestically and internationally accompanied by ${companion} (${data.travelCompanionRelationship || "Authorized Adult"}).`,
          `Authorized Itinerary: The minor is authorized to travel to, through, and within: ${data.travelDestination || "the designated travel itinerary"}, departing on or about ${data.departureDate || "departure date"} and returning on or about ${data.returnDate || "return date"}.`,
        ],
      },
      {
        title: "2. Presentation to Border Authorities & Common Carriers",
        type: "body",
        paragraphs: [
          `This consent letter is executed to satisfy the travel requirements of the Transportation Security Administration (TSA), U.S. Customs and Border Protection (CBP), foreign immigration and customs officers, and all commercial airlines, cruise lines, and transport carriers.`,
          `Border officials and common carriers are requested to permit the unhindered passage of the minor child accompanied by the authorized adult named herein.`,
        ],
      },
      {
        title: "3. Emergency Medical Authorization",
        type: "body",
        paragraphs: [
          data.emergencyMedicalAuthorized === "yes"
            ? `In the event the minor child suffers an illness, injury, or emergency medical condition during travel, I/we hereby authorize the accompanying adult (${companion}) to consent to any medical examination, diagnosis, anesthesia, medication, or surgical treatment deemed necessary by a licensed physician or accredited hospital facility.`
            : `Medical decisions shall remain subject to direct telephonic contact with the custodial parent(s) at ${data.consentingParentPhone || "emergency telephone number"}.`,
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
