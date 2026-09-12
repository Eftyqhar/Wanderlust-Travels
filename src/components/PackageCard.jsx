import React from 'react';
import { Star, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function PackageCard({
  pkg,
  currency,
  onViewDetails,
  onBookNow
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-700/30 transition-all duration-300 flex flex-col">
      {/* Image Container with Badge */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {pkg.badge && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500 text-slate-950 shadow-md">
              {pkg.badge}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{pkg.rating}</span>
          <span className="text-[10px] text-slate-400 font-normal">({pkg.reviewsCount})</span>
        </div>

        {/* Bottom Destination & Duration Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {pkg.destination}
          </span>
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-emerald-400" />
            {pkg.durationDays} Days / {pkg.durationNights} Nights
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-luxury-emerald transition leading-snug">
            {pkg.title}
          </h3>

          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {pkg.overview}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pkg.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-emerald-50 text-luxury-emerald text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Starting from</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-bold text-luxury-emerald">
                {formatCurrency(pkg.priceUSD, currency)}
              </span>
              <span className="text-[11px] text-slate-500">/ person</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(pkg)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-luxury-emerald hover:bg-slate-100 rounded-lg transition"
            >
              View Itinerary
            </button>
            <button
              onClick={() => onBookNow(pkg)}
              className="px-3.5 py-2 text-xs font-bold bg-luxury-emerald hover:bg-emerald-900 text-white rounded-lg shadow-sm hover:shadow transition flex items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
