import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [user, transactions] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { loyaltyPoints: true },
      }),
      prisma.loyaltyTransaction.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);

    // Compute actual points from transactions (source of truth)
    const computedPoints = transactions.reduce((sum, t) => sum + t.points, 0);
    const storedPoints = user?.loyaltyPoints ?? 0;

    // Auto-sync if mismatch (handles edge cases from schema migration)
    if (computedPoints !== storedPoints && session.user.id) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { loyaltyPoints: computedPoints },
      }).catch(() => {}); // Silent fail - not critical
    }

    return NextResponse.json({
      points: computedPoints,
      transactions: transactions.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Loyalty GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
