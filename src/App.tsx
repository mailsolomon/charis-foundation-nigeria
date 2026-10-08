/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView } from './types';
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

export default function App() {
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-amber-500/20 selection:text-amber-900">
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
