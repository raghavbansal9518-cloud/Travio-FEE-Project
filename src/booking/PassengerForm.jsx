import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Reusable Form Input Component
function FormInput({ label, name, type = 'text', value, onChange, onBlur, error, icon, placeholder, maxLength }) {
  const isInvalid = Boolean(error);
  const isValid = !error && value && value.trim().length > 0;

  return (
    <div className={`reusable-form-group ${isInvalid ? 'has-error' : ''} ${isValid ? 'is-valid' : ''}`}>
      <label htmlFor={name} className="form-label">
        {icon && <i className={`fa-solid ${icon} form-label-icon`}></i>}
        <span>{label}</span>
      </label>
      <div className="input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className="form-control-glass"
          autoComplete="off"
        />
        {isValid && <span className="valid-check-icon"><i className="fa-solid fa-circle-check"></i></span>}
        {isInvalid && <span className="invalid-alert-icon"><i className="fa-solid fa-circle-exclamation"></i></span>}
      </div>
      {isInvalid && <p className="form-error-msg">{error}</p>}
    </div>
  );
}

export default function PassengerForm({
  /* props */ 
  formData, 
  setFormData, 
  errors, 
  setErrors, 
  appliedPromo, 
  setAppliedPromo, 
  promoDiscount, 
  setPromoDiscount 
}) {
  const { t } = useLanguage();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  // Live Field Validation Logic
  const validateField = (name, value) => {
    let error = '';

    if (name === 'fullName') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.trim().length < 3) {
        error = 'Name must be at least 3 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        error = 'Name can only contain alphabetic characters';
      }
    }

    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        error = 'Please enter a valid email address';
      }
    }

    if (name === 'phone') {
      if (!value.trim()) {
        error = 'Phone number is required';
      } else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
        error = 'Enter a valid 10-digit mobile number';
      }
    }

    if (name === 'age') {
      const ageNum = parseInt(value, 10);
      if (!value) {
        error = 'Age is required';
      } else if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        error = 'Enter a realistic age between 1 and 120';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (type !== 'checkbox') {
      validateField(name, val);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Promo Code Validation
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();

    if (!code) {
      setPromoMessage({ type: 'error', text: 'Please enter a promo code' });
      return;
    }

    if (code === 'TRAVIO500') {
      setAppliedPromo('TRAVIO500');
      setPromoDiscount(500);
      setPromoMessage({ type: 'success', text: '₹500 instant discount applied!' });
    } else if (code === 'FIRSTFLY') {
      setAppliedPromo('FIRSTFLY');
      setPromoDiscount(750);
      setPromoMessage({ type: 'success', text: '₹750 First Flight discount applied!' });
    } else if (code === 'EXPLORE10') {
      setAppliedPromo('EXPLORE10');
      setPromoDiscount(1000);
      setPromoMessage({ type: 'success', text: '₹1,000 Special Explorer discount applied!' });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try "TRAVIO500" or "EXPLORE10"' });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
    setPromoInput('');
    setPromoMessage(null);
  };

  return (
    <div className="passenger-form-container">
      <div className="form-section-intro">
        <h4><i className="fa-solid fa-user-shield"></i> {t('Primary Traveler & Contact Information', 'Primary Traveler & Contact Information')}</h4>
        <p>E-ticket confirmation and live SMS gate alerts will be sent to these details</p>
      </div>

      <div className="form-grid-2col">
        {/* Full Name */}
        <FormInput
          label={t("Full Name (As on Govt ID)", "Full Name (As on Govt ID)")}
          name="fullName"
          icon="fa-id-card"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          placeholder="e.g. Aarav Sharma"
        />

        {/* Email */}
        <FormInput
          label={t("Email Address (For E-Ticket)", "Email Address (For E-Ticket)")}
          name="email"
          type="email"
          icon="fa-envelope"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="e.g. aarav.sharma@example.com"
        />

        {/* Mobile Number */}
        <FormInput
          label={t("Mobile Number (10 Digits)", "Mobile Number (10 Digits)")}
          name="phone"
          type="tel"
          icon="fa-phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          placeholder="9876543210"
          maxLength={10}
        />

        {/* Age & Gender Row */}
        <div className="age-gender-row">
          <div className="age-field">
            <FormInput
              label={t("Age", "Age")}
              name="age"
              type="number"
              icon="fa-cake-candles"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.age}
              placeholder="26"
            />
          </div>

          <div className="reusable-form-group gender-field">
            <label className="form-label">
              <i className="fa-solid fa-venus-mars form-label-icon"></i>
              <span>Gender</span>
            </label>
            <div className="gender-pill-selector">
              {['Male', 'Female', 'Other'].map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`gender-chip ${formData.gender === g ? 'active' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, gender: g }))}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add-ons & Protection */}
      <div className="addons-checkbox-section">
        <label className={`custom-checkbox-card ${formData.hasInsurance ? 'checked' : ''}`}>
          <input
            type="checkbox"
            name="hasInsurance"
            checked={formData.hasInsurance}
            onChange={handleChange}
          />
          <div className="checkbox-visual">
            <i className={`fa-solid ${formData.hasInsurance ? 'fa-square-check' : 'fa-square'}`}></i>
          </div>
          <div className="checkbox-content">
            <div className="cb-title-row">
              <strong>Comprehensive Travel & Medical Insurance</strong>
              <span className="price-tag">+₹199 / traveler</span>
            </div>
            <p>Covers emergency medical hospitalization (₹5,00,000), baggage loss, and 100% trip cancellation refund.</p>
          </div>
        </label>

        <label className={`custom-checkbox-card ${formData.hasCarbonOffset ? 'checked' : ''}`}>
          <input
            type="checkbox"
            name="hasCarbonOffset"
            checked={formData.hasCarbonOffset}
            onChange={handleChange}
          />
          <div className="checkbox-visual">
            <i className={`fa-solid ${formData.hasCarbonOffset ? 'fa-square-check' : 'fa-square'}`}></i>
          </div>
          <div className="checkbox-content">
            <div className="cb-title-row">
              <strong>Green Travel Carbon Offset Badge 🌲</strong>
              <span className="price-tag">+₹49</span>
            </div>
            <p>Plant a native tree in the Western Ghats to neutralize this journey's carbon footprint.</p>
          </div>
        </label>
      </div>

      {/* Promo Code Engine */}
      <div className="promo-code-card">
        <div className="promo-header">
          <i className="fa-solid fa-tags"></i>
          <span>Have a Promo Code or Voucher?</span>
        </div>

        {!appliedPromo ? (
          <form className="promo-input-row" onSubmit={handleApplyPromo}>
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Try code: TRAVIO500 or EXPLORE10"
              className="promo-text-input"
            />
            <button type="submit" className="btn-apply-promo">
              Apply Code
            </button>
          </form>
        ) : (
          <div className="applied-promo-pill">
            <span className="promo-badge-text">
              <i className="fa-solid fa-circle-check"></i> Code <strong>{appliedPromo}</strong> applied (-₹{promoDiscount})
            </span>
            <button type="button" className="btn-remove-promo" onClick={handleRemovePromo}>
              Remove
            </button>
          </div>
        )}

        {promoMessage && (
          <p className={`promo-alert-msg ${promoMessage.type}`}>
            {promoMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}
