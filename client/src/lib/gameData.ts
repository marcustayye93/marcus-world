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
};

// Label positions for each zone on the map (percentage)
export const ZONE_LABEL_POSITIONS: Record<string, { x: number; y: number }> = {
  meta:       { x: 47, y: 55 },
  dfs:        { x: 15, y: 42 },
  music:      { x: 67, y: 50 },
  university: { x: 22, y: 78 },
  farm:       { x: 50, y: 82 },
  coffee:     { x: 78, y: 72 },
};

export const ZONES: Zone[] = [
  {
    id: "meta",
    name: "Meta HQ",
    icon: "💼",
    tagline: "Scaling businesses across 25+ verticals in Australia & New Zealand",
    description: "Account Manager at Meta, scaling businesses and achieving unbelievable returns on ad spend across 25+ business verticals.",
    image: ASSET_URLS.metaZone,
    color: "#10B981",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    details: [
      {
        title: "Account Manager — Meta",
        period: "2024 – Present",
        bullets: [
          "Managing the top 1% of clients across Australia and New Zealand",
          "Portfolio spanning 25+ business verticals — from healthcare to top e-commerce brands",
          "Scaled an e-commerce brand from $8K/day to $50K/day in ad spend while achieving 3x ROAS",
          "Consistently scaling businesses 10x while maintaining impressive return on ad spend",
          "Transitioned from managing internal stakeholders to solely external client relationships",
          "Extensive cross-functional learning across Meta's advertising ecosystem",
          "Awarded the 2025 Infinite Potential Award for Client Hero — recognizing genuine care, empathy, and dedication to building strong client partnerships across APAC",
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
    "Did you know? Marcus once managed 43 beauty brands. Talk about a glow-up!",
    "Fun fact: Marcus can play 5 instruments. He's basically a one-man band!",
    "Marcus scaled a business from $8K to $50K/day. That's not growth, that's a rocket ship! 🚀",
    "See that grand Emerald City in the center? That's where the Meta magic happens!",
    "From farming sheep to managing Meta's top clients. What a plot twist!",
    "Marcus's coffee philosophy: Life's too short for bad coffee (and manual machines).",
  ],
};
