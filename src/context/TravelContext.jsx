import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTodayDate, getFutureDate } from '../utils/dateUtils';
import { calculateBadgeProgress, recordBadgeUnlocks } from '../services/badgeService';
import { loadJournalData } from '../services/journalService';

const TravelContext = createContext(null);

const STORAGE_KEYS = {
  WISHLIST: 'travio_wishlist',
  WISHLIST_LEGACY: 'wishlist_destinations',
  WISHLIST_IDS: 'wishlist_ids',
  BOOKINGS: 'travio_bookings'
};

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

export const DEFAULT_BOOKINGS = [
  {
    id: 'TRV-FL-839201',
    type: 'FLIGHT',
    title: 'Air India (AI-805)',
    carrier: 'Air India',
    origin: 'Delhi (DEL)',
    destinationName: 'Mumbai (BOM)',
    destinationCountry: 'Delhi (DEL) → Mumbai (BOM)',
    destinationFlag: '✈️',
    destinationImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80',
    departureDate: getTodayDate(),
    returnDate: getFutureDate(6),
    time: '06:00 - 08:15 (2h 15m)',
    duration: '2h 15m',
    durationDays: 1,
    travelers: 1,
    seats: 'Seat 12A • Window (Economy)',
    travelStyle: 'FLIGHT',
    totalCost: 5420,
    specialNotes: 'Airbus A350-900 • Non-stop • Complimentary Meal',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'TRV-TR-224361',
    type: 'TRAIN',
    title: 'Vande Bharat Express (#22436)',
    carrier: 'Indian Railways (IRCTC)',
    origin: 'New Delhi (NDLS)',
    destinationName: 'Kanpur Central (CNB)',
    destinationCountry: 'New Delhi → Kanpur',
    destinationFlag: '🚆',
    destinationImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    departureDate: getTodayDate(),
    returnDate: getTodayDate(),
    time: '06:00 - 10:08 (4h 08m)',
    duration: '4h 08m',
    durationDays: 1,
    travelers: 1,
    seats: 'Coach C-3 • Berth 36 (Chair Car)',
    travelStyle: 'TRAIN',
    totalCost: 1115,
    specialNotes: 'Semi High-Speed (130 km/h) • Hot Breakfast Included',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'TRV-HT-910482',
    type: 'HOTEL',
    title: 'W Goa Luxury Retreat',
    carrier: 'W Hotels & Resorts',
    origin: 'Vagator Beach, North Goa',
    destinationName: 'Goa',
    destinationCountry: 'Goa, India',
    destinationFlag: '🏨',
    destinationImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    departureDate: getTodayDate(),
    returnDate: getFutureDate(4),
    time: 'Check-in: 02:00 PM • Check-out: 11:00 AM',
    duration: '4 Nights',
    durationDays: 4,
    travelers: 2,
    seats: '1 Ocean Villa • 2 Adults',
    travelStyle: 'HOTEL',
    totalCost: 74000,
    specialNotes: '5-Star Beachfront Luxury • Rock Pool & Spa Access',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  }
].map((booking) => ({ ...booking, demoRecord: true }));

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
    status: b.status || 'Confirmed',
    createdAt: b.createdAt || new Date().toISOString()
  };
};

export const TravelProvider = ({ children }) => {
  // --- Wishlist State ---
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST) || localStorage.getItem(STORAGE_KEYS.WISHLIST_LEGACY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
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
      }
      return DEFAULT_WISHLIST.map((item) => ({ ...item, demoRecord: true }));
    } catch (e) {
      console.error('Error loading wishlist from storage:', e);
      return DEFAULT_WISHLIST.map((item) => ({ ...item, demoRecord: true }));
    }
  });

  // --- Bookings State ---
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((booking) => {
            const normalized = normalizeBooking(booking);
            const defaultMatch = DEFAULT_BOOKINGS.find((item) => item.id === booking.id && item.title === booking.title);
            return normalized
              ? { ...normalized, demoRecord: booking.demoRecord === true || (!!defaultMatch && booking.demoRecord !== false) }
              : null;
          }).filter(Boolean);
        }
      }
      return DEFAULT_BOOKINGS.map(b => normalizeBooking(b)).filter(Boolean);
    } catch (e) {
      console.error('Error loading bookings from storage:', e);
      return DEFAULT_BOOKINGS.map((booking) => normalizeBooking(booking)).filter(Boolean);
    }
  });

  // --- Toast Notification State ---
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

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
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to sync bookings to storage:', e);
    }
  }, [bookings]);

  // --- Live Badges & Journal Synchronization ---
  const [badgeState, setBadgeState] = useState(() => {
    try {
      return calculateBadgeProgress(wishlist, bookings);
    } catch {
      return [];
    }
  });

  const [journalCount, setJournalCount] = useState(() => {
    try {
      const data = loadJournalData();
      return (data.userEntries || []).length;
    } catch {
      return 0;
    }
  });

  const checkBadgeUnlocks = useCallback((customWishlist, customBookings) => {
    try {
      const activeWishlist = customWishlist || wishlist;
      const activeBookings = customBookings || bookings;
      const computed = calculateBadgeProgress(activeWishlist, activeBookings);
      setBadgeState(computed);

      const { newlyUnlocked } = recordBadgeUnlocks(computed);
      if (newlyUnlocked && newlyUnlocked.length > 0) {
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

  // Recalculate on wishlist or bookings update
  useEffect(() => {
    checkBadgeUnlocks(wishlist, bookings);
  }, [wishlist, bookings, checkBadgeUnlocks]);

  // Listen to cross-feature storage or custom update events (e.g. from Journal or Packing Assistant)
  useEffect(() => {
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
  const isWishlisted = (id) => {
    if (!id) return false;
    const cleanId = String(id).toLowerCase().trim();
    return wishlist.some(
      (item) => String(item.id).toLowerCase() === cleanId || String(item.name || '').toLowerCase().includes(cleanId)
    );
  };

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

  const removeFromWishlist = (id) => {
    if (!id) return;
    const cleanId = String(id).toLowerCase().trim();
    const found = wishlist.find((i) => String(i.id).toLowerCase() === cleanId);
    setWishlist((prev) => prev.filter((item) => String(item.id).toLowerCase() !== cleanId));
    if (found) {
      showToast(`Removed "${found.name}" from Wishlist`, 'info');
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'info');
  };

  // Booking Helpers
  const addBooking = (bookingData = {}) => {
    const raw = {
      ...bookingData,
      demoRecord: false,
      destinationId: bookingData.destination?.id || bookingData.destinationId,
      destinationName: bookingData.destination?.name || bookingData.destinationName,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    const newBooking = normalizeBooking(raw);
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Reservation confirmed! Ref: ${newBooking.id} 🎉`, 'success');
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    showToast(`Booking ${bookingId} has been cancelled`, 'info');
  };

  const deleteBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast(`Booking record deleted`, 'info');
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
        bookingsCount: bookings.filter((b) => b.status === 'Confirmed').length,
        addBooking,
        cancelBooking,
        deleteBooking,
        badges: badgeState,
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

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};

export default TravelContext;
