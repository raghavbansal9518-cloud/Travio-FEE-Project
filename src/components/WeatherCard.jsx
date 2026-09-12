import { useState, useEffect } from 'react';

const WeatherCard = () => {
  // --- State Variables ---
  // Store the fetched weather data object
  const [weather, setWeather] = useState(null);
  // Track if we are still waiting for the API to respond
  const [loading, setLoading] = useState(true);

  // --- API Fetch ---
  // We use useEffect with an empty dependency array [] so this only runs once when the component mounts
  useEffect(() => {
    // Fetching live weather data for Bali using the free Open-Meteo API
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-8.4095&longitude=115.1889&current=temperature_2m,relative_humidity_2m,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto')
      .then(res => res.json())
      .then(data => {
        // Map the complex API response to our simpler state object
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          maxTemp: Math.round(data.daily.temperature_2m_max[0]),
          minTemp: Math.round(data.daily.temperature_2m_min[0]),
          isDay: data.current.is_day,
          code: data.current.weather_code
        });
        setLoading(false);
      })
      .catch(err => {
        // Log the error to console for debugging
        console.error("Error fetching weather:", err);
        // If the API fails (e.g. no internet connection), provide some realistic fallback data so the UI doesn't break
        setWeather({ temp: 28, humidity: 65, maxTemp: 31, minTemp: 23, isDay: 1, code: 0 });
        setLoading(false);
      });
  }, []);

  // --- Helper Function ---
  // Maps the WMO weather codes from the API to our Google Material Icons and descriptive text
  const getWeatherIcon = (code, isDay) => {
    if (code === 0 || code === 1) return isDay ? { icon: 'wb_sunny', color: '#F59E0B', desc: 'Sunny' } : { icon: 'clear_night', color: '#93C5FD', desc: 'Clear' };
    if (code === 2) return { icon: 'partly_cloudy_day', color: '#9CA3AF', desc: 'Partly Cloudy' };
    if (code === 3) return { icon: 'cloud', color: '#9CA3AF', desc: 'Cloudy' };
    if (code >= 45 && code <= 48) return { icon: 'foggy', color: '#D1D5DB', desc: 'Fog' };
    if (code >= 51 && code <= 67) return { icon: 'rainy', color: '#60A5FA', desc: 'Rain' };
    if (code >= 71 && code <= 82) return { icon: 'ac_unit', color: '#93C5FD', desc: 'Snow' };
    if (code >= 95) return { icon: 'thunderstorm', color: '#FCD34D', desc: 'Thunderstorm' };
    
    // Default fallback icon just in case
    return { icon: 'wb_cloudy', color: '#9CA3AF', desc: 'Cloudy' };
  };

  // Determine which icon and description to show based on our current weather state
  const weatherInfo = weather ? getWeatherIcon(weather.code, weather.isDay) : { icon: 'wb_sunny', color: '#F59E0B', desc: 'Sunny' };

  return (
    <section className="weather-card">
      {/* --- Card Header: Location & Condition --- */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>Bali, Indonesia</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {/* Conditional rendering: Show 'Loading...' text if API hasn't responded yet */}
            {loading ? 'Loading...' : weatherInfo.desc}
          </p>
        </div>
        
        {/* Conditional rendering: Only render the icon once we have finished loading the data */}
        {!loading && (
          <span className="material-symbols-rounded" style={{ color: weatherInfo.color, fontSize: '2.5rem' }}>
            {weatherInfo.icon}
          </span>
        )}
      </header>
      
      {/* --- Main Temperature Display --- */}
      <div className="weather-content">
        <div className="temperature">
          {/* Use optional chaining (?.) just to be super safe */}
          {loading ? '--' : weather?.temp}°C
        </div>
      </div>
      
      {/* --- Additional Weather Stats (High/Low/Humidity) --- */}
      <div className="weather-details" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <p><strong>H:</strong> {loading ? '-' : weather?.maxTemp}°C</p>
        <p><strong>L:</strong> {loading ? '-' : weather?.minTemp}°C</p>
        <p><strong>Humidity:</strong> {loading ? '-' : weather?.humidity}%</p>
      </div>
      
      {/* --- Travel Recommendation --- */}
      <p style={{ fontSize: '0.85rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>check_circle</span> Best time to visit: Apr – Oct
      </p>
    </section>
  );
};

export default WeatherCard;