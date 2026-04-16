import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { loyaltyPoints: true },
    });

    const transactions = await prisma.loyaltyTransaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({
      points: user?.loyaltyPoints || 0,
      transactions: transactions.map(t => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Loyalty GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
