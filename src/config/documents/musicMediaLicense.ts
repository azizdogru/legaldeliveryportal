import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const musicMediaLicenseConfig: DocumentConfig = {
  id: "music-media-license",
  slug: "music-media-license",
  title: "Music Synchronization & Master Use Licensing Agreement",
  shortTitle: "Music Sync License",
  category: "Contracts & Releases",
  description: "Comprehensive commercial music synchronization (sync) and master use licensing contract granting non-exclusive or exclusive rights to synchronize an original musical composition and master recording in films, podcasts, YouTube videos, advertising, and digital streaming.",
  metaDescription: "Create an official Music Sync & Beat License Agreement. Authorizes commercial use of master recordings and composition rights for film, YouTube, podcasts, and video games across all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Music Sync License",
  iconName: "Music",
  searchKeywords: [
    "music synchronization license template",
    "master use licensing agreement pdf",
    "beat license contract form",
    "music sync license agreement",
    "podcast music licensing agreement",
    "commercial audio license template",
  ],
  features: [
    "Licenses both underlying musical composition (publishing) and sound recording (master rights)",
    "Defines permitted commercial media: television broadcast, feature film, social media, or podcasting",
    "Specifies one-time synchronization fee, ongoing streaming revenue splits, or royalty-free buyout",
    "Protects licensor copyright ownership and establishes mandatory on-screen or audio credits",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "TN",
    licensorName: "Neon Echo Soundworks, LLC (Composer / Producer)",
    licensorAddress: "1200 Music Row, Suite 400, Nashville, TN 37203",
    licenseeName: "Horizon Digital Productions, Inc.",
    licenseeAddress: "450 Broadway, 6th Floor, New York, NY 10013",
    trackTitle: "Midnight Velocity (Instrumental Master & Composition)",
    trackDuration: "3 minutes 42 seconds (ISRC: US-NE7-26-00491)",
    licensedProject: "Commercial promotional video series and worldwide social media digital campaign for Horizon Digital.",
    licenseType: "Non-Exclusive Commercial Synchronization & Master Use License",
    syncLicenseFee: "2500.00",
    creditAttribution: "Music by Neon Echo Soundworks (Track: Midnight Velocity)",
    territoryScope: "Worldwide, All Digital Media and Streaming Platforms in Perpetuity",
  },
  steps: [
    {
      id: "music_parties",
      title: "Licensor & Licensee Information",
      description: "Enter identifying details for the musical artist/composer and the production licensee.",
      fields: [
        {
          name: "licensorName",
          label: "Licensor (Composer / Producer / Label) Legal Name",
          type: "text",
          placeholder: "e.g., Neon Echo Soundworks, LLC",
          required: true,
          gridCols: 2,
        },
        {
          name: "licensorAddress",
          label: "Licensor Studio Address",
          type: "text",
          placeholder: "e.g., 1200 Music Row, Suite 400, Nashville, TN 37203",
          required: true,
          gridCols: 2,
        },
        {
          name: "licenseeName",
          label: "Licensee (Film Producer / Brand) Legal Name",
          type: "text",
          placeholder: "e.g., Horizon Digital Productions, Inc.",
          required: true,
          gridCols: 2,
        },
        {
          name: "licenseeAddress",
          label: "Licensee Business Address",
          type: "text",
          placeholder: "e.g., 450 Broadway, 6th Floor, New York, NY 10013",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "track_specs",
      title: "Musical Track & Rights Grant",
      description: "Specify song title, project name, license fee, and credit requirements.",
      fields: [
        {
          name: "trackTitle",
          label: "Licensed Musical Track Title & Version",
          type: "text",
          placeholder: "e.g., Midnight Velocity (Instrumental Master)",
          required: true,
          gridCols: 2,
        },
        {
          name: "trackDuration",
          label: "Track Duration & ISRC / PRO Registration",
          type: "text",
          placeholder: "e.g., 3:42 (ISRC: US-NE7-26-00491, BMI)",
          required: true,
          gridCols: 2,
        },
        {
          name: "licensedProject",
          label: "Licensed Media Project Description",
          type: "textarea",
          placeholder: "e.g., Independent documentary film, commercial broadcast, or YouTube channel series...",
          required: true,
          gridCols: 1,
        },
        {
          name: "licenseType",
          label: "Exclusivity & License Grant",
          type: "select",
          options: [
            { label: "Non-Exclusive Commercial Synchronization & Master Use", value: "Non-Exclusive Commercial Synchronization & Master Use" },
            { label: "Exclusive Commercial Synchronization & Buyout", value: "Exclusive Commercial Synchronization & Buyout" },
            { label: "Non-Exclusive Digital Streaming & Social Media Only", value: "Non-Exclusive Digital Streaming & Social Media Only" },
          ],
          required: true,
          gridCols: 2,
        },
        {
          name: "syncLicenseFee",
          label: "One-Time Synchronization Fee ($ USD)",
          type: "currency",
          placeholder: "e.g., 2500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "creditAttribution",
          label: "Mandatory Credit Line / Screen Attribution",
          type: "text",
          placeholder: "e.g., Music by Neon Echo Soundworks (Track: Midnight Velocity)",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Agreement Effective Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const licensor = data.licensorName || "Licensor / Composer";
    const licensee = data.licenseeName || "Licensee";
    const track = data.trackTitle || "Musical Composition";
    const fee = parseFloat(data.syncLicenseFee || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const statuteCite = statute?.statuteCitation || "United States Copyright Act (17 U.S.C. Section 101 et seq.)";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LICENSE TYPE", value: "COMMERCIAL MUSIC SYNCHRONIZATION & MASTER USE" },
          { label: "LICENSOR / ARTIST", value: `${licensor}` },
          { label: "LICENSEE / PRODUCER", value: `${licensee}` },
          { label: "LICENSED TRACK", value: `${track} (${data.trackDuration || "Duration on file"})` },
          { label: "AUTHORIZED PROJECT", value: `${data.licensedProject || "Media production on file"}` },
          { label: "SYNCHRONIZATION FEE", value: `$${fee} USD (Flat Royalty-Free Buyout)` },
          { label: "CREDIT ATTRIBUTION", value: `${data.creditAttribution || "Attribution as specified"}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Grant of Synchronization & Master Rights",
        type: "body",
        paragraphs: [
          `THIS MUSIC SYNCHRONIZATION AND MASTER USE AGREEMENT is entered into as of ${data.noticeDate || "the date of execution"}, by and between ${licensor} ("Licensor") and ${licensee} ("Licensee").`,
          `Grant of Rights: In consideration of the payment of the synchronization fee of $${fee} USD, Licensor hereby grants to Licensee a ${data.licenseType || "commercial synchronization license"} to synchronize, edit, record, and reproduce the musical composition and sound recording entitled "${track}" in timed relation with the audio-visual production described as: "${data.licensedProject || "the licensed media project"}".`,
          `Territory & Term: The rights granted herein extend worldwide in perpetuity across all digital streaming, broadcast television, theatrical, home video, and social media platforms.`,
        ],
      },
      {
        title: "2. Reservation of Ownership & Public Performance",
        type: "body",
        paragraphs: [
          `Copyright Retention: Licensor retains 100% sole and exclusive ownership of all copyrights in the master recording and underlying musical composition under 17 U.S.C. Section 106. No ownership rights are transferred to Licensee.`,
          `Performing Rights: This license does not include public performance rights, which are cleared through standard blanket licenses administered by Performing Rights Organizations (e.g., ASCAP, BMI, SESAC) in the relevant broadcasting jurisdiction.`,
        ],
      },
      {
        title: "3. Credit Attribution & Licensor Warranties",
        type: "body",
        paragraphs: [
          `Screen Credit: Licensee shall accord Licensor credit in the end titles of the production or video description metadata substantially as follows: "${data.creditAttribution || "Music by Licensor"}".`,
          `Warranty of Originality: Licensor warrants and represents that Licensor is the sole author and owner of the musical composition and master recording, that the music is original and does not infringe upon any third-party copyright, trademark, or proprietary rights, and that Licensor possesses full authority to grant this license.`,
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
