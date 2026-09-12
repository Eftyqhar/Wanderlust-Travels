import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Plus, Check, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const AVAILABLE_ACTIVITIES = [
  { id: 'act-temple', name: 'Private Sunset Temple & Kecak Dance', costUSD: 75, duration: '4 Hours', tag: 'Culture' },
  { id: 'act-yacht', name: 'Exclusive Catamaran Charter & Snorkeling', costUSD: 240, duration: 'Full Day', tag: 'Adventure' },
  { id: 'act-spa', name: 'Royal Herbal Spa & Flower Bath (2 Hrs)', costUSD: 95, duration: '2 Hours', tag: 'Wellness' },
  { id: 'act-jeep', name: 'Sunrise 4x4 Volcanic Jeep Tour', costUSD: 110, duration: '5 Hours', tag: 'Sightseeing' },
  { id: 'act-cooking', name: 'Organic Farm & Private Chef Masterclass', costUSD: 85, duration: '3 Hours', tag: 'Culinary' },
  { id: 'act-helimap', name: '15-Minute Coastal Helicopter Flight', costUSD: 290, duration: '30 Mins', tag: 'VIP' },
];

export default function CustomItineraryBuilder({
  currency,
  onBookCustomItinerary
}) {
  const [destination, setDestination] = useState('Bali, Indonesia');
  const [daysCount, setDaysCount] = useState(5);
  const [selectedActivities, setSelectedActivities] = useState({
    1: [AVAILABLE_ACTIVITIES[0]],
    2: [AVAILABLE_ACTIVITIES[1]],
    3: [AVAILABLE_ACTIVITIES[2]],
  });

  const handleAddActivity = (day, activity) => {
    setSelectedActivities((prev) => {
      const currentDayActs = prev[day] || [];
      if (currentDayActs.some((a) => a.id === activity.id)) return prev;
      return {
        ...prev,
        [day]: [...currentDayActs, activity]
      };
    });
  };

  const handleRemoveActivity = (day, activityId) => {
    setSelectedActivities((prev) => {
      const currentDayActs = prev[day] || [];
      return {
        ...prev,
        [day]: currentDayActs.filter((a) => a.id !== activityId)
      };
    });
  };

  // Base cost per day for 5-star stay + private chauffeur
  const baseCostPerDay = 280;
  const activitiesTotal = Object.values(selectedActivities)
    .flat()
    .reduce((sum, act) => sum + act.costUSD, 0);
  const estimatedTotal = daysCount * baseCostPerDay + activitiesTotal;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Tailor-Made Expeditions
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Custom Itinerary Planner
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Design your dream expedition day-by-day. Select luxury stays, private chauffeur transfers, and exclusive VIP activities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Interactive Itinerary Days */}
        <div className="lg:col-span-8 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                Destination Region
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Bali, Indonesia">Bali, Indonesia</option>
                <option value="Amalfi Coast, Italy">Amalfi Coast, Italy</option>
                <option value="Swiss Alps, Switzerland">Swiss Alps, Switzerland</option>
                <option value="Kyoto & Tokyo, Japan">Kyoto &amp; Tokyo, Japan</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                Expedition Length
              </label>
              <div className="flex items-center gap-1.5">
                {[3, 5, 7, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDaysCount(num)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      daysCount === num
                        ? 'bg-luxury-emerald text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {num} Days
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Days Accordion / List */}
          <div className="space-y-4">
            {Array.from({ length: daysCount }).map((_, index) => {
              const dayNum = index + 1;
              const dayActs = selectedActivities[dayNum] || [];

              return (
                <div
                  key={dayNum}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm transition hover:border-emerald-600/30"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-luxury-emerald text-amber-300 font-bold text-xs flex items-center justify-center">
                        {dayNum}
                      </span>
                      <h3 className="font-serif font-bold text-slate-900 text-base">
                        Day {dayNum}: {destination.split(',')[0]} Exploration
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      5-Star Luxury Villa Included
                    </span>
                  </div>

                  {/* Day Activities */}
                  <div className="space-y-2 mt-3">
                    {dayActs.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-2">
                        No custom excursions added yet for Day {dayNum}. Choose an experience below:
                      </p>
                    ) : (
                      dayActs.map((act) => (
                        <div
                          key={act.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-200/70 text-luxury-emerald font-bold text-[10px]">
                              {act.tag}
                            </span>
                            <span className="font-semibold text-slate-800">{act.name}</span>
                            <span className="text-slate-400 font-normal">({act.duration})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-luxury-emerald">
                              +{formatCurrency(act.costUSD, currency)}
                            </span>
                            <button
                              onClick={() => handleRemoveActivity(dayNum, act.id)}
                              className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Quick Add Excursions Chips */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">Add to Day {dayNum}:</span>
                    {AVAILABLE_ACTIVITIES.slice(0, 3).map((act) => {
                      const isAdded = dayActs.some((a) => a.id === act.id);
                      if (isAdded) return null;
                      return (
                        <button
                          key={act.id}
                          onClick={() => handleAddActivity(dayNum, act)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-luxury-emerald text-xs flex items-center gap-1 transition"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{act.name}</span>
                          <span className="text-[10px] text-slate-400">
                            (+{formatCurrency(act.costUSD, currency)})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Live Cost & Itinerary Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 shadow-xl p-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Itinerary Summary
            </h3>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Destination</span>
                <span className="font-bold text-slate-800">{destination}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-bold text-slate-800">{daysCount} Days / {daysCount - 1} Nights</span>
              </div>
              <div className="flex justify-between">
                <span>5-Star Resort &amp; Chauffeur</span>
                <span className="font-bold text-slate-800">{formatCurrency(daysCount * baseCostPerDay, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Curated VIP Excursions</span>
                <span className="font-bold text-slate-800">{formatCurrency(activitiesTotal, currency)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs uppercase font-bold text-slate-500">Estimated Total</span>
                <span className="font-serif text-2xl font-bold text-luxury-emerald">
                  {formatCurrency(estimatedTotal, currency)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Includes private airport transfers, luxury villa accommodations, and all chosen excursions.
              </p>

              <button
                onClick={() =>
                  onBookCustomItinerary({
                    destination,
                    daysCount,
                    estimatedTotal,
                    selectedActivities
                  })
                }
                className="mt-6 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-95 transition"
              >
                <span>Book This Custom Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Concierge Guarantee */}
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-xs text-luxury-emerald">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Free itinerary customization with your concierge after booking.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
