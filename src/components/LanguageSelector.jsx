import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ variant = 'header' }) {
  const { currentLanguage, currentLangObj, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="language-selector-wrapper"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        title={`Change Language (Current: ${currentLangObj.name})`}
        style={{
          height: '40px',
          padding: '0 12px',
          borderRadius: '20px',
          background: isOpen ? 'rgba(106, 76, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
          border: isOpen ? '1px solid rgba(106, 76, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: isOpen ? '0 0 16px rgba(106, 76, 255, 0.3)' : 'none'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(106, 76, 255, 0.2)';
          e.currentTarget.style.borderColor = 'rgba(106, 76, 255, 0.4)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = isOpen ? 'rgba(106, 76, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = isOpen ? '1px solid rgba(106, 76, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span style={{ fontSize: '16px' }}>{currentLangObj.flag}</span>
        <span style={{ letterSpacing: '0.5px' }}>{currentLanguage.toUpperCase()}</span>
        <span
          className="material-symbols-rounded"
          style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.6)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '200px',
            background: 'rgba(17, 24, 39, 0.96)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '8px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(106, 76, 255, 0.2)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 1000,
            animation: 'fadeIn 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div
            style={{
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '6px'
            }}
          >
            Select Language
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {languages.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(106, 76, 255, 0.25)' : 'transparent',
                    border: isSelected ? '1px solid rgba(106, 76, 255, 0.4)' : '1px solid transparent',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: isSelected ? 700 : 500,
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                    <div>
                      <div style={{ color: '#fff' }}>{lang.name}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                        {lang.nativeName}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <span
                      className="material-symbols-rounded"
                      style={{ fontSize: '18px', color: '#a78bfa' }}
                    >
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
