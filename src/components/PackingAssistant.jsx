import { useState } from 'react';

// --- Static Data ---
// A mock list of packing items to start with
const initialItems = [
  { id: 1, text: 'Light Clothes', checked: true },
  { id: 2, text: 'Sunscreen', checked: true },
  { id: 3, text: 'Power Bank', checked: false },
  { id: 4, text: 'Travel Adapter', checked: true },
  { id: 5, text: 'Passport', checked: false },
];

const PackingAssistant = () => {
  // --- State ---
  // Hold the current list of packing items
  const [items, setItems] = useState(initialItems);

  // --- Handlers ---
  // Flips the 'checked' boolean for a specific item when clicked
  const toggleItem = (id) => {
    setItems(items.map(item => 
      // If this is the item we clicked, return a copy of it with the toggled checked state
      // Otherwise, just return the item as it is
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <section className="packing-card" style={{ position: 'relative' }}>
      
      {/* --- Card Header --- */}
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Packing Assistant</h2>
          <p style={{ fontSize: '0.85rem' }}>For Bali in August</p>
        </div>
        {/* Suitcase icon */}
        <span className="material-symbols-rounded" style={{ color: 'var(--accent-green)', fontSize: '2rem' }}>
          business_center
        </span>
      </header>
      
      {/* --- Packing List --- */}
      <ul className="packing-preview" style={{ marginTop: '1.5rem', listStyle: 'none' }}>
        {/* Loop through our state array to render each checklist item */}
        {items.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            
            {/* The Checkbox */}
            <input 
              type="checkbox" 
              id={packing-${item.id}} 
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              style={{ accentColor: 'var(--accent-green)', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            
            {/* The Text Label - gets a strikethrough effect if checked */}
            <label 
              htmlFor={packing-${item.id}} 
              style={{ 
                cursor: 'pointer', 
                textDecoration: item.checked ? 'line-through' : 'none', 
                color: item.checked ? 'var(--text-muted)' : 'var(--text-dark)' 
              }}
            >
              {item.text}
            </label>
          </li>
        ))}
      </ul>
      
      {/* --- Footer Link --- */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <a href="/packing" style={{ fontWeight: 600 }}>View Full List</a>
      </div>
    </section>
  );
};

export default PackingAssistant;