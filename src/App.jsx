import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import EventsPage from './components/EventsPage';
import ContactPage from './components/ContactPage';
import AdminDashboard from './components/AdminDashboard';
import RegistrationModal from './components/RegistrationModal';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'events' | 'contact' | 'admin'
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Check URL path/hash on load to allow organizers to access secret admin dashboard at /admin or #admin
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;

      if (path === '/admin' || hash === '#admin' || search.includes('admin=true')) {
        setCurrentView('admin');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.history.pushState(null, '', '#admin');
    } else if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegistration = (eventId = null) => {
    setSelectedEventId(eventId);
    setIsRegistrationOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false);
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-red-600 selection:text-white relative">
      
      {/* Current Page View (Admin Dashboard is ONLY accessible via separate /admin link) */}
      {currentView === 'home' && (
        <HomePage
          onNavigate={handleNavigate}
          onOpenRegistration={handleOpenRegistration}
        />
      )}

      {currentView === 'events' && (
        <EventsPage
          onBack={() => handleNavigate('home')}
          onRegisterEvent={(eventId) => handleOpenRegistration(eventId)}
        />
      )}

      {currentView === 'contact' && (
        <ContactPage
          onBack={() => handleNavigate('home')}
        />
      )}

      {/* Separate Isolated Admin Dashboard */}
      {currentView === 'admin' && (
        <AdminDashboard
          onBack={() => handleNavigate('home')}
        />
      )}

      {/* Registration Modal Overlay */}
      {isRegistrationOpen && (
        <RegistrationModal
          initialEventId={selectedEventId}
          onClose={handleCloseRegistration}
        />
      )}
    </div>
  );
}
