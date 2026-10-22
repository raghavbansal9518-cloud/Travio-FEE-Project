import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SLIDES, CAROUSEL_INTERVAL } from '../data/slides';

// ===== ICONS =====
const CompassLogoIcon = () => (
  <span className="material-symbols-rounded" style={{ fontSize: '24px' }}>flight_takeoff</span>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.333 7h9.334M8.167 4.667L10.5 7l-2.333 2.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M1.5 9s3-5.25 7.5-5.25S16.5 9 16.5 9s-3 5.25-7.5 5.25S1.5 9 1.5 9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2.25 2.25l13.5 13.5M7.575 7.575A2.25 2.25 0 0011.37 11.37M4.725 4.725C3.097 5.815 1.5 9 1.5 9s3 5.25 7.5 5.25c1.433 0 2.761-.382 3.909-1.045M8.1 3.81C8.39 3.77 8.69 3.75 9 3.75c4.5 0 7.5 5.25 7.5 5.25s-.66 1.154-1.815 2.31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M1.5 5.5L8 9.5l6.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2.5" y="7" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4.5 7V5a3.5 3.5 0 017 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 13.5c0-2.485 2.686-4.5 6-4.5s6 2.015 6 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 3.5v3M6 8h.005" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" stroke="#8b5cf6" strokeWidth="2.5"/>
    <path d="M14 24l7 7 13-14" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ===== CAROUSEL HOOK =====
function useCarousel(total, interval) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % total);
  }, [total]);

  const go = useCallback((idx) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  useEffect(() => {
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [next, interval]);

  const manualGo = useCallback((idx) => {
    clearInterval(timerRef.current);
    go(idx);
    timerRef.current = setInterval(next, interval);
  }, [go, next, interval]);

  return { current, manualGo };
}

// ===== INLINE SUCCESS STATE =====
function SuccessBanner({ type, onProceed }) {
  const isLogin = type === 'login';
  return (
    <div className="success-banner">
      <CheckCircleIcon />
      <div className="success-banner__text">
        <h3 className="success-banner__title">
          {isLogin ? 'Welcome Back!' : 'Account Created Successfully!'}
        </h3>
        <p className="success-banner__desc">
          {isLogin
            ? 'Signed in to Travio. Redirecting to your dashboard...'
            : 'Welcome to Travio! Taking you to the travel portal...'}
        </p>
      </div>
      <button type="button" className="btn-success-action" onClick={onProceed}>
        Go to Website Now →
      </button>
    </div>
  );
}

// ===== INPUT COMPONENT =====
function InputField({ label, type = 'text', placeholder, value, onChange, error, icon, hasPassword, id, autoComplete }) {
  const [showPw, setShowPw] = useState(false);
  const inputType = hasPassword ? (showPw ? 'text' : 'password') : type;

  return (
    <div className="input-group">
      {label && <label className="input-label" htmlFor={id}>{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`form-input${icon ? ' has-icon' : ''}${hasPassword ? ' has-action' : ''}${error ? ' error' : ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
        {hasPassword && (
          <button
            type="button"
            className="input-action"
            onClick={() => setShowPw(s => !s)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            <EyeIcon open={showPw} />
          </button>
        )}
      </div>
      {error && (
        <span className="input-error" id={`${id}-error`} role="alert">
          <ErrorIcon /> {error}
        </span>
      )}
    </div>
  );
}


// ===== SIGNUP FORM =====
function SignUpForm({ onSwitch, onSuccess }) {
  const [fields, setFields] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key) => (e) => setFields(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!fields.firstName.trim()) errs.firstName = 'First name is required';
    if (!fields.lastName.trim()) errs.lastName = 'Last name is required';
    if (!fields.email.includes('@')) errs.email = 'Enter a valid email address';
    if (fields.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setErrors({});
    
    // Save credentials to local storage
    localStorage.setItem('auth_email', fields.email);
    localStorage.setItem('auth_password', fields.password);

    // Redirect immediately without showing success banner
    onSuccess();
  };

  return (
    <div className="form-view entering">
      <div className="form-header form-field">
        <h1 className="form-header__title">Create an Account</h1>
        <div className="form-header__switch">
          Already have an account?{' '}
          <button type="button" className="form-header__switch-link" onClick={onSwitch}>Log in</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={`form-body${shake ? ' form-shake' : ''}`}>
          <div className="form-row form-field">
            <InputField
              id="firstName"
              placeholder="First name"
              value={fields.firstName}
              onChange={set('firstName')}
              error={errors.firstName}
              icon={<UserIcon />}
              autoComplete="given-name"
            />
            <InputField
              id="lastName"
              placeholder="Last name"
              value={fields.lastName}
              onChange={set('lastName')}
              error={errors.lastName}
              autoComplete="family-name"
            />
          </div>

          <div className="form-field">
            <InputField
              id="email"
              type="email"
              placeholder="Email address"
              value={fields.email}
              onChange={set('email')}
              error={errors.email}
              icon={<EmailIcon />}
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <InputField
              id="password"
              placeholder="Create a password"
              value={fields.password}
              onChange={set('password')}
              error={errors.password}
              icon={<LockIcon />}
              hasPassword
              autoComplete="new-password"
            />
          </div>

          <div className="form-field" style={{ marginTop: '8px' }}>
            <button type="submit" className="btn-primary">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ===== FORGOT PASSWORD FORM =====
function ForgotPasswordForm({ onBack, onSuccess }) {
  const [fields, setFields] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const set = (key) => (e) => setFields(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!fields.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!fields.newPassword || fields.newPassword.length < 6) errs.newPassword = 'Password must be at least 6 characters';
    if (fields.newPassword !== fields.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    // Persist new password
    localStorage.setItem('auth_email', fields.email);
    localStorage.setItem('auth_password', fields.newPassword);

    try {
      const userProfile = JSON.parse(localStorage.getItem('travio_user_profile') || '{}');
      if (userProfile.email === fields.email) {
        userProfile.password = fields.newPassword;
        localStorage.setItem('travio_user_profile', JSON.stringify(userProfile));
      }
    } catch {
      // ignore
    }

    setSuccessMsg('Password reset successful! You can now log in.');
    setTimeout(() => {
      onSuccess();
    }, 1600);
  };

  return (
    <div className="form-view entering">
      <div className="form-header form-field">
        <button
          type="button"
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary-light, #a78bfa)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '12px',
            padding: 0
          }}
        >
          <ArrowLeftIcon />
          <span>Back to Login</span>
        </button>
        <p className="form-header__label">Account Security</p>
        <h1 className="form-header__title">Reset Password</h1>
        <p className="form-header__subtitle">Enter your registered email and create a new secure password.</p>
      </div>

      {successMsg ? (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginTop: '12px'
          }}
        >
          {successMsg}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-body${shake ? ' form-shake' : ''}`}>
            <div className="form-field">
              <InputField
                id="reset-email"
                type="email"
                placeholder="Registered email address"
                value={fields.email}
                onChange={set('email')}
                error={errors.email}
                icon={<EmailIcon />}
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <InputField
                id="new-password"
                placeholder="New password (min 6 characters)"
                value={fields.newPassword}
                onChange={set('newPassword')}
                error={errors.newPassword}
                icon={<LockIcon />}
                hasPassword
                autoComplete="new-password"
              />
            </div>

            <div className="form-field">
              <InputField
                id="confirm-password"
                placeholder="Confirm new password"
                value={fields.confirmPassword}
                onChange={set('confirmPassword')}
                error={errors.confirmPassword}
                icon={<LockIcon />}
                hasPassword
                autoComplete="new-password"
              />
            </div>

            <div className="form-field" style={{ marginTop: '8px' }}>
              <button type="submit" className="btn-primary">
                Reset & Save Password
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

// ===== LOGIN FORM =====
function LoginForm({ onSwitch, onForgotPassword, onSuccess }) {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const set = (key) => (e) => setFields(f => ({ ...f, [key]: e.target.value }));

  const handleDemoUser = () => {
    setFields({ email: 'aarav.sharma@example.com', password: 'password123' });
    setErrors({});
  };

  const handleDemoAdmin = () => {
    setFields({ email: 'admin@travio.com', password: 'admin123' });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!fields.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!fields.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    // Check credentials against local storage or demo credentials
    const savedEmail = localStorage.getItem('auth_email');
    const savedPassword = localStorage.getItem('auth_password');
    const isAdminUser = fields.email.toLowerCase().includes('admin');

    if (
      (savedEmail && savedEmail === fields.email && savedPassword === fields.password) ||
      (fields.email === 'admin@travio.com' && fields.password === 'admin123') ||
      (fields.email === 'aarav.sharma@example.com' && fields.password === 'password123') ||
      (!savedEmail && fields.email.includes('@') && fields.password.length >= 4)
    ) {
      setErrors({});
      localStorage.setItem('auth_email', fields.email);
      if (!savedPassword) {
        localStorage.setItem('auth_password', fields.password);
      }
      localStorage.setItem('auth_role', isAdminUser ? 'admin' : 'user');
      onSuccess();
    } else {
      setErrors({ email: 'Invalid email or password' });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="form-view entering">
      <div className="form-header form-field">
        <p className="form-header__label">Log in to Travio</p>
        <h1 className="form-header__title">Welcome Back!</h1>
        <p className="form-header__subtitle">Enter your details to plan your next travel experience.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={`form-body${shake ? ' form-shake' : ''}`}>
          <div className="form-field">
            <InputField
              id="login-email"
              type="email"
              placeholder="Email address"
              value={fields.email}
              onChange={set('email')}
              error={errors.email}
              icon={<EmailIcon />}
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <InputField
              id="login-password"
              placeholder="Enter your password"
              value={fields.password}
              onChange={set('password')}
              error={errors.password}
              icon={<LockIcon />}
              hasPassword
              autoComplete="current-password"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-4px', marginBottom: '10px' }}>
            <button
              type="button"
              onClick={onForgotPassword}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary-light, #a78bfa)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                padding: '2px 0'
              }}
            >
              Forgot Password?
            </button>
          </div>

          <div className="form-field">
            <button type="submit" className="btn-primary">Sign In</button>
          </div>

          {/* Quick Demo Credentials for Evaluation */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '12px',
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem'
            }}
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Evaluation Demo:</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleDemoUser}
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#38bdf8',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Passenger
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#fbbf24',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="form-footer-switch form-field" style={{ marginTop: '12px' }}>
            Don't have an account?{' '}
            <button type="button" onClick={onSwitch}>Create Account</button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ===== DESKTOP CAROUSEL PANEL =====
function CarouselPanel({ current, onDotClick, onGoHome }) {
  return (
    <div className="carousel-panel" aria-label="Destinations carousel">
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`carousel-slide${current === idx ? ' active' : ''}`}
          aria-hidden={current !== idx}
        >
          <div
            className="carousel-slide__bg"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          />
          <div className="carousel-slide__overlay" />
          <div className="carousel-footer">
            <div className="carousel-text">
              <h2 className="carousel-text__heading">{slide.heading}</h2>
              <p className="carousel-text__desc">{slide.description}</p>
            </div>
            <div className="carousel-dots" role="tablist">
              {SLIDES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`carousel-dot${current === dotIdx ? ' active' : ''}`}
                  onClick={() => onDotClick(dotIdx)}
                  role="tab"
                  aria-selected={current === dotIdx}
                  aria-label={`Destination ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}


    </div>
  );
}

// ===== DESKTOP AUTH CONTAINER =====
function DesktopAuth({ onGoHome }) {
  const { current, manualGo } = useCarousel(SLIDES.length, CAROUSEL_INTERVAL);
  // Default to 'login' so user sees login first
  const [view, setView] = useState('login');
  const [transitioning, setTransitioning] = useState(false);

  const switchTo = (newView) => {
    if (transitioning || newView === view) return;
    setTransitioning(true);
    setTimeout(() => {
      setView(newView);
      setTransitioning(false);
    }, 280);
  };

  return (
    <div className="auth-container" role="main">
      <CarouselPanel current={current} onDotClick={manualGo} onGoHome={onGoHome} />
      <div className="form-panel">
        
        {/* Logo shifted to the other side (Form Panel) */}
        <button onClick={onGoHome} className="carousel-logo" style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', top: '32px', left: '48px' }}>
          <div className="carousel-logo__icon">
            <CompassLogoIcon />
          </div>
          <span className="carousel-logo__text">Travio</span>
        </button>

        {/* Back to Website button on top right */}
        <button
          type="button"
          onClick={onGoHome}
          className="back-to-website-btn"
          style={{
            position: 'absolute',
            top: '32px',
            right: '48px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(106, 76, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(106, 76, 255, 0.5)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>Skip for now</span>
          <ArrowRightIcon />
        </button>

        <div className="form-wrapper" aria-live="polite" style={{ marginTop: '40px' }}>
          {!transitioning && (
            view === 'signup' ? (
              <SignUpForm onSwitch={() => switchTo('login')} onSuccess={onGoHome} />
            ) : view === 'forgot' ? (
              <ForgotPasswordForm onBack={() => switchTo('login')} onSuccess={() => switchTo('login')} />
            ) : (
              <LoginForm
                onSwitch={() => switchTo('signup')}
                onForgotPassword={() => switchTo('forgot')}
                onSuccess={onGoHome}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ===== MOBILE BOTTOM SHEET =====
function MobileBottomSheet({ type, onClose, onContinue }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 250);
  };

  const handleContinue = () => {
    setClosing(true);
    setTimeout(onContinue, 250);
  };

  const isLogin = type === 'login';

  return (
    <>
      <div className={`mobile-modal-backdrop${closing ? ' closing' : ''}`} onClick={handleClose} />
      <div className={`mobile-bottom-sheet${closing ? ' closing' : ''}`} role="dialog" aria-modal="true">
        <div className="mobile-sheet__handle" />
        <p className="mobile-sheet__label">{isLogin ? 'Travio Member' : 'Start Exploring'}</p>
        <h2 className="mobile-sheet__title">{isLogin ? 'Welcome Back!' : 'Join Travio'}</h2>
        <p className="mobile-sheet__desc">
          {isLogin
            ? 'Sign in to access your saved trips and customized itineraries.'
            : 'Create your free account to unlock premium destination guides.'}
        </p>
        <button className="btn-primary" onClick={handleContinue}>
          {isLogin ? 'Continue to Login →' : 'Continue to Sign Up →'}
        </button>
      </div>
    </>
  );
}

// ===== MOBILE FULL-SCREEN FORM PAGE =====
function MobileFormPage({ view, onBack, onSwitch, onGoHome }) {
  const [fields, setFields] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const isLogin = view === 'login';

  const set = (key) => (e) => setFields(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!isLogin) {
      if (!fields.firstName.trim()) errs.firstName = 'First name is required';
      if (!fields.lastName.trim()) errs.lastName = 'Last name is required';
    }
    if (!fields.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!fields.password || fields.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setErrors({});
    // Redirect immediately without showing success banner
    onGoHome();
  };

  return (
    <div className="mobile-form-page" role="main">
      <header className="mobile-form-page__header">
        <button className="btn-back-mobile" onClick={onBack} aria-label="Go back to landing">
          <ArrowLeftIcon />
        </button>
        <span className="mobile-form-page__header-title">
          {isLogin ? 'Log In to Travio' : 'Create Travio Account'}
        </span>
        <button
          type="button"
          onClick={onGoHome}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: 'var(--color-primary-light)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>Skip for now</span>
          <ArrowRightIcon />
        </button>
      </header>

      <div className="mobile-form-page__scroll">
        <div className="mobile-form-page__inner">
          <div className="form-header" style={{ marginBottom: '24px' }}>
                {isLogin && <p className="form-header__label">Travio Travel Account</p>}
                <h1 className="form-header__title">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
                <p className="form-header__subtitle">
                  {isLogin ? 'Log in to continue your travel plans.' : 'Sign up to discover beautiful destinations.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className={`form-body${shake ? ' form-shake' : ''}`}>
                  {!isLogin && (
                    <>
                      <InputField
                        id="m-firstName"
                        placeholder="First name"
                        value={fields.firstName}
                        onChange={set('firstName')}
                        error={errors.firstName}
                        icon={<UserIcon />}
                        autoComplete="given-name"
                      />
                      <InputField
                        id="m-lastName"
                        placeholder="Last name"
                        value={fields.lastName}
                        onChange={set('lastName')}
                        error={errors.lastName}
                        autoComplete="family-name"
                      />
                    </>
                  )}
                  <InputField
                    id="m-email"
                    type="email"
                    placeholder="Email address"
                    value={fields.email}
                    onChange={set('email')}
                    error={errors.email}
                    icon={<EmailIcon />}
                    autoComplete="email"
                  />
                  <InputField
                    id="m-password"
                    placeholder="Password"
                    value={fields.password}
                    onChange={set('password')}
                    error={errors.password}
                    icon={<LockIcon />}
                    hasPassword
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />


                  <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>

                  <div className="form-footer-switch" style={{ marginTop: '16px', paddingBottom: '24px' }}>
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button type="button" onClick={onSwitch}>
                      {isLogin ? 'Create Account' : 'Log in'}
                    </button>
                  </div>
                </div>
              </form>
        </div>
      </div>
    </div>
  );
}

// ===== MOBILE LANDING =====
function MobileLanding({ onGoHome }) {
  const { current, manualGo } = useCarousel(SLIDES.length, CAROUSEL_INTERVAL);
  const [sheet, setSheet] = useState(null);
  const [formPage, setFormPage] = useState(null);

  const openSheet = (type) => setSheet(type);
  const closeSheet = () => setSheet(null);
  const goToForm = (type) => {
    setSheet(null);
    setFormPage(type);
  };

  if (formPage) {
    return (
      <MobileFormPage
        view={formPage}
        onBack={() => setFormPage(null)}
        onSwitch={() => setFormPage(formPage === 'login' ? 'signup' : 'login')}
        onGoHome={onGoHome}
      />
    );
  }

  return (
    <div className="mobile-landing" role="main">
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`mobile-landing__slide${current === idx ? ' active' : ''}`}
          aria-hidden={current !== idx}
        >
          <div
            className="mobile-landing__bg"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          />
          <div className="mobile-landing__overlay" />
          <div className="mobile-landing__content">
            <div className="mobile-landing__top" style={{ justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="mobile-landing__logo-icon">
                  <CompassLogoIcon />
                </div>
                <span className="mobile-landing__logo-text">Travio</span>
              </div>
              <button
                type="button"
                onClick={onGoHome}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Skip for now</span>
                <ArrowRightIcon />
              </button>
            </div>

            <div className="mobile-landing__bottom">
              <h1 className="mobile-landing__heading">{slide.heading}</h1>
              <p className="mobile-landing__desc">{slide.description}</p>

              <div className="mobile-landing__dots" role="tablist">
                {SLIDES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    className={`mobile-landing__dot${current === dotIdx ? ' active' : ''}`}
                    onClick={() => manualGo(dotIdx)}
                    role="tab"
                    aria-selected={current === dotIdx}
                    aria-label={`Destination ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="mobile-landing__actions">
                <button className="btn-primary" onClick={() => openSheet('login')}>
                  Log In
                </button>
                <button className="btn-outline" onClick={() => openSheet('signup')}>
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {sheet && (
        <MobileBottomSheet
          type={sheet}
          onClose={closeSheet}
          onContinue={() => goToForm(sheet)}
        />
      )}
    </div>
  );
}

// ===== ROOT COMPONENT =====
export default function AuthPage() {
  const navigate = useNavigate();

  // Route to the dashboard instead of home
  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <div className="auth-page">
        <DesktopAuth onGoHome={handleGoHome} />
      </div>
      <MobileLanding onGoHome={handleGoHome} />
    </>
  );
}