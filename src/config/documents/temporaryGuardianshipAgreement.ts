import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const temporaryGuardianshipAgreementConfig: DocumentConfig = {
  id: "temporary-guardianship-agreement",
  slug: "temporary-guardianship-agreement",
  title: "Temporary Guardianship Agreement & Authorization",
  shortTitle: "Temporary Guardianship",
  category: "Family Law & Caregiving",
  description: "Legally binding parental consent agreement authorizing a designated temporary caregiver or guardian to care for a minor child, make emergency medical and surgical decisions, enroll in school, and oversee travel, complying with state probate and family codes without relinquishing legal parental rights.",
  metaDescription: "Create an enforceable Temporary Guardianship Agreement. Authorize temporary caregiver for medical consent, school enrollment, and travel. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Family Code Ready",
  iconName: "Users",
  searchKeywords: [
    "temporary guardianship agreement template",
    "minor child caregiver consent form",
    "power of attorney for minor child",
    "temporary custody consent agreement",
    "parental authorization medical school form",
    "childcare power of attorney",
  ],
  features: [
    "Grants emergency medical, dental, and surgical consent authority for the minor child",
    "Authorizes school enrollment, educational records access, and extracurricular activities",
    "Includes domestic and international travel consent provisions with caregiver",
    "Maintains full parental rights with immediate unilateral revocation power",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "OH",
    parentName: "",
    parentAddress: "",
    parentPhone: "",
    secondParentName: "",
    guardianName: "",
    guardianAddress: "",
    guardianPhone: "",
    guardianRelationship: "Grandparent",
    childFullName: "",
    childDateOfBirth: "",
    authorizationStartDate: new Date().toISOString().split("T")[0],
    authorizationEndDate: "",
    medicalAuthorization: "emergency_and_routine",
    schoolAuthorization: "yes",
    travelAuthorization: "domestic_and_international",
  },
  steps: [
    {
      id: "parties_child",
      title: "Parents, Caregiver & Child",
      description: "Enter identifying details for the legal parents, designated caregiver, and minor child.",
      fields: [
        {
          name: "parentName",
          label: "Primary Legal Parent / Legal Guardian Full Name",
          type: "text",
          placeholder: "e.g., Katherine Marie Brooks",
          required: true,
          gridCols: 1,
        },
        {
          name: "parentAddress",
          label: "Parent Permanent Residential Address",
          type: "text",
          placeholder: "e.g., 512 Grandview Avenue, Columbus, OH 43215",
          required: true,
          gridCols: 1,
        },
        {
          name: "parentPhone",
          label: "Parent Telephone Number",
          type: "text",
          placeholder: "e.g., (614) 555-0142",
          required: true,
          gridCols: 2,
        },
        {
          name: "secondParentName",
          label: "Second Legal Parent Full Name (If Applicable)",
          type: "text",
          placeholder: "e.g., Christopher David Brooks or Deceased / Sole Custody",
          required: false,
          gridCols: 2,
        },
        {
          name: "guardianName",
          label: "Designated Temporary Guardian / Caregiver Name",
          type: "text",
          placeholder: "e.g., Eleanor Jane Brooks",
          required: true,
          gridCols: 1,
        },
        {
          name: "guardianAddress",
          label: "Caregiver Residential Address (Where Child Will Reside)",
          type: "text",
          placeholder: "e.g., 880 High Street, Worthington, OH 43085",
          required: true,
          gridCols: 1,
        },
        {
          name: "guardianPhone",
          label: "Caregiver Telephone Number",
          type: "text",
          placeholder: "e.g., (614) 555-0188",
          required: true,
          gridCols: 2,
        },
        {
          name: "guardianRelationship",
          label: "Caregiver Relationship to Child",
          type: "text",
          placeholder: "e.g., Maternal Grandmother / Aunt / Adult Sibling",
          required: true,
          gridCols: 2,
        },
        {
          name: "childFullName",
          label: "Minor Child Full Legal Name",
          type: "text",
          placeholder: "e.g., Lucas Alexander Brooks",
          required: true,
          gridCols: 2,
        },
        {
          name: "childDateOfBirth",
          label: "Child Date of Birth",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "scope_powers",
      title: "Caregiver Powers & Duration",
      description: "Define the scope of authority granted for healthcare, education, and travel.",
      fields: [
        {
          name: "authorizationStartDate",
          label: "Effective Commencement Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "authorizationEndDate",
          label: "Expiration Date (or 1 Year Maximum)",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "medicalAuthorization",
          label: "Healthcare & Medical Authority Scope",
          type: "select",
          required: true,
          options: [
            { label: "Full Emergency, Routine Medical, Dental, and Surgical Consent", value: "emergency_and_routine" },
            { label: "Emergency Healthcare and First Aid Consent Only", value: "emergency_only" },
          ],
        },
        {
          name: "schoolAuthorization",
          label: "Educational Enrollment & Records Authority",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Authorize School Enrollment and Full Records Access (FERPA)", value: "yes" },
            { label: "No School Enrollment Authority", value: "no" },
          ],
        },
        {
          name: "travelAuthorization",
          label: "Travel Consent with Caregiver",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Authorize Both Domestic and International Travel", value: "domestic_and_international" },
            { label: "Authorize Domestic Travel within the United States Only", value: "domestic_only" },
            { label: "Local Travel within Home State Only", value: "local_only" },
          ],
        },
      ],
    },
    {
      id: "execution",
      title: "Parental Verification & Delivery",
      description: "Establish signature date for sworn Notary Jurat.",
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
    const parent = data.parentName || "Parent";
    const caregiver = data.guardianName || "Temporary Guardian";
    const child = data.childFullName || "Minor Child";
    const dob = data.childDateOfBirth || "on file";
    const statuteCite = statute?.statuteCitation || "State Family Code & Minor Caregiver Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LEGAL PARENT / GUARDIAN", value: `${parent}, ${data.parentAddress || ""} (${data.parentPhone || ""})` },
          { label: "TEMPORARY CAREGIVER / GUARDIAN", value: `${caregiver} (${data.guardianRelationship || "Guardian"}), ${data.guardianAddress || ""}` },
          { label: "MINOR CHILD", value: `${child}, Born: ${dob}` },
          { label: "EFFECTIVE PERIOD", value: `From ${data.authorizationStartDate || "commencement"} to ${data.authorizationEndDate || "one year unless revoked"}` },
          { label: "MEDICAL & SCHOOL AUTHORITY", value: "Full Routine, Emergency Surgical, and Educational Enrollment" },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Grant of Temporary Parental Authority & Custody",
        type: "body",
        paragraphs: [
          `I/We, ${parent}${data.secondParentName ? ` and ${data.secondParentName}` : ""}, being the legal custodial parent(s) of the minor child, ${child} (DOB: ${dob}), do hereby willfully appoint and designate ${caregiver} (${data.guardianRelationship || "Caregiver"}) as the Temporary Guardian and Authorized Caregiver of said minor child.`,
          `This temporary authorization shall commence on ${data.authorizationStartDate || "the effective date"} and shall automatically terminate on ${data.authorizationEndDate || "the designated end date"}, unless earlier revoked in writing by the undersigned legal parent.`,
          `This Agreement is executed pursuant to the state minor power of attorney and caregiver statutory provisions of ${statute?.stateName || "the State"}, and does not constitute a permanent surrender, relinquishment, or termination of legal parental rights or obligations.`,
        ],
      },
      {
        title: "2. Healthcare, Medical & Surgical Authority",
        type: "body",
        paragraphs: [
          `The Temporary Guardian is granted full legal authority to consent to any medical, dental, surgical, mental health, optical, or hospital care and treatment deemed necessary for the health and welfare of the minor child, including diagnostic examinations, anesthesia, blood transfusions, emergency surgery, and prescription administration.`,
          `Pursuant to the Health Insurance Portability and Accountability Act (HIPAA), all healthcare entities and physicians are directed to release protected medical charts and health information regarding the child to the Temporary Guardian.`,
        ],
      },
      {
        title: "3. Educational Enrollment, School Records & Travel Consent",
        type: "body",
        paragraphs: [
          data.schoolAuthorization === "yes"
            ? `The Temporary Guardian is authorized to enroll the child in public, charter, or private schools, access all cumulative educational records pursuant to FERPA, communicate with school administrators and teachers, and sign field trip, athletic, and extracurricular permission slips.`
            : `Educational enrollment authority is retained by the parent.`,
          data.travelAuthorization === "domestic_and_international"
            ? `I/We expressly authorize the Temporary Guardian to travel with the minor child throughout the United States and internationally, including border crossings and air transportation.`
            : `I/We authorize the Temporary Guardian to travel with the minor child domestically within the United States.`,
        ],
      },
      {
        title: "4. Immediate Revocation & Parent Rights Preservation",
        type: "body",
        paragraphs: [
          `The undersigned parent(s) retain complete legal authority to unilaterally revoke this Temporary Guardianship Agreement at any time, with or without cause, upon written notification delivered to the Temporary Guardian. Upon receipt of revocation, the child shall be immediately returned to the custody of the legal parent.`,
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
