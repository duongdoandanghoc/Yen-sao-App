import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true, name: true, email: true, phone: true,
        avatar: true, dateOfBirth: true, gender: true,
        loyaltyPoints: true, referralCode: true,
        notifyOrders: true, notifyPromo: true, notifySystem: true,
        createdAt: true,
      }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, phone, dateOfBirth, gender, notifyOrders, notifyPromo, notifySystem } = body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    if (gender !== undefined) updateData.gender = gender;
    if (notifyOrders !== undefined) updateData.notifyOrders = notifyOrders;
    if (notifyPromo !== undefined) updateData.notifyPromo = notifyPromo;
    if (notifySystem !== undefined) updateData.notifySystem = notifySystem;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    });

    return NextResponse.json({ user, message: "Cập nhật thành công" });
  } catch (error) {
    console.error("Profile PATCH error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
