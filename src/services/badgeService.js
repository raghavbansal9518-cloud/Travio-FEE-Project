import { DESTINATIONS } from '../data/destinationsData';
import { getJournalOwner, loadJournalData } from './journalService';

const BADGE_STATE_PREFIX = 'travio_badge_achievements:';

export const BADGE_DEFINITIONS = [
  { id: 'mountain-explorer', name: 'Mountain Explorer', category: 'Destinations', filter: 'destinations', description: 'Find your way to five remarkable mountain destinations.', requirement: 'Visit 5 mountain destinations', target: 5, metric: 'mountains', accent: '#48bfff', image: '/images/swiss_alps_bg.png', related: ['mountains'] },
  { id: 'city-wanderer', name: 'City Wanderer', category: 'Destinations', filter: 'destinations', description: 'Lose yourself in the energy of five major cities.', requirement: 'Visit 5 major cities', target: 5, metric: 'cities', accent: '#ffad55', image: '/images/paris_bg.png', related: ['cities'] },
  { id: 'beach-lover', name: 'Beach Lover', category: 'Destinations', filter: 'destinations', description: 'Discover five coastlines, coves, and sunlit shores.', requirement: 'Visit 5 beach destinations', target: 5, metric: 'beaches', accent: '#28dfd3', image: '/images/beach.jpg', related: ['beaches'] },
  { id: 'cultural-traveller', name: 'Cultural Traveller', category: 'Exploration', filter: 'exploration', description: 'Explore the stories and landmarks of five cultural destinations.', requirement: 'Visit 5 historical or cultural sites', target: 5, metric: 'culture', accent: '#ff71cf', image: '/images/japan.jpg', related: ['historical'] },
  { id: 'first-adventure', name: 'First Adventure', category: 'Milestones', filter: 'milestones', description: 'Every great travel story starts with one journey.', requirement: 'Complete your first trip', target: 1, metric: 'trips', accent: '#ffd451', image: '/images/hero-bg.jpg', related: ['adventure'] },
  { id: 'global-explorer', name: 'Global Explorer', category: 'Exploration', filter: 'exploration', description: 'Collect passport-worthy memories across the globe.', requirement: 'Visit 10 different countries', target: 10, metric: 'countries', accent: '#4ee5c1', image: '/images/featured-destination.jpg', related: ['cities'] },
  { id: 'photo-master', name: 'Photo Master', category: 'Activities', filter: 'activities', description: 'Build a gallery of travel moments worth revisiting.', requirement: 'Save 50 travel photos in your journal', target: 50, metric: 'photos', accent: '#65c8ff', image: '/images/japan.jpg', related: ['nature'] },
  { id: 'adventure-seeker', name: 'Adventure Seeker', category: 'Activities', filter: 'activities', description: 'Earn your stripes through five completed adventures.', requirement: 'Complete 5 adventure activities', target: 5, metric: 'adventures', accent: '#ff9a56', image: '/images/adventure.jpg', related: ['adventure'] },
  { id: 'foodie', name: 'Foodie', category: 'Activities', filter: 'activities', description: 'Follow your appetite to local flavors in five destinations.', requirement: 'Record local food experiences in 5 destinations', target: 5, metric: 'food', accent: '#ff7c60', image: '/images/food.jpg', related: ['cities'] },
  { id: 'frequent-traveller', name: 'Frequent Traveller', category: 'Milestones', filter: 'milestones', description: 'Keep collecting miles, memories, and new horizons.', requirement: 'Complete 10 trips', target: 10, metric: 'trips', accent: '#b68aff', image: '/images/hero-bg.jpg', related: ['cities'] },
  { id: 'winter-voyager', name: 'Winter Voyager', category: 'Special', filter: 'special', description: 'Experience a destination at its most magical in winter.', requirement: 'Record a visit during winter (December–February)', target: 1, metric: 'winter', accent: '#d3ecff', image: '/images/iceland_bg.png', related: ['mountains'] },
  { id: 'desert-nomad', name: 'Desert Nomad', category: 'Destinations', filter: 'destinations', description: 'Follow the dunes and discover the beauty of the desert.', requirement: 'Visit a desert destination', target: 1, metric: 'desert', accent: '#ffc56b', image: '/images/dubai_bg.png', related: ['historical'] },
  { id: 'forest-trekker', name: 'Forest Trekker', category: 'Exploration', filter: 'exploration', description: 'Find your path through five forests and national parks.', requirement: 'Visit 5 forests or national parks', target: 5, metric: 'forest', accent: '#78dfa2', image: '/images/new_zealand_bg.png', related: ['nature'] },
  { id: 'island-hopper', name: 'Island Hopper', category: 'Destinations', filter: 'destinations', description: 'Make three different islands part of your story.', requirement: 'Visit 3 different islands', target: 3, metric: 'islands', accent: '#45e8d6', image: '/images/maldives.jpg', related: ['beaches'] },
  { id: 'volcano-conqueror', name: 'Volcano Conqueror', category: 'Special', filter: 'special', description: 'Stand in awe of the power and beauty of a volcano.', requirement: 'Record a visit to an active volcano', target: 1, metric: 'volcano', accent: '#ff7455', image: '/images/bali_bg.png', related: ['adventure'] }
];

const DESTINATION_TYPES = {
  mountains: ['mountain', 'alps', 'ladakh', 'shimla', 'manali', 'himalaya', 'zermatt', 'peak'],
  cities: ['city', 'cities', 'tokyo', 'paris', 'singapore', 'mumbai', 'delhi', 'jaipur', 'london', 'new york'],
  beaches: ['beach', 'beaches', 'coast', 'coastal', 'island', 'maldives', 'goa', 'krabi', 'bali', 'andaman'],
  culture: ['historical', 'history', 'heritage', 'culture', 'cultural', 'temple', 'monument', 'palace'],
  desert: ['desert', 'dune', 'sahara', 'thar', 'wadi rum', 'dubai', 'jaisalmer'],
  forest: ['forest', 'national park', 'rainforest', 'wildlife sanctuary', 'nature reserve'],
  islands: ['island', 'islands', 'atoll', 'archipelago', 'maldives', 'andaman', 'bali', 'krabi'],
  volcano: ['volcano', 'volcanic', 'batur', 'etna', 'fuji', 'kilimanjaro']
};

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function asDate(value) {
  if (!value) return null;
  let parsed;
  const legacy = String(value).match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (legacy) {
    parsed = new Date(`${legacy[2]} ${legacy[1]}, ${legacy[3]} 12:00:00`);
  } else {
    parsed = new Date(/^\d{4}-\d{2}-\d{2}$/.test(String(value)) ? `${value}T12:00:00` : value);
  }
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function beforeToday(value) {
  const date = asDate(value);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
}

function onOrBeforeToday(value) {
  const date = asDate(value);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date <= today;
}

function getDestination(value, id) {
  const idKey = String(id || '').toLowerCase();
  const valueKey = String(value || '').toLowerCase();
  const shortName = valueKey.split(',')[0].replace(/\s*\([^)]*\)/g, '').trim();
  return DESTINATIONS.find((destination) =>
    (idKey && String(destination.id).toLowerCase() === idKey)
    || (valueKey && String(destination.name).toLowerCase() === valueKey)
    || (shortName && String(destination.name).toLowerCase() === shortName)
    || (shortName && String(destination.name).toLowerCase().includes(shortName))
  ) || null;
}

function destinationCategories(name, id, country) {
  const destination = getDestination(name, id);
  const text = `${name || ''} ${id || ''} ${country || ''} ${destination?.category || ''} ${destination?.travelType || ''} ${destination?.tagline || ''}`.toLowerCase();
  return Object.fromEntries(Object.entries(DESTINATION_TYPES).map(([key, terms]) => [
    key,
    key === 'culture' && destination?.category === 'historical'
      || key === 'cities' && destination?.category === 'cities'
      || key === 'beaches' && destination?.category === 'beaches'
      || key === 'mountains' && destination?.category === 'mountains'
      || key === 'forest' && destination?.category === 'nature' && /forest|park|rainforest|national park/.test(text)
      || terms.some((term) => text.includes(term))
  ]));
}

function countryName(value) {
  const parts = String(value || '').split(',').map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

function normalizeVisit(record, source) {
  const name = record.destinationName || record.destination || record.name || '';
  const destination = getDestination(name, record.destinationId);
  const id = record.destinationId || destination?.id || (source === 'visited destination' ? record.id : '');
  const recordCountry = record.destinationCountry && !/[→>-]/.test(record.destinationCountry)
    ? record.destinationCountry
    : '';
  const country = destination?.country || record.country || recordCountry || countryName(name);
  return {
    id: String(record.id || `${source}-${id || name}`),
    source,
    name: String(name || 'Travel destination'),
    country,
    destinationId: id,
    date: record.date || record.departureDate || '',
    image: record.image || record.destinationImage || record.cardImage || record.heroImage || '',
    categories: destinationCategories(name, id, country)
  };
}

function destinationKey(record) {
  return String(record.destinationId || `${record.name}-${record.country}`).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function uniqueBy(items, keyFor) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFor(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isFoodStory(entry) {
  const text = `${entry.title || ''} ${entry.description || ''} ${(entry.tags || []).join(' ')}`
    .toLowerCase();
  return /\b(food|foodie|local cuisine|cuisine|dish|restaurant|meal|street food|tasting|culinary|ramen|seafood)\b/.test(text);
}

function isAdventureBooking(booking) {
  const text = `${booking.title || ''} ${booking.specialNotes || ''} ${booking.destinationName || ''}`.toLowerCase();
  return /\b(adventure|hike|hiking|trek|trekking|climb|climbing|scuba|rafting|paraglid|ski|kayak|safari|snorkel|zipline|bungee)\b/.test(text);
}

function isFoodBooking(booking) {
  return /\b(food|culinary|cuisine|tasting|restaurant|food tour|food crawl)\b/i.test(
    `${booking.title || ''} ${booking.specialNotes || ''}`
  );
}

export function calculateBadgeProgress(wishlist, bookings) {
  const entries = safeArray(loadJournalData().userEntries)
    .filter((entry) => entry && entry.status !== 'draft');
  const visitedFromWishlist = safeArray(wishlist)
    .filter((destination) => destination.status === 'visited' && destination.demoRecord !== true)
    .map((destination) => normalizeVisit(destination, 'visited destination'));
  const completedBookings = safeArray(bookings).filter((booking) =>
    booking.demoRecord !== true
    && booking.status === 'Confirmed'
    && beforeToday(booking.returnDate || booking.departureDate)
  );
  const completedExperiences = completedBookings.filter((booking) =>
    String(booking.type || booking.travelStyle || '').toUpperCase() === 'EXPERIENCE'
  );
  const tripBookings = completedBookings.filter((booking) =>
    ['FLIGHT', 'TRAIN', 'BUS', 'CAB'].includes(String(booking.type || booking.travelStyle || '').toUpperCase())
  );
  const journalTravelEntries = entries.filter((entry) =>
    ['trip', 'photo'].includes(entry.kind)
    && !entry.demo
    && onOrBeforeToday(entry.date)
  );
  const journalTrips = journalTravelEntries.filter((entry) => entry.kind === 'trip');
  const bookingVisits = completedBookings
    .filter((booking) => String(booking.type || booking.travelStyle || '').toUpperCase() !== 'EXPERIENCE')
    .map((booking) => normalizeVisit(booking, 'completed trip'));
  const journalVisits = journalTravelEntries.map((entry) => normalizeVisit({
    id: entry.id,
    destination: entry.destination || entry.location,
    destinationId: entry.destinationId,
    date: entry.date,
    image: entry.image
  }, 'journal entry'));
  const visits = uniqueBy(
    [...bookingVisits, ...journalVisits, ...visitedFromWishlist],
    destinationKey
  );
  const countries = uniqueBy(
    visits.map((visit) => ({ ...visit, country: visit.country || countryName(visit.name) })),
    (visit) => String(visit.country || '').toLowerCase()
  ).filter((visit) => visit.country);
  const tripRecords = uniqueBy([
    ...tripBookings.map((booking) => ({
      key: `${destinationKey(normalizeVisit(booking, 'completed trip'))}-${String(booking.departureDate || '').slice(0, 10)}`,
      id: booking.id,
      name: booking.destinationName || 'Completed trip',
      date: booking.departureDate,
      source: 'Completed booking'
    })),
    ...journalTrips.map((entry) => ({
      key: `${destinationKey(normalizeVisit(entry, 'journal entry'))}-${String(entry.date || '').slice(0, 10)}`,
      id: entry.id,
      name: entry.destination || entry.location || entry.title,
      date: entry.date,
      source: 'Journal entry'
    }))
  ], (trip) => trip.key);
  const photos = uniqueBy(entries.flatMap((entry) => {
    const gallery = safeArray(entry.gallery).map((photo) => typeof photo === 'string' ? photo : photo?.image || photo?.url);
    return [entry.image, ...gallery].filter((image) => typeof image === 'string' && image.trim()).map((image, index) => ({
      id: `${entry.id}-photo-${index}`,
      image,
      name: entry.title || 'Travel photo',
      date: entry.date,
      source: 'Journal photo'
    }));
  }), (photo) => photo.image);
  const foodVisits = uniqueBy([
    ...entries.filter((entry) =>
      isFoodStory(entry)
      && onOrBeforeToday(entry.date)
      && (entry.destination || entry.location)
    ).map((entry) => normalizeVisit(entry, 'food journal entry')),
    ...completedExperiences.filter(isFoodBooking).map((booking) => normalizeVisit(booking, 'completed food experience'))
  ], destinationKey);
  const adventures = uniqueBy(
    completedExperiences.filter(isAdventureBooking),
    (booking) => String(booking.id || `${booking.title}-${booking.departureDate}`)
  );
  const winterVisits = visits.filter((visit) => {
    const date = asDate(visit.date);
    return date && [11, 0, 1].includes(date.getMonth());
  });
  const metrics = {
    mountains: visits.filter((visit) => visit.categories.mountains),
    cities: visits.filter((visit) => visit.categories.cities),
    beaches: visits.filter((visit) => visit.categories.beaches),
    culture: visits.filter((visit) => visit.categories.culture),
    trips: tripRecords,
    countries,
    photos,
    adventures,
    food: foodVisits,
    winter: winterVisits,
    desert: visits.filter((visit) => visit.categories.desert),
    forest: visits.filter((visit) => visit.categories.forest),
    islands: visits.filter((visit) => visit.categories.islands),
    volcano: visits.filter((visit) => visit.categories.volcano)
  };

  return BADGE_DEFINITIONS.map((badge) => {
    const records = metrics[badge.metric] || [];
    const progress = Math.min(records.length, badge.target);
    return {
      ...badge,
      progress,
      unlocked: progress >= badge.target,
      records,
      percentage: Math.round((progress / badge.target) * 100)
    };
  });
}

function achievementKey() {
  return `${BADGE_STATE_PREFIX}${encodeURIComponent(getJournalOwner())}`;
}

export function loadBadgeAchievements() {
  const key = achievementKey();
  const stored = localStorage.getItem(key);
  if (!stored) return {};
  const achievements = JSON.parse(stored);
  if (!achievements || Array.isArray(achievements) || typeof achievements !== 'object') {
    throw new Error('Saved badge achievements have an unexpected format.');
  }
  return achievements;
}

export function recordBadgeUnlocks(badges) {
  const achievements = loadBadgeAchievements();
  const newlyUnlocked = [];
  let changed = false;
  badges.forEach((badge) => {
    if (badge.unlocked && !achievements[badge.id]) {
      achievements[badge.id] = { unlockedAt: new Date().toISOString() };
      newlyUnlocked.push(badge.id);
      changed = true;
    }
  });
  if (changed) localStorage.setItem(achievementKey(), JSON.stringify(achievements));
  return { achievements, newlyUnlocked };
}
