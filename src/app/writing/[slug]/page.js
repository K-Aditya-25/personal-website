import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiClock } from "react-icons/fi";
import BlogContent from "../../../components/blog-content";
import BlogToc from "../../../components/blog-toc";
import { formatPostDate, getPost, getPosts } from "../../../../content/posts.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();

  // Static export requires at least one parameter for a dynamic route.
  return posts.length ? posts.map(({ slug }) => ({ slug })) : [{ slug: "no-posts-yet" }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Writing" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    alternates: { canonical: post.href },
    openGraph: {
      type: "article",
      url: post.href,
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      publishedTime: `${post.date}T00:00:00.000Z`,
      images: ["/social-preview.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      images: ["/social-preview.png"],
    },
  };
}

export default async function WritingPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="blog-post page-width">
      <Link className="blog-back-link" href="/writing/">
        <FiArrowLeft aria-hidden="true" /> All writing
      </Link>

      <header className="blog-post-header">
        <p className="eyebrow">{post.tags.length ? post.tags.join(" · ") : "Notes and projects"}</p>
        <h1>{post.title}</h1>
        <p className="blog-post-description">{post.description}</p>
        <div className="blog-post-meta">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span><FiClock aria-hidden="true" /> {post.readTimeInMinutes} min read</span>
        </div>
      </header>

      {post.coverImage ? (
        <>
          <div className="blog-cover">
            <Image src={post.coverImage} alt={post.coverAlt} fill sizes="(max-width: 900px) 100vw, 900px" unoptimized priority />
          </div>
          {post.coverPhotographer ? (
            <p className="blog-cover-credit">
              Photo by {post.coverAttribution ? (
                <a href={post.coverAttribution} target="_blank" rel="noreferrer">{post.coverPhotographer}</a>
              ) : post.coverPhotographer}
            </p>
          ) : null}
        </>
      ) : null}

      <div className={`blog-reading-layout${post.headings.length ? "" : " blog-reading-layout-no-toc"}`}>
        <BlogToc headings={post.headings} />
        <BlogContent html={post.html} />
      </div>

      <footer className="blog-post-footer">
        <Link className="button button-dark" href="/writing/">
          <FiArrowLeft aria-hidden="true" /> Back to all writing
        </Link>
        {post.originalUrl ? (
          <a className="text-link" href={post.originalUrl} target="_blank" rel="noreferrer">
            Original Hashnode post <FiArrowUpRight aria-hidden="true" />
          </a>
        ) : null}
      </footer>
    </article>
  );
}
