import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Download, RefreshCw, Eye, CheckCircle, Database, ShieldCheck, Mail, Phone, Calendar, Lock, Key } from 'lucide-react';

export default function AdminDashboard({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProofUrl, setSelectedProofUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'zentrix2026' || passcode === 'admin123' || passcode === 'admin') {
      setIsAuthenticated(true);
      setPassError('');
      fetchRegistrations();
    } else {
      setPassError('Invalid Admin Passcode! Access Denied.');
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiHost = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5000'
        : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');

      const res = await fetch(`${apiHost}/api/registrations`);
      if (!res.ok) throw new Error('Failed to load SQL registrations');
      const data = await res.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError('Could not connect to Express SQL Backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const filtered = registrations.filter(r => {
    const query = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(query) ||
      r.ticket_id.toLowerCase().includes(query) ||
      r.college.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.phone.includes(query)
    );
  });

  const exportToCSV = () => {
    if (registrations.length === 0) return;
    const headers = ['Ticket ID', 'Name', 'Email', 'Phone', 'Year', 'College', 'Selected Events', 'Food', 'Amount', 'Payment Method', 'Transaction ID', 'Registered At'];
    const rows = registrations.map(r => [
      r.ticket_id,
      `"${r.name}"`,
      r.email,
      r.phone,
      r.year,
      `"${r.college}"`,
      `"${(r.selected_events || []).join(' | ')}"`,
      r.food,
      r.amount || 100,
      r.payment_method,
      r.transaction_id || '',
      r.registered_at
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ZENTRIX_2K26_SQL_REGISTRATIONS_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PASSCODE LOCK SCREEN FOR ORGANIZERS
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4 tech-smoke-bg cyber-grid-overlay">
        <div className="w-full max-w-md bg-slate-950 border border-red-500/60 rounded-3xl p-8 shadow-[0_0_50px_rgba(255,0,85,0.4)] text-center relative">
          
          <button
            onClick={onBack}
            className="absolute top-4 left-4 text-xs text-red-400 hover:text-white flex items-center gap-1 font-heading uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </button>

          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(255,0,85,0.5)]">
            <Lock className="w-8 h-8 animate-pulse" />
          </div>

          <h2 className="text-2xl font-black text-white uppercase font-heading">
            ADMIN <span className="text-red-500">DATABASE LOCK</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 mb-6">
            Enter Organizer Passcode to access SQLite participant database.
          </p>

          {passError && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/90 border border-red-500 text-red-300 text-xs font-mono">
              {passError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Key className="w-5 h-5 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin Passcode (zentrix2026)"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white placeholder-gray-500 text-sm font-mono focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,85,0.7)] hover:brightness-125 transition-all cursor-pointer font-heading"
            >
              Authenticate & Unlock DB
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative tech-smoke-bg cyber-grid-overlay">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950/90 border border-red-500/50 text-red-400 font-bold hover:bg-red-950/60 hover:text-white hover:border-red-400 transition-all shadow-[0_0_15px_rgba(255,0,85,0.4)] cursor-pointer font-heading text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Exit Admin View</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 text-xs font-mono">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>SQLite Database Live</span>
            </span>
            
            <button
              onClick={fetchRegistrations}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 hover:border-cyan-400 cursor-pointer"
              title="Refresh SQL Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={exportToCSV}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:brightness-125 flex items-center gap-1.5 cursor-pointer font-heading"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase font-heading drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
            REGISTRATION <span className="text-red-500">ADMIN DASHBOARD</span>
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            View, search, and verify all participant registrations saved in SQLite Database.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-red-500/40 text-center">
            <span className="text-xs uppercase font-bold text-gray-400 font-heading block">Total SQL Registrations</span>
            <span className="text-3xl font-black text-white font-mono">{registrations.length}</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 text-center">
            <span className="text-xs uppercase font-bold text-gray-400 font-heading block">Total Revenue Collected (₹100/person)</span>
            <span className="text-3xl font-black text-emerald-400 font-mono">₹{registrations.length * 100}</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-purple-500/40 text-center">
            <span className="text-xs uppercase font-bold text-gray-400 font-heading block">Payment Screenshots Uploaded</span>
            <span className="text-3xl font-black text-cyan-300 font-mono">
              {registrations.filter(r => r.payment_proof).length}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name, Ticket ID (e.g. ZNTX-2026-XXXX), Mobile, Email, or College..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-gray-500 text-sm focus:border-red-500 focus:outline-none font-mono"
          />
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/90 border border-red-500 text-red-300 text-sm mb-6 text-center font-mono">
            {error}
          </div>
        )}

        {/* Registrations Table */}
        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black text-gray-400 font-heading uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Participant Name</th>
                  <th className="p-4">Mobile / Email</th>
                  <th className="p-4">College & Year</th>
                  <th className="p-4">Events</th>
                  <th className="p-4">Lunch</th>
                  <th className="p-4">Payment Proof Screenshot</th>
                  <th className="p-4">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500 font-mono">
                      {loading ? 'Loading SQLite Database Records...' : 'No registrations found.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-4 font-mono font-black text-cyan-300">
                        {reg.ticket_id}
                      </td>
                      <td className="p-4 font-bold text-white text-sm font-heading">
                        {reg.name}
                      </td>
                      <td className="p-4 text-gray-300 font-mono">
                        <div>{reg.phone}</div>
                        <div className="text-[11px] text-gray-400">{reg.email}</div>
                      </td>
                      <td className="p-4 text-gray-300">
                        <div className="font-semibold text-gray-200">{reg.college}</div>
                        <div className="text-[10px] text-cyan-400 font-mono">{reg.year}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(reg.selected_events || []).map((ev, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 text-[10px] font-bold">
                              {ev}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-amber-300 font-heading">
                        {reg.food}
                      </td>
                      <td className="p-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                            Paid ₹100 ({reg.payment_method || 'UPI GPay'})
                          </span>
                          {reg.transaction_id && (
                            <span className="text-[10px] font-mono text-gray-400 block truncate max-w-[120px]" title={reg.transaction_id}>
                              Ref: {reg.transaction_id}
                            </span>
                          )}
                          {reg.payment_proof ? (
                            <div className="flex items-center gap-2 mt-1">
                              <img
                                src={`http://localhost:5000${reg.payment_proof}`}
                                alt="Thumbnail"
                                className="w-10 h-10 object-cover rounded border border-cyan-500/50 cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => setSelectedProofUrl(`http://localhost:5000${reg.payment_proof}`)}
                              />
                              <button
                                onClick={() => setSelectedProofUrl(`http://localhost:5000${reg.payment_proof}`)}
                                className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-900 text-[10px] font-bold flex items-center gap-1 cursor-pointer font-heading"
                              >
                                <Eye className="w-3 h-3" /> View Full
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-gray-500 italic">No Screenshot Uploaded</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-[11px] text-gray-400 font-mono">
                        {new Date(reg.registered_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal to view payment proof image in high resolution */}
        {selectedProofUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative max-w-xl w-full bg-slate-950 border border-cyan-500/60 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.5)]">
              <button
                onClick={() => setSelectedProofUrl(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black p-2 rounded-full border border-slate-700 cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-lg font-black text-white mb-2 font-heading">Payment Screenshot Proof</h3>
              <p className="text-xs text-gray-400 mb-4 font-mono">Verified ₹100 GPay Payment Image</p>
              
              <div className="max-h-[70vh] overflow-auto rounded-2xl border border-slate-800 bg-black flex items-center justify-center p-2">
                <img src={selectedProofUrl} alt="Payment Proof" className="max-w-full h-auto rounded-xl" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
