"use client";

function handleHeadingClick(event, headingId) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const heading = document.getElementById(headingId);
  if (!heading) return;

  event.preventDefault();

  const url = new URL(window.location.href);
  url.hash = headingId;
  window.history.replaceState(window.history.state, "", url);

  heading.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
}

export default function BlogToc({ headings }) {
  if (!headings?.length) return null;

  return (
    <nav className="blog-toc" aria-label="Article contents">
      <details className="blog-toc-details" open>
        <summary className="blog-toc-summary">On this page</summary>
        <ol className="blog-toc-list">
          {headings.map((heading) => (
            <li className={`blog-toc-item blog-toc-level-${heading.level}`} key={heading.id}>
              <a
                className="blog-toc-link"
                href={`#${heading.id}`}
                onClick={(event) => handleHeadingClick(event, heading.id)}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
