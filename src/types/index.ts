export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number | null;
  images: string[];
  category: "RAW" | "REFINED" | "READY_TO_EAT";
  benefits: string[];
  usage?: string | null;
  tags: string[];
  stock: number;
  averageRating: number;
  reviewCount: number;
  featured: boolean;
  active: boolean;
  weight?: string | null;
  origin?: string | null;
  isBundle?: boolean;
  bundleItems?: string[];
  bundleDiscount?: number | null;
  flashSalePrice?: number | null;
  flashSaleEnd?: string | null;
  createdAt: string;
}

export interface CartItem {
  product: ProductType;
  quantity: number;
}

export interface OrderType {
  id: string;
  orderNumber: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPING" | "COMPLETED" | "CANCELLED";
  subtotal: number;
  shippingFee: number;
  discount: number;
  loyaltyDiscount: number;
  loyaltyUsed: number;
  loyaltyEarned: number;
  total: number;
  paymentMethod: "COD" | "VNPAY" | "MOMO";
  paymentStatus: "PENDING" | "PAID";
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  note?: string | null;
  discountCode?: string | null;
  trackingNumber?: string | null;
  trackingEvents?: TrackingEventType[];
  items: OrderItemType[];
  createdAt: string;
}

export interface TrackingEventType {
  status: string;
  description: string;
  timestamp: string;
}

export interface OrderItemType {
  id: string;
  productName: string;
  productImage?: string | null;
  price: number;
  quantity: number;
}

export interface ReviewType {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  approved: boolean;
  createdAt: string;
  user: {
    name: string;
  };
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "USER" | "ADMIN";
  avatar?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  loyaltyPoints: number;
  referralCode?: string | null;
  notifyOrders: boolean;
  notifyPromo: boolean;
  notifySystem: boolean;
}

export interface BlogPostType {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export interface AddressType {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
}

export interface WishlistItemType {
  id: string;
  productId: string;
  createdAt: string;
  product: ProductType;
}

export interface LoyaltyTransactionType {
  id: string;
  orderId?: string | null;
  points: number;
  type: "EARN" | "REDEEM" | "BONUS" | "REFERRAL";
  description: string;
  createdAt: string;
}

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  type: "ORDER" | "PROMOTION" | "SYSTEM" | "LOYALTY" | "REFERRAL";
  read: boolean;
  createdAt: string;
}

export interface RecommendationInput {
  ageRange: string;
  purpose: string[];
  budget: string;
}

// Loyalty constants
export const LOYALTY_RATE = 1000; // 1 point per 1000đ spent
export const LOYALTY_REDEEM_VALUE = 50; // 1 point = 50đ discount (5% effective cashback)
export const LOYALTY_TIERS = [
  { name: "Đồng", icon: "🥉", minPoints: 0, bonusRate: 0 },
  { name: "Bạc", icon: "🥈", minPoints: 500, bonusRate: 0.05 },
  { name: "Vàng", icon: "🥇", minPoints: 2000, bonusRate: 0.10 },
  { name: "Kim Cương", icon: "💎", minPoints: 10000, bonusRate: 0.15 },
] as const;

export function getMemberTier(points: number) {
  for (let i = LOYALTY_TIERS.length - 1; i >= 0; i--) {
    if (points >= LOYALTY_TIERS[i].minPoints) return LOYALTY_TIERS[i];
  }
  return LOYALTY_TIERS[0];
}
