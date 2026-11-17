"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scale, Search, ShieldCheck, FileText, Menu, X, ArrowRight } from "lucide-react";
import { ALL_DOCUMENTS } from "@/config/documents";
import { US_STATES } from "@/data/usStates";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = searchQuery.trim()
    ? ALL_DOCUMENTS.filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.searchKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 p-2 flex items-center justify-center text-white shadow-md shadow-blue-900/30 group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1">
                LegalDelivery<span className="text-blue-400">Portal</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wide">
                Court-Ready Notices & Agreements
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-medium text-slate-300">
            <Link href="/forms" className="hover:text-white transition-colors">
              All 10 Documents
            </Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/#statutes" className="hover:text-white transition-colors">
              50-State Statutes
            </Link>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-300 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Flat $9.90 Digital PDF</span>
            </div>
          </nav>

          {/* Quick Search & CTA */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs text-slate-400 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search forms...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 font-mono">
                /
              </kbd>
            </button>

            <Link
              href="/forms"
              className="hidden sm:inline-flex items-center space-x-1.5 py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-950/50 transition-all"
            >
              <span>Create Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 border-b border-slate-800 bg-slate-950/95 space-y-3">
            <Link
              href="/forms"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-200 hover:text-blue-400"
            >
              All 10 Legal Documents
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-200 hover:text-blue-400"
            >
              How It Works
            </Link>
            <Link
              href="/#statutes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-200 hover:text-blue-400"
            >
              50-State Statutory Matrix
            </Link>
            <div className="pt-2">
              <Link
                href="/forms"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2"
              >
                <span>Browse All Templates ($9.90)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3 border-b border-slate-800 flex items-center space-x-3">
              <Search className="w-5 h-5 text-blue-400 ml-2" />
              <input
                type="text"
                autoFocus
                placeholder="Search by legal issue (e.g. rent increase, cease and desist, lien, pet addendum)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-3 space-y-1">
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-400">
                    Type a document title, legal issue, or dispute type.
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                    {ALL_DOCUMENTS.slice(0, 5).map((d) => (
                      <Link
                        key={d.id}
                        href={`/forms/${d.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700"
                      >
                        {d.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredDocs.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No document matches found for &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/forms/${doc.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-400">
                        {doc.title}
                      </div>
                      <div className="text-xs text-slate-400">{doc.category}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      $9.90
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
