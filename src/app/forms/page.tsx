import { Metadata } from "next";
import { FormsCatalogClient } from "@/components/forms/FormsCatalogClient";

export const metadata: Metadata = {
  title: "Court-Admissible Legal Document Catalog | LegalDeliveryPortal.com",
  description:
    "Browse 80+ lawyer-researched, court-admissible legal notices, pre-suit demands, and contracts compliant with all 50 US states. Flat $9.90 one-time fee with zero recurring subscriptions.",
  keywords: [
    "legal document catalog",
    "court ready legal forms",
    "state specific legal templates",
    "demand letter templates",
    "eviction notice forms",
    "bill of sale templates",
    "50 state legal notices",
  ],
  alternates: {
    canonical: "https://legaldeliveryportal.com/forms",
  },
  openGraph: {
    title: "Court-Admissible Legal Document Catalog | LegalDeliveryPortal.com",
    description:
      "Browse 40+ lawyer-researched, court-admissible legal notices, pre-suit demands, and contracts compliant with all 50 US states.",
    url: "https://legaldeliveryportal.com/forms",
  },
};

export default function FormsCatalogPage() {
  return <FormsCatalogClient />;
}
