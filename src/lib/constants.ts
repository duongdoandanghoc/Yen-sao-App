export const APP_NAME = "Yến Sào Bình An";
export const APP_DESCRIPTION = "Yến sào cao cấp - Chất lượng vượt trội, sức khỏe bền lâu";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const CATEGORIES = [
  { value: "RAW", label: "Yến thô", description: "Yến tự nhiên chưa qua xử lý" },
  { value: "REFINED", label: "Yến tinh chế", description: "Yến đã làm sạch, sẵn sàng chưng" },
  { value: "READY_TO_EAT", label: "Yến chưng sẵn", description: "Món yến chưng tiện lợi" },
] as const;

export const PURPOSES = [
  { value: "health", label: "Tăng cường sức khỏe", icon: "💪" },
  { value: "beauty", label: "Làm đẹp da", icon: "✨" },
  { value: "pregnancy", label: "Dành cho bà bầu", icon: "🤰" },
  { value: "recovery", label: "Phục hồi sức khỏe", icon: "🏥" },
  { value: "gift", label: "Làm quà tặng", icon: "🎁" },
  { value: "elderly", label: "Cho người lớn tuổi", icon: "👴" },
] as const;

export const ORDER_STATUSES = [
  { value: "PENDING", label: "Chờ xử lý", color: "yellow" },
  { value: "CONFIRMED", label: "Đã xác nhận", color: "blue" },
  { value: "SHIPPING", label: "Đang giao hàng", color: "purple" },
  { value: "COMPLETED", label: "Hoàn thành", color: "green" },
  { value: "CANCELLED", label: "Đã hủy", color: "red" },
] as const;

export const CONTACT_INFO = {
  phone: "0982 812 936",
  phoneHref: "tel:0982812936",
  email: "annguyen.lamviec@gmail.com",
  emailHref: "mailto:annguyen.lamviec@gmail.com",
  address: "63 Thống Nhất, Xã Thanh Sơn, Tỉnh Phú Thọ",
  mapQuery: "63+Thống+Nhất,+Thanh+Sơn,+Phú+Thọ",
} as const;

export const SHIPPING_FEE = 30000; // 30,000 VND
export const FREE_SHIPPING_THRESHOLD = 500000; // Free shipping for orders over 500k VND

export const NAV_ITEMS = [
  { href: "/products", label: "Sản phẩm" },
  { href: "/products?category=RAW", label: "Yến thô" },
  { href: "/products?category=REFINED", label: "Yến tinh chế" },
  { href: "/products?category=READY_TO_EAT", label: "Yến chưng sẵn" },
  { href: "/recommendation", label: "Tư vấn" },
  { href: "/blog", label: "Kiến thức" },
] as const;

export const FOOTER_LINKS = {
  products: [
    { href: "/products?category=RAW", label: "Yến thô" },
    { href: "/products?category=REFINED", label: "Yến tinh chế" },
    { href: "/products?category=READY_TO_EAT", label: "Yến chưng sẵn" },
  ],
  support: [
    { href: "/blog", label: "Hướng dẫn sử dụng" },
    { href: "/recommendation", label: "Tư vấn sức khỏe" },
    { href: "#", label: "Chính sách đổi trả" },
    { href: "#", label: "Câu hỏi thường gặp" },
  ],
  company: [
    { href: "/about", label: "Về chúng tôi" },
    { href: "/quality", label: "Cam kết chất lượng" },
    { href: "/contact", label: "Liên hệ" },
  ],
} as const;
