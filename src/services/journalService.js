import { DEFAULT_DEMO_FAVORITES } from '../data/journalEntries';

const JOURNAL_KEY_PREFIX = 'travio_journal_entries_v2:';
const DEMO_STATE_KEY_PREFIX = 'travio_journal_demo_state:';
const LEGACY_ENTRIES_KEY = 'travio_journal_entries';
const LEGACY_IMPORT_KEY = 'travio_journal_entries_legacy_imported';

function getOwnerKey() {
  return encodeURIComponent(getJournalOwner());
}

export function getJournalOwner() {
  const email = localStorage.getItem('auth_email')
    || JSON.parse(localStorage.getItem('travio_user_profile') || '{}').email
    || 'guest';
  return email.trim().toLowerCase() || 'guest';
}

// Reject malformed saved data instead of silently replacing it with an empty value.
function readJson(key, fallback, validate) {
  const stored = localStorage.getItem(key);
  if (stored === null) return fallback;

  let value;
  try {
    value = JSON.parse(stored);
  } catch (error) {
    throw new Error(`Saved journal data could not be read (${error.message}).`);
  }

  if (!validate(value)) {
    throw new Error('Saved journal data has an unexpected format and was not changed.');
  }
  return value;
}

function readUserEntries(ownerKey) {
  const key = `${JOURNAL_KEY_PREFIX}${ownerKey}`;
  const stored = localStorage.getItem(key);
  if (stored !== null) return readJson(key, [], Array.isArray);

  // Import the pre-account journal once, then scope future reads to the active owner.
  const legacyOwner = localStorage.getItem(LEGACY_IMPORT_KEY);
  const legacy = localStorage.getItem(LEGACY_ENTRIES_KEY);
  if (legacy === null || legacyOwner) return [];

  const entries = readJson(LEGACY_ENTRIES_KEY, [], Array.isArray);
  localStorage.setItem(key, JSON.stringify(entries));
  localStorage.setItem(LEGACY_IMPORT_KEY, ownerKey);
  return entries;
}

export function loadJournalData() {
  const ownerKey = getOwnerKey();
  const demoState = readJson(
    `${DEMO_STATE_KEY_PREFIX}${ownerKey}`,
    { favorites: DEFAULT_DEMO_FAVORITES, overrides: {}, hidden: [] },
    (value) => value && Array.isArray(value.favorites) && value.overrides && typeof value.overrides === 'object' && Array.isArray(value.hidden)
  );

  // Keep personal entries and editable sample-story state separate for this owner.
  return {
    userEntries: readUserEntries(ownerKey),
    demoState
  };
}

export function saveUserEntries(entries) {
  if (!Array.isArray(entries)) throw new Error('Journal entries must be a list.');
  localStorage.setItem(`${JOURNAL_KEY_PREFIX}${getOwnerKey()}`, JSON.stringify(entries));
}

export function saveDemoState(state) {
  localStorage.setItem(`${DEMO_STATE_KEY_PREFIX}${getOwnerKey()}`, JSON.stringify(state));
}

const COMMUNITY_KEY_PREFIX = 'travio_journal_community:';
const MESSAGE_DRAFT_KEY_PREFIX = 'travio_message_drafts:';

export function loadJournalComments(entryId) {
  const key = `${COMMUNITY_KEY_PREFIX}${encodeURIComponent(entryId)}`;
  return readJson(key, [], Array.isArray);
}

export function saveJournalComment(entryId, comment) {
  if (!entryId || !comment?.content?.trim()) throw new Error('A journal entry and comment are required.');
  const key = `${COMMUNITY_KEY_PREFIX}${encodeURIComponent(entryId)}`;
  const comments = readJson(key, [], Array.isArray);
  const next = [...comments, comment];
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

export function toggleJournalCommentLike(entryId, commentId, owner) {
  const key = `${COMMUNITY_KEY_PREFIX}${encodeURIComponent(entryId)}`;
  const comments = readJson(key, [], Array.isArray);
  const next = comments.map((comment) => {
    if (comment.id !== commentId) return comment;
    const likes = new Set(comment.likes || []);
    if (likes.has(owner)) likes.delete(owner);
    else likes.add(owner);
    return { ...comment, likes: [...likes] };
  });
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

export function loadMessageDrafts() {
  const key = `${MESSAGE_DRAFT_KEY_PREFIX}${getOwnerKey()}`;
  return readJson(key, [], Array.isArray);
}

export function saveMessageDraft(draft) {
  if (!draft?.entryId || !draft?.writerId || !draft?.content?.trim()) {
    throw new Error('A writer and message draft are required.');
  }
  const key = `${MESSAGE_DRAFT_KEY_PREFIX}${getOwnerKey()}`;
  const drafts = readJson(key, [], Array.isArray);
  const next = [
    ...drafts.filter((item) => item.entryId !== draft.entryId || item.writerId !== draft.writerId),
    { ...draft, content: draft.content.trim(), updatedAt: new Date().toISOString() }
  ];
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}
