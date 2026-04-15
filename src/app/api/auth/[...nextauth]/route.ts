import { handlers } from "@/lib/auth";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

export const dynamic = "force-dynamic";

// generateStaticParams bắt buộc cho catch-all route khi static export
export function generateStaticParams() {
  if (isMobile) {
    return [{ nextauth: ["signin"] }, { nextauth: ["signout"] }, { nextauth: ["session"] }];
  }
  return [];
}

export const { GET, POST } = handlers;

