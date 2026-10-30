# own.vfx — Creative Portfolio

A responsive, interactive portfolio built in plain HTML, CSS and JavaScript. Colors: `#FAF2DF` (cream) and `#BE1220` (deep red). No npm dependencies, build command, database or paid services needed.

## Start locally

Open a terminal in this folder and run:

```bash
python -m http.server 5500
```

Then open http://localhost:5500. Do **not** open `index.html` using `file://` because browsers may prevent reliable detection of portfolio videos.

## Exact portfolio file names

Add your media files in these locations **without changing the names**:

| Category | File path | Recommended format |
|---|---|---|
| Reel 1 | `media/reels/reel-01.mp4` | MP4, vertical 9:16 |
| Reel 2 | `media/reels/reel-02.mp4` | MP4, vertical 9:16 |
| Reel 3 | `media/reels/reel-03.mp4` | MP4, vertical 9:16 |
| Instagram post 1 | `media/posts/post-01.jpg` | JPG, 4:5 or square |
| Instagram post 2 | `media/posts/post-02.jpg` | JPG, 4:5 or square |
| Instagram post 3 | `media/posts/post-03.jpg` | JPG, 4:5 or square |
| Horizontal video 1 | `media/videos/video-01.mp4` | MP4, 16:9 |
| Horizontal video 2 | `media/videos/video-02.mp4` | MP4, 16:9 |
| Horizontal video 3 | `media/videos/video-03.mp4` | MP4, 16:9 |

Use MP4 H.264 for broad browser support. Keep files small for fast loading (compress heavy videos). Empty slots show 'Coming Soon' automatically until the matching files exist. Filename matching is case-sensitive on Vercel. If your IG images are PNG, convert them to JPG or edit their filenames inside `script.js`.

## Personalization

- Hero uses typography and graphic elements only; no personal photo is included.
- Text, headlines and section order: `index.html`
- Colors and style: `styles.css` (`:root` at top)
- Portfolio titles, categories, filenames: `projects` array at the top of `script.js`
- Contact email & Instagram URL: `index.html`
- Instagram: https://www.instagram.com/own.vfx/ (already linked); other social links can be added later.
- No phone number or WhatsApp contact is displayed.

## Put on GitHub and deploy with Vercel

1. Unzip the project and upload the **contents** of `own-vfx-portfolio` to a GitHub repository. Include `index.html` at repo root.
2. Visit https://vercel.com/new and import the GitHub repository.
3. Framework preset: **Other**. Build command: **leave empty**. Output directory: **leave empty** (or `.` if your interface requires a value). Root directory: `./`.
4. Click **Deploy**. Vercel publishes your site.
5. To add portfolio items later, upload the files to the specified paths in GitHub; Vercel deploys the new commit automatically.

Note: GitHub blocks files over 100 MB. If videos are large, compress them or host them externally and change `script.js` URLs. Browser autoplay may be restricted; videos play when users open them.

## What works

- Responsive mobile navigation
- Animated scrolling reveal, ticker, and reading-progress bar
- Portfolio filtering for reels / IG posts / horizontal videos
- Automatic media detection, placeholders and full-size modal preview
- Click-to-email and Instagram contact buttons
- Keyboard-accessible portfolio cards and dialog
- Reduced-motion accessibility fallback

## Things to customize later

Add your real project names, Instagram/YouTube links, client testimonials, and verified case studies as you collect them. No invented client results are used.


## Interactive features (upgrade)
- Responsive navigation with active section indication, scroll progress and reveal motion.
- Cursor spotlight, desktop parallax and tilt cards (off for reduced-motion and touch devices).
- Interactive services panel.
- Nine portfolio slots, category filtering, preview modal, next/previous buttons and left/right arrow keyboard navigation.
- Live project brief builder (no backend): Prepare Email opens a local email client; Copy Brief uses the clipboard. No submissions or analytics are sent to a server.
- All features work on Vercel as a static site.
