import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Database } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | LegalDeliveryPortal.com",
  description: "Privacy Policy for LegalDeliveryPortal.com. Zero server database storage for confidential document data, 256-bit encryption, and customer data rights.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Data Privacy & Confidentiality
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: November 17, 2026 | Effective Immediately
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center space-x-2 text-white font-bold">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>1. Our Zero Database Architecture Principle</span>
          </div>
          <p>
            At LegalDeliveryPortal.com, we prioritize user confidentiality. Unlike conventional cloud document platforms, we do not store the personal legal data, debt amounts, tenant names, or confidential dispute details you type into our dynamic forms in external server databases.
          </p>
          <p>
            Your form state is preserved locally in your web browser via standard HTML5 localStorage so that you can draft without losing your progress. When generating PDFs, our client-side vector engine creates the PDF directly in your browser session.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Information We Collect</h2>
          <p>
            We collect only the minimal data required to process your transaction and deliver customer service:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>
              <strong>Billing and Payment Information:</strong> Payment transactions are handled securely by our authorized merchant of record, LemonSqueezy. We do not store or process your full credit card or debit card numbers on our servers.
            </li>
            <li>
              <strong>Contact Details:</strong> When you contact our support desk or request assistance, we retain your email address and message history to resolve your inquiry.
            </li>
            <li>
              <strong>Technical Log Data:</strong> Like most web properties, we collect standard server logs including IP addresses, browser types, referring pages, and access timestamps to ensure system reliability and prevent bot abuse.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. How Information is Used</h2>
          <p>
            We use technical information solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Verify transaction status and fulfill digital PDF downloads.</li>
            <li>Maintain, monitor, and optimize web application performance.</li>
            <li>Protect our infrastructure against cyber attacks, automated scraping, or fraud.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. No Sale of Personal Data</h2>
          <p>
            LegalDeliveryPortal.com does not sell, rent, license, or trade your personal information, dispute facts, or contact details to third parties, data brokers, or marketing networks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Cookies and Local Storage</h2>
          <p>
            We utilize browser localStorage strictly to allow users to pause and resume drafting legal notices without data loss. You may clear your browser localStorage at any time by clearing your cache or browsing history.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">6. Contacting our Privacy Officer</h2>
          <p>
            For inquiries regarding our privacy standards or data practices, please contact us at:{" "}
            <Link href="/contact" className="text-blue-400 hover:underline">
              support@legaldeliveryportal.com
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
