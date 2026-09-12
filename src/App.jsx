import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import PackageCard from './components/PackageCard';
import ItineraryPreviewBanner from './components/ItineraryPreviewBanner';
import PackageDetailModal from './components/PackageDetailModal';
import HotelsSection from './components/HotelsSection';
import TransportSection from './components/TransportSection';
import CustomItineraryBuilder from './components/CustomItineraryBuilder';
import BookingModal from './components/BookingModal';
import CustomerPortal from './components/CustomerPortal';
import TravelDocuments from './components/TravelDocuments';
import AgentChatModal from './components/AgentChatModal';
import Footer from './components/Footer';

import { TOUR_PACKAGES } from './data/packagesData';
import { INITIAL_BOOKINGS } from './data/mockBookings';
import { Sparkles, ShieldCheck, Compass, Heart, Award, CheckCircle2, Filter } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'hotels' | 'transport' | 'itinerary' | 'portal' | 'documents'

  // Currency State (Supports USD, EUR, GBP, AUD, and BDT)
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('wanderlust_currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('wanderlust_currency', currency);
  }, [currency]);

  // Bookings State with LocalStorage Persistence
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('wanderlust_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BOOKINGS;
      }
    }
    return INITIAL_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem('wanderlust_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const [activeBookingId, setActiveBookingId] = useState(() => bookings[0]?.id || 'WL-84920');

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'duration'

  // Modals State
  const [selectedPackageDetail, setSelectedPackageDetail] = useState(null);
  const [isPackageDetailOpen, setIsPackageDetailOpen] = useState(false);

  const [bookingCheckoutItem, setBookingCheckoutItem] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [celebrationToast, setCelebrationToast] = useState(null);

  // Region Filter Options
  const regions = ['All', 'Southeast Asia', 'Europe', 'Indian Ocean', 'Africa', 'Asia'];

  // Filtered packages
  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    const matchesQuery = searchQuery === '' ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.overview.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion === 'All' || pkg.region === selectedRegion;

    return matchesQuery && matchesRegion;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.priceUSD - b.priceUSD;
    if (sortBy === 'price-high') return b.priceUSD - a.priceUSD;
    if (sortBy === 'duration') return b.durationDays - a.durationDays;
    return b.rating - a.rating;
  });

  // Action handlers
  const handleViewPackageDetails = (pkg) => {
    setSelectedPackageDetail(pkg);
    setIsPackageDetailOpen(true);
  };

  const handleBookPackage = (pkg) => {
    setBookingCheckoutItem(pkg);
    setIsBookingModalOpen(true);
  };

  const handleBookHotel = ({ hotel, room, totalPerNight }) => {
    setBookingCheckoutItem({
      id: hotel.id,
      title: `${hotel.name} (${room.name})`,
      destination: hotel.location,
      priceUSD: totalPerNight,
      hotel,
      room,
      totalPerNight
    });
    setIsBookingModalOpen(true);
  };

  const handleBookTransport = (transportItem) => {
    setBookingCheckoutItem({
      id: transportItem.id,
      title: `${transportItem.name} (${transportItem.popularRoute})`,
      destination: `${transportItem.pickupLocation} to ${transportItem.destination}`,
      priceUSD: transportItem.priceUSD,
      isTransport: true
    });
    setIsBookingModalOpen(true);
  };

  const handleBookCustomItinerary = (customTrip) => {
    setBookingCheckoutItem({
      id: `custom-${Date.now()}`,
      title: `${customTrip.daysCount}-Day Bespoke ${customTrip.destination}`,
      destination: customTrip.destination,
      priceUSD: customTrip.estimatedTotal,
      estimatedTotal: customTrip.estimatedTotal
    });
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);
    setCelebrationToast(`Success! Your booking (${newBooking.id}) for ${newBooking.packageTitle} has been confirmed.`);

    setTimeout(() => {
      setCelebrationToast(null);
    }, 7000);
  };

  const activeBooking = bookings.find((b) => b.id === activeBookingId) || bookings[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-slate-900 font-sans">
      {/* Celebration Toast after checkout */}
      {celebrationToast && (
        <div className="fixed top-24 right-4 z-50 max-w-md bg-luxury-emerald-dark text-white p-4 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-3 animate-in slide-in-from-right-5 duration-300">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <span className="font-bold text-amber-400 block uppercase tracking-wider text-[10px]">Booking Verified</span>
            <p className="mt-0.5">{celebrationToast}</p>
          </div>
          <button
            onClick={() => {
              setActiveTab('documents');
              setCelebrationToast(null);
            }}
            className="px-2.5 py-1.5 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold hover:bg-amber-400 transition shrink-0"
          >
            View Docs
          </button>
        </div>
      )}

      {/* Global Luxury Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        bookingsCount={bookings.length}
        onOpenPortal={() => setActiveTab('portal')}
        onOpenDocuments={() => setActiveTab('documents')}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* MAIN VIEW SWITCHER */}
      <main className="flex-1">
        {/* VIEW 1: TOUR PACKAGES & EXPLORER (Option 1 Core Design) */}
        {activeTab === 'packages' && (
          <div>
            {/* Hero & Multi-Tab Booking Search */}
            <HeroSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              setActiveTab={setActiveTab}
            />

            {/* Option 1: Visual Day-by-Day Itinerary Preview Banner */}
            <ItineraryPreviewBanner
              packages={TOUR_PACKAGES}
              currency={currency}
              onSelectPackage={handleViewPackageDetails}
              onBookPackage={handleBookPackage}
            />

            {/* Curated Tour Packages Catalog Section */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header & Filters */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-luxury-emerald text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Iconic World Destinations
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Discover Curated Tour Packages
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 max-w-xl">
                    Every itinerary includes private airport meet-and-greets, 5-star villa sanctuaries, dedicated guides, and VIP excursions.
                  </p>
                </div>

                {/* Filter and Sorting Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                    {regions.map((region) => (
                      <button
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                          selectedRegion === region
                            ? 'bg-luxury-emerald text-white shadow'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ml-auto"
                  >
                    <option value="featured">Sort by: Top Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Trip Duration</option>
                  </select>
                </div>
              </div>

              {/* Packages Cards Grid */}
              {filteredPackages.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                  <p className="text-slate-500 text-sm">No packages found matching "{searchQuery}".</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('All');
                    }}
                    className="mt-3 px-4 py-2 bg-luxury-emerald text-white rounded-xl text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      currency={currency}
                      onViewDetails={handleViewPackageDetails}
                      onBookNow={handleBookPackage}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Why Wanderlust Feature Banner */}
            <section className="py-16 bg-gradient-to-br from-emerald-950 via-slate-900 to-luxury-emerald-dark text-white mt-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                    The Wanderlust Distinction
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
                    Why Discerning Travelers Choose Us
                  </h3>
                  <p className="text-emerald-200/90 text-sm mt-2">
                    We eliminate every friction point so you can immerse fully in life-enriching adventures.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                      <Compass className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg font-bold">Unrivaled Private Access</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      After-hours temple blessings, private Riva boat charters, and secret sandbank dinners inaccessible to the general public.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg font-bold">End-to-End Security &amp; Care</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Every booking includes comprehensive TravelGuard coverage, flight monitoring, and 24/7 dedicated concierge response.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                      <Award className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg font-bold">Multi-Currency Global Freedom</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Settle your journeys transparently in your native currency including USD, EUR, GBP, AUD, and BDT (৳) with zero hidden foreign markup.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: HOTELS & VILLAS */}
        {activeTab === 'hotels' && (
          <HotelsSection
            currency={currency}
            onBookHotel={handleBookHotel}
          />
        )}

        {/* VIEW 3: TRANSPORT & TRANSFERS */}
        {activeTab === 'transport' && (
          <TransportSection
            currency={currency}
            onBookTransport={handleBookTransport}
          />
        )}

        {/* VIEW 4: CUSTOM ITINERARY PLANNER */}
        {activeTab === 'itinerary' && (
          <CustomItineraryBuilder
            currency={currency}
            onBookCustomItinerary={handleBookCustomItinerary}
          />
        )}

        {/* VIEW 5: CUSTOMER PORTAL */}
        {activeTab === 'portal' && (
          <CustomerPortal
            bookings={bookings}
            activeBookingId={activeBookingId}
            setActiveBookingId={setActiveBookingId}
            currency={currency}
            onOpenDocuments={() => setActiveTab('documents')}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {/* VIEW 6: TRAVEL DOCUMENTS VAULT */}
        {activeTab === 'documents' && (
          <TravelDocuments
            booking={activeBooking}
            onBackToPortal={() => setActiveTab('portal')}
          />
        )}
      </main>

      {/* Global Modals */}
      {/* 1. Package Detail & Itinerary Modal */}
      <PackageDetailModal
        pkg={selectedPackageDetail}
        isOpen={isPackageDetailOpen}
        onClose={() => setIsPackageDetailOpen(false)}
        currency={currency}
        onBookNow={handleBookPackage}
      />

      {/* 2. Checkout & Payment Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingItem={bookingCheckoutItem}
        currency={currency}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* 3. Concierge Chat Modal */}
      <AgentChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        agent={activeBooking?.concierge}
      />

      {/* Global Luxury Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
