import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const modelReleaseAgreementConfig: DocumentConfig = {
  id: "model-release-agreement",
  slug: "model-release-agreement",
  title: "Commercial Model & Likeness Release Agreement",
  shortTitle: "Model Release Agreement",
  category: "Contracts & Releases",
  description: "Official commercial and promotional model release contract granting photographer, filmmaker, or corporate brand irrevocable rights to photograph, record, publish, edit, copyright, and commercially monetize an individual's likeness and voice worldwide in perpetuity.",
  metaDescription: "Create an enforceable Commercial Model Release Agreement. Secures irrevocable rights to photographs, video footage, and likeness for advertising and social media across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Media Likeness Release",
  iconName: "Camera",
  searchKeywords: [
    "commercial model release agreement template",
    "photo and video release form pdf",
    "likeness release agreement form",
    "actor talent release contract",
    "photographer model release form",
    "social media video model release",
  ],
  features: [
    "Grants irrevocable, worldwide, perpetual rights to photographs, video recordings, and audio likeness",
    "Covers commercial advertising, digital streaming, social media marketing, print, and merchandising",
    "Includes express waiver of moral rights, inspection rights, and royalty claims beyond agreed consideration",
    "Features adult model signature and optional parent/guardian consent for minor talent",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    producerName: "Vanguard Creative Studios, LLC",
    producerAddress: "5800 Sunset Boulevard, Suite 300, Hollywood, CA 90028",
    photographerName: "Elena Sofia Martinez, Lead Cinematographer",
    modelName: "Brooke Elizabeth Daniels",
    modelAddress: "1420 Ocean Avenue, Apt 4A, Santa Monica, CA 90401",
    modelAge: "24",
    shootDescription: "Spring/Summer commercial apparel advertising campaign, lifestyle photo session, and 4K promotional brand video shoot.",
    shootLocation: "Santa Monica Pier & Malibu Coastal Studios, Los Angeles County, CA",
    considerationPaid: "Full model session fee of $1,250.00 USD, receipt and sufficiency of which are acknowledged.",
  },
  steps: [
    {
      id: "release_parties",
      title: "Producer & Talent Identity",
      description: "Enter identifying details for the photographer/producer and the model/talent.",
      fields: [
        {
          name: "producerName",
          label: "Producer / Media Company Legal Name",
          type: "text",
          placeholder: "e.g., Vanguard Creative Studios, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "photographerName",
          label: "Photographer / Director Name",
          type: "text",
          placeholder: "e.g., Elena Sofia Martinez, Lead Cinematographer",
          required: true,
          gridCols: 2,
        },
        {
          name: "producerAddress",
          label: "Producer Studio Address",
          type: "text",
          placeholder: "e.g., 5800 Sunset Boulevard, Suite 300, Hollywood, CA 90028",
          required: true,
          gridCols: 1,
        },
        {
          name: "modelName",
          label: "Model / Talent Full Legal Name",
          type: "text",
          placeholder: "e.g., Brooke Elizabeth Daniels",
          required: true,
          gridCols: 2,
        },
        {
          name: "modelAge",
          label: "Model Age (or 'Adult of Legal Age')",
          type: "text",
          placeholder: "e.g., 24 (If minor, parent/guardian must sign)",
          required: true,
          gridCols: 2,
        },
        {
          name: "modelAddress",
          label: "Model Residential Address",
          type: "text",
          placeholder: "e.g., 1420 Ocean Avenue, Apt 4A, Santa Monica, CA 90401",
          required: true,
          gridCols: 1,
        },
      ],
    },
    {
      id: "media_specs",
      title: "Shoot Details & Compensation",
      description: "Define the photo/video production scope, location, and compensation paid.",
      fields: [
        {
          name: "shootDescription",
          label: "Production / Shoot Description",
          type: "textarea",
          placeholder: "e.g., Commercial apparel advertising campaign, lifestyle photo session, and 4K digital video...",
          required: true,
          gridCols: 1,
        },
        {
          name: "shootLocation",
          label: "Shoot Location / Studio",
          type: "text",
          placeholder: "e.g., Santa Monica Pier & Coastal Studios, Los Angeles County, CA",
          required: true,
          gridCols: 1,
        },
        {
          name: "considerationPaid",
          label: "Consideration / Fee Paid to Model",
          type: "text",
          placeholder: "e.g., Session fee of $1,250.00 USD, or TFP (Trade for Portfolio)",
          required: true,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Release Execution Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const producer = data.producerName || "Producer / Photographer";
    const model = data.modelName || "Model";
    const statuteCite = statute?.statuteCitation || "Common Law Right of Publicity & Civil Code Commercial Likeness Statutes";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "RELEASE TYPE", value: "COMMERCIAL MODEL & LIKENESS RELEASE (IRREVOCABLE)" },
          { label: "PRODUCER / COMPANY", value: `${producer}` },
          { label: "MODEL / TALENT", value: `${model} (Age: ${data.modelAge || "Legal Age"})` },
          { label: "PRODUCTION / SHOOT", value: `${data.shootDescription || "Commercial photography session"}` },
          { label: "PRODUCTION LOCATION", value: `${data.shootLocation || "Studio on file"}` },
          { label: "CONSIDERATION PAID", value: `${data.considerationPaid || "Valuable consideration acknowledged"}` },
          { label: "TERRITORY & DURATION", value: "Worldwide, In Perpetuity, All Known Media" },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Grant of Rights & Worldwide Commercial Use",
        type: "body",
        paragraphs: [
          `For valuable consideration received, including ${data.considerationPaid || "valuable consideration acknowledged"}, the receipt and sufficiency of which are hereby acknowledged, the undersigned Model (${model}) hereby grants to ${producer} ("Producer"), its legal representatives, successors, licensees, and assigns, the irrevocable, absolute, unrestricted, and perpetual right and permission to:`,
          `(a) Record, photograph, videotape, and reproduce Model's image, likeness, voice, name, and biographical material created during the production described as: "${data.shootDescription || "Commercial media production"}" at ${data.shootLocation || "the production location"}.`,
          `(b) Copyright, publish, display, distribute, broadcast, stream, license, and commercially exploit the resulting photographs, video recordings, audio files, and advertising materials in any and all media now known or hereafter devised, throughout the world, for any lawful purpose, including commercial advertising, packaging, social media, broadcast television, print, and merchandising, without limitation.`,
        ],
      },
      {
        title: "2. Waiver of Inspection, Moral Rights & Additional Royalties",
        type: "body",
        paragraphs: [
          `Waiver of Approval: Model hereby waives any right to inspect or approve the finished photographs, composite images, advertising copy, or video footage that may be used in connection therewith.`,
          `Alterations & Retouching: Producer shall have full artistic discretion to alter, retouch, composite, distort, color grade, or adapt the images and recordings without restriction.`,
          `No Additional Compensation: Model acknowledges that the consideration received represents full and final compensation, and Model releases all claims to royalties, residual fees, or additional compensation arising out of the commercial exploitation of the materials.`,
        ],
      },
      {
        title: "3. Release of Claims & Right of Publicity",
        type: "body",
        paragraphs: [
          `Release of Liability: Model hereby releases, discharges, and agrees to hold harmless Producer, its clients, publishers, and distributors from all claims, demands, liabilities, and causes of action arising out of defamation, invasion of privacy, false light, infringement of moral rights, or violation of the statutory Right of Publicity under ${statuteCite}.`,
          `Capacity: Model represents that Model is of legal age (or that parent/guardian consent is appended below) and possesses the full legal capacity to enter into this release.`,
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
