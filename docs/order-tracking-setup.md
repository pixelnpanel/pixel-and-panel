# Order Tracking Setup

The public page is `/track-order`.

Local demo lookup works without Supabase:

- Order number: `PNP-1007`
- Email: `customer@example.com`
- Phone: `(409) 800-6139`

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `docs/order-tracking-supabase.sql`.
4. Add these server-only environment variables in Vercel and local `.env.local`:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD_SALT=generated-password-salt
ADMIN_PASSWORD_HASH=generated-password-hash
ADMIN_SESSION_SECRET=choose-a-long-random-secret
```

Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or prefix it with `NEXT_PUBLIC_`.
Do not store the raw admin password in code or GitHub. Only store the generated salt/hash and session secret in environment variables.

## Data Flow

`/track-order` sends order number and customer email or phone to:

```txt
POST /api/orders/lookup
```

The API checks:

- `orders.order_number`
- matching `customer_email` or `customer_phone`
- customer-visible rows in `order_updates`
- customer-visible rows in `order_files`

If Supabase env vars are missing, the API uses the local demo order only.

## Admin

Private admin page:

```txt
/admin/orders
```

The page redirects to `/admin/login`. After login, the browser receives an HTTP-only admin session cookie and calls:

```txt
GET /api/admin/orders
POST /api/admin/orders
PATCH /api/admin/orders/:orderNumber
```

Without Supabase env vars, admin can load the demo order but cannot create or update orders.

Zoho Books integration is intentionally paused while Pixel & Panel uses the free Zoho plan.
Use Zoho manually for quotes/accounting, then update customer-visible order status in `/admin/orders`.
Future Zoho integration notes live in `docs/future-zoho-integration.md`.
