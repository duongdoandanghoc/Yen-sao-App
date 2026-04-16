import { NextRequest, NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { LOYALTY_RATE } from "@/types";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

export const dynamic = "force-static";

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
    const { items, shipping, paymentMethod, discountCode, discountAmount, loyaltyPointsUsed } = body;

    if (!items?.length || !shipping?.fullName || !shipping?.phone || !shipping?.street || !shipping?.city) {
      return NextResponse.json({ error: "Thông tin không hợp lệ" }, { status: 400 });
    }

    // Kiểm tra tính hợp lệ của ProductId (ObjectId)
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

    // Loyalty points redemption (1 point = 50đ)
    let loyaltyDiscount = 0;
    let loyaltyUsed = 0;
    if (loyaltyPointsUsed && loyaltyPointsUsed > 0) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { loyaltyPoints: true },
      });
      if (user && user.loyaltyPoints >= loyaltyPointsUsed) {
        loyaltyUsed = loyaltyPointsUsed;
        loyaltyDiscount = loyaltyUsed * 50; // 1 point = 50đ
      }
    }

    const total = Math.max(0, subtotal - discount - loyaltyDiscount + shippingFee);

    // Calculate loyalty points earned (1 point per 1000đ spent)
    const loyaltyEarned = Math.floor(total / LOYALTY_RATE);

    const shippingAddress = [shipping.street, shipping.ward, shipping.district, shipping.city]
      .filter(Boolean)
      .join(", ");

    // Create order with tracking event
    const newOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        orderNumber: generateOrderNumber(),
        status: "PENDING",
        subtotal,
        shippingFee,
        discount,
        loyaltyDiscount,
        loyaltyUsed,
        loyaltyEarned,
        total,
        paymentMethod: paymentMethod || "COD",
        paymentStatus: "PENDING",
        shippingName: shipping.fullName,
        shippingPhone: shipping.phone,
        shippingAddress,
        note: shipping.note,
        discountCode,
        trackingEvents: [
          {
            status: "PENDING",
            description: "Đơn hàng đã được tạo, đang chờ xác nhận",
            timestamp: new Date(),
          }
        ],
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

    // Update loyalty points: deduct used + add earned
    if (loyaltyUsed > 0 || loyaltyEarned > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          loyaltyPoints: {
            increment: loyaltyEarned - loyaltyUsed,
          }
        }
      });

      // Create loyalty transactions
      const transactions = [];
      if (loyaltyUsed > 0) {
        transactions.push({
          userId: session.user.id,
          orderId: newOrder.id,
          points: -loyaltyUsed,
          type: "REDEEM",
          description: `Đổi điểm cho đơn hàng ${newOrder.orderNumber}`,
        });
      }
      if (loyaltyEarned > 0) {
        transactions.push({
          userId: session.user.id,
          orderId: newOrder.id,
          points: loyaltyEarned,
          type: "EARN",
          description: `Tích điểm từ đơn hàng ${newOrder.orderNumber}`,
        });
      }

      if (transactions.length > 0) {
        await prisma.loyaltyTransaction.createMany({ data: transactions });
      }
    }

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Đặt hàng thành công!",
        message: `Đơn hàng ${newOrder.orderNumber} đã được tạo. Tổng: ${total.toLocaleString()}đ. Tích ${loyaltyEarned} điểm.`,
        type: "ORDER",
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
