"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ALL_DOCUMENTS } from "@/config/documents";
import { US_STATES } from "@/data/usStates";
import { Scale, ChevronRight, FileText, CheckCircle2 } from "lucide-react";

// Top featured documents for quick pills
const FEATURED_DOC_SHORTCUTS = [
  { slug: "residential-lease-agreement", label: "Residential Lease" },
  { slug: "eviction-notice-non-payment", label: "Eviction Notice" },
  { slug: "demand-letter", label: "Demand Letter" },
  { slug: "llc-operating-agreement", label: "LLC Agreement" },
  { slug: "promissory-note", label: "Promissory Note" },
  { slug: "motor-vehicle-bill-of-sale", label: "Vehicle Bill of Sale" },
  { slug: "standard-nda", label: "NDA Agreement" },
  { slug: "living-will-directive", label: "Living Will" },
];

export function StateStatuteExplorer() {
  const [selectedDocSlug, setSelectedDocSlug] = useState<string>("residential-lease-agreement");

  const selectedDoc =
    ALL_DOCUMENTS.find((d) => d.slug === selectedDocSlug) || ALL_DOCUMENTS[0];

  return (
    <section id="statutes" className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Nationwide Coverage
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Programmatic Statutes for All 50 States
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Select any legal document and US state below to inspect exact state statutes, required waiting periods, and court jurisdiction.
        </p>
      </div>

      <div className="p-5 sm:p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-5">
        {/* Document Selector Controls */}
        <div className="space-y-3 pb-3 border-b border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <label htmlFor="document-explorer-select" className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Legal Document To Explore by State:
              </label>
            </div>

            {/* Dropdown with all 80 documents */}
            <div className="w-full sm:w-80">
              <select
                id="document-explorer-select"
                value={selectedDocSlug}
                onChange={(e) => setSelectedDocSlug(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-xs text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              >
                {ALL_DOCUMENTS.map((doc) => (
                  <option key={doc.id} value={doc.slug} className="bg-slate-900 text-white">
                    {doc.title} ({doc.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Selection Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="text-[11px] text-slate-500 font-medium mr-1 whitespace-nowrap">
              Popular:
            </span>
            {FEATURED_DOC_SHORTCUTS.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setSelectedDocSlug(item.slug)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDocSlug === item.slug
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Active selection info */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>
                Browsing <strong className="text-white">{selectedDoc.title}</strong> across 50 US States + DC
              </span>
            </span>
            <span className="text-[11px] text-blue-400 font-medium hidden sm:inline">
              $9.90 Flat Fee: Instant PDF Download
            </span>
          </div>
        </div>

        {/* 50 States Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 text-xs">
          {US_STATES.map((state) => (
            <Link
              key={state.code}
              href={`/forms/${selectedDocSlug}/${state.slug}`}
              className="p-2.5 bg-slate-950 hover:bg-blue-950/60 border border-slate-800/80 hover:border-blue-600/60 rounded-xl text-slate-300 hover:text-white transition-all flex items-center justify-between group"
            >
              <span className="truncate group-hover:text-blue-200 transition-colors">
                {state.name}
              </span>
              <span className="text-[10px] text-slate-500 font-mono ml-1.5 group-hover:text-blue-400 transition-colors">
                {state.code}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
