import React from 'react';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const categories = [
    {
      id: 'MOVE',
      title: 'MOVE',
      subtitle: 'Transport',
      subtext: 'Flights • Trains • Buses • Cabs',
      icon: 'flight_takeoff',
      badge: 'Speed & Transit',
    },
    {
      id: 'STAY',
      title: 'STAY',
      subtitle: 'Accommodation',
      subtext: 'Hotels • Resorts • Villas',
      icon: 'apartment',
      badge: 'Luxury Living',
    },
    {
      id: 'EXPERIENCE',
      title: 'EXPERIENCE',
      subtitle: 'Activities',
      subtext: 'Tours • Attractions • Activities',
      icon: 'local_activity',
      badge: 'Adventures',
    },
  ];

  return (
    <div className="category-nav-wrapper">
      <div className="category-nav-container">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
              aria-label={`Select ${cat.title} Category`}
            >
              <div className="category-tab-glow-layer" />
              
              <div className="category-tab-header">
                <div className="category-icon-bubble">
                  <span className="material-symbols-rounded">{cat.icon}</span>
                </div>
                <span className="category-mini-badge">{cat.badge}</span>
              </div>

              <div className="category-tab-text">
                <div className="category-title-row">
                  <span className="category-title">{cat.title}</span>
                  <span className="category-subtitle">{cat.subtitle}</span>
                </div>
                <span className="category-subtext">{cat.subtext}</span>
              </div>

              {isActive && <div className="category-active-bar" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
