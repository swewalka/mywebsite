# Handcrafted Space Portfolio

A concise, static personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Motion. The interface is deliberately precise and editorial; the supplied paper artwork carries the expressive visual identity.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run typecheck
npm run lint
npm run build
```

The static site is exported to `out/`.

## Customize the portfolio

All owner-editable copy, projects, capabilities, contact details, navigation, and social links live in `config/portfolio.ts`.

Update these placeholders before publishing:

- `Simon Wewalka`, `SW`, and the location
- `hello@example.com`
- the three starter project descriptions and links
- GitHub and LinkedIn URLs
- the canonical `metadataBase` URL in `app/layout.tsx`

## Artwork and space traffic

The source artwork remains unchanged in `assets/`. Smaller transparent WebP derivatives in `public/assets/optimized/` reduce initial transfer size while retaining the paper texture.

Asset inventory:

| Files | Category | Initial use |
| --- | --- | --- |
| `rocket-1.png`, `rocket-2.png` | Rockets | Reserved variants |
| `Rocket/rocket.png`, `Rocket/propulsion-*.png` | Launch rocket and flame frames | Intro launch sequence |
| `satellite-1.png`, `satellite-2.png` | Satellites | Flyby traffic |
| `planet-1.png`, `planet-2.png` | Planets / moon | Launch origin and orbital destination |
| `meterioide-1.png` | Meteor | Reserved variant |
| `nebula-1.png` | Layered cloud / smoke | Subtle hero depth layer |

The original scene assets and launch rocket are 1254×1254 8-bit RGBA PNGs. The five transparent propulsion frames are 1086×1448 PNGs.

Register additional satellite flyby artwork in `config/spaceAssets.ts`. Each entry controls its weighted rarity, scale, duration, brightness, and base render size; no new React component is needed. `SpaceTraffic` waits 8–18 seconds before the first pass, then considers another pass roughly every 15–40 seconds. It keeps at most one satellite mounted, art-directs several smooth curved trajectories with a slow rotational drift, uses quieter mobile timings, and disables itself for reduced-motion users. The intro rocket is assembled from a separate body and five propulsion frames in `LaunchRocket.tsx`; its path and scale remain smooth while only the flame artwork flickers.

## GitHub Pages

The included workflow in `.github/workflows/deploy.yml` builds and deploys on pushes to `main`.

1. Push the repository to GitHub.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Push to `main` or run the workflow manually.

The workflow automatically sets the correct base path:

- `https://username.github.io/`: no base path
- `https://username.github.io/repository-name/`: `/repository-name`

For a manual repository-subpath build, run:

```bash
NEXT_PUBLIC_BASE_PATH=/repository-name npm run build
```

All public artwork and favicon references pass through `config/paths.ts`, so changing the base path does not require component edits.
