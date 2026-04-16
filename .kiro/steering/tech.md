# Tech Stack

## Frontend

- **React** (JavaScript) — no TypeScript
- **Redux Toolkit (RTK)** — global app state via slices and `createAsyncThunk`; no RTK Query
- **React Context** — Firebase Auth state only (`onAuthStateChanged`)
- **@vis.gl/react-google-maps** — map rendering with markers and polylines
- **@dnd-kit/core + @dnd-kit/sortable** — drag-and-drop stop reordering

## Backend (Firebase)

- **Firebase Auth** — email/password + Google OAuth
- **Firestore** — primary database; real-time `onSnapshot` for collaborative editing
- **Firebase Storage** — PDF export storage
- **Cloud Functions (Node.js 20)** — all AI calls, PDF generation, share link management

## AI

- **Google Gemini (`gemini-1.5-pro`)** — primary; JSON mode with `response_schema`
- **OpenAI GPT-4o** — fallback; switched via `AI_PROVIDER` env var
- AI calls are abstracted behind `AIAdapter` in `functions/src/ai/aiAdapter.js`

## Maps

- **Google Maps JavaScript API** — map display
- **Places API (New)** — geocoding and autocomplete
- **Directions API** — route validation
- **Maps Static API** — static map image for PDF export

## PDF

- **pdfkit** — server-side PDF generation inside a Cloud Function

## Testing

- **Jest + React Testing Library** — unit and component tests
- **fast-check** — property-based tests (minimum 100 iterations per property)
- **Firebase Emulator Suite** — integration tests (Auth, Firestore, Functions)

## Key Libraries

```
@reduxjs/toolkit react-redux firebase @vis.gl/react-google-maps
@dnd-kit/core @dnd-kit/sortable fast-check jest
@testing-library/react @testing-library/jest-dom
@google/generative-ai openai ajv pdfkit axios
```

## Environment Variables

- `REACT_APP_GOOGLE_MAPS_API_KEY` — Google Maps API key (client)
- `AI_PROVIDER` — `gemini` (default) or `openai` (Cloud Functions)
- Firebase config vars (client): `REACT_APP_FIREBASE_*`

## Common Commands

```bash
# Start development server
npm start

# Run tests (single pass, no watch)
npm test -- --watchAll=false

# Run tests with coverage
npm test -- --watchAll=false --coverage

# Build for production
npm run build

# Deploy to Firebase
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting

# Start Firebase emulators (for integration tests)
firebase emulators:start

# Start emulators with test data import
firebase emulators:start --import=./emulator-data
```
