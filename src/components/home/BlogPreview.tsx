import Link from "next/link";
import { BlogPostType } from "@/types";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPreviewProps {
  posts: Omit<BlogPostType, "id" | "createdAt">[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const categoryEmojis: Record<string, string> = {
    "hướng dẫn": "📖",
    "sức khỏe": "💚",
    "bà bầu": "🤰",
    "chất lượng": "🔍",
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Kiến Thức Yến Sào</h2>
          <p className="section-subtitle">
            Cẩm nang sức khỏe và hướng dẫn sử dụng yến sào hiệu quả
          </p>
          <div className="gold-divider mt-4" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="card group overflow-hidden"
            >
              {/* Cover Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-cream-200 flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
                  {categoryEmojis[post.tags[0]] || "📝"}
                </span>
              </div>

              <div className="p-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-serif font-semibold text-brown-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-brown-500 mt-2 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1 mt-4 text-sm text-primary-600 font-medium group-hover:gap-2 transition-all">
                  Đọc thêm
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link href="/blog" className="btn-secondary gap-2 inline-flex">
            Xem tất cả bài viết
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
