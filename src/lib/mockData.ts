import { ProductType, BlogPostType } from "@/types";

export const mockProducts: Omit<ProductType, "id" | "createdAt">[] = [
  // === RAW NEST ===
  {
    name: "Yến Sào Đảo Thiên Nhiên",
    slug: "yen-sao-dao-thien-nhien",
    description: "Yến sào nguyên tổ thu hoạch từ đảo yến tự nhiên tại Khánh Hòa. Sợi yến dày, dai, đều màu trắng ngà tự nhiên. Được kiểm định chất lượng nghiêm ngặt, đảm bảo 100% yến thật, không tẩm ướp hóa chất. Thích hợp cho người dùng muốn tự chưng yến tại nhà với hương vị thuần túy nhất.",
    shortDescription: "Yến nguyên tổ đảo Khánh Hòa, sợi dày, 100% tự nhiên",
    price: 2800000,
    originalPrice: 3200000,
    images: ["/images/products/raw-island-1.png"],
    category: "RAW",
    benefits: ["Bổ phổi, dưỡng âm", "Tăng cường miễn dịch", "Đẹp da, chống lão hóa", "Tốt cho bà bầu"],
    usage: "Ngâm 2-4 tiếng, nhặt lông, chưng cách thủy 30 phút với đường phèn",
    tags: ["premium", "island", "natural", "gift"],
    stock: 50,
    averageRating: 4.8,
    reviewCount: 45,
    featured: true,
    active: true,
    weight: "100g",
    origin: "Khánh Hòa, Việt Nam",
  },
  {
    name: "Yến Sào Hang Cao Cấp",
    slug: "yen-sao-hang-cao-cap",
    description: "Yến hang được thu hoạch từ các vách đá tự nhiên, có hàm lượng dinh dưỡng cao nhất trong các loại yến. Sợi yến mảnh, dai, có vị ngọt tự nhiên đặc trưng. Sản phẩm hiếm, sản lượng hạn chế, dành cho khách hàng sành yến.",
    shortDescription: "Yến hang tự nhiên, dinh dưỡng vượt trội, sản lượng giới hạn",
    price: 4500000,
    originalPrice: 5000000,
    images: ["/images/products/raw-cave-1.png"],
    category: "RAW",
    benefits: ["Hàm lượng acid sialic cao", "Phục hồi sức khỏe nhanh", "Tăng sức đề kháng", "Chống oxy hóa mạnh"],
    usage: "Ngâm 1-2 tiếng, chưng cách thủy 20-25 phút",
    tags: ["premium", "cave", "rare", "health"],
    stock: 20,
    averageRating: 4.9,
    reviewCount: 28,
    featured: true,
    active: true,
    weight: "100g",
    origin: "Bình Thuận, Việt Nam",
  },
  {
    name: "Yến Sào Lông Nguyên Chất",
    slug: "yen-sao-long-nguyen-chat",
    description: "Yến lông tự nhiên chưa qua xử lý làm sạch, giữ nguyên hàm lượng dinh dưỡng tối đa. Phù hợp cho người dùng có kinh nghiệm tự xử lý yến, muốn đảm bảo chất lượng tuyệt đối.",
    shortDescription: "Yến lông nguyên chất, dinh dưỡng tối đa, giá tốt",
    price: 1800000,
    originalPrice: 2200000,
    images: ["/images/products/raw-feather-1.png"],
    category: "RAW",
    benefits: ["Giữ nguyên dinh dưỡng", "Giá thành hợp lý", "Chất lượng đảm bảo"],
    usage: "Ngâm 4-6 tiếng, nhặt lông cẩn thận, chưng cách thủy 30-40 phút",
    tags: ["natural", "affordable", "health"],
    stock: 80,
    averageRating: 4.5,
    reviewCount: 62,
    featured: false,
    active: true,
    weight: "100g",
    origin: "Khánh Hòa, Việt Nam",
  },
  {
    name: "Vụn Yến Sào Tự Nhiên",
    slug: "vun-yen-sao-tu-nhien",
    description: "Vụn yến từ quá trình xử lý yến tổ, giữ nguyên chất lượng dinh dưỡng. Thích hợp để nấu chè, cháo yến cho gia đình, hoặc dùng hàng ngày với chi phí tiết kiệm.",
    shortDescription: "Vụn yến chất lượng cao, giá phải chăng, dùng hàng ngày",
    price: 900000,
    originalPrice: 1200000,
    images: ["/images/products/raw-broken-1.png"],
    category: "RAW",
    benefits: ["Tiết kiệm chi phí", "Dinh dưỡng tương đương yến tổ", "Dễ chế biến"],
    usage: "Không cần ngâm lâu, chưng cách thủy 20-25 phút",
    tags: ["affordable", "daily", "family"],
    stock: 150,
    averageRating: 4.3,
    reviewCount: 89,
    featured: false,
    active: true,
    weight: "100g",
    origin: "Khánh Hòa, Việt Nam",
  },

  // === REFINED ===
  {
    name: "Yến Sào Tinh Chế Trắng",
    slug: "yen-sao-tinh-che-trang",
    description: "Tổ yến đã được làm sạch 100% lông tơ, sẵn sàng chưng ngay. Sợi yến trắng tinh, đều đẹp, phù hợp làm quà tặng cao cấp hoặc dùng gia đình. Tiết kiệm thời gian xử lý nhưng vẫn giữ hương vị yến tự nhiên.",
    shortDescription: "Yến sạch 100%, sẵn sàng chưng, quà tặng sang trọng",
    price: 3500000,
    originalPrice: 4000000,
    images: ["/images/products/refined-white-1.png"],
    category: "REFINED",
    benefits: ["Tiết kiệm thời gian", "Sạch 100% lông tơ", "Giữ nguyên dinh dưỡng", "Quà tặng cao cấp"],
    usage: "Ngâm 30 phút, chưng cách thủy 25-30 phút với đường phèn hoặc hạt sen",
    tags: ["premium", "clean", "gift", "convenience"],
    stock: 60,
    averageRating: 4.7,
    reviewCount: 56,
    featured: true,
    active: true,
    weight: "100g",
    origin: "Khánh Hòa, Việt Nam",
  },
  {
    name: "Sợi Yến Vàng Cao Cấp",
    slug: "soi-yen-vang-cao-cap",
    description: "Sợi yến vàng tự nhiên, hiếm gặp, có hàm lượng khoáng chất cao hơn yến trắng thông thường. Được tinh chế cẩn thận, giữ nguyên màu vàng óng tự nhiên. Sản phẩm dành cho người sành yến.",
    shortDescription: "Sợi yến vàng hiếm, khoáng chất cao, dành cho sành điệu",
    price: 5200000,
    originalPrice: 5800000,
    images: ["/images/products/refined-golden-1.png"],
    category: "REFINED",
    benefits: ["Hàm lượng khoáng chất cao", "Hiếm và quý", "Hương vị đặc biệt", "Bổ dưỡng cơ thể"],
    usage: "Ngâm 30 phút, chưng cách thủy 20 phút",
    tags: ["rare", "premium", "golden", "mineral"],
    stock: 15,
    averageRating: 4.9,
    reviewCount: 19,
    featured: true,
    active: true,
    weight: "50g",
    origin: "Khánh Hòa, Việt Nam",
  },
  {
    name: "Yến Nhỏ Cho Bé",
    slug: "yen-nho-cho-be",
    description: "Sợi yến nhỏ mịn, được xử lý kỹ lưỡng, phù hợp cho trẻ em từ 1 tuổi trở lên. Giúp bé tăng cường miễn dịch, phát triển trí não, và hỗ trợ tiêu hóa. An toàn, sạch, không phụ gia.",
    shortDescription: "Yến mịn cho bé, tăng miễn dịch, an toàn 100%",
    price: 2000000,
    originalPrice: 2400000,
    images: ["/images/products/refined-baby-1.png"],
    category: "REFINED",
    benefits: ["An toàn cho trẻ em", "Tăng miễn dịch", "Hỗ trợ phát triển trí não", "Dễ tiêu hóa"],
    usage: "Chưng với nước lọc 20 phút, thêm ít đường phèn. Cho bé dùng 2-3 lần/tuần",
    tags: ["baby", "safe", "immunity", "brain"],
    stock: 70,
    averageRating: 4.6,
    reviewCount: 73,
    featured: false,
    active: true,
    weight: "50g",
    origin: "Khánh Hòa, Việt Nam",
  },
  {
    name: "Hộp Quà Yến Sào Premium",
    slug: "hop-qua-yen-sao-premium",
    description: "Hộp quà sang trọng gồm 100g yến tinh chế trắng và 2 hũ yến chưng sẵn. Đóng gói cao cấp với hộp gỗ sơn mài, kèm thiệp chúc mừng. Quà tặng hoàn hảo cho dịp lễ, Tết, sinh nhật, hay thăm bệnh.",
    shortDescription: "Hộp quà sang trọng, yến tinh chế + yến chưng, quà biếu hoàn hảo",
    price: 4800000,
    originalPrice: 5500000,
    images: ["/images/products/refined-giftbox-1.png"],
    category: "REFINED",
    benefits: ["Quà tặng sang trọng", "Combo tiết kiệm", "Bao bì cao cấp", "Kèm thiệp chúc mừng"],
    usage: "Yến tinh chế: chưng cách thủy 30 phút. Yến chưng sẵn: dùng ngay hoặc hâm nóng",
    tags: ["gift", "premium", "combo", "holiday"],
    stock: 30,
    averageRating: 4.8,
    reviewCount: 34,
    featured: true,
    active: true,
    weight: "Combo 100g + 2 hũ",
    origin: "Khánh Hòa, Việt Nam",
  },

  // === READY TO EAT ===
  {
    name: "Yến Chưng Nhân Sâm",
    slug: "yen-chung-nhan-sam",
    description: "Yến sào chưng với nhân sâm Hàn Quốc và đường phèn. Bổ khí huyết, tăng cường sức khỏe toàn diện. Đóng hũ thủy tinh cao cấp, tiện lợi mang theo. Mỗi hũ 70ml, dùng ngay hoặc bảo quản lạnh.",
    shortDescription: "Yến chưng nhân sâm, bổ khí huyết, tiện lợi dùng ngay",
    price: 180000,
    originalPrice: 220000,
    images: ["/images/products/readytoeat-ginseng-1.png"],
    category: "READY_TO_EAT",
    benefits: ["Bổ khí huyết", "Tăng cường sức khỏe", "Tiện lợi dùng ngay", "Hương vị đậm đà"],
    usage: "Mở nắp dùng ngay hoặc hâm nóng cách thủy 5 phút. Nên dùng lúc sáng sớm",
    tags: ["convenient", "ginseng", "health", "daily"],
    stock: 200,
    averageRating: 4.6,
    reviewCount: 124,
    featured: true,
    active: true,
    weight: "70ml x 1 hũ",
    origin: "Khánh Hòa, Việt Nam",
  },
  {
    name: "Yến Chưng Đường Phèn",
    slug: "yen-chung-duong-phen",
    description: "Yến sào chưng cổ điển với đường phèn tinh khiết. Hương vị thanh ngọt, mát lành, giữ nguyên tinh hoa của yến tự nhiên. Phù hợp mọi lứa tuổi, đặc biệt tốt cho người mới dùng yến.",
    shortDescription: "Yến chưng đường phèn cổ điển, thanh mát, mọi lứa tuổi",
    price: 150000,
    originalPrice: 180000,
    images: ["/images/products/readytoeat-sugar-1.png"],
    category: "READY_TO_EAT",
    benefits: ["Thanh mát cơ thể", "Dưỡng ẩm da", "Bổ phổi", "Phù hợp mọi lứa tuổi"],
    usage: "Dùng ngay hoặc để lạnh. Nên dùng buổi sáng hoặc trước khi ngủ",
    tags: ["classic", "convenient", "family", "daily"],
    stock: 300,
    averageRating: 4.5,
    reviewCount: 156,
    featured: false,
    active: true,
    weight: "70ml x 1 hũ",
    origin: "Khánh Hòa, Việt Nam",
  },
  {
    name: "Yến Chưng Nước Dừa",
    slug: "yen-chung-nuoc-dua",
    description: "Sự kết hợp độc đáo giữa yến sào và nước dừa tươi. Vị béo nhẹ, thơm mát, bổ sung collagen tự nhiên. Đặc biệt tốt cho da và tóc. Sản phẩm yêu thích của phái đẹp.",
    shortDescription: "Yến chưng nước dừa, bổ sung collagen, đẹp da tóc",
    price: 170000,
    originalPrice: 200000,
    images: ["/images/products/readytoeat-coconut-1.png"],
    category: "READY_TO_EAT",
    benefits: ["Đẹp da và tóc", "Bổ sung collagen", "Vị béo thơm mát", "Chống lão hóa"],
    usage: "Để lạnh dùng ngon hơn. Nên dùng 2-3 lần/tuần để thấy hiệu quả",
    tags: ["beauty", "coconut", "collagen", "women"],
    stock: 180,
    averageRating: 4.7,
    reviewCount: 98,
    featured: false,
    active: true,
    weight: "70ml x 1 hũ",
    origin: "Khánh Hòa, Việt Nam",
  },
  {
    name: "Yến Chưng Collagen Hồng Sâm",
    slug: "yen-chung-collagen-hong-sam",
    description: "Công thức độc quyền kết hợp yến sào, collagen peptide và hồng sâm. Món ăn thượng hạng giúp làm đẹp từ bên trong, chống lão hóa, và tăng cường sinh lực. Đóng hũ thủy tinh sang trọng.",
    shortDescription: "Yến + collagen + hồng sâm, chống lão hóa toàn diện",
    price: 250000,
    originalPrice: 300000,
    images: ["/images/products/readytoeat-collagen-1.png"],
    category: "READY_TO_EAT",
    benefits: ["Chống lão hóa mạnh", "Đẹp da từ bên trong", "Tăng sinh lực", "Công thức độc quyền"],
    usage: "Dùng mỗi sáng khi bụng đói để hấp thu tốt nhất",
    tags: ["beauty", "anti-aging", "collagen", "premium", "women"],
    stock: 100,
    averageRating: 4.8,
    reviewCount: 67,
    featured: true,
    active: true,
    weight: "70ml x 1 hũ",
    origin: "Khánh Hòa, Việt Nam",
  },
];

export const mockBlogPosts: Omit<BlogPostType, "id" | "createdAt">[] = [
  {
    title: "Cách Chưng Yến Sào Đúng Chuẩn Tại Nhà",
    slug: "cach-chung-yen-sao-dung-chuan",
    content: `# Cách Chưng Yến Sào Đúng Chuẩn Tại Nhà

Yến sào là món ăn bổ dưỡng quý giá, nhưng để giữ nguyên dưỡng chất, bạn cần biết cách chưng đúng cách.

## Bước 1: Ngâm Yến
- Ngâm yến trong nước sạch từ 2-4 tiếng (tùy loại yến)
- Nước ngâm nên ở nhiệt độ phòng
- Khi yến nở đều, tơi ra là đủ

## Bước 2: Nhặt Lông
- Dùng nhíp nhỏ nhặt hết lông tơ
- Rửa nhẹ nhàng qua nước sạch
- Để ráo nước

## Bước 3: Chưng Cách Thủy
- Cho yến vào tô thủy tinh hoặc sứ
- Thêm nước vừa ngập mặt yến
- Chưng cách thủy 25-30 phút
- Không chưng quá lâu sẽ mất chất

## Bước 4: Nêm Nếm
- Thêm đường phèn sau khi chưng xong
- Có thể thêm táo đỏ, hạt sen, nhân sâm
- Để nguội bớt rồi thưởng thức

## Lưu Ý Quan Trọng
- Nên dùng yến vào buổi sáng khi bụng đói
- Mỗi lần dùng 3-5g yến khô
- Không dùng chung với thực phẩm có tính acid mạnh`,
    excerpt: "Hướng dẫn chi tiết cách ngâm, nhặt lông và chưng yến sào đúng cách để giữ nguyên 100% dưỡng chất quý giá.",
    coverImage: "/images/blog/cooking-guide.jpg",
    tags: ["hướng dẫn", "chưng yến", "mẹo hay"],
    published: true,
  },
  {
    title: "10 Lợi Ích Sức Khỏe Tuyệt Vời Của Yến Sào",
    slug: "loi-ich-suc-khoe-yen-sao",
    content: `# 10 Lợi Ích Sức Khỏe Tuyệt Vời Của Yến Sào

Yến sào từ lâu được xem là thực phẩm bổ dưỡng hàng đầu. Dưới đây là 10 công dụng đã được khoa học chứng minh.

## 1. Tăng Cường Hệ Miễn Dịch
Acid sialic trong yến sào giúp tăng cường hệ thống miễn dịch.

## 2. Đẹp Da, Chống Lão Hóa
Yến sào chứa EGF (Epidermal Growth Factor) giúp tái tạo da.

## 3. Bổ Phổi
Yến sào có tính bình, vị ngọt, giúp bổ phổi, trị ho.

## 4. Tốt Cho Bà Bầu
Cung cấp dưỡng chất cho mẹ và bé phát triển khỏe mạnh.

## 5. Tăng Cường Trí Nhớ
Acid sialic hỗ trợ phát triển não bộ và tăng trí nhớ.

## 6. Hỗ Trợ Tiêu Hóa
Yến sào dễ tiêu hóa và hỗ trợ hệ tiêu hóa hoạt động tốt.

## 7. Phục Hồi Sau Bệnh
Giúp cơ thể phục hồi nhanh sau ốm, phẫu thuật.

## 8. Giảm Stress
Các amino acid trong yến giúp thư giãn tinh thần.

## 9. Tốt Cho Tim Mạch
Yến sào giúp ổn định huyết áp và bảo vệ tim.

## 10. Chống Oxy Hóa
Chứa nhiều chất chống oxy hóa tự nhiên.`,
    excerpt: "Khám phá 10 công dụng tuyệt vời của yến sào đã được khoa học chứng minh: đẹp da, tăng miễn dịch, tốt cho bà bầu và nhiều hơn nữa.",
    coverImage: "/images/blog/health-benefits.jpg",
    tags: ["sức khỏe", "yến sào", "dinh dưỡng"],
    published: true,
  },
  {
    title: "Yến Sào Cho Bà Bầu: Hướng Dẫn Toàn Diện",
    slug: "yen-sao-cho-ba-bau",
    content: `# Yến Sào Cho Bà Bầu: Hướng Dẫn Toàn Diện

## Tại Sao Bà Bầu Nên Ăn Yến Sào?

Yến sào là thực phẩm tốt cho bà bầu nhờ hàm lượng dưỡng chất phong phú:
- **Acid sialic**: Hỗ trợ phát triển não bộ thai nhi
- **Protein**: Cung cấp năng lượng cho mẹ
- **Khoáng chất**: Calcium, sắt, kẽm cần thiết

## Khi Nào Nên Bắt Đầu?
- Có thể dùng từ tháng thứ 3 của thai kỳ
- Mỗi ngày 3-5g yến khô
- Dùng liên tục để đạt hiệu quả tốt nhất

## Cách Dùng Phù Hợp
1. Chưng yến với đường phèn đơn giản
2. Có thể thêm táo đỏ, kỷ tử
3. Dùng vào buổi sáng khi bụng đói
4. Tránh dùng quá nhiều trong 3 tháng đầu

## Lưu Ý Khi Chọn Yến
- Chọn yến sào uy tín, có kiểm định
- Tránh yến tẩm hóa chất
- Nên mua yến tinh chế hoặc yến chưng sẵn cho tiện`,
    excerpt: "Hướng dẫn toàn diện về cách sử dụng yến sào trong thai kỳ: khi nào nên bắt đầu, liều lượng phù hợp, và lưu ý quan trọng.",
    coverImage: "/images/blog/pregnancy-guide.jpg",
    tags: ["bà bầu", "thai kỳ", "dinh dưỡng"],
    published: true,
  },
  {
    title: "Hướng Dẫn Chọn Yến Sào Chất Lượng",
    slug: "huong-dan-chon-yen-sao-chat-luong",
    content: `# Hướng Dẫn Chọn Yến Sào Chất Lượng

## Cách Nhận Biết Yến Thật - Yến Giả

### Yến Thật
- Sợi yến không đều, có sợi lớn sợi nhỏ tự nhiên
- Mùi tanh nhẹ đặc trưng (mùi trứng)
- Ngâm nước nở đều, giữ hình dạng
- Chưng xong có vị ngọt thanh tự nhiên

### Yến Giả/Kém Chất Lượng
- Sợi quá đều, trắng bóng bất thường
- Không có mùi hoặc mùi hóa chất
- Ngâm nước tan nhanh, mất hình
- Vị lạ, không có vị ngọt tự nhiên

## Tiêu Chí Chọn Nhà Cung Cấp
1. Có giấy chứng nhận an toàn vệ sinh thực phẩm
2. Công bố nguồn gốc rõ ràng
3. Có chính sách đổi trả
4. Đánh giá tốt từ khách hàng
5. Giá cả hợp lý (không rẻ bất thường)`,
    excerpt: "Cẩm nang phân biệt yến sào thật - giả và tiêu chí chọn nhà cung cấp uy tín. Bảo vệ sức khỏe gia đình bạn.",
    coverImage: "/images/blog/quality-guide.jpg",
    tags: ["hướng dẫn", "chọn yến", "chất lượng"],
    published: true,
  },
];

export const mockDiscountCodes = [
  {
    code: "YENSAO10",
    type: "PERCENTAGE" as const,
    value: 10,
    minOrderValue: 500000,
    maxUses: 100,
    usedCount: 23,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2027-12-31"),
    active: true,
  },
  {
    code: "FREESHIP",
    type: "FIXED" as const,
    value: 30000,
    minOrderValue: 300000,
    maxUses: 200,
    usedCount: 67,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2027-12-31"),
    active: true,
  },
  {
    code: "WELCOME20",
    type: "PERCENTAGE" as const,
    value: 20,
    minOrderValue: 1000000,
    maxUses: 50,
    usedCount: 12,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2027-12-31"),
    active: true,
  },
];

export const mockReviews = [
  { rating: 5, comment: "Yến rất ngon, sợi dày dai. Gia đình mình rất hài lòng!", userName: "Nguyễn Thanh Hoa" },
  { rating: 5, comment: "Mua làm quà biếu Tết, bao bì sang trọng, người nhận rất thích.", userName: "Trần Văn Minh" },
  { rating: 4, comment: "Chất lượng tốt, giao hàng nhanh. Sẽ mua lại lần sau.", userName: "Lê Thị Mai" },
  { rating: 5, comment: "Dùng cho bà bầu 3 tháng rất tốt, da đẹp lên nhiều.", userName: "Phạm Thị Hồng" },
  { rating: 4, comment: "Yến chưng sẵn tiện lợi, vị ngon tự nhiên.", userName: "Hoàng Đức Anh" },
  { rating: 5, comment: "Mua cho mẹ dùng hàng tháng, sức khỏe cải thiện rõ rệt.", userName: "Võ Minh Tuấn" },
];
