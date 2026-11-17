import { DocumentConfig, DocumentSection, StateStatuteInfo } from "@/types/document";

export const generalBillOfSaleConfig: DocumentConfig = {
  id: "general-bill-of-sale",
  slug: "general-bill-of-sale",
  title: "General Bill of Sale (Personal Property & Assets)",
  shortTitle: "General Bill of Sale",
  category: "Bill of Sale",
  description: "Universal bill of sale transferring ownership of personal property, industrial equipment, electronics, boats, trailers, and valuable assets with unencumbered title warranty and as-is disclaimers.",
  metaDescription: "Generate a universal General Bill of Sale for personal property, equipment, and assets. Includes UCC title warranties and as-is disclaimers for all 50 states. PDF for $9.90.",
  priceFormatted: "$9.90",
  priceAmount: 9.9,
  badgeText: "Universal Asset Transfer",
  iconName: "ShoppingBag",
  searchKeywords: [
    "general bill of sale template pdf",
    "personal property bill of sale form",
    "equipment sales agreement bill of sale",
    "boat trailer bill of sale",
    "as is personal property sales receipt",
    "asset purchase bill of sale",
  ],
  features: [
    "Versatile transfer instrument for equipment, electronics, boats, tools, and personal belongings",
    "Express seller warranty of 100% lien-free, unencumbered title ownership (UCC 2-312)",
    "Strict 'as-is' condition disclaimer shielding seller from operational claims",
    "Includes formal receipt of payment acknowledgment and execution blocks",
  ],
  defaultValues: {
    noticeDate: new Date().toISOString().split("T")[0],
    stateCode: "CA",
    sellerName: "",
    sellerAddress: "",
    sellerPhone: "",
    buyerName: "",
    buyerAddress: "",
    buyerPhone: "",
    propertyCategory: "commercial_equipment",
    propertyDescription: "Commercial zero-turn commercial riding lawn mower, 60-inch cutting deck, Kawasaki 24HP engine.",
    propertyIdentifiers: "Make: Scag Power Equipment | Model: Cheetah II | Serial Number: SCG-9842104-B",
    purchasePrice: "6500.00",
    paymentMethod: "Certified Bank Wire / Cashier Check",
  },
  steps: [
    {
      id: "parties",
      title: "Seller & Buyer Details",
      description: "Enter legal identifying information for the asset transferor and purchaser.",
      fields: [
        {
          name: "sellerName",
          label: "Seller Full Legal Name / Business Entity",
          type: "text",
          placeholder: "e.g., Mark Harrison (Harrison Commercial Landscaping LLC)",
          required: true,
          gridCols: 1,
        },
        {
          name: "sellerAddress",
          label: "Seller Physical Mailing Address",
          type: "text",
          placeholder: "e.g., 240 Industrial Parkway, Atlanta, GA 30318",
          required: true,
          gridCols: 2,
        },
        {
          name: "sellerPhone",
          label: "Seller Phone Number",
          type: "text",
          placeholder: "e.g., (555) 345-6789",
          required: true,
          gridCols: 2,
        },
        {
          name: "buyerName",
          label: "Buyer Full Legal Name / Business Entity",
          type: "text",
          placeholder: "e.g., Daniel Scott Miller",
          required: true,
          gridCols: 1,
        },
        {
          name: "buyerAddress",
          label: "Buyer Physical Address",
          type: "text",
          placeholder: "e.g., 880 Peachtree Street NE, Suite 400, Atlanta, GA 30309",
          required: true,
          gridCols: 2,
        },
        {
          name: "buyerPhone",
          label: "Buyer Phone Number",
          type: "text",
          placeholder: "e.g., (555) 789-0123",
          required: true,
          gridCols: 2,
        },
      ],
    },
    {
      id: "property_data",
      title: "Personal Property Description & Serial Numbers",
      description: "Describe the asset, serial numbers, make, model, and physical condition.",
      fields: [
        {
          name: "propertyCategory",
          label: "Asset Category",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Commercial / Industrial Equipment & Machinery", value: "commercial_equipment" },
            { label: "Boat, Watercraft, Vessel or Trailer", value: "watercraft_trailer" },
            { label: "Electronics, Computers & Office Equipment", value: "electronics" },
            { label: "Household Furniture, Antiques & Jewelry", value: "furniture_jewelry" },
            { label: "General Personal Property & Tools", value: "general_property" },
          ],
        },
        {
          name: "purchasePrice",
          label: "Total Purchase Price ($ USD)",
          type: "currency",
          placeholder: "e.g., 6500.00",
          required: true,
          gridCols: 2,
        },
        {
          name: "propertyDescription",
          label: "Detailed Property Description",
          type: "textarea",
          placeholder: "e.g., Commercial zero-turn commercial riding lawn mower, 60-inch cutting deck, 24HP Kawasaki engine...",
          required: true,
          gridCols: 1,
        },
        {
          name: "propertyIdentifiers",
          label: "Identification Numbers (Make, Model, Serial #, Hull ID)",
          type: "text",
          placeholder: "e.g., Serial Number: 9842104-B | Model: 2022 Cheetah II",
          required: true,
          gridCols: 1,
        },
        {
          name: "paymentMethod",
          label: "Payment Delivery Method",
          type: "select",
          required: true,
          gridCols: 2,
          options: [
            { label: "Cashier Check or Certified Bank Draft", value: "Cashier Check" },
            { label: "Direct Bank Wire Transfer", value: "Bank Wire Transfer" },
            { label: "Cash in US Currency", value: "Cash" },
            { label: "Electronic Funds Transfer (Zelle / PayPal / Venmo)", value: "Electronic Funds Transfer" },
          ],
        },
        {
          name: "noticeDate",
          label: "Date of Sale & Asset Delivery",
          type: "date",
          required: true,
          gridCols: 2,
        },
      ],
    },
  ],
  generatePdfSections: (data: Record<string, any>, statute?: StateStatuteInfo): DocumentSection[] => {
    const seller = data.sellerName || "Seller";
    const buyer = data.buyerName || "Buyer";
    const price = parseFloat(data.purchasePrice || "0").toFixed(2);
    const statuteCite = statute?.statuteCitation || "Uniform Commercial Code (UCC) Article 2 - Sales";

    return [
      {
        type: "parties",
        paragraphs: [],
        metaTable: [
          { label: "DOCUMENT TITLE", value: "GENERAL BILL OF SALE & RECEIPT OF TRANSFER" },
          { label: "SELLER (TRANSFEROR)", value: `${seller}, ${data.sellerAddress || ""} (Phone: ${data.sellerPhone || "On File"})` },
          { label: "BUYER (TRANSFEREE)", value: `${buyer}, ${data.buyerAddress || ""} (Phone: ${data.buyerPhone || "On File"})` },
          { label: "PERSONAL PROPERTY", value: `${data.propertyDescription || "Personal property asset"}` },
          { label: "SERIAL & IDENTIFIERS", value: `${data.propertyIdentifiers || "Identifiers as inspected"}` },
          { label: "PURCHASE CONSIDERATION", value: `$${price} USD paid via ${data.paymentMethod || "Certified Funds"}` },
          { label: "DATE OF TRANSFER", value: `${data.noticeDate || "Date of execution"}` },
          { label: "GOVERNING LAW", value: `${statuteCite}` },
        ],
      },
      {
        title: "1. Transfer of Ownership & Title Warranty",
        type: "body",
        paragraphs: [
          `FOR VALUABLE CONSIDERATION of $${price} USD, the receipt and legal sufficiency of which are hereby acknowledged, Seller ${seller} hereby sells, conveys, grants, assigns, and transfers unto Buyer ${buyer}, all right, title, and interest in and to the personal property and equipment described above.`,
          `Warranty of Title: Seller warrants and covenants under UCC Section 2-312 that Seller is the lawful owner of said property, possesses full legal power and authority to transfer and convey the same, and that said property is free and clear of all liens, mortgages, pledges, security agreements, claims, and encumbrances of any nature whatsoever. Seller agrees to defend said title against all lawful claims.`,
        ],
      },
      {
        title: "2. 'As-Is' Warranty Disclaimer & Risk of Loss",
        type: "body",
        paragraphs: [
          `THE PERSONAL PROPERTY IS TRANSFERRED AND CONVEYED STRICTLY 'AS-IS, WHERE-IS' WITH ALL DEFECTS AND FAULTS. SELLER EXPRESSLY DISCLAIMS ANY AND ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE PURSUANT TO UCC SECTION 2-316.`,
          `Buyer acknowledges that Buyer has been afforded full and complete opportunity to inspect, examine, and test the property prior to purchase and accepts the property in its current operating condition. All risk of loss, damage, casualty, maintenance, and liability regarding the property transfers immediately and permanently to Buyer upon delivery of possession.`,
        ],
      },
      {
        title: "3. Entire Agreement & Binding Effect",
        type: "body",
        paragraphs: [
          `This Bill of Sale constitutes the entire agreement between the parties concerning the sale and transfer of the personal property and supersedes all prior representations, negotiations, or understandings. This instrument shall be binding upon and inure to the benefit of the respective heirs, executors, administrators, legal representatives, and assigns of the parties.`,
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
