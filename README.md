# Aditya Kharbanda — personal website

A Next.js App Router site with GSAP motion, exported as static files for Cloudflare Pages.

## Run it locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Open <http://127.0.0.1:3000> while developing. To build and preview the static export:

```sh
npm run build
npm run preview
```

The production files are generated in `out/`; the preview serves them at <http://127.0.0.1:4321>.

## Update the content

- Personal details, links, writing, books, competitions, certificates and volunteering entries live in `content/site-data.mjs`.
- Next.js routes and shared layout live in `src/app/`; interactive site components live in `src/components/`.
- Photos and filenames are listed in [IMAGES.md](IMAGES.md). Replace them in `public/images/` to update the site.
- A travel page is a planned addition; it is not in the current navigation until there are places and photos to show.

## Deploy on Cloudflare Workers

This site uses Next.js static export and serves the generated `out/` directory as Worker assets. The checked-in [wrangler.jsonc](wrangler.jsonc) names the existing `personal-website` Worker and points Wrangler to that export.

For Workers Builds, connect this repository and configure:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npm run deploy`
- Root directory: repository root

Attach `adityakharbanda.dev` to the `personal-website` Worker as a custom domain. Workers Builds uses the Wrangler version pinned in `package.json` and deploys the `out/` assets after the build succeeds.
