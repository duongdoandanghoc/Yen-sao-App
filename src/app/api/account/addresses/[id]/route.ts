import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    // Verify ownership
    const existing = await prisma.address.findFirst({ where: { id, userId: session.user.id } });
    if (!existing) return NextResponse.json({ error: "Địa chỉ không tồn tại" }, { status: 404 });

    // If setting as default, unset others
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id, id: { not: id } },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id },
      data: {
        fullName: body.fullName,
        phone: body.phone,
        street: body.street,
        ward: body.ward || "",
        district: body.district || "",
        city: body.city,
        isDefault: body.isDefault || false,
      },
    });

    return NextResponse.json({ address });
  } catch (error) {
    console.error("Address PATCH error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    // Verify ownership
    const existing = await prisma.address.findFirst({ where: { id, userId: session.user.id } });
    if (!existing) return NextResponse.json({ error: "Địa chỉ không tồn tại" }, { status: 404 });

    await prisma.address.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Address DELETE error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
