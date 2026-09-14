// Renders content/blog/{en,pt}/*.md into src/content/blog.json so the edge runtime never touches the filesystem.
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const LOCALES = ["en", "pt"];
const DEFAULT_AUTHOR = {
  id: "victor-marotta",
  name: "Victor Marotta",
  linkedin: "https://www.linkedin.com/in/victor-marotta-5055ab60/",
  photo: "/me.png",
  headline: "Survey engineer, GIS and software",
  headlinePt: "Engenheiro agrimensor, GIS e software",
};

async function readAuthors(contentDir) {
  try {
    return JSON.parse(await fs.readFile(path.join(contentDir, "authors.json"), "utf8"));
  } catch {
    return {};
  }
}

async function readLocale(contentDir, locale, authors) {
  const dir = path.join(contentDir, locale);
  let files = [];
  try {
    files = (await fs.readdir(dir)).filter((f) => f.endsWith(".md")).sort();
  } catch {
    return [];
  }
  const posts = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const fileSlug = file.replace(/\.md$/, "");
    if (data.slug && data.slug !== fileSlug) throw new Error(`${locale}/${file}: frontmatter slug "${data.slug}" must match the file name`);
    for (const key of ["title", "description", "date"]) if (!data[key]) throw new Error(`${locale}/${file}: missing frontmatter "${key}"`);
    const html = String(await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content));
    const author = data.author && authors[data.author] ? { id: data.author, ...authors[data.author] } : DEFAULT_AUTHOR;
    posts.push({
      slug: fileSlug,
      title: data.title,
      description: data.description,
      date: (data.date instanceof Date ? data.date.toISOString() : String(data.date)).slice(0, 10),
      coverImage: data.coverImage ?? null,
      tags: data.tags ?? [],
      locale,
      author,
      html,
    });
  }
  return posts;
}

const byDateDesc = (posts) => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/** Builds the manifest: EN as authored, PT merged over EN by slug so untranslated posts still appear. */
export async function buildManifest(contentDir) {
  const authors = await readAuthors(contentDir);
  const [en, pt] = await Promise.all(LOCALES.map((l) => readLocale(contentDir, l, authors)));
  const merged = new Map(en.map((p) => [p.slug, p]));
  for (const p of pt) merged.set(p.slug, p);
  return { generatedAt: new Date().toISOString(), posts: { en: byDateDesc(en), pt: byDateDesc([...merged.values()]) } };
}

export async function writeManifest({ contentDir = "content/blog", outFile = "src/content/blog.json", cwd = process.cwd() } = {}) {
  const manifest = await buildManifest(path.resolve(cwd, contentDir));
  const out = path.resolve(cwd, outFile);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, JSON.stringify(manifest, null, 2) + "\n");
  return { out, count: manifest.posts.en.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const opt = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : fallback; };
  const { out, count } = await writeManifest({ contentDir: opt("content", "content/blog"), outFile: opt("out", "src/content/blog.json") });
  console.log(`blog manifest: ${count} post(s) → ${path.relative(process.cwd(), out)}`);
}
