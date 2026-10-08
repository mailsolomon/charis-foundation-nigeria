import React, { useState } from 'react';
import { PageView } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Heart,
  Send,
  CheckCircle2,
  Sparkles,
  Users,
  Handshake,
  Building2
} from 'lucide-react';

interface ContactPageProps {
  setCurrentPage: (page: PageView) => void;
  openDonateModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  setCurrentPage,
  openDonateModal,
}) => {
  const [formType, setFormType] = useState<'partner' | 'nominate' | 'volunteer' | 'prayer'>('partner');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orgName, setOrgName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && (email || phone)) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setOrgName('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Handshake className="w-3.5 h-3.5" />
            <span>Institutional Alliances & Community Intake</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Partner with Charis Foundation
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Are you an accredited vocational institution, government agency, or tech hub seeking to train sponsored cohorts? Or an organization nominating vulnerable candidates for support? Connect with us below.
          </p>
        </div>
      </div>

      {/* Main Grid: Hubs info + Interactive Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: National Hubs & Contact details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900">National Secretariat & Coordination</h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Abuja National Secretariat:</strong>
                    <span className="text-slate-600">
                      Plot 418, Diplomatic Zone, Central Business District, Abuja FCT, Nigeria
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Kaduna Agricultural Liaison Office:</strong>
                    <span className="text-slate-600">
                      KM 14, Kaduna-Zaria Expressway, Igabi LGA, Kaduna State
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Lagos Institutional Liaison Desk:</strong>
                    <span className="text-slate-600">
                      12 Commercial Avenue, Yaba, Lagos State
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>+234 (0) 803 456 7890 / +234 (0) 812 987 6543</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>partnerships@charisfoundation.ng / info@charisfoundation.ng</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WhatsApp Desk: +234 803 456 7890</span>
                </div>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-900 space-y-2">
                <strong className="font-semibold block">Institutional Office Hours:</strong>
                <p>Monday – Friday: 8:30 AM – 5:00 PM (WAT)</p>
                <p>Secretariat Assessment Desk: Open for partner vetting & MOU reviews</p>
              </div>
            </div>

            {/* Quick Sponsorship Callout */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-white">Directly Sponsor a Vulnerable Trainee</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your donation directly pays tuition at accredited centers and supplies certified starter toolkits.
              </p>
              <button
                onClick={openDonateModal}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>Open Secure Sponsorship Portal</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Engagement Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Send an Inquiry or Partnership Request</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select your category and our partnerships desk will follow up promptly.
              </p>
            </div>

            {/* Form Type Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFormType('partner')}
                className={`py-2 rounded-lg transition-all text-center ${
                  formType === 'partner' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Training Partner MOU
              </button>
              <button
                type="button"
                onClick={() => setFormType('nominate')}
                className={`py-2 rounded-lg transition-all text-center ${
                  formType === 'nominate' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Nominate Need
              </button>
              <button
                type="button"
                onClick={() => setFormType('volunteer')}
                className={`py-2 rounded-lg transition-all text-center ${
                  formType === 'volunteer' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Volunteer / Mentor
              </button>
              <button
                type="button"
                onClick={() => setFormType('prayer')}
                className={`py-2 rounded-lg transition-all text-center ${
                  formType === 'prayer' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Prayer Desk
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3 bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Message Received in Good Faith!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-800">{name}</strong>. Your {formType} inquiry has been logged with our secretariat. A representative will contact you via {email || phone}.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-3 text-xs font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Tunde Adeleke"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +234 803 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {formType === 'partner'
                        ? 'Institution / Training Center Name'
                        : formType === 'nominate'
                        ? 'Referring Organization / Church'
                        : formType === 'volunteer'
                        ? 'Area of Expertise'
                        : 'Prayer Category'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        formType === 'partner'
                          ? 'e.g. Apex Technical Institute, NDE Hub'
                          : formType === 'nominate'
                          ? 'e.g. St. James Community Outreach'
                          : formType === 'volunteer'
                          ? 'e.g. Agronomist, Software Engineer'
                          : 'e.g. Family, Provision, Health'
                      }
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {formType === 'partner'
                      ? 'Partnership Proposal / Available Training Capacities *'
                      : formType === 'nominate'
                      ? 'Details of Vulnerable Candidates Requiring Sponsorship *'
                      : formType === 'prayer'
                      ? 'Your Confidential Prayer Request *'
                      : 'Message or Volunteer Availability *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      formType === 'partner'
                        ? 'Describe your accredited training programs, state location, certification standards, and how Charis can sponsor cohorts into your institution...'
                        : formType === 'nominate'
                        ? 'Briefly describe the candidate(s), their socioeconomic hardship, and which training track they need sponsorship for...'
                        : formType === 'prayer'
                        ? 'Share your petition. Our pastoral intercessory team lifts every request in prayer...'
                        : 'Share your background and how you would like to volunteer or mentor sponsored trainees...'
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {formType === 'partner'
                      ? 'Submit Institutional Training Partnership Proposal'
                      : formType === 'nominate'
                      ? 'Submit Candidate Sponsorship Nomination'
                      : formType === 'prayer'
                      ? 'Submit Confidential Prayer Request'
                      : 'Submit Volunteer Application'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
