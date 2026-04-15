import { handlers } from "@/lib/auth";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

// Mobile build cần static export, web build cần dynamic cho auth
export const dynamic = isMobile ? "force-static" : "force-dynamic";

// generateStaticParams bắt buộc cho catch-all route khi static export
export function generateStaticParams() {
  if (isMobile) {
    return [{ nextauth: ["signin"] }, { nextauth: ["signout"] }, { nextauth: ["session"] }];
  }
  return [];
}

export const { GET, POST } = handlers;

