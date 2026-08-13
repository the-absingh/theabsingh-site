# Setup Checklist — before/while working with Codex

## Accounts needed
- [ ] GitHub account (free) — Codex will push code here
- [ ] Cloudflare account (free) — already have this for DNS, also used for Pages hosting
- [ ] OpenAI API key — for the "ask about my work" widget (reuse existing key from client work, or create a new one scoped for this project)

## Local setup
1. Create a project folder on your machine, e.g. `theabsingh-site`
2. Put BRIEF.md in that folder
3. Install Codex CLI, run it from inside that folder
4. Point Codex at BRIEF.md as the spec — ask it to plan the build before writing code (site structure, pages, the widget architecture) and confirm the plan with you before it starts generating files
5. Once you approve the plan, let it build

## Deploy steps (after Codex finishes a working version)
1. Codex initializes git and creates the repo structure — push it to a new GitHub repo
2. In Cloudflare dashboard: Pages → Create a project → Connect to Git → select the repo
3. Cloudflare auto-detects build settings for most frameworks — confirm and deploy
4. In the Pages project settings, add theabsingh.com as a custom domain
5. Add the OpenAI API key as an environment variable/secret in Cloudflare Pages settings — never commit it directly into the code or BRIEF.md

## Before going live
- [ ] Test the AI widget end-to-end — ask it a real question, confirm it answers only from case study content
- [ ] Check the page on mobile
- [ ] Confirm no real client names, domains, or identifying screenshots are visible anywhere
- [ ] Confirm the API key isn't exposed in browser dev tools / page source
