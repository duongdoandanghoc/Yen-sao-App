import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "featured";

    // Build where clause
    const where: any = { active: true };
    
    if (category && category !== "ALL") {
      where.category = category;
    }

    if (search) {
      const q = search.toLowerCase();
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { shortDescription: { contains: q, mode: "insensitive" } },
      ];
    }

    // Build orderBy
    let orderBy: any;
    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "rating":
        orderBy = { averageRating: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      default:
        orderBy = { featured: "desc" };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
    });

    // Format dates to ISO strings for frontend
    const formattedProducts = products.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    return NextResponse.json({ products: formattedProducts, total: formattedProducts.length });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    return NextResponse.json({ error: "Đã xảy ra lỗi hệ thống" }, { status: 500 });
  }
}
