import { useEffect, useState } from 'react';

export const PACKING_STORAGE_KEY = 'travio_packing_items';

export const PACKING_PRESETS = {
  beach: [
    { id: 'b1', text: 'Sunscreen SPF 50+ & Aloe Vera Gel', category: 'Essentials', checked: false },
    { id: 'b2', text: 'UV Protection Polarized Sunglasses', category: 'Accessories', checked: false },
    { id: 'b3', text: 'Breathable Linen Shirts & Shorts', category: 'Clothing', checked: false },
    { id: 'b4', text: 'Quick-dry Swimwear / Boardshorts', category: 'Clothing', checked: false },
    { id: 'b5', text: 'Waterproof Phone Pouch & Dry Bag', category: 'Gear', checked: false },
    { id: 'b6', text: 'Flip-flops & Beach Towel', category: 'Essentials', checked: false },
    { id: 'b7', text: 'Portable Power Bank (20,000mAh)', category: 'Electronics', checked: false }
  ],
  mountain: [
    { id: 'm1', text: 'Thermal Base Layers (Top & Bottom)', category: 'Clothing', checked: false },
    { id: 'm2', text: 'Down Jacket / Windproof Parka', category: 'Clothing', checked: false },
    { id: 'm3', text: 'High-Ankle Waterproof Trekking Boots', category: 'Gear', checked: false },
    { id: 'm4', text: 'Moisturizing Lip Balm & Cold Cream', category: 'Essentials', checked: false },
    { id: 'm5', text: 'Woolen Beanie, Gloves & Neck Warmer', category: 'Accessories', checked: false },
    { id: 'm6', text: 'High Altitude Sickness Meds (Diamox)', category: 'Medical', checked: false },
    { id: 'm7', text: 'Insulated Hot Water Thermos Flask', category: 'Gear', checked: false }
  ],
  city: [
    { id: 'c1', text: 'Universal International Plug Adapter', category: 'Electronics', checked: false },
    { id: 'c2', text: 'Comfortable Walking Sneakers', category: 'Clothing', checked: false },
    { id: 'c3', text: 'RFID-Blocking Slim Wallet / Passport Cover', category: 'Essentials', checked: false },
    { id: 'c4', text: 'Compact Folding Umbrella / Rain Shell', category: 'Accessories', checked: false },
    { id: 'c5', text: 'Noise-Cancelling Headphones for Flights', category: 'Electronics', checked: false },
    { id: 'c6', text: 'Hand Sanitizer & Disinfectant Wipes', category: 'Essentials', checked: false }
  ]
};

// Restore the shared checklist, falling back to the default template if invalid.
function loadPackingItems() {
  try {
    const saved = localStorage.getItem(PACKING_STORAGE_KEY);
    if (saved === null) return PACKING_PRESETS.beach;

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.some((item) => !item || typeof item !== 'object')) {
      throw new Error('Saved packing checklist has an unexpected format.');
    }
    return parsed;
  } catch (error) {
    console.error('Error loading packing checklist:', error);
    return PACKING_PRESETS.beach;
  }
}

// Keep every packing checklist surface synchronized through browser storage.
export function usePackingItems() {
  const [items, setItems] = useState(loadPackingItems);

  useEffect(() => {
    try {
      localStorage.setItem(PACKING_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event('travio_data_changed'));
    } catch (error) {
      console.error('Failed to sync packing checklist to storage:', error);
    }
  }, [items]);

  useEffect(() => {
    // Refresh this hook instance after another tab changes the checklist.
    const handleStorageChange = (event) => {
      if (event.key === PACKING_STORAGE_KEY) setItems(loadPackingItems());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return [items, setItems];
}
