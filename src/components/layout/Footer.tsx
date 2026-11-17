import React from "react";
import Link from "next/link";
import { Scale, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { ALL_DOCUMENTS } from "@/config/documents";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 p-1.5 flex items-center justify-center text-white">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                LegalDelivery<span className="text-blue-400">Portal</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Programmatic, lawyer-researched legal notices, demand letters, and formal contracts formatted for immediate court admissibility across all 50 US States and Washington D.C.
            </p>
            <div className="flex items-center space-x-3 text-slate-400 pt-2">
              <div className="flex items-center space-x-1 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>50-State Compliant</span>
              </div>
              <div className="flex items-center space-x-1 text-[11px]">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Bank-Grade 256-bit</span>
              </div>
            </div>
          </div>

          {/* Documents 1-5 */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Official Legal Notices
            </h3>
            <ul className="space-y-2">
              {ALL_DOCUMENTS.slice(0, 5).map((doc) => (
                <li key={doc.id}>
                  <Link
                    href={`/forms/${doc.slug}`}
                    className="hover:text-white transition-colors text-xs"
                  >
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents 6-10 */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Agreements & Releases
            </h3>
            <ul className="space-y-2">
              {ALL_DOCUMENTS.slice(5, 10).map((doc) => (
                <li key={doc.id}>
                  <Link
                    href={`/forms/${doc.slug}`}
                    className="hover:text-white transition-colors text-xs"
                  >
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Compliance & Policies */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Legal & Trust
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Legal Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="hover:text-white transition-colors">
                  Editorial & Legal Standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory LegalTech Disclaimer */}
        <div className="pt-8 border-t border-slate-900 space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl">
            <p className="text-[11px] leading-relaxed text-slate-400">
              <strong className="text-slate-300">LEGALTECH NOTICE AND DISCLAIMER:</strong> LegalDeliveryPortal.com is not an attorney, law firm, or legal referral service. We do not provide legal advice, opinions, or representation. All document templates, automated statutory citations, and forms are provided on an &quot;as is&quot; informational self-help basis. Communications between you and LegalDeliveryPortal.com are governed by our Privacy Policy and are not protected by the attorney-client privilege.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>(c) {new Date().getFullYear()} LegalDeliveryPortal.com. All rights reserved.</p>
            <p>Flat $9.90 Standard Digital Court-Ready PDF Delivery across all 50 States.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
