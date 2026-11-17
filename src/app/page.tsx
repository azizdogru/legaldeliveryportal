import React from "react";
import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Lock,
  ArrowRight,
  Search,
  Sparkles,
  Award,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Star,
  Check,
  Zap,
} from "lucide-react";
import { ALL_DOCUMENTS } from "@/config/documents";
import { US_STATES } from "@/data/usStates";
import { CustomerReviewsSection } from "@/components/common/CustomerReviewsSection";
import { CompetitorComparison } from "@/components/common/CompetitorComparison";
import { AGGREGATE_RATING } from "@/data/reviews";

export const metadata = {
  title: "Court-Admissible Legal Documents in 3 Minutes | LegalDeliveryPortal.com",
  description:
    "State-specific legal notices, demands, and agreements compliant with all 50 states. One-time flat fee with zero subscriptions. Instant court-ready PDF download.",
};

const FAQ_ITEMS = [
  {
    q: "Are documents generated on LegalDeliveryPortal.com legally valid in court?",
    a: "Yes. All documents are researched and structured to comply with state-specific statutes, mandatory notice windows, and civil rules of procedure. Each PDF includes formal caption formatting, statutory code citations, and a verified Certificate of Service required for evidentiary filing in small claims or civil court.",
  },
  {
    q: "Why is the pricing one-time flat fee with zero monthly subscription?",
    a: "Traditional legal tech competitors lock users into recurring $39 to $59 monthly subscriptions with tricky cancellation traps. LegalDeliveryPortal operates on a straightforward pay-per-document model: you pay once and receive immediate, permanent access to download your court-ready PDF without recurring charges.",
  },
  {
    q: "How does the client-side PDF engine protect my privacy?",
    a: "Your sensitive personal, property, and financial information is processed directly in your web browser using client-side vector compilation. We do not store your confidential legal data in external databases, ensuring complete privacy and zero data leak exposure.",
  },
  {
    q: "What delivery options are provided?",
    a: "Upon completing your document in our interactive editor, you can preview the generated document in real time. Once unlocked, you receive an instant download of a high-resolution, unwatermarked PDF ready for printing, email attachment, or formal mailing via USPS Certified Mail.",
  },
  {
    q: "What states and jurisdictions are covered?",
    a: "All 50 US States and Washington D.C. are fully covered. When you select your state, the portal automatically injects that specific state's statutes, statutory notice windows, and proper court system references.",
  },
];

export default function HomePage() {
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Legal Delivery Portal",
    url: "https://legaldeliveryportal.com",
    description:
      "State-specific legal notices, demand letters, and formal agreements compliant with all 50 US states. One-time flat fee with zero subscriptions.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All modern web browsers",
    offers: {
      "@type": "Offer",
      price: "9.90",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
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
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="space-y-20 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Rating Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-slate-200 text-xs font-semibold shadow-inner">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold">{AGGREGATE_RATING.ratingValue} / 5.0</span>
            <span className="text-slate-400">({AGGREGATE_RATING.reviewCount.toLocaleString()} Verified Legal Filings)</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Court-Admissible Legal Documents in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300">
              3 Minutes.
            </span>
          </h1>

          {/* Subtitle highlighting competitor advantage */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            State-specific, lawyer-researched legal notices, demands, and agreements. One-time flat fee with <strong className="text-slate-200">zero recurring subscription traps</strong>. Instant court-ready PDF download.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link
              href="/forms"
              className="w-full sm:w-auto py-3.5 px-7 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-blue-950/50 flex items-center justify-center space-x-2 transition-all"
            >
              <span>Browse Legal Documents</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#statutes"
              className="w-full sm:w-auto py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium rounded-xl text-sm border border-slate-700/80 transition-colors"
            >
              View 50-State Statutes
            </Link>
          </div>

          {/* Trust Banner Grid */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">No Subscriptions</div>
                <div className="text-[11px] text-slate-400">One-time flat purchase</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-2.5">
              <Scale className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">50 States + DC</div>
                <div className="text-[11px] text-slate-400">Specific state statutes</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-2.5">
              <Download className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Instant Vector PDF</div>
                <div className="text-[11px] text-slate-400">Court-admissible quality</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-2.5">
              <Lock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Confidential Draft</div>
                <div className="text-[11px] text-slate-400">Client browser storage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENT CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Ready To File Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Select Your Legal Notice or Agreement
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click any document below to open the interactive builder with live preview and state statute citations.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold">
              Instant Download Available
            </span>
          </div>
        </div>

        {/* Clickable Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-950/30 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <Link
                    href={`/forms/${doc.slug}`}
                    className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400 group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                  </Link>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-semibold text-blue-300 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-full">
                      {doc.badgeText}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                      One-Time
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {doc.category}
                  </div>
                  {/* Clickable Title */}
                  <h3 className="text-base font-bold text-white mt-1">
                    <Link
                      href={`/forms/${doc.slug}`}
                      className="hover:text-blue-400 transition-colors inline-block"
                    >
                      {doc.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {doc.features.slice(0, 3).map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center space-x-2 text-[11px] text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <Link
                  href={`/forms/${doc.slug}`}
                  className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow transition-all"
                >
                  <span>Start Drafting</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/forms/${doc.slug}/california`}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                >
                  Pick State
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPETITOR ADVANTAGE COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompetitorComparison />
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              From Blank Screen to Court-Admissible PDF
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              No lawyer appointments, no high retainer costs, no recurring monthly fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-white">
                Select Your State & Document
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose from our legal library and pick your US state. The portal automatically populates the exact statutory rules, waiting periods, and court jurisdiction.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-white">
                Draft with Live Real-Time Preview
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fill out the step-by-step form while watching your document render in real time. The engine automatically wraps lines, balances page layout, and formats court headers.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-white">
                Download Official PDF Instantly
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlock your pristine, watermark-free vector PDF with a simple one-time payment. Print, sign, serve via certified mail, or submit directly in court proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Verified Customer Satisfaction
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Trusted by Landlords, Contractors & Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real feedback from users who resolved legal disputes and served notices across the United States.
          </p>
        </div>

        <CustomerReviewsSection />
      </section>

      {/* 50-STATE STATUTE EXPLORER SECTION */}
      <section id="statutes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Nationwide Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Programmatic Statutes for All 50 States
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Browse our state-specific statutory landing pages. Every page includes exact legal citations, small claims limits, and notice deadlines.
          </p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
            Select Any State to View Dedicated Legal Guides:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 text-xs">
            {US_STATES.map((state) => (
              <Link
                key={state.code}
                href={`/forms/demand-letter/${state.slug}`}
                className="p-2 bg-slate-950 hover:bg-blue-950/50 border border-slate-800/80 hover:border-blue-700/60 rounded-xl text-slate-300 hover:text-white transition-colors flex items-center justify-between"
              >
                <span className="truncate">{state.name}</span>
                <span className="text-[10px] text-slate-500 font-mono ml-1">
                  {state.code}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to know about LegalDeliveryPortal and our court-ready PDF documents.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2"
            >
              <h3 className="text-sm font-bold text-white flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>{item.q}</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
