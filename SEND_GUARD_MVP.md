# SEND Guard Provision Explorer MVP

## Existing architecture

Inspected root repository at main commit `4ac4a24`. The root `index.html` loads `src/main.jsx`; `App` renders `AppRouter` inside the shared `PageShell` (Header, Footer and LabBackground). React 18, React Router 6, Vite and Tailwind are the existing stack. Theme tokens in `src/styles/globals.css` support the body's `night` class. Showcase project metadata is held in `src/content/projects`; AI for SEND previously rendered a generic concept page. The existing `src/components/Projects/send-guard` files were empty.

The root build uses `src/`, not the separate `simcov2`, `simwebapp`, ZIP archives or checked-in `dist`. The feature leaves these copies untouched and adds no dependencies, backend, database or external credentials. Repository dependency/build caches are already tracked; these are excluded from the feature commit.

## Open and run

- Feature route: `/send-guard/provision-explorer`
- Entry point: `/projects/ai-for-send` → Open Provision Explorer MVP
- Standard local commands: `npm install`, `npm run dev`, `npm run build`
- Pure data tests: `node --test scripts/test-provision.mjs`
- Browser journey: with Playwright installed, `node scripts/check-provision.cjs` against a running local Vite server. Optional environment variables: `PLAYWRIGHT_MODULE`, `PLAYWRIGHT_CHANNEL`, `PROVISION_BASE_URL`.

## Features

- Responsive OpenStreetMap tile map with attribution, drag panning, zoom, reset, keyboard controls, search-centre indicator and numbered result markers.
- Combined text, institution type, support area, locality, age and 5/10/20-mile filters. Distances use Haversine straight-line distance from a named town centre and sort nearest first.
- Linked institution profiles with illustrative support, admissions, evidence status and questions to ask; selecting a marker focuses the details for keyboard users.
- Up to three institutions on a comparison board. Selections survive filter changes within the session; removal and clear actions are available. Reload starts a fresh session.
- Locality counts and support tags recompute from filtered results. Empty results explicitly avoid implying a real provision gap.
- Official Hampshire SEND and DfE directory links, prominent data disclosure and graceful map tile failure message.

## Data and boundaries

All 14 institution records are fictional, including names, coordinates, support areas and age ranges. No real school has been verified and no vacancies, inspection scores, quality rankings or recommendations are asserted. `provision.js` contains the deterministic fixture dataset. South Hampshire is a study area spanning seven named localities, including the separate Southampton and Portsmouth authorities; it is not presented as an administrative county. Independent specialist and maintained specialist are distinct categories.

The OSM basemap represents geography; the institution overlays are illustrative. Public raster tiles require internet access and remain in their original colours in both themes. Attribution is visible and links to OpenStreetMap copyright. Browser caching is used; no bulk download or offline tile caching is implemented. For production traffic, arrange an appropriate tile provider and review its usage terms.

To introduce verified records, replace the fixture dataset with an audited data source and add field-level provenance, verification dates, URNs, official school/inspection links, actual governance classifications and source refresh procedures. Preserve evidence labels and show missing values explicitly. The MVP does not process child details or determine placement suitability.

## Validation (9 October 2026)

- Production Vite build passed (421 modules); output written to `.send-guard-build` to preserve checked-in `dist`.
- Three Node tests passed: independent Southampton–Portsmouth distance sanity check, combined filter/age/distance boundaries and sorting, fixture integrity and map projection orientation.
- Automated Chromium journey passed: concept-page entry, search radius and age filtering, empty results, comparison limit/removal/clear, selections across filters, marker selection/focus, zoom/reset/keyboard pan, locality insights, direct-route reload and existing `/`, `/showcase`, `/research`, `/about`, `/contact` routes.
- Six theme/viewport combinations (390, 768, 1440px × light/dark) passed horizontal overflow checks; four screenshots saved under `review/` for review. Desktop map tiles loaded; unavailable tiles were separately simulated and the fallback/markers passed.
- No browser page errors during the journey. An existing Browserslist stale-data warning remains in the build.

## Limits

No postcode geocoding, travel routing, live availability, export, saved accounts or persistent shortlist. Comparison and filters use in-memory React state. The real-world evidence and provenance work above is required before a public school-discovery service.
