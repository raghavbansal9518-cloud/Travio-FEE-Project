import React, { useState } from 'react';

export default function TripPlannerModal({ destination, isOpen, onClose }) {
  const [dates, setDates] = useState('2026-10-15');
  const [travelers, setTravelers] = useState(2);
  const [travelStyle, setTravelStyle] = useState('comfort');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen || !destination) return null;

  const baseCost = destination.budgetNum || 35000;
  const styleMultiplier = travelStyle === 'luxury' ? 1.8 : travelStyle === 'budget' ? 0.75 : 1.0;
  const estimatedTotal = Math.round(baseCost * travelers * styleMultiplier);

  const handleConfirmPlan = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="planner-modal-backdrop" onClick={onClose}>
      <div className="planner-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal-header">
          <div className="filter-modal-title">
            <i className="fa-solid fa-plane-departure" style={{ color: '#38bdf8' }}></i>
            <span>Plan Trip to {destination.name} {destination.flag}</span>
          </div>
          <button type="button" className="filter-modal-close" onClick={onClose} aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {bookingSuccess ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white', boxShadow: '0 0 24px rgba(16, 185, 129, 0.6)' }}>
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '24px', fontWeight: 800, color: 'white' }}>
              Trip Itinerary Generated!
            </h3>
            <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '14px', maxWidth: '380px' }}>
              Your customized plan for {destination.name} with activities and stays has been saved to your Travio Dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmPlan}>
            <div className="planner-form-body">
              <div className="planner-input-group">
                <label className="planner-input-lbl">Departure Date</label>
                <input
                  type="date"
                  className="planner-text-field"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  required
                />
              </div>

              <div className="planner-input-group">
                <label className="planner-input-lbl">Travelers</label>
                <select 
                  className="planner-select-input"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                >
                  <option value={1}>1 Solo Explorer</option>
                  <option value={2}>2 Travelers (Couple/Friends)</option>
                  <option value={3}>3 Travelers</option>
                  <option value={4}>4 Travelers (Family Group)</option>
                  <option value={6}>6+ Group Expedition</option>
                </select>
              </div>

              <div className="planner-input-group">
                <label className="planner-input-lbl">Travel Style & Stays</label>
                <select 
                  className="planner-select-input"
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                >
                  <option value="budget">Backpacker / Boutique Eco Lodges (₹)</option>
                  <option value="comfort">Comfort 4-Star Resorts & Villas (₹₹)</option>
                  <option value="luxury">Ultra-Luxury 5-Star Sanctuary & Butler (₹₹₹)</option>
                </select>
              </div>

              <div style={{ padding: '14px 18px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#8E93A1', textTransform: 'uppercase', fontWeight: 600 }}>Estimated Package Cost</span>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8' }}>
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: '#a855f7', background: 'rgba(106, 76, 255, 0.15)', padding: '4px 10px', borderRadius: '999px', fontWeight: 600 }}>
                  Includes Flights & Stays
                </span>
              </div>
            </div>

            <div className="filter-modal-footer">
              <button type="button" className="btn-glass" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <span>Confirm & Lock Itinerary</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
