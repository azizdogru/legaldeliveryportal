import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const fitnessLiabilityWaiverConfig: DocumentConfig = {
  id: "fitness-liability-waiver",
  slug: "fitness-liability-waiver",
  title: "Fitness Facility & Personal Training Liability Waiver",
  shortTitle: "Fitness Liability Waiver",
  category: "Contracts & Releases",
  description: "Comprehensive statutory athletic liability waiver, voluntary assumption of risk, and emergency medical authorization executed by gym members, CrossFit athletes, martial arts students, and personal training clients releasing facility from ordinary negligence claims.",
  metaDescription: "Create an enforceable Fitness & Gym Liability Waiver. Covers assumption of physical risk, equipment use, negligence waiver, and emergency medical release for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Gym & Trainer Waiver",
  iconName: "Activity",
  searchKeywords: [
    "fitness liability waiver template pdf",
    "gym membership release of liability form",
    "personal trainer liability waiver",
    "crossfit martial arts assumption of risk form",
    "athletic facility waiver and release",
    "gym injury waiver agreement",
  ],
  features: [
    "Express assumption of inherent physical risks: cardiovascular events, muscle tears, and equipment failure",
    "Comprehensive release of liability holding gym owners, instructors, and trainers harmless from ordinary negligence",
    "Member warranty of physical fitness and medical consultation clearance prior to strenuous exercise",
    "Emergency medical treatment consent authorizing facility staff to summon emergency paramedics",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TX",
    facilityName: "Ironclad Athletic Performance Club, LLC",
    facilityAddress: "4500 Westheimer Road, Suite 200, Houston, TX 77027",
    trainerOrInstructor: "Marcus Vance, Certified Strength & Conditioning Specialist",
    participantName: "Jonathan Blake Harris",
    participantAddress: "1800 Post Oak Boulevard, Apt 12B, Houston, TX 77056",
    participantPhone: "(713) 555-0182",
    emergencyContactName: "Sarah Lynn Harris (Spouse)",
    emergencyContactPhone: "(713) 555-0199",
    activityDescription: "High-intensity functional fitness training, Olympic weightlifting, cardiovascular conditioning, and personal strength coaching.",
  },
  steps: [
    {
      id: "waiver_parties",
      title: "Facility & Participant Profile",
      description: "Enter identifying details for the fitness facility and the participating member/client.",
      fields: [
        {
          name: "facilityName",
          label: "Fitness Facility / Gym / Trainer Legal Name",
          type: "text",
          placeholder: "e.g., Ironclad Athletic Performance Club, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "trainerOrInstructor",
          label: "Lead Trainer / Program Instructor",
          type: "text",
          placeholder: "e.g., Marcus Vance, Certified Strength Specialist",
          required: true,
          gridCols: 2,
        },
        {
          name: "facilityAddress",
          label: "Gym / Training Facility Address",
          type: "text",
          placeholder: "e.g., 4500 Westheimer Road, Suite 200, Houston, TX 77027",
          required: true,
          gridCols: 1,
        },
        {
          name: "participantName",
          label: "Participant / Member Full Legal Name",
          type: "text",
          placeholder: "e.g., Jonathan Blake Harris",
          required: true,
          gridCols: 2,
        },
        {
          name: "participantPhone",
          label: "Participant Contact Phone",
          type: "phone",
          placeholder: "e.g., (713) 555-0182",
          required: true,
          gridCols: 2,
        },
        {
          name: "participantAddress",
          label: "Participant Residential Address",
          type: "text",
          placeholder: "e.g., 1800 Post Oak Boulevard, Apt 12B, Houston, TX 77056",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "activities_emergency",
      title: "Activities & Emergency Contact",
      description: "Specify training activities and designated emergency medical contact.",
      fields: [
        {
          name: "activityDescription",
          label: "Fitness Activities & Equipment Included",
          type: "textarea",
          placeholder: "e.g., Functional fitness, Olympic weightlifting, gymnastics, boxing, free weights, treadmills...",
          required: true,
          gridCols: 1,
        },
        {
          name: "emergencyContactName",
          label: "Emergency Contact Full Name & Relationship",
          type: "text",
          placeholder: "e.g., Sarah Lynn Harris (Spouse)",
          required: true,
          gridCols: 2,
        },
        {
          name: "emergencyContactPhone",
          label: "Emergency Contact Phone Number",
          type: "phone",
          placeholder: "e.g., (713) 555-0199",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Waiver Execution Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const facility = data.facilityName || "Fitness Facility";
    const participant = data.participantName || "Participant";
    const statuteCite = statute?.statuteCitation || "Express Assumption of Risk & Exculpatory Release Standards";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT", value: "FITNESS FACILITY LIABILITY WAIVER & ASSUMPTION OF RISK" },
          { label: "FACILITY / TRAINER", value: `${facility}` },
          { label: "PARTICIPANT / MEMBER", value: `${participant}` },
          { label: "FACILITY PREMISES", value: `${data.facilityAddress || "Facility address on file"}` },
          { label: "COVERED ACTIVITIES", value: `${data.activityDescription || "Physical training activities"}` },
          { label: "EMERGENCY CONTACT", value: `${data.emergencyContactName || "On file"} (${data.emergencyContactPhone || "N/A"})` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Voluntary Assumption of Inherent Physical Risks",
        type: "body",
        paragraphs: [
          `I, the undersigned Participant (${participant}), desire to utilize the training facilities, equipment, services, and coaching provided by ${facility} ("Facility").`,
          `I expressly acknowledge that strenuous physical exercise, weightlifting, cardiovascular training, and using mechanical gym equipment carry substantial inherent risks of serious bodily injury, including but not limited to sprains, fractures, torn ligaments, rhabdomyolysis, heart attack, permanent disability, and death.`,
          `I VOLUNTARILY, KNOWINGLY, AND FREELY ASSUME ALL RISKS, BOTH KNOWN AND UNKNOWN, ASSOCIATED WITH MY PARTICIPATION IN SAID ACTIVITIES, even if arising from the ordinary negligence of Facility or its instructors.`,
        ],
      },
      {
        title: "2. Full Release of Liability & Covenant Not to Sue",
        type: "body",
        paragraphs: [
          `In consideration of being permitted access to Facility and equipment, I hereby RELEASE, DISCHARGE, AND AGREE TO HOLD HARMLESS ${facility}, its owners, trainers, officers, employees, and agents from any and all liability, claims, demands, actions, or causes of action arising out of any bodily injury, sickness, illness, property damage, or death occurring on or about the premises, WHETHER CAUSED BY THE ACTIVE OR PASSIVE ORDINARY NEGLIGENCE OF FACILITY OR OTHERWISE.`,
          `I expressly covenant and agree that neither I, nor my estate, heirs, or personal representatives, will institute any legal claim, lawsuit, or arbitration against Facility regarding injuries sustained during training.`,
        ],
      },
      {
        title: "3. Health Warranty & Emergency Medical Authorization",
        type: "body",
        paragraphs: [
          `Physical Capability: I warrant that I am in good physical condition, possess no medical conditions that would make my participation dangerous, and have consulted with a licensed medical physician prior to commencing training.`,
          `Emergency Medical Consent: In the event of an accident or acute medical emergency, I hereby authorize Facility staff to administer basic first aid and to summon professional paramedics or ambulance transport to an emergency hospital, assuming full financial responsibility for all resulting medical bills.`,
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
