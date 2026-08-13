# theabsingh.com

Portfolio site for Ab Singh, focused on AI automation and owned backend systems for ecommerce operators.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
cp .env.example .env.local
# Add your OpenAI API key to .env.local
npm run dev
```

The public page is served at `/`. The grounded case-study assistant posts questions to `/api/ask`; the OpenAI key is read only by the server-side route.

## Environment variables

- `OPENAI_API_KEY` — required for the assistant.
- `OPENAI_MODEL` — optional; defaults to `gpt-4o-mini`.

Never commit `.env.local` or the API key. Add the same variables as encrypted secrets in the Cloudflare project before deployment.

## Validation

```bash
npm run build
npm test
```
