import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import BadgeArtwork from '../components/BadgeArtwork';
import { useTravel } from '../context/TravelContext';
import { DESTINATIONS } from '../data/destinationsData';
import {
  BADGE_DEFINITIONS,
  calculateBadgeProgress,
  loadBadgeAchievements,
  recordBadgeUnlocks
} from '../services/badgeService';
import './BadgesPage.css';

const FILTERS = [
  { id: 'all', label: 'All Badges' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'activities', label: 'Activities' },
  { id: 'exploration', label: 'Exploration' },
  { id: 'special', label: 'Special' },
  { id: 'milestones', label: 'Milestones' }
];

const BADGE_TIPS = {
  'mountain-explorer': ['Add completed mountain getaways to your trips or journal.', 'Use the destination status control to mark a place as visited.'],
  'city-wanderer': ['Record completed city trips in your travel journal.', 'Distinct destinations count once toward this badge.'],
  'beach-lover': ['Mark visited coastal destinations in your saved trips.', 'Your completed bookings and trip journals count as visit evidence.'],
  'cultural-traveller': ['Record visits to heritage districts, temples, and historic landmarks.', 'Add the destination and date to a trip journal.'],
  'first-adventure': ['Add a completed journey to your bookings or save a trip journal.', 'Upcoming bookings do not count as completed trips.'],
  'global-explorer': ['Record visits to destinations in different countries.', 'Saved wishlist samples are excluded from your achievements.'],
  'photo-master': ['Add unique travel photographs to your own journal entries.', 'Uploaded cover and gallery photos are counted once each.'],
  'adventure-seeker': ['Complete activities such as trekking, rafting, scuba diving, or skiing.', 'Only completed, dated experience bookings count.'],
  foodie: ['Write about local dishes and food experiences in your trip journal.', 'Food notes are grouped by destination.'],
  'frequent-traveller': ['Keep a record of completed trips across different dates.', 'Future or cancelled bookings are not included.'],
  'winter-voyager': ['Add a journal entry or completed trip record dated in December, January, or February.', 'The visit date is needed to verify the season.'],
  'desert-nomad': ['Record a completed visit to a desert destination in your journal or trips.', 'Searching or browsing a place does not count as a visit.'],
  'forest-trekker': ['Record visits to forests, nature reserves, and national parks.', 'Each destination contributes once.'],
  'island-hopper': ['Record visits to three different islands or island destinations.', 'Your completed destinations are deduplicated.'],
  'volcano-conqueror': ['Record a completed visit to a volcano destination.', 'A saved destination or search alone does not count.'],
  storyteller: ['Publish personal stories in your travel journal.', 'Share 3 journeys with photos and memories to earn this badge.'],
  'wishlist-dreamer': ['Browse Explore and save destinations you want to visit.', 'Keep 3 or more dream places in your wishlist.'],
  'master-packer': ['Check off your essential items in the Packing Assistant.', 'Get packing ready before you set out!']
};

function formatUnlockDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function formatVisitDate(value) {
  if (!value) return 'Visit recorded';
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function getRelatedDestinations(badge) {
  const categories = badge.related || [];
  const matches = DESTINATIONS.filter((destination) => {
    const searchable = `${destination.category} ${destination.travelType} ${destination.name} ${destination.tagline}`.toLowerCase();
    return categories.some((category) => searchable.includes(category.toLowerCase()));
  });
  return matches.slice(0, 4);
}

function BadgeProgressBar({ badge }) {
  return (
    <div className="badge-progress" aria-label={`${badge.progress} of ${badge.target} ${badge.requirement.toLowerCase()}`}>
      <div className="badge-progress__track">
        <span style={{ width: `${badge.percentage}%`, backgroundColor: badge.accent }} />
      </div>
      <span className="badge-progress__count">{badge.progress} / {badge.target}</span>
    </div>
  );
}

function BadgeCard({ badge, unlocked, onSelect }) {
  return (
    <Link
      to={`/badges/${badge.id}`}
      className={`badge-card${unlocked ? ' is-unlocked' : ' is-locked'}`}
      onClick={onSelect}
      aria-label={`${badge.name}, ${unlocked ? 'unlocked' : 'locked'}, ${badge.progress} of ${badge.target}`}
    >
      <span className="badge-card__art-wrap">
        <BadgeArtwork badgeId={badge.id} locked={!unlocked} />
        {!unlocked && <span className="badge-card__lock material-symbols-rounded" aria-label="Locked">lock</span>}
      </span>
      <strong className="badge-card__name">{badge.name}</strong>
      <span className="badge-card__description">{badge.requirement}</span>
      <BadgeProgressBar badge={badge} />
      <span className={`badge-card__status${unlocked ? ' is-earned' : ''}`}>
        <span className="material-symbols-rounded" aria-hidden="true">{unlocked ? 'verified' : 'lock'}</span>
        {unlocked ? 'Unlocked' : 'Locked'}
      </span>
    </Link>
  );
}

function BadgeDetail({ badge, achievements, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  const recommendations = useMemo(() => getRelatedDestinations(badge), [badge]);
  const achievedAt = achievements[badge.id]?.unlockedAt;
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'info' },
    { id: 'progress', label: 'My Progress', icon: 'monitoring' },
    { id: 'destinations', label: 'Related Destinations', icon: 'location_on' },
    { id: 'tips', label: 'Tips', icon: 'lightbulb' },
    { id: 'gallery', label: 'Gallery', icon: 'photo_library' }
  ];

  return (
    <main className="badge-detail">
      <button className="badge-back-button" type="button" onClick={onBack}>
        <span className="material-symbols-rounded" aria-hidden="true">arrow_back</span>
        Back to Badges
      </button>

      <section className="badge-detail__hero" style={{ '--badge-accent': badge.accent, '--badge-image': `url("${badge.image}")` }}>
        <div className="badge-detail__hero-art">
          <BadgeArtwork badgeId={badge.id} locked={!badge.unlocked} />
          {!badge.unlocked && <span className="badge-detail__lock material-symbols-rounded" aria-label="Locked">lock</span>}
        </div>
        <div className="badge-detail__hero-copy">
          <span className="badge-category-label">{badge.category} badge</span>
          <h1>{badge.name}</h1>
          <p>{badge.description}</p>
          <div className="badge-detail__requirement">{badge.requirement}</div>
          <BadgeProgressBar badge={badge} />
          {achievedAt && <p className="badge-unlocked-date">Unlocked {formatUnlockDate(achievedAt)}</p>}
        </div>
      </section>

      <nav className="badge-detail__tabs" aria-label="Badge details">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? 'is-active' : ''}
            aria-pressed={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="material-symbols-rounded" aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <div className="badge-detail__columns">
          <section className="badge-info-panel">
            <h2><span className="material-symbols-rounded" aria-hidden="true">workspace_premium</span> About This Badge</h2>
            <p>{badge.description} Travio checks your saved trip records and your own journal entries to recognize this achievement.</p>
            <div className="badge-requirement-box">
              <strong>How to unlock</strong>
              <p>{badge.requirement}</p>
              <BadgeProgressBar badge={badge} />
            </div>
          </section>
          <section className="badge-info-panel">
            <h2><span className="material-symbols-rounded" aria-hidden="true">conversion_path</span> Your Journey</h2>
            {badge.records.length ? (
              <ol className="badge-journey-list">
                {badge.records.slice(0, badge.target).map((record, index) => (
                  <li key={`${badge.id}-${record.id || record.name}-${index}`}>
                    <span className="badge-journey-list__check material-symbols-rounded" aria-hidden="true">check_circle</span>
                    <span><strong>{record.name || record.title || 'Achievement recorded'}</strong><small>{formatVisitDate(record.date)}</small></span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="badge-muted-copy">No qualifying visits have been recorded yet. Your browsing and saved sample destinations do not count as visits.</p>
            )}
            <p className="badge-journey-remaining">
              {badge.unlocked ? 'Requirement complete — congratulations!' : `${Math.max(0, badge.target - badge.progress)} more ${badge.target - badge.progress === 1 ? 'step' : 'steps'} to go.`}
            </p>
          </section>
        </div>
      )}

      {activeTab === 'progress' && (
        <section className="badge-info-panel">
          <h2><span className="material-symbols-rounded" aria-hidden="true">monitoring</span> Your Progress</h2>
          <p className="badge-progress-summary">{badge.progress} of {badge.target} — {badge.requirement}</p>
          <BadgeProgressBar badge={badge} />
          {achievedAt && <p className="badge-muted-copy">Achievement recorded on {formatUnlockDate(achievedAt)}.</p>}
          {badge.records.length > 0 ? (
            <ol className="badge-journey-list badge-journey-list--expanded">
              {badge.records.map((record, index) => (
                <li key={`${badge.id}-progress-${record.id || record.name}-${index}`}>
                  <span className="badge-journey-list__check material-symbols-rounded" aria-hidden="true">check_circle</span>
                  <span><strong>{record.name || record.title || record.source}</strong><small>{record.source} · {formatVisitDate(record.date)}</small></span>
                </li>
              ))}
            </ol>
          ) : <p className="badge-muted-copy">No qualifying travel records yet. As you record completed trips and journal memories, your progress will update here.</p>}
        </section>
      )}

      {activeTab === 'destinations' && (
        <section className="badge-info-panel">
          <h2><span className="material-symbols-rounded" aria-hidden="true">explore</span> Destinations to Explore</h2>
          <p className="badge-muted-copy">These are discovery suggestions, not recorded visits. Visiting or searching them will not unlock this badge on its own.</p>
          <div className="badge-destination-grid">
            {recommendations.map((destination) => (
              <Link key={destination.id} to={`/destination/${destination.id}`} className="badge-destination-card">
                <img src={destination.cardImage || destination.heroImage} alt={`${destination.name} destination`} loading="lazy" />
                <span><strong>{destination.name}</strong><small>{destination.country}</small></span>
                <span className="material-symbols-rounded" aria-hidden="true">arrow_outward</span>
              </Link>
            ))}
            {!recommendations.length && <p className="badge-muted-copy">There are no matching destination suggestions available yet.</p>}
          </div>
        </section>
      )}

      {activeTab === 'tips' && (
        <section className="badge-info-panel">
          <h2><span className="material-symbols-rounded" aria-hidden="true">tips_and_updates</span> Tips for This Achievement</h2>
          <ul className="badge-tips-list">
            {(BADGE_TIPS[badge.id] || []).map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
          <p className="badge-muted-copy">Progress is calculated from completed or user-recorded travel only. Sample content, searches, and page views are excluded.</p>
        </section>
      )}

      {activeTab === 'gallery' && (
        <section className="badge-info-panel">
          <h2><span className="material-symbols-rounded" aria-hidden="true">photo_library</span> Destination Gallery</h2>
          <p className="badge-muted-copy">Destination inspiration from Travio. These photographs are suggestions and do not represent your personal visit history.</p>
          <div className="badge-gallery">
            {recommendations.map((destination) => (
              <figure key={destination.id}>
                <img src={destination.heroImage || destination.cardImage} alt={`${destination.name} scenery`} loading="lazy" />
                <figcaption>{destination.name}, {destination.country}</figcaption>
              </figure>
            ))}
            {!recommendations.length && <p className="badge-muted-copy">No destination images are available for this badge yet.</p>}
          </div>
        </section>
      )}
    </main>
  );
}

function UnlockCelebration({ badge, onView, onKeep, onClose }) {
  return (
    <div className="badge-celebration-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="badge-celebration" role="dialog" aria-modal="true" aria-labelledby="badge-celebration-title">
        <button type="button" className="badge-celebration__close" aria-label="Close celebration" onClick={onClose}>
          <span className="material-symbols-rounded" aria-hidden="true">close</span>
        </button>
        <div className="badge-confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
        <BadgeArtwork badgeId={badge.id} />
        <span className="badge-category-label">Achievement earned</span>
        <h2 id="badge-celebration-title">Badge Unlocked!</h2>
        <strong>{badge.name}</strong>
        <p>You completed: {badge.requirement.toLowerCase()}.</p>
        <div className="badge-celebration__actions">
          <button type="button" className="badge-button badge-button--secondary" onClick={onView}>View Badge</button>
          <button type="button" className="badge-button badge-button--primary" onClick={onKeep}>Keep Exploring</button>
        </div>
      </section>
    </div>
  );
}

export default function BadgesPage() {
  const { badgeId } = useParams();
  const navigate = useNavigate();
  const { wishlist, bookings, showToast } = useTravel();
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState({});
  const [celebrationQueue, setCelebrationQueue] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const calculated = calculateBadgeProgress(wishlist, bookings);
      const result = recordBadgeUnlocks(calculated);
      setBadges(calculated);
      setAchievements(result.achievements);
      if (result.newlyUnlocked.length) {
        setCelebrationQueue((queue) => [...queue, ...result.newlyUnlocked]);
      }
      setError('');
    } catch (loadError) {
      setError(loadError.message || 'Badge progress could not be loaded.');
      showToast?.('Badge progress could not be loaded. Please check your saved travel data.', 'error');
    }
  }, [wishlist, bookings]);

  const filteredBadges = useMemo(() => {
    const search = query.trim().toLowerCase();
    return badges.filter((badge) => {
      const matchesFilter = activeFilter === 'all' || badge.filter === activeFilter;
      const matchesSearch = !search || `${badge.name} ${badge.category} ${badge.description} ${badge.requirement}`.toLowerCase().includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [badges, activeFilter, query]);

  const earnedBadges = useMemo(() => badges
    .filter((badge) => achievements[badge.id])
    .sort((first, second) => new Date(achievements[second.id].unlockedAt) - new Date(achievements[first.id].unlockedAt)), [badges, achievements]);
  const unlockedCount = earnedBadges.length;
  const selectedBadge = badges.find((badge) => badge.id === badgeId);
  const currentCelebration = badges.find((badge) => badge.id === celebrationQueue[0]);

  useEffect(() => {
    if (!currentCelebration) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setCelebrationQueue((queue) => queue.slice(1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCelebration?.id]);

  const dismissCelebration = () => setCelebrationQueue((queue) => queue.slice(1));
  const openBadgeFromCelebration = () => {
    const id = celebrationQueue[0];
    dismissCelebration();
    if (id) navigate(`/badges/${id}`);
  };
  const keepExploring = () => {
    dismissCelebration();
    navigate('/badges');
  };

  return (
    <>
      <Header />
      <div className="badges-page">
        {badgeId ? (
          selectedBadge ? (
            <BadgeDetail
              badge={selectedBadge}
              achievements={achievements}
              onBack={() => navigate('/badges')}
            />
          ) : (
            <main className="badge-detail badge-detail--loading" aria-live="polite">
              {error ? <p role="alert">{error}</p> : badges.length ? <p>Badge not found.</p> : <p>Loading badge details…</p>}
              <button className="badge-back-button" type="button" onClick={() => navigate('/badges')}>Back to Badges</button>
            </main>
          )
        ) : (
          <>
            <section className="badges-hero">
              <div className="badges-hero__image" aria-hidden="true" />
              <svg className="badges-hero__flight" viewBox="0 0 420 120" aria-hidden="true">
                <path d="M10 87 C92 14 171 107 251 48 S359 24 405 38" fill="none" stroke="rgba(218,188,255,.75)" strokeWidth="1.5" strokeDasharray="5 7" />
                <circle cx="10" cy="87" r="3" fill="#dfaeff" /><circle cx="405" cy="38" r="3" fill="#dfaeff" />
              </svg>
              <span className="material-symbols-rounded badges-hero__plane" aria-hidden="true">flight</span>
              <div className="badges-hero__copy">
                <span className="material-symbols-rounded badges-hero__trophy" aria-hidden="true">emoji_events</span>
                <div>
                  <span className="badges-eyebrow">YOUR JOURNEY, CELEBRATED</span>
                  <h1>Travel <span>Badges</span></h1>
                  <p>Explore the world, complete journeys and collect badges to showcase your travel achievements.</p>
                </div>
              </div>
              <p className="badges-hero__script">Collect Memories<br />Earn Badges<br />Explore More <span aria-hidden="true">♥</span></p>
            </section>

            <main className="badges-main">
              <div className="badges-toolbar">
                <div className="badges-filters" role="group" aria-label="Filter badges by category">
                  {FILTERS.map((filter) => (
                    <button key={filter.id} type="button" className={activeFilter === filter.id ? 'is-active' : ''} onClick={() => setActiveFilter(filter.id)}>
                      {filter.label}
                    </button>
                  ))}
                </div>
                <label className="badges-search">
                  <span className="material-symbols-rounded" aria-hidden="true">search</span>
                  <span className="badges-sr-only">Search badges</span>
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search badges…" />
                  {query && <button type="button" aria-label="Clear badge search" onClick={() => setQuery('')}><span className="material-symbols-rounded" aria-hidden="true">close</span></button>}
                </label>
              </div>

              {error && <p className="badges-error" role="alert">{error}</p>}

              <div className="badges-layout">
                <section className="badges-collection" aria-labelledby="badges-collection-title">
                  <div className="badges-section-heading">
                    <div><span className="badges-eyebrow">KEEP EXPLORING</span><h2 id="badges-collection-title">All Badges</h2></div>
                    <span>{filteredBadges.length} of {BADGE_DEFINITIONS.length} badges</span>
                  </div>
                  {filteredBadges.length ? (
                    <div className="badges-grid">
                      {filteredBadges.map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} unlocked={!!achievements[badge.id]} />
                      ))}
                    </div>
                  ) : (
                    <div className="badges-empty">
                      <span className="material-symbols-rounded" aria-hidden="true">search_off</span>
                      <h3>No badges found</h3>
                      <p>Try another category or search term.</p>
                      <button className="badge-button badge-button--secondary" type="button" onClick={() => { setActiveFilter('all'); setQuery(''); }}>Clear filters</button>
                    </div>
                  )}
                </section>

                <aside className="badges-sidebar" aria-label="Badge progress and recent achievements">
                  <section className="badge-side-panel">
                    <div className="badge-side-panel__heading"><span className="material-symbols-rounded" aria-hidden="true">insights</span><h2>Your Badge Progress</h2></div>
                    <div className="badge-total-progress">
                      <div className="badge-total-progress__ring" style={{ '--badge-progress': `${Math.round((unlockedCount / BADGE_DEFINITIONS.length) * 100)}%` }}>
                        <strong>{unlockedCount}</strong><span>/ {BADGE_DEFINITIONS.length}</span>
                      </div>
                      <div><strong>{unlockedCount} Badges Unlocked</strong><p>Keep exploring to earn more achievements.</p></div>
                    </div>
                    <div className="badge-side-progress" role="progressbar" aria-label="Badge collection progress" aria-valuemin="0" aria-valuemax={BADGE_DEFINITIONS.length} aria-valuenow={unlockedCount}>
                      <span style={{ width: `${Math.round((unlockedCount / BADGE_DEFINITIONS.length) * 100)}%` }} />
                    </div>
                    <p className="badge-side-caption">{unlockedCount} of {BADGE_DEFINITIONS.length} badges earned · {Math.round((unlockedCount / BADGE_DEFINITIONS.length) * 100)}%</p>
                  </section>

                  <section className="badge-side-panel">
                    <div className="badge-side-panel__heading"><span className="material-symbols-rounded" aria-hidden="true">workspace_premium</span><h2>Recent Badges</h2><button type="button" aria-label="View all badges" onClick={() => { setActiveFilter('all'); setQuery(''); document.getElementById('badges-collection-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>View All <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span></button></div>
                    {earnedBadges.length ? (
                      <ul className="badge-recent-list">
                        {earnedBadges.slice(0, 4).map((badge) => (
                          <li key={badge.id}>
                            <Link to={`/badges/${badge.id}`}>
                              <BadgeArtwork badgeId={badge.id} />
                              <span><strong>{badge.name}</strong><small>{formatUnlockDate(achievements[badge.id]?.unlockedAt)}</small></span>
                              <span className="badge-recent-status">Unlocked</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : <p className="badge-side-empty">Your earned badges will appear here when you complete a real travel achievement.</p>}
                  </section>

                  <blockquote className="badges-quote">“The world is full of places waiting for your stories.”<span /></blockquote>
                  <p className="badges-data-note">Progress is based on this browser profile’s recorded travel data.</p>
                </aside>
              </div>
            </main>
          </>
        )}
      </div>
      {currentCelebration && (
        <UnlockCelebration
          badge={currentCelebration}
          onView={openBadgeFromCelebration}
          onKeep={keepExploring}
          onClose={dismissCelebration}
        />
      )}
    </>
  );
}
