import React from "react";
import { Check, X, ShieldAlert, Sparkles, Scale } from "lucide-react";

export function CompetitorComparison() {
  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Why LegalDeliveryPortal Wins
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          No Monthly Subscriptions. Zero Hidden Traps.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Traditional legal sites lure you in with &quot;free trials&quot; that silently charge your card $39.99 to $59.99 every month. We believe in transparent, one-time pricing.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80">
              <th className="py-4 px-5 text-slate-300 font-semibold">Feature / Guarantee</th>
              <th className="py-4 px-5 text-blue-400 font-bold bg-blue-950/30 border-x border-blue-900/40">
                LegalDeliveryPortal
              </th>
              <th className="py-4 px-5 text-slate-400 font-semibold">Rocket Lawyer / LawDepot</th>
              <th className="py-4 px-5 text-slate-400 font-semibold">Traditional Law Firms</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            <tr>
              <td className="py-3.5 px-5 font-medium text-white">Pricing Model</td>
              <td className="py-3.5 px-5 font-bold text-emerald-400 bg-blue-950/20 border-x border-blue-900/40">
                One-time flat fee ($9.90)
              </td>
              <td className="py-3.5 px-5 text-red-400 font-medium">
                $39.99 - $59.99 / month subscription
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                $250 - $450 / hour retainer
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-medium text-white">Auto-Renewal Cancellation Trap</td>
              <td className="py-3.5 px-5 font-bold text-emerald-400 bg-blue-950/20 border-x border-blue-900/40 flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero recurring billing</span>
              </td>
              <td className="py-3.5 px-5 text-red-400">
                Hidden auto-renew; difficult cancellation
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                Ongoing monthly invoices
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-medium text-white">State Statutes & Codes Included</td>
              <td className="py-3.5 px-5 font-bold text-emerald-400 bg-blue-950/20 border-x border-blue-900/40 flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>All 50 States + DC verified</span>
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                Generic one-size-fits-all forms
              </td>
              <td className="py-3.5 px-5 text-emerald-400">
                Included in custom draft
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-medium text-white">Delivery Speed</td>
              <td className="py-3.5 px-5 font-bold text-emerald-400 bg-blue-950/20 border-x border-blue-900/40">
                Instant browser download (3 min)
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                Gated behind mandatory account signup
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                3 to 7 business days turnaround
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-medium text-white">Evidentiary Certificate of Service</td>
              <td className="py-3.5 px-5 font-bold text-emerald-400 bg-blue-950/20 border-x border-blue-900/40 flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Built into every notice</span>
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                Extra fee or missing
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                Extra legal fee
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-medium text-white">Client Data Privacy</td>
              <td className="py-3.5 px-5 font-bold text-emerald-400 bg-blue-950/20 border-x border-blue-900/40">
                Zero server DB; client-side compilation
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                Stored in corporate cloud database
              </td>
              <td className="py-3.5 px-5 text-slate-400">
                Confidential firm files
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
