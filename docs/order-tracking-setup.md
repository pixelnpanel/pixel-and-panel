# Order Tracking Setup

The customer page is token-based:

```txt
/track/[trackingToken]
```

Example seeded by `docs/order-tracking-supabase.sql`:

```txt
https://www.pixelnpanel.com/track/o_8f3x92private
```

The older `/track-order` lookup page can still ask for an order number plus matching contact info, but customer share links should use the private tracking token route above.

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `docs/order-tracking-supabase.sql`.
4. Run `docs/rate-limit-supabase.sql` to enable persistent API rate limiting for the older lookup endpoint.
5. Add these environment variables in Vercel and local `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_ORDERS_PASSWORD=choose-a-strong-admin-password
ADMIN_SESSION_SECRET=choose-a-long-random-secret
```

Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or prefix it with `NEXT_PUBLIC_`.
Do not store the admin password in code or GitHub. Keep it in environment variables only.

## Data Flow

Admin creates and updates orders manually at:

```txt
/admin/orders
```

The admin page calls:

```txt
GET /api/admin/orders
POST /api/admin/orders
PATCH /api/admin/orders/:orderNumber
POST /api/admin/orders/:orderNumber/timeline
DELETE /api/admin/orders/:orderNumber
```

The customer token route reads:

- `orders.tracking_token`
- customer-safe order fields
- customer-visible rows in `order_timeline_events`

The customer route does not render customer email, customer phone, unit price, vendor fields, vendor cost, Stripe fee, internal notes, Supabase IDs, admin controls, or private file URLs.

## Manual-Only Scope

Use Supabase as the only order tracking data source for now.

Do not build Zoho integration, Stripe webhook integration, or automatic payment sync yet. Enter invoice/payment status and production updates manually in `/admin/orders`.
