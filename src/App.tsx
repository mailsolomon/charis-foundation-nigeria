/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { PitchDeckViewer } from './components/PitchDeckViewer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PillarsPage } from './pages/PillarsPage';
import { CalendarPage } from './pages/CalendarPage';
import { ImpactPage } from './pages/ImpactPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { Megaphone, ArrowRight } from 'lucide-react';

export default function App() {
  const { content } = useApp();
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedDonationPillar, setSelectedDonationPillar] = useState<string | undefined>(undefined);

  const openDonateModal = (pillar?: string) => {
    setSelectedDonationPillar(pillar);
    setIsDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsDonateModalOpen(false);
    setSelectedDonationPillar(undefined);
  };

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // If currently in Admin view, render dedicated admin console
  if (currentPage === 'admin') {
    return <AdminPage setCurrentPage={setCurrentPage} />;
  }

  const announcement = content.announcement;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-amber-500/20 selection:text-amber-900">
      {/* Moderated Live Announcement Banner across top */}
      {announcement?.enabled && (
        <div
          className={`py-2 px-4 sm:px-6 text-xs text-center border-b transition-colors flex items-center justify-center gap-2 flex-wrap ${
            announcement.type === 'urgent'
              ? 'bg-amber-500 text-slate-950 border-amber-600 font-semibold'
              : announcement.type === 'highlight'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-950 font-medium'
              : 'bg-blue-950 text-amber-200 border-blue-900 font-medium'
          }`}
        >
          {announcement.badgeText && (
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                announcement.type === 'urgent'
                  ? 'bg-slate-950 text-amber-400'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
              }`}
            >
              {announcement.badgeText}
            </span>
          )}
          <span>{announcement.message}</span>
          {announcement.linkText && (
            <button
              onClick={() => {
                const target = (announcement.targetPage || 'calendar') as PageView;
                setCurrentPage(target);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 font-bold underline hover:opacity-80 transition-opacity ml-1 cursor-pointer"
            >
              <span>{announcement.linkText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Top Bar adheres to 3-zone contract */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openDonateModal={() => openDonateModal()}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            openDonateModal={openDonateModal}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            setCurrentPage={setCurrentPage}
            openDonateModal={() => openDonateModal()}
          />
        )}

        {currentPage === 'pillars' && (
          <PillarsPage
            setCurrentPage={setCurrentPage}
            openDonateModal={openDonateModal}
          />
        )}

        {currentPage === 'calendar' && (
          <CalendarPage
            setCurrentPage={setCurrentPage}
            openDonateModal={openDonateModal}
          />
        )}

        {currentPage === 'impact' && (
          <ImpactPage
            setCurrentPage={setCurrentPage}
            openDonateModal={() => openDonateModal()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            setCurrentPage={setCurrentPage}
            openDonateModal={() => openDonateModal()}
          />
        )}

        {currentPage === 'deck' && (
          <div className="space-y-0">
            {/* Slide-ready Board Pitch Deck Portal */}
            <PitchDeckViewer />
          </div>
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        openDonateModal={() => openDonateModal()}
      />

      {/* Interactive Paystack / Flutterwave Donation Portal Modal */}
      <DonationModal
        isOpen={isDonateModalOpen}
        onClose={closeDonateModal}
        defaultPillar={selectedDonationPillar}
      />
    </div>
  );
}
