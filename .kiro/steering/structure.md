# Project Structure

```
/
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── LocationInputs.js     # Origin/destination with Places autocomplete
│   │   ├── DateRangePicker.js
│   │   ├── PreferenceSelector.js # Preset chips + custom free-text
│   │   ├── PacingSelector.js     # Preset + editable mileage thresholds
│   │   ├── AccommodationPanel.js
│   │   │   ├── AccomPreferenceSelector.js
│   │   │   └── BudgetInputs.js
│   │   ├── MapView.js            # @vis.gl/react-google-maps map + markers
│   │   ├── StopList.js           # @dnd-kit drag-and-drop wrapper
│   │   ├── StopCard.js
│   │   ├── AccommodationList.js
│   │   ├── AccommodationCard.js
│   │   └── TripSummaryBar.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── TripPlannerPage.js    # TripConfigPanel + ItineraryView + TripActionBar
│   │   ├── SavedTripsPage.js
│   │   ├── SharedTripPage.js     # View-only or edit based on share token
│   │   └── AuthPage.js
│   ├── store/
│   │   ├── index.js              # configureStore wiring all slices
│   │   └── slices/
│   │       ├── authSlice.js      # Mirrors Firebase Auth user (read-only from Redux)
│   │       ├── tripConfigSlice.js
│   │       ├── itinerarySlice.js
│   │       ├── savedTripsSlice.js
│   │       └── uiSlice.js        # Loading flags, errors, modal state
│   ├── context/
│   │   └── AuthContext.js        # onAuthStateChanged → dispatches setUser/clearUser
│   ├── firebase/
│   │   ├── config.js             # Firebase app init (Auth, Firestore, Storage, Functions)
│   │   ├── auth.js               # signInWithEmail, signUpWithEmail, signInWithGoogle, signOut
│   │   └── firestore.js          # saveTripDoc, getTripDoc, getUserTrips, etc.
│   └── hooks/                    # Custom React hooks
│
├── functions/
│   └── src/
│       ├── ai/
│       │   ├── aiAdapter.js      # Abstract AIAdapter base class + singleton export
│       │   ├── geminiAdapter.js  # GeminiAdapter (primary)
│       │   └── openaiAdapter.js  # OpenAIAdapter (fallback)
│       ├── pdf/
│       │   └── generatePDF.js    # pdfkit PDF builder
│       └── index.js              # Cloud Function exports
│
└── .kiro/
    ├── specs/
    │   └── road-trip-planner/    # Requirements, design, and tasks docs
    └── steering/                 # This directory
```

## Key Conventions

- **JavaScript only** — no TypeScript anywhere in the project
- **Redux for global state** — all cross-component state lives in a slice; local component state only for transient UI (e.g. in-progress pacing edits, autocomplete input text, dnd in-flight state)
- **Firebase Auth state is React Context only** — never manage auth state directly in Redux; `authSlice` only mirrors the user object synced from `AuthContext`
- **All async work uses `createAsyncThunk`** — Cloud Function calls and Firestore reads/writes go through thunks; loading/error states handled via `extraReducers` in `uiSlice`
- **AI calls are server-side only** — never call Gemini or OpenAI directly from the client; always proxy through Cloud Functions
- **Property-based tests use fast-check** — tag format: `// Feature: road-trip-planner, Property N: {description}`; minimum 100 iterations per property
- **Firestore collections**: `users/{userId}`, `trips/{tripId}`, `trips/{tripId}/shareLinks/{shareToken}`
