# Site photos

These web-ready images are used by the site:

- `public/images/portrait.jpg` — homepage portrait
- `public/images/give-a-go.jpg` — homepage preview and Give(a)Go volunteering page
- `public/images/tcd-open-day.jpg` — TCD Open Day volunteering page

The full-resolution uploaded originals are kept locally in `.original-images/`. That folder is excluded from Git; only the smaller, metadata-free copies in `public/images/` are used by the site.

## Blog media

The 14 migrated Hashnode posts use local cover and inline images under `public/images/blog/<post-slug>/`. New posts can keep their image files in the same folder and reference them with `/images/blog/<post-slug>/<filename>` paths.
