import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import type { Metadata } from "next";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${DATA.name}`,
    description: "My thoughts on software development, life, and more.",
    url: `${DATA.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Blog | ${DATA.name}`,
    description: "My thoughts on software development, life, and more.",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: DATA.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${DATA.url}/blog`,
              },
            ],
          }),
        }}
      />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">blog</h1>
      </BlurFade>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight">{post.metadata.title}</p>
                <p className="h-6 text-xs text-muted-foreground">
                  {post.metadata.publishedAt}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
