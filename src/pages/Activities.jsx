import React, { useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

const ACTIVITIES_DATA = [
  {
    id: 'act-solang-paragliding',
    title: 'High Altitude Tandem Paragliding',
    destinationId: 'manali',
    destinationName: 'Manali, Himachal Pradesh',
    country: 'India',
    flag: '🇮🇳',
    category: 'adventure',
    duration: '1.5 Hours',
    difficulty: 'Thrilling',
    rating: 4.9,
    reviews: 640,
    price: 3200,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
    description: 'Soar 8,000+ feet above Solang Valley with certified pilots overlooking the snow-capped Pir Panjal peaks.'
  },
  {
    id: 'act-goa-scuba',
    title: 'Grand Island Scuba Diving & Dolphin Safari',
    destinationId: 'goa',
    destinationName: 'Goa',
    country: 'India',
    flag: '🇮🇳',
    category: 'water',
    duration: '5 Hours',
    difficulty: 'Moderate',
    rating: 4.8,
    reviews: 820,
    price: 2499,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    description: 'Explore vibrant coral reefs, sunken shipwrecks, and exotic Arabian Sea marine life with PADI certified divemasters.'
  },
  {
    id: 'act-shimla-heritage',
    title: 'British Era Ridge & Christ Church Heritage Walk',
    destinationId: 'shimla',
    destinationName: 'Shimla',
    country: 'India',
    flag: '🇮🇳',
    category: 'heritage',
    duration: '3 Hours',
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 430,
    price: 999,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80',
    description: 'Stroll through Neo-Gothic architecture, Gaiety Theatre, Viceregal Lodge, and colonial history of the Summer Capital.'
  },
  {
    id: 'act-jaipur-amber-fort',
    title: 'Amber Fort Private Jeep Safari & Royal Palace Tour',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    country: 'India',
    flag: '🇮🇳',
    category: 'heritage',
    duration: '4 Hours',
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 1120,
    price: 1850,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80',
    description: 'Skip the line access to Sheesh Mahal (Mirror Palace) and hilltop battlements of Maota Lake with a royal historian.'
  },
  {
    id: 'act-tokyo-food-safari',
    title: 'Shinjuku Omoide Yokocho & Ramen Night Food Crawl',
    destinationId: 'tokyo',
    destinationName: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    category: 'culinary',
    duration: '3.5 Hours',
    difficulty: 'Easy',
    rating: 5.0,
    reviews: 950,
    price: 5400,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    description: 'Trek through retro lantern-lit alleyways sampling authentic charcoal yakitori, handmade gyoza, and tonkotsu ramen.'
  },
  {
    id: 'act-bali-batur-trek',
    title: 'Mount Batur Sunrise Volcano Trek & Hot Springs',
    destinationId: 'bali',
    destinationName: 'Bali',
    country: 'Indonesia',
    flag: '🇮🇩',
    category: 'nature',
    duration: '6 Hours',
    difficulty: 'Moderate',
    rating: 4.9,
    reviews: 1400,
    price: 3600,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
    description: 'Hike to the 1,717m crater before dawn for breathtaking sunrise vistas over Lake Batur, ending in natural hot springs.'
  },
  {
    id: 'act-swiss-alps-ski',
    title: 'Zermatt Matterhorn Glacier Alpine Skiing',
    destinationId: 'switzerland',
    destinationName: 'Zermatt, Alps',
    country: 'Switzerland',
    flag: '🇨🇭',
    category: 'adventure',
    duration: 'Full Day',
    difficulty: 'Thrilling',
    rating: 4.9,
    reviews: 580,
    price: 12500,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=800&auto=format&fit=crop&q=80',
    description: 'Glide down 360km of pristine groomed slopes facing the world-famous pyramid peak of the Matterhorn.'
  },
  {
    id: 'act-maldives-snorkeling',
    title: 'South Ari Atoll Whale Shark & Manta Ray Snorkel',
    destinationId: 'maldives',
    destinationName: 'Ari Atoll',
    country: 'Maldives',
    flag: '🇲🇻',
    category: 'water',
    duration: '4 Hours',
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 730,
    price: 6800,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop&q=80',
    description: 'Swim alongside gentle ocean giants in crystal turquoise lagoons with high-definition underwater photography.'
  }
];

export default function Activities() {
  const navigate = useNavigate();
  const { addBooking, showToast } = useTravel();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedActivities, setBookedActivities] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All Activities', icon: 'fa-earth-asia' },
    { id: 'adventure', label: 'Adventure Sports', icon: 'fa-person-snowboarding' },
    { id: 'water', label: 'Water & Marine', icon: 'fa-water' },
    { id: 'heritage', label: 'Heritage & Walks', icon: 'fa-landmark-dome' },
    { id: 'nature', label: 'Nature & Trekking', icon: 'fa-mountain-sun' },
    { id: 'culinary', label: 'Culinary & Nightlife', icon: 'fa-utensils' }
  ];

  const filteredActivities = ACTIVITIES_DATA.filter((act) => {
    const matchesCategory = activeCategory === 'all' || act.category === activeCategory;
    const matchesSearch = !searchQuery.trim() || 
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookActivity = (activity) => {
    setBookedActivities((prev) => new Set(prev).add(activity.id));
    const newBooking = {
      id: `TRV-ACT-${Date.now().toString(36).toUpperCase()}`,
      type: 'EXPERIENCE',
      title: activity.title,
      carrier: 'Travio VIP Experiences',
      origin: activity.destinationName,
      destinationName: activity.destinationName,
      destinationCountry: `${activity.destinationName}, ${activity.country}`,
      destinationFlag: activity.flag || '🎟️',
      destinationImage: activity.image,
      departureDate: new Date().toISOString().split('T')[0],
      time: `${activity.duration} • VIP Session`,
      duration: activity.duration,
      durationDays: 1,
      travelers: 1,
      seats: 'VIP All-Access Pass',
      travelStyle: 'EXPERIENCE',
      totalCost: activity.price,
      specialNotes: `${activity.difficulty} Activity • ${activity.rating} ★ Rating (${activity.reviews} reviews)`,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    addBooking(newBooking);
    showToast(`Booked: "${activity.title}" for ₹${activity.price.toLocaleString('en-IN')}! Saved to My Bookings 🎟️`, 'success');
  };

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 5rem 0', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-dark)' }}>
        
        {/* Cinematic Header Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(124, 58, 237, 0.08) 100%)', 
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
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
              flexShrink: 0
            }}>
              <span className="material-symbols-rounded" style={{ fontSize: '2.5rem', color: '#fff' }}>
                hiking
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                  Activities & Experiences
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
                  {ACTIVITIES_DATA.length} Curated Experiences
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '6px 0 0 0', fontSize: '1rem', maxWidth: '620px' }}>
                From paragliding in Solang Valley to scuba diving in Goa and Tokyo culinary safaris.
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search adventures or destinations..."
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
          
          {/* Category Filter Pills Bar */}
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
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeCategory === cat.id ? '#ffffff' : 'var(--text-muted)',
                  border: activeCategory === cat.id ? 'none' : '1px solid var(--border-color)',
                  padding: '10px 18px',
                  borderRadius: '24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === cat.id ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none'
                }}
              >
                <i className={`fa-solid ${cat.icon}`}></i>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          {filteredActivities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-muted)' }}>
              <span className="material-symbols-rounded" style={{ fontSize: '3rem' }}>explore_off</span>
              <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>No activities match "{searchQuery}"</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                style={{ marginTop: '10px', background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 600 }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {filteredActivities.map((act) => {
                const isBooked = bookedActivities.has(act.id);
                return (
                  <div
                    key={act.id}
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
                    {/* Media Thumbnail */}
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                      <img
                        src={act.image}
                        alt={act.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                          <span>{act.rating} ({act.reviews})</span>
                        </span>

                        <span style={{
                          background: 'rgba(8, 12, 22, 0.8)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 10px',
                          borderRadius: '16px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#38bdf8',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          {act.difficulty}
                        </span>
                      </div>

                      <div style={{ position: 'absolute', bottom: '10px', left: '12px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', color: '#fff', fontWeight: 600 }}>
                        <i className="fa-solid fa-clock" style={{ marginRight: '6px', color: '#38bdf8' }}></i>
                        {act.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          <span>{act.flag}</span>
                          <span>{act.destinationName}</span>
                        </div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: '1.3' }}>
                          {act.title}
                        </h3>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                          {act.description}
                        </p>
                      </div>

                      {/* Pricing & Booking Footer */}
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Price per person</span>
                          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>
                            ₹{act.price.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => navigate(`/destination/${act.destinationId}`)}
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: 'var(--text-dark)',
                              border: '1px solid var(--border-color)',
                              padding: '8px 12px',
                              borderRadius: '10px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                            title="View Destination Details"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleBookActivity(act)}
                            disabled={isBooked}
                            style={{
                              background: isBooked ? 'rgba(16, 185, 129, 0.2)' : 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                              color: isBooked ? '#10b981' : '#ffffff',
                              border: isBooked ? '1px solid rgba(16, 185, 129, 0.4)' : 'none',
                              padding: '8px 16px',
                              borderRadius: '10px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: isBooked ? 'default' : 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <i className={`fa-solid ${isBooked ? 'fa-check' : 'fa-calendar-check'}`}></i>
                            <span>{isBooked ? 'Booked' : 'Book Now'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
