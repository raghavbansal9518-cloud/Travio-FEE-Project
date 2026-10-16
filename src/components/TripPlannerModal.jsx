import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export default function TripPlannerModal({ destination, isOpen, onClose }) {
  const navigate = useNavigate();
  const { addBooking } = useTravel();

  const todayStr = new Date().toISOString().split('T')[0];
  const [dates, setDates] = useState(todayStr);
  const [durationDays, setDurationDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [travelStyle, setTravelStyle] = useState('comfort');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen || !destination) return null;

  const baseCost = destination.budgetNum || 35000;
  const styleMultiplier = travelStyle === 'luxury' ? 1.8 : travelStyle === 'budget' ? 0.75 : 1.0;
  const durationMultiplier = durationDays / 5;
  const estimatedTotal = Math.round(baseCost * travelers * styleMultiplier * durationMultiplier);

  const handleConfirmPlan = (e) => {
    e.preventDefault();
    const booking = addBooking({
      destination,
      departureDate: dates,
      durationDays,
      travelers,
      travelStyle,
      totalCost: estimatedTotal,
      specialNotes
    });
    setConfirmedBooking(booking);
  };

  const handleGoToBookings = () => {
    onClose();
    navigate('/bookings');
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

        {confirmedBooking ? (
          <div style={{ padding: '36px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white', boxShadow: '0 0 24px rgba(16, 185, 129, 0.6)' }}>
              <i className="fa-solid fa-check"></i>
            </div>
            <div>
              <span style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#10b981', fontWeight: 700 }}>
                Booking Confirmed
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '24px', fontWeight: 800, color: 'white', margin: '4px 0' }}>
                Trip Itinerary Locked!
              </h3>
              <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '13px', margin: 0 }}>
                Reference ID: <strong style={{ color: '#38bdf8' }}>{confirmedBooking.id}</strong>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px 20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#8E93A1' }}>Destination</span>
                <strong style={{ color: '#ffffff' }}>{destination.name} {destination.flag}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#8E93A1' }}>Dates</span>
                <span style={{ color: '#ffffff' }}>{confirmedBooking.departureDate} &rarr; {confirmedBooking.returnDate} ({durationDays} Days)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#8E93A1' }}>Travelers & Style</span>
                <span style={{ color: '#ffffff' }}>{travelers} Travelers • <span style={{ textTransform: 'capitalize' }}>{travelStyle}</span></span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '8px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8E93A1', fontWeight: 600, fontSize: '13px' }}>Total Package</span>
                <strong style={{ color: '#38bdf8', fontSize: '18px' }}>₹{confirmedBooking.totalCost.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '8px' }}>
              <button 
                type="button" 
                className="btn-glass" 
                onClick={onClose} 
                style={{ flex: 1, padding: '12px' }}
              >
                Keep Exploring
              </button>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={handleGoToBookings} 
                style={{ flex: 1.5, padding: '12px', justifyContent: 'center' }}
              >
                <i className="fa-solid fa-luggage-cart"></i>
                <span>View in Bookings</span>
              </button>
            </div>
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
                  min={todayStr}
                  onChange={(e) => setDates(e.target.value)}
                  required
                />
              </div>

              <div className="planner-input-group">
                <label className="planner-input-lbl">Duration</label>
                <select 
                  className="planner-select-input"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                >
                  <option value={3}>3 Days / 2 Nights (Weekend Escape)</option>
                  <option value={5}>5 Days / 4 Nights (Standard Gateway)</option>
                  <option value={7}>7 Days / 6 Nights (Week Long Expedition)</option>
                  <option value={10}>10 Days / 9 Nights (In-Depth Adventure)</option>
                  <option value={14}>14 Days / 13 Nights (Grand Tour)</option>
                </select>
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

              <div className="planner-input-group">
                <label className="planner-input-lbl">Special Requests / Preferences (Optional)</label>
                <input 
                  type="text" 
                  className="planner-text-field" 
                  placeholder="e.g. Vegetarian meals, sea-view room, rental car..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                />
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
