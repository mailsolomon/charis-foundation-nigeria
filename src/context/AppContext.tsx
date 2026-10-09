import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteContentState,
  SiteSettings,
  AnnouncementBanner,
  CohortItem,
  CandidateNomination,
  BoardMember,
  DonationRecord
} from '../types/admin';
import { PillarDetail, ImpactStory } from '../types';
import { PILLARS_DATA, IMPACT_STORIES, BOARD_MEMBERS } from '../data/mockData';

interface AdminUserInfo {
  name: string;
  role: string;
  username: string;
}

interface AppContextType {
  content: SiteContentState;
  isAdmin: boolean;
  adminUser: AdminUserInfo | null;
  loginAdmin: (user: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  updateAnnouncement: (announcement: Partial<AnnouncementBanner>) => Promise<boolean>;
  updatePillar: (pillarId: string, updates: Partial<PillarDetail>) => Promise<boolean>;
  addCohort: (cohort: Omit<CohortItem, 'id'>) => Promise<boolean>;
  updateCohort: (id: string, updates: Partial<CohortItem>) => Promise<boolean>;
  deleteCohort: (id: string) => Promise<boolean>;
  submitNomination: (nomination: Omit<CandidateNomination, 'id' | 'status' | 'createdAt'>) => Promise<{ success: boolean; ref?: string }>;
  updateNominationStatus: (id: string, status: CandidateNomination['status'], notes?: string, assignedPartner?: string) => Promise<boolean>;
  deleteNomination: (id: string) => Promise<boolean>;
  addStory: (story: Omit<ImpactStory, 'id'>) => Promise<boolean>;
  updateStory: (id: string, updates: Partial<ImpactStory>) => Promise<boolean>;
  deleteStory: (id: string) => Promise<boolean>;
  updateBoardMember: (index: number, member: BoardMember) => Promise<boolean>;
  addBoardMember: (member: BoardMember) => Promise<boolean>;
  deleteBoardMember: (index: number) => Promise<boolean>;
  recordDonation: (donation: Omit<DonationRecord, 'id' | 'date'>) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const LOCAL_STORAGE_KEY = 'charis_foundation_content_v1';
const AUTH_STORAGE_KEY = 'charis_admin_auth_v1';
const AUTH_USER_KEY = 'charis_admin_user_v1';

const defaultAnnouncement: AnnouncementBanner = {
  enabled: true,
  message: 'Intake Open: 2027 Sponsorship Cohorts in Tech, Agritech & Vocational Skills are now accepting nominations.',
  badgeText: 'Live Intake',
  linkText: 'View Sponsorship Calendar →',
  targetPage: 'calendar',
  type: 'info',
};

const defaultSettings: SiteSettings = {
  orgName: 'Charis Foundation Nigeria',
  tagline: 'Grace to Grow; Skills to Thrive',
  missionStatement: 'A faith-based charitable initiative dedicated to sponsoring and partnering with accredited organizations and government institutions to provide vital skill acquisition and capacity building to orphans, widows, and the less privileged.',
  cacNumber: 'CAC/IT/NO: 189420',
  scumlNumber: 'SC/RN/2023/09418',
  programSpendRatio: '88%',
  hqAddress: 'Plot 418, Diplomatic Zone, Central Business District, Abuja FCT, Nigeria',
  agriAddress: 'KM 14, Kaduna-Zaria Expressway, Igabi LGA, Kaduna State',
  lagosAddress: '12 Commercial Avenue, Yaba, Lagos State',
  phone1: '+234 (0) 803 456 7890',
  phone2: '+234 (0) 812 987 6543',
  email: 'partnerships@charisfoundation.ng',
};

const defaultCohorts: CohortItem[] = [
  {
    id: 'cohort-19',
    quarter: 'Sponsored Cohort 19 (Q1 2027)',
    track: 'Technology & Web Engineering',
    dates: 'Jan 15 – Jul 10, 2027',
    location: 'Partner Software Academies (Abuja & Lagos) + Remote',
    support: '100% Tuition + Laptop Grant + Data Stipends',
    slots: '45 Sponsored Seats',
    status: 'open',
  },
  {
    id: 'cohort-20',
    quarter: 'Sponsored Cohort 20 (Q1 2027)',
    track: 'Climate Greenhouse Agriculture & Agritech',
    dates: 'Feb 01 – Jun 20, 2027',
    location: 'State Agricultural Extension & Research Centers (Kaduna)',
    support: '100% Course Fees + Solar Drip Kits + Seed Packs',
    slots: '60 Sponsored Smallholders',
    status: 'open',
  },
  {
    id: 'cohort-21',
    quarter: 'Sponsored Cohort 21 (Q2 2027)',
    track: 'Vocational Fashion Construction & Solar PV',
    dates: 'Apr 05 – Aug 28, 2027',
    location: 'National Directorate of Employment (NDE) Centers',
    support: '100% Apprenticeship Fees + Industrial Sewing Machine',
    slots: '50 Sponsored Women & Youths',
    status: 'filling',
  },
  {
    id: 'cohort-22',
    quarter: 'Sponsored Cohort 22 (Q2 2027)',
    track: 'Foundational STEM & Remedial WAEC/JAMB',
    dates: 'May 10 – Nov 15, 2027',
    location: 'Accredited Remedial Centers & Partner Secondary Schools',
    support: '100% Exam Fees + Textbooks + Uniforms',
    slots: '120 Sponsored Candidates',
    status: 'open',
  },
];

const defaultNominations: CandidateNomination[] = [
  {
    id: 'CHR-NOM-84920',
    applicantName: 'Faith Chioma Eze',
    applicantPhone: '0803 912 3456',
    applicantLocation: 'Kubwa, Abuja FCT',
    applicantPillar: 'Technology & Digital Skills Sponsorship',
    applicantReason: 'Orphaned since 2023, hawking sachet water to support 2 younger siblings. Scored 278 in JAMB but has zero funds for tertiary schooling. Highly passionate about web design.',
    nominatorRelationship: 'Pastor / Faith Leader',
    status: 'vetted',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    assignedPartner: 'NITDA Digital Hub / DevBridge',
    reviewerNotes: 'Strong aptitude demonstrated in interview. Approved for Cohort 19 laptop sponsorship.',
  },
  {
    id: 'CHR-NOM-49102',
    applicantName: 'Ibrahim Danladi',
    applicantPhone: '0812 456 7890',
    applicantLocation: 'Makarfi, Kaduna State',
    applicantPillar: 'Agriculture & Agritech Empowerment',
    applicantReason: 'Subsistence family head with 2 acres degraded soil. Needs greenhouse and solar drip irrigation skills to feed household and avoid recurrent drought losses.',
    nominatorRelationship: 'Community Leader',
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    assignedPartner: 'Kaduna State Agritech Extension Hub',
    reviewerNotes: 'Vetted by field inspector. Farm plot inspected and verified.',
  },
  {
    id: 'CHR-NOM-30911',
    applicantName: 'Mary Omoleye',
    applicantPhone: '0802 888 1234',
    applicantLocation: 'Bariga, Lagos State',
    applicantPillar: 'Vocational Capacity Building & Trade Support',
    applicantReason: 'Widowed mother of four. Seeking vocational fashion construction apprenticeship at NDE center to establish a neighborhood sewing shop.',
    nominatorRelationship: 'Self (Vulnerable Applicant)',
    status: 'pending',
    createdAt: new Date().toISOString(),
    reviewerNotes: 'Intake form complete. Awaiting home assessment visit.',
  },
];

const defaultDonations: DonationRecord[] = [
  {
    id: 'DON-01',
    ref: 'CHR-PSTK-849201',
    donorName: 'Solomon & David Partners',
    donorEmail: 'partner@example.com',
    amount: 250000,
    currency: 'NGN',
    allocation: 'Technology Fellowships (Bootcamp Fees, Laptop & Data)',
    gateway: 'paystack',
    frequency: 'one-time',
    prayerRequest: 'For peace and wisdom upon the leadership',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'DON-02',
    ref: 'CHR-FLW-391029',
    donorName: 'Grace Care Fellowship',
    donorEmail: 'gracefellowship@gmail.com',
    amount: 100000,
    currency: 'NGN',
    allocation: 'Vocational Capacity Sponsorship (NDE/ITF Tuition & Sewing Machine)',
    gateway: 'flutterwave',
    frequency: 'monthly',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
];

const initialDefaultContent: SiteContentState = {
  settings: defaultSettings,
  announcement: defaultAnnouncement,
  pillars: PILLARS_DATA,
  cohorts: defaultCohorts,
  nominations: defaultNominations,
  stories: IMPACT_STORIES,
  boardMembers: BOARD_MEMBERS,
  donations: defaultDonations,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialDefaultContent,
          ...parsed,
          settings: { ...initialDefaultContent.settings, ...(parsed.settings || {}) },
          announcement: { ...initialDefaultContent.announcement, ...(parsed.announcement || {}) },
          pillars: Array.isArray(parsed.pillars) && parsed.pillars.length > 0 ? parsed.pillars : initialDefaultContent.pillars,
          cohorts: Array.isArray(parsed.cohorts) && parsed.cohorts.length > 0 ? parsed.cohorts : initialDefaultContent.cohorts,
          nominations: Array.isArray(parsed.nominations) ? parsed.nominations : initialDefaultContent.nominations,
          stories: Array.isArray(parsed.stories) && parsed.stories.length > 0 ? parsed.stories : initialDefaultContent.stories,
          boardMembers: Array.isArray(parsed.boardMembers) && parsed.boardMembers.length > 0 ? parsed.boardMembers : initialDefaultContent.boardMembers,
          donations: Array.isArray(parsed.donations) ? parsed.donations : initialDefaultContent.donations,
        };
      }
    } catch (e) {
      console.warn('Error reading localStorage content, falling back to defaults');
    }
    return initialDefaultContent;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUserInfo | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const refreshData = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setContent((prev) => {
            const merged: SiteContentState = {
              ...prev,
              ...json.data,
              announcement: json.data.announcement || prev.announcement,
              pillars: json.data.pillars && json.data.pillars.length ? json.data.pillars : prev.pillars,
              stories: json.data.stories && json.data.stories.length ? json.data.stories : prev.stories,
              boardMembers: json.data.boardMembers && json.data.boardMembers.length ? json.data.boardMembers : prev.boardMembers,
            };
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      }
    } catch (e) {
      // offline or static mode fallback
    }
  };

  // Try to sync with Express backend on mount
  useEffect(() => {
    refreshData();
  }, []);

  // Helper to persist content state both locally and to backend API
  const saveState = async (updated: SiteContentState): Promise<boolean> => {
    setContent(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch {
      // Backend not running (e.g. static preview or GitHub Pages)
    }
    return true;
  };

  const loginAdmin = async (user: string, pass: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAdmin(true);
          const uInfo: AdminUserInfo = {
            username: data.user?.username || user,
            name: data.user?.name || 'Charis Secretariat Lead',
            role: data.user?.role || 'Super Administrator',
          };
          setAdminUser(uInfo);
          try {
            localStorage.setItem(AUTH_STORAGE_KEY, 'true');
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(uInfo));
          } catch {}
          return { success: true };
        }
      }
    } catch {
      // Fallback to offline / client-side authentication check
    }

    const isValid =
      (user === 'admin' || user === 'charis' || user === 'director') &&
      (pass === 'charis2026' || pass === 'admin@charis' || pass === 'charis');

    if (isValid) {
      setIsAdmin(true);
      const uInfo: AdminUserInfo = {
        username: user || 'admin',
        name: 'Charis Secretariat Lead',
        role: 'Super Administrator',
      };
      setAdminUser(uInfo);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(uInfo));
      } catch {}
      return { success: true };
    }
    return { success: false, error: 'Incorrect administrator username or password' };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch {}
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = {
      ...content,
      settings: { ...content.settings, ...newSettings },
    };
    return saveState(updated);
  };

  const updateAnnouncement = async (announcementUpdates: Partial<AnnouncementBanner>) => {
    const currentAnnouncement = content.announcement || defaultAnnouncement;
    const updated = {
      ...content,
      announcement: { ...currentAnnouncement, ...announcementUpdates },
    };
    return saveState(updated);
  };

  const updatePillar = async (pillarId: string, updates: Partial<PillarDetail>) => {
    const updatedPillars = content.pillars.map((p) =>
      p.id === pillarId ? { ...p, ...updates } : p
    );
    return saveState({ ...content, pillars: updatedPillars });
  };

  const addCohort = async (cohort: Omit<CohortItem, 'id'>) => {
    const newId = `cohort-${Date.now()}`;
    const newCohort: CohortItem = { ...cohort, id: newId };
    return saveState({
      ...content,
      cohorts: [newCohort, ...content.cohorts],
    });
  };

  const updateCohort = async (id: string, updates: Partial<CohortItem>) => {
    const updatedCohorts = content.cohorts.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    return saveState({ ...content, cohorts: updatedCohorts });
  };

  const deleteCohort = async (id: string) => {
    const updatedCohorts = content.cohorts.filter((c) => c.id !== id);
    return saveState({ ...content, cohorts: updatedCohorts });
  };

  const submitNomination = async (
    nomination: Omit<CandidateNomination, 'id' | 'status' | 'createdAt'>
  ) => {
    const ref = `CHR-NOM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newNom: CandidateNomination = {
      ...nomination,
      id: ref,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const updated = {
      ...content,
      nominations: [newNom, ...content.nominations],
    };
    await saveState(updated);
    return { success: true, ref };
  };

  const updateNominationStatus = async (
    id: string,
    status: CandidateNomination['status'],
    notes?: string,
    assignedPartner?: string
  ) => {
    const updatedNoms = content.nominations.map((n) => {
      if (n.id === id) {
        return {
          ...n,
          status,
          ...(notes !== undefined ? { reviewerNotes: notes } : {}),
          ...(assignedPartner !== undefined ? { assignedPartner } : {}),
        };
      }
      return n;
    });
    return saveState({ ...content, nominations: updatedNoms });
  };

  const deleteNomination = async (id: string) => {
    const updatedNoms = content.nominations.filter((n) => n.id !== id);
    return saveState({ ...content, nominations: updatedNoms });
  };

  const addStory = async (story: Omit<ImpactStory, 'id'>) => {
    const newId = `story-${Date.now()}`;
    const newStory: ImpactStory = { ...story, id: newId };
    return saveState({
      ...content,
      stories: [newStory, ...content.stories],
    });
  };

  const updateStory = async (id: string, updates: Partial<ImpactStory>) => {
    const updatedStories = content.stories.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    return saveState({ ...content, stories: updatedStories });
  };

  const deleteStory = async (id: string) => {
    const updatedStories = content.stories.filter((s) => s.id !== id);
    return saveState({ ...content, stories: updatedStories });
  };

  const updateBoardMember = async (index: number, member: BoardMember) => {
    const updatedMembers = [...content.boardMembers];
    updatedMembers[index] = member;
    return saveState({ ...content, boardMembers: updatedMembers });
  };

  const addBoardMember = async (member: BoardMember) => {
    return saveState({
      ...content,
      boardMembers: [...content.boardMembers, member],
    });
  };

  const deleteBoardMember = async (index: number) => {
    const updatedMembers = content.boardMembers.filter((_, idx) => idx !== index);
    return saveState({ ...content, boardMembers: updatedMembers });
  };

  const recordDonation = async (donation: Omit<DonationRecord, 'id' | 'date'>) => {
    const newRecord: DonationRecord = {
      ...donation,
      id: `DON-${Date.now()}`,
      date: new Date().toISOString(),
    };
    return saveState({
      ...content,
      donations: [newRecord, ...content.donations],
    });
  };

  const resetToDefaults = async () => {
    try {
      await fetch('/api/reset', { method: 'POST' });
    } catch {}
    return saveState(initialDefaultContent);
  };

  return (
    <AppContext.Provider
      value={{
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
        submitNomination,
        updateNominationStatus,
        deleteNomination,
        addStory,
        updateStory,
        deleteStory,
        updateBoardMember,
        addBoardMember,
        deleteBoardMember,
        recordDonation,
        resetToDefaults,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
