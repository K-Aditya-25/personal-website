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

## Deploy on Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare, open **Workers & Pages**, create a **Pages** project, and connect that repository.
3. Set the production branch to `main`, the build command to `npm run build`, and the output directory to `out`.
4. Deploy, then add your purchased domain under the Pages project’s **Custom domains**.
5. After the first deployment, each push to the production branch triggers a new deployment.

The project uses a Next.js static export, so its routes and visual effects work on static hosting without a running Node.js server.
