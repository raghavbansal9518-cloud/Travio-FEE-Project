/**
 * Date and Real-Time Utility Helpers for TRAVIO
 * Generates local dynamic current dates & times so bookings always show
 * live schedules starting from the present moment onwards.
 */

export const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getFutureDate = (daysAhead = 6, baseDateStr = null) => {
  const base = baseDateStr ? new Date(baseDateStr) : new Date();
  const d = isNaN(base.getTime()) ? new Date() : new Date(base);
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-');
    if (year && month && day) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIdx = parseInt(month, 10) - 1;
      return `${parseInt(day, 10)} ${months[monthIdx] || month} ${year}`;
    }
  } catch {
    // fallback
  }
  return dateStr;
};

export const isToday = (dateStr) => {
  if (!dateStr) return true;
  return dateStr === getTodayDate();
};

/**
 * Get current local time in 24-hour HH:MM format (e.g. "18:05")
 */
export const getCurrentTime24 = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Get current local time in 12-hour format with AM/PM (e.g. "06:05 PM")
 */
export const getCurrentTime12 = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 hour is 12
  const hoursStr = String(hours).padStart(2, '0');
  return `${hoursStr}:${minutes} ${ampm}`;
};

/**
 * Convert HH:MM or HH:MM AM/PM string to minutes from start of day
 */
export const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const clean = timeStr.trim().toUpperCase();
  const is12Hour = clean.includes('AM') || clean.includes('PM');

  if (is12Hour) {
    const isPM = clean.includes('PM');
    const timePart = clean.replace(/AM|PM/g, '').trim();
    const [hStr, mStr] = timePart.split(':');
    let h = parseInt(hStr || '0', 10);
    const m = parseInt(mStr || '0', 10);
    if (isPM && h !== 12) h += 12;
    if (!isPM && h === 12) h = 0;
    return h * 60 + m;
  } else {
    const [hStr, mStr] = clean.split(':');
    const h = parseInt(hStr || '0', 10);
    const m = parseInt(mStr || '0', 10);
    return h * 60 + m;
  }
};

/**
 * Convert minutes from midnight back to 24h "HH:MM"
 */
export const minutesToTime24 = (totalMinutes) => {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

/**
 * Convert minutes from midnight to 12h "hh:mm AM/PM"
 */
export const minutesToTime12 = (totalMinutes) => {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  let h = Math.floor(normalized / 60);
  const m = normalized % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
};

/**
 * Calculate arrival time by adding duration (e.g. "2h 15m") to departure time ("HH:MM")
 */
export const calculateArrivalTime = (depTimeStr, durationStr) => {
  const depMins = timeToMinutes(depTimeStr);
  let durMins = 120; // fallback 2 hours
  if (durationStr) {
    const hMatch = durationStr.match(/(\d+)\s*h/i);
    const mMatch = durationStr.match(/(\d+)\s*m/i);
    const h = hMatch ? parseInt(hMatch[1], 10) : 0;
    const m = mMatch ? parseInt(mMatch[1], 10) : 0;
    durMins = h * 60 + m;
    if (durMins === 0) durMins = 135;
  }

  const arrMins = depMins + durMins;
  const time24 = minutesToTime24(arrMins);
  if (arrMins >= 1440) {
    return `${time24} (+1 day)`;
  }
  return time24;
};

/**
 * Generate sequential departure slots strictly from current time onwards
 * @param {number} count Number of slots to generate
 * @param {number} minBufferMinutes Minimum minutes from right now for first slot
 * @param {number} intervalMinutes Spacing between slots
 */
export const getNextAvailableTransportTimes = (count = 4, minBufferMinutes = 35, intervalMinutes = 90) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const firstSlotMinutes = currentMinutes + minBufferMinutes;

  // Round up to nearest 5 minutes
  const roundedFirst = Math.ceil(firstSlotMinutes / 5) * 5;

  const slots = [];
  for (let i = 0; i < count; i++) {
    const slotMins = roundedFirst + i * intervalMinutes;
    slots.push(minutesToTime24(slotMins));
  }
  return slots;
};

/**
 * Computes a live status badge object for a departure time
 * e.g., "Boarding in 45m", "Departs in 2h 10m", or "Scheduled"
 */
export const getTimeStatusBadge = (depTimeStr, dateStr = getTodayDate()) => {
  if (!isToday(dateStr)) {
    return {
      isPast: false,
      isUrgent: false,
      label: `Scheduled ${formatDisplayDate(dateStr)}`,
      diffMinutes: 9999
    };
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const depMinutes = timeToMinutes(depTimeStr);
  const diff = depMinutes - currentMinutes;

  if (diff < -30) {
    return {
      isPast: true,
      isUrgent: false,
      label: 'Departed',
      diffMinutes: diff
    };
  }

  if (diff < 0) {
    return {
      isPast: true,
      isUrgent: true,
      label: 'Boarding Closed (Taxiing)',
      diffMinutes: diff
    };
  }

  if (diff <= 45) {
    return {
      isPast: false,
      isUrgent: true,
      label: `Boarding in ${diff}m • Final Call`,
      diffMinutes: diff
    };
  }

  if (diff <= 120) {
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return {
      isPast: false,
      isUrgent: false,
      label: `Departs in ${h > 0 ? `${h}h ` : ''}${m}m`,
      diffMinutes: diff
    };
  }

  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return {
    isPast: false,
    isUrgent: false,
    label: `Departs in ${h}h ${m > 0 ? `${m}m` : ''} today`,
    diffMinutes: diff
  };
};

/**
 * Gets nearest available cab pickup time from current time (e.g. 15-20 min buffer)
 */
export const getNearestPickupTime = (bufferMinutes = 15, roundToMinutes = 15) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const target = currentMinutes + bufferMinutes;
  const rounded = Math.ceil(target / roundToMinutes) * roundToMinutes;
  return minutesToTime24(rounded);
};
