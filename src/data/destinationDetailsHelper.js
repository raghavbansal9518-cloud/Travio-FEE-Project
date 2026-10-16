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
  },

  shimla: {
    about: 'Shimla, the capital of Himachal Pradesh and erstwhile summer capital of British India, is renowned for its Victorian gothic architecture, the historic pedestrian Mall Road, the iconic Christ Church on The Ridge, and the scenic Himalayan toy train.',
    foodCulture: {
      title: 'Himachali Pahadi Flavors & Bakeries',
      items: [
        { name: 'Siddu with Ghee', desc: 'Steamed wheat flour bun stuffed with spiced poppy seeds or crushed walnut paste, dipped in warm ghee.' },
        { name: 'Himachali Chana Madra', desc: 'Slow-simmered chickpeas in a rich spiced yogurt gravy infused with cardamom and cloves.' },
        { name: 'Colonial Bakeries & Apple Pies', desc: 'Handcrafted fresh apple pies, cinnamon pastries, and plum cakes from historic Mall Road bakeries.' }
      ]
    },
    topPlaces: [
      { name: 'The Ridge & Christ Church', image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&auto=format&fit=crop&q=80', desc: 'Historic open pedestrian hub with neo-Gothic church built in 1857 overlooking snow-capped Himalayan peaks.', time: 'Sunrise to 9:00 PM', ticket: 'Free' },
      { name: 'Jakhoo Temple & Hanuman Statue', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80', desc: 'Highest peak in Shimla at 8,054ft featuring the 108ft tall vermillion statue of Lord Hanuman.', time: '6:00 AM – 7:00 PM', ticket: 'Free / Ropeway: ₹500' },
      { name: 'Kufri Snow Viewpoint & Nature Park', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', desc: 'Scenic winter wonderland for skiing, tobogganing, and panoramic views of Himalayan ranges.', time: '9:00 AM – 6:00 PM', ticket: '₹100' },
      { name: 'Viceregal Lodge (Rashtrapati Niwas)', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80', desc: 'Magnificent British-era Jacobethan stately manor house surrounded by manicured botanical pine gardens.', time: '10:00 AM – 5:00 PM', ticket: '₹50' }
    ],
    activities: [
      { id: 'act-shm-1', title: 'UNESCO Kalka-Shimla Toy Train Ride', location: 'Shimla Railway Station', price: '₹650', duration: '4 Hours', difficulty: 'Relaxed', icon: '🚂', image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&auto=format&fit=crop&q=80', desc: 'Ride the century-old narrow gauge railway chugging across 103 tunnels and stone arch bridges.' },
      { id: 'act-shm-2', title: 'Kufri Snow Skiing & Tobogganing', location: 'Mahasu Peak, Kufri', price: '₹1,200', duration: '3 Hours', difficulty: 'Beginner', icon: '⛷️', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop&q=80', desc: 'Glide down powdery slopes with local instructors and ride traditional wooden sledges.' }
    ],
    stays: [
      { name: 'Wildflower Hall, An Oberoi Resort', type: '5-Star Luxury Mountain Resort', price: '₹28,000 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Heated Outdoor Whirlpool', 'Cedar Forest Walks', 'Fine Dining', 'Spa Sanctuary'] },
      { name: 'The Clarkes Hotel, Mall Road', type: 'Heritage Boutique Stay', price: '₹9,500 / night', rating: 4.8, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80', amenities: ['Historic Architecture', 'Mall Road Access', 'Panoramic Lounge', 'Complimentary Wi-Fi'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Historic Mall Road Stroll', activities: ['Arrive via scenic mountain highway', 'Check into colonial hotel', 'Evening walk on Mall Road & Lakkar Bazaar handicrafts'] },
      { day: 'Day 2', title: 'The Ridge, Christ Church & Jakhoo Hill', activities: ['Morning photography at Christ Church', 'Ride Jakhoo ropeway to summit temple', 'Sunset views across Himalayan snow peaks'] },
      { day: 'Day 3', title: 'Kufri Snow Adventure & Chail Excursion', activities: ['Drive to Kufri for snow activities', 'Visit Himalayan Nature Park', 'Return via scenic pine cedar groves'] },
      { day: 'Day 4', title: 'Viceregal Lodge & Toy Train Farewell', activities: ['Guided tour of Viceregal Lodge', 'Afternoon UNESCO Toy Train experience', 'Departure with handcrafted Shimla souvenirs'] }
    ]
  },

  manali: {
    about: 'Manali, nestled in the Kullu Valley along the rushing Beas River, is a premier Himalayan hub famed for snow adventure sports in Solang Valley, high-altitude passes like Rohtang, cedar-shaded Hadimba Temple, and vibrant backpacker cafes.',
    foodCulture: {
      title: 'Kullu Valley Trout & Pahadi Dham',
      items: [
        { name: 'Fresh Pan-Fried Himalayan Trout', desc: 'Locally caught Beas river trout pan-seared with mountain butter, garlic, and fresh rosemary.' },
        { name: 'Kullu Dham Platter', desc: 'Traditional festive meal of lentils, madra, khatta, and sweet rice served on leafy plates.' },
        { name: 'Old Manali Apple Crumble & Shakes', desc: 'Fresh orchard apples baked into warm crumbles served with homemade vanilla cream in bohemian cafes.' }
      ]
    },
    topPlaces: [
      { name: 'Solang Valley Snow Point', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&auto=format&fit=crop&q=80', desc: 'Epic mountain valley bowl offering skiing, quad biking, and giant zorbing balls framed by glaciated peaks.', time: '8:00 AM – 6:00 PM', ticket: 'Free' },
      { name: 'Rohtang Pass & Snow Crest', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', desc: 'Legendary mountain pass at 13,058ft connecting Kullu with the stark trans-Himalayan valleys of Lahaul & Spiti.', time: '6:00 AM – 5:00 PM', ticket: 'NGT Permit Required' },
      { name: 'Hadimba Devi Temple', image: 'https://images.unsplash.com/photo-1626621331899-73595b123381?w=800&auto=format&fit=crop&q=80', desc: '16th-century wooden pagoda temple built inside the sacred Dhungri deodar cedar forest sanctuary.', time: '8:00 AM – 6:00 PM', ticket: 'Free' },
      { name: 'Jogini Waterfalls & Vashisht Baths', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', desc: 'Cascading natural falls tumbling 160ft through pine woods, paired with natural sulfur hot springs.', time: 'All Day', ticket: 'Free' }
    ],
    activities: [
      { id: 'act-mnl-1', title: 'Tandem Paragliding over Solang Valley', location: 'Solang Valley Ridge', price: '₹2,500', duration: '1 Hour', difficulty: 'Moderate', icon: '🪂', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80', desc: 'Launch from high alpine meadows and soar with birds with 360-degree snow-capped vistas.' },
      { id: 'act-mnl-2', title: 'Beas River White Water Rafting', location: 'Pirdi to Jhiri, Kullu', price: '₹1,500', duration: '2 Hours', difficulty: 'Moderate', icon: '🚣', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80', desc: 'Conquer thrilling Grade II and III river rapids fed by glacial Himalayan melts.' }
    ],
    stays: [
      { name: 'The Himalayan, Hadimba Road', type: 'Luxury Victorian Castle Resort', price: '₹18,500 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Castle Suites', 'Heated Outdoor Pool', 'Orchard Grounds', 'Dine by Fireplace'] },
      { name: 'Manu Allaya Resort & Spa', type: '5-Star Alpine River Resort', price: '₹11,000 / night', rating: 4.8, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80', amenities: ['Beas River Views', 'Ayurvedic Spa', 'Billiards & Bar', 'Mountain View Balcony'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Old Manali Culture', activities: ['Arrive along the scenic Beas river', 'Walk through Old Manali wooden houses', 'Evening visit to 16th-century Hadimba Temple'] },
      { day: 'Day 2', title: 'Solang Valley Snow Thrills', activities: ['Morning paragliding and zorbing at Solang', 'Ride the Solang ropeway gondola', 'Dinner tasting Himalayan river trout'] },
      { day: 'Day 3', title: 'Rohtang Pass & Atal Tunnel', activities: ['Drive through the marvel Atal Tunnel to Lahaul', 'Snow sledging and photography at Rohtang Pass', 'Hot sulfur bath dip at Vashisht village'] },
      { day: 'Day 4', title: 'Jogini Falls Trek & Departure', activities: ['Morning pine trail hike to Jogini Waterfall', 'Souvenir shopping for Kullu shawls and honey', 'Afternoon scenic departure'] }
    ]
  },

  jaipur: {
    about: 'Jaipur, the UNESCO World Heritage "Pink City" and royal capital of Rajasthan, captivates travelers with majestic Rajput hill forts, ornate sandstone facades like Hawa Mahal, imperial palaces, and vibrant artisan handicraft bazaars.',
    foodCulture: {
      title: 'Royal Rajputana Banquet & Street Delights',
      items: [
        { name: 'Dal Baati Churma', desc: 'Signature Rajasthani baked wheat dough dumplings soaked in desi ghee, served with panchmel dal and sweet churma.' },
        { name: 'Rawat Pyaaz Kachori', desc: 'Crispy flaky deep-fried pastries stuffed with spiced onion and potato filling, paired with tangy tamarind chutney.' },
        { name: 'LMB Ghevar with Malai Rabdi', desc: 'Disc-shaped honeycomb sweet drenched in saffron syrup and topped with thick clotted cream and pistachios.' }
      ]
    },
    topPlaces: [
      { name: 'Amber Fort & Palace', image: 'https://images.unsplash.com/photo-1609137144822-4775d72f10b7?w=800&auto=format&fit=crop&q=80', desc: 'Magnificent 16th-century hilltop Rajput fortress featuring the mirrored Sheesh Mahal and overlooking Maota Lake.', time: '8:00 AM – 5:30 PM', ticket: '₹100 (Domestic) / ₹500 (Foreign)' },
      { name: 'Hawa Mahal (Palace of Winds)', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80', desc: 'Iconic five-story pink sandstone honeycomb facade with 953 ornate latticed jharokhas built in 1799.', time: '9:00 AM – 5:00 PM', ticket: '₹50' },
      { name: 'City Palace & Mubarak Mahal', image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&auto=format&fit=crop&q=80', desc: 'Regal living residence of the Jaipur royal family featuring grand courtyards and the Peacock Gate.', time: '9:30 AM – 5:00 PM', ticket: '₹200' },
      { name: 'Nahargarh Fort Sunset Ramparts', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80', desc: 'Perched on the Aravalli Hills ridge providing dramatic sunset panoramas over the entire illuminated Pink City.', time: '10:00 AM – 6:00 PM', ticket: '₹50' }
    ],
    activities: [
      { id: 'act-jpr-1', title: 'Hot Air Balloon Safari over Amber', location: 'Amber Fort Valley', price: '₹12,000', duration: '3 Hours', difficulty: 'Easy', icon: '🎈', image: 'https://images.unsplash.com/photo-1609137144822-4775d72f10b7?w=600&auto=format&fit=crop&q=80', desc: 'Float at sunrise above 400-year-old fort ramparts, hidden palaces, and Aravalli mountain ranges.' },
      { id: 'act-jpr-2', title: 'Guided Heritage Bazaar & Gem Walk', location: 'Johari & Bapu Bazaar', price: '₹1,200', duration: '3 Hours', difficulty: 'Relaxed', icon: '💎', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80', desc: 'Navigate labyrinthine pink alleys with local artisans specializing in bandhani, blue pottery, and gemstones.' }
    ],
    stays: [
      { name: 'Rambagh Palace, Jaipur', type: '5-Star Luxury Heritage Palace', price: '₹42,000 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Royal Peacocks in Gardens', 'Vintage Car Airport Transfers', 'Jiva Grande Spa', 'Maharaja Dining'] },
      { name: 'Samode Haveli, Gangapole', type: 'Heritage Boutique Courtyard Haveli', price: '₹14,500 / night', rating: 4.8, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80', amenities: ['Frescoed Verandahs', 'Private Courtyard Pool', 'Rajasthan Folk Shows', 'Wi-Fi'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & The Pink City Heart', activities: ['Check into royal palace stay', 'Photography at Hawa Mahal street view', 'Evening shopping in Johari Bazaar for blue pottery'] },
      { day: 'Day 2', title: 'Amber Fort, Sheesh Mahal & Jal Mahal', activities: ['Ascend to Amber Fort fortress', 'Marvel at thousands of convex mirrors in Sheesh Mahal', 'Sunset photo stop at water palace Jal Mahal'] },
      { day: 'Day 3', title: 'City Palace, Jantar Mantar & Nahargarh', activities: ['Tour Chandra Mahal & royal museums', 'Visit UNESCO stone sundials at Jantar Mantar', 'Sunset golden hour tea at Nahargarh Fort ramparts'] },
      { day: 'Day 4', title: 'Albert Hall Museum & Chokhi Dhani Farewell', activities: ['Visit Albert Hall Indo-Saracenic museum', 'Traditional dinner feast at Chokhi Dhani village', 'Farewell departure'] }
    ]
  },

  japan: {
    about: 'Tokyo, the dynamic capital of Japan, seamlessly blends hyper-modern neon skyscrapers, robotic innovation, and futuristic transit with ancient Shinto shrines, tranquil cherry blossom gardens, and world-class Michelin gastronomy.',
    foodCulture: {
      title: 'Edomae Sushi & Tokyo Ramen Culture',
      items: [
        { name: 'Tsukiji Style Nigiri Sushi', desc: 'Fresh bluefin tuna, sea urchin, and salmon expertly placed over warm seasoned sushi rice by master chefs.' },
        { name: 'Rich Tonkotsu & Shoyu Ramen', desc: 'Rich 16-hour simmered pork bone broth with springy noodles, soft-boiled ajitsuke egg, and braised chashu pork.' },
        { name: 'Ceremonial Matcha & Wagashi', desc: 'Stone-ground Uji green tea served alongside seasonal artistic sweet red bean wagashi confections.' }
      ]
    },
    topPlaces: [
      { name: 'Shibuya Crossing & Hachiko Plaza', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80', desc: 'World’s busiest pedestrian intersection illuminated by gigantic neon billboards and the faithful Hachiko dog statue.', time: 'Open 24 Hours', ticket: 'Free' },
      { name: 'Senso-ji Temple, Asakusa', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80', desc: 'Tokyo’s oldest Buddhist temple founded in 645 AD, entered through the giant red paper lantern Kaminarimon Gate.', time: '6:00 AM – 5:00 PM', ticket: 'Free' },
      { name: 'Tokyo Skytree & Solamachi', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&auto=format&fit=crop&q=80', desc: '634-meter soaring telecommunications tower with dual glass-floor observation decks looking out to Mount Fuji.', time: '10:00 AM – 9:00 PM', ticket: '¥2,100 (₹1,200)' },
      { name: 'Meiji Jingu Shinto Shrine', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop&q=80', desc: 'Tranquil Imperial shrine nestled inside a 170-acre serene evergreen forest in central Tokyo.', time: 'Sunrise to Sunset', ticket: 'Free' }
    ],
    activities: [
      { id: 'act-jpn-1', title: 'Traditional Kimono & Tea Ceremony', location: 'Asakusa Tea Pavilion', price: '¥5,500 (₹3,100)', duration: '2 Hours', difficulty: 'Relaxed', icon: '🍵', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80', desc: 'Wear silk kimonos and learn ancient Zen mindfulness rituals of preparing and savoring matcha tea.' },
      { id: 'act-jpn-2', title: 'Shinkansen Bullet Train to Mount Fuji', location: 'Tokyo to Lake Kawaguchiko', price: '¥7,500 (₹4,200)', duration: 'Full Day', difficulty: 'Easy', icon: '🚅', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80', desc: 'Speed through Japanese countryside at 320 km/h to gaze at the symmetrical snow cone of Mount Fuji.' }
    ],
    stays: [
      { name: 'Aman Tokyo, Otemachi', type: 'Ultra-Luxury Ryokan-Inspired Highrise', price: '¥120,000 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Mount Fuji Views', 'Traditional Washi Paper Walls', 'Onsen Hot Spring Spa', 'Michelin Dining'] },
      { name: 'Hotel Gracery Shinjuku', type: 'Iconic Modern City Hotel', price: '¥22,000 / night', rating: 4.8, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80', amenities: ['Godzilla Head Terrace', 'Direct Shinjuku Station Access', 'High-Speed Wi-Fi', 'Panoramic City Deck'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Shibuya Cyberpunk Neon', activities: ['Arrive via Narita Express', 'Cross the Shibuya Scramble intersection', 'Night izakaya dinner in Shinjuku Golden Gai'] },
      { day: 'Day 2', title: 'Sacred Asakusa, Senso-ji & Tokyo Skytree', activities: ['Incense ritual at Senso-ji Temple', 'Shop for artisan chopsticks on Nakamise Dori', 'Panoramic sunset from Tokyo Skytree 450m deck'] },
      { day: 'Day 3', title: 'Mount Fuji & Lake Kawaguchi Day Trip', activities: ['Shinkansen bullet train to Mount Fuji', 'Chureito Pagoda postcard photography', 'Traditional onsen bath soak with mountain views'] },
      { day: 'Day 4', title: 'Meiji Shrine, Harajuku & Ginza Farewell', activities: ['Morning walk through Meiji Shrine sacred forest', 'Takeshita Street pop culture and sweet crepes', 'Farewell Michelin sushi dinner in Ginza'] }
    ]
  },

  goa: {
    about: 'Goa, India’s coastal crown jewel, blends Portuguese colonial heritage, spice plantations, vibrant music festivals, and pristine golden-sand coastlines along the azure Arabian Sea.',
    foodCulture: {
      title: 'Goan Coastal Seafood & Kokum Curries',
      items: [
        { name: 'Goan Fish Curry Thali', desc: 'Fresh Kingfish simmered in grated coconut, fiery red Kashmiri chillies, and tangy dried kokum, served with red rice.' },
        { name: 'Prawn Balchão & Poi Bread', desc: 'Spicy, tangy pan-fried prawns prepared in a rich tomato, ginger, and toddy vinegar pickle gravy with crusty Goan bread.' },
        { name: 'Traditional Bebinca Cake', desc: 'Rich 7-layered Goan Portuguese dessert baked with coconut milk, egg yolks, sugar, and fragrant nutmeg.' }
      ]
    },
    topPlaces: [
      { name: 'Palolem & Butterfly Beach', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80', desc: 'Crescent white-sand bay framed by coconut palms and gentle dolphin waters in tranquil South Goa.', time: 'All Day', ticket: 'Free' },
      { name: 'Fort Aguada & Lighthouse', image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&auto=format&fit=crop&q=80', desc: '17th-century Portuguese fortress overlooking panoramic Arabian Sea vistas and Sinquerim Beach.', time: '9:30 AM – 6:00 PM', ticket: '₹25' },
      { name: 'Fontainhas Latin Quarter', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80', desc: 'UNESCO heritage cobblestone streets lined with vibrant pastel Portuguese villas, tiled roof verandas, and art cafes.', time: 'Open Daily', ticket: 'Free' },
      { name: 'Basilica of Bom Jesus, Old Goa', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80', desc: 'World Heritage baroque church enshrining the sacred mortal remains of St. Francis Xavier.', time: '9:00 AM – 6:30 PM', ticket: 'Free' }
    ],
    activities: [
      { id: 'act-goa-1', title: 'Grand Island Scuba Diving & Dolphin Cruise', location: 'Grand Island, Goa', price: '₹2,500', duration: '5 Hours', difficulty: 'Beginner', icon: '🤿', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80', desc: 'Explore shallow coral reefs, swim with sea turtles, and watch playful dolphins in the open sea.' },
      { id: 'act-goa-2', title: 'Mandovi River Sunset Cruise & Folk Dance', location: 'Panaji Jetty', price: '₹800', duration: '2 Hours', difficulty: 'Relaxed', icon: '🛥️', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80', desc: 'Cruise under golden skies with traditional Goan fugdi and dekhni folk performances with live DJ music.' }
    ],
    stays: [
      { name: 'W Goa, Vagator', type: 'Luxury Beachfront Resort', price: '₹18,000 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Private Beach Access', 'Rock Pool', 'Spa by Clarins', 'Sunset Cocktail Lounge'] },
      { name: 'The Postcard Velha, Old Goa', type: 'Heritage Luxury Villa', price: '₹12,500 / night', rating: 4.8, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80', amenities: ['Portuguese Architecture', 'Organic Tropical Dining', 'Forest Views', 'Ayurvedic Wellness'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & North Goa Beach Sunset', activities: ['Check into beach resort', 'Anjuna sunset flea market stroll', 'Fresh seafood dinner at beach shack with live music'] },
      { day: 'Day 2', title: 'Water Sports, Calangute & Fort Aguada', activities: ['Morning parasailing and jet skiing at Calangute', 'Explore 17th-century Fort Aguada and lighthouse', 'Sunset cocktails on Vagator cliffs'] },
      { day: 'Day 3', title: 'Fontainhas Latin Quarter & Spice Plantation', activities: ['Walking tour of colorful Fontainhas in Panaji', 'Visit UNESCO Basilica of Bom Jesus in Old Goa', 'Traditional Goan lunch at Ponda spice plantation'] },
      { day: 'Day 4', title: 'Tranquil South Goa Beaches & Departure', activities: ['Relax on quiet white sands of Palolem Beach', 'Boat ride to secluded Butterfly Island', 'Farewell coconut water and departure transfer'] }
    ]
  },

  andaman: {
    about: 'The Andaman and Nicobar Islands are an emerald tropical archipelago in the Bay of Bengal, world-renowned for powder-white coral beaches, crystal-clear turquoise waters, vibrant marine biodiversity, and deep Indian freedom struggle heritage.',
    foodCulture: {
      title: 'Island Seafood & Coastal Coconut Delicacies',
      items: [
        { name: 'Fresh Andaman Lobster & Crab Roast', desc: 'Locally caught rock lobster tossed in crushed black pepper, curry leaves, and toasted coconut oil.' },
        { name: 'Havelock Coconut Fish Curry', desc: 'Fresh reef fish gently poached in freshly squeezed coconut milk with mild coastal spices.' },
        { name: 'Tender Coconut Panna Cotta', desc: 'Velvety chilled dessert prepared using fresh island coconuts and wild Andaman honey.' }
      ]
    },
    topPlaces: [
      { 
        name: 'Radhanagar Beach (Havelock Island)', 
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=80', 
        desc: 'Crowned Asia’s Best Beach by Time Magazine, celebrated for its sweeping 2km arc of pristine powder-white sand, turquoise surf, and dramatic golden sunsets.', 
        time: 'Sunrise to Sunset', 
        ticket: 'Free' 
      },
      { 
        name: 'Cellular Jail National Memorial (Port Blair)', 
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&auto=format&fit=crop&q=80', 
        desc: 'Historic colonial penitentiary known as Kala Pani where Indian freedom fighters were exiled, featuring a stirring evening sound and light presentation.', 
        time: '9:00 AM – 5:00 PM', 
        ticket: '₹30 / Show: ₹150' 
      },
      { 
        name: 'Elephant Beach & Coral Reef (Havelock)', 
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80', 
        desc: 'Vibrant marine cove famed for shallow live coral gardens, clownfish, sea turtles, sea walking, and glass-bottom speedboat excursions.', 
        time: '8:00 AM – 3:30 PM', 
        ticket: 'Boat: ₹1,000' 
      },
      { 
        name: 'Ross Island (Netaji Subhash Chandra Bose Dweep)', 
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 
        desc: 'Atmospheric ruins of British colonial administrative headquarters engulfed by giant banyan roots, with free-roaming spotted deer and peacocks.', 
        time: '8:30 AM – 4:00 PM', 
        ticket: '₹50' 
      }
    ],
    activities: [
      { id: 'act-and-1', title: 'PADI Certified Scuba Diving in Havelock', location: 'Elephant Beach Reef', price: '₹3,500', duration: '3 Hours', difficulty: 'Beginner', icon: '🤿', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80', desc: 'Dive into crystal-clear waters with certified divemasters to encounter manta rays, parrotfish, and vivid corals.' },
      { id: 'act-and-2', title: 'Night Kayaking & Bioluminescence Safari', location: 'Havelock Island Mangroves', price: '₹2,400', duration: '2 Hours', difficulty: 'Relaxed', icon: '🛶', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80', desc: 'Paddle under starry skies as every stroke of your paddle lights up with shimmering neon phytoplankton.' },
      { id: 'act-and-3', title: 'Sea Walking & Underwater Helmet Experience', location: 'North Bay Island', price: '₹3,200', duration: '1.5 Hours', difficulty: 'Easy', icon: '🐠', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80', desc: 'Walk naturally along the ocean seabed 6 meters underwater breathing freely inside a pressurized helmet dome.' }
    ],
    stays: [
      { name: 'Taj Exotica Resort & Spa, Andamans', type: '5-Star Luxury Private Villa Resort', price: '₹32,000 / night', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', amenities: ['Radhanagar Beachfront', 'Private Plunge Pools', 'Jiva Ayurveda Spa', 'Coastal Dining Pavilions'] },
      { name: 'Barefoot at Havelock', type: 'Eco-Luxury Rainforest Stays', price: '₹14,000 / night', rating: 4.8, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80', amenities: ['Thatched Wooden Cottages', 'Direct Beach Trail', 'Organic Farm Cuisine', 'Eco Diver Concierge'] }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Port Blair & Historic Cellular Jail', activities: ['Arrive at Veer Savarkar International Airport', 'Check into seaside resort & coastal lunch', 'Evening visit to Cellular Jail & Light & Sound Show'] },
      { day: 'Day 2', title: 'Makruzz Catamaran to Havelock & Radhanagar Sunset', activities: ['High-speed ferry cruise to Havelock Island', 'Check into beachfront resort', 'Sunset photography and swim at Radhanagar Beach'] },
      { day: 'Day 3', title: 'Elephant Beach Snorkeling & Coral Safari', activities: ['Speedboat ride to Elephant Beach', 'Guided scuba diving and snorkeling over coral reefs', 'Fresh seafood barbecue dinner by the bay'] },
      { day: 'Day 4', title: 'Kalapathar Beach & Return via Port Blair', activities: ['Morning sunrise at Kalapathar Beach with turquoise lagoons', 'Souvenir shopping for pearl and seashell handicrafts', 'Departure cruise to Port Blair'] }
    ]
  }
};

// Generates complete authentic details dynamically for ANY destination in any category
export function getDestinationDetails(destination) {
  if (!destination) return null;

  // Check if curated entry exists by id or normalized prefix
  const cleanId = (destination.id || '').toLowerCase();
  const baseId = cleanId.split('-')[0];
  const curated = CURATED_DETAILS[cleanId] || CURATED_DETAILS[baseId] || CURATED_DETAILS[cleanId.replace(/[^a-z]/g, '')] || {};

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

// Category-Specific Place Generators with guaranteed unique distinct photos
function generatePlacesForCategory(name, country, category, img1, img2) {
  const cat = (category || 'nature').toLowerCase();

  const PHOTO_POOLS = {
    beaches: [
      img1 || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      img2 && img2 !== img1 ? img2 : 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80'
    ],
    mountains: [
      img1 || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
      img2 && img2 !== img1 ? img2 : 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80'
    ],
    cities: [
      img1 || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
      img2 && img2 !== img1 ? img2 : 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80'
    ],
    historical: [
      img1 || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80',
      img2 && img2 !== img1 ? img2 : 'https://images.unsplash.com/photo-1609137144822-4775d72f10b7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80'
    ],
    nature: [
      img1 || 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
      img2 && img2 !== img1 ? img2 : 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    ],
    adventure: [
      img1 || 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&auto=format&fit=crop&q=80',
      img2 && img2 !== img1 ? img2 : 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80'
    ]
  };

  const pool = PHOTO_POOLS[cat] || PHOTO_POOLS.nature;

  if (cat === 'mountains') {
    return [
      { name: `${name} Main Peak Viewpoint`, image: pool[0], desc: `Panoramic alpine summit offering 360-degree vistas across snowy crests and deep mountain valleys.`, time: 'Sunrise to Sunset', ticket: 'Free' },
      { name: `Historic Mountain Village & Old Bazaar`, image: pool[1], desc: `Traditional wooden architecture, artisan handicraft workshops, and cozy hillside tea houses.`, time: '9:00 AM – 7:00 PM', ticket: 'Free' },
      { name: `Glacial Lake & Pine Valley Trail`, image: pool[2], desc: `Crystal clear alpine lake reflecting snow-capped ridges, surrounded by dense evergreen forests.`, time: 'Open Daily', ticket: 'National Park Pass' },
      { name: `High Altitude Panoramic Pass`, image: pool[3], desc: `Iconic mountain crossing with colorful prayer flags and sweeping cloudscapes over rugged ridges.`, time: '8:00 AM – 5:00 PM', ticket: 'Permit Check' }
    ];
  } else if (cat === 'beaches') {
    return [
      { name: `${name} Golden Bay & Shoreline`, image: pool[0], desc: `Pristine soft sand coastline framed by turquoise waters and swaying coastal palms.`, time: 'All Day', ticket: 'Free' },
      { name: `Sunset Clifftop & Marine Lookout`, image: pool[1], desc: `Spectacular promontory offering breathtaking golden hour sunsets and ocean vistas.`, time: '5:00 PM – 7:30 PM', ticket: 'Free' },
      { name: `Coral Reef Lagoon & Marine Reserve`, image: pool[2], desc: `Protected shallow marine cove boasting colorful coral gardens, sea turtles, and calm waters.`, time: '8:00 AM – 5:00 PM', ticket: '₹200 / $5' },
      { name: `Secluded Coastal Cove & Tide Pools`, image: pool[3], desc: `Quiet hidden shoreline surrounded by dramatic sea cliffs, ideal for beachcombing and relaxing.`, time: 'Open Daily', ticket: 'Free' }
    ];
  } else if (cat === 'cities') {
    return [
      { name: `${name} Central Plaza & Iconic Landmark`, image: pool[0], desc: `The vibrant cultural epicenter featuring landmark architecture, public fountains, and bustling cafes.`, time: 'Open 24 Hours', ticket: 'Free' },
      { name: `Panoramic Sky Deck & Tower`, image: pool[1], desc: `High-altitude observation deck showcasing the full skyline and glittering city lights.`, time: '10:00 AM – 10:00 PM', ticket: '₹800 / Entry' },
      { name: `Old Town Historic Quarter`, image: pool[2], desc: `Charming cobblestone streets, heritage stone facades, artisan boutiques, and street food.`, time: 'All Day', ticket: 'Free' },
      { name: `Cultural Arts & Museum District`, image: pool[3], desc: `World-class art galleries, botanical city gardens, and grand municipal architecture.`, time: '10:00 AM – 6:00 PM', ticket: '₹350' }
    ];
  } else if (cat === 'historical') {
    return [
      { name: `${name} UNESCO Heritage Citadel`, image: pool[0], desc: `Centuries-old stone fortress and grand palaces with intricate classical masonry and courtyards.`, time: '9:00 AM – 5:30 PM', ticket: '₹500 / Entry' },
      { name: `Ancient Temple Complex & Shrines`, image: pool[1], desc: `Sacred archaeological sanctuary featuring hand-carved stone pillars, shrines, and sacred pools.`, time: '6:00 AM – 6:00 PM', ticket: '₹250' },
      { name: `Royal Heritage Museum & Gardens`, image: pool[2], desc: `Preserved royal artifacts, historical manuscripts, weapons, and symmetrical botanical gardens.`, time: '10:00 AM – 5:00 PM', ticket: '₹300' },
      { name: `Imperial Ramparts & Gateways`, image: pool[3], desc: `Monumental stone archways and defensive bastions that once protected ancient imperial dynasties.`, time: 'Sunrise to Sunset', ticket: 'Free' }
    ];
  } else if (cat === 'nature') {
    return [
      { name: `${name} Grand Waterfall & Canyon`, image: pool[0], desc: `Roaring cascade plunging into emerald river pools surrounded by lush biodiverse jungle.`, time: 'Sunrise to Sunset', ticket: '₹100 Eco-Fee' },
      { name: `Ancient Rainforest Canopy Walkway`, image: pool[1], desc: `Suspended footbridges among towering trees providing birdwatching and panoramic valley views.`, time: '8:00 AM – 4:30 PM', ticket: '₹350' },
      { name: `Serene Emerald Lake & Nature Sanctuary`, image: pool[2], desc: `Pristine tranquil lake home to rare migratory wildlife and quiet wooden boardwalk paths.`, time: 'Open Daily', ticket: 'Free' },
      { name: `Valley Ecological Reserve`, image: pool[3], desc: `Protected wilderness corridor featuring diverse native flora, mountain streams, and fresh air.`, time: '6:00 AM – 6:00 PM', ticket: '₹150' }
    ];
  } else {
    // Adventure
    return [
      { name: `${name} Adventure Canyon & Base Camp`, image: pool[0], desc: `The launching hub for extreme outdoor expeditions, cliff scrambling, and wild river trails.`, time: '7:00 AM – 6:00 PM', ticket: 'Permit Required' },
      { name: `High Peak Suspension Bridge & Lookout`, image: pool[1], desc: `Thrilling steel suspension bridge swaying hundreds of meters above the gorge.`, time: '8:30 AM – 5:00 PM', ticket: '₹400' },
      { name: `Wilderness Valley & Offroad Ridge`, image: pool[2], desc: `Rugged terrain designed for 4x4 offroading, downhill mountain biking, and wilderness camping.`, time: 'All Day', ticket: 'Free' },
      { name: `Alpine Ridge Climbing Crag`, image: pool[3], desc: `Vertical granite rock face with bolted sport climbing routes for beginner and advanced climbers.`, time: 'Sunrise to Sunset', ticket: 'Free' }
    ];
  }
}

// Category-Specific Activities Generator with distinct photos
function generateActivitiesForCategory(name, category, budgetNum, heroImg) {
  const basePrice = Math.round(budgetNum * 0.08);
  const cat = (category || 'nature').toLowerCase();

  const ACTIVITY_IMAGES = {
    beaches: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80'
    ],
    mountains: [
      'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&auto=format&fit=crop&q=80'
    ],
    cities: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80'
    ],
    historical: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609137144822-4775d72f10b7?w=600&auto=format&fit=crop&q=80'
    ],
    nature: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?w=600&auto=format&fit=crop&q=80'
    ],
    adventure: [
      'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&auto=format&fit=crop&q=80'
    ]
  };

  const imgs = ACTIVITY_IMAGES[cat] || ACTIVITY_IMAGES.nature;

  if (cat === 'mountains') {
    return [
      { id: 'act-1', title: `Guided Alpine Summit Trek`, location: `${name} Ridge`, price: `₹${(basePrice + 800).toLocaleString()}`, duration: '5 Hours', difficulty: 'Moderate', icon: '🥾', image: imgs[0], desc: 'Trek along marked mountain trails with experienced local guides, visiting glacial streams and panoramic peaks.' },
      { id: 'act-2', title: `Panoramic Cable Car & Skywalk`, location: `${name} High Peak`, price: `₹${(basePrice).toLocaleString()}`, duration: '2 Hours', difficulty: 'Relaxed', icon: '🚡', image: imgs[1], desc: 'Ascend over pine forests in an all-glass gondola to reach the high-altitude observation deck.' }
    ];
  } else if (cat === 'beaches') {
    return [
      { id: 'act-1', title: `Snorkeling & Coral Reef Safari`, location: `${name} Marine Bay`, price: `₹${(basePrice + 500).toLocaleString()}`, duration: '3 Hours', difficulty: 'Beginner', icon: '🤿', image: imgs[0], desc: 'Discover vibrant underwater coral reefs, exotic tropical fish species, and crystal clear visibility.' },
      { id: 'act-2', title: `Sunset Catamaran Sailing Cruise`, location: `${name} Marina`, price: `₹${(basePrice + 1200).toLocaleString()}`, duration: '2.5 Hours', difficulty: 'Relaxed', icon: '⛵', image: imgs[1], desc: 'Sail into golden sunsets with complimentary refreshments, soothing music, and open ocean breezes.' }
    ];
  } else if (cat === 'cities') {
    return [
      { id: 'act-1', title: `City Highlights & Architecture Tour`, location: `${name} Downtown`, price: `₹${(basePrice).toLocaleString()}`, duration: '4 Hours', difficulty: 'Easy', icon: '🏛️', image: imgs[0], desc: 'Explore historic monuments, hidden speakeasies, world-class museums, and iconic skyline architecture.' },
      { id: 'act-2', title: `Culinary Street Food & Tasting Walk`, location: `${name} Food Quarter`, price: `₹${(basePrice - 200).toLocaleString()}`, duration: '3 Hours', difficulty: 'Relaxed', icon: '🍜', image: imgs[1], desc: 'Sample signature authentic local delicacies, artisan desserts, and regional specialty beverages with a foodie guide.' }
    ];
  } else if (cat === 'historical') {
    return [
      { id: 'act-1', title: `Archaeologist Guided Heritage Walk`, location: `${name} Monument Complex`, price: `₹${(basePrice).toLocaleString()}`, duration: '3.5 Hours', difficulty: 'Easy', icon: '📜', image: imgs[0], desc: 'Uncover centuries of forgotten imperial history, architectural secrets, and ancient royal chronicles.' },
      { id: 'act-2', title: `Evening Light & Sound Palace Show`, location: `${name} Royal Bastion`, price: `₹${(basePrice - 400).toLocaleString()}`, duration: '1.5 Hours', difficulty: 'Relaxed', icon: '✨', image: imgs[1], desc: 'Mesmerizing laser projections and narration bringing ancient legends to life under the starlit sky.' }
    ];
  } else if (cat === 'nature') {
    return [
      { id: 'act-1', title: `Wildlife Eco Safari & Birdwatching`, location: `${name} National Sanctuary`, price: `₹${(basePrice + 600).toLocaleString()}`, duration: '4 Hours', difficulty: 'Moderate', icon: '🌿', image: imgs[0], desc: 'Traverse lush biodiversity corridors in open 4x4 safari vehicles accompanied by certified naturalists.' },
      { id: 'act-2', title: `Kayaking on Emerald River Rapids`, location: `${name} River Gorge`, price: `₹${(basePrice + 200).toLocaleString()}`, duration: '2 Hours', difficulty: 'Moderate', icon: '🛶', image: imgs[1], desc: 'Paddle through serene river gorges framed by dense rainforests and cascading natural springs.' }
    ];
  } else {
    // Adventure
    return [
      { id: 'act-1', title: `Extreme White Water Rafting`, location: `${name} River Canyon`, price: `₹${(basePrice + 1000).toLocaleString()}`, duration: '3.5 Hours', difficulty: 'Challenging', icon: '🌊', image: imgs[0], desc: 'Navigate heart-pounding Grade III & IV river rapids equipped with professional safety gear.' },
      { id: 'act-2', title: `Tandem Paragliding Flight`, location: `${name} High Ridge`, price: `₹${(basePrice + 2500).toLocaleString()}`, duration: '2 Hours', difficulty: 'Moderate', icon: '🪂', image: imgs[1], desc: 'Soar like an eagle with an experienced pilot, capturing high-definition aerial footage of the landscapes.' }
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
