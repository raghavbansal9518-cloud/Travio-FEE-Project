import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';
import BookingCheckoutModal from '../booking/BookingCheckoutModal';

export default function TripPlannerModal({ destination, isOpen, onClose }) {
  const navigate = useNavigate();
  const { addBooking } = useTravel();
  const { t } = useLanguage();

  const todayStr = new Date().toISOString().split('T')[0];
  const [dates, setDates] = useState(todayStr);
  const [durationDays, setDurationDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [travelStyle, setTravelStyle] = useState('comfort');
  const [specialNotes, setSpecialNotes] = useState('');
  const [checkoutItem, setCheckoutItem] = useState(null);

  if (!isOpen || !destination) return null;

  const baseCost = destination.budgetNum || 35000;
  const styleMultiplier = travelStyle === 'luxury' ? 1.8 : travelStyle === 'budget' ? 0.75 : 1.0;
  const durationMultiplier = durationDays / 5;
  const estimatedTotal = Math.round(baseCost * travelers * styleMultiplier * durationMultiplier);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    const styleLabel = travelStyle === 'luxury' 
      ? '5★ Luxury Sanctuary & Butler' 
      : travelStyle === 'budget' 
      ? 'Backpacker / Boutique Eco Lodges' 
      : 'Comfort 4-Star Resort & Villa';

    const tripItem = {
      id: `plan-${destination.id}-${Date.now()}`,
      type: 'PACKAGE',
      title: `Grand Tour of ${destination.name}, ${destination.country}`,
      carrier: `Travio Expeditions • ${styleLabel}`,
      from: 'Home City / Origin',
      to: `${destination.name}, ${destination.country}`,
      fromCity: 'Origin City',
      toCity: destination.name,
      date: dates,
      time: '09:00 AM (Tour Departure)',
      duration: `${durationDays} Days / ${durationDays - 1} Nights`,
      seats: `${travelers} Traveler${travelers > 1 ? 's' : ''} • ${travelStyle.toUpperCase()} Stay`,
      seatSummary: `${travelers} Traveler${travelers > 1 ? 's' : ''} • ${styleLabel}`,
      price: estimatedTotal,
      totalCost: estimatedTotal,
      amountPaid: estimatedTotal,
      travelersCount: travelers,
      image: destination.cardImage || destination.heroImage || destination.image,
      destination: destination,
      bookingRef: `TRV-${Math.floor(100000 + Math.random() * 900000)}`,
      specialNotes: specialNotes || `Tour package with ${durationDays} days itinerary and curated stays.`
    };

    setCheckoutItem(tripItem);
  };

  if (checkoutItem) {
    return (
      <BookingCheckoutModal
        item={checkoutItem}
        initialStep="PASSENGER"
        onClose={() => {
          setCheckoutItem(null);
          onClose();
        }}
        onBookingComplete={(newBooking) => {
          const finalBooking = {
            ...newBooking,
            destination,
            departureDate: dates,
            durationDays,
            travelers,
            travelStyle,
            totalCost: newBooking.amountPaid || estimatedTotal,
            specialNotes,
            status: 'confirmed'
          };
          addBooking(finalBooking);
        }}
      />
    );
  }

  return (
    <div className="planner-modal-backdrop" onClick={onClose}>
      <div className="planner-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal-header">
          <div className="filter-modal-title">
            <i className="fa-solid fa-plane-departure" style={{ color: '#38bdf8' }}></i>
            <span>{t('phrases.Plan Trip to', 'Plan Trip to')} {destination.name} {destination.flag}</span>
          </div>
          <button type="button" className="filter-modal-close" onClick={onClose} aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleProceedToPayment}>
          <div className="planner-form-body">
            <div className="planner-input-group">
              <label className="planner-input-lbl">{t('phrases.Departure Date', 'Departure Date')}</label>
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
              <label className="planner-input-lbl">{t('phrases.Duration', 'Duration')}</label>
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
              <label className="planner-input-lbl">{t('phrases.Travelers', 'Travelers')}</label>
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
              <label className="planner-input-lbl">{t('phrases.Travel Style & Stays', 'Travel Style & Stays')}</label>
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
              <label className="planner-input-lbl">{t('phrases.Special Requests / Preferences (Optional)', 'Special Requests / Preferences (Optional)')}</label>
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
                <span style={{ fontSize: '11px', color: '#8E93A1', textTransform: 'uppercase', fontWeight: 600 }}>{t('phrases.Estimated Package Cost', 'Estimated Package Cost')}</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8' }}>
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#a855f7', background: 'rgba(106, 76, 255, 0.15)', padding: '4px 10px', borderRadius: '999px', fontWeight: 600 }}>
                {t('phrases.Includes Flights & Stays', 'Includes Flights & Stays')}
              </span>
            </div>
          </div>

          <div className="filter-modal-footer">
            <button type="button" className="btn-glass" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-lock"></i>
              <span>{t('phrases.Proceed to Payment Gateway', 'Proceed to Payment Gateway')}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
