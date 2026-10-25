import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';

const PRESET_LISTS = {
  beach: [
    { id: 'b1', text: 'Sunscreen SPF 50+ & Aloe Vera Gel', category: 'Essentials', checked: true },
    { id: 'b2', text: 'UV Protection Polarized Sunglasses', category: 'Accessories', checked: true },
    { id: 'b3', text: 'Breathable Linen Shirts & Shorts', category: 'Clothing', checked: false },
    { id: 'b4', text: 'Quick-dry Swimwear / Boardshorts', category: 'Clothing', checked: true },
    { id: 'b5', text: 'Waterproof Phone Pouch & Dry Bag', category: 'Gear', checked: false },
    { id: 'b6', text: 'Flip-flops & Beach Towel', category: 'Essentials', checked: true },
    { id: 'b7', text: 'Portable Power Bank (20,000mAh)', category: 'Electronics', checked: false }
  ],
  mountain: [
    { id: 'm1', text: 'Thermal Base Layers (Top & Bottom)', category: 'Clothing', checked: true },
    { id: 'm2', text: 'Down Jacket / Windproof Parka', category: 'Clothing', checked: true },
    { id: 'm3', text: 'High-Ankle Waterproof Trekking Boots', category: 'Gear', checked: false },
    { id: 'm4', text: 'Moisturizing Lip Balm & Cold Cream', category: 'Essentials', checked: true },
    { id: 'm5', text: 'Woolen Beanie, Gloves & Neck Warmer', category: 'Accessories', checked: false },
    { id: 'm6', text: 'High Altitude Sickness Meds (Diamox)', category: 'Medical', checked: false },
    { id: 'm7', text: 'Insulated Hot Water Thermos Flask', category: 'Gear', checked: true }
  ],
  city: [
    { id: 'c1', text: 'Universal International Plug Adapter', category: 'Electronics', checked: true },
    { id: 'c2', text: 'Comfortable Walking Sneakers', category: 'Clothing', checked: true },
    { id: 'c3', text: 'RFID-Blocking Slim Wallet / Passport Cover', category: 'Essentials', checked: false },
    { id: 'c4', text: 'Compact Folding Umbrella / Rain Shell', category: 'Accessories', checked: true },
    { id: 'c5', text: 'Noise-Cancelling Headphones for Flights', category: 'Electronics', checked: false },
    { id: 'c6', text: 'Hand Sanitizer & Disinfectant Wipes', category: 'Essentials', checked: true }
  ]
};

export default function PackingPage() {
  const { showToast } = useTravel();
  const { t } = useLanguage();
  const [profile, setProfile] = useState('beach');
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_packing_items');
      return saved ? JSON.parse(saved) : PRESET_LISTS.beach;
    } catch (e) {
      return PRESET_LISTS.beach;
    }
  });
  const [newItemText, setNewItemText] = useState('');
  const [newItemCat, setNewItemCat] = useState('Essentials');

  useEffect(() => {
    try {
      localStorage.setItem('travio_packing_items', JSON.stringify(items));
      window.dispatchEvent(new Event('travio_data_changed'));
    } catch (e) {}
  }, [items]);

  const handleProfileSwitch = (selectedProfile) => {
    setProfile(selectedProfile);
    setItems(PRESET_LISTS[selectedProfile] || PRESET_LISTS.beach);
    showToast(`Loaded ${selectedProfile.toUpperCase()} packing template!`, 'info');
  };

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed', 'info');
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem = {
      id: `custom-${Date.now()}`,
      text: newItemText.trim(),
      category: newItemCat,
      checked: false
    };
    setItems((prev) => [newItem, ...prev]);
    setNewItemText('');
    showToast(`Added "${newItem.text}" to checklist`, 'success');
  };

  const checkedCount = items.filter((i) => i.checked).length;
  const progressPercent = items.length === 0 ? 0 : Math.round((checkedCount / items.length) * 100);

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 5rem 0', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-dark)' }}>
        
        {/* Header Hero */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.12) 0%, rgba(56, 189, 248, 0.1) 50%, rgba(124, 58, 237, 0.08) 100%)', 
          padding: '3.5rem 5%', 
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
              flexShrink: 0
            }}>
              <span className="material-symbols-rounded" style={{ fontSize: '2.5rem', color: '#fff' }}>
                backpack
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                  {t('packing.title', 'Smart Packing Assistant')}
                </h1>
                <span style={{ 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  color: '#10b981', 
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '4px 12px', 
                  borderRadius: '999px', 
                  fontSize: '13px', 
                  fontWeight: 700 
                }}>
                  {progressPercent}% {t('packing.packed', 'Packed')}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '6px 0 0 0', fontSize: '1rem', maxWidth: '620px' }}>
                Never forget an essential. Dynamic packing checklist customized for tropical beaches, snowy peaks, or urban city stays.
              </p>
            </div>
          </div>

          {/* Quick Preset Selector */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '6px', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => handleProfileSwitch('beach')}
              style={{
                background: profile === 'beach' ? '#10b981' : 'none',
                color: profile === 'beach' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🏖️ {t('packing.beach', 'Tropical & Beach')}
            </button>
            <button
              onClick={() => handleProfileSwitch('mountain')}
              style={{
                background: profile === 'mountain' ? '#10b981' : 'none',
                color: profile === 'mountain' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ❄️ {t('packing.mountain', 'Mountains & Snow')}
            </button>
            <button
              onClick={() => handleProfileSwitch('city')}
              style={{
                background: profile === 'city' ? '#10b981' : 'none',
                color: profile === 'city' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🏙️ {t('packing.city', 'City & Culture')}
            </button>
          </div>
        </div>

        <div style={{ padding: '0 5%', maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Progress Bar Card */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>
                {t('phrases.Packing Readiness', 'Packing Readiness')}: {checkedCount} {t('phrases.of', 'of')} {items.length} {t('phrases.items packed', 'items packed')}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#10b981' }}>
                {progressPercent}%
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${progressPercent}%`, 
                  background: 'linear-gradient(90deg, #10b981 0%, #38bdf8 100%)', 
                  borderRadius: '4px',
                  transition: 'width 0.4s ease' 
                }} 
              />
            </div>
          </div>

          {/* Add Item Form */}
          <form onSubmit={addItem} style={{ display: 'flex', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder={t('phrases.Add personal gear or document...', 'Add personal gear or document...')}
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              style={{
                flex: '1 1 280px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-dark)',
                padding: '12px 18px',
                borderRadius: '14px',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <select
              value={newItemCat}
              onChange={(e) => setNewItemCat(e.target.value)}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-dark)',
                padding: '12px 16px',
                borderRadius: '14px',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="Essentials">{t('phrases.Essentials', 'Essentials')}</option>
              <option value="Clothing">{t('phrases.Clothing', 'Clothing')}</option>
              <option value="Electronics">{t('phrases.Electronics', 'Electronics')}</option>
              <option value="Gear">{t('phrases.Gear & Equipment', 'Gear & Equipment')}</option>
              <option value="Medical">{t('phrases.Medical', 'Medical')}</option>
              <option value="Accessories">{t('phrases.Accessories', 'Accessories')}</option>
            </select>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <span>{t('phrases.Add Item', '+ Add Item')}</span>
            </button>
          </form>

          {/* Checklist Container */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: item.checked ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid',
                    borderColor: item.checked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(item.id)}
                      style={{
                        accentColor: '#10b981',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                      }}
                    />
                    <div>
                      <span style={{
                        textDecoration: item.checked ? 'line-through' : 'none',
                        color: item.checked ? 'var(--text-muted)' : 'var(--text-dark)',
                        fontSize: '14px',
                        fontWeight: item.checked ? 400 : 600
                      }}>
                        {t(item.text, item.text)}
                      </span>
                      <span style={{
                        marginLeft: '10px',
                        fontSize: '11px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        color: 'var(--text-muted)'
                      }}>
                        {t(item.category, item.category)}
                      </span>
                    </div>
                  </label>

                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: '6px'
                    }}
                    title="Delete Item"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
