"use client";

import React, { useState, useEffect } from "react";
import { FormField, StateStatuteInfo } from "@/types/document";
import { getDocumentBySlug } from "@/config/documents";
import { US_STATES } from "@/data/usStates";
import { getStatuteForDocumentAndState } from "@/data/statutes";
import { PdfPreviewPane } from "../pdf/PdfPreviewPane";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Save,
  Eye,
  Edit3,
  Scale,
  Sparkles,
  MapPin,
  Clock,
  Shield,
  FileCheck2,
  Mail,
  AlertCircle,
  X,
  ExternalLink,
  Lock,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface DynamicDocumentFormProps {
  docSlug: string;
  initialStateCode?: string;
}

export function DynamicDocumentForm({
  docSlug,
  initialStateCode = "CA",
}: DynamicDocumentFormProps) {
  const config = getDocumentBySlug(docSlug);

  const [selectedStateCode, setSelectedStateCode] = useState<string>(
    initialStateCode.toUpperCase()
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    return { ...(config?.defaultValues || {}), stateCode: initialStateCode.toUpperCase() };
  });
  const [userDeliveryEmail, setUserDeliveryEmail] = useState<string>("");
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const storageKey = config ? `ldp_form_${config.id}_${selectedStateCode}` : "";

  // Load from localStorage on mount or state change
  useEffect(() => {
    if (!config || !storageKey) return;
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setFormData({
            ...config.defaultValues,
            ...parsed,
            stateCode: selectedStateCode,
          });
          setLastSavedTime("Restored from browser session");
        } else {
          setFormData({
            ...config.defaultValues,
            stateCode: selectedStateCode,
          });
        }

        const savedEmail = localStorage.getItem("ldp_delivery_email") || "";
        if (savedEmail) {
          setUserDeliveryEmail(savedEmail);
        }
      } catch (e) {
        console.error("Failed to load saved form:", e);
      }
    }
  }, [config, selectedStateCode, storageKey]);

  if (!config) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Document template could not be loaded.
      </div>
    );
  }

  // Handle form change and auto-save
  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (typeof window !== "undefined" && storageKey) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
          const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          setLastSavedTime(`Saved at ${time}`);
        } catch (e) {
          console.error("Local storage error:", e);
        }
      }
      return updated;
    });
  };

  const handleDeliveryEmailChange = (val: string) => {
    setUserDeliveryEmail(val);
    setEmailError(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ldp_delivery_email", val);
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
  };

  const stateStatute: StateStatuteInfo = getStatuteForDocumentAndState(
    config.slug,
    selectedStateCode
  );

  const currentStep = config.steps[currentStepIndex];
  const totalSteps = config.steps.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Final Step: Complete & Review PDF
      if (!userDeliveryEmail || !userDeliveryEmail.includes("@")) {
        setEmailError("Please enter a valid email address to receive your official document.");
        const emailInput = document.getElementById("deliveryEmail");
        if (emailInput) {
          emailInput.focus();
        }
        return;
      }
      setEmailError(null);
      setShowReviewModal(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] ?? field.defaultValue ?? "";
    const gridClass = field.gridCols === 2 ? "sm:col-span-1" : "sm:col-span-2";

    return (
      <div key={field.name} className={`${gridClass} space-y-1.5`}>
        <div className="flex justify-between items-baseline">
          <label
            htmlFor={field.name}
            className="text-xs font-semibold text-slate-200"
          >
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        </div>

        {field.type === "textarea" ? (
          <textarea
            id={field.name}
            rows={3}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        ) : field.type === "select" ? (
          <select
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === "currency" ? (
          <div className="relative">
            <span className="absolute left-3 top-2 text-xs text-slate-500 font-mono">$</span>
            <input
              type="number"
              id={field.name}
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              step="0.01"
              className="w-full pl-7 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono"
            />
          </div>
        ) : field.type === "date" ? (
          <input
            type="date"
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        ) : field.type === "email" ? (
          <input
            type="email"
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        ) : field.type === "phone" ? (
          <input
            type="tel"
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        ) : (
          <input
            type="text"
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        )}

        {field.helperText && (
          <p className="text-[11px] text-slate-500">{field.helperText}</p>
        )}
      </div>
    );
  };

  const baseCheckout =
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL ||
    "https://depositdemand.lemonsqueezy.com/checkout/buy/e5a2b41d-69b2-4d5a-bb86-0218378c2373";

  const handleProceedToCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRedirecting(true);

    const sessionId = "ldp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ldp_latest_session_id", sessionId);
        localStorage.setItem("ldp_latest_doc_slug", config.slug);
        localStorage.setItem("ldp_latest_state_code", selectedStateCode);
        localStorage.setItem("ldp_delivery_email", userDeliveryEmail);
      } catch (err) {
        console.error("Storage error:", err);
      }
    }

    try {
      await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          docSlug: config.slug,
          stateCode: selectedStateCode,
          customerEmail: userDeliveryEmail,
          customerName: formData.senderName || formData.claimantName || formData.landlordName || "",
          formData,
        }),
      });
    } catch (err) {
      console.error("Failed to sync checkout session to S3:", err);
    }

    const origin = typeof window !== "undefined" ? window.location.origin : "https://legaldeliveryportal.com";
    const redirectParam = `&checkout[redirect_url]=${encodeURIComponent(`${origin}/success?doc=${config.slug}&state=${selectedStateCode}&session_id=${sessionId}`)}`;
    const emailParam = userDeliveryEmail ? `&checkout[email]=${encodeURIComponent(userDeliveryEmail)}` : "";
    const customParams = `&checkout[custom][session_id]=${encodeURIComponent(sessionId)}&checkout[custom][doc]=${encodeURIComponent(config.slug)}&checkout[custom][state]=${encodeURIComponent(selectedStateCode)}`;
    const checkoutUrl = `${baseCheckout}${baseCheckout.includes("?") ? "&" : "?"}${emailParam}${customParams}${redirectParam}`;

    window.location.href = checkoutUrl;
  };

  const emailParam = userDeliveryEmail ? `&checkout[email]=${encodeURIComponent(userDeliveryEmail)}` : "";
  const customParams = `&checkout[custom][doc]=${encodeURIComponent(config.slug)}&checkout[custom][state]=${encodeURIComponent(selectedStateCode)}`;
  const checkoutUrl = `${baseCheckout}${baseCheckout.includes("?") ? "&" : "?"}${emailParam}${customParams}`;

  return (
    <div className="space-y-5">
      {/* Sleek Jurisdiction Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="p-1 rounded bg-blue-950/80 border border-blue-800/80 text-blue-400">
            <Scale className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-400">Statutory Rules:</span>
          <span className="font-bold text-white bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded text-blue-300">
            {stateStatute.stateName} ({selectedStateCode})
          </span>
          <span className="hidden md:inline text-slate-500 font-mono text-[11px] truncate max-w-xs">
            {stateStatute.statuteCitation}
          </span>
        </div>

        {/* State Switcher */}
        <div className="flex items-center space-x-2 ml-auto">
          <label htmlFor="state-select" className="text-[11px] text-slate-400">
            Change State:
          </label>
          <select
            id="state-select"
            value={selectedStateCode}
            onChange={(e) => {
              const code = e.target.value;
              setSelectedStateCode(code);
              handleFieldChange("stateCode", code);
            }}
            className="px-2.5 py-1 bg-slate-950 border border-slate-700 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          >
            {US_STATES.map((st) => (
              <option key={st.code} value={st.code} className="bg-slate-900 text-white">
                {st.name} ({st.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex mb-4 p-1 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          type="button"
          onClick={() => setMobileTab("form")}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all ${
            mobileTab === "form"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Form (Step {currentStepIndex + 1}/{totalSteps})</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all ${
            mobileTab === "preview"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live PDF Preview</span>
        </button>
      </div>

      {/* Main 2-Pane Layout (Desktop: 7 cols Form Stepper / 5 cols Sticky Live PDF) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Stepper (Cols 1 to 7 on desktop) */}
        <div
          className={`lg:col-span-7 space-y-4 ${
            mobileTab === "form" ? "block" : "hidden lg:block"
          }`}
        >
          {/* Unified Form Stepper Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Stepper Progress Bar Header */}
            <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {currentStep.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentStep.description}
                  </p>
                </div>

                {lastSavedTime && (
                  <div className="hidden sm:flex items-center space-x-1.5 text-[10px] text-slate-400 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded-lg">
                    <Save className="w-3 h-3 text-emerald-400" />
                    <span>{lastSavedTime}</span>
                  </div>
                )}
              </div>

              {/* Stepper Dots & Line */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  {config.steps.map((st, idx) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`hover:text-slate-300 transition-colors ${
                        idx === currentStepIndex
                          ? "text-blue-400 font-semibold"
                          : idx < currentStepIndex
                          ? "text-slate-400"
                          : "text-slate-600"
                      }`}
                    >
                      {idx + 1}. {st.title.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Fields Body */}
            <div className="p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {currentStep.fields.map((f) => renderField(f))}

                {/* Delivery Step: Dedicated Email Input */}
                {currentStepIndex === totalSteps - 1 && (
                  <div className="sm:col-span-2 p-3.5 bg-slate-950 border border-blue-900/50 rounded-xl space-y-2 mt-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="deliveryEmail"
                        className="text-xs font-semibold text-white flex items-center space-x-1.5"
                      >
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span>Your Email for Official PDF Delivery</span>
                        <span className="text-red-400">*</span>
                      </label>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                        Direct Email Delivery
                      </span>
                    </div>
                    <input
                      id="deliveryEmail"
                      type="email"
                      value={userDeliveryEmail}
                      onChange={(e) => handleDeliveryEmailChange(e.target.value)}
                      placeholder="e.g., yourname@domain.com"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-colors"
                    />
                    {emailError && (
                      <p className="text-[11px] text-red-400 font-medium flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{emailError}</span>
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Your court-admissible vector PDF (clean original without watermarks) will be immediately dispatched to this email address upon checkout, and available for instant browser download.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Stepper Navigation Buttons Footer */}
            <div className="p-4 sm:p-5 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={`py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  currentStepIndex === 0
                    ? "opacity-30 cursor-not-allowed text-slate-600 bg-slate-950"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center space-x-2">
                {/* Mobile Quick Preview Toggle */}
                <button
                  type="button"
                  onClick={() => setMobileTab("preview")}
                  className="lg:hidden py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700 flex items-center space-x-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>Preview PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="py-2 px-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-950/40 flex items-center space-x-1.5 transition-all"
                >
                  <span>
                    {currentStepIndex === totalSteps - 1
                      ? "Complete & Review PDF"
                      : "Continue"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live PDF Preview (Cols 8 to 12 on desktop) */}
        <div
          className={`lg:col-span-5 lg:sticky lg:top-20 space-y-2 ${
            mobileTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          {/* Mobile Back-to-Form Header */}
          <div className="lg:hidden flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setMobileTab("form")}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 px-2 py-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Back to Form Inputs</span>
            </button>
            <span className="text-[11px] text-slate-400 pr-2">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          </div>

          <PdfPreviewPane
            config={config}
            formData={formData}
            stateInfo={stateStatute}
            userEmail={userDeliveryEmail}
            onOpenCheckout={() => {
              if (!userDeliveryEmail || !userDeliveryEmail.includes("@")) {
                setCurrentStepIndex(totalSteps - 1);
                setEmailError("Please enter your email address for document delivery.");
                const emailInput = document.getElementById("deliveryEmail");
                if (emailInput) emailInput.focus();
              } else {
                setShowReviewModal(true);
              }
            }}
          />
        </div>
      </div>

      {/* Review & Delivery Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 my-auto scrollbar-thin scrollbar-thumb-slate-700">
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                Step 3 of 3: Final Delivery Review
              </span>
              <h3 className="text-xl font-bold text-white">
                Official Document Ready for Delivery
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your legal notice has been validated against {stateStatute.stateName} statutory requirements.
              </p>
            </div>

            {/* Order Specification Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Document Type:</span>
                <span className="font-semibold text-white">{config.title}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Governing State:</span>
                <span className="font-semibold text-white">{stateStatute.stateName} ({stateStatute.stateCode})</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Statutory Citation:</span>
                <span className="font-mono text-slate-300">{stateStatute.statuteCitation}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Delivery Inbox:</span>
                <span className="font-semibold text-emerald-400">{userDeliveryEmail}</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-slate-400">Price:</span>
                <span className="font-bold text-base text-white">$9.90 USD</span>
              </div>
            </div>

            {/* Guarantees & Features */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Instant dispatch to your email inbox via Resend</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Immediate in-browser download of clean, unwatermarked PDF</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Includes Certificate of Service and Dual Execution lines</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>One-time purchase: zero monthly subscriptions or auto-renewals</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                disabled={isRedirecting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-blue-950/50 flex items-center justify-center space-x-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isRedirecting
                    ? "Securing Document & Connecting..."
                    : "Proceed to Secure Delivery ($9.90)"}
                </span>
                {!isRedirecting && <ExternalLink className="w-4 h-4 ml-1 opacity-80" />}
              </button>

              {/* Authority Trust Seals */}
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                  <Lock className="w-3.5 h-3.5 text-blue-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-200">256-Bit SSL</span>
                  <span className="text-[9px] text-slate-400">Bank-Grade Security</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-200">2026 Statute</span>
                  <span className="text-[9px] text-slate-400">State Law Verified</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-200">100% Guarantee</span>
                  <span className="text-[9px] text-slate-400">Full Money-Back</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs transition-colors"
              >
                Back to Form Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
