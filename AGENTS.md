# Agent instructions

## Project overview

- This is a Next.js App Router portfolio using TypeScript, Tailwind CSS, React,
  and Motion.
- It is a fully static site. `next build` exports the deployable artifact to
  `out/`.
- Production is deployed by `.github/workflows/deploy.yml` to GitHub Pages at
  `https://simonwewalka.at`.
- The custom domain is hosted at its root, so production does not use a base
  path.

## Development and validation

- Use Node.js 22 and npm. The lockfile is authoritative; use `npm ci` for a
  clean installation.
- Start development with `npm run dev`.
- Run `npm run check` before handing off changes. It runs linting and the
  production export; Next performs strict TypeScript validation during the
  build. Use `npm run typecheck` for a faster standalone type check.
- `outputFileTracingRoot` and `experimental.useTypeScriptCli` in
  `next.config.ts` are workspace compatibility settings: a parent lockfile can
  confuse root detection, and npm lifecycle notices can corrupt the TypeScript
  CLI output Next expects to parse. Do not remove them without rerunning the
  full check.
- Do not launch a browser, take screenshots, or perform visual checks for this
  project.
- Validate with static checks and builds. If appearance cannot be assessed
  confidently, ask the user to verify it.
- Mobile navigation is scheduled for a separate rework. Avoid incidental
  mobile-navigation changes unless the task explicitly includes them.

## Source layout

- `app/` contains the page, global styling, root metadata, robots, and sitemap.
- `components/` contains page sections and the animation/space scene.
- `config/portfolio.ts` is the source of truth for owner-editable copy,
  navigation, projects, contact details, and social links.
- `config/site.ts` owns the canonical site URL.
- `config/paths.ts` applies an optional `NEXT_PUBLIC_BASE_PATH` to public asset
  references.
- `config/spaceAssets.ts` registers the optimized scene artwork used at runtime.
- `public/assets/optimized/` contains the deployable image derivatives. Files in
  `public/` are copied into every export, so do not keep unused files there.

## Content and link conventions

- Preserve the page title unless the user explicitly requests a change.
- External HTTP links open in a new tab and use
  `rel="noopener noreferrer"`. Their accessible name must announce that they
  open a new tab.
- Internal section links and email links stay in the current tab.
- Project publication state is optional data in `config/portfolio.ts` and is
  rendered below the project heading.

## Assets

- The local `assets/` directory contains original source artwork and is
  intentionally ignored by Git. Do not delete it from the user's machine.
- Only optimized, runtime-required derivatives belong in
  `public/assets/optimized/`.
- Optimize new raster artwork before adding it to `public`; preserve dimensions
  and transparency appropriate to its use.
- All string-based public asset references must use `withBasePath(...)` so a
  repository-subpath build remains possible.

## Deployment and metadata

- The production site URL defaults to `https://simonwewalka.at` and is also set
  explicitly in the GitHub Actions workflow.
- Canonical, Open Graph, Twitter, robots, and sitemap output depend on that URL.
- A manual repository-subpath build must set both variables:

  ```bash
  NEXT_PUBLIC_BASE_PATH=/repository-name \
  NEXT_PUBLIC_SITE_URL=https://username.github.io/repository-name \
  npm run build
  ```

- GitHub Pages must use GitHub Actions as its deployment source.

## Animation architecture

- `Reveal` and project planets use Motion viewport animation and honor reduced
  motion.
- `LaunchRocket` precomputes sampled flight curves and animates layered WebP
  artwork.
- `SpaceTraffic` mounts at most one satellite per active section and pauses when
  the section is outside its observation margin.
- Decorative artwork must remain hidden from assistive technology.

## Deferred performance work

Do not simplify the current animation system incidentally. A future focused
performance pass can measure the client bundle and then consider replacing
simple reveal/idle effects with CSS, limiting persistent `will-change`, and
encoding rocket flight paths more compactly. Preserve reduced-motion behavior
and the existing visual character during any such work.
