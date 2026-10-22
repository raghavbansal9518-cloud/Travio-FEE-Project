import React, { createContext, useContext, useState, useEffect } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
];

export const TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      explore: 'Explore',
      wishlist: 'Wishlist',
      bookTrip: 'Book a Trip',
      myBookings: 'My Bookings',
      transport: 'Transport',
      geoWeather: 'GeoWeather',
      foodGuide: 'Food Guide',
      activities: 'Activities',
      packing: 'Packing',
      journal: 'Journal',
      badges: 'Badges',
      settings: 'Settings',
      admin: 'Admin Console',
      getPremium: 'Get Premium',
      needHelp: 'Need Help?',
      support: '24/7 Travel Support'
    },
    header: {
      searchPlaceholder: 'Search destinations...',
      notifications: 'Notifications',
      wishlist: 'Wishlist',
      profile: 'My Profile',
      logout: 'Logout',
      language: 'Language',
      selectLanguage: 'Choose Language'
    },
    common: {
      bookNow: 'Book Now',
      exploreMore: 'Explore More',
      viewDetails: 'View Details',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      back: 'Back',
      delete: 'Delete',
      status: 'Status',
      confirmed: 'Confirmed',
      cancelled: 'Cancelled',
      total: 'Total',
      price: 'Price',
      perPerson: 'per person',
      duration: 'Duration',
      departure: 'Departure',
      seats: 'Seats'
    },
    dashboard: {
      heroTitle: 'Discover Your Next Horizon',
      heroSubtitle: 'Plan seamless journeys, book top flights, explore curated destinations, and craft unforgettable memories.',
      searchWhere: 'Where do you want to go?',
      planTrip: 'Plan Trip',
      featuredDestinations: 'Featured Destinations',
      weatherForecast: 'Weather Forecast',
      packingAssistant: 'Packing Assistant',
      travelCalendar: 'Travel Calendar',
      upcomingBookings: 'Upcoming Bookings',
      viewAll: 'View All'
    },
    settings: {
      title: 'Account & Preferences',
      languagePref: 'Language & Regional',
      selectLang: 'Choose Interface Language',
      desc: 'Select your preferred language for navigation, destination guides, and ticket summaries.'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      explore: 'एक्सप्लोर',
      wishlist: 'विशलिस्ट',
      bookTrip: 'यात्रा बुक करें',
      myBookings: 'मेरी बुकिंग्स',
      transport: 'परिवहन',
      geoWeather: 'मौसम व भूगोल',
      foodGuide: 'खान-पान गाइड',
      activities: 'गतिविधियाँ',
      packing: 'पैकिंग सहायक',
      journal: 'यात्रा डायरी',
      badges: 'बैज व पदक',
      settings: 'सेटिंग्स',
      admin: 'एडमिन कंसोल',
      getPremium: 'प्रीमियम लें',
      needHelp: 'मदद चाहिए?',
      support: '24/7 यात्रा सहायता'
    },
    header: {
      searchPlaceholder: 'मंजिल या शहर खोजें...',
      notifications: 'सूचनाएं',
      wishlist: 'मनपसंद',
      profile: 'मेरी प्रोफाइल',
      logout: 'लॉग आउट',
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें'
    },
    common: {
      bookNow: 'अभी बुक करें',
      exploreMore: 'और देखें',
      viewDetails: 'विवरण देखें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      save: 'सहेजें',
      back: 'वापस',
      delete: 'हटाएं',
      status: 'स्थिति',
      confirmed: 'पुष्टीकृत',
      cancelled: 'रद्द',
      total: 'कुल',
      price: 'मूल्य',
      perPerson: 'प्रति व्यक्ति',
      duration: 'अवधि',
      departure: 'प्रस्थान',
      seats: 'सीटें'
    },
    dashboard: {
      heroTitle: 'अपनी अगली यात्रा की खोज करें',
      heroSubtitle: 'सहज यात्राओं की योजना बनाएं, शीर्ष उड़ानें बुक करें और अविस्मरणीय यादें संजोएं।',
      searchWhere: 'आप कहाँ जाना चाहते हैं?',
      planTrip: 'यात्रा योजना',
      featuredDestinations: 'प्रमुख गंतव्य',
      weatherForecast: 'मौसम पूर्वानुमान',
      packingAssistant: 'पैकिंग सहायक',
      travelCalendar: 'यात्रा कैलेंडर',
      upcomingBookings: 'आगामी यात्राएं',
      viewAll: 'सभी देखें'
    },
    settings: {
      title: 'खाता और प्राथमिकताएं',
      languagePref: 'भाषा और क्षेत्रीय प्राथमिकता',
      selectLang: 'इंटरफ़ेस भाषा चुनें',
      desc: 'नेविगेशन, यात्रा गाइड और टिकट विवरण के लिए अपनी पसंदीदा भाषा चुनें।'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      explore: 'Explorar',
      wishlist: 'Lista de Deseos',
      bookTrip: 'Reservar Viaje',
      myBookings: 'Mis Reservas',
      transport: 'Transporte',
      geoWeather: 'GeoClima',
      foodGuide: 'Guía Gastronómica',
      activities: 'Actividades',
      packing: 'Equipaje',
      journal: 'Diario de Viaje',
      badges: 'Insignias',
      settings: 'Configuración',
      admin: 'Panel Admin',
      getPremium: 'Obtener Premium',
      needHelp: '¿Necesitas Ayuda?',
      support: 'Soporte 24/7'
    },
    header: {
      searchPlaceholder: 'Buscar destinos...',
      notifications: 'Notificaciones',
      wishlist: 'Deseos',
      profile: 'Mi Perfil',
      logout: 'Cerrar Sesión',
      language: 'Idioma',
      selectLanguage: 'Elegir Idioma'
    },
    common: {
      bookNow: 'Reservar Ahora',
      exploreMore: 'Explorar Más',
      viewDetails: 'Ver Detalles',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Guardar',
      back: 'Volver',
      delete: 'Eliminar',
      status: 'Estado',
      confirmed: 'Confirmado',
      cancelled: 'Cancelado',
      total: 'Total',
      price: 'Precio',
      perPerson: 'por persona',
      duration: 'Duración',
      departure: 'Salida',
      seats: 'Asientos'
    },
    dashboard: {
      heroTitle: 'Descubre Tu Próximo Horizonte',
      heroSubtitle: 'Planifica viajes sin complicaciones, reserva vuelos de primer nivel y crea recuerdos inolvidables.',
      searchWhere: '¿A dónde quieres ir?',
      planTrip: 'Planificar Viaje',
      featuredDestinations: 'Destinos Destacados',
      weatherForecast: 'Pronóstico del Tiempo',
      packingAssistant: 'Asistente de Equipaje',
      travelCalendar: 'Calendario de Viaje',
      upcomingBookings: 'Próximas Reservas',
      viewAll: 'Ver Todo'
    },
    settings: {
      title: 'Cuenta y Preferencias',
      languagePref: 'Idioma y Región',
      selectLang: 'Elegir Idioma de Interfaz',
      desc: 'Selecciona tu idioma preferido para la navegación, guías y reservas.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      explore: 'Explorer',
      wishlist: 'Coups de Cœur',
      bookTrip: 'Réserver un Voyage',
      myBookings: 'Mes Réservations',
      transport: 'Transport',
      geoWeather: 'GéoMétéo',
      foodGuide: 'Guide Gourmand',
      activities: 'Activités',
      packing: 'Bagages',
      journal: 'Carnet de Route',
      badges: 'Badges',
      settings: 'Paramètres',
      admin: 'Console Admin',
      getPremium: 'Devenir Premium',
      needHelp: 'Besoin d\'Aide ?',
      support: 'Support Voyage 24/7'
    },
    header: {
      searchPlaceholder: 'Rechercher des destinations...',
      notifications: 'Notifications',
      wishlist: 'Favoris',
      profile: 'Mon Profil',
      logout: 'Déconnexion',
      language: 'Langue',
      selectLanguage: 'Choisir la Langue'
    },
    common: {
      bookNow: 'Réserver',
      exploreMore: 'Explorer Plus',
      viewDetails: 'Voir Détails',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      back: 'Retour',
      delete: 'Supprimer',
      status: 'Statut',
      confirmed: 'Confirmé',
      cancelled: 'Annulé',
      total: 'Total',
      price: 'Prix',
      perPerson: 'par personne',
      duration: 'Durée',
      departure: 'Départ',
      seats: 'Places'
    },
    dashboard: {
      heroTitle: 'Découvrez Votre Prochain Horizon',
      heroSubtitle: 'Planifiez des voyages sereins, réservez les meilleurs vols et créez des souvenirs inoubliables.',
      searchWhere: 'Où souhaitez-vous aller ?',
      planTrip: 'Planifier Voyage',
      featuredDestinations: 'Destinations Phares',
      weatherForecast: 'Prévisions Météo',
      packingAssistant: 'Assistant Valise',
      travelCalendar: 'Calendrier de Voyage',
      upcomingBookings: 'Réservations à Venir',
      viewAll: 'Voir Tout'
    },
    settings: {
      title: 'Compte & Préférences',
      languagePref: 'Langue & Région',
      selectLang: 'Choisir la Langue',
      desc: 'Sélectionnez votre langue préférée pour la navigation, les guides et vos billets.'
    }
  }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_language');
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const changeLanguage = (langCode) => {
    if (TRANSLATIONS[langCode]) {
      setLanguage(langCode);
      try {
        localStorage.setItem('travio_language', langCode);
      } catch (err) {
        console.error('Failed to save language preference:', err);
      }
    }
  };

  /**
   * Safe translation getter function supporting dot notation (e.g., 'nav.home')
   */
  const t = (key, fallback = '') => {
    if (!key) return fallback;
    const parts = key.split('.');
    
    // Check current language dictionary
    let curr = TRANSLATIONS[language];
    for (const part of parts) {
      if (curr && typeof curr === 'object' && part in curr) {
        curr = curr[part];
      } else {
        curr = null;
        break;
      }
    }

    if (curr && typeof curr === 'string') return curr;

    // Fallback to English dictionary if not found in current language
    let eng = TRANSLATIONS.en;
    for (const part of parts) {
      if (eng && typeof eng === 'object' && part in eng) {
        eng = eng[part];
      } else {
        eng = null;
        break;
      }
    }

    if (eng && typeof eng === 'string') return eng;

    // Fallback to provided fallback string or key itself
    return fallback || key;
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage: language,
        currentLangObj,
        changeLanguage,
        t,
        languages: SUPPORTED_LANGUAGES
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
