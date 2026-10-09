import React, { useState } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { CharisLogo } from './CharisLogo';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, openDonateModal }) => {
  const { content } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Identity & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer focus-visible:outline-none"
              title="Charis Foundation Nigeria"
            >
              <CharisLogo theme="dark" height={64} className="h-14 sm:h-16 w-auto transition-opacity group-hover:opacity-90" />
            </button>
            <p className="text-amber-400 text-sm font-medium">
              Grace to Grow; Skills to Thrive
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A registered faith-based non-governmental organization committed to transforming vulnerable lives across Nigeria through need-based sponsorship and institutional partnerships in Education, Technology, Agriculture, and Vocational Trades.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>Registered Incorporated Trustee: <span className="text-slate-300 font-mono">CAC/IT/NO: 189420</span></p>
              <p>SCUML Compliance Ref: <span className="text-slate-300 font-mono">SC/RN/2023/09418</span></p>
            </div>
          </div>

          {/* Column 2: Pillars & Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Sponsored Focus Areas
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('pillars');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Foundational Education & STEM
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('pillars');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Technology & Software Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('pillars');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Climate-Smart Agriculture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('pillars');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Vocational Capacity & Toolkits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('calendar');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left text-amber-400/90 font-medium"
                >
                  Sponsorship Calendar & Intake
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('deck');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left font-medium text-slate-400 hover:text-amber-400"
                >
                  Board Pitch Deck & 3-Yr Plan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left font-medium text-slate-400 hover:text-amber-400 flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>Secretariat Admin Panel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              National Hubs
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-xs">Abuja Headquarters:</strong>
                  {content.settings.hqAddress}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-xs">Agritech Innovation Field:</strong>
                  {content.settings.agriAddress}
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300 font-mono text-xs">{content.settings.phone1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300 text-xs">{content.settings.email}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Accountability (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400">
              Receive quarterly impact bulletins and audited stewardship reports.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Thank you for walking with us.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-md transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <div className="pt-2">
              <button
                onClick={openDonateModal}
                className="w-full py-2 px-3 text-xs font-semibold text-amber-400 border border-amber-500/40 hover:bg-amber-500/10 rounded-md transition-colors text-center"
              >
                Sponsor A Trainee Today
              </button>
            </div>
          </div>
        </div>

        {/* Faith Scripture Banner & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="italic text-slate-400 text-center md:text-left max-w-xl">
            "Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace in its various forms." — 1 Peter 4:10
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span>© {new Date().getFullYear()} Charis Foundation Nigeria. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Governance & Policies
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setCurrentPage('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer text-slate-400"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Staff / Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
