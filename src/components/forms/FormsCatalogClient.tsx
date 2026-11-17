"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ALL_DOCUMENTS } from "@/config/documents";
import { US_STATES } from "@/data/usStates";
import { AGGREGATE_RATING } from "@/data/reviews";
import {
  FileText,
  Search,
  CheckCircle2,
  ArrowRight,
  Scale,
  Star,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Demands & Disputes",
  "Landlord & Tenant",
  "Real Estate & Construction",
  "Business & Employment",
  "Estate Planning & Healthcare",
  "Bills of Sale & Transfers",
  "Finance & Debt Relief",
] as const;

export function FormsCatalogClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStateCode, setSelectedStateCode] = useState<string>("CA");

  const filteredDocs = ALL_DOCUMENTS.filter((doc) => {
    const matchesCategory =
      selectedCategory === "All" ||
      doc.category === selectedCategory ||
      doc.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(doc.category.toLowerCase());
    const matchesSearch =
      searchQuery.trim() === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.searchKeywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const selectedState =
    US_STATES.find((s) => s.code === selectedStateCode) || US_STATES[4];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Official Legal Library</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>{AGGREGATE_RATING.ratingValue} / 5.0 ({AGGREGATE_RATING.reviewCount} Ratings)</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Court-Admissible Legal Document Catalog
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Every template is researched by legal professionals and programmatically linked to state statutes. One-time flat fee with zero subscriptions and instant court-ready PDF download.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by legal keyword (e.g. rent increase, debt, lien, pet, repair)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* State Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-300 font-medium whitespace-nowrap">
            Target State:
          </span>
          <select
            value={selectedStateCode}
            onChange={(e) => setSelectedStateCode(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <FileText className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No documents match your query</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or selecting a different category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-950/20 group"
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
                      No Subscription
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {doc.category}
                  </div>
                  <h2 className="text-base font-bold text-white mt-1">
                    <Link
                      href={`/forms/${doc.slug}`}
                      className="hover:text-blue-400 transition-colors inline-block"
                    >
                      {doc.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {doc.features.map((feat, fIdx) => (
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

              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <Link
                  href={`/forms/${doc.slug}/${selectedState.slug}`}
                  className="flex-1 py-2.5 px-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow transition-all"
                >
                  <span>Draft for {selectedState.code}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/forms/${doc.slug}`}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                >
                  Overview
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
