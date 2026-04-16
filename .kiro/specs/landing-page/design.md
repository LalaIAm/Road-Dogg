# Design Document: RoadDoggs Landing Page

## Overview

The RoadDoggs landing page is a static, scroll-based marketing page built as a React functional component at `src/pages/LandingPage.js`. It uses **Bootstrap (react-bootstrap)** for layout and base components, **SASS (.scss files)** for custom styles, design tokens, and overrides, and **`motion` from `motion/react`** for entrance and scroll-triggered animations. Google Fonts are loaded via `<link>` in `public/index.html`. There is no backend integration — all content is hardcoded, and CTAs navigate to `/auth` or `/planner` using React Router's `useNavigate`.

The page is organized into 10 named sections rendered in sequence inside a `<main>` element. Each section is its own sub-component co-located in `src/pages/landing/` to keep `LandingPage.js` thin. A shared SASS partial (`src/pages/landing/_tokens.scss`) defines CSS custom properties and SASS variables for the color palette and type scale, imported into each section's `.scss` file.

### Design Goals

- Faithful implementation of the scrapbook/editorial aesthetic: polaroid cards, rotated elements, tape decorations, handwritten annotations
- Bootstrap grid (`Container`, `Row`, `Col`) handles all section layouts; SASS overrides Bootstrap defaults and adds brand-specific styles
- `motion` components from `motion/react` handle entrance animations (Hero collage) and scroll-triggered animations (review cards, feature cards, CTA); all other visual effects (blend modes, grid overlays, tape decorations) remain pure SASS/CSS
- Accessible: semantic landmarks, keyboard-navigable CTAs, sufficient contrast, descriptive alt text
- Responsive: Bootstrap breakpoints + SASS media queries handle single-column reflow at ≤768px

---

## Architecture

The page is a pure presentational tree. No Redux state, no Firebase calls, no async work.

```
src/
├── pages/
│   ├── LandingPage.js              # Root component — assembles all sections
│   └── landing/                    # Co-located section components + SASS files
│       ├── _tokens.scss            # SASS partial: CSS custom properties + SASS variables
│       ├── LandingNav.js
│       ├── LandingNav.scss
│       ├── HeroSection.js
│       ├── HeroSection.scss
│       ├── ManifestoSection.js
│       ├── ManifestoSection.scss
│       ├── POISection.js
│       ├── POISection.scss
│       ├── SocialProofSection.js
│       ├── SocialProofSection.scss
│       ├── FeaturesSection.js
│       ├── FeaturesSection.scss
│       ├── TechSection.js
│       ├── TechSection.scss
│       ├── CTASection.js
│       ├── CTASection.scss
│       ├── BlogSection.js
│       ├── BlogSection.scss
│       ├── LandingFooter.js
│       └── LandingFooter.scss
```

### Routing

`LandingPage.js` uses `useNavigate` from `react-router-dom`. Two target routes:

- `/auth` — login / beta sign-up
- `/planner` — trip planner

### Font Loading

Three Google Font families are added to `public/index.html` via a single `<link>` preconnect + stylesheet:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Reenie+Beanie&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,900;1,9..144,400;1,9..144,900&display=swap"
  rel="stylesheet"
/>
```

### SASS Token Partial

`_tokens.scss` is imported at the top of every section `.scss` file with `@use './tokens' as *`. It defines both CSS custom properties (for runtime use) and SASS variables (for compile-time use in mixins and calculations):

```scss
// _tokens.scss

// CSS custom properties — available at runtime
:root {
  --background: #eae7dc;
  --dark: #232323;
  --rust: #c8553d;
  --green: #8e9c6d;
  --cream: #fcfcf0;
  --tan: #d8c3a5;

  --font-hand: "Reenie Beanie", cursive;
  --font-mono: "Space Mono", monospace;
  --font-serif: "Fraunces", serif;
  --font-body: "Segoe UI", sans-serif;
}

// SASS variables — available at compile time
$background: #eae7dc;
$dark: #232323;
$rust: #c8553d;
$green: #8e9c6d;
$cream: #fcfcf0;
$tan: #d8c3a5;

$breakpoint-md: 768px;

// Grid overlay mixin — reused in POISection and TechSection
@mixin grid-overlay {
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 39px,
      rgba(255, 255, 255, 0.04) 39px,
      rgba(255, 255, 255, 0.04) 40px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 39px,
      rgba(255, 255, 255, 0.04) 39px,
      rgba(255, 255, 255, 0.04) 40px
    );
}
```

### Bootstrap Integration

Bootstrap is imported once in `src/index.js` (or `LandingPage.js`) before any SASS:

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

`react-bootstrap` components (`Container`, `Row`, `Col`, `Button`) are used for structural layout. Bootstrap utility classes (spacing, display, text alignment) are used where they don't conflict with brand styles. SASS files override Bootstrap variables and add brand-specific rules.

### Motion Library

`motion` from `motion/react` is used for JavaScript-driven animations. Import pattern:

```js
import { motion } from "motion/react";
```

Animation is applied to specific elements only — not wholesale to every component. All other visual effects (rotations, blend modes, grid overlays, tape decorations) remain pure SASS/CSS with no JS involvement.

---

## Components and Interfaces

### LandingPage.js

```jsx
import "bootstrap/dist/css/bootstrap.min.css";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main>
        <HeroSection />
        <ManifestoSection />
        <POISection />
        <SocialProofSection />
        <FeaturesSection />
        <TechSection />
        <CTASection />
        <BlogSection />
      </main>
      <LandingFooter />
    </>
  );
}
```

No props. All data is module-level constants inside each section file.

---

### LandingNav

**Behavior:** Fixed to viewport top. Logo + annotation on left, login button on right.

**Bootstrap usage:** `Container` for max-width centering, `d-flex justify-content-between align-items-center` utilities for the inner row.

**Key SASS (`LandingNav.scss`):**

```scss
@use "./tokens" as *;

.landing-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  mix-blend-mode: difference;
  padding: 1rem 0;
}

.nav-logo {
  font-family: var(--font-serif);
  font-weight: 900;
}

.nav-annotation {
  font-family: var(--font-hand);
  color: var(--rust);
}

.nav-login-btn {
  font-family: var(--font-mono);
  border: 1px solid currentColor;
  background: transparent;
  padding: 0.4rem 1rem;

  &:hover {
    background: transparent;
  }
}
```

**Interaction:** Login button calls `navigate('/auth')`.

---

### HeroSection

**Behavior:** Headline in normal flow. Collage elements are `position: absolute` within a bounded wrapper. Collage items animate in on mount using `motion.div`.

**Bootstrap usage:** `Container` wraps the section content for horizontal padding.

**Motion animations (entrance on mount):**

```jsx
import { motion } from 'motion/react';

// Post-it note
<motion.div
  className="collage-postit"
  initial={{ opacity: 0, y: 24, rotate: -4 }}
  animate={{ opacity: 1, y: 0, rotate: -4 }}
  transition={{ duration: 0.5, delay: 0.1 }}
/>

// Left polaroid
<motion.div
  className="collage-polaroid collage-polaroid--left"
  initial={{ opacity: 0, x: -32 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.55, delay: 0.2 }}
/>

// Center polaroid
<motion.div
  className="collage-polaroid collage-polaroid--center"
  initial={{ opacity: 0, scale: 0.92 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 0.3 }}
/>

// Right note card
<motion.div
  className="collage-notecard"
  initial={{ opacity: 0, x: 32 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.55, delay: 0.4 }}
/>
```

**Key SASS (`HeroSection.scss`):**

```scss
@use "./tokens" as *;

.hero-section {
  background: var(--background);
  padding: 8rem 0 4rem;
}

.hero-headline {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(72px, 10vw, 140px);
  mix-blend-mode: multiply;
  color: var(--dark);
}

.hero-eyebrow {
  font-family: var(--font-mono);
  color: var(--rust);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero-annotation {
  font-family: var(--font-hand);
}

.hero-ghost {
  opacity: 0.12;
  font-family: var(--font-hand);
  position: absolute;
  pointer-events: none;
}

.collage-wrapper {
  position: relative;
  height: 480px;

  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

// Tape decoration — pure CSS, no JS
.collage-polaroid::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 48px;
  height: 18px;
  background: rgba(255, 255, 255, 0.6);
}
```

**Interaction:** "PLAN TRIP" button calls `navigate('/planner')`.

---

### ManifestoSection

**Layout:** Bootstrap `Container` > `Row` > two `Col md={6}` for manifesto points. Heading in a full-width `Row` above.

**Key SASS (`ManifestoSection.scss`):**

```scss
@use "./tokens" as *;

.manifesto-section {
  background: var(--background);
  padding: 5rem 0;
}

.manifesto-heading {
  font-size: clamp(48px, 6vw, 80px);

  .heading-normal {
    font-style: normal;
  }
  .heading-italic {
    font-style: italic;
    color: var(--rust);
  }
}

.manifesto-number {
  font-family: var(--font-mono);
  text-transform: uppercase;
}
```

No motion animations in this section.

---

### POISection

**Layout:** Bootstrap `Container` > `Row` > `Col md={6}` for text content and `Col md={6}` for radar visual.

**Key SASS (`POISection.scss`):**

```scss
@use "./tokens" as *;

.poi-section {
  background: var(--dark);
  border-top: 8px solid var(--green);
  padding: 5rem 0;
  @include grid-overlay;
}

.poi-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e74c3c;
  display: inline-block;
}

.poi-heading {
  font-size: clamp(36px, 5vw, 64px);
  color: var(--cream);

  .heading-rust {
    font-style: italic;
    color: var(--rust);
  }
}

.poi-bullet {
  border-left: 3px solid var(--rust);
  padding-left: 1rem;
}

// Radar visual — pure CSS
.radar-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto;
}

.radar-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

No motion animations in this section — the grid overlay and radar are pure SASS/CSS.

---

### SocialProofSection

**Layout:** Bootstrap `Container` > `Row` > three `Col md={4}` review cards. Rating badge is absolutely positioned relative to the section. Brand bar in a full-width `Row` below.

**Motion animations (scroll-triggered, fade + rotate-in):**

```jsx
import { motion } from "motion/react";

{
  REVIEWS.map((review, i) => (
    <Col md={4} key={i}>
      <motion.div
        className="review-card"
        style={{ rotate: review.rotation }}
        initial={{ opacity: 0, y: 40, rotate: review.rotation - 8 }}
        whileInView={{ opacity: 1, y: 0, rotate: review.rotation }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      >
        <p>{review.quote}</p>
        <span>{review.attribution}</span>
      </motion.div>
    </Col>
  ));
}
```

**Key SASS (`SocialProofSection.scss`):**

```scss
@use "./tokens" as *;

.social-proof-section {
  padding: 5rem 0;
  background: var(--background);
}

.review-card {
  background: white;
  padding: 1.5rem;
  box-shadow: 3px 3px 0 var(--dark);
  // Rotation applied via motion inline style — not duplicated here
}

.rating-badge {
  border: 2px solid var(--dark);
  border-radius: 4px;
  transform: rotate(-6deg);
  display: inline-block;
  padding: 0.5rem 1rem;
}

.brand-bar {
  mix-blend-mode: multiply;
}
```

---

### FeaturesSection

**Layout:** Bootstrap `Container` > `Row` > two `Col md={6}` feature cards.

**Motion animations (scroll-triggered, slide-up):**

```jsx
import { motion } from "motion/react";

{
  FEATURES.map((feature, i) => (
    <Col md={6} key={i}>
      <motion.div
        className="feature-card"
        style={{ background: feature.bg }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: i * 0.12 }}
      >
        <span className="feature-icon">{feature.icon}</span>
        <span className="feature-badge">{feature.badge}</span>
        <h3 className="feature-title">{feature.title}</h3>
        <p>{feature.description}</p>
      </motion.div>
    </Col>
  ));
}
```

**Key SASS (`FeaturesSection.scss`):**

```scss
@use "./tokens" as *;

.features-section {
  padding: 5rem 0;
}

.features-eyebrow {
  font-family: var(--font-hand);
  color: var(--rust);
}

.features-heading {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 64px);
}

.feature-card {
  padding: 2rem;
  box-shadow: 4px 4px 0 var(--dark);
  height: 100%;
}

.feature-badge {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  border: 1px solid currentColor;
  padding: 2px 6px;
}

.feature-title {
  font-family: var(--font-mono);
}
```

---

### TechSection

**Layout:** Bootstrap `Container` > `Row` > three `Col md={4}` capability items. Heading + annotation in a full-width `Row` above.

**Key SASS (`TechSection.scss`):**

```scss
@use "./tokens" as *;

.tech-section {
  background: var(--dark);
  padding: 5rem 0;
  @include grid-overlay;
}

.tech-heading {
  font-family: var(--font-serif);
  font-size: clamp(32px, 4vw, 56px);
  color: var(--cream);
}

.tech-annotation {
  font-family: var(--font-hand);
  color: var(--tan);
}

.capability-label {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--cream);
}

.capability-description {
  color: rgba(255, 255, 255, 0.7);
}
```

No motion animations — grid overlay is pure SASS.

---

### CTASection

**Layout:** Bootstrap `Container` with `text-center` utility. Single centered column of content.

**Motion animations (scroll-triggered, fade-in):**

```jsx
import { motion } from "motion/react";

<motion.div
  className="cta-inner"
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  {/* badge, heading, subtext, buttons */}
</motion.div>;
```

**Key SASS (`CTASection.scss`):**

```scss
@use "./tokens" as *;

.cta-section {
  background: var(--rust);
  border-bottom: 8px solid var(--dark);
  padding: 6rem 0;
}

.cta-badge {
  border: 2px solid var(--cream);
  border-radius: 999px;
  color: var(--cream);
  font-family: var(--font-mono);
  display: inline-block;
  padding: 0.3rem 1.2rem;
}

.cta-heading {
  font-size: clamp(48px, 7vw, 96px);
  color: var(--cream);

  .heading-italic {
    font-style: italic;
  }
}

.cta-primary-btn {
  background: var(--cream);
  color: var(--dark);
  box-shadow: 4px 4px 0 var(--dark);
  font-family: var(--font-mono);
  border: none;

  &:hover {
    background: darken($cream, 5%);
    color: var(--dark);
  }
}

.cta-secondary-link {
  font-family: var(--font-hand);
  color: var(--cream);
  font-size: 1.4rem;
}
```

**Interaction:** "Start Your Engine" calls `navigate('/auth')`.

---

### BlogSection

**Layout:** Bootstrap `Container` > `Row` with four `Col xs={12} sm={6} lg={3}` cards for a masonry-like multi-column layout. Cards have varied heights via content.

**Key SASS (`BlogSection.scss`):**

```scss
@use "./tokens" as *;

.blog-section {
  padding: 5rem 0;
}

.blog-heading {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 64px);
}

.blog-subheading {
  font-family: var(--font-hand);
  color: var(--rust);
  font-size: 1.6rem;
}

// Polaroid card — tape decoration is pure CSS
.blog-card--polaroid {
  background: white;
  padding: 1rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.12);

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(-1deg);
    width: 48px;
    height: 18px;
    background: rgba(255, 255, 255, 0.6);
  }
}

.blog-card--quote {
  background: var(--rust);
  color: var(--cream);
  padding: 2rem;
}

.blog-card--guide {
  background: var(--cream);
  padding: 1.5rem;
}
```

No motion animations in this section.

---

### LandingFooter

**Layout:** Bootstrap `Container` > `Row` for the nav links row and social icons row.

**Key SASS (`LandingFooter.scss`):**

```scss
@use "./tokens" as *;

.landing-footer {
  background: var(--dark);
  border-top: 8px solid var(--rust);
  padding: 4rem 0 2rem;
}

.footer-display {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(80px, 12vw, 128px);
  color: var(--cream);
}

.footer-tagline {
  font-family: var(--font-mono);
  color: var(--tan);
}

.footer-download-btn {
  background: var(--cream);
  color: var(--dark);
  box-shadow: 4px 4px 0 var(--rust);
  border: none;
  font-family: var(--font-mono);
}

.footer-annotation {
  font-family: var(--font-hand);
  color: var(--tan);
}

.footer-nav-link {
  font-family: var(--font-mono);
  color: var(--cream);
  text-decoration: none;

  &:hover {
    color: var(--tan);
  }
}

.footer-copyright {
  font-family: var(--font-mono);
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
}
```

**Interaction:** "Download Beta App" calls `navigate('/auth')`.

---

## Data Models

All content is static — no runtime data fetching. Content is defined as plain JS objects/arrays at the top of each section component file.

### Content Shape Examples

```js
// ManifestoSection.js
const MANIFESTO_POINTS = [
  {
    number: "01.",
    title: "Ditch the Algorithm",
    body: "We surface the roadside diner...",
  },
  {
    number: "02.",
    title: "Embrace the Detour",
    body: "The best stops aren't on the map...",
  },
];

// SocialProofSection.js
const REVIEWS = [
  {
    quote: '"Found a taco truck that changed my life..."',
    attribution: "@dusty_miles",
    rotation: 9, // degrees — used as motion initial/animate rotate value
  },
  {
    quote: '"Took us to a ghost town..."',
    attribution: "Route 66 crew",
    rotation: -11,
  },
  {
    quote: '"No signal. Best weekend ever."',
    attribution: "@offgrid_jen",
    rotation: 18,
  },
];

const PRESS_NAMES = [
  "Roadtrippers",
  "Condé Nast Traveler",
  "Outside Mag",
  "Wired",
];

// FeaturesSection.js
const FEATURES = [
  {
    icon: "🗺",
    badge: "REL 1.0",
    title: "ROUTE_PAINTER",
    description: "Draw your own path...",
    bg: "var(--cream)",
  },
  {
    icon: "🎒",
    badge: "BETA",
    title: "PACK_PLANNER",
    description: "AI-generated packing lists...",
    bg: "var(--tan)",
  },
];

// TechSection.js
const CAPABILITIES = [
  {
    label: "FUEL_LOGIC",
    description: "Calculates fuel stops based on tank size and grade.",
  },
  { label: "OFFLINE_MAPS", description: "Cached tile layers for dead zones." },
  {
    label: "WEATHER_SYNC",
    description: "Live forecast overlaid on your route.",
  },
];

// BlogSection.js
const BLOG_CARDS = [
  {
    type: "polaroid",
    title: "The Loneliest Highway",
    imgAlt: "Empty Nevada highway at dusk",
  },
  {
    type: "quote",
    quote: '"The road is always right."',
    location: "Somewhere in New Mexico",
  },
  {
    type: "guide",
    title: "Desert Packing List",
    items: ["Sunscreen SPF 50+", "4L water minimum", "Paper maps"],
  },
  {
    type: "polaroid",
    title: "Roadside Americana",
    imgAlt: "Vintage neon motel sign",
  },
];
```

---

## Correctness Properties

This feature is a static marketing page — pure UI rendering with no data transformation logic, no parsers, no serializers, and no business logic functions. All "behavior" is SASS/CSS visual effects, Bootstrap layout, `motion` animations, and React Router navigation calls.

PBT is **not applicable** here. The acceptance criteria fall into these categories:

- Visual/aesthetic requirements (rotation angles, blend modes, font families, SASS-driven styles) — not computable properties
- Animation behavior (`motion` entrance/scroll animations) — example-based tests with mocked `motion` components
- Navigation behavior (clicking a button calls `navigate('/auth')`) — example-based unit tests
- Layout requirements (Bootstrap grid reflow at ≤768px) — snapshot or visual regression tests
- Accessibility requirements (alt text, focus indicators, semantic HTML) — example-based tests with RTL

The Correctness Properties section is intentionally omitted. See Testing Strategy below for the appropriate test approach.

---

## Error Handling

Since there is no async work or external data, error handling is minimal:

- **Font loading failure:** Google Fonts are loaded with `font-display: swap` (default for the API). If fonts fail to load, the browser falls back to `serif`, `monospace`, and `cursive` system fonts. The page remains readable.
- **Bootstrap CSS missing:** Bootstrap is imported as a direct npm dependency. If the import fails at build time, the build itself will fail — caught at CI time, not runtime.
- **Motion library missing:** `motion/react` is an npm dependency. Missing import fails at build time. If `motion` components are unavailable at runtime (e.g. SSR without proper setup), wrap animated sections in a try/catch or use `LazyMotion` with a dynamic feature bundle to defer loading.
- **Navigation errors:** `useNavigate` is provided by React Router. If the router context is missing (e.g. component rendered outside `<BrowserRouter>`), React will throw. This is a developer error caught at integration time, not a runtime concern.
- **Image placeholders:** Blog section polaroid cards use `<img>` with `alt` text. If an image src is missing or broken, the alt text is displayed. All images in this static page are either local assets or placeholder `div` elements styled with background colors — no external image URLs that could 404.

---

## Testing Strategy

PBT does not apply to this feature (static UI, no transformation logic). The testing approach is:

### Unit / Component Tests (Jest + React Testing Library)

Focus on behavior and structure, not visual appearance.

**Navigation behavior (example-based):**

- Clicking "[ LOG IN ]" in the Nav calls `navigate('/auth')`
- Clicking "PLAN TRIP" in the Hero calls `navigate('/planner')`
- Clicking "Start Your Engine" in the CTA section calls `navigate('/auth')`
- Clicking "Download Beta App" in the Footer calls `navigate('/auth')`

**Content presence (example-based):**

- Nav renders "RoadDoggs" logo text and "beta vol.3" annotation
- Hero renders the "GET LOST" headline and eyebrow label
- Social proof renders at least 3 review cards
- Footer renders "GO." display text

**Accessibility (example-based):**

- All `<img>` elements have non-empty `alt` attributes
- All interactive elements are reachable via `Tab` key (RTL `userEvent.tab()`)
- Semantic landmarks are present: `<nav>`, `<main>`, `<footer>`, `<section>` elements

### Testing Motion Animations

`motion` components from `motion/react` should be mocked in Jest tests to avoid animation side effects and `IntersectionObserver` dependencies:

```js
// src/__mocks__/motion/react.js
const motion = new Proxy(
  {},
  {
    get: (_, tag) => {
      const Component = ({ children, ...props }) => {
        // Strip motion-specific props before passing to DOM element
        const { initial, animate, whileInView, transition, viewport, ...rest } =
          props;
        return React.createElement(tag, rest, children);
      };
      return Component;
    },
  },
);

export { motion };
```

- `whileInView` animations (review cards, feature cards, CTA) rely on `IntersectionObserver`. Mock `IntersectionObserver` in `setupTests.js` or use `jest-intersection-observer`.
- Test that animated elements are present in the DOM and have the correct content — do not assert on animation state.
- `AnimatePresence` can be imported and used normally in tests since it renders children synchronously when animations are mocked.

### Snapshot Tests

- Each section component has a snapshot test to catch unintended structural regressions
- Snapshots are updated intentionally when design changes are made
- Bootstrap `Container`/`Row`/`Col` wrappers will appear in snapshots — this is expected

### Manual / Visual QA

- Responsive reflow at 768px breakpoint verified in browser DevTools (Bootstrap `md` breakpoint)
- `mix-blend-mode: difference` nav overlay verified against each section background
- Rotation angles on review cards and polaroids verified visually
- `motion` entrance animations (Hero collage) verified in browser — staggered fade/slide on load
- `whileInView` scroll animations (review cards, feature cards, CTA) verified by scrolling through the page
- Focus ring visibility verified by tabbing through the page in Chrome and Firefox
