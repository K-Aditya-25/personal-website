import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const server = createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let filename = path.join(root, pathname);
    if (pathname.endsWith("/")) filename = path.join(filename, "index.html");
    if (!(await stat(filename)).isFile()) throw new Error("Not found");
    response.writeHead(200, { "content-type": mime[path.extname(filename)] ?? "application/octet-stream" });
    response.end(await readFile(filename));
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(4321, "127.0.0.1", () => console.log("Preview at http://127.0.0.1:4321"));
