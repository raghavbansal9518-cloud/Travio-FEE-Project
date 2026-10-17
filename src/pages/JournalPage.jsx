import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useTravel } from '../context/TravelContext';
import { DEFAULT_DEMO_FAVORITES, DEMO_JOURNAL_ENTRIES } from '../data/journalEntries';
import { getJournalOwner, loadJournalData, saveDemoState, saveUserEntries } from '../services/journalService';
import './JournalPage.css';

const FILTERS = [
  { id: 'all', label: 'All Entries', icon: 'auto_stories' },
  { id: 'trip', label: 'Trips', icon: 'luggage' },
  { id: 'photo', label: 'Photos', icon: 'photo_camera' },
  { id: 'note', label: 'Notes', icon: 'edit_note' },
  { id: 'favorite', label: 'Favorites', icon: 'favorite' }
];

const FALLBACK_IMAGE = '/images/hero-bg.jpg';

function getToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getProfileName() {
  try {
    return JSON.parse(localStorage.getItem('travio_user_profile') || '{}').name || '';
  } catch {
    return '';
  }
}

function formatDate(date, options = { day: '2-digit', month: 'short', year: 'numeric' }) {
  if (!date) return 'Date not set';
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat('en', options).format(parsed);
}

function getCountry(destination) {
  const parts = (destination || '').split(',');
  return parts[parts.length - 1].trim();
}

function normalizeDate(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value;
  const legacyDate = (value || '').match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  const parsed = legacyDate
    ? new Date(Number(legacyDate[3]), new Date(`${legacyDate[2]} 1, 2000`).getMonth(), Number(legacyDate[1]))
    : new Date(value);
  if (Number.isNaN(parsed.getTime())) return getToday();
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
}

function normalizeEntry(entry) {
  return {
    ...entry,
    destination: entry.destination || entry.location || '',
    date: normalizeDate(entry.date),
    description: entry.description || entry.content || '',
    image: entry.image || '',
    tags: Array.isArray(entry.tags)
      ? entry.tags
      : entry.mood
        ? [entry.mood]
        : [],
    kind: ['trip', 'photo', 'note'].includes(entry.kind) ? entry.kind : 'trip',
    favorite: !!entry.favorite
  };
}

function getInitialData() {
  try {
    const data = loadJournalData();
    const profileName = getProfileName();
    return {
      ...data,
      userEntries: data.userEntries.map((entry) => ({
        ...normalizeEntry(entry),
        ownerId: entry.ownerId || getJournalOwner(),
        authorName: entry.authorName || profileName || getJournalOwner().split('@')[0],
        status: entry.status || 'published',
        visibility: entry.visibility || 'public'
      })),
      error: ''
    };
  } catch (error) {
    return {
      userEntries: [],
      demoState: { favorites: DEFAULT_DEMO_FAVORITES, overrides: {}, hidden: [] },
      error: error.message || 'Your journal could not be loaded.'
    };
  }
}

export function JournalEntryForm({ entry, bookings, onCancel, onSave }) {
  const [form, setForm] = useState(() => ({
    title: entry?.title || '',
    destination: entry?.destination || '',
    date: entry?.date || getToday(),
    endDate: entry?.endDate || '',
    description: entry?.description || '',
    fullStory: entry?.fullStory || entry?.description || '',
    image: entry?.image || '',
    tags: (entry?.tags || []).join(', '),
    kind: entry?.kind || 'trip',
    tripId: entry?.tripId || '',
    favorite: !!entry?.favorite,
    gallery: (entry?.gallery || []).map((photo) => photo.image).join('\n'),
    activities: (entry?.activities || []).map((activity) => activity.name || activity.title).join('\n'),
    tips: (entry?.tips || []).join('\n'),
    budget: entry?.budget || '',
    duration: entry?.duration || '',
    visibility: entry?.visibility || 'public'
  }));
  const [error, setError] = useState('');
  const [isReadingImage, setIsReadingImage] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const imageReaders = useRef([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      imageReaders.current.forEach((reader) => {
        if (reader.readyState === FileReader.LOADING) reader.abort();
      });
    };
  }, [onCancel]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file to use as the cover photo.');
      event.target.value = '';
      return;
    }
    if (file.size > 1200000) {
      setError('Please choose an image smaller than 1.2 MB so it can be saved reliably.');
      event.target.value = '';
      return;
    }

    setError('');
    setIsReadingImage(true);
    imageReaders.current.forEach((activeReader) => {
      if (activeReader.readyState === FileReader.LOADING) activeReader.abort();
    });
    imageReaders.current = [];
    const reader = new FileReader();
    imageReaders.current = [reader];
    reader.onload = () => {
      imageReaders.current = imageReaders.current.filter((activeReader) => activeReader !== reader);
      setForm((current) => ({ ...current, image: String(reader.result) }));
      setIsReadingImage(false);
    };
    reader.onerror = () => {
      imageReaders.current = imageReaders.current.filter((activeReader) => activeReader !== reader);
      setError('The selected image could not be read. Try another file.');
      setIsReadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryUpload = async (event) => {
    const files = [...(event.target.files || [])];
    event.target.value = '';
    if (!files.length) return;
    const existing = form.gallery.split('\n').map((url) => url.trim()).filter(Boolean);
    if (files.length + existing.length > 4) {
      setError('Add up to four additional photos.');
      return;
    }
    if (files.some((file) => !file.type.startsWith('image/'))) {
      setError('Choose image files for the story gallery.');
      return;
    }
    if (files.some((file) => file.size > 350000)) {
      setError('Gallery images must each be smaller than 350 KB for local storage.');
      return;
    }

    const readers = [];
    const readFile = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      readers.push(reader);
      imageReaders.current = [...imageReaders.current, reader];
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
      reader.onabort = () => reject(new Error('Photo upload was cancelled.'));
      reader.readAsDataURL(file);
    });
    setIsReadingImage(true);
    setError('');
    try {
      const photos = await Promise.all(files.map(readFile));
      setForm((current) => ({
        ...current,
        gallery: [...current.gallery.split('\n').map((url) => url.trim()).filter(Boolean), ...photos].join('\n')
      }));
    } catch (uploadError) {
      readers.forEach((reader) => {
        if (reader.readyState === FileReader.LOADING) reader.abort();
      });
      setError(uploadError.message || 'One of the photos could not be read.');
    } finally {
      imageReaders.current = imageReaders.current.filter((reader) => !readers.includes(reader));
      setIsReadingImage(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const status = event.nativeEvent.submitter?.value || 'published';
    if (status === 'published' && (!form.title.trim() || !form.destination.trim() || !form.date || !form.description.trim() || !form.fullStory.trim())) {
      setError('To publish, add a title, destination, start date, introduction, and full story. You can save an incomplete draft.');
      return;
    }
    if (form.image && !form.image.startsWith('data:image/') && !/^https?:\/\//i.test(form.image)) {
      setError('Cover photo must be an image upload or a valid http(s) image URL.');
      return;
    }
    if (form.gallery.split('\n').map((url) => url.trim()).filter(Boolean).some((url) => !url.startsWith('data:image/') && !/^https?:\/\//i.test(url))) {
      setError('Gallery photos must be image uploads or valid http(s) image URLs.');
      return;
    }
    onSave({
      ...entry,
      title: form.title.trim(),
      destination: form.destination.trim(),
      destinationId: entry?.destinationId || '',
      date: form.date,
      endDate: form.endDate,
      description: form.description.trim(),
      introduction: form.description.trim(),
      fullStory: form.fullStory.trim(),
      story: form.fullStory.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean).length
        ? [{ heading: 'The story', paragraphs: form.fullStory.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean) }]
        : [],
      image: form.image.trim(),
      gallery: form.gallery.split('\n').map((url) => url.trim()).filter(Boolean).map((image) => ({ image, alt: `Travel photograph from ${form.destination.trim()}` })),
      activities: form.activities.split('\n').map((name) => name.trim()).filter(Boolean).map((name) => ({
        name,
        description: 'A place or experience added by the writer.',
        location: form.destination.trim(),
        duration: 'Not specified',
        destinationId: entry?.destinationId || ''
      })),
      tips: form.tips.split('\n').map((tip) => tip.trim()).filter(Boolean),
      budget: form.budget.trim(),
      duration: form.duration.trim(),
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      kind: form.kind,
      tripId: form.tripId || '',
      favorite: form.favorite,
      visibility: form.visibility,
      ownerId: entry?.ownerId || getJournalOwner(),
      authorName: entry?.authorName || getProfileName() || getJournalOwner().split('@')[0],
      status,
      publishedAt: status === 'published' ? (entry?.publishedAt || new Date().toISOString()) : entry?.publishedAt
    }, setError);
  };

  return (
    <div className="journal-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onCancel();
    }}>
      <section className="journal-modal" role="dialog" aria-modal="true" aria-labelledby="journal-modal-title">
        <div className="journal-modal__heading">
          <div>
            <span className="journal-eyebrow">{entry ? 'YOUR STORY, YOUR WAY' : 'A NEW MEMORY'}</span>
            <h2 id="journal-modal-title">{entry ? 'Edit journal entry' : 'Create a journal entry'}</h2>
          </div>
          <button className="journal-icon-button" type="button" aria-label="Close dialog" onClick={onCancel}>
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {isPreviewing ? (
          <div className="journal-form-preview">
            <span className="journal-eyebrow">STORY PREVIEW</span>
            <h3>{form.title || 'Untitled story'}</h3>
            <p className="journal-form-preview__destination">{form.destination || 'Destination not set'} · {form.date ? formatDate(form.date) : 'Date not set'}</p>
            {form.image && <img src={form.image} alt="Story cover preview" />}
            <p><strong>Introduction</strong><br />{form.description || 'No introduction yet.'}</p>
            <p><strong>Full story</strong><br />{form.fullStory || 'No story text yet.'}</p>
            {form.tags && <p><strong>Tags</strong><br />{form.tags}</p>}
            <button className="journal-button journal-button--quiet" type="button" onClick={() => setIsPreviewing(false)}>Back to editor</button>
          </div>
        ) : <form className="journal-form" onSubmit={handleSubmit}>
          <label className="journal-field journal-field--wide">
            <span>Entry title <b aria-hidden="true">*</b></span>
            <input autoFocus maxLength={90} value={form.title} onChange={update('title')} placeholder="Give this memory a name" />
          </label>
          <label className="journal-field">
            <span>Destination <b aria-hidden="true">*</b></span>
            <input maxLength={100} value={form.destination} onChange={update('destination')} placeholder="City, country" />
          </label>
          <label className="journal-field">
            <span>Travel start date <b aria-hidden="true">*</b></span>
            <input type="date" value={form.date} onChange={update('date')} />
          </label>
          <label className="journal-field">
            <span>Travel end date</span>
            <input type="date" value={form.endDate} onChange={update('endDate')} />
          </label>
          <label className="journal-field journal-field--wide">
            <span>Short introduction <b aria-hidden="true">*</b></span>
            <textarea rows={3} maxLength={1200} value={form.description} onChange={update('description')} placeholder="Set the scene for your story" />
          </label>
          <label className="journal-field journal-field--wide">
            <span>Full travel story <b aria-hidden="true">*</b></span>
            <textarea rows={6} maxLength={12000} value={form.fullStory} onChange={update('fullStory')} placeholder="Write your story. Separate paragraphs with a blank line." />
          </label>
          <label className="journal-field journal-field--wide">
            <span>Cover photo URL</span>
            <input type="url" value={form.image.startsWith('data:') ? '' : form.image} onChange={update('image')} placeholder="https://..." />
            <span className="journal-field__hint">Or upload an image (up to 1.2 MB).</span>
            <input className="journal-file-input" type="file" accept="image/*" onChange={handleImageUpload} />
            {form.image && (
              <span className="journal-photo-preview">
                <img src={form.image} alt="Selected cover photo preview" />
                <button type="button" onClick={() => setForm((current) => ({ ...current, image: '' }))}>Remove photo</button>
              </span>
            )}
          </label>
          <label className="journal-field journal-field--wide">
            <span>Additional photo URLs</span>
            <textarea rows={2} value={form.gallery} onChange={update('gallery')} placeholder="One https:// image URL per line" />
            <span className="journal-field__hint">Or upload up to four images (350 KB each, for local storage).</span>
            <input className="journal-file-input" type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
          </label>
          <label className="journal-field">
            <span>Activities & attractions</span>
            <textarea rows={3} value={form.activities} onChange={update('activities')} placeholder="One activity per line" />
          </label>
          <label className="journal-field">
            <span>Tips & recommendations</span>
            <textarea rows={3} value={form.tips} onChange={update('tips')} placeholder="One travel tip per line" />
          </label>
          <label className="journal-field">
            <span>Entry type</span>
            <select value={form.kind} onChange={update('kind')}>
              <option value="trip">Trip</option>
              <option value="photo">Photo</option>
              <option value="note">Note</option>
            </select>
          </label>
          <label className="journal-field">
            <span>Estimated trip duration</span>
            <input maxLength={60} value={form.duration} onChange={update('duration')} placeholder="e.g. 5 days" />
          </label>
          <label className="journal-field">
            <span>Estimated budget</span>
            <input maxLength={120} value={form.budget} onChange={update('budget')} placeholder="Optional; include currency" />
          </label>
          <label className="journal-field">
            <span>Visibility</span>
            <select value={form.visibility} onChange={update('visibility')}>
              <option value="public">Public in this local journal</option>
              <option value="private">Private to this browser profile</option>
            </select>
          </label>
          <label className="journal-field">
            <span>Associate with a trip</span>
            <select value={form.tripId} onChange={update('tripId')}>
              <option value="">No trip association</option>
              {bookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.destinationName || booking.title}
                </option>
              ))}
            </select>
          </label>
          <label className="journal-field journal-field--wide">
            <span>Categories / tags</span>
            <input maxLength={180} value={form.tags} onChange={update('tags')} placeholder="Nature, Food, Architecture" />
            <span className="journal-field__hint">Separate tags with commas.</span>
          </label>
          <label className="journal-favorite-check">
            <input type="checkbox" checked={form.favorite} onChange={(event) => setForm((current) => ({ ...current, favorite: event.target.checked }))} />
            <span className="material-symbols-rounded" aria-hidden="true">favorite</span>
            Save this entry to Favorites
          </label>

          {error && <p className="journal-form-error" role="alert">{error}</p>}
          <div className="journal-form__actions">
            <button className="journal-button journal-button--quiet" type="button" onClick={onCancel}>Cancel</button>
            <button className="journal-button journal-button--quiet" type="button" onClick={() => setIsPreviewing(true)}>Preview</button>
            <button className="journal-button journal-button--quiet" type="submit" value="draft" disabled={isReadingImage}>
              <span className="material-symbols-rounded" aria-hidden="true">save</span>Save Draft
            </button>
            <button className="journal-button journal-button--primary" type="submit" value="published" disabled={isReadingImage}>
              <span className="material-symbols-rounded" aria-hidden="true">publish</span>
              {isReadingImage ? 'Preparing photo…' : entry?.status === 'published' ? 'Save & Publish' : 'Publish Story'}
            </button>
          </div>
        </form>}
      </section>
    </div>
  );
}

function JournalCard({ entry, isDemo, favorite, bookmarked, menuOpen, readOnly, onFavorite, onBookmark, onMenu, onEdit, onDelete, onOpenStory }) {
  return (
    <article
      className="journal-card journal-card--clickable"
      role="link"
      tabIndex={0}
      aria-label={`Read ${entry.title} by ${entry.authorName || 'Travio traveler'}`}
      onClick={() => onOpenStory(entry)}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onOpenStory(entry);
        }
      }}
    >
      <div className="journal-card__image-wrap">
        <span className="journal-card__image-link">
          <img src={entry.image || FALLBACK_IMAGE} alt={`${entry.destination} travel memory`} loading="lazy" onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_IMAGE;
          }} />
        </span>
        <span className="journal-card__type">{entry.kind === 'photo' ? 'Photo' : entry.kind === 'note' ? 'Note' : 'Trip'}</span>
        {isDemo && <span className="journal-card__demo">Sample</span>}
        {entry.status === 'draft' && <span className="journal-card__draft">Draft · Private</span>}
        <button className={`journal-card__favorite${favorite ? ' is-favorite' : ''}`} type="button" onClick={(event) => {
          event.stopPropagation();
          onFavorite(entry);
        }} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={favorite} disabled={readOnly}>
          <span className="material-symbols-rounded" aria-hidden="true">{favorite ? 'favorite' : 'favorite_border'}</span>
        </button>
      </div>
      <div className="journal-card__body">
        <div className="journal-card__meta">
          <span><span className="material-symbols-rounded" aria-hidden="true">calendar_month</span>{formatDate(entry.date)}</span>
          <span className="journal-card__location">
            <span className="material-symbols-rounded" aria-hidden="true">location_on</span>{entry.destination}
          </span>
        </div>
        <h2>{entry.title}</h2>
        <p className="journal-card__description">{entry.description}</p>
        <p className="journal-card__writer">By {entry.authorName || 'Maya Chen'} · Read story</p>
        <div className="journal-card__footer">
          <div className="journal-tags" aria-label="Categories">
            {(entry.tags || []).map((tag) => <span className="journal-tag" key={tag}>{tag}</span>)}
          </div>
          <div className="journal-card__menu-wrap">
            <button className={`journal-icon-button journal-card__bookmark${bookmarked ? ' is-bookmarked' : ''}`} type="button" aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark story'} aria-pressed={bookmarked} disabled={readOnly} onClick={(event) => {
              event.stopPropagation();
              onBookmark(entry);
            }}>
              <span className="material-symbols-rounded">{bookmarked ? 'bookmark_added' : 'bookmark_add'}</span>
            </button>
            <button className="journal-icon-button journal-card__more" type="button" aria-label={`Actions for ${entry.title}`} aria-expanded={menuOpen} onClick={(event) => {
              event.stopPropagation();
              onMenu(entry.id);
            }} disabled={readOnly}>
              <span className="material-symbols-rounded" aria-hidden="true">more_horiz</span>
            </button>
            {menuOpen && (
              <div className="journal-card__menu" onClick={(event) => event.stopPropagation()}>
                {!isDemo && <button type="button" onClick={() => onEdit(entry)}><span className="material-symbols-rounded">edit</span>Edit entry</button>}
                <button type="button" onClick={() => onDelete(entry)}><span className="material-symbols-rounded">delete</span>{isDemo ? 'Remove sample' : 'Delete entry'}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function JournalPage() {
  const navigate = useNavigate();
  const { bookings, wishlist, showToast } = useTravel();
  const [initialData, setInitialData] = useState(getInitialData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modalEntry, setModalEntry] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const visibleDemoEntries = useMemo(() => DEMO_JOURNAL_ENTRIES
    .filter((entry) => !initialData.demoState.hidden.includes(entry.id))
    .map((entry) => ({ ...entry, ...initialData.demoState.overrides[entry.id], isDemo: true, authorName: 'Maya Chen' })), [initialData.demoState]);
  const allEntries = useMemo(() => [...visibleDemoEntries, ...initialData.userEntries.map((entry) => ({ ...entry, isDemo: false }))], [visibleDemoEntries, initialData.userEntries]);
  const entriesWithFavorites = useMemo(() => allEntries.map((entry) => ({
    ...entry,
    favorite: entry.isDemo
      ? initialData.demoState.favorites.includes(entry.id)
      : !!entry.favorite
  })), [allEntries, initialData.demoState.favorites]);

  const filteredEntries = useMemo(() => {
    const query = search.trim().toLowerCase();
    return entriesWithFavorites.filter((entry) => {
      if (activeFilter === 'favorite' && !entry.favorite) return false;
      if (['trip', 'photo', 'note'].includes(activeFilter) && entry.kind !== activeFilter) return false;
      if (!query) return true;
      const searchable = [entry.title, entry.destination, entry.description, entry.authorName, ...(entry.tags || [])].join(' ').toLowerCase();
      return searchable.includes(query);
    });
  }, [activeFilter, entriesWithFavorites, search]);

  const confirmedBookings = bookings.filter((booking) => booking.status === 'Confirmed');
  const totalTrips = new Set([
    ...confirmedBookings.map((booking) => booking.id),
    ...allEntries.map((entry) => entry.tripId).filter(Boolean)
  ]).size;
  const visitedCountries = new Set([
    ...allEntries.map((entry) => getCountry(entry.destination)).filter(Boolean),
    ...wishlist.filter((destination) => destination.status === 'visited').map((destination) => getCountry(destination.country || destination.name)).filter(Boolean)
  ]);
  const savedPhotos = allEntries.filter((entry) => entry.kind === 'photo' || !!entry.image).length;
  const stats = [
    { label: 'Total trips', value: totalTrips, icon: 'flight_takeoff', color: 'violet' },
    { label: 'Countries', value: visitedCountries.size, icon: 'public', color: 'cyan' },
    { label: 'Photos saved', value: savedPhotos, icon: 'photo_library', color: 'pink' },
    { label: 'Journal entries', value: allEntries.length, icon: 'menu_book', color: 'purple' }
  ];

  const recentDestinations = useMemo(() => {
    const byDestination = new Map();
    [...allEntries].sort((a, b) => new Date(`${b.date}T00:00:00`) - new Date(`${a.date}T00:00:00`)).forEach((entry) => {
      if (!byDestination.has(entry.destination)) byDestination.set(entry.destination, entry);
    });
    return [...byDestination.values()].slice(0, 5);
  }, [allEntries]);

  const persistEntries = (next) => {
    saveUserEntries(next);
    setInitialData((current) => ({ ...current, userEntries: next, error: '' }));
  };

  const persistDemoState = (next) => {
    saveDemoState(next);
    setInitialData((current) => ({ ...current, demoState: next, error: '' }));
  };

  const handleBookmark = (entry) => {
    if (initialData.error) {
      showToast('Bookmarks are unavailable until the saved journal can be loaded.', 'error');
      return;
    }
    try {
      if (entry.isDemo) {
        const bookmarks = new Set(initialData.demoState.bookmarks || []);
        if (bookmarks.has(entry.id)) bookmarks.delete(entry.id);
        else bookmarks.add(entry.id);
        persistDemoState({ ...initialData.demoState, bookmarks: [...bookmarks] });
      } else {
        persistEntries(initialData.userEntries.map((item) => item.id === entry.id ? { ...item, bookmarked: !item.bookmarked } : item));
      }
    } catch (error) {
      showToast(`Could not update bookmark. ${error.message || 'Please try again.'}`, 'error');
    }
  };

  const handleSave = (entry, setFormError) => {
    if (initialData.error) {
      setFormError(`Your saved journal could not be loaded. ${initialData.error}`);
      return;
    }
    try {
      const demo = entry.id?.startsWith('demo-');
      if (demo) {
        const { favorite, ...content } = entry;
        const favorites = new Set(initialData.demoState.favorites);
        if (favorite) favorites.add(entry.id);
        else favorites.delete(entry.id);
        const next = {
          ...initialData.demoState,
          favorites: [...favorites],
          overrides: { ...initialData.demoState.overrides, [entry.id]: content }
        };
        persistDemoState(next);
      } else {
        const savedEntry = {
          ...entry,
          id: entry.id || `journal-${Date.now()}`,
          favorite: !!entry.favorite
        };
        const next = entry.id
          ? initialData.userEntries.map((item) => item.id === entry.id ? savedEntry : item)
          : [savedEntry, ...initialData.userEntries];
        persistEntries(next);
      }
      showToast(entry.id ? 'Journal entry updated.' : 'Memory saved to your journal.', 'success');
      setModalEntry(null);
      setIsCreating(false);
      setOpenMenuId(null);
    } catch (error) {
      setFormError(`Could not save this entry. ${error.message || 'Check available storage and try again.'}`);
    }
  };

  const handleFavorite = (entry) => {
    if (initialData.error) {
      showToast('Favorites are unavailable until the saved journal can be loaded.', 'error');
      return;
    }
    try {
      if (entry.isDemo) {
        const favorites = new Set(initialData.demoState.favorites);
        if (favorites.has(entry.id)) favorites.delete(entry.id);
        else favorites.add(entry.id);
        persistDemoState({ ...initialData.demoState, favorites: [...favorites] });
      } else {
        persistEntries(initialData.userEntries.map((item) => item.id === entry.id ? { ...item, favorite: !item.favorite } : item));
      }
    } catch (error) {
      showToast(`Could not update favorite. ${error.message || 'Please try again.'}`, 'error');
    }
  };

  const handleDelete = (entry) => {
    if (initialData.error) {
      showToast('Entries cannot be removed until the saved journal can be loaded.', 'error');
      return;
    }
    const message = entry.isDemo
      ? `Remove "${entry.title}" from the sample entries on this device?`
      : `Delete "${entry.title}" from your journal? This cannot be undone.`;
    if (!window.confirm(message)) return;
    try {
      if (entry.isDemo) {
        persistDemoState({
          ...initialData.demoState,
          hidden: [...new Set([...initialData.demoState.hidden, entry.id])]
        });
      } else {
        persistEntries(initialData.userEntries.filter((item) => item.id !== entry.id));
      }
      setOpenMenuId(null);
      showToast(entry.isDemo ? 'Sample entry removed.' : 'Journal entry deleted.', 'success');
    } catch (error) {
      showToast(`Could not delete this entry. ${error.message || 'Please try again.'}`, 'error');
    }
  };

  const openEdit = (entry) => {
    setModalEntry(entry);
    setIsCreating(false);
    setOpenMenuId(null);
  };

  const openStory = (entry) => {
    navigate(`/journal/${encodeURIComponent(entry.id)}`);
  };

  const openDestination = (entry) => {
    if (entry.destinationId) navigate(`/destination/${entry.destinationId}`);
    else navigate(`/explore?search=${encodeURIComponent(entry.destination)}`);
  };

  return (
    <>
      <Header variant="journal" />
      <main className="journal-page">
        <section className="journal-hero" aria-labelledby="journal-title">
          <div className="journal-hero__image" aria-hidden="true" />
          <svg className="journal-flight-path" viewBox="0 0 460 115" fill="none" aria-hidden="true">
            <path d="M4 91C94 16 178 17 242 78c49 47 97 29 142-17 23-23 42-36 70-45" stroke="currentColor" strokeDasharray="5 7" />
          </svg>
          <span className="material-symbols-rounded journal-hero__plane" aria-hidden="true">flight</span>
          <div className="journal-hero__copy">
            <span className="material-symbols-rounded journal-hero__book" aria-hidden="true">menu_book</span>
            <div>
              <span className="journal-eyebrow">YOUR ADVENTURES, BEAUTIFULLY REMEMBERED</span>
              <h1 id="journal-title">My <span>Travel Journal</span></h1>
              <p>Capture memories, relive moments and tell your travel stories.</p>
            </div>
          </div>
          <p className="journal-hero__script">Collect Moments<br />Not Things <span aria-hidden="true">♥</span></p>
        </section>

        <div className="journal-main">
          <div className="journal-toolbar">
            <div className="journal-tabs" role="group" aria-label="Filter journal entries">
              {FILTERS.map((filter) => (
                <button key={filter.id} type="button" aria-pressed={activeFilter === filter.id} className={`journal-tab${activeFilter === filter.id ? ' is-active' : ''}`} onClick={() => setActiveFilter(filter.id)}>
                  <span className="material-symbols-rounded" aria-hidden="true">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
            <button className="journal-button journal-button--primary journal-new-entry" type="button" onClick={() => setIsCreating(true)} disabled={!!initialData.error}>
              <span className="material-symbols-rounded" aria-hidden="true">add</span>
              New Journal Entry
            </button>
          </div>

          <div className="journal-search">
            <span className="material-symbols-rounded" aria-hidden="true">search</span>
            <input type="search" aria-label="Search journal entries" placeholder="Search titles, destinations, stories or tags…" value={search} onChange={(event) => setSearch(event.target.value)} />
            {search && <button type="button" aria-label="Clear journal search" onClick={() => setSearch('')}><span className="material-symbols-rounded">close</span></button>}
          </div>

          {initialData.error && <div className="journal-notice journal-notice--error" role="alert">{initialData.error} Your saved entries are protected; fix the stored data or browser storage and reload to continue.</div>}
          <div className="journal-content">
            <section className="journal-entries" aria-label="Journal entries">
              <div className="journal-results-heading">
                <div><span className="journal-eyebrow">A LITTLE MORE WANDERLUST</span><h2>{FILTERS.find((filter) => filter.id === activeFilter)?.label}</h2></div>
                <span>{filteredEntries.length} {filteredEntries.length === 1 ? 'story' : 'stories'}</span>
              </div>
              {filteredEntries.length ? (
                <div className="journal-grid">
                  {filteredEntries.map((entry) => (
                    <JournalCard
                      key={entry.id}
                      entry={entry}
                      isDemo={entry.isDemo}
                      favorite={entry.favorite}
                      bookmarked={entry.isDemo ? (initialData.demoState.bookmarks || []).includes(entry.id) : !!entry.bookmarked}
                      menuOpen={openMenuId === entry.id}
                      readOnly={!!initialData.error}
                      onFavorite={handleFavorite}
                      onBookmark={handleBookmark}
                      onMenu={(id) => setOpenMenuId((current) => current === id ? null : id)}
                      onEdit={openEdit}
                      onDelete={handleDelete}
                      onOpenStory={openStory}
                    />
                  ))}
                </div>
              ) : (
                <div className="journal-empty">
                  <span className="material-symbols-rounded" aria-hidden="true">{search ? 'search_off' : activeFilter === 'favorite' ? 'favorite_border' : 'menu_book'}</span>
                  <h3>{search ? 'No matching memories' : activeFilter === 'favorite' ? 'No favorites just yet' : `No ${activeFilter === 'all' ? '' : `${activeFilter}s `}entries yet`}</h3>
                  <p>{search ? 'Try another destination, title, or tag.' : 'Add a memory to start filling this part of your journal.'}</p>
                  {!search && <button className="journal-button journal-button--primary" type="button" onClick={() => setIsCreating(true)}>Write an entry</button>}
                </div>
              )}
            </section>

            <aside className="journal-aside" aria-label="Travel journal information">
              <section className="journal-panel journal-stats-panel">
                <div className="journal-panel__heading"><span className="material-symbols-rounded" aria-hidden="true">bar_chart</span><h2>Travel Stats</h2></div>
                <div className="journal-stat-grid">
                  {stats.map((stat) => (
                    <div className="journal-stat" key={stat.label}>
                      <span className={`journal-stat__icon is-${stat.color}`}><span className="material-symbols-rounded" aria-hidden="true">{stat.icon}</span></span>
                      <span className="journal-stat__value">{stat.value}</span>
                      <span className="journal-stat__label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="journal-panel journal-recent-panel">
                <div className="journal-panel__heading"><span className="material-symbols-rounded" aria-hidden="true">location_on</span><h2>Recent Destinations</h2></div>
                {recentDestinations.length ? (
                  <ul className="journal-recent-list">
                    {recentDestinations.map((entry) => (
                      <li key={entry.id}>
                        <button type="button" className="journal-recent-destination" onClick={() => openDestination(entry)}>
                          <img src={entry.image || FALLBACK_IMAGE} alt="" loading="lazy" onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = FALLBACK_IMAGE;
                          }} />
                          <span className="journal-recent-destination__copy"><strong>{entry.destination}</strong><small>{formatDate(entry.date, { month: 'short', year: 'numeric' })}</small></span>
                          <span className="material-symbols-rounded journal-recent-destination__arrow" aria-hidden="true">chevron_right</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : <p className="journal-aside-empty">Your recent places will appear here.</p>}
              </section>

              <figure className="journal-quote">
                <span className="material-symbols-rounded journal-quote__icon" aria-hidden="true">send</span>
                <blockquote>“Travel is the only thing you buy that makes you richer.”</blockquote>
                <span className="journal-quote__rule" />
              </figure>
            </aside>
          </div>
        </div>
      </main>

      {(isCreating || modalEntry) && (
        <JournalEntryForm
          key={modalEntry?.id || 'new-entry'}
          entry={modalEntry}
          bookings={bookings}
          onCancel={() => {
            setIsCreating(false);
            setModalEntry(null);
          }}
          onSave={handleSave}
        />
      )}
    </>
  );
}
