import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, CheckCircle2, Lock, Plane, Hotel, Car, Calendar, User, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { formatCurrency, generateBookingRef } from '../utils/formatters';

export default function BookingModal({
  isOpen,
  onClose,
  bookingItem, // could be a package, hotel, transport, or custom itinerary
  currency,
  onBookingSuccess
}) {
  const [step, setStep] = useState(1); // 1: Guests, 2: Add-ons, 3: Payment, 4: Confirmation
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  // Form State
  const [guestInfo, setGuestInfo] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.j@wanderlust.com',
    phone: '+1 (555) 234-8900',
    passportNumber: 'E9824102A',
    specialRequests: 'Ocean view room preference, anniversary celebration complimentary champagne.'
  });

  const [travelDates, setTravelDates] = useState({
    start: '2026-10-14',
    end: '2026-10-26'
  });

  const [travelersCount, setTravelersCount] = useState(2);

  // Add-ons toggles
  const [addOns, setAddOns] = useState({
    travelInsurance: true, // $95 per person
    airportVipLounge: true, // $55 per person
    privatePhotographer: false // $180 flat
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('card'); // card, stripe, applepay, paypal, bkash
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    name: 'Sarah Johnson',
    expiry: '12/28',
    cvv: '888'
  });

  if (!isOpen || !bookingItem) return null;

  // Calculate pricing
  const basePriceUSD = bookingItem.priceUSD || bookingItem.totalPerNight || bookingItem.estimatedTotal || 1499;
  const subtotalUSD = basePriceUSD * (bookingItem.isTransport ? 1 : travelersCount);

  const insuranceCost = addOns.travelInsurance ? 95 * travelersCount : 0;
  const loungeCost = addOns.airportVipLounge ? 55 * travelersCount : 0;
  const photoCost = addOns.privatePhotographer ? 180 : 0;
  const addOnsTotalUSD = insuranceCost + loungeCost + photoCost;
  const taxesUSD = Math.round(subtotalUSD * 0.08); // 8% luxury service charge & tourism levy
  const grandTotalUSD = subtotalUSD + addOnsTotalUSD + taxesUSD;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Realistic payment processing delay
    setTimeout(() => {
      const refCode = generateBookingRef();
      const newBooking = {
        id: refCode,
        packageId: bookingItem.id || 'custom-trip',
        packageTitle: bookingItem.title || bookingItem.name || 'Custom Bespoke Expedition',
        destination: bookingItem.destination || bookingItem.location || 'Global Destination',
        travelerName: guestInfo.fullName,
        email: guestInfo.email,
        phone: guestInfo.phone,
        guestsCount: travelersCount,
        roomsCount: Math.ceil(travelersCount / 2),
        travelDates: {
          startDate: travelDates.start,
          endDate: travelDates.end
        },
        totalPaidUSD: grandTotalUSD,
        paymentMethod: paymentMethod === 'card'
          ? 'Credit Card (Visa ending in 4242)'
          : paymentMethod === 'stripe'
          ? 'Stripe Instant Checkout'
          : paymentMethod === 'applepay'
          ? 'Apple Pay Verified'
          : paymentMethod === 'bkash'
          ? 'bKash Merchant Pay'
          : 'PayPal Premier',
        paymentDate: new Date().toISOString().split('T')[0],
        status: 'Confirmed',
        flight: {
          flightNumber: 'SQ-942',
          airline: 'Singapore Airlines',
          route: `SIN ➔ DPS (${bookingItem.destination?.split(',')[0] || 'Bali'})`,
          departureTime: '10:15 AM',
          arrivalTime: '01:05 PM',
          terminal: 'Terminal 2',
          gate: 'A14',
          seat: '12A, 12B',
          status: 'Confirmed & On Time'
        },
        hotel: {
          name: bookingItem.hotel?.name || 'Uluwatu Sunset Ocean Villa & Spa',
          roomType: bookingItem.room?.name || 'Panoramic Ocean Suite with Plunge Pool',
          checkIn: '3:00 PM',
          checkOut: '12:00 PM',
          confirmationCode: `HTL-${Math.floor(10000 + Math.random() * 90000)}`,
          address: 'Jl. Pantai Suluban No. 88, Uluwatu'
        },
        transport: {
          provider: 'Wanderlust Chauffeur Services',
          vehicle: 'Executive Mercedes-Benz Van',
          pickupLocation: 'International Airport Arrivals VIP Lounge',
          driverName: 'Wayan Sudarma (+62 812-3456-7890)',
          time: '1:30 PM'
        },
        insurance: {
          policyNumber: `TG-${refCode}`,
          provider: 'TravelGuard World Elite',
          coverage: '$250,000 Medical & Trip Interruption',
          status: addOns.travelInsurance ? 'Active' : 'Not Enrolled'
        },
        concierge: {
          name: 'Chloe Davis',
          title: 'Senior Luxury Travel Concierge',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
          status: 'Online',
          phone: '+1 (800) 555-WNDR'
        }
      };

      setCreatedBooking(newBooking);
      setIsProcessing(false);
      setStep(4);
      onBookingSuccess(newBooking);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-luxury-emerald-dark text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">
                {step === 4 ? 'Booking Confirmed!' : 'Secure Luxury Checkout'}
              </h3>
              <p className="text-xs text-emerald-200">
                {bookingItem.title || bookingItem.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Progress Stepper */}
        {step < 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex justify-between items-center text-xs font-semibold shrink-0">
            <div className="flex items-center space-x-6">
              <span className={`flex items-center gap-1.5 ${step >= 1 ? 'text-luxury-emerald' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-luxury-emerald text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
                Guest Details
              </span>
              <span className="text-slate-300">➔</span>
              <span className={`flex items-center gap-1.5 ${step >= 2 ? 'text-luxury-emerald' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-luxury-emerald text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
                Upgrades &amp; Protection
              </span>
              <span className="text-slate-300">➔</span>
              <span className={`flex items-center gap-1.5 ${step >= 3 ? 'text-luxury-emerald' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-luxury-emerald text-white' : 'bg-slate-200 text-slate-500'}`}>3</span>
                Payment &amp; Review
              </span>
            </div>

            <span className="hidden sm:inline text-slate-500">
              Step {step} of 3
            </span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: GUEST DETAILS */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lead Traveler Full Name *</label>
                  <input
                    type="text"
                    value={guestInfo.fullName}
                    onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (for e-Tickets) *</label>
                  <input
                    type="email"
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (with country code) *</label>
                  <input
                    type="tel"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Passport Number (Optional now)</label>
                  <input
                    type="text"
                    value={guestInfo.passportNumber}
                    onChange={(e) => setGuestInfo({ ...guestInfo, passportNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Travel Dates & Guests */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={travelDates.start}
                    onChange={(e) => setTravelDates({ ...travelDates, start: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Return Date</label>
                  <input
                    type="date"
                    value={travelDates.end}
                    onChange={(e) => setTravelDates({ ...travelDates, end: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Travelers</label>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                      className="w-8 h-8 rounded-lg border border-slate-300 font-bold hover:bg-slate-200 flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{travelersCount}</span>
                    <button
                      type="button"
                      onClick={() => setTravelersCount(travelersCount + 1)}
                      className="w-8 h-8 rounded-lg border border-slate-300 font-bold hover:bg-slate-200 flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                    <span className="text-xs text-slate-500 ml-1">Adults</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Concierge Requests &amp; Dietary Preferences</label>
                <textarea
                  rows={2}
                  value={guestInfo.specialRequests}
                  onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
                  placeholder="e.g. Vegetarian diet, anniversary setup, quiet room..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: UPGRADES & ADD-ONS */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-slate-900">
                Enhance Your Journey
              </h4>

              {/* Addon 1: TravelGuard Insurance */}
              <label className="flex items-start justify-between p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 cursor-pointer bg-white transition shadow-sm">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={addOns.travelInsurance}
                    onChange={(e) => setAddOns({ ...addOns, travelInsurance: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-bold text-slate-900">TravelGuard World Elite Protection</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      $250k medical coverage, trip cancellation protection, and lost luggage reimbursement.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-luxury-emerald whitespace-nowrap">
                  +{formatCurrency(95 * travelersCount, currency)}
                </span>
              </label>

              {/* Addon 2: VIP Airport Lounge */}
              <label className="flex items-start justify-between p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 cursor-pointer bg-white transition shadow-sm">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={addOns.airportVipLounge}
                    onChange={(e) => setAddOns({ ...addOns, airportVipLounge: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold text-slate-900">VIP Fast-Track &amp; Airport Lounge Passes</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Skip security queues with immigration escort and access premium lounge with showers and buffet.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-luxury-emerald whitespace-nowrap">
                  +{formatCurrency(55 * travelersCount, currency)}
                </span>
              </label>

              {/* Addon 3: Private Photographer */}
              <label className="flex items-start justify-between p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 cursor-pointer bg-white transition shadow-sm">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={addOns.privatePhotographer}
                    onChange={(e) => setAddOns({ ...addOns, privatePhotographer: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-slate-900">Dedicated Vacation Photographer (Half-Day)</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Professional photographer for unforgettable memories at iconic scenic spots, 50 retouched photos.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-luxury-emerald whitespace-nowrap">
                  +{formatCurrency(180, currency)}
                </span>
              </label>
            </div>
          )}

          {/* STEP 3: PAYMENT & SUMMARY */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Payment Methods (7 Cols) */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Select Payment Method
                </h4>

                {/* Gateway Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      paymentMethod === 'card'
                        ? 'border-luxury-emerald bg-emerald-50/70 text-luxury-emerald shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      paymentMethod === 'stripe'
                        ? 'border-luxury-emerald bg-emerald-50/70 text-luxury-emerald shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-extrabold text-blue-600">stripe</span>
                    <span>Stripe Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      paymentMethod === 'applepay'
                        ? 'border-luxury-emerald bg-emerald-50/70 text-luxury-emerald shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span> Pay</span>
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      paymentMethod === 'paypal'
                        ? 'border-luxury-emerald bg-emerald-50/70 text-luxury-emerald shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-blue-800 font-bold">Pay</span><span className="text-cyan-600 font-bold">Pal</span>
                    <span>PayPal</span>
                  </button>

                  {/* Bangladeshi local option when BDT or available */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50 text-pink-700 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-extrabold text-pink-600">bKash</span>
                    <span>Mobile Pay</span>
                  </button>
                </div>

                {/* Card input fields */}
                {paymentMethod === 'card' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 mt-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono"
                        />
                        <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-[10px]">VISA</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">CVV Security</label>
                        <input
                          type="text"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod !== 'card' && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant one-click authentication ready. You will confirm on the next screen.</span>
                  </div>
                )}
              </div>

              {/* Right Order Breakdown (5 Cols) */}
              <div className="md:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2">
                  Booking Breakdown
                </h4>

                <div className="flex justify-between">
                  <span className="text-slate-600">Base Fare ({travelersCount} travelers)</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(subtotalUSD, currency)}</span>
                </div>

                {addOns.travelInsurance && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">TravelGuard Insurance</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(insuranceCost, currency)}</span>
                  </div>
                )}

                {addOns.airportVipLounge && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">VIP Airport Fast-Track</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(loungeCost, currency)}</span>
                  </div>
                )}

                {addOns.privatePhotographer && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Vacation Photographer</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(photoCost, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-600">Taxes &amp; Tourism Levies</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(taxesUSD, currency)}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">Total Due</span>
                  <span className="font-serif text-xl font-bold text-luxury-emerald">
                    {formatCurrency(grandTotalUSD, currency)}
                  </span>
                </div>

                <div className="mt-3 p-2 bg-white rounded-lg border border-slate-200 text-[10px] text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-bit encrypted bank-grade transaction.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && createdBooking && (
            <div className="py-6 text-center max-w-xl mx-auto space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  Payment Successful • Confirmed
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                  Bon Voyage, {guestInfo.fullName}!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your luxury expedition has been secured. Your official documents and vouchers have been placed in your Travel Documents vault.
                </p>
              </div>

              {/* Booking Reference Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Booking Reference Code</span>
                  <span className="font-mono text-sm font-extrabold text-luxury-emerald tracking-wider">
                    {createdBooking.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination</span>
                  <span className="font-bold text-slate-800">{createdBooking.packageTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travel Dates</span>
                  <span className="font-bold text-slate-800">{createdBooking.travelDates.startDate} to {createdBooking.travelDates.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Charged</span>
                  <span className="font-bold text-luxury-emerald">{formatCurrency(createdBooking.totalPaidUSD, currency)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          {step < 4 ? (
            <>
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
                  >
                    Back
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 bg-luxury-emerald hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <span>Continue to Step {step + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                    className="px-7 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Confirm &amp; Pay {formatCurrency(grandTotalUSD, currency)}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-luxury-emerald hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition"
              >
                Go to Customer Portal &amp; View Documents
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
