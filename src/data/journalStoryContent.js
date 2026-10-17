const WRITER = {
  id: 'writer-maya',
  name: 'Maya Chen',
  bio: 'Slow-travel enthusiast collecting mountain mornings, local meals, and stories from the road.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
  interests: ['Slow travel', 'Photography', 'Local food']
};

export const JOURNAL_STORY_CONTENT = {
  'demo-interlaken': {
    author: WRITER,
    publishedAt: '2024-07-20',
    introduction: 'Interlaken was the kind of place that made us put our phones away and simply look. We spent a long weekend moving between clear blue lakes, quiet trails, and the sound of cowbells drifting down from the hills.',
    story: [
      { heading: 'A morning by the water', paragraphs: ['We started early on the quieter side of Lake Brienz. The water looked almost unreal in the morning light, and the first boat of the day left long, silver ripples behind it.', 'After breakfast in town, we took the funicular up to Harder Kulm. The view opened over both Lake Thun and Lake Brienz, with the Jungfrau massif beyond. We stayed longer than planned, watching clouds move across the peaks.'] },
      { heading: 'Taking the scenic route', paragraphs: ['The next day was for a gentle lakeside walk and an unhurried train ride through the Lauterbrunnen valley. Every turn seemed to reveal another waterfall or chalet tucked into a green slope.', 'We finished with a picnic near the river. It was a simple afternoon, but it became the moment we talked about most on the journey home.'] }
    ],
    itinerary: [
      { title: 'Day 1 · Interlaken & Harder Kulm', details: ['Stroll Höhematte park and the old town.', 'Ride the funicular to Harder Kulm for the lakeside panorama.', 'Have dinner in town and check the sunset forecast before heading out.'] },
      { title: 'Day 2 · Lake Brienz', details: ['Take an early boat toward Giessbach.', 'Walk the lakeside paths and visit the falls.', 'Leave time for a relaxed return boat ride.'] },
      { title: 'Day 3 · Lauterbrunnen valley', details: ['Ride the regional train to Lauterbrunnen.', 'Explore the village paths and waterfall viewpoints.', 'Return to Interlaken before the evening trains thin out.'] }
    ],
    gallery: [
      { image: '/images/swiss_alps_bg.png', alt: 'Alpine lake and mountains near Interlaken' },
      { image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&auto=format&fit=crop&q=85', alt: 'Sunrise over the Swiss Alps' }
    ],
    tips: ['Start popular mountain excursions early, especially in summer.', 'Check rail and boat connections before leaving town; some routes run less often in the evening.', 'Pack a light rain layer even when the valley starts sunny.'],
    budget: 'Sample estimate: CHF 180–280 per person per day, excluding international flights.',
    duration: '3 days',
    destination: {
      overview: 'A lakeside gateway to the Bernese Oberland, between Lake Thun and Lake Brienz and beneath the Jungfrau peaks.',
      bestTime: 'May–October for hiking and lake trips; December–March for winter activities.',
      climate: 'Alpine conditions vary quickly with elevation. Check a current forecast before mountain excursions.',
      attractions: ['Lake Thun', 'Lake Brienz', 'Harder Kulm', 'Lauterbrunnen valley', 'Jungfraujoch'],
      food: ['Rösti', 'Swiss cheese fondue', 'Raclette'],
      transport: 'Interlaken Ost and Interlaken West connect regional trains, buses, and lake boats.',
      safety: 'Use marked trails, check mountain lift status, and follow local weather and avalanche guidance.'
    },
    activities: [
      { name: 'Harder Kulm viewpoint', description: 'Ride the funicular for a classic view over both lakes and the surrounding peaks.', location: 'Interlaken', duration: '2–3 hours', cost: 'Paid funicular; check current fares', image: '/images/swiss_alps_bg.png', destinationId: 'switzerland' },
      { name: 'Lake Brienz boat trip', description: 'Explore the turquoise lake and lakeside villages at an easy pace.', location: 'Interlaken Ost', duration: 'Half day', cost: 'Paid boat; check current fares', image: '/images/swiss_alps_bg.png', destinationId: 'switzerland' },
      { name: 'Lauterbrunnen valley walk', description: 'A gentle valley outing with village paths and waterfall viewpoints.', location: 'Lauterbrunnen', duration: 'Half day', cost: 'Train fare varies', image: '/images/swiss_alps_bg.png', destinationId: 'switzerland' }
    ],
    mapQuery: 'Interlaken, Switzerland'
  },
  'demo-santorini': {
    author: WRITER,
    publishedAt: '2024-07-02',
    introduction: 'Santorini is best experienced slowly: a shaded lane in the afternoon, a small plate of tomatoes and fava, and a sunset watched without trying to photograph every second.',
    story: [
      { heading: 'White lanes above the caldera', paragraphs: ['We spent the first day walking from Fira toward Imerovigli, taking the cliff path at our own pace. Blue domes appeared between whitewashed walls, and every corner seemed to open onto another stretch of sea.', 'In the afternoon we ducked into a family-run café and shared tomato fritters and fresh bread. The island felt less like a postcard and more like a place once we stepped away from the busiest lookout points.'] },
      { heading: 'A sunset worth waiting for', paragraphs: ['On our final evening we chose a quieter terrace outside the main Oia lanes. The sky shifted from pale gold to rose, then violet, while fishing boats became tiny silhouettes below.', 'We walked back after the crowds had thinned. That quiet walk was the perfect ending.'] }
    ],
    itinerary: [
      { title: 'Day 1 · Fira to Imerovigli', details: ['Explore Fira in the morning.', 'Walk the caldera path toward Imerovigli.', 'Book a relaxed dinner with a view.'] },
      { title: 'Day 2 · Villages & sunset', details: ['Visit Pyrgos before midday.', 'Spend the afternoon by the coast.', 'Choose a quieter sunset viewpoint and arrive early.'] }
    ],
    gallery: [
      { image: '/images/santorini_bg.png', alt: 'Santorini white buildings above the Aegean Sea' },
      { image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=85', alt: 'Santorini coastal village at sunset' }
    ],
    tips: ['Wear shoes with grip on polished stone and steep lanes.', 'Reserve sunset dinners ahead during peak season.', 'Take the local bus for inter-village journeys and confirm the return schedule.'],
    budget: 'Sample estimate: €130–220 per person per day, excluding flights.',
    duration: '2 days',
    destination: {
      overview: 'A volcanic Cyclades island known for its caldera villages, archaeological sites, and Aegean views.',
      bestTime: 'April–June and September–October for milder weather and fewer crowds.',
      climate: 'Mediterranean summers are dry and sunny; this is seasonal guidance, not a live forecast.',
      attractions: ['Oia', 'Fira', 'Akrotiri archaeological site', 'Pyrgos', 'Perissa Beach'],
      food: ['Tomato fritters', 'Fava', 'Fresh grilled seafood'],
      transport: 'Local buses connect Fira with major villages; taxis and boat tours are available.',
      safety: 'Take care on cliff paths and crowded steps, and use sun protection in summer.'
    },
    activities: [
      { name: 'Caldera village walk', description: 'Walk the cliffside route between Fira and Imerovigli, stopping at viewpoints.', location: 'Fira–Imerovigli', duration: '2–3 hours', cost: 'Free', image: '/images/santorini_bg.png', destinationId: 'santorini' },
      { name: 'Akrotiri archaeological site', description: 'Explore the preserved Bronze Age settlement with an on-site guide.', location: 'Akrotiri', duration: '1–2 hours', cost: 'Admission varies', image: '/images/santorini_bg.png', destinationId: 'santorini' }
    ],
    mapQuery: 'Santorini, Greece'
  },
  'demo-tokyo': {
    author: WRITER,
    publishedAt: '2024-04-22',
    introduction: 'Tokyo in spring balanced quiet temple gardens with busy streets, late-night ramen, and cherry trees that seemed to soften the whole city.',
    story: [
      { heading: 'Morning under the blossoms', paragraphs: ['We reached Ueno Park early and wandered beneath the sakura before the paths filled. Families were laying out picnic blankets, and petals gathered along the edges of the pond.', 'Later, we took the train to Asakusa and visited Sensō-ji. The incense, lanterns, and narrow shopping streets made a lovely contrast to the huge city around us.'] },
      { heading: 'A city that stays awake', paragraphs: ['Dinner was a tiny ramen counter near our station. We pointed at the ticket machine, shared a few words with the cook, and ended up with one of our favorite meals of the trip.', 'At night we walked through Shinjuku, following the glow of signs until we found a quieter lane for dessert and tea.'] }
    ],
    itinerary: [
      { title: 'Day 1 · Ueno & Asakusa', details: ['Visit Ueno Park early in the day.', 'Continue to Sensō-ji and the surrounding streets.', 'Try a neighborhood dinner rather than eating only near the station.'] },
      { title: 'Day 2 · Shinjuku & city lights', details: ['Explore a garden or museum in the morning.', 'Spend the afternoon in Shinjuku.', 'Keep your transit card handy for an easy ride back.'] }
    ],
    gallery: [
      { image: '/images/japan.jpg', alt: 'Japanese temple and spring blossoms' },
      { image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&auto=format&fit=crop&q=85', alt: 'Cherry blossoms in a Tokyo park' }
    ],
    tips: ['Use an IC transit card for trains and many small purchases.', 'Popular blossom parks are calmer early in the morning.', 'Keep cash for smaller restaurants and neighborhood shops.'],
    budget: 'Sample estimate: ¥12,000–22,000 per person per day, excluding flights and lodging.',
    duration: '2 days',
    destination: {
      overview: 'A sprawling capital where historic temples, neighborhood food streets, gardens, and modern districts sit close to one another.',
      bestTime: 'March–May for spring blooms; October–November for autumn color and comfortable walks.',
      climate: 'Seasonal guide only: spring is changeable and summer can be hot and humid.',
      attractions: ['Sensō-ji', 'Ueno Park', 'Meiji Shrine', 'Shinjuku Gyoen', 'Shibuya Crossing'],
      food: ['Ramen', 'Sushi', 'Tempura'],
      transport: 'The rail and metro network is extensive; use a transit card and check the last-train time.',
      safety: 'Keep station names available in Japanese, follow local queueing customs, and mind the last train.'
    },
    activities: [
      { name: 'Asakusa & Sensō-ji walk', description: 'Explore temple grounds, Nakamise street, and nearby riverside paths.', location: 'Asakusa', duration: '2–3 hours', cost: 'Temple grounds free', image: '/images/japan.jpg', destinationId: 'tokyo' },
      { name: 'Ueno Park blossom walk', description: 'Enjoy museum gardens and spring blossoms at a gentle pace.', location: 'Ueno', duration: '1–2 hours', cost: 'Park free; museum admission varies', image: '/images/japan.jpg', destinationId: 'tokyo' }
    ],
    mapQuery: 'Tokyo, Japan'
  },
  'demo-krabi': {
    author: WRITER,
    publishedAt: '2024-05-12',
    introduction: 'Our favorite Krabi days began on a longtail boat with no particular rush. Limestone cliffs, warm water, and tiny beach coves made each short hop feel like a new island.',
    story: [
      { heading: 'Finding our own cove', paragraphs: ['We booked a small-group boat trip and left early to beat the midday heat. The first stop was quiet enough for a slow swim, with the limestone cliffs rising straight from the water.', 'At lunch we shared grilled fish, rice, and fruit on the beach. There was no signal in the cove, which turned out to be a gift.'] },
      { heading: 'A slower afternoon', paragraphs: ['Back on Railay, we walked the beach paths and watched climbers tracing the rock face. We skipped the last island stop and stayed for the light changing over the bay.', 'The best advice we got was to leave space in the plan. The sea and weather set the pace.'] }
    ],
    itinerary: [
      { title: 'Day 1 · Railay and Phra Nang', details: ['Take a longtail boat to Railay.', 'Walk to Phra Nang beach and cave.', 'Return before the evening boat service ends.'] },
      { title: 'Day 2 · Island-hopping boat', details: ['Choose a licensed small-group tour.', 'Bring reef-safe sun protection and drinking water.', 'Check sea conditions before departure.'] }
    ],
    gallery: [
      { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85', alt: 'Tropical beach and clear water in Thailand' },
      { image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=85', alt: 'Limestone islands along the Andaman coast' }
    ],
    tips: ['Use licensed boat operators and agree the return time before setting off.', 'Bring cash, water, and sun protection; shade can be limited.', 'Trips may change with sea conditions, so keep a flexible day.'],
    budget: 'Sample estimate: ฿2,500–4,500 per person per day, excluding flights and lodging.',
    duration: '2 days',
    destination: {
      overview: 'A southern Thailand coastal province with limestone karsts, island beaches, and easy access to the Andaman Sea.',
      bestTime: 'November–April is generally the drier season; conditions can vary.',
      climate: 'Tropical monsoon climate. Check current marine and weather advisories before boat trips.',
      attractions: ['Railay Beach', 'Phra Nang Cave Beach', 'Ao Nang', 'Hong Islands', 'Tiger Cave Temple'],
      food: ['Massaman curry', 'Fresh seafood', 'Roti pancakes'],
      transport: 'Longtail boats connect Railay and nearby beaches; songthaews and taxis serve mainland routes.',
      safety: 'Use life jackets on boats, respect swimming flags, and avoid exposed trails in heavy rain.'
    },
    activities: [
      { name: 'Railay & Phra Nang beach walk', description: 'Explore the peninsula beaches and shaded paths between coves.', location: 'Railay', duration: 'Half day', cost: 'Boat fare varies', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1000&auto=format&fit=crop&q=85', destinationId: 'krabi' },
      { name: 'Hong Islands boat trip', description: 'A guided day on the water with beach and lagoon stops, subject to conditions.', location: 'Ao Nang / Krabi', duration: 'Full day', cost: 'Tour prices vary', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=85', destinationId: 'krabi' }
    ],
    mapQuery: 'Krabi, Thailand'
  },
  'demo-cappadocia': {
    author: WRITER,
    publishedAt: '2024-03-01',
    introduction: 'Before sunrise, the valley was still and cold. Then the first balloons lifted above the rock formations, and the sky slowly filled with color.',
    story: [
      { heading: 'Before the sun', paragraphs: ['The pickup came while it was still dark. We dressed in layers, had tea at the launch field, and watched the crew check the basket and burner.', 'The flight was gentle rather than thrilling. From above, the ridges and valleys looked almost hand-carved. When the sun reached the horizon, the balloons turned bright against the pale sky.'] },
      { heading: 'Walking the valleys', paragraphs: ['After landing, we rested and spent the afternoon walking through a nearby valley. We took frequent water breaks and stayed on marked paths where the rock was loose.', 'Dinner was a warming clay-pot dish in town. It was the perfect end to a very early start.'] }
    ],
    itinerary: [
      { title: 'Day 1 · Sunrise flight', details: ['Confirm the operator and pickup details the day before.', 'Dress warmly in layers and follow the crew instructions.', 'Keep the rest of the day light after the early start.'] },
      { title: 'Day 2 · Valley walk', details: ['Choose a marked route suitable for your fitness level.', 'Carry water and sun protection.', 'Visit a local pottery workshop or open-air museum.'] }
    ],
    gallery: [
      { image: '/images/cappadocia_bg.png', alt: 'Hot air balloons over Cappadocia at sunrise' },
      { image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=1200&auto=format&fit=crop&q=85', alt: 'Cappadocia rock formations and balloons' }
    ],
    tips: ['Balloon flights depend on aviation and weather approvals; cancellation is possible.', 'Book with a licensed operator and read the safety briefing.', 'Bring layers for the cold pre-dawn start and sturdy shoes for valley paths.'],
    budget: 'Sample estimate: ₺3,000–5,500 per person per day; balloon flight is an additional variable cost.',
    duration: '2 days',
    destination: {
      overview: 'A Central Anatolian region known for volcanic rock formations, cave architecture, and historic valleys.',
      bestTime: 'April–June and September–October for milder walking conditions.',
      climate: 'Continental climate with cold mornings possible. Balloon flights are weather-dependent, not guaranteed.',
      attractions: ['Göreme Open-Air Museum', 'Love Valley', 'Uçhisar Castle', 'Pasabag (Monks Valley)', 'Avanos'],
      food: ['Testi kebab', 'Manti', 'Local pottery-baked dishes'],
      transport: 'Shuttle buses, local buses, taxis, and guided day tours connect Göreme and nearby towns.',
      safety: 'Use marked paths around soft rock formations and follow official balloon operator guidance.'
    },
    activities: [
      { name: 'Sunrise balloon flight', description: 'A licensed balloon operator may offer a sunrise flight when conditions allow; flights can be cancelled for safety.', location: 'Göreme launch sites', duration: '3–4 hours including transfers', cost: 'Price varies by operator and date', image: '/images/cappadocia_bg.png', destinationId: 'cappadocia' },
      { name: 'Göreme Open-Air Museum', description: 'Explore rock-cut churches and historic frescoes in a UNESCO-listed landscape.', location: 'Göreme', duration: '2–3 hours', cost: 'Admission varies', image: '/images/cappadocia_bg.png', destinationId: 'cappadocia' }
    ],
    mapQuery: 'Cappadocia, Turkey'
  },
  'demo-singapore': {
    author: WRITER,
    publishedAt: '2024-01-18',
    introduction: 'Singapore was a compact whirlwind of gardens, hawker centers, and late-night lights. We loved how quickly the mood changed from a quiet green path to a bright city street.',
    story: [
      { heading: 'Gardens after dark', paragraphs: ['We arrived at Gardens by the Bay before sunset and walked through the Supertree Grove as the sky turned pink. The evening light show was busy, but the scale of the trees made it worth staying.', 'Dinner was at a hawker center. We ordered small portions to share and tried chicken rice, satay, and fresh lime juice.'] },
      { heading: 'The city at street level', paragraphs: ['The next morning we took the MRT to Chinatown and wandered through the market lanes. We left time for a long lunch and an unplanned stop for kopi.', 'At Marina Bay we watched the skyline reflections come on after dusk. Singapore is polished, but its food stalls and neighborhood streets made it feel personal.'] }
    ],
    itinerary: [
      { title: 'Day 1 · Gardens & hawker food', details: ['Walk Gardens by the Bay in the late afternoon.', 'Catch the Supertree Grove evening show.', 'Choose a nearby hawker center for dinner.'] },
      { title: 'Day 2 · Neighborhoods & Marina Bay', details: ['Explore Chinatown in the morning.', 'Use the MRT to cross town.', 'Finish with a waterfront walk around Marina Bay.'] }
    ],
    gallery: [
      { image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop&q=85', alt: 'Singapore skyline at dusk' },
      { image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200&auto=format&fit=crop&q=85', alt: 'Singapore city lights at night' }
    ],
    tips: ['Use a contactless card or local transit card on MRT and buses.', 'Hawker centers are great for varied meals; follow stall queues.', 'Check attraction opening hours before planning indoor visits.'],
    budget: 'Sample estimate: S$100–180 per person per day, excluding flights and lodging.',
    duration: '2 days',
    destination: {
      overview: 'A compact island city-state blending waterfront architecture, botanical gardens, and distinct neighborhood food cultures.',
      bestTime: 'Year-round travel is common; February–April is often relatively drier.',
      climate: 'Equatorial heat and showers can occur year-round. This is seasonal guidance, not current weather.',
      attractions: ['Gardens by the Bay', 'Marina Bay', 'Chinatown', 'Singapore Botanic Gardens', 'Jewel Changi'],
      food: ['Chicken rice', 'Laksa', 'Satay'],
      transport: 'The MRT and bus network is extensive; contactless payment is widely supported.',
      safety: 'Follow local rules in public spaces and stay hydrated in the humid climate.'
    },
    activities: [
      { name: 'Gardens by the Bay', description: 'Explore the waterfront gardens and Supertree Grove; conservatories require separate admission.', location: 'Marina Bay', duration: 'Half day', cost: 'Some areas free; conservatory tickets vary', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1000&auto=format&fit=crop&q=85', destinationId: 'singapore' },
      { name: 'Chinatown food walk', description: 'Browse heritage streets and sample a few dishes at local hawker stalls.', location: 'Chinatown', duration: '2–3 hours', cost: 'Food costs vary', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1000&auto=format&fit=crop&q=85', destinationId: 'singapore' }
    ],
    mapQuery: 'Singapore'
  }
};

export function getJournalStory(entry) {
  if (!entry) return null;
  const detail = JOURNAL_STORY_CONTENT[entry.id];
  if (detail) return detail;

  return {
    author: entry.author || {
      id: entry.ownerId || 'local-writer',
      name: entry.authorName || 'Travio traveler',
      bio: 'Sharing personal moments from the road.',
      avatar: '/images/ai-bot.png'
    },
    publishedAt: entry.publishedAt || entry.updatedAt || entry.date,
    introduction: entry.introduction || entry.description,
    story: entry.story || [{ heading: 'The story', paragraphs: [entry.description, entry.fullStory].filter(Boolean) }],
    itinerary: entry.itinerary || [],
    gallery: entry.gallery || [],
    tips: entry.tips || [],
    budget: entry.budget || '',
    duration: entry.duration || '',
    destination: entry.destinationInfo || null,
    activities: entry.activities || [],
    mapQuery: entry.destination
  };
}
