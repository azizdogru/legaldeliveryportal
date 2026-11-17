import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const daycareServicesContractConfig: DocumentConfig = {
  id: "daycare-services-contract",
  slug: "daycare-services-contract",
  title: "Child Daycare Services & Enrollment Agreement",
  shortTitle: "Daycare Services Contract",
  category: "Family & Personal",
  description: "Official state-compliant child care enrollment agreement defining weekly tuition schedules, late pickup penalty fees, emergency medical authorization, infectious sickness exclusion rules, and authorized pickup guardians.",
  metaDescription: "Create an official Child Daycare Services Contract. Covers child care tuition schedules, late pickup fees, sick child exclusions, and emergency medical consent across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Child Care & Tuition",
  iconName: "Users",
  searchKeywords: [
    "child daycare contract template pdf",
    "child care enrollment agreement form",
    "home daycare contract template",
    "daycare tuition and late pickup fee agreement",
    "childcare emergency medical authorization",
    "preschool child care contract",
  ],
  features: [
    "Defines daily operating hours, pickup schedules, and per-minute late pickup penalty fees",
    "Establishes weekly or monthly tuition rates, registration deposits, and holiday tuition rules",
    "Includes mandatory sick-child exclusion guidelines complying with state department of health licensing",
    "Authorizes emergency pediatric treatment and enumerates verified adults permitted to pick up the child",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "OH",
    facilityName: "Little Explorers Early Learning Academy, LLC",
    facilityAddress: "2400 Riverside Drive, Upper Arlington, OH 43221",
    facilityDirector: "Patricia Marie Sullivan, Licensed Director",
    childFullName: "Liam Alexander Evans",
    childDob: "2023-04-12",
    parentGuardianName: "Rachel Elizabeth Evans & Michael David Evans",
    parentAddress: "3200 Tremont Road, Upper Arlington, OH 43221",
    parentPhone: "(614) 555-0187",
    parentEmail: "rachel.evans@gmail.com",
    weeklyTuition: "385.00",
    latePickupFeePerMinute: "2.00",
    authorizedPickupPersons: "Sarah Lynn Jenkins (Aunt - 614-555-0199), Robert James Evans (Grandfather - 614-555-0142)",
    allergiesOrMedicalConditions: "Mild peanut allergy. No medication required on site; epinephrine pen on file.",
  },
  steps: [
    {
      id: "daycare_parties",
      title: "Daycare Provider & Family Profile",
      description: "Enter identifying details for the licensed daycare center, child, and parents/guardians.",
      fields: [
        {
          name: "facilityName",
          label: "Daycare Center / Provider Business Name",
          type: "text",
          placeholder: "e.g., Little Explorers Early Learning Academy, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "facilityDirector",
          label: "Center Director / Lead Provider Name",
          type: "text",
          placeholder: "e.g., Patricia Marie Sullivan, Licensed Director",
          required: true,
          gridCols: 2,
        },
        {
          name: "facilityAddress",
          label: "Daycare Facility Street Address",
          type: "text",
          placeholder: "e.g., 2400 Riverside Drive, Upper Arlington, OH 43221",
          required: true,
          gridCols: 1,
        },
        {
          name: "childFullName",
          label: "Enrolled Child Full Legal Name",
          type: "text",
          placeholder: "e.g., Liam Alexander Evans",
          required: true,
          gridCols: 2,
        },
        {
          name: "childDob",
          label: "Child Date of Birth",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "parentGuardianName",
          label: "Parent(s) / Legal Guardian(s) Name(s)",
          type: "text",
          placeholder: "e.g., Rachel Elizabeth Evans & Michael David Evans",
          required: true,
          gridCols: 2,
        },
        {
          name: "parentPhone",
          label: "Primary Parent Contact Phone",
          type: "phone",
          placeholder: "e.g., (614) 555-0187",
          required: true,
          gridCols: 2,
        },
        {
          name: "parentAddress",
          label: "Family Residential Address",
          type: "text",
          placeholder: "e.g., 3200 Tremont Road, Upper Arlington, OH 43221",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "tuition_and_care",
      title: "Tuition, Hours & Pickup Authorization",
      description: "Define weekly tuition, late fees, authorized pickup guardians, and medical notes.",
      fields: [
        {
          name: "weeklyTuition",
          label: "Weekly Childcare Tuition ($ USD)",
          type: "currency",
          placeholder: "e.g., 385.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "latePickupFeePerMinute",
          label: "Late Pickup Fee ($ USD per Minute after Closing)",
          type: "currency",
          placeholder: "e.g., 2.00 (or $1.00)",
          required: true,
          gridCols: 2,
        },
        {
          name: "authorizedPickupPersons",
          label: "Authorized Pickup Adults (Names & Phones)",
          type: "textarea",
          placeholder: "List verified adults authorized to pick up child with government photo ID...",
          required: true,
          gridCols: 1,
        },
        {
          name: "allergiesOrMedicalConditions",
          label: "Allergies, Dietary Restrictions, or Medical Conditions",
          type: "textarea",
          placeholder: "Detail any food allergies, asthma, dietary bans, or enter 'None'...",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Enrollment Agreement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const facility = data.facilityName || "Daycare Provider";
    const parent = data.parentGuardianName || "Parent / Guardian";
    const child = data.childFullName || "Child";
    const tuition = parseFloat(data.weeklyTuition || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const lateFee = parseFloat(data.latePickupFeePerMinute || "2").toFixed(2);
    const statuteCite = statute?.statuteCitation || "State Child Daycare Licensing & Child Welfare Regulations";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "AGREEMENT TYPE", value: "CHILD DAYCARE SERVICES & ENROLLMENT CONTRACT" },
          { label: "DAYCARE FACILITY", value: `${facility}` },
          { label: "ENROLLED CHILD", value: `${child} (DOB: ${data.childDob || "On file"})` },
          { label: "PARENT / GUARDIAN", value: `${parent}` },
          { label: "PARENT TELEPHONE", value: `${data.parentPhone || "Phone on file"}` },
          { label: "WEEKLY TUITION", value: `$${tuition} USD (Due Mondays in Advance)` },
          { label: "LATE PICKUP PENALTY", value: `$${lateFee} USD per Minute Past Closing` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Enrollment, Operating Hours & Tuition Schedule",
        type: "body",
        paragraphs: [
          `THIS CHILD DAYCARE SERVICES AGREEMENT is made effective as of ${data.noticeDate || "the date of execution"}, by and between ${facility} ("Provider") and ${parent} ("Parent"), for the care and early education of ${child} ("Child").`,
          `Tuition Schedule: Parent agrees to pay a recurring childcare tuition fee of $${tuition} USD per week, payable in advance on Monday morning of each week. Tuition is required regardless of Child's absence due to illness, vacation, or statutory facility holidays.`,
          `Late Pickup Policy: Operating hours conclude promptly at the end of the scheduled care day. If Child is not picked up by an authorized adult by closing time, Parent shall pay a late pickup fee of $${lateFee} USD per minute, payable immediately upon arrival.`,
        ],
      },
      {
        title: "2. Authorized Pickup Guardians & Security Protocols",
        type: "body",
        paragraphs: [
          `Authorized Guardians: Child will only be released to Parent or individuals specifically enumerated on the Authorized Pickup List: "${data.authorizedPickupPersons || "Parents and verified emergency contacts on file"}".`,
          `Identification: Any unfamiliar individual picking up Child must present government-issued photo identification and be verified against enrollment records before Child will be released.`,
        ],
      },
      {
        title: "3. Health, Sick-Child Exclusion & Emergency Medical Consent",
        type: "body",
        paragraphs: [
          `Illness Exclusion: Pursuant to state department of health childcare licensing rules, Child must be excluded from care if experiencing a fever of 100.4F or greater, vomiting, diarrhea, or communicable infection. Child must remain fever-free for 24 hours without medication before returning.`,
          `Medical Conditions: Provider has been notified of the following allergies or dietary restrictions: "${data.allergiesOrMedicalConditions || "None disclosed"}".`,
          `Emergency Medical Authorization: In the event of a medical emergency, Provider is authorized to administer first aid, contact 911 emergency services, and arrange ambulance transport to the nearest hospital. Parent assumes full financial responsibility for all emergency medical care.`,
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
