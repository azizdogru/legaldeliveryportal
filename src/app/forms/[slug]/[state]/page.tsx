import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ALL_DOCUMENTS, getDocumentBySlug } from "@/config/documents";
import { US_STATES, getStateBySlug } from "@/data/usStates";
import { getStatuteForDocumentAndState } from "@/data/statutes";
import { DynamicDocumentForm } from "@/components/forms/DynamicDocumentForm";
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

  const title = `${doc.title} in ${state.name} (${state.code}): Court-Ready PDF ($9.90)`;
  const description = `Create an official ${doc.title} for ${state.name}. Cites ${statute.statuteCitation}, requires ${statute.noticePeriodDays} days statutory notice, and files in ${state.courtSystemName}. Instant download for $9.90.`;

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
      a: `Under ${statute.statuteCitation}, the required statutory notice period in ${state.name} is ${statute.noticePeriodDays} days. The issuing party must provide this full statutory window before initiating formal civil litigation or enforcement proceedings.`,
    },
    {
      q: `Which court system possesses jurisdiction for ${doc.title} disputes in ${state.name}?`,
      a: `In ${state.name}, actions arising from this notice or agreement are adjudicated in the ${state.courtSystemName}. For monetary claims within small claims limits (up to ${state.smallClaimsLimit}), proceedings are handled in the local small claims or district division.`,
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
      a: `Generic legal forms online lack state-specific statutory citations and notice days. LegalDeliveryPortal specifically incorporates ${statute.statuteCitation} and ${state.name} court jurisdiction standards directly into the vector PDF output for a one-time flat fee of $9.90.`,
    },
  ];

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
      price: "9.90",
      priceCurrency: "USD",
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
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
              {state.name} Legal Jurisdiction
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              $9.90 Court-Ready PDF
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700 font-mono">
              Notice Window: {statute.noticePeriodDays} Days
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {state.name} {doc.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Lawyer-researched for {state.name}. Formatted with official court captioning, {statute.statuteCitation} references, and full Certificate of Service for filing in the {state.courtSystemName}.
          </p>
        </div>

        {/* State Statutes Table Card */}
        <div className="mt-6 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-4">
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

          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Key Requirements Mandated by {state.name} Law:
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
      <section id="form" className="border-t border-slate-800/80 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {state.name} Legal Form Builder
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Complete the Form to Generate Your {state.name} Document
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            All fields automatically adapt to {state.name} statutory rules. Live PDF updates continuously.
          </p>
        </div>

        <DynamicDocumentForm docSlug={doc.slug} initialStateCode={state.code} />
      </section>

      {/* State-Specific FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-10">
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
    </div>
  );
}
