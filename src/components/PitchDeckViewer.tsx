import React, { useState } from 'react';
import { PITCH_DECK_SLIDES } from '../data/mockData';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  Presentation,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { CharisLogo } from './CharisLogo';

export const PitchDeckViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const slide = PITCH_DECK_SLIDES[currentSlideIndex];
  const totalSlides = PITCH_DECK_SLIDES.length;

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const downloadPitchDeckSummary = () => {
    let markdownContent = `# CHARIS FOUNDATION NIGERIA\n`;
    markdownContent += `## BOARD OF TRUSTEES STRATEGIC PITCH DECK SUMMARY\n`;
    markdownContent += `Tagline: "Grace to Grow; Skills to Thrive"\n`;
    markdownContent += `Date: October 2026 | Fiduciary Status: CAC/IT/NO: 189420 | SCUML Compliant\n\n`;
    markdownContent += `---\n\n`;

    PITCH_DECK_SLIDES.forEach((s) => {
      markdownContent += `### SLIDE ${s.slideNumber}: ${s.title.toUpperCase()}\n`;
      markdownContent += `*Category: ${s.category} | ${s.subtitle}*\n\n`;
      markdownContent += `**Key Points:**\n`;
      s.content.points.forEach((p) => {
        markdownContent += `- ${p}\n`;
      });
      if (s.content.highlight) {
        markdownContent += `\n**Key Metric:** ${s.content.highlight.title} -> ${s.content.highlight.value} (${s.content.highlight.description})\n`;
      }
      markdownContent += `\n**Board Executive Takeaway:** ${s.boardTakeaway}\n\n`;
      markdownContent += `---\n\n`;
    });

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Charis_Foundation_Nigeria_Board_Pitch_Deck_${new Date().getFullYear()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div
      className={`bg-slate-950 text-slate-100 ${
        isFullscreen ? 'fixed inset-0 z-50 p-4 sm:p-8 flex flex-col justify-between' : 'py-12 sm:py-16'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full space-y-6">
        {/* Presentation Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Presentation className="w-4 h-4 text-amber-400" />
              <span>Board of Trustees Presentation Portal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Strategic Executive Pitch Deck
            </h2>
            <p className="text-xs text-slate-400">
              Interactive slide summary prepared for governance review, program appraisal, and scaling ratification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                showSpeakerNotes
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showSpeakerNotes ? 'Hide Notes' : 'Show Notes'}</span>
            </button>

            <button
              onClick={downloadPitchDeckSummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download Slide Deck'}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* The Slide Canvas */}
        <div className="relative bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Subtle Institutional Watermark Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Top Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3 mb-6">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-amber-400 font-bold">SLIDE {slide.slideNumber} OF {totalSlides}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">{slide.category}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <CharisLogo variant="emblem" height={28} className="h-7 w-auto" />
                <span className="text-slate-200 font-bold">Charis Foundation Nigeria</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Slide Title */}
            <div className="space-y-1 mb-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {slide.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-amber-400">
                {slide.subtitle}
              </p>
            </div>

            {/* Slide Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Main Content (8 cols) */}
              <div className={`space-y-3 ${slide.content.highlight ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {slide.content.heading}
                </h4>
                <ul className="space-y-2.5">
                  {slide.content.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional Table */}
                {slide.content.tableData && (
                  <div className="pt-4 overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
                      <thead className="bg-slate-800/90 text-amber-300 uppercase tracking-wider font-semibold">
                        <tr>
                          {slide.content.tableData.headers.map((h, i) => (
                            <th key={i} className="p-2.5">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                        {slide.content.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-800/50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Highlight Callout Box (4 cols) */}
              {slide.content.highlight && (
                <div className="lg:col-span-4 bg-slate-800/80 p-5 rounded-xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{slide.content.highlight.title}</span>
                  </div>
                  <p className="text-3xl font-extrabold text-white font-mono tabular-nums">
                    {slide.content.highlight.value}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {slide.content.highlight.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Slide Footer / Speaker Note */}
          <div className="mt-8 pt-4 border-t border-slate-800">
            {showSpeakerNotes && (
              <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-600/30 text-xs text-amber-200/90">
                <span className="font-bold text-amber-400 block mb-0.5">
                  Board of Trustees Executive Takeaway:
                </span>
                {slide.boardTakeaway}
              </div>
            )}
          </div>
        </div>

        {/* Carousel Stepper Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Thumb dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {PITCH_DECK_SLIDES.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
                title={s.title}
              >
                0{s.slideNumber}
              </button>
            ))}
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Slide</span>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
