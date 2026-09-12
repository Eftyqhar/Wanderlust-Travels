import React, { useState } from 'react';
import { Compass, ShieldCheck, Award, Heart, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Card */}
        <div className="bg-gradient-to-r from-luxury-emerald-dark to-slate-900 rounded-3xl p-8 sm:p-10 border border-emerald-800/40 shadow-2xl mb-14 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Private Travel Dispatch
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Unlock Secret Hideaways &amp; VIP Upgrades
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-2">
              Receive curated seasonal itineraries, unadvertised private island charters, and invitation-only expedition openings.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="bg-emerald-800/60 border border-emerald-600/40 text-emerald-100 px-6 py-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Thank you! Your private travel portfolio has been dispatched.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-96">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your VIP email..."
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition active:scale-95"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-xs">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-luxury-emerald flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white">
                Wanderlust <span className="text-amber-500 italic font-light">Travels</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Crafting extraordinary bespoke journeys for discerning travelers across the world’s most breathtaking destinations since 2014.
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> IATA Certified #964201
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-400" /> Virtuoso Member
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Destinations</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setActiveTab('packages')} className="hover:text-amber-400 transition">Bali &amp; Nusa Penida</button></li>
              <li><button onClick={() => setActiveTab('packages')} className="hover:text-amber-400 transition">Amalfi Coast &amp; Capri</button></li>
              <li><button onClick={() => setActiveTab('packages')} className="hover:text-amber-400 transition">Maldives Overwater</button></li>
              <li><button onClick={() => setActiveTab('packages')} className="hover:text-amber-400 transition">Serengeti Great Migration</button></li>
              <li><button onClick={() => setActiveTab('packages')} className="hover:text-amber-400 transition">Swiss Alps Glacier Express</button></li>
              <li><button onClick={() => setActiveTab('packages')} className="hover:text-amber-400 transition">Kyoto Zen Heritage</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setActiveTab('packages')} className="hover:text-amber-400 transition">Curated Tour Packages</button></li>
              <li><button onClick={() => setActiveTab('hotels')} className="hover:text-amber-400 transition">5-Star Hotels &amp; Villas</button></li>
              <li><button onClick={() => setActiveTab('transport')} className="hover:text-amber-400 transition">Private Chauffeurs &amp; Transfers</button></li>
              <li><button onClick={() => setActiveTab('itinerary')} className="hover:text-amber-400 transition">Custom Itinerary Builder</button></li>
              <li><button onClick={() => setActiveTab('portal')} className="hover:text-amber-400 transition">VIP Customer Portal</button></li>
              <li><button onClick={() => setActiveTab('documents')} className="hover:text-amber-400 transition">Digital Travel Documents</button></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Global Concierge</h4>
            <p className="text-slate-400">
              24/7 dedicated assistance for all enrolled travelers worldwide.
            </p>
            <div className="space-y-1.5 text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> +1 (800) 555-WNDR
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" /> concierge@wanderlust.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> 88 Ocean Way, Mayfair, London
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© 2026 Wanderlust Travels Ltd. All rights reserved. Multi-currency settlement supported in USD, EUR, GBP, AUD, and BDT (৳).</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Travel Protection Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
