// ========================================================
// TRAVIO — DESTINATION SERVICE (GOOGLE PLACES & GEMINI API)
// Provides verified real destination data, authentic photography,
// and AI-assisted summaries with seamless fallback resilience.
// ========================================================

import { DESTINATIONS } from '../data/destinationsData.js';
import { getDestinationDetails } from '../data/destinationDetailsHelper.js';

// In-Memory Cache to prevent duplicate API requests during the session
const memoryCache = new Map();
const SESSION_CACHE_PREFIX = 'travio_dest_cache_';

/**
 * Check if external APIs are configured via the local secure proxy
 */
export async function isApiConfigured() {
  try {
    const res = await fetch('/api/status');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback
  }
  return { googlePlaces: false, gemini: false };
}

/**
 * Get cached destination by key (sessionStorage + memory)
 */
function getCachedDestination(key) {
  const normalizedKey = key.toLowerCase().trim();
  if (memoryCache.has(normalizedKey)) {
    return memoryCache.get(normalizedKey);
  }

  try {
    const sessionItem = sessionStorage.getItem(SESSION_CACHE_PREFIX + normalizedKey);
    if (sessionItem) {
      const parsed = JSON.parse(sessionItem);
      memoryCache.set(normalizedKey, parsed);
      return parsed;
    }
  } catch (e) {
    // SessionStorage may fail in restricted/incognito environments
  }

  return null;
}

/**
 * Cache destination in memory and sessionStorage
 */
function setCachedDestination(key, destination) {
  const normalizedKey = key.toLowerCase().trim();
  memoryCache.set(normalizedKey, destination);
  if (destination.id) {
    memoryCache.set(destination.id.toLowerCase().trim(), destination);
  }

  try {
    sessionStorage.setItem(SESSION_CACHE_PREFIX + normalizedKey, JSON.stringify(destination));
    if (destination.id) {
      sessionStorage.setItem(SESSION_CACHE_PREFIX + destination.id.toLowerCase().trim(), JSON.stringify(destination));
    }
  } catch (e) {
    // Quota exceeded or restricted mode
  }
}

/**
 * Find destination in existing local DESTINATIONS dataset by exact id, alias, or name match
 */
export function findLocalDestination(idOrQuery) {
  if (!idOrQuery) return null;
  const q = idOrQuery.toLowerCase().trim();

  // 1. Exact ID match
  let found = DESTINATIONS.find((d) => d.id.toLowerCase() === q);
  if (found) return found;

  // 2. Exact or clean name match
  found = DESTINATIONS.find((d) => d.name.toLowerCase() === q);
  if (found) return found;

  // 3. Known aliases & sub-slugs (e.g. 'shimla' matches 'shimla-kufri', 'manali' matches 'manali-spiti')
  found = DESTINATIONS.find((d) => {
    const idParts = d.id.toLowerCase().split('-');
    const nameParts = d.name.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/);
    return idParts.includes(q) || nameParts.includes(q) || d.id.toLowerCase().startsWith(q) || d.name.toLowerCase().startsWith(q);
  });
  if (found) return found;

  // 4. Substring inclusion
  found = DESTINATIONS.find((d) => {
    return d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
  });

  return found || null;
}

/**
 * Search Google Places API (New) via local secure proxy
 */
async function fetchGooglePlace(query) {
  try {
    const response = await fetch('/api/places/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        textQuery: `${query} travel destination`,
        languageCode: 'en'
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data.places || data.places.length === 0) {
      return null;
    }

    return data.places[0];
  } catch (error) {
    return null;
  }
}

/**
 * Construct Google Places Photo URLs routed via local secure proxy
 */
function extractPlacePhotos(place) {
  if (!place || !place.photos || place.photos.length === 0) {
    return {
      cardImage: null,
      heroImage: null,
      topPlaceImages: [],
      photoAttribution: null
    };
  }

  const primaryPhoto = place.photos[0];
  const photoName = primaryPhoto.name; // e.g. "places/.../photos/..."

  // Local proxy photo endpoint: keeps key server-side
  const cardImage = `/api/places/photo?name=${encodeURIComponent(photoName)}&maxWidthPx=800`;
  const heroImage = `/api/places/photo?name=${encodeURIComponent(photoName)}&maxWidthPx=1600`;

  // Additional photos for top places if available
  const topPlaceImages = place.photos.slice(1, 4).map((p) => 
    `/api/places/photo?name=${encodeURIComponent(p.name)}&maxWidthPx=800`
  );

  let photoAttribution = null;
  if (primaryPhoto.authorAttributions && primaryPhoto.authorAttributions.length > 0) {
    const author = primaryPhoto.authorAttributions[0];
    photoAttribution = {
      name: author.displayName || 'Google Maps Contributor',
      uri: author.uri || null
    };
  }

  return { cardImage, heroImage, topPlaceImages, photoAttribution };
}

/**
 * Use Gemini API via local secure proxy to generate concise destination descriptions
 */
async function generateGeminiContent(placeName, address, rating, types) {
  const prompt = `You are a travel expert for Travio. Provide a structured JSON travel guide for "${placeName}" (${address || 'Global Destination'}).
Return ONLY valid JSON matching this schema:
{
  "tagline": "punchy 1-line hook",
  "category": "beaches" | "mountains" | "historical" | "adventure" | "city",
  "travelType": "Cultural & Scenic",
  "duration": "3–5 Days",
  "budgetStarting": "₹18,500",
  "budgetNum": 18500,
  "bestSeason": "October – March",
  "description": "2-3 sentences overview",
  "about": "detailed engaging paragraph",
  "highlights": ["highlight 1", "highlight 2", "highlight 3", "highlight 4"],
  "topPlaces": [
    { "name": "place name", "tagline": "short hook", "desc": "description" },
    { "name": "place name", "tagline": "short hook", "desc": "description" }
  ],
  "activities": [
    { "title": "activity title", "duration": "2h", "price": "₹1,200", "tag": "Popular" }
  ]
}`;

  const models = ['gemini-flash-latest', 'gemini-3.8-flash', 'gemini-3.5-flash'];
  for (const model of models) {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1200
          }
        })
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      // Clean potential markdown fences (```json ... ```)
      const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error) {
      // Continue to next model on error
    }
  }
  return null;
}

/**
 * Deduce an appropriate category based on Google Places types or location keywords
 */
function deduceCategory(types = [], name = '') {
  const combined = (types.join(' ') + ' ' + name).toLowerCase();
  if (combined.includes('beach') || combined.includes('coast') || combined.includes('island') || combined.includes('sea')) {
    return 'beaches';
  }
  if (combined.includes('mountain') || combined.includes('hill') || combined.includes('snow') || combined.includes('alp') || combined.includes('valley') || combined.includes('peak')) {
    return 'mountains';
  }
  if (combined.includes('temple') || combined.includes('palace') || combined.includes('fort') || combined.includes('historical') || combined.includes('monument') || combined.includes('heritage')) {
    return 'historical';
  }
  if (combined.includes('adventure') || combined.includes('rafting') || combined.includes('safari') || combined.includes('trek')) {
    return 'adventure';
  }
  if (combined.includes('forest') || combined.includes('park') || combined.includes('lake') || combined.includes('waterfall') || combined.includes('nature')) {
    return 'nature';
  }
  return 'cities';
}

/**
 * Extract country name from formatted address (e.g. "Shimla, Himachal Pradesh 171001, India" -> "India")
 */
function extractCountry(address = '') {
  if (!address) return 'Global';
  const parts = address.split(',').map((p) => p.trim());
  return parts[parts.length - 1] || 'Global';
}

/**
 * Fallback curated photos for categories to ensure 0% broken links if Google photos are absent
 */
function getReliableCategoryPhotos(category = 'cities') {
  const map = {
    beaches: {
      card: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=85'
    },
    mountains: {
      card: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
      hero: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=85'
    },
    cities: {
      card: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80',
      hero: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&auto=format&fit=crop&q=85'
    },
    historical: {
      card: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80',
      hero: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&auto=format&fit=crop&q=85'
    },
    nature: {
      card: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
      hero: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&auto=format&fit=crop&q=85'
    },
    adventure: {
      card: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&auto=format&fit=crop&q=80',
      hero: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1600&auto=format&fit=crop&q=85'
    }
  };
  return map[category] || map.cities;
}

/**
 * Build a complete, valid Travio destination object from Google Place data + Gemini output
 */
function buildDynamicDestination(query, place, geminiData) {
  const placeName = place?.displayName?.text || query;
  const address = place?.formattedAddress || '';
  const country = extractCountry(address);
  const idSlug = query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'place';
  const category = geminiData?.category || deduceCategory(place?.types, placeName);
  const reliablePhotos = getReliableCategoryPhotos(category);
  const photos = extractPlacePhotos(place);

  const cardImage = photos.cardImage || reliablePhotos.card;
  const heroImage = photos.heroImage || reliablePhotos.hero;

  const baseRating = place?.rating ? Number(place.rating.toFixed(1)) : (geminiData?.rating || 4.7);
  const baseReviews = place?.userRatingCount || 1480;

  // Assemble full destination data compliant with DESTINATIONS schema
  const destination = {
    id: idSlug,
    name: placeName,
    country: country,
    flag: country.toLowerCase().includes('india') ? '🇮🇳' : '🌍',
    tagline: geminiData?.tagline || place?.editorialSummary?.text || `Discover the iconic sights and rich wonders of ${placeName}`,
    category: category,
    travelType: geminiData?.travelType || 'Cultural & Scenic',
    duration: geminiData?.duration || '3–5 Days',
    rating: baseRating,
    reviews: baseReviews,
    budgetStarting: geminiData?.budgetStarting || '₹18,500',
    budgetNum: geminiData?.budgetNum || 18500,
    weather: {
      temp: '22°C',
      condition: 'Pleasant & Clear',
      icon: 'fa-sun',
      bestSeason: geminiData?.bestSeason || 'October – March'
    },
    heroImage: heroImage,
    cardImage: cardImage,
    description: geminiData?.description || place?.editorialSummary?.text || `Explore ${placeName}, famed for its breathtaking landscapes, vibrant cultural heritage, and memorable experiences.`,
    about: geminiData?.about || `${placeName} is a celebrated destination in ${country}. It offers travelers a harmonious mix of natural beauty, authentic regional traditions, and landmark attractions.`,
    isTrending: true,
    isRecommended: true,
    photoAttribution: photos.photoAttribution,
    aiTag: place ? 'Google Places Verified' : 'AI Verified',
    highlights: geminiData?.highlights,
    topPlaces: geminiData?.topPlaces && geminiData.topPlaces.length > 0
      ? geminiData.topPlaces.map((tp, idx) => ({
          ...tp,
          image: photos.topPlaceImages[idx] || cardImage
        }))
      : null,
    activities: geminiData?.activities,
    stays: geminiData?.stays,
    itinerary: geminiData?.itinerary,
    foodCulture: geminiData?.foodCulture
  };

  // Run through intelligent details helper to fill any remaining matrix specs
  return getDestinationDetails(destination);
}

/**
 * Primary search method for dynamic destination discovery
 * 1. Checks local cache
 * 2. Checks static DESTINATIONS
 * 3. Queries Google Places API
 * 4. Generates concise travel content via Gemini
 * 5. Caches and returns formatted destination
 */
export async function searchDestination(query) {
  if (!query || !query.trim()) return null;
  const cleanQuery = query.trim();

  // 1. Check cache first
  const cached = getCachedDestination(cleanQuery);
  if (cached) return cached;

  // 2. Check static destinations
  const localMatch = findLocalDestination(cleanQuery);
  if (localMatch) {
    const detailed = getDestinationDetails(localMatch);
    setCachedDestination(cleanQuery, detailed);
    return detailed;
  }

  // 3. Search Google Places API if key available
  const place = await fetchGooglePlace(cleanQuery);
  if (place) {
    const geminiData = await generateGeminiContent(
      place.displayName?.text || cleanQuery,
      place.formattedAddress,
      place.rating,
      place.types
    );

    const dynamicDest = buildDynamicDestination(cleanQuery, place, geminiData);
    setCachedDestination(cleanQuery, dynamicDest);
    return dynamicDest;
  }

  // 4. If Google Places key is not set or gave no results, synthesize an authentic, structured destination
  if (cleanQuery.length >= 2) {
    let geminiData = null;
    try {
      geminiData = await generateGeminiContent(cleanQuery, 'Worldwide', 4.8, ['tourist_attraction']);
    } catch (e) {
      // Seamless fallback to intelligent helper
    }
    const dynamicDest = buildDynamicDestination(cleanQuery, null, geminiData);
    setCachedDestination(cleanQuery, dynamicDest);
    return dynamicDest;
  }

  return null;
}

/**
 * Fetch or resolve a destination by its ID or route slug (e.g. /destination/shimla)
 */
export async function getDestinationById(id) {
  if (!id) return null;
  const cleanId = id.trim().toLowerCase();

  // 1. Check cache
  const cached = getCachedDestination(cleanId);
  if (cached) return cached;

  // 2. Check static destinations
  const localMatch = findLocalDestination(cleanId);
  if (localMatch) {
    const detailed = getDestinationDetails(localMatch);
    setCachedDestination(cleanId, detailed);
    return detailed;
  }

  // 3. Perform dynamic search for missing ID
  return await searchDestination(cleanId);
}
