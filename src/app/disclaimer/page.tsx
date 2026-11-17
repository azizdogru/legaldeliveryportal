import React from "react";
import Link from "next/link";
import { AlertCircle, Scale, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Legal Disclaimer | LegalDeliveryPortal.com",
  description: "Mandatory LegalTech Disclaimer. LegalDeliveryPortal.com is not a law firm and does not provide legal representation or legal advice.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Statutory Disclosure
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Legal Disclaimer
        </h1>
        <p className="text-xs text-slate-400">
          Important Consumer Legal Notice under Federal and State Self-Help Regulations
        </p>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <div className="flex items-center space-x-2 text-white font-bold text-base">
          <Scale className="w-5 h-5 text-blue-400" />
          <span>No Attorney-Client Relationship</span>
        </div>
        <p>
          The information, legal form schemas, statutory citations, and dynamic document generation software provided on <strong>LegalDeliveryPortal.com</strong> are published solely for general informational, educational, and self-help administrative purposes.
        </p>
        <p>
          Your use of LegalDeliveryPortal.com, including completing forms, previewing documents, and downloading court-ready PDF files, does <strong>NOT</strong> create an attorney-client relationship between you and LegalDeliveryPortal.com, its developers, operators, or contributors.
        </p>
        <p>
          Communications transmitted to or from LegalDeliveryPortal.com are not confidential attorney-client communications and are not protected by attorney-client privilege or the attorney work-product doctrine.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">Not a Substitute for Competent Legal Counsel</h2>
          <p>
            The legal statutes and notice periods referenced on this site represent compiled legal research across the 50 US States and Washington D.C. However, statutory codes, local county rules, and judicial precedents change frequently. Local municipal ordinances (such as city-level rent control boards) may impose requirements that differ from general state statutes.
          </p>
          <p>
            If you are involved in a high-stakes dispute, complex commercial litigation, or an emergency legal matter, you are strongly advised to consult a qualified attorney licensed in your state jurisdiction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">Self-Represented Litigants (Pro Se)</h2>
          <p>
            Users electing to represent themselves in small claims or civil court actions (pro se) do so at their own volition and risk. You are solely responsible for properly verifying all dates, ensuring lawful service of process in accordance with local court rules, and filing any necessary proofs of service with the clerk of court.
          </p>
        </section>
      </div>
    </div>
  );
}
