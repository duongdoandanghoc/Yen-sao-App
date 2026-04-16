import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";
export const dynamic = "force-static";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (isMobile) {
    return NextResponse.json({ error: "API not available in mobile static build" }, { status: 400 });
  }

  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
       return NextResponse.json({ error: "Không đủ quyền truy cập" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Thiếu trường trạng thái" }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Lỗi cập nhật đơn hàng:", error);
    return NextResponse.json({ error: "Đã xảy ra lỗi hệ thống" }, { status: 500 });
  }
}
