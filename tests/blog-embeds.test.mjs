import assert from "node:assert/strict";
import test from "node:test";
import { getPost } from "../content/posts.mjs";

test("X post directives render tweet cards for the client widget", () => {
  const post = getPost("today-s-state-of-ai-is-markdown-the-new-source-code");
  const tweetCards = post.html.match(/<blockquote class="twitter-tweet"/g) ?? [];

  assert.equal(tweetCards.length, 3);
  assert.match(post.html, /href="https:\/\/x\.com\/steipete\/status\/2063697162748260627"/);
});

test("YouTube directives render privacy-enhanced responsive players", () => {
  const post = getPost("how-cs50p-helped-me-become-a-better-programmer");

  assert.match(
    post.html,
    /<iframe class="blog-embed-video" src="https:\/\/www\.youtube-nocookie\.com\/embed\/pXmzOgjLVjg\?start=2&amp;rel=0"/,
  );
});

test("unsupported embed directives remain safe clickable links", () => {
  const post = getPost("how-cs50p-helped-me-become-a-better-programmer");

  assert.match(post.html, /href="https:\/\/github\.com\/K-Aditya-25\/Terminal-based-NBA-project"/);
  assert.doesNotMatch(post.html, /<iframe[^>]+github\.com/);
});
