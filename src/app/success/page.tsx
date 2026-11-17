"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Download,
  ShieldCheck,
  FileText,
  Mail,
  Send,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ALL_DOCUMENTS, getDocumentBySlug } from "@/config/documents";
import { getStateByCode, US_STATES } from "@/data/usStates";
import { getStatuteForDocumentAndState } from "@/data/statutes";
import { generateDocumentPdf } from "@/lib/pdf/pdfGenerator";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const initialDocSlug = searchParams.get("doc") || (typeof window !== "undefined" ? localStorage.getItem("ldp_latest_doc_slug") : null) || "demand-letter";
  const initialStateCode = (searchParams.get("state") || (typeof window !== "undefined" ? localStorage.getItem("ldp_latest_state_code") : null) || "CA").toUpperCase();

  const [doc, setDoc] = useState(() => getDocumentBySlug(initialDocSlug) || ALL_DOCUMENTS[1]);
  const [state, setState] = useState(() => getStateByCode(initialStateCode) || US_STATES[4]);

  const [downloading, setDownloading] = useState(false);
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailMessage, setEmailMessage] = useState<string | null>(null);

  useEffect(() => {
    // If not in query params, resolve from localStorage
    if (typeof window !== "undefined") {
      const storedSlug = localStorage.getItem("ldp_latest_doc_slug");
      const storedCode = localStorage.getItem("ldp_latest_state_code");
      if (storedSlug && !searchParams.get("doc")) {
        const d = getDocumentBySlug(storedSlug);
        if (d) setDoc(d);
      }
      if (storedCode && !searchParams.get("state")) {
        const s = getStateByCode(storedCode.toUpperCase());
        if (s) setState(s);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    // Save unlock status in localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`ldp_unlocked_${doc.id}`, "true");
        const savedEmail = localStorage.getItem("ldp_delivery_email") || searchParams.get("email") || "";
        if (savedEmail) {
          setDeliveryEmail(savedEmail);
          // Automatically trigger Resend delivery to user's saved email
          triggerEmailDelivery(savedEmail);
        }
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
  }, [doc.id]);

  const triggerEmailDelivery = async (targetEmail: string) => {
    if (!targetEmail || !targetEmail.includes("@")) return;

    setEmailStatus("sending");
    setEmailMessage(null);

    try {
      const statute = getStatuteForDocumentAndState(doc.slug, state.code);

      let formData = doc.defaultValues;
      const sessionId = searchParams.get("session_id") || (typeof window !== "undefined" ? localStorage.getItem("ldp_latest_session_id") : null);

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

      // If user came from a different tab/device, load from saved checkout session
      if (sessionId) {
        try {
          const sRes = await fetch(`/api/checkout/session?sessionId=${sessionId}`);
          if (sRes.ok) {
            const sData = await sRes.json();
            if (sData?.session?.formData) {
              formData = { ...formData, ...sData.session.formData };
            }
          }
        } catch (sErr) {
          console.error("Session fetch error:", sErr);
        }
      }

      // Generate clean vector PDF bytes for attachment
      const sections = doc.generatePdfSections(formData, statute);
      const pdfBytes = await generateDocumentPdf({
        title: doc.title,
        documentId: doc.id,
        stateInfo: statute,
        sections,
        formData: { ...formData, stateCode: state.code },
        previewMode: false,
      });

      // Convert to base64
      let binary = "";
      const len = pdfBytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(pdfBytes[i]);
      }
      const pdfBase64 = btoa(binary);

      const res = await fetch("/api/delivery/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: targetEmail,
          docSlug: doc.slug,
          stateCode: state.code,
          customerName: formData.senderName || formData.claimantName || formData.landlordName,
          formData,
          pdfBase64,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStatus("sent");
        setEmailMessage(`Official PDF sent to ${targetEmail}. Check your inbox.`);
      } else {
        setEmailStatus("error");
        setEmailMessage(data.error || "Unable to dispatch email. Please download directly below.");
      }
    } catch (err: any) {
      console.error("Auto email dispatch error:", err);
      setEmailStatus("error");
      setEmailMessage("Network error during email delivery. You can download directly below.");
    }
  };

  const handleManualEmailSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryEmail || !deliveryEmail.includes("@")) {
      setEmailStatus("error");
      setEmailMessage("Please enter a valid email address.");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("ldp_delivery_email", deliveryEmail);
    }
    triggerEmailDelivery(deliveryEmail);
  };

  const handleDownloadOfficial = async () => {
    try {
      setDownloading(true);
      const statute = getStatuteForDocumentAndState(doc.slug, state.code);

      let formData = doc.defaultValues;
      const sessionId = searchParams.get("session_id") || (typeof window !== "undefined" ? localStorage.getItem("ldp_latest_session_id") : null);

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

      // If user came from a different tab/device, load from saved checkout session
      if (sessionId) {
        try {
          const sRes = await fetch(`/api/checkout/session?sessionId=${sessionId}`);
          if (sRes.ok) {
            const sData = await sRes.json();
            if (sData?.session?.formData) {
              formData = { ...formData, ...sData.session.formData };
            }
          }
        } catch (sErr) {
          console.error("Session fetch error:", sErr);
        }
      }

      const sections = doc.generatePdfSections(formData, statute);
      const pdfBytes = await generateDocumentPdf({
        title: doc.title,
        documentId: doc.id,
        stateInfo: statute,
        sections,
        formData: { ...formData, stateCode: state.code },
        previewMode: false,
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
          Payment Confirmed: $9.90 USD
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Court-Ready Document is Unlocked
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Thank you for choosing LegalDeliveryPortal. Your document has been compiled with verified state statutes, formal caption formatting, and Certificate of Service.
        </p>
      </div>

      {/* Document Summary Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white">{doc.title}</h2>
            <p className="text-xs text-slate-400">{state.name} ({state.code}) Jurisdiction</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
            OFFICIAL COPY UNLOCKED
          </span>
        </div>

        {/* Email Delivery Status Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-white">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Email Delivery via Resend</span>
            </div>
            {emailStatus === "sent" ? (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Dispatched to Inbox
              </span>
            ) : emailStatus === "sending" ? (
              <span className="text-[10px] font-semibold text-blue-400 flex items-center space-x-1">
                <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                Sending PDF...
              </span>
            ) : null}
          </div>

          {emailMessage && (
            <p
              className={`text-xs font-medium ${
                emailStatus === "sent"
                  ? "text-emerald-400"
                  : emailStatus === "error"
                  ? "text-amber-400"
                  : "text-slate-300"
              }`}
            >
              {emailMessage}
            </p>
          )}

          <form onSubmit={handleManualEmailSend} className="flex gap-2">
            <input
              type="email"
              value={deliveryEmail}
              onChange={(e) => setDeliveryEmail(e.target.value)}
              placeholder="Enter email to receive copy..."
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={emailStatus === "sending"}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{emailStatus === "sent" ? "Resend" : "Send Copy"}</span>
            </button>
          </form>
          <p className="text-[11px] text-slate-500">
            A court-ready PDF attachment will be emailed from orders@legaldeliveryportal.com.
          </p>
        </div>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Standard US Letter Vector Format (612 x 792 pt)</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All Watermarks Removed: Clean Admissible Original</span>
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
        <span className="hidden sm:inline text-slate-600">|</span>
        <Link
          href="/forms"
          className="text-slate-400 hover:text-white"
        >
          Browse Legal Document Library
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
