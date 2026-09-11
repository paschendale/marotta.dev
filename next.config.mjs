import { writeManifest } from "./scripts/build-blog.mjs";

// The blog manifest is generated here as well as in the npm pre-scripts, so a bare `next build`
// (for example through @cloudflare/next-on-pages) never ships without it.
await writeManifest();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
