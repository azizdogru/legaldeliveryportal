import React from "react";
import Link from "next/link";
import { Scale, FileCheck, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Terms of Service | LegalDeliveryPortal.com",
  description: "Terms of Service for LegalDeliveryPortal.com. Pricing, self-service document generation terms, refund policy, and user obligations.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: November 17, 2026 | Effective for all transactions
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3 p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-amber-200">
          <div className="flex items-center space-x-2 font-bold text-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Non-Lawyer Self-Help Platform Acknowledgment</span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed">
            LegalDeliveryPortal.com is an automated self-help legal document publishing portal. By accessing or using this website, you acknowledge and agree that LegalDeliveryPortal.com is NOT a law firm, does NOT practice law, and does NOT provide legal advice, legal strategy, or courtroom representation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing, browsing, creating documents on, or purchasing digital downloads from LegalDeliveryPortal.com, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Fixed Pricing and Payment Terms</h2>
          <p>
            All document templates available on the platform are sold for a flat digital fulfillment fee of $9.90 USD. There are no recurring monthly subscriptions, hidden maintenance fees, or automatic renewal contracts.
          </p>
          <p>
            Payments are processed securely via LemonSqueezy, our authorized merchant of record. Once payment is confirmed, the user is granted an immediate non-exclusive license to unlock, render, download, print, and execute the generated PDF document.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. User Responsibilities & Data Accuracy</h2>
          <p>
            You are solely responsible for the factual accuracy, completeness, and legality of all information, dates, names, property addresses, and monetary amounts entered into the document forms.
          </p>
          <p>
            You warrant that you will not use documents generated through this platform for any fraudulent, unlawful, defamatory, or harassing purpose.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Refund and Satisfaction Policy</h2>
          <p>
            Because digital PDF files are delivered immediately upon payment, we offer a 14-day technical satisfaction guarantee. If our software fails to generate your purchased document or encounters a technical defect, contact our support team at support@legaldeliveryportal.com for prompt remediation or refund.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Limitation of Liability</h2>
          <p>
            In no event shall LegalDeliveryPortal.com, its owners, developers, or affiliates be liable for any indirect, punitive, incidental, special, or consequential damages resulting from the use or inability to use the documents, or any legal outcomes in civil court proceedings. Our maximum cumulative liability shall not exceed the amount actually paid by you for the document ($9.90 USD).
          </p>
        </section>
      </div>
    </div>
  );
}
