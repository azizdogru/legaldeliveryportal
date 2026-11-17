"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ALL_DOCUMENTS } from "@/config/documents";
import {
  FileText,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scale,
  Flame,
  Home,
  Briefcase,
  Scroll,
  Car,
  ChevronRight,
} from "lucide-react";

interface CategoryTab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  slugs?: string[];
}

const CATEGORY_TABS: CategoryTab[] = [
  {
    id: "popular",
    name: "Most Popular",
    icon: Flame,
    slugs: [
      "residential-lease-agreement",
      "eviction-notice-non-payment",
      "llc-operating-agreement",
      "standard-nda",
      "promissory-note",
      "motor-vehicle-bill-of-sale",
      "living-will-directive",
      "subcontractor-agreement",
      "demand-letter",
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate & Leases",
    icon: Home,
    slugs: [
      "residential-lease-agreement",
      "eviction-notice-non-payment",
      "commercial-lease-agreement",
      "month-to-month-lease",
      "sublease-agreement",
      "roommate-agreement",
      "quitclaim-deed",
      "general-warranty-deed",
      "security-deposit-demand",
    ],
  },
  {
    id: "business",
    name: "Business & Corporate",
    icon: Briefcase,
    slugs: [
      "llc-operating-agreement",
      "standard-nda",
      "promissory-note",
      "subcontractor-agreement",
      "independent-contractor-agreement",
      "partnership-agreement",
      "corporate-bylaws",
      "consulting-services-agreement",
      "non-compete-agreement",
    ],
  },
  {
    id: "estate",
    name: "Estate & Family",
    icon: Scroll,
    slugs: [
      "living-will-directive",
      "last-will-and-testament",
      "revocation-of-power-of-attorney",
      "prenuptial-agreement",
      "marital-separation-agreement",
      "codicil-to-will",
      "temporary-guardianship-agreement",
      "affidavit-of-heirship",
      "child-travel-consent",
    ],
  },
  {
    id: "sales",
    name: "Vehicles & Sales",
    icon: Car,
    slugs: [
      "motor-vehicle-bill-of-sale",
      "general-bill-of-sale",
      "dmv-release-of-liability",
      "firearm-bill-of-sale",
      "puppy-pet-bill-of-sale",
      "boat-bill-of-sale",
      "bill-of-sale-trailer",
      "bill-of-sale-as-is",
      "vehicle-dmv-power-of-attorney",
    ],
  },
];

export function HomepageShowcase() {
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentTab = CATEGORY_TABS.find((t) => t.id === activeTab) || CATEGORY_TABS[0];

  let displayedDocs = ALL_DOCUMENTS;

  if (searchQuery.trim().length > 0) {
    const query = searchQuery.toLowerCase().trim();
    displayedDocs = ALL_DOCUMENTS.filter((doc) => {
      return (
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        doc.searchKeywords.some((k) => k.toLowerCase().includes(query))
      );
    }).slice(0, 9);
  } else if (currentTab.slugs) {
    displayedDocs = currentTab.slugs
      .map((slug) => ALL_DOCUMENTS.find((d) => d.slug === slug))
      .filter((d): d is (typeof ALL_DOCUMENTS)[0] => !!d)
      .slice(0, 9);
  } else {
    displayedDocs = ALL_DOCUMENTS.slice(0, 9);
  }

  return (
    <section className="space-y-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Statutory Templates</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Select Your Legal Notice or Agreement
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Choose from high-converting legal documents. Live preview adapts to all 50 US states.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="w-full md:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 80+ documents..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300 text-xs px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills Tabs (visible when not searching) */}
      {!searchQuery && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/50"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Search Feedback */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl">
          <span>
            Found <strong className="text-white">{displayedDocs.length}</strong> legal forms for "{searchQuery}"
          </span>
          <Link href="/forms" className="text-blue-400 hover:text-blue-300 font-medium">
            Search full catalog with 50-state filter &rarr;
          </Link>
        </div>
      )}

      {/* Curated Document Cards Grid (Top 6 to 9 documents) */}
      {displayedDocs.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <p className="text-sm text-slate-400">
            No document found matching "{searchQuery}".
          </p>
          <Link
            href="/forms"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            <span>Browse all 80 documents in full catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-950/30 group"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between">
                  <Link
                    href={`/forms/${doc.slug}`}
                    className="p-2 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400 group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                  </Link>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-semibold text-blue-300 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-full">
                      {doc.badgeText}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full font-mono">
                      $9.90
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {doc.category}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">
                    <Link
                      href={`/forms/${doc.slug}`}
                      className="hover:text-blue-400 transition-colors line-clamp-1"
                    >
                      {doc.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-800/80">
                  {doc.features.slice(0, 2).map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center space-x-2 text-[11px] text-slate-300"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <Link
                  href={`/forms/${doc.slug}`}
                  className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow transition-all"
                >
                  <span>Draft in 3 Min</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/forms/${doc.slug}/california`}
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                >
                  Pick State
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prominent Catalog Discovery Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-[11px] font-semibold">
            <Scale className="w-3 h-3" />
            <span>Complete 80-Document Library</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Need a different state-specific legal notice or agreement?
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Explore our complete statutory database covering eviction notices, deeds, LLC filings, promissory notes, and bills of sale across all 50 states.
          </p>
        </div>

        <Link
          href="/forms"
          className="whitespace-nowrap py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-xl shadow-blue-950/50 flex items-center space-x-2 transition-all flex-shrink-0"
        >
          <span>View All 80 Documents in Catalog</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
