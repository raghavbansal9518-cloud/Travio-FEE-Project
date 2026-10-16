import React, { useState } from 'react';

export default function SeatSelection({ item, onSelectionChange, selectedDetails }) {
  // Flight Seats State
  const [selectedSeat, setSelectedSeat] = useState(selectedDetails?.seat || '12A');
  // Train Berth State
  const [selectedBerth, setSelectedBerth] = useState(selectedDetails?.berth || 'Lower Berth');
  const [selectedCoach, setSelectedCoach] = useState(selectedDetails?.coach || 'Coach B2 (3A)');
  // Bus Seat State
  const [busDeck, setBusDeck] = useState('lower');
  const [selectedBusSeat, setSelectedBusSeat] = useState(selectedDetails?.busSeat || 'L4 (Window)');
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
    setSelectedSeat(seatCode);
    onSelectionChange({
      seat: seatCode,
      seatPrice: price,
      summary: `Seat ${seatCode} (${price > 0 ? `+₹${price}` : 'Free'})`
    });
  };

  const handleBerthSelect = (berth, coach) => {
    setSelectedBerth(berth);
    setSelectedCoach(coach);
    onSelectionChange({
      berth,
      coach,
      seatPrice: 0,
      summary: `${coach} • ${berth}`
    });
  };

  const handleBusSeatSelect = (seatName) => {
    setSelectedBusSeat(seatName);
    onSelectionChange({
      busSeat: seatName,
      seatPrice: 0,
      summary: `Berth ${seatName}`
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
            <h4><i className="fa-solid fa-plane"></i> Select Your Preferred Seat</h4>
            <p>Choose window, aisle, or extra legroom seats in our modern Airbus cabin</p>
          </div>

          <div className="seat-legend">
            <span className="legend-item"><span className="legend-box available" /> Available</span>
            <span className="legend-item"><span className="legend-box selected" /> Selected ({selectedSeat})</span>
            <span className="legend-item"><span className="legend-box booked" /> Booked</span>
            <span className="legend-item"><span className="legend-box extra-leg" /> Extra Legroom (+₹650)</span>
          </div>

          <div className="airplane-fuselage">
            <div className="cockpit-nose">
              <i className="fa-solid fa-chevron-up"></i> FRONT OF AIRCRAFT
            </div>

            <div className="airplane-seats-grid">
              {flightRows.map((r) => (
                <div key={r.row} className={`seat-row ${r.type === 'xl' ? 'xl-row' : ''}`}>
                  <span className="row-num">{r.row}</span>

                  <div className="seat-side left">
                    {['A', 'B', 'C'].map((col) => {
                      const code = `${r.row}${col}`;
                      const isBooked = bookedSeats.includes(code);
                      const isSelected = selectedSeat === code;
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
                      const isSelected = selectedSeat === code;
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
            <p>Select your preferred berth type and AC compartment</p>
          </div>

          <div className="berth-selector-grid">
            <div className="berth-group">
              <label>Assigned Coach</label>
              <div className="chip-options-row">
                {['Coach B1 (3A)', 'Coach B2 (3A)', 'Coach A1 (2A)', 'Coach H1 (1A)'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`choice-chip ${selectedCoach === c ? 'active' : ''}`}
                    onClick={() => handleBerthSelect(selectedBerth, c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="berth-group">
              <label>Berth Choice</label>
              <div className="berth-cards-grid">
                {[
                  { name: 'Lower Berth', desc: 'Easy access, best for seniors', icon: 'fa-bed' },
                  { name: 'Middle Berth', desc: 'Foldable quiet sleep space', icon: 'fa-bed' },
                  { name: 'Upper Berth', desc: 'Private & undisturbed all day', icon: 'fa-bed' },
                  { name: 'Side Lower', desc: 'Panoramic personal window', icon: 'fa-window-maximize' },
                  { name: 'Side Upper', desc: 'Cozy single bunk space', icon: 'fa-bed' }
                ].map((b) => (
                  <div
                    key={b.name}
                    className={`berth-card ${selectedBerth === b.name ? 'active' : ''}`}
                    onClick={() => handleBerthSelect(b.name, selectedCoach)}
                  >
                    <i className={`fa-solid ${b.icon}`}></i>
                    <strong>{b.name}</strong>
                    <span>{b.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BUS SLEEPER SEATS */}
      {item.type === 'BUS' && (
        <div className="bus-sleeper-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-bus"></i> Multi-Axle Sleeper Layout</h4>
            <p>Choose between Lower and Upper Deck single/double berths</p>
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
              ).map((seat) => (
                <div
                  key={seat}
                  className={`sleeper-berth-card ${selectedBusSeat === seat ? 'selected' : ''}`}
                  onClick={() => handleBusSeatSelect(seat)}
                >
                  <span className="berth-pillow" />
                  <span className="berth-title">{seat}</span>
                  <span className="berth-status">{selectedBusSeat === seat ? '✓ Selected' : 'Available'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. CAB PREFERENCES */}
      {item.type === 'CAB' && (
        <div className="cab-preferences-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-car-side"></i> Ride Customization & Extras</h4>
            <p>Personalize your chauffeur journey with certified amenities</p>
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
                  <div className="addon-checkbox">
                    {isChecked ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-regular fa-circle"></i>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. HOTEL ROOM TIER */}
      {item.type === 'HOTEL' && (
        <div className="hotel-room-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-hotel"></i> Room Type & Bedding</h4>
            <p>Select your preferred room view and bedding arrangement</p>
          </div>

          <div className="room-tiers-grid">
            {[
              { name: 'Deluxe Balcony Suite', desc: '450 sq ft • Private Garden View • Free Breakfast', add: 0 },
              { name: 'Panoramic Ocean Suite', desc: '620 sq ft • 180° Sea Horizon • Jacuzzi Tub', add: 2500 },
              { name: 'Royal Presidential Villa', desc: '1,100 sq ft • Private Plunge Pool • Butler Service', add: 6000 }
            ].map((room) => (
              <div
                key={room.name}
                className={`room-tier-card ${roomType === room.name ? 'active' : ''}`}
                onClick={() => handleRoomSelect(room.name, room.add)}
              >
                <div className="room-head">
                  <strong>{room.name}</strong>
                  <span className="room-add-price">{room.add > 0 ? `+₹${room.add.toLocaleString()}` : 'Included'}</span>
                </div>
                <p>{room.desc}</p>
                <div className="room-badge">
                  {roomType === room.name ? '✓ Selected Room' : 'Select'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. EXPERIENCE TIME SLOTS */}
      {item.type === 'EXPERIENCE' && (
        <div className="exp-slot-box">
          <div className="seatmap-header">
            <h4><i className="fa-solid fa-clock"></i> Choose Your Experience Slot</h4>
            <p>Pick a comfortable time batch for your certified guided tour</p>
          </div>

          <div className="slots-grid">
            {[
              { slot: '06:30 AM (Sunrise Magic Batch)', spots: '3 spots left', icon: 'fa-sun' },
              { slot: '09:00 AM (Morning Glow Batch)', spots: '8 spots left', icon: 'fa-cloud-sun' },
              { slot: '02:30 PM (Afternoon Adventure)', spots: '5 spots left', icon: 'fa-compass' },
              { slot: '05:00 PM (Golden Sunset Special)', spots: '2 spots left (Fast filling)', icon: 'fa-mountain-sun' }
            ].map((s) => (
              <div
                key={s.slot}
                className={`slot-card ${timeSlot === s.slot ? 'active' : ''}`}
                onClick={() => handleSlotSelect(s.slot)}
              >
                <i className={`fa-solid ${s.icon}`}></i>
                <div className="slot-details">
                  <strong>{s.slot}</strong>
                  <span className="spots-tag">{s.spots}</span>
                </div>
                <span className="slot-check">{timeSlot === s.slot ? '✓' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
