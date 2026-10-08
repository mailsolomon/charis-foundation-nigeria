import React from 'react';
import { PageView } from '../types';
import { ArrowRight, Heart, Sparkles, ShieldCheck, Handshake } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface HeroProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentPage, openDonateModal }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Charis Foundation Nigeria sponsoring vulnerable youth training with partner institutions"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-90 contrast-105"
        />
        {/* Measured dark gradient overlay ensuring WCAG AA legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl space-y-6">
          {/* Faith Identity Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Faith-Based NGO · Sponsoring & Partnering for Grassroots Impact</span>
          </div>

          {/* Primary Headline with balanced wrap */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Sponsoring Vulnerable Lives Through Strategic Partnerships, Skills, and Direct Support
          </h1>

          {/* Mission Body Copy */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
            We are a faith-based NGO dedicated to lifting the needy and vulnerable across Nigeria. Instead of running costly in-house academies, <strong className="text-amber-300 font-semibold">we sponsor vulnerable individuals on a need basis</strong> and <strong className="text-amber-300 font-semibold">partner with accredited organizations and government institutions</strong> for high-impact training in <span className="text-amber-300 font-semibold">Education</span>, <span className="text-amber-300 font-semibold">Technology</span>, <span className="text-agriculture-300 text-emerald-300 font-semibold">Agriculture</span>, and <span className="text-amber-300 font-semibold">Vocational Trades</span>—providing complete tuition, living stipends, and starter equipment toolkits.
          </p>

          {/* Action Button Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={openDonateModal}
              className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg shadow-lg shadow-amber-500/25 transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Sponsor A Vulnerable Trainee</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('pillars');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/25 backdrop-blur-sm transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore Sponsored Focus Areas</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentPage('deck');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-3.5 text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors"
            >
              <Handshake className="w-3.5 h-3.5 text-amber-400" />
              <span>Board Pitch Deck: Partnership Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quantitative Proof Strip */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                5,700+
              </p>
              <p className="text-xs text-slate-300 mt-1">Vulnerable Lives Sponsored</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                60+
              </p>
              <p className="text-xs text-slate-300 mt-1">Partner Institutions & Gov Agencies</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                100%
              </p>
              <p className="text-xs text-slate-300 mt-1">Need-Based Free Sponsorship</p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>CAC & SCUML Certified</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Audited Nigerian NGO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
