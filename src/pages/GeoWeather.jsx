import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './GeoWeather.css';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

// Fix for default Leaflet marker icon in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker matching the glowing orange/purple style
const customIcon = new L.DivIcon({
  className: 'custom-map-marker',
  html: `<div class="marker-circle"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing rime fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
  56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
  61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  66: 'Light freezing rain', 67: 'Heavy freezing rain',
  71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
  85: 'Slight snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
};

// Safe update of map view in useEffect (avoids React render-phase side effects)
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] !== undefined && center[1] !== undefined && map) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

// Controller for the full modal map: invalidates container size on modal open and handles map clicks
function MapModalController({ center, zoom, onLocationSelect }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (center) map.setView(center, zoom);
    }, 150);
    return () => clearTimeout(timer);
  }, [center, zoom, map]);

  useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    }
  });

  return null;
}

const GeoWeather = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState({ name: 'Brooklyn, New York, USA', lat: 40.6501, lon: -73.9495 });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('geoweather_recent');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load recent searches', e);
    }
    return [
      { name: 'Liverpool, UK', lat: 53.4084, lon: -2.9916, temp: 16, desc: 'Partly Cloudy', icon: 'partly_cloudy_day' },
      { name: 'Palermo, Italy', lat: 38.1157, lon: 13.3615, temp: -2, desc: 'Rain/Thunder', icon: 'thunderstorm' }
    ];
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAllRecent, setShowAllRecent] = useState(false);

  useEffect(() => {
    fetchWeather(location.lat, location.lon);
  }, [location.lat, location.lon]);

  // Persist recent searches
  useEffect(() => {
    try {
      localStorage.setItem('geoweather_recent', JSON.stringify(recentSearches));
    } catch (e) {
      console.warn('Could not save recent searches', e);
    }
  }, [recentSearches]);

  // Update recent searches entry for current location with fresh weather data
  useEffect(() => {
    if (weatherData && weatherData.current && typeof weatherData.current.temperature_2m === 'number') {
      const curTemp = Math.round(weatherData.current.temperature_2m);
      const curDesc = getWeatherDesc(weatherData.current.weather_code);
      setRecentSearches(prev =>
        prev.map(item =>
          item.name === location.name
            ? { ...item, temp: curTemp, desc: curDesc }
            : item
        )
      );
    }
  }, [weatherData, location.name]);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,surface_pressure,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      setWeatherData(res.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setFetchError("Unable to fetch weather data. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDesc = (code) => WEATHER_CODES[code] || 'Unknown';
  
  const getBackgroundImage = (code, isDay = 1) => {
    // Clear / Sunny
    if (code === 0 || code === 1) return isDay ? '/bg_sunny.jpg' : '/bg_clear.jpg';
    // Partly Cloudy
    if (code === 2) return '/bg_default.jpg';
    // Overcast
    if (code === 3) return '/bg_overcast.jpg';
    // Fog
    if (code === 45 || code === 48) return '/bg_fog.jpg';
    // Rain / Drizzle / Showers
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return '/bg_rain.jpg';
    // Snow
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return '/bg_snow.jpg';
    // Thunderstorm
    if (code >= 95) return '/bg_thunderstorm.jpg';
    
    // Default
    return '/bg_default.jpg';
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    try {
      const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
      );
      if (res.data.results && res.data.results.length > 0) {
        const result = res.data.results[0];
        const newLocation = { 
          name: `${result.name}${result.admin1 ? ', ' + result.admin1 : ''}, ${result.country}`, 
          lat: result.latitude, 
          lon: result.longitude 
        };
        setLocation(newLocation);
        
        // Add to recent searches dynamically
        setRecentSearches(prev => {
          const newItem = { 
            name: newLocation.name, 
            lat: newLocation.lat, 
            lon: newLocation.lon, 
            temp: weatherData?.current?.temperature_2m != null ? Math.round(weatherData.current.temperature_2m) : 0, 
            desc: weatherData?.current?.weather_code != null ? getWeatherDesc(weatherData.current.weather_code) : 'Clear', 
            icon: 'location_on' 
          };
          const filtered = prev.filter(item => item.name !== newLocation.name);
          return [newItem, ...filtered].slice(0, 10);
        });

        setIsSearchOpen(false);
        setSearchQuery('');
      } else {
        alert("Location not found. Please try a different city name.");
      }
    } catch (err) {
      console.error("Geocoding error", err);
      alert("Error searching location. Please check your internet connection.");
    }
  };

  const handleMapSelect = async (lat, lon) => {
    const rLat = parseFloat(lat.toFixed(4));
    const rLon = parseFloat(lon.toFixed(4));
    let displayName = `Area (${rLat}, ${rLon})`;
    
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${rLat}&lon=${rLon}&format=json`);
      if (res.data && res.data.address) {
        const addr = res.data.address;
        const city = addr.city || addr.town || addr.village || addr.county || 'Custom Area';
        const country = addr.country || '';
        displayName = `${city}${country ? ', ' + country : ''}`;
      }
    } catch {
      // Use coordinate string if reverse lookup is rate limited or unavailable
    }

    const newLoc = { name: displayName, lat: rLat, lon: rLon };
    setLocation(newLoc);
    
    setRecentSearches(prev => {
      const newItem = {
        name: displayName,
        lat: rLat,
        lon: rLon,
        temp: weatherData?.current?.temperature_2m != null ? Math.round(weatherData.current.temperature_2m) : 0,
        desc: 'Selected Pin',
        icon: 'pin_drop'
      };
      const filtered = prev.filter(item => item.name !== displayName);
      return [newItem, ...filtered].slice(0, 10);
    });
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  if (loading && !weatherData) {
    return (
      <div className="geoweather-loading">
        <span className="material-symbols-rounded" style={{ fontSize: '3rem', animation: 'spin 1.5s linear infinite' }}>
          progress_activity
        </span>
        <span>Loading live weather...</span>
      </div>
    );
  }

  if (fetchError && !weatherData) {
    return (
      <div className="geoweather-error">
        <span className="material-symbols-rounded" style={{ fontSize: '3rem', color: '#f87171' }}>cloud_off</span>
        <p>{fetchError}</p>
        <button className="retry-btn" onClick={() => fetchWeather(location.lat, location.lon)}>
          Try Again
        </button>
      </div>
    );
  }

  const currentTemp = weatherData?.current?.temperature_2m != null ? Math.round(weatherData.current.temperature_2m) : 0;
  const maxTemp = weatherData?.daily?.temperature_2m_max?.[0] != null ? Math.round(weatherData.daily.temperature_2m_max[0]) : currentTemp;
  const minTemp = weatherData?.daily?.temperature_2m_min?.[0] != null ? Math.round(weatherData.daily.temperature_2m_min[0]) : currentTemp;
  const currentCode = weatherData?.current?.weather_code != null ? weatherData.current.weather_code : 0;
  const currentDesc = getWeatherDesc(currentCode);
  const isThunderstorm = currentCode >= 95;
  const isRain = (currentCode >= 51 && currentCode <= 67) || (currentCode >= 80 && currentCode <= 82);
  const isSnow = (currentCode >= 71 && currentCode <= 77) || (currentCode >= 85 && currentCode <= 86);
  const isDay = weatherData?.current?.is_day ?? 1;
  const bgUrl = getBackgroundImage(currentCode, isDay);

  // 7 days forecast from API
  const temps7 = weatherData?.daily?.temperature_2m_max?.slice(0, 7) || [];
  const dates7 = weatherData?.daily?.time?.slice(0, 7) || [];
  const minTemps7 = weatherData?.daily?.temperature_2m_min?.slice(0, 7) || [];
  
  // Find which index represents "Today"
  const todayDateStr = new Date().toISOString().split('T')[0];
  let todayIndex = dates7.findIndex(t => t >= todayDateStr);
  if (todayIndex === -1) todayIndex = 0;
  
  const maxT = temps7.length > 0 ? Math.max(...temps7) : 30;
  const minT = temps7.length > 0 ? Math.min(...temps7) : 10;
  const range = maxT - minT === 0 ? 1 : maxT - minT;
  
  const points = temps7.map((temp, i) => {
    const x = i * 100 + 50;
    const y = 40 - ((temp - minT) / range) * 30;
    return { x, y };
  });

  let dynamicPath = points.length > 0 ? `M ${points[0].x},${points[0].y}` : 'M 50,25';
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    dynamicPath += ` C ${midX},${current.y} ${midX},${next.y} ${next.x},${next.y}`;
  }

  const todayX = points[todayIndex]?.x ?? 50;
  const todayY = points[todayIndex]?.y ?? 25;
  
  // keyPoints animate from right (1.0) to today's position
  const targetStop = points.length > 1 ? (todayIndex / (points.length - 1)).toFixed(2) : '0';
  const keyPointsValue = `1;${targetStop}`;
  
  const currentMax = Math.round(temps7[todayIndex] ?? maxTemp);
  const currentMin = Math.round(minTemps7[todayIndex] ?? minTemp);

  return (
    <div 
      className={`geoweather-container ${isThunderstorm ? 'thunderstorm-bg' : 'normal-bg'}`}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="bg-overlay"></div>
      
      {/* Weather & Particle Animations */}
      <div className="dust-particles"></div>
      <div className="dust-particles dust-2"></div>
      {isThunderstorm && <div className="lightning-flash"></div>}
      {isRain && <div className="rain-animation"></div>}
      {isSnow && <div className="snow-animation"></div>}
      
      {/* MAP MODAL */}
      {isMapExpanded && (
        <div className="map-modal-overlay" onClick={() => setIsMapExpanded(false)}>
          <div className="map-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header-tip">
              <span className="material-symbols-rounded" style={{ fontSize: '1rem', color: '#60a5fa' }}>touch_app</span>
              <span>{t('weather.clickMapTip', 'Click anywhere on the map to inspect weather')}</span>
            </div>
            <button className="close-modal-btn" onClick={() => setIsMapExpanded(false)}>
              <span className="material-symbols-rounded">close</span>
            </button>
            <MapContainer 
              center={[location.lat, location.lon]} 
              zoom={10} 
              style={{ height: "100%", width: "100%", borderRadius: "20px" }}
              zoomControl={true}
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                className="map-tiles"
              />
              <Marker position={[location.lat, location.lon]} icon={customIcon} />
              <MapModalController 
                center={[location.lat, location.lon]} 
                zoom={10} 
                onLocationSelect={handleMapSelect} 
              />
            </MapContainer>
          </div>
        </div>
      )}
      
      <div className="gw-content">
        {/* SIDEBAR (Status + Map) */}
        <div className="gw-sidebar">
          <div className="gw-brand">GeoWeather</div>

          <div className="gw-card status-card">
            <div className="status-header">
              <span className="status-title">{t('weather.status', 'Status')}</span>
            </div>
            
            {showDetails ? (
              <div className="status-details">
                <div className="detail-item">
                  <span>{t('weather.humidity', 'Humidity')}:</span>
                  <span>{weatherData?.current?.relative_humidity_2m}%</span>
                </div>
                <div className="detail-item">
                  <span>{t('weather.wind', 'Wind')}:</span>
                  <span>{weatherData?.current?.wind_speed_10m} km/h</span>
                </div>
                <div className="detail-item">
                  <span>{t('weather.pressure', 'Pressure')}:</span>
                  <span>{weatherData?.current?.surface_pressure} hPa</span>
                </div>
              </div>
            ) : (
              <div className="status-graph">
                <div className="status-curve-container">
                  <div className="status-pill">{currentTemp > 30 ? t('weather.hot', 'Hot') : currentTemp < 5 ? t('weather.cold', 'Cold') : t('weather.normal', 'Normal')}</div>
                  <svg viewBox="0 0 100 40" className="status-svg">
                    <path d="M 0,35 Q 50,35 100,5" fill="none" stroke="url(#gradient)" strokeWidth="3" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d2ff" />
                        <stop offset="100%" stopColor="#ff9a44" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="11" r="3" fill="#fff" />
                  </svg>
                </div>
              </div>
            )}
            
            <div className="status-footer" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? `${t('weather.hideDetails', 'Hide details')} <` : `${t('weather.seeMore', 'See More details')} >`}
            </div>
          </div>

          <div className="gw-card map-card" onClick={() => setIsMapExpanded(true)} title="Click to expand interactive map">
            <div className="map-header">
              <span>Select Area</span>
              <span className="material-symbols-rounded">near_me</span>
            </div>
            <div className="map-container-small">
              <div className="globe-glow"></div>
              <MapContainer 
                center={[location.lat, location.lon]} 
                zoom={10} 
                style={{ height: "100%", width: "100%", borderRadius: "50%", background: "transparent" }}
                zoomControl={false}
                attributionControl={false}
                dragging={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  className="map-tiles"
                />
                <Marker position={[location.lat, location.lon]} icon={customIcon} />
                <ChangeView center={[location.lat, location.lon]} zoom={10} />
              </MapContainer>
            </div>
            <div className="map-footer-label">{location.name.split(',')[0]}</div>
          </div>
        </div>

        {/* MAIN AREA */}
        <div className="gw-main">
          <div className="gw-topbar">
            <div className="location-info">
              <span className="material-symbols-rounded">location_on</span>
              <span>{location.name} ( {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} )</span>
            </div>
            <div className="topbar-actions">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="search-form">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city..." 
                    autoFocus
                  />
                  <button type="submit" className="icon-btn" title="Search"><span className="material-symbols-rounded">search</span></button>
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="icon-btn" title="Close"><span className="material-symbols-rounded">close</span></button>
                </form>
              ) : (
                <button className="icon-btn search-btn" onClick={() => setIsSearchOpen(true)} title="Search city">
                  <span className="material-symbols-rounded">search</span>
                </button>
              )}
              <button 
                className="download-btn" 
                onClick={() => fetchWeather(location.lat, location.lon)}
                title="Refresh Weather Data"
              >
                <span className="material-symbols-rounded" style={{ fontSize: '1rem' }}>refresh</span>
                <span>GeoWeather</span>
              </button>
              <LanguageSelector />
            </div>
          </div>

          <div className="gw-middle">
            <div className="gw-middle-left">
              <div className="temp-section">
                <div className="temp-main">
                  <span className="huge-temp">{currentTemp}&deg;</span>
                  <div className="high-low">
                    <div><span>H</span> {currentMax}&deg;</div>
                    <div><span>L</span> {currentMin}&deg;</div>
                  </div>
                </div>
              </div>
              <div className="desc-section">
                <h1>{currentDesc}</h1>
                <h2>in {location.name.split(',')[0]}</h2>
              </div>
            </div>
            
            <div className="right-info">
              <p className="info-text">
                With real-time data and advanced technology, we provide reliable forecasts for any location around the world.
              </p>
              
              <div className="gw-card recent-section">
                <div className="recent-header">
                  <span className="recent-title">Recently Searched</span>
                  <span className="recent-see-all" onClick={() => setShowAllRecent(true)}>See All &gt;</span>
                </div>
                <div className="recent-cards">
                  {recentSearches.slice(0, 2).map((city, idx) => (
                    <div className="r-card" key={idx} onClick={() => setLocation({ name: city.name, lat: city.lat, lon: city.lon })}>
                      <div className="r-card-top">
                        <span className="material-symbols-rounded">{city.icon || 'location_on'}</span>
                        <span className="r-temp">{city.temp}&deg;</span>
                      </div>
                      <div className="r-card-bottom">
                        <div className="r-name">{city.name.split(',')[0]}</div>
                        <div className="r-desc">{city.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="gw-bottom">
            <div className="forecast-chart">
              <div className="days-row">
                {dates7.map((time, idx) => (
                  <div key={time} className={`day-label ${idx === todayIndex ? 'active' : ''}`}>{getDayName(time)}</div>
                ))}
              </div>
              <div className="chart-line-container">
                <svg viewBox="0 0 700 50" preserveAspectRatio="none" className="forecast-svg" style={{ overflow: "visible" }}>
                  <defs>
                    <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur1" />
                      <feGaussianBlur stdDeviation="6" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <path id="tempPath" d={dynamicPath} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                  
                  {/* The sparkling glowing aura that follows the line */}
                  <circle r="15" fill="rgba(0, 210, 255, 0.6)" filter="url(#glow-filter)">
                    <animateMotion dur="3.5s" fill="freeze" keyPoints={keyPointsValue} keyTimes="0;1" calcMode="spline" keySplines="0.42 0 0.58 1">
                      <mpath href="#tempPath" />
                    </animateMotion>
                  </circle>
                  
                  {/* The bright white dot */}
                  <circle r="4" fill="#fff">
                    <animateMotion dur="3.5s" fill="freeze" keyPoints={keyPointsValue} keyTimes="0;1" calcMode="spline" keySplines="0.42 0 0.58 1">
                      <mpath href="#tempPath" />
                    </animateMotion>
                  </circle>
                  
                  {/* The vertical dashed line */}
                  <line x1={todayX} y1={todayY} x2={todayX} y2="50" stroke="rgba(255,255,255,0.3)" strokeDasharray="4 4" className="glowing-line" />
                </svg>
              </div>
              <div className="temps-row">
                {temps7.map((t, idx) => (
                  <div key={idx} className="temp-label">{Math.round(t)}&deg;</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT SEARCHES MODAL */}
      {showAllRecent && (
        <div className="map-modal-overlay" onClick={() => setShowAllRecent(false)}>
          <div className="map-modal-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'auto', maxHeight: '80vh' }} onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowAllRecent(false)}>
              <span className="material-symbols-rounded">close</span>
            </button>
            <h2 style={{ margin: 0, fontSize: '1.4rem' }}>All Recent Searches</h2>
            <div className="recent-cards" style={{ flexWrap: 'wrap', overflowY: 'auto', maxHeight: '55vh', padding: '4px' }}>
              {recentSearches.map((city, idx) => (
                <div 
                  className="r-card" 
                  key={idx} 
                  style={{ minWidth: '160px', flex: '0 1 calc(33.333% - 0.85rem)' }}
                  onClick={() => { 
                    setLocation({ name: city.name, lat: city.lat, lon: city.lon }); 
                    setShowAllRecent(false); 
                  }}
                >
                  <div className="r-card-top">
                    <span className="material-symbols-rounded">{city.icon || 'location_on'}</span>
                    <span className="r-temp">{city.temp}&deg;</span>
                  </div>
                  <div className="r-card-bottom">
                    <div className="r-name">{city.name.split(',')[0]}</div>
                    <div className="r-desc">{city.desc}</div>
                  </div>
                </div>
              ))}
              {recentSearches.length === 0 && <p style={{ color: 'rgba(255,255,255,0.6)' }}>No recent searches.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoWeather;
