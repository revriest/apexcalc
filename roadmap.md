# CalcQI Product & Development Roadmap

## Phase 1: Core Architecture & Technical SEO (Immediate Priority)

### 1. Split SPA into Dedicated Static HTML Pages
- Extract each of the 20 calculators into clean, dedicated static URLs (e.g., `calcqi.com/3d-print-cost-calculator.html` or `/3d-print-cost-calculator`).
- Give every page a unique `<title>`, meta description, canonical tag, and `WebApplication` JSON-LD schema block to maximize organic search relevance.
- Keep `index.html` as the central Bento-style homepage portal linking directly to all dedicated static routes.

### 2. Refactor All 20 Calculator Engines
- Audit every calculator page to eliminate truncated code or static stub values.
- Ensure every tool features dynamic form controls (number inputs, sliders, dropdowns) and instant real-time JavaScript calculation engines triggered by `input` / `change` events.
- Verify every "Copy" button appends the default watermark signature (`Calculated via CalcQI - https://calcqi.com`).

### 3. XML Sitemap & Google Search Console Submission
- Generate an updated `sitemap.xml` containing all 21 clean URLs (1 homepage + 20 individual calculator pages).
- Submit `sitemap.xml` in Google Search Console to trigger indexation across all individual pages.

---

## Phase 2: Infrastructure & Engagement Features

### 4. Finalize Custom Email (`contact@calcqi.com`)
- Set up `contact@calcqi.com` as an alias in the Zoho Mail Admin Console.
- Add the required MX records (`mx.zoho.com.au`, etc.) and SPF record (`v=spf1 include:zoho.com.au ~all`) under Namecheap's Mail Settings to ensure inbox delivery and prevent spam flagging.

### 5. Implement "Did You Know?" Daily Trivia Section
- Add a styled "Did You Know?" card to each calculator page.
- Populate a local JavaScript array containing trivia/facts for each tool.
- Implement a date-seeded index function (`dayOfYear % facts.length`) so visitors see a new fact every 24 hours without server or database calls.

---

## Phase 3: User Accounts & Cloud Sync ("Soft Auth")

### 6. Supabase & Google OAuth 2.0 Setup
- Create a free-tier Supabase project and set up Google OAuth credentials in Google Cloud Console.
- Add the Supabase JS SDK (`@supabase/supabase-js`) to the app head script.

### 7. Database Schema & Local-First Sync
- Deploy the `saved_runs` table in Supabase PostgreSQL using a flexible `JSONB` payload column to store input/output data for any calculator.
- Enable Row Level Security (RLS) policies restricted to `auth.uid()`.
- Build local-first logic: write every "Save Run" to `localStorage` immediately for instant 0ms UI response, and sync to Supabase in the background if logged in.

### 8. "Soft Auth" Conversion Modal
- Implement a soft-auth modal prompt that triggers when an anonymous user saves 3 runs locally.
- Prompt: *"Sign in with Google to back up your saved presets and sync across desktop and mobile devices."*
- Preserve 100% free, login-free access for casual visitors.

---

## Phase 4: Targeted Acquisition & Traffic Testing

### 9. Free Directory Submissions
- Submit `calcqi.com` to utility directories: **AlternativeTo**, **SaaSHub**, **Tiny-Helpers.dev**, and **Toolify.ai**.

### 10. $30 Google Ads Diagnostic Test
- Run a low-budget ($5/day for 6 days) Google Search Ads campaign.
- Target exact-match (`[3d print cost calculator]`, `[sourdough levain calculator]`), low-CPC Maker/Craft keywords.
- Monitor Google Analytics 4 (GA4) for user behavior metrics: session duration, repeat pageviews, and account sign-up conversion rates.

---

## Phase 5: Mobile App Store Expansion

| Action Item | Technical Execution | Objective |
|---|---|---|
| **PWA Manifest & Service Worker** | Add `manifest.json` and `service-worker.js` for asset caching and offline support. | Enables "Add to Home Screen" on iOS & Android directly from the browser. |
| **PWABuilder / Capacitor Packaging** | Wrap the responsive web app into an Android `.aab` (via TWA) and iOS Xcode wrapper. | Prepares binaries for store submission without rewriting native code. |
| **Store Listings & Badges** | Submit builds to Apple App Store Connect & Google Play Console; add store badges to `calcqi.com` footer. | Captures in-app store search queries and adds social proof to the main site. |