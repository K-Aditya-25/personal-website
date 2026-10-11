import { profile } from "../content/site-data.mjs";

const navItems = [
  ["Home", "/", "home"],
  ["Writing", "/writing/", "writing"],
  ["Books", "/books/", "books"],
  ["Competitions", "/competitions/", "competitions"],
  ["Volunteering", "/volunteering/", "volunteering"],
  ["Courses", "/courses/", "courses"],
];

function externalLinks() {
  return profile.links
    .map(({ label, href }) => `<a href="${href}" target="_blank" rel="noreferrer">${label}<span aria-hidden="true"> ↗</span></a>`)
    .join("\n");
}

export function shell({ title, description, active, content }) {
  const nav = navItems
    .map(([label, href, key]) => `<a href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f3f5f2">
  <meta name="description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title} | ${profile.name}">
  <meta property="og:description" content="${description}">
  <title>${title} | ${profile.name}</title>
  <link rel="stylesheet" href="/styles.css">
  <script src="/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="wordmark" href="/" aria-label="Aditya Kharbanda, home">Aditya Kharbanda<span class="wordmark-period">.</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
        <span class="sr-only">Open navigation</span><span class="menu-icon" aria-hidden="true"></span>
      </button>
      <nav class="site-nav" id="site-navigation" aria-label="Main navigation">${nav}</nav>
    </div>
  </header>
  <main id="main">${content}</main>
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <a class="footer-name" href="/">${profile.name}</a>
        <p>Personal site, based in Dublin.</p>
      </div>
      <div class="footer-links" aria-label="Social links">
        ${externalLinks()}
        <a href="mailto:${profile.email}">Email<span aria-hidden="true"> ↗</span></a>
      </div>
      <p class="copyright">© ${new Date().getFullYear()} ${profile.name}</p>
    </div>
  </footer>
</body>
</html>`;
}

export function externalLink(href, label, className = "text-link") {
  return `<a class="${className}" href="${href}" target="_blank" rel="noreferrer">${label}<span aria-hidden="true"> ↗</span></a>`;
}

export function pageIntro(title, description) {
  return `<header class="page-intro reveal"><h1>${title}</h1><p>${description}</p></header>`;
}
