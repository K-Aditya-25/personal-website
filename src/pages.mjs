import { profile, posts, books, hackathons, badminton, certificates, volunteering } from "../content/site-data.mjs";
import { externalLink, pageIntro } from "./shell.mjs";

const articleLink = (post, index, compact = false) => `
  <article class="writing-row reveal" style="--item-order:${index}">
    <div class="writing-copy">
      <h3><a href="${post.href}" target="_blank" rel="noreferrer">${post.title}<span aria-hidden="true"> ↗</span></a></h3>
      ${compact ? "" : `<p>${post.note}</p>`}
    </div>
    ${compact ? "" : `<span class="writing-source">Hashnode</span>`}
  </article>`;

const bookRows = (items) => items.map(({ title, author }, index) => `
  <li class="book-row reveal" style="--item-order:${index}">
    <span class="book-spine" aria-hidden="true"></span>
    <div><h3>${title}</h3><p>${author}</p></div>
  </li>`).join("");

const competitionRows = (entries, mode) => entries.map((item, index) => `
  <article class="event-row reveal" style="--item-order:${index}">
    <span class="event-year">${item.year}</span>
    <div class="event-main">
      <h3>${mode === "badminton" ? `${item.league} · ${item.detail}` : item.title}</h3>
      <p>${mode === "badminton" ? item.club : [item.detail].filter(Boolean).join("") || "Hackathon"}</p>
    </div>
    <span class="event-type">${mode === "badminton" ? "Men’s doubles" : "Hackathon"}</span>
  </article>`).join("");

function imageSlot({ src, alt, note, size = "" }) {
  return `<figure class="photo-slot ${size}" data-photo="${src}">
    <div class="photo-slot-inner" role="img" aria-label="${alt}">
      <img class="photo-image" src="${src}" alt="${alt}" loading="lazy">
      <span class="photo-slot-mark" aria-hidden="true">+</span>
      <span>${note}</span>
    </div>
    <figcaption>Photo to add: <code>public${src}</code></figcaption>
  </figure>`;
}

export function homePage() {
  const latest = posts.slice(0, 3).map((post, index) => articleLink(post, index, true)).join("");
  const readingNow = books.reading.map(({ title, author }) => `<li><span>${title}</span><small>${author}</small></li>`).join("");

  return `<section class="hero page-width">
    <div class="hero-copy reveal">
      <p class="eyebrow">A personal site</p>
      <h1 id="intro-title">${profile.name}</h1>
      <p class="hero-lede">I’m a ${profile.title} at ${profile.company}, exploring AI, badminton, books and basketball in ${profile.location}.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="/writing/">Read my writing</a>
        <a class="button button-quiet" href="/books/">Open the bookshelf</a>
      </div>
      <p class="previous-role">Previously: ${profile.previousRole}</p>
      <div class="social-row" aria-label="Find me online">
        ${profile.links.map(({ label, href }) => `<a href="${href}" target="_blank" rel="noreferrer">${label}<span aria-hidden="true"> ↗</span></a>`).join("")}
      </div>
    </div>
    ${imageSlot({ src: "/images/portrait.jpg", alt: `Portrait of ${profile.name}`, note: "Portrait photo to add", size: "portrait-slot" })}
  </section>

  <section class="section-band page-width">
    <div class="section-heading reveal"><h2>What I spend time on</h2><p>Work, interests and the things that keep me curious.</p></div>
    <div class="interest-layout">
      <article class="interest-block interest-ai reveal">
        <span class="interest-kicker">At work and after</span>
        <h3>AI, from the model to the way we build with it.</h3>
        <p>I follow harness engineering, open-source models and closed-source models, and write about what I’m learning.</p>
        <a class="text-link" href="/writing/">Writing on Hashnode<span aria-hidden="true"> ↗</span></a>
      </article>
      <article class="interest-block interest-sport reveal">
        <span class="interest-kicker">On court and courtside</span>
        <h3>Badminton is the sport I compete in.</h3>
        <p>I play Division 4 men’s doubles in Dublin, and I enjoy both watching and playing basketball.</p>
        <a class="text-link" href="/competitions/">Competition history<span aria-hidden="true"> ↗</span></a>
      </article>
    </div>
  </section>

  <section class="section-band page-width latest-section">
    <div class="section-heading reveal"><h2>Latest writing</h2><p>Articles published on Hashnode.</p></div>
    <div class="writing-list">${latest}</div>
    <div class="section-action reveal">${externalLink("https://hashnode.com/@Kharbanda25", "All posts on Hashnode")}</div>
  </section>

  <section class="reading-preview page-width reveal">
    <div><span class="interest-kicker">On the bookshelf</span><h2>Reading now</h2>
      <ul class="reading-now-list">${readingNow}</ul>
    </div>
    <a class="button button-outline" href="/books/">See the full list</a>
  </section>

  <section class="volunteer-preview page-width reveal">
    <div><span class="interest-kicker">Community</span><h2>Giving time in Dublin</h2>
      <p>Event content and photography at Give(a)Go, plus volunteering at TCD Open Day.</p>
      <a class="text-link" href="/volunteering/">Volunteering details<span aria-hidden="true"> ↗</span></a>
    </div>
    ${imageSlot({ src: "/images/give-a-go.jpg", alt: "Aditya volunteering at a Give(a)Go event", note: "Give(a)Go photo to add", size: "preview-photo" })}
  </section>`;
}

export function writingPage() {
  return `${pageIntro("Writing", "Notes and projects on AI, machine learning, and the things I’m learning along the way.")}
    <section class="content-section page-width">
      <div class="external-feature reveal">
        <p class="interest-kicker">Published on Hashnode</p>
        <p>For now, each article opens at its original home. I plan to host new posts here in the future.</p>
        ${externalLink("https://hashnode.com/@Kharbanda25", "Visit my Hashnode profile", "button button-primary")}
      </div>
      <div class="writing-list writing-list-full">${posts.map((post, index) => articleLink(post, index)).join("")}</div>
    </section>`;
}

export function booksPage() {
  return `${pageIntro("Books", "Books I’ve finished and the two I’m reading now.")}
    <section class="content-section page-width bookshelf-page">
      <div class="book-group reveal">
        <div class="book-group-heading"><h2>Read</h2><p>Five books on the shelf.</p></div>
        <ol class="book-list">${bookRows(books.read)}</ol>
      </div>
      <div class="book-group book-group-reading reveal">
        <div class="book-group-heading"><h2>Reading now</h2><p>Currently in progress.</p></div>
        <ol class="book-list">${bookRows(books.reading)}</ol>
      </div>
    </section>`;
}

export function competitionsPage() {
  const badmintonSearch = "https://bi.tournamentsoftware.com/find";
  return `${pageIntro("Competitions", "Hackathons, badminton leagues and the teams I’ve taken part with.")}
    <section class="content-section page-width competition-page">
      <div class="competition-heading reveal"><h2>Hackathons</h2><p>Project links can be added as you share them.</p></div>
      <div class="event-list">${competitionRows(hackathons, "hackathon")}</div>
      <div class="badminton-section">
        <div class="competition-heading reveal"><h2>Badminton</h2><p>Men’s doubles in the Dublin District League competition.</p></div>
        <div class="badminton-feature reveal">
          <div class="court-diagram" aria-hidden="true">
            <span class="court-center"></span><span class="court-net"></span><span class="court-short-service"></span>
            <span class="shuttle-path"><i></i></span>
          </div>
          <div class="badminton-note"><span class="division-mark">DIV 4</span><h3>Moving up the divisions.</h3>
            <p>Division 5 with TCD, then Division 4 with Sheriff Badminton Club.</p>
            ${externalLink(badmintonSearch, "Badminton Ireland tournament search", "text-link")}
          </div>
        </div>
        <div class="event-list badminton-list">${competitionRows(badminton, "badminton")}</div>
      </div>
    </section>`;
}

export function volunteeringPage() {
  return `${pageIntro("Volunteering", "Event work, creative support and time spent helping people connect in Dublin.")}
    <section class="content-section page-width volunteer-page">
      ${volunteering.map((item, index) => `<article class="volunteer-entry reveal ${index % 2 ? "volunteer-entry-reverse" : ""}">
        <div class="volunteer-copy"><p class="interest-kicker">${index === 0 ? "Events" : "Campus"}</p><h2>${item.title}</h2><p>${item.body}</p></div>
        ${imageSlot({ src: item.image, alt: item.imageAlt, note: item.imageNote })}
      </article>`).join("")}
    </section>`;
}

export function coursesPage() {
  return `${pageIntro("Courses", "A record of courses and specializations I’ve completed.")}
    <section class="content-section page-width course-page">
      <div class="course-intro reveal"><h2>Coursera certificates</h2><p>Five courses and specializations in machine learning, deep learning and generative AI.</p></div>
      <ol class="certificate-list">${certificates.map(({ href, label, completed }, index) => `<li class="certificate-row reveal" style="--item-order:${index}">
        <span class="certificate-index" aria-hidden="true">0${index + 1}</span>
        <div class="certificate-copy"><span class="certificate-label">${label}</span><span class="certificate-date">Completed ${completed}</span></div>
        ${externalLink(href, "Open certificate", "text-link")}
      </li>`).join("")}</ol>
    </section>`;
}
