import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";
import { ProductType } from "@/types";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  // Prisma trả về đối tượng có kiểu hơi khác do một số thuộc tính null/undefined
  // Ta parse qua giao diện frontend
  const formattedProducts = products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  })) as ProductType[];

  return (
    <Suspense fallback={<div className="container-custom py-12 text-center text-brown-500">Đang tải danh sách sản phẩm...</div>}>
      <ProductsClient initialProducts={formattedProducts} />
    </Suspense>
  );
}
