import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Heart, Download, CreditCard, Sparkles, Handshake } from 'lucide-react';
import { CharisLogo } from './CharisLogo';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPillar?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  defaultPillar,
}) => {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentGateway, setPaymentGateway] = useState<'paystack' | 'flutterwave'>('paystack');
  const [allocation, setAllocation] = useState<string>(
    defaultPillar || 'General Sponsorship Fund (Where Most Needed)'
  );
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');

  // Payment flow state
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [transactionRef, setTransactionRef] = useState('');

  if (!isOpen) return null;

  const ngnPresets = [10000, 25000, 50000, 100000, 250000];
  const usdPresets = [25, 50, 100, 250, 500];
  const currentPresets = currency === 'NGN' ? ngnPresets : usdPresets;

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorEmail) return;

    setStep('processing');
    const ref = `CHR-${paymentGateway === 'paystack' ? 'PSTK' : 'FLW'}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;
    setTransactionRef(ref);

    setTimeout(() => {
      setStep('success');
    }, 1800);
  };

  const resetForm = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="mb-2.5">
              <CharisLogo height={52} className="h-12 sm:h-13 w-auto" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sponsor a Vulnerable Life · Charis Foundation</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {step === 'success' ? 'Thank You for Your Generosity' : 'Sponsorship & Direct Support Portal'}
            </h3>
            <p className="text-xs text-slate-500">
              Funding institutional training fees and starter equipment toolkits on a need basis.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step: FORM */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            {/* Currency & Frequency Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Currency</label>
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency('NGN');
                      setSelectedAmount(50000);
                      setCustomAmount('');
                    }}
                    className={`py-1.5 rounded-md transition-all ${
                      currency === 'NGN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    NGN (₦)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency('USD');
                      setSelectedAmount(100);
                      setCustomAmount('');
                    }}
                    className={`py-1.5 rounded-md transition-all ${
                      currency === 'USD' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Frequency</label>
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-1.5 rounded-md transition-all ${
                      frequency === 'one-time' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-1.5 rounded-md transition-all ${
                      frequency === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>

            {/* Amount Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Sponsorship Amount ({currency})
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2.5">
                {currentPresets.map((amt) => {
                  const isSelected = selectedAmount === amt && !customAmount;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handlePresetSelect(amt)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {currency === 'NGN' ? `₦${amt.toLocaleString()}` : `$${amt}`}
                    </button>
                  );
                })}
              </div>
              <input
                type="number"
                placeholder={`Or enter custom amount in ${currency}...`}
                value={customAmount}
                onChange={(e) => handleCustomChange(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Cause Allocation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Direct My Sponsorship Towards:
              </label>
              <select
                value={allocation}
                onChange={(e) => setAllocation(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="General Sponsorship Fund (Where Most Needed)">
                  General Sponsorship Fund (Where Most Needed)
                </option>
                <option value="Technology Fellowships (Bootcamp Fees, Laptop & Data)">
                  Technology Fellowships (Bootcamp Fees, Laptop & Data)
                </option>
                <option value="Climate Agriculture Sponsorship (Ext. Fees, Drip Kits & Seeds)">
                  Climate Agriculture Sponsorship (Ext. Fees, Drip Kits & Seeds)
                </option>
                <option value="Foundational Education & Exam Scholarships (WAEC/JAMB)">
                  Foundational Education & Exam Scholarships (WAEC/JAMB)
                </option>
                <option value="Vocational Capacity Sponsorship (NDE/ITF Tuition & Sewing Machine)">
                  Vocational Capacity Sponsorship (NDE/ITF Tuition & Sewing Machine)
                </option>
              </select>
            </div>

            {/* Donor Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Solomon"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address (For Tax Receipt)
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Optional Prayer note */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Optional Dedication or Prayer Request
              </label>
              <input
                type="text"
                placeholder="Share a word of encouragement or prayer petition..."
                value={prayerRequest}
                onChange={(e) => setPrayerRequest(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Gateway Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Secure Payment Gateway
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentGateway('paystack')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentGateway === 'paystack'
                      ? 'border-blue-700 bg-blue-50/50 ring-1 ring-blue-700'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">Paystack</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Cards, Bank Transfer, USSD</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('flutterwave')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentGateway === 'flutterwave'
                      ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900">Flutterwave</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Cards, Mobile Money, Barter</p>
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>
                  Sponsor Trainee with{' '}
                  {currency === 'NGN'
                    ? `₦${currentAmount.toLocaleString()}`
                    : `$${currentAmount}`}
                </span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted · SCUML & CAC Nigeria Compliant</span>
            </div>
          </form>
        )}

        {/* Step: PROCESSING */}
        {step === 'processing' && (
          <div className="py-14 text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-600 border-t-transparent" />
            <h4 className="text-base font-bold text-slate-900">
              Connecting to {paymentGateway === 'paystack' ? 'Paystack' : 'Flutterwave'} Secure Node...
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Please wait while your donation authorization is verified through the Nigerian Inter-Bank Settlement System (NIBSS).
            </p>
          </div>
        )}

        {/* Step: SUCCESS & RECEIPT */}
        {step === 'success' && (
          <div className="mt-5 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Sponsorship Confirmed with Deep Gratitude!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                "May God supply all your needs according to His riches in glory." Your support will directly pay the institutional fees and starter toolkit for a vulnerable Nigerian brother or sister.
              </p>
            </div>

            {/* Official Digital Acknowledgment Receipt */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Receipt Ref:</span>
                <span className="font-bold text-slate-900">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Donor / Sponsor:</span>
                <span className="text-slate-900">{donorName || 'Generous Friend'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="text-slate-900 font-bold">
                  {currency === 'NGN' ? `₦${currentAmount.toLocaleString()}` : `$${currentAmount}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Allocation:</span>
                <span className="text-slate-900 truncate max-w-[200px]">{allocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Channel:</span>
                <span className="text-slate-900 capitalize">{paymentGateway} Verified</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-400">
                <span>Org: Charis Foundation Nigeria</span>
                <span>CAC/IT/NO: 189420</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save Receipt</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
