import React from 'react';
import { HeartHandshake, Shield, Sparkles, BookOpenCheck, Handshake, Users } from 'lucide-react';

export const FaithSnapshot: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-amber-50/60 border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Faith Identity Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Our Theological & Humanitarian Foundation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Rooted in Grace, Sponsoring Potential, Collaborating for Good
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                The word <strong className="text-amber-900 font-semibold">Charis (χάρις)</strong> is ancient Greek for <span className="italic font-medium">grace</span>—unconditional favor and divine enablement that meets people at their point of deepest vulnerability.
              </p>
              <p>
                Our faith conviction is clear: vulnerable people in Nigeria do not lack capability or divine gifts; they lack financial access and institutional opportunity. Rather than duplicating existing training infrastructure, <strong className="text-slate-900">Charis operates as a catalytic sponsor</strong>. We identify those who cannot afford training and fund their entry into accredited government and private institutions, providing the transport stipends, tools, and mentors they need to succeed.
              </p>
              <p className="text-xs text-slate-600 bg-white/80 p-3.5 rounded-lg border border-amber-200/70 italic">
                "Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace in its various forms." — 1 Peter 4:10
              </p>
            </div>

            {/* Radical Inclusion Note */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-amber-200 shadow-xs">
              <BookOpenCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700">
                <strong className="text-slate-900 block font-semibold">Need-Based Compassion & Radical Inclusion</strong>
                Motivated by the love of Christ, our sponsorship is awarded strictly on a need basis to the most vulnerable individuals in society—welcoming youths, widows, and persons with disabilities across all communities regardless of ethnic background or creed.
              </div>
            </div>
          </div>

          {/* Right Column: 4 Cornerstones (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Charis (Sponsoring Grace)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paying 100% of enrollment fees for indigent candidates who otherwise have no chance to learn a productive skill.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800">
                <Handshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Strategic Alliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Partnering with NDE, ITF, technical colleges, and tech bootcamps to deliver certified training without bureaucratic waste.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Holistic Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Providing daily transport stipends, meal allowances, and professional starter toolkits (laptops, sewing machines, seed packs).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Fiduciary Stewardship</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full transparency, SCUML compliance, and independent audits. 88% of every donation directly funds student sponsorships and toolkits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
