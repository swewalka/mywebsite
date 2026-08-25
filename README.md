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

- `Alex Morgan`, `AM`, and the location
- `hello@example.com`
- the three starter project descriptions and links
- GitHub and LinkedIn URLs
- the canonical `metadataBase` URL in `app/layout.tsx`

## Artwork and space traffic

The source artwork remains unchanged in `assets/`. Smaller transparent WebP derivatives in `public/assets/optimized/` reduce initial transfer size while retaining the paper texture.

Asset inventory:

| Files | Category | Initial use |
| --- | --- | --- |
| `rocket-1.png`, `rocket-2.png` | Rockets | Traffic, hero |
| `satellite-1.png`, `satellite-2.png` | Satellites | Traffic |
| `planet-1.png`, `planet-2.png` | Planets / moon | Reserved, hero distance layer |
| `meterioide-1.png` | Meteor | Traffic |
| `nebula-1.png` | Layered cloud / smoke | Subtle hero depth layer |

Every source file is a 1254×1254 8-bit RGBA PNG with transparency.

Register additional flyby artwork in `config/spaceAssets.ts`. Each entry controls its type, weighted rarity, scale, duration, opacity, and base render size; no new React component is needed. `SpaceTraffic` waits 8–18 seconds before the first pass, then considers another pass roughly every 15–40 seconds. It keeps at most one object mounted, art-directs several curved trajectories, adds sub-pixel stop-motion jitter, uses quieter mobile timings, and disables itself for reduced-motion users.

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
