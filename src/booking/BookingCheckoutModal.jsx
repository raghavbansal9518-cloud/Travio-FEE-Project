import React, { useState } from 'react';
import SeatSelection from './SeatSelection';
import PassengerForm from './PassengerForm';
import PaymentGateway from './PaymentGateway';
import BankOtpModal from './BankOtpModal';

export default function BookingCheckoutModal({ item, onClose, onBookingComplete, initialTicket }) {
  // Stepper state: 'SEAT' | 'PASSENGER' | 'PAYMENT' | 'TICKET'
  const [currentStep, setCurrentStep] = useState(initialTicket ? 'TICKET' : 'SEAT');

  // Step 1: Seat & Customization State
  const [seatDetails, setSeatDetails] = useState({
    seat: '12A',
    seatPrice: 0,
    summary: 'Seat 12A (Standard Free)'
  });

  // Step 2: Passenger Form State & Validation
  const [formData, setFormData] = useState({
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9876543210',
    age: '26',
    gender: 'Male',
    hasInsurance: true,
    hasCarbonOffset: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [appliedPromo, setAppliedPromo] = useState('TRAVIO500');
  const [promoDiscount, setPromoDiscount] = useState(500);

  // Step 3: Payment State
  const [pendingPayment, setPendingPayment] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Step 4: Final Confirmed Ticket Data
  const [confirmedTicket, setConfirmedTicket] = useState(initialTicket || null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Validate Passenger Form before advancing to Payment
  const validatePassengerStep = () => {
    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errors.fullName = 'Full name must be at least 3 characters';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    if (!formData.age || parseInt(formData.age, 10) < 1) {
      errors.age = 'Valid age is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 'SEAT') {
      setCurrentStep('PASSENGER');
    } else if (currentStep === 'PASSENGER') {
      if (validatePassengerStep()) {
        setCurrentStep('PAYMENT');
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'PAYMENT') {
      setCurrentStep('PASSENGER');
    } else if (currentStep === 'PASSENGER') {
      setCurrentStep('SEAT');
    }
  };

  // Triggered from PaymentGateway
  const handleInitiatePayment = (paymentData) => {
    setPendingPayment(paymentData);
    setShowOtpModal(true);
  };

  // Triggered when Bank 3D OTP is verified successfully
  const handleOtpSuccess = () => {
    setShowOtpModal(false);

    const generatedPnr = `TRV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: `booking-${Date.now()}`,
      pnr: generatedPnr,
      type: item.type,
      title: item.title,
      from: item.from,
      to: item.to,
      date: item.date,
      time: item.time || '10:30 AM',
      passenger: formData,
      seatSummary: seatDetails.summary,
      amountPaid: pendingPayment?.amountPaid || pendingPayment?.grandTotal || 4500,
      paymentMethod: pendingPayment?.details || 'Online Gateway',
      status: 'CONFIRMED',
      bookingDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setConfirmedTicket(newBooking);
    setCurrentStep('TICKET');

    // Notify parent to save in localStorage / state
    if (onBookingComplete) {
      onBookingComplete(newBooking);
    }
  };

  // Download simulation
  const handleDownloadTicket = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="booking-modal-backdrop" onClick={onClose}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div className="modal-header-bar">
          <div className="modal-brand-badge">
            <span className="material-symbols-rounded">rocket_launch</span>
            <span>TRAVIO FAST-TRACK CHECKOUT & RESERVATION</span>
          </div>

          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {/* Multi-Step Funnel Stepper (Except when viewing already confirmed ticket) */}
        {currentStep !== 'TICKET' && (
          <div className="checkout-stepper-bar">
            {[
              { id: 'SEAT', num: 1, label: 'Seat & Options', icon: 'fa-couch' },
              { id: 'PASSENGER', num: 2, label: 'Guest Details', icon: 'fa-user' },
              { id: 'PAYMENT', num: 3, label: 'Payment Gateway', icon: 'fa-credit-card' },
              { id: 'TICKET', num: 4, label: 'Confirmed Ticket', icon: 'fa-ticket' }
            ].map((step, idx) => {
              const isPast = (step.id === 'SEAT' && (currentStep === 'PASSENGER' || currentStep === 'PAYMENT')) ||
                             (step.id === 'PASSENGER' && currentStep === 'PAYMENT');
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className={`step-node ${isCurrent ? 'active' : ''} ${isPast ? 'completed' : ''}`}>
                  <div className="step-circle">
                    {isPast ? <i className="fa-solid fa-check"></i> : step.num}
                  </div>
                  <div className="step-label-group">
                    <span className="step-num-text">Step 0{step.num}</span>
                    <strong className="step-title-text">{step.label}</strong>
                  </div>
                  {idx < 3 && <div className="step-connector-line" />}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 1: SEAT SELECTION & CUSTOMIZATION */}
        {currentStep === 'SEAT' && (
          <div className="checkout-step-pane">
            <SeatSelection
              item={item}
              onSelectionChange={(details) => setSeatDetails(details)}
              selectedDetails={seatDetails}
            />

            <div className="checkout-nav-footer">
              <button type="button" className="btn-glass" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>
                <span>Next: Passenger Details</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PASSENGER & GUEST DETAILS */}
        {currentStep === 'PASSENGER' && (
          <div className="checkout-step-pane">
            <PassengerForm
              formData={formData}
              setFormData={setFormData}
              errors={formErrors}
              setErrors={setFormErrors}
              appliedPromo={appliedPromo}
              setAppliedPromo={setAppliedPromo}
              promoDiscount={promoDiscount}
              setPromoDiscount={setPromoDiscount}
            />

            <div className="checkout-nav-footer">
              <button type="button" className="btn-glass" onClick={handlePrevStep}>
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back to Seat Selection</span>
              </button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>
                <span>Proceed to Payment Gateway</span>
                <i className="fa-solid fa-lock"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROPER PAYMENT GATEWAY */}
        {currentStep === 'PAYMENT' && (
          <div className="checkout-step-pane">
            <PaymentGateway
              item={item}
              passengerData={formData}
              seatSelection={seatDetails}
              promoDiscount={promoDiscount}
              appliedPromo={appliedPromo}
              onInitiatePayment={handleInitiatePayment}
            />

            <div className="checkout-nav-footer" style={{ marginTop: '20px' }}>
              <button type="button" className="btn-glass" onClick={handlePrevStep}>
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back to Passenger Details</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 / FINAL: OFFICIAL CONFIRMED E-TICKET (Boarding Pass) */}
        {currentStep === 'TICKET' && confirmedTicket && (
          <div className="checkout-step-pane confirmed-ticket-pane">
            {/* Success Celebration Banner */}
            {!initialTicket && (
              <div className="ticket-success-celebration">
                <div className="success-badge-circle">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h3>Reservation Confirmed! Safe Travels!</h3>
                <p>Your payment of <strong>₹{confirmedTicket.amountPaid?.toLocaleString()}</strong> was authorized. E-ticket has been issued with confirmed seats.</p>
              </div>
            )}

            {/* Official Boarding Pass Ticket Card */}
            <div className="official-e-ticket" id="travio-printable-ticket">
              <div className="ticket-cut-notch left" />
              <div className="ticket-cut-notch right" />

              <div className="ticket-head">
                <div className="th-left">
                  <span className="th-brand">
                    <span className="material-symbols-rounded">flight_takeoff</span>
                    <span>TRAVIO FAST-PASS</span>
                  </span>
                  <span className="th-type-pill">{confirmedTicket.type}</span>
                </div>
                <div className="th-right">
                  <span className="pnr-label">OFFICIAL PNR / BOOKING REF</span>
                  <strong className="pnr-code">{confirmedTicket.pnr}</strong>
                </div>
              </div>

              <div className="ticket-body">
                <h3 className="tb-title">{confirmedTicket.title}</h3>

                <div className="tb-route-display">
                  <div className="route-endpoint">
                    <span className="ep-lbl">ORIGIN / FROM</span>
                    <strong className="ep-val">{confirmedTicket.from}</strong>
                  </div>

                  <div className="route-arrow-flow">
                    <span className="flow-dash" />
                    <span className="material-symbols-rounded flow-icon">
                      {confirmedTicket.type === 'FLIGHT' ? 'flight' : confirmedTicket.type === 'TRAIN' ? 'train' : confirmedTicket.type === 'BUS' ? 'directions_bus' : confirmedTicket.type === 'CAB' ? 'local_taxi' : 'apartment'}
                    </span>
                    <span className="flow-dash" />
                  </div>

                  <div className="route-endpoint right">
                    <span className="ep-lbl">DESTINATION / TO</span>
                    <strong className="ep-val">{confirmedTicket.to}</strong>
                  </div>
                </div>

                <div className="tb-specs-grid">
                  <div className="spec-block">
                    <span className="sp-lbl">PASSENGER NAME</span>
                    <strong className="sp-val">{confirmedTicket.passenger?.fullName || 'Aarav Sharma'}</strong>
                  </div>
                  <div className="spec-block">
                    <span className="sp-lbl">SEAT / BERTH</span>
                    <strong className="sp-val">{confirmedTicket.seatSummary}</strong>
                  </div>
                  <div className="spec-block">
                    <span className="sp-lbl">TRAVEL DATE</span>
                    <strong className="sp-val">{confirmedTicket.date}</strong>
                  </div>
                  <div className="spec-block">
                    <span className="sp-lbl">SCHEDULED TIME</span>
                    <strong className="sp-val">{confirmedTicket.time}</strong>
                  </div>
                  <div className="spec-block">
                    <span className="sp-lbl">GATE / PLATFORM</span>
                    <strong className="sp-val">T3 • Gate 14B</strong>
                  </div>
                  <div className="spec-block">
                    <span className="sp-lbl">PAYMENT STATUS</span>
                    <strong className="sp-val text-success">PAID (₹{confirmedTicket.amountPaid?.toLocaleString()})</strong>
                  </div>
                </div>

                {/* Barcode & Security Stamp */}
                <div className="ticket-barcode-footer">
                  <div className="barcode-bars-graphic">
                    <div className="simulated-barcode" />
                    <span className="barcode-number">*{confirmedTicket.pnr}-TRAVIO-2026*</span>
                  </div>

                  <div className="qr-mini-stamp">
                    <i className="fa-solid fa-qrcode"></i>
                    <span>FAST BOARDING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Action Buttons */}
            <div className="ticket-actions-row">
              <button type="button" className="btn-glass" onClick={handlePrintTicket}>
                <i className="fa-solid fa-print"></i>
                <span>Print Ticket</span>
              </button>

              <button type="button" className="btn-primary" onClick={handleDownloadTicket}>
                <i className="fa-solid fa-file-arrow-down"></i>
                <span>{downloadSuccess ? 'E-Ticket Downloaded!' : 'Download PDF Voucher'}</span>
              </button>

              <button type="button" className="btn-glass" onClick={onClose}>
                <i className="fa-solid fa-house"></i>
                <span>Back to Bookings</span>
              </button>
            </div>
          </div>
        )}

        {/* Bank 3D OTP Authentication Modal Simulation */}
        {showOtpModal && (
          <BankOtpModal
            paymentDetails={pendingPayment}
            onSuccess={handleOtpSuccess}
            onCancel={() => setShowOtpModal(false)}
          />
        )}
      </div>
    </div>
  );
}
