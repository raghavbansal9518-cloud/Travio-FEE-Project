import { useState } from 'react';

export default function BookingResultModal({ item, onClose }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!item) return null;

  const handleConfirmReservation = () => {
    setIsConfirmed(true);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="booking-modal-backdrop" onClick={onClose}>
      <div className="booking-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-bar">
          <div className="modal-brand-badge">
            <span className="material-symbols-rounded">flight_takeoff</span>
            <span>TRAVIO FAST-PASS RESERVATION</span>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {/* E-Ticket Preview Body */}
        <div className="e-ticket-preview">
          <div className="ticket-top-badge-row">
            <span className="ticket-type-pill">{item.type}</span>
            <span className="ticket-ref-number">REF: {item.bookingRef}</span>
          </div>

          <h3 className="ticket-title">{item.title}</h3>

          <div className="ticket-route-grid">
            <div className="route-cell">
              <span className="cell-label">DEPARTURE / ORIGIN</span>
              <strong className="cell-val">{item.from}</strong>
            </div>
            <div className="route-cell">
              <span className="cell-label">ARRIVAL / DESTINATION</span>
              <strong className="cell-val">{item.to}</strong>
            </div>
            <div className="route-cell">
              <span className="cell-label">DATE</span>
              <strong className="cell-val">{item.date}</strong>
            </div>
            <div className="route-cell">
              <span className="cell-label">TIME / DURATION</span>
              <strong className="cell-val">{item.time}</strong>
            </div>
          </div>

          <div className="ticket-sub-details">
            <div className="ticket-detail-item">
              <span className="material-symbols-rounded">badge</span>
              <span><strong>Guest:</strong> TRAVIO Explorer (Verified ID)</span>
            </div>
            <div className="ticket-detail-item">
              <span className="material-symbols-rounded">airline_seat_recline_extra</span>
              <span><strong>Allocation:</strong> {item.seats}</span>
            </div>
            {item.extra && (
              <div className="ticket-detail-item">
                <span className="material-symbols-rounded">info</span>
                <span>{item.extra}</span>
              </div>
            )}
          </div>

          {/* Dotted Perforation Line */}
          <div className="ticket-cut-line">
            <div className="cut-circle left" />
            <div className="cut-dots" />
            <div className="cut-circle right" />
          </div>

          {/* Pricing & Barcode Row */}
          <div className="ticket-pricing-row">
            <div className="ticket-fare-info">
              <span className="fare-label">TOTAL AMOUNT PAID</span>
              <div className="fare-amount">
                <span className="curr">₹</span>
                <span>{item.price ? item.price.toLocaleString('en-IN') : 'Free'}</span>
                <span className="inclusive-tag">(Inclusive of all GST & Fees)</span>
              </div>
            </div>

            {/* Visual Simulated QR / Barcode */}
            <div className="ticket-barcode-box">
              <div className="barcode-bars">
                {[4, 2, 6, 1, 5, 2, 7, 3, 2, 5, 1, 4, 6, 3, 2, 5, 7, 1, 4, 3, 6].map((h, i) => (
                  <span key={i} style={{ width: `${(i % 3) + 1}px`, height: '32px', background: '#38bdf8', opacity: 0.85 }} />
                ))}
              </div>
              <span className="barcode-text">{item.bookingRef}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="modal-actions-bar">
          {!isConfirmed ? (
            <>
              <button type="button" className="btn-glass" onClick={onClose}>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-glowing-cyan" 
                onClick={handleConfirmReservation}
              >
                <span className="material-symbols-rounded">check_circle</span>
                <span>Confirm & Generate E-Ticket</span>
              </button>
            </>
          ) : (
            <div className="confirmed-success-panel">
              <div className="confirmed-msg">
                <span className="material-symbols-rounded" style={{ color: '#34d399', fontSize: '24px' }}>verified</span>
                <span>Reservation Confirmed! E-Ticket sent to your registered email & phone.</span>
              </div>
              <div className="confirmed-btns-row">
                <button 
                  type="button" 
                  className="btn-glass"
                  onClick={handleDownload}
                >
                  <span className="material-symbols-rounded">download</span>
                  <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF Ticket'}</span>
                </button>
                <button type="button" className="btn-glowing-cyan" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
