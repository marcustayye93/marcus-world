/*
 * The Journey of Marcus — Game Data
 * Design: Ghibli Pixel Overworld — 8-bit RPG meets Studio Ghibli warmth
 * All content for zones, testimonials, experience, and Easter eggs
 */

export interface Zone {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  bgGradient: string;
  details: ZoneDetail[];
}

export interface ZoneDetail {
  title: string;
  period?: string;
  bullets: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  quote: string;
}

export const ASSET_URLS = {
  overworld: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/overworld-with-ai-v3_fb99d5da.png",
  heroBanner: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/hero-banner-YMBrx9qDKh5f9D6vUa5Rn5.webp",
  metaZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/meta-zone-PkF4uLVE2rTffZCUxrcZEq.webp",
  coffeeZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/coffee-zone-6ACcPwrxrVFNXvv2J37j5h.webp",
  farmZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/farm-zone-nqWu2CgWo7jWD8nc2o2LRv.webp",
  musicZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/music-zone-AcvduB7tx7g4g9p6ZycqL2.webp",
  resumePdf: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/MarcusTay_Resume_126db7e5.pdf",
  bgMusic: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/overworld-bgm_4012e5f3.mp3",
  marcusPortrait: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/marcus-pixel-portrait-9hGUvzbeRPLcFSFbrGmwWx.webp",
  aiZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/ai-zone-building-GfVhEf2JVSkp3uD7acKJqW.webp",
};

// Zone hitbox rectangles (percentage of map dimensions) for character collision
export interface ZoneHitbox {
  x1: number; y1: number; x2: number; y2: number;
}

export const ZONE_HITBOXES: Record<string, ZoneHitbox> = {
  meta:       { x1: 35, y1: 5,  x2: 60, y2: 55 },   // Emerald City — center, huge
  dfs:        { x1: 7,  y1: 15, x2: 23, y2: 42 },   // Tech Co. / DFS — upper left
  music:      { x1: 58, y1: 25, x2: 76, y2: 50 },   // Music Hall — right of center
  university: { x1: 12, y1: 52, x2: 33, y2: 78 },   // University — lower left
  farm:       { x1: 40, y1: 60, x2: 60, y2: 82 },   // Barn — lower center
  coffee:     { x1: 70, y1: 52, x2: 86, y2: 72 },   // Coffee Shop — lower right
  ai:         { x1: 35, y1: 55, x2: 55, y2: 77 },   // AI Native — below Meta HQ
};

// Label positions for each zone on the map (percentage)
export const ZONE_LABEL_POSITIONS: Record<string, { x: number; y: number }> = {
  meta:       { x: 47, y: 55 },
  dfs:        { x: 15, y: 42 },
  music:      { x: 67, y: 50 },
  university: { x: 22, y: 78 },
  farm:       { x: 50, y: 82 },
  coffee:     { x: 78, y: 72 },
  ai:         { x: 44, y: 68 },
};

export const ZONES: Zone[] = [
  {
    id: "meta",
    name: "Meta HQ",
    icon: "💼",
    tagline: "100/100 CSAT (highest in APAC) — scalable onboarding frameworks — 11 measurement studies — US$684K in 32 days",
    description: "Account Manager & Meta Platform Consultant, earning the highest client satisfaction score in APAC while building scalable frameworks, consultative measurement playbooks, and driving measurable growth across Australia & New Zealand.",
    image: ASSET_URLS.metaZone,
    color: "#10B981",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    details: [
      {
        title: "Account Manager & Meta Platform Consultant",
        period: "2024 – Present",
        bullets: [
          "Achieved a perfect 100/100 CSAT score across 76 client responses - the highest volume and highest score in all of APAC, resulting in the 2025 Infinite Potential Award (Client Hero)",
          "Acted as primary strategic advisor on Meta's advertising platform for enterprise clients, guiding measurement strategy, campaign architecture, and audience targeting across ANZ",
          "Built a scalable client onboarding framework that shifted new client revenue pacing from 40% below target to 25% above target - a 65 percentage-point improvement. Templates adopted across ANZ and APAC teams",
          "Co-designed and delivered client onboarding webinars that scaled activation to 160 new accounts in a single quarter",
          "Developed a consultative measurement playbook (Search Lift, Brand Lift, Conversion Lift) applied across 11 studies, proving Meta's incremental value and building evidence-based investment cases for clients",
          "Identified a market-specific opportunity (EOFY in Australia) that a US-based client was unaware of, then built the full promotional strategy and cross-border expansion plan, unlocking US$150K incremental investment in one quarter",
          "Facilitated market expansion tests across 4 new countries for an e-commerce client, resulting in US market entry in 2026",
          "Drove US$684K incremental ad spend for a single client (280% increase in 32 days) and shifted a financial institution's budget from a competitor to Meta (+US$94K)",
          "Managed the top 1% of clients across ANZ, spanning automotive, CPG, healthcare, gaming, media, retail, and travel",
        ],
      },
    ],
  },
  {
    id: "dfs",
    name: "DFS Group",
    icon: "🏢",
    tagline: "4 promotions in 5 years across luxury retail, strategy & global tech",
    description: "A rapid internal promotion journey through DFS Group — spanning beauty, fashion, global strategy, and technology transformation across 6 countries.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/dfs-zone-8bit-7652qEdcsaUAzdPfTozJKN.webp",
    color: "#2E7D32",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    details: [
      {
        title: "IT Project Manager — Global Business Transformation",
        period: "Apr 2022 – 2024",
        bullets: [
          "Orchestrated end-to-end technology rollouts for new retail complexes and airports across 6 countries",
          "Collaborated with CTO & CIO on market entry strategy and risk mitigation",
          "Managed 90+ internal and external client relationships across 16 departments",
          "Delivered weekly performance updates to 16 global departments",
        ],
      },
      {
        title: "Flagship Product Sales Manager — Fashion (Hong Kong)",
        period: "Mar 2021 – Apr 2022",
        bullets: [
          "Directed operations of 8 luxury boutiques within DFS Hong Kong's Flagship store",
          "Orchestrated a remarkable 60% year-on-year surge in brand sales during COVID",
          "Executed 4 exclusive fashion events for VIP clientele, surpassing targets by +205%",
          "Drove revenue +78% through an innovative 'digital shopper' solution",
        ],
      },
      {
        title: "Global Strategy & Business Development (Hong Kong)",
        period: "Mar 2020 – Mar 2021",
        bullets: [
          "Spearheaded store operations in Hainan, China across 13 departments",
          "Conducted strategic analyses across 6 nations for Board-level expansion decisions",
          "Engineered innovative Standard Operating Procedures for store optimization",
        ],
      },
      {
        title: "Product Sales Manager — Beauty (Singapore)",
        period: "Sep 2019 – Mar 2020",
        bullets: [
          "Oversaw a portfolio of 43 brands and led a team of 40+ professionals",
          "Drove growth in sales volume, UPTs, conversion rates across Skincare, Make-up, and Fragrances",
          "Directed business forecasting and goal-setting for the Beauty Department",
        ],
      },
    ],
  },
  {
    id: "music",
    name: "Music Hall",
    icon: "🎵",
    tagline: "From clarinet concertos to DJ sets",
    description: "A multi-instrumentalist who has performed for heads of state, traveled the world with orchestras, and isn't afraid to drop a beat.",
    image: ASSET_URLS.musicZone,
    color: "#B71C1C",
    bgGradient: "from-red-500/10 to-amber-500/10",
    details: [
      {
        title: "Instruments Mastered",
        bullets: [
          "🎹 Piano — the foundation of it all",
          "🎸 Guitar & Bass — for those rock moments",
          "🥁 Drums — keeping the beat alive",
          "🎵 Clarinet — professional orchestra level",
          "🎧 DJ — yes, that too!",
        ],
      },
      {
        title: "Performance Highlights",
        bullets: [
          "Professional orchestra clarinetist with OMM and SWO",
          "Performed for the Prime Minister and Ex-President of Singapore",
          "Played in iconic performance halls across Singapore",
          "Traveled internationally — Budapest, Australia, Singapore",
          "Finalist in 'The Rising Star' music competition",
          "Featured on TV and radio with singer Faridzuan Faris",
        ],
      },
    ],
  },
  {
    id: "coffee",
    name: "Coffee Shop",
    icon: "☕",
    tagline: "Life's too short for bad coffee",
    description: "From launching a college coffee enterprise with 80 baristas to perfecting the art of a dark roast ristretto.",
    image: ASSET_URLS.coffeeZone,
    color: "#5D4037",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    details: [
      {
        title: "The Coffee Enterprise",
        bullets: [
          "Launched Tembusu College's first coffee enterprise",
          "Hired and trained 80 student baristas",
          "Managed end-to-end operations: sourcing beans, pricing, advertising, training",
          "Operated a 5-day sales schedule serving the entire college community",
        ],
      },
      {
        title: "Current Brew",
        bullets: [
          "Daily driver: De'Longhi Evo Magnificano (bean-to-cup perfection)",
          "Favorite drink: A perfectly drawn dark roast ristretto",
          "Philosophy: Great coffee shouldn't require a PhD in manual brewing",
        ],
      },
    ],
  },
  {
    id: "farm",
    name: "Barn",
    icon: "🐄",
    tagline: "70 animals, 2 farms, 1 incredible adventure",
    description: "Shepherding sheep in New Zealand, selling eggs at farmer's markets, and discovering that the best perspective comes from roaming pastures at dawn.",
    image: ASSET_URLS.farmZone,
    color: "#F57F17",
    bgGradient: "from-yellow-500/10 to-green-500/10",
    details: [
      {
        title: "Life on the Farm",
        bullets: [
          "Shepherded a collective of 70 animals across 2 farms in New Zealand",
          "Cared for horses, sheep, cows, and chickens daily",
          "Sold fresh eggs at the local farmer's market",
          "Fed cows at dawn and roamed the pastures with them",
          "Built manual and mechanical infrastructure — electric fences, wooden barges, lamp posts",
          "A completely different life that gave a fresh perspective on everything",
        ],
      },
    ],
  },
  {
    id: "university",
    name: "University",
    icon: "🎓",
    tagline: "Honors with Distinction and global exchange programs",
    description: "From Nanyang Polytechnic to NUS to an exchange in Germany — a journey of academic excellence and global learning.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/university-zone-8bit-7riFBX7BEFz8t2Uin9ZuJu.webp",
    color: "#1565C0",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
    details: [
      {
        title: "National University of Singapore",
        period: "Aug 2015 – Apr 2019",
        bullets: [
          "BSc in Real Estate Management (Urban Planning)",
          "Honors with Distinction",
          "Dean's List — Fall Semester 2017",
        ],
      },
      {
        title: "European Business School — Germany",
        period: "Aug 2017 – Dec 2017",
        bullets: [
          "Student Exchange Program",
          "Master's Program in EBS Real Estate Management Institute",
        ],
      },
      {
        title: "Nanyang Polytechnic - Singapore",
        period: "Apr 2010 - Feb 2013",
        bullets: [
          "Diploma in Banking and Financial Services",
        ],
      },
    ],
  },
  {
    id: "ai",
    name: "AI Native",
    icon: "\uD83E\uDD16",
    tagline: "26 AI platforms, 1,799 AI actions per day, 95th percentile company-wide",
    description: "Systematically integrated AI across every function of my role until it became default workflow. Passionate about helping others adopt AI practically - from building the workflows to teaching the skeptics.",
    image: ASSET_URLS.aiZone,
    color: "#00C853",
    bgGradient: "from-green-500/10 to-cyan-500/10",
    details: [
      {
        title: "AI Integration & Adoption",
        bullets: [
          "Operated across 26 AI platforms spanning 6 business functions (CRM, analytics, productivity, code, knowledge retrieval, task automation), consistently matching the right tool to each problem rather than relying on a single general-purpose assistant",
          "Ranked in the 95th percentile company-wide for AI usage intensity, with an average of 1,799 AI-assisted actions per day fully embedded into core workflows",
          "Built and deployed autonomous AI agents that orchestrate complex, multi-step operations (data pulls, CRM updates, scheduling, report generation) without manual intervention at each stage",
          "Adopted 12 new AI tools within a single month, rapidly evaluating, testing, and integrating emerging capabilities as they became available",
          "Automated the full sales operations layer (pipeline management, client research, meeting prep, analytics, task routing) through purpose-built AI workflows, eliminating repetitive manual processes",
          "Exceeded the 90th percentile in tool diversity and usage frequency across all peers in the same job profile, demonstrating breadth and depth rather than surface-level experimentation",
        ],
      },
    ],
  },
];

// Proof artifacts — standout metric callouts per zone
export const ZONE_PROOF_METRICS: Record<string, Array<{ value: string; label: string; icon: string }>> = {
  meta: [
    { value: "100/100", label: "CSAT — highest volume & score in APAC", icon: "⭐" },
    { value: "65pp", label: "Revenue pacing improvement via onboarding framework", icon: "📈" },
    { value: "US$684K", label: "Incremental spend driven in 32 days", icon: "💰" },
  ],
  dfs: [
    { value: "4 Promotions", label: "In 5 years across 6 countries", icon: "\uD83D\uDE80" },
    { value: "+205%", label: "VIP event targets exceeded", icon: "\uD83C\uDFAF" },
    { value: "90+", label: "Stakeholders managed globally", icon: "\uD83C\uDF10" },
  ],
  ai: [
    { value: "1,799", label: "AI-assisted actions per day", icon: "\u26A1" },
    { value: "95th %ile", label: "Company-wide AI usage intensity", icon: "\uD83C\uDFC6" },
    { value: "26", label: "AI platforms across 6 functions", icon: "\uD83E\uDD16" },
  ],
  music: [
    { value: "5", label: "Instruments mastered", icon: "\uD83C\uDFB5" },
    { value: "PM & President", label: "Performed for heads of state", icon: "\uD83C\uDFAD" },
  ],
  farm: [
    { value: "70", label: "Animals cared for across 2 farms", icon: "\uD83D\uDC04" },
  ],
  coffee: [
    { value: "80", label: "Student baristas hired & trained", icon: "\u2615" },
  ],
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Robert Fazekas",
    title: "Client, SkyCity Entertainment",
    company: "New Zealand",
    quote: "Marcus has been really helpful to making sure we succeed on Meta's platform. He doesn't sit back and wait for us - he's been very proactive at suggesting new tools and approaches to help us achieve our business goals. His demeanour was always a positive and friendly one which made meetings more enjoyable. I believe he's a real asset to your team.",
  },
  {
    name: "Tobias Hall",
    title: "Tour Marketing and Admin Coordinator",
    company: "DRW Entertainment, Australia",
    quote: "You have been by far one of, if not THE, most attentive Meta rep that we've had the pleasure of working with.",
  },
  {
    name: "Lisa Francazio",
    title: "Group Manager, Channel Planning",
    company: "Visit Victoria, Australia",
    quote: "You're a fabulous account manager (best we've had at Meta).",
  },
  {
    name: "Robert Calzadilla",
    title: "President (North Asia)",
    company: "Louis Vuitton",
    quote: "Marcus is an exceptionally talented young executive with immense growth potential to accomplish greatness. Smart, driven, naturally curious beyond the obvious and able to build sincere and authentic relationships through his engaging and honest personality. A truly rare talent!",
  },
  {
    name: "Meenal Kumar",
    title: "Business Development Director",
    company: "DFS Group",
    quote: "Marcus is kind, authentic, creative, reliable and extremely driven. He fully immersed himself in the team culture and mission, and his positive can-do attitude, joy and tenacity made him an invaluable contributor. I believe Marcus can do anything he puts his mind to.",
  },
  {
    name: "Monique Cheung",
    title: "Senior Manager (Assortment Planning)",
    company: "Adidas",
    quote: "Marcus is very caring and passionate. Thanks to his attention to detail, he's quick to spot business opportunities and come up with creative ideas. He's not afraid to try new challenges... Marcus would be an asset to any team.",
  },
  {
    name: "Irsyad Ramthan",
    title: "Product Manager",
    company: "AgriG8",
    quote: "If you're reading this, know that you could not ask for a harder worker than Marcus in whichever organization he chooses to go to in the future.",
  },
];

export const ABOUT_ME = {
  motto: "The best things happen when you stay curious enough to say yes and committed enough to see it through.",
  threeWords: ["Radiant", "Relentless", "Curious"],
  mensa: "Member of Mensa Singapore — a lifelong love of learning and problem-solving",
  humanitarian: "Individually travelled to Yun Nan, China for earthquake and disaster relief for 5 weeks. Visited leprosy villages and burned victims. Interviewed by 7 Chinese newspapers and a local radio station.",
  sustainability: "Secured over USD $280,000 in funding for Young Sustainable Impact SEA. Orchestrated zero-waste Demo Days engaging 700+ investors.",
  cooking: "Currently perfecting the art of homemade ramen and pizza — making simple recipes beautiful.",
};

export const EASTER_EGGS = {
  konami: "↑↑↓↓←→←→BA",
  coffeeClick: "Click the coffee cup 5 times for a surprise!",
  farmSounds: ["🐄 Moo!", "🐑 Baa!", "🐔 Cluck cluck!", "🐴 Neigh!"],
  musicNotes: ["♪", "♫", "♬", "♩", "♭", "♮"],
  punnyDialogues: [
    "Welcome! Click on any building to explore a chapter of Marcus's journey!",
    "Marcus once performed clarinet for Singapore's Prime Minister. No pressure, right?",
    "He once got robbed in Marrakech, but talked his way out by befriending the robbers. Only Marcus.",
    "He's a massive Conan O'Brien fan. The string dance gets him every time.",
    "See that grand Emerald City in the center? Click it to explore Marcus's time at Meta!",
    "He once stayed in a haunted house in rural China during an earthquake relief mission. Slept fine, apparently.",
    "He's been trying to learn the accordion for years. It has never, ever stuck.",
    "He's lived in Hong Kong, Germany, Finland, and Singapore. Collecting countries like stamps.",
    "Want a quick snapshot of the full resume? Hit the Resume button up top!",
    "He shepherded 70 animals across 2 farms in New Zealand. Yes, including the stubborn ones.",
    "He used to rock long curly hair down to his shoulders. A whole different era.",
    "He launched a coffee enterprise with 80 student baristas. Caffeine was never in short supply.",
    "Click Connect if you'd like to reach out. Marcus is always happy to chat over coffee.",
    "Biggest John Mayer fan you'll ever meet. Gravity is what made him pick up the guitar.",
    "He knows every line from every episode of The Office (US). Pub quiz? Bring it on.",
    "He plays 5 instruments and used to DJ. The man does not sit still.",
    "Check out Testimonials to hear what colleagues and managers have to say!",
    "He's trying to pick up running, but failing spectacularly at it. Half marathon dream lives on.",
    "He speaks three languages: English, Chinese/Mandarin, and Cantonese. Useful at dim sum.",
    "He spent 5 weeks in Yun Nan, China doing earthquake disaster relief. Not your average gap year.",
    "The Music Hall on the right has some surprises. Give it a click!",
  ],
};
