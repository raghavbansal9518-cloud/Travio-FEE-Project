// ========================================================
// TRAVIO — DESTINATION DETAILS DATA & INTELLIGENT HELPER
// Generates full rich data for Places to Visit, Activities, Stays, Itineraries, Budget, Weather & Food Culture for EVERY destination
// ========================================================

// Curated specific deep-dive data for flagship & popular destinations
export const CURATED_DETAILS = {
  ladakh: {
    about: 'Ladakh, the "Land of High Passes", is a high-altitude desert kingdom nestled between the Karakoram and Great Himalaya ranges. Renowned for dramatic lunar landscapes, azure glacial lakes, Tibetan Buddhist monasteries, and world-record high motorable passes.',
    foodCulture: {
      title: 'Himalayan Flavors & Butter Tea',
      items: [
        { name: 'Thukpa & Momos', desc: 'Hearty hand-rolled noodle soup with yak-cheese or steamed vegetable dumplings.' },
        { name: 'Ladakhi Butter Tea (Gur Gur Chai)', desc: 'Traditional salted tea brewed with yak butter and local tea leaves in wooden churns.' },
        { name: 'Tingmo with Skyu', desc: 'Fluffy steamed floral bread served with traditional slow-cooked root vegetable stew.' }
      ]
    },
    topPlaces: [
      { name: 'Pangong Tso Lake', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop&q=80', desc: 'World famous 134km endorheic lake changing shades from turquoise to deep cobalt at 14,270ft.', time: 'Sunrise to Sunset', ticket: 'Inner Line Permit' },
      { name: 'Khardung La Pass', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', desc: 'Legendary mountain pass standing at 17,982ft connecting Leh to Nubra Valley.', time: '8:00 AM – 5:00 PM', ticket: 'Permit Required' },
      { name: 'Thiksey & Diskit Monasteries', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&auto=format&fit=crop&q=80', desc: '12-story hilltop Tibetan Buddhist monastery resembling Lhasa’s Potala Palace with 106ft Maitreya Buddha.', time: '7:00 AM – 6:00 PM', ticket: '₹30' },
      { name: 'Nubra Valley & Hunder Dunes', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', desc: 'High-altitude white sand dunes home to double-humped Bactrian camels against snowy peaks.', time: 'All Day', ticket: 'Free' }
    ],
    activities: [
      { id: 'act-lad-1', title: 'Double Humped Camel Safari', location: 'Hunder Sand Dunes, Nubra', price: '₹700', duration: '1 Hour', difficulty: 'Relaxed', icon: '🐪', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80', desc: 'Ride rare double-humped Bactrian camels across glacial sand dunes surrounded by snowy crags.' },
      { id: 'act-lad-2', title: 'Zanskar River White Water Rafting', location: 'Chilling to Sangam', price: '₹2,200', duration: '3 Hours', difficulty: 'Challenging', icon: '🚣', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80', desc: 'Conquer thrilling Grade III & IV rapids between vertical 1000ft sheer canyon walls.' },
      { id: 'act-lad-3', title: 'Pangong Lake Stargazing & Camping', location: 'Spangmik, Pangong Tso', price: '₹3,500', duration: 'Overnight', difficulty: 'Moderate', icon: '✨', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80', desc: 'Experience pristine zero-pollution Milky Way skies from heated luxury alpine dome tents.' }
    ],
    stays: [
      { name: 'The Grand Dragon Ladakh, Leh', type: '5-Star Luxury Eco Resort', price: '₹14,500 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Mountain View Balconies', 'Oxygen Enriched Rooms', 'Multi-Cuisine Dining', 'Heated Floors'] },
      { name: 'Nubra Organic Retreat, Hunder', type: 'Boutique Glamping Camp', price: '₹7,500 / night', rating: 4.8, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80', amenities: ['Organic Farm Dining', 'Luxury Swiss Tents', 'Campfire Evenings', 'Wi-Fi'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Leh & Essential Acclimatization', activities: ['Arrive at Kushok Bakula Airport', 'Rest & acclimatize with hot butter tea', 'Evening stroll in Leh Market & Shanti Stupa sunset'] },
      { day: 'Day 2', title: 'Monasteries & Sangam Confluence', activities: ['Morning prayer chant at Thiksey Monastery', 'Magnetic Hill & Hall of Fame museum', 'Indus and Zanskar river confluence viewpoint'] },
      { day: 'Day 3', title: 'Khardung La to Nubra Valley', activities: ['Drive across Khardung La Pass (17,982ft)', 'Visit 106ft Maitreya Buddha at Diskit', 'Sunset camel safari on Hunder sand dunes'] },
      { day: 'Day 4', title: 'Pangong Tso & Return to Leh', activities: ['Drive along Shyok river to Pangong Lake', 'Lakeside photography & 3 Idiots point', 'Return to Leh via Chang La Pass'] }
    ]
  },

  bali: {
    about: 'Bali, Indonesia’s famed "Island of the Gods", enchants travelers with emerald terraced rice paddies, clifftop Hindu temples over crashing surf, spiritual yoga retreats in Ubud, and vibrant beach clubs in Seminyak and Canggu.',
    foodCulture: {
      title: 'Balinese Spices & Ocean Grills',
      items: [
        { name: 'Nasi Campur Bali', desc: 'Fragrant steamed rice served with sate lilit skewers, spiced sambal matah, and crispy tempeh.' },
        { name: 'Jimbaran Seafood BBQ', desc: 'Freshly caught red snapper and prawns grilled over coconut husks right on the beach.' },
        { name: 'Bebek Betutu', desc: 'Traditional slow-roasted duck infused with rich Balinese 16-spice paste wrapped in banana leaves.' }
      ]
    },
    topPlaces: [
      { name: 'Uluwatu Clifftop Temple', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80', desc: 'Majestic 11th-century temple perched on a 230ft sheer cliff overlooking the Indian Ocean with fire dances.', time: '7:00 AM – 7:00 PM', ticket: '₹300 (50k IDR)' },
      { name: 'Tegalalang Rice Terraces', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80', desc: 'UNESCO subak irrigation terraced emerald valley framed by giant jungle swings and palm groves.', time: '6:00 AM – 6:00 PM', ticket: '₹150 (25k IDR)' },
      { name: 'Pura Ulun Danu Bratan', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=80', desc: 'Iconic water temple floating serenely on Lake Bratan surrounded by misty volcanic mountains.', time: '8:00 AM – 6:00 PM', ticket: '₹400 (75k IDR)' }
    ],
    activities: [
      { id: 'act-bali-1', title: 'Mount Batur Sunrise Volcano Trek', location: 'Kintamani Volcano', price: '₹2,800', duration: '6 Hours', difficulty: 'Moderate', icon: '🌋', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80', desc: 'Hike an active volcano under starlight and watch sunrise above the clouds while eating volcano-steamed breakfast.' },
      { id: 'act-bali-2', title: 'Nusa Penida Manta Ray Snorkeling', location: 'Manta Point, Nusa Penida', price: '₹3,500', duration: 'Full Day', difficulty: 'Beginner', icon: '🤿', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80', desc: 'Speedboat cruise to swim alongside gentle 4-meter giant oceanic manta rays in crystal sapphire waters.' }
    ],
    stays: [
      { name: 'Kamandalu Ubud Resort', type: 'Luxury Valley Pool Villa', price: '₹22,000 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Private Infinity Pool', 'Floating Breakfast', 'Jungle Spa', 'Yoga Pavilion'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Seminyak Sunset Chill', activities: ['Check into private villa', 'Potato Head beach club cocktail sunset', 'Balinese spa massage'] },
      { day: 'Day 2', title: 'Ubud Cultural Heart & Waterfalls', activities: ['Tegalalang rice terrace walk & giant jungle swing', 'Sacred Monkey Forest sanctuary', 'Tegenungan waterfall swim'] },
      { day: 'Day 3', title: 'Nusa Penida Island Tour', activities: ['Speedboat to Kelingking T-Rex cliff', 'Snorkel at Crystal Bay & Broken Beach', 'Return to Bali for Jimbaran beach seafood dinner'] }
    ]
  },

  switzerland: {
    about: 'Switzerland captivates with the majesty of the Swiss Alps, car-free fairytale wooden chalet villages, crystalline glacial lakes, scenic panoramic express trains, and world-renowned alpine hospitality.',
    foodCulture: {
      title: 'Swiss Fondue & Alpine Artisan Cheese',
      items: [
        { name: 'Traditional Cheese Fondue', desc: 'Melted Gruyère and Emmental with white wine and garlic, dipped with crusty artisan bread cubes.' },
        { name: 'Crispy Swiss Rösti', desc: 'Golden pan-fried grated potato pancake topped with melted mountain cheese and herbs.' },
        { name: 'Swiss Artisan Truffles & Chocolates', desc: 'Handcrafted alpine milk chocolates from master Swiss chocolatiers.' }
      ]
    },
    topPlaces: [
      { name: 'The Matterhorn (Zermatt)', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80', desc: 'World’s most photographed pyramid peak towering 14,692ft above the car-free village of Zermatt.', time: 'All Day', ticket: 'Gornergrat Train Pass' },
      { name: 'Jungfraujoch – Top of Europe', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', desc: 'Highest railway station in Europe at 11,333ft with ice palace caves and Aletsch Glacier views.', time: '8:00 AM – 4:30 PM', ticket: '₹14,000 (CHF 160)' },
      { name: 'Lake Geneva & Chillon Castle', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=80', desc: 'Medieval island fortress on Lake Geneva surrounded by snow-capped Dents du Midi peaks.', time: '9:00 AM – 6:00 PM', ticket: '₹1,200 (CHF 15)' }
    ],
    activities: [
      { id: 'act-swi-1', title: 'First Cliff Walk by Tissot', location: 'Grindelwald First', price: '₹3,200', duration: '3 Hours', difficulty: 'Beginner', icon: '🚡', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&auto=format&fit=crop&q=80', desc: 'Walk along a suspended metal catwalk hanging 2,000 meters above sheer alpine cliffs.' },
      { id: 'act-swi-2', title: 'Tandem Paragliding over Interlaken', location: 'Interlaken Valley', price: '₹12,500', duration: '2 Hours', difficulty: 'Moderate', icon: '🪂', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80', desc: 'Launch from mountain meadows and glide with panoramic views over Lake Brienz and Lake Thun.' }
    ],
    stays: [
      { name: 'The Chedi Andermatt', type: '5-Star Alpine Luxury Chalet', price: '₹45,000 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Thermal Spa & Heated Pools', 'Michelin-starred Dining', 'Ski Concierge', 'Fireplace Suites'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Zurich & Scenic Train to Interlaken', activities: ['Board the panoramic Swiss Rail', 'Check into alpine wooden chalet', 'Sunset boat cruise on Lake Brienz'] },
      { day: 'Day 2', title: 'Jungfraujoch – Top of Europe', activities: ['Cogwheel train to Jungfraujoch summit', 'Walk through the ice palace and glacier plateau', 'Traditional cheese fondue dinner'] },
      { day: 'Day 3', title: 'Zermatt & Matterhorn Glacier View', activities: ['Gornergrat railway to Matterhorn viewpoint', 'Riffelsee mirror lake hike', 'Chocolate tasting in Zermatt old town'] }
    ]
  }
};

// Generates complete authentic details dynamically for ANY destination in any category
export function getDestinationDetails(destination) {
  if (!destination) return null;

  // Check if curated entry exists
  const curated = CURATED_DETAILS[destination.id] || {};

  const name = destination.name;
  const country = destination.country;
  const category = destination.category || 'nature';
  const flag = destination.flag || '🌍';
  const budget = destination.budgetStarting || '₹25,000';
  const budgetNum = destination.budgetNum || 25000;
  const weather = destination.weather || { temp: '24°C', condition: 'Pleasant', icon: 'fa-sun', bestSeason: 'Oct – Mar' };

  // 1. Generate Authentic About Profile
  const about = curated.about || destination.about || `${name} is one of ${country}'s most captivating destinations, celebrated for its unique ${category} landscapes, authentic local culture, and memorable travel experiences. Visitors from around the world are drawn to its scenic vistas, rich traditions, and diverse outdoor pursuits.`;

  // 2. Generate Highlights Matrix
  const highlights = destination.highlights || [
    { label: 'Visa', value: country === 'India' ? 'Domestic / No Visa' : 'e-Visa / Visa on Arrival' },
    { label: 'Language', value: `${country} official languages, English widely spoken` },
    { label: 'Currency', value: country === 'India' ? 'Indian Rupee (INR)' : `${country} Currency / USD / Cards` },
    { label: 'Ideal For', value: `${destination.travelType || 'Couples & Adventurers'}, Solo & Family` }
  ];

  // 3. Generate Places to Visit
  const topPlaces = curated.topPlaces || destination.topPlaces || generatePlacesForCategory(name, country, category, destination.cardImage, destination.heroImage);

  // 4. Generate Activities & Sports
  const activities = curated.activities || destination.activities || generateActivitiesForCategory(name, category, budgetNum, destination.heroImage);

  // 5. Generate Where to Stay
  const stays = curated.stays || destination.stays || generateStaysForCategory(name, country, budgetNum, destination.cardImage);

  // 6. Generate Curated Itinerary
  const itinerary = curated.itinerary || destination.itinerary || generateItineraryForCategory(name, category, destination.duration || '3–5 Days');

  // 7. Generate Food & Culture
  const foodCulture = curated.foodCulture || destination.foodCulture || generateFoodCultureForDestination(name, country);

  // 8. Generate Weather Matrix
  const weatherDetails = destination.weatherDetails || [
    { month: 'Peak Season', temp: weather.temp, desc: `Best time to visit (${weather.bestSeason})` },
    { month: 'Shoulder Season', temp: `${parseInt(weather.temp) - 3}°C`, desc: 'Fewer crowds & pleasant weather' },
    { month: 'Off-Peak Season', temp: `${parseInt(weather.temp) + 2}°C`, desc: 'Budget-friendly stays & calm vibes' }
  ];

  // 9. Generate Budget Breakdown
  const flightEst = Math.round(budgetNum * 0.35);
  const stayEst = Math.round(budgetNum * 0.40);
  const foodEst = Math.round(budgetNum * 0.15);
  const actEst = Math.round(budgetNum * 0.10);

  const budgetBreakdown = destination.budgetBreakdown || [
    { category: 'Flights & Transit', cost: `₹${flightEst.toLocaleString()}`, icon: 'fa-plane' },
    { category: 'Stays & Accommodations (3-4 Nights)', cost: `₹${stayEst.toLocaleString()}`, icon: 'fa-hotel' },
    { category: 'Dining & Local Cuisine', cost: `₹${foodEst.toLocaleString()}`, icon: 'fa-utensils' },
    { category: 'Guided Activities & Sightseeing', cost: `₹${actEst.toLocaleString()}`, icon: 'fa-ticket' }
  ];

  return {
    ...destination,
    about,
    highlights,
    topPlaces,
    activities,
    stays,
    itinerary,
    foodCulture,
    weatherDetails,
    budgetBreakdown
  };
}

// Category-Specific Place Generators
function generatePlacesForCategory(name, country, category, img1, img2) {
  const defaultImg1 = img1 || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';
  const defaultImg2 = img2 || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80';

  if (category === 'mountains') {
    return [
      { name: `${name} Main Peak Viewpoint`, image: defaultImg1, desc: `Panoramic alpine summit offering 360-degree vistas across snowy crests and deep mountain valleys.`, time: 'Sunrise to Sunset', ticket: 'Free' },
      { name: `Historic Mountain Village & Old Bazaar`, image: defaultImg2, desc: `Traditional wooden architecture, artisan handicraft workshops, and cozy hillside tea houses.`, time: '9:00 AM – 7:00 PM', ticket: 'Free' },
      { name: `Glacial Lake & Pine Valley Trail`, image: defaultImg1, desc: `Crystal clear alpine lake reflecting snow-capped ridges, surrounded by dense evergreen forests.`, time: 'Open Daily', ticket: 'National Park Pass' }
    ];
  } else if (category === 'beaches') {
    return [
      { name: `${name} Golden Bay & Shoreline`, image: defaultImg1, desc: `Pristine soft sand coastline framed by turquoise waters and swaying coastal palms.`, time: 'All Day', ticket: 'Free' },
      { name: `Sunset Clifftop & Marine Lookout`, image: defaultImg2, desc: `Spectacular promontory offering breathtaking golden hour sunsets and ocean vistas.`, time: '5:00 PM – 7:30 PM', ticket: 'Free' },
      { name: `Coral Reef Lagoon & Marine Reserve`, image: defaultImg1, desc: `Protected shallow marine cove boasting colorful coral gardens, sea turtles, and calm waters.`, time: '8:00 AM – 5:00 PM', ticket: '₹200 / $5' }
    ];
  } else if (category === 'cities') {
    return [
      { name: `${name} Central Plaza & Iconic Landmark`, image: defaultImg1, desc: `The vibrant cultural epicenter featuring landmark architecture, public fountains, and bustling cafes.`, time: 'Open 24 Hours', ticket: 'Free' },
      { name: `Panoramic Sky Deck & Tower`, image: defaultImg2, desc: `High-altitude observation deck showcasing the full skyline and glittering city lights.`, time: '10:00 AM – 10:00 PM', ticket: '₹800 / Entry' },
      { name: `Old Town Historic Quarter`, image: defaultImg1, desc: `Charming cobblestone streets, heritage stone facades, artisan boutiques, and street food.`, time: 'All Day', ticket: 'Free' }
    ];
  } else if (category === 'historical') {
    return [
      { name: `${name} UNESCO Heritage Citadel`, image: defaultImg1, desc: `Centuries-old stone fortress and grand palaces with intricate classical masonry and courtyards.`, time: '9:00 AM – 5:30 PM', ticket: '₹500 / Entry' },
      { name: `Ancient Temple Complex & Shrines`, image: defaultImg2, desc: `Sacred archaeological sanctuary featuring hand-carved stone pillars, shrines, and sacred pools.`, time: '6:00 AM – 6:00 PM', ticket: '₹250' },
      { name: `Royal Heritage Museum & Gardens`, image: defaultImg1, desc: `Preserved royal artifacts, historical manuscripts, weapons, and symmetrical botanical gardens.`, time: '10:00 AM – 5:00 PM', ticket: '₹300' }
    ];
  } else if (category === 'nature') {
    return [
      { name: `${name} Grand Waterfall & Canyon`, image: defaultImg1, desc: `Roaring cascade plunging into emerald river pools surrounded by lush biodiverse jungle.`, time: 'Sunrise to Sunset', ticket: '₹100 Eco-Fee' },
      { name: `Ancient Rainforest Canopy Walkway`, image: defaultImg2, desc: `Suspended footbridges among towering trees providing birdwatching and panoramic valley views.`, time: '8:00 AM – 4:30 PM', ticket: '₹350' },
      { name: `Serene Emerald Lake & Nature Sanctuary`, image: defaultImg1, desc: `Pristine tranquil lake home to rare migratory wildlife and quiet wooden boardwalk paths.`, time: 'Open Daily', ticket: 'Free' }
    ];
  } else {
    // Adventure
    return [
      { name: `${name} Adventure Canyon & Base Camp`, image: defaultImg1, desc: `The launching hub for extreme outdoor expeditions, cliff scrambling, and wild river trails.`, time: '7:00 AM – 6:00 PM', ticket: 'Permit Required' },
      { name: `High Peak Suspension Bridge & Lookout`, image: defaultImg2, desc: `Thrilling steel suspension bridge swaying hundreds of meters above the gorge.`, time: '8:30 AM – 5:00 PM', ticket: '₹400' },
      { name: `Wilderness Valley & Offroad Ridge`, image: defaultImg1, desc: `Rugged terrain designed for 4x4 offroading, downhill mountain biking, and wilderness camping.`, time: 'All Day', ticket: 'Free' }
    ];
  }
}

// Category-Specific Activities Generator
function generateActivitiesForCategory(name, category, budgetNum, heroImg) {
  const basePrice = Math.round(budgetNum * 0.08);
  const defaultImg = heroImg || 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80';

  if (category === 'mountains') {
    return [
      { id: 'act-1', title: `Guided Alpine Summit Trek`, location: `${name} Ridge`, price: `₹${(basePrice + 800).toLocaleString()}`, duration: '5 Hours', difficulty: 'Moderate', icon: '🥾', image: defaultImg, desc: 'Trek along marked mountain trails with experienced local guides, visiting glacial streams and panoramic peaks.' },
      { id: 'act-2', title: `Panoramic Cable Car & Skywalk`, location: `${name} High Peak`, price: `₹${(basePrice).toLocaleString()}`, duration: '2 Hours', difficulty: 'Relaxed', icon: '🚡', image: defaultImg, desc: 'Ascend over pine forests in an all-glass gondola to reach the high-altitude observation deck.' }
    ];
  } else if (category === 'beaches') {
    return [
      { id: 'act-1', title: `Snorkeling & Coral Reef Safari`, location: `${name} Marine Bay`, price: `₹${(basePrice + 500).toLocaleString()}`, duration: '3 Hours', difficulty: 'Beginner', icon: '🤿', image: defaultImg, desc: 'Discover vibrant underwater coral reefs, exotic tropical fish species, and crystal clear visibility.' },
      { id: 'act-2', title: `Sunset Catamaran Sailing Cruise`, location: `${name} Marina`, price: `₹${(basePrice + 1200).toLocaleString()}`, duration: '2.5 Hours', difficulty: 'Relaxed', icon: '⛵', image: defaultImg, desc: 'Sail into golden sunsets with complimentary refreshments, soothing music, and open ocean breezes.' }
    ];
  } else if (category === 'cities') {
    return [
      { id: 'act-1', title: `City Highlights & Architecture Tour`, location: `${name} Downtown`, price: `₹${(basePrice).toLocaleString()}`, duration: '4 Hours', difficulty: 'Easy', icon: '🏛️', image: defaultImg, desc: 'Explore historic monuments, hidden speakeasies, world-class museums, and iconic skyline architecture.' },
      { id: 'act-2', title: `Culinary Street Food & Tasting Walk`, location: `${name} Food Quarter`, price: `₹${(basePrice - 200).toLocaleString()}`, duration: '3 Hours', difficulty: 'Relaxed', icon: '🍜', image: defaultImg, desc: 'Sample signature authentic local delicacies, artisan desserts, and regional specialty beverages with a foodie guide.' }
    ];
  } else if (category === 'historical') {
    return [
      { id: 'act-1', title: `Archaeologist Guided Heritage Walk`, location: `${name} Monument Complex`, price: `₹${(basePrice).toLocaleString()}`, duration: '3.5 Hours', difficulty: 'Easy', icon: '📜', image: defaultImg, desc: 'Uncover centuries of forgotten imperial history, architectural secrets, and ancient royal chronicles.' },
      { id: 'act-2', title: `Evening Light & Sound Palace Show`, location: `${name} Royal Bastion`, price: `₹${(basePrice - 400).toLocaleString()}`, duration: '1.5 Hours', difficulty: 'Relaxed', icon: '✨', image: defaultImg, desc: 'Mesmerizing laser projections and narration bringing ancient legends to life under the starlit sky.' }
    ];
  } else if (category === 'nature') {
    return [
      { id: 'act-1', title: `Wildlife Eco Safari & Birdwatching`, location: `${name} National Sanctuary`, price: `₹${(basePrice + 600).toLocaleString()}`, duration: '4 Hours', difficulty: 'Moderate', icon: '🌿', image: defaultImg, desc: 'Traverse lush biodiversity corridors in open 4x4 safari vehicles accompanied by certified naturalists.' },
      { id: 'act-2', title: `Kayaking on Emerald River Rapids`, location: `${name} River Gorge`, price: `₹${(basePrice + 200).toLocaleString()}`, duration: '2 Hours', difficulty: 'Moderate', icon: '🛶', image: defaultImg, desc: 'Paddle through serene river gorges framed by dense rainforests and cascading natural springs.' }
    ];
  } else {
    // Adventure
    return [
      { id: 'act-1', title: `Extreme White Water Rafting`, location: `${name} River Canyon`, price: `₹${(basePrice + 1000).toLocaleString()}`, duration: '3.5 Hours', difficulty: 'Challenging', icon: '🌊', image: defaultImg, desc: 'Navigate heart-pounding Grade III & IV river rapids equipped with professional safety gear.' },
      { id: 'act-2', title: `Tandem Paragliding Flight`, location: `${name} High Ridge`, price: `₹${(basePrice + 2500).toLocaleString()}`, duration: '2 Hours', difficulty: 'Moderate', icon: '🪂', image: defaultImg, desc: 'Soar like an eagle with an experienced pilot, capturing high-definition aerial footage of the landscapes.' }
    ];
  }
}

// Category-Specific Stays Generator
function generateStaysForCategory(name, country, budgetNum, cardImg) {
  const defaultImg = cardImg || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80';
  const nightRate = Math.round(budgetNum * 0.35);

  return [
    {
      name: `${name} Grand Heritage Resort & Spa`,
      type: '5-Star Luxury Resort',
      price: `₹${nightRate.toLocaleString()} / night`,
      rating: 4.9,
      image: defaultImg,
      amenities: ['Panoramic View Suites', 'Infinity Swimming Pool', 'Luxury Wellness Spa', 'Multi-Cuisine Dining', 'Free Wi-Fi', 'Airport Shuttle']
    },
    {
      name: `${name} Boutique Eco-Lodge & Suites`,
      type: 'Boutique Scenic Stay',
      price: `₹${Math.round(nightRate * 0.65).toLocaleString()} / night`,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
      amenities: ['Mountain/Nature Balcony', 'Organic Farm Dining', 'Campfire & Stargazing', 'Guided Tours', 'High-Speed Wi-Fi']
    }
  ];
}

// Category-Specific Itinerary Generator
function generateItineraryForCategory(name, category, duration) {
  return [
    {
      day: 'Day 1',
      title: `Arrival & Welcome to ${name}`,
      activities: [
        `Arrive in ${name}, check into your scenic stay, and unwind`,
        `Evening orientation stroll through the vibrant local center and promenade`,
        `Welcome dinner sampling authentic regional cuisine with sunset views`
      ]
    },
    {
      day: 'Day 2',
      title: `Signature Landmarks & Sightseeing`,
      activities: [
        `Morning guided exploration of ${name}'s top must-see attractions`,
        `Scenic lunch stop at a curated local restaurant`,
        `Afternoon photography tour and cultural heritage exploration`
      ]
    },
    {
      day: 'Day 3',
      title: `Adventures & Unique Experiences`,
      activities: [
        `Embark on signature outdoor activities and immersive nature/cultural excursions`,
        `Free afternoon for artisan shopping, spa treatments, or personal exploration`,
        `Special farewell dinner with panoramic evening vistas`
      ]
    },
    {
      day: 'Day 4',
      title: `Scenic Sunrise & Departure`,
      activities: [
        `Catch an unforgettable early morning sunrise over ${name}`,
        `Leisurely breakfast and souvenir shopping`,
        `Check-out and transfer to airport/transit hub for your onward journey`
      ]
    }
  ];
}

// Food & Culture Generator
function generateFoodCultureForDestination(name, country) {
  return {
    title: `Authentic Flavors of ${country}`,
    items: [
      { name: `Traditional ${country} Specialty`, desc: `Locally celebrated dish prepared with fresh regional ingredients, authentic spices, and time-honored cooking techniques.` },
      { name: `Artisan Sweets & Desserts`, desc: `Delectable handmade sweets crafted from local dairy, fruits, or honey unique to the region.` },
      { name: `Regional Beverages & Brews`, desc: `Refreshing traditional herbal infusions, spiced teas, or handcrafted local beverages.` }
    ]
  };
}
