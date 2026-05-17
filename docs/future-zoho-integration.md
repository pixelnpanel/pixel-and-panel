# Future Zoho Books Integration

Current decision: keep Pixel & Panel order tracking manual for now.

Use Zoho Books manually for quotes, estimates, invoices, payments, and accounting. Use the website admin page at `/admin/orders` to manually create customer tracking records and update customer-visible status, notes, proof status, payment status, delivery/install details, and target dates.

Do not reconnect the website to Zoho Books until the Zoho plan supports the needed custom fields, webhook automation, or API workflow cleanly.

When the Zoho plan is upgraded, recommended website update:

1. Add Zoho Books OAuth environment variables only on the server.
2. Map website orders to Zoho estimates, sales orders, or invoices.
3. Add a private sync action in `/admin/orders`.
4. Add Zoho webhook handling so Zoho status updates can update Supabase order tracking.
5. Keep customer tracking fields simple: order number, customer contact, product, quantity, payment status, proof status, production status, next action, target date, and public note.

If future work asks what the website needs next, recommend this integration only after the Zoho subscription supports custom fields/webhooks/API automation.
