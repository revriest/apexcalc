# CalcQI — Project Summary

> **Purpose:** Read this file first in a new chat to instantly understand the project state, decisions made, and what's left to do.

## Project Overview
- **CalcQI** (`https://calcqi.com`) — a static, privacy-first calculator website.
- **Architecture:** 32 standalone calculator HTML pages + one portal homepage. No build step beyond ordinary static file hosting.
- **Stack:** Plain HTML + CSS + JavaScript (vanilla). Dark, slate-based UI with one accent color. No frameworks, no server, no database.

## File Map
| File | Purpose | Source of truth? |
|---|---|---|
| `index.html` | Homepage portal: hero + search + 3 Popular cards + tabbed "All 32" browser + Suggest-a-Calculator + Contact | ✅ **YES — edit this directly for homepage changes** |
| `3d-print-cost-calculator.html` … `wilks-dots-powerlifting-calculator.html` | 32 standalone SEO calculator pages (unique title, meta description, canonical, JSON-LD `WebApplication` schema) | Each page is self-contained |
| `sitemap.xml` | 33 URLs (home + 32 tools) with priorities (0.8–1.0) | Regenerate manually when tools change |
| `robots.txt` | Allows all crawlers; points to `sitemap.xml` | Done |
| `generate-pages.js` | **Historical only.** Split the original single-file app into the 32 pages in a one-time run. **NO LONGER RE-RUNNABLE** (the source panels were stripped from index.html afterward). Do not attempt to re-run it — build new pages by duplicating an existing page. | ❌ Historical |
| `Popular` | **Stray leftover file — safe to delete.** | — |

## Calculator Categories (32 tools)
- **Everyday (6):** Tip Split, Percentage, Unit Converter, Age & Date, Discount, Fuel Cost
- **Maker & Craft (6):** 3D Print, Baker's Pizza Dough, NY Pizza, CNC/Laser, Sourdough, Resin Mold
- **Creator & Media (6):** Video Bitrate, Depth of Field, Camera FOV, ND Filter, Timelapse, Light Falloff
- **Fitness & Body (8):** TDEE, 1RM, FFMI, Body Fat, Calories Burned, Wilks/DOTS, Karvonen HR, Running Pace
- **Finance & Trading (6):** Stock Avg Down, DRIP, Position Risk, Compound Savings, Crypto ROI, Mortgage

## Key Decisions & Protected Rules
1. **Google Analytics:** `G-Z2JPD2K1ER` is in the `<head>` of **all 33 pages** (homepage + every calculator) — **never remove it** from any page.
2. **Theme toggle:** every page has a sun/moon button in the header (`#themeToggle` calling `toggleTheme()`). Choice persists via `localStorage['calcqi-theme']` (`"light"` / `"dark"`), applied early in `<head>` to avoid flash. Light theme = `html[data-theme="light"]` CSS variable overrides injected after the `:root` block. Dark is the default.
3. **Mobile nav:** phone/tablet (≤900px) shows a hamburger button (`#mobileNavBtn`, `toggleMobileNav()`) that slides in a styled right-side drawer (`#mobileNavPanel` + overlay) matching the dark slate UI, with per-category colour accent headers. The drawer's category links are **generated at runtime from the desktop `.cat-nav-menu`** — no duplicated link lists. The old native `<select class="mobile-tool-select">` was removed (2026-08-10).
4. **Homepage layout:** hero → search → 3 Popular cards (Percentage, TDEE, Mortgage) → tabbed "All 32" (Everyday default) → Suggest a Calculator (6 mailto pills) → Contact card.
5. **Suggest/Contact:** uses `mailto:contact@calcqi.com` (user chose the mailto/email-app approach over an in-page form). The `suggestCalc()` JS helper pre-fills subject + body.
6. **SEO per tool:** every calculator is its own page with unique title/description/canonical + JSON-LD WebApplication. No `#tab-` hash URLs remain anywhere.
7. **Design direction:** the user repeatedly asked to remove "AI-generated" aesthetics (emoji tiles, gradient blobs, glow effects, sparklines). Current style = restrained slate surfaces (dark default + light option), flat buttons, subtle borders, typography-led. Respect this when making visual changes. Category accents: Everyday = teal, Maker = violet, Creator = cyan, Fitness = emerald, Finance = amber.
8. **All calculators share a design pattern:** input card → results deck (hero stat + rating badge + gauges/split-bars/charts + insight card) → FAQ / Did-you-know / Formula cards underneath.
9. **SEO rich data (added 2026-08-10):** every calculator page now has **FAQPage JSON-LD** generated from its on-page FAQ `<details>` blocks (rich-result/accordion eligibility), plus a **"Related calculations"** card linking to 3 tools from the same category (internal linking; auto-derived from the page's own nav so links stay accurate). Schema now per page = `WebApplication` + `FAQPage`.
10. **SEO context (2026-08-10):** site is indexed (`site:calcqi.com` returns results) but brand-new, so head terms (e.g. "mortgage payment calculator") are not winnable yet — realistic path is brand/long-tail queries + Google Search Console (`calcqi.com`, submit `sitemap.xml`) + backlinks. Do not expect page-1 head-term rankings on a fresh domain.

## Standing TODOs / Open Items
- [ ] Delete stray `Popular` file in project root
- [ ] **Visual polish pass** — the user has never been fully satisfied with the overall look; a full design refresh is offered and awaited (note: a light theme was added 2026-08-10)
- [ ] Optional: replace `mailto:` Suggest/Contact with an in-page form (needs a Formspree or similar endpoint from the user)
- [ ] Suggested future calculators the user pitched as pills: BMI & Body Composition, Salary After Tax, SIP / Investment Returns, Voltage Drop, Cooking Measurement Converter, Boiling Point at Altitude
- [ ] Homepage featured "Popular" picks are swappable anytime (currently Percentage, TDEE, Mortgage)
- [ ] **Google Search Console:** verify `calcqi.com`, submit `https://calcqi.com/sitemap.xml`, request indexing for all 33 pages (biggest non-code SEO lever; do this soon)
- [ ] Optionally add a few more FAQs per tool page — more FAQPage entities = more rich-result surface

## How to Continue in a New Chat
1. Say: **"Read `PROJECT_SUMMARY.md` first."**
2. Then state the next goal (e.g., "redesign the homepage", "add a BMI calculator", "remove the AI look").
3. The new chat will have full context from this file.