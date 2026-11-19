import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ALL_DOCUMENTS, getDocumentBySlug } from "@/config/documents";
import { US_STATES, getStateBySlug } from "@/data/usStates";
import { getStatuteForDocumentAndState } from "@/data/statutes";
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
  AlertTriangle,
  Building,
  Star,
  Check,
  BookOpen,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
    state: string;
  };
}

export async function generateStaticParams() {
  const params: { slug: string; state: string }[] = [];
  for (const doc of ALL_DOCUMENTS) {
    for (const st of US_STATES) {
      params.push({
        slug: doc.slug,
        state: st.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = getDocumentBySlug(params.slug);
  const state = getStateBySlug(params.state);
  if (!doc || !state) return {};

  const statute = getStatuteForDocumentAndState(doc.slug, state.code);

  const title = `${doc.title} in ${state.name} (${state.code}): Court-Ready PDF`;
  const description = `Create an official ${doc.title} for ${state.name}. Complies with ${statute.statuteCitation}, requires ${statute.noticePeriodDays} days notice in the ${state.courtSystemName}. Rated 4.9/5 with zero subscriptions.`;

  return {
    title,
    description,
    keywords: [
      `${doc.slug} ${state.slug}`,
      `${doc.title.toLowerCase()} ${state.name.toLowerCase()}`,
      `${state.name} legal notice form`,
      `${state.code} ${doc.shortTitle.toLowerCase()}`,
      statute.statuteCitation,
    ],
    alternates: {
      canonical: `https://legaldeliveryportal.com/forms/${doc.slug}/${state.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://legaldeliveryportal.com/forms/${doc.slug}/${state.slug}`,
    },
  };
}

export default function StateDocumentLandingPage({ params }: PageProps) {
  const doc = getDocumentBySlug(params.slug);
  const state = getStateBySlug(params.state);

  if (!doc || !state) notFound();

  const statute = getStatuteForDocumentAndState(doc.slug, state.code);

  // 5 to 6 realistic, state-specific and document-specific FAQs
  const stateFaqs = [
    {
      q: `What is the statutory notice period for a ${doc.title} in ${state.name}?`,
      a: `Under ${statute.statuteCitation}, the required statutory notice period in ${state.name} is ${statute.noticePeriodDays} calendar days. The issuing party must provide this full statutory window before initiating formal civil litigation or eviction proceedings. Notice days begin the day after valid service.`,
    },
    {
      q: `Which court system possesses jurisdiction for ${doc.title} disputes in ${state.name}?`,
      a: `In ${state.name}, actions arising from this notice or agreement are adjudicated in the ${state.courtSystemName}. For monetary claims within small claims limits (up to ${state.smallClaimsLimit}), proceedings are handled in the local small claims or district division without mandatory attorney representation.`,
    },
    {
      q: `How must this legal document be delivered to be admissible in ${state.name}?`,
      a: `To establish admissible proof of service in ${state.name}, the document should be delivered via ${statute.serviceMethods.join(", ")}. Our portal generates a formal Certificate of Service verifying the delivery method, date, and declarant identity under penalty of perjury.`,
    },
    {
      q: `What are the legal consequences if the recipient ignores this notice in ${state.name}?`,
      a: `${statute.penaltiesOrConsequences} Serving formal written notice establishes that the recipient had actual knowledge of the violation or demand, which supports claims for bad faith, court sanctions, and statutory attorney fees.`,
    },
    {
      q: `Does a ${doc.title} require notarization in ${state.name}?`,
      a: `While routine pre-suit demand notices do not always mandate a notary seal under ${state.name} law, having a verified signature or Notary Jurat prevents recipient identity disputes. Our generated PDF includes both standard signature lines and an optional Notary Jurat block for county recording or formal court submission.`,
    },
    {
      q: `Why use LegalDeliveryPortal for ${state.name} instead of a generic form?`,
      a: `Generic legal forms online lack state-specific statutory citations and notice days. LegalDeliveryPortal specifically incorporates ${statute.statuteCitation} and ${state.name} court jurisdiction standards directly into the vector PDF output for a simple one-time flat fee with zero subscriptions.`,
    },
  ];

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${doc.title} (${state.name} Legal Form)`,
    description: `Official court-admissible ${doc.title} formatted specifically for ${state.name} under ${statute.statuteCitation}. Includes statutory notice periods, notary jurat, and proof of service.`,
    image: "https://legaldeliveryportal.com/og-image.png",
    brand: {
      "@type": "Brand",
      name: "Legal Delivery Portal",
    },
    sku: `LDP-${doc.slug}-${state.code}`,
    mpn: `LDP-${doc.slug.toUpperCase()}-${state.code}`,
    offers: {
      "@type": "Offer",
      url: `https://legaldeliveryportal.com/forms/${doc.slug}/${state.slug}`,
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
    name: `${doc.title} Preparation (${state.name})`,
    serviceType: "Automated Legal Notice & Document Delivery",
    url: `https://legaldeliveryportal.com/forms/${doc.slug}/${state.slug}`,
    description: `Automated official legal document and statutory notice portal for ${state.name}. Compliant with ${statute.statuteCitation}.`,
    offers: {
      "@type": "Offer",
      price: doc.priceAmount.toFixed(2),
      priceCurrency: "USD",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: state.name,
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
    name: `${doc.title} (${state.name} Edition)`,
    url: `https://legaldeliveryportal.com/forms/${doc.slug}/${state.slug}`,
    description: `State-specific ${doc.title} generator for ${state.name}. Complies with ${statute.statuteCitation}.`,
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

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: stateFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
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
      {
        "@type": "ListItem",
        position: 4,
        name: `${state.name} Edition`,
        item: `https://legaldeliveryportal.com/forms/${doc.slug}/${state.slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Breadcrumb Bar */}
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
            <Link href={`/forms/${doc.slug}`} className="hover:text-white transition-colors">
              {doc.shortTitle}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-200 font-semibold">{state.name} ({state.code})</span>
          </nav>
        </div>
      </div>

      {/* State-Specific Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
              {state.name} Legal Jurisdiction
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              One-Time Purchase
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700 font-mono">
              Notice Window: {statute.noticePeriodDays} Days
            </span>
            <div className="flex items-center space-x-1 text-amber-400 text-xs pl-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-white">{AGGREGATE_RATING.ratingValue}</span>
              <span className="text-slate-500">({AGGREGATE_RATING.reviewCount})</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {state.name} {doc.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Researched for {state.name} practice. Formatted with official court captioning, {statute.statuteCitation} references, and full Certificate of Service for filing in the {state.courtSystemName}.
          </p>

          {/* Quick-Action Hero Jump Button */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#document-builder"
              className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-950/50 flex items-center space-x-2 transition-all"
            >
              <span>Start Drafting {state.code} Document ($9.90)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-xs text-slate-400 font-medium">
              Instant PDF | Zero Subscriptions
            </span>
          </div>
        </div>

        {/* Mobile-Optimized Compact Statute Summary (Mobile Viewport) */}
        <div className="block lg:hidden p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>{state.name} Statutory Law</span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
              {statute.statuteCitation}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800/80">
              <span className="text-slate-500 block text-[10px]">Notice Window:</span>
              <span className="text-blue-400 font-bold text-xs">{statute.noticePeriodDays} Days</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800/80">
              <span className="text-slate-500 block text-[10px]">Small Claims Limit:</span>
              <span className="text-slate-200 font-bold text-xs">{state.smallClaimsLimit}</span>
            </div>
          </div>

          {/* Expandable Full Legal Details */}
          <details className="text-xs text-slate-300 pt-1 group">
            <summary className="cursor-pointer font-semibold text-blue-400 hover:text-blue-300 flex items-center justify-between py-1">
              <span>View Full Legal Matrix & Penalties</span>
              <span className="text-slate-500 text-[10px] group-open:rotate-90 transition-transform">&rarr;</span>
            </summary>
            <div className="pt-2 space-y-2 text-xs text-slate-400 border-t border-slate-800/80 mt-1">
              <p><strong className="text-white">Summary:</strong> {statute.statuteSummary}</p>
              <p><strong className="text-white">Court:</strong> {state.courtSystemName}</p>
              <p><strong className="text-white">Penalties:</strong> {statute.penaltiesOrConsequences}</p>
            </div>
          </details>
        </div>

        {/* Desktop State Statutes Table Card (Large Viewports) */}
        <div className="hidden lg:block mt-6 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-white uppercase tracking-wider">
            <Scale className="w-4 h-4 text-blue-400" />
            <span>{state.name} Statutory Law & Requirements Matrix</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px]">Primary Legal Code:</span>
              <span className="text-slate-200 font-bold mt-0.5 block">{statute.statuteCitation}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px]">Statute Name:</span>
              <span className="text-slate-200 font-bold mt-0.5 block truncate">{statute.statuteName}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px]">Statutory Waiting Period:</span>
              <span className="text-blue-400 font-bold mt-0.5 block">{statute.noticePeriodDays} Calendar Days</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px]">Court System & Limit:</span>
              <span className="text-slate-200 font-bold mt-0.5 block truncate">
                {state.courtSystemName} ({state.smallClaimsLimit})
              </span>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-300 leading-relaxed border-t border-slate-800">
            <strong className="text-white">State Statutory Summary:</strong> {statute.statuteSummary}
          </div>

          {/* Deep State Guidance Specific to this State */}
          {statute.stateSpecificRules && statute.stateSpecificRules.length > 0 && (
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-2">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{state.name} Procedural Practice Notes:</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {statute.stateSpecificRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-blue-400 font-bold mt-0.5">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Key Statutory Requirements Mandated by {state.name} Law:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {statute.keyRequirements.map((req, rIdx) => (
                <div key={rIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Live Builder for this State */}
      <section id="document-builder" className="border-t border-slate-800/80 pt-6 scroll-mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {state.name} Legal Form Builder
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Draft Your {state.name} {doc.shortTitle}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            All fields adapt to {state.name} statutory rules. Live PDF updates continuously.
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DynamicDocumentForm docSlug={doc.slug} initialStateCode={state.code} />
        </div>
      </section>

      {/* Substantive In-Depth Legal Guidance for this State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Legal Admissibility Guide
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Enforcing a {doc.title} in {state.name} Courts
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Essential civil procedure guidelines, proof of service protocols, and court filing standards for {state.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Notice Window & Timing</span>
              </h3>
              <p>
                In {state.name}, the statutory notice clock begins the day after formal delivery is perfected. Under {statute.statuteCitation}, you must provide the full statutory waiting period of {statute.noticePeriodDays} calendar days. If the final day falls on a weekend or state judicial holiday, compliance time extends to the next business day.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Proof of Service Protocol</span>
              </h3>
              <p>
                Courts in {state.name} strictly enforce verified service. Serving via USPS Certified Mail with Return Receipt Requested or licensed process server creates an unassailable record. Our generated PDF includes a formal Certificate of Service signed under penalty of perjury to satisfy local evidentiary rules.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Jurisdiction & Small Claims</span>
              </h3>
              <p>
                Should litigation become necessary, claims up to {state.smallClaimsLimit} are heard in the small claims division of {state.courtSystemName}. Claims exceeding this limit must be filed in the general civil division. Citing {statute.statuteCitation} establishes formal condition precedent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison (Why Flat Pricing Wins) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompetitorComparison />
      </section>

      {/* Verified Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomerReviewsSection docTitle={doc.title} stateName={state.name} />
      </section>

      {/* State-Specific FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {state.name} Legal Insights
          </span>
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions for {state.name}
          </h2>
          <p className="text-xs text-slate-400">
            Specific legal standards, court jurisdictions, and notice rules under {state.name} statutes.
          </p>
        </div>

        <div className="space-y-4">
          {stateFaqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2"
            >
              <h3 className="text-sm font-bold text-white flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Switch State Footer Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Need this document for a different state?
          </h3>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {US_STATES.map((st) => (
              <Link
                key={st.code}
                href={`/forms/${doc.slug}/${st.slug}`}
                className={`px-2 py-1 rounded-lg border text-[11px] transition-colors ${
                  st.code === state.code
                    ? "bg-blue-600 text-white border-blue-500 font-bold"
                    : "bg-slate-950 text-slate-400 hover:text-white border-slate-800"
                }`}
              >
                {st.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Sticky Mobile Quick Action Bar */}
      <div className="lg:hidden fixed bottom-3 inset-x-3 z-30 bg-slate-900/95 border border-blue-600/40 p-2.5 rounded-2xl backdrop-blur-md shadow-2xl flex items-center justify-between">
        <div className="truncate mr-2">
          <span className="text-[10px] text-blue-400 font-semibold uppercase block truncate">
            {state.code} {doc.shortTitle}
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
