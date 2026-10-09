import React from 'react';
import { useApp } from '../context/AppContext';
import { PageView } from '../types';
import {
  ShieldCheck,
  Heart,
  Sparkles,
  UserCheck,
  CheckCircle2,
  Handshake,
  Building2,
  PackageCheck,
  Smile,
  BookOpen,
  Laptop,
  Sprout,
  Award,
  Users,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: (pillar?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setCurrentPage,
  openDonateModal,
}) => {
  const { content } = useApp();

  return (
    <div className="py-12 sm:py-20 bg-white space-y-20">
      {/* 1. Header & Identity */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Charis Foundation Nigeria</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Grace to Grow; Skills to Thrive
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          A faith-based charitable initiative dedicated to restoring dignity and bringing lasting joy and opportunity to orphans, widows, and the less privileged across Nigeria.
        </p>
      </div>

      {/* 2. Foundation Manifesto (Adopted from the reference structure for Charis's mission) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-8 sm:p-14 space-y-8 shadow-xs">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Our Heart, Vision & Commitment
              </h2>
              <p className="text-xs text-slate-500">
                Serving the most vulnerable members of society with compassion and market-relevant capability
              </p>
            </div>
          </div>

          {/* Narrative paragraphs directly echoing the requested manifesto structure */}
          <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed">
            <p>
              <strong className="text-slate-900 font-semibold">Charis Foundation Nigeria</strong> is a faith-based charitable organization dedicated to improving the lives of vulnerable communities in Nigeria. Our primary focus is on sponsoring and partnering with established organizations, specialized academies, and government institutions on a need basis to provide vital skill acquisition, training, and capacity building in <strong className="text-slate-900">Education, Technology, Agriculture, and Vocational Trades</strong> to orphans, widows, out-of-school youths, and the less privileged.
            </p>

            <p>
              We believe that <strong className="text-slate-900 font-semibold">every individual deserves the chance to thrive, regardless of their circumstances</strong>. Our vision is to create a positive and lasting impact on the lives of the most vulnerable members of society by addressing their immediate lack of opportunity and empowering them with educational and vocational capabilities. By doing so, we aspire to see more frequent smiles and restored human dignity on the faces of those we serve.
            </p>

            <p>
              Our mission is to bring hope, self-reliance, and smiles to the faces of as many orphans, widows, and less privileged individuals as possible. We aim to achieve this by establishing a sustainable support system, relying on the generosity of faithful donors and sponsors, and collaborating closely with accredited training partners. Through regular, impactful, and need-based interventions, we seek to make each day meaningful for our beneficiaries—providing 100% tuition sponsorship, daily transit stipends, and essential starter toolkits that contribute to a brighter and self-sufficient future.
            </p>

            <p className="text-base text-slate-600 bg-white p-6 rounded-2xl border border-slate-200/80 italic">
              At Charis Foundation Nigeria, we are committed to making a difference one life, one family, and one smile at a time. We invite you to join us on this journey to create a brighter future for those in need. Together, we can bring joy, hope, and real economic opportunities to the lives of orphans, widows, and the less privileged in Nigeria.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Detailed "What We Do" Revelation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Handshake className="w-4 h-4" />
            <span>Detailed Operational Revelation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            What We Do: Sponsoring, Partnering & Supporting
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Because we believe in maximum stewardship of resources, we do not spend millions constructing duplicate classrooms. Instead, we channel donor funds directly into our 3-part operational model:
          </p>
        </div>

        {/* 3 Core Operational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Need-Based Sponsorship</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We identify orphans, widows, and indigent individuals through community and church outreaches. We pay 100% of their enrollment, exam, and certification fees so financial poverty is never an obstacle.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Zero tuition charged to beneficiaries</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Need-based vetting with zero patronage</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">Institutional Partnerships</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We forge formal agreements with government agencies (NDE, ITF) and accredited vocational/tech institutes to deliver certified, high-standard training programs with recognized credentials.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>National Directorate of Employment (NDE)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Industrial Training Fund (ITF) & Tech Academies</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">Wrap-Around Support & Toolkits</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Training alone is not enough if a trainee is hungry or has no tools upon graduation. Charis provides daily transport stipends and purchases industrial starter equipment for every graduate.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Laptops, sewing machines & solar toolkits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>12-month post-training livelihood follow-up</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. The 4 Focus Areas in Full Detail */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Our 4 Core Sponsorship Tracks
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How We Support in Education, Tech, Agriculture & Capacity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {pillar.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {pillar.keyStats[0].value} {pillar.keyStats[0].label}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.fullDescription}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-xs font-semibold text-slate-800 block">
                    Charis Sponsorship Package:
                  </span>
                  {pillar.supportProvided.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Target: {pillar.targetAudience.split(',')[0]}
                </span>
                <button
                  onClick={() => openDonateModal(pillar.title)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  Sponsor This Track →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Target Beneficiaries: Orphans, Widows & The Less Privileged */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Who We Serve
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Reaching the Most Vulnerable Members of Society
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Charis Foundation exists specifically for those whom conventional economic systems overlook. Our need-based intake prioritizes:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
              <h3 className="text-base font-bold text-amber-400">Orphans & Out-of-School Children</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Children and adolescents who have lost parents or been forced out of school. We sponsor their remedial education, WAEC/JAMB exam fees, and textbooks.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
              <h3 className="text-base font-bold text-emerald-400">Widows & Indigent Single Mothers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bereaved women with young dependents. We sponsor them through NDE vocational tailoring or agro-processing and gift them industrial machines.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
              <h3 className="text-base font-bold text-blue-400">Less Privileged & IDP Youths</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unemployed young people trapped in hawking or displacement. We sponsor them through software engineering or climate-smart greenhouse farming.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Board of Trustees & Governance */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Fiduciary Governance & Leadership
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Board of Trustees & Oversight
          </h2>
          <p className="text-sm text-slate-600">
            Governed by trusted Nigerian professionals committed to strict transparency, direct beneficiary verification, and gold-standard accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.boardMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <UserCheck className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-amber-700">{member.role}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Focus: {member.focus}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Registration & Statutory Integrity */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Statutory Compliance & Fiduciary Stewardship</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 border-l-2 border-emerald-600 pl-4">
              <h3 className="text-sm font-bold text-slate-900">CAC Incorporated Trustee</h3>
              <p className="text-xs text-slate-600">
                Registered under Part F of CAMA, Federal Republic of Nigeria (CAC/IT/NO: 189420).
              </p>
            </div>

            <div className="space-y-1.5 border-l-2 border-amber-600 pl-4">
              <h3 className="text-sm font-bold text-slate-900">SCUML Certified</h3>
              <p className="text-xs text-slate-600">
                Special Control Unit Against Money Laundering certified (SC/RN/2023/09418).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
