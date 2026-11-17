"use client";

import React, { useState, useEffect } from "react";
import { DocumentConfig, StateStatuteInfo } from "@/types/document";
import { generateDocumentPdf } from "@/lib/pdf/pdfGenerator";
import {
  Download,
  Lock,
  Unlock,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  FileText,
  AlertCircle,
  Mail,
} from "lucide-react";

interface PdfPreviewPaneProps {
  config: DocumentConfig;
  formData: Record<string, any>;
  stateInfo: StateStatuteInfo;
  isUnlocked?: boolean;
  userEmail?: string;
  onOpenCheckout?: () => void;
}

export function PdfPreviewPane({
  config,
  formData,
  stateInfo,
  isUnlocked = false,
  userEmail = "",
  onOpenCheckout,
}: PdfPreviewPaneProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unlockedState, setUnlockedState] = useState<boolean>(isUnlocked);

  // Check URL params or legitimate storage for unlock status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("unlocked") === "true" || urlParams.get("success") === "true") {
        setUnlockedState(true);
      }
      const storedUnlock = localStorage.getItem(`ldp_unlocked_${config.id}`);
      if (storedUnlock === "true") {
        setUnlockedState(true);
      }
    }
  }, [config.id]);

  useEffect(() => {
    let active = true;
    setIsGenerating(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const sections = config.generatePdfSections(formData, stateInfo);
        const pdfBytes = await generateDocumentPdf({
          title: config.title,
          documentId: config.id,
          stateInfo,
          sections,
          formData,
          previewMode: !unlockedState,
        });

        if (!active) return;
        const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
        setIsGenerating(false);
      } catch (err: any) {
        console.error("PDF generation failed:", err);
        if (active) {
          setError("Failed to render PDF preview. Please check form fields.");
          setIsGenerating(false);
        }
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [config, formData, stateInfo, unlockedState]);

  const handleDownloadDraft = async () => {
    try {
      const sections = config.generatePdfSections(formData, stateInfo);
      const pdfBytes = await generateDocumentPdf({
        title: config.title,
        documentId: config.id,
        stateInfo,
        sections,
        formData,
        previewMode: true,
      });
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${config.slug}-${stateInfo.stateCode}-DRAFT.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download draft failed:", err);
    }
  };

  const handleDownloadOfficial = async () => {
    try {
      const sections = config.generatePdfSections(formData, stateInfo);
      const pdfBytes = await generateDocumentPdf({
        title: config.title,
        documentId: config.id,
        stateInfo,
        sections,
        formData,
        previewMode: false,
      });
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${config.slug}-${stateInfo.stateCode}-OFFICIAL.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download official failed:", err);
    }
  };

  const baseCheckout =
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL ||
    "https://depositdemand.lemonsqueezy.com/checkout/buy/e5a2b41d-69b2-4d5a-bb86-0218378c2373";

  const emailParam = userEmail ? `&checkout[email]=${encodeURIComponent(userEmail)}` : "";
  const customParams = `&checkout[custom][doc]=${encodeURIComponent(config.slug)}&checkout[custom][state]=${encodeURIComponent(stateInfo.stateCode)}`;
  const checkoutUrl = `${baseCheckout}${baseCheckout.includes("?") ? "&" : "?"}${emailParam}${customParams}`;

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Live Court-Ready Document Preview
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
            {stateInfo.stateCode}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {isGenerating ? (
            <div className="flex items-center text-xs text-slate-400 space-x-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
              <span>Updating...</span>
            </div>
          ) : unlockedState ? (
            <span className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full">
              <Unlock className="w-3 h-3 mr-1" />
              Official Mode Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-medium text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded-full">
              <Lock className="w-3 h-3 mr-1" />
              Draft Preview Mode
            </span>
          )}
        </div>
      </div>

      {/* PDF View Container */}
      <div className="relative flex-1 min-h-[460px] lg:min-h-[560px] bg-slate-950 flex items-center justify-center p-2">
        {error ? (
          <div className="text-center p-6 text-red-400 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        ) : pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
            className="w-full h-full min-h-[460px] lg:min-h-[560px] rounded-lg border border-slate-800 shadow-inner bg-slate-900"
            title="Legal Document PDF Preview"
          />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 text-slate-500">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
            <span className="text-xs">Preparing document preview...</span>
          </div>
        )}
      </div>

      {/* Conversion & Action Banner */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
        {unlockedState ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-semibold">Official Copy Unlocked: Vector PDF without watermarks</span>
            </div>
            <button
              onClick={handleDownloadOfficial}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Court-Ready PDF</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-white">$9.90</span>
                  <span className="text-xs text-slate-400 line-through">$49.00</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    Email Delivery + Instant Download
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Delivered directly to your email inbox and unlocked in browser.
                </p>
              </div>

              <div className="flex items-center text-xs text-slate-300 space-x-1">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-[11px]">Guaranteed Admissible</span>
              </div>
            </div>

            {/* Email Dispatch Notice */}
            <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center space-x-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div className="truncate">
                <span className="text-slate-400 block text-[10px]">Digital Delivery Inbox:</span>
                <span className="font-medium text-slate-200">
                  {userEmail && userEmail.includes("@") ? userEmail : "Enter email in Step 3 for delivery"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {onOpenCheckout ? (
                <button
                  type="button"
                  onClick={onOpenCheckout}
                  className="w-full py-3 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-950/50 flex items-center justify-center space-x-2 transition-all"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Official PDF ($9.90)</span>
                </button>
              ) : (
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-950/50 flex items-center justify-center space-x-2 transition-all"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Official PDF ($9.90)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                </a>
              )}

              <button
                type="button"
                onClick={handleDownloadDraft}
                className="w-full py-3 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs sm:text-sm border border-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Watermarked Draft</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>One-time fee: no monthly subscription</span>
              </span>
              <span className="text-slate-400">
                Resend email dispatch included
              </span>
            </div>

            {/* Authority Trust Seals */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-1.5 text-center">
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <Lock className="w-3.5 h-3.5 text-blue-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-200">256-Bit SSL</span>
                <span className="text-[9px] text-slate-400">Bank-Grade Encryption</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-200">2026 Statute</span>
                <span className="text-[9px] text-slate-400">State Law Verified</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-200">100% Guarantee</span>
                <span className="text-[9px] text-slate-400">Money-Back Refund</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
