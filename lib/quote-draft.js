// Quote drafts exist only for a language handoff in the same browser tab.
export const QUOTE_DRAFT_KEY = 'pnp:quote-language-draft';
export const QUOTE_DRAFT_EVENT = 'pnp:quote-language-change';
const MAX_AGE_MS = 10 * 60 * 1000;
const TEXT_FIELDS = ['name', 'businessName', 'email', 'phone', 'productField', 'message', 'attachmentName'];

export function encodeQuoteDraft({ selectionKey, language, fields }, now = Date.now()) {
  const safeFields = {};
  for (const key of TEXT_FIELDS) safeFields[key] = typeof fields[key] === 'string' ? fields[key].slice(0, 10000) : '';
  safeFields.step = [0, 1, 2].includes(fields.step) ? fields.step : 0;
  safeFields.serviceIndex = Number.isInteger(fields.serviceIndex) && fields.serviceIndex >= 0 && fields.serviceIndex < 5 ? fields.serviceIndex : -1;
  return JSON.stringify({ selectionKey, language, savedAt: now, fields: safeFields });
}

export function decodeQuoteDraft(raw, { selectionKey, language }, now = Date.now()) {
  try {
    const value = JSON.parse(raw);
    if (!value || value.selectionKey !== selectionKey || value.language === language ||
        !['English', 'Spanish'].includes(value.language) || !Number.isFinite(value.savedAt) ||
        now < value.savedAt || now - value.savedAt > MAX_AGE_MS || !value.fields) return null;
    // Reapply the allowlist when reading storage; never trust arbitrary fields.
    return JSON.parse(encodeQuoteDraft(value, value.savedAt)).fields;
  } catch {
    return null;
  }
}
