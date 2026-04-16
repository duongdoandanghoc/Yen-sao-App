import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const items = await prisma.wishlist.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        product: {
          select: {
            id: true, name: true, slug: true, price: true, originalPrice: true,
            images: true, category: true, stock: true, averageRating: true,
            shortDescription: true, benefits: true, tags: true, reviewCount: true,
            featured: true, active: true, weight: true, origin: true, createdAt: true,
          }
        }
      }
    });

    const formattedItems = items.map(i => ({
      ...i,
      createdAt: i.createdAt.toISOString(),
      product: {
        ...i.product,
        createdAt: i.product.createdAt.toISOString(),
      }
    }));

    return NextResponse.json({ items: formattedItems });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await request.json();
    if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

    // Check if already in wishlist
    const existing = await prisma.wishlist.findFirst({
      where: { userId: session.user.id, productId },
    });
    if (existing) return NextResponse.json({ message: "Đã có trong danh sách yêu thích" });

    const item = await prisma.wishlist.create({
      data: { userId: session.user.id, productId },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.wishlist.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist DELETE error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
