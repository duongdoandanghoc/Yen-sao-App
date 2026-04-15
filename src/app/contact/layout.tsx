import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${APP_NAME} — Tư vấn sản phẩm, hỗ trợ đơn hàng, hợp tác kinh doanh. Phản hồi nhanh trong 24h.`,
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
