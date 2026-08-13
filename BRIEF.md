# theabsingh.com — Project Brief

## What this is
A personal portfolio/authority site for Ab Singh, positioned as "AI Automation & Systems for Ecom Brands." Primary audience: ecommerce operators and agency owners evaluating whether to hire Ab for automation/AI systems work. Secondary audience: anyone checking credibility after an outreach DM, Upwork proposal, or X post.

## Domain & hosting
- Domain: theabsingh.com (purchased, DNS already pointed to Cloudflare)
- Target host: Cloudflare Pages (free tier, no commercial-use restriction)
- Deploy via: GitHub repo → Cloudflare Pages auto-deploy on push
- Keep the stack simple — static site or lightweight React, no database needed. Content is fixed, not user-generated.

## The single most important feature
A small, real, working "ask about my work" chat widget — visitor types a question, gets an answer grounded in the case studies below, powered by the OpenAI API. This must be a genuine working feature, not a mockup:
- API key must live server-side only (Cloudflare Worker / serverless function) — never exposed client-side
- Scope the system prompt to answer only from the case study content below — no open-ended chat
- This widget IS the differentiator. Everything else on the site is standard portfolio content; this is the proof-of-skill element.

## Design direction
Do not default to generic "AI startup" visual clichés (cream background + terracotta accent, or near-black + single neon accent, or generic SaaS gradient hero). This is a systems/infrastructure builder's site — the visual identity should feel more like an engineer's tool than a marketing page: precise, structural, unglamorous-on-purpose. Think: technical documentation meets a well-made dashboard, not a startup landing page.

Signature element to consider: the "ask about my work" widget itself should be the visual centerpiece, not a bolted-on chat bubble — treat it like the hero.

Copy tone: direct, plain, slightly dry. No hype language, no exclamation points, no "revolutionize/streamline/unlock" marketing verbs. Write like the case study copy below — specific claims, real numbers, no padding.

## Site content

### Hero
Name: Ab Singh
Tagline: AI automation and systems for ecom brands
Subhead: I build the backend infrastructure ecom operators own outright, instead of renting forever.
Primary CTA: interacts with the AI widget ("Ask about the work")
Secondary CTA: contact / get in touch

### Stat highlights (pull from case studies below)
- 3,000+ monthly inquiries handled
- ~55% resolved with no human handoff
- 2,000+ SKUs auto-priced
- 100% Shopify fee accuracy (vs. prior estimation)

### Case Study 1 — Automated Accounting & Reporting Pipeline
Built for Atlas, a multi-store ecommerce operator (name changed to protect confidentiality — real operator, real scale).

**Problem:** Manual daily entry across Shopify, Meta, and Google was eating 30+ minutes a day — and getting skipped on busy days, leaving a backlog. Shopify fees were tracked using a flat estimated percentage, not the actual per-country rate.

**Fix:** Built a Make.com pipeline that automatically pulls Shopify analytics, Meta ad spend, and Google ad spend into one unified sheet every day — including exact Shopify fees pulled per country instead of estimated. Also fetches platform-level attributed sales so Meta and Google performance can be tracked independently. A weekly scenario runs every Monday to catch and backfill any COGS entries the supplier missed over the weekend.

**Result:** Zero manual daily entry. 100% accurate fee data instead of estimates. 30 min/day → roughly 10 min/week.

### Case Study 2 — Multi-Store Analytics Dashboard
Built for Atlas, a multi-store ecommerce operator (name changed to protect confidentiality).

**Problem:** Financial data was next-day only (Paris TZ) — no visibility into today, no consolidated cross-store view, no date filtering.

**Fix:** Built a dashboard combining historical data with a live-fetch scenario pulling today's numbers directly from Shopify, Meta, and Google. Multi-store from day one — a consolidated owner view plus individual store views — so new brands plug in without rebuild.

**Result:** Next-day data became real-time, today included. Live on the primary store, architecture ready as more brands come online.

### Case Study 3 — Self-Hosted AI Customer Support Agent
Built for Atlas, a multi-store ecommerce operator (name changed to protect confidentiality).

**Problem:** Atlas handled 3,000+ monthly support inquiries manually across Shopify, email, Messenger, Instagram, WhatsApp. SaaS tools like Zendesk cost $200-300/mo, scaling worse with more stores.

**Fix:** Built a self-hosted system on Chatwoot (Hetzner VPS), with a Meta Developer app and webhook setup for Messenger/IG/WhatsApp. Make.com feeds history into OpenAI, replies contextually and multilingually, flags handoff only when truly needed.

**Result:** 3,000+ inquiries/month handled, ~55% resolved with no handoff, no recurring SaaS cost.

### Case Study 4 — AI-Powered Catalog Pricing
Built for Nebula, a collectible brand store owner (name changed to protect confidentiality).

**Problem:** Managing a 2,000+ SKU diecast catalog by hand caused pricing errors and out-of-sync inventory. Spreadsheet uploads can't handle condition grading or rare-variant value.

**Fix:** Built a Make.com automation that intercepts raw product photos, feeds them to the OpenAI Vision API, which extracts name, tags, condition grade, then calculates retail price against rule-based logic before pushing to Shopify.

**Result:** 100% automated catalog sync across 2,000+ SKUs, no manual entry, consistent rule-based pricing.

### Tools/stack row
Make.com · OpenAI API · Shopify · Chatwoot · n8n

### Footer
Contact CTA — simple contact method (email or a form), nothing elaborate.

## Confidentiality rules (non-negotiable)
- Never use real client names — Atlas and Nebula only, exactly as written above
- No real screenshots with visible domains, org names, or identifying UI elements
- If screenshots are added later, they must be cropped/blurred per the same standard used elsewhere (no browser chrome, no visible brand names)

## What NOT to build
- No blog/CMS for now
- No user accounts or database
- No e-commerce/payment functionality
- No YouTube/video embeds yet
- Keep it to a single page or a small number of static pages — do not over-scope this
