import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          background: 'radial-gradient(ellipse at top, rgba(106, 76, 255, 0.12), transparent 70%)',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            background: 'rgba(22, 24, 29, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '48px 36px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(106, 76, 255, 0.15)'
          }}
        >
          {/* Animated Glowing Icon */}
          <div
            style={{
              width: '84px',
              height: '84px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(106, 76, 255, 0.2), rgba(56, 189, 248, 0.2))',
              border: '2px solid rgba(106, 76, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#a78bfa',
              boxShadow: '0 0 30px rgba(106, 76, 255, 0.3)'
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: '44px' }}>
              explore_off
            </span>
          </div>

          <div
            style={{
              fontSize: '4.5rem',
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px'
            }}
          >
            404
          </div>

          <h1
            style={{
              color: '#ffffff',
              fontSize: '1.6rem',
              fontWeight: 700,
              margin: '0 0 12px 0'
            }}
          >
            {t('phrases.Lost in the Wilderness?', 'Lost in the Wilderness?')}
          </h1>

          <p
            style={{
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              margin: '0 0 32px 0'
            }}
          >
            {t('phrases.notFoundDesc', "The travel destination or coordinate you are looking for doesn't exist, has taken a detour, or was moved.")}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #6a4cff 0%, #8b5cf6 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(106, 76, 255, 0.4)',
                transition: 'transform 0.2s ease'
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                home
              </span>
              Return to Home
            </button>

            <Link
              to="/explore"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '12px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                explore
              </span>
              Explore Places
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
