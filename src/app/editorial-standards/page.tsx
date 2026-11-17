import React from "react";
import Link from "next/link";
import { Award, BookOpen, CheckCircle, Scale, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Editorial Standards & Legal Research Methodology | LegalDeliveryPortal.com",
  description: "Learn how LegalDeliveryPortal researches state statutes, verifies court notice windows, and maintains court-admissible legal document standards across 50 states.",
};

export default function EditorialStandardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Quality & Accuracy Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Editorial & Legal Research Standards
        </h1>
        <p className="text-xs text-slate-400">
          How our LegalTech team verifies 50-state statutory compliance and judicial formatting.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center space-x-2 text-white font-bold">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>1. Primary Source Legal Research</span>
          </div>
          <p>
            Unlike generic AI document generation that hallucinates legal requirements, every statute citation on LegalDeliveryPortal.com is grounded in official primary sources:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>State legislative statutes and session laws (e.g., California Civil Code, Texas Property Code, Florida Statutes).</li>
            <li>Uniform Commercial Code (UCC) Article 2A model lease acts enacted by state legislatures.</li>
            <li>Federal statutory regulations including the Health Insurance Portability and Accountability Act (45 C.F.R. Section 164.508) and Fair Housing Act (42 U.S.C. Section 3604).</li>
            <li>Official state small claims court jurisdictional limits and service of process rules.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Programmatic Statute Verification</h2>
          <p>
            Our software implements a deterministic schema architecture. When a user selects California, New York, Texas, or any other state, our platform injects verified statutory waiting periods (such as California AB 1482 notice windows or Florida 7-day cure periods) directly into the generated legal instrument.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. Courtroom Admissibility Standards</h2>
          <p>
            To satisfy judicial evidentiary standards in small claims, municipal, or district courts, all generated PDF documents incorporate the following critical elements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-white font-semibold block">Official Court Captioning</span>
              <span className="text-xs text-slate-400 mt-1 block">
                Standard double-bordered caption identifying parties, subject matter, and reference numbers.
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-white font-semibold block">Statutory Citation Recitals</span>
              <span className="text-xs text-slate-400 mt-1 block">
                Direct statutory citations establishing formal condition precedent and intent.
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-white font-semibold block">Verification under Penalty of Perjury</span>
              <span className="text-xs text-slate-400 mt-1 block">
                Formal server affirmation under penalty of perjury for admissibility without in-person testimony.
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-white font-semibold block">Notary Jurat Block</span>
              <span className="text-xs text-slate-400 mt-1 block">
                Optional Notary Jurat or Acknowledgment block suitable for county recording or formal evidentiary hearings.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
