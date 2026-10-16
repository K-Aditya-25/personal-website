"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function BlogContent({ html }) {
  const contentRef = useRef(null);
  const hasTweets = html.includes('class="twitter-tweet"');

  function renderTweets() {
    if (contentRef.current) window.twttr?.widgets?.load(contentRef.current);
  }

  useEffect(() => {
    if (hasTweets) renderTweets();
  }, [hasTweets, html]);

  return (
    <div className="blog-content">
      <div ref={contentRef} className="blog-markdown" dangerouslySetInnerHTML={{ __html: html }} />
      {hasTweets ? (
        <Script
          id="x-embed-widgets"
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          onReady={renderTweets}
        />
      ) : null}
    </div>
  );
}
