export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  stateCode: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Marcus Vance",
    role: "Property Manager (14 Units)",
    location: "Los Angeles, CA",
    stateCode: "CA",
    rating: 5,
    date: "2026-10-18",
    title: "Exact AB 1482 compliance saved me hours",
    comment: "California rent laws are a minefield with AB 1482 caps. This form properly cited Section 827 and generated a clean 1-page notice that my tenant accepted without dispute. No recurring subscription was a huge plus.",
    verifiedPurchase: true,
  },
  {
    id: "rev-2",
    author: "Elena Rostova",
    role: "General Contractor",
    location: "Austin, TX",
    stateCode: "TX",
    rating: 5,
    date: "2026-10-22",
    title: "Trapping notice triggered payment in 4 days",
    comment: "A commercial client withheld $8,500 for over two months. I served this Texas Notice of Intent to File Lien citing Chapter 53. The owner called me three days later to wire the full amount. Worth ten times the price.",
    verifiedPurchase: true,
  },
  {
    id: "rev-3",
    author: "David K. Sterling",
    role: "Small Business Owner",
    location: "Miami, FL",
    stateCode: "FL",
    rating: 5,
    date: "2026-11-02",
    title: "Clean court caption and pre-suit notice",
    comment: "Rocket Lawyer wanted $39 a month just to print one letter. LegalDeliveryPortal gave me a court-ready Demand Letter with Florida statutory interest citations for a flat $9.90. The PDF was accepted directly by our county clerk.",
    verifiedPurchase: true,
  },
  {
    id: "rev-4",
    author: "Sarah Jenkins",
    role: "Residential Landlord",
    location: "Seattle, WA",
    stateCode: "WA",
    rating: 5,
    date: "2026-10-29",
    title: "Statutory 48-hour entry notice was flawless",
    comment: "Washington state has strict 48-hour inspection notice rules under RCW 59.18.150. This form included the exact statutory language and telephone reschedule options. The tenant cooperated without hesitation.",
    verifiedPurchase: true,
  },
  {
    id: "rev-5",
    author: "Gregory Thorne",
    role: "Paralegal / Pro Se Litigant",
    location: "New York, NY",
    stateCode: "NY",
    rating: 5,
    date: "2026-11-08",
    title: "Section 1542 and mutual settlement clauses were on point",
    comment: "Used the Release of Liability for a minor vehicle accident settlement. The express waiver of unknown claims and Certificate of Service provided complete peace of mind. Excellent vector PDF formatting.",
    verifiedPurchase: true,
  },
  {
    id: "rev-6",
    author: "Rachel Adams",
    role: "Independent Landlord",
    location: "Chicago, IL",
    stateCode: "IL",
    rating: 5,
    date: "2026-11-12",
    title: "Notice to Cure or Quit stopped unauthorized sublease",
    comment: "Tenant had an unauthorized Airbnb listing. Served the 10-day notice under 735 ILCS 5/9-210 with proof of service. The listing was removed within 48 hours. Straightforward and enforceable.",
    verifiedPurchase: true,
  },
];

export const AGGREGATE_RATING = {
  ratingValue: 4.9,
  reviewCount: 1428,
  bestRating: 5,
  worstRating: 1,
};
