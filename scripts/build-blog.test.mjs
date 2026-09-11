import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { buildManifest } from "./build-blog.mjs";

async function fixture() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "blog-"));
  await fs.mkdir(path.join(dir, "en"), { recursive: true });
  await fs.mkdir(path.join(dir, "pt"), { recursive: true });
  await fs.writeFile(path.join(dir, "authors.json"), JSON.stringify({ someone: { name: "Someone", linkedin: "https://example.com", photo: "/x.png" } }));
  await fs.writeFile(path.join(dir, "en", "older.md"), `---\ntitle: "Older"\ndescription: "d"\ndate: "2026-01-01"\nslug: "older"\ntags: ["a"]\n---\n\n## Heading\n\nSome **markdown**.\n`);
  await fs.writeFile(path.join(dir, "en", "newer.md"), `---\ntitle: "Newer"\ndescription: "d"\ndate: "2026-02-01"\nauthor: "someone"\n---\n\nText\n`);
  await fs.writeFile(path.join(dir, "pt", "newer.md"), `---\ntitle: "Mais novo"\ndescription: "d"\ndate: "2026-02-01"\n---\n\nTexto\n`);
  return dir;
}

test("renders markdown, sorts by date, merges pt over en", async () => {
  const m = await buildManifest(await fixture());
  assert.deepEqual(m.posts.en.map((p) => p.slug), ["newer", "older"]);
  assert.match(m.posts.en[1].html, /<h2>Heading<\/h2>/);
  assert.match(m.posts.en[1].html, /<strong>markdown<\/strong>/);
  assert.equal(m.posts.en[0].author.name, "Someone");
  assert.equal(m.posts.en[1].author.id, "victor-marotta");
  assert.deepEqual(m.posts.pt.map((p) => [p.slug, p.locale, p.title]), [["newer", "pt", "Mais novo"], ["older", "en", "Older"]]);
});

test("rejects a frontmatter slug that differs from the file name", async () => {
  const dir = await fixture();
  await fs.writeFile(path.join(dir, "en", "wrong.md"), `---\ntitle: "W"\ndescription: "d"\ndate: "2026-03-01"\nslug: "other"\n---\n\nx\n`);
  await assert.rejects(() => buildManifest(dir), /must match the file name/);
});
