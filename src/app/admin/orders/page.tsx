import { prisma } from "@/lib/prisma";
import AdminOrdersClient from "./AdminOrdersClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminOrdersPage() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, phone: true, email: true }
      },
      items: {
        select: {
          id: true,
          productName: true,
          productImage: true,
          price: true,
          quantity: true,
        }
      }
    }
  });

  return <AdminOrdersClient initialOrders={orders} />;
}
