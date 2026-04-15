import { Link } from "next-view-transitions";
import { mockBlogPosts } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const categoryEmojis: Record<string, string> = { "hướng dẫn": "📖", "sức khỏe": "💚", "bà bầu": "🤰", "chất lượng": "🔍" };

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="section-title">Kiến Thức Yến Sào</h1>
        <p className="section-subtitle">Cẩm nang sức khỏe và hướng dẫn sử dụng yến sào hiệu quả</p>
        <div className="gold-divider mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {mockBlogPosts.filter(p => p.published).map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} className="card group overflow-hidden">
            <div className="aspect-video bg-cream-100 flex items-center justify-center overflow-hidden">
              {post.coverImage ? (
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
                  {categoryEmojis[post.tags[0]] || "📝"}
                </span>
              )}
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">#{tag}</span>
                ))}
              </div>
              <h2 className="font-serif font-semibold text-brown-900 group-hover:text-primary-700 transition-colors line-clamp-2">{post.title}</h2>
              <p className="text-sm text-brown-500 mt-2 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-1 mt-4 text-sm text-primary-600 font-medium group-hover:gap-2 transition-all">
                Đọc thêm <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
