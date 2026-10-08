import React, { useState } from 'react';
import { PILLARS_DATA } from '../data/mockData';
import { PillarId, PageView } from '../types';
import {
  BookOpen,
  Laptop,
  Sprout,
  Award,
  CheckCircle2,
  Calendar,
  Heart,
  Sparkles,
  Building2,
  PackageCheck,
  Handshake,
  ArrowRight
} from 'lucide-react';

interface PillarsPageProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: (pillar?: string) => void;
}

export const PillarsPage: React.FC<PillarsPageProps> = ({
  setCurrentPage,
  openDonateModal,
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<PillarId>('education');
  const activePillar = PILLARS_DATA.find((p) => p.id === selectedPillarId) || PILLARS_DATA[0];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Handshake className="w-3.5 h-3.5" />
            <span>Need-Based Sponsorship & Institutional Alliances</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our 4 Sponsored Focus Areas
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Charis Foundation Nigeria partners with accredited technical institutions, specialized bootcamps, and government agencies to sponsor vulnerable individuals on a need basis—covering 100% of enrollment fees and providing complete graduation equipment toolkits.
          </p>
        </div>
      </div>

      {/* Pillar Selection Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {PILLARS_DATA.map((pillar) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-amber-600 shadow-md ring-1 ring-amber-600'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isSelected ? 'text-amber-700' : 'text-slate-400'
                  }`}>
                    {pillar.id}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {pillar.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Showcase View */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[380px] bg-slate-900">
              <img
                src={activePillar.image}
                alt={activePillar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Target Demographic in Society
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activePillar.targetAudience}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Institutional Sponsorship Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                  {activePillar.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  {activePillar.fullDescription}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100">
                {activePillar.keyStats.map((st, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                      {st.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{st.label}</p>
                  </div>
                ))}
              </div>

              {/* Two Column: Institutional Partners & Charis Direct Support */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Partner Training Institutions</span>
                  </div>
                  <div className="space-y-1.5">
                    {activePillar.partnerInstitutions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
                    <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Charis Sponsorship Package</span>
                  </div>
                  <div className="space-y-1.5">
                    {activePillar.supportProvided.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Livelihood Guarantee */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/60 text-xs text-emerald-950 space-y-1">
                <strong className="block font-semibold text-emerald-900">
                  Graduation Outcome & Independent Livelihood:
                </strong>
                <p className="text-emerald-900/90 leading-relaxed">
                  {activePillar.outcome}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openDonateModal(activePillar.title)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white/20" />
                  <span>Sponsor a Vulnerable Trainee in {activePillar.title.split('&')[0].trim()}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Link to the Dedicated Sponsorship Calendar Menu Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Sponsorship Calendar & Intake Portal</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to View Upcoming Cohorts or Nominate a Candidate?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore our full 2027 partner training intake timeline, check available sponsored slots across Nigeria, and submit need-based candidate nominations on our dedicated Sponsorship Calendar menu.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('calendar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-lg shadow-amber-500/20"
          >
            <span>View Sponsorship Calendar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
