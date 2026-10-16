import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const markdownHtmlOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "pre",
    "code",
    "iframe",
    "del",
    "hr",
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: [...(sanitizeHtml.defaults.allowedAttributes.a ?? []), "name", "target", "rel"],
    div: ["data-node-type"],
    blockquote: ["class", "data-dnt", "data-theme"],
    h2: ["id"],
    h3: ["id"],
    h4: ["id"],
    h5: ["id"],
    h6: ["id"],
    img: ["src", "alt", "title", "width", "height"],
    code: ["class"],
    th: ["align"],
    td: ["align"],
    iframe: ["src", "title", "width", "height", "allow", "allowfullscreen", "loading", "referrerpolicy", "class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedIframeHostnames: [
    "youtube.com",
    "www.youtube.com",
    "www.youtube-nocookie.com",
    "player.vimeo.com",
    "open.spotify.com",
    "codepen.io",
    "codesandbox.io",
    "www.codesandbox.io",
    "stackblitz.com",
  ],
  allowIframeRelativeUrls: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    iframe: sanitizeHtml.simpleTransform("iframe", {
      loading: "lazy",
      referrerpolicy: "strict-origin-when-cross-origin",
    }),
  },
};

function postFiles() {
  return readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();
}

function renderPostMarkdown(content) {
  const renderer = new marked.Renderer();
  const renderHeading = renderer.heading.bind(renderer);
  const headings = [];
  const usedHeadingIds = new Set();
  let headingCount = 0;

  function headingText(tokens) {
    return tokens.map((token) => {
      if (token.type === "br") return " ";
      if (token.type === "html") return (token.text ?? "").replace(/<[^>]*>/g, " ");
      if (token.type === "image") return token.text ?? "";
      if (Array.isArray(token.tokens)) return headingText(token.tokens);
      return typeof token.text === "string" ? token.text : "";
    }).join("").replace(/\s+/g, " ").trim();
  }

  function headingId(text, index) {
    const base = text
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `section-${index + 1}`;
    let id = base;
    let suffix = 2;
    while (usedHeadingIds.has(id)) id = `${base}-${suffix++}`;
    usedHeadingIds.add(id);
    return id;
  }

  // The article title is already rendered as the page's single h1.
  renderer.heading = ({ tokens, depth }) => {
    const text = headingText(tokens);
    const id = headingId(text, headingCount++);
    const outputDepth = Math.min(depth + 1, 6);
    const html = renderHeading({ tokens, depth: outputDepth });

    if (depth <= 3 && text) headings.push({ id, text, level: depth });

    return html.replace(`<h${outputDepth}>`, `<h${outputDepth} id="${id}">`);
  };

  const contentWithEmbeds = content.replace(/^%\[([^\]\r\n]+)\][ \t]*$/gm, (_match, rawUrl) => {
    const url = safeHttpUrl(rawUrl);
    return `\n\n${url ? renderExternalEmbed(url) : escapeHtml(rawUrl)}\n\n`;
  });

  return { html: marked.parse(contentWithEmbeds, { renderer }), headings };
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function iframeHtml(src, title, className, height = 315, allow = "") {
  const escapedAllow = allow ? ` allow="${escapeHtml(allow)}"` : "";
  return `<iframe class="${escapeHtml(className)}" src="${escapeHtml(src)}" title="${escapeHtml(title)}" width="100%" height="${height}"${escapedAllow} allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
}

function parseVideoStart(value) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return Number(value);

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match || !match[0]) return 0;
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

function youtubeVideo(url) {
  const host = url.hostname.toLowerCase();
  let videoId = null;

  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
  } else if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
    videoId = url.searchParams.get("v");
    if (!videoId) videoId = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ?? null;
  }

  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return null;

  const playerUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  const start = url.searchParams.get("start") ?? url.searchParams.get("t");
  const startSeconds = parseVideoStart(start);
  if (startSeconds) playerUrl.searchParams.set("start", String(startSeconds));
  playerUrl.searchParams.set("rel", "0");

  return iframeHtml(
    playerUrl.href,
    "YouTube video player",
    "blog-embed-video",
    315,
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  );
}

function xPost(url) {
  const host = url.hostname.toLowerCase();
  if (!["x.com", "www.x.com", "twitter.com", "www.twitter.com", "mobile.twitter.com"].includes(host)) return null;
  if (!/(?:^|\/)status\/\d+(?:\/|$)/.test(url.pathname)) return null;

  return `<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><a href="${escapeHtml(url.href)}">View this post on X</a></blockquote>`;
}

function renderExternalEmbed(href) {
  const url = new URL(href);
  const video = youtubeVideo(url);
  if (video) return video;

  const tweet = xPost(url);
  if (tweet) return tweet;

  const host = url.hostname.toLowerCase();
  const vimeoId = host === "player.vimeo.com"
    ? url.pathname.match(/^\/video\/(\d+)\/?$/)?.[1]
    : ["vimeo.com", "www.vimeo.com"].includes(host) ? url.pathname.match(/^\/(\d+)\/?$/)?.[1] : null;
  if (vimeoId) {
    return iframeHtml(`https://player.vimeo.com/video/${vimeoId}`, "Vimeo video player", "blog-embed-video");
  }

  const spotifyMatch = host === "open.spotify.com" && url.pathname.match(/^\/(track|album|playlist|episode|show)\/([A-Za-z0-9]+)\/?$/);
  if (spotifyMatch) {
    const [, kind, id] = spotifyMatch;
    return iframeHtml(
      `https://open.spotify.com/embed/${kind}/${id}`,
      `Spotify ${kind}`,
      "blog-embed-audio",
      kind === "track" ? 152 : 352,
      "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
    );
  }

  if (["codesandbox.io", "www.codesandbox.io"].includes(host) && /^\/(?:s|p\/sandbox)\//.test(url.pathname)) {
    url.searchParams.set("embed", "1");
    return iframeHtml(url.href, "CodeSandbox interactive example", "blog-embed-interactive", 620, "clipboard-write; encrypted-media");
  }

  if (host === "stackblitz.com" && /^\/(?:edit|github)\//.test(url.pathname)) {
    url.searchParams.set("embed", "1");
    return iframeHtml(url.href, "StackBlitz interactive example", "blog-embed-interactive", 620, "clipboard-write; encrypted-media");
  }

  if (host === "codepen.io") {
    const match = url.pathname.match(/^\/([^/]+)\/(?:pen|full)\/([A-Za-z0-9]+)\/?$/);
    if (match) {
      const [, author, penId] = match;
      return iframeHtml(`https://codepen.io/${author}/embed/${penId}?default-tab=result`, "CodePen example", "blog-embed-interactive", 520);
    }
  }

  const escapedHref = escapeHtml(url.href);
  return `<p><a href="${escapedHref}" target="_blank" rel="noopener noreferrer">${escapedHref}</a></p>`;
}

function safeHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function readPost(filename, renderMarkdown = false) {
  const slug = filename.slice(0, -3);
  if (!slugPattern.test(slug)) {
    throw new Error(`Invalid blog filename "${filename}". Use lowercase letters, numbers, and hyphens.`);
  }

  const raw = readFileSync(path.join(postsDirectory, filename), "utf8");
  const { data, content } = matter(raw);
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description = typeof data.description === "string" ? data.description.trim() : "";
  const date = data.date instanceof Date
    ? data.date.toISOString().slice(0, 10)
    : typeof data.date === "string" ? data.date.trim() : "";

  if (!title || !description || !date || !Number.isFinite(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(
      `Invalid frontmatter in "content/posts/${filename}". Add a title, description, and date (YYYY-MM-DD).`,
    );
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTimeInMinutes = Number.isFinite(data.readTimeInMinutes)
    ? Math.max(1, Math.round(data.readTimeInMinutes))
    : Math.max(1, Math.ceil(wordCount / 225));
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag) => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean)
    : [];
  const renderedMarkdown = renderMarkdown ? renderPostMarkdown(content) : null;

  return {
    slug,
    href: `/writing/${slug}/`,
    title,
    description,
    seoTitle: typeof data.seoTitle === "string" ? data.seoTitle.trim() : null,
    seoDescription: typeof data.seoDescription === "string" ? data.seoDescription.trim() : null,
    date,
    tags,
    coverLabel: tags[0] ?? "Notes",
    coverImage: typeof data.coverImage === "string" ? data.coverImage.trim() : null,
    coverAlt: typeof data.coverAlt === "string" ? data.coverAlt.trim() : `${title} cover image`,
    coverPhotographer: typeof data.coverPhotographer === "string" ? data.coverPhotographer.trim() : null,
    coverAttribution: safeHttpUrl(data.coverAttribution),
    originalUrl: typeof data.originalUrl === "string" ? data.originalUrl.trim() : null,
    readTimeInMinutes,
    ...(renderedMarkdown
      ? {
          html: sanitizeHtml(renderedMarkdown.html, markdownHtmlOptions),
          headings: renderedMarkdown.headings,
        }
      : {}),
  };
}

export function getPosts() {
  return postFiles()
    .map((filename) => readPost(filename))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug) {
  if (!slugPattern.test(slug)) return null;
  const filename = `${slug}.md`;
  if (!postFiles().includes(filename)) return null;
  return readPost(filename, true);
}

export function formatPostDate(date) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
