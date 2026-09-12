import { useState } from 'react';

const TravelCalendar = () => {
  // --- State ---
  // currentDate controls which month is being viewed
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // selectedDay tracks which day the user has clicked on
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // Static array for rendering the weekday headers
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Hardcoded events for demonstration purposes
  const events = {
    10: { icon: 'flight_takeoff', name: 'Trip to Bali' },
    12: { icon: 'hotel', name: 'Check-in' },
    15: { icon: 'backpack', name: 'Packing' },
    24: { icon: 'flight_land', name: 'Return Flight' }
  };

  // --- Handlers ---
  const handlePrevMonth = () => {
    // Go back one month
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null); // Clear selection when month changes
  };

  const handleNextMonth = () => {
    // Go forward one month
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null); // Clear selection when month changes
  };

  // --- Calendar Math Helpers ---
  // Returns total number of days in a specific month
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  
  // Returns the day of the week (0-6) that the 1st of the month lands on
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Get the human-readable string for the month (e.g., "September")
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // --- Render Function ---
  // Generates the JSX for all the days in the calendar grid
  const renderCells = () => {
    const cells = [];
    
    // 1. Render empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // 2. Render the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDay;
      const hasEvent = events[day];
      
      cells.push(
        <div 
          key={day} 
          // Dynamically add classes based on selection and events
          className={`calendar-day ${isSelected ? 'selected' : ''} ${hasEvent ? 'has-event' : ''}`}
          onClick={() => setSelectedDay(day)}
        >
          <span className="day-number">{day}</span>
          
          {/* Render the event icon if this day has an event in our dictionary */}
          {hasEvent && (
            <span className="event-indicator material-symbols-rounded" title={events[day].name}>
              {events[day].icon}
            </span>
          )}
        </div>
      );
    }
    
    return cells;
  };

  return (
    <section className="travel-calendar-card">
      {/* Calendar Header: Month/Year and navigation arrows */}
      <header className="calendar-header">
        <button onClick={handlePrevMonth} aria-label="Previous Month">
          <span className="material-symbols-rounded">chevron_left</span>
        </button>
        <h3>{monthName} {year}</h3>
        <button onClick={handleNextMonth} aria-label="Next Month">
          <span className="material-symbols-rounded">chevron_right</span>
        </button>
      </header>
      
      {/* Calendar Grid Container */}
      <div className="calendar-grid">
        {/* Render Mon-Sun Headers */}
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        
        {/* Render the actual dates */}
        {renderCells()}
      </div>
    </section>
  );
};

export default TravelCalendar;