"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PageMotion({ children }) {
  const pageRef = useRef(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        "[data-route-title]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", clearProps: "transform" },
      );
      gsap.fromTo(
        "[data-route-subtitle]",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.65, delay: 0.12, ease: "power3.out", clearProps: "transform" },
      );

      gsap.utils.toArray(".motion-image:not(.feature-photo)", pageRef.current).forEach((image) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: image,
            start: "top 92%",
            end: "bottom 12%",
            scrub: 0.8,
          },
        })
          .fromTo(image, { scale: 0.82, autoAlpha: 0.34, filter: "brightness(0.72)" }, {
            scale: 1,
            autoAlpha: 1,
            filter: "brightness(1)",
            duration: 0.46,
            ease: "none",
          })
          .to(image, { scale: 0.96, autoAlpha: 0.2, filter: "brightness(0.62)", duration: 0.54, ease: "none" });
      });

      gsap.utils.toArray(".scrub-reveal", pageRef.current).forEach((paragraph) => {
        const words = paragraph.querySelectorAll(".scrub-word");
        gsap.fromTo(words, { autoAlpha: 0.16 }, {
          autoAlpha: 1,
          stagger: 0.035,
          ease: "none",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 78%",
            end: "bottom 45%",
            scrub: true,
          },
        });
      });
    },
    { scope: pageRef, dependencies: [pathname], revertOnUpdate: true },
  );

  return <div className="page-motion" ref={pageRef}>{children}</div>;
}
