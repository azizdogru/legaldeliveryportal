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
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

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
      // Last step: switch to live preview on mobile
      setMobileTab("preview");
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

        {field.type === "text" && (
          <input
            id={field.name}
            type="text"
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          />
        )}

        {field.type === "date" && (
          <input
            id={field.name}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          />
        )}

        {field.type === "currency" && (
          <div className="relative rounded-xl shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <span className="text-slate-400 text-sm font-semibold">$</span>
            </div>
            <input
              id={field.name}
              type="number"
              step="0.01"
              value={value}
              placeholder={field.placeholder || "0.00"}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="w-full pl-8 pr-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        )}

        {field.type === "textarea" && (
          <textarea
            id={field.name}
            rows={4}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm resize-y"
          />
        )}

        {field.type === "select" && (
          <select
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {field.helperText && (
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {field.helperText}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* State Jurisdiction Header Bar */}
      <div className="mb-6 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white tracking-tight">
                {config.title}
              </span>
              <span className="text-xs bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded-full font-semibold">
                {stateStatute.stateCode} Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Governed by: <span className="text-slate-300 font-medium">{stateStatute.statuteCitation}</span>
            </p>
          </div>
        </div>

        {/* State Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-300 font-medium">Jurisdiction:</span>
          <select
            value={selectedStateCode}
            onChange={(e) => {
              const code = e.target.value;
              setSelectedStateCode(code);
              handleFieldChange("stateCode", code);
            }}
            className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex mb-6 p-1 bg-slate-900 border border-slate-800 rounded-xl">
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

      {/* Main 2-Pane Layout (Desktop: 50% Form, 50% Live Sticky PDF) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Stepper (Cols 1 to 6 on desktop) */}
        <div
          className={`lg:col-span-6 space-y-6 ${
            mobileTab === "form" ? "block" : "hidden lg:block"
          }`}
        >
          {/* Stepper Progress Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                  Step {currentStepIndex + 1} of {totalSteps}
                </span>
                <h2 className="text-base font-bold text-white mt-0.5">
                  {currentStep.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {currentStep.description}
                </p>
              </div>

              {lastSavedTime && (
                <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-slate-500">
                  <Save className="w-3.5 h-3.5 text-emerald-500" />
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

          {/* Form Fields Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentStep.fields.map((f) => renderField(f))}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  currentStepIndex === 0
                    ? "opacity-30 cursor-not-allowed text-slate-600 bg-slate-950"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-950/40 flex items-center space-x-1.5 transition-all"
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

          {/* Statutory Insight Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>{stateStatute.stateName} Statutory Rules & Notice Requirements</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {stateStatute.statuteSummary}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                <span className="text-slate-500 block">Notice Period:</span>
                <span className="text-slate-200 font-semibold">{stateStatute.noticePeriodDays} Days</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                <span className="text-slate-500 block">Jurisdiction:</span>
                <span className="text-slate-200 font-semibold truncate block">{stateStatute.courtJurisdiction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live PDF Preview (Cols 7 to 12 on desktop) */}
        <div
          className={`lg:col-span-6 lg:sticky lg:top-20 ${
            mobileTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <PdfPreviewPane
            config={config}
            formData={formData}
            stateInfo={stateStatute}
          />
        </div>
      </div>
    </div>
  );
}
