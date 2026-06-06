# GIVE & TAKE

Coin-based reuse marketplace website.

## What is included

- Multi-page website frontend
- Node backend server
- Supabase/Postgres database support with local JSON fallback
- Product marketplace
- Sell item request flow
- Coin wallet and ledger
- UPI-only manual recharge request flow
- Admin UPI settings and recharge approval
- Orders
- Join Us applications
- Internal partner task panel
- External delivery apps disabled

## Run locally

```bash
npm install
npm start
```

Open:

```text
http://localhost:4173
```

## Admin UPI setup

1. Open `http://localhost:4173/#admin`
2. Login with the admin password
3. Go to `UPI Settings`
4. Enter merchant name and UPI ID
5. Save UPI

Users can then submit UPI recharge requests from Wallet. Coins are credited only after admin approval.

For local testing, the default admin password is:

```text
local-admin-1234
```

For public backend deployment, set a private `ADMIN_PASSWORD` environment variable on the backend host. Do not rely on the local testing password.

## Important deployment note

This project uses `data/give-take-db.json` only when `DATABASE_URL` is not set. That is fine for local testing, but it is not production-safe.

For production, set `DATABASE_URL` to your Supabase Postgres connection string. Then all app state is stored in your Supabase database.

## Supabase setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy your Supabase Postgres connection string.
5. Add it to your backend host as `DATABASE_URL`.

## Production hosting

Recommended:

- Frontend: Vercel
- Backend: Render or Railway
- Database: Supabase

When the backend is deployed separately, edit `config.js` and set:

```js
window.GIVE_TAKE_API_BASE = "https://your-backend-url";
```

Set this environment variable on the backend host:

```text
ADMIN_PASSWORD=your-private-admin-password
DATABASE_URL=your-supabase-postgres-url
```
