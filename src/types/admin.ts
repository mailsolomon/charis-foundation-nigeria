import { PillarDetail, ImpactStory } from './index';

export interface CandidateNomination {
  id: string;
  applicantName: string;
  applicantPhone: string;
  applicantLocation: string;
  applicantPillar: string;
  applicantReason: string;
  nominatorRelationship: string;
  status: 'pending' | 'vetted' | 'approved' | 'placed' | 'ineligible';
  createdAt: string;
  assignedPartner?: string;
  reviewerNotes?: string;
}

export interface CohortItem {
  id: string;
  quarter: string;
  track: string;
  dates: string;
  location: string;
  support: string;
  slots: string;
  status: 'open' | 'filling' | 'closed';
}

export interface DonationRecord {
  id: string;
  ref: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: 'NGN' | 'USD';
  allocation: string;
  gateway: 'paystack' | 'flutterwave';
  frequency: 'one-time' | 'monthly';
  prayerRequest?: string;
  date: string;
}

export interface BoardMember {
  name: string;
  role: string;
  bio: string;
  focus: string;
}

export interface AnnouncementBanner {
  enabled: boolean;
  message: string;
  badgeText?: string;
  linkText?: string;
  targetPage?: string;
  type: 'info' | 'urgent' | 'highlight';
}

export interface SiteSettings {
  orgName: string;
  tagline: string;
  missionStatement: string;
  cacNumber: string;
  scumlNumber: string;
  programSpendRatio: string;
  hqAddress: string;
  agriAddress: string;
  lagosAddress: string;
  phone1: string;
  phone2: string;
  email: string;
}

export interface SiteContentState {
  settings: SiteSettings;
  announcement?: AnnouncementBanner;
  pillars: PillarDetail[];
  cohorts: CohortItem[];
  nominations: CandidateNomination[];
  stories: ImpactStory[];
  boardMembers: BoardMember[];
  donations: DonationRecord[];
}
