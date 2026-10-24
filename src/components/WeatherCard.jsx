import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// List of popular travel destinations for auto-rotation
const CITIES = [
  { name: 'Bali, Indonesia', lat: -8.4095, lon: 115.1889, bestTime: 'Apr – Oct' },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503, bestTime: 'Mar – May' },
  { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708, bestTime: 'Nov – Mar' },
  { name: 'Paris, France', lat: 48.8566, lon: 2.3522, bestTime: 'Jun – Aug' },
  { name: 'Switzerland', lat: 46.8182, lon: 8.2275, bestTime: 'Jun – Sep' },
  { name: 'Maldives', lat: 4.1755, lon: 73.5093, bestTime: 'Nov – Apr' },
  { name: 'Iceland', lat: 64.1466, lon: -21.9426, bestTime: 'Jun – Aug' }
];

// Fallback baseline weather so widget is 100% resilient and never crashes on network/rate-limit issues
const DEFAULT_WEATHER = {
  0: { temp: 28, humidity: 65, maxTemp: 31, minTemp: 23, isDay: 1, code: 0 },
  1: { temp: 19, humidity: 55, maxTemp: 22, minTemp: 14, isDay: 1, code: 1 },
  2: { temp: 32, humidity: 45, maxTemp: 35, minTemp: 26, isDay: 1, code: 0 },
  3: { temp: 16, humidity: 70, maxTemp: 19, minTemp: 11, isDay: 1, code: 2 },
  4: { temp: 12, humidity: 60, maxTemp: 15, minTemp: 7, isDay: 1, code: 3 },
  5: { temp: 29, humidity: 75, maxTemp: 31, minTemp: 26, isDay: 1, code: 1 },
  6: { temp: 8, humidity: 80, maxTemp: 10, minTemp: 3, isDay: 1, code: 3 }
};

const WeatherCard = () => {
  // --- State Variables ---
  const [cityIndex, setCityIndex] = useState(0);
  const [weatherCache, setWeatherCache] = useState(DEFAULT_WEATHER);
  const [isFading, setIsFading] = useState(false);

  // --- Pre-fetch all cities on mount for instantaneous, flicker-free transitions ---
  useEffect(() => {
    let isMounted = true;

    CITIES.forEach((city, idx) => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (!isMounted) return;
          if (data && data.current && typeof data.current.temperature_2m === 'number') {
            const fallback = DEFAULT_WEATHER[idx] || DEFAULT_WEATHER[0];
            setWeatherCache(prev => ({
              ...prev,
              [idx]: {
                temp: Math.round(data.current.temperature_2m),
                humidity: data.current.relative_humidity_2m ?? fallback.humidity,
                maxTemp: Array.isArray(data.daily?.temperature_2m_max) ? Math.round(data.daily.temperature_2m_max[0]) : fallback.maxTemp,
                minTemp: Array.isArray(data.daily?.temperature_2m_min) ? Math.round(data.daily.temperature_2m_min[0]) : fallback.minTemp,
                isDay: data.current.is_day ?? 1,
                code: data.current.weather_code ?? 0
              }
            }));
          }
        })
        .catch(err => {
          console.warn(`Weather fallback applied for ${city.name}:`, err.message);
        });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // --- Auto-Rotate Timer with Smooth Fade Transition ---
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCityIndex(prev => (prev + 1) % CITIES.length);
        setIsFading(false);
      }, 350);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // --- Helper Function for Icons ---
  const getWeatherIcon = (code, isDay) => {
    if (code === 0 || code === 1) return isDay ? { icon: 'wb_sunny', color: '#F59E0B', desc: 'Sunny' } : { icon: 'clear_night', color: '#93C5FD', desc: 'Clear' };
    if (code === 2) return { icon: 'partly_cloudy_day', color: '#9CA3AF', desc: 'Partly Cloudy' };
    if (code === 3) return { icon: 'cloud', color: '#9CA3AF', desc: 'Cloudy' };
    if (code >= 45 && code <= 48) return { icon: 'foggy', color: '#D1D5DB', desc: 'Fog' };
    if (code >= 51 && code <= 67) return { icon: 'rainy', color: '#60A5FA', desc: 'Rain' };
    if (code >= 71 && code <= 82) return { icon: 'ac_unit', color: '#93C5FD', desc: 'Snow' };
    if (code >= 95) return { icon: 'thunderstorm', color: '#FCD34D', desc: 'Thunderstorm' };
    
    return { icon: 'wb_cloudy', color: '#9CA3AF', desc: 'Cloudy' };
  };

  const { t } = useLanguage();
  const currentCity = CITIES[cityIndex] || CITIES[0];
  const weather = weatherCache[cityIndex] || DEFAULT_WEATHER[cityIndex] || DEFAULT_WEATHER[0];
  const weatherInfo = getWeatherIcon(weather.code, weather.isDay);

  return (
    <section className="weather-card">
      <div 
        style={{
          opacity: isFading ? 0 : 1,
          transform: isFading ? 'translateY(6px) scale(0.98)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* --- Card Header: Location & Condition --- */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2>{currentCity.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {weatherInfo.desc}
            </p>
          </div>
          
          {/* Weather Icon */}
          <span className="material-symbols-rounded" style={{ color: weatherInfo.color, fontSize: '2.5rem' }}>
            {weatherInfo.icon}
          </span>
        </header>
        
        {/* --- Main Temperature Display --- */}
        <div className="weather-content">
          <div className="temperature">
            {weather.temp}°C
          </div>
        </div>
        
        {/* --- Additional Weather Stats (High/Low/Humidity) --- */}
        <div className="weather-details" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <p><strong>H:</strong> {weather.maxTemp}°C</p>
          <p><strong>L:</strong> {weather.minTemp}°C</p>
          <p><strong>{t('weather.humidity', 'Humidity')}:</strong> {weather.humidity}%</p>
        </div>
        
        {/* --- Travel Recommendation --- */}
        <p style={{ fontSize: '0.85rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>check_circle</span> {t('details.bestSeason', 'Best time to visit')}: {currentCity.bestTime}
        </p>
      </div>

      {/* --- Subtle City Indicator Dots --- */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '1rem' }}>
        {CITIES.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === cityIndex ? '16px' : '5px',
              height: '5px',
              borderRadius: '999px',
              background: idx === cityIndex ? '#6a4cff' : 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.35s ease',
              display: 'inline-block'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default WeatherCard;