import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function MyBookingsModal({ 
  bookings = [], 
  onClose, 
  onCancelBooking, 
  onUpdateBooking, 
  onViewTicket 
}) {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'CONFIRMED', 'CANCELLED'
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editForm, setEditForm] = useState({ phone: '', email: '' });
  const [cancellingBooking, setCancellingBooking] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'ALL') return true;
    return b.status === filterStatus;
  });

  // Aggregate Metrics & Total Bill Calculation
  const confirmedCount = (bookings || []).filter((b) => b && String(b.status || "").toLowerCase() === "confirmed").length;
  const totalInvestment = (bookings || []).filter((b) => b && String(b.status || "").toLowerCase() === "confirmed").reduce((sum, b) => sum + (Number(b?.totalCost) || Number(b?.amountPaid) || Number(b?.price) || 0), 0);
  const baseFareTotal = Math.round(totalInvestment / 1.18);
  const gstTotal = totalInvestment - baseFareTotal;

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
            <span>{t('phrases.TRAVIO RESERVATION MANAGER', 'TRAVIO RESERVATION MANAGER (CRUD)')}</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {/* Total Expense & Financial Breakdown Summary Bar */}
        <div style={{
          margin: '0 24px 16px 24px',
          padding: '14px 20px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399',
              fontSize: '20px'
            }}>
              <i className="fa-solid fa-file-invoice-dollar"></i>
            </div>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#94a3b8', fontWeight: 700 }}>
                {t('phrases.Total Expense Summary', 'Total Expense & Invoice Summary')}
              </span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '2px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '15px', color: '#ffffff', fontWeight: 800 }}>
                  {t('phrases.Total Bill', 'Total Bill')}: <strong style={{ color: '#38bdf8' }}>₹{totalInvestment.toLocaleString('en-IN')}</strong>
                </span>
                <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
                  {t('phrases.Base Fares', 'Base Fares')}: <strong>₹{baseFareTotal.toLocaleString('en-IN')}</strong>
                </span>
                <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
                  GST (18%): <strong style={{ color: '#10b981' }}>₹{gstTotal.toLocaleString('en-IN')}</strong>
                </span>
              </div>
            </div>
          </div>
          <div style={{
            fontSize: '11.5px',
            color: '#34d399',
            background: 'rgba(16, 185, 129, 0.12)',
            padding: '5px 12px',
            borderRadius: '999px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <i className="fa-solid fa-circle-check"></i>
            <span>{confirmedCount} {confirmedCount === 1 ? t('phrases.Confirmed Trip', 'Confirmed Trip') : t('phrases.Confirmed Trips', 'Confirmed Trips')}</span>
          </div>
        </div>

        {/* Filter Badges Bar */}
        <div className="bookings-filter-bar">
          <div className="filter-chips">
            {[
              { id: 'ALL', label: `${t('phrases.All Bookings', 'All Bookings')} (${bookings.length})` },
              { id: 'CONFIRMED', label: t('phrases.Confirmed', 'Confirmed') },
              { id: 'CANCELLED', label: t('phrases.Cancelled', 'Cancelled') }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                className={`filter-chip ${filterStatus === st.id ? 'active' : ''}`}
                onClick={() => setFilterStatus(st.id)}
              >
                {st.label}
              </button>
            ))}
          </div>

          <span className="bookings-count-label">
            {t('phrases.Showing', 'Showing')} {filteredBookings.length} {t('phrases.of', 'of')} {bookings.length} {t('phrases.reservations', 'reservations')}
          </span>
        </div>

        {/* Bookings List */}
        <div className="bookings-scroll-list">
          {filteredBookings.length === 0 ? (
            <div className="no-bookings-placeholder">
              <i className="fa-solid fa-plane-slash"></i>
              <h4>{t('phrases.No reservations found', 'No reservations found')}</h4>
              <p>{t('phrases.Explore flights, trains, hotels, and activities to make your next reservation!', 'Explore flights, trains, hotels, and activities to make your next reservation!')}</p>
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
                          <><i className="fa-solid fa-circle-check"></i> {t('phrases.Confirmed', 'Confirmed')}</>
                        ) : (
                          <><i className="fa-solid fa-ban"></i> {t('phrases.Cancelled & Refunded', 'Cancelled & Refunded')}</>
                        )}
                      </span>
                      <span className="mb-pnr">PNR: <strong>{b.pnr}</strong></span>
                    </div>
                  </div>

                  <div className="mb-route-grid">
                    <div className="mb-cell">
                      <span className="cell-label">{t('phrases.FROM', 'FROM')}</span>
                      <strong>{b.from}</strong>
                    </div>
                    <div className="mb-cell">
                      <span className="cell-label">{t('phrases.TO', 'TO')}</span>
                      <strong>{b.to}</strong>
                    </div>
                    <div className="mb-cell">
                      <span className="cell-label">{t('phrases.TRAVEL DATE', 'TRAVEL DATE')}</span>
                      <strong>{b.date}</strong>
                    </div>
                    <div className="mb-cell">
                      <span className="cell-label">{t('phrases.SEAT / OPTION', 'SEAT / OPTION')}</span>
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
                        <span className="paid-amount-tag">{t('phrases.Paid', 'Paid')}: ₹{b.amountPaid?.toLocaleString()}</span>
                      </div>
                    ) : (
                      <div className="inline-edit-fields">
                        <input
                          type="text"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder={t('phrases.Update Mobile', 'Update Mobile')}
                          className="form-control-glass edit-mini-input"
                        />
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          placeholder={t('phrases.Update Email', 'Update Email')}
                          className="form-control-glass edit-mini-input"
                        />
                        <button type="button" className="btn-save-mini" onClick={() => handleSaveEdit(b.id)}>
                          {t('phrases.Save Details', 'Save Details')}
                        </button>
                        <button type="button" className="btn-cancel-mini" onClick={() => setEditingBookingId(null)}>
                          {t('phrases.Cancel', 'Cancel')}
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
                        <i className="fa-solid fa-ticket"></i> {t('phrases.E-Ticket', 'E-Ticket')}
                      </button>

                      {!isCancelled && !isEditing && (
                        <>
                          <button
                            type="button"
                            className="btn-action-glass"
                            onClick={() => handleStartEdit(b)}
                            title="Update contact details"
                          >
                            <i className="fa-solid fa-pen-to-square"></i> {t('phrases.Edit', 'Edit')}
                          </button>

                          <button
                            type="button"
                            className="btn-action-danger"
                            onClick={() => setCancellingBooking(b)}
                            title="Cancel booking and calculate refund"
                          >
                            <i className="fa-solid fa-xmark"></i> {t('phrases.Cancel Trip', 'Cancel Trip')}
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
              <h4>{t('phrases.Cancel Reservation', 'Cancel Reservation')} {cancellingBooking.pnr}?</h4>
              <p>{t('phrases.Are you sure you want to cancel your trip', 'Are you sure you want to cancel your trip')} {t('phrases.from', 'from')} <strong>{cancellingBooking.from}</strong> {t('phrases.to', 'to')} <strong>{cancellingBooking.to}</strong>?</p>

              <div className="refund-calculation-box">
                <div className="refund-row">
                  <span>{t('phrases.Total Amount Paid', 'Total Amount Paid')}</span>
                  <strong>₹{cancellingBooking.amountPaid?.toLocaleString()}</strong>
                </div>
                <div className="refund-row">
                  <span>{t('phrases.Standard Cancellation Fee', 'Standard Cancellation Fee')}</span>
                  <span className="fee-text">-₹300</span>
                </div>
                <div className="refund-divider" />
                <div className="refund-row total-refund">
                  <span>{t('phrases.Refundable to Source Payment', 'Refundable to Source Payment')}</span>
                  <strong className="refund-val">₹{Math.max(0, cancellingBooking.amountPaid - 300)?.toLocaleString()}</strong>
                </div>
              </div>

              <div className="cancel-actions-footer">
                <button
                  type="button"
                  className="btn-glass"
                  onClick={() => setCancellingBooking(null)}
                >
                  {t('phrases.Keep Reservation', 'Keep Reservation')}
                </button>
                <button
                  type="button"
                  className="btn-danger-confirm"
                  onClick={handleConfirmCancel}
                >
                  {t('phrases.Confirm Cancellation & Refund', 'Confirm Cancellation & Refund')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
