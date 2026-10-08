import React from 'react';
import { Search, Handshake, Wrench, CheckCircle } from 'lucide-react';

export const ThreeStepModel: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Identify & Vet Need',
      subtitle: '100% Need-Based Vulnerability Assessment',
      icon: <Search className="w-6 h-6 text-blue-600" />,
      description:
        'We penetrate underserved peri-urban communities, rural farm belts, and IDP settlements. Working through faith councils and grassroots community leaders, we identify individuals with high socioeconomic vulnerability and genuine dedication.',
      deliverables: [
        '100% need-based verification',
        'Holistic family vulnerability assessment',
        'Zero patronage; pure merit & hardship intake'
      ],
      tag: 'Need-Based Selection'
    },
    {
      step: '02',
      title: 'Sponsor & Partner',
      subtitle: 'Accredited Institutional Skill Acquisition',
      icon: <Handshake className="w-6 h-6 text-emerald-600" />,
      description:
        'Rather than building redundant academies, Charis enrolls vetted beneficiaries into accredited government programs (NDE, ITF), specialized software bootcamps, and technical institutes. We pay 100% tuition plus daily commuter and meal stipends.',
      deliverables: [
        'Full tuition sponsorship at partner centers',
        'Daily commuter & nutritional feeding subsidies',
        'Certified curricula taught by accredited instructors'
      ],
      tag: 'Institutional Alliances'
    },
    {
      step: '03',
      title: 'Equip, Fund & Support',
      subtitle: 'Starter Toolkits & Livelihood Launch',
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      description:
        'Training without tools leaves graduates stranded. Charis purchases and awards certified starter toolkits (developer laptops, industrial sewing machines, solar PV technician kits, greenhouse seed packages) and pairs graduates with 12 months of mentorship.',
      deliverables: [
        'Graduation equipment toolkit grants',
        'Micro-seed funding for workshop setup',
        '12-month post-training livelihood monitoring'
      ],
      tag: '87.4% Livelihood Rate'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Our Sustainable Sponsorship Pipeline
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            The 3-Step Charis Partnership & Sponsorship Model
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Maximizing donor impact by partnering with accredited institutions and providing complete wrap-around support to the most vulnerable in society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between hover:border-slate-300 transition-colors relative"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-slate-300">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="text-xs font-medium text-amber-700">
                    {item.tag}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 space-y-2">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Key Deliverables
                </p>
                {item.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
