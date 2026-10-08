export type PageView = 'home' | 'about' | 'pillars' | 'calendar' | 'impact' | 'donate' | 'contact' | 'deck';

export type PillarId = 'education' | 'technology' | 'agriculture' | 'capacity';

export interface PillarDetail {
  id: PillarId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  iconName: string;
  keyStats: { value: string; label: string }[];
  partnerInstitutions: string[];
  supportProvided: string[];
  targetAudience: string;
  outcome: string;
  accentColor: string;
}

export interface ImpactStory {
  id: string;
  name: string;
  age: number;
  location: string;
  track: string;
  partnerInstitution: string;
  quote: string;
  story: string;
  beforeStatus: string;
  currentStatus: string;
  supportReceived: string;
  image: string;
}

export interface PitchDeckSlide {
  slideNumber: number;
  title: string;
  subtitle: string;
  category: string;
  content: {
    heading: string;
    points: string[];
    highlight?: {
      title: string;
      value: string;
      description: string;
    };
    tableData?: {
      headers: string[];
      rows: string[][];
    };
  };
  boardTakeaway: string;
}
