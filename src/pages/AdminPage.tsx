import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageView } from '../types';
import { CandidateNomination, CohortItem, BoardMember } from '../types/admin';
import { ImpactStory, PillarDetail } from '../types';
import { CharisLogo } from '../components/CharisLogo';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Settings,
  Users,
  Calendar,
  Heart,
  TrendingUp,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Sparkles,
  Search,
  ExternalLink,
  DollarSign,
  Download,
  Eye,
  Megaphone,
  Briefcase,
  X,
  Phone,
  MapPin,
  CheckCircle2,
  Building2,
  Layers,
  Award
} from 'lucide-react';

interface AdminPageProps {
  setCurrentPage: (page: PageView) => void;
}

type AdminTab =
  | 'overview'
  | 'nominations'
  | 'cohorts'
  | 'site-control'
  | 'stories'
  | 'pillars'
  | 'board'
  | 'donations';

export const AdminPage: React.FC<AdminPageProps> = ({ setCurrentPage }) => {
  const {
    content,
    isAdmin,
    adminUser,
    loginAdmin,
    logoutAdmin,
    updateSettings,
    updateAnnouncement,
    updatePillar,
    addCohort,
    updateCohort,
    deleteCohort,
    updateNominationStatus,
    deleteNomination,
    addStory,
    updateStory,
    deleteStory,
    updateBoardMember,
    addBoardMember,
    deleteBoardMember,
    resetToDefaults,
    refreshData,
  } = useApp();

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('charis2026');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Nominations moderation state
  const [nominationFilter, setNominationFilter] = useState<'all' | CandidateNomination['status']>('all');
  const [nominationSearch, setNominationSearch] = useState('');
  const [selectedNomination, setSelectedNomination] = useState<CandidateNomination | null>(null);
  const [evaluatorNotes, setEvaluatorNotes] = useState('');
  const [assignedPartner, setAssignedPartner] = useState('');

  // Cohort creation/editing modal
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const [editingCohortId, setEditingCohortId] = useState<string | null>(null);
  const [cohortForm, setCohortForm] = useState<Omit<CohortItem, 'id'>>({
    quarter: '',
    track: '',
    dates: '',
    location: '',
    support: '',
    slots: '',
    status: 'open',
  });

  // Story creation/editing modal
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyForm, setStoryForm] = useState<Omit<ImpactStory, 'id'>>({
    name: '',
    age: 24,
    location: '',
    track: '',
    partnerInstitution: '',
    quote: '',
    story: '',
    beforeStatus: '',
    currentStatus: '',
    supportReceived: '',
    image: '',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(content.settings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Announcement banner form state
  const [bannerForm, setBannerForm] = useState(
    content.announcement || {
      enabled: true,
      message: 'Intake Open: 2027 Sponsorship Cohorts in Tech, Agritech & Vocational Skills are now accepting nominations.',
      badgeText: 'Live Intake',
      linkText: 'View Sponsorship Calendar →',
      targetPage: 'calendar',
      type: 'info' as const,
    }
  );
  const [bannerSavedToast, setBannerSavedToast] = useState(false);

  // Board editing state
  const [editingBoardIdx, setEditingBoardIdx] = useState<number | null>(null);
  const [boardForm, setBoardForm] = useState<BoardMember>({
    name: '',
    role: '',
    bio: '',
    focus: '',
  });

  // Reset confirmation modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    const res = await loginAdmin(username, password);
    setIsLoggingIn(false);
    if (!res.success) {
      setLoginError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  // Cohort handlers
  const handleOpenCohortModal = (cohort?: CohortItem) => {
    if (cohort) {
      setEditingCohortId(cohort.id);
      setCohortForm({
        quarter: cohort.quarter,
        track: cohort.track,
        dates: cohort.dates,
        location: cohort.location,
        support: cohort.support,
        slots: cohort.slots,
        status: cohort.status,
      });
    } else {
      setEditingCohortId(null);
      setCohortForm({
        quarter: `Sponsored Cohort ${content.cohorts.length + 19} (2027)`,
        track: 'Technology & Web Engineering',
        dates: 'Jul 01 – Dec 15, 2027',
        location: 'Partner Software Hub / NDE Center',
        support: '100% Tuition + Starter Toolkits + Daily Stipends',
        slots: '50 Sponsored Seats',
        status: 'open',
      });
    }
    setIsCohortModalOpen(true);
  };

  const handleSaveCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCohortId) {
      await updateCohort(editingCohortId, cohortForm);
      showToast('Cohort updated successfully');
    } else {
      await addCohort(cohortForm);
      showToast('New sponsorship cohort launched on frontend');
    }
    setIsCohortModalOpen(false);
  };

  const handleDeleteCohort = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this cohort from the public calendar?')) {
      await deleteCohort(id);
      showToast('Cohort removed');
    }
  };

  // Nomination review handlers
  const handleOpenNominationReview = (nom: CandidateNomination) => {
    setSelectedNomination(nom);
    setEvaluatorNotes(nom.reviewerNotes || '');
    setAssignedPartner(nom.assignedPartner || '');
  };

  const handleSaveNominationStatus = async (status: CandidateNomination['status']) => {
    if (!selectedNomination) return;
    await updateNominationStatus(selectedNomination.id, status, evaluatorNotes, assignedPartner);
    setSelectedNomination({
      ...selectedNomination,
      status,
      reviewerNotes: evaluatorNotes,
      assignedPartner,
    });
    showToast(`Application status updated to "${status.toUpperCase()}"`);
  };

  const handleDeleteNomination = async (id: string) => {
    if (window.confirm('Delete this applicant nomination record?')) {
      await deleteNomination(id);
      if (selectedNomination?.id === id) {
        setSelectedNomination(null);
      }
      showToast('Nomination deleted');
    }
  };

  // Story handlers
  const handleOpenStoryModal = (story?: ImpactStory) => {
    if (story) {
      setEditingStoryId(story.id);
      setStoryForm({
        name: story.name,
        age: story.age,
        location: story.location,
        track: story.track,
        partnerInstitution: story.partnerInstitution,
        quote: story.quote,
        story: story.story,
        beforeStatus: story.beforeStatus,
        currentStatus: story.currentStatus,
        supportReceived: story.supportReceived,
        image: story.image,
      });
    } else {
      setEditingStoryId(null);
      setStoryForm({
        name: '',
        age: 22,
        location: 'Abuja FCT',
        track: 'Technology & Web Engineering',
        partnerInstitution: 'Sponsored at DevBridge Academy (Abuja Hub Partner)',
        quote: '',
        story: '',
        beforeStatus: 'Out-of-school youth with zero income',
        currentStatus: 'Certified graduate & actively earning',
        supportReceived: '100% Tuition Sponsorship & Starter Toolkit Grant',
        image: '/src/assets/images/charis_tech_education_hub_1791295669365.jpg',
      });
    }
    setIsStoryModalOpen(true);
  };

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStoryId) {
      await updateStory(editingStoryId, storyForm);
      showToast('Impact testimony updated');
    } else {
      await addStory(storyForm);
      showToast('New beneficiary story published to frontend');
    }
    setIsStoryModalOpen(false);
  };

  const handleDeleteStory = async (id: string) => {
    if (window.confirm('Delete this impact story?')) {
      await deleteStory(id);
      showToast('Story removed');
    }
  };

  // Board handlers
  const handleSaveBoardMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBoardIdx !== null) {
      await updateBoardMember(editingBoardIdx, boardForm);
      showToast('Trustee profile updated');
      setEditingBoardIdx(null);
    } else {
      await addBoardMember(boardForm);
      showToast('New Trustee added');
      setEditingBoardIdx(null);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
    showToast('Site settings updated across entire frontend');
  };

  // Save Banner
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAnnouncement(bannerForm);
    setBannerSavedToast(true);
    setTimeout(() => setBannerSavedToast(false), 3000);
    showToast('Live announcement banner updated');
  };

  // Reset handler
  const handleReset = async () => {
    await resetToDefaults();
    setIsResetConfirmOpen(false);
    setSettingsForm(content.settings);
    showToast('Backend and frontend reset to audited defaults');
  };

  // Export Donations CSV
  const handleExportDonationsCSV = () => {
    const headers = ['Ref', 'Donor Name', 'Donor Email', 'Amount', 'Currency', 'Allocation', 'Gateway', 'Frequency', 'Date'];
    const rows = content.donations.map((d) => [
      d.ref,
      `"${d.donorName}"`,
      d.donorEmail,
      d.amount,
      d.currency,
      `"${d.allocation}"`,
      d.gateway,
      d.frequency,
      d.date,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `charis_donations_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Unauthenticated screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-slate-800/90 backdrop-blur border border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-3">
              <CharisLogo theme="dark" height={80} className="h-20 sm:h-22 w-auto drop-shadow-md" />
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Secretariat Governance Backend
            </h1>
            <p className="text-xs text-slate-400">
              Administrative Control & Frontend Moderation Portal
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Administrator Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-mono"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Master Governance Key / Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-mono"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Access Control Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-400 space-y-1.5">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Demo Secretariat Credentials:</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Username: <strong className="text-amber-400">admin</strong></span>
              <span>Password: <strong className="text-amber-400">charis2026</strong></span>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter nominations
  const nominationsList = content.nominations || [];
  const donationsList = content.donations || [];
  const cohortsList = content.cohorts || [];

  const filteredNominations = nominationsList.filter((nom) => {
    if (nominationFilter !== 'all' && nom.status !== nominationFilter) return false;
    if (nominationSearch) {
      const q = nominationSearch.toLowerCase();
      return (
        nom.applicantName.toLowerCase().includes(q) ||
        nom.applicantLocation.toLowerCase().includes(q) ||
        nom.applicantPillar.toLowerCase().includes(q) ||
        nom.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate totals
  const totalDonatedNGN = donationsList
    .filter((d) => (d.currency || 'NGN') === 'NGN')
    .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  const pendingNomCount = nominationsList.filter((n) => n.status === 'pending').length;
  const approvedNomCount = nominationsList.filter((n) => n.status === 'approved' || n.status === 'placed').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Toast notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <CharisLogo variant="emblem" height={44} className="h-11 w-auto" />
              <div>
                <span className="font-bold text-sm tracking-tight text-white block">
                  Charis Secretariat Backend
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Express API & Data Sync Active
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{adminUser?.name || 'Charis Secretariat Lead'}</span>
                <span className="text-slate-500">({adminUser?.role || 'Super Admin'})</span>
              </div>

              <button
                onClick={() => {
                  refreshData();
                  showToast('Re-synced with backend storage');
                }}
                title="Force Re-sync with Express Backend"
                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sync</span>
              </button>

              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-slate-700"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>View Live Site</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-1 py-1 text-xs whitespace-nowrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Overview & Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('nominations')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 relative ${
                activeTab === 'nominations'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Intake Moderation</span>
              {pendingNomCount > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingNomCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('cohorts')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'cohorts'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Sponsorship Cohorts</span>
            </button>

            <button
              onClick={() => setActiveTab('site-control')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'site-control'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Live Site & Banner</span>
            </button>

            <button
              onClick={() => setActiveTab('stories')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'stories'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Impact Stories</span>
            </button>

            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'pillars'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Focus Pillars</span>
            </button>

            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'board'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Board of Trustees</span>
            </button>

            <button
              onClick={() => setActiveTab('donations')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'donations'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Donations Ledger</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & ANALYTICS                                    */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Pending Intake Vetting</span>
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900">
                  {pendingNomCount}
                </div>
                <p className="text-[11px] text-slate-500">
                  {nominationsList.length} total intake nominations received
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Approved / Placed</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-700">
                  {approvedNomCount}
                </div>
                <p className="text-[11px] text-slate-500">
                  Assigned into accredited partner hubs & NDE
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Active Cohorts</span>
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900">
                  {cohortsList.length}
                </div>
                <p className="text-[11px] text-slate-500">
                  Live on public Sponsorship Calendar
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Total Seeded Ledger</span>
                  <DollarSign className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">
                  ₦{(totalDonatedNGN / 1000).toLocaleString()}k
                </div>
                <p className="text-[11px] text-slate-500">
                  {donationsList.length} audited Paystack & Flutterwave gifts
                </p>
              </div>
            </div>

            {/* Quick Actions & Live Announcement Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-slate-900">
                      Live Top Announcement Banner Status
                    </h3>
                    <p className="text-xs text-slate-500">
                      Instantly broadcasts alerts or urgent intake notices across the public website header
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('site-control')}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800"
                  >
                    Edit Banner →
                  </button>
                </div>

                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  content.announcement?.enabled
                    ? 'bg-amber-50/70 border-amber-200/80 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  <Megaphone className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        content.announcement?.enabled
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {content.announcement?.enabled ? 'Active On Frontend' : 'Disabled (Hidden)'}
                      </span>
                      {content.announcement?.badgeText && (
                        <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded-full font-mono">
                          {content.announcement.badgeText}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium leading-relaxed">
                      {content.announcement?.message || 'No announcement message set'}
                    </p>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('nominations')}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Review Pending Nominations ({pendingNomCount})</span>
                  </button>
                  <button
                    onClick={() => handleOpenCohortModal()}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Launch New Cohort</span>
                  </button>
                  <button
                    onClick={() => handleOpenStoryModal()}
                    className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Impact Testimony</span>
                  </button>
                </div>
              </div>

              {/* Fiduciary Compliance & System Status */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400">
                    Statutory & Fiduciary Seal
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Compliance Status
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center justify-between py-2 border-b border-slate-800">
                    <span>CAC Registration:</span>
                    <strong className="text-white font-mono">{content.settings.cacNumber}</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800">
                    <span>SCUML Certification:</span>
                    <strong className="text-white font-mono">{content.settings.scumlNumber}</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800">
                    <span>Direct Program Ratio:</span>
                    <strong className="text-emerald-400 font-mono">{content.settings.programSpendRatio}</strong>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Backend Storage:</span>
                    <strong className="text-emerald-400 font-mono">data/site_content.json (Live)</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsResetConfirmOpen(true)}
                    className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Restore Audited Official Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CANDIDATE NOMINATIONS & INTAKE MODERATION               */}
        {/* ============================================================== */}
        {activeTab === 'nominations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Vulnerability Intake Applications
                </h2>
                <p className="text-xs text-slate-500">
                  Review, vet, approve, and place nominated orphans, widows, and needy candidates into partner institutions
                </p>
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {(['all', 'pending', 'vetted', 'approved', 'placed', 'ineligible'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setNominationFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[11px] transition-colors cursor-pointer ${
                      nominationFilter === st
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates by name, location corridor, track, or reference ID..."
                value={nominationSearch}
                onChange={(e) => setNominationSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              />
            </div>

            {/* Nominations List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNominations.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500 space-y-2">
                  <Users className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="text-sm font-semibold">No candidate nominations found matching filter</p>
                  <p className="text-xs">Candidates submitted on the Sponsorship Calendar page will automatically appear here</p>
                </div>
              ) : (
                filteredNominations.map((nom) => {
                  const statusColors: Record<CandidateNomination['status'], string> = {
                    pending: 'bg-amber-100 text-amber-800 border-amber-300',
                    vetted: 'bg-blue-100 text-blue-800 border-blue-300',
                    approved: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    placed: 'bg-purple-100 text-purple-800 border-purple-300',
                    ineligible: 'bg-rose-100 text-rose-800 border-rose-300',
                  };

                  return (
                    <div
                      key={nom.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-500">
                              {nom.id}
                            </span>
                            <h3 className="text-base font-bold text-slate-900">
                              {nom.applicantName}
                            </h3>
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                              statusColors[nom.status] || 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {nom.status}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{nom.applicantLocation}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-mono">{nom.applicantPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <strong className="text-slate-800">{nom.applicantPillar}</strong>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl line-clamp-3 italic">
                          "{nom.applicantReason}"
                        </p>

                        <div className="text-[11px] text-slate-500 flex items-center justify-between">
                          <span>Nominator: {nom.nominatorRelationship}</span>
                          <span className="font-mono text-[10px]">
                            {new Date(nom.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {nom.assignedPartner && (
                          <div className="text-[11px] bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                            <strong>Partner:</strong> {nom.assignedPartner}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleOpenNominationReview(nom)}
                          className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                        >
                          Review & Assign
                        </button>
                        <button
                          onClick={() => handleDeleteNomination(nom.id)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          title="Delete nomination"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Nomination Review Modal / Drawer */}
            {selectedNomination && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-700">
                        {selectedNomination.id}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        {selectedNomination.applicantName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Nomination Intake Evaluation & Verification
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedNomination(null)}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-500 block">Phone / Contact:</span>
                        <strong className="text-slate-900 font-mono text-sm">
                          {selectedNomination.applicantPhone}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Location Corridor:</span>
                        <strong className="text-slate-900">{selectedNomination.applicantLocation}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Requested Track:</span>
                        <strong className="text-slate-900">{selectedNomination.applicantPillar}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Nominator Relationship:</span>
                        <strong className="text-slate-900">{selectedNomination.nominatorRelationship}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 block mb-1">
                        Vulnerability Situation & Background Need:
                      </span>
                      <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed text-xs">
                        {selectedNomination.applicantReason}
                      </p>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Assigned Partner Institution / Academy:
                      </label>
                      <input
                        type="text"
                        value={assignedPartner}
                        onChange={(e) => setAssignedPartner(e.target.value)}
                        placeholder="e.g. NITDA Digital Hub / DevBridge, NDE Skills Center Lagos, SUBEB"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Field Evaluator / Reviewer Notes:
                      </label>
                      <textarea
                        rows={3}
                        value={evaluatorNotes}
                        onChange={(e) => setEvaluatorNotes(e.target.value)}
                        placeholder="Notes from home inspection, church reference, aptitude test, or interview..."
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <span className="text-xs font-semibold text-slate-600 block">
                      Change Application Status:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleSaveNominationStatus('vetted')}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Mark Vetted
                      </button>
                      <button
                        onClick={() => handleSaveNominationStatus('approved')}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Approve for Sponsorship
                      </button>
                      <button
                        onClick={() => handleSaveNominationStatus('placed')}
                        className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Mark Placed with Partner
                      </button>
                      <button
                        onClick={() => handleSaveNominationStatus('pending')}
                        className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Revert to Pending
                      </button>
                      <button
                        onClick={() => handleSaveNominationStatus('ineligible')}
                        className="px-3.5 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Mark Ineligible
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SPONSORSHIP COHORTS CONTROL                              */}
        {/* ============================================================== */}
        {activeTab === 'cohorts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Sponsorship Cohorts & Intake Calendar
                </h2>
                <p className="text-xs text-slate-500">
                  Manage the official cohorts displayed on the public Sponsorship Calendar & intake portal
                </p>
              </div>

              <button
                onClick={() => handleOpenCohortModal()}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm shadow-amber-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Sponsorship Cohort</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.cohorts.map((cohort) => (
                <div
                  key={cohort.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        {cohort.quarter}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          cohort.status === 'open'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : cohort.status === 'filling'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {cohort.status === 'open' ? 'Intake Open' : cohort.status === 'filling' ? 'Filling Fast' : 'Intake Closed'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{cohort.track}</h3>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div><strong>Dates:</strong> {cohort.dates}</div>
                      <div><strong>Location:</strong> {cohort.location}</div>
                      <div><strong>Support Package:</strong> {cohort.support}</div>
                      <div><strong>Seats:</strong> {cohort.slots}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenCohortModal(cohort)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCohort(cohort.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cohort Form Modal */}
            {isCohortModalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">
                      {editingCohortId ? 'Edit Cohort' : 'New Sponsorship Cohort'}
                    </h3>
                    <button
                      onClick={() => setIsCohortModalOpen(false)}
                      className="p-1.5 text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCohort} className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Quarter & Label</label>
                      <input
                        type="text"
                        required
                        value={cohortForm.quarter}
                        onChange={(e) => setCohortForm({ ...cohortForm, quarter: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="e.g. Sponsored Cohort 23 (Q3 2027)"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Track Name</label>
                      <input
                        type="text"
                        required
                        value={cohortForm.track}
                        onChange={(e) => setCohortForm({ ...cohortForm, track: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="e.g. Technology & Web Engineering"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Dates</label>
                        <input
                          type="text"
                          required
                          value={cohortForm.dates}
                          onChange={(e) => setCohortForm({ ...cohortForm, dates: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                          placeholder="Jul 10 – Dec 15, 2027"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Slots / Seats</label>
                        <input
                          type="text"
                          required
                          value={cohortForm.slots}
                          onChange={(e) => setCohortForm({ ...cohortForm, slots: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                          placeholder="50 Sponsored Seats"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Partner Hub / Location</label>
                      <input
                        type="text"
                        required
                        value={cohortForm.location}
                        onChange={(e) => setCohortForm({ ...cohortForm, location: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="Partner Software Academies (Abuja & Lagos)"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Support Package</label>
                      <input
                        type="text"
                        required
                        value={cohortForm.support}
                        onChange={(e) => setCohortForm({ ...cohortForm, support: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                        placeholder="100% Tuition + Laptop Grant + Data Stipends"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Status</label>
                      <select
                        value={cohortForm.status}
                        onChange={(e) => setCohortForm({ ...cohortForm, status: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-xl bg-white"
                      >
                        <option value="open">Open (Accepting Nominations)</option>
                        <option value="filling">Filling (Last Remaining Slots)</option>
                        <option value="closed">Closed (Intake Complete)</option>
                      </select>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsCohortModalOpen(false)}
                        className="px-4 py-2 border rounded-xl text-slate-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl"
                      >
                        Save Cohort
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: LIVE SITE CONTROLS & ANNOUNCEMENT BANNER                */}
        {/* ============================================================== */}
        {activeTab === 'site-control' && (
          <div className="space-y-8">
            {/* Live Announcement Banner Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                    <Megaphone className="w-4 h-4" />
                    <span>Top Announcement Banner Moderation</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Live Public Header Banner
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controls the prominent alert bar rendered across every page on the public site
                  </p>
                </div>
                {bannerSavedToast && (
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    Banner Updated!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="bannerEnabled"
                    checked={bannerForm.enabled}
                    onChange={(e) => setBannerForm({ ...bannerForm, enabled: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="bannerEnabled" className="font-bold text-slate-900 cursor-pointer">
                    Enable & Display Top Announcement Banner on Frontend
                  </label>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Banner Announcement Text</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.message}
                    onChange={(e) => setBannerForm({ ...bannerForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl text-xs"
                    placeholder="Intake Open: 2027 Sponsorship Cohorts in Tech, Agritech & Vocational Skills are now accepting nominations."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={bannerForm.badgeText || ''}
                      onChange={(e) => setBannerForm({ ...bannerForm, badgeText: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                      placeholder="e.g. Live Intake, Urgent"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Action Link Text</label>
                    <input
                      type="text"
                      value={bannerForm.linkText || ''}
                      onChange={(e) => setBannerForm({ ...bannerForm, linkText: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                      placeholder="e.g. View Sponsorship Calendar →"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Banner Theme</label>
                    <select
                      value={bannerForm.type}
                      onChange={(e) => setBannerForm({ ...bannerForm, type: e.target.value as any })}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white"
                    >
                      <option value="info">Info (Royal Navy & Gold)</option>
                      <option value="urgent">Urgent (Warm Amber & Gold)</option>
                      <option value="highlight">Highlight (Forest Emerald)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                >
                  Publish Announcement Banner
                </button>
              </form>
            </div>

            {/* Organization Settings Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <Settings className="w-4 h-4 text-amber-600" />
                    <span>Global Content & Institutional Settings</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Foundation Details & Contact Hubs
                  </h3>
                  <p className="text-xs text-slate-500">
                    Updates headers, footers, statutory badges, and national offices
                  </p>
                </div>
                {settingsSavedToast && (
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    Settings Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Organization Name</label>
                    <input
                      type="text"
                      value={settingsForm.orgName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, orgName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Motto / Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Official Mission Statement</label>
                  <textarea
                    rows={2}
                    value={settingsForm.missionStatement}
                    onChange={(e) => setSettingsForm({ ...settingsForm, missionStatement: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">CAC Registration</label>
                    <input
                      type="text"
                      value={settingsForm.cacNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, cacNumber: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">SCUML Registration</label>
                    <input
                      type="text"
                      value={settingsForm.scumlNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, scumlNumber: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Program Spend Ratio</label>
                    <input
                      type="text"
                      value={settingsForm.programSpendRatio}
                      onChange={(e) => setSettingsForm({ ...settingsForm, programSpendRatio: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Abuja HQ Address</label>
                    <input
                      type="text"
                      value={settingsForm.hqAddress}
                      onChange={(e) => setSettingsForm({ ...settingsForm, hqAddress: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Kaduna Agritech Field</label>
                    <input
                      type="text"
                      value={settingsForm.agriAddress}
                      onChange={(e) => setSettingsForm({ ...settingsForm, agriAddress: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Lagos Hub Address</label>
                    <input
                      type="text"
                      value={settingsForm.lagosAddress}
                      onChange={(e) => setSettingsForm({ ...settingsForm, lagosAddress: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Secretariat Phone 1</label>
                    <input
                      type="text"
                      value={settingsForm.phone1}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone1: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Secretariat Phone 2</label>
                    <input
                      type="text"
                      value={settingsForm.phone2}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone2: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Partnerships Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                >
                  Save Global Settings
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: IMPACT STORIES TESTIMONIALS MODERATION                  */}
        {/* ============================================================== */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Documented Impact Stories
                </h2>
                <p className="text-xs text-slate-500">
                  Beneficiary profiles and testimonies showcased across the Impact page and Homepage
                </p>
              </div>

              <button
                onClick={() => handleOpenStoryModal()}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Impact Testimony</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{story.name}</h3>
                        <p className="text-xs text-slate-500">{story.location} · Age {story.age}</p>
                      </div>
                      <span className="text-[10px] bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded border border-amber-200">
                        {story.track}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{story.quote}"
                    </p>

                    <div className="space-y-1 text-xs">
                      <div><strong className="text-slate-700">Before:</strong> <span className="text-slate-500">{story.beforeStatus}</span></div>
                      <div><strong className="text-emerald-700">Now:</strong> <span className="text-slate-800 font-medium">{story.currentStatus}</span></div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenStoryModal(story)}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteStory(story.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Story Modal */}
            {isStoryModalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">
                      {editingStoryId ? 'Edit Beneficiary Testimony' : 'New Beneficiary Story'}
                    </h3>
                    <button
                      onClick={() => setIsStoryModalOpen(false)}
                      className="p-1.5 text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveStory} className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Beneficiary Name</label>
                        <input
                          type="text"
                          required
                          value={storyForm.name}
                          onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Age</label>
                        <input
                          type="number"
                          required
                          value={storyForm.age}
                          onChange={(e) => setStoryForm({ ...storyForm, age: parseInt(e.target.value, 10) || 20 })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Location / State</label>
                        <input
                          type="text"
                          required
                          value={storyForm.location}
                          onChange={(e) => setStoryForm({ ...storyForm, location: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Track</label>
                        <input
                          type="text"
                          required
                          value={storyForm.track}
                          onChange={(e) => setStoryForm({ ...storyForm, track: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Partner Institution</label>
                      <input
                        type="text"
                        required
                        value={storyForm.partnerInstitution}
                        onChange={(e) => setStoryForm({ ...storyForm, partnerInstitution: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Quote Headline</label>
                      <input
                        type="text"
                        required
                        value={storyForm.quote}
                        onChange={(e) => setStoryForm({ ...storyForm, quote: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Full Detailed Testimony</label>
                      <textarea
                        rows={3}
                        required
                        value={storyForm.story}
                        onChange={(e) => setStoryForm({ ...storyForm, story: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Before Status</label>
                        <input
                          type="text"
                          required
                          value={storyForm.beforeStatus}
                          onChange={(e) => setStoryForm({ ...storyForm, beforeStatus: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Current Status / Job</label>
                        <input
                          type="text"
                          required
                          value={storyForm.currentStatus}
                          onChange={(e) => setStoryForm({ ...storyForm, currentStatus: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Support Received</label>
                      <input
                        type="text"
                        required
                        value={storyForm.supportReceived}
                        onChange={(e) => setStoryForm({ ...storyForm, supportReceived: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsStoryModalOpen(false)}
                        className="px-4 py-2 border rounded-xl text-slate-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl"
                      >
                        Save Testimony
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: FOCUS PILLARS CONTROL                                   */}
        {/* ============================================================== */}
        {activeTab === 'pillars' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Focus Areas & Pillars Moderation
              </h2>
              <p className="text-xs text-slate-500">
                Update descriptions, stats, partner lists, and support packages across the 4 key focus tracks
              </p>
            </div>

            <div className="space-y-6">
              {content.pillars.map((pillar) => (
                <div key={pillar.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        Pillar ID: {pillar.id}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Short Description</label>
                      <input
                        type="text"
                        value={pillar.shortDescription}
                        onChange={(e) => updatePillar(pillar.id, { shortDescription: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Full Detailed Framework</label>
                      <textarea
                        rows={2}
                        value={pillar.fullDescription}
                        onChange={(e) => updatePillar(pillar.id, { fullDescription: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Target Audience</label>
                      <input
                        type="text"
                        value={pillar.targetAudience}
                        onChange={(e) => updatePillar(pillar.id, { targetAudience: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Expected Outcome</label>
                      <input
                        type="text"
                        value={pillar.outcome}
                        onChange={(e) => updatePillar(pillar.id, { outcome: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: BOARD OF TRUSTEES & LEADERSHIP                          */}
        {/* ============================================================== */}
        {activeTab === 'board' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Board of Trustees & Leadership Roster
                </h2>
                <p className="text-xs text-slate-500">
                  Control trustee names, titles, bios, and oversight portfolios rendered on the About page
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBoardIdx(null);
                  setBoardForm({
                    name: '',
                    role: 'Trustee',
                    bio: '',
                    focus: '',
                  });
                }}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Trustee</span>
              </button>
            </div>

            {/* Board member form if active */}
            {editingBoardIdx !== null && (
              <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Edit Trustee: {content.boardMembers[editingBoardIdx]?.name}
                </h3>
                <form onSubmit={handleSaveBoardMember} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Full Name & Title</label>
                      <input
                        type="text"
                        required
                        value={boardForm.name}
                        onChange={(e) => setBoardForm({ ...boardForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white border rounded-xl"
                        placeholder="Dr. G. W Chike JP"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Board Role</label>
                      <input
                        type="text"
                        required
                        value={boardForm.role}
                        onChange={(e) => setBoardForm({ ...boardForm, role: e.target.value })}
                        className="w-full px-3 py-2 bg-white border rounded-xl"
                        placeholder="Chairman, Board of Trustees"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Biography / Credentials</label>
                    <textarea
                      rows={2}
                      required
                      value={boardForm.bio}
                      onChange={(e) => setBoardForm({ ...boardForm, bio: e.target.value })}
                      className="w-full px-3 py-2 bg-white border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Oversight Focus</label>
                    <input
                      type="text"
                      required
                      value={boardForm.focus}
                      onChange={(e) => setBoardForm({ ...boardForm, focus: e.target.value })}
                      className="w-full px-3 py-2 bg-white border rounded-xl"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl"
                    >
                      Save Trustee Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingBoardIdx(null)}
                      className="px-4 py-2 border bg-white rounded-xl text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.boardMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                        <p className="text-xs font-semibold text-amber-700">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">
                      {member.bio}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Oversight Focus: <strong className="text-slate-800">{member.focus}</strong>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingBoardIdx(idx);
                        setBoardForm(member);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${member.name} from Board of Trustees?`)) {
                          deleteBoardMember(idx);
                        }
                      }}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: DONATIONS & FINANCIAL AUDIT LEDGER                      */}
        {/* ============================================================== */}
        {activeTab === 'donations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Financial Stewardship & Donations Ledger
                </h2>
                <p className="text-xs text-slate-500">
                  Audit log of online sponsorships and donor allocations across Paystack & Flutterwave
                </p>
              </div>

              <button
                onClick={handleExportDonationsCSV}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export Audit Ledger (CSV)</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Reference</th>
                      <th className="px-5 py-3.5">Donor Name</th>
                      <th className="px-5 py-3.5">Amount</th>
                      <th className="px-5 py-3.5">Allocation Track</th>
                      <th className="px-5 py-3.5">Gateway</th>
                      <th className="px-5 py-3.5">Frequency</th>
                      <th className="px-5 py-3.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {content.donations.map((don) => (
                      <tr key={don.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-[11px] font-bold text-slate-500">
                          {don.ref}
                        </td>
                        <td className="px-5 py-3.5">
                          <strong className="text-slate-900 block">{don.donorName}</strong>
                          <span className="text-slate-400 text-[11px]">{don.donorEmail}</span>
                        </td>
                        <td className="px-5 py-3.5 font-mono font-bold text-emerald-700">
                          {don.currency === 'USD' ? '$' : '₦'}
                          {Number(don.amount).toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 max-w-xs truncate">
                          {don.allocation}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            don.gateway === 'paystack'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {don.gateway}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 capitalize text-slate-600">
                          {don.frequency}
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 font-mono text-[11px]">
                          {new Date(don.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal for Reset */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Restore Audited Defaults?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This will reset all site settings, cohorts, and nominations back to the audited default state in both the Express backend and localStorage.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-2.5 border rounded-xl text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
