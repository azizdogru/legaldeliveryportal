import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ALL_DOCUMENTS, getDocumentBySlug } from "@/config/documents";
import { US_STATES } from "@/data/usStates";
import { DynamicDocumentForm } from "@/components/forms/DynamicDocumentForm";
import { CustomerReviewsSection } from "@/components/common/CustomerReviewsSection";
import { CompetitorComparison } from "@/components/common/CompetitorComparison";
import { AGGREGATE_RATING } from "@/data/reviews";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Lock,
  ArrowRight,
  MapPin,
  ChevronRight,
  HelpCircle,
  Star,
  Check,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return ALL_DOCUMENTS.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = getDocumentBySlug(params.slug);
  if (!doc) return {};

  return {
    title: `${doc.title} (50-State Compliant PDF Generator)`,
    description: doc.metaDescription,
    keywords: doc.searchKeywords,
    alternates: {
      canonical: `https://legaldeliveryportal.com/forms/${doc.slug}`,
    },
    openGraph: {
      title: `${doc.title} | LegalDeliveryPortal.com`,
      description: doc.metaDescription,
      url: `https://legaldeliveryportal.com/forms/${doc.slug}`,
    },
  };
}

export default function DocumentOverviewPage({ params }: PageProps) {
  const doc = getDocumentBySlug(params.slug);
  if (!doc) notFound();

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: doc.title,
    description: doc.metaDescription,
    image: "https://legaldeliveryportal.com/og-image.png",
    brand: {
      "@type": "Brand",
      name: "Legal Delivery Portal",
    },
    sku: `LDP-${doc.slug}`,
    mpn: `LDP-${doc.slug.toUpperCase()}`,
    offers: {
      "@type": "Offer",
      url: `https://legaldeliveryportal.com/forms/${doc.slug}`,
      price: doc.priceAmount.toFixed(2),
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      validFrom: "2025-01-01",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Legal Delivery Portal",
        url: "https://legaldeliveryportal.com",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
        refundType: "https://schema.org/FullRefund",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE_RATING.ratingValue.toString(),
      reviewCount: AGGREGATE_RATING.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: doc.title,
    serviceType: "Automated Legal Document Preparation",
    url: `https://legaldeliveryportal.com/forms/${doc.slug}`,
    description: "Nationwide legal document preparation, statutory notice generation, and instant delivery portal.",
    offers: {
      "@type": "Offer",
      price: doc.priceAmount.toFixed(2),
      priceCurrency: "USD",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    provider: {
      "@type": "Organization",
      name: "Legal Delivery Portal",
      url: "https://legaldeliveryportal.com",
    },
  };

  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: doc.title,
    url: `https://legaldeliveryportal.com/forms/${doc.slug}`,
    description: doc.metaDescription,
    applicationCategory: "LegalService",
    operatingSystem: "All modern web browsers",
    offers: {
      "@type": "Offer",
      price: doc.priceAmount.toFixed(2),
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      validFrom: "2025-01-01",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE_RATING.ratingValue.toString(),
      reviewCount: AGGREGATE_RATING.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://legaldeliveryportal.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Forms",
        item: "https://legaldeliveryportal.com/forms",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: doc.title,
        item: `https://legaldeliveryportal.com/forms/${doc.slug}`,
      },
    ],
  };

  return (
    <div className="space-y-12 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Breadcrumb & Top Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/forms" className="hover:text-white transition-colors">
              Legal Documents
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-200 font-semibold">{doc.shortTitle}</span>
          </nav>
        </div>
      </div>

      {/* Document Header Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                {doc.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                One-Time Purchase - Zero Subscriptions
              </span>
              <div className="flex items-center space-x-1 text-amber-400 text-xs pl-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-white">{AGGREGATE_RATING.ratingValue}</span>
                <span className="text-slate-500">({AGGREGATE_RATING.reviewCount} Ratings)</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {doc.title}
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              {doc.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="#document-builder"
              className="py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-950/50 flex items-center justify-center space-x-2 transition-all"
            >
              <span>Launch Live Form & Preview</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {doc.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center space-x-2 text-xs text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 50-State Selector Matrix for this document */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Select Your State for Exact Statute Citations</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Every state enforces unique notice periods, filing deadlines, and service rules.
              </p>
            </div>
            <a
              href="#document-builder"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold self-start sm:self-auto"
            >
              Skip to form below &darr;
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5 text-xs max-h-48 sm:max-h-none overflow-y-auto sm:overflow-visible pr-1 sm:pr-0 scrollbar-none">
            {US_STATES.map((st) => (
              <Link
                key={st.code}
                href={`/forms/${doc.slug}/${st.slug}`}
                className="p-2 bg-slate-950 hover:bg-blue-900/40 border border-slate-800/80 hover:border-blue-700/60 rounded-lg text-slate-300 hover:text-white transition-all text-center flex items-center justify-between"
              >
                <span className="font-semibold">{st.code}</span>
                <span className="text-[10px] text-slate-500 truncate ml-1">
                  {st.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Live Form & Preview Builder */}
      <section id="document-builder" className="border-t border-slate-800/80 pt-6 scroll-mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Interactive Editor
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Draft Your {doc.title}
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Data is auto-saved in your browser. Live preview updates continuously.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DynamicDocumentForm docSlug={doc.slug} initialStateCode="CA" />
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompetitorComparison />
      </section>

      {/* Verified Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomerReviewsSection docTitle={doc.title} />
      </section>

      {/* Floating Sticky Mobile Quick Action Bar */}
      <div className="lg:hidden fixed bottom-3 inset-x-3 z-30 bg-slate-900/95 border border-blue-600/40 p-2.5 rounded-2xl backdrop-blur-md shadow-2xl flex items-center justify-between">
        <div className="truncate mr-2">
          <span className="text-[10px] text-blue-400 font-semibold uppercase block truncate">
            {doc.shortTitle}
          </span>
          <span className="text-xs font-bold text-white">
            $9.90 Flat Fee: Instant PDF
          </span>
        </div>
        <a
          href="#document-builder"
          className="py-2 px-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow flex items-center space-x-1 whitespace-nowrap"
        >
          <span>Start Form</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
