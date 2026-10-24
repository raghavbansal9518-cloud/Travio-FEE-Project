import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// --- Static Data ---
const initialItems = [
  { id: 1, text: 'Light Clothes', checked: true },
  { id: 2, text: 'Sunscreen', checked: true },
  { id: 3, text: 'Power Bank', checked: false },
  { id: 4, text: 'Travel Adapter', checked: true },
  { id: 5, text: 'Passport', checked: false },
];

const PackingAssistant = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <section className="packing-card" style={{ position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>{t('dashboard.packingAssistant', 'Packing Assistant')}</h2>
          <p style={{ fontSize: '0.85rem' }}>For Bali in August</p>
        </div>
        <span className="material-symbols-rounded" style={{ color: 'var(--accent-green)', fontSize: '2rem' }}>
          business_center
        </span>
      </header>
      
      <ul className="packing-preview" style={{ marginTop: '1.5rem', listStyle: 'none' }}>
        {items.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input 
              type="checkbox" 
              id={`packing-${item.id}`} 
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              style={{ accentColor: 'var(--accent-green)', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label 
              htmlFor={`packing-${item.id}`} 
              style={{ 
                cursor: 'pointer', 
                textDecoration: item.checked ? 'line-through' : 'none', 
                color: item.checked ? 'var(--text-muted)' : 'var(--text-dark)' 
              }}
            >
              {t(item.text, item.text)}
            </label>
          </li>
        ))}
      </ul>
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <a href="/packing" style={{ fontWeight: 600 }}>{t('common.viewAll', 'View Full List')}</a>
      </div>
    </section>
  );
};

export default PackingAssistant;
