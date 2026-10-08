import { PillarDetail, ImpactStory, PitchDeckSlide } from '../types';

export const PILLARS_DATA: PillarDetail[] = [
  {
    id: 'education',
    title: 'Education & Foundational Scholarships',
    shortDescription: 'Sponsoring vulnerable out-of-school children and promising youths into accredited schools, remedial centers, and tertiary STEM programs.',
    fullDescription: 'Charis Foundation identifies needy, orphaned, and out-of-school children across vulnerable Nigerian communities and sponsors their full enrollment into accredited partner basic schools, remedial WAEC/JAMB tutorial centers, and technical colleges—supplying textbooks, uniform grants, exam fees, and pastoral mentorship.',
    image: '/src/assets/images/charis_tech_education_hub_1791295669365.jpg',
    iconName: 'BookOpen',
    accentColor: 'blue',
    keyStats: [
      { value: '1,840+', label: 'Vulnerable Youths Sponsored' },
      { value: '28', label: 'Partner Schools & Centers' },
      { value: '100%', label: 'Tuition & Book Grant Coverage' }
    ],
    partnerInstitutions: [
      'Accredited State Technical & Vocational Colleges',
      'Federal Ministry of Education Community Learning Centers',
      'Accredited Remedial & JAMB Preparatory Institutes',
      'Faith-Based Community Secondary Schools'
    ],
    supportProvided: [
      '100% Tuition & Exam Fee (WAEC/NECO/JAMB) Sponsorship',
      'Textbooks, Uniforms, and Learning Material Packs',
      'Monthly Commuter & Nutritional Feeding Stipends',
      'Dedicated One-on-One Educational Mentors'
    ],
    targetAudience: 'Out-of-school adolescents, orphans, IDP children, and indigent candidates with high academic promise but zero financial backing.',
    outcome: 'Guaranteed re-entry into accredited formal education or direct technical certification with zero financial burden on their vulnerable families.'
  },
  {
    id: 'technology',
    title: 'Technology & Digital Skills Sponsorship',
    shortDescription: 'Funding tuition and providing developer laptops for vulnerable youths in certified tech bootcamps, coding academies, and digital hubs.',
    fullDescription: 'To bridge Nigeria’s digital divide, Charis Foundation partners with premier software bootcamps, innovation hubs, and government digital innovation centers. We sponsor selected vulnerable youths through rigorous certifications in web development, data analysis, UI/UX, and cloud computing—equipping each fellow with a personal developer laptop and internet data stipend.',
    image: '/src/assets/images/charis_tech_education_hub_1791295669365.jpg',
    iconName: 'Laptop',
    accentColor: 'indigo',
    keyStats: [
      { value: '1,420+', label: 'Fellows Sponsored' },
      { value: '14', label: 'Partner Tech Academies' },
      { value: '₦420k', label: 'Avg Beneficiary Monthly Income' }
    ],
    partnerInstitutions: [
      'National Information Technology Development Agency (NITDA) Hubs',
      'Accredited Private Software & Web Bootcamps',
      'State Innovation & Digital Economy Hubs',
      'Industrial Training Fund (ITF) Digital Centers'
    ],
    supportProvided: [
      'Full Tuition Fellowship Grants at Partner Bootcamps',
      'Personal Refurbished Laptop & Power Bank Grants',
      'Monthly High-Speed Internet Data Subsidies',
      'Remote Work Coaching, Portfolio Reviews & Upwork Advisory'
    ],
    targetAudience: 'Unemployed youths from low-income households, indigent young women seeking tech entry, and vulnerable school leavers.',
    outcome: 'Fellows graduate with verified industry certificates, live production portfolios, and secure remote or local tech employment.'
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Agritech Empowerment',
    shortDescription: 'Partnering with agricultural institutes and government agencies to train and equip vulnerable rural families with seeds, drip irrigation, and modern inputs.',
    fullDescription: 'Food security and rural wealth creation are vital for vulnerable households. Charis Foundation sponsors indigent youths and smallholder heads-of-household into specialized practical training programs run by government agricultural extension services, university farm hubs, and agritech ventures. Post-training, Charis provides direct farm starter kits: solar drip systems, improved seedlings, poultry, and cooperative market linkages.',
    image: '/src/assets/images/charis_agriculture_training_1791295680513.jpg',
    iconName: 'Sprout',
    accentColor: 'emerald',
    keyStats: [
      { value: '1,160+', label: 'Smallholders Sponsored' },
      { value: '42', label: 'Supported Farm Clusters' },
      { value: '2.8x', label: 'Average Yield Uplift' }
    ],
    partnerInstitutions: [
      'Federal Ministry of Agriculture & Food Security Extension Hubs',
      'National Agricultural Extension and Research Liaison Services (NAERLS)',
      'Accredited Songhai-Model Practical Farming Centers',
      'Commercial Agritech Greenhouse Cooperatives'
    ],
    supportProvided: [
      'Full Sponsorship for Practical Agro-Training Programs',
      'Certified Starter Seedlings, Fertilizers & Solar Drip Irrigation Kits',
      'Commercial Poultry & Aquaculture Fingerling Starter Stock',
      'Direct Cooperative Off-Taker Market Linkages'
    ],
    targetAudience: 'Vulnerable rural and peri-urban youths, subsistence family heads, female smallholders, and rural cooperatives facing climate vulnerability.',
    outcome: 'Transforms subsistence struggles into commercial micro-agribusinesses that generate recurrent household income.'
  },
  {
    id: 'capacity',
    title: 'Vocational Capacity Building & Trade Support',
    shortDescription: 'Collaborating with NDE, ITF, and master craft institutes to sponsor vocational apprenticeships and supply complete starter equipment toolkits.',
    fullDescription: 'True economic capacity building requires trade mastery backed by the physical tools of the trade. We partner with government vocational institutions like the National Directorate of Employment (NDE), Industrial Training Fund (ITF), and accredited craft guilds. Charis funds the complete vocational enrollment and, upon completion, awards every graduate an industrial starter toolkit (such as industrial sewing machines, solar PV installation toolkits, or craft kits) plus micro-seed grants.',
    image: '/src/assets/images/charis_community_empowerment_1791295691785.jpg',
    iconName: 'Award',
    accentColor: 'amber',
    keyStats: [
      { value: '1,280+', label: 'Vocational Toolkits Awarded' },
      { value: '19', label: 'Partner Vocational Centers' },
      { value: '₦65M+', label: 'Direct Starter Capital & Toolkits Seeded' }
    ],
    partnerInstitutions: [
      'National Directorate of Employment (NDE) Skill Centers',
      'Industrial Training Fund (ITF) Vocational Wings',
      'Accredited Renewable Energy & Solar Tech Training Guilds',
      'Certified Fashion Construction & Technical Trade Academies'
    ],
    supportProvided: [
      '100% Apprenticeship & Certification Sponsorship',
      'Graduation Equipment Grants (Industrial Sewing Machines, Solar Toolkits)',
      'Bookkeeping & Cooperative Micro-Savings Incubation',
      'Seed Grant Disbursement for Shop Setup & Materials'
    ],
    targetAudience: 'Vulnerable single mothers, widows, persons with disabilities (PWDs), and informal workers trapped in low-income dependency.',
    outcome: 'Graduates launch independent, fully equipped workshops that immediately start generating daily household earnings.'
  }
];

export const IMPACT_STORIES: ImpactStory[] = [
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
    image: '/src/assets/images/charis_tech_education_hub_1791295669365.jpg'
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
    image: '/src/assets/images/charis_agriculture_training_1791295680513.jpg'
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
    image: '/src/assets/images/charis_community_empowerment_1791295691785.jpg'
  }
];

export const BOARD_MEMBERS = [
  {
    name: 'Dr. G. W Chike JP',
    role: 'Chairman, Board of Trustees',
    bio: 'Respected leader, philanthropist, and community builder with over 28 years pioneering faith-based benevolence, donor stewardship, and multi-sector alliances across Nigeria.',
    focus: 'Institutional Alliances & Faith Oversight'
  },
  {
    name: 'Dr. Abigail Mojisola Etta-David',
    role: 'Trustee & Editorial Director',
    bio: 'A writer with years of experience as a journalist and editor.',
    focus: 'Communications, Advocacy & Editorial Oversight'
  },
  {
    name: 'Prof. Christopher O. Okeke',
    role: 'Trustee & Agricultural Advisor',
    bio: 'Professor of Agronomy at University of Ibadan, liaising with national research institutes (IITA, NAERLS) to evaluate high-impact agricultural training partners.',
    focus: 'Agritech Partnerships & Rural Vetting'
  },
  {
    name: 'Mrs. Folashade Balogun, FCA',
    role: 'Trustee & Audit Committee Chair',
    bio: 'Fellow of the Institute of Chartered Accountants of Nigeria (ICAN), maintaining gold-standard transparency, direct beneficiary verification, and SCUML compliance.',
    focus: 'Financial Accountability & SCUML Compliance'
  }
];

export const PITCH_DECK_SLIDES: PitchDeckSlide[] = [
  {
    slideNumber: 1,
    title: 'Executive Summary',
    subtitle: 'The Catalytic Sponsorship & Institutional Partnership Model',
    category: 'Strategic Model',
    content: {
      heading: 'Grace to Grow; Skills to Thrive — Sponsoring Vulnerable Potential',
      points: [
        'Strategic Identity: Charis Foundation Nigeria does not burden itself with capital-intensive brick-and-mortar training academies.',
        'Core Operating Model: A catalytic grant-making, sponsorship, and wrap-around support NGO for Nigeria’s needy and vulnerable.',
        'Institutional Partnerships: We forge MOUs with accredited vocational institutes, government agencies (NDE, ITF), and specialized technology/agritech centers.',
        'Holistic Support Ecosystem: 100% Tuition Sponsorship + Daily Commuter/Meal Stipends + Graduation Starter Equipment Toolkits + Micro-Seed Capital.',
        'Scale Target: Scale from 5,700+ sponsored beneficiaries to 25,000 vulnerable Nigerians across all 6 geo-political zones by 2029.'
      ],
      highlight: {
        title: 'Operating Advantage',
        value: 'Zero Overhead Clutter',
        description: 'No costly academy real estate; 88% of donor funds directly purchase sponsorships, toolkits, and student stipends.'
      }
    },
    boardTakeaway: 'By partnering rather than building duplicate schools, Charis achieves 4x faster scale, lower overhead, and access to Nigeria’s top accredited trainers.'
  },
  {
    slideNumber: 2,
    title: 'The Nigerian Vulnerability Context',
    subtitle: 'Why Direct Training Often Fails & Why Sponsorship Works',
    category: 'Problem Statement',
    content: {
      heading: 'The Critical Bottlenecks Facing Vulnerable Nigerians',
      points: [
        'Over 18.5M Out-of-School Youths: The largest unserved youth population in Sub-Saharan Africa facing severe skill deficits.',
        'Underutilized Public Infrastructure: Nigeria already has hundreds of NDE, ITF, and state technical vocational centers with empty seats due to lack of student sponsorship.',
        'The Drop-Out Trap: Vulnerable youths who enrol in skill programs routinely drop out due to hunger, lack of transport fare, or inability to buy tools.',
        'The Equipment Deficit: Training without equipment leaves graduates unable to work. Without a sewing machine, laptop, or seed kit, certification is useless.'
      ],
      highlight: {
        title: 'The Real Barrier',
        value: 'Financial Exclusion',
        description: 'Vulnerable youths do not lack ambition; they lack tuition fees, transport support, and graduation toolkits.'
      }
    },
    boardTakeaway: 'Charis closes the exact gap that keeps people poor: we fund their enrollment in accredited partner centers and hand them the tools to work.'
  },
  {
    slideNumber: 3,
    title: 'The Charis Partnership & Faith Framework',
    subtitle: 'Charis (Greek: χάρις) — Enabling Grace Through Multi-Sector Collaboration',
    category: 'Faith Vision',
    content: {
      heading: 'Kingdom Stewardship Through Strategic Alliance',
      points: [
        'The Power of Association: Just as the early Church pooled resources to meet societal needs (Acts 4:34), Charis unites donors, government institutions, and certified trainers.',
        'Unconditional Compassion: Program sponsorship is awarded strictly on a need basis, welcoming all vulnerable people regardless of ethnic or religious background.',
        'Total-Person Uplift: Beyond technical tuition, Charis pairs every sponsored cohort with moral guidance, pastoral care, and community mentors (1 Peter 4:10).',
        'Fiduciary Integrity: Every sponsored Naira is tied directly to a verified beneficiary attendance sheet and verified equipment procurement.'
      ],
      highlight: {
        title: 'Scriptural Mandate',
        value: '1 Peter 4:10',
        description: '"Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace in its various forms."'
      }
    },
    boardTakeaway: 'Our faith identity drives our passion for the most vulnerable, while our institutional partnership model delivers operational efficiency.'
  },
  {
    slideNumber: 4,
    title: 'The 4 Sponsored Impact Pillars',
    subtitle: 'Demand-Driven Focus Areas Delivered Through Specialized Partners',
    category: 'Programmatic Tracks',
    content: {
      heading: 'Delivered via Government & Accredited Institutional Partners',
      points: [
        '1. Education: Basic school enrollment, remedial WAEC/JAMB sponsorships, and tertiary STEM scholarships.',
        '2. Technology: Certified web development, UI/UX, data analytics bootcamps with developer laptop grants.',
        '3. Agriculture: Practical greenhouse horticulture, solar drip irrigation, poultry & aquaculture with seed/equipment kits.',
        '4. Capacity Building: Vocational fashion construction, solar PV installation, electrical trades via NDE/ITF with industrial starter toolkits.'
      ],
      tableData: {
        headers: ['Pillar', 'Primary Partner Type', 'Charis Sponsorship Package', 'Sustained Livelihood Rate'],
        rows: [
          ['Education', 'Accredited Schools & Centers', '100% Tuition, Books & Exam Fees', '94% Transition'],
          ['Technology', 'NITDA & Certified Bootcamps', 'Full Fellowship, Laptop & Data Stipend', '82% Remote / Local Jobs'],
          ['Agriculture', 'State Ext. & Agritech Hubs', 'Course Fees, Solar Drip & Seed Kits', '89% Farm Revenue'],
          ['Capacity Building', 'NDE, ITF & Technical Guilds', 'Tuition, Daily Lunch, Industrial Toolkits', '91% Enterprise Survival']
        ]
      }
    },
    boardTakeaway: 'Each focus area relies on specialized partner institutions with certified curricula, while Charis supplies the sponsorship and toolkits.'
  },
  {
    slideNumber: 5,
    title: 'The 3-Step Sponsorship & Support Funnel',
    subtitle: 'A Rigorous, Need-Based Delivery Pipeline',
    category: 'Operating Methodology',
    content: {
      heading: 'Identify Need → Sponsor & Partner → Equip & Sustain',
      points: [
        'Step 1: IDENTIFY & VET NEED: Field outreach with community leaders, faith networks, and local councils to identify genuinely vulnerable, out-of-school, or indigent individuals (0% patronage, 100% vulnerability assessment).',
        'Step 2: SPONSOR & PARTNER: Enroll vetted beneficiaries into accredited partner vocational centers, government institutes (NDE/ITF), or tech hubs. Charis pays 100% tuition plus daily commuter/feeding stipends.',
        'Step 3: EQUIP, LAUNCH & MONITOR: Upon graduation, Charis awards certified professional toolkits (industrial sewing machines, developer laptops, solar kits, seed packs) and provides 12-month mentorship & cooperative links.'
      ],
      highlight: {
        title: 'Graduation Retention',
        value: '87.4%',
        description: 'Of sponsored trainees are actively earning an independent livelihood 12 months after graduation.'
      }
    },
    boardTakeaway: 'The magic is not just paying course fees; it is covering commuter stipends during training and providing starter equipment on graduation day.'
  },
  {
    slideNumber: 6,
    title: 'Audited Traction & Partnership Network',
    subtitle: 'Historical Performance & Impact Footprint (2023 – 2026)',
    category: 'Verified Milestones',
    content: {
      heading: 'Proven Outcomes Across Nigerian States',
      points: [
        '5,720+ Vulnerable Individuals Sponsored across FCT Abuja, Kaduna, Nasarawa, and Lagos States.',
        '60+ Institutional Partners: Including NDE centers, state polytechnic vocational wings, and tech academies.',
        '1,490+ Professional Starter Toolkits & Laptops directly purchased and handed to certified graduates.',
        '₦65,000,000+ Disbursed in direct training sponsorships, exam fees, student stipends, and equipment seed grants.'
      ],
      tableData: {
        headers: ['Key Indicator', '2023 Baseline', '2026 Current', 'Multi-Year Growth'],
        rows: [
          ['Beneficiaries Sponsored', '850', '5,720+', '+572%'],
          ['Partner Institutions', '8', '60+', '+650%'],
          ['Toolkits & Laptops Gifted', '120', '1,490', '+1,141%'],
          ['Direct Program Allocation', '82%', '88%', '+600 bps Efficiency']
        ]
      }
    },
    boardTakeaway: 'Our lean institutional partnership model allowed us to multiply our impact by over 500% without acquiring expensive physical liabilities.'
  },
  {
    slideNumber: 7,
    title: 'Fiduciary Governance & Multi-Agency Compliance',
    subtitle: 'Institutional Integrity and Anti-Money Laundering Safeguards',
    category: 'Governance & Auditing',
    content: {
      heading: 'Bankable Compliance for Institutional Donors & Trustees',
      points: [
        'Incorporated Trustee Registration: CAC/IT/NO: 189420 under CAMA, Federal Republic of Nigeria.',
        'SCUML Certified: SC/RN/2023/09418 fully aligned with EFCC, NFIU, and international anti-money laundering frameworks.',
        'Dual-Verification Procurement: Equipment toolkits are purchased through vetted suppliers with direct serial-number assignment to graduates.',
        '88% Direct Program Allocation: Zero corporate luxury; funds flow straight to partner tuition, toolkits, and student stipends.',
        'Annual Independent Audits: Published and filed with statutory authorities and shared openly with board members.'
      ],
      highlight: {
        title: 'Direct Beneficiary Ratio',
        value: '88 kobo / ₦1',
        description: 'Of every Naira received goes directly into tuition sponsorship, equipment grants, and student stipends.'
      }
    },
    boardTakeaway: 'Charis Foundation offers institutional-grade transparency, vetted partner MOUs, and zero-leakage financial controls.'
  },
  {
    slideNumber: 8,
    title: '3-Year Strategic Scaling Roadmap (2026–2029)',
    subtitle: 'Scaling to 25,000 Sponsored Vulnerable Lives Across 6 Zones',
    category: 'Strategic Horizon',
    content: {
      heading: 'Expansion Through Deepened Government & Institutional Alliances',
      points: [
        'Phase 1 (2027): Expand formal bilateral MOUs with National Directorate of Employment (NDE) and ITF across 12 states; onboard 25 new tech academies.',
        'Phase 2 (2028): Launch the "Agri-Vulnerable Seed Fund" in partnership with State Agricultural Development Projects (ADPs) targeting 5,000 rural women.',
        'Phase 3 (2029): Reach 25,000 total sponsored beneficiaries; establish a ₦500M revolving equipment toolkit endowment fund.',
        'Board Action Required: Ratification of 2027 Partnership Expansion Strategy and formal approval of the Institutional Partner Vetting Protocol.'
      ],
      highlight: {
        title: 'Target Horizon',
        value: '25,000 Lives',
        description: 'Vulnerable Nigerians sponsored with certified skills, equipment toolkits, and sustainable livelihood support by 2029.'
      }
    },
    boardTakeaway: 'The Board is requested to ratify this partnership-led expansion plan, empowering Charis to remain the most agile, high-impact sponsorship NGO in Nigeria.'
  }
];

export const PARTNER_LOGOS = [
  { name: 'National Directorate of Employment (NDE)', type: 'Government Skill Partner' },
  { name: 'Industrial Training Fund (ITF)', type: 'Technical Vocational Partner' },
  { name: 'Federal Ministry of Agriculture Extension Hubs', type: 'Agritech Partner' },
  { name: 'NITDA Digital Innovation Centers', type: 'Technology Partner' },
  { name: 'State Technical & Vocational Education Boards', type: 'Education Partner' },
  { name: 'Christian Aid Network West Africa', type: 'Faith Alliance' }
];
