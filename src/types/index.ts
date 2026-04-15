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
  total: number;
  paymentMethod: "COD" | "VNPAY" | "MOMO";
  paymentStatus: "PENDING" | "PAID";
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  note?: string | null;
  discountCode?: string | null;
  items: OrderItemType[];
  createdAt: string;
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

export interface RecommendationInput {
  ageRange: string;
  purpose: string[];
  budget: string;
}
