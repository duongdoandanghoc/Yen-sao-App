import { NextRequest, NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "featured";

  let products = mockProducts.map((p, i) => ({
    ...p,
    id: `product-${i}`,
    createdAt: new Date().toISOString(),
  })).filter(p => p.active);

  if (category && category !== "ALL") {
    products = products.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }

  switch (sort) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      products.sort((a, b) => b.averageRating - a.averageRating);
      break;
    default:
      products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return NextResponse.json({ products, total: products.length });
}
