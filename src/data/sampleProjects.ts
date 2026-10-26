import type { ResearchProject } from '../types';

export const SAMPLE_STUDENT_TIFFIN: ResearchProject = {
  id: 'proj-kanpur-tiffin-01',
  title: 'Student Tiffin Service — Kanpur',
  createdAt: '2026-10-24T14:30:00Z',
  isDemonstration: true,
  input: {
    businessIdea:
      'Hygienic, affordable home-style daily meal subscription for university students and PG residents with WhatsApp-based pause/cancel flexibility.',
    industry: 'Food services',
    targetCustomer: 'College students living in hostels and PG accommodation',
    targetGeography: 'Kanpur, Uttar Pradesh, India',
    researchObjective: 'Identify market opportunities',
    businessStage: 'Exploring an idea',
    budgetInr: '50000',
    notes: 'Initial focus on student clusters near Kalyanpur, Kakadeo, and Rawatpur.',
  },
  marketOverview: {
    researchQuestion:
      'How can a student-targeted meal subscription model deliver consistent quality and affordability within a ₹50,000 initial bootstrap budget in Kanpur?',
    targetMarket:
      'Higher education student food services market in Kanpur urban agglomeration (estimated ~60,000+ outstation students across coaching hubs & universities).',
    targetCustomers:
      'UG & PG students residing in non-mess hostels, private PGs, and shared rental flats in Kalyanpur (IIT vicinity), Kakadeo (coaching hub), and Rawatpur.',
    relevantConsiderations: [
      'Price sensitivity is high; monthly student food budget typically ranges from ₹2,500 to ₹4,500.',
      'Students frequently skip meals or travel home on weekends, demanding zero-penalty meal pause mechanisms.',
      'Hygiene and digestion issues (stomach upsets) from unorganized dhabas are the primary churn driver.',
      'Hyperlocal delivery clustering is essential to keep logistics costs under ₹8–₹12 per tiffin.',
      'Regulatory compliance: FSSAI basic registration is mandatory even for home kitchens bootstrapped under ₹12 Lakhs turnover.'
    ],
    knownInformation: [
      'High density of student clusters in Kalyanpur, Kakadeo, and Sharda Nagar.',
      'Hostel messes charge fixed monthly fees (₹2,800–₹3,800) but experience high weekend absenteeism and constant complaints regarding menu repetition.',
      'On-demand aggregators (Swiggy/Zomato) are perceived as too expensive for everyday lunch/dinner (₹140+ per meal minimum).'
    ],
    missingInformation: [
      'Exact student willingness-to-pay for insulated vs. standard disposable meal containers.',
      'Real-world delivery failure rate during peak monsoon or winter fog conditions in Kanpur transit corridors.',
      'Retention curve past month two without aggressive promotional discounts.'
    ],
    researchCoverage: {
      marketSizeConfidence: 'Low (Sample Data)',
      competitorDensity: 'High',
      customerClarityScore: 78,
      dataFreshness: 'October 2026 (Demonstration Scenario)'
    }
  },
  competitors: [
    {
      id: 'comp-1',
      name: 'Local Kakadeo Tiffin Dhabas (Unorganized)',
      type: 'Direct',
      serviceOffering: 'Steel dabba lunch/dinner delivery to hostels twice daily.',
      customerSegment: 'Coaching students (NEET/JEE aspirants) on tight budgets.',
      pricingEstimate: '₹2,200 – ₹2,700 / month (approx ₹40–₹45/meal)',
      strengths: [
        'Extremely low price point',
        'Longstanding relationships with PG wardens',
        'Cash-on-delivery and month-end credit leniency'
      ],
      weaknesses: [
        'High oil/spice content leading to frequent health complaints',
        'Zero meal pause flexibility (missed meals are forfeit)',
        'Monotonous rotating menu with low protein variety'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'Rock-bottom cost and PG warden distribution lock-in',
      channels: ['Word of mouth', 'PG bulletin boards', 'Warden referrals']
    },
    {
      id: 'comp-2',
      name: 'Hostel Institutional Mess Contractors',
      type: 'Direct',
      serviceOffering: 'In-house buffet style 3 meals/day included in hostel rent.',
      customerSegment: 'Hostelers with mandatory mess subscription.',
      pricingEstimate: '₹3,000 – ₹3,600 / month built into hostel fees',
      strengths: [
        'Zero delivery delay risk (served on-premise)',
        'Guaranteed customer captive base',
        'Unlimited roti/rice portions'
      ],
      weaknesses: [
        'Students often describe the food as bland and uninspired',
        'Strict serving time windows (miss if late from coaching)',
        'Cannot opt out easily without forfeiting deposit'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'Physical convenience and contractual lock-in',
      channels: ['Hostel administration contracts']
    },
    {
      id: 'comp-3',
      name: 'Swiggy / Zomato Budget Cloud Kitchens',
      type: 'Indirect',
      serviceOffering: 'On-demand individual meal combos (Thalis, Bowls) via delivery app.',
      customerSegment: 'Affluent students ordering 2–3 times a week as an escape from mess food.',
      pricingEstimate: '₹120 – ₹190 per order (including packaging & delivery fees)',
      strengths: [
        'High cuisine variety and top-tier consumer packaging',
        'Real-time GPS delivery tracking',
        'Instant digital payments and coupons'
      ],
      weaknesses: [
        'Not financially viable for daily recurring nutrition (₹7,000+/mo)',
        'Long delivery wait times (35–50 mins during rain/peak)',
        'Irregular portion sizing depending on restaurant'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'Variety and on-demand app convenience',
      channels: ['Mobile application storefronts', 'Social media ads']
    },
    {
      id: 'comp-4',
      name: 'Independent Home Cooks (Aunty Tiffins)',
      type: 'Alternative',
      serviceOffering: 'Small-batch home cooked dabbas (5–15 customers max per household).',
      customerSegment: 'Students prioritizing taste, home hygiene, and motherly care.',
      pricingEstimate: '₹3,200 – ₹4,000 / month',
      strengths: [
        'Authentic home taste with low oil and fresh spices',
        'High trust in food hygiene and clean preparation',
        'Personal customization for spice or salt preferences'
      ],
      weaknesses: [
        'Very limited scale capacity (cannot take more than ~15 students)',
        'Frequently stops service during family events or illnesses',
        'Inconsistent delivery logistics handled by family members'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'Personal warmth, high hygiene trust, genuine home recipe',
      channels: ['Local neighborhood WhatsApp groups', 'Personal referrals']
    }
  ],
  customerPreferences: [
    {
      id: 'pref-1',
      category: 'Critical Need',
      title: 'Light, non-greasy food for daily sustained digestion',
      description:
        'Students report feeling sluggish and experiencing chronic acid reflux when consuming heavy dhaba food every day during study marathons.',
      frequencyScore: 'High',
      evidenceStatus: 'Demonstration Sample',
      suggestedAction: 'Standardize on cold-pressed or minimal mustard/sunflower oil with green vegetable rotations.'
    },
    {
      id: 'pref-2',
      category: 'Pain Point',
      title: 'Wasted money due to strict or nonexistent pause policies',
      description:
        'Hostel students travel home or eat outside on weekends; paying for missed meals generates sharp resentment against current providers.',
      frequencyScore: 'High',
      evidenceStatus: 'Demonstration Sample',
      suggestedAction: 'Implement an automated 1-click WhatsApp meal pause before 9:00 AM / 5:00 PM with wallet credits rollover.'
    },
    {
      id: 'pref-3',
      category: 'Desired Feature',
      title: 'Reliable delivery timing matching class schedules',
      description:
        'Food arriving late (e.g., 2:30 PM instead of 1:15 PM) ruins afternoon coaching sessions. Precision is valued over speed.',
      frequencyScore: 'High',
      evidenceStatus: 'Demonstration Sample',
      suggestedAction: 'Batch deliveries by PG cluster with committed 30-minute delivery time windows (1:00 PM - 1:30 PM).'
    },
    {
      id: 'pref-4',
      category: 'Purchasing Barrier',
      title: 'Fear of committing upfront to a 30-day unverified plan',
      description:
        'Students have been burned by tiffins that taste good for 3 days and degrade rapidly once full monthly fees are paid.',
      frequencyScore: 'High',
      evidenceStatus: 'Demonstration Sample',
      suggestedAction: 'Introduce a 3-day paid trial pack (₹199) and a 10-meal flexible digital token punch card.'
    },
    {
      id: 'pref-5',
      category: 'Desired Feature',
      title: 'Sunday special / cheat meal upgrade option',
      description:
        'Students crave special meals (Paneer butter masala, Chicken biryani, or Chole bhature) on weekends to break routine.',
      frequencyScore: 'Medium',
      evidenceStatus: 'Demonstration Sample',
      suggestedAction: 'Offer an optional Sunday premium add-on (+₹40–₹60) to boost average revenue per user (ARPU).'
    }
  ],
  opportunities: [
    {
      id: 'opp-1',
      title: 'Flexible WhatsApp-First 15-Meal Micro-Pass',
      description:
        'Instead of rigid 30-day contracts, offer a 15-meal digital token pass with instant WhatsApp pause buttons. Eliminates upfront risk and captures weekend absentees.',
      targetCustomer: 'Coaching aspirants and university students with fluctuating study schedules.',
      supportingObservations: [
        'Over 70% of students surveyed express frustration over paying for unconsumed meals during exams or weekend visits home.',
        'Low switching barrier allows fast initial customer acquisition in PG clusters.'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyAssumptions: [
        'Predictable forecasting can still be managed with an 8-hour cutoff notification.',
        'Unit economics remain profitable with 15-meal passes priced at ₹850–₹950.'
      ],
      primaryRisks: [
        'Sudden mass meal pauses on rainy days could leave raw ingredient spoilage.',
        'WhatsApp bot API or manual messaging overhead if not automated.'
      ],
      recommendedValidationExperiment:
        'Run a manual WhatsApp pilot with 15 students in Kakadeo using Google Forms/UPI for 14 days before coding software.',
      estimatedComplexity: 'Low',
      potentialValue: 'High'
    },
    {
      id: 'opp-2',
      title: 'Cluster-Based Hostel Drop Hubs (Zero Delivery Fee)',
      description:
        'Partner with PG security guards or reception desks as designated delivery drop lockers. Driver drops 10–20 tiffins in a single stop, slashing delivery time and fuel costs.',
      targetCustomer: 'Hostels with 50+ students in Kalyanpur and Kakadeo.',
      supportingObservations: [
        'Doorstep room-to-room delivery takes 8 minutes per order; drop point takes 3 minutes for 15 orders.',
        'PG security guards are open to small monthly stipends (₹500/mo) to supervise organized drop tables.'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyAssumptions: [
        'Students will walk down to the hostel reception/gate within a 15-minute window.',
        'Thermal insulated crates maintain serving temperature above 55°C.'
      ],
      primaryRisks: [
        'Mix-ups or meal tampering if packaging labels are unclear.',
        'Warden resistance if hostel operates an internal captive mess.'
      ],
      recommendedValidationExperiment:
        'Negotiate one drop agreement with a private hostel warden in Kalyanpur for 10 pilot subscribers.',
      estimatedComplexity: 'Medium',
      potentialValue: 'High'
    },
    {
      id: 'opp-3',
      title: 'Nutrition-Focused "Exam Sprint" Meal Plan',
      description:
        'Curated light, antioxidant-rich menu with walnuts, curd, seasonal greens, and sprouts designed to maintain alertness during test preparation months (Jan–May).',
      targetCustomer: 'Serious NEET/JEE aspirants at coaching institutes.',
      supportingObservations: [
        'Coaching students frequently cite post-lunch drowsiness from heavy oil/carbs as a major productivity killer.',
        'Parents are willing to sponsor healthier nutrition if branded around academic stamina.'
      ],
      evidenceStatus: 'Preliminary Hypothesis',
      keyAssumptions: [
        'Students/parents will pay a 20% premium (₹3,200/mo vs ₹2,500/mo) for clear wellness benefits.',
        'Ingredient sourcing costs for sprouts/curd remain manageable in local Kanpur mandis.'
      ],
      primaryRisks: [
        'If portions feel small or taste is too bland, students might return to spicy dhabas.',
        'Seasonal vegetable price spikes in summer.'
      ],
      recommendedValidationExperiment:
        'Pitch a 7-day "Clean Energy Exam Tiffin" sample flyer in Kakadeo library reading rooms and track preorder signups.',
      estimatedComplexity: 'Low',
      potentialValue: 'Moderate'
    }
  ],
  validationLab: [
    {
      id: 'val-1',
      hypothesis:
        'At least 6 out of 10 students will switch from their current unorganized dhaba if given a 3-day trial and a zero-penalty pause policy at ₹55/meal.',
      interviewQuestions: [
        'How many days in the past month did you skip or abandon your mess/dhaba meal?',
        'What happened to the money you already paid for those skipped days?',
        'If you could pause your meal by sending a WhatsApp message by 9 AM, how much would that influence your choice?'
      ],
      suggestedExperiment:
        'Pre-sell 20 "Flexi-3 Day Trial Passes" (₹165 for 3 meals) using paper vouchers or WhatsApp catalog in one specific coaching hostel.',
      successMetric:
        'At least 12 paid trial signups within 48 hours and a minimum 60% conversion to a 15-meal pass.',
      nextSteps: [
        'Print 50 simple flyers with WhatsApp QR code',
        'Secure 1 pilot home kitchen cook for trial batch',
        'Track feedback using a 3-question survey card inside each tiffin box'
      ],
      status: 'In Progress'
    },
    {
      id: 'val-2',
      hypothesis:
        'Thermal insulated multi-compartment containers can retain food heat for 75 minutes without leaks during 5 km two-wheeler delivery.',
      interviewQuestions: [
        'How often does your delivered food arrive lukewarm or with spilled dal?',
        'Do you have microwave access in your PG or hostel room?'
      ],
      suggestedExperiment:
        'Test 5 different container prototypes on a 45-minute road test through Kalyanpur traffic; measure core food temperature with digital thermometer.',
      successMetric:
        'Zero leaks and food temperature above 55°C after 75 minutes of ambient transit.',
      nextSteps: [
        'Purchase 3 samples each of CPET, foil trays, and reusable stainless steel dabbas',
        'Test hot dal and curry transit on scooter',
        'Record cost per packaging unit vs. washability'
      ],
      status: 'Pending Test'
    },
    {
      id: 'val-3',
      hypothesis:
        'PG wardens will permit external tiffin drop tables at entrance lobbies in exchange for a ₹500 monthly utility contribution.',
      interviewQuestions: [
        'What are your main concerns regarding external delivery agents entering the hostel premises?',
        'Would a designated sanitized drop table at reception solve your security issues?'
      ],
      suggestedExperiment:
        'Interview 6 private PG owners/wardens in Kakadeo and propose a structured delivery drop protocol with verified delivery badges.',
      successMetric:
        'At least 4 wardens agree to a 14-day trial without demanding aggressive commission cuts.',
      nextSteps: [
        'Draft a 1-page warden safety protocol document',
        'Visit 6 hostels during morning administrative hours',
        'Document specific warden objections and insurance concerns'
      ],
      status: 'Pending Test'
    }
  ],
  userInterviewNotes: [
    'Student interview 1 (Aman, JEE dropper at Kakadeo): "I skip mess dinner at least 2 nights a week because the dal is basically yellow water. If someone gave me a pause button I would save ₹600 every month."',
    'Student interview 2 (Priya, HBTI 2nd year): "Hygiene is my biggest concern. My friend got typhoid from the local dhaba last semester. I want to see photos of where the food is actually cooked."',
    'PG Warden interview (Rawatpur PG): "We do not allow delivery boys inside hostel corridors after 8 PM due to security. A drop table at the reception desk is fine as long as there is no garbage left behind."'
  ]
};

export const SAMPLE_ECOPACK_PUNE: ResearchProject = {
  id: 'proj-pune-ecopack-02',
  title: 'EcoCup — Biodegradable Chai Kulhads for College Canteens',
  createdAt: '2026-10-25T11:15:00Z',
  isDemonstration: true,
  input: {
    businessIdea:
      'Low-cost biodegradable terracotta-look pressed clay/bagasse cups for high-volume tea stalls and college canteens replacing single-use plastic cups.',
    industry: 'Sustainable Packaging',
    targetCustomer: 'College canteen operators and tea stall vendors near university campuses',
    targetGeography: 'Pune, Maharashtra, India',
    researchObjective: 'Analyze customer preferences',
    businessStage: 'Problem-solution validation',
    budgetInr: '80000',
    notes: 'Focus on Fergusson College road and Hinjewadi IT park vendors.',
  },
  marketOverview: {
    researchQuestion:
      'Can pressed bagasse or terracotta-blend cups achieve a unit cost under ₹1.10 while satisfying canteen vendor hygiene requirements in Pune?',
    targetMarket:
      'Daily beverage takeaway packaging market across 45+ colleges and universities in Pune municipal area.',
    targetCustomers:
      'Campus canteen managers, tapri tea stall vendors, and university cafe concessionaires.',
    relevantConsiderations: [
      'Maharashtra municipal plastic ban enforcement is intermittent but creates periodic fine anxieties for vendors.',
      'Paper cups coated with low-grade polyethylene (PE) are widely used (₹0.50–₹0.70/unit) despite being non-recyclable.',
      'Vendors will not adopt eco-friendly alternatives if unit cost exceeds ₹1.25 unless student customers demand it.'
    ],
    knownInformation: [
      'Over 200,000 hot beverages consumed daily in Pune academic clusters.',
      'Vendors experience cup leakage complaints with cheap paper alternatives when tea is boiling hot.'
    ],
    missingInformation: [
      'Willingness of vendors to pass a ₹1 surcharge to students for an eco-cup experience.',
      'Local manufacturing capability for high-speed clay pressing vs bagasse molding.'
    ],
    researchCoverage: {
      marketSizeConfidence: 'Low (Sample Data)',
      competitorDensity: 'Medium',
      customerClarityScore: 65,
      dataFreshness: 'October 2026 (Demonstration Scenario)'
    }
  },
  competitors: [
    {
      id: 'eco-comp-1',
      name: 'Standard PE-Coated Paper Cup Wholesalers',
      type: 'Direct',
      serviceOffering: 'Bulk 100ml / 150ml disposable paper cups.',
      customerSegment: 'General street food vendors and tea tapris.',
      pricingEstimate: '₹0.55 – ₹0.75 per cup in cartons of 1,000',
      strengths: ['Massively available in every wholesale market', 'Very low unit price', 'Consistent stackability'],
      weaknesses: ['Microplastic leaching when exposed to boiling chai', 'Difficult to recycle', 'Subject to municipal raids'],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'Lowest cost commodity supply',
      channels: ['Local wholesale packaging distributors (Raviwar Peth)']
    },
    {
      id: 'eco-comp-2',
      name: 'Artisanal Terracotta Kulhad Potters',
      type: 'Alternative',
      serviceOffering: 'Handcrafted traditional unglazed clay cups.',
      customerSegment: 'Specialty tea cafes and heritage restaurants.',
      pricingEstimate: '₹2.50 – ₹4.00 per kulhad',
      strengths: ['Aesthetic aroma and authentic cultural appeal', '100% natural and compostable'],
      weaknesses: ['High breakage rate in shipping (15–20%)', 'Cost too high for ₹10 chai', 'Bulky storage requirements'],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'Authentic earthy aroma and premium novelty',
      channels: ['Direct potter cluster supply']
    }
  ],
  customerPreferences: [
    {
      id: 'eco-pref-1',
      category: 'Critical Need',
      title: 'Heat resistance and zero rim softening during pour',
      description: 'Chai vendors pour tea at near-boiling temperatures; if the cup rim becomes soggy, it burns customer fingers.',
      frequencyScore: 'High',
      evidenceStatus: 'Demonstration Sample',
      suggestedAction: 'Double-crimped rim design with natural wax lining certified food-grade.'
    },
    {
      id: 'eco-pref-2',
      category: 'Purchasing Barrier',
      title: 'Gross margin impact on a ₹10 cutting chai',
      description: 'Tea vendors operate on thin margins (₹3–₹4 profit per cup); spending ₹1.50 on packaging wipes out 40% of their net profit.',
      frequencyScore: 'High',
      evidenceStatus: 'Demonstration Sample',
      suggestedAction: 'Form cooperative buying clubs for canteens to purchase in bulk lots of 50,000 to drop price to ₹0.90.'
    }
  ],
  opportunities: [
    {
      id: 'eco-opp-1',
      title: 'Sponsored "Green Campus" Cups with Local Brand Ads',
      description:
        'Subsidize cup manufacturing cost by printing educational test-prep or student discount brand ads on the cup exterior, lowering vendor price to ₹0.40.',
      targetCustomer: 'Campus tea stalls and student canteens.',
      supportingObservations: [
        'Students hold a tea cup for 8–12 minutes while conversing; extraordinary brand impressions per cup.'
      ],
      evidenceStatus: 'Preliminary Hypothesis',
      keyAssumptions: ['EdTech brands and local hostels will pay ₹0.60 per printed impression to reach college students.'],
      primaryRisks: ['Food-grade ink certification and print drying smell.'],
      recommendedValidationExperiment: 'Print 1,000 branded test cups with a local hostel QR code; place in 2 canteens and measure scan rates.',
      estimatedComplexity: 'Medium',
      potentialValue: 'High'
    }
  ],
  validationLab: [
    {
      id: 'eco-val-1',
      hypothesis: 'Campus canteen operators will adopt eco-cups at ₹0.85 if subsidized by campus sponsor ads.',
      interviewQuestions: ['Would you accept pre-printed student service ads on cups if your cup cost dropped below current paper cup rates?'],
      suggestedExperiment: 'Show mockups to 5 canteen managers in Pune and obtain written letters of interest.',
      successMetric: '3 out of 5 managers agree to place test order.',
      nextSteps: ['Prepare prototype sample set', 'Contact 3 local coaching institutes for ad interest'],
      status: 'Pending Test'
    }
  ]
};

export const INITIAL_PROJECTS: ResearchProject[] = [
  SAMPLE_STUDENT_TIFFIN,
  SAMPLE_ECOPACK_PUNE
];
