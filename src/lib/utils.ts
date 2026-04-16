// Utility functions

// Simple class merge utility (without clsx dependency, uses manual approach)
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Generate a short, memorable order number.
 * Format: YS-YYMMDD-XXXX
 * - YS: Brand prefix (Yến Sào)
 * - YYMMDD: Date (2-digit year + month + day)
 * - XXXX: 4 alphanumeric chars (36^4 = 1,679,616 combinations per day)
 * Example: YS-260416-A1B2
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const dateStr = `${yy}${mm}${dd}`;
  
  // Generate 4 random alphanumeric characters (0-9, A-Z)
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `YS-${dateStr}-${random}`;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: "Chờ xử lý",
    CONFIRMED: "Đã xác nhận",
    SHIPPING: "Đang giao hàng",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy",
    PAID: "Đã thanh toán",
  };
  return labels[status] || status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    SHIPPING: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    RAW: "Yến thô",
    REFINED: "Yến tinh chế",
    READY_TO_EAT: "Yến chưng sẵn",
  };
  return labels[category] || category;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
