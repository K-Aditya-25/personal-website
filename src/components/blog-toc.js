export default function BlogToc({ headings }) {
  if (!headings?.length) return null;

  return (
    <nav className="blog-toc" aria-label="Article contents">
      <details className="blog-toc-details" open>
        <summary className="blog-toc-summary">On this page</summary>
        <ol className="blog-toc-list">
          {headings.map((heading) => (
            <li className={`blog-toc-item blog-toc-level-${heading.level}`} key={heading.id}>
              <a className="blog-toc-link" href={`#${heading.id}`}>
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
