/**
 * TRAVIO LOCAL SECURE API PROXY
 * Keeps secret keys (Gemini, Google Places) strictly on the local machine
 * and prevents them from ever leaking into the browser or frontend bundles.
 */

export async function handleApiProxy(req, res, env = {}) {
  const geminiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  const placesKey = env.GOOGLE_PLACES_API_KEY || env.VITE_GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY || '';

  // Set standard CORS headers for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch {
    parsedUrl = { pathname: req.url, searchParams: new URLSearchParams() };
  }
  const pathname = parsedUrl.pathname;

  // 1. GET /api/status - Check available backend integrations without exposing keys
  if (pathname === '/api/status' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({
      ok: true,
      gemini: Boolean(geminiKey),
      googlePlaces: Boolean(placesKey)
    }));
    return true;
  }

  const readJsonBody = async () => {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => { data += chunk; });
      req.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch (e) {
          reject(e);
        }
      });
      req.on('error', reject);
    });
  };

  // 2. POST /api/gemini - Secure server-side query to Google Generative AI
  if (pathname === '/api/gemini' && req.method === 'POST') {
    if (!geminiKey) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 503;
      res.end(JSON.stringify({ 
        error: 'GEMINI_API_KEY is not configured in local .env. Falling back to local verified dataset.' 
      }));
      return true;
    }

    try {
      const body = await readJsonBody();
      const model = body.model || 'gemini-1.5-flash';
      const prompt = body.prompt;
      const contents = body.contents || [{ parts: [{ text: prompt }] }];
      const generationConfig = body.generationConfig || {};

      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${geminiKey}`;

      const apiRes = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig
        })
      });

      const responseData = await apiRes.json();
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = apiRes.status;
      res.end(JSON.stringify(responseData));
      return true;
    } catch (err) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message || 'Error proxying to Gemini API' }));
      return true;
    }
  }

  // 3. POST /api/places/search - Secure server-side query to Google Places API (New)
  if (pathname === '/api/places/search' && req.method === 'POST') {
    if (!placesKey) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 503;
      res.end(JSON.stringify({ 
        error: 'GOOGLE_PLACES_API_KEY is not configured in local .env. Falling back to local verified dataset.' 
      }));
      return true;
    }

    try {
      const body = await readJsonBody();
      const textQuery = body.textQuery || '';
      const languageCode = body.languageCode || 'en';

      const placesEndpoint = 'https://places.googleapis.com/v1/places:searchText';
      const apiRes = await fetch(placesEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': placesKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.photos,places.location,places.types,places.primaryType,places.editorialSummary'
        },
        body: JSON.stringify({
          textQuery,
          languageCode
        })
      });

      const responseData = await apiRes.json();
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = apiRes.status;
      res.end(JSON.stringify(responseData));
      return true;
    } catch (err) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message || 'Error proxying to Google Places API' }));
      return true;
    }
  }

  // 4. GET /api/places/photo - Secure server-side photo fetch without exposing key in browser
  if (pathname === '/api/places/photo' && req.method === 'GET') {
    const photoName = parsedUrl.searchParams.get('name');
    const maxWidthPx = parsedUrl.searchParams.get('maxWidthPx') || '800';

    if (!placesKey || !photoName) {
      res.statusCode = placesKey ? 400 : 503;
      res.end(placesKey ? 'Missing photo name parameter' : 'GOOGLE_PLACES_API_KEY not configured');
      return true;
    }

    try {
      const photoEndpoint = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidthPx}&key=${placesKey}`;
      const apiRes = await fetch(photoEndpoint);
      if (!apiRes.ok) {
        res.statusCode = apiRes.status;
        res.end('Failed to retrieve photo from Google Places');
        return true;
      }

      const contentType = apiRes.headers.get('content-type') || 'image/jpeg';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      const buffer = await apiRes.arrayBuffer();
      res.statusCode = 200;
      res.end(Buffer.from(buffer));
      return true;
    } catch (err) {
      res.statusCode = 500;
      res.end('Error retrieving photo from Google Places');
      return true;
    }
  }

  return false;
}
