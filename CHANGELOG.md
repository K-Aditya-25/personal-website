# Changelog

## 2026-10-15 — Cloudflare Workers deployment

### Fixed

- Added a Wrangler static-assets configuration for the `personal-website` Worker, targeting Next.js's `out/` export.
- Added the Wrangler `previews` configuration required for Cloudflare branch preview deployments.
- Added a pinned Wrangler toolchain and deploy script, and updated deployment instructions for Workers Builds.

## 2026-10-11 — `nextjs-revamp`

### Added

- Migrated the portfolio to a Next.js App Router frontend with static export and shared page components.
- Added animated site navigation, GSAP page and section motion, and social link icons in the footer.
- Added a badminton doubles rally animation with a regulation-proportion court and a serve, lift, smash, and net-block sequence.
- Added the Dublin events photo to the homepage and Hashnode cover images to writing cards where available.
- Added mobile layouts and responsive behavior across the site.

### Changed

- Refined homepage copy and interest cards, including the blog-writing hobby, current reading, and next-chapter text.
- Removed the location label from the homepage hero and adjusted events imagery and card alignment.
- Updated project setup, scripts, and documentation for Next.js development, static builds, and preview.
