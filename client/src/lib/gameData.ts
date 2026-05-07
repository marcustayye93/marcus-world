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
  overworld: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/overworld-v4-no-title_1c5ef7ac.png",
  heroBanner: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/hero-banner-YMBrx9qDKh5f9D6vUa5Rn5.webp",
  metaZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/meta-zone-PkF4uLVE2rTffZCUxrcZEq.webp",
  coffeeZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/coffee-zone-6ACcPwrxrVFNXvv2J37j5h.webp",
  farmZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/farm-zone-nqWu2CgWo7jWD8nc2o2LRv.webp",
  musicZone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/music-zone-AcvduB7tx7g4g9p6ZycqL2.webp",
  resumePdf: "https://d2xsxph8kpxj0f.cloudfront.net/310519663320869327/6ybe28EnqpiBRaiiogZ2qt/MarcusTayResume_b2b2b87a.pdf",
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
  ai:         { x1: 35, y1: 55, x2: 60, y2: 78 },   // AI Native — below Meta HQ
};

// Label positions for each zone on the map (percentage)
export const ZONE_LABEL_POSITIONS: Record<string, { x: number; y: number }> = {
  meta:       { x: 47, y: 55 },
  dfs:        { x: 15, y: 42 },
  music:      { x: 67, y: 50 },
  university: { x: 22, y: 78 },
  farm:       { x: 50, y: 82 },
  coffee:     { x: 78, y: 72 },
  ai:         { x: 47, y: 78 },
};

export const ZONES: Zone[] = [
  {
    id: "meta",
    name: "Meta HQ",
    icon: "💼",
    tagline: "US$684K incremental spend in 32 days — highest CSAT in APAC",
    description: "Account Manager at Meta, driving measurable client growth across Australia & New Zealand through strategic partnerships, budget optimization, and market expansion.",
    image: ASSET_URLS.metaZone,
    color: "#10B981",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    details: [
      {
        title: "Account Manager — Meta",
        period: "2024 – Present",
        bullets: [
          "Managing the top 1% of clients across Australia & New Zealand, with hands-on experience across 17 verticals including automotive, CPG, financial services, healthcare, gaming, media, retail, and travel",
          "Drove US$684K incremental ad spend for a single client, a 280% multiplication of sustained revenue, through strategic testing and KPI validation in just 32 days",
          "Awarded 2025 Infinite Potential Award for Client Hero, with the highest client satisfaction score in APAC (100/100)",
          "Far surpassed sales targets for 4 consecutive quarters, consistently overachieving across all performance metrics",
          "Facilitated market expansion tests across 4 new countries for an e-commerce client, leading to US market entry in 2026",
          "Shifted a major financial institution's digital budget from a major competitor to Meta, unlocking US$94K incremental spend through competitive repositioning",
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
        title: "Nanyang Polytechnic \u2014 Singapore",
        period: "Apr 2010 \u2013 Feb 2013",
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
    tagline: "26 AI platforms, 609 peers outpaced, daily AI-first workflows",
    description: "Systematically integrated AI across every function of my role, selecting the right tool for each task and embedding it into daily operations until it became default workflow rather than occasional experiment.",
    image: ASSET_URLS.aiZone,
    color: "#00C853",
    bgGradient: "from-green-500/10 to-cyan-500/10",
    details: [
      {
        title: "AI Integration & Adoption",
        bullets: [
          "Integrated AI tools across 6 distinct business functions (CRM, analytics, productivity, code development, knowledge retrieval, and task automation), embedding AI into daily sales workflows rather than treating it as a standalone experiment",
          "Consistently applied AI to core Account Management responsibilities every working day for 30+ consecutive days, demonstrating habitual rather than experimental adoption",
          "Operated across 26 distinct AI platforms simultaneously, identifying and matching the right AI tool to each business task rather than relying on a single general-purpose assistant",
          "Outpaced 609 peers in AI adoption breadth and session volume, ranking above the 90th percentile in both tool diversity and practical usage frequency",
          "Built and maintained AI-assisted automations for CRM management, calendar scheduling, data analytics, and agentic task execution, reducing manual effort across the full sales cycle",
          "Deployed autonomous AI agents (agentic workflows) for multi-step task completion, going beyond simple prompt-response interactions to orchestrate complex, chained operations",
        ],
      },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
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
