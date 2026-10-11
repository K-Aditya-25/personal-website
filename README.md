# Aditya Kharbanda — personal website

A small, dependency-free static website built for Cloudflare Pages.

## Run it locally

Requirements: Node.js. No `npm install` is needed.

```sh
npm run build
npm run preview
```

Then open <http://127.0.0.1:4321>. The preview serves the generated `dist/` directory.

## Update the content

- Personal details, links, writing, books, competitions, certificates and volunteering entries live in `content/site-data.mjs`.
- Page layouts live in `src/pages.mjs`; shared navigation and page metadata live in `src/shell.mjs`.
- The current photos and their filenames are listed in [IMAGES.md](IMAGES.md). Replace them in `public/images/` to update the site.
- A travel page is a planned addition; it is not in the current navigation until there are places and photos to show.

## Deploy on Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare, open **Workers & Pages**, create a **Pages** project, and connect that repository.
3. Set the production branch to `main`, the build command to `npm run build`, and the output directory to `dist`.
4. Deploy, then add your purchased domain under the Pages project’s **Custom domains**. Because the domain is already on Cloudflare DNS, Pages can guide you through the required DNS record and certificate setup.
5. After the first deployment, each push to the production branch triggers a new deployment.

The build uses only Node.js built-ins and this repository’s files. It does not download packages from npm.
