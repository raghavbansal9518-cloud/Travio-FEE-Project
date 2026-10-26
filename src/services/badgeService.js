import { DESTINATIONS } from '../data/destinationsData';
import { getJournalOwner, loadJournalData } from './journalService';

const BADGE_STATE_PREFIX = 'travio_badge_achievements:';
const BADGE_RESET_PREFIX = 'travio_badge_progress_reset:';
const BADGE_RESET_VERSION = '1';
const REVERSIBLE_BADGE_IDS = new Set(['wishlist-dreamer', 'master-packer']);

export const BADGE_DEFINITIONS = [
  { id: 'mountain-explorer', name: 'Mountain Explorer', category: 'Destinations', filter: 'destinations', description: 'Find your way to five remarkable mountain destinations.', requirement: 'Visit 5 mountain destinations', target: 5, metric: 'mountains', accent: '#48bfff', image: '/images/swiss_alps_bg.png', related: ['mountains'] },
  { id: 'city-wanderer', name: 'City Wanderer', category: 'Destinations', filter: 'destinations', description: 'Lose yourself in the energy of five major cities.', requirement: 'Visit 5 major cities', target: 5, metric: 'cities', accent: '#ffad55', image: '/images/paris_bg.png', related: ['cities'] },
  { id: 'beach-lover', name: 'Beach Lover', category: 'Destinations', filter: 'destinations', description: 'Discover five coastlines, coves, and sunlit shores.', requirement: 'Visit 5 beach destinations', target: 5, metric: 'beaches', accent: '#28dfd3', image: '/images/beach.jpg', related: ['beaches'] },
  { id: 'cultural-traveller', name: 'Cultural Traveller', category: 'Exploration', filter: 'exploration', description: 'Explore the stories and landmarks of five cultural destinations.', requirement: 'Visit 5 historical or cultural sites', target: 5, metric: 'culture', accent: '#ff71cf', image: '/images/japan.jpg', related: ['historical'] },
  { id: 'first-adventure', name: 'First Adventure', category: 'Milestones', filter: 'milestones', description: 'Every great travel story starts with one journey.', requirement: 'Book or complete your first trip', target: 1, metric: 'trips', accent: '#ffd451', image: '/images/hero-bg.jpg', related: ['adventure'] },
  { id: 'global-explorer', name: 'Global Explorer', category: 'Exploration', filter: 'exploration', description: 'Collect passport-worthy memories across the globe.', requirement: 'Visit 10 different countries', target: 10, metric: 'countries', accent: '#4ee5c1', image: '/images/featured-destination.jpg', related: ['cities'] },
  { id: 'photo-master', name: 'Photo Master', category: 'Activities', filter: 'activities', description: 'Build a gallery of travel moments worth revisiting.', requirement: 'Save 10 travel photos in your journal', target: 10, metric: 'photos', accent: '#65c8ff', image: '/images/japan.jpg', related: ['nature'] },
  { id: 'adventure-seeker', name: 'Adventure Seeker', category: 'Activities', filter: 'activities', description: 'Earn your stripes through five completed adventures.', requirement: 'Complete 5 adventure activities or stories', target: 5, metric: 'adventures', accent: '#ff9a56', image: '/images/adventure.jpg', related: ['adventure'] },
  { id: 'foodie', name: 'Foodie', category: 'Activities', filter: 'activities', description: 'Follow your appetite to local flavors in five destinations.', requirement: 'Record local food experiences in 5 destinations', target: 5, metric: 'food', accent: '#ff7c60', image: '/images/food.jpg', related: ['cities'] },
  { id: 'frequent-traveller', name: 'Frequent Traveller', category: 'Milestones', filter: 'milestones', description: 'Keep collecting miles, memories, and new horizons.', requirement: 'Complete 10 trips', target: 10, metric: 'trips', accent: '#b68aff', image: '/images/hero-bg.jpg', related: ['cities'] },
  { id: 'winter-voyager', name: 'Winter Voyager', category: 'Special', filter: 'special', description: 'Experience a destination at its most magical in winter.', requirement: 'Record a visit during winter (December–February)', target: 1, metric: 'winter', accent: '#d3ecff', image: '/images/iceland_bg.png', related: ['mountains'] },
  { id: 'desert-nomad', name: 'Desert Nomad', category: 'Destinations', filter: 'destinations', description: 'Follow the dunes and discover the beauty of the desert.', requirement: 'Visit a desert destination', target: 1, metric: 'desert', accent: '#ffc56b', image: '/images/dubai_bg.png', related: ['historical'] },
  { id: 'forest-trekker', name: 'Forest Trekker', category: 'Exploration', filter: 'exploration', description: 'Find your path through five forests and national parks.', requirement: 'Visit 5 forests or national parks', target: 5, metric: 'forest', accent: '#78dfa2', image: '/images/new_zealand_bg.png', related: ['nature'] },
  { id: 'island-hopper', name: 'Island Hopper', category: 'Destinations', filter: 'destinations', description: 'Make three different islands part of your story.', requirement: 'Visit 3 different islands', target: 3, metric: 'islands', accent: '#45e8d6', image: '/images/maldives.jpg', related: ['beaches'] },
  { id: 'volcano-conqueror', name: 'Volcano Conqueror', category: 'Special', filter: 'special', description: 'Stand in awe of the power and beauty of a volcano.', requirement: 'Record a visit to an active volcano', target: 1, metric: 'volcano', accent: '#ff7455', image: '/images/bali_bg.png', related: ['adventure'] },
  { id: 'storyteller', name: 'Storyteller', category: 'Milestones', filter: 'milestones', description: 'Share your personal adventures and memories with the world.', requirement: 'Publish 3 travel stories in your journal', target: 3, metric: 'stories', accent: '#c084fc', image: '/images/hero-bg.jpg', related: ['cities', 'adventure'] },
  { id: 'wishlist-dreamer', name: 'Wishlist Wanderer', category: 'Exploration', filter: 'exploration', description: 'Curate your wanderlust bucket list of dream places.', requirement: 'Save 3 destinations to your wishlist', target: 3, metric: 'wishlist', accent: '#f43f5e', image: '/images/featured-destination.jpg', related: ['beaches', 'mountains'] },
  { id: 'master-packer', name: 'Packing Pro', category: 'Activities', filter: 'activities', description: 'Stay prepared for every journey with your gear checked off.', requirement: 'Check off 3 packed items in Packing Assistant', target: 3, metric: 'packing', accent: '#38bdf8', image: '/images/adventure.jpg', related: ['adventure'] }
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
const DESTINATION_CATEGORY_NAMES = Object.keys(DESTINATION_TYPES);

// Treat malformed optional collections as empty without affecting other metrics.
function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

// Parse date-only and legacy display-date values without local-midnight drift.
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

// Check whether a valid date has passed relative to the current local day.
function beforeToday(value) {
  const date = asDate(value);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
}

// Check whether a valid date is today or earlier.
function onOrBeforeToday(value) {
  const date = asDate(value);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date <= today;
}

// Resolve a user record to the closest known destination definition.
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

// Derive badge categories from both destination metadata and searchable text.
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

// Extract the country portion from a comma-separated place name.
function countryName(value) {
  const parts = String(value || '').split(',').map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

// Convert booking, wishlist, or journal entries into a common visit shape.
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

// Build a normalized identity key to deduplicate the same destination.
function destinationKey(record) {
  return String(record.destinationId || `${record.name}-${record.country}`).toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Preserve the first record for each non-empty identity key.
function uniqueBy(items, keyFor) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFor(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Identify journal entries that describe a food-related experience.
function isFoodStory(entry) {
  const text = `${entry.title || ''} ${entry.description || ''} ${(entry.tags || []).join(' ')}`
    .toLowerCase();
  return /\b(food|foodie|local cuisine|cuisine|dish|restaurant|meal|street food|tasting|culinary|ramen|seafood)\b/.test(text);
}

// Identify completed experience bookings that describe an adventure.
function isAdventureBooking(booking) {
  const text = `${booking.title || ''} ${booking.specialNotes || ''} ${booking.destinationName || ''}`.toLowerCase();
  return /\b(adventure|hike|hiking|trek|trekking|climb|climbing|scuba|rafting|paraglid|ski|kayak|safari|snorkel|zipline|bungee)\b/.test(text);
}

// Identify bookings with food-related titles or notes.
function isFoodBooking(booking) {
  return /\b(food|culinary|cuisine|tasting|restaurant|food tour|food crawl)\b/i.test(
    `${booking.title || ''} ${booking.specialNotes || ''}`
  );
}

// Merge user travel sources into the records consumed by each badge definition.
export function calculateBadgeProgress(wishlist, bookings) {
  let entries = [];
  try {
    entries = safeArray(loadJournalData().userEntries)
      .filter((entry) => entry && entry.status !== 'draft');
  } catch (error) {
    console.error('Could not load journal entries for badge progress:', error);
    entries = [];
  }

  // 1. Visited destinations from wishlist
  const visitedFromWishlist = safeArray(wishlist)
    .filter((destination) => destination.status === 'visited')
    .map((destination) => normalizeVisit(destination, 'visited destination'));

  // 2. Confirmed user bookings (all confirmed trips count towards milestones)
  const confirmedUserBookings = safeArray(bookings).filter((booking) =>
    booking.status === 'Confirmed'
  );

  const completedExperiences = confirmedUserBookings.filter((booking) =>
    String(booking.type || booking.travelStyle || '').toUpperCase() === 'EXPERIENCE'
  );

  const tripBookings = confirmedUserBookings.filter((booking) =>
    ['FLIGHT', 'TRAIN', 'BUS', 'CAB', 'HOTEL', 'STAY'].includes(String(booking.type || booking.travelStyle || '').toUpperCase())
  );

  const journalTravelEntries = entries.filter((entry) =>
    ['trip', 'photo'].includes(entry.kind)
  );
  const journalTrips = journalTravelEntries.filter((entry) => entry.kind === 'trip');

  const bookingVisits = confirmedUserBookings
    .filter((booking) => String(booking.type || booking.travelStyle || '').toUpperCase() !== 'EXPERIENCE')
    .map((booking) => normalizeVisit(booking, 'confirmed trip'));

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
      key: `${destinationKey(normalizeVisit(booking, 'confirmed trip'))}-${String(booking.departureDate || booking.id).slice(0, 10)}`,
      id: booking.id,
      name: booking.destinationName || booking.title || 'Travel booking',
      date: booking.departureDate,
      source: 'Confirmed booking'
    })),
    ...journalTrips.map((entry) => ({
      key: `${destinationKey(normalizeVisit(entry, 'journal entry'))}-${String(entry.date || entry.id).slice(0, 10)}`,
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
    ...entries.filter((entry) => isFoodStory(entry) && (entry.destination || entry.location))
      .map((entry) => normalizeVisit(entry, 'food journal entry')),
    ...confirmedUserBookings.filter(isFoodBooking).map((booking) => normalizeVisit(booking, 'food experience booking'))
  ], destinationKey);

  const adventures = uniqueBy([
    ...completedExperiences.filter(isAdventureBooking),
    ...entries.filter((entry) =>
      /\b(adventure|hike|hiking|trek|trekking|climb|rafting|paraglid|safari|kayak|dive|diving)\b/i.test(
        `${entry.title || ''} ${entry.description || ''} ${(entry.tags || []).join(' ')}`
      )
    ).map((entry) => ({
      id: entry.id,
      title: entry.title || 'Adventure Story',
      departureDate: entry.date,
      source: 'Adventure story'
    }))
  ], (booking) => String(booking.id || `${booking.title}-${booking.departureDate}`));

  const winterVisits = visits.filter((visit) => {
    const date = asDate(visit.date);
    return date && [11, 0, 1].includes(date.getMonth());
  });

  const storyRecords = entries.map((entry) => ({
    id: entry.id,
    name: entry.title || 'Journal story',
    date: entry.date,
    source: 'Travel journal'
  }));

  const wishlistKeys = new Set();
  const wishlistRecords = safeArray(wishlist).filter((item) => {
    if (item.demoRecord) return false;
    const idKey = String(item.id || '').trim().toLowerCase();
    const placeKey = `${String(item.name || '').trim().toLowerCase()}|${String(item.country || '').trim().toLowerCase()}`;
    const keys = [idKey && `id:${idKey}`, item.name && `place:${placeKey}`].filter(Boolean);
    if (!keys.length) return false;
    const isDuplicate = keys.some((key) => wishlistKeys.has(key));
    keys.forEach((key) => wishlistKeys.add(key));
    return !isDuplicate;
  }).map((item) => ({
    id: item.id,
    name: item.name,
    source: 'Wishlist'
  }));

  let packedItemsCount = 0;
  try {
    const packingSaved = localStorage.getItem('travio_packing_items');
    if (packingSaved) {
      const parsed = JSON.parse(packingSaved);
      if (Array.isArray(parsed)) {
        const selectedOptions = parsed.filter((item) => item?.checked);
        const seenPackingOptions = new Set();
        packedItemsCount = selectedOptions.filter((item) => {
          const idKey = String(item.id || '').trim().toLowerCase();
          const textKey = String(item.text || '').trim().toLowerCase();
          const keys = [idKey && `id:${idKey}`, textKey && `text:${textKey}`].filter(Boolean);
          if (!keys.length) return false;
          const isDuplicate = keys.some((key) => seenPackingOptions.has(key));
          keys.forEach((key) => seenPackingOptions.add(key));
          return !isDuplicate;
        }).length;
      }
    }
  } catch (error) {
    console.error('Could not load packing progress for badges:', error);
  }
  const packingRecords = Array.from({ length: packedItemsCount }, (_, i) => ({
    id: `packed-item-${i}`,
    name: `Packed item #${i + 1}`,
    source: 'Packing Assistant'
  }));

  const destinationMetrics = Object.fromEntries(
    DESTINATION_CATEGORY_NAMES.map((category) => [category, []])
  );
  visits.forEach((visit) => {
    DESTINATION_CATEGORY_NAMES.forEach((category) => {
      if (visit.categories[category]) destinationMetrics[category].push(visit);
    });
  });

  const metrics = {
    ...destinationMetrics,
    trips: tripRecords,
    countries,
    photos,
    adventures,
    food: foodVisits,
    winter: winterVisits,
    stories: storyRecords,
    wishlist: wishlistRecords,
    packing: packingRecords
  };

  return BADGE_DEFINITIONS.map((badge) => {
    const records = metrics[badge.metric] || [];
    const progress = Math.min(records.length, badge.target);
    return {
      ...badge,
      progress,
      unlocked: progress >= badge.target,
      reversible: REVERSIBLE_BADGE_IDS.has(badge.id),
      records,
      percentage: Math.round((progress / badge.target) * 100)
    };
  });
}

// Scope stored achievements to the current account owner.
function achievementKey() {
  return `${BADGE_STATE_PREFIX}${encodeURIComponent(getJournalOwner())}`;
}

// Apply the requested progress reset exactly once per account.
function resetBadgeAchievementsOnce() {
  const ownerKey = encodeURIComponent(getJournalOwner());
  const resetKey = `${BADGE_RESET_PREFIX}${ownerKey}`;
  if (localStorage.getItem(resetKey) === BADGE_RESET_VERSION) return;

  localStorage.removeItem(achievementKey());
  localStorage.setItem(resetKey, BADGE_RESET_VERSION);
}

// Load the account's persisted unlock timestamps after the one-time reset.
export function loadBadgeAchievements() {
  resetBadgeAchievementsOnce();
  const key = achievementKey();
  const stored = localStorage.getItem(key);
  if (!stored) return {};
  const achievements = JSON.parse(stored);
  if (!achievements || Array.isArray(achievements) || typeof achievements !== 'object') {
    throw new Error('Saved badge achievements have an unexpected format.');
  }
  return achievements;
}

// Persist new unlock timestamps and remove stale reversible achievements.
export function recordBadgeUnlocks(badges) {
  const achievements = loadBadgeAchievements();
  const newlyUnlocked = [];
  let changed = false;
  badges.forEach((badge) => {
    if (badge.unlocked && !achievements[badge.id]) {
      achievements[badge.id] = { unlockedAt: new Date().toISOString() };
      newlyUnlocked.push(badge.id);
      changed = true;
    } else if (badge.reversible && !badge.unlocked && achievements[badge.id]) {
      delete achievements[badge.id];
      changed = true;
    }
  });
  if (changed) localStorage.setItem(achievementKey(), JSON.stringify(achievements));
  return { achievements, newlyUnlocked };
}
