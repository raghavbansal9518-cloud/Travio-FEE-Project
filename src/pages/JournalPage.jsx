import React, { useState } from 'react';
import Header from '../components/Header';
import { useTravel } from '../context/TravelContext';

const DEFAULT_JOURNALS = [
  {
    id: 'j-1',
    title: 'Sunrise over Rohtang Pass & Solang Valley',
    location: 'Manali, Himachal Pradesh',
    date: '14 Oct 2026',
    mood: 'Adventure 🏔️',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
    content: 'Woke up at 5:00 AM to catch the first golden rays illuminating the Pir Panjal ranges. The altitude chill was intense but the hot ginger chai from a local dhaba was unbeatable. Paragliding across the valley was the highlight of the week!'
  },
  {
    id: 'j-2',
    title: 'Midnight Lanterns & Yakitori in Omoide Yokocho',
    location: 'Tokyo, Japan',
    date: '08 Oct 2026',
    mood: 'Culinary 🍜',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    content: 'Hidden inside Shinjuku is this retro alleyway unchanged since the 1950s. Smoked charcoal aromas, sizzling chicken skewers, and friendly locals who shared their favorite sake recommendations with us.'
  },
  {
    id: 'j-3',
    title: 'Dolphin Watching & Secret Coves of Palolem',
    location: 'South Goa, India',
    date: '29 Sep 2026',
    mood: 'Relaxation 🌊',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
    content: 'Rented a wooden kayak early in the morning and paddled out into the calm Arabian Sea. Within twenty minutes, a pod of playful Indo-Pacific humpback dolphins breached beside our boat!'
  }
];

export default function JournalPage() {
  const { showToast } = useTravel();
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_journal_entries');
      return saved ? JSON.parse(saved) : DEFAULT_JOURNALS;
    } catch {
      return DEFAULT_JOURNALS;
    }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newMood, setNewMood] = useState('Wonder ✨');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast?.('Please fill out the journal title and content!', 'error');
      return;
    }

    const entry = {
      id: `j-${Date.now()}`,
      title: newTitle.trim(),
      location: newLocation.trim() || 'Undisclosed Oasis',
      date: newDate,
      mood: newMood,
      image: newImage.trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
      content: newContent.trim()
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem('travio_journal_entries', JSON.stringify(updated));
    } catch (err) {
      // ignore
    }

    showToast?.('Memory published to your travel journal! 📖', 'success');
    setShowAddModal(false);
    setNewTitle('');
    setNewLocation('');
    setNewContent('');
    setNewImage('');
  };

  const handleDelete = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem('travio_journal_entries', JSON.stringify(updated));
    } catch (err) {
      // ignore
    }
    showToast?.('Journal entry removed.', 'info');
  };

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 5rem 0', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-dark)' }}>
        
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(124, 58, 237, 0.12) 50%, rgba(56, 189, 248, 0.08) 100%)',
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
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(236, 72, 153, 0.35)',
              flexShrink: 0
            }}>
              <span className="material-symbols-rounded" style={{ fontSize: '2.5rem', color: '#fff' }}>
                menu_book
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                  Travel Journal & Memories
                </h1>
                <span style={{
                  background: 'rgba(236, 72, 153, 0.15)',
                  color: '#f472b6',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700
                }}>
                  {entries.length} Stories Preserved
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '6px 0 0 0', fontSize: '1rem', maxWidth: '620px' }}>
                Capture your wanderlust stories, secret scenic viewpoints, and unforgettable culinary discoveries.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(236, 72, 153, 0.4)'
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>add</span>
            New Journal Entry
          </button>
        </div>

        {/* Entries Grid */}
        <div style={{ padding: '0 5%', maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {entries.map(entry => (
              <div
                key={entry.id}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={entry.image}
                    alt={entry.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', color: '#fff', fontWeight: 600 }}>
                    {entry.mood}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    title="Delete Entry"
                    style={{ position: 'absolute', top: '14px', right: '14px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#f43f5e', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>delete</span>
                  </button>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span>📍 {entry.location}</span>
                    <span>🗓️ {entry.date}</span>
                  </div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.3 }}>
                    {entry.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
                    {entry.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for adding entry */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.98)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '540px', boxShadow: '0 24px 64px rgba(0,0,0,0.8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>Write Travel Memory</h2>
                <span className="material-symbols-rounded" style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setShowAddModal(false)}>close</span>
              </div>

              <form onSubmit={handleAddEntry} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Story Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Secret Sunset Viewpoint at Cabo de Rama"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Location</label>
                    <input
                      type="text"
                      placeholder="e.g. South Goa, India"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Mood / Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Peaceful Sunset 🌅"
                      value={newMood}
                      onChange={(e) => setNewMood(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Image URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Journal Entry</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what you experienced, what foods you tasted, what sights amazed you..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{ padding: '10px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '10px 22px', borderRadius: '10px', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Publish Memory
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
