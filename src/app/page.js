import Image from "next/image";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { GiShuttlecock } from "react-icons/gi";
import { TbWriting } from "react-icons/tb";
import { getPosts } from "../../content/posts.mjs";
import { profile, volunteering } from "../../content/site-data.mjs";
import FeaturedWriting from "../components/featured-writing";

const interestCards = [
  {
    href: "/writing/",
    className: "interest-card interest-card-work",
    art: "writing",
    eyebrow: "On the blog",
    title: "Writing as I learn.",
    copy: "Short notes on AI, data and ideas worth exploring.",
  },
  {
    href: "/competitions/",
    className: "interest-card interest-card-sport",
    art: "badminton",
    eyebrow: "On court",
    title: "One more rally.",
    copy: "Men’s doubles in the Dublin District League, moving from Division 5 to Division 4 in 2 years.",
  },
  {
    href: "/books/",
    className: "interest-card interest-card-books",
    eyebrow: "On the bookshelf",
    title: "Always in the middle of a book.",
    copy: "Currently reading Dan Brown’s The Secret of Secrets and Daniel Kahneman’s Thinking Fast and Slow",
  },
  {
    href: "/volunteering/",
    className: "interest-card interest-card-community",
    eyebrow: "In the community",
    title: "Helping organise community events",
    copy: "Event content and photography at Give(a)Go, and time at Trinity College Dublin Open Day.",
  },
];

export default function HomePage() {
  const posts = getPosts();
  const firstPost = posts[0];
  const accordionItems = [
    ...(firstPost ? [{
      href: firstPost.href,
      title: "Ideas in public",
      detail: firstPost.description,
      image: firstPost.coverImage,
      alt: firstPost.coverAlt,
      className: "accordion-writing",
    }] : []),
    {
      href: "/volunteering/",
      title: "Events in Dublin",
      detail: "Meeting people and sharing ideas at Dublin AI Week.",
      image: "/images/events-dublin.jpeg",
      alt: "Aditya wearing a Dublin AI Week team shirt at a gathering in Dublin.",
      className: "accordion-events",
    },
    {
      href: "/volunteering/",
      title: "Campus days",
      detail: "Helping new students find their way at Trinity Open Day.",
      image: volunteering[1].image,
      alt: volunteering[1].imageAlt,
      className: "accordion-campus",
    },
  ];

  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <Image
          className="hero-image motion-image"
          src="/images/portrait.jpg"
          alt="Aditya standing in a garden in Lucknow"
          fill
          sizes="100vw"
          unoptimized
        />
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-byline">Aditya Kharbanda <span>·</span> Dublin, Ireland</p>
          <h1 id="home-title" data-route-title>Curiosity, in motion.</h1>
          <p className="hero-lede" data-route-subtitle>
            I work where technology meets people. After hours: badminton, books, basketball and community in Dublin.
          </p>
          <div className="hero-actions">
            <Link className="button button-lime" href="/writing/">Explore my writing <FiArrowUpRight aria-hidden="true" /></Link>
            <a className="button button-ghost" href={`mailto:${profile.email}`}>Say hello <FiArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <a className="hero-scroll" href="#interests"><span>Scroll to explore</span><FiArrowDown aria-hidden="true" /></a>
      </section>

      <div className="marquee-band" aria-label="Thinking, building, rallying, reading and showing up">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              <span>Thinking</span><i /><span>Building</span><i /><span>Rallying</span><i /><span>Reading</span><i /><span>Showing up</span><i />
            </div>
          ))}
        </div>
      </div>

      <section className="home-interests page-width section-space" id="interests" aria-labelledby="interest-title">
        <div className="section-heading interest-heading">
          <div>
            <p className="eyebrow">A few things that make a week</p>
            <h2 id="interest-title">Welcome to my corner of the internet :)</h2>
          </div>
        </div>
        <div className="interest-grid grid-flow-dense">
          {interestCards.map((card) => (
            <Link className={card.className} href={card.href} key={card.title}>
              <div className="interest-card-copy">
                <p className="interest-eyebrow">{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <span className="interest-link">Explore <FiArrowUpRight aria-hidden="true" /></span>
              </div>
              <span className={`interest-art${card.art ? ` interest-art-${card.art}` : ""}`} aria-hidden="true">
                {card.art === "writing" ? (
                  <TbWriting />
                ) : null}
                {card.art === "badminton" ? <GiShuttlecock /> : null}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="accordion-section section-space" aria-labelledby="accordion-title">
        <div className="page-width">
          <div className="section-heading accordion-heading">
            <div>
              <p className="eyebrow">Outside the everyday</p>
              <h2 id="accordion-title">People, places and ideas worth showing up for.</h2>
            </div>
            <Link className="text-link" href="/volunteering/">See the volunteering work <FiArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="horizontal-accordion">
            {accordionItems.map((item) => (
              <Link className={`accordion-panel ${item.className}`} href={item.href} key={item.title}>
                {item.image ? (
                  <Image className="accordion-image motion-image" src={item.image} alt={item.alt} fill sizes="(max-width: 720px) 100vw, 50vw" unoptimized />
                ) : (
                  <span className="accordion-image accordion-image-placeholder" aria-hidden="true" />
                )}
                <span className="accordion-shade" aria-hidden="true" />
                <span className="accordion-copy">
                  <span className="accordion-title">{item.title}</span>
                  <span className="accordion-detail">{item.detail}</span>
                  <span className="accordion-arrow" aria-hidden="true"><FiArrowUpRight /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedWriting posts={posts} />

    </>
  );
}
