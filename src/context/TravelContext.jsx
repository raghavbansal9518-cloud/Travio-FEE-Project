import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getTodayDate, getFutureDate } from '../utils/dateUtils';
import { calculateBadgeProgress, recordBadgeUnlocks } from '../services/badgeService';
import { getJournalOwner, loadJournalData } from '../services/journalService';

const TravelContext = createContext(null);

const STORAGE_KEYS = {
  WISHLIST: 'travio_wishlist',
  WISHLIST_LEGACY: 'wishlist_destinations',
  WISHLIST_IDS: 'wishlist_ids',
  BOOKINGS: 'travio_bookings',
  BOOKINGS_LEGACY: 'travio_user_bookings'
};
const SAMPLE_BOOKING_IDS = new Set([
  'booking-seed-1',
  'booking-seed-2',
  'TRV-FL-839201',
  'TRV-TR-224361',
  'TRV-HT-910482'
]);

// Read the normalized signed-in owner used by user-scoped booking actions.
function getActiveUserEmail() {
  const email = getJournalOwner().trim().toLowerCase();
  return email === 'guest' ? '' : email;
}

// Parse one persisted booking list and surface invalid storage instead of hiding it.
function readStoredBookings(key) {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return null;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error('Stored booking data is not a list.');
    return parsed;
  } catch (error) {
    console.error(`Failed to read bookings from ${key}:`, error);
    throw new Error(`Could not read booking data from ${key}: ${error.message || 'invalid data'}`);
  }
}

// Treat the canonical list as authoritative; use the legacy key only for migration.
function loadBookingsFromStorage() {
  const canonicalExists = localStorage.getItem(STORAGE_KEYS.BOOKINGS) !== null;
  const stored = canonicalExists
    ? readStoredBookings(STORAGE_KEYS.BOOKINGS) || []
    : readStoredBookings(STORAGE_KEYS.BOOKINGS_LEGACY) || [];
  const bookingsById = new Map();

  stored.forEach((booking) => {
    const id = String(booking?.id || booking?.bookingRef || '').trim();
    if (!id || bookingsById.has(id) || booking.demoRecord === true || SAMPLE_BOOKING_IDS.has(id)) return;
    const normalized = normalizeBooking(booking);
    if (normalized) bookingsById.set(id, normalized);
  });

  return [...bookingsById.values()];
}

// Persist one canonical snapshot to both keys and roll back partial writes.
function persistBookings(bookings) {
  const serialized = JSON.stringify(bookings);
  const previousCanonical = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  const previousLegacy = localStorage.getItem(STORAGE_KEYS.BOOKINGS_LEGACY);

  try {
    if (previousCanonical !== serialized) localStorage.setItem(STORAGE_KEYS.BOOKINGS, serialized);
    if (previousLegacy !== serialized) localStorage.setItem(STORAGE_KEYS.BOOKINGS_LEGACY, serialized);
  } catch (error) {
    try {
      if (previousCanonical === null) localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
      else localStorage.setItem(STORAGE_KEYS.BOOKINGS, previousCanonical);
      if (previousLegacy === null) localStorage.removeItem(STORAGE_KEYS.BOOKINGS_LEGACY);
      else localStorage.setItem(STORAGE_KEYS.BOOKINGS_LEGACY, previousLegacy);
    } catch (rollbackError) {
      console.error('Failed to restore booking storage after a persistence error:', rollbackError);
    }
    throw error;
  }
}

// Normalize known statuses while leaving unknown statuses non-confirmed.
function normalizeBookingStatus(status) {
  const value = String(status || '').trim();
  switch (value.toUpperCase()) {
    case 'CONFIRMED':
      return 'Confirmed';
    case 'CANCELLED':
    case 'CANCELED':
      return 'Cancelled';
    case 'COMPLETED':
      return 'Completed';
    case 'PENDING':
      return 'Pending';
    default:
      return value || 'Pending';
  }
}

// Prevent account-scoped actions from mutating another user's known booking.
function ensureBookingOwnership(booking) {
  const activeEmail = getActiveUserEmail();
  if (!activeEmail) return;
  const ownerEmail = String(
    booking.ownerEmail
    || booking.userEmail
    || booking.user?.email
    || booking.passenger?.email
    || booking.email
    || ''
  ).trim().toLowerCase();
  if (ownerEmail !== activeEmail) {
    throw new Error('This booking does not belong to the current user.');
  }
}

// Count distinct, confirmed flights owned by the active account.
function countConfirmedUserFlights(bookings, activeUserEmail) {
  if (!activeUserEmail || activeUserEmail === 'guest') return 0;

  const countedIds = new Set();
  let count = 0;
  bookings.forEach((booking) => {
    if (!booking) return;
    const id = String(booking?.id || '').trim().toLowerCase();
    const type = String(booking?.type ?? booking?.travelStyle ?? '').trim().toUpperCase();
    const status = String(booking?.status || '').trim().toLowerCase();
    const ownerEmail = String(
      booking?.ownerEmail
      ?? booking?.userEmail
      ?? booking?.user?.email
      ?? booking?.passenger?.email
      ?? booking?.email
      ?? ''
    ).trim().toLowerCase();

    if (
      !id
      || countedIds.has(id)
      || booking?.demoRecord
      || type !== 'FLIGHT'
      || status !== 'confirmed'
      || ownerEmail !== activeUserEmail
    ) {
      return;
    }

    countedIds.add(id);
    count += 1;
  });
  return count;
}

export const DEFAULT_WISHLIST = [
  {
    id: 'shimla',
    name: 'Shimla',
    country: 'Himachal Pradesh, India',
    flag: '🇮🇳',
    category: 'mountains',
    rating: 4.4,
    reviews: '12K+ reviews',
    tags: ['Hill Station', 'Nature'],
    cardImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80',
    description: 'A charming hill station known for its colonial architecture, scenic views and pleasant weather.',
    addedDate: '12 Oct 2026',
    status: 'saved',
    budgetStarting: '₹14,500'
  },
  {
    id: 'manali',
    name: 'Manali',
    country: 'Himachal Pradesh, India',
    flag: '🇮🇳',
    category: 'mountains',
    rating: 4.3,
    reviews: '10K+ reviews',
    tags: ['Adventure', 'Nature'],
    cardImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
    description: 'A beautiful valley surrounded by snow-capped mountains, perfect for adventure and relaxation.',
    addedDate: '10 Oct 2026',
    status: 'planned',
    budgetStarting: '₹16,800'
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'Goa, India',
    flag: '🇮🇳',
    category: 'beaches',
    rating: 4.5,
    reviews: '24K+ reviews',
    tags: ['Beach', 'Nightlife'],
    cardImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
    description: 'Famous for its stunning beaches, vibrant culture, water sports and lively nightlife.',
    addedDate: '8 Oct 2026',
    status: 'visited',
    budgetStarting: '₹18,000'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'Rajasthan, India',
    flag: '🇮🇳',
    category: 'heritage',
    rating: 4.3,
    reviews: '18K+ reviews',
    tags: ['Heritage', 'Culture'],
    cardImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80',
    description: 'The Pink City is known for its royal palaces, rich history and vibrant markets.',
    addedDate: '5 Oct 2026',
    status: 'planned',
    budgetStarting: '₹12,500'
  },
  {
    id: 'tokyo',
    name: 'Japan (Tokyo)',
    country: 'Tokyo, Japan',
    flag: '🇯🇵',
    category: 'heritage',
    rating: 4.7,
    reviews: '32K+ reviews',
    tags: ['Culture', 'City Life'],
    cardImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
    description: 'A perfect blend of tradition and modernity with temples, cherry blossoms and amazing food.',
    addedDate: '3 Oct 2026',
    status: 'saved',
    budgetStarting: '₹85,000'
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    country: 'Ladakh, India',
    flag: '🇮🇳',
    category: 'mountains',
    rating: 4.6,
    reviews: '8K+ reviews',
    tags: ['Adventure', 'Mountains'],
    cardImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop&q=80',
    description: 'A land of high passes, pristine lakes and breathtaking landscapes.',
    addedDate: '28 Sep 2026',
    status: 'visited',
    budgetStarting: '₹28,000'
  }
];

// Convert legacy and category-specific booking records into the shared UI shape.
// Convert legacy and category-specific booking shapes into the shared UI model.
export const normalizeBooking = (b) => {
  if (!b) return null;
  const id = b.id || b.bookingRef || `TRV-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Detect clean category type
  let type = (b.type || b.travelStyle || '').toUpperCase();
  if (!['FLIGHT', 'TRAIN', 'HOTEL', 'STAY', 'BUS', 'CAB', 'EXPERIENCE'].includes(type)) {
    if (id.includes('FL-') || b.title?.toLowerCase().includes('flight') || b.title?.toLowerCase().includes('air')) type = 'FLIGHT';
    else if (id.includes('TR-') || b.title?.toLowerCase().includes('train') || b.title?.toLowerCase().includes('express')) type = 'TRAIN';
    else if (id.includes('HT-') || b.title?.toLowerCase().includes('hotel') || b.title?.toLowerCase().includes('resort') || b.title?.toLowerCase().includes('villa')) type = 'HOTEL';
    else if (id.includes('BS-') || b.title?.toLowerCase().includes('bus')) type = 'BUS';
    else if (id.includes('CB-') || b.title?.toLowerCase().includes('cab') || b.title?.toLowerCase().includes('sedan') || b.title?.toLowerCase().includes('suv')) type = 'CAB';
    else if (id.includes('EXP-') || id.includes('ACT-') || b.title?.toLowerCase().includes('tour') || b.title?.toLowerCase().includes('pass') || b.title?.toLowerCase().includes('safari') || b.title?.toLowerCase().includes('dive') || b.title?.toLowerCase().includes('trek')) type = 'EXPERIENCE';
    else type = 'FLIGHT';
  }
  if (type === 'STAY') type = 'HOTEL';

  const destName = b.destinationName || b.destination?.name || b.toCity || b.to || b.title || 'Goa';
  const origin = b.origin || b.fromCity || b.from || (type === 'FLIGHT' ? 'Delhi (DEL)' : type === 'TRAIN' ? 'New Delhi (NDLS)' : 'New Delhi');
  const carrier = b.carrier || (type === 'FLIGHT' ? 'Air India' : type === 'TRAIN' ? 'Indian Railways (IRCTC)' : type === 'HOTEL' ? (destName + ' Luxury Resort') : type === 'EXPERIENCE' ? 'TRAVIO VIP Experience' : 'TRAVIO Partner');
  const title = b.title || (type === 'FLIGHT' ? `${carrier} (${id.split('-')?.[2] || 'AI-805'})` : type === 'HOTEL' ? `${destName} Grand Stay` : `${destName} Journey`);
  
  let depDate = b.departureDate || b.date || getTodayDate();
  if (depDate === '2026-09-04') {
    depDate = getTodayDate();
  }
  let retDate = b.returnDate || depDate;
  if (retDate === '2026-09-04' || retDate === '2026-09-08' || retDate === '2026-09-10' || retDate < depDate) {
    retDate = (type === 'HOTEL' || type === 'STAY') ? getFutureDate(4, depDate) : (type === 'FLIGHT' ? getFutureDate(6, depDate) : depDate);
  }
  const duration = b.duration || (b.durationDays ? `${b.durationDays} Days` : '1 Day');
  const durationDays = Number(b.durationDays || 1);
  const travelers = Number(b.travelers || (b.seats?.includes('Adult') ? parseInt(b.seats.split('Adult')[0].slice(-2)) || 2 : 1));
  
  let defaultSeats = 'Confirmed Seat';
  if (type === 'FLIGHT') defaultSeats = 'Seat 14B • Window (Economy)';
  else if (type === 'TRAIN') defaultSeats = 'Coach C-2 • Berth 32 (Chair Car)';
  else if (type === 'HOTEL') defaultSeats = `${travelers > 1 ? '1 Luxury Suite • 2 Adults' : '1 Deluxe Room • 1 Adult'}`;
  else if (type === 'BUS') defaultSeats = 'Seat 18 • Window (AC Sleeper)';
  else if (type === 'CAB') defaultSeats = '4 Seater Sedan • AC Express';
  else if (type === 'EXPERIENCE') defaultSeats = `${travelers} Verified VIP Pass(es)`;

  const seats = b.seats || defaultSeats;

  let defaultTime = '08:30 - 10:45 (2h 15m)';
  if (type === 'FLIGHT') defaultTime = '06:00 - 08:15 (2h 15m)';
  else if (type === 'TRAIN') defaultTime = '06:00 - 10:08 (4h 08m)';
  else if (type === 'HOTEL') defaultTime = 'Check-in: 02:00 PM • Check-out: 11:00 AM';
  else if (type === 'BUS') defaultTime = '21:00 - 06:30 (9h 30m)';
  else if (type === 'CAB') defaultTime = 'Pickup: 09:00 AM (Chauffeur Dedicated)';
  else if (type === 'EXPERIENCE') defaultTime = 'Slot: 10:00 AM - 01:00 PM';

  const time = (b.time && b.time !== 'Scheduled') ? b.time : defaultTime;
  const flag = b.destinationFlag || (type === 'FLIGHT' ? '✈️' : type === 'TRAIN' ? '🚆' : type === 'HOTEL' ? '🏨' : type === 'BUS' ? '🚌' : type === 'CAB' ? '🚕' : '🎟️');
  const country = b.destinationCountry || `${origin} → ${destName}`;

  let defaultNotes = `${title} (${seats})`;
  if (type === 'FLIGHT') defaultNotes = 'Non-stop • Cabin Baggage 7kg + Check-in 15kg • In-flight Refreshment';
  else if (type === 'TRAIN') defaultNotes = 'Superfast Express • Electric Locomotive • Clean Rail Guarantee';
  else if (type === 'HOTEL') defaultNotes = 'Complimentary Breakfast • Free High-Speed WiFi • Pool & Gym Access';
  else if (type === 'EXPERIENCE') defaultNotes = 'VIP Fast-track Access • Certified Local Guide Included • Safety Equipment Provided';

  return {
    ...b,
    id,
    type,
    title,
    carrier,
    origin,
    destinationName: destName,
    destinationCountry: country,
    destinationFlag: flag,
    destinationImage: b.destinationImage || b.image || (type === 'FLIGHT' ? 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80' : type === 'TRAIN' ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80'),
    departureDate: depDate,
    returnDate: retDate,
    time,
    duration,
    durationDays,
    travelers,
    seats,
    travelStyle: type,
    totalCost: Number(b.totalCost || b.amountPaid || b.price || 4500),
    specialNotes: b.specialNotes || b.extra || defaultNotes,
    status: normalizeBookingStatus(b.status),
    createdAt: b.createdAt || new Date().toISOString()
  };
};

// Own persistent travel state and derive badge, booking, and wishlist views.
export const TravelProvider = ({ children }) => {
  // --- Wishlist State ---
  // Restore older wishlist formats and enrich saved items with current category metadata.
  const [wishlist, setWishlist] = useState(() => {
    try {
      // An explicitly stored [] is an intentional empty wishlist, not a missing value.
      const canonical = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      const saved = canonical !== null
        ? canonical
        : localStorage.getItem(STORAGE_KEYS.WISHLIST_LEGACY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
          throw new Error('Saved wishlist data is not a list.');
        }
        const items = parsed.map((item) => {
          const defaultMatch = DEFAULT_WISHLIST.find(
            (d) =>
              String(d.id).toLowerCase() === String(item.id || '').toLowerCase() ||
              String(d.name || '').toLowerCase() === String(item.name || '').toLowerCase()
          );
          const status = item.status || defaultMatch?.status || 'saved';
          let category = item.category || defaultMatch?.category;
          if (!category || category === 'destinations') {
            const str = String(item.tags?.join(' ') || item.travelType || item.name || item.country || item.category || '').toLowerCase();
            if (str.includes('beach') || str.includes('coastal') || str.includes('goa') || str.includes('maldives') || str.includes('bali')) category = 'beaches';
            else if (str.includes('mountain') || str.includes('hill') || str.includes('alps') || str.includes('manali') || str.includes('ladakh')) category = 'mountains';
            else if (str.includes('heritage') || str.includes('culture') || str.includes('history') || str.includes('city') || str.includes('cities') || str.includes('jaipur') || str.includes('delhi') || str.includes('paris')) category = 'heritage';
            else if (str.includes('activit') || str.includes('adventure') || str.includes('sport') || str.includes('trek') || item.itemType === 'activity') category = 'activities';
            else if (str.includes('food') || str.includes('culinary') || str.includes('dining') || item.itemType === 'food') category = 'food';
            else category = 'destinations';
          }

          const isSeededDemo = item.demoRecord === true || (
            item.demoRecord !== false
            && defaultMatch
            && item.addedDate === defaultMatch.addedDate
            && item.description === defaultMatch.description
            && item.cardImage === defaultMatch.cardImage
          );
          return {
            ...item,
            category,
            tags: item.tags || defaultMatch?.tags || [category.charAt(0).toUpperCase() + category.slice(1)],
            itemType: item.itemType || (category === 'activities' ? 'activity' : category === 'food' ? 'food' : 'destination'),
            addedDate: item.addedDate ? item.addedDate.replace('2025', '2026') : '15 Oct 2026',
            status,
            demoRecord: !!isSeededDemo
          };
        });
        return items;
      }
      // Keep the initial demo list only for a genuinely new browser profile.
      return DEFAULT_WISHLIST.map((item) => ({ ...item, demoRecord: true }));
    } catch (e) {
      console.error('Error loading wishlist from storage:', e);
      return [];
    }
  });

  // --- Bookings State ---
  // Normalize stored bookings so pages can use one consistent record shape.
  const [initialBookingState] = useState(() => {
    try {
      return { bookings: loadBookingsFromStorage(), error: '' };
    } catch (e) {
      console.error('Error loading bookings from storage:', e);
      return { bookings: [], error: e.message || 'Booking storage could not be read.' };
    }
  });
  const [bookings, setBookings] = useState(initialBookingState.bookings);
  const [bookingStorageError, setBookingStorageError] = useState(initialBookingState.error);

  const [activeUserEmail, setActiveUserEmail] = useState(getActiveUserEmail);

  // Reload the authoritative list when another tab changes either storage key.
  useEffect(() => {
    const syncBookings = (event) => {
      if (event.key !== null && event.key !== STORAGE_KEYS.BOOKINGS && event.key !== STORAGE_KEYS.BOOKINGS_LEGACY) return;
      try {
        setBookings(loadBookingsFromStorage());
        setBookingStorageError('');
      } catch (error) {
        setBookingStorageError(error.message || 'Booking storage could not be read.');
        console.error('Failed to synchronize bookings from browser storage:', error);
      }
    };

    window.addEventListener('storage', syncBookings);
    return () => window.removeEventListener('storage', syncBookings);
  }, []);

  // Expose an explicit refresh for route entry and window focus.
  const refreshBookings = useCallback(() => {
    try {
      const latest = loadBookingsFromStorage();
      setBookings(latest);
      setBookingStorageError('');
      return latest;
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be read.');
      console.error('Failed to refresh bookings from browser storage:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    // Keep account-scoped metrics in sync with profile and storage changes.
    const updateActiveUser = (event) => {
      if (event.type === 'travio_profile_updated') {
        setActiveUserEmail(String(event.detail?.email || '').trim().toLowerCase());
      } else if (event.key === 'auth_email') {
        setActiveUserEmail(String(event.newValue || '').trim().toLowerCase());
      }
    };

    window.addEventListener('travio_profile_updated', updateActiveUser);
    window.addEventListener('storage', updateActiveUser);
    return () => {
      window.removeEventListener('travio_profile_updated', updateActiveUser);
      window.removeEventListener('storage', updateActiveUser);
    };
  }, []);

  // --- Toast Notification State ---
  const [toast, setToast] = useState(null);

  // Publish a short-lived app-wide status message.
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((current) => current?.id === id ? null : current);
    }, 3200);
  }, []);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      localStorage.setItem(STORAGE_KEYS.WISHLIST_LEGACY, JSON.stringify(wishlist));
      const ids = wishlist.map((item) => item.id);
      localStorage.setItem(STORAGE_KEYS.WISHLIST_IDS, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to sync wishlist to storage:', e);
    }
  }, [wishlist]);

  // Sync bookings to localStorage whenever they change
  useEffect(() => {
    if (bookingStorageError) return;
    try {
      persistBookings(bookings);
      setBookingStorageError('');
    } catch (e) {
      setBookingStorageError(e.message || 'Booking storage could not be saved.');
      console.error('Failed to sync bookings to storage:', e);
    }
  }, [bookings, bookingStorageError]);

  // --- Live Badges & Journal Synchronization ---
  // Recompute achievements from travel activity and refresh the journal count on cross-page updates.
  const [badgeState, setBadgeState] = useState(() => {
    try {
      return calculateBadgeProgress(wishlist, bookings);
    } catch {
      return [];
    }
  });
  const [badgeUnlockQueue, setBadgeUnlockQueue] = useState([]);
  const previousBadgeUnlocks = useRef(null);

  const [journalCount, setJournalCount] = useState(() => {
    try {
      const data = loadJournalData();
      return (data.userEntries || []).length;
    } catch {
      return 0;
    }
  });

  // Recompute badge state and queue only genuine locked-to-unlocked transitions.
  const checkBadgeUnlocks = useCallback((customWishlist, customBookings) => {
    try {
      const activeWishlist = customWishlist || wishlist;
      const activeBookings = customBookings || bookings;
      const computed = calculateBadgeProgress(activeWishlist, activeBookings);
      setBadgeState(computed);
      const { achievements } = recordBadgeUnlocks(computed);

      const currentUnlocks = new Map(computed.map((badge) => [
        badge.id,
        badge.unlocked || (!badge.reversible && !!achievements[badge.id])
      ]));
      let newlyUnlocked = [];
      if (previousBadgeUnlocks.current === null) {
        previousBadgeUnlocks.current = currentUnlocks;
      } else {
        newlyUnlocked = computed
          .filter((badge) => currentUnlocks.get(badge.id) && previousBadgeUnlocks.current.get(badge.id) === false)
          .map((badge) => badge.id);
        previousBadgeUnlocks.current = currentUnlocks;
        if (newlyUnlocked.length) {
          setBadgeUnlockQueue((queue) => [
            ...queue,
            ...newlyUnlocked.filter((id) => !queue.includes(id))
          ]);
        }
      }

      if (newlyUnlocked.length > 0) {
        newlyUnlocked.forEach((id) => {
          const badge = computed.find((b) => b.id === id);
          if (badge) {
            showToast(`🎉 Achievement Unlocked: ${badge.name}!`, 'success');
          }
        });
      }

      try {
        const jData = loadJournalData();
        setJournalCount((jData.userEntries || []).length);
      } catch {}

      return computed;
    } catch (err) {
      console.error('Error recalculating badges:', err);
    }
  }, [wishlist, bookings]);

  const dismissBadgeUnlock = useCallback((badgeId) => {
    setBadgeUnlockQueue((queue) => queue.filter((id) => id !== badgeId));
  }, []);

  // Recalculate on wishlist or bookings update
  useEffect(() => {
    checkBadgeUnlocks(wishlist, bookings);
  }, [wishlist, bookings, checkBadgeUnlocks]);

  // Listen to cross-feature storage or custom update events (e.g. from Journal or Packing Assistant)
  useEffect(() => {
    // Recompute shared achievements when wishlist, booking, or journal data changes.
    const handleDataChanged = () => {
      checkBadgeUnlocks();
    };
    window.addEventListener('travio_data_changed', handleDataChanged);
    window.addEventListener('storage', handleDataChanged);
    return () => {
      window.removeEventListener('travio_data_changed', handleDataChanged);
      window.removeEventListener('storage', handleDataChanged);
    };
  }, [checkBadgeUnlocks]);

  // Wishlist Helpers
  // Check destination membership using the same normalized IDs as toggleWishlist.
  const isWishlisted = (id) => {
    if (!id) return false;
    const cleanId = String(id).toLowerCase().trim();
    return wishlist.some(
      (item) => String(item.id).toLowerCase() === cleanId || String(item.name || '').toLowerCase().includes(cleanId)
    );
  };

  // Add or remove a destination while preserving existing wishlist metadata.
  const toggleWishlist = (destination) => {
    if (!destination || !destination.id) return;
    const cleanId = String(destination.id).toLowerCase().trim();
    const alreadySaved = isWishlisted(cleanId);

    if (alreadySaved) {
      setWishlist((prev) =>
        prev.filter(
          (item) =>
            String(item.id).toLowerCase() !== cleanId &&
            String(item.name || '').toLowerCase() !== String(destination.name || '').toLowerCase()
        )
      );
      showToast(`Removed "${destination.name || destination.title}" from your Wishlist`, 'info');
    } else {
      // Current date formatted e.g. "15 Oct 2026"
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const todayFormatted = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

      // Normalize category: detect beaches, mountains, heritage, wildlife, adventure, activity, food, or general
      let rawCategory = String(destination.category || destination.itemType || destination.travelType || destination.location || destination.country || '').toLowerCase();
      let tagsStr = Array.isArray(destination.tags) ? destination.tags.join(' ').toLowerCase() : '';
      let combined = `${rawCategory} ${tagsStr} ${String(destination.name || '').toLowerCase()}`;
      
      let category = 'destinations';
      if (combined.includes('beach') || combined.includes('coastal') || combined.includes('goa') || combined.includes('maldives') || combined.includes('bali')) category = 'beaches';
      else if (combined.includes('mountain') || combined.includes('hill') || combined.includes('alps') || combined.includes('manali') || combined.includes('ladakh') || combined.includes('himalaya')) category = 'mountains';
      else if (combined.includes('heritage') || combined.includes('culture') || combined.includes('history') || combined.includes('city') || combined.includes('cities') || combined.includes('jaipur') || combined.includes('delhi') || combined.includes('paris') || combined.includes('rome') || combined.includes('kyoto')) category = 'heritage';
      else if (combined.includes('activit') || combined.includes('adventure') || combined.includes('sport') || combined.includes('trek') || combined.includes('dive') || combined.includes('snorkel') || combined.includes('ski') || destination.itemType === 'activity') category = 'activities';
      else if (combined.includes('food') || combined.includes('dining') || combined.includes('culinary') || destination.itemType === 'food') category = 'food';
      else if (destination.category) category = destination.category.toLowerCase();

      // Normalize destination schema for consistent card rendering
      const normalizedItem = {
        id: destination.id,
        name: destination.name || destination.title,
        country: destination.country || destination.location || 'Global Destination',
        flag: destination.flag || '🌍',
        rating: destination.rating || 4.8,
        reviews: destination.reviews || '1.2K',
        budgetStarting: destination.budgetStarting || (destination.price ? `₹${Number(destination.price).toLocaleString('en-IN')}` : '₹25,000'),
        budgetNum: destination.budgetNum || parseInt(String(destination.price || '').replace(/[^0-9]/g, '')) || 25000,
        cardImage: destination.cardImage || destination.heroImage || destination.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
        heroImage: destination.heroImage || destination.cardImage || destination.image,
        image: destination.image || destination.cardImage || destination.heroImage,
        tagline: destination.tagline || destination.description || destination.desc || 'Experience the wonder',
        bestTime: destination.bestTime || destination.weather?.bestSeason || 'Year-round',
        travelType: destination.travelType || category,
        category: category,
        itemType: destination.itemType || (category === 'activities' ? 'activity' : category === 'food' ? 'food' : 'destination'),
        tags: Array.isArray(destination.tags) && destination.tags.length > 0 ? destination.tags : [category.charAt(0).toUpperCase() + category.slice(1)],
        addedDate: destination.addedDate || todayFormatted,
        status: destination.status || 'saved'
      };

      setWishlist((prev) => [{ ...normalizedItem, demoRecord: false }, ...prev]);
      showToast(`Added "${normalizedItem.name}" to your Wishlist! ❤️`, 'success');
    }
  };

  // Update a saved destination's visit state and clear its demo-only marker.
  const updateWishlistStatus = (id, newStatus) => {
    if (!id) return;
    const cleanId = String(id).toLowerCase().trim();
    setWishlist((prev) =>
      prev.map((item) => {
        const matchId = String(item.id || '').toLowerCase().trim() === cleanId;
        const matchName = String(item.name || '').toLowerCase().trim() === cleanId;
        return matchId || matchName ? { ...item, status: newStatus, demoRecord: false } : item;
      })
    );
    const label = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    showToast(`Marked destination as ${label}! ✨`, 'success');
  };

  // Remove a destination by its normalized ID.
  const removeFromWishlist = (id) => {
    if (!id) return;
    const cleanId = String(id).toLowerCase().trim();
    const found = wishlist.find((i) => String(i.id).toLowerCase() === cleanId);
    setWishlist((prev) => prev.filter((item) => String(item.id).toLowerCase() !== cleanId));
    if (found) {
      showToast(`Removed "${found.name}" from Wishlist`, 'info');
    }
  };

  // Clear only wishlist records, leaving bookings and other user data intact.
  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'info');
  };

  // Booking Helpers
  // Persist a newly confirmed booking before publishing it to React state.
  const addBooking = (bookingData = {}) => {
    const raw = {
      ...bookingData,
      demoRecord: false,
      ownerEmail: getActiveUserEmail(),
      destinationId: bookingData.destination?.id || bookingData.destinationId,
      destinationName: bookingData.destination?.name || bookingData.destinationName,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    const newBooking = normalizeBooking(raw);
    let current;
    try {
      current = loadBookingsFromStorage();
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be read.');
      throw error;
    }
    if (current.some((booking) => booking.id === newBooking.id)) {
      throw new Error(`Booking ${newBooking.id} already exists.`);
    }
    const updated = [newBooking, ...current];
    try {
      persistBookings(updated);
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be saved.');
      throw error;
    }
    setBookings(updated);
    showToast(`Reservation confirmed! Ref: ${newBooking.id} 🎉`, 'success');
    return newBooking;
  };

  // Update passenger details on the authoritative stored booking record.
  const updateBooking = (bookingId, updatedDetails) => {
    const id = String(bookingId || '').trim();
    let current;
    try {
      current = loadBookingsFromStorage();
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be read.');
      throw error;
    }
    const existing = current.find((booking) => booking.id === id);
    if (!existing) throw new Error('This booking could not be found.');
    ensureBookingOwnership(existing);

    const updated = current.map((booking) => (
      booking.id === id
        ? { ...booking, passenger: { ...booking.passenger, ...updatedDetails } }
        : booking
    ));
    try {
      persistBookings(updated);
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be saved.');
      throw error;
    }
    setBookings(updated);
    return true;
  };

  // Persist a reversible status transition before callers report cancellation.
  const cancelBooking = (bookingId) => {
    const cleanId = String(bookingId || '').trim();
    if (!cleanId) throw new Error('A valid booking ID is required.');

    let current;
    try {
      current = loadBookingsFromStorage();
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be read.');
      throw error;
    }
    const booking = current.find((item) => item.id === cleanId);
    if (!booking) throw new Error('This booking could not be found. Refresh and try again.');
    const status = normalizeBookingStatus(booking.status);
    if (status === 'Cancelled') throw new Error('This booking has already been cancelled.');
    if (status !== 'Confirmed' && status !== 'Pending') {
      throw new Error('Only confirmed or pending bookings can be cancelled.');
    }

    ensureBookingOwnership(booking);

    const updated = current.map((item) => (
      item.id === cleanId ? { ...item, status: 'Cancelled' } : item
    ));
    try {
      persistBookings(updated);
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be saved.');
      throw new Error(`Cancellation could not be saved: ${error.message || 'storage is unavailable'}`);
    }
    setBookings(updated);
    return true;
  };

  // Permanently remove one booking without reseeding or replacing other records.
  const deleteBooking = (bookingId) => {
    const id = String(bookingId || '').trim();
    if (!id) {
      showToast('Could not delete booking record: invalid booking ID', 'error');
      return false;
    }
    let current;
    try {
      current = loadBookingsFromStorage();
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be read.');
      showToast(`Could not delete booking record: ${error.message || 'storage is unavailable'}`, 'error');
      return false;
    }
    const target = current.find((booking) => booking.id === id);
    if (!target) {
      showToast('Could not delete booking record: booking was not found', 'error');
      return false;
    }
    try {
      ensureBookingOwnership(target);
    } catch (error) {
      showToast(error.message, 'error');
      return false;
    }
    const remaining = current.filter((booking) => booking.id !== id);
    try {
      persistBookings(remaining);
      setBookings(remaining);
      showToast('Booking record deleted', 'info');
      return true;
    } catch (error) {
      setBookingStorageError(error.message || 'Booking storage could not be saved.');
      showToast(`Could not delete booking record: ${error.message || 'storage is unavailable'}`, 'error');
      return false;
    }
  };

  return (
    <TravelContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isWishlisted,
        toggleWishlist,
        updateWishlistStatus,
        removeFromWishlist,
        clearWishlist,
        bookings,
        bookingStorageError,
        refreshBookings,
        bookingsCount: bookings.filter((b) => b.status === 'Confirmed').length,
        confirmedFlightBookingsCount: countConfirmedUserFlights(bookings, activeUserEmail),
        addBooking,
        updateBooking,
        cancelBooking,
        deleteBooking,
        badges: badgeState,
        badgeUnlockQueue,
        dismissBadgeUnlock,
        unlockedBadgesCount: badgeState.filter((b) => b.unlocked).length,
        journalCount,
        checkBadgeUnlocks,
        refreshBadges: checkBadgeUnlocks,
        showToast
      }}
    >
      {children}

      {/* Global Glass Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: toast.type === 'success' 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95))' 
              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
            color: '#ffffff',
            padding: '14px 22px',
            borderRadius: '16px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
            {toast.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span>{toast.message}</span>
        </div>
      )}
    </TravelContext.Provider>
  );
};

// Provide typed-by-convention access to the shared travel context.
export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};

export default TravelContext;
