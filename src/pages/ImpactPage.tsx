import React, { useState } from 'react';
import { IMPACT_STORIES } from '../data/mockData';
import { PageView } from '../types';
import {
  FileText,
  Download,
  CheckCircle,
  MapPin,
  TrendingUp,
  HeartHandshake,
  Calendar,
  Sparkles,
  ArrowRight,
  Building2,
  PackageCheck
} from 'lucide-react';

interface ImpactPageProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: () => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({
  setCurrentPage,
  openDonateModal,
}) => {
  const [downloadReportSuccess, setDownloadReportSuccess] = useState(false);

  const handleDownloadReport = () => {
    const reportText = `CHARIS FOUNDATION NIGERIA
ANNUAL IMPACT & STEWARDSHIP REPORT (2025-2026)
"Grace to Grow; Skills to Thrive"
Registration: CAC/IT/NO: 189420 | SCUML Certified: SC/RN/2023/09418

1. EXECUTIVE SUMMARY & MODEL
Charis Foundation Nigeria operates as a lean, catalytic sponsorship foundation for the needy and vulnerable in society. Rather than constructing capital-heavy physical training centers, Charis sponsors vulnerable individuals on a need basis into accredited technical institutions, specialized academies, and government agencies (NDE, ITF, State Technical Colleges).

2. QUANTITATIVE HIGHLIGHTS (2023 - 2026)
- Total Vulnerable Lives Sponsored: 5,720+ beneficiaries
- 100% Need-Based Free Access: Zero tuition barrier for vulnerable participants
- Partner Institutions & Government Hubs: 60+ accredited training centers
- Starter Toolkits & Laptops Funded: 1,490+ certified kits directly awarded
- Direct Sponsorship & Capital Seeded: ₦65,000,000+
- 12-Month Livelihood Retention: 87.4% actively earning an income

3. FIDUCIARY RESOURCE EFFICIENCY
- 88% Direct Program Spend (Institutional Tuition Sponsorships, Laptops, Starter Toolkits, Student Transit Subsidies)
- 8% Field Assessment & Monitoring Logistics
- 4% Statutory Auditing, Governance & SCUML Compliance

4. DOCUMENTED BENEFICIARY JOURNEYS
- Blessing Chukwuka: Sponsored into 6-month software bootcamp + developer laptop grant -> Remote Junior Web Developer (₦350k/month).
- Musa Abdullahi: Sponsored at Kaduna Agricultural Extension Hub + solar drip irrigation kit -> Al-Barakah Agri-Ventures (3 employees).
- Grace Oladipo: Sponsored at NDE Skill Center Lagos + industrial sewing machine grant -> Owner of GraceCraft Apparel.

Published by the Board of Trustees, Charis Foundation Nigeria.`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Charis_Foundation_Annual_Impact_Report_2025_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadReportSuccess(true);
    setTimeout(() => setDownloadReportSuccess(false), 3000);
  };

  const fieldArticles = [
    {
      date: 'September 2026',
      title: 'Charis Sponsors 140 Smallholders through State Agricultural Extension Hub',
      summary: 'Equipped with solar drip kits and drought-resistant seeds post-training, rural smallholders harvested commercial tomato and pepper crops.',
      category: 'Agriculture Partnership'
    },
    {
      date: 'July 2026',
      title: '42 Vulnerable Youths Complete Sponsored 6-Month Tech Bootcamp with Laptops',
      summary: 'Sponsored at an accredited Abuja software academy with laptop grants, fellows presented production web apps and secured freelance contracts.',
      category: 'Technology Fellowship'
    },
    {
      date: 'May 2026',
      title: '65 Widows Complete NDE Apprenticeship with Charis Industrial Sewing Machine Grants',
      summary: 'Graduating mothers sponsored through the National Directorate of Employment received certified industrial sewing machines to launch neighbourhood tailoring shops.',
      category: 'Capacity & NDE Alliance'
    }
  ];

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audited Accountability & Field Results</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Impact Reports & Field Interventions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Measuring the tangible transformation of vulnerable lives through audited fiduciary stewardship, institutional partner outcomes, and verified beneficiary journeys.
          </p>
        </div>
      </div>

      {/* Stewardship Transparency Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Annual Stewardship Dossier
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Download the 2025–2026 Comprehensive Impact & Audit Report
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Contains complete audited figures for institutional tuition disbursements, verified equipment toolkit procurements, partner performance ratings, and socioeconomic beneficiary data.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadReportSuccess ? 'Report Downloaded!' : 'Download Audited Impact Report (PDF/Doc)'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/90 p-5 rounded-xl border border-slate-700 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Fiduciary Resource Allocation
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-200 mb-1">
                    <span>Direct Sponsorships & Toolkits</span>
                    <span className="font-bold text-emerald-400 font-mono">88%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[88%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-200 mb-1">
                    <span>Field Vetting & M&E Logistics</span>
                    <span className="font-bold text-amber-400 font-mono">8%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[8%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-200 mb-1">
                    <span>Audits, Governance & SCUML</span>
                    <span className="font-bold text-blue-400 font-mono">4%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[4%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Testimonials Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Case Studies
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Documented Sponsorship Outcomes
          </h2>
          <p className="text-sm text-slate-600">
            How full institutional tuition sponsorship plus starter equipment unlocks generational independence.
          </p>
        </div>

        <div className="space-y-8">
          {IMPACT_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-4 rounded-xl overflow-hidden bg-slate-900 h-64">
                <img
                  src={story.image}
                  alt={story.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {story.name}, Age {story.age}
                    </h3>
                    <p className="text-xs text-amber-800 font-semibold">{story.track}</p>
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {story.location}
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 rounded-lg text-xs text-blue-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span><strong>Training Partner:</strong> {story.partnerInstitution}</span>
                </div>

                <blockquote className="text-sm sm:text-base italic text-slate-800 border-l-2 border-amber-600 pl-3">
                  "{story.quote}"
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {story.story}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <strong className="text-slate-400 block mb-0.5">Prior Vulnerability:</strong>
                    <span className="text-slate-700">{story.beforeStatus}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <strong className="text-emerald-800 block mb-0.5">Charis Direct Package & Outcome:</strong>
                    <span className="text-emerald-950 font-medium">{story.supportReceived}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field News & Interventions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Field Dispatches
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Recent Institutional Sponsorship Dispatches
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fieldArticles.map((art, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="text-amber-700 font-semibold">{art.category}</span>
                  <span>{art.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-900 flex items-center gap-1 group-hover:text-amber-600">
                  <span>M&E Verified Field Action</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
