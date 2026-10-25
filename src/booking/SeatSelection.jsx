import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SeatSelection({ item, onSelectionChange, selectedDetails }) {
  const { t } = useLanguage();
  const travelersCount = item?.travelersCount || 1;

  // Flight Seats State: support multi-seat selection when travelersCount > 1
  const [selectedSeats, setSelectedSeats] = useState(() => {
    if (selectedDetails?.seatsList && Array.isArray(selectedDetails.seatsList) && selectedDetails.seatsList.length > 0) {
      return selectedDetails.seatsList;
    }
    if (selectedDetails?.seat && typeof selectedDetails.seat === 'string' && selectedDetails.seat.includes(',')) {
      return selectedDetails.seat.split(',').map(s => s.trim());
    }
    const defaults = ['12A', '12B', '12C', '12D', '12E', '12F'];
    return defaults.slice(0, Math.min(travelersCount, 6));
  });

  // Train Berth State
  const [selectedBerth, setSelectedBerth] = useState(
    selectedDetails?.berth || (travelersCount > 1 ? 'Lower & Middle Berths' : 'Lower Berth')
  );
  const [selectedCoach, setSelectedCoach] = useState(selectedDetails?.coach || 'Coach B2 (3A)');

  // Bus Seat State
  const [busDeck, setBusDeck] = useState('lower');
  const [selectedBusSeats, setSelectedBusSeats] = useState(() => {
    if (selectedDetails?.busSeatsList && Array.isArray(selectedDetails.busSeatsList) && selectedDetails.busSeatsList.length > 0) {
      return selectedDetails.busSeatsList;
    }
    const defaults = ['L4 (Window)', 'L5 (Single)', 'L6 (Single)', 'L3 (Aisle)'];
    return defaults.slice(0, Math.min(travelersCount, 4));
  });

  // Cab Addons State
  const [cabAddons, setCabAddons] = useState(selectedDetails?.cabAddons || ['AC Fast Cool', 'Luggage Carrier']);
  // Hotel Room State
  const [roomType, setRoomType] = useState(selectedDetails?.roomType || 'Deluxe Balcony Suite');
  const [bedType, setBedType] = useState(selectedDetails?.bedType || '1 King Bed');
  // Experience Slot State
  const [timeSlot, setTimeSlot] = useState(selectedDetails?.timeSlot || '09:00 AM (Morning Glow Batch)');

  // Flight seat generator (Rows 1 to 8, Seats A, B, C | D, E, F)
  const flightRows = [
    { row: 1, type: 'xl', price: 650 },
    { row: 2, type: 'std', price: 350 },
    { row: 3, type: 'std', price: 350 },
    { row: 4, type: 'free', price: 0 },
    { row: 5, type: 'free', price: 0 },
    { row: 6, type: 'free', price: 0 },
    { row: 7, type: 'xl', price: 500 },
    { row: 8, type: 'free', price: 0 },
  ];
  const bookedSeats = ['1B', '2E', '3A', '4C', '5D', '6B', '7E'];

  const handleSeatClick = (seatCode, price) => {
    if (bookedSeats.includes(seatCode)) return;

    let updated;
    if (selectedSeats.includes(seatCode)) {
      if (selectedSeats.length > 1) {
        updated = selectedSeats.filter((s) => s !== seatCode);
      } else {
        return;
      }
    } else {
      if (selectedSeats.length < travelersCount) {
        updated = [...selectedSeats, seatCode];
      } else {
        updated = [...selectedSeats.slice(1), seatCode];
      }
    }

    setSelectedSeats(updated);
    const summary = updated.length === 1
      ? `Seat ${updated[0]}`
      : `Seats ${updated.join(', ')} (${updated.length} of ${travelersCount} Travelers)`;

    onSelectionChange({
      seat: updated.join(', '),
      seatsList: updated,
      seatPrice: 0,
      summary
    });
  };

  const handleBerthSelect = (berth, coach) => {
    setSelectedBerth(berth);
    setSelectedCoach(coach);
    const summary = travelersCount > 1
      ? `${coach} • ${travelersCount} Berths (${berth})`
      : `${coach} • ${berth}`;
    onSelectionChange({
      berth,
      coach,
      seatPrice: 0,
      summary
    });
  };

  const handleBusSeatSelect = (seatName) => {
    let updated;
    if (selectedBusSeats.includes(seatName)) {
      if (selectedBusSeats.length > 1) {
        updated = selectedBusSeats.filter((s) => s !== seatName);
      } else {
        return;
      }
    } else {
      if (selectedBusSeats.length < travelersCount) {
        updated = [...selectedBusSeats, seatName];
      } else {
        updated = [...selectedBusSeats.slice(1), seatName];
      }
    }

    setSelectedBusSeats(updated);
    const summary = updated.length === 1
      ? `Berth ${updated[0]}`
      : `Berths ${updated.join(', ')} (${updated.length} of ${travelersCount} Travelers)`;

    onSelectionChange({
      busSeat: updated.join(', '),
      busSeatsList: updated,
      seatPrice: 0,
      summary
    });
  };

  const toggleCabAddon = (addon, cost) => {
    const exists = cabAddons.includes(addon);
    const updated = exists ? cabAddons.filter((a) => a !== addon) : [...cabAddons, addon];
    setCabAddons(updated);
    onSelectionChange({
      cabAddons: updated,
      seatPrice: updated.length * 150,
      summary: updated.join(', ') || 'Standard Ride'
    });
  };

  const handleRoomSelect = (rType, addCost) => {
    setRoomType(rType);
    onSelectionChange({
      roomType: rType,
      bedType,
      seatPrice: addCost,
      summary: `${rType} (${bedType})`
    });
  };

  const handleSlotSelect = (slot) => {
    setTimeSlot(slot);
    onSelectionChange({
      timeSlot: slot,
      seatPrice: 0,
      summary: slot
    });
  };

  return (
    <div className="seat-selection-container">
      {/* 1. FLIGHT SEAT MAP */}
      {item.type === 'FLIGHT' && (
        <div className="flight-seatmap-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-plane"></i> Select {travelersCount > 1 ? `${travelersCount} Seats` : 'Your Preferred Seat'}</h4>
            <p>
              {travelersCount > 1
                ? `Select ${travelersCount} seats for your ${travelersCount} travelers (${selectedSeats.length} of ${travelersCount} selected)`
                : 'Choose window, aisle, or extra legroom seats in our modern Airbus cabin'}
            </p>
          </div>

          <div className="seat-legend">
            <span className="legend-item"><span className="legend-box available" /> {t('phrases.Available', 'Available')}</span>
            <span className="legend-item">
              <span className="legend-box selected" /> Selected: {selectedSeats.join(', ')} ({selectedSeats.length}/{travelersCount})
            </span>
            <span className="legend-item"><span className="legend-box booked" /> {t('phrases.Booked', 'Booked')}</span>
            <span className="legend-item"><span className="legend-box extra-leg" /> Extra Legroom (+₹650)</span>
          </div>

          <div className="airplane-fuselage">
            <div className="cockpit-nose">
              <i className="fa-solid fa-chevron-up"></i> {t('phrases.FRONT OF AIRCRAFT', 'FRONT OF AIRCRAFT')}
            </div>

            <div className="airplane-seats-grid">
              {flightRows.map((r) => (
                <div key={r.row} className={`seat-row ${r.type === 'xl' ? 'xl-row' : ''}`}>
                  <span className="row-num">{r.row}</span>

                  <div className="seat-side left">
                    {['A', 'B', 'C'].map((col) => {
                      const code = `${r.row}${col}`;
                      const isBooked = bookedSeats.includes(code);
                      const isSelected = selectedSeats.includes(code);
                      return (
                        <button
                          key={code}
                          type="button"
                          className={`seat-btn ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''} ${r.type}`}
                          disabled={isBooked}
                          onClick={() => handleSeatClick(code, r.price)}
                          title={`${code} - ${isBooked ? 'Booked' : `₹${r.price}`}`}
                        >
                          {isSelected ? <i className="fa-solid fa-check"></i> : col}
                        </button>
                      );
                    })}
                  </div>

                  <div className="aisle-spacer">
                    <span className="aisle-line" />
                  </div>

                  <div className="seat-side right">
                    {['D', 'E', 'F'].map((col) => {
                      const code = `${r.row}${col}`;
                      const isBooked = bookedSeats.includes(code);
                      const isSelected = selectedSeats.includes(code);
                      return (
                        <button
                          key={code}
                          type="button"
                          className={`seat-btn ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''} ${r.type}`}
                          disabled={isBooked}
                          onClick={() => handleSeatClick(code, r.price)}
                          title={`${code} - ${isBooked ? 'Booked' : `₹${r.price}`}`}
                        >
                          {isSelected ? <i className="fa-solid fa-check"></i> : col}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. TRAIN BERTH SELECTOR */}
      {item.type === 'TRAIN' && (
        <div className="train-berth-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-train"></i> Berth & Coach Preference</h4>
            <p>
              {travelersCount > 1 
                ? `Preferences for ${travelersCount} Passengers in Coach ${selectedCoach}` 
                : 'Select your preferred berth type and AC compartment'}
            </p>
          </div>

          <div className="berth-selector-grid">
            <div className="berth-group">
              <label>Assigned Coach</label>
              <select
                className="glass-select full-width"
                value={selectedCoach}
                onChange={(e) => handleBerthSelect(selectedBerth, e.target.value)}
              >
                <option value="Coach B2 (3A)">Coach B2 (AC 3 Tier)</option>
                <option value="Coach A1 (2A)">Coach A1 (AC 2 Tier)</option>
                <option value="Coach H1 (1A)">Coach H1 (First Class AC)</option>
                <option value="Executive EC (CC)">Executive Chair Car (EC)</option>
              </select>
            </div>

            <div className="berth-group">
              <label>Berth Preference</label>
              <select
                className="glass-select full-width"
                value={selectedBerth}
                onChange={(e) => handleBerthSelect(e.target.value, selectedCoach)}
              >
                <option value="Lower Berth">Lower Berth (Senior Friendly)</option>
                <option value="Middle Berth">Middle Berth</option>
                <option value="Upper Berth">Upper Berth</option>
                <option value="Side Lower Berth">Side Lower (Window View)</option>
                <option value="Side Upper Berth">Side Upper</option>
              </select>
            </div>
          </div>

          <div className="berth-preview-pill">
            <i className="fa-solid fa-circle-check"></i>
            <span>Allocation: <strong>{selectedCoach} • {selectedBerth} {travelersCount > 1 ? `(${travelersCount} Berths)` : ''}</strong></span>
          </div>
        </div>
      )}

      {/* 3. BUS SLEEPER SEATS */}
      {item.type === 'BUS' && (
        <div className="bus-sleeper-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-bus"></i> Multi-Axle Sleeper Layout</h4>
            <p>
              {travelersCount > 1 
                ? `Select ${travelersCount} sleeper berths for ${travelersCount} travelers (${selectedBusSeats.length} of ${travelersCount} selected)`
                : 'Choose between Lower and Upper Deck single/double berths'}
            </p>
          </div>

          <div className="bus-deck-tabs">
            <button
              type="button"
              className={`deck-tab-btn ${busDeck === 'lower' ? 'active' : ''}`}
              onClick={() => setBusDeck('lower')}
            >
              Lower Deck (Easy Boarding)
            </button>
            <button
              type="button"
              className={`deck-tab-btn ${busDeck === 'upper' ? 'active' : ''}`}
              onClick={() => setBusDeck('upper')}
            >
              Upper Deck (Quiet Stargazing)
            </button>
          </div>

          <div className="bus-cabin-layout">
            <div className="driver-cabin">
              <i className="fa-solid fa-dharmachakra"></i> Driver Cabin
            </div>

            <div className="sleeper-berths-grid">
              {(busDeck === 'lower'
                ? ['L1 (Single Window)', 'L2 (Single)', 'L3 (Double Aisle)', 'L4 (Double Window)', 'L5 (Single Window)', 'L6 (Single)']
                : ['U1 (Single Window)', 'U2 (Single)', 'U3 (Double Aisle)', 'U4 (Double Window)', 'U5 (Single Window)', 'U6 (Single)']
              ).map((seat) => {
                const isSelected = selectedBusSeats.includes(seat);
                return (
                  <div
                    key={seat}
                    className={`sleeper-berth-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleBusSeatSelect(seat)}
                  >
                    <span className="berth-pillow" />
                    <span className="berth-title">{seat}</span>
                    <span className="berth-status">{isSelected ? '✓ Selected' : 'Available'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. CAB PREFERENCES */}
      {item.type === 'CAB' && (
        <div className="cab-preferences-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-car-side"></i> Ride Customization & Extras</h4>
            <p>Personalize your chauffeur journey with certified amenities ({travelersCount} Passenger{travelersCount > 1 ? 's' : ''})</p>
          </div>

          <div className="cab-addons-list">
            {[
              { id: 'AC Fast Cool', desc: 'Pre-cooled air conditioning upon arrival', price: 0, icon: 'fa-snowflake' },
              { id: 'Luggage Carrier', desc: 'Secure roof rack for 4+ oversized trolley bags', price: 150, icon: 'fa-suitcase-rolling' },
              { id: 'Child Booster Seat', desc: 'Certified ergonomic child safety restraint', price: 200, icon: 'fa-baby' },
              { id: 'English Speaking Chauffeur', desc: 'Verified courteous driver with local sightseeing guidance', price: 100, icon: 'fa-user-tie' }
            ].map((addon) => {
              const isChecked = cabAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  className={`cab-addon-item ${isChecked ? 'active' : ''}`}
                  onClick={() => toggleCabAddon(addon.id, addon.price)}
                >
                  <div className="addon-icon"><i className={`fa-solid ${addon.icon}`}></i></div>
                  <div className="addon-info">
                    <strong>{addon.id}</strong>
                    <span>{addon.desc}</span>
                  </div>
                  <div className="addon-price">
                    {addon.price > 0 ? `+₹${addon.price}` : 'Free'}
                  </div>
                  <div className="addon-check">
                    <input type="checkbox" checked={isChecked} readOnly />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. HOTEL ROOM PREFERENCES */}
      {item.type === 'HOTEL' && (
        <div className="hotel-room-pref-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-hotel"></i> Room Category & Bedding</h4>
            <p>Choose your luxury suite setup ({travelersCount} Guest{travelersCount > 1 ? 's' : ''})</p>
          </div>

          <div className="room-categories-grid">
            {[
              { type: 'Deluxe Balcony Suite', desc: '45 sqm • Ocean/Garden View • Marble Bath', cost: 0 },
              { type: 'Executive Club Room', desc: '55 sqm • High Floor • Free Evening Cocktails', cost: 3500 },
              { type: 'Presidential Pool Villa', desc: '95 sqm • Private Plunge Pool • 24h Butler', cost: 9500 }
            ].map((r) => (
              <div
                key={r.type}
                className={`room-tier-card ${roomType === r.type ? 'active' : ''}`}
                onClick={() => handleRoomSelect(r.type, r.cost)}
              >
                <div className="tier-header">
                  <strong>{r.type}</strong>
                  <span className="tier-cost">{r.cost > 0 ? `+₹${r.cost.toLocaleString('en-IN')}` : 'Included'}</span>
                </div>
                <p className="tier-desc">{r.desc}</p>
                <div className="tier-select-badge">{roomType === r.type ? '✓ Selected' : 'Choose Suite'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. EXPERIENCE SLOT */}
      {item.type === 'EXPERIENCE' && (
        <div className="experience-slot-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-clock"></i> Timed Admission Slot</h4>
            <p>Reserve instant entry window to skip general ticketing queues ({travelersCount} Pass{travelersCount > 1 ? 'es' : ''})</p>
          </div>

          <div className="time-slots-grid">
            {[
              '09:00 AM (Morning Glow Batch)',
              '11:30 AM (Peak Daylight Batch)',
              '02:30 PM (Afternoon Access Batch)',
              '05:00 PM (Sunset Golden Hour Batch)',
              '07:30 PM (Night Illumination Batch)'
            ].map((slot) => (
              <button
                key={slot}
                type="button"
                className={`time-slot-pill ${timeSlot === slot ? 'active' : ''}`}
                onClick={() => handleSlotSelect(slot)}
              >
                <i className="fa-regular fa-clock"></i>
                <span>{slot}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 7. PACKAGE / EXPLORE TRIP PREFERENCES */}
      {item.type === 'PACKAGE' && (
        <div className="hotel-room-pref-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-route"></i> Curated Package Inclusions & Upgrades</h4>
            <p>Tailored for {travelersCount} Traveler{travelersCount > 1 ? 's' : ''} to {item.toCity || item.to}</p>
          </div>

          <div className="room-categories-grid">
            {[
              { type: 'Standard Itinerary Package', desc: 'Handpicked Boutique Stays • Guided City Tours • Airport Pickup', cost: 0 },
              { type: 'Premium Explorer Upgrade', desc: 'All Monument & Activity VIP Fast-Track Entry Passes Included', cost: 2500 },
              { type: 'All-Inclusive VIP Butler Villa', desc: '5★ Luxury Sanctuary • Private Chauffeur • All Gourmet Meals', cost: 7500 }
            ].map((p) => (
              <div
                key={p.type}
                className={`room-tier-card ${roomType === p.type ? 'active' : ''}`}
                onClick={() => handleRoomSelect(p.type, p.cost)}
              >
                <div className="tier-header">
                  <strong>{p.type}</strong>
                  <span className="tier-cost">{p.cost > 0 ? `+₹${p.cost.toLocaleString('en-IN')}` : 'Included'}</span>
                </div>
                <p className="tier-desc">{p.desc}</p>
                <div className="tier-select-badge">{roomType === p.type ? '✓ Selected' : 'Choose Package'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
