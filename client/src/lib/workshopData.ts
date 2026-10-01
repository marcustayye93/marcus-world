/*
 * The Workshop — inventory data for Marcus's shipped builds
 * Each project is an inventory item: icon, write-up, and a link to the live demo.
 * demoUrl is null for items that are not public yet (rendered as "Coming soon").
 */

export interface WorkshopProject {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  /** Paragraphs of the write-up, rendered with breathing room between them. */
  writeup: string[];
  /** Live demo URL, or null when there is nothing public to link yet. */
  demoUrl: string | null;
  linkLabel: string;
}

export const WORKSHOP_PROJECTS: WorkshopProject[] = [
  {
    id: "gethowmuch",
    name: "GetHowMuch",
    icon: "/workshop-icons/icon-gethowmuch.webp",
    tagline: "Finance made easy for Singaporeans.",
    writeup: [
      "I built GetHowMuch around one mission: finance made easy for Singaporeans.",
      "It started with the questions I kept hearing from friends, like how much CPF will I actually have, or can I really afford this car, and grew into a hub of calculators covering retirement, income tax, CPF, car and COE, currency, mortgage, and career switch.",
      "Come use it, find your number, and tell me what I should build next.",
    ],
    demoUrl: "https://gethowmuch.net",
    linkLabel: "Play the demo here",
  },
  {
    id: "singapore-adventure",
    name: "Singapore Adventure",
    icon: "/workshop-icons/icon-singapore-adventure.webp",
    tagline: "Never a boring weekend again.",
    writeup: [
      "Chesa and I kept ending up at the same three malls every weekend.",
      "So I built something to find us better options: new openings, pop-ups, and limited-run events, with fresh picks every Friday.",
    ],
    demoUrl: "https://marcustayye93.github.io/beanie-day/",
    linkLabel: "Play the demo here",
  },
  {
    id: "queensland-adventure",
    name: "Queensland Adventure",
    icon: "/workshop-icons/icon-queensland-adventure.webp",
    tagline: "Weekends, solved for Queensland families.",
    writeup: [
      "After the Singapore version, I took the same idea to Queensland for families planning weekends and school holidays.",
      "Find something near you, save the good ones, and plan the day out with real travel times from your postcode.",
      "If you're in Queensland and wondering what to do with the kids this Saturday, start here.",
    ],
    demoUrl: "https://marcustayye93.github.io/Bean-There-QLD/",
    linkLabel: "Play the demo here",
  },
  {
    id: "sydney-adventure",
    name: "Sydney Adventure",
    icon: "/workshop-icons/icon-sydney-adventure.webp",
    tagline: "Sydney and New South Wales, after dark and beyond.",
    writeup: [
      "The third in the Adventure series, this time for the grown-ups.",
      "I built a going-out guide for New South Wales covering gigs, bars, restaurants, galleries, hikes, and markets, all backed by verified live listings.",
      "Whether it's your hometown or your first week here, come see what's actually on tonight.",
    ],
    demoUrl: "https://marcustayye93.github.io/The-Sydney-Adventure/",
    linkLabel: "Play the demo here",
  },
  {
    id: "wobbles-handbook",
    name: "Wobbles Handbook",
    icon: "/workshop-icons/icon-wobbles.webp",
    tagline: "The complete care manual for one very good puppy.",
    writeup: [
      "When Paddington came home, I needed everything about him in one place, so I built it.",
      "His schedules, training milestones, and health records all live in this handbook PWA.",
    ],
    demoUrl: "https://marcustayye93.github.io/Wobbles-handbook-demo/",
    linkLabel: "Play the demo here",
  },
  {
    id: "pizzaclub",
    name: "Marco's Pizza Club",
    icon: "/workshop-icons/icon-pizza-club.webp",
    tagline: "Pizza science for home ovens.",
    writeup: [
      "I got obsessed with making real pizza in a normal home oven, and this is the result.",
      "Twelve story-style lessons, a pizza builder with live flavour meters, seven cook-along recipes, a dough lab with baker's percentages, and a full pasta chapter for good measure.",
      "Marco, our 1930s cartoon mascot, is your guide. Come hungry.",
    ],
    demoUrl: "https://marcustayye93.github.io/Marky-s-Pizza/",
    linkLabel: "Play the demo here",
  },
  {
    id: "meat-mastery",
    name: "Meat Mastery",
    icon: "/workshop-icons/icon-meat-mastery.webp",
    tagline: "Burgers and steaks, mastered.",
    writeup: [
      "My other food obsession.",
      "Burgers get lessons, a builder with live scoring, and signature recipes. Steak gets a designer: pick from 7 cuts, 6 methods, and 5 doneness targets, and it tells you how to get there.",
      "Fire up the grill.",
    ],
    demoUrl: "https://marcustayye93.github.io/burger-mastery-app/",
    linkLabel: "Play the demo here",
  },
  {
    id: "schuur80",
    name: "Schuur 80",
    icon: "/workshop-icons/icon-schuur80.webp",
    tagline: "A heritage barn, in your pocket.",
    writeup: [
      "I built this guest companion for Schuur 80, a restored heritage barn in Belgium.",
      "Everything a guest needs: the house manual, room guides, local recommendations, and emergency info, in four languages and working offline.",
    ],
    demoUrl: "https://marcustayye93.github.io/Schuur80-guest-companion-demo/",
    linkLabel: "Play the demo here",
  },
  {
    id: "stock-picker",
    name: "Stock Picker",
    icon: "/workshop-icons/icon-stock-picker.webp",
    tagline: "In the forge.",
    writeup: [
      "I'm building a stock research companion with an intrinsic value calculator, a quality scorecard, a screener, and a watchlist with price alerts.",
      "Still in the workshop. Check back soon.",
    ],
    demoUrl: null,
    linkLabel: "Coming soon",
  },
];
