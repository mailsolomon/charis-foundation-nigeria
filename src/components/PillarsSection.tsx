import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PillarId, PageView, PillarDetail } from '../types';
import { PILLARS_DATA } from '../data/mockData';
import { BookOpen, Laptop, Sprout, Award, CheckCircle2, ArrowRight, Heart, Building2, PackageCheck } from 'lucide-react';

interface PillarsSectionProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: () => void;
  onApplyClick?: (pillar: string) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({
  setCurrentPage,
  openDonateModal,
  onApplyClick,
}) => {
  const { content } = useApp();
  const [selectedPillarId, setSelectedPillarId] = useState<PillarId>('education');
  const pillarsList: PillarDetail[] = content?.pillars?.length ? content.pillars : PILLARS_DATA;
  const activePillar: PillarDetail = pillarsList.find((p: PillarDetail) => p.id === selectedPillarId) || pillarsList[0];

  const getIcon = (id: PillarId) => {
    switch (id) {
      case 'education':
        return <BookOpen className="w-4 h-4" />;
      case 'technology':
        return <Laptop className="w-4 h-4" />;
      case 'agriculture':
        return <Sprout className="w-4 h-4" />;
      case 'capacity':
        return <Award className="w-4 h-4" />;
    }
  };

  return (
    <section id="pillars" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Sponsored Focus Areas & Institutional Tracks
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Partnering with Accredited Institutions to Empower the Vulnerable
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Charis Foundation sponsors vulnerable individuals on a need basis, partnering with established technical institutions, tech academies, and government agencies to deliver accredited skill acquisition.
          </p>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap p-1.5 bg-slate-200/80 rounded-xl gap-1.5 max-w-full">
            {content.pillars.map((pillar) => {
              const isSelected = pillar.id === selectedPillarId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span className={isSelected ? 'text-amber-600' : 'text-slate-500'}>
                    {getIcon(pillar.id)}
                  </span>
                  <span>{pillar.title.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Pillar Presentation Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-slate-900">
              <img
                src={activePillar.image}
                alt={activePillar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                  Target Demographic in Society
                </span>
                <p className="text-xs font-medium text-slate-200 leading-relaxed">
                  {activePillar.targetAudience}
                </p>
              </div>
            </div>

            {/* Content Column (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
                  <span>Track 0{Math.max(0, pillarsList.findIndex((p) => p.id === activePillar.id)) + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>Institutional Sponsorship Model</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {activePillar.title}
                </h3>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {activePillar.fullDescription}
                </p>
              </div>

              {/* Key Quantitative Proofs */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100">
                {activePillar.keyStats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Two-Column Grid: Partner Institutions & Charis Wrap-around Support */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Partner Institutions */}
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

                {/* Charis Direct Support */}
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

              {/* Expected Outcome */}
              <div className="p-3.5 bg-amber-50/70 rounded-lg border border-amber-200/60 text-xs text-amber-950">
                <strong className="block font-semibold mb-1 text-amber-900">
                  Livelihood & Livelihood Outcome:
                </strong>
                {activePillar.outcome}
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    if (onApplyClick) {
                      onApplyClick(activePillar.title);
                    } else {
                      setCurrentPage('pillars');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <span>Nominate a Vulnerable Candidate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={openDonateModal}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white/20" />
                  <span>Sponsor a Trainee in this Track</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
