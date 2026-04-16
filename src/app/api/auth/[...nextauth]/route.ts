import { handlers } from "@/lib/auth";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

// Default: force-dynamic for web (Vercel). Mobile build script overrides to force-static.
export const dynamic = "force-dynamic";

// generateStaticParams only needed for mobile static export
export function generateStaticParams() {
  if (isMobile) {
    return [{ nextauth: ["signin"] }, { nextauth: ["signout"] }, { nextauth: ["session"] }];
  }
  return [];
}

export const { GET, POST } = handlers;
