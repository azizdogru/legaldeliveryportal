import React from "react";
import { Star, ShieldCheck, CheckCircle2, UserCheck } from "lucide-react";
import { REVIEWS_DATA, AGGREGATE_RATING } from "@/data/reviews";

interface CustomerReviewsSectionProps {
  docTitle?: string;
  stateName?: string;
}

export function CustomerReviewsSection({
  docTitle,
  stateName,
}: CustomerReviewsSectionProps) {
  return (
    <section className="space-y-6 pt-6">
      {/* Top Aggregate Rating Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-lg font-bold text-white">
              {AGGREGATE_RATING.ratingValue} / 5.0
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Based on{" "}
            <strong className="text-slate-200">
              {AGGREGATE_RATING.reviewCount.toLocaleString()} verified customer ratings
            </strong>{" "}
            across all 50 states
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Verified Purchases</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Court Admissible Guarantee</span>
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REVIEWS_DATA.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {review.date}
                </span>
              </div>

              <h4 className="text-xs font-bold text-white leading-snug">
                &quot;{review.title}&quot;
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {review.comment}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <div>
                <span className="font-semibold text-slate-200 block">
                  {review.author}
                </span>
                <span className="text-slate-500 text-[10px] block">
                  {review.role} ({review.location})
                </span>
              </div>
              <span className="inline-flex items-center text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full font-medium">
                <UserCheck className="w-3 h-3 mr-1" />
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
