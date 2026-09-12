import React, { useState } from 'react';
import { Compass, Globe, User, Menu, X, Calendar, Ticket, Phone, ShieldCheck } from 'lucide-react';
import { CURRENCY_RATES } from '../utils/formatters';

export default function Navbar({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  bookingsCount,
  onOpenPortal,
  onOpenDocuments,
  onOpenChat
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  const navLinks = [
    { id: 'packages', label: 'Tour Packages' },
    { id: 'hotels', label: 'Hotels & Villas' },
    { id: 'transport', label: 'Transport & Transfers' },
    { id: 'itinerary', label: 'Custom Itinerary' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top micro bar for VIP concierge & currency */}
      <div className="bg-luxury-emerald-dark text-emerald-100 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Certified Luxury Travel Concierge &amp; IATA Accredited</span>
            <span className="sm:hidden">Wanderlust Luxury Travel</span>
          </span>
          <span className="hidden md:inline text-emerald-300">|</span>
          <span className="hidden md:flex items-center gap-1">
            <Phone className="w-3 h-3 text-amber-400" />
            24/7 VIP Hotline: +1 (800) 555-WNDR
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Currency Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdown(!currencyDropdown)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 font-medium transition text-xs"
              aria-label="Select Currency"
            >
              <span>{CURRENCY_RATES[currency]?.flag}</span>
              <span>{CURRENCY_RATES[currency]?.label}</span>
              <span className="text-[10px]">▼</span>
            </button>

            {currencyDropdown && (
              <div className="absolute right-0 mt-1 w-36 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100">
                  Select Currency
                </div>
                {Object.entries(CURRENCY_RATES).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrency(key);
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-50 transition ${
                      currency === key ? 'text-luxury-emerald font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{item.flag} {item.label}</span>
                    {currency === key && <span className="text-luxury-emerald">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenChat}
            className="hover:text-amber-300 transition flex items-center gap-1"
          >
            <span>Concierge Support</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('packages')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-luxury-emerald to-emerald-900 flex items-center justify-center text-amber-400 shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-serif text-2xl font-bold tracking-tight text-luxury-emerald">
                Wanderlust
              </span>
              <span className="text-amber-600 font-serif text-2xl font-light italic">
                Travels
              </span>
            </div>
            <p className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
              Luxury Curated Journeys
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-luxury-emerald text-white shadow-sm'
                    : 'text-slate-600 hover:text-luxury-emerald hover:bg-emerald-50/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Customer Portal & Travel Documents Quick Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={onOpenPortal}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
              activeTab === 'portal'
                ? 'bg-luxury-emerald text-white border-luxury-emerald'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <User className="w-4 h-4 text-amber-500" />
            <span>Customer Portal</span>
            {bookingsCount > 0 && (
              <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {bookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenDocuments}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
              activeTab === 'documents'
                ? 'bg-luxury-emerald text-white border-luxury-emerald'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Ticket className="w-4 h-4 text-emerald-600" />
            <span>Travel Docs</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={onOpenPortal}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 relative"
            title="My Trips"
          >
            <User className="w-5 h-5" />
            {bookingsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === link.id
                  ? 'bg-luxury-emerald text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPortal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-50 text-luxury-emerald text-sm font-semibold"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> Customer Portal (My Trips)
              </span>
              <span className="bg-luxury-emerald text-white text-xs px-2 py-0.5 rounded-full">
                {bookingsCount} Active
              </span>
            </button>

            <button
              onClick={() => {
                onOpenDocuments();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-50 text-slate-700 text-sm font-semibold"
            >
              <Ticket className="w-4 h-4 text-emerald-600" />
              Travel Documents &amp; Vouchers
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
