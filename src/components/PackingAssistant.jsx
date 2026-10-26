import { useLanguage } from '../context/LanguageContext';
import { usePackingItems } from '../services/packingService';

// Show a compact checklist preview backed by the shared packing state.
const PackingAssistant = () => {
  const { t } = useLanguage();
  const [items, setItems] = usePackingItems();

  // Toggle one checklist entry without mutating the shared array.
  const toggleItem = (id) => {
    setItems((previousItems) => previousItems.map(item =>
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
        {items.slice(0, 5).map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input 
              type="checkbox" 
              id={`dashboard-packing-${item.id}`}
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              style={{ accentColor: 'var(--accent-green)', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label 
              htmlFor={`dashboard-packing-${item.id}`}
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
