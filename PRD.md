# Product Requirements Document — ReWear

## 1. Product summary
ReWear is a community clothing-exchange marketplace. Members list wearable clothes, browse other members' listings, offer one of their own items in exchange, negotiate through a private conversation and mark an agreed exchange complete. The Phase 1 product does not process payments.

## 2. Problem and goals
Unused wearable clothing is difficult to exchange directly. Traditional resale products are primarily purchase/sale experiences. ReWear supports a barter-first workflow that can extend garment life and encourage more sustainable fashion habits.

Primary goals:
- Provide a dedicated clothing exchange marketplace.
- Allow direct item-for-item swap requests without payment.
- Make listings searchable by category and city.
- Support negotiation and swap status tracking.
- Provide basic administration of members and listings.

## 3. Users and roles
- Member: register/sign in, maintain profile, create/remove listings, browse, filter, send swap requests, respond to requests received, chat with the other participant, and track swap activity.
- Administrator: view platform totals and members/listings, remove inappropriate listings.

## 4. Phase 1 scope
Included: authentication, profile, listing creation and removal, search/category/city filters, item details, owner-entered estimated swap value with a heuristic suggestion, item-for-item swap requests, accept/reject/complete status transitions, persisted private messages, member dashboard, activity history, and admin overview.

Excluded: online payments, courier booking, AI fashion recommendations, AR try-on, native mobile application, GPS/radius matching, cloud image upload, live WebSocket notifications, and automated condition verification.

## 5. Core user journeys
1. Register or sign in.
2. Complete profile and city.
3. Publish a listing with category, size, brand, condition, estimated value, city, image URL and description.
4. Browse/search/filter available listings.
5. Open an item, choose one of the member's own available items, and send a swap request.
6. Listing owner accepts or rejects. Participants discuss details in the private request conversation.
7. Once the physical exchange is complete, the listing owner marks the request complete. Both items then become swapped.

## 6. Functional requirements and acceptance criteria
- Authentication: email/password registration and login; passwords stored as bcrypt hashes; protected endpoints require a valid JWT.
- Listings: required fields validated; value constrained to ₹1–₹100,000; listing owner can remove their listing; listings persist in the API database file.
- Discovery: title/brand/category search, category filter, and city filter; available listings appear to other members.
- Swaps: only the owner of an available offer can send it; cannot request one's own item; duplicate active requests for the same pair are blocked; owner can accept/reject; accepted items are reserved; completed items become swapped; rejected reserved items return to available.
- Chat: only the two participants (or admin) can read a request conversation; messages are validated and persisted.
- Profile: member can update display name, city and bio.
- Admin: administrator can view user/listing/swap totals and remove a listing.

## 7. Data model
- User: id, name, email, password hash, role, city, bio.
- Item: id, title, category, size, brand, condition, estimated value, city, image URL, description, owner id, availability status, creation time.
- SwapRequest: id, requested item id, offered item id, sender id, recipient id, message, status, timestamps.
- Message: id, request id, sender id, body, creation time.

## 8. Non-functional requirements
- Responsive layout for desktop and mobile widths.
- Server-side validation and role checks for protected operations.
- Password hashing and signed expiring authentication tokens.
- JSON API responses and clear error messages.
- Local persistence for single-instance evaluation/demo use.

## 9. KPIs
- Number of registered users.
- Number of listings and available listings.
- Number of swap requests.
- Completed swaps.
- Pending request count and request-to-completion conversion rate (calculate from stored request statuses).

## 10. Assumptions and constraints
- Members provide accurate item details and condition.
- Swap fairness is agreed by participants; estimated values are guidance, not guarantees.
- Location matching is city text matching, not GPS or distance calculation.
- Local JSON storage is intended for local evaluation. Public deployment requires a persistent managed database.
- External image URLs must be reachable by the browser.

## 11. Test checklist
- [ ] Register a new member and sign in.
- [ ] Sign in as Ananya, create a listing, and confirm it appears in My listings and Discover.
- [ ] Sign in as Rahul, browse Ananya's listing and send one of Rahul's listings as an offer.
- [ ] Sign in as Ananya, accept the request and confirm the two listings become reserved.
- [ ] Send and receive messages in the request conversation.
- [ ] Mark the accepted exchange completed and confirm both listings are swapped.
- [ ] Reject a second pending request and confirm reserved items are released when applicable.
- [ ] Sign in as admin and remove a test listing.
- [ ] Check mobile layout and API health endpoint.

## 12. Deployment considerations
Frontend can be deployed to Vercel and API to Render. Set the frontend `VITE_API_URL` to the API `/api` base URL, and configure backend `JWT_SECRET` and `CLIENT_URL`. Replace the JSON adapter with MongoDB Atlas/PostgreSQL before production because a cloud host's local filesystem may be ephemeral and does not support multi-instance consistency.
