"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { FiPause, FiPlay } from "react-icons/fi";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

export default function BadmintonRally() {
  const sceneRef = useRef(null);
  const timelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useGSAP(
    () => {
      const shuttle = sceneRef.current.querySelector(".rally-shuttle");
      const servePath = sceneRef.current.querySelector(".serve-path");
      const liftPath = sceneRef.current.querySelector(".lift-path");
      const smashPath = sceneRef.current.querySelector(".smash-path");
      const blockPath = sceneRef.current.querySelector(".block-path");

      gsap.set(shuttle, { x: 0, y: 0, autoAlpha: 0 });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.55 });
      const shot = (path, duration, position) => {
        timeline
          .fromTo(path, { autoAlpha: 0, strokeDashoffset: 0 }, {
            autoAlpha: 0.68,
            strokeDashoffset: -34,
            duration,
            ease: "none",
          }, position)
          .to(path, { autoAlpha: 0, duration: 0.14, ease: "power1.out" }, position + duration - 0.08)
          .to(shuttle, {
            duration,
            ease: "none",
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
            autoAlpha: 1,
          }, position);
      };

      // A clear four-contact sequence: short serve, lift, smash, then a block into the net.
      timeline
        .to(".player-bottom-right .racket", {
          rotation: 28,
          duration: 0.22,
          transformOrigin: "50% 90%",
          ease: "power2.in",
        }, 0.67)
        .to(".player-bottom-right .racket", {
          rotation: 0,
          duration: 0.22,
          ease: "power2.out",
        }, 0.84);
      timeline.to(".serve-shuttle", { autoAlpha: 0, duration: 0.08 }, 0.67);

      shot(servePath, 0.95, 0.67);
      timeline
        .fromTo(".serve-impact", { attr: { r: 7 }, autoAlpha: 0.9 }, {
          attr: { r: 21 },
          autoAlpha: 0,
          duration: 0.42,
          ease: "power2.out",
        }, 1.62)
        .to(".player-top-left .racket", {
          rotation: -36,
          duration: 0.18,
          transformOrigin: "50% 15%",
          ease: "power2.in",
        }, 1.62)
        .to(".player-top-left .racket", { rotation: 0, duration: 0.2, ease: "power2.out" }, 1.8)
        .to(".player-top-left", { x: 4, y: 7, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" }, 1.62);

      shot(liftPath, 1.65, 1.77);
      timeline
        .to(".player-bottom-left", { y: 29, duration: 1.48, ease: "power2.inOut" }, 1.88)
        .fromTo(".lift-impact", { attr: { r: 7 }, autoAlpha: 0.9 }, {
          attr: { r: 21 },
          autoAlpha: 0,
          duration: 0.42,
          ease: "power2.out",
        }, 3.42)
        .to(".player-bottom-left .racket", {
          rotation: 42,
          duration: 0.16,
          transformOrigin: "50% 90%",
          ease: "power3.in",
        }, 3.42)
        .to(".player-bottom-left .racket", { rotation: 0, duration: 0.2, ease: "power2.out" }, 3.58)
        .to(".player-bottom-left .player-upper", { y: -7, duration: 0.17, yoyo: true, repeat: 1, ease: "power2.out" }, 3.47);

      shot(smashPath, 0.82, 3.42);
      timeline
        .fromTo(".smash-impact", { attr: { r: 7 }, autoAlpha: 0.9 }, {
          attr: { r: 21 },
          autoAlpha: 0,
          duration: 0.38,
          ease: "power2.out",
        }, 4.24)
        .to(".player-top-right", { x: -5, y: 7, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" }, 4.2)
        .to(".player-top-right .racket", {
          rotation: -42,
          duration: 0.16,
          transformOrigin: "50% 15%",
          ease: "power3.in",
        }, 4.2)
        .to(".player-top-right .racket", { rotation: 0, duration: 0.2, ease: "power2.out" }, 4.36);

      shot(blockPath, 0.58, 4.24);
      timeline
        .fromTo(".net-impact", { attr: { r: 7 }, autoAlpha: 1 }, {
          attr: { r: 24 },
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
        }, 4.82)
        .to(".net-cord", { opacity: 0.45, duration: 0.08, yoyo: true, repeat: 3, ease: "power1.inOut" }, 4.82)
        .to(shuttle, { autoAlpha: 0, duration: 0.14 }, 4.88)
        .to(".player-bottom-left", { y: 0, duration: 0.42, ease: "power2.out" }, 5.15)
        .to(".player-top-left, .player-top-right", { x: 0, y: 0, duration: 0.42, ease: "power2.out" }, 5.15)
        .set(".serve-shuttle", { autoAlpha: 1 }, 5.63)
        .set(shuttle, { x: 0, y: 0, autoAlpha: 0 }, 5.63);

      timelineRef.current = timeline;
      if (!isPlaying) timeline.pause();

      return () => {
        timeline.kill();
        timelineRef.current = null;
      };
    },
    { scope: sceneRef, dependencies: [], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!timelineRef.current) return;
    if (isPlaying) timelineRef.current.play();
    else timelineRef.current.pause();
  }, [isPlaying]);

  return (
    <div className="rally-scene" ref={sceneRef}>
      <div className="rally-scene-heading">
        <p className="eyebrow eyebrow-light">A men’s doubles rally</p>
        <p>Serve · lift · smash · block</p>
      </div>
      <svg className="rally-court" viewBox="80 36 600 620" role="img" aria-labelledby="rally-title rally-description">
        <title id="rally-title">Four players in a badminton doubles rally</title>
        <desc id="rally-description">On a regulation-proportion doubles court, the bottom-right player serves to the top-left receiver. The receiver lifts to the bottom-left player, who retreats and smashes to the top-right player. The block catches the net and the rally resets.</desc>
        <defs>
          <linearGradient id="court-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9edb8" stopOpacity="0.035" />
            <stop offset="1" stopColor="#d9edb8" stopOpacity="0.13" />
          </linearGradient>
          <pattern id="court-grain" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 0h16" stroke="#d9edb8" strokeOpacity="0.025" />
          </pattern>
        </defs>

        <rect className="court-floor" x="250" y="60" width="260" height="572" fill="url(#court-sheen)" />
        <rect x="250" y="60" width="260" height="572" fill="url(#court-grain)" />
        <g className="court-lines" fill="none">
          <rect x="250" y="60" width="260" height="572" />
          <path d="M270 60v572M490 60v572M250 261h260M250 430h260M380 60v201M380 430v202M250 92h260M250 600h260" />
        </g>
        <g className="court-net-group">
          <path className="net-mesh" d="M250 346h260M270 339v14m22-14v14m22-14v14m22-14v14m22-14v14m22-14v14m22-14v14m22-14v14m22-14v14m22-14v14m22-14v14m22-14v14m18-14v14" />
          <path className="net-cord" d="M250 346h260" />
        </g>

        <path className="shot-path serve-path" d="M478 466 Q430 356 354 287" />
        <path className="shot-path lift-path" d="M354 287 Q418 380 354 498" />
        <path className="shot-path smash-path" d="M354 498 Q444 372 454 227" />
        <path className="shot-path block-path" d="M454 227 Q423 290 402 346" />

        <g className="rally-player team-bottom player-bottom-left">
          <g className="player-position" transform="translate(328 510)">
          <ellipse className="player-shadow" cx="0" cy="2" rx="15" ry="5" />
          <g className="player-upper">
            <circle className="player-head" cx="0" cy="-31" r="7" />
            <path className="player-torso" d="M-8-23 0-26 8-23 7-3-7-3Z" />
            <path className="player-limbs" d="m-7-19-11 10m25-10 10-9m-17 25-10 14m10-14 11 13" />
            <g className="racket">
              <path d="m10-18 13-18" />
              <ellipse cx="26" cy="-41" rx="4.5" ry="7" />
            </g>
          </g>
          <path className="player-feet" d="m-7 9-6 4m15-4 7 4" />
          </g>
        </g>

        <g className="rally-player team-bottom player-bottom-right">
          <g className="player-position" transform="translate(450 466)">
          <ellipse className="player-shadow" cx="0" cy="2" rx="15" ry="5" />
          <g className="player-upper">
            <circle className="player-head" cx="0" cy="-31" r="7" />
            <path className="player-torso" d="M-8-23 0-26 8-23 7-3-7-3Z" />
            <path className="player-limbs" d="M-7-19-18-9M7-19 16-11M-5-3-15 4-9 12M5-3 15 5 10 12" />
            <g className="racket">
              <path d="M16-11 25-2" />
              <ellipse cx="28" cy="0" rx="4.5" ry="7" />
            </g>
            <g className="serve-shuttle" transform="translate(-18 -9)">
              <path d="m-3-2 3 5 3-5m-5-2 2 7 2-7" />
              <circle cy="4" r="1.4" />
            </g>
          </g>
          <path className="player-feet" d="m-7 9-6 4m15-4 7 4" />
          </g>
        </g>

        <g className="rally-player team-top player-top-left">
          <g className="player-position" transform="translate(328 278)">
          <ellipse className="player-shadow" cx="0" cy="2" rx="15" ry="5" />
          <g className="player-upper">
            <circle className="player-head" cx="0" cy="-25" r="7" />
            <path className="player-torso" d="M-8-18 0-21 8-18 7-3-7-3Z" />
            <path className="player-limbs" d="M-7-15-18-13M7-15 15-6M-5-3-15 2-10 10M5-3 15 2 10 10" />
            <g className="racket">
              <path d="M15-6 23 4" />
              <ellipse cx="26" cy="9" rx="4.5" ry="7" />
            </g>
          </g>
          <path className="player-feet" d="m-7 9-6 4m15-4 7 4" />
          </g>
        </g>

        <g className="rally-player team-top player-top-right">
          <g className="player-position" transform="translate(428 218)">
          <ellipse className="player-shadow" cx="0" cy="2" rx="15" ry="5" />
          <g className="player-upper">
            <circle className="player-head" cx="0" cy="-31" r="7" />
            <path className="player-torso" d="M-8-23 0-26 8-23 7-3-7-3Z" />
            <path className="player-limbs" d="m-7-19-11-3m25 3 10 9m-17 3-12 11m12-11 11 10" />
            <g className="racket">
              <path d="M15-6 23 4" />
              <ellipse cx="26" cy="9" rx="4.5" ry="7" />
            </g>
          </g>
          <path className="player-feet" d="m-7 9-6 4m15-4 7 4" />
          </g>
        </g>

        <circle className="rally-impact serve-impact" cx="354" cy="287" r="7" />
        <circle className="rally-impact lift-impact" cx="354" cy="498" r="7" />
        <circle className="rally-impact smash-impact" cx="454" cy="227" r="7" />
        <circle className="net-impact" cx="402" cy="346" r="7" />
        <g className="rally-shuttle">
          <path d="m-8-6 8 13 8-13m-13-3 5 16 5-16" />
          <circle cx="0" cy="8" r="3" />
        </g>
      </svg>
      <div className="rally-court-key" aria-hidden="true">
        <span>Serve</span><i /><span>Lift</span><i /><span>Smash</span><i /><span>Block</span>
      </div>
      <button className="rally-control" type="button" onClick={() => setIsPlaying((playing) => !playing)}>
        {isPlaying ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
        <span>{isPlaying ? "Pause rally" : "Play rally"}</span>
      </button>
    </div>
  );
}
