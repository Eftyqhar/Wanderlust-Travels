import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Hotel, Car, Plane, Sparkles, Shield, Award, Clock } from 'lucide-react';

export default function HeroSearch({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  onSearchSubmit,
  setActiveTab
}) {
  const [activeSearchTab, setActiveSearchTab] = useState('packages'); // packages, hotels, transport
  const [dates, setDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState('2 Adults, 1 Room');
  const [travelersDropdown, setTravelersDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (activeSearchTab === 'hotels') {
      setActiveTab('hotels');
    } else if (activeSearchTab === 'transport') {
      setActiveTab('transport');
    } else {
      setActiveTab('packages');
      if (onSearchSubmit) onSearchSubmit();
    }
  };

  const destinationsList = [
    'All Destinations',
    'Bali, Indonesia',
    'Amalfi Coast, Italy',
    'Maldives',
    'Serengeti, Tanzania',
    'Swiss Alps, Switzerland',
    'Kyoto & Tokyo, Japan'
  ];

  return (
    <div className="relative">
      {/* Background Hero Container */}
      <div className="relative h-[560px] md:h-[620px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Tropical Beach Paradise"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />
        {/* Subtle Dark / Gradient Overlays for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-900/40" />
        <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-300 border border-white/20 text-xs uppercase tracking-widest font-semibold mb-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="w-3.5 h-3.5" />
            Bespoke Luxury Travel Experiences
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md max-w-4xl leading-tight sm:leading-none">
            Journey Beyond the <span className="italic font-normal text-amber-400">Ordinary</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-100/90 font-light max-w-2xl drop-shadow">
            Handcrafted private expeditions, 5-star overwater villas, private yacht charters, and round-the-clock bespoke concierge service.
          </p>
        </div>
      </div>

      {/* Floating Multi-Tab Search Box (Option 1 Design) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-24 sm:-mt-28 relative z-20">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/20 border border-white/60 overflow-visible p-3 sm:p-5">
          {/* Tabs row */}
          <div className="flex items-center space-x-2 border-b border-slate-200/80 pb-3 mb-4 overflow-x-auto">
            <button
              onClick={() => setActiveSearchTab('packages')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeSearchTab === 'packages'
                  ? 'bg-luxury-emerald text-white shadow-sm'
                  : 'text-slate-600 hover:text-luxury-emerald hover:bg-emerald-50/50'
              }`}
            >
              <span>📦</span> Tour Packages
            </button>

            <button
              onClick={() => setActiveSearchTab('hotels')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeSearchTab === 'hotels'
                  ? 'bg-luxury-emerald text-white shadow-sm'
                  : 'text-slate-600 hover:text-luxury-emerald hover:bg-emerald-50/50'
              }`}
            >
              <Hotel className="w-4 h-4 text-amber-500" /> Luxury Hotels
            </button>

            <button
              onClick={() => setActiveSearchTab('transport')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeSearchTab === 'transport'
                  ? 'bg-luxury-emerald text-white shadow-sm'
                  : 'text-slate-600 hover:text-luxury-emerald hover:bg-emerald-50/50'
              }`}
            >
              <Car className="w-4 h-4 text-emerald-600" /> Private Transport
            </button>
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearchClick} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Destination / Search */}
            <div className="md:col-span-4 relative">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">
                Destination
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-700 absolute left-3 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Bali, Amalfi, Maldives..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 transition font-medium"
                />
              </div>
            </div>

            {/* Travel Dates */}
            <div className="md:col-span-3">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">
                Departure - Return
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-emerald-700 absolute left-3 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Oct 14 - Oct 26, 2026"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 transition font-medium"
                />
              </div>
            </div>

            {/* Travelers & Rooms */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">
                Travelers &amp; Rooms
              </label>
              <button
                type="button"
                onClick={() => setTravelersDropdown(!travelersDropdown)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-left flex items-center justify-between font-medium text-slate-800 transition"
              >
                <span className="flex items-center gap-2 truncate">
                  <Users className="w-4 h-4 text-emerald-700 absolute left-3 top-3.5" />
                  {adults} Adults, {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                </span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {/* Travelers Popover */}
              {travelersDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in duration-150">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Adults</p>
                      <p className="text-[10px] text-slate-400">Ages 12+</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded-full border border-slate-200 text-sm font-bold flex items-center justify-center hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-7 h-7 rounded-full border border-slate-200 text-sm font-bold flex items-center justify-center hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Luxury Rooms</p>
                      <p className="text-[10px] text-slate-400">Villas or Suites</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-7 h-7 rounded-full border border-slate-200 text-sm font-bold flex items-center justify-center hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(rooms + 1)}
                        className="w-7 h-7 rounded-full border border-slate-200 text-sm font-bold flex items-center justify-center hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTravelersDropdown(false)}
                    className="w-full py-1.5 bg-luxury-emerald text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Action CTA Button */}
            <div className="md:col-span-2">
              <label className="hidden md:block text-[11px] uppercase tracking-wider font-bold text-transparent mb-1">
                Action
              </label>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>
                  {activeSearchTab === 'packages' ? 'Search Packages' : activeSearchTab === 'hotels' ? 'Find Hotels' : 'Find Rides'}
                </span>
              </button>
            </div>
          </form>

          {/* Quick Destination Tags */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Trending:</span>
            {['Bali', 'Amalfi Coast', 'Maldives', 'Serengeti', 'Swiss Alps', 'Kyoto'].map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => {
                  setSearchQuery(dest);
                  setActiveTab('packages');
                }}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-100/70 text-slate-600 hover:text-luxury-emerald transition font-medium whitespace-nowrap"
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Trust Value Pillars below search */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md p-3 rounded-xl border border-slate-200/60">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-luxury-emerald flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">100% Bespoke</p>
              <p className="text-[11px] text-slate-500">Handcrafted Itineraries</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md p-3 rounded-xl border border-slate-200/60">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Best Price Guarantee</p>
              <p className="text-[11px] text-slate-500">5-Star Direct Partner</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md p-3 rounded-xl border border-slate-200/60">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">24/7 VIP Concierge</p>
              <p className="text-[11px] text-slate-500">Dedicated Travel Specialist</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md p-3 rounded-xl border border-slate-200/60">
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Zero Booking Fees</p>
              <p className="text-[11px] text-slate-500">Free Changes up to 14 Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
