import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from './translationsData';

export { SUPPORTED_LANGUAGES, TRANSLATIONS };

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_language');
      // Ensure saved language is currently supported (and not deprecated like 'hi')
      if (saved && SUPPORTED_LANGUAGES.some((lang) => lang.code === saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const changeLanguage = (langCode) => {
    if (SUPPORTED_LANGUAGES.some((lang) => lang.code === langCode)) {
      setLanguage(langCode);
      try {
        localStorage.setItem('travio_language', langCode);
      } catch (err) {
        console.error('Failed to save language preference:', err);
      }
    }
  };

  /**
   * Safe universal translation getter function:
   * 1. Checks dot notation in active language (e.g. 'nav.home', 'dashboard.heroTitle')
   * 2. Checks phrase mapping in active language (e.g. 'Explore', 'Book Now')
   * 3. Checks direct top-level dictionary in active language
   * 4. Falls back to English dictionary (dot notation, phrase, or top-level)
   * 5. Returns provided fallback string or key itself
   */
  const t = (keyOrPhrase, fallback = '') => {
    if (!keyOrPhrase) return fallback;

    const currentLangDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    const fallbackLangDict = TRANSLATIONS.en;

    // 1. Check dot notation in current language
    if (typeof keyOrPhrase === 'string' && keyOrPhrase.includes('.')) {
      const parts = keyOrPhrase.split('.');
      let curr = currentLangDict;
      let found = true;
      for (const part of parts) {
        if (curr && typeof curr === 'object' && part in curr) {
          curr = curr[part];
        } else {
          found = false;
          break;
        }
      }
      if (found && typeof curr === 'string') return curr;

      // Check dot notation in English fallback
      let eng = fallbackLangDict;
      let engFound = true;
      for (const part of parts) {
        if (eng && typeof eng === 'object' && part in eng) {
          eng = eng[part];
        } else {
          engFound = false;
          break;
        }
      }
      if (engFound && typeof eng === 'string') return eng;
    }

    // 2. Check phrases dictionary in current language
    if (currentLangDict?.phrases && currentLangDict.phrases[keyOrPhrase]) {
      return currentLangDict.phrases[keyOrPhrase];
    }

    // 3. Case-insensitive phrase lookup in current language
    if (currentLangDict?.phrases && typeof keyOrPhrase === 'string') {
      const lower = keyOrPhrase.toLowerCase().trim();
      const matchedKey = Object.keys(currentLangDict.phrases).find(
        (k) => k.toLowerCase() === lower
      );
      if (matchedKey) return currentLangDict.phrases[matchedKey];
    }

    // 4. Direct top-level key in current language
    if (typeof currentLangDict?.[keyOrPhrase] === 'string') {
      return currentLangDict[keyOrPhrase];
    }

    // 5. English phrase dictionary fallback
    if (fallbackLangDict?.phrases && fallbackLangDict.phrases[keyOrPhrase]) {
      return fallbackLangDict.phrases[keyOrPhrase];
    }

    // 6. Return fallback or original key
    return fallback || keyOrPhrase;
  };

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage: language,
        currentLangObj,
        changeLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        translations: TRANSLATIONS
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
