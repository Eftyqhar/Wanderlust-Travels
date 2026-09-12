import React, { useState } from 'react';
import { Star, MapPin, Check, Wifi, Sparkles, Bed, ArrowRight, Filter } from 'lucide-react';
import { HOTELS_DATA } from '../data/hotelsData';
import { formatCurrency } from '../utils/formatters';

export default function HotelsSection({
  currency,
  onBookHotel
}) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedRooms, setSelectedRooms] = useState({});

  const filterOptions = ['All', 'Bali', 'Amalfi Coast', 'Maldives', 'Switzerland', 'Tokyo'];

  const filteredHotels = selectedFilter === 'All'
    ? HOTELS_DATA
    : HOTELS_DATA.filter((h) => h.destination.toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleRoomSelect = (hotelId, roomIndex) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [hotelId]: roomIndex
    }));
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 5-Star Accommodations &amp; Private Villas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Handpicked Luxury Stays
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Each villa, overwater retreat, and alpine chalet is vetted for exceptional service, panoramic vistas, and unmatched comfort.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedFilter === opt
                  ? 'bg-luxury-emerald text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => {
          const selectedRoomIdx = selectedRooms[hotel.id] || 0;
          const currentRoom = hotel.roomTypes[selectedRoomIdx];
          const totalPerNight = hotel.pricePerNightUSD + currentRoom.priceDiff;

          return (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Hotel Image & Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-[11px] font-bold shadow">
                    {hotel.badge}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>

                {/* Hotel Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{hotel.location}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                    {hotel.name}
                  </h3>

                  {/* Amenities Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Room Type Selector */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
                      Select Suite / Villa Tier:
                    </label>
                    <div className="space-y-1.5">
                      {hotel.roomTypes.map((room, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRoomSelect(hotel.id, idx)}
                          className={`w-full text-left p-2 rounded-lg border text-xs transition flex justify-between items-center ${
                            selectedRoomIdx === idx
                              ? 'border-emerald-600 bg-emerald-50/50 text-luxury-emerald font-semibold'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="truncate pr-2">{room.name}</span>
                          <span className="shrink-0 text-[11px] text-slate-500">
                            {room.priceDiff === 0 ? 'Standard' : `+${formatCurrency(room.priceDiff, currency)}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Book CTA */}
              <div className="p-5 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Nightly Rate</span>
                    <span className="font-serif text-xl font-bold text-luxury-emerald">
                      {formatCurrency(totalPerNight, currency)}
                    </span>
                    <span className="text-xs text-slate-500"> / night</span>
                  </div>

                  <button
                    onClick={() => onBookHotel({ hotel, room: currentRoom, totalPerNight })}
                    className="px-4 py-2 bg-luxury-emerald hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1 active:scale-95"
                  >
                    <span>Reserve Stay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
