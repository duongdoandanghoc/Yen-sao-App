import { Link } from "next-view-transitions";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import SmartPicks from "@/components/home/SmartPicks";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview from "@/components/home/BlogPreview";
import CTASection from "@/components/home/CTASection";

export default async function HomePage() {
  // Lấy dữ liệu thực từ MongoDB 
  const rawProducts = await prisma.product.findMany({
    where: { featured: true, active: true },
    take: 8,
  });

  // Format dates from Prisma Date objects to strings for client components
  const featuredProducts = rawProducts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    flashSaleEnd: p.flashSaleEnd ? p.flashSaleEnd.toISOString() : null,
  }));
  
  const latestPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      <HeroSection />
      <SmartPicks />
      <FeaturedProducts products={featuredProducts} />
      <BenefitsSection />
      <TestimonialsSection />
      <BlogPreview posts={latestPosts} />
      <CTASection />
    </>
  );
}
