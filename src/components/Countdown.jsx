import React, { useState, useEffect } from 'react';
import { SYMPOSIUM_INFO } from '../data/symposiumData';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const target = new Date(SYMPOSIUM_INFO.targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isLive: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="relative p-6 rounded-2xl bg-slate-950/80 border border-red-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,85,0.25)]">
        {/* Neon corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500 rounded-br-2xl"></div>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 rounded-full border border-cyan-500/40 animate-pulse">
            ⚡ Live Event Countdown ⚡
          </span>
          <h3 className="text-xl md:text-2xl font-black tracking-wider text-white mt-2">
            Target Date: <span className="text-red-500 drop-shadow-[0_0_10px_rgba(255,0,85,0.8)]">11th September 2026</span> @ <span className="text-cyan-400">9:00 AM</span>
          </h3>
        </div>

        {timeLeft.isLive ? (
          <div className="text-center py-6">
            <h2 className="text-4xl font-extrabold text-red-500 animate-bounce drop-shadow-[0_0_20px_rgba(255,0,85,1)]">
              🚀 ZENTRIX 2K26 IS NOW LIVE!
            </h2>
            <p className="text-gray-300 mt-2">Head to campus auditorium or check event schedules below.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Days */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-red-950/40 to-slate-900 border border-red-500/40 shadow-[0_0_15px_rgba(255,0,85,0.2)] group hover:border-red-400 transition-all">
              <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-wider drop-shadow-[0_0_12px_rgba(255,0,85,0.9)]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-red-400 mt-1">Days</span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-slate-900 to-cyan-950/40 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] group hover:border-cyan-400 transition-all">
              <span className="text-4xl md:text-5xl font-black text-cyan-300 font-mono tracking-wider drop-shadow-[0_0_12px_rgba(0,240,255,0.9)]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 mt-1">Hours</span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-red-950/40 to-slate-900 border border-red-500/40 shadow-[0_0_15px_rgba(255,0,85,0.2)] group hover:border-red-400 transition-all">
              <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-wider drop-shadow-[0_0_12px_rgba(255,0,85,0.9)]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-red-400 mt-1">Minutes</span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-slate-900 to-cyan-950/40 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] group hover:border-cyan-400 transition-all">
              <span className="text-4xl md:text-5xl font-black text-cyan-300 font-mono tracking-wider drop-shadow-[0_0_12px_rgba(0,240,255,0.9)]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 mt-1">Seconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
