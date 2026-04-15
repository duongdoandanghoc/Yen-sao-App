import { mockBlogPosts } from "@/lib/mockData";
import BlogPostClient from "./BlogPostClient";

// Pre-render tất cả blog posts cho static export (mobile app)
export function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostClient params={params} />;
}
