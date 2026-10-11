"use client";

import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { badminton } from "../../content/site-data.mjs";

gsap.registerPlugin(useGSAP);

export default function CompetitionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = badminton[activeIndex];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".division-card-content", { autoAlpha: 0, y: 16 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: "power3.out",
      });
      gsap.fromTo(".division-year-art", { scale: 0.92, rotate: -5 }, {
        scale: 1,
        rotate: 0,
        duration: 0.55,
        ease: "back.out(1.4)",
      });
    },
    { dependencies: [activeIndex], revertOnUpdate: true },
  );

  function move(step) {
    setActiveIndex((index) => (index + step + badminton.length) % badminton.length);
  }

  return (
    <div className="division-carousel" aria-live="polite">
      <div className="division-year-art" aria-hidden="true">
        <span>{active.year}</span>
        <span className="division-art-line" />
        <span className="division-art-ball" />
      </div>
      <div className="division-card-content">
        <p className="eyebrow">Dublin District League</p>
        <h3>{active.detail.split(", ")[1]}</h3>
        <p className="division-detail">{active.detail.split(", ")[0]}</p>
        <p className="division-club">{active.club}</p>
        <div className="division-controls" aria-label="Competition history controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous season"><FiArrowLeft aria-hidden="true" /></button>
          <div className="carousel-dots">
            {badminton.map((entry, index) => (
              <button
                type="button"
                key={`${entry.year}-${entry.club}`}
                className={index === activeIndex ? "is-active" : ""}
                aria-label={`Show ${entry.year} season, ${entry.detail}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Next season"><FiArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
