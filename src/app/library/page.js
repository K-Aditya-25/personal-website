import { books } from "../../../content/site-data.mjs";
import PageIntro from "../../components/page-intro";

export const metadata = {
  title: "Library",
  description: "Books Aditya Kharbanda is reading, plans to read next, and has finished.",
  alternates: { canonical: "/library/" },
};

function BookGroup({ title, eyebrow, description, entries, group }) {
  return (
    <section className={`book-group book-group-${group}`}>
      <div className="book-group-heading">
        <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
        <p>{description}</p>
      </div>
      <ol className="book-list">
        {entries.map(({ title: bookTitle, author }, index) => (
          <li className="book-row" key={bookTitle}>
            <span className="book-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="book-spine" aria-hidden="true" />
            <div><h3>{bookTitle}</h3><p>{author}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function LibraryPage() {
  return (
    <>
      <PageIntro title="Library" description="What I’m reading now, what’s up next, and the books I’ve finished." />
      <section className="content-section page-width bookshelf-page">
        <BookGroup title="Reading" eyebrow="Currently open" description="Two books in progress." entries={books.reading} group="reading" />
        <BookGroup title="Up Next" eyebrow="Coming up" description="Two on deck." entries={books.upNext} group="up-next" />
        <BookGroup title="Read" eyebrow="On the shelf" description="Five finished." entries={books.read} group="read" />
      </section>
    </>
  );
}
