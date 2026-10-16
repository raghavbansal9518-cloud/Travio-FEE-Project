import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

const FOOD_ITEMS = [
  {
    id: 'food-jaipur-dal-baati',
    name: 'Dal Baati Churma & Gatte ki Sabzi',
    destinationId: 'jaipur',
    destinationName: 'Jaipur, Rajasthan',
    flag: '🇮🇳',
    category: 'royal',
    type: 'Vegetarian',
    rating: 4.9,
    mustTryAt: 'LMB (Laxmi Mishtan Bhandar), Johari Bazaar',
    price: '₹450 for Thali',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    description: 'Crispy baked whole-wheat dumplings drenched in pure desi ghee, served with panchmel dal and sweet crushed churma.'
  },
  {
    id: 'food-goa-fish-curry',
    name: 'Authentic Goan Prawn & Fish Curry',
    destinationId: 'goa',
    destinationName: 'Goa',
    flag: '🇮🇳',
    category: 'coastal',
    type: 'Non-Vegetarian',
    rating: 4.9,
    mustTryAt: "Fisherman's Wharf & Martin's Corner, Betalbatim",
    price: '₹380',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    description: 'Tangy and spicy coconut milk gravy spiced with Kashmiri chilies, fresh kokum, and freshly caught Arabian Sea kingfish.'
  },
  {
    id: 'food-shimla-siddu',
    name: 'Himachali Siddu with Ghee & Dal',
    destinationId: 'shimla',
    destinationName: 'Shimla, Himachal Pradesh',
    flag: '🇮🇳',
    category: 'traditional',
    type: 'Vegetarian',
    rating: 4.8,
    mustTryAt: 'Cafe Simla Times & Himachali Rasoi, Mall Road',
    price: '₹180',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    description: 'Traditional steamed fermented wheat flour bun stuffed with roasted walnuts, poppy seeds, and pahadi spices served hot with molten ghee.'
  },
  {
    id: 'food-manali-trout',
    name: 'Tirthan Wood-Fired Himalayan Trout',
    destinationId: 'manali',
    destinationName: 'Manali, Himachal Pradesh',
    flag: '🇮🇳',
    category: 'traditional',
    type: 'Non-Vegetarian',
    rating: 4.9,
    mustTryAt: 'Johnson’s Cafe & Bar, Circuit House Road',
    price: '₹550',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    description: 'Fresh glacial river trout pan-seared with almonds, garlic lemon butter, and organic mountain herbs.'
  },
  {
    id: 'food-tokyo-ramen',
    name: 'Hakata Tonkotsu Chashu Ramen',
    destinationId: 'tokyo',
    destinationName: 'Tokyo',
    flag: '🇯🇵',
    category: 'street',
    type: 'Non-Vegetarian',
    rating: 5.0,
    mustTryAt: 'Ichiran Shibuya & Afuri Harajuku',
    price: '¥1,100 (~₹620)',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
    description: 'Rich, 18-hour slow simmered silky broth with handmade thin noodles, tender braised pork belly, and molten ajitsuke tamago egg.'
  },
  {
    id: 'food-swiss-fondue',
    name: 'Alpine Gruyère & Emmental Cheese Fondue',
    destinationId: 'switzerland',
    destinationName: 'Swiss Alps',
    flag: '🇨🇭',
    category: 'royal',
    type: 'Vegetarian',
    rating: 4.9,
    mustTryAt: 'Le Dézaley, Zurich & Whymper-Stube, Zermatt',
    price: 'CHF 32 (~₹2,900)',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&auto=format&fit=crop&q=80',
    description: 'Bubbling pot of aged Alpine cheeses infused with white wine and kirsch, dipped with rustic sourdough bread and baby potatoes.'
  },
  {
    id: 'food-bali-nasi-campur',
    name: 'Balinese Nasi Campur & Sate Lilit',
    destinationId: 'bali',
    destinationName: 'Bali',
    flag: '🇮🇩',
    category: 'street',
    type: 'Non-Vegetarian',
    rating: 4.8,
    mustTryAt: 'Warung Babi Guling Ibu Oka, Ubud',
    price: 'IDR 55,000 (~₹300)',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
    description: 'Fragrant steamed rice surrounded by spiced minced seafood satay on lemongrass skewers, urap vegetables, and fiery sambal matah.'
  },
  {
    id: 'food-jaipur-ghevar',
    name: 'Saffron Malai Ghevar',
    destinationId: 'jaipur',
    destinationName: 'Jaipur, Rajasthan',
    flag: '🇮🇳',
    category: 'dessert',
    type: 'Vegetarian (Sweet)',
    rating: 4.9,
    mustTryAt: 'Rawat Mishtan Bhandar & LMB, Station Road',
    price: '₹280 / piece',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80',
    description: 'Honeycomb-textured disc made of clarified ghee, soaked in saffron cardamom sugar syrup and crowned with thick reduced rabri and pistachios.'
  }
];

export default function FoodGuide() {
  const navigate = useNavigate();
  const { showToast } = useTravel();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [triedDishes, setTriedDishes] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All Dishes', icon: 'fa-utensils' },
    { id: 'royal', label: 'Royal & Feasts', icon: 'fa-crown' },
    { id: 'traditional', label: 'Mountain & Heritage', icon: 'fa-mountain' },
    { id: 'coastal', label: 'Coastal & Seafood', icon: 'fa-water' },
    { id: 'street', label: 'Street Food & Noodles', icon: 'fa-bowl-food' },
    { id: 'dessert', label: 'Artisanal Sweets', icon: 'fa-cake-candles' }
  ];

  const filteredFood = FOOD_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mustTryAt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleTried = (id, name) => {
    setTriedDishes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Unmarked "${name}" from food bucket list`, 'info');
      } else {
        next.add(id);
        showToast(`Marked "${name}" as Tried! 😋`, 'success');
      }
      return next;
    });
  };

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 5rem 0', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-dark)' }}>
        
        {/* Cinematic Header Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(244, 63, 94, 0.1) 50%, rgba(124, 58, 237, 0.08) 100%)', 
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
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
              flexShrink: 0
            }}>
              <span className="material-symbols-rounded" style={{ fontSize: '2.5rem', color: '#fff' }}>
                restaurant
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                  World Food & Culinary Guide
                </h1>
                <span style={{ 
                  background: 'rgba(245, 158, 11, 0.15)', 
                  color: '#fbbf24', 
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '4px 12px', 
                  borderRadius: '999px', 
                  fontSize: '13px', 
                  fontWeight: 700 
                }}>
                  {triedDishes.size} Tried
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '6px 0 0 0', fontSize: '1rem', maxWidth: '620px' }}>
                Taste the world's finest culinary treasures. Handpicked signature dishes and legendary restaurants.
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search dishes or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-dark)',
                padding: '11px 18px 11px 42px',
                borderRadius: '24px',
                fontSize: '13px',
                outline: 'none',
                minWidth: '260px'
              }}
            />
            <span className="material-symbols-rounded" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', color: 'var(--text-muted)' }}>
              search
            </span>
          </div>
        </div>

        <div style={{ padding: '0 5%' }}>
          
          {/* Category Pills */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            overflowX: 'auto', 
            paddingBottom: '1rem', 
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-color)'
          }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-muted)',
                  border: selectedCategory === cat.id ? 'none' : '1px solid var(--border-color)',
                  padding: '10px 18px',
                  borderRadius: '24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  boxShadow: selectedCategory === cat.id ? '0 4px 14px rgba(245, 158, 11, 0.3)' : 'none'
                }}
              >
                <i className={`fa-solid ${cat.icon}`}></i>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Food Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredFood.map((dish) => {
              const hasTried = triedDishes.has(dish.id);
              return (
                <div
                  key={dish.id}
                  className="destination-card"
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: 'var(--card-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80';
                      }}
                    />

                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
                      <span style={{
                        background: 'rgba(8, 12, 22, 0.8)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#fbbf24',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <i className="fa-solid fa-star"></i>
                        <span>{dish.rating}</span>
                      </span>

                      <span style={{
                        background: dish.type.includes('Vegetarian') ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)',
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#ffffff'
                      }}>
                        {dish.type}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleTried(dish.id, dish.name)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: hasTried ? '#10b981' : 'rgba(8, 12, 22, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        width: '38px',
                        height: '38px',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      title={hasTried ? 'Marked as Tried!' : 'Mark as Tried'}
                    >
                      <i className={`fa-solid ${hasTried ? 'fa-check' : 'fa-bookmark'}`}></i>
                    </button>

                    <div style={{ position: 'absolute', bottom: '10px', left: '12px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', color: '#fff', fontWeight: 600 }}>
                      {dish.flag} {dish.destinationName}
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: '1.3' }}>
                        {dish.name}
                      </h3>
                      <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {dish.description}
                      </p>
                      
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '8px 12px', fontSize: '12px' }}>
                        <span style={{ color: '#f59e0b', fontWeight: 700, marginRight: '4px' }}>📍 Must Try At:</span>
                        <span style={{ color: 'var(--text-dark)' }}>{dish.mustTryAt}</span>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 700 }}>
                        {dish.price}
                      </span>

                      <button
                        type="button"
                        onClick={() => navigate(`/destination/${dish.destinationId}`)}
                        style={{
                          background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Explore City</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
