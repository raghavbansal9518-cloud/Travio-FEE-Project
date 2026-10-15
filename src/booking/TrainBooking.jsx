import React, { useState } from 'react';
import { TRAINS_DATA } from './bookingData';

const TRAIN_STATIONS = [
  { city: 'New Delhi', code: 'NDLS', name: 'New Delhi Railway Station' },
  { city: 'Kanpur', code: 'CNB', name: 'Kanpur Central Railway Station' },
  { city: 'Mumbai Central', code: 'MMCT', name: 'Mumbai Central Terminal' },
  { city: 'Howrah', code: 'HWH', name: 'Howrah Junction Kolkata' },
  { city: 'Bengaluru', code: 'SBC', name: 'KSR Bengaluru City Junction' },
  { city: 'Varanasi', code: 'BSB', name: 'Varanasi Junction' },
  { city: 'Lucknow', code: 'LKO', name: 'Lucknow Charbagh Junction' },
];

export default function TrainBooking({ onSelectBookingItem }) {
  const [trainMode, setTrainMode] = useState('book'); // 'book', 'pnr', 'live'
  
  // Booking fields
  const [fromStation, setFromStation] = useState(TRAIN_STATIONS[0]); // NDLS
  const [toStation, setToStation] = useState(TRAIN_STATIONS[1]); // CNB
  const [travelDate, setTravelDate] = useState('2026-09-04');
  const [trainClass, setTrainClass] = useState('All Classes');
  const [isSwapping, setIsSwapping] = useState(false);
  
  // PNR state
  const [pnrInput, setPnrInput] = useState('2849104829');
  const [pnrResult, setPnrResult] = useState(null);

  // Live status state
  const [trainNoInput, setTrainNoInput] = useState('22436');
  const [liveResult, setLiveResult] = useState(null);

  // Search results
  const [searchResults, setSearchResults] = useState(TRAINS_DATA);
  const [isSearching, setIsSearching] = useState(false);

  const handleSwapStations = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = fromStation;
      setFromStation(toStation);
      setToStation(temp);
      setIsSwapping(false);
    }, 200);
  };

  const handleSearchTrains = (e) => {
    e?.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults(TRAINS_DATA);
      setIsSearching(false);
    }, 350);
  };

  const handleCheckPNR = (e) => {
    e.preventDefault();
    setPnrResult({
      pnr: pnrInput || '2849104829',
      train: '22436 Vande Bharat Express',
      from: 'NDLS (New Delhi)',
      to: 'CNB (Kanpur Central)',
      date: '04 Sep 2026',
      passenger: 'Passenger 1: ADULT (M, 32)',
      bookingStatus: 'CONFIRMED',
      coach: 'C-3',
      berth: '36 (Window Seat)',
      chartStatus: 'Chart Not Prepared (Current Status Confirmed)',
    });
  };

  const handleCheckLiveStatus = (e) => {
    e.preventDefault();
    setLiveResult({
      train: '22436 - Vande Bharat Express',
      status: 'Running On Time (0 min late)',
      currentStation: 'Passing Aligarh Junction (125 km/h)',
      nextStation: 'Kanpur Central (Arrival: 10:08 AM)',
      delay: '0 min',
      platform: 'Platform #1 at NDLS',
    });
  };

  return (
    <div className="booking-engine-card">
      {/* Train Mode Switcher: Book / PNR / Live */}
      <div className="train-sub-header">
        <div className="train-mode-pill-group">
          <button
            type="button"
            className={`trip-type-pill ${trainMode === 'book' ? 'active' : ''}`}
            onClick={() => setTrainMode('book')}
          >
            <span className="material-symbols-rounded">train</span>
            <span>Book Train Tickets</span>
          </button>
          <button
            type="button"
            className={`trip-type-pill ${trainMode === 'pnr' ? 'active' : ''}`}
            onClick={() => setTrainMode('pnr')}
          >
            <span className="material-symbols-rounded">confirmation_number</span>
            <span>Check PNR Status</span>
          </button>
          <button
            type="button"
            className={`trip-type-pill ${trainMode === 'live' ? 'active' : ''}`}
            onClick={() => setTrainMode('live')}
          >
            <span className="material-symbols-rounded">my_location</span>
            <span>Live Train Status</span>
          </button>
        </div>
      </div>

      {/* MODE 1: BOOK TRAIN TICKETS */}
      {trainMode === 'book' && (
        <>
          <form onSubmit={handleSearchTrains} className="booking-unified-form">
            <div className="train-fields-grid">
              {/* FROM Field */}
              <div className="flight-field-block">
                <span className="field-subhead">FROM</span>
                <div className="field-city-row">
                  <span className="field-city-name">{fromStation.city}</span>
                  <span className="field-code-badge">{fromStation.code}</span>
                </div>
                <span className="field-airport-desc" title={fromStation.name}>
                  {fromStation.name}
                </span>
                <select 
                  className="hidden-native-select"
                  value={fromStation.code}
                  onChange={(e) => {
                    const s = TRAIN_STATIONS.find(x => x.code === e.target.value);
                    if (s) setFromStation(s);
                  }}
                >
                  {TRAIN_STATIONS.map(s => (
                    <option key={`tr-from-${s.code}`} value={s.code}>{s.city} ({s.code}) - {s.name}</option>
                  ))}
                </select>
              </div>

              {/* SWAP BUTTON */}
              <div className="swap-btn-container">
                <button
                  type="button"
                  className={`swap-btn ${isSwapping ? 'rotating' : ''}`}
                  onClick={handleSwapStations}
                  title="Swap Train Stations"
                  aria-label="Swap Stations"
                >
                  <span className="material-symbols-rounded">swap_horiz</span>
                </button>
              </div>

              {/* TO Field */}
              <div className="flight-field-block">
                <span className="field-subhead">TO</span>
                <div className="field-city-row">
                  <span className="field-city-name">{toStation.city}</span>
                  <span className="field-code-badge">{toStation.code}</span>
                </div>
                <span className="field-airport-desc" title={toStation.name}>
                  {toStation.name}
                </span>
                <select 
                  className="hidden-native-select"
                  value={toStation.code}
                  onChange={(e) => {
                    const s = TRAIN_STATIONS.find(x => x.code === e.target.value);
                    if (s) setToStation(s);
                  }}
                >
                  {TRAIN_STATIONS.map(s => (
                    <option key={`tr-to-${s.code}`} value={s.code}>{s.city} ({s.code}) - {s.name}</option>
                  ))}
                </select>
              </div>

              {/* TRAVEL DATE */}
              <div className="flight-field-block date-field-block">
                <span className="field-subhead">TRAVEL DATE</span>
                <div className="date-box single-date-box">
                  <span className="date-label-tiny">DEPARTURE</span>
                  <input
                    type="date"
                    className="glass-date-input"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
              </div>

              {/* CLASS DROPDOWN */}
              <div className="flight-field-block class-field-block">
                <span className="field-subhead">CLASS</span>
                <div className="dropdown-field-wrapper" style={{ marginTop: '6px' }}>
                  <select
                    className="glass-select full-width"
                    value={trainClass}
                    onChange={(e) => setTrainClass(e.target.value)}
                  >
                    <option value="All Classes">All Classes</option>
                    <option value="EC">Executive Chair Car (EC)</option>
                    <option value="CC">AC Chair Car (CC)</option>
                    <option value="1A">AC 1st Class (1A)</option>
                    <option value="2A">AC 2 Tier (2A)</option>
                    <option value="3A">AC 3 Tier (3A)</option>
                    <option value="SL">Sleeper (SL)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dedicated Next-Line Action Row */}
            <div className="booking-action-next-row">
              <div className="form-perks-info">
                <span className="material-symbols-rounded">verified</span>
                <span>Direct IRCTC Gateway Sync • Live Seat Confirmation Guarantee</span>
              </div>

              <div className="flight-submit-container">
                <button
                  type="submit"
                  className="btn-glowing-cyan search-main-action-btn"
                  disabled={isSearching}
                >
                  <span className="material-symbols-rounded">
                    {isSearching ? 'sync' : 'search'}
                  </span>
                  <span>{isSearching ? 'Checking Trains...' : 'SEARCH TRAINS'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* TRAIN SEARCH RESULTS */}
          <div className="flight-results-container">
            <div className="results-header-bar">
              <div className="results-badge-info">
                <span className="material-symbols-rounded">directions_railway</span>
                <span>
                  Trains between <strong>{fromStation.city}</strong> and <strong>{toStation.city}</strong> ({searchResults.length} Trains)
                </span>
              </div>
              <span className="results-date-tag">Date: {travelDate}</span>
            </div>

            <div className="train-cards-list">
              {searchResults.map((train) => (
                <div key={train.id} className="train-item-card">
                  <div className="train-top-row">
                    <div className="train-title-block">
                      <div className="train-icon-badge">
                        <span className="material-symbols-rounded">train</span>
                      </div>
                      <div>
                        <h4 className="train-name">{train.trainName}</h4>
                        <span className="train-meta">#{train.trainNumber} • {train.speed} • Runs {train.days}</span>
                      </div>
                    </div>
                    <div className="train-rating-badge">
                      <span className="material-symbols-rounded">star</span>
                      <span>{train.rating}</span>
                    </div>
                  </div>

                  <div className="train-schedule-row">
                    <div className="time-point">
                      <span className="time-val">{train.departureTime}</span>
                      <span className="airport-code-sub">{train.departureStation} ({train.departureCode})</span>
                    </div>

                    <div className="train-track-graphic">
                      <span className="track-duration">{train.duration}</span>
                      <div className="neon-track-line">
                        <span className="track-dot start" />
                        <span className="track-rail" />
                        <span className="track-pulse" />
                        <span className="track-dot end" />
                      </div>
                    </div>

                    <div className="time-point">
                      <span className="time-val">{train.arrivalTime}</span>
                      <span className="airport-code-sub">{train.arrivalStation} ({train.arrivalCode})</span>
                    </div>
                  </div>

                  {/* Seat Class Options */}
                  <div className="train-classes-grid">
                    {train.classes.map((cls) => (
                      <div key={cls.type} className="train-class-card">
                        <div className="class-header">
                          <span className="class-code">{cls.type}</span>
                          <span className="class-name">{cls.name}</span>
                        </div>
                        <div className="class-status-badge">
                          <span className="status-dot green" />
                          <span>{cls.status}</span>
                        </div>
                        <div className="class-footer">
                          <span className="class-price">₹{cls.price}</span>
                          <button
                            type="button"
                            className="btn-train-book"
                            onClick={() => onSelectBookingItem({
                              type: 'TRAIN',
                              title: `${train.trainName} (#${train.trainNumber})`,
                              from: `${train.departureStation} (${train.departureCode})`,
                              to: `${train.arrivalStation} (${train.arrivalCode})`,
                              date: travelDate,
                              time: `${train.departureTime} - ${train.arrivalTime}`,
                              price: cls.price,
                              seats: `Class: ${cls.type} (${cls.name})`,
                              extra: `Availability: ${cls.status}`,
                              bookingRef: `TRV-TR-${Math.floor(100000 + Math.random() * 900000)}`,
                            })}
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* MODE 2: CHECK PNR STATUS */}
      {trainMode === 'pnr' && (
        <div className="pnr-lookup-panel">
          <form onSubmit={handleCheckPNR} className="pnr-input-row">
            <div className="pnr-input-wrapper">
              <span className="material-symbols-rounded">pin</span>
              <input
                type="text"
                maxLength="10"
                placeholder="Enter 10-digit PNR Number"
                value={pnrInput}
                onChange={(e) => setPnrInput(e.target.value)}
                className="glass-pnr-input"
              />
            </div>
            <button type="submit" className="btn-glowing-cyan">
              <span>GET PNR STATUS</span>
            </button>
          </form>

          {pnrResult && (
            <div className="pnr-result-card">
              <div className="pnr-result-header">
                <span className="pnr-num">PNR: {pnrResult.pnr}</span>
                <span className="pnr-status-confirmed">● {pnrResult.bookingStatus}</span>
              </div>
              <div className="pnr-info-grid">
                <div>
                  <span className="pnr-label">Train</span>
                  <strong className="pnr-val">{pnrResult.train}</strong>
                </div>
                <div>
                  <span className="pnr-label">Route</span>
                  <strong className="pnr-val">{pnrResult.from} → {pnrResult.to}</strong>
                </div>
                <div>
                  <span className="pnr-label">Date of Journey</span>
                  <strong className="pnr-val">{pnrResult.date}</strong>
                </div>
                <div>
                  <span className="pnr-label">Seat Allocation</span>
                  <strong className="pnr-val" style={{ color: '#38bdf8' }}>Coach {pnrResult.coach}, Berth {pnrResult.berth}</strong>
                </div>
              </div>
              <div className="pnr-chart-note">
                <span className="material-symbols-rounded">info</span>
                <span>{pnrResult.chartStatus}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: LIVE TRAIN STATUS */}
      {trainMode === 'live' && (
        <div className="pnr-lookup-panel">
          <form onSubmit={handleCheckLiveStatus} className="pnr-input-row">
            <div className="pnr-input-wrapper">
              <span className="material-symbols-rounded">radar</span>
              <input
                type="text"
                placeholder="Enter Train Number (e.g. 22436)"
                value={trainNoInput}
                onChange={(e) => setTrainNoInput(e.target.value)}
                className="glass-pnr-input"
              />
            </div>
            <button type="submit" className="btn-glowing-cyan">
              <span>TRACK LIVE</span>
            </button>
          </form>

          {liveResult && (
            <div className="pnr-result-card live-track-card">
              <div className="pnr-result-header">
                <span className="pnr-num">{liveResult.train}</span>
                <span className="pnr-status-confirmed" style={{ color: '#34d399' }}>● {liveResult.status}</span>
              </div>
              <div className="live-route-indicator">
                <div className="live-track-node passed">
                  <span className="node-dot" />
                  <span>NDLS (Departed 06:00 AM)</span>
                </div>
                <div className="live-track-node active">
                  <span className="node-dot ping" />
                  <span>{liveResult.currentStation}</span>
                </div>
                <div className="live-track-node upcoming">
                  <span className="node-dot" />
                  <span>{liveResult.nextStation}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
