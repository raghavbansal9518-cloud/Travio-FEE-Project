// ========================================================
// TRAVIO — USER PROFILE & AUTHENTICATION SERVICE (FRONTEND DEMO)
// Manages multi-user demo accounts, per-user profiles, cute avatars,
// and simulated password reset in localStorage.
// ========================================================

// Safe browser / Node localStorage accessor
const memoryStore = new Map();
const safeStorage = {
  getItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        let val = window.localStorage.getItem(key);
        if (val && typeof val === 'string' && val.includes('Raghav Verma')) {
          val = val.replace(/Raghav Verma/g, 'Raghav Bansal');
          try { window.localStorage.setItem(key, val); } catch (e) {}
        }
        return val;
      }
    } catch {
      // fallback
    }
    const memVal = memoryStore.get(key) || null;
    if (memVal && typeof memVal === 'string' && memVal.includes('Raghav Verma')) {
      return memVal.replace(/Raghav Verma/g, 'Raghav Bansal');
    }
    return memVal;
  },
  setItem(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // fallback
    }
    memoryStore.set(key, String(value));
  },
  removeItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // fallback
    }
    memoryStore.delete(key);
  }
};

// Auto-migrate legacy stored name
function migrateLegacyStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key) continue;
      const val = window.localStorage.getItem(key);
      if (val && typeof val === 'string' && val.includes('Raghav Verma')) {
        window.localStorage.setItem(key, val.replace(/Raghav Verma/g, 'Raghav Bansal'));
      }
    }
  } catch (e) {
    // ignore
  }
}
migrateLegacyStorage();

const ACCOUNTS_STORAGE_KEY = 'travio_accounts';
const ACTIVE_PROFILE_KEY = 'travio_user_profile';
const PROFILE_PREFIX = 'travio_profile_';

// Default Demo Accounts
export const DEFAULT_ACCOUNTS = [
  {
    id: 'user_aarav',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    password: 'password123',
    role: 'user',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    memberSince: 'Apr 2025',
    tagline: 'New places. Same me, happier. ✈',
    preferredSeat: 'Window Seat',
    preferredClass: 'Economy',
    currency: 'INR (₹)',
    language: 'English',
    darkMode: true,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    tripsCount: 12,
    destinationsCount: 8,
    badgesCount: 4
  },
  {
    id: 'user_raghav',
    name: 'Raghav Bansal',
    email: 'raghav@travio.io',
    password: 'password123',
    role: 'user',
    phone: '',
    location: '',
    memberSince: 'Jan 2024',
    tagline: '',
    preferredSeat: 'Window Seat',
    preferredClass: 'Economy',
    currency: 'INR (₹)',
    language: 'English',
    darkMode: true,
    avatar: '',
    tripsCount: 0,
    destinationsCount: 0,
    badgesCount: 0
  }
];

// Predefined cute cartoon, animal, and flower avatars (NO real person photos)
export const PRESET_AVATARS = [
  {
    id: 'avatar_cute_panda',
    label: 'Cute Panda Traveler',
    category: 'animal',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=PandaTraveler&backgroundColor=b6e3f4'
  },
  {
    id: 'avatar_cute_fox',
    label: 'Little Fox Explorer',
    category: 'animal',
    url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=ffd5dc'
  },
  {
    id: 'avatar_cute_cat',
    label: 'Whiskers Kitten',
    category: 'animal',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=WhiskersKitty&backgroundColor=d1d4f9'
  },
  {
    id: 'avatar_cute_bunny',
    label: 'Playful Bunny',
    category: 'animal',
    url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bubba&backgroundColor=c0aede'
  },
  {
    id: 'avatar_cute_sunflower',
    label: 'Golden Sunflower',
    category: 'flower',
    url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar_cute_blossom',
    label: 'Cherry Blossom',
    category: 'flower',
    url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&auto=format&fit=crop&q=80'
  }
];

/**
 * Normalizes email address for consistent dictionary keys
 */
export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

/**
 * Loads all stored demo accounts from safeStorage or initial defaults
 */
export function getAllAccounts() {
  try {
    const raw = safeStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      safeStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return [...DEFAULT_ACCOUNTS];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_ACCOUNTS];
  } catch {
    return [...DEFAULT_ACCOUNTS];
  }
}

/**
 * Saves all accounts list to safeStorage
 */
function saveAllAccounts(accounts) {
  try {
    safeStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.warn('Failed to save accounts:', err);
  }
}

/**
 * Finds an account by email
 */
export function getAccountByEmail(email) {
  const norm = normalizeEmail(email);
  if (!norm) return null;
  const accounts = getAllAccounts();
  return accounts.find((a) => normalizeEmail(a.email) === norm) || null;
}

/**
 * Generates 1-2 uppercase initials from a user's name
 */
export function getInitials(name) {
  if (!name) return 'TR';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Loads a user's profile by email
 */
export function getProfileByEmail(email) {
  const norm = normalizeEmail(email);
  if (!norm) return null;

  try {
    // 1. Check user-specific safeStorage key
    const userSpecificKey = `${PROFILE_PREFIX}${norm}`;
    const saved = safeStorage.getItem(userSpecificKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && (parsed.name === 'Raghav Verma' || (norm === 'raghav@travio.io' && parsed.name?.includes('Verma')))) {
        parsed.name = 'Raghav Bansal';
        try { safeStorage.setItem(userSpecificKey, JSON.stringify(parsed)); } catch (e) {}
      }
      return parsed;
    }

    // 2. Fall back to account data
    const account = getAccountByEmail(norm);
    if (account) {
      const initialProfile = {
        name: account.name,
        email: account.email,
        phone: account.phone || '',
        location: account.location || '',
        memberSince: account.memberSince || 'Oct 2026',
        tagline: account.tagline || '',
        preferredSeat: account.preferredSeat || 'Window Seat',
        preferredClass: account.preferredClass || 'Economy',
        currency: account.currency || 'INR (₹)',
        language: account.language || 'English',
        darkMode: account.darkMode !== false,
        avatar: account.avatar || '',
        tripsCount: account.tripsCount || 0,
        destinationsCount: account.destinationsCount || 0,
        badgesCount: account.badgesCount || 0
      };
      safeStorage.setItem(userSpecificKey, JSON.stringify(initialProfile));
      return initialProfile;
    }
  } catch (err) {
    console.warn('Error reading user profile:', err);
  }

  return null;
}

/**
 * Gets the currently logged-in user profile
 */
export function getCurrentUser() {
  try {
    const authEmail = safeStorage.getItem('auth_email');
    if (authEmail) {
      const profile = getProfileByEmail(authEmail);
      if (profile) {
        if (profile.name === 'Raghav Verma' || (profile.email && profile.email.toLowerCase() === 'raghav@travio.io')) {
          profile.name = 'Raghav Bansal';
        }
        return profile;
      }
    }

    // Check fallback active profile
    const rawActive = safeStorage.getItem(ACTIVE_PROFILE_KEY);
    if (rawActive) {
      const parsed = JSON.parse(rawActive);
      if (parsed && parsed.email) {
        if (parsed.name === 'Raghav Verma' || (parsed.email && parsed.email.toLowerCase() === 'raghav@travio.io')) {
          parsed.name = 'Raghav Bansal';
        }
        return parsed;
      }
    }

    // Default to Aarav if none logged in yet
    return getProfileByEmail('aarav.sharma@example.com') || DEFAULT_ACCOUNTS[0];
  } catch {
    return DEFAULT_ACCOUNTS[0];
  }
}

/**
 * Saves profile changes for the active or given user without overwriting other users
 */
export function saveUserProfile(updatedFields) {
  try {
    const current = getCurrentUser();
    const email = normalizeEmail(updatedFields.email || current?.email);
    if (!email) return false;

    const userSpecificKey = `${PROFILE_PREFIX}${email}`;
    const existing = getProfileByEmail(email) || {};
    const merged = { ...existing, ...updatedFields, email };

    // 1. Save to user-specific profile key
    safeStorage.setItem(userSpecificKey, JSON.stringify(merged));

    // 2. Update active profile key for legacy components
    safeStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(merged));

    // 3. Update account record if name or phone changed
    const accounts = getAllAccounts();
    const accIndex = accounts.findIndex((a) => normalizeEmail(a.email) === email);
    if (accIndex !== -1) {
      accounts[accIndex] = {
        ...accounts[accIndex],
        name: merged.name || accounts[accIndex].name,
        phone: merged.phone || accounts[accIndex].phone,
        location: merged.location || accounts[accIndex].location,
        avatar: merged.avatar || accounts[accIndex].avatar
      };
      saveAllAccounts(accounts);
    }

    // 4. Notify app of profile update
    notifyProfileChanged(merged);
    return true;
  } catch (err) {
    console.error('Failed to save user profile:', err);
    return false;
  }
}

/**
 * Logs in a user, setting active session and loading their profile
 */
export function loginUser(email, password) {
  const norm = normalizeEmail(email);
  const account = getAccountByEmail(norm);

  if (!account) {
    // Dynamic login for user-entered details: If email is valid and password length >= 4
    if (norm.includes('@') && password && password.length >= 4) {
      const newAccount = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: norm,
        password,
        role: norm.includes('admin') ? 'admin' : 'user',
        phone: '', // Clean: only user can fill this
        location: '', // Clean: only user can fill this
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        tagline: '', // Clean: only user can fill this
        preferredSeat: 'Window Seat',
        preferredClass: 'Economy',
        currency: 'INR (₹)',
        language: 'English',
        darkMode: true,
        avatar: '',
        tripsCount: 0,
        destinationsCount: 0,
        badgesCount: 0
      };
      const accounts = getAllAccounts();
      accounts.push(newAccount);
      saveAllAccounts(accounts);
      return activateUserSession(newAccount);
    }
    return { success: false, error: 'No account found with this email. Please check or sign up.' };
  }

  if (account.password !== password) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  return activateUserSession(account);
}

/**
 * Activates session for user account
 */
function activateUserSession(account) {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem('travio_logged_out');
    }
    safeStorage.setItem('auth_email', account.email);
    safeStorage.setItem('auth_role', account.role || 'user');
    safeStorage.setItem('auth_password', account.password);

    // Load or initialize their profile
    const profile = getProfileByEmail(account.email);
    safeStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(profile));

    notifyProfileChanged(profile);
    return { success: true, user: profile };
  } catch (err) {
    return { success: false, error: 'Failed to initialize session in browser.' };
  }
}

/**
 * Registers a new demo account with its own independent profile
 */
export function registerUser({ firstName, lastName, email, password }) {
  const norm = normalizeEmail(email);
  if (!norm || !norm.includes('@')) {
    return { success: false, error: 'A valid email address is required.' };
  }

  const existing = getAccountByEmail(norm);
  if (existing) {
    return { success: false, error: 'An account with this email already exists. Please log in.' };
  }

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
  const newAccount = {
    id: `user_${Date.now()}`,
    name: fullName,
    email: norm,
    password,
    role: norm.includes('admin') ? 'admin' : 'user',
    phone: '', // Clean: user enters in profile
    location: '', // Clean: user enters in profile
    memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    tagline: '', // Clean: user enters in profile
    preferredSeat: 'Window Seat',
    preferredClass: 'Economy',
    currency: 'INR (₹)',
    language: 'English',
    darkMode: true,
    avatar: '',
    tripsCount: 0,
    destinationsCount: 0,
    badgesCount: 0
  };

  const accounts = getAllAccounts();
  accounts.push(newAccount);
  saveAllAccounts(accounts);

  return activateUserSession(newAccount);
}

/**
 * Resets a user password (demo simulated flow)
 */
export function resetPassword(email, newPassword) {
  const norm = normalizeEmail(email);
  if (!norm) return { success: false, error: 'Please enter your registered email address.' };

  const accounts = getAllAccounts();
  const accIndex = accounts.findIndex((a) => normalizeEmail(a.email) === norm);

  if (accIndex === -1) {
    return {
      success: false,
      error: 'We could not find an account with this email address. Please register or verify the spelling.'
    };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  // Update account password
  accounts[accIndex].password = newPassword;
  saveAllAccounts(accounts);

  // If this user was logged in, update auth_password
  const currentEmail = normalizeEmail(safeStorage.getItem('auth_email'));
  if (currentEmail === norm) {
    safeStorage.setItem('auth_password', newPassword);
  }

  return {
    success: true,
    message: `Password updated successfully for ${accounts[accIndex].name}! You can now log in.`
  };
}

/**
 * Logs out the current user and clears active session
 */
export function logoutCurrentUser() {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('travio_logged_out', 'true');
    }
    safeStorage.removeItem('auth_email');
    safeStorage.removeItem('auth_role');
    safeStorage.removeItem('auth_password');
    safeStorage.removeItem(ACTIVE_PROFILE_KEY);
    notifyProfileChanged(null);
  } catch (err) {
    console.warn('Error during logout:', err);
  }
}

/**
 * Emits custom event to notify all components of profile or auth changes
 */
function notifyProfileChanged(profile) {
  try {
    window.dispatchEvent(new CustomEvent('travio_profile_updated', { detail: profile }));
  } catch {
    // ignore
  }
}
