import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toCustomerOrder } from '../lib/customer-order.js';
import { createAdminSession, verifyAdminSession, verifyAdminPassword, isAdminAuthorized, adminCookieOptions } from '../lib/admin-auth.js';

function adminEnvironment(t) {
  for (const name of ['ADMIN_ORDERS_PASSWORD', 'ADMIN_SESSION_SECRET']) {
    const previous = process.env[name];
    t.after(() => previous === undefined ? delete process.env[name] : process.env[name] = previous);
    process.env[name] = `test-only-${name}`;
  }
}

test('customer order projection excludes private data and newly added database fields', () => {
  const publicEvent = { title: 'Printing', description: 'In production', createdAt: '2026-10-11', isCustomerVisible: true };
  const input = {
    orderNumber: 'PNP-TEST', publicNote: 'Ready soon',
    customerEmail: 'customer@example.test', customerPhone: '555-0100',
    internalNote: 'PRIVATE', vendorCost: 12, vendorName: 'PRIVATE',
    invoiceTotal: 100, trackingToken: 'PRIVATE', id: 'PRIVATE',
    newPrivateField: 'PRIVATE', proofFileUrl: 'PRIVATE', invoiceUrl: 'PRIVATE', designFileUrl: 'PRIVATE',
    timelineEvents: [
      { ...publicEvent, id: 'PRIVATE', internalNote: 'PRIVATE' },
      { title: 'PRIVATE', description: 'PRIVATE', isCustomerVisible: false },
      { title: 'PRIVATE', description: 'PRIVATE' },
    ],
  };
  const result = toCustomerOrder(input);
  assert.equal(result.orderNumber, 'PNP-TEST');
  assert.equal(result.publicNote, 'Ready soon');
  assert.deepEqual(result.timelineEvents, [publicEvent]);
  for (const field of ['customerEmail', 'customerPhone', 'internalNote', 'vendorCost', 'vendorName', 'invoiceTotal', 'trackingToken', 'id', 'newPrivateField', 'proofFileUrl', 'invoiceUrl', 'designFileUrl']) {
    assert.equal(Object.hasOwn(result, field), false, field);
  }
  assert.equal(JSON.stringify(result).includes('PRIVATE'), false);
  assert.equal(input.timelineEvents.length, 3);
});

test('customer projection handles missing orders and empty timelines', () => {
  assert.equal(toCustomerOrder(null), null);
  assert.deepEqual(toCustomerOrder({ orderNumber: 'PNP-TEST' }).timelineEvents, []);
});

test('admin sessions reject payload tampering and secret rotation', (t) => {
  adminEnvironment(t);
  const token = createAdminSession();
  assert.equal(verifyAdminSession(token), true);
  const [payload, signature] = token.split('.');
  const changed = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(payload, 'base64url').toString()), expiresAt: Date.now() + 1e10 })).toString('base64url');
  assert.equal(verifyAdminSession(`${changed}.${signature}`), false);
  process.env.ADMIN_SESSION_SECRET = 'rotated-test-secret';
  assert.equal(verifyAdminSession(token), false);
});

test('admin sessions expire after eight hours', (t) => {
  adminEnvironment(t);
  const now = Date.now();
  t.mock.method(Date, 'now', () => now);
  const token = createAdminSession();
  Date.now.mock.mockImplementation(() => now + 8 * 60 * 60 * 1000);
  assert.equal(verifyAdminSession(token), false);
});

test('malformed sessions and missing configuration never authorize', (t) => {
  adminEnvironment(t);
  for (const token of ['', 'garbage', 'a.b', 'a.', '.b']) assert.equal(verifyAdminSession(token), false);
  const token = createAdminSession();
  delete process.env.ADMIN_ORDERS_PASSWORD;
  assert.equal(verifyAdminSession(token), false);
  assert.equal(verifyAdminPassword(''), false);
});

test('admin authorization reads only the admin cookie', (t) => {
  adminEnvironment(t);
  const token = createAdminSession();
  assert.equal(isAdminAuthorized(new Request('https://example.test', { headers: { cookie: `other=x; pnp_admin_session=${token}` } })), true);
  assert.equal(isAdminAuthorized(new Request('https://example.test', { headers: { cookie: `other=${token}` } })), false);
  assert.equal(isAdminAuthorized(new Request('https://example.test', { headers: { cookie: 'pnp_admin_session=%invalid' } })), false);
  assert.equal(verifyAdminPassword('wrong'), false);
  assert.equal(verifyAdminPassword(process.env.ADMIN_ORDERS_PASSWORD), true);
  assert.equal(adminCookieOptions().httpOnly, true);
  assert.equal(adminCookieOptions().sameSite, 'lax');
});
