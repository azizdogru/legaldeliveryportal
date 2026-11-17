import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const petAddendumConfig: DocumentConfig = {
  id: "pet-addendum",
  slug: "pet-addendum",
  title: "Pet Addendum to Residential Lease Agreement",
  shortTitle: "Pet Addendum",
  category: "Landlord & Tenant",
  description: "Official legal lease rider establishing authorized pets, pet deposit terms, monthly pet rent, behavioral rules, and tenant damage indemnification.",
  metaDescription: "Generate a legally binding Pet Addendum to Residential Lease. Cites state pet deposit limits, monthly pet fees, and assistance animal rules. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Lease Rider",
  iconName: "Dog",
  searchKeywords: [
    "pet addendum to lease agreement",
    "rental pet agreement template",
    "landlord pet policy addendum",
    "pet deposit agreement form",
    "residential lease pet rider",
  ],
  features: [
    "Incorporates seamlessly into any active residential lease contract",
    "Complies with state security deposit caps and pet deposit limitations",
    "Maintains federal Fair Housing Act compliance for assistance animals",
    "Includes strict tenant indemnification for pet-related damages and bites",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    landlordName: "",
    tenantName: "",
    rentalAddress: "",
    unitNumber: "",
    leaseDate: "",
    petName: "Buddy",
    petType: "Dog",
    petBreed: "Golden Retriever",
    petWeight: "55 lbs",
    petAge: "3 years",
    rabiesTagNumber: "CA-984210",
    petDeposit: "500.00",
    monthlyPetRent: "35.00",
    nonRefundableFee: "150.00",
  },
  steps: [
    {
      id: "parties",
      title: "Landlord, Tenant & Premises",
      description: "Enter identifying details for the residential tenancy.",
      fields: [
        {
          name: "landlordName",
          label: "Landlord / Property Manager Name",
          type: "text",
          placeholder: "e.g., Highland Crest Properties LLC",
          required: true,
          gridCols: 1,
        },
        {
          name: "tenantName",
          label: "Tenant Name(s) (All adults on lease)",
          type: "text",
          placeholder: "e.g., Marcus Vance and Linda Vance",
          required: true,
          gridCols: 1,
        },
        {
          name: "rentalAddress",
          label: "Leased Rental Address",
          type: "text",
          placeholder: "e.g., 2400 Riverside Drive, Apt 4C, Austin, TX 78741",
          required: true,
          gridCols: 2,
        },
        {
          name: "leaseDate",
          label: "Date of Original Residential Lease",
          type: "text",
          placeholder: "e.g., February 1, 2026",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "pet_profile",
      title: "Pet Identification",
      description: "Provide complete identification and veterinary registration details for the pet.",
      fields: [
        {
          name: "petName",
          label: "Pet Name",
          type: "text",
          placeholder: "e.g., Cooper",
          required: true,
          gridCols: 2,
        },
        {
          name: "petType",
          label: "Animal Type / Species",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Dog (Canine)", value: "Dog" },
            { label: "Cat (Feline)", value: "Cat" },
            { label: "Bird (Caged)", value: "Bird" },
            { label: "Fish (Aquarium)", value: "Fish" },
            { label: "Small Caged Animal (Hamster/Rabbit)", value: "Small Caged Animal" },
          ],
        },
        {
          name: "petBreed",
          label: "Breed Description",
          type: "text",
          placeholder: "e.g., Labrador Retriever Mix",
          required: true,
          gridCols: 2,
        },
        {
          name: "petWeight",
          label: "Approximate Weight",
          type: "text",
          placeholder: "e.g., 45 lbs",
          required: true,
          gridCols: 2,
        },
        {
          name: "petAge",
          label: "Pet Age",
          type: "text",
          placeholder: "e.g., 4 years",
          required: true,
          gridCols: 2,
        },
        {
          name: "rabiesTagNumber",
          label: "County Rabies Tag / Microchip ID",
          type: "text",
          placeholder: "e.g., Tag # TX-449102",
          required: false,
          gridCols: 2,
        },
      ],
    },
    {
      id: "pet_financials",
      title: "Deposits, Fees & Rules",
      description: "Set the financial deposits, monthly pet rent, and compliance date.",
      fields: [
        {
          name: "petDeposit",
          label: "Refundable Additional Pet Deposit ($)",
          type: "currency",
          placeholder: "e.g., 500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "monthlyPetRent",
          label: "Additional Monthly Pet Rent ($)",
          type: "currency",
          placeholder: "e.g., 35.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "nonRefundableFee",
          label: "One-Time Non-Refundable Pet Fee ($)",
          type: "currency",
          placeholder: "e.g., 150.00",
          required: false,
          gridCols: 2,
        },
        {
          name: "noticeDate",
          label: "Addendum Effective Date",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const landlord = data.landlordName || "Landlord";
    const tenant = data.tenantName || "Tenant";
    const petDeposit = parseFloat(data.petDeposit || "0").toFixed(2);
    const petRent = parseFloat(data.monthlyPetRent || "0").toFixed(2);
    const oneTimeFee = parseFloat(data.nonRefundableFee || "0").toFixed(2);
    const statuteCite = statute?.statuteCitation || "Applicable State Landlord and Tenant Law";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "LANDLORD / LESSOR", value: `${landlord}` },
          { label: "TENANT / LESSEE", value: `${tenant}` },
          { label: "PREMISES LOCATION", value: `${data.rentalAddress || "Leased Premises"}` },
          { label: "PRIMARY LEASE DATE", value: `${data.leaseDate || "Existing Lease"}` },
          { label: "ADDENDUM CLASSIFICATION", value: "PET ADDENDUM AND DAMAGE INDEMNITY RIDER" },
          { label: "STATUTORY GOVERNANCE", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Incorporation into Residential Lease",
        type: "body",
        paragraphs: [
          `This Pet Addendum is entered into on ${data.noticeDate || "the effective date"}, and is incorporated into and made an integral part of the residential lease agreement dated ${data.leaseDate || "governing the tenancy"} between Landlord and Tenant for the premises identified above.`,
          `Landlord hereby grants conditional permission to Tenant to keep strictly the authorized animal described below within the dwelling unit, subject to strict compliance with all covenants set forth herein.`,
        ],
        metaTable: [
          { label: "Pet Name & Species", value: `${data.petName || "Pet"} (${data.petType || "Animal"})` },
          { label: "Breed & Approximate Weight", value: `${data.petBreed || "Domestic"} | ${data.petWeight || "N/A"}` },
          { label: "Age & License / Tag ID", value: `${data.petAge || "Adult"} | Rabies Tag: ${data.rabiesTagNumber || "On File"}` },
        ],
      },
      {
        title: "2. Financial Terms: Deposits and Pet Rent",
        type: "body",
        paragraphs: [
          `Tenant agrees to the following financial terms in consideration of pet authorization:`,
        ],
        bulletPoints: [
          `Additional Refundable Pet Deposit: Tenant shall pay the sum of $${petDeposit} USD upon signing, to be held in accordance with state security deposit laws as security for pet-related damages.`,
          `Monthly Pet Rent: Tenant shall pay additional rent in the amount of $${petRent} USD per calendar month, due concurrently with the standard monthly rental payment.`,
          `One-Time Non-Refundable Fee: Tenant shall pay a non-refundable pet preparation and administrative fee of $${oneTimeFee} USD.`,
        ],
      },
      {
        title: "3. Tenant Operational Rules and Pet Covenants",
        type: "body",
        paragraphs: [
          `Tenant covenants and agrees to adhere strictly to the following pet control standards:`,
        ],
        bulletPoints: [
          `Restraint and Control: The pet shall never be permitted outside the dwelling unit unattended or off-leash. While in common areas, hallways, or grounds, the pet must be restrained by a handheld leash not exceeding six feet in length.`,
          `Sanitation: Tenant shall promptly and properly dispose of all pet waste in designated outdoor receptacles. Indoor litter boxes or pads must be maintained in a clean, odor-free, and sanitary condition daily.`,
          `Disturbances: The pet shall not disturb neighbors or fellow residents with excessive barking, howling, scratching, or aggressive conduct.`,
          `Veterinary Standards: Tenant warrants that the pet has received all required vaccinations (including rabies) and has been treated for flea and tick prevention.`,
        ],
      },
      {
        title: "4. Revocation of Permission and Tenant Indemnification",
        type: "body",
        paragraphs: [
          `In the event the pet displays vicious behavior, causes structural property damage, or repeatedly creates a nuisance, Landlord reserves the statutory right to revoke pet authorization upon written notice.`,
          `Tenant agrees to indemnify, defend, and hold Landlord and property management completely harmless from all claims, injuries, property damage, veterinary costs, or lawsuits arising directly or indirectly from the presence, actions, or behavior of said pet.`,
        ],
      },
      {
        type: "signatures",
        paragraphs: [],
      },
    ];
  },
};
