import React, { useState } from 'react';
import { Car, Users, Briefcase, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Navigation } from 'lucide-react';
import { TRANSPORT_OPTIONS } from '../data/transportData';
import { formatCurrency } from '../utils/formatters';

export default function TransportSection({
  currency,
  onBookTransport
}) {
  const [pickupLocation, setPickupLocation] = useState('Denpasar International Airport (DPS)');
  const [destination, setDestination] = useState('Uluwatu Sunset Villa');

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-luxury-emerald text-xs font-bold uppercase tracking-wider mb-3">
          <Navigation className="w-3.5 h-3.5" /> Seamless VIP Mobility
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Private Transfers &amp; Luxury Transport
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          From flight touchdown to island speedboat charters, travel in total comfort with guaranteed on-time private chauffeurs and high-spec vehicles.
        </p>
      </div>

      {/* Transfer Quick Route Preview Form */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 mb-10 shadow-xl max-w-4xl mx-auto border border-emerald-900">
        <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Customized Route Calculator
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Pickup Point</label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Drop-off Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Transport Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRANSPORT_OPTIONS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Transport Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-luxury-emerald text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                  {item.category}
                </div>
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[11px] font-bold shadow">
                  {item.tag}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5">
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                  {item.name}
                </h3>

                <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Users className="w-3.5 h-3.5 text-luxury-emerald" /> {item.capacity}
                  </span>
                </div>

                <p className="mt-2 text-xs text-emerald-800 font-medium bg-emerald-50 px-2.5 py-1 rounded-lg">
                  Route: {item.popularRoute}
                </p>

                {/* Features List */}
                <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Standard Fare</span>
                  <span className="font-serif text-xl font-bold text-luxury-emerald">
                    {formatCurrency(item.priceUSD, currency)}
                  </span>
                  <span className="text-[11px] text-slate-500"> {item.unit}</span>
                </div>

                <button
                  onClick={() => onBookTransport({ ...item, pickupLocation, destination })}
                  className="px-4 py-2 bg-luxury-emerald hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 active:scale-95"
                >
                  <span>Book Ride</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
