import { books } from "../../../content/site-data.mjs";
import PageIntro from "../../components/page-intro";

export const metadata = {
  title: "Books",
  description: "Books Aditya Kharbanda has finished and the two he is reading now.",
};

function BookGroup({ title, description, entries, group }) {
  return (
    <section className={`book-group book-group-${group}`}>
      <div className="book-group-heading">
        <div><p className="eyebrow">{group === "reading" ? "Currently open" : "On the shelf"}</p><h2>{title}</h2></div>
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

export default function BooksPage() {
  return (
    <>
      <PageIntro title="A shelf that keeps growing." description="Stories, psychology and practical ideas. Here’s what’s finished and what’s open." />
      <section className="content-section page-width bookshelf-page">
        <BookGroup title="Read" description="Five books on the shelf." entries={books.read} group="read" />
      <BookGroup title="Reading now" description="Two books in progress." entries={books.reading} group="reading" />
      </section>
    </>
  );
}
