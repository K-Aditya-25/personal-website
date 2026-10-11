import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { posts } from "../../../content/site-data.mjs";
import PageIntro from "../../components/page-intro";

export const metadata = {
  title: "Writing",
  description: "Notes and projects on AI, machine learning and the things Aditya Kharbanda is learning along the way.",
};

export default function WritingPage() {
  return (
    <>
      <PageIntro title="Ideas in progress." description="Notes and projects on AI, machine learning, and the things I’m learning along the way." />
      <section className="content-section page-width">
        <div className="writing-intro-panel">
          <div>
            <p className="eyebrow">Published on Hashnode</p>
            <h2>Learning out loud.</h2>
          </div>
          <p>For now, each article opens at its original home. New ideas start here and keep growing.</p>
          <a className="button button-dark" href="https://hashnode.com/@Kharbanda25" target="_blank" rel="noreferrer">
            Visit my Hashnode profile <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="writing-list">
          {posts.map((post, index) => (
            <a className="writing-row" href={post.href} key={post.href} target="_blank" rel="noreferrer">
              <span className="writing-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="writing-thumbnail">
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={post.coverAlt} fill sizes="(max-width: 760px) 82px, 132px" unoptimized />
                ) : (
                  <span className="writing-thumbnail-art" aria-hidden="true"><span>{post.coverLabel}</span></span>
                )}
              </span>
              <div className="writing-copy">
                <h2>{post.title}</h2>
                <p>{post.note}</p>
              </div>
              <span className="writing-arrow" aria-hidden="true"><FiArrowUpRight /></span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
