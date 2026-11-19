# Short inquiry references

The database registry reserves each four-character PNP code permanently. It also
keeps a separate internal UUID and the existing retry digest for each inquiry.
The registry contains no customer contact details or artwork.
There are 1,679,616 possible codes, including those reserved by prior orders.
Monitor registry usage as it grows and extend the format before it runs low.

## Before activation

1. Verify the Vercel project's service-role connection to Supabase and confirm
   the existing order lookup works with an authorized test order.
2. Rehearse [the migration](pnp-reference-registry.sql) against the current
   production schema in an isolated database. Existing short order numbers are
   reserved in the migration. If two stored order numbers normalize to the
   same short code, the transaction aborts. Investigate those records before
   retrying. Rehearse during a quiet period because the migration locks the
   orders table while reserving the existing numbers.
3. Apply the SQL once as the Supabase database owner. Verify service-role
   access to the two registry RPCs and that anonymous and authenticated users
   cannot access the registry or execute the RPCs.
4. After verifying the database, set the server-only
   `PNP_SHORT_REFERENCES_ENABLED=1` for the intended Vercel environment.
   Deploy and test the three forms with controlled submissions. Check internal
   email subjects, Reply-To, attachment handling, retry behavior, and tracking
   for an existing and a newly linked order.

## Daily use

Search the internal inquiry email subject by its PNP reference to find the
original submission. In Admin Orders, fill **Inquiry reference** from that
email. When creating an order, leave **Order number** blank to reuse the
reference. You can also enter a separate order number and retain the inquiry
link. The registry prevents a code from being reused on a different order.

Keep the official invoice number assigned by Zoho Books in **Invoice number**.
Where Zoho Books supports it, enter the inquiry code separately as the order
or job reference. The website never assigns or changes an invoice number
through the registry.

## Recovery

Leave the registry and stored links in place during a rollback so issued codes
remain reserved. If Supabase is unavailable after activation, the form cannot
confirm receipt. Restore registry connectivity first. SMTP and the database
cannot commit together. If SMTP accepts the notification but the database
cannot record acceptance, a later retry can resend the internal notification
under the same code. Confirm delivery by matching the reference in the inbox.
