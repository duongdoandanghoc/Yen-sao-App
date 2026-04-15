import { NextRequest, NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (isMobile) {
    return NextResponse.json({ error: "API not available in mobile static build" }, { status: 400 });
  }

  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
       return NextResponse.json({ error: "Vui lòng đăng nhập để đặt hàng" }, { status: 401 });
    }

    const body = await request.json();
    const { items, shipping, paymentMethod, discountCode, discountAmount } = body;

    if (!items?.length || !shipping?.fullName || !shipping?.phone || !shipping?.street || !shipping?.city) {
      return NextResponse.json({ error: "Thông tin không hợp lệ" }, { status: 400 });
    }

    // Kiểm tra tính hợp lệ của ProductId (ObjectId) tránh lỗi local storage lưu cache mockData cũ ("product-X")
    for (const item of items) {
      if (!item.product?.id || !/^[0-9a-fA-F]{24}$/.test(item.product.id)) {
        return NextResponse.json({ 
          error: "Giỏ hàng chứa dữ liệu phiên bản cũ. Vui lòng bấm Xóa và thêm lại sản phẩm vào giỏ." 
        }, { status: 400 });
      }
    }

    const subtotal = items.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
    const shippingFee = subtotal >= 500000 ? 0 : 30000;
    const discount = discountAmount || 0;
    const total = subtotal - discount + shippingFee;

    const shippingAddress = [shipping.street, shipping.ward, shipping.district, shipping.city]
      .filter(Boolean)
      .join(", ");

    const newOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        orderNumber: generateOrderNumber(),
        status: "PENDING",
        subtotal,
        shippingFee,
        discount,
        total,
        paymentMethod: paymentMethod || "COD",
        paymentStatus: "PENDING",
        shippingName: shipping.fullName,
        shippingPhone: shipping.phone,
        shippingAddress,
        note: shipping.note,
        discountCode,
        items: {
          create: items.map((item: any) => ({
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.images ? item.product.images[0] : null,
            price: item.product.price,
            quantity: item.quantity
          }))
        }
      }
    });

    return NextResponse.json({ order: newOrder, message: "Đặt hàng thành công" }, { status: 201 });
  } catch (error: any) {
    console.error("Lỗi đặt hàng:", error);
    return NextResponse.json({ error: "Đã xảy ra lỗi hệ thống: " + (error.message || "Unknown Error") }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (isMobile) {
    return NextResponse.json({ error: "API not available in mobile static build" }, { status: 400 });
  }

  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
       return NextResponse.json({ error: "Vui lòng đăng nhập" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Lỗi danh sách đơn hàng:", error);
    return NextResponse.json({ error: "Đã xảy ra lỗi hệ thống" }, { status: 500 });
  }
}
