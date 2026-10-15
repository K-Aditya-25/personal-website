"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(useGSAP);

export default function FeaturedWriting({ posts = [] }) {
  const featuredPosts = posts.slice(0, 3);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePost = featuredPosts[activeIndex];

  useGSAP(
    () => {
      if (!activePost) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".feature-copy", { autoAlpha: 0, x: 24 }, {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.fromTo(".feature-photo, .feature-cover-art", { scale: 0.95, autoAlpha: 0.72 }, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.65,
        ease: "power3.out",
      });
    },
    { scope: sectionRef, dependencies: [activeIndex, activePost], revertOnUpdate: true },
  );

  function move(step) {
    if (featuredPosts.length < 2) return;
    setActiveIndex((index) => (index + step + featuredPosts.length) % featuredPosts.length);
  }

  if (!activePost) return null;

  return (
    <section className="writing-feature page-width" ref={sectionRef} aria-labelledby="featured-writing-title">
      <div className="writing-feature-heading">
        <div>
          <p className="eyebrow">Ideas worth exploring</p>
          <h2 id="featured-writing-title">Writing at the edge of what’s next.</h2>
        </div>
        <Link className="text-link" href="/writing/">
          All writing <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <div className="feature-carousel" aria-live="polite">
        <Link className="feature-copy" href={activePost.href}>
          <span className="feature-count">{String(activeIndex + 1).padStart(2, "0")} / {String(featuredPosts.length).padStart(2, "0")}</span>
          <h3>{activePost.title}</h3>
          <p>{activePost.description}</p>
          <span className="feature-read-link">Read article <FiArrowUpRight aria-hidden="true" /></span>
        </Link>
        <div className="feature-photo-wrap">
          {activePost.coverImage ? (
            <Image
              className="feature-photo motion-image"
              src={activePost.coverImage}
              alt={activePost.coverAlt}
              fill
              sizes="(max-width: 800px) 100vw, 46vw"
              unoptimized
            />
          ) : (
            <div className="feature-cover-art" aria-hidden="true">
              <svg className="feature-network" viewBox="0 0 420 280" fill="none">
                <g stroke="currentColor" strokeOpacity=".23" strokeWidth="1.5">
                  <path d="M55 55 165 40M55 55 165 105M55 55 165 170M55 55 165 240M55 110 165 40M55 110 165 105M55 110 165 170M55 110 165 240M55 170 165 40M55 170 165 105M55 170 165 170M55 170 165 240M55 230 165 40M55 230 165 105M55 230 165 170M55 230 165 240M165 40 275 55M165 105 275 55M165 170 275 55M165 240 275 55M275 55 370 110M275 55 370 170M275 55 370 230" />
                </g>
                <g fill="#173027">
                  <circle cx="55" cy="55" r="8" /><circle cx="55" cy="110" r="8" /><circle cx="55" cy="170" r="8" /><circle cx="55" cy="230" r="8" />
                  <circle cx="165" cy="40" r="8" /><circle cx="165" cy="105" r="8" /><circle cx="165" cy="170" r="8" /><circle cx="165" cy="240" r="8" />
                  <circle cx="275" cy="55" r="10" />
                  <circle cx="370" cy="110" r="8" /><circle cx="370" cy="170" r="8" /><circle cx="370" cy="230" r="8" />
                </g>
                <circle cx="275" cy="55" r="4" fill="#D2F167" />
              </svg>
              <span className="feature-cover-label">{activePost.coverLabel}</span>
              <span className="feature-cover-note">Ideas, experiments, and projects</span>
            </div>
          )}
          <span className={`feature-photo-caption${activePost.coverImage ? "" : " feature-photo-caption-dark"}`}>Notes from the learning curve</span>
        </div>
        {featuredPosts.length > 1 ? (
          <div className="carousel-controls" aria-label="Featured writing controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous article"><FiArrowLeft aria-hidden="true" /></button>
            <div className="carousel-dots">
              {featuredPosts.map((post, index) => (
                <button
                  type="button"
                  key={post.slug}
                  className={index === activeIndex ? "is-active" : ""}
                  aria-label={`Show article ${index + 1}: ${post.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Next article"><FiArrowRight aria-hidden="true" /></button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
