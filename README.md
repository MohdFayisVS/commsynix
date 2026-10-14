# COMMSYNIX SMART SYSTEMS — Cloudflare Worker

Company website with AI, IoT and Smart Mobility sections, editable content, banner uploads, projects and testimonials. This version is independent of ChatGPT authentication.

## Deploy to your existing Cloudflare Worker

1. In Workers & Pages, select your existing Worker named `commsynix` and its GitHub connection to `MohdFayisVS/commsynix`.
2. Build command: `npm run build`. Deploy command: `npm run deploy` (or `npx wrangler deploy`). Root directory: repository root. Set the build Node version to 22 (`NODE_VERSION=22`). The tracked Wrangler config publishes `dist` assets and the Worker API entry.
3. Create a D1 database named `commsynix-cms`. In the Worker’s Settings → Bindings, bind it as `DB`.
4. Run every SQL file in `migrations/` in order against that database. For the initial release, paste `migrations/0001_cms.sql` into D1’s SQL console and execute it. Run it only once; do not reset an existing database.
5. Create an R2 bucket, for example `commsynix-media`, and bind it in Worker settings as `BUCKET`. Keep the bucket private; images are served by the application. R2 availability/billing setup depends on your account.
6. Locally run `npm ci`, then `npm run admin:credentials`. Choose a username and password. The script hides password input and prints a password hash and session secret without saving your plaintext password.
7. Add the three outputs as encrypted secrets in Worker Settings → Variables and Secrets: `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`. Configure production and preview separately. Never add them to source files or GitHub.
8. Redeploy the Worker after bindings and secrets are configured. Open `https://YOUR-DOMAIN/admin` and sign in with the credentials you chose.

No live Cloudflare resources are created by this repository. The public website loads its default content if storage is unavailable; the admin reports incomplete setup and does not permit writes without configured authentication. Existing admin-local browser data from the previous site is not migrated automatically. Records created in the earlier ChatGPT-hosted site are separate and are not in this repository.

## Admin URL

Your hosted website URL followed by `/admin`. The old `/admin-portal` and `/admin-portal-login` paths redirect to `/admin`. The dashboard link is not shown in the public footer.

## Admin security

- Server-side password verification using salted PBKDF2-SHA256.
- Signed 8-hour session cookies with HttpOnly, SameSite=Strict and Secure on HTTPS.
- Same-origin checks on all API writes, plus a database-backed login attempt limit.
- Password-hash changes invalidate sessions; changing SESSION_SECRET signs everyone out.
- Admin setup and secret values stay out of the client JavaScript.
- Admin password is deliberately not predefined. Use a new password, not the previous browser-side login password.

## Development and verification

```bash
npm ci
npm test
npm run build
```

`npm run dev` previews the frontend. For full API testing, add local DB and BUCKET bindings to `wrangler.jsonc` using your actual resource names/ID, put development-only secrets in ignored `.dev.vars`, and use `npx wrangler dev`. Use local D1 migrations before writing data locally. Never use your production database for development tests.

Keep production bindings in the Cloudflare dashboard unless you deliberately adopt Wrangler-managed configuration. Run `npx wrangler types` after connecting resources and configure the same DB/BUCKET bindings in your Wrangler deployment settings if the deployment warns that it will remove dashboard bindings. Never deploy over a warning that deletes resources or bindings. The example file is not loaded automatically and contains no real resource IDs.

## Changes from the original repository

The previous TanStack/Lovable application is replaced by the approved COMMSYNIX design using a Vite SPA and Worker-compatible API handlers. The old GitHub Pages-only deploy workflow is replaced by build/test checks. Cloudflare’s existing Worker Git integration handles deployment after merge. GitHub Pages alone cannot run the APIs.

Homepage section text, service cards, banner, contact numbers/email/address, section visibility, projects and testimonials are editable in the admin. Logos remain brand assets in `public/brand/`. Testimonials remain hidden until authentic feedback is published.

## Cloudflare documentation

- https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/
- https://developers.cloudflare.com/pages/functions/bindings/
- https://developers.cloudflare.com/pages/functions/routing/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
