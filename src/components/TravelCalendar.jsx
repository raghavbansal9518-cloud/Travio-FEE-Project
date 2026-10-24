import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const TravelCalendar = () => {
  const { language } = useLanguage();
  // --- State ---
  // currentDate controls which month is being viewed
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // selectedDay tracks which day the user has clicked on
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // Weekday labels formatted according to active language
  const getWeekdayLabels = (locale) => {
    try {
      const baseDate = new Date(2023, 0, 1); // Sunday, Jan 1, 2023
      const labels = [];
      const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
      for (let i = 0; i < 7; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + i);
        labels.push(formatter.format(d));
      }
      return labels;
    } catch {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
  };

  const daysOfWeek = getWeekdayLabels(language);
  
  // Hardcoded events for demonstration purposes
  const events = {
    10: { icon: 'flight_takeoff', name: 'Trip to Bali' },
    12: { icon: 'hotel', name: 'Check-in' },
    15: { icon: 'backpack', name: 'Packing' },
    24: { icon: 'flight_land', name: 'Return Flight' }
  };

  // --- Handlers ---
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  // --- Calendar Math Helpers ---
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Localized month name
  const monthName = currentDate.toLocaleString(language || 'en', { month: 'long' });

  // --- Render Function ---
  const renderCells = () => {
    const cells = [];
    
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDay;
      const event = events[day];
      
      cells.push(
        <div 
          key={day} 
          className={`calendar-day ${isSelected ? 'selected' : ''} ${event ? 'has-event' : ''}`}
          onClick={() => setSelectedDay(day)}
        >
          <span className="day-number">{day}</span>
          
          {event && (
            <span className="material-symbols-rounded event-icon" title={event.name}>
              {event.icon}
            </span>
          )}
        </div>
      );
    }
    
    return cells;
  };

  return (
    <section className="travel-calendar-card">
      <header className="calendar-header">
        <button onClick={handlePrevMonth} aria-label="Previous Month">
          <span className="material-symbols-rounded">chevron_left</span>
        </button>
        <h3 style={{ textTransform: 'capitalize' }}>{monthName} {year}</h3>
        <button onClick={handleNextMonth} aria-label="Next Month">
          <span className="material-symbols-rounded">chevron_right</span>
        </button>
      </header>
      
      <div className="calendar-grid">
        {daysOfWeek.map((day, idx) => (
          <div key={`${day}-${idx}`} className="calendar-weekday">{day}</div>
        ))}
        {renderCells()}
      </div>
    </section>
  );
};

export default TravelCalendar;
