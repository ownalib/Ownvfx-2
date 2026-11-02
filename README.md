# OWN VFX — Cinematic Agency Website

A complete responsive single-page website built with React + Vite. Dark cinematic visuals, four accent colors (purple, pink, orange and cyan), interactive navigation, FAQs, concept portfolio cards, Instagram contact links, and an email-inquiry form.

## Run locally

Requires Node.js 20.19+ or 22.12+ (recommended for recent Vite versions).

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
npm run preview
```

The generated production files are in `dist/`.

## Deploy on Vercel via GitHub

1. Create a new repository on GitHub and upload **the contents** of this folder. Do not upload the ZIP as a single file.
2. In Vercel, choose **Add New → Project**, connect GitHub and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**. No API keys or environment variables are required.

## How to customize

- **Agency title/contact information:** `src/main.jsx`. Look for `IG` and `EMAIL` near the top. The social buttons currently link to `https://www.instagram.com/own.vfx/` and emails to `ownaleebhattie1@gmail.com`.
- **Services:** Edit the `SERVICES` array in `src/main.jsx`.
- **Showcase:** The `projects` array contains **clearly labeled concept previews**, not real client projects. Replace these with your own portfolio assets when available. Set up videos in `public/` or hosted embeds you control.
- **Brand colors:** Edit the CSS variables in `src/styles.css` (`--purple`, `--pink`, `--orange`, `--cyan`, `--grad`).
- **SEO metadata:** Edit `index.html`.

## Project inquiry form

This is deliberately backend-free. On submit, the browser opens the visitor's default email app with a pre-filled `mailto:` email. If the visitor doesn't have an email app configured, they can use the Instagram and direct email links displayed beside the form. **It does not silently send/store emails.**

## Notes

- No invented client reviews, project claims or performance metrics are used.
- Fonts are served from Google Fonts, with local fallbacks.
- Designs and artwork in the hero and concept cards are created in CSS; no third-party stock image dependency.
- Responsive layouts and reduced-motion preferences supported.
