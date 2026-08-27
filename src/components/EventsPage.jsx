import React, { useState } from 'react';
import { EVENTS_DATA } from '../data/symposiumData';
import { ArrowLeft, Trophy, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function EventsPage({ onBack, onRegisterEvent }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const categories = ['All', 'Technical', 'Non-Technical', 'Fun Challenges'];

  const filteredEvents = selectedCategory === 'All'
    ? EVENTS_DATA
    : EVENTS_DATA.filter(ev => ev.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden tech-smoke-bg cyber-grid-overlay">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Left Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950/90 border border-red-500/50 text-red-400 font-bold hover:bg-red-950/60 hover:text-white hover:border-red-400 transition-all shadow-[0_0_15px_rgba(255,0,85,0.4)] group cursor-pointer font-heading text-sm"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Page</span>
          </button>

          <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-500/50 font-heading">
            Zentrix 2k26 • 10 Core Events
          </span>
        </div>

        {/* Page Title Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_20px_rgba(255,0,85,0.8)] font-heading">
            SYMPOSIUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-cyan-400">EVENTS LIST</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Explore 10 high-stakes technical & non-technical competitions designed to challenge your intellect, creativity, and gaming power. One single registration opens access to all events!
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-widest uppercase transition-all cursor-pointer font-heading ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(255,0,85,0.8)] border border-red-400 scale-105'
                    : 'bg-slate-950/90 text-gray-400 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(ev => (
            <div
              key={ev.id}
              className="flex flex-col rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden hover:border-red-500/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,85,0.4)] group"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                
                {/* Category Badge */}
                <span className={`absolute top-4 left-4 text-xs font-black uppercase px-3 py-1 rounded-full border backdrop-blur-md font-heading ${
                  ev.category === 'Technical'
                    ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/60 shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                    : ev.category === 'Non-Technical'
                    ? 'bg-red-950/90 text-red-300 border-red-500/60 shadow-[0_0_10px_rgba(255,0,85,0.5)]'
                    : 'bg-purple-950/90 text-purple-300 border-purple-500/60'
                }`}>
                  {ev.category}
                </span>

                {/* Prize Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-lg border border-amber-500/40 backdrop-blur-md">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{ev.prize}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-red-400 transition-colors font-heading">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-cyan-400 font-semibold mt-1 mb-3">
                    {ev.shortDesc}
                  </p>

                  <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed mb-4">
                    {ev.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center text-xs text-gray-400 gap-2">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 gap-2">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{ev.venue}</span>
                  </div>

                  {/* Action Buttons: Register Button WITHOUT amount in text */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setActiveModalEvent(ev)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-black border border-slate-700 text-gray-300 font-bold text-xs hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer font-heading uppercase"
                    >
                      Rules & Info
                    </button>
                    <button
                      onClick={() => onRegisterEvent(ev.id)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs shadow-[0_0_15px_rgba(255,0,85,0.7)] hover:brightness-125 transition-all cursor-pointer font-heading uppercase"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Event Modal */}
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-red-500/60 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,0,85,0.5)]">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black p-2 rounded-full border border-slate-700 cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500 font-heading uppercase">
                  {activeModalEvent.category}
                </span>
                <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> {activeModalEvent.prize}
                </span>
              </div>

              <h2 className="text-3xl font-black text-white mb-2 font-heading">{activeModalEvent.title}</h2>
              <p className="text-red-400 font-semibold text-sm mb-6">{activeModalEvent.shortDesc}</p>

              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-2 font-heading">Event Description</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{activeModalEvent.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-3 font-heading">Rules & Regulations</h4>
                <ul className="space-y-2">
                  {activeModalEvent.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black border border-slate-800 mb-6">
                <div>
                  <span className="text-xs text-gray-400 block font-heading">Timing</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-1">
                    <Clock className="w-4 h-4 text-cyan-400" /> {activeModalEvent.time}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-heading">Venue</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 text-red-400" /> {activeModalEvent.venue}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="flex-1 py-3 rounded-xl bg-black text-gray-300 font-bold border border-slate-700 hover:bg-slate-900 cursor-pointer font-heading uppercase text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const eventId = activeModalEvent.id;
                    setActiveModalEvent(null);
                    onRegisterEvent(eventId);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold shadow-[0_0_20px_rgba(255,0,85,0.7)] hover:brightness-125 cursor-pointer font-heading uppercase text-xs"
                >
                  Proceed to Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
