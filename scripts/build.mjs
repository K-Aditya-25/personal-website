import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { shell } from "../src/shell.mjs";
import { homePage, writingPage, booksPage, competitionsPage, volunteeringPage, coursesPage } from "../src/pages.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");

const pages = [
  ["index.html", "Home", "Personal website of Aditya Kharbanda, based in Dublin.", "home", homePage],
  ["writing/index.html", "Writing", "Writing by Aditya Kharbanda on AI, machine learning and what he is learning.", "writing", writingPage],
  ["books/index.html", "Books", "Books Aditya Kharbanda has read and is currently reading.", "books", booksPage],
  ["competitions/index.html", "Competitions", "Hackathons and badminton competitions Aditya Kharbanda has taken part in.", "competitions", competitionsPage],
  ["volunteering/index.html", "Volunteering", "Volunteering and event work by Aditya Kharbanda in Dublin.", "volunteering", volunteeringPage],
  ["courses/index.html", "Courses", "Courses and Coursera certificates completed by Aditya Kharbanda.", "courses", coursesPage],
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const [relativePath, title, description, active, render] of pages) {
  const destination = path.join(output, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, shell({ title, description, active, content: render() }));
}
await cp(path.join(root, "src/styles.css"), path.join(output, "styles.css"));
await cp(path.join(root, "src/main.js"), path.join(output, "main.js"));
await cp(path.join(root, "public"), output, { recursive: true });

console.log(`Built ${pages.length} pages into dist/`);
