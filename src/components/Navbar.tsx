import React, { useState } from 'react';
import { PageView } from '../types';
import { Menu, X, Heart, Presentation, ShieldCheck } from 'lucide-react';
import { CharisLogo } from './CharisLogo';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  openDonateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  openDonateModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Focus Areas', page: 'pillars' },
    { label: 'Sponsorship Calendar', page: 'calendar' },
    { label: 'Impact & Stories', page: 'impact' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[84px] sm:min-h-[92px] lg:min-h-[98px] py-2">
          {/* Zone 1: Official Brand Logo replacing name holder */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1 -ml-1 transition-all"
            title="Charis Foundation Nigeria"
          >
            <CharisLogo
              height={74}
              className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </button>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-sm font-medium transition-colors cursor-pointer relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded ${
                    isActive
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('admin')}
              title="Charis Secretariat Admin Panel"
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                currentPage === 'admin'
                  ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => handleNavClick('deck')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                currentPage === 'deck'
                  ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Presentation className="w-3.5 h-3.5 text-amber-500" />
              <span>Pitch Deck</span>
            </button>

            <button
              onClick={openDonateModal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>Donate</span>
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openDonateModal}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 rounded-md sm:hidden"
            >
              Donate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <CharisLogo height={48} className="h-12 w-auto" />
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
              Official Portal
            </span>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                currentPage === link.page
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-md bg-slate-900 text-amber-400 hover:bg-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Secretariat Admin Panel</span>
            </button>
            <button
              onClick={() => handleNavClick('deck')}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-md border border-slate-300 text-slate-800 hover:bg-slate-50"
            >
              <Presentation className="w-4 h-4 text-amber-600" />
              <span>Board Pitch Deck Presentation</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDonateModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-sm"
            >
              <Heart className="w-4 h-4" />
              <span>Give / Support A Trainee</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
