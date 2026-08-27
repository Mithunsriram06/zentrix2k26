import React from 'react';

export default function Logo({ size = "md", showSubtitle = false, className = "" }) {
  const dimensionClasses = {
    sm: "h-12 w-auto",
    md: "h-20 w-auto",
    lg: "h-36 w-auto",
    xl: "h-56 sm:h-72 w-auto"
  }[size] || "h-20 w-auto";

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <div className="relative group cursor-pointer">
        {/* Diagonal Red and Blue Neon Backlight Ambient Smoke Glow */}
        <div className="absolute -inset-3 bg-gradient-to-tr from-red-600 via-rose-500 to-cyan-400 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition duration-700 animate-pulse"></div>
        
        {/* Exact Official Zentrix 2K26 Logo Image */}
        <img
          src="/zentrix_logo.png"
          alt="Zentrix 2K26 Official Logo"
          className={`${dimensionClasses} relative object-contain transform transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_20px_rgba(255,0,85,0.8)]`}
        />
      </div>

      {showSubtitle && (
        <div className="text-center mt-3">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] font-heading">
            Department of Artificial Intelligence & Data Science
          </p>
        </div>
      )}
    </div>
  );
}
