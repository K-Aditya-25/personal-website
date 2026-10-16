# Changelog

## 2026-10-16 — Future plans

### Added

- Added a Markdown document listing planned website improvements and content updates.

## 2026-10-16 — Refresh homepage interest cards

### Changed

- Replaced the blog and badminton cards’ abstract background art with writing and shuttlecock illustrations, and aligned the book and community artwork with the same sage treatment.
- Updated the community card title to “Helping organise community events”.
- Removed the interests-section aside and the homepage’s next-chapter section.

## 2026-10-16 — Keep outline jumps out of browser history

### Fixed

- Updated article outline links to replace the current URL fragment and scroll in place, so browser Back returns to the page before the article instead of stepping through headings.

## 2026-10-16 — Collapsible article outline

### Added

- Added a sticky, collapsible table of contents to article pages, generated from Markdown headings with working anchor links.
- Added responsive styling for a compact dropdown outline on narrower screens, with typography that reflects heading levels.

## 2026-10-16 — On-site Markdown blog

### Added

- Added a Markdown post directory with frontmatter metadata, article rendering, reading time, canonical metadata, and statically generated `/writing/<slug>/` pages.
- Added a Markdown post template and documented the add-file-and-push publishing workflow, including local blog image paths.
- Imported all 14 Hashnode posts as Markdown with their titles, summaries, SEO metadata, dates, tags, and post content; downloaded and localized 84 cover and article images.
- Preserved Hashnode SEO titles, SEO descriptions, read times, and the four cover photo credits available through the API.
- Added long-form article and post-list styling for desktop and mobile layouts.
- Added rendering support for Hashnode image alignment and callout markup, and mapped links between migrated posts to their local article routes.

### Changed

- Changed the writing list and featured homepage writing links to use local article routes.
- Removed the old Hashnode-only writing cards, archive link, and footer icon so article discovery and reading stay on the site.
- Included the current Next.js-generated agent rules block so `next dev` does not recreate it as an uncommitted change.

## 2026-10-15 — Cloudflare Workers deployment

### Fixed

- Added a Wrangler static-assets configuration for the `personal-website` Worker, targeting Next.js's `out/` export.
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
