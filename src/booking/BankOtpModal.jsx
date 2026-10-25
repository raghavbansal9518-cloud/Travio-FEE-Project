import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function BankOtpModal({ paymentDetails, onSuccess, onCancel }) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 30s OTP resend timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAutoFill = () => {
    setOtp('849201');
    setErrorMsg('');
  };

  const handleAuthorize = (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.trim().length < 4) {
      setErrorMsg('Please enter the 6-digit OTP received on your mobile');
      return;
    }

    setIsProcessing(true);
    // Simulate real banking network authorization
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1800);
  };

  return (
    <div className="bank-otp-overlay">
      <div className="bank-otp-card">
        {/* Bank Header */}
        <div className="bank-header-row">
          <div className="bank-brand">
            <span className="material-symbols-rounded bank-logo-icon">account_balance</span>
            <div>
              <h5>TRAVIO 3D-SECURE VERIFICATION</h5>
              <span>Verified by Visa / Mastercard Identity Check</span>
            </div>
          </div>
          <button type="button" className="bank-close-btn" onClick={onCancel} disabled={isProcessing}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Transaction Summary Box */}
        <div className="txn-summary-box">
          <div className="txn-row">
            <span>Merchant</span>
            <strong>TRAVIO TRAVELS INDIA PVT LTD</strong>
          </div>
          <div className="txn-row">
            <span>Payment Mode</span>
            <strong>{paymentDetails?.details || 'Online Payment Gateway'}</strong>
          </div>
          <div className="txn-row">
            <span>Transaction Ref</span>
            <code>TXN-{Math.floor(100000000 + Math.random() * 900000000)}</code>
          </div>
          <div className="txn-row total-highlight">
            <span>Amount to Authorize</span>
            <strong className="amt-val">₹{paymentDetails?.amountPaid?.toLocaleString()}</strong>
          </div>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleAuthorize} className="otp-form-content">
          <p className="otp-sent-notice">
            A One-Time Password (OTP) has been sent to your registered mobile ending in <strong>••••••3210</strong>
          </p>

          <div className="reusable-form-group">
            <label>Enter 6-Digit Bank OTP</label>
            <div className="otp-input-wrap">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ''));
                  setErrorMsg('');
                }}
                placeholder="• • • • • •"
                className="otp-digit-input"
                autoFocus
                disabled={isProcessing}
              />
              <button
                type="button"
                className="btn-autofill-otp"
                onClick={handleAutoFill}
                disabled={isProcessing}
              >
                Auto-fill Demo OTP (849201)
              </button>
            </div>
            {errorMsg && <p className="form-error-msg">{errorMsg}</p>}
          </div>

          <div className="otp-actions-row">
            <span className="otp-timer-lbl">
              {timer > 0 ? (
                <>Resend code in <strong>{timer}s</strong></>
              ) : (
                <button
                  type="button"
                  className="btn-resend-link"
                  onClick={() => {
                    setTimer(30);
                    handleAutoFill();
                  }}
                >
                  {t('Resend OTP')} Now
                </button>
              )}
            </span>
          </div>

          {/* Submit / Cancel Buttons */}
          <div className="otp-buttons-footer">
            <button
              type="button"
              className="btn-glass btn-cancel-pay"
              onClick={onCancel}
              disabled={isProcessing}
            >
              Cancel Payment
            </button>

            <button
              type="submit"
              className="btn-primary btn-authorize-pay"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Authenticating with Bank...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-shield-check"></i>
                  <span>Authorize ₹{paymentDetails?.amountPaid?.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
