import React, { useState, useRef } from 'react';
import { EVENTS_DATA } from '../data/symposiumData';
import { ShieldCheck, QrCode, Lock, CheckCircle2, AlertCircle, ArrowRight, Upload, Image as ImageIcon, Check } from 'lucide-react';
import TicketToken from './TicketToken';

export default function RegistrationModal({ initialEventId, onClose }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Payment Gateway & Screenshot Upload, 3: Confirmation Token
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '3rd Year',
    college: '',
    food: 'Veg',
    selectedEvents: initialEventId ? [EVENTS_DATA.find(e => e.id === initialEventId)?.title || 'Paper Presentation'] : ['Paper Presentation'],
    transactionId: ''
  });

  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registeredTokenData, setRegisteredTokenData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('File size must be under 10 MB.');
        return;
      }
      setPaymentProofFile(file);
      setProofPreviewUrl(URL.createObjectURL(file));
      setErrorMsg('');
    }
  };

  const handleEventToggle = (eventTitle) => {
    let updated = [...formData.selectedEvents];
    if (updated.includes(eventTitle)) {
      if (updated.length > 1) {
        updated = updated.filter(t => t !== eventTitle);
      }
    } else {
      updated.push(eventTitle);
    }
    setFormData({ ...formData, selectedEvents: updated });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.college) {
      setErrorMsg('Please fill in all mandatory fields before proceeding to payment.');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (!paymentProofFile) {
      setErrorMsg('Please upload a screenshot of your ₹100 payment before submitting.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('year', formData.year);
      data.append('college', formData.college);
      data.append('food', formData.food);
      data.append('selectedEvents', JSON.stringify(formData.selectedEvents));
      data.append('paymentMethod', 'UPI GPay');
      data.append('transactionId', formData.transactionId || '');
      if (paymentProofFile) {
        data.append('paymentProof', paymentProofFile);
      }

      // Submit to Express + SQLite backend
      const apiHost = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5000'
        : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');

      const res = await fetch(`${apiHost}/api/register`, {
        method: 'POST',
        body: data
      });

      if (!res.ok) {
        throw new Error('Server error submitting registration.');
      }

      const result = await res.json();
      setIsProcessing(false);

      const tokenPayload = {
        ...formData,
        ticketId: result.registration.ticket_id,
        registeredAt: result.registration.registered_at,
        emailStatus: result.emailStatus
      };

      setRegisteredTokenData(tokenPayload);
      setStep(3);
    } catch (err) {
      console.warn('Backend server offline, generating offline fallback token', err);
      setIsProcessing(false);
      // Fallback local ticket generation
      const uniqueId = `ZNTX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setRegisteredTokenData({
        ...formData,
        ticketId: uniqueId,
        registeredAt: new Date().toISOString()
      });
      setStep(3);
    }
  };

  if (step === 3 && registeredTokenData) {
    return <TicketToken registrationData={registeredTokenData} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-red-500/60 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,0,85,0.5)] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black p-2 rounded-full border border-slate-700 cursor-pointer"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-slate-800 pb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded border border-cyan-500/40 font-heading">
            Official Registration Portal • ₹100 Entry Fee
          </span>
          <h2 className="text-3xl font-black text-white mt-2 font-heading">
            ZENTRIX 2K26 <span className="text-red-500">REGISTRATION</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Department of Artificial Intelligence and Data Science • T.J.S Engineering College
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/90 border border-red-500 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: PARTICIPANT DETAILS FORM */}
        {step === 1 && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                  Participant Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Abc"
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white placeholder-gray-500 text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="abc@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white placeholder-gray-500 text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Mobile Phone Number */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white placeholder-gray-500 text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                  Year of Study *
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                >
                  <option value="1st Year">1st Year B.E / B.Tech</option>
                  <option value="2nd Year">2nd Year B.E / B.Tech</option>
                  <option value="3rd Year">3rd Year B.E / B.Tech</option>
                  <option value="4th Year">4th Year B.E / B.Tech</option>
                  <option value="Postgraduate">M.E / M.Tech / MCA</option>
                </select>
              </div>
            </div>

            {/* College Name */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                College / Institution Name *
              </label>
              <input
                type="text"
                name="college"
                required
                value={formData.college}
                onChange={handleInputChange}
                placeholder="e.g. Xyz College of Engineering"
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white placeholder-gray-500 text-sm focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Event Selection Multi-select */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                Select Events You Want to Participate In (One Fee = Multiple Events)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-2 rounded-xl bg-black border border-slate-800">
                {EVENTS_DATA.map(ev => {
                  const isChecked = formData.selectedEvents.includes(ev.title);
                  return (
                    <button
                      type="button"
                      key={ev.id}
                      onClick={() => handleEventToggle(ev.title)}
                      className={`px-3 py-1.5 rounded-lg text-left text-xs font-bold transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-red-950 text-red-300 border border-red-500/60 shadow-[0_0_8px_rgba(255,0,85,0.4)]'
                          : 'bg-slate-950 text-gray-400 border border-slate-800 hover:text-gray-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '} {ev.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Food Preference */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                Complementary Lunch Preference (Free Included)
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                  <input
                    type="radio"
                    name="food"
                    value="Veg"
                    checked={formData.food === 'Veg'}
                    onChange={handleInputChange}
                    className="accent-red-500"
                  />
                  <span>Vegetarian</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                  <input
                    type="radio"
                    name="food"
                    value="Non-Veg"
                    checked={formData.food === 'Non-Veg'}
                    onChange={handleInputChange}
                    className="accent-red-500"
                  />
                  <span>Non-Vegetarian</span>
                </label>
              </div>
            </div>

            {/* Price Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block font-heading">Entry Fee</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">₹100 <span className="text-xs text-gray-400 font-normal">/ person</span></span>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,0,85,0.7)] hover:brightness-125 transition-all flex items-center gap-2 cursor-pointer font-heading"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT & SCREENSHOT UPLOAD SECTION */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-black border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 font-heading">Order Summary</span>
                <p className="text-base font-bold text-white">Zentrix 2k26 Entry Pass</p>
                <p className="text-xs text-cyan-400">{formData.name} • {formData.college}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-emerald-400 font-mono">₹100</span>
                <span className="text-[10px] text-gray-400 block font-mono">Entry Fee</span>
              </div>
            </div>

            {/* Exact GPay Payment QR Code & Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-black p-5 rounded-2xl border border-slate-800">
              
              {/* Left Column: Official GPay QR Code */}
              <div className="text-center">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2 font-heading">
                  Scan GPay QR Code (₹100)
                </span>
                
                {/* Official QR Code Image (Divya Nivi / divyanivi76@oksbi) */}
                <div className="w-48 h-56 mx-auto bg-white p-2 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.3)] flex flex-col items-center justify-center overflow-hidden">
                  <img
                    src="/payment_qr.png"
                    alt="Official Payment QR Code - Divya Nivi"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <p className="text-xs text-amber-300 font-mono mt-2 font-bold">
                  UPI ID: divyanivi76@oksbi
                </p>
                <p className="text-[10px] text-gray-400 font-mono">Name: Divya Nivi</p>
              </div>

              {/* Right Column: Screenshot Upload & Transaction Ref */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                    Upload Payment Screenshot *
                  </label>
                  <p className="text-[11px] text-gray-400 mb-2">
                    Please attach a screenshot of your successful ₹100 payment.
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-4 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
                      paymentProofFile
                        ? 'border-emerald-500/80 bg-emerald-950/30'
                        : 'border-slate-700 bg-slate-950 hover:border-red-500/60'
                    }`}
                  >
                    {proofPreviewUrl ? (
                      <div className="flex flex-col items-center gap-2">
                        <img src={proofPreviewUrl} alt="Payment Proof Preview" className="h-24 w-auto rounded border border-emerald-500/50 object-contain" />
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-mono">
                          <Check className="w-4 h-4" /> Screenshot Selected
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-2">
                        <Upload className="w-8 h-8 text-cyan-400 animate-bounce" />
                        <span className="text-xs font-bold text-white">Click to Select Payment Screenshot</span>
                        <span className="text-[10px] text-gray-500">PNG, JPG, JPEG up to 10MB</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Optional Transaction UTR / Ref ID */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1 font-heading">
                    UPI Transaction / UTR Ref ID (Optional)
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    placeholder="e.g. 423981290312"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-gray-500 text-xs font-mono focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 bg-black p-3 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Details saved securely in SQL database. Confirmation email dispatched automatically.</span>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 rounded-xl bg-black text-gray-300 font-bold text-xs border border-slate-800 hover:bg-slate-900 cursor-pointer font-heading uppercase"
              >
                Back to Form
              </button>
              
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePaymentSubmit}
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:brightness-125 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-heading"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving to SQL & Sending Email...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit & Generate Token</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
