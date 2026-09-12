import React, { useState } from 'react';
import { Ticket, Hotel, Car, ShieldCheck, Printer, Download, CheckCircle2, QrCode, ArrowLeft, Plane, MapPin, Calendar, Clock, User } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export default function TravelDocuments({
  booking,
  onBackToPortal
}) {
  const [selectedDoc, setSelectedDoc] = useState('ticket'); // ticket, hotel, transport, insurance

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onBackToPortal}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-luxury-emerald transition"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Customer Portal
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>Print Official Vouchers</span>
          </button>
        </div>
      </div>

      {/* Doc selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'ticket', label: 'e-Ticket Boarding Pass', icon: Ticket },
          { id: 'hotel', label: 'Hotel Check-in Voucher', icon: Hotel },
          { id: 'transport', label: 'VIP Chauffeur Transfer Pass', icon: Car },
          { id: 'insurance', label: 'TravelGuard Insurance Certificate', icon: ShieldCheck },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedDoc(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedDoc === item.id
                  ? 'bg-luxury-emerald text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Printable Voucher Sheet Area */}
      <div id="printable-voucher" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* DOCUMENT 1: E-TICKET BOARDING PASS */}
        {selectedDoc === 'ticket' && (
          <div>
            {/* Airline Header */}
            <div className="bg-gradient-to-r from-luxury-emerald-dark to-slate-900 text-white p-6 sm:p-8 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Electronic Passenger Boarding Ticket
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {booking.flight.airline}
                </h2>
                <p className="text-xs text-emerald-200 mt-1">
                  Flight Ref: {booking.flight.flightNumber} • PNR: {booking.id}
                </p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase">
                  Confirmed
                </span>
                <p className="text-xs text-slate-300 mt-1">Class: Business Luxury</p>
              </div>
            </div>

            {/* Ticket Body with perforated style */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Flight info (8 cols) */}
              <div className="md:col-span-8 space-y-6">
                {/* Route visualization */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                  <div>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">SIN</span>
                    <p className="text-xs text-slate-500">Singapore Changi</p>
                    <p className="text-sm font-bold text-luxury-emerald mt-1">{booking.flight.departureTime}</p>
                  </div>

                  <div className="flex-1 px-4 text-center">
                    <Plane className="w-5 h-5 text-amber-600 mx-auto transform rotate-90" />
                    <div className="h-0.5 bg-slate-200 w-full my-2 relative">
                      <div className="absolute left-1/2 -top-1 w-2 h-2 rounded-full bg-amber-500 transform -translate-x-1/2" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Direct Non-Stop (2h 50m)</span>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">DPS</span>
                    <p className="text-xs text-slate-500">Bali Ngurah Rai</p>
                    <p className="text-sm font-bold text-luxury-emerald mt-1">{booking.flight.arrivalTime}</p>
                  </div>
                </div>

                {/* Traveler & Gate Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Passenger</span>
                    <span className="font-bold text-slate-800 text-sm">{booking.travelerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Departure Date</span>
                    <span className="font-bold text-slate-800 text-sm">{formatDate(booking.travelDates.startDate)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Terminal / Gate</span>
                    <span className="font-bold text-slate-800 text-sm">{booking.flight.terminal} / {booking.flight.gate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Assigned Seats</span>
                    <span className="font-bold text-luxury-emerald text-sm">{booking.flight.seat}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-800 border border-emerald-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Includes Priority Boarding, 40kg Baggage Allowance, and SilverKris Lounge Access.</span>
                </div>
              </div>

              {/* QR Code section (4 cols) */}
              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-dashed border-slate-200 md:pl-8 flex flex-col items-center justify-center text-center">
                {/* Stylized QR placeholder */}
                <div className="p-3 bg-slate-900 rounded-2xl shadow-inner text-white">
                  <QrCode className="w-28 h-28 text-white" />
                </div>
                <span className="mt-2 font-mono text-xs font-bold tracking-wider text-slate-700">
                  {booking.id}-TKT
                </span>
                <p className="text-[10px] text-slate-400 mt-1">
                  Scan at airport self-service kiosk or gate scanner.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENT 2: HOTEL VOUCHER */}
        {selectedDoc === 'hotel' && (
          <div>
            <div className="bg-gradient-to-r from-luxury-emerald to-emerald-900 text-white p-6 sm:p-8 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  Prepaid Luxury Hotel Check-In Voucher
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {booking.hotel.name}
                </h2>
                <p className="text-xs text-emerald-100 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {booking.hotel.address}
                </p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase">
                  Voucher Verified
                </span>
                <p className="text-xs text-emerald-200 mt-1">Conf: {booking.hotel.confirmationCode}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Guest Name</span>
                  <span className="font-bold text-slate-800 text-sm">{booking.travelerName} ({booking.guestsCount} Guests)</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Check-In</span>
                  <span className="font-bold text-slate-800 text-sm">{formatDate(booking.travelDates.startDate)} (from {booking.hotel.checkIn})</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Check-Out</span>
                  <span className="font-bold text-slate-800 text-sm">{formatDate(booking.travelDates.endDate)} (until {booking.hotel.checkOut})</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Suite Details &amp; Privileges</h4>
                <p className="text-slate-700">
                  <strong>Room Type:</strong> {booking.hotel.roomType}
                </p>
                <p className="text-slate-600">
                  <strong>Included Inclusions:</strong> Daily floating champagne breakfast, complimentary 60-minute couples massage voucher, and 24-hour private dedicated butler.
                </p>
                <p className="text-slate-500 text-[11px] pt-2 border-t border-slate-100">
                  <strong>Check-in Procedure:</strong> Present this voucher or booking code <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-slate-800">{booking.hotel.confirmationCode}</code> along with your passport at the VIP Welcome Lounge.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENT 3: TRANSPORT VOUCHER */}
        {selectedDoc === 'transport' && (
          <div>
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  VIP Chauffeur &amp; Airport Meet Pass
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {booking.transport.provider}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Vehicle: {booking.transport.vehicle}
                </p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
                  Driver Dispatched
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-slate-400 block font-semibold">Pickup Coordinates</span>
                  <p className="font-bold text-slate-800 text-sm">{booking.transport.pickupLocation}</p>
                  <p className="text-slate-600">Scheduled Pickup: <strong>{booking.transport.time}</strong></p>
                  <p className="text-slate-500">The chauffeur will hold a digital iPad placard displaying: <strong className="text-luxury-emerald">"WANDERLUST - {booking.travelerName}"</strong>.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-slate-400 block font-semibold">Assigned Chauffeur</span>
                  <p className="font-bold text-slate-800 text-sm">{booking.transport.driverName}</p>
                  <p className="text-slate-600">VIP Amenities: Cold Oshibori towels, chilled mineral water, high-speed vehicle Wi-Fi.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENT 4: INSURANCE */}
        {selectedDoc === 'insurance' && (
          <div>
            <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white p-6 sm:p-8 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  Comprehensive Travel Medical &amp; Trip Protection
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {booking.insurance.provider}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Policy Reference: {booking.insurance.policyNumber}
                </p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase">
                  {booking.insurance.status}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">Insured Traveler</span>
                  <span className="font-bold text-slate-800">{booking.travelerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Coverage Limit</span>
                  <span className="font-bold text-emerald-700">{booking.insurance.coverage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">24/7 Global Emergency Line</span>
                  <span className="font-bold text-slate-800">+1 (800) 555-SAFE</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed pt-2">
                This certificate verifies comprehensive coverage for emergency medical evacuation, trip cancellation/interruption, luggage loss, and travel delay under policy terms.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
