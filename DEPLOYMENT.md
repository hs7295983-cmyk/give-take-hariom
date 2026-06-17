# Deployment Checklist

## GitHub Upload

Upload these project files to a GitHub repository:

- `index.html`
- `styles.css`
- `app.js`
- `config.js`
- `package.json`
- `backend/`
- `data/`
- `supabase/`
- `README.md`
- `.gitignore`

## Local Backend

Run:

```bash
npm install
npm start
```

Open:

```text
http://localhost:4173
```

## Vercel

Vercel is okay for the frontend.

If your backend is deployed separately, edit `config.js` before deploying frontend:

```js
window.GIVE_TAKE_API_BASE = "https://your-backend-url";
```

## Recommended Production Path

1. Put the code on GitHub.
2. Create a Supabase project.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. Deploy the Node backend to Render, Railway, Fly.io, or a VPS.
5. Add backend environment variables:

```text
DATABASE_URL=your-supabase-postgres-url
ADMIN_PASSWORD=your-private-admin-password
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4.1-mini
```

`OPENAI_API_KEY` enables the Admin Ops Agent's AI-written recommendations, listing drafts, and support reply drafts. If it is missing, the agent still shows local inventory/order/price diagnostics without paid AI calls.

6. Deploy the frontend to Vercel.
7. Keep external delivery apps disabled until you decide otherwise.

## Current Payment Rule

Only UPI is enabled.

No card, net banking, wallet, Shiprocket, Delhivery, or Porter integration is connected.

Recharge is manual:

1. User pays by UPI.
2. User enters UPI reference.
3. Admin verifies payment.
4. Admin approves.
5. Coins are credited.
