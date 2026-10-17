export const DEMO_JOURNAL_ENTRIES = [
  {
    id: 'demo-interlaken',
    title: 'A Day in Paradise',
    destination: 'Interlaken, Switzerland',
    destinationId: 'switzerland',
    date: '2024-07-12',
    description: 'Woke up to the most beautiful lake views. Switzerland never stops amazing me!',
    image: '/images/swiss_alps_bg.png',
    tags: ['Nature', 'Mountains', 'Lakes'],
    kind: 'trip'
  },
  {
    id: 'demo-santorini',
    title: 'Sunsets & Blue Domes',
    destination: 'Santorini, Greece',
    destinationId: 'santorini',
    date: '2024-06-28',
    description: "The most magical sunset I've ever seen. Santorini truly feels like a dream.",
    image: '/images/santorini_bg.png',
    tags: ['Sunset', 'Culture', 'Architecture'],
    kind: 'trip'
  },
  {
    id: 'demo-tokyo',
    title: 'Cherry Blossoms Magic',
    destination: 'Tokyo, Japan',
    destinationId: 'tokyo',
    date: '2024-04-15',
    description: 'Explored temples, tried amazing food and witnessed the beautiful sakura season.',
    image: '/images/japan.jpg',
    tags: ['Temples', 'Food', 'City Life'],
    kind: 'photo'
  },
  {
    id: 'demo-krabi',
    title: 'Island Hopping Adventure',
    destination: 'Krabi, Thailand',
    destinationId: 'krabi',
    date: '2024-05-05',
    description: 'Crystal clear waters, hidden beaches and unforgettable memories with amazing people.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=85',
    tags: ['Beaches', 'Adventure', 'Ocean'],
    kind: 'trip'
  },
  {
    id: 'demo-cappadocia',
    title: 'Hot Air Balloon Dream',
    destination: 'Cappadocia, Turkey',
    destinationId: 'cappadocia',
    date: '2024-02-22',
    description: 'Floating above the fairy chimneys was a once-in-a-lifetime experience!',
    image: '/images/cappadocia_bg.png',
    tags: ['Adventure', 'Sunrise', 'Unique'],
    kind: 'trip'
  },
  {
    id: 'demo-singapore',
    title: 'A Modern Wonderland',
    destination: 'Singapore',
    destinationId: 'singapore',
    date: '2024-01-10',
    description: 'Futuristic city, amazing food and stunning night views. Singapore exceeded my expectations!',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1000&auto=format&fit=crop&q=85',
    tags: ['City', 'Food', 'Nightlife'],
    kind: 'note'
  }
];

export const DEFAULT_DEMO_FAVORITES = [
  'demo-interlaken',
  'demo-tokyo',
  'demo-cappadocia'
];
