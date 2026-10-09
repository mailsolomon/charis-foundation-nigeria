import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageView } from '../types';
import {
  Calendar,
  Clock,
  Building2,
  PackageCheck,
  Send,
  CheckCircle2,
  FileText,
  Heart,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CalendarPageProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: (pillar?: string) => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({
  setCurrentPage,
  openDonateModal,
}) => {
  const { content, submitNomination } = useApp();

  // Nomination form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLocation, setApplicantLocation] = useState('');
  const [applicantPillar, setApplicantPillar] = useState(content.pillars[0]?.title || 'Technology & Digital Skills Sponsorship');
  const [applicantReason, setApplicantReason] = useState('');
  const [nominatorRelationship, setNominatorRelationship] = useState('Self (Vulnerable Applicant)');
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    setIsSubmitting(true);
    const res = await submitNomination({
      applicantName,
      applicantPhone,
      applicantLocation,
      applicantPillar,
      applicantReason,
      nominatorRelationship,
    });
    setIsSubmitting(false);

    setApplicationRef(res.ref || `CHR-NOM-${Math.floor(10000 + Math.random() * 90000)}`);
    setAppSubmitted(true);
  };

  const resetApplication = () => {
    setApplicantName('');
    setApplicantPhone('');
    setApplicantLocation('');
    setApplicantReason('');
    setAppSubmitted(false);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 space-y-16">
      {/* 1. Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>Intake Schedules & Nomination Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Sponsorship Calendar
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Review upcoming sponsored training cohort dates at accredited partner institutions and nominate vulnerable individuals on a need basis for 100% tuition coverage and starter equipment toolkits.
          </p>
        </div>
      </div>

      {/* 2. Upcoming Cohorts Schedule (Section 1) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            2027 Intake Timeline
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Upcoming Partner Institution Cohorts
          </h2>
          <p className="text-sm text-slate-600">
            All cohorts are fully funded through donor sponsorships. Trainees attend accredited partner centers with 100% tuition, exam fees, and starter kits covered by Charis Foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.cohorts.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-amber-700">{c.quarter}</span>
                <span className="text-emerald-700 font-semibold">{c.slots}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{c.track}</h3>
              <div className="text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.location}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-medium pt-1">
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{c.support}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Vulnerable Candidate Nomination Form (Section 2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <FileText className="w-3.5 h-3.5" />
              <span>Vulnerability Intake & Nomination Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Nominate a Vulnerable Person for Full Sponsorship
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Are you an out-of-school youth, an indigent breadwinner, a widow, or a faith/community leader nominating a needy candidate for institutional training sponsorship? Submit their profile below.
            </p>
          </div>

          <div className="mt-8 max-w-2xl">
            {appSubmitted ? (
              <div className="p-6 bg-slate-800/90 rounded-xl border border-emerald-500/50 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Sponsorship Nomination Successfully Logged!</span>
                </div>
                <p className="text-xs text-slate-300">
                  Thank you. The nomination dossier for <strong className="text-white">{applicantName}</strong> has been assigned tracking code: <span className="font-mono text-amber-400 font-bold">{applicationRef}</span>.
                </p>
                <p className="text-xs text-slate-400">
                  Our vulnerability assessment committee will verify the socioeconomic profile and contact the candidate via phone/WhatsApp ({applicantPhone}) before placement with an accredited partner institution.
                </p>
                <button
                  onClick={resetApplication}
                  className="mt-2 text-xs font-semibold text-amber-400 underline underline-offset-4"
                >
                  Nominate Another Vulnerable Person
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Joshua"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0802 123 4567"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Relationship to Candidate *
                    </label>
                    <select
                      value={nominatorRelationship}
                      onChange={(e) => setNominatorRelationship(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Self (Vulnerable Applicant)">Self (Applicant)</option>
                      <option value="Pastor / Faith Leader">Pastor / Faith Leader</option>
                      <option value="Community Leader">Community Leader</option>
                      <option value="NGO / Social Worker">NGO / Social Worker</option>
                      <option value="Family / Guardian">Family / Guardian</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      State & LGA *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abuja (Bwari) or Kaduna"
                      value={applicantLocation}
                      onChange={(e) => setApplicantLocation(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Requested Track *
                    </label>
                    <select
                      value={applicantPillar}
                      onChange={(e) => setApplicantPillar(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {content.pillars.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Description of Vulnerability & Economic Need *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe why this candidate is vulnerable (e.g. out of school, orphan, indigent widow, displaced, zero household income) and how full sponsorship will transform their life..."
                    value={applicantReason}
                    onChange={(e) => setApplicantReason(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Sponsorship Nomination (Free)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openDonateModal(applicantPillar)}
                    className="flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Want to sponsor a seat in this cohort instead?</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
