import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminAccountsClient from "./AdminAccountsClient";

export default async function AdminAccountsPage() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      orders: {
        select: {
          id: true,
          total: true,
          status: true,
        }
      },
    }
  });

  const accounts = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || "—",
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    orderCount: user.orders.length,
    totalSpent: user.orders
      .filter(o => o.status !== "CANCELLED")
      .reduce((sum, o) => sum + o.total, 0),
    loyaltyPoints: Math.floor(
      user.orders
        .filter(o => o.status === "COMPLETED")
        .reduce((sum, o) => sum + o.total, 0) / 1000
    ),
  }));

  return <AdminAccountsClient initialAccounts={accounts} />;
}
