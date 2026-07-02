import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

// The blog currently holds only the template's "Hello World" placeholder, so
// /blog is deliberately left out of the sitemap (the nav link is hidden too).
// When real posts exist: restore the /blog route below and re-add per-post
// entries via getBlogPosts() from "@/data/blog".
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = DATA.url.replace(/\/$/, "");

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
