import React from 'react';
import { POPULAR_COUNTRIES } from '../data/destinationsData';

export default function PopularCountries({ selectedCountry, onSelectCountry }) {
  return (
    <section className="countries-section">
      <div className="section-header">
        <div className="section-tag">
          <i className="fa-solid fa-globe"></i> TOP NATIONS
        </div>
        <h2 className="section-title">POPULAR COUNTRIES</h2>
        <p className="section-subtitle">
          Explore iconic cultures, landscapes, and experiences by country.
        </p>
      </div>

      <div className="countries-pills-row">
        {POPULAR_COUNTRIES.map((country) => {
          const isActive = selectedCountry && selectedCountry.toLowerCase() === country.name.toLowerCase();
          return (
            <div
              key={country.id}
              className={`country-pill-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCountry(isActive ? null : country.name)}
              role="button"
              tabIndex={0}
              title={`Filter destinations in ${country.name}`}
            >
              <img src={country.image} alt={country.name} className="country-thumb-circle" loading="lazy" />
              <span className="country-pill-name">{country.name}</span>
              <span className="country-pill-flag">{country.flag}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
