import React from 'react';
import { PageView } from '../types';
import { Heart, ArrowRight, ShieldCheck, Sparkles, Handshake, Smile, CheckCircle2, Quote } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface HomePageProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: (pillar?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  openDonateModal,
}) => {
  return (
    <div className="space-y-0 bg-white">
      {/* 1. Minimal Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-24 sm:py-32">
        {/* Serene background image with measured dark scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="Charis Foundation Nigeria empowerment and sponsorship"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-75 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Charis Foundation Nigeria · Grace to Grow; Skills to Thrive</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
            Transforming Vulnerable Lives Through Faith, Compassion, and Sponsoring Opportunity
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
            A faith-based charitable initiative dedicated to uplifting orphans, widows, and the less privileged across Nigeria. We believe every individual deserves the chance to thrive, regardless of their circumstances.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <button
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Learn About What We Do</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openDonateModal()}
              className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/25 backdrop-blur-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span>Sponsor a Vulnerable Trainee</span>
            </button>
          </div>

          {/* Minimal proof markers */}
          <div className="pt-8 border-t border-white/15 flex flex-wrap items-center justify-center sm:justify-start gap-8 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-amber-400">5,720+</span>
              <span>Lives Reached</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-emerald-400">100%</span>
              <span>Free to Beneficiaries</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>CAC & SCUML Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quiet Faith & Compassion Manifesto Statement */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <Smile className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Putting Smiles on the Faces of the Needy and Vulnerable
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            "We believe that every individual deserves the chance to thrive, regardless of their circumstances. Our heart is to create a positive and lasting impact on the lives of orphans, widows, and the less privileged by addressing their immediate needs and empowering them with educational and vocational opportunities."
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
            >
              <span>Read Our Full Story & Operational Model in About Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Minimal 3-Point Overview (Understated, pointing to About Us) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Our Core Approach
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              A Lean, Dignified Model of Compassion
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Need-Based Sponsorship</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Identifying vulnerable orphans, widows, and youth and providing 100% financial sponsorship so lack of funds never blocks learning.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Institutional Alliances</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Partnering with accredited vocational centers, tech academies, and government agencies to deliver recognized, certified training.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Starter Toolkits & Support</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Equipping graduates with the physical tools of their trade—laptops, sewing machines, solar kits, and seeds—to achieve true independence.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <span>Explore Detailed Program Pillars on the About Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Single Restrained Beneficiary Voice */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Quote className="w-10 h-10 text-amber-500/40 mx-auto" />
          <blockquote className="text-lg sm:text-xl italic text-slate-800 font-medium leading-relaxed">
            "Charis Foundation did not just pay my entire vocational tuition; they gave me an industrial sewing machine and the love of God to start again as a widowed mother. Today, my three children are back in school."
          </blockquote>
          <div className="text-xs text-slate-500">
            <strong className="text-slate-800 block text-sm font-semibold">Grace Oladipo</strong>
            Widow & Beneficiary of Charis Vocational Capacity Sponsorship
          </div>
        </div>
      </section>

      {/* 5. Minimal Call to Action */}
      <section className="py-20 bg-slate-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Join Our Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Together, We Can Bring Joy, Hope, and Opportunity
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            We invite you to join us on this journey to create a brighter future for those in need. Your sponsorship directly changes the trajectory of a vulnerable life.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openDonateModal()}
              className="px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer whitespace-nowrap"
            >
              Sponsor a Vulnerable Trainee
            </button>

            <button
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Learn More in About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
