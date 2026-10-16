import React, { useState } from 'react';

export default function MyBookingsModal({ 
  bookings, 
  onClose, 
  onCancelBooking, 
  onUpdateBooking, 
  onViewTicket 
}) {
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'CONFIRMED', 'CANCELLED'
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editForm, setEditForm] = useState({ phone: '', email: '' });
  const [cancellingBooking, setCancellingBooking] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'ALL') return true;
    return b.status === filterStatus;
  });

  const handleStartEdit = (b) => {
    setEditingBookingId(b.id);
    setEditForm({ phone: b.passenger?.phone || '', email: b.passenger?.email || '' });
  };

  const handleSaveEdit = (id) => {
    onUpdateBooking(id, editForm);
    setEditingBookingId(null);
  };

  const handleConfirmCancel = () => {
    if (cancellingBooking) {
      onCancelBooking(cancellingBooking.id);
      setCancellingBooking(null);
    }
  };

  return (
    <div className="booking-modal-backdrop" onClick={onClose}>
      <div className="my-bookings-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="modal-header-bar">
          <div className="modal-brand-badge">
            <span className="material-symbols-rounded">luggage</span>
            <span>TRAVIO RESERVATION MANAGER (CRUD)</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {/* Filter Badges Bar */}
        <div className="bookings-filter-bar">
          <div className="filter-chips">
            {['ALL', 'CONFIRMED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                type="button"
                className={`filter-chip ${filterStatus === st ? 'active' : ''}`}
                onClick={() => setFilterStatus(st)}
              >
                {st === 'ALL' ? `All Bookings (${bookings.length})` : st}
              </button>
            ))}
          </div>

          <span className="bookings-count-label">
            Showing {filteredBookings.length} of {bookings.length} reservations
          </span>
        </div>

        {/* Bookings List */}
        <div className="bookings-scroll-list">
          {filteredBookings.length === 0 ? (
            <div className="no-bookings-placeholder">
              <i className="fa-solid fa-plane-slash"></i>
              <h4>No {filterStatus !== 'ALL' ? filterStatus.toLowerCase() : ''} reservations found</h4>
              <p>Explore flights, trains, hotels, and activities to make your next reservation!</p>
            </div>
          ) : (
            filteredBookings.map((b) => {
              const isEditing = editingBookingId === b.id;
              const isCancelled = b.status === 'CANCELLED';

              return (
                <div key={b.id} className={`my-booking-card ${isCancelled ? 'card-cancelled' : ''}`}>
                  <div className="mb-header-row">
                    <div className="mb-type-badge">
                      <span className="mb-type">{b.type}</span>
                      <strong className="mb-title">{b.title}</strong>
                    </div>

                    <div className="mb-status-group">
                      <span className={`status-pill ${b.status.toLowerCase()}`}>
                        {b.status === 'CONFIRMED' ? (
                          <><i className="fa-solid fa-circle-check"></i> Confirmed</>
                        ) : (
                          <><i className="fa-solid fa-ban"></i> Cancelled & Refunded</>
                        )}
                      </span>
                      <span className="mb-pnr">PNR: <strong>{b.pnr}</strong></span>
                    </div>
                  </div>

                  <div className="mb-route-grid">
                    <div className="mb-cell">
                      <span className="cell-label">FROM</span>
                      <strong>{b.from}</strong>
                    </div>
                    <div className="mb-cell">
                      <span className="cell-label">TO</span>
                      <strong>{b.to}</strong>
                    </div>
                    <div className="mb-cell">
                      <span className="cell-label">TRAVEL DATE</span>
                      <strong>{b.date}</strong>
                    </div>
                    <div className="mb-cell">
                      <span className="cell-label">SEAT / OPTION</span>
                      <strong>{b.seatSummary || 'Standard'}</strong>
                    </div>
                  </div>

                  {/* Passenger Info & Inline Edit (UPDATE in CRUD) */}
                  <div className="mb-passenger-row">
                    {!isEditing ? (
                      <div className="passenger-summary">
                        <span><i className="fa-solid fa-user"></i> <strong>{b.passenger?.fullName || 'Aarav Sharma'}</strong></span>
                        <span><i className="fa-solid fa-envelope"></i> {b.passenger?.email || 'traveler@travio.com'}</span>
                        <span><i className="fa-solid fa-phone"></i> {b.passenger?.phone || '9876543210'}</span>
                        <span className="paid-amount-tag">Paid: ₹{b.amountPaid?.toLocaleString()}</span>
                      </div>
                    ) : (
                      <div className="inline-edit-fields">
                        <input
                          type="text"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="Update Mobile"
                          className="form-control-glass edit-mini-input"
                        />
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          placeholder="Update Email"
                          className="form-control-glass edit-mini-input"
                        />
                        <button type="button" className="btn-save-mini" onClick={() => handleSaveEdit(b.id)}>
                          Save Details
                        </button>
                        <button type="button" className="btn-cancel-mini" onClick={() => setEditingBookingId(null)}>
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* Actions Row */}
                    <div className="mb-actions-group">
                      <button
                        type="button"
                        className="btn-action-glass"
                        onClick={() => onViewTicket(b)}
                        title="View Full E-Ticket & Boarding Pass"
                      >
                        <i className="fa-solid fa-ticket"></i> E-Ticket
                      </button>

                      {!isCancelled && !isEditing && (
                        <>
                          <button
                            type="button"
                            className="btn-action-glass"
                            onClick={() => handleStartEdit(b)}
                            title="Update contact details"
                          >
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                          </button>

                          <button
                            type="button"
                            className="btn-action-danger"
                            onClick={() => setCancellingBooking(b)}
                            title="Cancel booking and calculate refund"
                          >
                            <i className="fa-solid fa-xmark"></i> Cancel Trip
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cancellation Confirmation Modal (DELETE in CRUD) */}
        {cancellingBooking && (
          <div className="cancel-confirm-overlay">
            <div className="cancel-confirm-card">
              <div className="cancel-icon-bubble">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h4>Cancel Reservation {cancellingBooking.pnr}?</h4>
              <p>Are you sure you want to cancel your trip from <strong>{cancellingBooking.from}</strong> to <strong>{cancellingBooking.to}</strong>?</p>

              <div className="refund-calculation-box">
                <div className="refund-row">
                  <span>Total Amount Paid</span>
                  <strong>₹{cancellingBooking.amountPaid?.toLocaleString()}</strong>
                </div>
                <div className="refund-row">
                  <span>Standard Cancellation Fee</span>
                  <span className="fee-text">-₹300</span>
                </div>
                <div className="refund-divider" />
                <div className="refund-row total-refund">
                  <span>Refundable to Source Payment</span>
                  <strong className="refund-val">₹{Math.max(0, cancellingBooking.amountPaid - 300)?.toLocaleString()}</strong>
                </div>
              </div>

              <div className="cancel-actions-footer">
                <button
                  type="button"
                  className="btn-glass"
                  onClick={() => setCancellingBooking(null)}
                >
                  Keep Reservation
                </button>
                <button
                  type="button"
                  className="btn-danger-confirm"
                  onClick={handleConfirmCancel}
                >
                  Confirm Cancellation & Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
