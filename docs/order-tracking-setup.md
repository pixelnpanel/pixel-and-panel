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
ORDER_ADMIN_TOKEN=choose-a-long-private-token
ZOHO_CLIENT_ID=your-zoho-client-id
ZOHO_CLIENT_SECRET=your-zoho-client-secret
ZOHO_REFRESH_TOKEN=your-zoho-refresh-token
ZOHO_ORGANIZATION_ID=your-zoho-organization-id
ZOHO_WEBHOOK_SECRET=choose-a-long-private-secret
```

Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or prefix it with `NEXT_PUBLIC_`.
Do not share `ORDER_ADMIN_TOKEN` with customers.
Do not expose Zoho client secret or refresh token in browser code.

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

The page asks for `ORDER_ADMIN_TOKEN`, then calls:

```txt
GET /api/admin/orders
POST /api/admin/orders
PATCH /api/admin/orders/:orderNumber
```

Without Supabase env vars, admin can load the demo order but cannot create or update orders.

Zoho setup lives in `docs/zoho-books-setup.md`.
