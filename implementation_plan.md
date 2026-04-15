# Kế Hoạch Triển Khai 3 Công Nghệ "Web Native" (Dung Lượng Siêu Mỏng)

Kế hoạch này sẽ tích hợp 3 tính năng của kỷ nguyên Web 2026 vào thẳng nền tảng Yến Sào Bình An mà không làm phình to giới hạn xử lý của Server.

## User Review Required

> [!IMPORTANT]
> - Trình duyệt sẽ yêu cầu quyền Push Notification khi cấu hình dạng PWA, hãy suy tính nội dung để Push cho họ.
> - Các App Android/iOS hiện tại (xây bằng Capacitor) đã chứa WebView độc lập, do đó **PWA (Tính năng cài App trực tiếp)** sẽ chủ yếu dành cho khách dùng Chrome/Safari trên màn hình không đi xuyên qua App Store truyền thống.
> - Xin xác nhận để tôi tiến hành sửa tệp cốt lõi `next.config.ts` và Layout gốc!

## Proposed Changes

---

### Cấu Trúc View Transitions (Chuyển trang phong cách siêu mượt)

Sử dụng thư viện `next-view-transitions` làm cầu nối gọi thẳng `document.startViewTransition()` của W3C.

#### [NEW] `src/styles/transitions.css`
Tạo một file chứa các cấu hình CSS nội bộ siêu ngắn để điều phối tốc độ nhạt nhòa/bay vòm ảnh khi chuyển từ Trang chủ sang trang Chi tiết Sản phẩm.

#### [MODIFY] `src/app/layout.tsx`
Khóa trình bày bằng thẻ `<ViewTransitions>` từ thư viện ngoài để đánh chặn toàn bộ các cú nhấp chuột chuyển mạch của Next.js Router, kích hoạt ảnh ảo thay vì giật nháy xóa trắng màn hình.

#### [MODIFY] `src/components/home/HeroSection.tsx` & `src/components/layout/Navbar.tsx`
Thay thế thẻ `<Link>` tiêu chuẩn của NextJS thành thẻ `<Link>` ViewTransitions.

---

### Tiến Hóa PWA (Progressive Web App - Ứng dụng Không Ràng Buộc)

Khởi tạo mạng lưới Service Worker túc trực ngầm chạy độc lập không cần mở lại trình duyệt.

#### [MODIFY] `next.config.ts`
Wrap NextConfig bằng `withPWA` (đóng gói bằng `@ducanh2912/next-pwa`) để sinh tệp phân phối cục bộ (Dest).

#### [NEW] `public/manifest.json`
Tạo một tấm Passport thẻ căn cước App Yến Sào Bình An. Định danh màu vàng chủ đạo của trang tải (Splash Screen), Tên hiển thị App nằm trên màn hình, và thông số cấu trúc `standalone`.

#### [NEW] `src/components/pwa/InstallPWA.tsx`
Tạo một Box cài đặt rất xịn ở chân Website kiểu như: *"Tải Yến Sào Bình An phiên bản nhúng Offline"*.

---

### Thuật Toán Gợi Ý Cá Nhân (Cục Bộ)

Hệ thống bắt vết (Behavior Tracker) đọc Cache trình duyệt thay vì hành hạ máy chủ.

#### [NEW] `src/hooks/useTracking.ts`
Script lưu mã định dạng (ví dụ: `[PREGNANCY, RAW, GIFT]`) vào `localStorage` mỗi khi khách cuộn lướt vào một siêu phẩm Yến ở `ProductDetailClient.tsx`.

#### [NEW] `src/components/home/SmartPicks.tsx`
Khu vực dải Băng đai tự động hiện lên ngay thân trang web dựa theo thông số Tracker. Xử lý cực sạch theo thuật toán phân loại 0s chờ truy vấn.

## Open Questions

> [!TIP]
> Bạn có muốn tôi sử dụng Icon Cờ Đỏ/Khánh Hòa hoặc tự động lấy Logo yến có sẵn để làm biểu tượng Icon PWA ở màn hình điện thoại không?

## Verification Plan

### Automated Tests
1. Cài đặt các modules `npm install next-view-transitions @ducanh2912/next-pwa`.
2. Kiểm thử ngẫu nhiên chạy `npm run build` để xác thực `next.config` nhúng PWA không va chạm vào nền tảng Capacitor cài sẵn.

### Manual Verification
1. Lướt web, kích chuột và đánh giá độ mượt xịn xò của màn bay hình chuyển tiếp.
2. Kiểm tra thanh địa chỉ xem Google Chrome có xổ thả cái Icon mũi tên *"Install Yến Sào Bình An"* chưa.
3. Ra vào trang chủ 3 lần check gợi ý dội bom Yến thông minh.
