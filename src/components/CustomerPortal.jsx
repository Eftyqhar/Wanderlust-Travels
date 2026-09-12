import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, Ticket, FileText, CreditCard, MessageSquare, Phone, ShieldCheck, Plane, AlertCircle, Sparkles, Download, Printer } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function CustomerPortal({
  bookings,
  activeBookingId,
  setActiveBookingId,
  currency,
  onOpenDocuments,
  onOpenChat
}) {
  const activeBooking = bookings.find((b) => b.id === activeBookingId) || bookings[0];

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 18,
    minutes: 35,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!activeBooking) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="font-serif text-2xl font-bold text-slate-800">No Active Trips Found</h3>
        <p className="text-slate-500 text-sm mt-1">
          Explore our curated tour packages and book your dream luxury journey today.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Wanderlust VIP Client Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Welcome, {activeBooking.travelerName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your booked expeditions, view real-time flight tracking, and access all certified travel documents.
          </p>
        </div>

        {/* Bookings Switcher if multiple exist */}
        {bookings.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Select Journey:</span>
            <select
              value={activeBookingId}
              onChange={(e) => setActiveBookingId(e.target.value)}
              className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.packageTitle} ({b.id})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Upcoming Trip Card & Documents Teaser */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Upcoming Trip Banner (Matching Option 3) */}
          <div className="bg-gradient-to-r from-luxury-emerald-dark via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-emerald-800/40">
            {/* Background pattern */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Trip Photo Preview */}
              <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden shadow-lg shrink-0 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80"
                  alt="Bali Expedition"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Trip Details & Live Countdown */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
                    Upcoming Journey • {activeBooking.id}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-white truncate">
                  {activeBooking.packageTitle}
                </h2>

                <p className="text-xs text-emerald-200 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {formatDate(activeBooking.travelDates.startDate)} – {formatDate(activeBooking.travelDates.endDate)}
                </p>

                {/* Countdown Timer Block */}
                <div className="mt-4 pt-3 border-t border-emerald-800/60">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 block mb-1">
                    Live Departure Countdown:
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold">
                    <div className="bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg border border-white/10 text-center">
                      <span className="text-base text-amber-300 font-bold block">{timeLeft.days}</span>
                      <span className="text-[9px] text-slate-300 font-sans font-normal">DAYS</span>
                    </div>
                    <span>:</span>
                    <div className="bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg border border-white/10 text-center">
                      <span className="text-base text-amber-300 font-bold block">{timeLeft.hours}</span>
                      <span className="text-[9px] text-slate-300 font-sans font-normal">HRS</span>
                    </div>
                    <span>:</span>
                    <div className="bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg border border-white/10 text-center">
                      <span className="text-base text-amber-300 font-bold block">{timeLeft.minutes}</span>
                      <span className="text-[9px] text-slate-300 font-sans font-normal">MINS</span>
                    </div>
                    <span>:</span>
                    <div className="bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg border border-white/10 text-center">
                      <span className="text-base text-amber-300 font-bold block">{timeLeft.seconds}</span>
                      <span className="text-[9px] text-slate-300 font-sans font-normal">SECS</span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Flight Confirmed
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hotel Confirmed
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Insurance Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Documents Vault Preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-emerald-600" />
                  Your Travel Documents Vault
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Download or print verified e-tickets, hotel check-in vouchers, and airport transfer QR passes.
                </p>
              </div>

              <button
                onClick={onOpenDocuments}
                className="px-4 py-2 bg-luxury-emerald hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
              >
                <span>Open Full Documents Hub</span>
              </button>
            </div>

            {/* Document Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {/* Doc 1: e-Ticket */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-emerald-600 transition flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs mb-2">
                    PDF
                  </div>
                  <h4 className="font-bold text-xs text-slate-800">e-Ticket Boarding Pass</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{activeBooking.flight.flightNumber} to Bali</p>
                </div>
                <button
                  onClick={onOpenDocuments}
                  className="mt-4 w-full py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>

              {/* Doc 2: Hotel Voucher */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-emerald-600 transition flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs mb-2">
                    PDF
                  </div>
                  <h4 className="font-bold text-xs text-slate-800">Hotel Check-in Voucher</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{activeBooking.hotel.name.slice(0, 22)}...</p>
                </div>
                <button
                  onClick={onOpenDocuments}
                  className="mt-4 w-full py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>

              {/* Doc 3: Transport QR */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-emerald-600 transition flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mb-2">
                    QR
                  </div>
                  <h4 className="font-bold text-xs text-slate-800">Transport QR Pass</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Chauffeur Meet &amp; Greet</p>
                </div>
                <button
                  onClick={onOpenDocuments}
                  className="mt-4 w-full py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> View QR
                </button>
              </div>

              {/* Doc 4: Insurance Policy */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-emerald-600 transition flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs mb-2">
                    PDF
                  </div>
                  <h4 className="font-bold text-xs text-slate-800">Insurance Certificate</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{activeBooking.insurance.policyNumber}</p>
                </div>
                <button
                  onClick={onOpenDocuments}
                  className="mt-4 w-full py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Live Flight Tracker, Concierge & Payments */}
        <div className="lg:col-span-4 space-y-6">
          {/* Flight Tracker Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-emerald-600" /> Live Flight Status Tracker
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                {activeBooking.flight.status}
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between font-mono font-bold text-slate-800">
                <span>{activeBooking.flight.flightNumber}</span>
                <span>{activeBooking.flight.route}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Departs</span>
                  <span className="font-bold text-slate-800">{activeBooking.flight.departureTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Gate</span>
                  <span className="font-bold text-slate-800">{activeBooking.flight.gate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Seats</span>
                  <span className="font-bold text-slate-800">{activeBooking.flight.seat}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Dedicated Concierge Card */}
          <div className="bg-gradient-to-br from-luxury-emerald to-emerald-950 text-white rounded-3xl p-5 shadow-lg border border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeBooking.concierge.avatar}
                  alt={activeBooking.concierge.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-emerald-900" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm">{activeBooking.concierge.name}</h4>
                <p className="text-[11px] text-emerald-200">{activeBooking.concierge.title}</p>
                <span className="text-[10px] text-amber-300 font-medium">● Available 24/7</span>
              </div>
            </div>

            <p className="mt-3 text-xs text-emerald-100/90 leading-relaxed">
              "Hello Sarah! I am coordinating your private chauffeur arrival and luxury villa welcome amenities."
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={onOpenChat}
                className="py-2 px-3 rounded-xl bg-white text-luxury-emerald hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Message
              </button>
              <button
                onClick={() => alert(`Calling dedicated concierge ${activeBooking.concierge.name} at ${activeBooking.concierge.phone}`)}
                className="py-2 px-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition border border-emerald-700"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </button>
            </div>
          </div>

          {/* Payment History & Summary */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm text-xs space-y-3">
            <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-600" /> Payment &amp; Invoices
            </h4>

            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Expedition Package</span>
                <span className="font-semibold text-slate-800">{formatCurrency(activeBooking.totalPaidUSD - 190, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>TravelGuard Insurance</span>
                <span className="font-semibold text-slate-800">{formatCurrency(190, currency)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
                <span>Total Paid</span>
                <span className="text-luxury-emerald font-serif text-sm">{formatCurrency(activeBooking.totalPaidUSD, currency)}</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Paid via {activeBooking.paymentMethod} on {activeBooking.paymentDate}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
