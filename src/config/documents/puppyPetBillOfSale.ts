import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const puppyPetBillOfSaleConfig: DocumentConfig = {
  id: "puppy-pet-bill-of-sale",
  slug: "puppy-pet-bill-of-sale",
  title: "Puppy & Pet Bill of Sale with Certified Health Guarantee",
  shortTitle: "Pet Bill of Sale",
  category: "Bill of Sale",
  description: "Official companion animal and puppy purchase contract transferring legal ownership, breed registry pedigree documentation, microchip verification, veterinary vaccination history, and statutory pet lemon law health guarantees.",
  metaDescription: "Create an official Puppy & Pet Bill of Sale with certified health guarantee. Documents breed, vaccinations, microchip ID, and state pet purchase warranty for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Health Guarantee Standard",
  iconName: "Dog",
  searchKeywords: [
    "puppy bill of sale template pdf",
    "dog bill of sale with health guarantee",
    "akc puppy sales contract form",
    "pet purchase agreement template",
    "puppy lemon law guarantee form",
    "cat and dog sales contract receipt",
  ],
  features: [
    "Transfers full legal ownership and title of companion animal from breeder/seller to buyer",
    "Records breed, sex, color, date of birth, microchip number, and AKC/UKC registry litter details",
    "Includes 48-to-72 hour mandatory veterinary examination window and 1-year genetic defect warranty",
    "Complies with state pet purchaser protection acts (puppy lemon laws) across all 50 states",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "FL",
    sellerName: "Silver Creek Golden Retrievers (Breeder)",
    sellerAddress: "14500 Country Club Road, Ocala, FL 34482",
    buyerName: "Christopher Ryan Bennett",
    buyerAddress: "840 Ocean Drive, Delray Beach, FL 33483",
    petName: "Max (Litter Collar Green)",
    petSpeciesBreed: "Canine / Purebred Golden Retriever",
    petDob: "2026-09-08",
    petGender: "Male",
    petColorMarkings: "Dark Golden with white chest patch",
    microchipNumber: "985141004928172",
    registrationDetails: "AKC Litter Registration #SS-492104-03",
    purchasePrice: "2400.00",
    healthWarrantyDuration: "1 Year Genetic Health Warranty (Congenital Defects)",
    vetCheckWindowHours: "72",
  },
  steps: [
    {
      id: "pet_parties",
      title: "Seller & Buyer Information",
      description: "Enter legal contact details for the pet breeder/seller and the purchasing buyer.",
      fields: [
        {
          name: "sellerName",
          label: "Breeder / Seller Legal Name",
          type: "text",
          placeholder: "e.g., Silver Creek Golden Retrievers (Breeder)",
          required: true,
          gridCols: 2,
        },
        {
          name: "sellerAddress",
          label: "Breeder Kennel / Facility Address",
          type: "text",
          placeholder: "e.g., 14500 Country Club Road, Ocala, FL 34482",
          required: true,
          gridCols: 2,
        },
        {
          name: "buyerName",
          label: "Buyer / Adopter Full Legal Name",
          type: "text",
          placeholder: "e.g., Christopher Ryan Bennett",
          required: true,
          gridCols: 2,
        },
        {
          name: "buyerAddress",
          label: "Buyer Residential Address",
          type: "text",
          placeholder: "e.g., 840 Ocean Drive, Delray Beach, FL 33483",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "pet_details",
      title: "Pet Description & Health Warranty",
      description: "Enter breed, sex, birth date, microchip number, price, and health warranty terms.",
      fields: [
        {
          name: "petName",
          label: "Puppy / Pet Identifying Name or Tag",
          type: "text",
          placeholder: "e.g., Max (Litter Collar Green)",
          required: true,
          gridCols: 2,
        },
        {
          name: "petSpeciesBreed",
          label: "Species & Breed Description",
          type: "text",
          placeholder: "e.g., Canine / Purebred Golden Retriever",
          required: true,
          gridCols: 2,
        },
        {
          name: "petGender",
          label: "Pet Sex / Gender",
          type: "select",
          options: [
            { label: "Male (Intact)", value: "Male (Intact)" },
            { label: "Female (Intact)", value: "Female (Intact)" },
            { label: "Male (Neutered)", value: "Male (Neutered)" },
            { label: "Female (Spayed)", value: "Female (Spayed)" },
          ],
          required: true,
          gridCols: 2,
        },
        {
          name: "petDob",
          label: "Date of Birth",
          type: "date",
          required: true,
          gridCols: 2,
        },
        {
          name: "microchipNumber",
          label: "ISO Microchip Identification Number",
          type: "text",
          placeholder: "e.g., 985141004928172",
          required: true,
          gridCols: 2,
        },
        {
          name: "registrationDetails",
          label: "Breed Registry (AKC, UKC, CFA)",
          type: "text",
          placeholder: "e.g., AKC Litter Registration #SS-492104-03",
          required: false,
          gridCols: 2,
        },
        {
          name: "purchasePrice",
          label: "Purchase Price ($ USD)",
          type: "currency",
          placeholder: "e.g., 2400.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "vetCheckWindowHours",
          label: "Post-Sale Veterinary Exam Window (Hours)",
          type: "text",
          placeholder: "e.g., 72 (typically 48 to 72 hours per state law)",
          required: true,
          gridCols: 2,
        },
        {
          name: "healthWarrantyDuration",
          label: "Congenital Genetic Health Warranty Term",
          type: "text",
          placeholder: "e.g., 1 Year Genetic Health Warranty (Congenital Defects)",
          required: true,
          gridCols: 1,
        },
        {
          name: "noticeDate",
          label: "Date of Sale & Transfer",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const seller = data.sellerName || "Pet Breeder";
    const buyer = data.buyerName || "Pet Buyer";
    const price = parseFloat(data.purchasePrice || "0").toLocaleString("en-US", { minimumFractionDigits: 2 });
    const microchip = data.microchipNumber || "Microchip on file";
    const statuteCite = statute?.statuteCitation || "State Pet Lemon Law & Commercial Animal Sales Protection Act";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "INSTRUMENT", value: "PUPPY & PET BILL OF SALE (CERTIFIED HEALTH GUARANTEE)" },
          { label: "BREEDER / SELLER", value: `${seller}` },
          { label: "BUYER / ADOPTER", value: `${buyer}` },
          { label: "PET IDENTIFICATION", value: `${data.petName || "Pet"} (${data.petSpeciesBreed || "Canine"})` },
          { label: "SEX & DATE OF BIRTH", value: `${data.petGender || "Male"} born ${data.petDob || "Date on file"}` },
          { label: "MICROCHIP ID", value: `${microchip}` },
          { label: "TOTAL PURCHASE SUM", value: `$${price} USD (Paid in Full)` },
          { label: "GOVERNING STATUTE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Transfer of Title & Description of Animal",
        type: "body",
        paragraphs: [
          `KNOW ALL PERSONS BY THESE PRESENTS that for and in consideration of the purchase sum of $${price} USD, the receipt and sufficiency of which are hereby formally acknowledged, ${seller} ("Seller") does hereby grant, sell, transfer, and deliver unto ${buyer} ("Buyer") all right, title, and ownership in and to the companion animal described above.`,
          `Identification: The animal is identified by Microchip Number ${microchip} and Breed Registry Data: "${data.registrationDetails || "Standard pet registry records"}". Seller warrants that Seller is the lawful owner with unencumbered title.`,
        ],
      },
      {
        title: "2. Certified Health Warranty & Veterinary Inspection",
        type: "body",
        paragraphs: [
          `Current Health Warranty: Seller certifies that at the time of physical delivery, the pet is in sound health, free from visible infectious diseases, and up to date on all core vaccinations, deworming, and veterinary health examinations documented on the accompanying health certificate.`,
          `Buyer Inspection Window: Buyer agrees to take the pet to a licensed veterinarian within ${data.vetCheckWindowHours || "72"} hours of delivery for an independent wellness examination. If the veterinarian certifies in writing that the pet is clinically ill or unfit for purchase due to illness contracted prior to delivery, Buyer may return the pet for a full refund or replacement pursuant to ${statuteCite}.`,
        ],
      },
      {
        title: "3. Congenital Health Guarantee & Humane Care",
        type: "body",
        paragraphs: [
          `Genetic Defect Guarantee: Seller provides a ${data.healthWarrantyDuration || "one-year genetic health guarantee"} covering life-threatening congenital or hereditary defects (e.g., severe hip dysplasia, congenital heart defects). In such event verified by two licensed veterinarians, Seller shall provide a replacement puppy of equal value.`,
          `Buyer Care Covenant: Buyer covenants to provide humane living conditions, proper nutrition, indoor shelter, regular veterinary wellness exams, and compliance with all municipal animal licensing ordinances.`,
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
