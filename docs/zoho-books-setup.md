# Zoho Books Setup

Pixel & Panel website can sync admin orders to Zoho Books as either:

- Estimate
- Sales Order

Zoho Books should own accounting, invoice numbers, payments, and tax records. The website should own customer-facing production status.

## Environment Variables

Add these to `.env.local` and Vercel:

```bash
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_ORGANIZATION_ID=
ZOHO_WEBHOOK_SECRET=choose-a-long-private-secret
```

Optional, only if your Zoho account is outside the US data center:

```bash
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_BOOKS_API_URL=https://www.zohoapis.com/books/v3
```

Common data centers:

- US: `https://accounts.zoho.com`, `https://www.zohoapis.com/books/v3`
- EU: `https://accounts.zoho.eu`, `https://www.zohoapis.eu/books/v3`
- India: `https://accounts.zoho.in`, `https://www.zohoapis.in/books/v3`

## OAuth Setup

1. Open Zoho API Console.
2. Create a Self Client or server-based app.
3. Generate a grant token with Books scopes for contacts, estimates, sales orders, invoices, and settings/webhooks.
4. Exchange grant token for refresh token.
5. Save refresh token in `ZOHO_REFRESH_TOKEN`.

Keep refresh token and client secret private.

## Website Admin Workflow

1. Open `/admin/orders`.
2. Log in with the admin username and password.
3. Create or select an order.
4. Add unit price. Zoho sync requires price.
5. Click `Sync Zoho estimate` or `Sync Zoho sales order`.
6. Website saves Zoho IDs back to Supabase.

For cleaner Zoho reporting, choose a product name from the admin product dropdown.
If the product name matches an active Zoho Books item, the website sends Zoho `item_id`
on the estimate or sales order line item. Custom product names still sync, but they do
not attach to a Zoho catalog item.

## Webhook

Webhook endpoint:

```txt
POST https://pixelnpanel.com/api/webhooks/zoho-books?secret=ZOHO_WEBHOOK_SECRET
```

Use Zoho Books automation/webhooks to send invoice, estimate, or sales order updates to this URL.

The webhook uses `reference_number` to find the website order. Set Zoho reference number equal to website order number such as `PNP-1007`.

Recommended Zoho custom fields for customer tracking:

```txt
Website Tracking Status
Proof Status
Next Action
Customer Note
Target Date
Delivery / Install
```

Use these exact values for `Website Tracking Status`:

```txt
Quote received
Review in progress
Proof ready
Awaiting approval
In production
Install scheduled
Completed
```

When Zoho sends these fields in a webhook, the website updates the customer tracking page.
`Customer Note` becomes the public note and timeline message.

## Recommended Flow

Start with:

```txt
Website admin order -> Zoho estimate -> customer accepts -> Zoho invoice/payment -> Zoho webhook updates website tracker
```

Later:

```txt
Zoho sales order -> production workflow -> proof approval -> install/pickup completion
```
