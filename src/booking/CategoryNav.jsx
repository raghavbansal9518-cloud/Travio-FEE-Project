import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'MOVE',
      title: t('booking.moveTab', 'MOVE'),
      subtitle: t('nav.transport', 'Transport'),
      subtext: `${t('booking.flights', 'Flights')} • ${t('booking.trains', 'Trains')} • ${t('booking.buses', 'Buses')} • ${t('booking.cabs', 'Cabs')}`,
      icon: 'flight_takeoff',
      badge: t('Transit', 'Transit'),
    },
    {
      id: 'STAY',
      title: t('booking.stayTab', 'STAY'),
      subtitle: t('Luxury Stays', 'Luxury Stays'),
      subtext: t('Hotels • Resorts • Villas', 'Hotels • Resorts • Villas'),
      icon: 'apartment',
      badge: t('Luxury', 'Luxury'),
    },
    {
      id: 'EXPERIENCE',
      title: t('booking.experienceTab', 'EXPERIENCE'),
      subtitle: t('nav.activities', 'Activities'),
      subtext: t('Tours • Attractions • Adventures', 'Tours • Attractions • Adventures'),
      icon: 'local_activity',
      badge: t('Adventures', 'Adventures'),
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
