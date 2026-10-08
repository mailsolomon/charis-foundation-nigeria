import React, { useState } from 'react';
import { IMPACT_STORIES } from '../data/mockData';
import { ImpactStory } from '../types';
import { Quote, MapPin, X, ArrowUpRight, Building2, PackageCheck } from 'lucide-react';

export const StoriesSection: React.FC = () => {
  const [activeStoryModal, setActiveStoryModal] = useState<ImpactStory | null>(null);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Sponsorship in Action
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Documented Beneficiary Breakthroughs
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Real testimonies of vulnerable individuals sponsored into accredited partner institutions and equipped with the tools to work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {IMPACT_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 bg-slate-900">
                  <img
                    src={story.image}
                    alt={story.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-amber-300">{story.track}</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {story.location.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-blue-700 font-medium">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{story.partnerInstitution}</span>
                  </div>

                  <div className="flex items-start gap-2 text-slate-800">
                    <Quote className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm italic font-medium leading-relaxed text-slate-800">
                      "{story.quote}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
                    <div>
                      <span className="text-slate-400 block">Prior Vulnerability:</span>
                      <span className="text-slate-600">{story.beforeStatus}</span>
                    </div>
                    <div>
                      <span className="text-emerald-700 font-semibold block">Charis Direct Support:</span>
                      <span className="text-slate-900 font-medium">{story.supportReceived}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveStoryModal(story)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Read {story.name}'s Full Journey</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Detail Modal */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-amber-700">
                  {activeStoryModal.track}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {activeStoryModal.name}, {activeStoryModal.age}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {activeStoryModal.location}
                </p>
              </div>
              <button
                onClick={() => setActiveStoryModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/70 flex items-center gap-2 text-xs text-blue-900">
              <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
              <span><strong>Partner Institution:</strong> {activeStoryModal.partnerInstitution}</span>
            </div>

            <div className="relative h-56 rounded-xl overflow-hidden bg-slate-900">
              <img
                src={activeStoryModal.image}
                alt={activeStoryModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <blockquote className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-sm italic text-amber-950">
              "{activeStoryModal.quote}"
            </blockquote>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>{activeStoryModal.story}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block font-medium">Prior Circumstance</span>
                <span className="text-slate-700 mt-0.5 block">{activeStoryModal.beforeStatus}</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-emerald-800 block font-semibold">Charis Sponsorship & Kit</span>
                <span className="text-emerald-950 mt-0.5 block font-medium">{activeStoryModal.supportReceived}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveStoryModal(null)}
                className="px-5 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
