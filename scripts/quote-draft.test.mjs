import assert from 'node:assert/strict';
import { test } from 'node:test';
import { encodeQuoteDraft, decodeQuoteDraft } from '../lib/quote-draft.js';
const fields = { name: 'Test Customer', email: 'test@example.test', message: 'Need two banners', step: 2, serviceIndex: 0, attachmentName: 'art.pdf', honeypot: 'excluded', privateExtra: 'excluded' };
const raw = encodeQuoteDraft({ selectionKey: 'banner-8x4', language: 'English', fields }, 1000);
const target = { selectionKey: 'banner-8x4', language: 'Spanish' };

test('language draft retains entered text and step, excludes unrelated fields', () => {
  const draft = decodeQuoteDraft(raw, target, 2000);
  assert.equal(draft.name, fields.name);
  assert.equal(draft.email, fields.email);
  assert.equal(draft.message, fields.message);
  assert.equal(draft.step, 2);
  assert.equal(draft.attachmentName, 'art.pdf');
  assert.equal(Object.hasOwn(draft, 'honeypot'), false);
  assert.equal(Object.hasOwn(draft, 'privateExtra'), false);
});

test('draft cannot leak into another product, same-language visit, or expired session', () => {
  assert.equal(decodeQuoteDraft(raw, { ...target, selectionKey: 'different-product' }, 2000), null);
  assert.equal(decodeQuoteDraft(raw, { ...target, language: 'English' }, 2000), null);
  assert.equal(decodeQuoteDraft(raw, target, 602000), null);
  assert.equal(decodeQuoteDraft(raw, target, 0), null);
  assert.equal(decodeQuoteDraft('bad json', target), null);
  assert.equal(decodeQuoteDraft(null, target), null);
});

test('draft sanitizes arbitrary storage fields and invalid form steps', () => {
  const invalid = encodeQuoteDraft({ selectionKey: 'banner-8x4', language: 'English', fields: { ...fields, step: 99, serviceIndex: -3, phone: {}, message: 'x'.repeat(10001) } }, 1000);
  const draft = decodeQuoteDraft(invalid, target, 2000);
  assert.equal(draft.step, 0);
  assert.equal(draft.serviceIndex, -1);
  assert.equal(draft.phone, '');
  assert.equal(draft.message.length, 10000);
});
