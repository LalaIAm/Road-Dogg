# Implementation Plan: RoadDoggs Landing Page

## Overview

Build the static marketing landing page as a React functional component tree. Work proceeds foundation-first: tokens and shell, then section by section in render order, then test setup and component tests last. Each section task is self-contained — create the `.js` component and its `.scss` file together so nothing is left unintegrated.

## Tasks

- [ ] 1. Foundation — tokens, shell, and font loading
  - Add Google Fonts `<link>` tags (preconnect + stylesheet for Reenie Beanie, Space Mono, Fraunces) to `public/index.html`
  - Create `src/pages/landing/_tokens.scss` with all CSS custom properties (`:root` block) and SASS variables (`$background`, `$dark`, `$rust`, `$green`, `$cream`, `$tan`, `$breakpoint-md`) and the `grid-overlay` mixin
  - Create `src/pages/LandingPage.js` that imports `bootstrap/dist/css/bootstrap.min.css`, renders the `<LandingNav>`, `<main>` wrapper containing all section placeholders, and `<LandingFooter>` — stub each section as an empty `<section>` element for now
  - Wire `LandingPage` into the app router at the root path (or confirm it is already wired)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 2. LandingNav component
  - Create `src/pages/landing/LandingNav.js` and `LandingNav.scss`
  - Implement fixed nav with Bootstrap `Container`, flex row, logo ("RoadDoggs" in Fraunces Black), "beta vol.3" annotation in Reenie Beanie / Rust, and "[ LOG IN ]" outlined button in Space Mono
  - Apply `mix-blend-mode: difference`, `position: fixed`, `z-index: 100` via SASS
  - Wire `useNavigate('/auth')` to the login button click handler
  - Replace the `<LandingNav>` stub in `LandingPage.js` with the real import
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 3. HeroSection component
  - Create `src/pages/landing/HeroSection.js` and `HeroSection.scss`
  - Implement headline "GET LOST" in Fraunces Black with `mix-blend-mode: multiply`, eyebrow label `/// coordinates_unknown` in Space Mono / Rust, and handwritten annotation "(but like, on purpose)" in Reenie Beanie
  - Add ghost text elements ("Are we there yet?", "No Signal. Good.") at `opacity ≤ 0.15` with non-zero rotations via SASS
  - Build the `.collage-wrapper` with `position: relative; height: 480px` and four absolutely-positioned collage children: post-it note, left polaroid, center polaroid, right note card
  - Add tape decoration `::before` pseudo-element on polaroid cards via SASS (no JS)
  - Animate collage items on mount using `motion.div` from `motion/react` with the staggered `initial`/`animate`/`transition` values from the design
  - Add "PLAN TRIP" button inside the right note card; wire `useNavigate('/planner')` to its click handler
  - Hide `.collage-wrapper` at `≤ $breakpoint-md` via SASS media query
  - Replace the Hero stub in `LandingPage.js`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 12.3_

- [ ] 4. ManifestoSection component
  - Create `src/pages/landing/ManifestoSection.js` and `ManifestoSection.scss`
  - Define `MANIFESTO_POINTS` array (at least two items with `number`, `title`, `body` fields) as a module-level constant
  - Implement heading row: "The Anti-Grid" in Fraunces Regular + "Manifesto." in Fraunces Italic / Rust, `clamp(48px, 6vw, 80px)`
  - Render manifesto points in Bootstrap `Row` > two `Col md={6}`, each with numbered label in Space Mono uppercase, bold title, and body paragraph
  - Apply `background: var(--background)` and `padding: 5rem 0` via SASS
  - Replace the Manifesto stub in `LandingPage.js`
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 5. POISection component
  - Create `src/pages/landing/POISection.js` and `POISection.scss`
  - Apply dark background, 8px green top border, and `@include grid-overlay` via SASS
  - Implement status indicator row: red dot (`.poi-status-dot`) + "Algorithm v2.4 Active" in Space Mono
  - Implement heading: "We find the places" (Fraunces Regular / Cream) + "Google misses." (Fraunces Italic / Rust), `clamp(36px, 5vw, 64px)`
  - Render at least two feature bullets with left-border accent, Space Mono title, and description
  - Build radar visual in right column: `.radar-wrapper` with three `.radar-ring` circles (pure CSS) and a POI card overlay showing location name, city/state, and match percentage
  - Replace the POI stub in `LandingPage.js`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 6. SocialProofSection component
  - Create `src/pages/landing/SocialProofSection.js` and `SocialProofSection.scss`
  - Define `REVIEWS` array (at least three items with `quote`, `attribution`, `rotation` fields) and `PRESS_NAMES` array as module-level constants
  - Implement section heading: "Word on the street" in Reenie Beanie / Rust + "The Co-Pilot Reports." in Fraunces, `clamp` size
  - Add absolutely-positioned rating badge "4.9/5" with star rating, outlined style, rotated at a non-zero angle
  - Render review cards in Bootstrap `Row` > three `Col md={4}` using `motion.div` with `whileInView` scroll-triggered fade + rotate-in animation (per design spec values)
  - Add brand bar row with "seen in the wild" label and four press names using `mix-blend-mode: multiply`
  - Replace the SocialProof stub in `LandingPage.js`
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 7. FeaturesSection component
  - Create `src/pages/landing/FeaturesSection.js` and `FeaturesSection.scss`
  - Define `FEATURES` array (at least two items with `icon`, `badge`, `title`, `description`, `bg` fields) as a module-level constant
  - Implement eyebrow "Curated Vibes" in Reenie Beanie / Rust and heading "Tools for Drift." in Fraunces, `clamp(36px, 5vw, 64px)`
  - Render feature cards in Bootstrap `Row` > two `Col md={6}` using `motion.div` with `whileInView` slide-up animation (per design spec values); apply `background: feature.bg` and `box-shadow: 4px 4px 0 var(--dark)` via inline style + SASS
  - Each card renders icon, badge in Space Mono with outlined border, title in Space Mono, and description
  - Replace the Features stub in `LandingPage.js`
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 8. TechSection component
  - Create `src/pages/landing/TechSection.js` and `TechSection.scss`
  - Define `CAPABILITIES` array (at least three items with `label`, `description` fields) as a module-level constant
  - Apply dark background and `@include grid-overlay` via SASS
  - Implement heading "Under the Hood" in Fraunces / Cream, `clamp(32px, 4vw, 56px)`, and handwritten annotation in Reenie Beanie / Tan describing offline capability
  - Render capabilities in Bootstrap `Row` > three `Col md={4}`, each with monospace label (uppercase, letter-spaced) and description at reduced opacity
  - Replace the Tech stub in `LandingPage.js`
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 9. CTASection component
  - Create `src/pages/landing/CTASection.js` and `CTASection.scss`
  - Apply Rust background and 8px dark bottom border via SASS
  - Implement badge "Limited Beta Access // Vol. 3" as outlined pill in Cream / Space Mono
  - Implement heading: "Don't just drive." + "Roam." (italic) in Fraunces / Cream, `clamp(48px, 7vw, 96px)`
  - Add supporting subtext in Space Mono referencing early adopter community
  - Wrap all content in `motion.div` with `whileInView` fade-in animation (per design spec values)
  - Add primary "Start Your Engine" button (Cream bg, dark offset shadow) and secondary "View Pricing ->" link in Reenie Beanie / Cream
  - Wire `useNavigate('/auth')` to the "Start Your Engine" button click handler
  - Replace the CTA stub in `LandingPage.js`
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [ ] 10. BlogSection component
  - Create `src/pages/landing/BlogSection.js` and `BlogSection.scss`
  - Define `BLOG_CARDS` array (at least four items covering `polaroid`, `quote`, and `guide` types) as a module-level constant
  - Implement heading "Field Notes" in Fraunces, `clamp(36px, 5vw, 64px)`, and subheading "Stories from the road" in Reenie Beanie / Rust
  - Render cards in Bootstrap `Row` > four `Col xs={12} sm={6} lg={3}`; switch on `card.type` to render the correct card variant:
    - `polaroid`: white bg, padding, box-shadow, tape `::before` pseudo-element, `<img>` with `alt` text, article title
    - `quote`: Rust bg, Cream text, pull quote, location attribution
    - `guide`: Cream bg, title, checklist `<ul>`
  - Replace the Blog stub in `LandingPage.js`
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 11. LandingFooter component
  - Create `src/pages/landing/LandingFooter.js` and `LandingFooter.scss`
  - Apply dark background and 8px Rust top border via SASS
  - Implement "GO." display text in Fraunces Black / Cream, `clamp(80px, 12vw, 128px)`
  - Add tagline in Space Mono / Tan and handwritten annotation in Reenie Beanie / Tan
  - Add "Download Beta App" button (Cream bg, Rust offset shadow) and "Free for early adopters" annotation in Reenie Beanie
  - Wire `useNavigate('/auth')` to the "Download Beta App" button click handler
  - Render nav links row (Journal, Mission, Merch, Support) in Space Mono using `<a>` tags
  - Render social icon links for Instagram and Twitter
  - Add copyright notice in Space Mono at reduced opacity
  - Replace the Footer stub in `LandingPage.js`
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

- [ ] 12. Checkpoint — verify full page renders
  - Ensure all section stubs have been replaced with real components and `LandingPage.js` imports are clean
  - Ensure all `.scss` files use `@use './tokens' as *` at the top
  - Ensure `bootstrap/dist/css/bootstrap.min.css` is imported once in `LandingPage.js`
  - Ensure all `motion` imports use `import { motion } from 'motion/react'`
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Test infrastructure setup
  - Create `src/__mocks__/motion/react.js` with the Proxy-based mock that strips motion-specific props (`initial`, `animate`, `whileInView`, `transition`, `viewport`) before forwarding to the underlying DOM element
  - Add `IntersectionObserver` mock to `src/setupTests.js` (or create the file if absent) so `whileInView` tests don't throw
  - Confirm Jest config resolves the `motion/react` module name to the mock (add `moduleNameMapper` entry if needed)
  - _Requirements: (test infrastructure — supports 3, 6, 7, 9)_

- [ ] 14. Navigation behavior tests
  - [ ] 14.1 Write unit tests for LandingNav navigation
    - Mock `react-router-dom` `useNavigate`; render `<LandingNav>`; click "[ LOG IN ]"; assert `navigate` called with `'/auth'`
    - _Requirements: 2.5_
  - [ ]\* 14.2 Write unit tests for HeroSection navigation
    - Click "PLAN TRIP" button; assert `navigate` called with `'/planner'`
    - _Requirements: 3.7_
  - [ ]\* 14.3 Write unit tests for CTASection navigation
    - Click "Start Your Engine"; assert `navigate` called with `'/auth'`
    - _Requirements: 9.7_
  - [ ]\* 14.4 Write unit tests for LandingFooter navigation
    - Click "Download Beta App"; assert `navigate` called with `'/auth'`
    - _Requirements: 11.8_

- [ ] 15. Content presence tests
  - [ ] 15.1 Write unit tests for LandingNav content
    - Assert "RoadDoggs" text is present; assert "beta vol.3" annotation is present
    - _Requirements: 2.2, 2.3_
  - [ ]\* 15.2 Write unit tests for HeroSection content
    - Assert "GET LOST" headline is present; assert eyebrow label text is present
    - _Requirements: 3.1, 3.2_
  - [ ]\* 15.3 Write unit tests for SocialProofSection content
    - Assert at least 3 review card elements are rendered
    - _Requirements: 6.3_
  - [ ]\* 15.4 Write unit tests for LandingFooter content
    - Assert "GO." display text is present
    - _Requirements: 11.2_

- [ ] 16. Accessibility tests
  - [ ] 16.1 Write accessibility tests for image alt text
    - Query all `<img>` elements across rendered sections; assert each has a non-empty `alt` attribute
    - _Requirements: 13.1_
  - [ ]\* 16.2 Write accessibility tests for semantic landmarks
    - Render `<LandingPage>`; assert presence of `<nav>`, `<main>`, `<footer>`, and at least one `<section>` element
    - _Requirements: 13.4_
  - [ ]\* 16.3 Write accessibility tests for keyboard reachability
    - Use RTL `userEvent.tab()` to tab through interactive elements; assert each CTA button and link receives focus
    - _Requirements: 13.3, 13.5_

- [ ] 17. Snapshot tests
  - [ ]\* 17.1 Snapshot test for each section component
    - Write one snapshot test per section component (LandingNav, HeroSection, ManifestoSection, POISection, SocialProofSection, FeaturesSection, TechSection, CTASection, BlogSection, LandingFooter)
    - Wrap each render in the `motion/react` mock and `MemoryRouter` from `react-router-dom`
    - _Requirements: (structural regression guard for all sections)_

- [ ] 18. Final checkpoint — all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- No PBT tasks — this is a static UI with no transformation logic (see design doc Correctness Properties section)
- All section components are co-located in `src/pages/landing/` alongside their `.scss` files
- `_tokens.scss` must be created before any section SCSS file, as all sections `@use` it
- Bootstrap grid handles all layout; SASS handles all brand overrides — no inline style except `motion` rotation values passed from data constants
