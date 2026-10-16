// Mock data for TRAVIO Booking Engine: Move, Stay, Experience

export const FLIGHTS_DATA = [
  {
    id: 'fl-1',
    airline: 'Air India',
    airlineCode: 'AI-805',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&auto=format&fit=crop&q=80',
    fromCity: 'Delhi',
    fromCode: 'DEL',
    fromAirport: 'Indira Gandhi Intl (T3)',
    departureTime: '06:00',
    toCity: 'Mumbai',
    toCode: 'BOM',
    toAirport: 'Chhatrapati Shivaji Intl (T2)',
    arrivalTime: '08:15',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 5420,
    cabinClass: 'Economy',
    seatsLeft: 4,
    refundable: true,
    aircraft: 'Airbus A350-900',
  },
  {
    id: 'fl-2',
    airline: 'IndiGo',
    airlineCode: '6E-2041',
    logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120&auto=format&fit=crop&q=80',
    fromCity: 'Delhi',
    fromCode: 'DEL',
    fromAirport: 'Indira Gandhi Intl (T1)',
    departureTime: '08:45',
    toCity: 'Mumbai',
    toCode: 'BOM',
    toAirport: 'Chhatrapati Shivaji Intl (T1)',
    arrivalTime: '11:00',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 4699,
    cabinClass: 'Economy',
    seatsLeft: 9,
    refundable: false,
    aircraft: 'Airbus A321neo',
  },
  {
    id: 'fl-3',
    airline: 'Vistara (Air India)',
    airlineCode: 'UK-995',
    logo: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?w=120&auto=format&fit=crop&q=80',
    fromCity: 'Delhi',
    fromCode: 'DEL',
    fromAirport: 'Indira Gandhi Intl (T3)',
    departureTime: '10:20',
    toCity: 'Mumbai',
    toCode: 'BOM',
    toAirport: 'Chhatrapati Shivaji Intl (T2)',
    arrivalTime: '12:35',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 6850,
    cabinClass: 'Business',
    seatsLeft: 2,
    refundable: true,
    aircraft: 'Boeing 787-9 Dreamliner',
  },
  {
    id: 'fl-4',
    airline: 'Akasa Air',
    airlineCode: 'QP-1308',
    logo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=120&auto=format&fit=crop&q=80',
    fromCity: 'Delhi',
    fromCode: 'DEL',
    fromAirport: 'Indira Gandhi Intl (T2)',
    departureTime: '14:30',
    toCity: 'Mumbai',
    toCode: 'BOM',
    toAirport: 'Chhatrapati Shivaji Intl (T1)',
    arrivalTime: '16:50',
    duration: '2h 20m',
    stops: 'Non-stop',
    price: 4320,
    cabinClass: 'Economy',
    seatsLeft: 6,
    refundable: true,
    aircraft: 'Boeing 737 MAX 8',
  },
];

export const TRAINS_DATA = [
  {
    id: 'tr-1',
    trainName: 'Vande Bharat Express',
    trainNumber: '22436',
    departureStation: 'New Delhi',
    departureCode: 'NDLS',
    departureTime: '06:00',
    arrivalStation: 'Kanpur Central',
    arrivalCode: 'CNB',
    arrivalTime: '10:08',
    duration: '4h 08m',
    days: 'All Days (except Mon)',
    classes: [
      { type: 'CC', name: 'Chair Car', price: 1115, status: 'AVAILABLE-48' },
      { type: 'EC', name: 'Exec Chair Car', price: 2130, status: 'AVAILABLE-12' },
    ],
    rating: 4.8,
    speed: 'Semi High-Speed (130 km/h)',
  },
  {
    id: 'tr-2',
    trainName: 'Kanpur Shatabdi Express',
    trainNumber: '12034',
    departureStation: 'New Delhi',
    departureCode: 'NDLS',
    departureTime: '15:50',
    arrivalStation: 'Kanpur Central',
    arrivalCode: 'CNB',
    arrivalTime: '20:50',
    duration: '5h 00m',
    days: 'Daily',
    classes: [
      { type: 'CC', name: 'Chair Car', price: 925, status: 'AVAILABLE-82' },
      { type: 'EC', name: 'Exec Chair Car', price: 1810, status: 'RAC-4' },
    ],
    rating: 4.6,
    speed: 'Express',
  },
  {
    id: 'tr-3',
    trainName: 'Howrah Rajdhani Express',
    trainNumber: '12302',
    departureStation: 'New Delhi',
    departureCode: 'NDLS',
    departureTime: '16:50',
    arrivalStation: 'Kanpur Central',
    arrivalCode: 'CNB',
    arrivalTime: '21:32',
    duration: '4h 42m',
    days: 'Daily',
    classes: [
      { type: '3A', name: '3rd AC', price: 1485, status: 'AVAILABLE-24' },
      { type: '2A', name: '2nd AC', price: 2120, status: 'AVAILABLE-08' },
      { type: '1A', name: '1st AC', price: 3450, status: 'AVAILABLE-03' },
    ],
    rating: 4.9,
    speed: 'Superfast VIP',
  },
  {
    id: 'tr-4',
    trainName: 'Lucknow Tejas Express',
    trainNumber: '82502',
    departureStation: 'New Delhi',
    departureCode: 'NDLS',
    departureTime: '15:40',
    arrivalStation: 'Kanpur Central',
    arrivalCode: 'CNB',
    arrivalTime: '20:35',
    duration: '4h 55m',
    days: 'Tue, Wed, Fri, Sat, Sun',
    classes: [
      { type: 'CC', name: 'Chair Car', price: 1280, status: 'AVAILABLE-35' },
      { type: 'EC', name: 'Exec Chair Car', price: 2360, status: 'AVAILABLE-06' },
    ],
    rating: 4.7,
    speed: 'Premium Private',
  },
];

export const BUSES_DATA = [
  {
    id: 'bus-1',
    operator: 'IntrCity SmartBus',
    busType: 'Bharat Benz AC Sleeper (2+1)',
    from: 'Delhi (Kashmere Gate)',
    to: 'Kanpur (Fazalganj)',
    departureTime: '21:00',
    arrivalTime: '05:30',
    duration: '8h 30m',
    rating: 4.8,
    reviewsCount: 1420,
    price: 899,
    seatsAvailable: 14,
    amenities: ['Live Tracking', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
  },
  {
    id: 'bus-2',
    operator: 'Zingbus Electric Premium',
    busType: 'Volvo 9600 Multi-Axle EV Sleeper',
    from: 'Delhi (Akshardham)',
    to: 'Kanpur (Rama Devi)',
    departureTime: '22:15',
    arrivalTime: '06:30',
    duration: '8h 15m',
    rating: 4.9,
    reviewsCount: 2310,
    price: 1149,
    seatsAvailable: 8,
    amenities: ['Zero Emissions', 'Comfort Pods', 'Snack Box', 'Entertainment Screen'],
  },
  {
    id: 'bus-3',
    operator: 'NueGo Electric Green',
    busType: 'Ultra Luxury Electric AC Seater',
    from: 'Delhi (Sarai Kale Khan)',
    to: 'Kanpur (Jhakarkatti)',
    departureTime: '20:30',
    arrivalTime: '05:00',
    duration: '8h 30m',
    rating: 4.7,
    reviewsCount: 980,
    price: 749,
    seatsAvailable: 19,
    amenities: ['Air Purifier', 'CCTV Safe', 'Emergency Button', 'USB Ports'],
  },
  {
    id: 'bus-4',
    operator: 'Orange Travels Gold',
    busType: 'Scania Multi-Axle AC Sleeper',
    from: 'Delhi (ISBT Anand Vihar)',
    to: 'Kanpur (Naubasta)',
    departureTime: '23:00',
    arrivalTime: '07:15',
    duration: '8h 15m',
    rating: 4.6,
    reviewsCount: 1840,
    price: 999,
    seatsAvailable: 11,
    amenities: ['Reading Light', 'Pillow', 'GPS Tracking', 'Water Bottle'],
  },
];

export const CABS_DATA = [
  {
    id: 'cab-1',
    category: 'Prime Sedan',
    model: 'Maruti Suzuki Dzire / Hyundai Aura',
    capacity: '4 Passengers • 2 Bags',
    fuel: 'CNG / Petrol',
    ac: true,
    rating: 4.8,
    ratePerKm: '₹12/km',
    basePrice: 16800,
    estHours: '32 hrs drive (1,950 km)',
    features: ['Top Rated Chauffeur', 'Complimentary Water', 'Toll included option'],
  },
  {
    id: 'cab-2',
    category: 'Prime SUV',
    model: 'Toyota Innova Crysta',
    capacity: '6-7 Passengers • 4 Bags',
    fuel: 'Diesel',
    ac: true,
    rating: 4.9,
    ratePerKm: '₹18/km',
    basePrice: 24500,
    estHours: '32 hrs drive (1,950 km)',
    features: ['Captain Seats', 'Spacious Legroom', 'Experienced Highway Driver', 'Roof Carrier'],
  },
  {
    id: 'cab-3',
    category: 'Electric Prime',
    model: 'Tata Nexon EV / BYD Atto 3',
    capacity: '4 Passengers • 2 Bags',
    fuel: '100% Electric',
    ac: true,
    rating: 4.9,
    ratePerKm: '₹14/km',
    basePrice: 19200,
    estHours: 'Eco Fast-Charge Route',
    features: ['Zero Emission Travel', 'Silent Cabin', 'Smart Climate Control'],
  },
  {
    id: 'cab-4',
    category: 'Luxury Chauffeur',
    model: 'Mercedes-Benz E-Class / BMW 5 Series',
    capacity: '3 Passengers • 3 Bags',
    fuel: 'Premium',
    ac: true,
    rating: 5.0,
    ratePerKm: '₹45/km',
    basePrice: 58000,
    estHours: 'VIP Express Service',
    features: ['Suited Chauffeur', 'Leather Reclining Seats', 'WiFi Hotspot', 'Sanitized VIP Kit'],
  },
];

export const HOTELS_DATA = [
  // Goa
  {
    id: 'ht-1',
    name: 'W Goa Luxury Retreat',
    destination: 'Goa',
    location: 'Vagator Beach, North Goa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 1428,
    tag: '5-Star Beachfront Luxury',
    pricePerNight: 18500,
    originalPrice: 24000,
    amenities: ['Rock Pool', 'Private Beach Access', 'WOOBAR Lounge', 'Spa & Wellness', 'Free High-Speed WiFi'],
  },
  {
    id: 'ht-2',
    name: 'Taj Exotica Resort & Spa',
    destination: 'Goa',
    location: 'Benaulim, South Goa',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 2150,
    tag: 'Mediterranean Luxury Haven',
    pricePerNight: 22000,
    originalPrice: 28500,
    amenities: ['56-Acre Garden', 'Golf Course', 'Jiva Spa', 'Sea-facing Dining', 'Kids Club'],
  },
  {
    id: 'ht-goa-3',
    name: 'Alila Diwa Goa by Hyatt',
    destination: 'Goa',
    location: 'Majorda Beach, South Goa',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 1680,
    tag: 'Paddy Field Infinity Sanctuary',
    pricePerNight: 14500,
    originalPrice: 19000,
    amenities: ['Infinity Paddy Pool', 'Spa Alila', 'Private Veranda', 'Free Shuttle to Beach'],
  },
  {
    id: 'ht-goa-4',
    name: 'The Leela Goa Beach Resort',
    destination: 'Goa',
    location: 'Mobor Beach, Cavelossim',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 2410,
    tag: 'Riverside & Beachfront Grandeur',
    pricePerNight: 26000,
    originalPrice: 33000,
    amenities: ['12-Hole Golf Course', 'Lagoon Waterways', 'Private Beach Club', 'The Club Butler Service'],
  },

  // Dubai
  {
    id: 'ht-3',
    name: 'Atlantis The Royal',
    destination: 'Dubai',
    location: 'Palm Jumeirah, Dubai',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 3890,
    tag: 'Ultra-Luxury Landmark',
    pricePerNight: 64000,
    originalPrice: 78000,
    amenities: ['Skyblaze Fountain', 'Cloud 22 Rooftop Pool', 'Celebrity Chef Dining', 'Aquaventure Access'],
  },
  {
    id: 'ht-db-2',
    name: 'Burj Al Arab Jumeirah',
    destination: 'Dubai',
    location: 'Jumeirah Beach Road, Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 4620,
    tag: 'World Iconic 7-Star Sail',
    pricePerNight: 115000,
    originalPrice: 140000,
    amenities: ['Private Chauffeur Rolls Royce', 'Talise Spa in the Clouds', 'Private Butler on Every Floor', 'Helipad Access'],
  },
  {
    id: 'ht-db-3',
    name: 'Armani Hotel Dubai',
    destination: 'Dubai',
    location: 'Burj Khalifa, Downtown Dubai',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 2280,
    tag: 'Haute Couture Within Burj Khalifa',
    pricePerNight: 52000,
    originalPrice: 65000,
    amenities: ['Direct Dubai Mall VIP Access', 'Armani/Spa Sanctuary', 'Panoramic Fountain Views', 'Lifestyle Manager Concierge'],
  },

  // Singapore
  {
    id: 'ht-4',
    name: 'Marina Bay Sands',
    destination: 'Singapore',
    location: '10 Bayfront Avenue, Singapore',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 6520,
    tag: 'Iconic Infinity Pool Landmark',
    pricePerNight: 48500,
    originalPrice: 56000,
    amenities: ['57th Floor Infinity Pool', 'Banyan Tree Spa', 'ArtScience Museum Entry', 'Observation Deck Pass'],
  },
  {
    id: 'ht-sg-2',
    name: 'Raffles Hotel Singapore',
    destination: 'Singapore',
    location: '1 Beach Road, Singapore',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 3410,
    tag: 'Legendary Colonial 1887 Splendor',
    pricePerNight: 68000,
    originalPrice: 82000,
    amenities: ['Legendary Butler Service', 'Birthplace of Singapore Sling', 'Raffles Spa', 'Courtyard Tropical Gardens'],
  },
  {
    id: 'ht-sg-3',
    name: 'Capella Singapore Sentosa Island',
    destination: 'Singapore',
    location: '1 The Knolls, Sentosa Island',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 2120,
    tag: 'Sentosa Rainforest Ocean Sanctuary',
    pricePerNight: 54000,
    originalPrice: 65000,
    amenities: ['3-Tier Cascading Pools', 'Auriga Spa', 'Peacocks in Lush Grounds', 'Private Plunge Pool Villas'],
  },
  {
    id: 'ht-sg-4',
    name: 'The Fullerton Hotel Singapore',
    destination: 'Singapore',
    location: '1 Fullerton Square, Singapore',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 4180,
    tag: 'Marina Bay Waterfront Heritage',
    pricePerNight: 36000,
    originalPrice: 44000,
    amenities: ['Infinity Pool Overlooking Singapore River', 'Fullerton Heritage Tour', 'The Straits Club Lounge', 'Afternoon High Tea'],
  },

  // Paris
  {
    id: 'ht-7',
    name: 'Hôtel Plaza Athénée',
    destination: 'Paris',
    location: 'Avenue Montaigne, Paris, France',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 1620,
    tag: 'Haute Couture Eiffel Suite',
    pricePerNight: 82000,
    originalPrice: 98000,
    amenities: ['Eiffel Tower Balcony View', 'Dior Spa Institute', 'Alain Ducasse Courtyard', 'Valet Limousine'],
  },
  {
    id: 'ht-pr-2',
    name: 'Ritz Paris',
    destination: 'Paris',
    location: '15 Place Vendôme, Paris, France',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 2890,
    tag: 'Historic Palace of Place Vendôme',
    pricePerNight: 105000,
    originalPrice: 125000,
    amenities: ['Bar Hemingway', 'Ritz Club Pool with Undersea Audio', 'Chanel Spa', 'Private Garden Salon'],
  },

  // London
  {
    id: 'ht-ld-1',
    name: 'The Ritz London',
    destination: 'London',
    location: '150 Piccadilly, St. James’s, London',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 3120,
    tag: 'Quintessential British Aristocracy',
    pricePerNight: 76000,
    originalPrice: 92000,
    amenities: ['World-Famous Afternoon Tea', 'Michelin Star Dining', 'Green Park Views', 'Chauffeur Driven Rolls-Royce'],
  },
  {
    id: 'ht-ld-2',
    name: 'Shangri-La The Shard, London',
    destination: 'London',
    location: '31 St Thomas St, London Bridge',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 4200,
    tag: 'Sky-High Thames Panorama',
    pricePerNight: 64000,
    originalPrice: 78000,
    amenities: ['Level 52 Sky Pool', 'Floor-to-Ceiling London Skyline Views', 'GŎNG Cocktail Lounge', 'Marble Bathrooms with Heated Floors'],
  },

  // Tokyo
  {
    id: 'ht-tk-1',
    name: 'Aman Tokyo',
    destination: 'Tokyo',
    location: 'The Otemachi Tower, Chiyoda, Tokyo',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 1950,
    tag: 'Zen Sanctuary in the Sky',
    pricePerNight: 94000,
    originalPrice: 112000,
    amenities: ['30-Meter Black Granite Sky Pool', 'Traditional Japanese Onsen Baths', 'Imperial Palace Garden Views', 'Aman Spa Rituals'],
  },
  {
    id: 'ht-tk-2',
    name: 'Park Hyatt Tokyo',
    destination: 'Tokyo',
    location: '3-7-1-2 Nishi-Shinjuku, Shinjuku, Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 3100,
    tag: 'Iconic Shinjuku High-Rise Living',
    pricePerNight: 52000,
    originalPrice: 64000,
    amenities: ['New York Grill & Bar (52nd Floor)', 'Club on the Park Spa', 'Mount Fuji Horizons', 'Deep Soaking Tubs'],
  },

  // Bangkok
  {
    id: 'ht-8',
    name: 'The Siam Riverside Oasis',
    destination: 'Bangkok',
    location: 'Chao Phraya River, Bangkok, Thailand',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 1120,
    tag: 'Art Deco Riverside Sanctuary',
    pricePerNight: 32000,
    originalPrice: 39000,
    amenities: ['Private Wooden Boat Shuttle', 'Muay Thai Boxing Ring', 'Opium Spa', 'Infinity Riverside Pool'],
  },
  {
    id: 'ht-bk-2',
    name: 'Mandarin Oriental, Bangkok',
    destination: 'Bangkok',
    location: '48 Oriental Ave, Bang Rak, Bangkok',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 4500,
    tag: '145 Years of Legendary River Royalty',
    pricePerNight: 46000,
    originalPrice: 55000,
    amenities: ['Legendary Authors’ Lounge', 'Two Swimming Pools', 'Teakwood Boat Ferry', 'The Oriental Spa Sanctuary'],
  },

  // Bali
  {
    id: 'ht-5',
    name: 'The St. Regis Bali Resort',
    destination: 'Bali',
    location: 'Nusa Dua, Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 1840,
    tag: 'Private Saltwater Lagoon Villa',
    pricePerNight: 36000,
    originalPrice: 44000,
    amenities: ['24-Hour Butler Service', 'Saltwater Lagoon', 'Remède Spa', 'Boneka Gourmet Breakfast'],
  },

  // Maldives
  {
    id: 'ht-6',
    name: 'Soneva Jani Overwater Sanctuary',
    destination: 'Maldives',
    location: 'Noonu Atoll, Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 980,
    tag: 'Retractable Roof Ocean Villa',
    pricePerNight: 125000,
    originalPrice: 150000,
    amenities: ['Water Slide into Lagoon', 'Stargazing Master Bedroom', 'Private Catamaran', 'Undersea Dining'],
  },
];

export const ACTIVITIES_DATA = [
  {
    "id": "act-sg-sightseeing-1",
    "name": "Jewel Changi Airport: Canopy Park & Rain Vortex Experience",
    "destination": "Singapore",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 14250,
    "duration": "3 - 4 Hours",
    "price": 1250,
    "originalPrice": 1650,
    "badge": "Bestseller",
    "highlights": [
      "HSBC Rain Vortex (World’s tallest indoor waterfall)",
      "Canopy Bridge with glass flooring",
      "Hedge Maze & Discovery Slides",
      "Instant QR confirmation"
    ]
  },
  {
    "id": "act-sg-sightseeing-2",
    "name": "Gardens by the Bay & Cloud Forest Avatar Experience",
    "destination": "Singapore",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 19400,
    "duration": "4 - 5 Hours",
    "price": 2450,
    "originalPrice": 3100,
    "badge": "Top Rated",
    "highlights": [
      "Flower Dome & Floral Fantasy exotic conservatories",
      "Misty 35-meter indoor waterfall & Skyway",
      "SuperTree Grove Light & Sound Show",
      "Skip-the-line e-ticket"
    ]
  },
  {
    "id": "act-sg-sightseeing-3",
    "name": "Marina Bay Sands SkyPark Observation Deck (57th Floor)",
    "destination": "Singapore",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 11800,
    "duration": "2 Hours",
    "price": 2100,
    "originalPrice": 2700,
    "badge": "Must Do",
    "highlights": [
      "57th floor panoramic views of Singapore skyline",
      "Canal Sampan boat ride at The Shoppes",
      "Sunset cocktail voucher included",
      "Direct mobile voucher entry"
    ]
  },
  {
    "id": "act-sg-sightseeing-4",
    "name": "Singapore Flyer Giant Observation Wheel & Time Capsule",
    "destination": "Singapore",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9600,
    "duration": "1.5 Hours",
    "price": 2650,
    "originalPrice": 3300,
    "badge": "Panoramic Vista",
    "highlights": [
      "165m giant observation wheel rotating capsule",
      "360° views stretching to Malaysia & Indonesia",
      "Interactive Time Capsule immersive history",
      "Express boarding option"
    ]
  },
  {
    "id": "act-sg-sightseeing-5",
    "name": "Merlion Park & Marina Bay Waterfront Skyline Walk",
    "destination": "Singapore",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 8400,
    "duration": "2 Hours",
    "price": 950,
    "originalPrice": 1300,
    "badge": "City Landmark",
    "highlights": [
      "Iconic 8.6-meter half-lion half-fish Merlion statue",
      "Stroll along scenic waterfront boardwalk to Esplanade",
      "Spectacular Spectra light & water show viewpoint",
      "Professional guide & photos included"
    ]
  },
  {
    "id": "act-sg-sightseeing-6",
    "name": "Mount Faber Peak & Singapore Cable Car Sky Pass",
    "destination": "Singapore",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 10200,
    "duration": "2 - 3 Hours",
    "price": 2250,
    "originalPrice": 2900,
    "badge": "Scenic Flight",
    "highlights": [
      "Mount Faber line & Sentosa line round-trip pass",
      "Fly across Keppel Harbour and rainforest treetops",
      "Arboreal Bell of Happiness blessing at Faber Peak",
      "Glass-bottom cabin upgrade option"
    ]
  },
  {
    "id": "act-sg-theme-parks-1",
    "name": "Universal Studios Singapore VIP All-Access Express Pass",
    "destination": "Singapore",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 24300,
    "duration": "Full Day",
    "price": 6800,
    "originalPrice": 8500,
    "badge": "VIP Experience",
    "highlights": [
      "Battlestar Galactica dueling supersonic coasters",
      "Transformers The Ride: 3D Ultimate Battle",
      "Skip-the-line Universal Express access",
      "Exclusive food & souvenir voucher"
    ]
  },
  {
    "id": "act-sg-theme-parks-2",
    "name": "Wild Wild Wet Water Theme Park Premium Day Pass",
    "destination": "Singapore",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 6900,
    "duration": "5 Hours",
    "price": 2200,
    "originalPrice": 2800,
    "badge": "Family Fun",
    "highlights": [
      "Royal Flush 4G high-speed hybrid water ride",
      "Torpedo free-fall capsule slide from 18m",
      "Shiok River lazy float & wave pool",
      "Family cabana access included"
    ]
  },
  {
    "id": "act-sg-theme-parks-3",
    "name": "Adventure Cove Waterpark: High-Speed Hydro Coasters",
    "destination": "Singapore",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 13400,
    "duration": "Full Day",
    "price": 2950,
    "originalPrice": 3700,
    "badge": "High Thrills",
    "highlights": [
      "Riptide Rocket: Hydro-magnetic uphill water coaster",
      "Pipeline Plunge & Tidal Twister high-speed tubes",
      "Adventure River winding past 14 stunning themed habitats",
      "All-day unlimited locker and tube access"
    ]
  },
  {
    "id": "act-sg-theme-parks-4",
    "name": "Science Centre Singapore & Omni-Theatre 8K Dome",
    "destination": "Singapore",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 7800,
    "duration": "4 Hours",
    "price": 1400,
    "originalPrice": 1800,
    "badge": "Interactive Wonder",
    "highlights": [
      "Over 1,000 hands-on interactive scientific exhibits",
      "Southeast Asia’s first 8K 3D digital dome theatre",
      "Indoor Fire Tornado show reaching 5 meters high",
      "Laser Maze and Mirror Maze challenges"
    ]
  },
  {
    "id": "act-sg-theme-parks-5",
    "name": "Kiztopia Marina Square Mega Indoor Playground",
    "destination": "Singapore",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 5200,
    "duration": "3 Hours",
    "price": 1650,
    "originalPrice": 2100,
    "badge": "Kids Favorite",
    "highlights": [
      "18,000 sq ft mega indoor playground with 18 play areas",
      "Giant spiral slides, mega ball pits and ninja courses",
      "Role-play rooms with mini supermarket and kitchens",
      "AR gaming wall and parent cafe"
    ]
  },
  {
    "id": "act-sg-theme-parks-6",
    "name": "Sentosa 4D AdventureLand Unlimited 4-in-1 Combo Pass",
    "destination": "Singapore",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.6,
    "reviewsCount": 6100,
    "duration": "2.5 Hours",
    "price": 2400,
    "originalPrice": 3000,
    "badge": "4D Action",
    "highlights": [
      "Journey 2: The Mysterious Island 4D simulation",
      "Extreme Log Ride virtual rollercoaster with water spray",
      "Desperados interactive motion-sensor shoot-out",
      "Haunted Mine Ride thrilling simulation"
    ]
  },
  {
    "id": "act-sg-adventure-1",
    "name": "Sentosa Skypark: AJ Hackett Giant Swing & Skybridge Walk",
    "destination": "Singapore",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 8120,
    "duration": "2 Hours",
    "price": 3900,
    "originalPrice": 4800,
    "badge": "Extreme Thrill",
    "highlights": [
      "Swoop at 120km/h over Siloso Beach",
      "47m high open-air glass Skybridge walk",
      "High-definition 4K video recording package",
      "Full safety harness & briefing"
    ]
  },
  {
    "id": "act-sg-adventure-2",
    "name": "Singapore Night Safari Tram & Guided Rainforest Trail",
    "destination": "Singapore",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 16500,
    "duration": "4 Hours",
    "price": 3450,
    "originalPrice": 4200,
    "badge": "Wildlife Icon",
    "highlights": [
      "World’s first nocturnal wildlife park",
      "Multi-sensory tram ride through 6 geo-zones",
      "Creatures of the Night live amphitheater show",
      "Guided Fishing Cat and Leopard trails"
    ]
  },
  {
    "id": "act-sg-adventure-3",
    "name": "Mega Adventure Park Sentosa: 450m MegaZip & MegaClimb",
    "destination": "Singapore",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 7300,
    "duration": "2.5 Hours",
    "price": 3200,
    "originalPrice": 3950,
    "badge": "High Flying",
    "highlights": [
      "Fly at 60 km/h on 450-meter MegaZip over the sea",
      "36-obstacle high rope aerial course in the treetops",
      "MegaJump 15-meter free-fall parachute simulator",
      "Full harness & professional instructors"
    ]
  },
  {
    "id": "act-sg-adventure-4",
    "name": "iFly Singapore: Indoor Skydiving Flight Experience",
    "destination": "Singapore",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1521673845931-7b0fb2a78dd9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 9100,
    "duration": "2 Hours",
    "price": 4800,
    "originalPrice": 5800,
    "badge": "Skydive Rush",
    "highlights": [
      "World’s largest themed wind tunnel (16.5ft wide)",
      "True freefall simulation equivalent to 12,000 feet drop",
      "Two skydiving flights per person with IBA certified coach",
      "Full flight gear, helmet and certificate included"
    ]
  },
  {
    "id": "act-sg-adventure-5",
    "name": "Singapore Zoo Jungle Breakfast with Wildlife Experience",
    "destination": "Singapore",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 11200,
    "duration": "4 Hours",
    "price": 3100,
    "originalPrice": 3800,
    "badge": "Signature Breakfast",
    "highlights": [
      "Award-winning international breakfast buffet in Ah Meng Lodge",
      "Close encounters & photos with Orangutans and Tamanduas",
      "All-day tram ride pass inside Singapore Zoo",
      "Admission to Splash Safari and Elephants of Asia"
    ]
  },
  {
    "id": "act-sg-adventure-6",
    "name": "River Wonders Singapore & Amazon River Quest Boat Ride",
    "destination": "Singapore",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9800,
    "duration": "3.5 Hours",
    "price": 2800,
    "originalPrice": 3400,
    "badge": "River Safari",
    "highlights": [
      "Asia’s first and only river-themed wildlife park",
      "Giant Panda Forest housing Kai Kai & Jia Jia",
      "Amazon River Quest open-top boat ride through jungle rapids",
      "10-meter deep Amazon Flooded Forest freshwater aquarium"
    ]
  },
  {
    "id": "act-sg-cultural-tours-1",
    "name": "Chinatown & Little India Heritage Trail with Michelin Hawker Feasts",
    "destination": "Singapore",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 7400,
    "duration": "3.5 Hours",
    "price": 3100,
    "originalPrice": 3900,
    "badge": "Foodie Trail",
    "highlights": [
      "Tasting at Michelin Bib Gourmand food stalls",
      "Buddha Tooth Relic Temple & Sri Veeramakaliamman",
      "Stories of Singapore Chinese & Indian pioneers",
      "Fresh teh tarik and kaya toast tasting"
    ]
  },
  {
    "id": "act-sg-cultural-tours-2",
    "name": "Kampong Glam & Peranakan Heritage Shophouses Walk",
    "destination": "Singapore",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 5200,
    "duration": "3 Hours",
    "price": 2600,
    "originalPrice": 3200,
    "badge": "Heritage Classic",
    "highlights": [
      "Golden-domed Sultan Mosque & Arab Street perfumes",
      "Haji Lane street art and indie boutiques",
      "Peranakan tile painting and traditional kuih tasting",
      "Local historian guide included"
    ]
  },
  {
    "id": "act-sg-cultural-tours-3",
    "name": "National Museum of Singapore & Singapore River Walk",
    "destination": "Singapore",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 6100,
    "duration": "2.5 Hours",
    "price": 1500,
    "originalPrice": 1900,
    "badge": "History & Arts",
    "highlights": [
      "Singapore’s oldest museum with 19th-century dome",
      "Story of Singapore interactive permanent gallery",
      "Glass passage art installation \"Story of the Forest\"",
      "Audio guide and curator tour included"
    ]
  },
  {
    "id": "act-sg-cultural-tours-4",
    "name": "Peranakan Museum & Katong Shophouse Photo Tour",
    "destination": "Singapore",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 4800,
    "duration": "3 Hours",
    "price": 2200,
    "originalPrice": 2800,
    "badge": "Cultural Gem",
    "highlights": [
      "Explore 9 galleries of Peranakan Straits Chinese culture",
      "Pastel shophouses photo session along Koon Seng Road",
      "Authentic Nonya laksa and kueh chang tasting",
      "Traditional beaded slippers embroidery demonstration"
    ]
  },
  {
    "id": "act-sg-cultural-tours-5",
    "name": "Asian Civilisations Museum & Empress Place History",
    "destination": "Singapore",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 5700,
    "duration": "2.5 Hours",
    "price": 1750,
    "originalPrice": 2200,
    "badge": "Pan-Asian Heritage",
    "highlights": [
      "Tang Shipwreck treasures with 1,200-year-old gold & ceramics",
      "Ancestral sculptures and Southeast Asian maritime trade artifacts",
      "Historic riverside colonial architecture of Empress Place",
      "Skip-the-line museum voucher"
    ]
  },
  {
    "id": "act-sg-cultural-tours-6",
    "name": "Buddha Tooth Relic Temple & Chinatown Night Food Crawl",
    "destination": "Singapore",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 8200,
    "duration": "3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Night Culture",
    "highlights": [
      "Rooftop prayer wheel & gold stupa at Buddha Tooth Relic",
      "Evening lantern light walk through Smith Street food street",
      "Tasting Hainanese chicken rice, satay and sugar cane juice",
      "Traditional tea house ceremony stop"
    ]
  },
  {
    "id": "act-sg-water-sports-1",
    "name": "Sentosa HydroDash Floating Aqua Park & Sea Kayak Adventure",
    "destination": "Singapore",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 5800,
    "duration": "2 - 3 Hours",
    "price": 2150,
    "originalPrice": 2800,
    "badge": "Water Thrill",
    "highlights": [
      "Singapore’s premier inflatable water obstacle course",
      "Double-seater sea kayak rental along Palawan Beach",
      "Target zones, trampoline leaps & balance beams",
      "Life vests and locker included"
    ]
  },
  {
    "id": "act-sg-water-sports-2",
    "name": "Adventure Cove: Rainbow Reef Snorkel with 20,000 Fish",
    "destination": "Singapore",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 9400,
    "duration": "Full Day",
    "price": 3100,
    "originalPrice": 3850,
    "badge": "Marine Wonder",
    "highlights": [
      "Rainbow Reef swim alongside 20,000 colorful fish",
      "Riptide Rocket southeast Asia first hydro-magnetic coaster",
      "Dueling Racer high-speed downhill mat slides",
      "Ray Bay stingray encounter upgrade option"
    ]
  },
  {
    "id": "act-sg-water-sports-3",
    "name": "Siloso Beach Stand-Up Paddleboarding & Sea Rafting",
    "destination": "Singapore",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 4200,
    "duration": "2 Hours",
    "price": 1950,
    "originalPrice": 2500,
    "badge": "Paddle & Surf",
    "highlights": [
      "Stable SUP boards and carbon fiber paddles for all levels",
      "Scenic coastal paddling past Siloso Beach islands",
      "Certified lifeguard surveillance and safety briefing",
      "Shower, changing room and locker facilities"
    ]
  },
  {
    "id": "act-sg-water-sports-4",
    "name": "Ola Beach Club Sentosa: Jet Ski & Banana Boat Ride",
    "destination": "Singapore",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 6300,
    "duration": "1.5 Hours",
    "price": 3800,
    "originalPrice": 4600,
    "badge": "High Speed Fun",
    "highlights": [
      "High-powered Yamaha Waverunner jet ski circuit",
      "Exhilarating 6-person banana boat towed sprint",
      "Hawaiian-themed beach club lounge access",
      "Tiki cocktail voucher included"
    ]
  },
  {
    "id": "act-sg-water-sports-5",
    "name": "Southern Islands Luxury Yacht Sunset Cruise",
    "destination": "Singapore",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 5100,
    "duration": "4 Hours",
    "price": 4600,
    "originalPrice": 5800,
    "badge": "Luxury Yacht",
    "highlights": [
      "Cruise past Lazarus Island, St John Island & Kusu",
      "Anchor in turquoise lagoon for swimming and paddleboarding",
      "Open sun deck with Bluetooth sound system and free-flow drinks",
      "Breathtaking Marina Bay skyline view at sunset"
    ]
  },
  {
    "id": "act-sg-water-sports-6",
    "name": "Singapore River Cruise by Traditional Electric Bumboats",
    "destination": "Singapore",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 14500,
    "duration": "1 Hour",
    "price": 1650,
    "originalPrice": 2100,
    "badge": "Historic Cruise",
    "highlights": [
      "Historic 40-minute cruise gliding past Clarke Quay & Boat Quay",
      "Pass beneath heritage bridges Cavenagh & Anderson",
      "Unobstructed photo views of Merlion and Marina Bay Sands",
      "Eco-friendly whisper-quiet electric bumboat"
    ]
  },
  {
    "id": "act-db-sightseeing-1",
    "name": "Burj Khalifa: At The Top (Level 124, 125 & 148 SKY VIP)",
    "destination": "Dubai",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 32400,
    "duration": "2 - 3 Hours",
    "price": 7800,
    "originalPrice": 9400,
    "badge": "World Icon",
    "highlights": [
      "Fastest double-deck elevator in the world (10m/s)",
      "Highest outdoor observation deck on earth (555m)",
      "Complimentary Arabic sweets and luxury dates",
      "360° Arabian Gulf panoramic view"
    ]
  },
  {
    "id": "act-db-sightseeing-2",
    "name": "Museum of the Future Priority Access Ticket",
    "destination": "Dubai",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 18200,
    "duration": "4 Hours",
    "price": 4400,
    "originalPrice": 5600,
    "badge": "Futuristic Marvel",
    "highlights": [
      "Journey through Year 2071 space & climate zones",
      "Stunning futuristic calligraphy photo stops",
      "Interactive AI and robotics exhibitions",
      "Skip-the-line QR code confirmation"
    ]
  },
  {
    "id": "act-db-sightseeing-3",
    "name": "Dubai Frame & Glass Skydeck Golden Experience",
    "destination": "Dubai",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 14100,
    "duration": "2 Hours",
    "price": 1600,
    "originalPrice": 2100,
    "badge": "Golden Frame",
    "highlights": [
      "150-meter high glass bridge connecting old & new Dubai",
      "Walk directly on transparent glass floor in the clouds",
      "Museum of Dubai past, present and future",
      "Fast-track electronic entry"
    ]
  },
  {
    "id": "act-db-sightseeing-4",
    "name": "Dubai Miracle Garden: 150 Million Blooming Flowers",
    "destination": "Dubai",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 16800,
    "duration": "3 Hours",
    "price": 2100,
    "originalPrice": 2700,
    "badge": "Floral Kingdom",
    "highlights": [
      "World’s largest natural flower garden with 72,000 sqm",
      "Guinness World Record Emirates A380 full-size floral replica",
      "Smurfs Village and heart-shaped floral passage",
      "Direct mobile gate pass"
    ]
  },
  {
    "id": "act-db-sightseeing-5",
    "name": "The View at The Palm 360° Observation Deck",
    "destination": "Dubai",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 12500,
    "duration": "2 Hours",
    "price": 2500,
    "originalPrice": 3200,
    "badge": "Palm Panorama",
    "highlights": [
      "Level 52 of Palm Tower at 240 meters high",
      "Spectacular uninterrupted view of Palm Jumeirah fronds",
      "Interactive aquarium tunnel and architectural theatre",
      "Next-level VIP lounge option"
    ]
  },
  {
    "id": "act-db-sightseeing-6",
    "name": "Dubai Fountain Lake Ride by Traditional Abra Boat",
    "destination": "Dubai",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 10900,
    "duration": "1 Hour",
    "price": 1800,
    "originalPrice": 2300,
    "badge": "Front-Row Show",
    "highlights": [
      "Front-row boat cruise on Burj Lake during fountain show",
      "Jets shooting 140 meters in the air choreographed to music",
      "Stunning night-time view of illuminated Burj Khalifa",
      "Traditional wooden abra with comfortable seating"
    ]
  },
  {
    "id": "act-db-theme-parks-1",
    "name": "Atlantis Aquaventure Waterpark & Lost Chambers Aquarium",
    "destination": "Dubai",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 26000,
    "duration": "Full Day",
    "price": 7500,
    "originalPrice": 9200,
    "badge": "World’s #1 Waterpark",
    "highlights": [
      "105 record-breaking slides and attractions",
      "Leap of Faith 9-story near-vertical drop into shark lagoon",
      "Access to 65,000 marine animals in Lost Chambers",
      "1km private pristine white-sand beach"
    ]
  },
  {
    "id": "act-db-theme-parks-2",
    "name": "IMG Worlds of Adventure: Marvel & Cartoon Network Pass",
    "destination": "Dubai",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 12100,
    "duration": "Full Day",
    "price": 5600,
    "originalPrice": 6900,
    "badge": "Mega Theme Park",
    "highlights": [
      "Largest temperature-controlled indoor theme park in world",
      "Velociraptor launch coaster hitting 100km/h in 2.5s",
      "Thor Thunder Spin and Avengers 3D battle",
      "Unlimited ride pass included"
    ]
  },
  {
    "id": "act-db-theme-parks-3",
    "name": "Motiongate Dubai: Hollywood DreamWorks & Lionsgate Park",
    "destination": "Dubai",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 14700,
    "duration": "Full Day",
    "price": 4900,
    "originalPrice": 6200,
    "badge": "Hollywood Magic",
    "highlights": [
      "World’s first John Wick 4D spinning rollercoaster",
      "Hunger Games Capitol Bullet Train high-speed launch",
      "Indoor DreamWorks zones with Shrek, Madagascar and Kung Fu Panda",
      "Smurfs Village live shows and family rides"
    ]
  },
  {
    "id": "act-db-theme-parks-4",
    "name": "Legoland Dubai & Legoland Water Park 1-Day 2-Parks Pass",
    "destination": "Dubai",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 9200,
    "duration": "Full Day",
    "price": 4700,
    "originalPrice": 5900,
    "badge": "Lego Fun",
    "highlights": [
      "Over 40 LEGO themed rides, shows and building experiences",
      "Build-A-Raft River where kids customize LEGO rafts",
      "Joker Soaker water playground with 300-gallon bucket",
      "Miniland with 20 million LEGO bricks of Dubai landmarks"
    ]
  },
  {
    "id": "act-db-theme-parks-5",
    "name": "Real Madrid World Dubai: Football Champions Theme Park",
    "destination": "Dubai",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 8100,
    "duration": "5 Hours",
    "price": 5200,
    "originalPrice": 6500,
    "badge": "First in World",
    "highlights": [
      "World’s first football club theme park with 40+ attractions",
      "Hala Madrid coaster: Region’s first wooden rollercoaster",
      "Stars Flying: 460-meter high swing tower ride",
      "Official trophy room and VR locker room experience"
    ]
  },
  {
    "id": "act-db-theme-parks-6",
    "name": "Ski Dubai: Indoor Snow Park & Gentoo Penguin Encounter",
    "destination": "Dubai",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 16300,
    "duration": "3 Hours",
    "price": 4200,
    "originalPrice": 5200,
    "badge": "Sub-Zero Desert",
    "highlights": [
      "Minus 4°C indoor snow wonderland inside Mall of the Emirates",
      "Meet King & Gentoo penguins in hands-on encounter",
      "Giant Snow Bullet zip line 16 meters above snow slopes",
      "Winter jackets, fleece gloves, snow boots and helmet included"
    ]
  },
  {
    "id": "act-db-adventure-1",
    "name": "Premium Red Dunes Desert Safari, Quad Biking & BBQ Dinner",
    "destination": "Dubai",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 29500,
    "duration": "6 - 7 Hours",
    "price": 3950,
    "originalPrice": 5100,
    "badge": "Epic Desert Safari",
    "highlights": [
      "4x4 Land Cruiser dune bashing in Lahbab Desert",
      "30-minute self-drive Yamaha quad bike experience",
      "Camel riding, sandboarding and Henna art",
      "Live Belly Dance, Tanoura and Fire shows with 5-star BBQ"
    ]
  },
  {
    "id": "act-db-adventure-2",
    "name": "Skydive Dubai: Tandem Skydive over Palm Jumeirah",
    "destination": "Dubai",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1521673845931-7b0fb2a78dd9?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 8900,
    "duration": "3 Hours",
    "price": 39500,
    "originalPrice": 45000,
    "badge": "Ultimate Bucket List",
    "highlights": [
      "Freefall from 13,000 feet at 190 km/h",
      "Iconic bird’s eye view over Palm Jumeirah and Dubai Marina",
      "Personal videographer and HD edited highlights video",
      "USPA certified professional tandem instructor"
    ]
  },
  {
    "id": "act-db-adventure-3",
    "name": "XLine Dubai Marina: World’s Longest Urban Zipline",
    "destination": "Dubai",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 6800,
    "duration": "1.5 Hours",
    "price": 12500,
    "originalPrice": 15000,
    "badge": "Urban Super Zip",
    "highlights": [
      "1-kilometer zip line from 170-meter Amwaj Tower",
      "Reach speeds of up to 80 km/h in superman belly-down flight",
      "Soar over luxury superyachts and skyscrapers of Dubai Marina",
      "Helmet-mounted GoPro footage and photos included"
    ]
  },
  {
    "id": "act-db-adventure-4",
    "name": "Deep Dive Dubai: World’s Deepest Pool (60m) Discovery",
    "destination": "Dubai",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 4200,
    "duration": "3 Hours",
    "price": 18000,
    "originalPrice": 22000,
    "badge": "Sunken City",
    "highlights": [
      "60-meter deep sunken underwater ruined city",
      "Filled with 14 million liters of warm 30°C fresh water",
      "Explore submerged apartments, arcade games and classic cars",
      "Certified dive guide and high-tech equipment provided"
    ]
  },
  {
    "id": "act-db-adventure-5",
    "name": "Hot Air Balloon Flight over Dubai Desert at Sunrise",
    "destination": "Dubai",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 7100,
    "duration": "4 Hours",
    "price": 19200,
    "originalPrice": 23500,
    "badge": "Sunrise Majesty",
    "highlights": [
      "Float 4,000 feet above the red desert dunes",
      "World’s only in-flight peregrine falcon show from the basket",
      "Gourmet breakfast banquet in royal desert retreat",
      "Flight certificate signed by balloon captain"
    ]
  },
  {
    "id": "act-db-adventure-6",
    "name": "Hatta Wadi Hub: Mountain Biking, Kayaking & Axe Throwing",
    "destination": "Dubai",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 5600,
    "duration": "7 Hours",
    "price": 3600,
    "originalPrice": 4500,
    "badge": "Mountain Adventure",
    "highlights": [
      "Kayak on emerald green waters of Hatta Dam reservoir",
      "Tackle mountain bike trails through Hajar rocky mountain ranges",
      "Target archery, axe throwing and twin zipline course",
      "Roundtrip transfer from Dubai included"
    ]
  },
  {
    "id": "act-db-cultural-tours-1",
    "name": "Old Dubai Heritage Walking Tour, Gold Souk & Abra Creek Cruise",
    "destination": "Dubai",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 11400,
    "duration": "3 Hours",
    "price": 2100,
    "originalPrice": 2750,
    "badge": "Historic Charm",
    "highlights": [
      "Bargaining tour through glittering Gold and Spice Souks",
      "Traditional wooden Abra boat ride across Dubai Creek",
      "Tasting Arabian street food, shawarma & camel milk gelato",
      "Al Seef vintage quarter photo walk"
    ]
  },
  {
    "id": "act-db-cultural-tours-2",
    "name": "Al Fahidi Historical District & Traditional Coffee Ceremony",
    "destination": "Dubai",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 6200,
    "duration": "2.5 Hours",
    "price": 2400,
    "originalPrice": 3000,
    "badge": "Deep Culture",
    "highlights": [
      "Wind-tower architecture and ancient gypsum shophouses",
      "Dubai Coffee Museum live roasting & cardamom brewing",
      "Visit to Dubai Museum & historic Sheikh Saeed Al Maktoum House",
      "Calligraphy master demonstration"
    ]
  },
  {
    "id": "act-db-cultural-tours-3",
    "name": "Sheikh Zayed Grand Mosque Day Tour from Dubai",
    "destination": "Dubai",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 19800,
    "duration": "6 Hours",
    "price": 4800,
    "originalPrice": 5900,
    "badge": "Architectural Gem",
    "highlights": [
      "82 white marble domes and 24-karat gold-gilded chandeliers",
      "World’s largest hand-knotted Persian carpet",
      "Louvre Abu Dhabi photo stop on Saadiyat Island",
      "Luxury coach transfer and traditional abaya/kandora loan"
    ]
  },
  {
    "id": "act-db-cultural-tours-4",
    "name": "Jumeirah Mosque Guided Cultural Heritage Tour",
    "destination": "Dubai",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 5400,
    "duration": "2 Hours",
    "price": 1800,
    "originalPrice": 2300,
    "badge": "Open Doors",
    "highlights": [
      "Dubai’s only mosque open to non-Muslim visitors 6 days a week",
      "Fatimid architectural style built of pure white stone",
      "Interactive Q&A on Emirati customs and Islamic traditions",
      "Complimentary Arabic coffee, tea and pastries"
    ]
  },
  {
    "id": "act-db-cultural-tours-5",
    "name": "Al Shindagha Heritage Museum & Perfume House Experience",
    "destination": "Dubai",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 4600,
    "duration": "3 Hours",
    "price": 1600,
    "originalPrice": 2000,
    "badge": "Heritage Scent",
    "highlights": [
      "Interactive Perfume House learning the art of Oud and Bukhoor",
      "Birthplace of Dubai’s ruling Al Maktoum family",
      "High-tech multimedia exhibitions of Dubai Creek maritime history",
      "Scenic creekside heritage courtyard"
    ]
  },
  {
    "id": "act-db-cultural-tours-6",
    "name": "Dubai Heritage Village & Traditional Falconry Display",
    "destination": "Dubai",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 3900,
    "duration": "2.5 Hours",
    "price": 2600,
    "originalPrice": 3200,
    "badge": "Bedouin Tradition",
    "highlights": [
      "Live demonstration of desert hunting with trained Saker falcons",
      "Pottery, weaving and blacksmith artisanal workshops",
      "Traditional pearl diving exhibits and dhow boat making",
      "Bedouin tent storytelling with dates and mint tea"
    ]
  },
  {
    "id": "act-db-water-sports-1",
    "name": "Dubai Marina 60-Min Jet Ski Tour to Burj Al Arab",
    "destination": "Dubai",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 13100,
    "duration": "1 - 2 Hours",
    "price": 6400,
    "originalPrice": 7900,
    "badge": "High Speed Thrill",
    "highlights": [
      "High-performance Yamaha Waverunner jet ski ride",
      "Unmatched photo stop right in front of Burj Al Arab",
      "Glance past Dubai Marina skyline and Atlantis Palm",
      "Certified safety instructor with waterproof phone case"
    ]
  },
  {
    "id": "act-db-water-sports-2",
    "name": "Luxury Yacht Cruise with Live BBQ & Swimming at JBR Beach",
    "destination": "Dubai",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9800,
    "duration": "3 Hours",
    "price": 4200,
    "originalPrice": 5400,
    "badge": "Luxury Yacht",
    "highlights": [
      "64ft double-deck luxury motor yacht cruise",
      "Live grill BBQ with sliders, skewers and cold beverages",
      "Swimming stop in crystal turquoise waters near JBR",
      "Upper sunbed lounge with Bose surround sound system"
    ]
  },
  {
    "id": "act-db-water-sports-3",
    "name": "Hydroflight Flyboarding Session at Dubai Harbour",
    "destination": "Dubai",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 5400,
    "duration": "1 Hour",
    "price": 6900,
    "originalPrice": 8400,
    "badge": "Gravity Defying",
    "highlights": [
      "Soar 10 meters above Arabian Gulf waters powered by jet thrust",
      "Learn balance, hovering and dolphin dives in minutes",
      "One-on-one coaching by certified hydroflight instructor",
      "Spectacular backdrop of Ain Dubai and Marina towers"
    ]
  },
  {
    "id": "act-db-water-sports-4",
    "name": "The Yellow Boats Speedboat Sightseeing Thrill Tour",
    "destination": "Dubai",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 11200,
    "duration": "1.5 Hours",
    "price": 3600,
    "originalPrice": 4400,
    "badge": "Speedboat Cruise",
    "highlights": [
      "High-speed 99-minute powerboat sprint across open water",
      "Cruise around Palm Jumeirah, Atlantis, Burj Al Arab & JBR",
      "High-adrenaline sharp turns and ocean spray",
      "Entertaining commentary and photo stops"
    ]
  },
  {
    "id": "act-db-water-sports-5",
    "name": "Deep Sea Big Game Sport Fishing Charter Dubai",
    "destination": "Dubai",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 4100,
    "duration": "4 Hours",
    "price": 7800,
    "originalPrice": 9600,
    "badge": "Ocean Fishing",
    "highlights": [
      "33ft fully equipped sport fishing boat with sonar fish finder",
      "Fish for Kingfish, Barracuda, Cobia and Queenfish",
      "All Shimano rods, reels, live baits and lures provided",
      "Complimentary ice box and fish cleaning service"
    ]
  },
  {
    "id": "act-db-water-sports-6",
    "name": "Dubai Marina Wakeboarding & Kneeboarding Session",
    "destination": "Dubai",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 3800,
    "duration": "2 Hours",
    "price": 5100,
    "originalPrice": 6200,
    "badge": "Wakeboarding",
    "highlights": [
      "High-powered Malibu Wakesetter towboat with perfect wake",
      "Suitable for first-timers to advanced jumping tricks",
      "Professional tow-rope, board and impact vest included",
      "High-speed action photos taken from boat"
    ]
  },
  {
    "id": "act-pr-sightseeing-1",
    "name": "Eiffel Tower Summit Access & Seine River Sunset Cruise",
    "destination": "Paris",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 21500,
    "duration": "4 Hours",
    "price": 5900,
    "originalPrice": 7200,
    "badge": "Romantic Icon",
    "highlights": [
      "Elevator pass directly to the Top Summit (276m)",
      "Stunning vista of Notre Dame, Sacré-Cœur and Arc de Triomphe",
      "1-hour illuminated cruise on the Seine",
      "Glass of chilled French Champagne included"
    ]
  },
  {
    "id": "act-pr-sightseeing-2",
    "name": "Arc de Triomphe Rooftop & Champs-Élysées Panoramic Walk",
    "destination": "Paris",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1509299349698-dd22323b5963?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 14200,
    "duration": "2 Hours",
    "price": 1850,
    "originalPrice": 2400,
    "badge": "Must See",
    "highlights": [
      "Skip-the-line rooftop climb with 12 star-shaped avenues view",
      "Tomb of the Unknown Soldier and eternal flame ceremony",
      "Museum exhibits documenting Napoleonic victories",
      "Direct digital barcoded voucher"
    ]
  },
  {
    "id": "act-pr-sightseeing-3",
    "name": "Sainte-Chapelle & Conciergerie Royal Stained Glass Pass",
    "destination": "Paris",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 12600,
    "duration": "2.5 Hours",
    "price": 2400,
    "originalPrice": 3000,
    "badge": "Gothic Jewel",
    "highlights": [
      "1,113 magnificent 13th-century stained glass panels",
      "Former royal palace where Marie Antoinette was imprisoned",
      "Medieval Hall of the Soldiers with soaring vaulted ceilings",
      "Priority skip-the-line entry ticket"
    ]
  },
  {
    "id": "act-pr-sightseeing-4",
    "name": "Montparnasse Tower 360° Open-Air Rooftop Observatory",
    "destination": "Paris",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9400,
    "duration": "1.5 Hours",
    "price": 2100,
    "originalPrice": 2600,
    "badge": "Eiffel View",
    "highlights": [
      "56th indoor floor and 59th open-air roof terrace at 210m",
      "Best unobstructed direct viewpoint looking at Eiffel Tower",
      "Fastest lift in Europe reaching 56th floor in 38 seconds",
      "Interactive touchscreens and binoculars"
    ]
  },
  {
    "id": "act-pr-sightseeing-5",
    "name": "Panthéon Crypt & Panoramic Colonnade Dome Climb",
    "destination": "Paris",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 7800,
    "duration": "2 Hours",
    "price": 1650,
    "originalPrice": 2100,
    "badge": "Neoclassical",
    "highlights": [
      "Final resting place of Voltaire, Rousseau, Victor Hugo & Marie Curie",
      "Original Foucault pendulum proving earth rotation",
      "Climb to the outer colonnade for 360° Latin Quarter views",
      "Direct mobile entry voucher"
    ]
  },
  {
    "id": "act-pr-sightseeing-6",
    "name": "Place du Trocadéro & Palais de Chaillot Scenic Tour",
    "destination": "Paris",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 6500,
    "duration": "2 Hours",
    "price": 1200,
    "originalPrice": 1600,
    "badge": "Classic Photo",
    "highlights": [
      "World-famous elevated terrace framing full Eiffel Tower",
      "Warsaw Fountains water cannon spectacle",
      "Historical architecture of Palais de Chaillot museums",
      "Professional souvenir digital photos included"
    ]
  },
  {
    "id": "act-pr-theme-parks-1",
    "name": "Disneyland Paris 1-Day 2-Parks Magic Hopper Ticket",
    "destination": "Paris",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 35000,
    "duration": "Full Day",
    "price": 8900,
    "originalPrice": 11200,
    "badge": "Pure Magic",
    "highlights": [
      "Hop seamlessly between Disneyland Park & Walt Disney Studios",
      "Avengers Campus Marvel superhero rides",
      "Star Wars Hyperspace Mountain and Big Thunder Mountain",
      "Nighttime Disney Illuminations fireworks & drone show"
    ]
  },
  {
    "id": "act-pr-theme-parks-2",
    "name": "Parc Astérix Gallic Thrill Theme Park Ticket & Shuttle",
    "destination": "Paris",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 8700,
    "duration": "Full Day",
    "price": 5400,
    "originalPrice": 6800,
    "badge": "Wild Coasters",
    "highlights": [
      "Toutatis: Fastest rollercoaster in France (110 km/h)",
      "OzIris Egyptian inverted suspended rollercoaster",
      "Hilarious Gaulish & Roman gladiators live stunt show",
      "Direct luxury coach transfer from central Paris"
    ]
  },
  {
    "id": "act-pr-theme-parks-3",
    "name": "Jardin d’Acclimatation Vintage Amusement & Theme Park",
    "destination": "Paris",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 7100,
    "duration": "4 - 5 Hours",
    "price": 1950,
    "originalPrice": 2500,
    "badge": "Vintage Charm",
    "highlights": [
      "Historic 45-acre amusement park in Bois de Boulogne",
      "42 rides including 4 thrilling rollercoasters and steam train",
      "Enchanted river boat ride and farm animal interactions",
      "Direct access next to Fondation Louis Vuitton"
    ]
  },
  {
    "id": "act-pr-theme-parks-4",
    "name": "FlyView Paris: Virtual Reality Jetpack Flight Over Paris",
    "destination": "Paris",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 6400,
    "duration": "1.5 Hours",
    "price": 2600,
    "originalPrice": 3200,
    "badge": "VR Adventure",
    "highlights": [
      "Strap into motion-synchronized VR jetpack harness",
      "Fly over the top of Eiffel Tower, Louvre and Notre Dame",
      "360° bird’s-eye perspective with wind and motion effects",
      "Bonus world wonders virtual flight pass"
    ]
  },
  {
    "id": "act-pr-theme-parks-5",
    "name": "Aquaboulevard Paris: Giant Tropical Indoor Water Park",
    "destination": "Paris",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.6,
    "reviewsCount": 8200,
    "duration": "Full Day",
    "price": 2400,
    "originalPrice": 3100,
    "badge": "Indoor Splash",
    "highlights": [
      "Largest urban water park in Europe with 7,000 sqm area",
      "11 giant waterslides, wave pools and bubbling jacuzzis",
      "Wakebox indoor wakeboard surfing simulator",
      "Sandy outdoor beach and grassy sunbathing lawns"
    ]
  },
  {
    "id": "act-pr-theme-parks-6",
    "name": "Musée Grévin Paris Wax Museum & Hall of Mirrors",
    "destination": "Paris",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 9300,
    "duration": "2.5 Hours",
    "price": 2750,
    "originalPrice": 3400,
    "badge": "Celebrity Encounters",
    "highlights": [
      "Pose with over 200 lifelike wax figures from history and Hollywood",
      "Famous 1900 Mirage Hall of Mirrors optical illusions show",
      "French Kings, Marie Antoinette and modern sports champions",
      "Behind-the-scenes sculpting discovery workshop"
    ]
  },
  {
    "id": "act-pr-adventure-1",
    "name": "Paris Catacombs Underground Secret Tunnel Expedition",
    "destination": "Paris",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 12300,
    "duration": "2 Hours",
    "price": 3800,
    "originalPrice": 4700,
    "badge": "Underground Secret",
    "highlights": [
      "Skip-the-line VIP entry 20 meters below Paris streets",
      "Resting place of over six million Parisians",
      "Access to restricted chambers closed to general public",
      "Engaging English audio guide narrating hidden history"
    ]
  },
  {
    "id": "act-pr-adventure-2",
    "name": "Hot Air Balloon Flight over Fontainebleau Castle Forest",
    "destination": "Paris",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 3400,
    "duration": "3.5 Hours",
    "price": 19500,
    "originalPrice": 23000,
    "badge": "VIP Aerial Adventure",
    "highlights": [
      "Gentle sunrise ascent floating above royal French châteaux",
      "Panoramic sweeps over Fontainebleau forest and lochs",
      "Traditional aeronaut flight baptism with French bubbly",
      "Flight certificate signed by the chief balloon pilot"
    ]
  },
  {
    "id": "act-pr-adventure-3",
    "name": "Paris Ghost & Dark Legends Night Walking Tour",
    "destination": "Paris",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 7800,
    "duration": "2 Hours",
    "price": 2200,
    "originalPrice": 2800,
    "badge": "Gothic Thrills",
    "highlights": [
      "Venture through eerie medieval alleyways near Notre Dame",
      "Tales of alchemists, Templar curses and royal guillotine",
      "Stop at the haunted Square du Vert-Galant",
      "Led by charismatic gothic historian guide"
    ]
  },
  {
    "id": "act-pr-adventure-4",
    "name": "Vintage Citroën 2CV Open-Roof Night Drive of Paris",
    "destination": "Paris",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 6100,
    "duration": "2 Hours",
    "price": 5800,
    "originalPrice": 7200,
    "badge": "French Vintage",
    "highlights": [
      "Cruise in iconic 1970s convertible Citroën 2CV",
      "Champs-Élysées, Moulin Rouge and Eiffel Tower sparkling light show",
      "Chauffeur clad in classic French striped marinière",
      "Chilled bottle of French Champagne in car"
    ]
  },
  {
    "id": "act-pr-adventure-5",
    "name": "Paris High-Speed Electric Scooter Secret Tour",
    "destination": "Paris",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1509299349698-dd22323b5963?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 5200,
    "duration": "2.5 Hours",
    "price": 2900,
    "originalPrice": 3600,
    "badge": "Urban Glide",
    "highlights": [
      "Glide along car-free Seine riverbanks and hidden squares",
      "Cross Pont Alexandre III and explore courtyards of Louvre",
      "All Segway/e-scooter gear and helmet provided",
      "Engaging headsets with guide narrative"
    ]
  },
  {
    "id": "act-pr-adventure-6",
    "name": "Forest High-Rope Canopy Zip Line at Parc Floral",
    "destination": "Paris",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 4300,
    "duration": "3 Hours",
    "price": 2500,
    "originalPrice": 3200,
    "badge": "Treetop Action",
    "highlights": [
      "4 aerial courses ranging from 7 to 15 meters high",
      "Giant 200m zipline flying through ancient oak canopies",
      "Monkey bridges, swinging logs and Tarzan drops",
      "Continuous lifeline safety carabiner system"
    ]
  },
  {
    "id": "act-pr-cultural-tours-1",
    "name": "Louvre Museum Masterpieces Priority Tour (Mona Lisa & Venus)",
    "destination": "Paris",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 28900,
    "duration": "3 Hours",
    "price": 6200,
    "originalPrice": 7800,
    "badge": "Art Masterpiece",
    "highlights": [
      "Express dedicated group entrance bypassing long lines",
      "Front-row view of Mona Lisa, Winged Victory & Venus de Milo",
      "Led by a licensed art historian guide",
      "Whisper headsets ensuring pristine audio quality"
    ]
  },
  {
    "id": "act-pr-cultural-tours-2",
    "name": "Montmartre & Sacré-Cœur Bohemian Artists Guided Walk",
    "destination": "Paris",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 15600,
    "duration": "2.5 Hours",
    "price": 2600,
    "originalPrice": 3300,
    "badge": "Bohemian Magic",
    "highlights": [
      "Place du Tertre open-air painters square",
      "Picasso, Van Gogh and Renoir former secret studios",
      "Inside look at the majestic white Basilica of Sacré-Cœur",
      "Tasting fresh warm butter croissants and macarons"
    ]
  },
  {
    "id": "act-pr-cultural-tours-3",
    "name": "Palace of Versailles King’s State Apartments & Musical Gardens",
    "destination": "Paris",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 24200,
    "duration": "5 Hours",
    "price": 5400,
    "originalPrice": 6800,
    "badge": "Royal Palace",
    "highlights": [
      "Hall of Mirrors with 357 golden reflective arches",
      "King and Queen opulent state bedchambers",
      "Musical Fountain show across 2,000 acres of royal gardens",
      "Roundtrip luxury train or coach transfer option"
    ]
  },
  {
    "id": "act-pr-cultural-tours-4",
    "name": "Musée d’Orsay Impressionist Masters Priority Tour",
    "destination": "Paris",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 17800,
    "duration": "2.5 Hours",
    "price": 3200,
    "originalPrice": 4000,
    "badge": "Impressionist Gold",
    "highlights": [
      "World’s largest collection of Van Gogh, Monet & Renoir",
      "Converted 1900 Beaux-Arts railway station architecture",
      "Famous giant clock face silhouette photo viewpoint",
      "Licensed art expert commentary"
    ]
  },
  {
    "id": "act-pr-cultural-tours-5",
    "name": "Latin Quarter & Sorbonne Literary History Walking Tour",
    "destination": "Paris",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 8900,
    "duration": "2.5 Hours",
    "price": 2100,
    "originalPrice": 2700,
    "badge": "Literary Paris",
    "highlights": [
      "Shakespeare and Company legendary bohemian bookstore",
      "Sorbonne University grounds and medieval Cluny Abbey",
      "Hemingway and James Joyce former Parisian haunts",
      "Artisanal cheese and baguette tasting stop"
    ]
  },
  {
    "id": "act-pr-cultural-tours-6",
    "name": "French Bakery Croissant & Macaron Masterclass",
    "destination": "Paris",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 6700,
    "duration": "3 Hours",
    "price": 4900,
    "originalPrice": 6100,
    "badge": "Pastry Chef",
    "highlights": [
      "Hands-on French pastry workshop with master pâtissier",
      "Laminating real butter dough for crispy flaky croissants",
      "Piping and baking delicate almond Parisian macarons",
      "Take home a box of 12 freshly baked pastries"
    ]
  },
  {
    "id": "act-pr-water-sports-1",
    "name": "Seine River Speedboat & Stand-Up Paddleboard Adventure",
    "destination": "Paris",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 4100,
    "duration": "2 Hours",
    "price": 3950,
    "originalPrice": 4900,
    "badge": "Paddle on the Seine",
    "highlights": [
      "Paddle past iconic Parisian stone bridges and houseboats",
      "Twin-engine RIB support boat and safety marshal escort",
      "All neoprene wetsuits, buoyancy aids and paddles provided",
      "Incredible low-angle perspective photos of the Eiffel Tower"
    ]
  },
  {
    "id": "act-pr-water-sports-2",
    "name": "Paris Waterskiing & Wakeboard Club on the River Seine",
    "destination": "Paris",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3200,
    "duration": "2.5 Hours",
    "price": 4800,
    "originalPrice": 5900,
    "badge": "Waterskiing France",
    "highlights": [
      "Tow-boat wakeboarding in the calm Seine river basin",
      "One-on-one coaching for both beginners and experienced riders",
      "Professional MasterCraft competition boat tow line",
      "Heated riverside clubhouse and hot showers access"
    ]
  },
  {
    "id": "act-pr-water-sports-3",
    "name": "Electric Self-Drive Boating on Bassin de la Villette",
    "destination": "Paris",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 5600,
    "duration": "2 Hours",
    "price": 3200,
    "originalPrice": 3900,
    "badge": "Self Drive Boat",
    "highlights": [
      "Captain your own electric eco-boat without any boat license",
      "Cruise along Canal Saint-Martin through tree-lined waterways",
      "Spacious wooden deck with picnic table for up to 7 people",
      "Life jackets, nautical map and safety instruction provided"
    ]
  },
  {
    "id": "act-pr-water-sports-4",
    "name": "Kayaking Past Historic Castles on the Marne River Paris",
    "destination": "Paris",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "reviewsCount": 3800,
    "duration": "3 Hours",
    "price": 2700,
    "originalPrice": 3400,
    "badge": "River Kayaking",
    "highlights": [
      "Paddle tranquil natural loops of the Marne river",
      "Pass 19th-century impressionist guinguettes riverside taverns",
      "Double or single high-stability sea kayaks",
      "Dry bags, paddles and waterproof phone cases included"
    ]
  },
  {
    "id": "act-pr-water-sports-5",
    "name": "Seine Sightseeing Gourmet Dinner Cruise with Live Violin",
    "destination": "Paris",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "reviewsCount": 16500,
    "duration": "3 Hours",
    "price": 7800,
    "originalPrice": 9600,
    "badge": "Romantic Dinner",
    "highlights": [
      "All-glass panoramic boat with uninterrupted night views",
      "4-course French gourmet meal with foie gras & beef tenderloin",
      "Live romantic violin and singer performance on board",
      "Glass of French Champagne and premier cru wine pairing"
    ]
  },
  {
    "id": "act-pr-water-sports-6",
    "name": "Stand-Up Paddleboard Sunset Tour by Eiffel Tower",
    "destination": "Paris",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 4400,
    "duration": "2 Hours",
    "price": 4200,
    "originalPrice": 5100,
    "badge": "Sunset Paddle",
    "highlights": [
      "Exclusive twilight paddle on calm section of Parisian waterways",
      "Eiffel Tower hourly sparkling light show visible from water",
      "Professional instructor guiding group formations",
      "Hot herbal tea and French pastries after session"
    ]
  },
  {
    "id": "act-bk-sightseeing-1",
    "name": "Mahanakhon SkyWalk Glass Tray Observation Deck (314m)",
    "destination": "Bangkok",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "2 - 3 Hours",
    "price": 2100,
    "originalPrice": 2700,
    "badge": "Bestseller",
    "highlights": [
      "Highest 360-degree glass floor observation deck in Thailand",
      "Interactive video-themed elevator reaching 74th floor in 50s",
      "Rooftop cocktail voucher at 314 meters high",
      "Instant digital mobile confirmation"
    ]
  },
  {
    "id": "act-bk-sightseeing-2",
    "name": "Grand Palace & Wat Pho Giant Reclining Buddha Tour",
    "destination": "Bangkok",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1563492065599-3580f777d066?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "2 - 3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Top Rated",
    "highlights": [
      "Temple of the Emerald Buddha (Wat Phra Kaew)",
      "46-meter long golden Reclining Buddha at Wat Pho",
      "Royal coronation hall and gilded stupas",
      "Licensed English-speaking official palace guide"
    ]
  },
  {
    "id": "act-bk-sightseeing-3",
    "name": "Wat Arun (Temple of Dawn) Porcelain Spire Climb",
    "destination": "Bangkok",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "2 - 3 Hours",
    "price": 1200,
    "originalPrice": 1600,
    "badge": "Must Do",
    "highlights": [
      "Climb the 82-meter floral porcelain mosaic prang",
      "Traditional Thai royal costume rental for photography",
      "Riverside sunset view over Chao Phraya",
      "River cross-ferry ticket included"
    ]
  },
  {
    "id": "act-bk-sightseeing-4",
    "name": "Golden Mount (Wat Saket) Panoramic City View",
    "destination": "Bangkok",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "2 - 3 Hours",
    "price": 950,
    "originalPrice": 1300,
    "badge": "Popular",
    "highlights": [
      "Ascend 320 winding shaded steps flanked by prayer bells",
      "Panoramic 360° view of historic Rattanakosin Island",
      "Ring the holy lucky bells and receive monk blessing",
      "Tranquil gardens with misty water fountains"
    ]
  },
  {
    "id": "act-bk-sightseeing-5",
    "name": "Baiyoke Sky Hotel 84th Floor Revolving Deck & Buffet",
    "destination": "Bangkok",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "2 - 3 Hours",
    "price": 2500,
    "originalPrice": 3200,
    "badge": "Popular",
    "highlights": [
      "Revolving open-air roof deck on 84th floor",
      "Seafood and international buffet banquet included",
      "Views stretching to Gulf of Thailand on clear days",
      "Complimentary drink at 83rd floor Roof Top Bar"
    ]
  },
  {
    "id": "act-bk-sightseeing-6",
    "name": "Asiatique Sky: Bangkok’s Giant Riverside Ferris Wheel",
    "destination": "Bangkok",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1563492065599-3580f777d066?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "2 - 3 Hours",
    "price": 1400,
    "originalPrice": 1800,
    "badge": "Popular",
    "highlights": [
      "60-meter high air-conditioned glass observation cabin",
      "Overlooks Chao Phraya river and Asiatique night bazaar",
      "Calayan VIP crystal glass bottom cabin upgrade",
      "Direct QR mobile gate pass"
    ]
  },
  {
    "id": "act-bk-theme-parks-1",
    "name": "Siam Amazing Park: Giant Wave Pool & Roller Coasters",
    "destination": "Bangkok",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "Full Day",
    "price": 1850,
    "originalPrice": 2400,
    "badge": "Bestseller",
    "highlights": [
      "Guinness World Records certified largest wave pool",
      "Vortex suspended looping coaster 765 meters long",
      "Boomerang inverse thrill drop coaster",
      "International buffet lunch included"
    ]
  },
  {
    "id": "act-bk-theme-parks-2",
    "name": "Dream World Bangkok Theme Park with Snow Town Entry",
    "destination": "Bangkok",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "Full Day",
    "price": 2200,
    "originalPrice": 2900,
    "badge": "Top Rated",
    "highlights": [
      "Unlimited access to 30 thrilling rides and attractions",
      "Sub-zero Snow Town sledding and snowman making",
      "Hollywood Action live stunt explosion performance",
      "Roundtrip hotel transfer option"
    ]
  },
  {
    "id": "act-bk-theme-parks-3",
    "name": "Pororo AquaPark Bangkok: Rooftop Water Slides Haven",
    "destination": "Bangkok",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "Full Day",
    "price": 1350,
    "originalPrice": 1750,
    "badge": "Must Do",
    "highlights": [
      "Over 10,000 sqm rooftop water park on CentralPlaza Bangna",
      "Pororo’s Funnel award-winning 158m waterslide",
      "Tong Tong’s Magic Slide and lazy river float",
      "Full locker, towel and tube rentals"
    ]
  },
  {
    "id": "act-bk-theme-parks-4",
    "name": "SEA LIFE Bangkok Ocean World & 4D Cinema Combo",
    "destination": "Bangkok",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "Full Day",
    "price": 2600,
    "originalPrice": 3300,
    "badge": "Popular",
    "highlights": [
      "Southeast Asia’s largest aquarium with 30,000 creatures",
      "Glass-bottom ocean feeder boat cruise",
      "Walk through 270-degree underwater acrylic tunnel",
      "Gentoo penguin ice adventure zone"
    ]
  },
  {
    "id": "act-bk-theme-parks-5",
    "name": "Line Village Bangkok: Digital Adventure Indoor Park",
    "destination": "Bangkok",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "Full Day",
    "price": 1900,
    "originalPrice": 2400,
    "badge": "Popular",
    "highlights": [
      "23 themed rooms celebrating LINE FRIENDS characters",
      "Interactive VR roller coaster and digital games",
      "Brown & Cony immersive photo zones",
      "Exclusive merchandise gift included"
    ]
  },
  {
    "id": "act-bk-theme-parks-6",
    "name": "Columbia Pictures Aquaverse Theme Park Day Pass & Coach",
    "destination": "Bangkok",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "Full Day",
    "price": 3800,
    "originalPrice": 4700,
    "badge": "Popular",
    "highlights": [
      "World’s first Columbia Pictures water theme park",
      "Ghostbusters proton stream water coaster",
      "Jumanji jungle raft and Hotel Transylvania splash zone",
      "Luxury roundtrip coach from central Bangkok"
    ]
  },
  {
    "id": "act-bk-adventure-1",
    "name": "Bangkok Jungle Hidden Oasis Bike & Longtail Boat Tour",
    "destination": "Bangkok",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 2900,
    "originalPrice": 3600,
    "badge": "Bestseller",
    "highlights": [
      "Explore Bang Krachao island “Green Lung of Bangkok”",
      "Pedal elevated concrete paths through mangrove canopies",
      "Traditional longtail boat crossing across Chao Phraya",
      "Local organic coconut plantation tasting"
    ]
  },
  {
    "id": "act-bk-adventure-2",
    "name": "Pattaya ATV Safari & Extreme Zipline Day Trip from Bangkok",
    "destination": "Bangkok",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 4500,
    "originalPrice": 5600,
    "badge": "Top Rated",
    "highlights": [
      "Drive Polaris ATV quad bikes through muddy jungle trails",
      "Canopy tree-top ziplines across tropical valleys",
      "Shooting range and target practice challenges",
      "Air-conditioned private van transfer and lunch"
    ]
  },
  {
    "id": "act-bk-adventure-3",
    "name": "Muay Thai Live Championship Match at Rajadamnern Stadium",
    "destination": "Bangkok",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 4100,
    "originalPrice": 5200,
    "badge": "Must Do",
    "highlights": [
      "VIP Club Class Ringside seats right next to the canvas",
      "World’s oldest and most prestigious Muay Thai boxing arena",
      "Traditional live Sarama musical accompaniment",
      "Complimentary cold draft beers and souvenir t-shirt"
    ]
  },
  {
    "id": "act-bk-adventure-4",
    "name": "Safari World & Marine Park Open-Air Jungle Drive",
    "destination": "Bangkok",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Popular",
    "highlights": [
      "8-kilometer safari drive feeding giraffes and zebras",
      "Daily live dolphin shows and Hollywood cowboy stunt spectacle",
      "Orangutan boxing and spy war live action drama",
      "Buffet lunch included in tour"
    ]
  },
  {
    "id": "act-bk-adventure-5",
    "name": "Tandem Skydiving Dropzone Pattaya Excursion from Bangkok",
    "destination": "Bangkok",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1521673845931-7b0fb2a78dd9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 24000,
    "originalPrice": 28000,
    "badge": "Popular",
    "highlights": [
      "Freefall from 13,000 feet above the Gulf of Thailand",
      "Reach 200 km/h with USPA certified instructor",
      "Full 4K GoPro video and photo montage package",
      "Door-to-door hotel transport in private SUV"
    ]
  },
  {
    "id": "act-bk-adventure-6",
    "name": "Erawan National Park 7-Tiered Waterfall Trek & River Kwai",
    "destination": "Bangkok",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 3900,
    "originalPrice": 4800,
    "badge": "Popular",
    "highlights": [
      "Trek up 7 tiers of turquoise natural limestone pools",
      "Swim with natural fish spa in crystal mountain cascades",
      "Walk on historic Bridge over the River Kwai in Kanchanaburi",
      "Organic Thai lunch at riverside restaurant"
    ]
  },
  {
    "id": "act-bk-cultural-tours-1",
    "name": "Chao Phraya Tourist Boat Hop-On Hop-Off Cruise & Night Market",
    "destination": "Bangkok",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 950,
    "originalPrice": 1300,
    "badge": "Bestseller",
    "highlights": [
      "Unlimited boat rides between 11 major river piers",
      "Stops at Wat Arun porcelain spires, Grand Palace & ICONSIAM",
      "Open-air top deck breeze with English commentary",
      "Direct access to Asiatique the Riverfront night market"
    ]
  },
  {
    "id": "act-bk-cultural-tours-2",
    "name": "Damnoen Saduak Floating Market & Maeklong Train Market",
    "destination": "Bangkok",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 2400,
    "originalPrice": 3100,
    "badge": "Top Rated",
    "highlights": [
      "Witness market stalls folding back inches from passing train",
      "Paddleboat cruise among floating fruit and noodle merchants",
      "Coconut sugar farm visit and fresh mango sticky rice tasting",
      "Guided pickup from central Bangkok hotel"
    ]
  },
  {
    "id": "act-bk-cultural-tours-3",
    "name": "Bangkok Michelin Midnight Food Tour by Tuk Tuk",
    "destination": "Bangkok",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 3200,
    "originalPrice": 3900,
    "badge": "Must Do",
    "highlights": [
      "Ride glowing neon electric Tuk Tuks through old town",
      "Tasting legendary Michelin Bib Gourmand Pad Thai Thip Samai",
      "Crispy pork belly noodles and savory chicken satay",
      "Secret rooftop bar cocktail overlooking illuminated Wat Arun"
    ]
  },
  {
    "id": "act-bk-cultural-tours-4",
    "name": "Ayutthaya UNESCO World Heritage Ancient Temples Tour",
    "destination": "Bangkok",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 3600,
    "originalPrice": 4500,
    "badge": "Popular",
    "highlights": [
      "Explore 600-year-old capital of the Kingdom of Siam",
      "Famous Buddha head embedded in ancient banyan tree roots",
      "Gilded ruins of Wat Phra Si Sanphet and Wat Chaiwatthanaram",
      "Traditional longtail boat cruise around historical island"
    ]
  },
  {
    "id": "act-bk-cultural-tours-5",
    "name": "Jim Thompson House & Traditional Silk Weaving Heritage",
    "destination": "Bangkok",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 1650,
    "originalPrice": 2100,
    "badge": "Popular",
    "highlights": [
      "Six traditional teakwood houses surrounded by jungle gardens",
      "Rare Southeast Asian art and Buddhist sculpture collections",
      "Live silk cocoons unraveling and hand-loom weaving display",
      "Canal-side traditional Thai restaurant voucher"
    ]
  },
  {
    "id": "act-bk-cultural-tours-6",
    "name": "Chinatown (Yaowarat) Heritage Walk & Street Food Crawl",
    "destination": "Bangkok",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 2100,
    "originalPrice": 2700,
    "badge": "Popular",
    "highlights": [
      "Explore neon-lit Yaowarat road and fragrant Chinese medicine shops",
      "Taste Guay Jub pepper rolled noodles and dim sum buns",
      "Visit Wat Traimit housing world’s largest 5.5-ton solid gold Buddha",
      "Chinese herbal tea and roasted chestnut tasting"
    ]
  },
  {
    "id": "act-bk-water-sports-1",
    "name": "Bangkok Wake Park Cable Wakeboarding & Water Ski Session",
    "destination": "Bangkok",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 2350,
    "originalPrice": 3000,
    "badge": "Bestseller",
    "highlights": [
      "Five-corner overhead cable system for continuous wakeboarding",
      "Kickers, sliders and funboxes for all skill levels",
      "Pro board, helmet and life vest gear included",
      "Relaxing poolside bar and smoothie cafe"
    ]
  },
  {
    "id": "act-bk-water-sports-2",
    "name": "Chao Phraya River Sunset Kayaking by Wat Arun",
    "destination": "Bangkok",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Top Rated",
    "highlights": [
      "Paddle past gilded temples lit up against evening sky",
      "Explore quiet Bangkok canal waterways (khlongs)",
      "High-stability sea kayaks with dry bags and headlights",
      "Complimentary cold fresh young coconut at finish"
    ]
  },
  {
    "id": "act-bk-water-sports-3",
    "name": "Pattaya Coral Island Speedboat, Jet Ski & Parasailing Day Pass",
    "destination": "Bangkok",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 3400,
    "originalPrice": 4200,
    "badge": "Must Do",
    "highlights": [
      "Speedboat sprint to Koh Larn white-sand Coral Island",
      "High-flying parasailing dip over emerald sea",
      "Jet ski sprint and banana boat ride across waves",
      "Fresh seafood lunch on Tien Beach"
    ]
  },
  {
    "id": "act-bk-water-sports-4",
    "name": "Bangkok Stand-Up Paddleboard Canal Exploration",
    "destination": "Bangkok",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 2100,
    "originalPrice": 2600,
    "badge": "Popular",
    "highlights": [
      "Paddle through serene historic Thonburi residential canals",
      "Glance into authentic wooden stilt homes and orchids",
      "Beginner coaching and top-quality paddleboards",
      "Fresh cold tropical fruits and iced tea"
    ]
  },
  {
    "id": "act-bk-water-sports-5",
    "name": "Private Longtail Canal Boat Speed Sprint on Chao Phraya",
    "destination": "Bangkok",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 2600,
    "originalPrice": 3300,
    "badge": "Popular",
    "highlights": [
      "High-powered V8 customized Thai longtail speed craft",
      "Roar through historic canals and Bangkok flood gates",
      "Stop at artist village Baan Silapin for puppet theatre",
      "Safety life vests and captain included"
    ]
  },
  {
    "id": "act-bk-water-sports-6",
    "name": "Chao Phraya Princess Luxury Dinner Cruise with Live Saxophone",
    "destination": "Bangkok",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 2950,
    "originalPrice": 3800,
    "badge": "Popular",
    "highlights": [
      "2-hour luxury evening river cruise with open-air upper deck",
      "International and Thai seafood buffet with giant river prawns",
      "Live pop and 80s saxophone serenade",
      "Spectacular illuminated night views of Wat Arun & Grand Palace"
    ]
  },
  {
    "id": "act-ld-sightseeing-1",
    "name": "The London Eye 360° Glass Capsule & Fast-Track Admission",
    "destination": "London",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "2 - 3 Hours",
    "price": 3800,
    "originalPrice": 4600,
    "badge": "Bestseller",
    "highlights": [
      "Fast-track VIP boarding avoiding standby lines",
      "135-meter high views of Big Ben, Parliament and Buckingham",
      "High-tech touchscreen interactive guide in capsule",
      "Complimentary 4D cinema experience"
    ]
  },
  {
    "id": "act-ld-sightseeing-2",
    "name": "Tower of London & Crown Jewels Exhibition Priority Pass",
    "destination": "London",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "2 - 3 Hours",
    "price": 3400,
    "originalPrice": 4200,
    "badge": "Top Rated",
    "highlights": [
      "See 23,000 dazzling gemstones of the British Crown Jewels",
      "Tour led by traditional Yeoman Warder (Beefeater)",
      "Explore the 1000-year-old White Tower and Medieval Palace",
      "Legendary Ravenmaster raven enclosures"
    ]
  },
  {
    "id": "act-ld-sightseeing-3",
    "name": "The View from The Shard 360° Open Deck (Level 72)",
    "destination": "London",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "2 - 3 Hours",
    "price": 3900,
    "originalPrice": 4800,
    "badge": "Must Do",
    "highlights": [
      "Western Europe’s tallest skyscraper observation deck at 310m",
      "Level 68, 69 indoor decks & Level 72 open-air sky deck",
      "Views extending up to 40 miles across London and beyond",
      "Champagne toast package option"
    ]
  },
  {
    "id": "act-ld-sightseeing-4",
    "name": "St. Paul’s Cathedral Whispering Gallery & Golden Dome Climb",
    "destination": "London",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "2 - 3 Hours",
    "price": 2500,
    "originalPrice": 3100,
    "badge": "Popular",
    "highlights": [
      "Sir Christopher Wren’s 17th-century masterpiece cathedral",
      "Whisper across 33-meter dome in famous Whispering Gallery",
      "Climb 528 steps to Golden Gallery for panoramic skyline",
      "Crypt tombs of Admiral Nelson and Duke of Wellington"
    ]
  },
  {
    "id": "act-ld-sightseeing-5",
    "name": "Tower Bridge Glass Floor Walkway & Victorian Engine Rooms",
    "destination": "London",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "2 - 3 Hours",
    "price": 1750,
    "originalPrice": 2200,
    "badge": "Popular",
    "highlights": [
      "Walk across 42m high glass floor looking straight down at Thames",
      "Watch red double-decker buses and boats drive right beneath your feet",
      "Explore original steam-powered Victorian bascule engines",
      "Interactive bridge lift schedule & history"
    ]
  },
  {
    "id": "act-ld-sightseeing-6",
    "name": "Westminster Abbey Royal Tombs & Poets’ Corner Tour",
    "destination": "London",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "2 - 3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Popular",
    "highlights": [
      "Site of every British royal coronation since 1066",
      "Poets’ Corner resting place of Dickens, Shakespeare & Newton",
      "Coronation Chair holding the Stone of Scone",
      "Comprehensive English audio tour by Jeremy Irons"
    ]
  },
  {
    "id": "act-ld-theme-parks-1",
    "name": "Warner Bros. Studio Tour London: The Making of Harry Potter",
    "destination": "London",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "Full Day",
    "price": 9200,
    "originalPrice": 11500,
    "badge": "Bestseller",
    "highlights": [
      "Step onto Great Hall, Diagon Alley & Platform 9¾ sets",
      "Board the original Hogwarts Express steam locomotive",
      "Taste authentic frothy Butterbeer at the Backlot Cafe",
      "Roundtrip luxury coach from central London"
    ]
  },
  {
    "id": "act-ld-theme-parks-2",
    "name": "Thorpe Park Resort: Extreme Rollercoaster Day Pass",
    "destination": "London",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "Full Day",
    "price": 4800,
    "originalPrice": 6100,
    "badge": "Top Rated",
    "highlights": [
      "Hyperia: UK’s tallest & fastest rollercoaster (236ft, 80mph)",
      "Stealth: 0 to 80mph in 1.8 seconds catapult coaster",
      "THE SWARM: UK’s only winged inverted coaster",
      "Direct shuttle bus connection from Staines station"
    ]
  },
  {
    "id": "act-ld-theme-parks-3",
    "name": "Chessington World of Adventures & Theme Park Safari",
    "destination": "London",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "Full Day",
    "price": 4400,
    "originalPrice": 5600,
    "badge": "Must Do",
    "highlights": [
      "Mandrill Mayhem: World’s first Jumanji rollercoaster",
      "Vampire suspended coaster swooping through trees",
      "Over 1,000 exotic animals in Chessington Zoo",
      "SEA LIFE Centre and Gruffalo River Ride"
    ]
  },
  {
    "id": "act-ld-theme-parks-4",
    "name": "LEGOLAND Windsor Resort Day Pass & Express Coach",
    "destination": "London",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "Full Day",
    "price": 5600,
    "originalPrice": 7000,
    "badge": "Popular",
    "highlights": [
      "Over 55 interactive rides and attractions built of LEGO bricks",
      "Flight of the Sky Lion UK’s first flying theatre",
      "LEGO City Driving School where kids get real driver licenses",
      "Direct coach from London Victoria station"
    ]
  },
  {
    "id": "act-ld-theme-parks-5",
    "name": "Shrek’s Adventure! London Immersive Family Walkthrough",
    "destination": "London",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "Full Day",
    "price": 2700,
    "originalPrice": 3400,
    "badge": "Popular",
    "highlights": [
      "Board magical 4D flying magic bus driven by Donkey",
      "10 live fairy-tale interactive comedy shows",
      "Meet Shrek, Fiona, Puss in Boots and Pinocchio",
      "Located next to London Eye on South Bank"
    ]
  },
  {
    "id": "act-ld-theme-parks-6",
    "name": "The London Dungeon: Interactive Theatrical Thrill Walk",
    "destination": "London",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "Full Day",
    "price": 2900,
    "originalPrice": 3600,
    "badge": "Popular",
    "highlights": [
      "19 live actors staging 1,000 years of gruesome London history",
      "Sweeney Todd barber shop and Jack the Ripper encounters",
      "Drop Dead 8-meter vertical freefall drop ride",
      "Tyrant boat ride on the foggy river Thames"
    ]
  },
  {
    "id": "act-ld-adventure-1",
    "name": "Up at The O2 Roof Climb Experience: London Skyline Walk",
    "destination": "London",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 4200,
    "originalPrice": 5200,
    "badge": "Bestseller",
    "highlights": [
      "Climb 52 meters up the iconic roof of The O2 arena",
      "Suspended fabric walkway with 28-degree incline",
      "Spectacular 360-degree views of Canary Wharf and Greenwich",
      "Climbing suit, boots, harness and instructor provided"
    ]
  },
  {
    "id": "act-ld-adventure-2",
    "name": "Thames Rockets: 35-Knot High Speed RIB Boat Thrill Ride",
    "destination": "London",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 4900,
    "originalPrice": 6000,
    "badge": "Top Rated",
    "highlights": [
      "880-horsepower twin-engine RIB reaching 35 knots",
      "Twist, turn and jump wakes through Canary Wharf & Greenwich",
      "Hilarious commentary from professional stand-up comedians",
      "Waterproof all-weather jackets and lifejackets provided"
    ]
  },
  {
    "id": "act-ld-adventure-3",
    "name": "The Dare Skywalk at Tottenham Hotspur Stadium",
    "destination": "London",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 4500,
    "originalPrice": 5500,
    "badge": "Must Do",
    "highlights": [
      "Scale 46.8 meters up the stadium roof onto the Golden Cockerel",
      "Step out onto the exposed glass apex walkway",
      "The Edge 42m controlled descent abseil option",
      "Full safety harness and expert climb guides"
    ]
  },
  {
    "id": "act-ld-adventure-4",
    "name": "Go Ape Cockfosters Treetop Zip-Line Adventure London",
    "destination": "London",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 3600,
    "originalPrice": 4400,
    "badge": "Popular",
    "highlights": [
      "Tree canopy rope assault courses up to 16m high",
      "Epic 160-meter zip wire soaring through Trent Park",
      "Tarzan swings, stirrup crossings and rope bridges",
      "Full Petzl safety harnesses and induction"
    ]
  },
  {
    "id": "act-ld-adventure-5",
    "name": "London Helicopter Tour: River Thames Flight Excursion",
    "destination": "London",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 18500,
    "originalPrice": 22000,
    "badge": "Popular",
    "highlights": [
      "Fly along River Thames from Battersea Heliport",
      "Bird’s eye view of Houses of Parliament, Buckingham & Tower Bridge",
      "Noise-cancelling Bose headsets with pilot commentary",
      "Champagne lounge check-in"
    ]
  },
  {
    "id": "act-ld-adventure-6",
    "name": "Secret London Underground Ghost Hunt & Necropolis Walk",
    "destination": "London",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 2100,
    "originalPrice": 2600,
    "badge": "Popular",
    "highlights": [
      "Explore abandoned tube stations and plague pits",
      "EMF ghost detector equipment provided to all guests",
      "Chilling true accounts of Victorian murders and hauntings",
      "Historic pub stop with pint of traditional British ale"
    ]
  },
  {
    "id": "act-ld-cultural-tours-1",
    "name": "British Museum & Rosetta Stone Masterpieces Guided Tour",
    "destination": "London",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 3600,
    "originalPrice": 4500,
    "badge": "Bestseller",
    "highlights": [
      "Rosetta Stone and Parthenon Sculptures in British Museum",
      "Egyptian mummies and Sutton Hoo Anglo-Saxon treasures",
      "Great Court glass roof architectural masterpiece",
      "Headsets included for clear commentary"
    ]
  },
  {
    "id": "act-ld-cultural-tours-2",
    "name": "Jack the Ripper & Haunted London Secret Ghost Walk",
    "destination": "London",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 1950,
    "originalPrice": 2500,
    "badge": "Top Rated",
    "highlights": [
      "Creep through cobblestone alleyways of Victorian Whitechapel",
      "Original crime scene investigation with Victorian handheld projector",
      "Spooky tavern stop at the 18th-century Ten Bells pub",
      "Led by bestselling Ripperologist crime author"
    ]
  },
  {
    "id": "act-ld-cultural-tours-3",
    "name": "Buckingham Palace State Rooms & Royal Mews Priority Tour",
    "destination": "London",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 4800,
    "originalPrice": 6000,
    "badge": "Must Do",
    "highlights": [
      "Walk through 19 magnificent Royal State Rooms",
      "Throne Room, White Drawing Room and 47-meter Picture Gallery",
      "Gold State Coach used in royal coronations at the Royal Mews",
      "Official audio guide narrated by King Charles III staff"
    ]
  },
  {
    "id": "act-ld-cultural-tours-4",
    "name": "Shakespeare’s Globe Theatre Guided Tour & Exhibition",
    "destination": "London",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 2200,
    "originalPrice": 2800,
    "badge": "Popular",
    "highlights": [
      "Faithful open-air reconstruction of the 1599 Elizabethan playhouse",
      "Behind-the-scenes actors dressing rooms and stage mechanics",
      "Interactive Elizabethan sword fighting demonstration",
      "Print your own sonnet on a replica 17th-century printing press"
    ]
  },
  {
    "id": "act-ld-cultural-tours-5",
    "name": "Soho & Covent Garden West End Musical Theatre Heritage",
    "destination": "London",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 2400,
    "originalPrice": 3000,
    "badge": "Popular",
    "highlights": [
      "Stroll through historic theatre alleys of Shaftesbury Avenue",
      "Stories of Phantom of the Opera, Les Misérables and Queen",
      "Covent Garden 18th-century market square street performers",
      "Traditional English pub stop with cider or craft ale"
    ]
  },
  {
    "id": "act-ld-cultural-tours-6",
    "name": "Kensington Palace & Queen Victoria Childhood State Rooms",
    "destination": "London",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 2650,
    "originalPrice": 3300,
    "badge": "Popular",
    "highlights": [
      "Birthplace of Queen Victoria and official royal residence",
      "King’s and Queen’s State Apartments with priceless artworks",
      "Princess Diana fashion and couture collection exhibits",
      "Stroll through the world-famous Sunken Garden"
    ]
  },
  {
    "id": "act-ld-water-sports-1",
    "name": "River Thames Stand Up Paddleboarding (SUP) Past Big Ben",
    "destination": "London",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 3800,
    "originalPrice": 4800,
    "badge": "Bestseller",
    "highlights": [
      "Glide calmly on historic Regent’s Canal and River Thames",
      "Paddle beneath architectural bridges and waterfront pubs",
      "British Canoeing certified instructors and premium Red Paddle boards",
      "Waterproof phone drybag and commemorative group photos"
    ]
  },
  {
    "id": "act-ld-water-sports-2",
    "name": "Lee Valley White Water Rafting: Olympic Rapid Course",
    "destination": "London",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 5900,
    "originalPrice": 7200,
    "badge": "Top Rated",
    "highlights": [
      "Tackle the official 2012 London Olympic whitewater course",
      "Grade 4 churning foam, drops and swirling eddies",
      "Expert guide seated on every raft with full safety backup",
      "Wetsuit, buoyancy aid, helmet and hot shower facilities"
    ]
  },
  {
    "id": "act-ld-water-sports-3",
    "name": "Regent’s Canal Kayak Tour Through Little Venice to Camden",
    "destination": "London",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 3100,
    "originalPrice": 3900,
    "badge": "Must Do",
    "highlights": [
      "Paddle past colourful narrowboats through Little Venice",
      "Pass through London Zoo aviaries and hear the gibbons singing",
      "Arrive right in the heart of bustling Camden Lock market",
      "Stable double or single touring kayaks with waterproof skirts"
    ]
  },
  {
    "id": "act-ld-water-sports-4",
    "name": "GoBoat Self-Drive Electric Picnic Boat on London Waters",
    "destination": "London",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 3900,
    "originalPrice": 4800,
    "badge": "Popular",
    "highlights": [
      "Captain your own silent electric boat from Paddington Basin",
      "Central picnic table made from recycled ocean plastics for 8 people",
      "Bring your own food, snacks and chilled beverages",
      "No boat driving license or experience required"
    ]
  },
  {
    "id": "act-ld-water-sports-5",
    "name": "Hydrofoil eFoil Surfing Experience on River Thames Basin",
    "destination": "London",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 6800,
    "originalPrice": 8500,
    "badge": "Popular",
    "highlights": [
      "Fly silently 2 feet above water on electric hydrofoil surfboard",
      "Handheld wireless throttle controlling propeller speeds up to 25mph",
      "Personal 1-on-1 coaching by Fliteboard certified instructor",
      "Winter drysuit and impact safety vest provided"
    ]
  },
  {
    "id": "act-ld-water-sports-6",
    "name": "Thames Sightseeing Afternoon Tea Cruise Past Tower Bridge",
    "destination": "London",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 4500,
    "originalPrice": 5600,
    "badge": "Popular",
    "highlights": [
      "90-minute river cruise departing from Tower Pier",
      "Traditional tiered cake stands with warm scones, clotted cream & jam",
      "Selection of finger sandwiches and loose-leaf English teas",
      "Glass of Prosecco and live commentary on royal landmarks"
    ]
  },
  {
    "id": "act-tk-sightseeing-1",
    "name": "Shibuya Sky 360° Open-Air Rooftop Observatory",
    "destination": "Tokyo",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "2 - 3 Hours",
    "price": 2100,
    "originalPrice": 2600,
    "badge": "Bestseller",
    "highlights": [
      "229 meters high open-air rooftop observatory above Shibuya",
      "Bird’s-eye perspective over famous Shibuya Scramble Crossing",
      "Clear views of Tokyo Tower and snow-capped Mount Fuji",
      "Sunset VIP reserved entry slot"
    ]
  },
  {
    "id": "act-tk-sightseeing-2",
    "name": "Tokyo Skytree Tembo Galleria (450m) & Asakusa Walking Tour",
    "destination": "Tokyo",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "2 - 3 Hours",
    "price": 2800,
    "originalPrice": 3600,
    "badge": "Top Rated",
    "highlights": [
      "Climb to Tembo Galleria at 450m in highest tower in the world",
      "Walk through Senso-ji Temple and Kaminarimon Thunder Gate",
      "Nakamise Dori traditional street snacks and souvenirs",
      "Fast-track e-voucher entrance"
    ]
  },
  {
    "id": "act-tk-sightseeing-3",
    "name": "Tokyo Tower Main Deck & Top Deck Tour (250m)",
    "destination": "Tokyo",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "2 - 3 Hours",
    "price": 2300,
    "originalPrice": 2900,
    "badge": "Must Do",
    "highlights": [
      "Red-and-white iconic Eiffel-inspired tower of Tokyo",
      "Top Deck glass mirrors reflecting Tokyo city lights",
      "Look-down transparent glass floor windows",
      "Welcome drink and commemorative photo card"
    ]
  },
  {
    "id": "act-tk-sightseeing-4",
    "name": "Roppongi Hills Mori Tower: Tokyo City View Sky Deck",
    "destination": "Tokyo",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "2 - 3 Hours",
    "price": 1950,
    "originalPrice": 2500,
    "badge": "Popular",
    "highlights": [
      "52nd floor observation deck and open-air Sky Deck",
      "Unmatched front-view angle looking directly at Tokyo Tower",
      "Admission includes entry to Mori Art Museum exhibitions",
      "Sunset and night panorama ticket"
    ]
  },
  {
    "id": "act-tk-sightseeing-5",
    "name": "Senso-ji Temple & Historic Asakusa Kaminarimon Gate",
    "destination": "Tokyo",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "2 - 3 Hours",
    "price": 1400,
    "originalPrice": 1800,
    "badge": "Popular",
    "highlights": [
      "Tokyo’s oldest Buddhist temple founded in 628 AD",
      "Giant 700kg red paper lantern at Kaminarimon Gate",
      "Five-story pagoda and incense burner purification ritual",
      "Traditional Omikuji fortune drawing"
    ]
  },
  {
    "id": "act-tk-sightseeing-6",
    "name": "Meiji Jingu Shrine & Harajuku Forest Sacred Walk",
    "destination": "Tokyo",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "2 - 3 Hours",
    "price": 1200,
    "originalPrice": 1600,
    "badge": "Popular",
    "highlights": [
      "170-acre tranquil sacred evergreen forest in heart of Tokyo",
      "Massive cypress wooden Torii gates and sake barrel offerings",
      "Traditional Shinto purification water pavilion ritual",
      "Guided walk leading right into buzzing Takeshita Street"
    ]
  },
  {
    "id": "act-tk-theme-parks-1",
    "name": "Tokyo Disneyland 1-Day Passport Express Pass",
    "destination": "Tokyo",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "Full Day",
    "price": 7800,
    "originalPrice": 9500,
    "badge": "Bestseller",
    "highlights": [
      "Beauty and the Beast enchanted tale trackless dark ride",
      "Space Mountain, Big Thunder Mountain & Splash Mountain",
      "Tokyo Disneyland Electrical Parade Dreamlights",
      "Direct mobile QR e-ticket"
    ]
  },
  {
    "id": "act-tk-theme-parks-2",
    "name": "Tokyo DisneySea Fantasy Springs Passport",
    "destination": "Tokyo",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "Full Day",
    "price": 8200,
    "originalPrice": 10200,
    "badge": "Top Rated",
    "highlights": [
      "Access to brand new Fantasy Springs: Frozen, Rapunzel & Peter Pan",
      "Journey to the Center of the Earth subterranean coaster",
      "Tower of Terror hotel elevator drop",
      "Venetian Gondolas water ride"
    ]
  },
  {
    "id": "act-tk-theme-parks-3",
    "name": "teamLab Planets TOKYO: Immersive Water & Body Digital Art",
    "destination": "Tokyo",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "Full Day",
    "price": 3200,
    "originalPrice": 4000,
    "badge": "Must Do",
    "highlights": [
      "Wade barefoot through knee-deep water projected with koi fish",
      "Infinite Crystal Universe light chamber with millions of LEDs",
      "Floating Flower Garden with living blooming orchids",
      "Skip-the-line timed entry ticket"
    ]
  },
  {
    "id": "act-tk-theme-parks-4",
    "name": "Sanrio Puroland Hello Kitty Indoor Theme Park Pass",
    "destination": "Tokyo",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "Full Day",
    "price": 2600,
    "originalPrice": 3300,
    "badge": "Popular",
    "highlights": [
      "Meet Hello Kitty, My Melody, Cinnamoroll & Kuromi",
      "Sanrio Character Boat Ride through colorful magical lands",
      "Kawaii musical theatre performances with aerial acrobatics",
      "Hello Kitty themed cafe and souvenir boutiques"
    ]
  },
  {
    "id": "act-tk-theme-parks-5",
    "name": "Tokyo Joypolis SEGA Indoor VR Theme Park Passport",
    "destination": "Tokyo",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "Full Day",
    "price": 2950,
    "originalPrice": 3700,
    "badge": "Popular",
    "highlights": [
      "3 floors of cutting-edge VR games and arcade attractions",
      "Gekion Live Coaster: World’s first indoor coaster with rhythm game",
      "Zero Latency VR free-roam zombie survival simulation",
      "Unlimited one-day pass to all 20+ attractions"
    ]
  },
  {
    "id": "act-tk-theme-parks-6",
    "name": "Yomiuriland Amusement Park & Jewellumination Night Ticket",
    "destination": "Tokyo",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "Full Day",
    "price": 3400,
    "originalPrice": 4200,
    "badge": "Popular",
    "highlights": [
      "Bandit: High-speed rollercoaster plunging through cherry trees",
      "Over 6.5 million jewel-colored LED illuminations in evening",
      "Gondola Sky Shuttle with Mount Fuji views",
      "Goodjoba interactive car factory workshops"
    ]
  },
  {
    "id": "act-tk-adventure-1",
    "name": "Street Go-Karting Through Akihabara & Shibuya Crossing",
    "destination": "Tokyo",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 5800,
    "originalPrice": 7200,
    "badge": "Bestseller",
    "highlights": [
      "Drive custom street-legal go-karts on real Tokyo streets",
      "Cosplay costumes of superhero and anime characters",
      "Cross the world-famous Shibuya Scramble behind guide kart",
      "Action camera mount and photo stops included"
    ]
  },
  {
    "id": "act-tk-adventure-2",
    "name": "Mount Fuji 5th Station & Hakone Ropeway Day Trip",
    "destination": "Tokyo",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 7900,
    "originalPrice": 9800,
    "badge": "Top Rated",
    "highlights": [
      "Ascend to Mt Fuji 5th Station at 2,300 meters above clouds",
      "Hakone Ropeway cable car over active Owakudani volcanic valley",
      "Sightseeing pirate ship cruise across Lake Ashi",
      "Air-conditioned coach pickup from Shinjuku"
    ]
  },
  {
    "id": "act-tk-adventure-3",
    "name": "Samurai Sword Experience & Kenbu Traditional Swordplay",
    "destination": "Tokyo",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 4900,
    "originalPrice": 6200,
    "badge": "Must Do",
    "highlights": [
      "Dress in authentic samurai Hakama robes with katana sword",
      "Learn formal iaido drawing, striking and sheathing etiquette",
      "Slice real tatami straw mats under master supervision",
      "Official samurai training certificate and photo shoot"
    ]
  },
  {
    "id": "act-tk-adventure-4",
    "name": "Ninja Training & Shuriken Throwing Secret Dojo Workshop",
    "destination": "Tokyo",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 3800,
    "originalPrice": 4700,
    "badge": "Popular",
    "highlights": [
      "Transform into a ninja in traditional black Shozoku uniform",
      "Learn stealth walking (Shinobi Aruki) and concealed weapons",
      "Target practice with metal Shuriken throwing stars and blowguns",
      "Interactive hidden door escape room mission"
    ]
  },
  {
    "id": "act-tk-adventure-5",
    "name": "Real-Life Escape Game Shibuya Underground Laboratory",
    "destination": "Tokyo",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 2700,
    "originalPrice": 3400,
    "badge": "Popular",
    "highlights": [
      "60-minute immersive puzzle solving in hyper-realistic rooms",
      "Cyberpunk Tokyo themed set designed by SCRAP Japan",
      "Bilingual English and Japanese clues and guidance",
      "Commemorative victory badge and ranking record"
    ]
  },
  {
    "id": "act-tk-adventure-6",
    "name": "Bungee Jumping over Ryujin Suspension Bridge Ibaraki",
    "destination": "Tokyo",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 9500,
    "originalPrice": 12000,
    "badge": "Popular",
    "highlights": [
      "Japan’s highest bridge bungee jump from 100 meters high",
      "Plunge toward Ryujin Gorge emerald river waters",
      "Supervised by certified international jump masters",
      "4K HD GoPro action video package included"
    ]
  },
  {
    "id": "act-tk-cultural-tours-1",
    "name": "Authentic Tea Ceremony & Kimono Experience in Yanaka",
    "destination": "Tokyo",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 3600,
    "originalPrice": 4500,
    "badge": "Bestseller",
    "highlights": [
      "Dress in silk kimono or yukata with traditional hair styling",
      "Chado tea ceremony led by licensed Urasenke tea master",
      "Whisk your own bowl of ceremonial Uji green matcha",
      "Tatami tea room photo session in tranquil heritage house"
    ]
  },
  {
    "id": "act-tk-cultural-tours-2",
    "name": "Tsukiji Outer Fish Market Food Crawl & Fresh Sushi Workshop",
    "destination": "Tokyo",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 4900,
    "originalPrice": 6100,
    "badge": "Top Rated",
    "highlights": [
      "Taste fresh Otoro fatty tuna, tamagoyaki egg & oysters",
      "Hands-on nigiri and maki sushi rolling class with master chef",
      "Select fish knife techniques and wasabi grating lesson",
      "Sake tasting pairing included"
    ]
  },
  {
    "id": "act-tk-cultural-tours-3",
    "name": "Akihabara Anime, Manga & Maid Cafe Cultural Discovery",
    "destination": "Tokyo",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 3100,
    "originalPrice": 3800,
    "badge": "Must Do",
    "highlights": [
      "Explore multi-story retro video game arcades and figure shops",
      "Visit authentic Japanese maid cafe with magical latte art chant",
      "Gashapon capsule toy hall with hundreds of machines",
      "Otaku insider guide revealing hidden back-alley gems"
    ]
  },
  {
    "id": "act-tk-cultural-tours-4",
    "name": "Traditional Asakusa Rickshaw Ride by Senso-ji Temple",
    "destination": "Tokyo",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 3500,
    "originalPrice": 4300,
    "badge": "Popular",
    "highlights": [
      "Ride in gleaming hand-pulled two-wheeled rickshaw",
      "Charismatic Shafu rickshaw puller dressed in traditional Jika-tabi",
      "Cruise through Geisha districts and Rokku entertainment streets",
      "Personal photo stops with historic temple backdrops"
    ]
  },
  {
    "id": "act-tk-cultural-tours-5",
    "name": "Sumo Stable Morning Training Session & Chanko Nabe Feast",
    "destination": "Tokyo",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 6400,
    "originalPrice": 7900,
    "badge": "Popular",
    "highlights": [
      "Watch active heavyweight Rikishi wrestlers in intense practice",
      "Hear the thundering clashing of bodies in the sacred Dohyo ring",
      "Photo opportunity alongside champion wrestlers after practice",
      "Enjoy hot traditional Chanko Nabe chicken stew with the stable"
    ]
  },
  {
    "id": "act-tk-cultural-tours-6",
    "name": "Imperial Palace East Gardens & Edo Castle Ruins Tour",
    "destination": "Tokyo",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 1800,
    "originalPrice": 2300,
    "badge": "Popular",
    "highlights": [
      "Massive stone ramparts of the historic Edo Castle Tenshudai",
      "Ninjomaru Japanese Garden with cascading koi ponds and bonsai",
      "Nijubashi double-arched stone bridge over palace moat",
      "Licensed historical guide in English"
    ]
  },
  {
    "id": "act-tk-water-sports-1",
    "name": "Tokyo Bay Sea Kayaking & Sunset Rainbow Bridge Tour",
    "destination": "Tokyo",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 4100,
    "originalPrice": 5200,
    "badge": "Bestseller",
    "highlights": [
      "Paddle along Odaiba Marine Park toward Tokyo Rainbow Bridge",
      "Breathtaking illuminated perspective of Tokyo Tower from water",
      "Twin-cockpit stable sea kayaks suited for beginners",
      "Full safety gear, dry bags and guide included"
    ]
  },
  {
    "id": "act-tk-water-sports-2",
    "name": "Odaiba Stand-Up Paddleboard & Canal Cruise Experience",
    "destination": "Tokyo",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 3500,
    "originalPrice": 4400,
    "badge": "Top Rated",
    "highlights": [
      "SUP paddle session in sheltered Odaiba calm lagoon",
      "Pass futuristic Fuji TV building and giant Gundam statue bay",
      "Beginner coaching and balance techniques session",
      "Changing room and hot shower access included"
    ]
  },
  {
    "id": "act-tk-water-sports-3",
    "name": "Sumida River Traditional Yakatabune Cruise & Tempura Feast",
    "destination": "Tokyo",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 6900,
    "originalPrice": 8500,
    "badge": "Must Do",
    "highlights": [
      "Traditional red-lantern wooden boat with tatami floor seating",
      "Freshly fried hot tempura and sashimi banquet served on board",
      "Free-flow Japanese beer, sake and green tea",
      "Cruise past Tokyo Skytree and into Tokyo Bay under Rainbow Bridge"
    ]
  },
  {
    "id": "act-tk-water-sports-4",
    "name": "Enoshima Beach Surf Lesson & Stand-Up Paddleboard School",
    "destination": "Tokyo",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 4600,
    "originalPrice": 5800,
    "badge": "Popular",
    "highlights": [
      "Catch Pacific waves overlooking Mount Fuji at Shonan beach",
      "Certified surf coaches with foam soft-top learner boards",
      "Wetsuit, surfboard and warm shower facilities included",
      "1-hour direct train from central Tokyo"
    ]
  },
  {
    "id": "act-tk-water-sports-5",
    "name": "Tokyo Bay High-Speed Jet Boat Power Sprint",
    "destination": "Tokyo",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 3800,
    "originalPrice": 4700,
    "badge": "Popular",
    "highlights": [
      "700-horsepower twin V8 marine engines reaching 45 knots",
      "Exciting 360-degree spins, fishtails and power stops",
      "Fly across Tokyo Bay past Haneda Airport and container docks",
      "All waterproof spray jackets provided"
    ]
  },
  {
    "id": "act-tk-water-sports-6",
    "name": "Tamagawa River Whitewater Rafting Rapids near Tokyo",
    "destination": "Tokyo",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 5400,
    "originalPrice": 6800,
    "badge": "Popular",
    "highlights": [
      "Navigate Grade 3 rushing rapids through scenic Mitake Gorge",
      "Cliff jumping into crystal clear mountain pools",
      "Professional river guide on every 6-person raft",
      "Only 75 minutes by train from Shinjuku station"
    ]
  },
  {
    "id": "act-pk-sightseeing-1",
    "name": "Big Buddha & Wat Chalong Panoramic Island Highlights Tour",
    "destination": "Phuket",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "2 - 3 Hours",
    "price": 1800,
    "originalPrice": 2400,
    "badge": "Bestseller",
    "highlights": [
      "45-meter tall white marble Big Buddha on Nakkerd Hill",
      "Wat Chalong: Phuket’s most revered Buddhist monastery",
      "Karon Viewpoint sweeping vista over three golden bays",
      "Cashew nut factory & honey farm tasting"
    ]
  },
  {
    "id": "act-pk-sightseeing-2",
    "name": "Promthep Cape Sunset & Windmill Viewpoint Excursion",
    "destination": "Phuket",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "2 - 3 Hours",
    "price": 2200,
    "originalPrice": 2900,
    "badge": "Top Rated",
    "highlights": [
      "Phuket’s southernmost dramatic rocky cape sunset",
      "Windmill viewpoint overlooking Ya Nui and Nai Harn beaches",
      "Fresh chilled coconut drink and snack platter",
      "Private air-conditioned SUV transfer"
    ]
  },
  {
    "id": "act-pk-sightseeing-3",
    "name": "Karon Viewpoint & Three Bays Coastal Vista Tour",
    "destination": "Phuket",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "2 - 3 Hours",
    "price": 1400,
    "originalPrice": 1900,
    "badge": "Must Do",
    "highlights": [
      "Famous scenic lookout over Kata Noi, Kata and Karon beaches",
      "Postcard-perfect turquoise ocean panoramic photographs",
      "Kata Beach seaside promenade stroll",
      "Chilled bottled mineral water and hotel pickup"
    ]
  },
  {
    "id": "act-pk-sightseeing-4",
    "name": "Samet Nangshe Viewpoint Sunrise Tour from Phuket",
    "destination": "Phuket",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "2 - 3 Hours",
    "price": 3200,
    "originalPrice": 4100,
    "badge": "Popular",
    "highlights": [
      "Watch golden dawn break over Phang Nga Bay limestone karsts",
      "360° sweeping panoramic vista above mangrove forests",
      "Hot brewed coffee and traditional Thai breakfast at sunrise",
      "4x4 mountain truck ascent included"
    ]
  },
  {
    "id": "act-pk-sightseeing-5",
    "name": "Khao Rang Hill Viewpoint & Monkeys of Phuket City Tour",
    "destination": "Phuket",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "2 - 3 Hours",
    "price": 1200,
    "originalPrice": 1600,
    "badge": "Popular",
    "highlights": [
      "Panoramic viewpoint overlooking Phuket town and Chalong bay",
      "Encounter playful wild macaque monkeys safely in natural habitat",
      "Open-air observation deck with landscaped gardens",
      "Tunk Ka cafe voucher option"
    ]
  },
  {
    "id": "act-pk-sightseeing-6",
    "name": "Cape Panwa & Phuket Marine Biological Aquarium",
    "destination": "Phuket",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "2 - 3 Hours",
    "price": 1650,
    "originalPrice": 2100,
    "badge": "Popular",
    "highlights": [
      "Scenic drive along peaceful Cape Panwa peninsula",
      "Interactive marine exhibits saving endangered sea turtles",
      "10-meter underwater tunnel with leopard sharks",
      "Tranquil coastal beach walk"
    ]
  },
  {
    "id": "act-pk-theme-parks-1",
    "name": "Andamanda Phuket Waterpark: Mythical Thai Water Kingdom",
    "destination": "Phuket",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "Full Day",
    "price": 3400,
    "originalPrice": 4200,
    "badge": "Bestseller",
    "highlights": [
      "100,000 sqm themed park celebrating Thai mythology",
      "Great Andaman Bay wave pool generating 3-meter waves",
      "Eagle Flyer and Racing Nagas high-speed freefall slides",
      "Floating swim-up pool bar and kids zone"
    ]
  },
  {
    "id": "act-pk-theme-parks-2",
    "name": "Carnival Magic Phuket: The Magical Kingdom of Lights",
    "destination": "Phuket",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "Full Day",
    "price": 4800,
    "originalPrice": 5900,
    "badge": "Top Rated",
    "highlights": [
      "Guinness World Record holder for 40 million LED lights",
      "River Carnival grand indoor theatrical parade with 150 performers",
      "Kingdom of Lights walkthrough fantasy illuminations",
      "Bird of Paradise grand royal buffet banquet"
    ]
  },
  {
    "id": "act-pk-theme-parks-3",
    "name": "Splash Jungle Waterpark Mai Khao Beach Day Pass",
    "destination": "Phuket",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "Full Day",
    "price": 2600,
    "originalPrice": 3300,
    "badge": "Must Do",
    "highlights": [
      "Boomerango vertical wall pendulum water slide",
      "Super Bowl centrifugal funnel spin slide",
      "335-meter Lazy River floating through 7 continents",
      "Wave pool and Aqua Play pool for toddlers"
    ]
  },
  {
    "id": "act-pk-theme-parks-4",
    "name": "Phuket FantaSea Cultural Theme Show & Golden Buffet",
    "destination": "Phuket",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "Full Day",
    "price": 4200,
    "originalPrice": 5300,
    "badge": "Popular",
    "highlights": [
      "Las Vegas style theatrical show with 30 elephants and acrobats",
      "Palace of the Elephants state-of-the-art 3,000-seat theatre",
      "Golden Kinnaree 4,000-seat royal banquet dining hall",
      "Festival Village carnival games and handicraft shopping"
    ]
  },
  {
    "id": "act-pk-theme-parks-5",
    "name": "Aquaria Phuket: Thailand’s Largest Oceanarium at Central",
    "destination": "Phuket",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "Full Day",
    "price": 2100,
    "originalPrice": 2700,
    "badge": "Popular",
    "highlights": [
      "25,000 marine animals across 9 aquatic discovery zones",
      "Walk through giant South China Sea tunnel with manta rays",
      "Trick Eye Museum 3D optical illusion AR art combo",
      "Undersea dining lounge and mermaid show"
    ]
  },
  {
    "id": "act-pk-theme-parks-6",
    "name": "Blue Tree Phuket: Crystal Lagoon & Slip N Fly Water Playground",
    "destination": "Phuket",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "Full Day",
    "price": 2800,
    "originalPrice": 3600,
    "badge": "Popular",
    "highlights": [
      "17,000 sqm man-made crystal turquoise lagoon",
      "Slip N Fly extreme catapult water ramps launching riders 10m high",
      "Ninja warrior course and cliff jumping platforms",
      "Paddleboarding and water hammocks included"
    ]
  },
  {
    "id": "act-pk-adventure-1",
    "name": "Tiger Park Phuket: Close Encounter & Photography Session",
    "destination": "Phuket",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 3200,
    "originalPrice": 4000,
    "badge": "Bestseller",
    "highlights": [
      "Guided safe interaction with expert handlers",
      "Big Cat & Cub photography packages",
      "Air-conditioned jungle cafe",
      "Hotel pickup available"
    ]
  },
  {
    "id": "act-pk-adventure-2",
    "name": "Hanuman World Phuket: Extreme Jungle Zipline & Skywalk",
    "destination": "Phuket",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 4100,
    "originalPrice": 5100,
    "badge": "Top Rated",
    "highlights": [
      "30 zipline platforms across ancient virgin rainforest",
      "Roller Zipline 800m winding twisting through treetops at 40km/h",
      "Skywalk canopy bridge and dual abseil drops",
      "European standard Petzl climbing safety equipment"
    ]
  },
  {
    "id": "act-pk-adventure-3",
    "name": "Flying Hanuman 28-Platform Eco Canopy Zipline",
    "destination": "Phuket",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 3900,
    "originalPrice": 4900,
    "badge": "Must Do",
    "highlights": [
      "Eco-friendly rainforest zipline course preserved around ancient banyans",
      "Two sky bridges and 40-meter vertical abseil descents",
      "Honeymoon tandem dual zip cables for couples",
      "Fruit buffet, cold drinks and transfers included"
    ]
  },
  {
    "id": "act-pk-adventure-4",
    "name": "Phuket ATV Quad Bike & Big Buddha Off-Road Safari",
    "destination": "Phuket",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Popular",
    "highlights": [
      "Navigate 350cc automatic quad bikes up muddy jungle trails",
      "Exclusive off-road scenic trail reaching Big Buddha mountaintop",
      "Rubber tree plantations and rocky river crossings",
      "Full safety gear, helmet and goggles provided"
    ]
  },
  {
    "id": "act-pk-adventure-5",
    "name": "Phuket Ethical Elephant Sanctuary Mud Spa & Feeding",
    "destination": "Phuket",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 3600,
    "originalPrice": 4500,
    "badge": "Popular",
    "highlights": [
      "No-riding ethical sanctuary dedicated to rescued Asian elephants",
      "Prepare vitamin balls, watermelons and bananas for feeding",
      "Join elephants in natural clay mud spa and outdoor hydro bath",
      "Authentic vegetarian Thai cooking demonstration"
    ]
  },
  {
    "id": "act-pk-adventure-6",
    "name": "Jungle Bungee Jumping 50m over Kathu Lagoon Phuket",
    "destination": "Phuket",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 4900,
    "originalPrice": 6200,
    "badge": "Popular",
    "highlights": [
      "50-meter jump platform over serene natural jungle lagoon",
      "Optional water-dip touch down during the freefall drop",
      "Operated under S.A.N.Z. New Zealand safety standards",
      "Jump certificate and commemorative t-shirt"
    ]
  },
  {
    "id": "act-pk-cultural-tours-1",
    "name": "Phuket Old Town Heritage Walk & Sino-Portuguese Food Crawl",
    "destination": "Phuket",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 1950,
    "originalPrice": 2600,
    "badge": "Bestseller",
    "highlights": [
      "Pastel-colored 19th-century Sino-Portuguese shophouses",
      "Tasting Hokkien noodles, Oh Aew shaved ice & moo hong pork",
      "Soi Romanee vibrant street art and indie cafes",
      "Visit Chinpracha House heritage museum"
    ]
  },
  {
    "id": "act-pk-cultural-tours-2",
    "name": "Chalong Bay Rum Distillery Tour & Artisanal Cocktail Class",
    "destination": "Phuket",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 2600,
    "originalPrice": 3300,
    "badge": "Top Rated",
    "highlights": [
      "Pure sugarcane copper-pot distillation process tour",
      "Guided tasting of 5 infused tropical rum varieties",
      "Interactive mixology workshop creating 2 signature Mojitos",
      "Tropical orchard garden setting and souvenir glass"
    ]
  },
  {
    "id": "act-pk-cultural-tours-3",
    "name": "Authentic Thai Cooking Class with Local Market Tour",
    "destination": "Phuket",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Must Do",
    "highlights": [
      "Tour vibrant morning food market selecting fresh herbs and chilies",
      "Cook 4 authentic dishes: Tom Yum Goong, Green Curry & Pad Thai",
      "Individual cooking stations in teak open-air kitchen",
      "Full recipe book and feast on your own creations"
    ]
  },
  {
    "id": "act-pk-cultural-tours-4",
    "name": "Jui Tui Taoist Shrine & Phuket Vegetarian Heritage Tour",
    "destination": "Phuket",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 1600,
    "originalPrice": 2100,
    "badge": "Popular",
    "highlights": [
      "Phuket’s most important Chinese Taoist shrine dedicated to Tean Hu Huan Soy",
      "Intricate wood-carved dragon columns and incense rituals",
      "Stories of the century-old Phuket Vegetarian Festival",
      "Tasting fresh vegetarian spring rolls and steamed buns"
    ]
  },
  {
    "id": "act-pk-cultural-tours-5",
    "name": "Baan Chinpracha Heritage Mansion Private Visit",
    "destination": "Phuket",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 1400,
    "originalPrice": 1800,
    "badge": "Popular",
    "highlights": [
      "1903 Sino-Colonial mansion featuring authentic Italian floor tiles",
      "Preserved original European furniture and mother-of-pearl beds",
      "Family photos and antique tin-mining memorabilia",
      "Guided walk by descendant family members"
    ]
  },
  {
    "id": "act-pk-cultural-tours-6",
    "name": "Phuket Pearl Farm Private Tour on Rang Yai Island",
    "destination": "Phuket",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 2900,
    "originalPrice": 3700,
    "badge": "Popular",
    "highlights": [
      "Private longtail boat crossing to idyllic Rang Yai pearl farm",
      "Demonstration of pearl oyster seeding and pearl extraction",
      "Discover South Sea, Akoya and Mabe pearls grading",
      "Time to relax on private white-sand beach"
    ]
  },
  {
    "id": "act-pk-water-sports-1",
    "name": "Phi Phi Islands & Maya Bay Luxury Speedboat Snorkeling Tour",
    "destination": "Phuket",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 4900,
    "originalPrice": 6400,
    "badge": "Bestseller",
    "highlights": [
      "Maya Bay crystal beach made famous by \"The Beach\"",
      "Pileh Lagoon turquoise emerald swimming sanctuary",
      "Snorkeling over colorful live coral reefs and sea turtles",
      "Beachfront Thai buffet lunch on Phi Phi Don"
    ]
  },
  {
    "id": "act-pk-water-sports-2",
    "name": "Racha & Coral Island Catamaran Cruise with Scuba Diving",
    "destination": "Phuket",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 3800,
    "originalPrice": 4900,
    "badge": "Top Rated",
    "highlights": [
      "Luxury sailing catamaran with netting sunbeds and music",
      "Introductory scuba diving session with PADI instructor",
      "High-flying parasailing over Coral Island turquoise waters",
      "Sunset cruise back to Chalong Pier with fresh fruit buffet"
    ]
  },
  {
    "id": "act-pk-water-sports-3",
    "name": "James Bond Island & Phang Nga Bay Sea Canoe Expedition",
    "destination": "Phuket",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 4200,
    "originalPrice": 5300,
    "badge": "Must Do",
    "highlights": [
      "Paddle through mysterious limestone sea caves into hidden hongs",
      "Khao Phing Kan landmark of \"The Man with the Golden Gun\"",
      "Visit Koh Panyee floating Muslim stilt village with football pitch",
      "Buffet lunch on large cruise cruiser"
    ]
  },
  {
    "id": "act-pk-water-sports-4",
    "name": "Similan Islands Speedboat Snorkeling Day Tour",
    "destination": "Phuket",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 6800,
    "originalPrice": 8500,
    "badge": "Popular",
    "highlights": [
      "World-renowned marine national park with 30-meter water visibility",
      "Swim with majestic manta rays, clownfish and sea turtles",
      "Climb Sail Rock viewpoint for breathtaking island panoramas",
      "National park entry fee and premium snorkel gear included"
    ]
  },
  {
    "id": "act-pk-water-sports-5",
    "name": "Patong Beach Jet Ski Sprint & Banana Boat Combo",
    "destination": "Phuket",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 2950,
    "originalPrice": 3800,
    "badge": "Popular",
    "highlights": [
      "30-minute high-speed Yamaha Waverunner open sea ride",
      "Fun banana boat sprint towed along Patong bay",
      "Certified water safety escort and life vests",
      "Free locker and beach lounge chair access"
    ]
  },
  {
    "id": "act-pk-water-sports-6",
    "name": "Surin & Bang Tao Beach Surfing & Paddleboard Lessons",
    "destination": "Phuket",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 2400,
    "originalPrice": 3100,
    "badge": "Popular",
    "highlights": [
      "Catch gentle rolling Andaman waves in safe sandy bottom bay",
      "ISA certified surf instructors with beginner-friendly longboards",
      "Stand-up paddleboard coastal glide past granite headlands",
      "Rash guards, sunscreen and fresh coconut water included"
    ]
  },
  {
    "id": "act-kl-sightseeing-1",
    "name": "Petronas Twin Towers Skybridge & Observation Deck Level 86",
    "destination": "Kuala Lumpur",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "2 - 3 Hours",
    "price": 2200,
    "originalPrice": 2800,
    "badge": "Bestseller",
    "highlights": [
      "Two-story Skybridge connecting towers on 41st floor",
      "Observation deck on 86th floor at 370m above ground",
      "State-of-the-art interactive displays and telescopes",
      "Skip-the-line QR confirmation"
    ]
  },
  {
    "id": "act-kl-sightseeing-2",
    "name": "Batu Caves Rainbow Steps & Genting Cable Car Tour",
    "destination": "Kuala Lumpur",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "2 - 3 Hours",
    "price": 2900,
    "originalPrice": 3700,
    "badge": "Top Rated",
    "highlights": [
      "Climb 272 colorful steps past 140ft golden Lord Murugan statue",
      "Limestone cave temple chambers with wild macaques",
      "Awana SkyWay glass-floor gondola ride above rainforest",
      "Visit to Chin Swee Caves Temple mountain retreat"
    ]
  },
  {
    "id": "act-kl-sightseeing-3",
    "name": "KL Tower (Menara KL) Sky Deck & Glass Sky Box (300m)",
    "destination": "Kuala Lumpur",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "2 - 3 Hours",
    "price": 1950,
    "originalPrice": 2500,
    "badge": "Must Do",
    "highlights": [
      "Open-air Sky Deck at 300 meters above city level",
      "Step into transparent glass Sky Box cantilevered over the edge",
      "Spectacular panoramic view looking right across at Petronas Towers",
      "Fast-track lift access included"
    ]
  },
  {
    "id": "act-kl-sightseeing-4",
    "name": "Perdana Botanical Gardens & Butterfly Park Nature Walk",
    "destination": "Kuala Lumpur",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "2 - 3 Hours",
    "price": 1400,
    "originalPrice": 1800,
    "badge": "Popular",
    "highlights": [
      "220-acre lush tropical garden in the heart of Kuala Lumpur",
      "Largest butterfly garden in the world with over 5,000 butterflies",
      "Hibiscus and Orchid gardens with 800 exotic species",
      "Tranquil sunken lake walk with heritage gazebo"
    ]
  },
  {
    "id": "act-kl-sightseeing-5",
    "name": "Putrajaya Pink Mosque & Lake Sightseeing Cruise from KL",
    "destination": "Kuala Lumpur",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "2 - 3 Hours",
    "price": 2600,
    "originalPrice": 3300,
    "badge": "Popular",
    "highlights": [
      "Stunning rose-tinted granite Putra Mosque standing on lake",
      "Air-conditioned catamaran cruise across Putrajaya Lake",
      "Perdana Putra Prime Minister office and Seri Wawasan cable bridge",
      "Roundtrip transfer from Kuala Lumpur hotel"
    ]
  },
  {
    "id": "act-kl-sightseeing-6",
    "name": "Bukit Bintang Pavilion & Saloma Link Bridge Night Walk",
    "destination": "Kuala Lumpur",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "2 - 3 Hours",
    "price": 1100,
    "originalPrice": 1500,
    "badge": "Popular",
    "highlights": [
      "Spectacular LED light display of Saloma Link footbridge",
      "Bustling Bukit Bintang street shopping and Alor street food",
      "Pavilion Crystal Fountain photo opportunity",
      "Local host guide sharing KL insider stories"
    ]
  },
  {
    "id": "act-kl-theme-parks-1",
    "name": "Aquaria KLCC Oceanarium Underwater Glass Tunnel",
    "destination": "Kuala Lumpur",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "Full Day",
    "price": 1550,
    "originalPrice": 1950,
    "badge": "Bestseller",
    "highlights": [
      "90-meter walkthrough underwater glass tunnel",
      "Over 5,000 aquatic animals and sand tiger sharks",
      "Daily live shark and stingray feeding spectacles",
      "Direct underground walkway from Suria KLCC mall"
    ]
  },
  {
    "id": "act-kl-theme-parks-2",
    "name": "Sunway Lagoon 6-in-1 Theme Park & Water Kingdom Pass",
    "destination": "Kuala Lumpur",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "Full Day",
    "price": 3900,
    "originalPrice": 4900,
    "badge": "Top Rated",
    "highlights": [
      "Water Park, Amusement Park, Wildlife Park & Extreme Park",
      "Vuvuzela: World’s highest 11-story water funnel ride",
      "Surf Beach with giant man-made waves",
      "Suspension bridge walk with panoramic park views"
    ]
  },
  {
    "id": "act-kl-theme-parks-3",
    "name": "Genting SkyWorlds Outdoor Theme Park All-Day Passport",
    "destination": "Kuala Lumpur",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "Full Day",
    "price": 4200,
    "originalPrice": 5300,
    "badge": "Must Do",
    "highlights": [
      "26 movie-themed thrill rides and attractions at 6,000ft high",
      "Eagle Mountain world-first dual-track motorcycle coaster",
      "Ice Age, Rio, Robots Rivet Town and Andromeda Base worlds",
      "Complimentary virtual queue reservation slots"
    ]
  },
  {
    "id": "act-kl-theme-parks-4",
    "name": "Berjaya Times Square Indoor Theme Park & Supersonic Coaster",
    "destination": "Kuala Lumpur",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "Full Day",
    "price": 1800,
    "originalPrice": 2300,
    "badge": "Popular",
    "highlights": [
      "Malaysia’s largest indoor theme park spanning 3 massive floors",
      "Supersonic Odyssey: 800m indoor inverted loop rollercoaster",
      "Spinning Orbit and DNA Mixer thrill rides",
      "Fantasy Garden family carousel and mini train"
    ]
  },
  {
    "id": "act-kl-theme-parks-5",
    "name": "SuperPark Malaysia: Mega Indoor Activity Arena at Avenue K",
    "destination": "Kuala Lumpur",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "Full Day",
    "price": 1650,
    "originalPrice": 2100,
    "badge": "Popular",
    "highlights": [
      "Finnish-designed multi-activity park spanning 40,000 sq ft",
      "Freestyle Hall with trampolines, foam pits and skate ramps",
      "Adventure Area with flying fox and tube slides",
      "Game Arena with radar baseball and street basketball"
    ]
  },
  {
    "id": "act-kl-theme-parks-6",
    "name": "Wet World Water Park Shah Alam Family Day Pass",
    "destination": "Kuala Lumpur",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "Full Day",
    "price": 1200,
    "originalPrice": 1600,
    "badge": "Popular",
    "highlights": [
      "Award-winning family water theme park with lush green setting",
      "Monsoon Buster uphill water coaster ride",
      "Super Hurricane funnel and pirate challenge pool",
      "Safe and clean shallow splash zones for children"
    ]
  },
  {
    "id": "act-kl-adventure-1",
    "name": "Skytrex Adventure: Extreme Rainforest Canopy High-Rope Obstacles",
    "destination": "Kuala Lumpur",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 2400,
    "originalPrice": 3100,
    "badge": "Bestseller",
    "highlights": [
      "Navigate 35 tree-top rope bridges, swings and flying foxes",
      "Climb up to 22 meters into Sungai Congkak tropical canopy",
      "Extreme Challenge circuit with Tarzan jump",
      "Safety harness and briefing by certified arborists"
    ]
  },
  {
    "id": "act-kl-adventure-2",
    "name": "ATV Adventure Park: Klang Gates Quartz Ridge Trail",
    "destination": "Kuala Lumpur",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 3200,
    "originalPrice": 4000,
    "badge": "Top Rated",
    "highlights": [
      "Ride four-wheel all-terrain bikes through dense jungle streams",
      "Scenic stop at Sofea Jane Waterfall for a refreshing swim",
      "World’s longest quartz formation natural ridgeline",
      "All safety helmet and gloves provided"
    ]
  },
  {
    "id": "act-kl-adventure-3",
    "name": "Gua Damai Extreme Park: Natural Rock Climbing & Abseiling",
    "destination": "Kuala Lumpur",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Must Do",
    "highlights": [
      "Scale natural limestone cliffs right behind Batu Caves",
      "Over 100 bolted routes for beginners to advanced climbers",
      "Thrilling 20-meter cliff abseil back down into the jungle",
      "All climbing shoes, chalk, harness and guides included"
    ]
  },
  {
    "id": "act-kl-adventure-4",
    "name": "Broga Hill Sunrise Hike & Tropical Forest Morning Trail",
    "destination": "Kuala Lumpur",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 1900,
    "originalPrice": 2400,
    "badge": "Popular",
    "highlights": [
      "Pre-dawn trek through lush lallang tall grass ridges",
      "Spectacular sea of clouds sunrise view over Selangor plains",
      "Visit Sak Dato Temple with giant Monkey God statue",
      "Authentic Pan Mee noodle breakfast in Semenyih village"
    ]
  },
  {
    "id": "act-kl-adventure-5",
    "name": "Kuala Kubu Bharu Whitewater Rafting Rapids Day Trip",
    "destination": "Kuala Lumpur",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 4600,
    "originalPrice": 5800,
    "badge": "Popular",
    "highlights": [
      "Grade 4 churning rapids down the pristine Selangor River",
      "7 kilometers of adrenaline drops, whirlpools and rock chutes",
      "Body surfing and cliff jumping into calm river pools",
      "Hot buffet lunch and transfer from central KL included"
    ]
  },
  {
    "id": "act-kl-adventure-6",
    "name": "Tandem Paragliding Flight at Bukit Jugra coastal hill",
    "destination": "Kuala Lumpur",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1521673845931-7b0fb2a78dd9?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 6200,
    "originalPrice": 7800,
    "badge": "Popular",
    "highlights": [
      "Tandem flight launching from historic Bukit Jugra lighthouse",
      "Soar on ocean thermal drafts over Straits of Malacca",
      "Licensed tandem master controlling all navigation",
      "Action camera video recording included"
    ]
  },
  {
    "id": "act-kl-cultural-tours-1",
    "name": "KL Heritage Discovery: Merdeka Square, Central Market & Chinatown",
    "destination": "Kuala Lumpur",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 1600,
    "originalPrice": 2100,
    "badge": "Bestseller",
    "highlights": [
      "Moorish Sultan Abdul Samad Building & Merdeka Square",
      "Central Market art deco handicrafts and batik wax printing",
      "Petaling Street bustling street market & Sri Mahamariamman Temple",
      "Tasting fresh curry laksa and egg tarts"
    ]
  },
  {
    "id": "act-kl-cultural-tours-2",
    "name": "Kampung Baru Traditional Malay Wooden Village & Food Trail",
    "destination": "Kuala Lumpur",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 2100,
    "originalPrice": 2700,
    "badge": "Top Rated",
    "highlights": [
      "Authentic wooden stilt houses framed by futuristic skyscrapers",
      "Tasting legendary Nasi Lemak Wanjo and beef satay with peanut dip",
      "Stories of 120-year-old Malay enclave traditions",
      "Local culinary host guide"
    ]
  },
  {
    "id": "act-kl-cultural-tours-3",
    "name": "Thean Hou Temple & Little India Brickfields Cultural Walk",
    "destination": "Kuala Lumpur",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 1450,
    "originalPrice": 1900,
    "badge": "Must Do",
    "highlights": [
      "Six-tiered Chinese temple of the Goddess of Heaven Mazu",
      "Panoramic rooftop views of Kuala Lumpur city center",
      "Stroll through Little India with fragrant jasmine garlands",
      "Crispy masala dosa and hot ginger chai tasting"
    ]
  },
  {
    "id": "act-kl-cultural-tours-4",
    "name": "Royal Selangor Pewter Factory & School of Hard Knocks",
    "destination": "Kuala Lumpur",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 1900,
    "originalPrice": 2400,
    "badge": "Popular",
    "highlights": [
      "World’s largest pewter maker founded in 1885",
      "Hands-on \"School of Hard Knocks\" workshop crafting your own pewter dish",
      "Guinness Record giant pewter tankard photo stop",
      "Take home your engraved pewter creation and certificate"
    ]
  },
  {
    "id": "act-kl-cultural-tours-5",
    "name": "Islamic Arts Museum Malaysia Guided Heritage Tour",
    "destination": "Kuala Lumpur",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 1350,
    "originalPrice": 1750,
    "badge": "Popular",
    "highlights": [
      "Largest museum of Islamic art in Southeast Asia with 10,000 items",
      "Stunning turquoise mosaic domes and Quranic calligraphy",
      "Detailed architectural models of holy mosques worldwide",
      "Jeweled Ottoman daggers and Persian textiles"
    ]
  },
  {
    "id": "act-kl-cultural-tours-6",
    "name": "Historic Malacca UNESCO World Heritage Day Tour from KL",
    "destination": "Kuala Lumpur",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 3800,
    "originalPrice": 4700,
    "badge": "Popular",
    "highlights": [
      "Stadthuys red Dutch square, Christ Church & A Famosa fortress",
      "Jonker Street antique shophouses and Baba Nyonya heritage",
      "Melaka riverboat cruise past historic murals",
      "Traditional Peranakan chicken rice balls lunch"
    ]
  },
  {
    "id": "act-kl-water-sports-1",
    "name": "Putrajaya Lake Flyboarding & Jet Ski Water Sport Session",
    "destination": "Kuala Lumpur",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 4500,
    "originalPrice": 5600,
    "badge": "Bestseller",
    "highlights": [
      "Hydro-flight water jets propelling you 10 meters into the air",
      "High-speed Yamaha jet ski sprint on calm Putrajaya Lake",
      "Stunning backdrop of pink Putrajaya Mosque and Seri Wawasan Bridge",
      "One-on-one safety coach and life vest included"
    ]
  },
  {
    "id": "act-kl-water-sports-2",
    "name": "Sunway Lagoon Surf Beach FlowRider Surfing Simulator Pass",
    "destination": "Kuala Lumpur",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 2600,
    "originalPrice": 3300,
    "badge": "Top Rated",
    "highlights": [
      "Malaysia’s first interactive stationary wave surfing simulator",
      "Bodyboard or stand-up flowboard riding options",
      "Continuous sheet wave pumping 200,000 gallons per minute",
      "Surf instructor guidance and locker access"
    ]
  },
  {
    "id": "act-kl-water-sports-3",
    "name": "Port Dickson Coastal Jet Ski & Snorkel Speedboat Excursion",
    "destination": "Kuala Lumpur",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 3900,
    "originalPrice": 4800,
    "badge": "Must Do",
    "highlights": [
      "Speedboat cruise along Port Dickson Straits of Malacca coast",
      "High-speed jet ski open-sea ride around Blue Lagoon",
      "Snorkeling over coral formations near Cape Rachado lighthouse",
      "Beach BBQ lunch and fresh young coconuts"
    ]
  },
  {
    "id": "act-kl-water-sports-4",
    "name": "Putrajaya Lake Sunset Stand-Up Paddleboard Session",
    "destination": "Kuala Lumpur",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 2100,
    "originalPrice": 2650,
    "badge": "Popular",
    "highlights": [
      "Tranquil evening paddle on calm 650-hectare man-made lake",
      "Glance up at illuminated government palaces from the water",
      "Beginner friendly stable boards with buoyancy aids",
      "Waterproof phone case and photography included"
    ]
  },
  {
    "id": "act-kl-water-sports-5",
    "name": "Tasik Biru Kundang Cable Wakeboarding & Water Ski Pass",
    "destination": "Kuala Lumpur",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 3200,
    "originalPrice": 4000,
    "badge": "Popular",
    "highlights": [
      "Full-size 6-tower cable system on scenic natural lake",
      "Obstacles, sliders and jump ramps for extreme tricks",
      "Complete board, bindings, helmet and vest rental",
      "Chilled lakeside clubhouse and dining deck"
    ]
  },
  {
    "id": "act-kl-water-sports-6",
    "name": "Sunway Lagoon Grand Wave Pool & Surf Challenge",
    "destination": "Kuala Lumpur",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 2400,
    "originalPrice": 3000,
    "badge": "Popular",
    "highlights": [
      "World’s largest man-made surf beach spanning 13,000 sqm",
      "Powerful pneumatic waves reaching up to 8 feet high",
      "Bodyboard sessions with certified beach lifeguards",
      "Tropical island tiki huts and sunbed lounges"
    ]
  },
  {
    "id": "act-goa-sightseeing-1",
    "name": "Dudhsagar Waterfalls Jeep Safari & Spice Plantation Lunch",
    "destination": "Goa",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "2 - 3 Hours",
    "price": 2200,
    "originalPrice": 2900,
    "badge": "Bestseller",
    "highlights": [
      "4x4 open jeep safari through Bhagwan Mahavir Wildlife Sanctuary",
      "Four-tiered milky waterfall cascading down 310 meters",
      "Swim in natural freshwater mountain pool with life jackets",
      "Traditional Goan spice farm buffet lunch on banana leaf"
    ]
  },
  {
    "id": "act-goa-sightseeing-2",
    "name": "Aguada Fort, Chapora Fort & Vagator Sunset Point Excursion",
    "destination": "Goa",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "2 - 3 Hours",
    "price": 1400,
    "originalPrice": 1900,
    "badge": "Top Rated",
    "highlights": [
      "17th-century Portuguese Fort Aguada and heritage lighthouse",
      "Chapora Fort “Dil Chahta Hai” iconic hilltop sunset ridge",
      "Panoramic views overlooking Ozran and Vagator red cliffs",
      "Chilled tender coconut stop included"
    ]
  },
  {
    "id": "act-goa-sightseeing-3",
    "name": "Cabo de Rama Fort & Secluded South Goa Coastal Safari",
    "destination": "Goa",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "2 - 3 Hours",
    "price": 1600,
    "originalPrice": 2100,
    "badge": "Must Do",
    "highlights": [
      "Ancient cliff-edge fortress named after Lord Rama",
      "Dramatic panoramic cliff-drop views of turquoise Arabian Sea",
      "Visit pristine uncrowded beaches Cola & Butterfly Beach",
      "Traditional beach shack Goan fish curry lunch"
    ]
  },
  {
    "id": "act-goa-sightseeing-4",
    "name": "Reis Magos Fort & Mandovi River Vista Exploration",
    "destination": "Goa",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "2 - 3 Hours",
    "price": 1100,
    "originalPrice": 1500,
    "badge": "Popular",
    "highlights": [
      "Oldest restored Portuguese fort in Goa predating Fort Aguada",
      "Overlooks the confluence of Mandovi river and the Arabian Sea",
      "Art gallery showcasing works of famous cartoonist Mario Miranda",
      "Original cannons and high stone battlements"
    ]
  },
  {
    "id": "act-goa-sightseeing-5",
    "name": "Harvalem Waterfalls & Ancient Pandava Rock-Cut Caves",
    "destination": "Goa",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "2 - 3 Hours",
    "price": 1350,
    "originalPrice": 1750,
    "badge": "Popular",
    "highlights": [
      "Picturesque 50-meter waterfall rushing into a tranquil pool",
      "Explore 6th-century rock-hewn caves used by Pandavas in exile",
      "Ancient Rudreshwar Temple blessing on the riverbank",
      "Air-conditioned vehicle transfer and guide"
    ]
  },
  {
    "id": "act-goa-sightseeing-6",
    "name": "Miramar Beach & Dona Paula Sea Viewpoint Tour",
    "destination": "Goa",
    "category": "Sightseeing",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "2 - 3 Hours",
    "price": 950,
    "originalPrice": 1300,
    "badge": "Popular",
    "highlights": [
      "Romantic rocky promontory overlooking Mormugao harbour",
      "Legendary lovers’ rock statue of Dona Paula",
      "Stroll along golden sands of Miramar beach fringed by casuarina trees",
      "Sunset photo stop and local street food tasting"
    ]
  },
  {
    "id": "act-goa-theme-parks-1",
    "name": "Splashdown Waterpark Goa: Family Thrill Slides & Lazy River",
    "destination": "Goa",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "Full Day",
    "price": 1100,
    "originalPrice": 1500,
    "badge": "Bestseller",
    "highlights": [
      "Panic Attack and Zoom Flume high-speed spiraling slides",
      "Family raft rides and solar-heated tropical splash pools",
      "Rain dance floor with live DJ beats",
      "Unlimited ride pass and safety lockers"
    ]
  },
  {
    "id": "act-goa-theme-parks-2",
    "name": "Snow Park Goa: Sub-Zero Ice Slide, Snow Castle & DJ Party",
    "destination": "Goa",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "Full Day",
    "price": 850,
    "originalPrice": 1200,
    "badge": "Top Rated",
    "highlights": [
      "Minus 5 degrees Celsius real snow play arena in Baga",
      "Sledging, ice sliding and igloo photo opportunities",
      "Illuminated disco on real ice floor",
      "Warm winter jackets, boots and gloves provided"
    ]
  },
  {
    "id": "act-goa-theme-parks-3",
    "name": "Blue Whale Water Park Arpora Family Day Pass",
    "destination": "Goa",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1582650625119-3a31f841807d?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "Full Day",
    "price": 950,
    "originalPrice": 1300,
    "badge": "Must Do",
    "highlights": [
      "Family water resort nestled beneath heritage coconut groves",
      "Exciting spiral slides plunging into deep lagoon pools",
      "Kids splash fortress and rain dance stage",
      "All-day unlimited entry and restaurant pass"
    ]
  },
  {
    "id": "act-goa-theme-parks-4",
    "name": "Froggyland The Water World Goa: Wave Pools & Slides",
    "destination": "Goa",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "Full Day",
    "price": 1200,
    "originalPrice": 1600,
    "badge": "Popular",
    "highlights": [
      "Largest water park in South Goa spanning 35,000 sqm",
      "Massive wave pool, lazy river and 12-meter tube chutes",
      "Raindance dome with state-of-the-art music system",
      "Bungee trampoline and zorbing ball challenges"
    ]
  },
  {
    "id": "act-goa-theme-parks-5",
    "name": "Goa Karting Track Arpora: High-Speed Go-Kart Championship",
    "destination": "Goa",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "Full Day",
    "price": 1400,
    "originalPrice": 1800,
    "badge": "Popular",
    "highlights": [
      "340-meter professional asphalt racetrack with hairpin bends",
      "High-performance 4-stroke 200cc Honda engine karts",
      "Computerized lap-timing display system",
      "Full helmet, neck brace and safety briefing"
    ]
  },
  {
    "id": "act-goa-theme-parks-6",
    "name": "Museum of Goa (MOG) Contemporary Art & Sculpture Park",
    "destination": "Goa",
    "category": "Theme Parks",
    "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "Full Day",
    "price": 750,
    "originalPrice": 1000,
    "badge": "Popular",
    "highlights": [
      "Goa’s premier contemporary art center founded by Subodh Kerkar",
      "Open-air ocean art sculptures and seashell installations",
      "Interactive exhibits celebrating Goan cultural history",
      "Artisanal organic garden cafe on site"
    ]
  },
  {
    "id": "act-goa-adventure-1",
    "name": "Jumpin Heights Goa: 55-Meter Bungee Jump & Giant Swing",
    "destination": "Goa",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 4110,
    "originalPrice": 5000,
    "badge": "Bestseller",
    "highlights": [
      "55-meter permanent cantilever bungee bridge in Mayem Lake",
      "Operated by ex-Army officers following Australian safety standards",
      "Giant Swing swooping over serene lake water",
      "Certificate of courage and 4K camera footage"
    ]
  },
  {
    "id": "act-goa-adventure-2",
    "name": "Netravali Wildlife Sanctuary Jungle Trek & Bubble Lake",
    "destination": "Goa",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 2400,
    "originalPrice": 3200,
    "badge": "Top Rated",
    "highlights": [
      "Hike through Western Ghats evergreen rainforest",
      "Discover mysterious bubbling lake of Budbudyanchi Tali",
      "Savari and Mainapi secluded jungle waterfalls swim",
      "Packed organic Goan lunch and expert naturalist guide"
    ]
  },
  {
    "id": "act-goa-adventure-3",
    "name": "Goa Jungle Biking & Western Ghats Off-Road Trail",
    "destination": "Goa",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 2200,
    "originalPrice": 2800,
    "badge": "Must Do",
    "highlights": [
      "Trek on geared mountain bikes through Bhagwan Mahavir trails",
      "Cross natural streams and dirt tracks under jungle canopies",
      "Encounter hornbills, giant squirrels and rare butterflies",
      "Support vehicle and certified trail guide accompanying"
    ]
  },
  {
    "id": "act-goa-adventure-4",
    "name": "Flyboarding over Chapora River Waves in Morjim",
    "destination": "Goa",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 3600,
    "originalPrice": 4500,
    "badge": "Popular",
    "highlights": [
      "Hydro-flight water pressure lifting you 30 feet above the river",
      "Certified hydroflight coach controlling throttle for your safety",
      "Learn basic balance, hovering and 360 spins",
      "HD GoPro action camera video included"
    ]
  },
  {
    "id": "act-goa-adventure-5",
    "name": "Mollem National Park Wildlife Jeep Trek & Flying Fox",
    "destination": "Goa",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 2900,
    "originalPrice": 3700,
    "badge": "Popular",
    "highlights": [
      "Open 4x4 jungle jeep safari through deep tiger reserve territory",
      "Flying fox zip line over lush forest canopy",
      "Spot wild gaurs (Indian bison), leopards and pangolins",
      "Visit 12th-century Kadamba rock temple at Tambdi Surla"
    ]
  },
  {
    "id": "act-goa-adventure-6",
    "name": "Hot Air Ballooning over South Goa Coastline & Forests",
    "destination": "Goa",
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 11500,
    "originalPrice": 14000,
    "badge": "Popular",
    "highlights": [
      "Sunrise balloon ascent floating 2,500 feet over Chandor",
      "360° views of Arabian Sea coastline and winding river estuaries",
      "Champagne celebration and breakfast after landing",
      "DGCA licensed flight crew with full insurance"
    ]
  },
  {
    "id": "act-goa-cultural-tours-1",
    "name": "Old Goa Heritage Churches & Fontainhas Latin Quarter Walk",
    "destination": "Goa",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 1650,
    "originalPrice": 2200,
    "badge": "Bestseller",
    "highlights": [
      "UNESCO World Heritage Basilica of Bom Jesus & Se Cathedral",
      "Stroll cobblestone alleys of Fontainhas Latin Quarter with yellow villas",
      "Taste traditional Bebinca layered cake & artisanal Goan feni",
      "Visit 330-year-old heritage bakery in Panaji"
    ]
  },
  {
    "id": "act-goa-cultural-tours-2",
    "name": "Divar Island Vintage Electric Cycle & Goan Village Tour",
    "destination": "Goa",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 2100,
    "originalPrice": 2700,
    "badge": "Top Rated",
    "highlights": [
      "Cross Mandovi river on scenic car ferry to sleepy Divar island",
      "Ride smart electric pedelec bicycles past Portuguese mansions",
      "Explore ancient sluice gates and scenic tidal crab farms",
      "Homemade high tea and poi bread at ancestral Goan home"
    ]
  },
  {
    "id": "act-goa-cultural-tours-3",
    "name": "Sahakari Spice Farm Guided Tour with Traditional Goan Thali",
    "destination": "Goa",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 1200,
    "originalPrice": 1600,
    "badge": "Must Do",
    "highlights": [
      "Traditional welcome with flower garlands, aarti and fresh lemongrass tea",
      "Guided walk identifying vanilla, cardamom, cinnamon and betel nuts",
      "Organic lunch buffet served on banana leaves with cashew feni",
      "Option for refreshing elephant shower in natural stream"
    ]
  },
  {
    "id": "act-goa-cultural-tours-4",
    "name": "Ancestral Goa & Big Foot Heritage Museum Loutolim",
    "destination": "Goa",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 1100,
    "originalPrice": 1500,
    "badge": "Popular",
    "highlights": [
      "Open-air recreation of ancient rural Goan village life",
      "Famous 14-meter Sant Mirabai laterite stone sculpture",
      "Centuries-old Casa Araujo Alvares Portuguese mansion tour",
      "Handicraft center and spice garden"
    ]
  },
  {
    "id": "act-goa-cultural-tours-5",
    "name": "Goa Latin Quarter Photography & Feni Tasting Walk",
    "destination": "Goa",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 1850,
    "originalPrice": 2400,
    "badge": "Popular",
    "highlights": [
      "Photo tour of brightly painted red, blue and yellow Portuguese villas",
      "Traditional feni cellar tour learning pot-still cashew distillation",
      "Tasting 3 signature Goan feni craft cocktails",
      "Historical guide sharing stories of colonial Panaji"
    ]
  },
  {
    "id": "act-goa-cultural-tours-6",
    "name": "Chorao Island Mangrove & Dr. Salim Ali Bird Sanctuary Boat",
    "destination": "Goa",
    "category": "Cultural Tours",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 1500,
    "originalPrice": 2000,
    "badge": "Popular",
    "highlights": [
      "Silent electric boat ride through dense mangrove canal channels",
      "Spot rare kingfishers, eagles, mudskippers and flying foxes",
      "Canopy watchtower overlooking Mandovi river delta",
      "Binoculars and expert local ornithologist guide included"
    ]
  },
  {
    "id": "act-goa-water-sports-1",
    "name": "Grand Island Scuba Diving & Dolphin Safari with GoPro 4K",
    "destination": "Goa",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 3000,
    "duration": "3 Hours",
    "price": 2800,
    "originalPrice": 3500,
    "badge": "Bestseller",
    "highlights": [
      "PADI certified dive master guidance for beginners",
      "Underwater 4K GoPro video and photo package included",
      "Sightseeing boat cruise with playful dolphin spotting",
      "Buffet lunch and beach volleyball on Monkey Beach"
    ]
  },
  {
    "id": "act-goa-water-sports-2",
    "name": "Calangute & Baga 5-in-1 Water Sports Combo (Parasailing + Jet Ski)",
    "destination": "Goa",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 5150,
    "duration": "3 Hours",
    "price": 2250,
    "originalPrice": 3000,
    "badge": "Top Rated",
    "highlights": [
      "Parasailing with sea-dip over Arabian Sea waves",
      "Jet Ski sprint, Banana boat ride, Bumper ride and Speedboat ride",
      "Certified lifeguards, life jackets and safety boats on standby",
      "Direct beach departure with locker facility"
    ]
  },
  {
    "id": "act-goa-water-sports-3",
    "name": "Mandovi River Sunset Luxury Catamaran Cruise with DJ",
    "destination": "Goa",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 7300,
    "duration": "3 Hours",
    "price": 1950,
    "originalPrice": 2500,
    "badge": "Must Do",
    "highlights": [
      "2-hour sunset cruise on twin-hull catamaran down Mandovi river",
      "Live Goan folk dances (Dekhni & Fugdi) and DJ dance floor",
      "Complimentary welcome drinks, Goan snacks and beers",
      "Cruise past historic Reis Magos fort and floating casinos"
    ]
  },
  {
    "id": "act-goa-water-sports-4",
    "name": "Morjim & Ashwem Kayaking in Chapora Backwaters",
    "destination": "Goa",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8,
    "reviewsCount": 9450,
    "duration": "3 Hours",
    "price": 1600,
    "originalPrice": 2100,
    "badge": "Popular",
    "highlights": [
      "Paddle through calm mangrove estuaries of Chapora river",
      "Spot sea otters, kingfishers and fiddler crabs along the banks",
      "Single and tandem touring kayaks with high-comfort seats",
      "Chilled fresh watermelon and coconut at landing point"
    ]
  },
  {
    "id": "act-goa-water-sports-5",
    "name": "Baga Beach High-Altitude Parasailing with Sea Dip",
    "destination": "Goa",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    "rating": 4.8999999999999995,
    "reviewsCount": 11600,
    "duration": "3 Hours",
    "price": 1400,
    "originalPrice": 1800,
    "badge": "Popular",
    "highlights": [
      "Fly 300 feet into the air launched from hydraulic winch boat",
      "Refreshing double dip into the warm Arabian Sea waters",
      "Panoramic aerial views of North Goa golden coastline",
      "Life jacket and digital video recording option"
    ]
  },
  {
    "id": "act-goa-water-sports-6",
    "name": "Anjuna Beach Jet Ski Sprint & Speedboat Power Tour",
    "destination": "Goa",
    "category": "Water Sports",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "rating": 5,
    "reviewsCount": 13750,
    "duration": "3 Hours",
    "price": 1800,
    "originalPrice": 2300,
    "badge": "Popular",
    "highlights": [
      "High-powered jet ski ride past Anjuna red laterite cliffs",
      "Speedboat ride around Curlies and Shiva Valley headlands",
      "Certified water safety instructor accompanying in water",
      "Beach shack changing and locker facilities"
    ]
  }
];
