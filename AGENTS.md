<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Changelog before commits and pushes

Before creating a commit, update `CHANGELOG.md` with a dated summary of the changes included in that commit. Before pushing, confirm that every commit being pushed is already covered by an entry in `CHANGELOG.md`; if not, add the entry and commit it before pushing. Never commit or push changes that have not been recorded in the changelog.

## Build and test changes

After changing code, run the project build and the relevant automated tests to confirm the change works. If no suitable tests exist, add focused tests when practical. Do not consider the work complete until the build and tests pass, or clearly report what could not be run and why.
