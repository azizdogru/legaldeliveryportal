"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Download, ArrowRight, ShieldCheck, FileText, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { ALL_DOCUMENTS, getDocumentBySlug } from "@/config/documents";
import { getStateByCode, US_STATES } from "@/data/usStates";
import { getStatuteForDocumentAndState } from "@/data/statutes";
import { generateDocumentPdf } from "@/lib/pdf/pdfGenerator";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const docSlug = searchParams.get("doc") || "demand-letter";
  const stateCode = (searchParams.get("state") || "CA").toUpperCase();

  const doc = getDocumentBySlug(docSlug) || ALL_DOCUMENTS[1];
  const state = getStateByCode(stateCode) || US_STATES[4];
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Launch confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    // Save unlock status in localStorage for all documents or this document
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`ldp_unlocked_${doc.id}`, "true");
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
  }, [doc.id]);

  const handleDownloadOfficial = async () => {
    try {
      setDownloading(true);
      const statute = getStatuteForDocumentAndState(doc.slug, state.code);

      // retrieve stored formData if available
      let formData = doc.defaultValues;
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(`ldp_form_${doc.id}_${state.code}`);
        if (stored) {
          try {
            formData = { ...doc.defaultValues, ...JSON.parse(stored) };
          } catch {
            // fallback
          }
        }
      }

      const sections = doc.generatePdfSections(formData, statute);
      const pdfBytes = await generateDocumentPdf({
        title: doc.title,
        documentId: doc.id,
        stateInfo: statute,
        sections,
        formData,
        previewMode: false, // Clean original without watermark!
      });

      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${doc.slug}-${state.code}-OFFICIAL.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setDownloading(false);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/50">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Payment Confirmed ($9.90 USD)
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Court-Ready Document is Unlocked
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Thank you for choosing LegalDeliveryPortal. Your document has been compiled with all state statutes, formal caption formatting, and verified Certificate of Service.
        </p>
      </div>

      {/* Document Summary Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white">{doc.title}</h2>
            <p className="text-xs text-slate-400">{state.name} ({state.code}) Jurisdiction</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
            UNLOCKED
          </span>
        </div>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Standard US Letter Vector Format (612 x 792 pt)</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All Watermarks Removed: Clean Admissible Copy</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Includes Dual Execution Lines and Notary Jurat</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleDownloadOfficial}
            disabled={downloading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>
              {downloading
                ? "Generating High-Resolution PDF..."
                : "Download Official Court-Ready PDF"}
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
        <Link
          href={`/forms/${doc.slug}/${state.slug}?unlocked=true`}
          className="text-blue-400 hover:text-blue-300 underline font-medium"
        >
          Return to Live Document Editor
        </Link>
        <span className="hidden sm:inline text-slate-600">•</span>
        <Link
          href="/forms"
          className="text-slate-400 hover:text-white"
        >
          Browse All 10 Documents
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs text-slate-400">
          Loading order details...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
