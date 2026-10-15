import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { getPosts, formatPostDate } from "../../../content/posts.mjs";
import PageIntro from "../../components/page-intro";

export const metadata = {
  title: "Writing",
  description: "Notes and projects on AI, machine learning, and the things Aditya Kharbanda is learning along the way.",
  alternates: { canonical: "/writing/" },
};

export default function WritingPage() {
  const posts = getPosts();

  return (
    <>
      <PageIntro title="Ideas in progress." description="Notes and projects on AI, machine learning, and the things I’m learning along the way." />
      <section className="content-section page-width">
        <div className="writing-intro-panel">
          <div>
            <p className="eyebrow">From my notebook</p>
            <h2>Learning out loud.</h2>
          </div>
          <p>Every article lives here, alongside the projects, questions, and discoveries that shaped it.</p>
          <a className="button button-dark" href="#writing-list">
            Browse the writing <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        {posts.length ? (
          <div className="writing-list" id="writing-list">
            {posts.map((post, index) => (
              <Link className="writing-row" href={post.href} key={post.slug}>
                <span className="writing-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="writing-thumbnail">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.coverAlt} fill sizes="(max-width: 760px) 82px, 132px" unoptimized />
                  ) : (
                    <span className="writing-thumbnail-art" aria-hidden="true">
                      <span>{post.tags[0] ?? "Notes"}</span>
                    </span>
                  )}
                </span>
                <span className="writing-copy">
                  <span className="writing-meta">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span><FiClock aria-hidden="true" /> {post.readTimeInMinutes} min read</span>
                  </span>
                  <span className="writing-title">{post.title}</span>
                  <span className="writing-description">{post.description}</span>
                </span>
                <span className="writing-arrow" aria-hidden="true"><FiArrowUpRight /></span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="writing-empty-state" id="writing-list">
            <p className="eyebrow">From my notebook</p>
            <h2>New writing will appear here.</h2>
            <p>Add a Markdown file to <code>content/posts/</code> and push it to publish.</p>
          </div>
        )}
      </section>
    </>
  );
}
