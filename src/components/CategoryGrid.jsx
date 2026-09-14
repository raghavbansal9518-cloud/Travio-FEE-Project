import React from 'react';
import { CATEGORIES, DESTINATIONS } from '../data/destinationsData';

export default function CategoryGrid({ selectedCategory, onSelectCategory }) {
  return (
    <section className="category-section">
      <div className="category-header-bar">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <div className="section-tag">
            <i className="fa-solid fa-layer-group"></i> THEMES & VIBES
          </div>
          <h2 className="section-title">EXPLORE BY CATEGORY</h2>
        </div>

        {selectedCategory && (
          <button 
            type="button"
            className="category-reset-btn"
            onClick={() => onSelectCategory(null)}
          >
            <i className="fa-solid fa-rotate-left"></i> Show All Categories
          </button>
        )}
      </div>

      <div className="category-grid">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          // Calculate exact number of destinations present in this category
          const categoryCount = DESTINATIONS.filter((d) => d.category === cat.id).length;

          return (
            <div
              key={cat.id}
              className={`category-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(isActive ? null : cat.id)}
              role="button"
              tabIndex={0}
              title={`Filter by ${cat.name} (${categoryCount} destinations)`}
            >
              <img src={cat.image} alt={cat.name} className="category-card-img" loading="lazy" />
              <div className="category-overlay">
                <div className="category-icon-bubble">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="category-title">{cat.name}</h3>
                <span className="category-count">{categoryCount} Destinations</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
