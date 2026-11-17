# ReWear — Clothing Exchange & Swap Marketplace

React + Vite frontend, Express API, JWT authentication, bcrypt password hashing, and a persistent local JSON database. Node.js 18+ required.

## Run locally (PowerShell / terminal)
1. Extract the ZIP and open a terminal in `rewear-marketplace`.
2. Run `npm install`
3. Run `npm run install:all`
4. Run `npm run seed`
5. Run `npm run dev`
6. Open http://localhost:5173 (API health: http://localhost:5000/api/health)

## Demo accounts
- User: `ananya@rewear.local` / `User@123`
- User: `rahul@rewear.local` / `User@123`
- User: `meera@rewear.local` / `User@123`
- Admin: `admin@rewear.local` / `Admin@123`

`npm run seed` resets demo data and overwrites the local JSON database.

## Included
- Register/login, JWT sessions and hashed passwords
- Browse/search/category/city filtering and item details
- Create and remove clothing listings
- Swap request creation, validation, accept/reject/complete workflow
- Persisted private chat per swap request
- Profile editing and swap activity view
- Admin dashboard, member/listing overview and listing removal
- Responsive UI and Lucide icons

## Scope notes (read before evaluation)
- The app uses a local JSON file so it runs without MongoDB credentials. This is suitable for a single local demo process, not multi-instance production. Migrate the storage adapter to MongoDB/PostgreSQL before public production use.
- City filtering is location-based matching by city, not GPS/radius matching.
- Swap value is an owner-entered estimate, not an automatic valuation engine.
- Messages persist, but are not pushed live via WebSockets; reopen the conversation to refresh.
- Image URLs are supported; there is no cloud upload integration yet.
- Payments, courier booking and real-time notifications are not included in Phase 1.

## Deployment
Frontend: deploy `frontend` on Vercel; build command `npm run build`, output `dist`; set `VITE_API_URL` to the deployed API URL ending `/api`.
Backend: deploy `backend` on Render; build `npm install`, start `npm start`; set `JWT_SECRET` and `CLIENT_URL`. Do not use the local JSON database on Render for durable production data because its filesystem may be ephemeral. Use MongoDB Atlas or another persistent database before live evaluation.

## Before public launch
Change demo passwords and JWT secret; use HTTPS; configure strict CORS; add rate limiting, persistent managed DB, image storage, moderation, backups and audit logging.
