import React, { useState } from 'react';
import { MEMBERS_DATA } from '../data/symposiumData';
import { Shield, Award, Phone } from 'lucide-react';

export default function MembersSection() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Executive Committee', 'Trustees', 'Editorial & Media'];

  const filteredMembers = filter === 'All'
    ? MEMBERS_DATA
    : MEMBERS_DATA.filter(m => m.category === filter);

  return (
    <section id="members" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black/80 border-t border-b border-red-500/20">
      {/* Background ambient diagonal smoke */}
      <div className="absolute top-10 left-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-500/50 mb-3 animate-pulse font-heading">
            ★ Symposium Organizing Committee ★
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_15px_rgba(255,0,85,0.8)] font-heading">
            MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-cyan-400">ZENTRIX MEMBERS</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
            The executive committee leaders, trustee, editors, and media directors behind Zentrix 2k26.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map(cat => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer font-heading ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(255,0,85,0.8)] border border-red-400 scale-105'
                    : 'bg-slate-950/90 text-gray-400 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => {
            const isExecutive = member.category === 'Executive Committee';
            const isTrustee = member.category === 'Trustees';

            return (
              <div
                key={member.id}
                className="group relative rounded-2xl bg-slate-950/90 border border-slate-800 p-6 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-red-500/70 hover:shadow-[0_0_30px_rgba(255,0,85,0.4)] flex flex-col justify-between"
              >
                {/* Neon Card Border Accent */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                  isTrustee
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-300'
                    : isExecutive
                    ? 'bg-gradient-to-r from-red-600 to-rose-500'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-600'
                }`}></div>

                <div>
                  {/* Photo Container */}
                  <div className="relative w-28 h-28 mx-auto mb-4 rounded-full p-1 bg-gradient-to-br from-red-500 via-rose-500 to-cyan-400 shadow-[0_0_20px_rgba(255,0,85,0.4)]">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-black border border-slate-700 text-cyan-400">
                      {isTrustee ? <Shield className="w-4 h-4 text-amber-400" /> : <Award className="w-4 h-4 text-red-400" />}
                    </div>
                  </div>

                  {/* Name and Posting */}
                  <div className="text-center">
                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors font-heading">
                      {member.name}
                    </h3>
                    
                    <span className={`inline-block my-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      isTrustee
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                        : isExecutive
                        ? 'bg-red-950 text-red-300 border border-red-500/50'
                        : 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                    }`}>
                      {member.posting}
                    </span>

                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Mobile Number Display (Only if present in data) */}
                {member.phone && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{member.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
