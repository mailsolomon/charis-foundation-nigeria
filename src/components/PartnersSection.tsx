import React from 'react';
import { PARTNER_LOGOS } from '../data/mockData';
import { Building2, Handshake } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Handshake className="w-3.5 h-3.5 text-amber-600" />
            <span>Government & Accredited Training Collaborations</span>
          </div>
          <p className="text-xs text-slate-400">
            Sponsoring vulnerable youths through established government agencies and accredited institutional partners
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNER_LOGOS.map((partner, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col items-center justify-center text-center hover:bg-white hover:border-slate-300 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 mb-2 group-hover:text-amber-600 transition-colors">
                <Building2 className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                {partner.name}
              </p>
              <span className="text-[10px] text-slate-500 mt-0.5">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
