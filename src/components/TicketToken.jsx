import React, { useRef, useState } from 'react';
import { Download, CheckCircle, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TicketToken({ registrationData, onClose }) {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF0055', '#00F0FF', '#FFFFFF', '#FFD700']
    });
  };

  React.useEffect(() => {
    triggerConfetti();
  }, []);

  // Fail-Safe High-Resolution 1200x750 HTML5 Canvas PNG Generator
  const handleDownloadImage = () => {
    setIsDownloading(true);

    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.src = '/zentrix_logo.png';

    logoImg.onload = () => {
      renderAndDownload(logoImg);
    };
    logoImg.onerror = () => {
      renderAndDownload(null);
    };

    function renderAndDownload(img) {
      try {
        const width = 1200;
        const height = 750;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // 1. Dark Cyber Background
        ctx.fillStyle = '#050509';
        ctx.fillRect(0, 0, width, height);

        // 2. Neon Red & Blue Ambient Smoke Accents
        const gradRed = ctx.createRadialGradient(0, 0, 10, 0, 0, 500);
        gradRed.addColorStop(0, 'rgba(255, 0, 85, 0.4)');
        gradRed.addColorStop(1, 'transparent');
        ctx.fillStyle = gradRed;
        ctx.fillRect(0, 0, width, height);

        const gradBlue = ctx.createRadialGradient(width, height, 10, width, height, 500);
        gradBlue.addColorStop(0, 'rgba(0, 240, 255, 0.3)');
        gradBlue.addColorStop(1, 'transparent');
        ctx.fillStyle = gradBlue;
        ctx.fillRect(0, 0, width, height);

        // 3. Cyber Outer Glowing Border
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#ff0055';
        ctx.strokeRect(20, 20, width - 40, height - 40);

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00f0ff';
        ctx.strokeRect(30, 30, width - 60, height - 60);

        // 4. Header Bar Text
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('OFFICIAL ENTRY TOKEN • ZENTRIX 2K26', 60, 80);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 48px sans-serif';
        ctx.fillText('SYMPOSIUM ENTRY PASS', 60, 145);

        ctx.fillStyle = '#a0aec0';
        ctx.font = '16px sans-serif';
        ctx.fillText('Department of Artificial Intelligence & Data Science • T.J.S Engineering College', 60, 180);

        // 5. Unique Pass Code Box
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(width - 420, 60, 360, 110);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(width - 420, 60, 360, 110);

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('UNIQUE PASS TOKEN', width - 400, 95);

        ctx.fillStyle = '#00f0ff';
        ctx.font = '900 36px monospace';
        ctx.fillText(registrationData.ticketId || 'ZNTX-2026', width - 400, 145);

        // Divider Line
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, 210);
        ctx.lineTo(width - 60, 210);
        ctx.stroke();

        // 6. Participant Details List
        const startY = 270;
        const col1 = 60;
        const col2 = 450;

        // Name
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('PARTICIPANT NAME', col1, startY);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(registrationData.name || 'Participant', col1, startY + 30);

        // Year of Study
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('YEAR OF STUDY', col2, startY);
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(registrationData.year || '3rd Year', col2, startY + 30);

        // College Name
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('COLLEGE / INSTITUTION NAME', col1, startY + 90);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(registrationData.college || 'Engineering College', col1, startY + 120);

        // Phone & Lunch
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('MOBILE NUMBER', col1, startY + 180);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(registrationData.phone || '', col1, startY + 210);

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('LUNCH PREFERENCE', col2, startY + 180);
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(registrationData.food || 'Veg', col2, startY + 210);

        // Registered Events
        const eventsStr = (registrationData.selectedEvents || []).join(', ');
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('REGISTERED EVENTS', col1, startY + 270);
        ctx.fillStyle = '#ff0055';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(eventsStr || 'All Events Access', col1, startY + 300);

        // 7. Zentrix Emblem Logo Box (Right Side) - Replacing QR Code
        const boxX = width - 360;
        const boxY = 250;
        const boxW = 300;
        const boxH = 340;

        ctx.fillStyle = '#05070f';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#ff0055';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        if (img) {
          ctx.drawImage(img, boxX + 25, boxY + 20, 250, 250);
        } else {
          ctx.fillStyle = '#ff0055';
          ctx.font = '900 28px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('ZENTRIX 2K26', boxX + 150, boxY + 160);
          ctx.textAlign = 'left';
        }

        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('OFFICIAL SYMPOSIUM PASS', boxX + 150, boxY + 290);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px monospace';
        ctx.fillText('Sept 11, 2026 @ 9:00 AM', boxX + 150, boxY + 315);
        ctx.textAlign = 'left';

        // 8. Footer Info Line
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, height - 80);
        ctx.lineTo(width - 60, height - 80);
        ctx.stroke();

        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('✓ Entry Fee Paid: ₹100 (Verified)', 60, height - 45);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px monospace';
        ctx.fillText(`Issued: ${new Date().toLocaleDateString()} • www.tjsec.in`, width - 380, height - 45);

        // Export Canvas to PNG
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const downloadLink = document.createElement('a');
        downloadLink.download = `ZENTRIX-ENTRY-PASS-${registrationData.ticketId || '2K26'}.png`;
        downloadLink.href = dataUrl;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (err) {
        console.error('PNG Canvas generation error:', err);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="w-full max-w-2xl my-8">
        
        {/* Printable/Downloadable Pass Card (Only 1 Single Page Prints) */}
        <div
          ref={cardRef}
          className="printable-ticket-card relative rounded-3xl bg-black p-6 md:p-8 border-2 border-red-500/70 shadow-[0_0_40px_rgba(255,0,85,0.4)] overflow-hidden"
        >
          {/* Cyber Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-rose-500 to-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/40 font-heading">
                Official Entry Token • Zentrix 2k26
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-wider mt-1 font-heading">
                SYMPOSIUM <span className="text-red-500">ENTRY PASS</span>
              </h2>
              <p className="text-xs text-gray-400">Department of Artificial Intelligence & Data Science • T.J.S Engineering College</p>
            </div>

            {/* Unique Code Tag */}
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block font-mono">Unique Token Code</span>
              <span className="text-xl md:text-2xl font-black font-mono text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] font-heading">
                {registrationData.ticketId}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Participant Details */}
            <div className="md:col-span-2 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-heading">Participant Name</span>
                  <span className="text-base font-extrabold text-white font-heading">{registrationData.name}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-heading">Year of Study</span>
                  <span className="text-base font-bold text-cyan-300">{registrationData.year}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block font-heading">College Name</span>
                <span className="text-sm font-semibold text-gray-200">{registrationData.college}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-heading">Mobile Number</span>
                  <span className="text-sm font-mono text-gray-300">{registrationData.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-heading">Lunch Preference</span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300">
                    {registrationData.food}
                  </span>
                </div>
              </div>

              {registrationData.selectedEvents && registrationData.selectedEvents.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1 font-heading">Registered Events</span>
                  <div className="flex flex-wrap gap-1.5">
                    {registrationData.selectedEvents.map((evTitle, i) => (
                      <span key={i} className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/40">
                        {evTitle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Zentrix Official Logo Container (Replacing QR Code) */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#05070f] border border-red-500/50 text-center shadow-[0_0_20px_rgba(255,0,85,0.25)]">
              <img
                src="/zentrix_logo.png"
                alt="Zentrix 2K26 Emblem"
                className="w-32 h-32 object-contain filter drop-shadow-[0_0_12px_rgba(255,0,85,0.8)]"
              />
              <span className="text-[10px] font-mono text-cyan-400 font-bold mt-2 font-heading">
                OFFICIAL SYMPOSIUM PASS
              </span>
              <span className="text-[9px] text-gray-400 font-mono">Sept 11, 2026 @ 9:00 AM</span>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle className="w-3.5 h-3.5" /> Entry Fee Paid: ₹100 (Verified)
            </span>
            <span>Issued: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action Buttons (Hides during printing) */}
        <div className="no-print mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,0,85,0.7)] hover:brightness-125 transition-all flex items-center justify-center gap-2 cursor-pointer font-heading disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Image...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Download Ticket Image (.PNG)
              </>
            )}
          </button>
          
          <button
            onClick={handlePrint}
            className="py-3 px-5 rounded-xl bg-slate-900 border border-slate-700 text-gray-200 font-bold text-xs tracking-wider uppercase hover:border-cyan-400 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
          >
            <Printer className="w-4 h-4" /> Print Token
          </button>

          <button
            onClick={onClose}
            className="py-3 px-6 rounded-xl bg-slate-800 text-gray-300 font-bold text-xs uppercase hover:bg-slate-700 cursor-pointer font-heading"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
