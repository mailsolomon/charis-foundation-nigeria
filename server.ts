import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = express();
app.use(express.json({ limit: '10mb' }));

// Data storage file path
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'site_content.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const getInitialData = () => {
  return {
    settings: {
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
    },
    announcement: {
      enabled: true,
      message: 'Intake Open: 2027 Sponsorship Cohorts in Tech, Agritech & Vocational Skills are now accepting nominations.',
      badgeText: 'Live Intake',
      linkText: 'View Sponsorship Calendar →',
      targetPage: 'calendar',
      type: 'info' as const,
    },
    cohorts: [
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
    ],
    nominations: [
      {
        id: 'CHR-NOM-84920',
        applicantName: 'Faith Chioma Eze',
        applicantPhone: '0803 912 3456',
        applicantLocation: 'Kubwa, Abuja FCT',
        applicantPillar: 'Technology & Digital Skills Sponsorship',
        applicantReason: 'Orphaned since 2023, hawking sachet water to support 2 younger siblings. Scored 278 in JAMB but has zero funds for tertiary schooling. Highly passionate about web design.',
        nominatorRelationship: 'Pastor / Faith Leader',
        status: 'vetted',
        createdAt: '2026-10-06T09:30:00Z',
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
        createdAt: '2026-10-07T14:15:00Z',
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
        createdAt: '2026-10-08T02:00:00Z',
        reviewerNotes: 'Intake form complete. Awaiting home assessment visit.',
      },
    ],
    donations: [
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
        date: '2026-10-06T10:12:00Z',
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
        date: '2026-10-07T11:45:00Z',
      },
    ],
    boardMembers: [
      {
        name: 'Dr. G. W Chike JP',
        role: 'Chairman, Board of Trustees',
        bio: 'Respected leader, philanthropist, and community builder with over 28 years pioneering faith-based benevolence, donor stewardship, and multi-sector alliances across Nigeria.',
        focus: 'Institutional Alliances & Faith Oversight',
      },
      {
        name: 'Dr. Abigail Mojisola Etta-David',
        role: 'Trustee & Editorial Director',
        bio: 'A writer with years of experience as a journalist and editor.',
        focus: 'Communications, Advocacy & Editorial Oversight',
      },
      {
        name: 'Prof. Christopher O. Okeke',
        role: 'Trustee & Agricultural Advisor',
        bio: 'Professor of Agronomy at University of Ibadan, liaising with national research institutes (IITA, NAERLS) to evaluate high-impact agricultural training partners.',
        focus: 'Agritech Partnerships & Rural Vetting',
      },
      {
        name: 'Mrs. Folashade Balogun, FCA',
        role: 'Trustee & Audit Committee Chair',
        bio: 'Fellow of the Institute of Chartered Accountants of Nigeria (ICAN), maintaining gold-standard transparency, direct beneficiary verification, and SCUML compliance.',
        focus: 'Financial Accountability & SCUML Compliance',
      },
    ],
    stories: [
      {
        id: 'story-1',
        name: 'Blessing Chukwuka',
        age: 23,
        location: 'Mararaba, Nasarawa State (Abuja Border)',
        track: 'Technology & Web Engineering',
        partnerInstitution: 'Sponsored at DevBridge Academy (Abuja Hub Partner)',
        quote: 'Charis Foundation did not just pay my entire 6-month software academy tuition; they bought me my very first laptop and paid my daily bus fare so I never missed a class.',
        story: 'Blessing had been out of school for two years hawking goods to assist her ailing mother. Through our community vulnerability intake, Charis identified her aptitude and fully sponsored her into an intensive 6-month frontend web bootcamp with an accredited partner tech academy in Abuja. Charis supplied her with a developer laptop, high-speed internet stipends, and transport allowances. Today, she works as a remote junior web developer earning over ₦350,000 monthly.',
        beforeStatus: 'Unemployed out-of-school youth hawking on the roadside',
        currentStatus: 'Junior Web Developer & Charis Alumni Ambassador',
        supportReceived: '100% Bootcamp Tuition, Laptop Grant, Internet Data & Transit Stipend',
        image: '/src/assets/images/charis_tech_education_hub_1791295669365.jpg',
      },
      {
        id: 'story-2',
        name: 'Musa Abdullahi',
        age: 27,
        location: 'Zaria / Kaduna Corridor',
        track: 'Climate-Smart Greenhouse Agriculture',
        partnerInstitution: 'Sponsored at Kaduna State Agricultural Extension & Research Institute',
        quote: 'Charis partnered with the Agricultural Extension Institute to train us in drip irrigation, and then gave us the greenhouse polythene and solar pump. That is why our farm succeeded.',
        story: 'Musa faced recurrent crop failure on his family’s barren open-field plot. Charis sponsored Musa into a 4-month intensive horticulture course conducted by the State Agricultural Extension Institute. Beyond covering all training fees, Charis provided Musa with certified hybrid seeds, solar drip irrigation piping, and organic fertilizers. His harvest yield surged by 340%, enabling him to supply fresh bell peppers to Kaduna wholesalers.',
        beforeStatus: 'Destitute subsistence farmer with 65% seasonal harvest loss',
        currentStatus: 'Founder of Al-Barakah Agri-Ventures (Employing 3 youths)',
        supportReceived: 'Institutional Training Sponsorship, Solar Drip Irrigation Kit & Seed Pack',
        image: '/src/assets/images/charis_agriculture_training_1791295680199.jpg',
      },
      {
        id: 'story-3',
        name: 'Grace Oladipo',
        age: 31,
        location: 'Ikorodu, Lagos State',
        track: 'Vocational Fashion & Enterprise Capacity',
        partnerInstitution: 'Sponsored at NDE Accredited Vocational Skill Center (Lagos)',
        quote: 'As a widowed mother of three, I could not afford vocational school fees. Charis sponsored my entire NDE training and surprised me at graduation with a brand-new industrial sewing machine.',
        story: 'Following the loss of her husband, Grace was evicted and unable to feed her three children. Charis sponsored Grace through an intensive 4-month fashion apprenticeship at an accredited National Directorate of Employment (NDE) vocational center in Lagos, paying her enrollment and daily lunch stipends. Upon completion, Charis gifted her an industrial sewing machine package and ₦50,000 in material seed capital.',
        beforeStatus: 'Destitute widow with zero income or productive assets',
        currentStatus: 'Owner of GraceCraft Apparel, children returned to school',
        supportReceived: 'NDE Apprenticeship Tuition, Industrial Sewing Machine Grant & Material Seed Fund',
        image: '/src/assets/images/charis_community_empowerment_1791295691785.jpg',
      },
    ],
    pillars: [
      {
        id: 'education',
        title: 'Education & Foundational Scholarships',
        shortDescription: 'Sponsoring vulnerable out-of-school children and orphans into quality accredited basic and secondary schools.',
        fullDescription: 'Rather than running separate schools, Charis Foundation identifies promising vulnerable children—orphans, child-laborers, and indigent youths—and covers 100% of their tuition in accredited formal schools and remedial tutorial academies for WAEC and JAMB exams.',
        image: '/src/assets/images/charis_hero_empowerment_1791295656073.jpg',
        iconName: 'BookOpen',
        keyStats: [
          { value: '1,840+', label: 'Students Fully Sponsored' },
          { value: '38', label: 'Accredited Partner Schools' },
          { value: '92.4%', label: 'WAEC Credit Pass Rate' }
        ],
        partnerInstitutions: [
          'State Universal Basic Education Boards (SUBEB)',
          'Accredited Faith-Based Community High Schools',
          'National Examination Remedial Academies'
        ],
        supportProvided: [
          '100% Tuition & Term Fees Remitted Directly to Schools',
          'Custom School Uniforms, Bags & Complete Textbooks',
          'WAEC / NECO / JAMB Registration Fee Coverage',
          'After-School Remedial Literacy Mentorship'
        ],
        targetAudience: 'Orphans, displaced children, and children of indigent widows at risk of permanent dropout.',
        outcome: 'Vulnerable children complete secondary schooling with accredited certifications, breaking generational poverty.',
        accentColor: 'blue'
      },
      {
        id: 'technology',
        title: 'Technology & Digital Skills Sponsorship',
        shortDescription: 'Funding high-demand software engineering, UI/UX, and data fellowships in partnership with leading tech academies.',
        fullDescription: 'We partner with established technology hubs, coding academies, and government digital innovation centers to sponsor talented vulnerable youths into 6-month immersive digital skills bootcamps.',
        image: '/src/assets/images/charis_tech_education_hub_1791295669365.jpg',
        iconName: 'Laptop',
        keyStats: [
          { value: '960+', label: 'Tech Fellows Sponsored' },
          { value: '18', label: 'Partner Tech Hubs & Academies' },
          { value: '84%', label: 'Remote / Local Placement Rate' }
        ],
        partnerInstitutions: [
          'National Information Technology Development Agency (NITDA) Hubs',
          'DevBridge Software Academy Abuja',
          'Lagos Tech Innovators Network',
          'Kaduna State ICT Innovation Hub'
        ],
        supportProvided: [
          'Full Bootcamp Tuition Coverage',
          'Provision of High-Performance Developer Laptops',
          'Monthly High-Speed Internet Data Stipends',
          'CV Polishing & Remote Job Placement Matching'
        ],
        targetAudience: 'Unemployed tertiary graduates and talented out-of-school youths from underprivileged households.',
        outcome: 'Fellows graduate directly into remote junior engineering, product design, and freelance digital roles.',
        accentColor: 'indigo'
      },
      {
        id: 'agriculture',
        title: 'Agriculture & Agritech Empowerment',
        shortDescription: 'Sponsoring practical agro-ecological, greenhouse horticulture, and solar-drip training with national research institutes.',
        fullDescription: 'Charis Foundation collaborates with agricultural universities, research institutes, and commercial agro-ventures to sponsor youth and vulnerable smallholders into modern farming courses.',
        image: '/src/assets/images/charis_agriculture_training_1791295680199.jpg',
        iconName: 'Sprout',
        keyStats: [
          { value: '1,420+', label: 'Smallholders Sponsored' },
          { value: '14', label: 'Agritech & Research Partners' },
          { value: '310%', label: 'Average Crop Yield Increase' }
        ],
        partnerInstitutions: [
          'Kaduna State Agricultural Extension & Rural Development Hub',
          'Federal University of Agriculture Extension Outposts',
          'Commercial Agritech Greenhouse Centers',
          'National Agricultural Extension & Research Liaison Services (NAERLS)'
        ],
        supportProvided: [
          'Hands-on Greenhouse Apprenticeship Course Fees',
          'Solar-Powered Drip Irrigation Starter Kits',
          'High-Yield Certified Hybrid Seed & Bio-Fertilizer Packs',
          'Post-Harvest Cooperative Aggregation & Offtake Linkages'
        ],
        targetAudience: 'Rural youth, subsistence farm families facing climate droughts, and unemployed young returnees.',
        outcome: 'Trainees transition from precarious subsistence farming to resilient year-round profitable commercial agriculture.',
        accentColor: 'emerald'
      },
      {
        id: 'capacity',
        title: 'Vocational Capacity Building & Trade Support',
        shortDescription: 'Partnering with government trade centers to sponsor widows and vulnerable artisans with certified toolkits.',
        fullDescription: 'In partnership with the National Directorate of Employment (NDE) and Industrial Training Fund (ITF), Charis sponsors vulnerable individuals into certified technical apprenticeships.',
        image: '/src/assets/images/charis_community_empowerment_1791295691785.jpg',
        iconName: 'Award',
        keyStats: [
          { value: '1,500+', label: 'Artisans Sponsoring & Toolkits' },
          { value: '25', label: 'Accredited NDE & TVET Centers' },
          { value: '89%', label: 'Self-Sustaining Workshops at 12 Mo.' }
        ],
        partnerInstitutions: [
          'National Directorate of Employment (NDE) Skills Centers',
          'Industrial Training Fund (ITF) Vocational Wings',
          'Certified State Technical & Vocational Education Boards',
          'Chamber of Commerce Artisanal Cooperatives'
        ],
        supportProvided: [
          '100% TVET Apprenticeship Enrollment & Certification Fees',
          'Daily Transport & Nutrition Stipends During Training',
          'Graduation Equipment Grants (Industrial Sewing Machines, Solar Toolkits)',
          'Bookkeeping & Cooperative Micro-Savings Incubation'
        ],
        targetAudience: 'Vulnerable single mothers, widows, persons with disabilities (PWDs), and informal workers.',
        outcome: 'Graduates launch independent, fully equipped workshops that immediately start generating daily household earnings.',
        accentColor: 'amber'
      }
    ]
  };
};

// Helper to read data
const readData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading data file, using default seed:', err);
  }
  const defaultData = getInitialData();
  writeData(defaultData);
  return defaultData;
};

// Helper to write data
const writeData = (data: any) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing data file:', err);
    return false;
  }
};

// REST API Endpoints
app.get('/api/content', (req: Request, res: Response) => {
  const data = readData();
  res.json({ success: true, data });
});

app.post('/api/content', (req: Request, res: Response) => {
  const payload = req.body;
  if (!payload) {
    return res.status(400).json({ success: false, error: 'No data provided' });
  }
  const current = readData();
  const merged = { ...current, ...payload };
  writeData(merged);
  res.json({ success: true, message: 'Content updated successfully', data: merged });
});

// Nominations API
app.post('/api/nominations', (req: Request, res: Response) => {
  const nomination = req.body;
  if (!nomination || !nomination.applicantName) {
    return res.status(400).json({ success: false, error: 'Applicant name is required' });
  }

  const current = readData();
  const newNomination = {
    ...nomination,
    id: nomination.id || `CHR-NOM-${Math.floor(10000 + Math.random() * 90000)}`,
    status: nomination.status || 'pending',
    createdAt: new Date().toISOString(),
  };

  current.nominations = [newNomination, ...(current.nominations || [])];
  writeData(current);

  res.status(201).json({ success: true, data: newNomination });
});

app.patch('/api/nominations/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const current = readData();
  let found = false;
  current.nominations = (current.nominations || []).map((n: any) => {
    if (n.id === id) {
      found = true;
      return { ...n, ...updates };
    }
    return n;
  });

  if (!found) {
    return res.status(404).json({ success: false, error: 'Nomination not found' });
  }

  writeData(current);
  res.json({ success: true, message: 'Nomination updated', data: updates });
});

// Donations Ledger API
app.post('/api/donations', (req: Request, res: Response) => {
  const donation = req.body;
  const current = readData();
  const newDonation = {
    ...donation,
    id: donation.id || `DON-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString(),
  };

  current.donations = [newDonation, ...(current.donations || [])];
  writeData(current);
  res.status(201).json({ success: true, data: newDonation });
});

// Delete nomination
app.delete('/api/nominations/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const current = readData();
  const initialLength = (current.nominations || []).length;
  current.nominations = (current.nominations || []).filter((n: any) => n.id !== id);
  if (current.nominations.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Nomination not found' });
  }
  writeData(current);
  res.json({ success: true, message: 'Nomination deleted' });
});

// Cohorts CRUD
app.post('/api/cohorts', (req: Request, res: Response) => {
  const cohort = req.body;
  const current = readData();
  const newCohort = {
    ...cohort,
    id: cohort.id || `cohort-${Date.now()}`,
    status: cohort.status || 'open',
  };
  current.cohorts = [newCohort, ...(current.cohorts || [])];
  writeData(current);
  res.status(201).json({ success: true, data: newCohort });
});

app.patch('/api/cohorts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const current = readData();
  let found = false;
  current.cohorts = (current.cohorts || []).map((c: any) => {
    if (c.id === id) {
      found = true;
      return { ...c, ...updates };
    }
    return c;
  });
  if (!found) {
    return res.status(404).json({ success: false, error: 'Cohort not found' });
  }
  writeData(current);
  res.json({ success: true, message: 'Cohort updated', data: updates });
});

app.delete('/api/cohorts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const current = readData();
  current.cohorts = (current.cohorts || []).filter((c: any) => c.id !== id);
  writeData(current);
  res.json({ success: true, message: 'Cohort deleted' });
});

// Stories CRUD
app.post('/api/stories', (req: Request, res: Response) => {
  const story = req.body;
  const current = readData();
  const newStory = {
    ...story,
    id: story.id || `story-${Date.now()}`,
  };
  current.stories = [newStory, ...(current.stories || [])];
  writeData(current);
  res.status(201).json({ success: true, data: newStory });
});

app.patch('/api/stories/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const current = readData();
  let found = false;
  current.stories = (current.stories || []).map((s: any) => {
    if (s.id === id) {
      found = true;
      return { ...s, ...updates };
    }
    return s;
  });
  if (!found) {
    return res.status(404).json({ success: false, error: 'Story not found' });
  }
  writeData(current);
  res.json({ success: true, message: 'Story updated', data: updates });
});

app.delete('/api/stories/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const current = readData();
  current.stories = (current.stories || []).filter((s: any) => s.id !== id);
  writeData(current);
  res.json({ success: true, message: 'Story deleted' });
});

// Pillars Update
app.patch('/api/pillars/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const current = readData();
  let found = false;
  current.pillars = (current.pillars || []).map((p: any) => {
    if (p.id === id) {
      found = true;
      return { ...p, ...updates };
    }
    return p;
  });
  if (!found) {
    return res.status(404).json({ success: false, error: 'Pillar not found' });
  }
  writeData(current);
  res.json({ success: true, message: 'Pillar updated', data: updates });
});

// Summary Stats API for Admin
app.get('/api/stats', (req: Request, res: Response) => {
  const current = readData();
  const donations = current.donations || [];
  const nominations = current.nominations || [];
  const cohorts = current.cohorts || [];

  const totalNGN = donations
    .filter((d: any) => (d.currency || 'NGN') === 'NGN')
    .reduce((sum: number, d: any) => sum + (Number(d.amount) || 0), 0);

  const totalUSD = donations
    .filter((d: any) => d.currency === 'USD')
    .reduce((sum: number, d: any) => sum + (Number(d.amount) || 0), 0);

  const pendingCount = nominations.filter((n: any) => n.status === 'pending').length;
  const approvedCount = nominations.filter((n: any) => n.status === 'approved' || n.status === 'placed').length;
  const activeCohortsCount = cohorts.filter((c: any) => c.status !== 'closed').length;

  res.json({
    success: true,
    data: {
      totalDonationsNGN: totalNGN,
      totalDonationsUSD: totalUSD,
      donationsCount: donations.length,
      pendingNominations: pendingCount,
      approvedNominations: approvedCount,
      totalNominations: nominations.length,
      activeCohorts: activeCohortsCount,
      totalCohorts: cohorts.length,
    },
  });
});

// Factory reset endpoint to restore defaults
app.post('/api/reset', (req: Request, res: Response) => {
  const defaultData = getInitialData();
  writeData(defaultData);
  res.json({ success: true, message: 'Reset to default data successfully', data: defaultData });
});

// Admin Auth API
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Default master credentials for Charis Foundation governance
  if (
    (username === 'admin' || username === 'charis' || username === 'director') &&
    (password === 'charis2026' || password === 'admin@charis' || password === 'charis')
  ) {
    res.json({
      success: true,
      token: 'jwt-charis-session-' + Date.now(),
      user: {
        username: username || 'admin',
        role: 'Super Administrator',
        name: 'Charis Secretariat Lead',
      },
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid administrator credentials' });
  }
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Charis Foundation server listening on http://localhost:${PORT}`);
  });
}

startServer();
