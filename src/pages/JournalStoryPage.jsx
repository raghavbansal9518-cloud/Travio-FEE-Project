import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { DEMO_JOURNAL_ENTRIES } from '../data/journalEntries';
import { getJournalStory } from '../data/journalStoryContent';
import { findLocalDestination } from '../services/destinationService';
import {
  getJournalOwner,
  loadJournalComments,
  loadJournalData,
  loadMessageDrafts,
  saveDemoState,
  saveJournalComment,
  saveMessageDraft,
  saveUserEntries,
  toggleJournalCommentLike
} from '../services/journalService';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';
import './JournalStoryPage.css';

const FALLBACK_IMAGE = '/images/hero-bg.jpg';

function formatStoryDate(value, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!value) return 'Date not provided';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00`) : new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en', options).format(date);
}

function loadEntry(entryId) {
  try {
    const data = loadJournalData();
    const sample = DEMO_JOURNAL_ENTRIES.find((item) => item.id === entryId);
    if (sample && !data.demoState.hidden.includes(sample.id)) {
      return { entry: { ...sample, ...data.demoState.overrides[sample.id], isDemo: true }, data, error: '' };
    }
    const storedEntry = data.userEntries.find((item) => item.id === entryId);
    if (!storedEntry) return { entry: null, data, error: '' };
    const entry = {
      ...storedEntry,
      ownerId: storedEntry.ownerId || getJournalOwner(),
      authorName: storedEntry.authorName || getJournalOwner().split('@')[0],
      status: storedEntry.status || 'published',
      visibility: storedEntry.visibility || 'public',
      date: storedEntry.date || storedEntry.visitDate || ''
    };
    if (entry.visibility === 'private' && entry.ownerId !== getJournalOwner()) {
      return { entry: null, data, error: '' };
    }
    if (entry.status === 'draft' && entry.ownerId !== getJournalOwner()) {
      return { entry: null, data, error: '' };
    }
    return { entry: { ...entry, isDemo: false }, data, error: '' };
  } catch (error) {
    return { entry: null, data: null, error: error.message || 'The story could not be loaded from this browser.' };
  }
}

function loadComments(entryId) {
  try {
    return { items: loadJournalComments(entryId), error: '' };
  } catch (error) {
    return { items: [], error: error.message || 'Comments could not be loaded from this browser.' };
  }
}

function StoryImage({ src, alt, className = '' }) {
  return (
    <img
      className={className}
      src={src || FALLBACK_IMAGE}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = FALLBACK_IMAGE;
      }}
    />
  );
}

function WriterProfileDialog({ writer, onClose }) {
  return (
    <div className="story-dialog-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="story-dialog" role="dialog" aria-modal="true" aria-labelledby="writer-dialog-title">
        <button className="story-icon-button story-dialog__close" type="button" aria-label="Close writer profile" onClick={onClose}>
          <span className="material-symbols-rounded">close</span>
        </button>
        <img src={writer.avatar || '/images/ai-bot.png'} alt="" />
        <span className="story-eyebrow">TRAVIO WRITER</span>
        <h2 id="writer-dialog-title">{writer.name}</h2>
        <p>{writer.bio || 'A traveler sharing stories from the road.'}</p>
        {writer.interests?.length > 0 && (
          <div className="story-interests">{writer.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
        )}
        <p className="story-demo-note">Writer profiles are local editorial examples in this prototype.</p>
      </section>
    </div>
  );
}

function MessageDraftDialog({ entry, writer, onClose }) {
  const [draftState, setDraftState] = useState(() => {
    try {
      return {
        message: loadMessageDrafts().find((draft) => draft.entryId === entry.id && draft.writerId === writer.id)?.content || '',
        error: ''
      };
    } catch (error) {
      return { message: '', error: error.message || 'Saved drafts could not be loaded.' };
    }
  });
  const message = draftState.message;
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const saveDraft = (event) => {
    event.preventDefault();
    if (draftState.error) {
      setError(`A previous draft could not be loaded. ${draftState.error}`);
      return;
    }
    if (!message.trim()) {
      setError('Write a message before saving the draft.');
      return;
    }
    if (message.trim().length > 2000) {
      setError('Messages must be 2,000 characters or fewer.');
      return;
    }
    try {
      saveMessageDraft({ entryId: entry.id, writerId: writer.id, content: message });
      setError('');
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message || 'The draft could not be saved.');
    }
  };

  return (
    <div className="story-dialog-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="story-dialog story-message-dialog" role="dialog" aria-modal="true" aria-labelledby="message-dialog-title">
        <div className="story-dialog__heading">
          <span className="material-symbols-rounded">mail</span>
          <div><span className="story-eyebrow">MESSAGE WRITER</span><h2 id="message-dialog-title">{writer.name}</h2></div>
          <button className="story-icon-button" type="button" aria-label="Close message dialog" onClick={onClose}><span className="material-symbols-rounded">close</span></button>
        </div>
        <div className="story-local-warning" role="status">
          <span className="material-symbols-rounded">info</span>
          <p>Travio messaging is not connected to a server yet. You can save a private draft on this device, but it will <strong>not be delivered</strong> to the writer.</p>
        </div>
        <form onSubmit={saveDraft}>
          <label className="story-comment-label" htmlFor="writer-message">Message draft</label>
          <textarea id="writer-message" value={message} onChange={(event) => {
            setDraftState((current) => ({ ...current, message: event.target.value }));
            setSaved(false);
          }} maxLength={2000} rows={5} placeholder={`Write a note to ${writer.name}…`} />
          {draftState.error && <p className="story-error" role="alert">{draftState.error}</p>}
          <div className="story-form-footer">
            <span>{message.length}/2000 characters</span>
            <button className="story-button story-button--primary" type="submit"><span className="material-symbols-rounded">save</span>Save draft only</button>
          </div>
          {error && <p className="story-error" role="alert">{error}</p>}
          {saved && <p className="story-local-success" role="status">Draft saved on this device. It has not been delivered.</p>}
        </form>
      </section>
    </div>
  );
}

function CommentBranch({ comment, replies, owner, onLike, onReply }) {
  return (
    <article className="story-comment">
      <img src={comment.avatar || '/images/ai-bot.png'} alt="" />
      <div className="story-comment__body">
        <div className="story-comment__heading"><strong>{comment.authorName}</strong><time>{formatStoryDate(comment.createdAt, { day: 'numeric', month: 'short' })}</time></div>
        <p>{comment.content}</p>
        <div className="story-comment__actions">
          <button type="button" onClick={() => onLike(comment.id)} aria-pressed={(comment.likes || []).includes(owner)}>
            <span className="material-symbols-rounded">{(comment.likes || []).includes(owner) ? 'favorite' : 'favorite_border'}</span>{(comment.likes || []).length} Like
          </button>
          <button type="button" onClick={() => onReply(comment.id)}>Reply</button>
        </div>
        {replies.length > 0 && <div className="story-comment__replies">{replies.map((reply) => (
          <div className="story-comment story-comment--reply" key={reply.id}>
            <img src={reply.avatar || '/images/ai-bot.png'} alt="" />
            <div className="story-comment__body">
              <div className="story-comment__heading"><strong>{reply.authorName}</strong><time>{formatStoryDate(reply.createdAt, { day: 'numeric', month: 'short' })}</time></div>
              <p>{reply.content}</p>
            </div>
          </div>
        ))}</div>}
      </div>
    </article>
  );
}

export default function JournalStoryPage() {
  const { t } = useLanguage();
  const { entryId } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted, showToast } = useTravel();
  const [loaded, setLoaded] = useState(() => loadEntry(entryId));
  const [isFavorite, setIsFavorite] = useState(() => {
    const data = loadEntry(entryId);
    return data.entry?.isDemo
      ? data.data?.demoState.favorites.includes(entryId) || false
      : !!data.entry?.favorite;
  });
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const data = loadEntry(entryId);
    return data.entry?.isDemo
      ? data.data?.demoState.bookmarks?.includes(entryId) || false
      : !!data.entry?.bookmarked;
  });
  const [commentState, setCommentState] = useState(() => loadComments(entryId));
  const comments = commentState.items;
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [commentError, setCommentError] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { bookings } = useTravel();

  useEffect(() => {
    const next = loadEntry(entryId);
    setLoaded(next);
    setIsFavorite(next.entry?.isDemo
      ? next.data?.demoState.favorites.includes(entryId) || false
      : !!next.entry?.favorite);
    setIsBookmarked(next.entry?.isDemo
      ? next.data?.demoState.bookmarks?.includes(entryId) || false
      : !!next.entry?.bookmarked);
    setCommentState(loadComments(entryId));
    setCommentText('');
    setReplyTo(null);
    setCommentError('');
  }, [entryId]);

  const entry = loaded.entry;
  const story = useMemo(() => getJournalStory(entry), [entry]);
  const writer = story?.author;
  const owner = getJournalOwner();
  const isOwner = !!entry && !entry.isDemo && entry.ownerId === owner;
  const writerIsSelf = !!entry && !entry.isDemo && entry.ownerId === owner;
  const profile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('travio_user_profile') || '{}');
    } catch {
      return {};
    }
  }, []);

  const toggleFavorite = () => {
    try {
      if (entry.isDemo) {
        const favorites = new Set(loaded.data.demoState.favorites);
        if (favorites.has(entry.id)) favorites.delete(entry.id);
        else favorites.add(entry.id);
        const demoState = { ...loaded.data.demoState, favorites: [...favorites] };
        saveDemoState(demoState);
        setLoaded((current) => ({ ...current, data: { ...current.data, demoState } }));
        setIsFavorite(favorites.has(entry.id));
      } else {
        const nextEntries = loaded.data.userEntries.map((item) => item.id === entry.id ? { ...item, favorite: !isFavorite } : item);
        saveUserEntries(nextEntries);
        setLoaded((current) => ({ ...current, entry: { ...current.entry, favorite: !isFavorite }, data: { ...current.data, userEntries: nextEntries } }));
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      showToast(`Could not update favorite. ${error.message || 'Try again.'}`, 'error');
    }
  };

  const toggleBookmark = () => {
    try {
      if (entry.isDemo) {
        const bookmarks = new Set(loaded.data.demoState.bookmarks || []);
        if (bookmarks.has(entry.id)) bookmarks.delete(entry.id);
        else bookmarks.add(entry.id);
        const demoState = { ...loaded.data.demoState, bookmarks: [...bookmarks] };
        saveDemoState(demoState);
        setLoaded((current) => ({ ...current, data: { ...current.data, demoState } }));
        setIsBookmarked(bookmarks.has(entry.id));
      } else {
        const nextEntries = loaded.data.userEntries.map((item) => item.id === entry.id ? { ...item, bookmarked: !isBookmarked } : item);
        saveUserEntries(nextEntries);
        setLoaded((current) => ({ ...current, entry: { ...current.entry, bookmarked: !isBookmarked }, data: { ...current.data, userEntries: nextEntries } }));
        setIsBookmarked(!isBookmarked);
      }
    } catch (error) {
      showToast(`Could not update bookmark. ${error.message || 'Try again.'}`, 'error');
    }
  };

  const shareStory = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: entry.title, text: `Read ${entry.title} in the Travio journal`, url: window.location.href });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Story link copied.', 'success');
      } else {
        showToast('Sharing is unavailable in this browser.', 'error');
      }
    } catch (error) {
      if (error.name !== 'AbortError') showToast('Could not share this story.', 'error');
    }
  };

  const submitComment = (event) => {
    event.preventDefault();
    if (!commentText.trim()) {
      setCommentError('Write a comment before posting.');
      return;
    }
    if (commentText.trim().length > 1000) {
      setCommentError('Comments must be 1,000 characters or fewer.');
      return;
    }
    try {
      const authorName = profile.name || owner.split('@')[0] || 'Travio traveler';
      const next = saveJournalComment(entry.id, {
        id: `comment-${Date.now()}`,
        entryId: entry.id,
        parentId: replyTo,
        authorId: owner,
        authorName,
        avatar: profile.avatar || '',
        content: commentText.trim(),
        createdAt: new Date().toISOString(),
        likes: []
      });
      setCommentState({ items: next, error: '' });
      setCommentText('');
      setReplyTo(null);
      setCommentError('');
    } catch (error) {
      setCommentError(error.message || 'The comment could not be saved.');
    }
  };

  const likeComment = (commentId) => {
    try {
      setCommentState({ items: toggleJournalCommentLike(entry.id, commentId, owner), error: '' });
      setCommentError('');
    } catch (error) {
      setCommentError(error.message || 'The reaction could not be saved.');
    }
  };

  const saveActivityDestination = (activity) => {
    const destination = findLocalDestination(activity.destinationId || entry.destinationId || entry.destination);
    if (!destination) {
      showToast('This destination is not in the local travel catalog yet.', 'info');
      return;
    }
    if (isWishlisted(destination.id)) {
      showToast(`${destination.name} is already in your wishlist.`, 'info');
      return;
    }
    toggleWishlist(destination);
  };

  const deleteStory = () => {
    if (!isOwner || !window.confirm(`Delete "${entry.title}"? This cannot be undone.`)) return;
    try {
      const next = loaded.data.userEntries.filter((item) => item.id !== entry.id);
      saveUserEntries(next);
      showToast('Journal entry deleted.', 'success');
      navigate('/journal', { replace: true });
    } catch (error) {
      showToast(`Could not delete this story. ${error.message || 'Try again.'}`, 'error');
    }
  };

  const saveEditedStory = (updated, setFormError) => {
    if (!isOwner) {
      setFormError('Only the author can edit this story.');
      return;
    }
    try {
      const nextEntries = loaded.data.userEntries.map((item) => item.id === entry.id ? updated : item);
      saveUserEntries(nextEntries);
      setLoaded((current) => ({ ...current, entry: updated, data: { ...current.data, userEntries: nextEntries } }));
      setIsEditing(false);
      showToast('Journal story updated.', 'success');
    } catch (error) {
      setFormError(`Could not save this story. ${error.message || 'Try again.'}`);
    }
  };

  if (loaded.error) {
    return <><Header /><main className="journal-story-page"><section className="story-state"><span className="material-symbols-rounded">error</span><h1>Story unavailable</h1><p>{loaded.error}</p><Link className="story-button story-button--primary" to="/journal">Back to Journal</Link></section></main></>;
  }

  if (!entry || (entry.status === 'draft' && !isOwner) || (entry.visibility === 'private' && !isOwner)) {
    return <><Header /><main className="journal-story-page"><section className="story-state"><span className="material-symbols-rounded">auto_stories</span><h1>Story not found</h1><p>This story may have been removed, saved as a private draft, or is not available to this profile on this device.</p><Link className="story-button story-button--primary" to="/journal">Back to Journal</Link></section></main></>;
  }

  const destinationInfo = story.destination || findLocalDestination(entry.destinationId || entry.destination);
  const localActivities = story.activities || destinationInfo?.activities || [];
  const commentsByParent = comments.reduce((result, comment) => {
    const key = comment.parentId || 'root';
    result[key] = [...(result[key] || []), comment];
    return result;
  }, {});
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(story.mapQuery || entry.destination)}`;

  return (
    <>
      <Header />
      <main className="journal-story-page">
        <div className="story-topbar">
          <Link className="story-back-link" to="/journal"><span className="material-symbols-rounded">arrow_back</span>{t('phrases.Back to Journal', 'Back to Journal')}</Link>
          <span className="story-reading-type">{entry.status === 'draft' ? t('Private draft', 'Private draft') : entry.isDemo ? t('Sample story', 'Sample story') : t('Travel story', 'Travel story')}</span>
        </div>

        <section className="story-hero">
          <StoryImage className="story-hero__cover" src={entry.image} alt={`${entry.destination} landscape`} />
          <div className="story-hero__shade" />
          <div className="story-hero__content">
            <div className="story-meta-chips"><span>{entry.kind || 'Trip'}</span>{entry.tags?.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <h1>{entry.title}</h1>
            <p className="story-hero__destination"><span className="material-symbols-rounded">location_on</span>{entry.destination}</p>
            <div className="story-author-line">
              <img src={writer.avatar || '/images/ai-bot.png'} alt="" />
              <span><strong>{writer.name}</strong><small>Story by · {formatStoryDate(entry.date)}</small></span>
            </div>
            <div className="story-hero__actions">
              <button className={`story-button${isFavorite ? ' is-selected' : ''}`} type="button" onClick={toggleFavorite} aria-pressed={isFavorite}><span className="material-symbols-rounded">{isFavorite ? 'favorite' : 'favorite_border'}</span>{isFavorite ? t('Favorited', 'Favorited') : t('Favorite', 'Favorite')}</button>
              <button className={`story-button${isBookmarked ? ' is-selected' : ''}`} type="button" onClick={toggleBookmark} aria-pressed={isBookmarked}><span className="material-symbols-rounded">{isBookmarked ? 'bookmark_added' : 'bookmark_add'}</span>{isBookmarked ? t('Saved', 'Saved') : t('Bookmark', 'Bookmark')}</button>
              <button className="story-button" type="button" onClick={shareStory}><span className="material-symbols-rounded">share</span>{t('Share', 'Share')}</button>
              {isOwner && <>
                <button className="story-button" type="button" onClick={() => setIsEditing(true)}><span className="material-symbols-rounded">edit</span>{t('Edit story', 'Edit story')}</button>
                <button className="story-button story-button--danger" type="button" onClick={deleteStory}><span className="material-symbols-rounded">delete</span>{t('Delete', 'Delete')}</button>
              </>}
            </div>
          </div>
          <div className="story-hero__date"><span className="material-symbols-rounded">calendar_month</span>Visited {formatStoryDate(entry.date)}{entry.endDate && ` – ${formatStoryDate(entry.endDate)}`}</div>
        </section>

        {entry.status === 'draft' && <div className="story-draft-notice"><span className="material-symbols-rounded">edit_note</span>This draft is visible only in this browser profile.</div>}

        <div className="story-layout">
          <article className="story-article">
            <div className="story-byline">
              <span>Published {formatStoryDate(story.publishedAt)}</span>
              <span className="story-dot" />
              <span>{story.duration || entry.duration || 'A few days'} in the making</span>
              {story.budget && <span className="story-budget-inline">{story.budget}</span>}
            </div>
            <p className="story-introduction">{story.introduction}</p>

            {(story.story || []).map((section) => (
              <section className="story-prose-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => <p key={`${section.heading}-${index}`}>{paragraph}</p>)}
              </section>
            ))}

            {story.gallery?.length > 0 && (
              <section className="story-gallery" aria-label="Story photos">
                {story.gallery.map((photo, index) => (
                  <button type="button" key={`${photo.image}-${index}`} onClick={() => setActiveImage(photo)} aria-label={`Open photo: ${photo.alt}`}>
                    <StoryImage src={photo.image} alt={photo.alt} />
                  </button>
                ))}
              </section>
            )}

            {story.itinerary?.length > 0 && (
              <section className="story-section story-itinerary">
                <div className="story-section-heading"><span className="material-symbols-rounded">route</span><div><span className="story-eyebrow">{t('THE ROUTE', 'THE ROUTE')}</span><h2>{t('Day-by-day itinerary', 'Day-by-day itinerary')}</h2></div></div>
                {story.itinerary.map((day) => (
                  <details key={day.title}>
                    <summary>{day.title}<span className="material-symbols-rounded">expand_more</span></summary>
                    <ul>{day.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </details>
                ))}
              </section>
            )}

            {story.tips?.length > 0 && (
              <section className="story-tip-card">
                <div className="story-section-heading"><span className="material-symbols-rounded">lightbulb</span><div><span className="story-eyebrow">{t('NOTES FROM THE ROAD', 'NOTES FROM THE ROAD')}</span><h2>{t('Tips we wish we knew', 'Tips we wish we knew')}</h2></div></div>
                <ul>{story.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
              </section>
            )}

            <section className="story-section story-activities">
              <div className="story-section-heading"><span className="material-symbols-rounded">hiking</span><div><span className="story-eyebrow">{t('MAKE IT YOUR OWN', 'MAKE IT YOUR OWN')}</span><h2>{t('Activities & experiences', 'Activities & experiences')}</h2></div></div>
              {localActivities.length ? (
                <div className="story-activity-list">
                  {localActivities.map((activity, index) => {
                    const activityName = activity.name || activity.title;
                    return (
                      <article className="story-activity" key={activity.id || activity.name || activity.title || index}>
                        <StoryImage src={activity.image || entry.image} alt="" />
                        <div className="story-activity__copy"><h3>{activityName}</h3><p>{activity.description || activity.desc}</p><span>{activity.location || entry.destination} · {activity.duration || 'Time varies'} · {activity.cost || activity.price || 'Check local prices'}</span></div>
                        <button className="story-icon-button" type="button" aria-label={`Save ${activityName} destination to wishlist`} onClick={() => saveActivityDestination(activity)}><span className="material-symbols-rounded">favorite_border</span></button>
                      </article>
                    );
                  })}
                </div>
              ) : <p className="story-muted">The writer has not added recommended activities for this entry.</p>}
            </section>

            <section className="story-comments">
              <div className="story-section-heading"><span className="material-symbols-rounded">forum</span><div><span className="story-eyebrow">{t('SHARE A THOUGHT', 'SHARE A THOUGHT')}</span><h2>{t('Join the conversation', 'Join the conversation')}</h2></div></div>
              <div className="story-local-warning story-local-warning--compact" role="note"><span className="material-symbols-rounded">info</span><p>Comments are stored only in this browser. They are not shared with the writer or other Travio users until a community backend is connected.</p></div>
              {commentState.error && <p className="story-error" role="alert">{commentState.error}</p>}
              <form className="story-comment-form" onSubmit={submitComment}>
                <img src={profile.avatar || '/images/ai-bot.png'} alt="" />
                <div><label className="story-comment-label" htmlFor="story-comment">{replyTo ? 'Write a reply' : 'Add a comment'}</label><textarea id="story-comment" value={commentText} maxLength={1000} onChange={(event) => setCommentText(event.target.value)} placeholder="What did this story make you think of?" rows={3} /></div>
                <div className="story-comment-form__actions">
                  {replyTo && <button className="story-text-button" type="button" onClick={() => setReplyTo(null)}>Cancel reply</button>}
                  <button className="story-button story-button--primary" type="submit"><span className="material-symbols-rounded">send</span>{replyTo ? 'Add reply locally' : 'Post locally'}</button>
                </div>
              </form>
              {commentError && <p className="story-error" role="alert">{commentError}</p>}
              <div className="story-comments-list">
                {commentsByParent.root?.length ? commentsByParent.root.map((comment) => (
                  <CommentBranch key={comment.id} comment={comment} replies={commentsByParent[comment.id] || []} owner={owner} onLike={likeComment} onReply={(id) => setReplyTo(id)} />
                )) : <p className="story-muted">{commentState.error ? 'Comments are unavailable until the saved data can be read.' : 'No local comments yet. Start the conversation.'}</p>}
              </div>
            </section>
          </article>

          <aside className="story-sidebar">
            <section className="story-side-card story-writer-card">
              <span className="story-eyebrow">{t('ABOUT THE WRITER', 'ABOUT THE WRITER')}</span>
              <div className="story-writer-card__profile"><img src={writer.avatar || '/images/ai-bot.png'} alt="" /><div><h2>{writer.name}</h2><span>{writer.bio}</span></div></div>
              <div className="story-writer-card__stats"><span><strong>{entry.isDemo ? DEMO_JOURNAL_ENTRIES.filter((item) => item.id.startsWith('demo-')).length : loaded.data.userEntries.filter((item) => item.ownerId === entry.ownerId && item.status !== 'draft').length}</strong> stories</span><span><strong>{writer.interests?.length || 0}</strong> travel interests</span></div>
              {writer.interests?.length > 0 && <div className="story-interests">{writer.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>}
              <button type="button" className="story-button story-button--secondary story-full-width" onClick={() => setIsProfileOpen(true)}><span className="material-symbols-rounded">person</span>{t('View Profile', 'View Profile')}</button>
              <button type="button" className="story-button story-button--primary story-full-width" disabled={writerIsSelf} onClick={() => setIsMessageOpen(true)}><span className="material-symbols-rounded">mail</span>{writerIsSelf ? t('This is your story', 'This is your story') : t('Message Writer', 'Message Writer')}</button>
            </section>

            <section className="story-side-card story-destination-card">
              <div className="story-section-heading"><span className="material-symbols-rounded">explore</span><div><span className="story-eyebrow">{t('DESTINATION GUIDE', 'DESTINATION GUIDE')}</span><h2>{entry.destination}</h2></div></div>
              <p>{destinationInfo?.overview || destinationInfo?.description || 'Destination details have not been added to the local travel guide yet.'}</p>
              {destinationInfo ? (
                <>
                  {destinationInfo.bestTime && <div className="story-destination-row"><span>{t('Best time', 'Best time')}</span><strong>{destinationInfo.bestTime}</strong></div>}
                  {destinationInfo.weather && <div className="story-destination-row"><span>{t('Seasonal climate guide', 'Seasonal climate guide')}</span><strong>{destinationInfo.weather.bestSeason || destinationInfo.weather.condition}</strong></div>}
                  {destinationInfo.attractions?.length > 0 && <div className="story-destination-block"><h3>{t('Highlights', 'Highlights')}</h3><ul>{destinationInfo.attractions.map((place) => <li key={place}>{place}</li>)}</ul></div>}
                  {destinationInfo.topPlaces?.length > 0 && <div className="story-destination-block"><h3>{t('Places to explore', 'Places to explore')}</h3><ul>{destinationInfo.topPlaces.slice(0, 4).map((place) => <li key={place.name}>{place.name}</li>)}</ul></div>}
                  {destinationInfo.food?.length > 0 && <div className="story-destination-block"><h3>{t('Local food', 'Local food')}</h3><ul>{destinationInfo.food.map((food) => <li key={food}>{food}</li>)}</ul></div>}
                  {destinationInfo.transport && <div className="story-destination-row"><span>{t('Getting around', 'Getting around')}</span><strong>{destinationInfo.transport}</strong></div>}
                  {destinationInfo.safety && <div className="story-destination-row"><span>{t('Travel note', 'Travel note')}</span><strong>{destinationInfo.safety}</strong></div>}
                </>
              ) : <p className="story-muted">No live or curated guide data is available for this place yet.</p>}
              {story.budget && <div className="story-destination-row"><span>Writer's budget note</span><strong>{story.budget}</strong></div>}
              {entry.destinationId && <Link className="story-button story-button--secondary story-full-width" to={`/destination/${entry.destinationId}`}><span className="material-symbols-rounded">open_in_new</span>{t('Explore destination', 'Explore destination')}</Link>}
              <a className="story-map-link" href={mapUrl} target="_blank" rel="noreferrer"><span className="material-symbols-rounded">map</span>{t('View on map', 'View on map')}</a>
            </section>
          </aside>
        </div>
      </main>

      {isProfileOpen && <WriterProfileDialog writer={writer} onClose={() => setIsProfileOpen(false)} />}
      {isMessageOpen && <MessageDraftDialog entry={entry} writer={writer} onClose={() => setIsMessageOpen(false)} />}
      {isEditing && <JournalEntryForm entry={entry} bookings={bookings} onCancel={() => setIsEditing(false)} onSave={saveEditedStory} />}
      {activeImage && (
        <div className="story-lightbox" role="presentation" onClick={() => setActiveImage(null)}>
          <button type="button" aria-label="Close photo" onClick={() => setActiveImage(null)}><span className="material-symbols-rounded">close</span></button>
          <StoryImage src={activeImage.image} alt={activeImage.alt} />
        </div>
      )}
    </>
  );
}
