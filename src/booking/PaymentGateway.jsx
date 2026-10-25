import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PaymentGateway({
  /* props */ 
  item, 
  passengerData, 
  seatSelection, 
  promoDiscount, 
  appliedPromo, 
  onInitiatePayment 
}) {
  const { t } = useLanguage();
  const [paymentMode, setPaymentMode] = useState('UPI'); // 'UPI', 'CARD', 'NETBANKING', 'WALLET'

  // UPI State
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('Google Pay');
  const [qrTimer, setQrTimer] = useState(300); // 5 minutes

  // Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(passengerData?.fullName || '');
  const [expiryMonth, setExpiryMonth] = useState('12');
  const [expiryYear, setExpiryYear] = useState('28');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Wallet State
  const [useMiles, setUseMiles] = useState(false);

  // Form errors
  const [paymentError, setPaymentError] = useState('');

  // 5-minute QR Countdown
  useEffect(() => {
    if (paymentMode !== 'UPI') return;
    const interval = setInterval(() => {
      setQrTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [paymentMode]);

  // Format QR Timer
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Card Formatting
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  // Determine Card Brand
  const getCardBrand = () => {
    const clean = cardNumber.replace(/\s/g, '');
    if (clean.startsWith('4')) return { name: 'VISA', icon: 'fa-cc-visa', color: '#1a1f71' };
    if (clean.startsWith('5')) return { name: 'Mastercard', icon: 'fa-cc-mastercard', color: '#eb001b' };
    if (clean.startsWith('6')) return { name: 'RuPay', icon: 'fa-credit-card', color: '#00833f' };
    if (clean.startsWith('3')) return { name: 'Amex', icon: 'fa-cc-amex', color: '#007bc1' };
    return { name: 'Card', icon: 'fa-credit-card', color: '#6A4CFF' };
  };

  // Calculate Final Price
  const parseCost = (val) => {
    if (typeof val === 'number') return val;
    if (!val) return 3000;
    const num = parseInt(val.toString().replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 3000 : num;
  };

  const baseFare = parseCost(item.totalCost || item.amountPaid || item.price || item.rate || item.budgetStarting);
  const seatAddon = seatSelection?.seatPrice || 0;
  const insuranceCost = passengerData?.hasInsurance ? 199 : 0;
  const carbonCost = passengerData?.hasCarbonOffset ? 49 : 0;
  const convenienceFee = 149;
  const milesDiscount = useMiles ? 800 : 0;
  const totalDiscount = (promoDiscount || 0) + milesDiscount;
  const grandTotal = Math.max(0, baseFare + seatAddon + insuranceCost + carbonCost + convenienceFee - totalDiscount);

  // Validate & Proceed to OTP
  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setPaymentError('');

    if (paymentMode === 'UPI') {
      if (selectedUpiApp === 'Custom UPI ID' && !/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiId.trim())) {
        setPaymentError('Please enter a valid UPI ID (e.g., username@bank)');
        return;
      }
    } else if (paymentMode === 'CARD') {
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (cleanNum.length < 16) {
        setPaymentError('Please enter a valid 16-digit card number');
        return;
      }
      if (!cardName.trim()) {
        setPaymentError('Please enter the cardholder name');
        return;
      }
      if (cvv.length < 3) {
        setPaymentError('Enter a valid 3-digit CVV');
        return;
      }
    }

    // Call checkout modal handler to trigger 3D Bank OTP simulation
    onInitiatePayment({
      method: paymentMode,
      details: paymentMode === 'CARD' 
        ? `Card ending in ${cardNumber.slice(-4) || '4242'}` 
        : paymentMode === 'UPI' 
          ? `UPI (${selectedUpiApp})` 
          : `${selectedBank} NetBanking`,
      amountPaid: grandTotal,
      grandTotal,
      baseFare,
      discount: totalDiscount
    });
  };

  const cardBrand = getCardBrand();

  return (
    <div className="payment-gateway-wrapper">
      <div className="gateway-main-col">
        {/* Payment Methods Nav Tabs */}
        <div className="payment-methods-tabs">
          {[
            { id: 'UPI', label: 'UPI / QR Code', icon: 'fa-qrcode', tag: 'Fastest' },
            { id: 'CARD', label: 'Credit / Debit Card', icon: 'fa-credit-card', tag: 'Instant' },
            { id: 'NETBANKING', label: 'Net Banking', icon: 'fa-building-columns' },
            { id: 'WALLET', label: 'Travio Miles & Wallets', icon: 'fa-wallet' }
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={`pay-mode-btn ${paymentMode === mode.id ? 'active' : ''}`}
              onClick={() => {
                setPaymentMode(mode.id);
                setPaymentError('');
              }}
            >
              <i className={`fa-solid ${mode.icon}`}></i>
              <div className="btn-text-block">
                <strong>{mode.label}</strong>
                {mode.tag && <span className="mini-mode-tag">{mode.tag}</span>}
              </div>
            </button>
          ))}
        </div>

        {/* 1. UPI TAB CONTENT */}
        {paymentMode === 'UPI' && (
          <div className="pay-method-pane upi-pane">
            <div className="upi-content-grid">
              {/* Dynamic QR Code Card */}
              <div className="qr-code-card">
                <div className="qr-header">
                  <span className="qr-timer-badge">
                    <i className="fa-regular fa-clock"></i> Expires in {formatTimer(qrTimer)}
                  </span>
                  <h4>Scan & Pay via any UPI App</h4>
                </div>

                <div className="qr-code-box">
                  {/* Generated SVG QR Visual */}
                  <svg className="dynamic-qr-svg" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#ffffff" rx="8" />
                    {/* Corners */}
                    <rect x="10" y="10" width="24" height="24" fill="#0b0f19" rx="3" />
                    <rect x="14" y="14" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="18" y="18" width="8" height="8" fill="#6A4CFF" />

                    <rect x="66" y="10" width="24" height="24" fill="#0b0f19" rx="3" />
                    <rect x="70" y="14" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="74" y="18" width="8" height="8" fill="#6A4CFF" />

                    <rect x="10" y="66" width="24" height="24" fill="#0b0f19" rx="3" />
                    <rect x="14" y="70" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="18" y="74" width="8" height="8" fill="#6A4CFF" />

                    {/* QR Code Dots */}
                    <circle cx="45" cy="20" r="3" fill="#0b0f19" />
                    <circle cx="55" cy="25" r="3" fill="#0b0f19" />
                    <circle cx="40" cy="45" r="3" fill="#0b0f19" />
                    <circle cx="50" cy="50" r="4" fill="#6A4CFF" />
                    <circle cx="60" cy="45" r="3" fill="#0b0f19" />
                    <circle cx="45" cy="70" r="3" fill="#0b0f19" />
                    <circle cx="55" cy="80" r="3" fill="#0b0f19" />
                    <circle cx="75" cy="55" r="3" fill="#0b0f19" />
                    <circle cx="85" cy="75" r="3" fill="#0b0f19" />
                  </svg>
                  <div className="qr-brand-pill">
                    <span>TRAVIO FASTPAY</span>
                  </div>
                </div>

                <p className="qr-subtext">Scan with Google Pay, PhonePe, Paytm, or CRED</p>

                <button
                  type="button"
                  className="btn-simulate-scan"
                  onClick={handleSubmitPayment}
                  title="Simulate scanning this QR code on a mobile device"
                >
                  <i className="fa-solid fa-mobile-screen-button"></i>
                  <span>Simulate Mobile QR Scan Approval</span>
                </button>
              </div>

              {/* UPI Apps & Direct UPI ID */}
              <div className="upi-apps-selector">
                <h5>Or select your UPI App directly</h5>
                <div className="upi-app-buttons-grid">
                  {[
                    { id: 'Google Pay', icon: 'fa-google-pay' },
                    { id: 'PhonePe', icon: 'fa-p' },
                    { id: 'Paytm UPI', icon: 'fa-money-bill-wave' },
                    { id: 'BHIM UPI', icon: 'fa-building-columns' },
                    { id: 'Custom UPI ID', icon: 'fa-at' }
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      className={`upi-app-card ${selectedUpiApp === app.id ? 'active' : ''}`}
                      onClick={() => setSelectedUpiApp(app.id)}
                    >
                      <i className={`fa-solid ${app.icon}`}></i>
                      <span>{app.id}</span>
                      {selectedUpiApp === app.id && <i className="fa-solid fa-circle-check app-check"></i>}
                    </button>
                  ))}
                </div>

                {selectedUpiApp === 'Custom UPI ID' && (
                  <div className="custom-upi-input-box">
                    <label>Enter Virtual Payment Address (VPA)</label>
                    <div className="upi-field-wrap">
                      <input
                        type="text"
                        placeholder="yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="form-control-glass"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. CARD TAB CONTENT */}
        {paymentMode === 'CARD' && (
          <div className="pay-method-pane card-pane">
            {/* Interactive 3D Virtual Card Display */}
            <div className="virtual-credit-card-preview">
              <div className="card-top-row">
                <span className="card-chip">
                  <i className="fa-solid fa-microchip"></i>
                </span>
                <span className="card-brand-logo">
                  <i className={`fa-brands ${cardBrand.icon}`}></i>
                  <span>{cardBrand.name}</span>
                </span>
              </div>

              <div className="card-number-display">
                {cardNumber || '•••• •••• •••• ••••'}
              </div>

              <div className="card-bottom-row">
                <div className="card-holder-col">
                  <span className="card-meta-lbl">CARDHOLDER</span>
                  <span className="card-meta-val">{cardName || 'AARAV SHARMA'}</span>
                </div>
                <div className="card-expiry-col">
                  <span className="card-meta-lbl">EXPIRES</span>
                  <span className="card-meta-val">{expiryMonth}/{expiryYear}</span>
                </div>
              </div>
            </div>

            {/* Card Inputs Form */}
            <div className="card-form-grid">
              <div className="reusable-form-group full-width">
                <label>Card Number</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4532 8920 1928 4242"
                    className="form-control-glass"
                    maxLength={19}
                  />
                  <span className="card-detected-icon">
                    <i className={`fa-brands ${cardBrand.icon}`}></i>
                  </span>
                </div>
              </div>

              <div className="reusable-form-group full-width">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Name as printed on card"
                  className="form-control-glass"
                />
              </div>

              <div className="reusable-form-group">
                <label>Expiry Date</label>
                <div className="expiry-dropdown-row">
                  <select 
                    value={expiryMonth} 
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    className="form-control-glass select-clean"
                  >
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span>/</span>
                  <select 
                    value={expiryYear} 
                    onChange={(e) => setExpiryYear(e.target.value)}
                    className="form-control-glass select-clean"
                  >
                    {['25', '26', '27', '28', '29', '30', '31'].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="reusable-form-group">
                <label>CVV / CVC</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    className="form-control-glass"
                    maxLength={4}
                  />
                  <span className="cvv-hint" title="3 digits on back of card">
                    <i className="fa-solid fa-circle-question"></i>
                  </span>
                </div>
              </div>
            </div>

            <label className="save-card-checkbox">
              <input 
                type="checkbox" 
                checked={saveCard} 
                onChange={(e) => setSaveCard(e.target.checked)} 
              />
              <span>Save this card securely per RBI compliance tokens for 1-click checkout</span>
            </label>
          </div>
        )}

        {/* 3. NET BANKING TAB CONTENT */}
        {paymentMode === 'NETBANKING' && (
          <div className="pay-method-pane netbanking-pane">
            <h5>Popular Banks</h5>
            <div className="popular-banks-grid">
              {[
                { name: 'HDFC Bank', code: 'HDFC', icon: 'fa-building-columns' },
                { name: 'State Bank of India', code: 'SBI', icon: 'fa-landmark' },
                { name: 'ICICI Bank', code: 'ICICI', icon: 'fa-building-columns' },
                { name: 'Axis Bank', code: 'AXIS', icon: 'fa-landmark' },
                { name: 'Kotak Bank', code: 'KOTAK', icon: 'fa-building-columns' },
                { name: 'Punjab National Bank', code: 'PNB', icon: 'fa-landmark' }
              ].map((bank) => (
                <button
                  key={bank.name}
                  type="button"
                  className={`bank-pill-card ${selectedBank === bank.name ? 'active' : ''}`}
                  onClick={() => setSelectedBank(bank.name)}
                >
                  <i className={`fa-solid ${bank.icon}`}></i>
                  <span>{bank.name}</span>
                  {selectedBank === bank.name && <i className="fa-solid fa-circle-check"></i>}
                </button>
              ))}
            </div>

            <div className="reusable-form-group" style={{ marginTop: '20px' }}>
              <label>Or select from all other Indian banks</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="form-control-glass select-clean"
              >
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="IndusInd Bank">IndusInd Bank</option>
                <option value="Canara Bank">Canara Bank</option>
                <option value="Federal Bank">Federal Bank</option>
                <option value="Yes Bank">Yes Bank</option>
                <option value="IDFC First Bank">IDFC First Bank</option>
              </select>
            </div>
          </div>
        )}

        {/* 4. WALLET & MILES TAB CONTENT */}
        {paymentMode === 'WALLET' && (
          <div className="pay-method-pane wallet-pane">
            <div className={`miles-reward-card ${useMiles ? 'active' : ''}`}>
              <div className="miles-info">
                <div className="miles-badge">
                  <i className="fa-solid fa-gem"></i> TRAVIO CLUB REWARDS
                </div>
                <h4>You have 3,400 Travio Miles available</h4>
                <p>Redeem 800 miles to save an instant ₹800 on this reservation.</p>
              </div>
              <button
                type="button"
                className={`btn-toggle-miles ${useMiles ? 'active' : ''}`}
                onClick={() => setUseMiles(!useMiles)}
              >
                {useMiles ? '✓ Redeeming 800 Miles (-₹800)' : 'Apply 800 Miles'}
              </button>
            </div>

            <h5 style={{ marginTop: '24px', marginBottom: '12px' }}>Supported Digital Wallets</h5>
            <div className="wallet-options-list">
              {[
                { name: 'Paytm Wallet', icon: 'fa-wallet', bal: 'Linked Account' },
                { name: 'Amazon Pay Balance', icon: 'fa-amazon-pay', bal: '₹1,240 Balance' },
                { name: 'MobiKwik ZIP Pay Later', icon: 'fa-bolt', bal: 'Approved Credit Line' }
              ].map((w) => (
                <div key={w.name} className="wallet-item-card">
                  <div className="wallet-title">
                    <i className={`fa-solid ${w.icon}`}></i>
                    <div>
                      <strong>{w.name}</strong>
                      <span>{w.bal}</span>
                    </div>
                  </div>
                  <button type="button" className="btn-link-wallet" onClick={handleSubmitPayment}>
                    Pay with {w.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {paymentError && (
          <div className="payment-error-banner">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>{paymentError}</span>
          </div>
        )}
      </div>

      {/* Right Column: Sticky Live Fare Breakdown */}
      <div className="gateway-summary-col">
        <div className="fare-breakdown-card">
          <div className="summary-header">
            <h4>Fare Breakdown</h4>
            <span className="summary-ref">REF: {item.bookingRef || 'TRV-4819'}</span>
          </div>

          <div className="selected-item-recap">
            <span className="recap-type">{item.type}</span>
            <h5 className="recap-title">{item.title}</h5>
            <p className="recap-route">{item.from} → {item.to}</p>
            <span className="recap-seat-tag"><i className="fa-solid fa-couch"></i> {seatSelection?.summary || 'Standard Seat'}</span>
          </div>

          <div className="breakdown-rows">
            <div className="breakdown-row">
              <span>Base Fare (1 Passenger)</span>
              <strong>₹{baseFare.toLocaleString()}</strong>
            </div>

            {seatAddon > 0 && (
              <div className="breakdown-row highlight-addon">
                <span>Seat / Option Selection</span>
                <strong>+₹{seatAddon.toLocaleString()}</strong>
              </div>
            )}

            {insuranceCost > 0 && (
              <div className="breakdown-row">
                <span>Travel & Medical Insurance</span>
                <strong>+₹{insuranceCost}</strong>
              </div>
            )}

            {carbonCost > 0 && (
              <div className="breakdown-row">
                <span>Green Carbon Offset</span>
                <strong>+₹{carbonCost}</strong>
              </div>
            )}

            <div className="breakdown-row">
              <span>Taxes & Airport Convenience</span>
              <strong>+₹{convenienceFee}</strong>
            </div>

            {appliedPromo && promoDiscount > 0 && (
              <div className="breakdown-row discount-row">
                <span>Promo Code ({appliedPromo})</span>
                <strong className="discount-val">-₹{promoDiscount}</strong>
              </div>
            )}

            {useMiles && (
              <div className="breakdown-row discount-row">
                <span>Travio Miles Discount</span>
                <strong className="discount-val">-₹800</strong>
              </div>
            )}

            <div className="breakdown-divider" />

            <div className="breakdown-row total-row">
              <div>
                <span className="total-label">Total Payable</span>
                <span className="tax-inclusive">(All taxes inclusive)</span>
              </div>
              <strong className="total-price">₹{grandTotal.toLocaleString()}</strong>
            </div>
          </div>

          {/* Secure CTA Button */}
          <button
            type="button"
            className="btn-primary btn-submit-payment"
            onClick={handleSubmitPayment}
          >
            <i className="fa-solid fa-lock"></i>
            <span>Pay ₹{grandTotal.toLocaleString()} Securely</span>
          </button>

          <div className="security-badges-row">
            <span><i className="fa-solid fa-shield-halved"></i> 256-Bit SSL</span>
            <span><i className="fa-solid fa-certificate"></i> PCI-DSS Level 1</span>
            <span><i className="fa-solid fa-building-shield"></i> RBI Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
