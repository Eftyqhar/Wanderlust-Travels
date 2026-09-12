import React, { useState } from 'react';
import { X, Calendar, MapPin, Star, Users, CheckCircle2, XCircle, Clock, ShieldCheck, ArrowRight, BedDouble, Utensils } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function PackageDetailModal({
  pkg,
  isOpen,
  onClose,
  currency,
  onBookNow
}) {
  const [activeTab, setActiveTab] = useState('itinerary'); // itinerary, inclusions, gallery
  const [selectedDay, setSelectedDay] = useState(1);

  if (!isOpen || !pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Top Header Image */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-slate-900">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex gap-2">
            {pkg.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow">
                {pkg.badge}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
              {pkg.region}
            </span>
          </div>

          {/* Title & Info on bottom of image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold drop-shadow">
              {pkg.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-slate-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-amber-400" /> {pkg.destination}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-emerald-400" /> {pkg.durationDays} Days / {pkg.durationNights} Nights
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {pkg.rating} ({pkg.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-emerald-400" /> {pkg.groupSize}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex space-x-2">
            {[
              { id: 'itinerary', label: 'Day-by-Day Itinerary' },
              { id: 'inclusions', label: "What's Included & Excluded" },
              { id: 'gallery', label: 'Photo Gallery' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-luxury-emerald text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Price</span>
            <div className="font-serif text-xl font-bold text-luxury-emerald">
              {formatCurrency(pkg.priceUSD, currency)} <span className="text-xs font-sans font-normal text-slate-500">/ person</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700">
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 text-xs text-slate-700">
                <strong className="text-luxury-emerald">Expedition Note:</strong> All transfers are in private air-conditioned executive vehicles. Activities can be custom tailored with your dedicated concierge prior to departure.
              </div>

              {/* Itinerary Timeline */}
              <div className="relative border-l-2 border-emerald-700/30 ml-4 pl-6 space-y-6">
                {pkg.itinerary.map((dayItem) => (
                  <div key={dayItem.day} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-luxury-emerald text-amber-300 flex items-center justify-center text-[10px] font-bold shadow-md border-2 border-white">
                      {dayItem.day}
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:border-emerald-600/50 transition">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                          Day {dayItem.day} • {dayItem.location}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Utensils className="w-3.5 h-3.5 text-emerald-700" /> {dayItem.meals}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-serif text-base font-bold text-slate-900">
                        {dayItem.title}
                      </h4>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {dayItem.highlights}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <BedDouble className="w-3.5 h-3.5 text-amber-600" />
                          <span>Overnight Stay: <strong className="text-slate-800">{dayItem.stay}</strong></span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100">
                <div className="flex items-center gap-2 mb-4 text-luxury-emerald">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-serif text-lg font-bold text-luxury-emerald">
                    What's Included
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {pkg.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100">
                <div className="flex items-center gap-2 mb-4 text-rose-800">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <h3 className="font-serif text-lg font-bold text-rose-900">
                    What's Not Included
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {pkg.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.gallery.map((imgUrl, idx) => (
                <div key={idx} className="h-56 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                  <img
                    src={imgUrl}
                    alt={`${pkg.title} photo ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Guaranteed Best Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-bold text-luxury-emerald">
                {formatCurrency(pkg.priceUSD, currency)}
              </span>
              <span className="text-xs text-slate-500">/ traveler</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95 transition"
            >
              <span>Book This Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
