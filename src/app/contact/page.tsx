"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Clock, ShieldCheck, CheckCircle2, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Order Delivery Question");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Customer Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact Legal Delivery Portal
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Need assistance unlocking your PDF, customizing a state template, or requesting technical support? Our customer desk is ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Support Info Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Direct Support Email</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              orders@legaldeliveryportal.com
            </p>
            <p className="text-[11px] text-slate-500">
              Inquiries are answered within 2 to 4 business hours.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Support Desk Hours</span>
            </div>
            <p className="text-xs text-slate-300">
              Monday to Friday: 8:00 AM to 8:00 PM EST
            </p>
            <p className="text-xs text-slate-300">
              Saturday & Sunday: 10:00 AM to 4:00 PM EST
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>100% Digital Delivery</span>
            </div>
            <p className="text-xs text-slate-400">
              PDF generation and downloads occur immediately within your browser upon checkout.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h2 className="text-lg font-bold text-white">Thank you for your message</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We have received your inquiry. A support specialist will respond to <span className="text-slate-200 font-semibold">{email}</span> within 2 to 4 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-200"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base font-bold text-white mb-2">Send Us a Direct Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-300">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Jonathan Miller"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-300">
                    Your Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., jonathan@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-slate-300">
                  Inquiry Topic
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Order Delivery Question">Order Delivery Question / Receipt</option>
                  <option value="State Statute Inquiries">State Statute / Legal Question</option>
                  <option value="Technical Issue">Technical Form or PDF Issue</option>
                  <option value="Billing / Refund">Billing or Refund Request</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-slate-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please include your order receipt reference or the document name if applicable..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-950/50 flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
