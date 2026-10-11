import assert from 'node:assert/strict';
import { test } from 'node:test';

let moduleId = 0;
async function setup(t, configured = true) {
  for (const name of ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']) {
    const previous = process.env[name];
    t.after(() => previous === undefined ? delete process.env[name] : process.env[name] = previous);
    delete process.env[name];
  }
  if (configured) {
    process.env.SUPABASE_URL = 'https://rate-limit.invalid';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only';
  }
  t.mock.method(console, 'warn', () => {});
  return import(`../lib/rate-limit.js?test=${++moduleId}`);
}

const request = { key: 'admin-login:test', limit: 2, windowMs: 60000, requirePersistent: true };
const resetAt = new Date(Date.now() + 60000).toISOString();

test('admin requires persistent protection even when credentials are missing', async (t) => {
  const { rateLimit } = await setup(t, false);
  const fetch = t.mock.method(globalThis, 'fetch', () => { throw new Error('Must not call network'); });
  const result = await rateLimit(request);
  assert.equal(result.success, false);
  assert.equal(result.unavailable, true);
  assert.ok(result.resetTime > Date.now());
  assert.equal(fetch.mock.callCount(), 0);
});

test('admin respects persistent allow and denial results', async (t) => {
  const { rateLimit, rateLimitResponse } = await setup(t);
  const fetch = t.mock.method(globalThis, 'fetch', async () => Response.json([{ allowed: true, remaining: 1, reset_at: resetAt }]));
  assert.equal((await rateLimit(request)).success, true);
  const [url, options] = fetch.mock.calls[0].arguments;
  assert.equal(url, 'https://rate-limit.invalid/rest/v1/rpc/check_rate_limit');
  assert.deepEqual(JSON.parse(options.body), { p_key: request.key, p_limit: 2, p_window_seconds: 60 });
  fetch.mock.mockImplementation(async () => Response.json([{ allowed: false, remaining: 0, reset_at: resetAt }]));
  const denied = await rateLimit(request);
  assert.equal(denied.success, false);
  assert.equal(denied.unavailable, undefined);
  assert.equal(rateLimitResponse(denied.resetTime).status, 429);
});

for (const failure of ['network', 'http', 'invalid', 'string-boolean', 'bad-date']) {
  test(`admin fails closed on ${failure} failure and during retry cooldown`, async (t) => {
    const { rateLimit } = await setup(t);
    const fetch = t.mock.method(globalThis, 'fetch', async () => {
      if (failure === 'network') throw new Error('Network unavailable');
      if (failure === 'http') return new Response('', { status: 503 });
      if (failure === 'invalid') return Response.json([]);
      return Response.json({ allowed: failure === 'string-boolean' ? 'false' : true, reset_at: failure === 'bad-date' ? 'invalid' : resetAt });
    });
    for (let i = 0; i < 2; i++) {
      const result = await rateLimit(request);
      assert.equal(result.success, false);
      assert.equal(result.unavailable, true);
    }
    assert.equal(fetch.mock.callCount(), 1);
    // Public forms retain bounded local fallback during a database outage.
    assert.equal((await rateLimit({ ...request, requirePersistent: false })).success, true);
    assert.equal((await rateLimit({ ...request, requirePersistent: false })).success, true);
    assert.equal((await rateLimit({ ...request, requirePersistent: false })).success, false);
  });
}
