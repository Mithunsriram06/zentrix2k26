import React from 'react';
import { CONTACT_PERSONS, SYMPOSIUM_INFO } from '../data/symposiumData';
import { ArrowLeft, Phone, Mail, MapPin, Globe, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';

export default function ContactPage({ onBack }) {
  // Only display contacts that have phone numbers or key faculty
  const activeContacts = CONTACT_PERSONS.filter(p => p.phone);

  return (
    <div className="min-h-screen bg-black text-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden tech-smoke-bg cyber-grid-overlay">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Left Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950/90 border border-red-500/50 text-red-400 font-bold hover:bg-red-950/60 hover:text-white hover:border-red-400 transition-all shadow-[0_0_15px_rgba(255,0,85,0.4)] group cursor-pointer font-heading text-sm"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Page</span>
          </button>

          <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 font-heading">
            Zentrix 2k26 • Contacts & Helpdesk
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_20px_rgba(0,240,255,0.8)] font-heading">
            CONTACT <span className="text-red-500 drop-shadow-[0_0_20px_rgba(255,0,85,0.8)]">COORDINATORS</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Contact our student executive leads or faculty coordinators directly below for queries regarding events, rules, or college location.
          </p>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activeContacts.map((person, idx) => {
            const rawPhone = person.phone ? person.phone.replace(/[^0-9+]/g, '') : '';

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/95 border border-red-500/40 hover:border-red-400 shadow-[0_0_20px_rgba(255,0,85,0.25)] hover:shadow-[0_0_30px_rgba(255,0,85,0.4)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full border bg-red-950 text-red-300 border-red-500/50 font-heading">
                      {person.posting}
                    </span>
                    <UserCheck className="w-5 h-5 text-red-400" />
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-4 font-heading">{person.name}</h3>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between bg-black p-3 rounded-xl border border-slate-800 mb-3">
                    <span className="text-xs text-gray-400 font-mono">Mobile</span>
                    <span className="text-sm font-bold text-white font-mono">{person.phone}</span>
                  </div>

                  {rawPhone && rawPhone.startsWith('+91') && (
                    <div className="flex gap-2">
                      <a
                        href={`tel:${rawPhone}`}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1.5 font-heading"
                      >
                        <Phone className="w-4 h-4" /> Call Now
                      </a>
                      <a
                        href={`https://wa.me/${rawPhone.replace('+', '')}?text=Hi%20${encodeURIComponent(person.name)},%20I%20have%20a%20query%20regarding%20Zentrix%202k26`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 rounded-xl bg-green-950/90 border border-green-500/60 text-green-300 hover:bg-green-600 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1.5 font-heading"
                      >
                        <MessageSquare className="w-4 h-4" /> WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Location & Official Email Card */}
        <div className="p-8 rounded-3xl bg-slate-950/95 border border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.25)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-2 font-heading">
              <MapPin className="w-4 h-4" /> Symposium Venue Location
            </div>
            <h3 className="text-2xl font-black text-white mb-2 font-heading">{SYMPOSIUM_INFO.college}</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Puduvoyal, Near Ponneri / Karanodai Highway, Thiruvallur District, Tamil Nadu 601206.
              Free bus transport available from major Chennai pickup points!
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-cyan-300">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${SYMPOSIUM_INFO.socials.email}`} className="hover:underline">
                  {SYMPOSIUM_INFO.socials.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-cyan-300">
                <Globe className="w-4 h-4" />
                <a href={SYMPOSIUM_INFO.socials.website} target="_blank" rel="noreferrer" className="hover:underline font-mono">
                  {SYMPOSIUM_INFO.socials.websiteDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black border border-slate-800 text-center">
            <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-3 animate-pulse" />
            <h4 className="text-lg font-bold text-white mb-1 font-heading">Spot Registration Desk</h4>
            <p className="text-xs text-gray-400 mb-4">
              Online registration is recommended to guarantee certificates and lunch coupons. Spot registration opens on Sept 11 at 8:00 AM at the Reception counter.
            </p>
            <button
              onClick={onBack}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs shadow-[0_0_15px_rgba(255,0,85,0.7)] hover:brightness-125 cursor-pointer font-heading uppercase"
            >
              Back to Main Registration Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
