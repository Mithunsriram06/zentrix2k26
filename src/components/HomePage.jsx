import React from 'react';
import Logo from './Logo';
import Countdown from './Countdown';
import MembersSection from './MembersSection';
import { SYMPOSIUM_INFO } from '../data/symposiumData';
import { Calendar, MapPin, Sparkles, Trophy, Utensils, Award, ArrowRight, Mail, Globe } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from './SocialIcons';

export default function HomePage({ onNavigate, onOpenRegistration }) {
  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-x-hidden tech-smoke-bg cyber-grid-overlay">

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-red-500/30 shadow-[0_4px_20px_rgba(255,0,85,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & College Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo size="sm" showSubtitle={false} />
            <div className="hidden sm:block text-left">
              <h1 className="text-lg font-black tracking-widest text-white m-0 leading-none font-heading">
                ZENTRIX <span className="text-red-500">2K26</span>
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold mt-0.5">
                Department of Artificial Intelligence & Data Science
              </p>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => onNavigate('events')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-gray-200 text-xs sm:text-sm font-extrabold hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)] font-heading uppercase"
            >
              Events List
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-gray-200 text-xs sm:text-sm font-extrabold hover:border-red-400 hover:text-red-300 transition-all cursor-pointer shadow-[0_0_10px_rgba(255,0,85,0.2)] font-heading uppercase"
            >
              Contacts
            </button>

            {/* Register button WITHOUT amount in label */}
            <button
              onClick={() => onOpenRegistration()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white text-xs sm:text-sm font-extrabold shadow-[0_0_15px_rgba(255,0,85,0.8)] hover:brightness-125 transition-all cursor-pointer flex items-center gap-1.5 font-heading uppercase"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        </div>
      </header>

      {/* HERO BANNER SECTION */}
      <section className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,240,255,0.3)] font-heading">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>A National Level Technical Symposium</span>
        </div>

        {/* Big Zentrix Official Image Logo */}
        <Logo size="xl" className="my-4" />

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_25px_rgba(255,0,85,0.9)] my-4 font-heading">
          ZENTRIX <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-cyan-400">2K26</span>
        </h1>

        <p className="text-base sm:text-xl font-medium text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Unleash your potential in Artificial Intelligence, Machine Learning, Coding, and Esports. Hosted by the <span className="text-cyan-400 font-bold">Department of Artificial Intelligence & Data Science</span> at T.J.S Engineering College.
        </p>

        {/* Date & Venue Tags */}
        <div className="flex flex-wrap items-center justify-center gap-4 my-6 text-xs sm:text-sm font-bold text-gray-300">
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950/90 border border-red-500/40 text-red-400 shadow-[0_0_10px_rgba(255,0,85,0.3)] font-heading">
            <Calendar className="w-4 h-4" /> 11th September 2026 @ 9:00 AM
          </span>
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)] font-heading">
            <MapPin className="w-4 h-4" /> T.J.S Engineering College, Puduvoyal
          </span>
        </div>

        {/* Quick Action CTA Buttons: Register button WITHOUT amount */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => onNavigate('events')}
            className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-700 text-white font-extrabold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:brightness-125 transition-all cursor-pointer font-heading"
          >
            Explore 10 Events
          </button>
          
          <button
            onClick={() => onOpenRegistration()}
            className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white font-extrabold text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(255,0,85,0.9)] hover:brightness-125 transition-all cursor-pointer font-heading"
          >
            Register Now
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="py-3.5 px-8 rounded-xl bg-slate-950 border border-slate-700 text-gray-200 font-extrabold text-xs tracking-widest uppercase hover:border-red-400 hover:text-red-400 transition-all cursor-pointer font-heading"
          >
            Contact Leads
          </button>
        </div>
      </section>

      {/* COUNTDOWN TIMER SECTION */}
      <section className="relative z-10 py-4">
        <Countdown />
      </section>

      {/* ABOUT ZENTRIX 2K26 PARAGRAPH SECTION */}
      <section id="about" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_35px_rgba(0,240,255,0.25)]">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 font-heading">
              Welcome to the Arena
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3 font-heading">
              ABOUT <span className="text-red-500 drop-shadow-[0_0_10px_rgba(255,0,85,0.8)]">ZENTRIX 2K26</span>
            </h2>
          </div>

          <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed text-justify">
            <p>
              <strong className="text-white font-bold">Zentrix 2k26</strong> is the flagship National Level Technical Symposium proudly hosted by the <span className="text-cyan-400 font-semibold">Department of Artificial Intelligence and Data Science</span> at T.J.S Engineering College. Designed as an epic intersection of technology, creative problem-solving, and competitive esports, Zentrix brings together futuristic thinkers, programmers, hardware enthusiasts, and strategy gamers from engineering colleges across the nation.
            </p>
            <p>
              Featuring <strong className="text-red-400 font-bold">10 high-octane events</strong> spanning AI Prompt Engineering, Code Debugging, Paper Presentation, Project Expo, Technical Quizzes, Treasure Hunts, and Esports, Zentrix 2k26 provides a platform to test your domain expertise against top talent. With a single nominal registration fee of <strong className="text-cyan-300 font-bold">₹100</strong>, participants gain entry to multiple events, win lucrative cash awards, earn official certificates, and enjoy a complementary delicious lunch. Join us on <strong className="text-white">September 11, 2026</strong> for an extraordinary day of innovation!
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-black border border-slate-800 text-center">
              <Trophy className="w-7 h-7 text-amber-400 mx-auto mb-2" />
              <h4 className="text-sm font-extrabold text-white font-heading">Cash Prizes</h4>
              <p className="text-xs text-gray-400 mt-1">Win exciting cash awards & trophies in every event</p>
            </div>
            
            <div className="p-4 rounded-2xl bg-black border border-slate-800 text-center">
              <Utensils className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-sm font-extrabold text-white font-heading">Free Lunch</h4>
              <p className="text-xs text-gray-400 mt-1">Complementary Veg & Non-Veg feast provided</p>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-slate-800 text-center">
              <Award className="w-7 h-7 text-cyan-400 mx-auto mb-2" />
              <h4 className="text-sm font-extrabold text-white font-heading">Certificates</h4>
              <p className="text-xs text-gray-400 mt-1">Official participation certificate for all attendees</p>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-slate-800 text-center">
              <Sparkles className="w-7 h-7 text-red-500 mx-auto mb-2" />
              <h4 className="text-sm font-extrabold text-white font-heading">One Fee, All Access</h4>
              <p className="text-xs text-gray-400 mt-1">₹100 gives entry to multiple competitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* SYMPOSIUM MEMBERS SECTION */}
      <section className="relative z-10">
        <MembersSection />
      </section>

      {/* FOOTER SECTION */}
      <footer className="relative z-10 bg-black border-t border-red-500/30 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="sm" showSubtitle={false} />
              <h3 className="text-xl font-black text-white tracking-widest font-heading">
                ZENTRIX <span className="text-red-500">2K26</span>
              </h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              A National Level Technical Symposium organized by the Department of Artificial Intelligence and Data Science at T.J.S Engineering College, Puduvoyal, Tamil Nadu.
            </p>
            <p className="text-xs text-cyan-400 font-semibold font-heading">
              Event Date: 11th September 2026 | Starts at 9:00 AM IST
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2 font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  → Events List (10 Events)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-red-400 transition-colors cursor-pointer">
                  → Contacts & Committee Leads
                </button>
              </li>
              <li>
                <button onClick={() => onOpenRegistration()} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  → Registration & Payment
                </button>
              </li>
              <li>
                <a href="#members" className="hover:text-cyan-400 transition-colors">
                  → Symposium Members
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Links with exact www.tjsec.in URL */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2 font-heading">
              Official Links & Socials
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={SYMPOSIUM_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram: {SYMPOSIUM_INFO.socials.instagramHandle}</span>
              </a>

              <a
                href={`mailto:${SYMPOSIUM_INFO.socials.email}`}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email: {SYMPOSIUM_INFO.socials.email}</span>
              </a>

              <a
                href={SYMPOSIUM_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>Facebook: /TJSGROUPOFINSTITUTIONS</span>
              </a>

              <a
                href={SYMPOSIUM_INFO.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>YouTube: @TJSECDIGITALCELL</span>
              </a>

              <a
                href={SYMPOSIUM_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn: /TJSEC2009</span>
              </a>

              <a
                href={SYMPOSIUM_INFO.socials.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors pt-1 border-t border-slate-800 font-mono"
              >
                <Globe className="w-4 h-4" />
                <span>College Website: www.tjsec.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 text-center text-xs text-gray-500 flex flex-wrap items-center justify-between">
          <p>© 2026 Zentrix 2k26 • Department of Artificial Intelligence & Data Science, T.J.S Engineering College.</p>
          <p className="text-cyan-400 font-mono">Dark Cyber Tech Edition</p>
        </div>
      </footer>
    </div>
  );
}
