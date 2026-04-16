# Requirements Document

## Introduction

A marketing landing page for RoadDoggs — an AI-powered road trip planning web app. The page is a full-width, scroll-based experience with a scrapbook/editorial aesthetic using handwritten fonts, polaroid-style imagery, and a warm color palette. It introduces the product, communicates its value proposition, showcases features and social proof, and drives visitors toward beta sign-up and app login. The page lives at `src/pages/LandingPage.js` and is built with React (JavaScript) and CSS Modules.

## Glossary

- **Landing_Page**: The marketing page rendered at the application root for unauthenticated visitors
- **Visitor**: A person viewing the Landing_Page who may or may not be a registered User
- **Nav**: The fixed navigation bar at the top of the Landing_Page
- **Hero**: The primary above-the-fold section of the Landing_Page
- **Manifesto_Section**: The section presenting the product's anti-grid philosophy
- **POI_Section**: The "Smart POI Engine" section describing AI-powered point-of-interest discovery
- **Social_Proof_Section**: The section displaying user reviews and press mentions
- **Features_Section**: The section showcasing individual product features (Route Painter, Pack Planning)
- **Tech_Section**: The "Under the Hood" section listing technical capabilities
- **CTA_Section**: The primary call-to-action section driving beta sign-up
- **Blog_Section**: The "Field Notes" section displaying editorial content cards
- **Footer**: The bottom section of the Landing_Page with navigation links and download CTA
- **CTA_Button**: An interactive button element that navigates the Visitor to a target URL or triggers an action
- **Color_Palette**: The defined set of brand colors: Background `#EAE7DC`, Dark `#232323`, Rust `#C8553D`, Green `#8E9C6D`, Cream `#FCFCF0`, Tan `#D8C3A5`
- **Type_Scale**: The defined set of brand typefaces: Reenie Beanie (handwritten/decorative), Space Mono (mono/labels), Fraunces (serif/headings), Segoe UI (sans/body)
- **Polaroid_Card**: A styled image container with a white border, slight rotation, and tape decoration mimicking a physical polaroid photograph
- **Scrapbook_Aesthetic**: The visual design language combining handwritten annotations, rotated elements, tape decorations, polaroid cards, and post-it notes

## Requirements

---

### Requirement 1: Page Shell and Global Styles

**User Story:** As a Visitor, I want the page to load with consistent brand fonts and colors, so that the RoadDoggs identity is immediately recognizable.

#### Acceptance Criteria

1. THE Landing_Page SHALL load the following Google Fonts via a `<link>` in the document head: Reenie Beanie, Space Mono, and Fraunces (Black and Regular weights).
2. THE Landing_Page SHALL apply the Color_Palette as CSS custom properties (variables) available to all child components.
3. THE Landing_Page SHALL render as a full-width, vertically scrolling single page with no horizontal overflow.
4. THE Landing_Page SHALL use a background color of `#EAE7DC` (Background) as the default page background.
5. THE Landing_Page SHALL be implemented as a React functional component at `src/pages/LandingPage.js` using CSS Modules for styling — no Tailwind CSS.

---

### Requirement 2: Navigation Bar

**User Story:** As a Visitor, I want a persistent navigation bar with the brand logo and a login button, so that I can identify the product and access my account from any scroll position.

#### Acceptance Criteria

1. THE Nav SHALL be fixed to the top of the viewport and remain visible as the Visitor scrolls.
2. THE Nav SHALL display the text "RoadDoggs" as the logo, rendered in Fraunces Black.
3. THE Nav SHALL display a "beta vol.3" annotation adjacent to the logo text, rendered in Reenie Beanie in the Rust color (`#C8553D`).
4. THE Nav SHALL display a "[ LOG IN ]" CTA_Button in the top-right corner, rendered in Space Mono with an outlined style.
5. WHEN the Visitor clicks the "[ LOG IN ]" CTA_Button, THE Nav SHALL navigate the Visitor to the application's authentication route.
6. THE Nav SHALL apply `mix-blend-mode: difference` to achieve an overlay effect against varying section backgrounds.

---

### Requirement 3: Hero Section

**User Story:** As a Visitor, I want an engaging hero section that communicates the product's spirit, so that I immediately understand what RoadDoggs is about.

#### Acceptance Criteria

1. THE Hero SHALL display the main headline "GET LOST" in Fraunces Black at a minimum font size of 96px, rendered with a transparent fill using `mix-blend-mode: multiply`.
2. THE Hero SHALL display an eyebrow label `/// coordinates_unknown` in Space Mono, Rust color, uppercase with letter-spacing applied.
3. THE Hero SHALL display a handwritten annotation "(but like, on purpose)" in Reenie Beanie adjacent to the headline.
4. THE Hero SHALL display decorative floating text elements "Are we there yet?" and "No Signal. Good." in Reenie Beanie at very low opacity (≤ 0.15), rotated at non-zero angles.
5. THE Hero SHALL render a collage of at least four layered elements: a post-it note, a left polaroid, a center polaroid, and a right note card with a "PLAN TRIP" CTA_Button.
6. THE Hero SHALL apply a warm gradient background using the Color_Palette Background color (`#EAE7DC`).
7. WHEN the Visitor clicks the "PLAN TRIP" CTA_Button in the Hero collage, THE Landing_Page SHALL navigate the Visitor to the trip planner route.
8. THE Hero collage elements SHALL be positioned using absolute or CSS transform-based layout to achieve the overlapping scrapbook composition.

---

### Requirement 4: Manifesto Section

**User Story:** As a Visitor, I want to read the product's philosophy, so that I understand how RoadDoggs differs from standard navigation apps.

#### Acceptance Criteria

1. THE Manifesto_Section SHALL display a heading composed of "The Anti-Grid" in Fraunces Regular and "Manifesto." in Fraunces Italic, with "Manifesto." rendered in the Rust color (`#C8553D`), at a minimum font size of 60px.
2. THE Manifesto_Section SHALL display at least two manifesto points in a two-column grid layout.
3. EACH manifesto point SHALL include a numbered label (e.g., "01.") in Space Mono uppercase, a bold title, and a supporting paragraph.
4. THE Manifesto_Section SHALL use the Background color (`#EAE7DC`) as its section background.

---

### Requirement 5: Smart POI Engine Section

**User Story:** As a Visitor, I want to learn about the AI-powered discovery features, so that I understand the technical value RoadDoggs provides.

#### Acceptance Criteria

1. THE POI_Section SHALL use the Dark color (`#232323`) as its background with a top border of 8px in the Green color (`#8E9C6D`).
2. THE POI_Section SHALL display a status indicator consisting of a red dot and the label "Algorithm v2.4 Active" in Space Mono.
3. THE POI_Section SHALL display a heading composed of "We find the places" in Fraunces Regular (Cream color `#FCFCF0`) and "Google misses." in Fraunces Italic (Rust color `#C8553D`), at a minimum font size of 48px.
4. THE POI_Section SHALL display at least two feature bullets, each with a left border accent, a title in Space Mono, and a supporting description.
5. THE POI_Section SHALL display a radar-style visual on the right column with concentric rings and a POI card showing a location name, city/state, and a match percentage.
6. THE POI_Section SHALL apply a subtle grid overlay pattern to the dark background.

---

### Requirement 6: Social Proof Section

**User Story:** As a Visitor, I want to see reviews and press mentions, so that I can trust that RoadDoggs delivers on its promises.

#### Acceptance Criteria

1. THE Social_Proof_Section SHALL display a section heading with "Word on the street" in Reenie Beanie (Rust color) and "The Co-Pilot Reports." in Fraunces at a minimum font size of 40px.
2. THE Social_Proof_Section SHALL display a rating badge showing "4.9/5" with a star rating, rendered in an outlined style, rotated at a non-zero angle.
3. THE Social_Proof_Section SHALL display at least three review cards in a multi-column grid, each rotated at a distinct non-zero angle to achieve the scrapbook aesthetic.
4. EACH review card SHALL include a review quote and an attribution (username or location label).
5. THE Social_Proof_Section SHALL display a brand bar with the label "seen in the wild" and at least four press/partner brand names rendered as text, using `mix-blend-mode: multiply`.

---

### Requirement 7: Features Section

**User Story:** As a Visitor, I want to see the key product features highlighted, so that I know what tools are available when I sign up.

#### Acceptance Criteria

1. THE Features_Section SHALL display an eyebrow label "Curated Vibes" in Reenie Beanie (Rust color) and a heading "Tools for Drift." in Fraunces at a minimum font size of 48px.
2. THE Features_Section SHALL display at least two feature cards in a two-column grid layout.
3. EACH feature card SHALL include an icon, a release badge (e.g., "REL 1.0" or "BETA"), a feature title in Space Mono, and a supporting description.
4. THE Features_Section feature cards SHALL use distinct background colors and offset box-shadow borders to visually differentiate them.

---

### Requirement 8: Technical Capabilities Section

**User Story:** As a Visitor, I want to understand the technical depth of RoadDoggs, so that I trust the app will work reliably in real road trip conditions.

#### Acceptance Criteria

1. THE Tech_Section SHALL use the Dark color (`#232323`) as its background with a subtle grid overlay pattern.
2. THE Tech_Section SHALL display a heading "Under the Hood" in Fraunces at a minimum font size of 40px in the Cream color (`#FCFCF0`).
3. THE Tech_Section SHALL display a handwritten annotation in Reenie Beanie describing an offline capability.
4. THE Tech_Section SHALL display at least three technical capability items in a multi-column grid, each with a monospace label (e.g., `FUEL_LOGIC`) and a brief description.

---

### Requirement 9: CTA Section

**User Story:** As a Visitor, I want a clear call-to-action to join the beta, so that I can sign up for early access to RoadDoggs.

#### Acceptance Criteria

1. THE CTA_Section SHALL use the Rust color (`#C8553D`) as its background with a bottom border of 8px in the Dark color (`#232323`).
2. THE CTA_Section SHALL display a badge reading "Limited Beta Access // Vol. 3" in an outlined pill style using the Cream color (`#FCFCF0`).
3. THE CTA_Section SHALL display a heading composed of "Don't just drive." and "Roam." (italic) in Fraunces at a minimum font size of 60px, in the Cream color (`#FCFCF0`).
4. THE CTA_Section SHALL display supporting subtext referencing the early adopter community in Space Mono or Segoe UI.
5. THE CTA_Section SHALL display a primary CTA_Button labeled "Start Your Engine" with a Cream background and a dark offset box-shadow.
6. THE CTA_Section SHALL display a secondary link labeled "View Pricing ->" rendered in Reenie Beanie.
7. WHEN the Visitor clicks the "Start Your Engine" CTA_Button, THE Landing_Page SHALL navigate the Visitor to the application's authentication route.

---

### Requirement 10: Field Notes / Blog Section

**User Story:** As a Visitor, I want to browse editorial content from the road, so that I feel inspired to plan a trip with RoadDoggs.

#### Acceptance Criteria

1. THE Blog_Section SHALL display a heading "Field Notes" in Fraunces at a minimum font size of 48px and a subheading "Stories from the road" in Reenie Beanie (Rust color).
2. THE Blog_Section SHALL display at least four content cards in a masonry or multi-column scrapbook layout.
3. EACH content card SHALL be one of the following types: Polaroid_Card with an image and article title, a quote card with a pull quote and location attribution, or a guide card with a checklist.
4. THE Blog_Section content cards SHALL use varied background colors drawn from the Color_Palette to differentiate card types.

---

### Requirement 11: Footer

**User Story:** As a Visitor, I want a footer with navigation links and a download CTA, so that I can explore other parts of the site and download the app.

#### Acceptance Criteria

1. THE Footer SHALL use the Dark color (`#232323`) as its background with a top border of 8px in the Rust color (`#C8553D`).
2. THE Footer SHALL display the text "GO." in Fraunces at a minimum font size of 96px in the Cream color (`#FCFCF0`).
3. THE Footer SHALL display a tagline in Space Mono or Segoe UI beneath the "GO." display text.
4. THE Footer SHALL display a "Download Beta App" CTA_Button and a "Free for early adopters" annotation in Reenie Beanie.
5. THE Footer SHALL display navigation links for at least: Journal, Mission, Merch, and Support.
6. THE Footer SHALL display social media icon links for Instagram and Twitter.
7. THE Footer SHALL display a copyright notice.
8. WHEN the Visitor clicks the "Download Beta App" CTA_Button, THE Landing_Page SHALL navigate the Visitor to the application's authentication route.

---

### Requirement 12: Responsive Layout

**User Story:** As a Visitor on a mobile device, I want the landing page to reflow gracefully, so that I can read and interact with all content on a small screen.

#### Acceptance Criteria

1. THE Landing_Page SHALL reflow all multi-column grid layouts to a single-column layout at viewport widths of 768px or below.
2. THE Landing_Page SHALL scale headline font sizes down proportionally at viewport widths of 768px or below so that no text overflows its container.
3. THE Hero collage elements SHALL stack vertically or reduce in count at viewport widths of 768px or below to prevent horizontal overflow.
4. THE Nav SHALL remain usable and non-overlapping with page content at all viewport widths down to 320px.

---

### Requirement 13: Accessibility

**User Story:** As a Visitor using assistive technology, I want the landing page to be navigable and readable, so that I can access all content regardless of ability.

#### Acceptance Criteria

1. THE Landing_Page SHALL provide descriptive `alt` text for all decorative and informational images.
2. THE Landing_Page SHALL maintain a color contrast ratio of at least 4.5:1 between body text and its background for all text rendered at font sizes below 24px.
3. THE Landing_Page SHALL ensure all interactive elements (CTA_Buttons, links) are reachable and activatable via keyboard navigation.
4. THE Landing_Page SHALL use semantic HTML landmark elements (`<nav>`, `<main>`, `<section>`, `<footer>`) to structure the page.
5. WHEN a CTA_Button or link receives keyboard focus, THE Landing_Page SHALL display a visible focus indicator.
