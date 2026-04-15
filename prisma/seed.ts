import { PrismaClient } from "@prisma/client";
import { mockProducts, mockBlogPosts, mockDiscountCodes } from "../src/lib/mockData";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Bat dau don dep va do du lieu mau (Seed) vao database...");

  // 1. Tạo một tài khoản Admin mẫu để gán review nếu có (hoặc để test)
  const hashedAdminPassword = await bcrypt.hash("admin123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@yensao.vn" },
    update: {},
    create: {
      name: "Admin Yến Sào",
      email: "admin@yensao.vn",
      password: hashedAdminPassword,
      role: "ADMIN",
      phone: "0999999999"
    },
  });

  console.log("Da tao/cap nhat tai khoan admin@yensao.vn !");

  // 2. Chèn Sản phẩm (Products)
  for (const p of mockProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        price: p.price,
        originalPrice: p.originalPrice,
        stock: p.stock,
        images: p.images || [],
        description: p.description,
        shortDescription: p.shortDescription || p.description.substring(0, 100),
        benefits: p.benefits || [],
        usage: p.usage || "",
        tags: p.tags || [],
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription || p.description.substring(0, 100),
        price: p.price,
        originalPrice: p.originalPrice,
        images: p.images || [],
        category: p.category as any,
        benefits: p.benefits || [],
        usage: p.usage || "",
        tags: p.tags || [],
        stock: p.stock || 100,
        averageRating: p.averageRating || 0,
        reviewCount: p.reviewCount || 0,
        featured: p.featured || false,
        active: p.active !== false,
        weight: p.weight || "",
        origin: p.origin || "",
      },
    });
  }
  console.log(`Da tao ${mockProducts.length} san pham!`);

  // 3. Chèn Bài viết (Blog Posts)
  for (const b of mockBlogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        content: b.content,
        excerpt: b.excerpt,
        coverImage: b.coverImage || "",
        tags: b.tags || [],
      },
      create: {
        title: b.title,
        slug: b.slug,
        content: b.content,
        excerpt: b.excerpt,
        coverImage: b.coverImage || "",
        tags: b.tags || [],
        published: b.published !== false,
      },
    });
  }
  console.log(`Da tao ${mockBlogPosts.length} bai viet!`);

  // 4. Chèn Mã giảm giá (Discount Codes)
  for (const d of mockDiscountCodes) {
    await prisma.discountCode.upsert({
      where: { code: d.code },
      update: {},
      create: {
        code: d.code,
        type: d.type as any,
        value: d.value,
        minOrderValue: d.minOrderValue,
        maxUses: d.maxUses,
        usedCount: d.usedCount,
        validFrom: d.validFrom,
        validTo: d.validTo,
        active: d.active !== false,
      },
    });
  }
  console.log(`Da tao ${mockDiscountCodes.length} ma giam gia!`);

  console.log("Hoan tat Seed database thanh cong!");
}

main()
  .catch((e) => {
    console.error("Loi khi chay seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
