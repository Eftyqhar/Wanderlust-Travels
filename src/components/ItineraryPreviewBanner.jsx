import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function ItineraryPreviewBanner({
  packages,
  currency,
  onSelectPackage,
  onBookPackage
}) {
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const currentPkg = packages[selectedPkgIndex] || packages[0];
  const previewDays = currentPkg.itinerary.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 my-10 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Visual Day-by-Day Itinerary Preview
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Explore daily curated highlights, luxury stays, and private transfers before booking.
          </p>
        </div>

        {/* Package Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {packages.slice(0, 3).map((pkg, idx) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPkgIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedPkgIndex === idx
                  ? 'bg-luxury-emerald text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pkg.shortTitle}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Day visual preview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {previewDays.map((dayItem, index) => {
          // Curated photos for the days
          const dayImages = [
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=400&q=80'
          ];
          const img = dayImages[index % dayImages.length];

          return (
            <div
              key={dayItem.day}
              className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 hover:border-emerald-600/40 hover:bg-emerald-50/20 transition flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={img}
                  alt={dayItem.title}
                  className="w-16 h-16 rounded-lg object-cover shadow-sm shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                    Day {dayItem.day}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 truncate mt-1">
                    {dayItem.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {dayItem.location}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[11px] text-slate-600 line-clamp-2">
                {dayItem.highlights}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer bar with price and CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All 5-Star Stays Included
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Private Chauffeur
          </span>
          <span className="hidden md:flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Flexible Dates
          </span>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Total Experience</span>
            <span className="font-serif text-xl font-bold text-luxury-emerald">
              {formatCurrency(currentPkg.priceUSD, currency)}
            </span>
            <span className="text-[10px] text-slate-500"> / person</span>
          </div>

          <button
            onClick={() => onSelectPackage(currentPkg)}
            className="px-4 py-2.5 text-xs font-bold text-luxury-emerald bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition"
          >
            Full Itinerary ({currentPkg.durationDays} Days)
          </button>

          <button
            onClick={() => onBookPackage(currentPkg)}
            className="px-5 py-2.5 bg-luxury-emerald hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 active:scale-95"
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
