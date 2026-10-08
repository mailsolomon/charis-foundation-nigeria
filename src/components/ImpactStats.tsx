import React from 'react';
import { ShieldCheck, TrendingUp, Users, Wrench, Handshake } from 'lucide-react';

export const ImpactStats: React.FC = () => {
  const metrics = [
    {
      value: '5,720+',
      label: 'Vulnerable Lives Sponsored',
      subtext: 'Funded across accredited partner centers & hubs',
      icon: <Users className="w-5 h-5 text-amber-500" />
    },
    {
      value: '60+',
      label: 'Institutional & Gov Partners',
      subtext: 'NDE, ITF, technical colleges & tech academies',
      icon: <Handshake className="w-5 h-5 text-blue-400" />
    },
    {
      value: '1,490+',
      label: 'Starter Toolkits & Laptops Funded',
      subtext: 'Direct equipment gifts handed to graduates',
      icon: <Wrench className="w-5 h-5 text-emerald-400" />
    },
    {
      value: '87.4%',
      label: '12-Month Livelihood Rate',
      subtext: 'Active sustainable monthly income generation',
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Verifiable Sponsorship Impact
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Lean Operations, Maximum Beneficiary Reach
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            By avoiding costly brick-and-mortar overhead and partnering with accredited institutions, 88% of every contribution directly funds vulnerable student sponsorships and starter toolkits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/80 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700">
                  {item.icon}
                </span>
                <span className="text-xs font-mono text-slate-400">#0{idx + 1}</span>
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                {item.value}
              </p>
              <h3 className="text-sm font-semibold text-slate-200 mt-2">
                {item.label}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
