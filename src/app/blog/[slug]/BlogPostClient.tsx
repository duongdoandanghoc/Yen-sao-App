"use client";

import { use } from "react";
import { mockBlogPosts } from "@/lib/mockData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPostClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-serif font-bold text-brown-900">Bài viết không tồn tại</h1>
        <Link href="/blog" className="btn-primary mt-6 inline-flex">Quay lại Blog</Link>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h1 key={i} className="text-3xl font-serif font-bold text-brown-900 mb-4 mt-8">{line.slice(2)}</h1>;
      if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-serif font-semibold text-brown-900 mb-3 mt-6">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-serif font-semibold text-brown-900 mb-2 mt-4">{line.slice(4)}</h3>;
      if (line.startsWith("- ")) return <li key={i} className="text-brown-600 ml-4 mb-1 list-disc">{line.slice(2)}</li>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-brown-800 mb-2">{line.slice(2, -2)}</p>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="text-brown-600 leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <div className="container-custom py-8 md:py-12 max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-brown-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft size={16} /> Quay lại Blog
      </Link>

      {/* Cover */}
      <div className="aspect-video bg-cream-100 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-7xl">📝</span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">#{tag}</span>
        ))}
      </div>

      {/* Content */}
      <article className="prose-custom">
        {renderContent(post.content)}
      </article>

      {/* CTA */}
      <div className="mt-12 p-6 bg-primary-50 rounded-2xl text-center">
        <h3 className="font-serif font-semibold text-lg text-brown-900 mb-2">Bạn quan tâm đến yến sào?</h3>
        <p className="text-sm text-brown-600 mb-4">Khám phá bộ sưu tập yến sào cao cấp của chúng tôi</p>
        <Link href="/products" className="btn-primary inline-flex">Xem sản phẩm</Link>
      </div>
    </div>
  );
}
