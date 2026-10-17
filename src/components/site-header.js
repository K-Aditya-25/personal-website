"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navItems = [
  ["Home", "/"],
  ["Writing", "/writing/"],
  ["Library", "/library/"],
  ["Competitions", "/competitions/"],
  ["Volunteering", "/volunteering/"],
  ["Courses", "/courses/"],
];

function isCurrent(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function SiteHeader() {
  const headerRef = useRef(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".desktop-nav .nav-link",
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.055, ease: "power3.out" },
      );
      gsap.fromTo(
        ".nav-link[aria-current='page'] .nav-underline",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.45, ease: "power3.out", delay: 0.18 },
      );
    },
    { scope: headerRef, dependencies: [pathname], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (!menuOpen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".mobile-nav .nav-link",
        { autoAlpha: 0, x: 16 },
        { autoAlpha: 1, x: 0, duration: 0.38, stagger: 0.045, ease: "power3.out" },
      );
    },
    { scope: headerRef, dependencies: [menuOpen], revertOnUpdate: true },
  );

  function followLink() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Link className="wordmark" href="/" onClick={followLink} aria-label="Aditya Kharbanda, home">
          <span className="wordmark-mark" aria-hidden="true">A</span>
          <span>Aditya Kharbanda<span className="wordmark-period">.</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <Link
              className="nav-link"
              href={href}
              key={href}
              aria-current={isCurrent(pathname, href) ? "page" : undefined}
            >
              {label}<span className="nav-underline" aria-hidden="true" />
            </Link>
          ))}
        </nav>

        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
          <span className="menu-toggle-lines" aria-hidden="true"><i /><i /></span>
        </button>

        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          hidden={!menuOpen}
        >
          {navItems.map(([label, href]) => (
            <Link
              className="nav-link"
              href={href}
              key={href}
              aria-current={isCurrent(pathname, href) ? "page" : undefined}
              tabIndex={menuOpen ? 0 : -1}
              onClick={followLink}
            >
              <span>{label}</span><span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
