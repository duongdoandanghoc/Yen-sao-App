# 📖 HƯỚNG DẪN SỬ DỤNG - YẾN SÀO BÌNH AN

> Tài liệu hướng dẫn chi tiết dành cho người không biết lập trình.
> Cập nhật: 15/04/2026

---

## 📋 Mục Lục

1. [Giới thiệu dự án](#1-giới-thiệu-dự-án)
2. [Yêu cầu cài đặt](#2-yêu-cầu-cài-đặt)
3. [Hướng dẫn cài đặt từng bước](#3-hướng-dẫn-cài-đặt-từng-bước)
4. [Cách chạy website](#4-cách-chạy-website)
5. [Hướng dẫn sử dụng — Khách hàng](#5-hướng-dẫn-sử-dụng--khách-hàng)
6. [Hướng dẫn sử dụng — Quản trị viên](#6-hướng-dẫn-sử-dụng--quản-trị-viên)
7. [Cấu trúc thư mục dự án](#7-cấu-trúc-thư-mục-dự-án)
8. [Kết nối cơ sở dữ liệu MongoDB](#8-kết-nối-cơ-sở-dữ-liệu-mongodb)
9. [Triển khai lên internet (Deploy)](#9-triển-khai-lên-internet-deploy)
10. [Build ứng dụng Mobile (Android & iOS)](#10-build-ứng-dụng-mobile-android--ios)
11. [Mối quan hệ giữa MongoDB, Deploy và Mobile App](#11-mối-quan-hệ-giữa-mongodb-deploy-và-mobile-app)
12. [Cập nhật nội dung sau khi triển khai](#12-cập-nhật-nội-dung-sau-khi-triển-khai)
13. [Câu hỏi thường gặp (FAQ)](#13-câu-hỏi-thường-gặp-faq)
14. [Xử lý sự cố](#14-xử-lý-sự-cố)
15. [Tài khoản demo](#15-tài-khoản-demo)
16. [Liên hệ hỗ trợ](#16-liên-hệ-hỗ-trợ)

---

## 1. Giới Thiệu Dự Án

**Yến Sào Bình An** là website bán yến sào trực tuyến (D2C — Direct to Consumer), được thiết kế dành riêng cho doanh nghiệp gia đình kinh doanh yến sào. Website có thể build thành ứng dụng điện thoại cho cả iPhone và Android.

### Website bao gồm:

| Tính năng | Mô tả |
|-----------|-------|
| 🛒 **Cửa hàng online** | Khách hàng xem sản phẩm, thêm vào giỏ hàng, đặt hàng |
| 🔐 **Đăng ký / Đăng nhập** | Tài khoản khách hàng, quản lý đơn hàng |
| 📦 **Đặt hàng** | Quy trình 3 bước đơn giản: Giao hàng → Thanh toán → Xác nhận |
| 🤖 **Tư vấn AI** | Gợi ý sản phẩm dựa trên tuổi, mục đích, ngân sách |
| 💬 **Chatbot tư vấn** | Trả lời câu hỏi tự động 24/7 |
| 📝 **Blog kiến thức** | Bài viết về cách dùng yến, lợi ích sức khỏe |
| 🎫 **Mã giảm giá** | Áp dụng mã khuyến mãi khi thanh toán |
| 📊 **Trang quản trị (Admin)** | Quản lý sản phẩm, đơn hàng, khách hàng, xem doanh thu |
| 🏢 **Về chúng tôi** | Trang giới thiệu storytelling tạo niềm tin |
| 🛡️ **Cam kết chất lượng** | Trang cam kết chất lượng theo tiêu chuẩn quốc tế |
| 📞 **Liên hệ** | Trang liên hệ với form gửi tin nhắn & Google Maps |
| 📱 **App Mobile** | Build thành app cho iPhone (iOS) và Android |

---

## 2. Yêu Cầu Cài Đặt

Trước khi bắt đầu, máy tính của bạn cần có **2 phần mềm** sau:

### 2.1. Node.js (bắt buộc)

**Node.js** là phần mềm giúp chạy website trên máy tính.

- 🌐 Tải tại: [https://nodejs.org](https://nodejs.org)
- ✅ Chọn phiên bản **LTS** (ổn định nhất)
- 📝 Phiên bản tối thiểu: **18.0** trở lên

**Cách kiểm tra đã cài chưa:**
1. Mở **Command Prompt** (nhấn phím `Windows + R`, gõ `cmd`, nhấn Enter)
2. Gõ lệnh sau rồi nhấn Enter:
   ```
   node --version
   ```
3. Nếu hiện ra số phiên bản (ví dụ: `v20.10.0`) là đã cài thành công ✅
4. Nếu báo lỗi "không tìm thấy lệnh" thì cần cài đặt Node.js ❌

### 2.2. Trình soạn thảo mã nguồn (khuyến khích)

Nếu bạn muốn xem hoặc chỉnh sửa code:
- 🌐 Tải **Visual Studio Code**: [https://code.visualstudio.com](https://code.visualstudio.com)
- Đây là trình soạn thảo miễn phí, dễ dùng

> 💡 **Lưu ý:** Nếu bạn chỉ muốn chạy website mà không cần sửa code, thì không cần cài Visual Studio Code.

---

## 3. Hướng Dẫn Cài Đặt Từng Bước

### Bước 1: Mở thư mục dự án

1. Mở **File Explorer** (biểu tượng thư mục trên thanh Taskbar)
2. Điều hướng đến thư mục `D:\yen-sao-store`
3. Bạn sẽ thấy các tệp và thư mục của dự án

### Bước 2: Mở Command Prompt tại thư mục dự án

**Cách 1 (đơn giản nhất):**
1. Trong File Explorer, mở thư mục `D:\yen-sao-store`
2. Nhấn vào thanh địa chỉ phía trên (chỗ hiện đường dẫn)
3. Xóa hết, gõ `cmd` rồi nhấn **Enter**
4. Cửa sổ Command Prompt sẽ mở ra tại đúng thư mục

**Cách 2:**
1. Nhấn phím `Windows + R`
2. Gõ `cmd` rồi nhấn Enter
3. Gõ lệnh sau:
   ```
   cd D:\yen-sao-store
   ```
4. Nhấn Enter

### Bước 3: Cài đặt thư viện (chỉ cần làm 1 lần)

Trong cửa sổ Command Prompt, gõ lệnh sau rồi nhấn **Enter**:

```
npm install
```

⏳ **Chờ đợi:** Quá trình này mất khoảng **1-3 phút** tùy tốc độ mạng. Bạn sẽ thấy nhiều dòng chữ chạy — điều này là bình thường.

✅ **Hoàn thành khi:** Xuất hiện dòng `added xxx packages` và con trỏ nhấp nháy trở lại.

> ⚠️ **Quan trọng:** Bước này chỉ cần làm **1 lần duy nhất** khi mới tải dự án về. Từ lần sau chỉ cần làm Bước 4.

### Bước 4: Tạo Prisma Client (chỉ cần làm 1 lần)

Gõ lệnh sau:

```
npx prisma generate
```

⏳ Chờ khoảng 10-20 giây.

---

## 4. Cách Chạy Website

### Khởi động website (chế độ phát triển)

Trong Command Prompt tại thư mục `D:\yen-sao-store`, gõ:

```
npm run dev
```

✅ **Thành công khi thấy:**
```
▲ Next.js 16.x.x
- Local:    http://localhost:3000
✓ Ready in xxxms
```

### Mở website trên trình duyệt

1. Mở trình duyệt web (Chrome, Edge, Firefox, Cốc Cốc,...)
2. Gõ vào thanh địa chỉ: **http://localhost:3000**
3. Nhấn Enter
4. 🎉 Website sẽ hiện ra!

### Tắt website

Khi muốn tắt website:
1. Quay lại cửa sổ Command Prompt
2. Nhấn tổ hợp phím **Ctrl + C**
3. Nếu hỏi "Terminate batch job?" thì gõ **Y** rồi nhấn Enter

### Chạy lại website (từ lần sau)

Mỗi lần muốn chạy lại, chỉ cần:
1. Mở Command Prompt tại thư mục `D:\yen-sao-store`
2. Gõ `npm run dev`
3. Mở trình duyệt vào `http://localhost:3000`

> 💡 **Mẹo:** Giữ cửa sổ Command Prompt mở trong suốt thời gian sử dụng website. Đóng Command Prompt = tắt website.

---

## 5. Hướng Dẫn Sử Dụng — Khách Hàng

### 5.1. Trang Chủ

Khi vào website, bạn sẽ thấy:
- 🏠 **Banner giới thiệu** — Hình ảnh đẹp, nút "Khám phá sản phẩm"
- ⭐ **Sản phẩm nổi bật** — Các sản phẩm được yêu thích nhất
- 💚 **Lợi ích yến sào** — 6 lợi ích sức khỏe
- 💬 **Đánh giá khách hàng** — Nhận xét từ người dùng thật
- 📝 **Blog kiến thức** — Bài viết hướng dẫn
- 📞 **Liên hệ tư vấn** — Nút gọi điện và tư vấn AI

### 5.2. Xem Sản Phẩm

1. Nhấn vào **"Sản phẩm"** trên thanh menu
2. Bạn sẽ thấy tất cả sản phẩm chia theo 3 loại:
   - 🪹 **Yến thô** — Yến nguyên tổ, chưa xử lý
   - ✨ **Yến tinh chế** — Đã làm sạch, sẵn sàng chưng
   - 🍯 **Yến chưng sẵn** — Hũ yến tiện lợi, dùng ngay
3. Bạn có thể:
   - 🔍 **Tìm kiếm** bằng tên sản phẩm
   - 🏷️ **Lọc** theo loại yến
   - 📊 **Sắp xếp** theo giá, đánh giá, mới nhất

### 5.3. Xem Chi Tiết Sản Phẩm

Nhấn vào bất kỳ sản phẩm nào để xem:
- 📸 Hình ảnh sản phẩm
- 💰 Giá bán (và giá gốc nếu đang giảm giá)
- ⭐ Đánh giá từ khách hàng
- 📋 Mô tả chi tiết, lợi ích, hướng dẫn sử dụng
- 📦 Trọng lượng, xuất xứ, tồn kho

### 5.4. Thêm Sản Phẩm Vào Giỏ Hàng

1. Tại trang sản phẩm, chọn **số lượng** (dùng nút + / -)
2. Nhấn nút **"Thêm vào giỏ"** (nút vàng)
3. ✅ Giỏ hàng sẽ tự động mở ra bên phải màn hình
4. Bạn có thể tiếp tục mua sắm hoặc tiến hành đặt hàng

### 5.5. Giỏ Hàng

Giỏ hàng hiện ra bên phải màn hình, bao gồm:
- Danh sách sản phẩm đã thêm
- Nút **+ / -** để thay đổi số lượng
- Nút **🗑️** để xóa sản phẩm
- 📊 **Thanh tiến trình miễn phí giao hàng** — Mua thêm bao nhiêu để được freeship
- 💰 **Tổng tiền** — Tạm tính + phí giao hàng
- Nút **"Tiến hành đặt hàng"**

> 💡 **Miễn phí giao hàng:** Đơn hàng từ **500.000đ** trở lên được miễn phí ship.

### 5.6. Đặt Hàng (3 Bước Đơn Giản)

#### Bước 1 — Thông tin giao hàng:
Điền các thông tin sau:
- ✍️ **Họ tên** người nhận (bắt buộc)
- 📱 **Số điện thoại** (bắt buộc)
- 🏠 **Địa chỉ** — số nhà, đường (bắt buộc)
- 📍 **Phường/Xã, Quận/Huyện**
- 🏙️ **Tỉnh/Thành phố** (bắt buộc)
- 📝 **Ghi chú** (tùy chọn)

Nhấn **"Tiếp tục"** để sang bước 2.

#### Bước 2 — Thanh toán:
- Chọn phương thức thanh toán: **COD (thanh toán khi nhận hàng)** ✅
- (VNPay và MoMo sẽ ra mắt sau)
- 🎫 **Nhập mã giảm giá** (nếu có) → Nhấn "Áp dụng"

**Mã giảm giá có sẵn để thử:**

| Mã | Ưu đãi | Điều kiện |
|----|--------|-----------|
| `YENSAO10` | Giảm 10% | Đơn từ 500.000đ |
| `FREESHIP` | Miễn phí ship (giảm 30.000đ) | Đơn từ 300.000đ |
| `WELCOME20` | Giảm 20% | Đơn từ 1.000.000đ |

Nhấn **"Xác nhận đơn hàng"** để sang bước 3.

#### Bước 3 — Xác nhận:
- Kiểm tra lại thông tin giao hàng
- Kiểm tra danh sách sản phẩm
- Kiểm tra tổng tiền
- Nhấn **"Đặt hàng"**

✅ **Thành công!** Bạn sẽ thấy mã đơn hàng và thông báo đặt hàng thành công.

### 5.7. Tư Vấn AI

1. Nhấn **"Tư vấn"** trên thanh menu
2. Trả lời 3 câu hỏi:
   - 🎂 **Độ tuổi** — Chọn 1 nhóm tuổi
   - 🎯 **Mục đích** — Chọn 1 hoặc nhiều (sức khỏe, làm đẹp, bà bầu,...)
   - 💰 **Ngân sách** — Dưới 1 triệu / 1-3.5 triệu / Trên 3.5 triệu
3. Nhấn **"Nhận gợi ý sản phẩm"**
4. 🎉 Hệ thống sẽ gợi ý sản phẩm phù hợp kèm lý do

### 5.8. Chatbot Tư Vấn

- Nhấn vào **nút tròn vàng** ở góc phải dưới màn hình 💬
- Gõ câu hỏi, ví dụ:
  - `"giá yến sào bao nhiêu"` → Bảng giá chi tiết
  - `"yến cho bà bầu"` → Tư vấn cho bà bầu
  - `"cách dùng"` → Hướng dẫn chưng yến
  - `"giao hàng"` → Chính sách giao hàng
  - `"khuyến mãi"` → Mã giảm giá hiện có
  - `"chất lượng"` → Cam kết chất lượng

### 5.9. Blog Kiến Thức

1. Nhấn **"Kiến thức"** trên thanh menu
2. Đọc các bài viết:
   - 📖 Cách chưng yến sào đúng chuẩn
   - 💚 10 lợi ích sức khỏe của yến sào
   - 🤰 Yến sào cho bà bầu
   - 🔍 Hướng dẫn chọn yến sào chất lượng

### 5.10. Về Chúng Tôi (`/about`)

Trang giới thiệu storytelling gồm:
- 📜 **Câu chuyện thương hiệu** — Hành trình từ tình yêu gia đình
- 🛤️ **Timeline** — 4 cột mốc quan trọng
- 💎 **Giá trị cốt lõi** — 4 nguyên tắc không thay đổi
- 📊 **Thống kê** — Số gia đình tin dùng, đánh giá

### 5.11. Cam Kết Chất Lượng (`/quality`)

Trang cam kết chất lượng gồm:
- 🏛️ **4 trụ cột chất lượng** — 100% tự nhiên, kiểm định, truy xuất, bảo quản
- 📊 **Bảng so sánh** — So sánh với thị trường chung
- 🏅 **Chứng nhận** — An toàn thực phẩm, giao hàng, đổi trả
- 🛡️ **Lời hứa** — Hoàn tiền 100% nếu không hài lòng

### 5.12. Liên Hệ (`/contact`)

Trang liên hệ gồm:
- 📇 **4 thẻ liên hệ** — Điện thoại, email, địa chỉ, giờ làm việc
- 📝 **Form gửi tin nhắn** — Nhập họ tên, SĐT, chủ đề, nội dung
- 🗺️ **Google Maps** — Bản đồ cửa hàng nhúng trực tiếp
- ☎️ **Nút gọi nhanh** — Gọi trực tiếp để tư vấn

### 5.13. Tài Khoản Cá Nhân

1. Nhấn **"Đăng nhập"** → Nhập email và mật khẩu
2. Sau khi đăng nhập, nhấn vào **avatar** (góc phải trên) để:
   - 📦 Xem lịch sử đơn hàng
   - 📍 Quản lý địa chỉ giao hàng
   - 🚪 Đăng xuất

---

## 6. Hướng Dẫn Sử Dụng — Quản Trị Viên

### 6.1. Đăng Nhập Admin

1. Mở trình duyệt, vào: **http://localhost:3000/login**
2. Đăng nhập bằng tài khoản admin:
   - 📧 Email: `admin@yensao.vn`
   - 🔑 Mật khẩu: `admin123`
3. Sau khi đăng nhập, nhấn vào avatar → chọn **"Quản trị"**
4. Hoặc truy cập trực tiếp: **http://localhost:3000/admin**

### 6.2. Trang Tổng Quan (Dashboard)

Hiển thị:
- 📊 **4 thẻ thống kê**: Tổng đơn hàng, Doanh thu, Số sản phẩm, Số khách hàng
- 📈 **Biểu đồ đơn hàng theo ngày** — Biểu đồ cột 7 ngày gần nhất
- 📋 **Đơn hàng mới nhất** — 5 đơn hàng gần đây
- 🏆 **Sản phẩm bán chạy** — Top 5 sản phẩm

### 6.3. Quản Lý Sản Phẩm

Truy cập: **Menu bên trái → Sản phẩm**

Bạn có thể:
- 🔍 **Tìm kiếm sản phẩm** bằng tên
- 👀 **Xem danh sách** tất cả sản phẩm (tên, loại, giá, tồn kho, nổi bật)
- ✏️ **Sửa sản phẩm** — Nhấn biểu tượng bút chì (hiện tại là giao diện, logic sẽ kết nối DB sau)
- 🗑️ **Xóa sản phẩm** — Nhấn biểu tượng thùng rác
- ➕ **Thêm sản phẩm mới** — Nhấn nút "Thêm sản phẩm"

> ⚠️ **Lưu ý:** Hiện tại đang dùng dữ liệu mẫu. Khi kết nối MongoDB, bạn sẽ thao tác trực tiếp trên dữ liệu thật.

### 6.4. Quản Lý Đơn Hàng

Truy cập: **Menu bên trái → Đơn hàng**

Bạn có thể:
- 🔍 **Tìm kiếm** theo mã đơn hàng hoặc tên khách hàng
- 🏷️ **Lọc theo trạng thái**: Chờ xử lý / Đã xác nhận / Đang giao / Hoàn thành / Đã hủy
- 🔄 **Cập nhật trạng thái** — Dùng dropdown ở cột "Cập nhật" để thay đổi trạng thái

**Các trạng thái đơn hàng:**

| Trạng thái | Ý nghĩa | Màu sắc |
|------------|---------|---------|
| 🟡 Chờ xử lý | Khách vừa đặt, chưa xác nhận | Vàng |
| 🔵 Đã xác nhận | Admin đã xác nhận đơn | Xanh dương |
| 🟣 Đang giao | Đã chuyển cho đơn vị vận chuyển | Tím |
| 🟢 Hoàn thành | Khách đã nhận hàng | Xanh lá |
| 🔴 Đã hủy | Đơn hàng bị hủy | Đỏ |

### 6.5. Quản Lý Khách Hàng

Truy cập: **Menu bên trái → Khách hàng**

Hiển thị danh sách khách hàng với:
- 👤 Tên, email, số điện thoại
- 📦 Số đơn hàng đã đặt
- 💰 Tổng chi tiêu
- 📅 Ngày tham gia

---

## 7. Cấu Trúc Thư Mục Dự Án

Dưới đây là giải thích các thư mục và tệp quan trọng:

```
D:\yen-sao-store\
│
├── 📂 android\                 ← Project Android (Capacitor)
├── 📂 ios\                     ← Project iOS (Capacitor)
│
├── 📂 prisma\                  ← Cấu hình cơ sở dữ liệu
│   └── schema.prisma           ← Định nghĩa các bảng dữ liệu
│
├── 📂 public\                  ← Hình ảnh, logo (tĩnh)
│
├── 📂 src\                     ← Mã nguồn chính
│   ├── 📂 app\                 ← Các trang web
│   │   ├── page.tsx            ← Trang chủ
│   │   ├── layout.tsx          ← Bố cục chung (header, footer)
│   │   ├── globals.css         ← Kiểu dáng chung
│   │   ├── 📂 about\          ← Trang Về chúng tôi
│   │   ├── 📂 quality\        ← Trang Cam kết chất lượng
│   │   ├── 📂 contact\        ← Trang Liên hệ
│   │   ├── 📂 products\       ← Trang sản phẩm
│   │   ├── 📂 checkout\       ← Trang đặt hàng
│   │   ├── 📂 login\          ← Trang đăng nhập
│   │   ├── 📂 register\       ← Trang đăng ký
│   │   ├── 📂 account\        ← Trang tài khoản
│   │   ├── 📂 admin\          ← Trang quản trị
│   │   ├── 📂 blog\           ← Trang blog
│   │   ├── 📂 recommendation\ ← Trang tư vấn AI
│   │   └── 📂 api\            ← API xử lý dữ liệu
│   │
│   ├── 📂 components\          ← Các thành phần giao diện
│   │   ├── 📂 layout\         ← Header, Footer
│   │   ├── 📂 home\           ← Các phần trang chủ
│   │   ├── 📂 product\        ← Card sản phẩm
│   │   ├── 📂 cart\           ← Giỏ hàng
│   │   └── 📂 chatbot\        ← Widget chatbot
│   │
│   ├── 📂 contexts\            ← Quản lý trạng thái (giỏ hàng)
│   ├── 📂 lib\                 ← Thư viện & tiện ích
│   │   ├── auth.ts             ← Xác thực đăng nhập
│   │   ├── prisma.ts           ← Kết nối cơ sở dữ liệu
│   │   ├── utils.ts            ← Các hàm tiện ích
│   │   ├── constants.ts        ← ⭐ Hằng số (tên, SĐT, email, địa chỉ)
│   │   └── mockData.ts         ← Dữ liệu mẫu
│   │
│   └── 📂 types\               ← Kiểu dữ liệu TypeScript
│
├── .env                        ← ⚙️ Cấu hình (SỬA FILE NÀY để kết nối DB)
├── .env.example                ← Mẫu cấu hình
├── capacitor.config.ts         ← ⚙️ Cấu hình app mobile (Capacitor)
├── next.config.ts              ← Cấu hình Next.js (web + mobile)
├── tailwind.config.ts          ← Cấu hình giao diện (màu sắc, font)
├── package.json                ← Danh sách thư viện sử dụng
└── HUONG_DAN_SU_DUNG.md        ← 📖 File này!
```

---

## 8. Kết Nối Cơ Sở Dữ Liệu MongoDB

Hiện tại website đang chạy với **dữ liệu mẫu** (mock data). Để dùng dữ liệu thật (thêm/sửa/xóa sản phẩm qua Admin, lưu đơn hàng, đăng ký khách hàng...), bạn cần kết nối MongoDB Atlas — dịch vụ database miễn phí trên cloud.

> 💡 **MongoDB Atlas là gì?** Là dịch vụ lưu trữ cơ sở dữ liệu trên mây (cloud) của MongoDB. Gói miễn phí cho **512MB** dung lượng — đủ dùng cho hàng ngàn sản phẩm và đơn hàng.

### Bước 1: Tạo tài khoản MongoDB Atlas (miễn phí)

1. Mở trình duyệt, truy cập: [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Bạn sẽ thấy trang đăng nhập/đăng ký. Có 3 cách đăng ký:
   - 📧 **Đăng ký bằng Email**: Nhấn **"Sign Up"** → Nhập email, mật khẩu → Nhấn **"Create Your Account"**
   - 🔵 **Đăng ký bằng Google**: Nhấn **"Sign Up with Google"** → Chọn tài khoản Google của bạn
   - ⬛ **Đăng ký bằng GitHub**: Nhấn **"Sign Up with GitHub"** (nếu có tài khoản GitHub)
3. Sau khi đăng ký, MongoDB có thể hỏi vài câu khảo sát (mục đích sử dụng, ngôn ngữ lập trình...) → Chọn bất kỳ hoặc nhấn **"Skip"** để bỏ qua
4. ✅ Bạn sẽ được đưa vào trang Dashboard chính của MongoDB Atlas

### Bước 2: Tạo Cluster (nơi lưu dữ liệu)

1. Tại trang Dashboard, nhấn nút **"Build a Database"** (hoặc **"Create a Deployment"** nếu hiện)
   > 📌 Nếu đây là lần đầu, MongoDB có thể tự động hiện bước này luôn
2. Chọn gói **"M0 FREE"** (gói miễn phí — cột bên trái, có ghi **"Free forever"**)
   - ❌ KHÔNG chọn M10, M20... (đây là gói trả phí)
3. Cấu hình cluster:
   - **Provider** (nhà cung cấp cloud): Chọn **AWS** (mặc định) hoặc **Google Cloud** — đều được
   - **Region** (vùng): Chọn vùng gần Việt Nam nhất:
     - Ưu tiên: **Singapore (ap-southeast-1)**
     - Hoặc: **Hong Kong (ap-east-1)**
     - Hoặc: **Tokyo (ap-northeast-1)**
   - **Cluster Name**: Đặt tên, ví dụ `yensao-cluster` (hoặc để mặc định `Cluster0`)
4. Nhấn nút **"Create Deployment"** (nút xanh lá ở góc dưới bên phải)
5. ⏳ Chờ khoảng **1-3 phút** để MongoDB tạo cluster

### Bước 3: Tạo Database User (tài khoản truy cập database)

> 📌 MongoDB thường tự động hiện bước này ngay sau khi tạo cluster. Nếu không, bạn tìm theo hướng dẫn bên dưới.

**Cách 1 — Nếu MongoDB tự hiện form tạo user (ngay sau bước 2):**

1. Bạn sẽ thấy form **"Create a Database User"** với 2 ô nhập
2. Nhập:
   - **Username**: `yensao_admin`
   - **Password**: Nhấn **"Autogenerate Secure Password"** (tự tạo mật khẩu mạnh) hoặc tự đặt
3. ⚠️ **RẤT QUAN TRỌNG**: Nhấn nút **"Copy"** bên cạnh password và **dán vào Notepad lưu lại**. Bạn sẽ cần password này ở Bước 6.
4. Nhấn **"Create Database User"**

**Cách 2 — Nếu bạn cần tạo user sau (hoặc muốn thêm user mới):**

1. Nhìn menu bên trái, tìm mục **"Security"** → Nhấn **"Database Access"**
   > 📌 Menu bên trái có các mục: Database, Security, Network Access, ... Bạn cần tìm mục **Security** rồi bấm **Database Access** bên trong
2. Nhấn nút **"+ Add New Database User"** (nút xanh lá ở góc phải)
3. Trong form hiện ra:
   - **Authentication Method**: Chọn **"Password"** (mặc định)
   - **Username**: Nhập `yensao_admin`
   - **Password**: Nhập mật khẩu mạnh và **ghi lại vào Notepad**
   - **Database User Privileges**: Chọn **"Read and write to any database"** (mặc định)
4. Nhấn **"Add User"** ở cuối form

### Bước 4: Cho phép kết nối từ mọi nơi (Network Access)

> 📌 Bước này cho phép website (và máy tính của bạn) kết nối đến database. Nếu bỏ qua, sẽ bị lỗi kết nối.

**Cách 1 — Nếu MongoDB tự hiện sau bước 3:**

1. Bạn sẽ thấy form **"Where would you like to connect from?"**
2. Nhấn **"Add My Current IP Address"** hoặc chọn **"Allow Access from Anywhere"**
3. Nhấn **"Finish and Close"** (hoặc **"Done"**)

**Cách 2 — Nếu bạn cần thêm IP sau:**

1. Nhìn menu bên trái, tìm mục **"Security"** → Nhấn **"Network Access"**
2. Nhấn nút **"+ Add IP Address"** (nút xanh lá ở góc phải)
3. Trong popup hiện ra:
   - Nhấn nút **"ALLOW ACCESS FROM ANYWHERE"** — ô **Access List Entry** sẽ tự điền `0.0.0.0/0`
   - Hoặc nhấn **"ADD CURRENT IP ADDRESS"** nếu chỉ muốn cho phép từ máy hiện tại
4. Nhấn **"Confirm"**
5. ⏳ Chờ vài giây, trạng thái sẽ chuyển từ **"Pending"** sang **"Active"**

> ⚠️ **Khuyến nghị**: Dùng **"Allow Access from Anywhere"** cho đơn giản, đặc biệt khi deploy lên Vercel (vì Vercel có IP thay đổi).

### Bước 5: Lấy Connection String (chuỗi kết nối)

1. Nhìn menu bên trái → Nhấn **"Database"** (mục đầu tiên, có biểu tượng hình trụ)
2. Bạn sẽ thấy cluster vừa tạo (ví dụ `Cluster0` hoặc `yensao-cluster`)
3. Nhấn nút **"Connect"** (nút trắng bên cạnh tên cluster)
4. Một popup hiện ra với các tùy chọn kết nối. Nhấn **"Drivers"** (mục đầu tiên, có biểu tượng `<>`)
   > 📌 Trên giao diện mới, mục này có thể ghi là **"Connect your application"** hoặc **"Drivers"**
5. Trong bước tiếp, bạn sẽ thấy:
   - **Driver**: Chọn **Node.js** (thường là mặc định)
   - **Version**: Để mặc định
6. Phía dưới có ô chứa **connection string** dạng:
   ```
   mongodb+srv://yensao_admin:<db_password>@yensao-cluster.abc123.mongodb.net/?retryWrites=true&w=majority&appName=yensao-cluster
   ```
7. Nhấn nút **"Copy"** (biểu tượng 📋) bên cạnh chuỗi này
8. **Dán vào Notepad** để chỉnh sửa ở bước tiếp

### Bước 6: Cập nhật file `.env` trên máy tính

1. Mở thư mục `D:\yen-sao-store` trong File Explorer
2. Tìm file tên **`.env`**
   > 📌 Nếu không thấy file `.env`, có thể bị ẩn. Trong File Explorer: nhấn **"View"** (Xem) trên thanh menu → tích chọn **"Hidden items"** (Các mục ẩn) hoặc **"File name extensions"** (Phần mở rộng tên tệp)
3. Nhấn chuột phải vào file `.env` → Chọn **"Open with"** → **"Notepad"** (hoặc Visual Studio Code)
4. Tìm dòng bắt đầu bằng `DATABASE_URL=`, nội dung hiện tại là:
   ```
   DATABASE_URL="mongodb+srv://placeholder:placeholder@cluster0.xxxxx.mongodb.net/yensao?retryWrites=true&w=majority"
   ```
5. **Xóa toàn bộ dòng đó** và thay bằng connection string thật. Bạn cần chỉnh sửa chuỗi đã copy ở Bước 5:
   - Thay `<db_password>` bằng password thật đã tạo ở Bước 3
   - Thêm tên database `yensao` vào trước dấu `?`

   **Ví dụ — Trước khi sửa** (chuỗi copy từ MongoDB):
   ```
   mongodb+srv://yensao_admin:<db_password>@yensao-cluster.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

   **Sau khi sửa** (dòng hoàn chỉnh trong file .env):
   ```
   DATABASE_URL="mongodb+srv://yensao_admin:MatKhauCuaBan@yensao-cluster.abc123.mongodb.net/yensao?retryWrites=true&w=majority"
   ```

   > ⚠️ **Chú ý các điểm quan trọng:**
   > - Thay `<db_password>` bằng **mật khẩu thật** (không có dấu `<>`)
   > - Thêm `/yensao` trước dấu `?` (đây là tên database)
   > - Phải có dấu `"` bọc cả chuỗi
   > - Nếu mật khẩu có ký tự đặc biệt (`@`, `#`, `!`, `%`...) thì cần mã hóa URL (ví dụ `@` → `%40`). Cách đơn giản nhất: **đặt mật khẩu chỉ gồm chữ và số** để tránh lỗi.

6. Nhấn **Ctrl + S** để lưu file
7. Đóng Notepad

### Bước 7: Đồng bộ cấu trúc database

Bước này tạo các "bảng" (collections) trong database để website sử dụng.

1. Mở Command Prompt tại thư mục `D:\yen-sao-store` (xem lại [Bước 2 mục 3](#3-hướng-dẫn-cài-đặt-từng-bước) nếu quên cách mở)
2. Gõ lệnh sau rồi nhấn Enter:
   ```
   npx prisma db push
   ```
3. ⏳ Chờ khoảng **10-30 giây**

4. ✅ **Thành công** khi thấy dòng:
   ```
   Your database is now in sync with your Prisma schema.
   ```

5. ❌ **Nếu báo lỗi**, kiểm tra lại:
   - Connection string trong file `.env` đã đúng chưa? (đặc biệt password)
   - Đã cho phép IP ở Bước 4 chưa? (Network Access)
   - Máy tính có đang kết nối internet không?
   - Thử chạy lại lệnh `npx prisma db push`

### Bước 8: Kiểm tra kết nối

1. Chạy website: `npm run dev`
2. Mở trình duyệt vào `http://localhost:3000`
3. Thử đăng ký tài khoản mới hoặc đăng nhập
4. Nếu hoạt động bình thường → ✅ Kết nối database thành công!

> 💡 **Sau khi kết nối MongoDB:**
> - Dữ liệu sản phẩm, đơn hàng, khách hàng sẽ được lưu **thật** vào database
> - Bạn có thể thêm/sửa/xóa sản phẩm qua trang Admin và dữ liệu sẽ được lưu lại
> - Nếu tắt máy rồi mở lại, dữ liệu vẫn còn (vì lưu trên cloud)

---

## 9. Triển Khai Lên Internet (Deploy)

Để website có thể truy cập từ bất kỳ đâu (không chỉ trên máy tính của bạn), bạn cần **deploy** (triển khai) lên server. Hướng dẫn này dùng **Vercel** (miễn phí) kết hợp **GitHub** (miễn phí).

> 💡 **Tổng quan quy trình:**
> ```
> Code trên máy bạn → Đẩy lên GitHub → Vercel tự động lấy từ GitHub → Website online
> ```

### 9.1. Cài đặt Git trên máy tính (chỉ cần 1 lần)

Git là phần mềm quản lý code, cần thiết để đẩy code lên GitHub.

1. Truy cập: [https://git-scm.com/downloads/win](https://git-scm.com/downloads/win)
2. Nhấn **"Click here to download"** để tải file cài đặt (ví dụ `Git-2.47.1-64-bit.exe`)
3. Chạy file cài đặt vừa tải:
   - Nhấn **"Next"** liên tục (giữ mặc định tất cả tùy chọn)
   - Nhấn **"Install"**
   - Nhấn **"Finish"**
4. **Kiểm tra cài đặt thành công:**
   - Mở **Command Prompt** mới (đóng cái cũ nếu đang mở, mở lại)
   - Gõ: `git --version`
   - Nếu hiện `git version 2.xx.x` → ✅ Cài thành công

### 9.2. Tạo tài khoản GitHub (chỉ cần 1 lần)

GitHub là nơi lưu trữ code trên internet, giống "Google Drive cho code".

1. Truy cập: [https://github.com](https://github.com)
2. Nhấn **"Sign up"** (góc trên bên phải)
3. Điền thông tin:
   - **Email**: Nhập email của bạn
   - **Password**: Đặt mật khẩu (ít nhất 8 ký tự)
   - **Username**: Đặt tên người dùng (ví dụ: `yensaobinhan`) — tên này sẽ hiện trong link
4. Nhấn **"Continue"** → Xác minh captcha → Nhấn **"Create account"**
5. Vào email kiểm tra mã xác nhận, nhập mã vào GitHub
6. ✅ Tài khoản GitHub đã sẵn sàng

### 9.3. Tạo Repository trên GitHub (nơi chứa code)

1. Đăng nhập GitHub, nhấn nút **"+"** (dấu cộng) ở góc trên bên phải → Chọn **"New repository"**
2. Điền thông tin repository:
   - **Repository name**: `yen-sao-store`
   - **Description** (mô tả, tùy chọn): `Website bán yến sào`
   - **Visibility**: Chọn **"Private"** (riêng tư — chỉ bạn thấy code) hoặc **"Public"** (công khai)
   - ❌ **KHÔNG tích** vào "Add a README file"
   - ❌ **KHÔNG tích** vào "Add .gitignore"
   - ❌ **KHÔNG tích** vào "Choose a license"
   > ⚠️ Để trống 3 ô trên để tránh xung đột khi đẩy code lên
3. Nhấn **"Create repository"** (nút xanh lá ở cuối trang)
4. Trang tiếp theo sẽ hiện hướng dẫn — **giữ trang này mở**, bạn sẽ cần dùng link ở bước sau

### 9.4. Đẩy code lên GitHub (lần đầu)

1. Mở **Command Prompt** tại thư mục `D:\yen-sao-store`
2. Chạy **lần lượt từng lệnh** sau (gõ 1 lệnh → nhấn Enter → chờ xong → gõ lệnh tiếp):

   **Lệnh 1** — Cấu hình tên và email (chỉ cần 1 lần):
   ```
   git config --global user.name "Ten Cua Ban"
   git config --global user.email "email@cuaban.com"
   ```
   > 📌 Thay `Ten Cua Ban` và `email@cuaban.com` bằng tên và email thật của bạn

   **Lệnh 2** — Thêm tất cả file vào Git:
   ```
   git add .
   ```
   > Lệnh này không hiện gì là bình thường

   **Lệnh 3** — Lưu lại phiên bản đầu tiên:
   ```
   git commit -m "Phien ban dau tien"
   ```

   **Lệnh 4** — Kết nối với GitHub (thay `YOUR_USERNAME` bằng username GitHub của bạn):
   ```
   git remote add origin https://github.com/YOUR_USERNAME/yen-sao-store.git
   ```
   > 📌 Bạn có thể copy link chính xác từ trang GitHub đã mở ở bước 9.3
   >
   > ⚠️ Nếu báo lỗi `remote origin already exists`, chạy lệnh này trước: `git remote remove origin`, rồi chạy lại lệnh trên

   **Lệnh 5** — Đổi tên nhánh chính:
   ```
   git branch -M main
   ```

   **Lệnh 6** — Đẩy code lên GitHub:
   ```
   git push -u origin main
   ```

3. **Lần đầu tiên**, Git sẽ hỏi đăng nhập:
   - Một cửa sổ trình duyệt sẽ mở ra yêu cầu đăng nhập GitHub
   - Nhấn **"Authorize"** (Cho phép) để Git kết nối với GitHub
   - Quay lại Command Prompt, lệnh sẽ tự hoàn thành

4. ✅ **Thành công** khi thấy dòng chứa:
   ```
   Branch 'main' set up to track remote branch 'main' from 'origin'.
   ```

5. Mở lại trang GitHub trên trình duyệt, nhấn **F5** (refresh) — bạn sẽ thấy code đã xuất hiện trên GitHub

### 9.5. Tạo tài khoản Vercel và Deploy

**Vercel** là dịch vụ hosting miễn phí, tối ưu cho Next.js. Website sẽ được cấp link miễn phí (ví dụ: `https://yen-sao-store.vercel.app`).

**Tạo tài khoản Vercel:**

1. Truy cập: [https://vercel.com](https://vercel.com)
2. Nhấn **"Sign Up"** (góc trên bên phải)
3. Chọn **"Continue with GitHub"** (đăng ký bằng tài khoản GitHub vừa tạo)
   > 📌 Dùng GitHub để đăng ký Vercel là cách đơn giản nhất, vì Vercel sẽ tự động kết nối với GitHub
4. Nhấn **"Authorize Vercel"** nếu GitHub hỏi quyền truy cập
5. Vercel có thể hỏi tên team → Chọn **"Hobby"** (miễn phí) → Nhấn **"Continue"**

**Deploy website:**

1. Tại trang Dashboard của Vercel, nhấn nút **"Add New..."** (góc trên bên phải) → Chọn **"Project"**
   > 📌 Hoặc nhấn nút **"Import Project"** nếu đây là lần đầu
2. Bạn sẽ thấy danh sách repository GitHub. Tìm **`yen-sao-store`** → Nhấn **"Import"**
   > 📌 Nếu không thấy repository, nhấn **"Adjust GitHub App Permissions"** → Trang GitHub mở ra → Chọn **"All repositories"** hoặc tích chọn `yen-sao-store` → Nhấn **"Save"** → Quay lại Vercel
3. Trang cấu hình project hiện ra. Vercel sẽ tự nhận diện **Next.js**:
   - **Project Name**: Để mặc định hoặc sửa lại (tên này sẽ nằm trong URL, ví dụ: `yen-sao-store.vercel.app`)
   - **Framework Preset**: Phải hiện **"Next.js"** — nếu không, chọn lại
   - **Root Directory**: Để trống (mặc định `./`)
4. ⚠️ **QUAN TRỌNG — Thêm Environment Variables:**
   - Nhấn mở mục **"Environment Variables"** (bên dưới phần cấu hình)
   - Thêm **từng biến** bằng cách nhập Name và Value rồi nhấn **"Add"**:

   | Name (Tên) | Value (Giá trị) |
   |------------|-----------------|
   | `DATABASE_URL` | `mongodb+srv://yensao_admin:hzduongpro@yensao-cluster.pkf0r2o.mongodb.net/yensao?appName=yensao-cluster` |
   | `AUTH_SECRET` | `your-super-secret-key-change-in-production-yensao-2026` |
   | `NEXTAUTH_URL` | `https://yen-sao-store.vercel.app` (thay bằng URL thật sau khi deploy) |
   | `NEXT_PUBLIC_APP_URL` | `https://yen-sao-store.vercel.app` (thay bằng URL thật sau khi deploy) |
   | `NEXT_PUBLIC_APP_NAME` | `Yến Sào Bình An` |

   > 📌 **Cách thêm từng biến**: Nhập tên vào ô **"Key"** (hoặc **"Name"**) → Nhập giá trị vào ô **"Value"** → Nhấn **"Add"** → Lặp lại cho biến tiếp theo
   >
   > 🚨 **CẢNH BÁO CỰC KỲ QUAN TRỌNG:** Tuyệt đối **KHÔNG gõ dấu ngoặc kép `"`** ở phần Value khi điền trên giao diện web của Vercel (khác với khi làm ở file `.env` trên máy tính). Nếu bạn điền dấu `"` vào Vercel, trang web sẽ bị sập vì lỗi chứa ký tự lạ trong đường dẫn cơ sở dữ liệu.
   >
   > 📌 **Lấy giá trị `DATABASE_URL`**: Copy nội dung link từ file `.env` trên máy tính (nhớ KHÔNG lấy dấu `"` ở 2 đầu).
   >
   > ⚠️ **`NEXTAUTH_URL`**: Lần đầu deploy chưa biết URL chính xác → Nhập tạm `https://yen-sao-store.vercel.app`. Sau khi deploy xong, quay lại sửa cho đúng (xem Bước cập nhật URL bên dưới).

5. Nhấn nút **"Deploy"** (nút lớn màu xanh/trắng)
6. ⏳ Chờ khoảng **1-3 phút**. Vercel sẽ hiện log quá trình build
7. ✅ **Thành công** khi thấy trang chúc mừng với ảnh confetti 🎉 và link website

**Sau khi deploy — Cập nhật URL chính xác:**

1. Link website của bạn sẽ dạng: `https://yen-sao-store.vercel.app` (hoặc tên khác do Vercel cấp)
2. Quay lại Vercel Dashboard → Nhấn vào project `yen-sao-store` → Nhấn tab **"Settings"** (trên cùng)
3. Nhấn **"Environment Variables"** (menu bên trái)
4. Tìm biến `NEXTAUTH_URL` → Nhấn nút **"Edit"** (biểu tượng bút chì ✏️) → Sửa value thành URL thật → Nhấn **"Save"**
5. Làm tương tự cho `NEXT_PUBLIC_APP_URL`
6. Nhấn tab **"Deployments"** (trên cùng) → Tìm deployment mới nhất → Nhấn nút **"⋮"** (3 chấm dọc) → Chọn **"Redeploy"** → Nhấn **"Redeploy"** lần nữa

### 9.6. Cập nhật website sau khi Deploy

Mỗi lần bạn sửa code trên máy và muốn website online cập nhật:

1. Mở Command Prompt tại `D:\yen-sao-store`
2. Chạy lần lượt 3 lệnh:
   ```
   git add .
   git commit -m "Cap nhat noi dung"
   git push
   ```
3. ✅ Vercel sẽ **tự động phát hiện** thay đổi trên GitHub và deploy lại trong **1-3 phút**
4. Bạn không cần làm gì thêm trên Vercel!

> 💡 **Mẹo:** Vào [https://vercel.com](https://vercel.com) → Dashboard → Nhấn vào project → Tab **"Deployments"** để xem trạng thái deploy mới nhất (✅ Ready = thành công, 🔴 Error = lỗi)

### 9.7. Xử lý lỗi thường gặp khi Deploy

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Build failed | Thiếu Environment Variables | Kiểm tra đã thêm đủ 5 biến ở bước 9.5 chưa |
| Build failed — Prisma | Thiếu `DATABASE_URL` hoặc sai connection string | Kiểm tra lại biến `DATABASE_URL` trên Vercel |
| 500 Internal Server Error | Lỗi kết nối database | Kiểm tra Network Access trên MongoDB Atlas đã cho **"Allow Access from Anywhere"** chưa |
| `git push` bị lỗi | Chưa đăng nhập GitHub | Chạy lại `git push`, đăng nhập khi được hỏi |
| Repository not found | Link remote sai | Chạy `git remote -v` để kiểm tra, sửa lại bằng `git remote set-url origin URL_DUNG` |

### 9.8. Build cho production (tự host — nâng cao)

Nếu bạn có server riêng (VPS, Hosting) và muốn tự deploy thay vì dùng Vercel:

```
npm run build
npm start
```

> ⚠️ Cách này cần kiến thức quản trị server (Linux, Nginx, PM2, SSL...). Nếu bạn không rành, dùng Vercel là lựa chọn đơn giản nhất.

---

## 10. Build Ứng Dụng Mobile (Android & iOS)

Website đã được tích hợp **Capacitor.js** — công nghệ cho phép "bọc" website thành ứng dụng native cho điện thoại. App sẽ hoạt động **giống hệt website** nhưng cài được trên màn hình chính điện thoại.

### 10.1. Yêu Cầu

| Nền tảng | Phần mềm cần cài | Hệ điều hành | Chi phí publish lên Store |
|----------|-------------------|-------------|----------------|
| 🤖 **Android** | Android Studio | Windows / Mac | $25 (một lần duy nhất) |
| 🍎 **iOS (iPhone)** | Xcode | **Chỉ Mac** | $99/năm |

> ⚠️ **Quan trọng:** Build app iOS (iPhone) **bắt buộc phải có máy Mac** cài Xcode. Không thể build trên Windows.

### 10.2. Cài Đặt Android Studio (chỉ cần 1 lần)

**Bước 1 — Tải Android Studio:**

1. Truy cập: [https://developer.android.com/studio](https://developer.android.com/studio)
2. Nhấn nút **"Download Android Studio"** (nút lớn màu xanh, ở giữa trang)
3. Trong popup hiện ra, tích chọn **"I have read and agree..."** → Nhấn **"Download"**
4. Chờ tải file (khoảng **1-2 GB**)

**Bước 2 — Cài đặt:**

1. Chạy file `.exe` vừa tải (ví dụ `android-studio-2024.x.x-windows.exe`)
2. Nhấn **"Next"** ở bước Welcome
3. Bước **Choose Components**: Đảm bảo đã tích chọn:
   - ✅ **Android Studio** (bắt buộc)
   - ✅ **Android Virtual Device** (máy ảo để test app)
4. Nhấn **"Next"** → Chọn thư mục cài đặt (để mặc định) → Nhấn **"Next"** → Nhấn **"Install"**
5. ⏳ Chờ cài đặt (khoảng 3-5 phút)
6. Nhấn **"Finish"** và mở Android Studio

**Bước 3 — Thiết lập lần đầu:**

1. Android Studio mở ra, hiện **"Setup Wizard"** → Nhấn **"Next"**
2. Chọn **"Standard"** (cài mặc định) → Nhấn **"Next"**
3. Chọn giao diện (sáng/tối) → Nhấn **"Next"**
4. Bước **Verify Settings**: Nhấn **"Finish"**
5. ⏳ Chờ tải SDK và các công cụ (khoảng **2-5 GB**, mất 5-15 phút tùy mạng)
6. Nhấn **"Finish"** khi xong

**Bước 4 — Kiểm tra SDK (nếu cần):**

1. Trong Android Studio, nhấn menu **"File"** → **"Settings"** (hoặc **"Android Studio" → "Preferences"** trên Mac)
2. Hoặc từ Welcome Screen: nhấn **"More Actions"** (hoặc biểu tượng ⚙️) → **"SDK Manager"**
3. Tab **"SDK Platforms"**:
   - ✅ Tích chọn **Android 14.0 (API 34)** hoặc phiên bản mới nhất
4. Tab **"SDK Tools"**:
   - ✅ Tích chọn **Android SDK Build-Tools** (thường đã tích sẵn)
   - ✅ Tích chọn **Android SDK Command-line Tools**
5. Nhấn **"Apply"** → Nhấn **"OK"** trong popup xác nhận → Chờ tải xong → Nhấn **"Finish"**

### 10.3. Build App Android (Từng Bước Chi Tiết)

Mở **Command Prompt** tại `D:\yen-sao-store`, chạy lần lượt:

**Bước 1** — Build bản mobile:
```
npm run build:mobile
```
⏳ Chờ khoảng **1-3 phút**. Lệnh này sẽ:
- Tạo bản website tĩnh tối ưu cho mobile (nằm trong thư mục `out/`)
- Tự động đồng bộ vào project Android (thư mục `android/`)

✅ **Thành công** khi thấy các dòng cuối:
```
✔ Copying web assets from out to android/app/src/main/assets/public
✔ update android
```

❌ **Nếu lỗi**, xem phần [10.6. Xử lý lỗi](#106-xử-lý-lỗi-thường-gặp-khi-build-mobile)

**Bước 2** — Mở Android Studio:
```
npm run cap:android
```
Android Studio sẽ tự động mở project Android. Lần đầu mở, Android Studio sẽ:
- Hiện thanh progress **"Gradle sync"** ở phía dưới → ⏳ Chờ hoàn thành (1-3 phút)
- Khi thanh progress biến mất hoặc hiện ✅ → Sẵn sàng!

> ⚠️ Nếu Android Studio báo lỗi Gradle hoặc SDK, nhấn vào link **"Install missing SDK"** hoặc **"Update Gradle"** mà Android Studio gợi ý.

**Bước 3** — Tạo máy ảo Android (Emulator) để test:

> 📌 Bước này chỉ cần làm **1 lần**. Nếu bạn có điện thoại Android thật, có thể bỏ qua bước này.

1. Trong Android Studio, nhấn **"Tools"** (thanh menu trên cùng) → **"Device Manager"**
   - Hoặc nhấn biểu tượng 📱 ở thanh bên phải
2. Nhấn nút **"Create Virtual Device"** (hoặc nút **"+"**)
3. Chọn loại thiết bị:
   - Chọn **"Phone"** ở bên trái
   - Chọn **"Pixel 7"** (hoặc bất kỳ điện thoại nào) ở danh sách → Nhấn **"Next"**
4. Chọn phiên bản Android:
   - Chọn **"API 34"** (Android 14) → Nếu chưa tải, nhấn **"Download"** bên cạnh → Chờ tải xong (1-2 GB)
   - Nhấn **"Next"**
5. Đặt tên (để mặc định) → Nhấn **"Finish"**
6. Máy ảo đã được tạo, bạn sẽ thấy nó trong danh sách Device Manager

**Bước 4** — Chạy app:

1. Ở thanh toolbar phía trên Android Studio, bạn sẽ thấy:
   - Ô chọn thiết bị (dropdown) — chọn máy ảo vừa tạo (ví dụ: `Pixel 7 API 34`) hoặc điện thoại thật đã cắm USB
   - Nút **▶ Run** (hình tam giác xanh lá)
2. Nhấn nút **▶ Run**
3. ⏳ Lần đầu sẽ mất **1-3 phút** để khởi động máy ảo và cài app
4. ✅ App sẽ tự động mở trên máy ảo/điện thoại!

> 💡 **Chạy trên điện thoại Android thật:**
> 1. Trên điện thoại: Vào **Cài đặt** → **Thông tin điện thoại** → Nhấn **"Số bản dựng" 7 lần** để bật chế độ nhà phát triển
> 2. Vào **Cài đặt** → **Tùy chọn nhà phát triển** → Bật **"Gỡ lỗi USB"** (USB Debugging)
> 3. Cắm điện thoại vào máy tính qua cáp USB
> 4. Trên điện thoại, nhấn **"Cho phép"** khi được hỏi về USB Debugging
> 5. Trong Android Studio, chọn tên điện thoại ở dropdown thiết bị → Nhấn **▶ Run**

**Bước 5** — Xuất file APK (để cài trên điện thoại khác):

1. Trong Android Studio, nhấn menu **"Build"** (thanh menu trên cùng)
2. Chọn **"Build Bundle(s) / APK(s)"** → Chọn **"Build APK(s)"**
3. ⏳ Chờ build (khoảng 1-2 phút)
4. Khi xong, góc dưới bên phải hiện thông báo **"Build completed"** kèm link **"locate"** → Nhấn **"locate"** để mở thư mục chứa file APK
5. File APK nằm tại: `android/app/build/outputs/apk/debug/app-debug.apk`
6. **Gửi file APK** này qua Zalo/Messenger/Email cho bất kỳ ai → Họ tải về và cài lên điện thoại Android

> ⚠️ Khi cài APK, điện thoại có thể cảnh báo **"Ứng dụng không xác định"** → Nhấn **"Cài đặt"** / **"Cho phép"** để tiếp tục.

### 10.4. Build App iOS (Cần Mac)

> 💡 Nếu bạn không có Mac, nhờ người có Mac thực hiện phần này.

**Bước 1** — Cài Xcode:

1. Trên Mac, mở **App Store** (biểu tượng chữ A trên Dock)
2. Tìm kiếm **"Xcode"** → Nhấn **"Get"** (Tải) → Nhấn **"Install"**
3. ⏳ Chờ tải và cài đặt (khoảng **10-15 GB**, mất 15-30 phút tùy mạng)
4. Mở Xcode sau khi cài xong, nhấn **"Agree"** để đồng ý license
5. Xcode sẽ tự cài thêm các component → Chờ hoàn tất

**Bước 2** — Copy dự án sang Mac:

1. Sao chép toàn bộ thư mục `yen-sao-store` vào Mac (qua USB, Google Drive, hoặc tải từ GitHub)
2. Đặt ở vị trí dễ tìm, ví dụ: `~/Desktop/yen-sao-store`

**Bước 3** — Build trên Mac:

1. Mở **Terminal** trên Mac (tìm trong Spotlight: nhấn `Cmd + Space`, gõ `Terminal`)
2. Di chuyển tới thư mục dự án:
   ```
   cd ~/Desktop/yen-sao-store
   ```
3. Cài đặt Node.js trên Mac (nếu chưa cài): Tải tại [https://nodejs.org](https://nodejs.org)
4. Chạy lần lượt:
   ```
   npm install
   npm run build:mobile
   npm run cap:ios
   ```

**Bước 4** — Sử dụng Xcode:

1. Xcode sẽ tự động mở project iOS
2. Ở thanh trên cùng bên trái, chọn thiết bị giả lập (ví dụ: **"iPhone 15"**)
3. Nhấn nút **▶** (Run) hoặc nhấn `Cmd + R`
4. ⏳ Chờ build và khởi động giả lập (1-3 phút lần đầu)
5. ✅ App sẽ hiện trên iPhone giả lập

**Để publish lên App Store:**

1. Cần đăng ký **Apple Developer Program**: [https://developer.apple.com/programs/](https://developer.apple.com/programs/) — Chi phí **$99/năm**
2. Trong Xcode: Vào **Signing & Capabilities** → Chọn Team (tài khoản Developer đã đăng ký)
3. Menu **Product** → **Archive** → Upload lên App Store Connect
4. Vào [https://appstoreconnect.apple.com](https://appstoreconnect.apple.com) để gửi review

### 10.5. Cập Nhật App Sau Khi Sửa Website

Mỗi khi bạn thay đổi nội dung website và muốn cập nhật app:

```
npm run build:mobile
```

Sau đó:
- **Android**: Mở Android Studio (hoặc chạy `npm run cap:android`) → Nhấn **▶ Run** lại
- **iOS**: Mở Xcode (hoặc chạy `npm run cap:ios`) → Nhấn **▶ Run** lại
- **Nếu đã gửi file APK cho người khác**: Cần build APK mới (Bước 5 mục 10.3) và gửi lại

### 10.6. Xử Lý Lỗi Thường Gặp Khi Build Mobile

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `npm run build:mobile` báo lỗi | Có lỗi trong code website | Chạy `npm run dev` trước để kiểm tra website chạy bình thường không |
| Thiếu thư mục `out/` | Build chưa thành công | Xóa thư mục `.next` và `out` (nếu có), chạy lại `npm run build:mobile` |
| Android Studio báo **"Gradle sync failed"** | Thiếu SDK hoặc Gradle chưa tải | Nhấn vào link gợi ý sửa lỗi trong Android Studio, thường là **"Install missing SDK"** |
| Máy ảo khởi động rất chậm | RAM hoặc CPU không đủ | Tắt bớt ứng dụng khác, hoặc test trên điện thoại thật thay vì máy ảo |
| `cap sync` báo lỗi | Chưa cài Capacitor đúng | Chạy `npm install` rồi thử lại |

### 10.7. Lưu Ý Quan Trọng

- 📱 App mobile giữ **100% giao diện** giống website
- 🔗 Các tính năng đặt hàng, giỏ hàng, tư vấn AI đều hoạt động bình thường
- 🌐 Chức năng đăng ký/đăng nhập sẽ cần backend server (đã Deploy) khi publish thật
- 🔄 **App ID** (`com.yensaobinhan.app`) có thể đổi trong file `capacitor.config.ts`, nhưng **nếu đã publish lên Store thì đổi = tạo app mới**
- 📦 Để publish lên Google Play Store: Cần tạo tài khoản Google Play Developer ($25 một lần) tại [https://play.google.com/console](https://play.google.com/console)

---

## 11. Mối Quan Hệ Giữa MongoDB, Deploy Và Mobile App

Đây là câu hỏi rất quan trọng. Dưới đây giải thích rõ thứ tự và mối quan hệ giữa các bước:

### 11.1. Tóm Tắt Nhanh

| Bước | Bắt buộc để build Mobile App? | Ghi chú |
|------|-------------------------------|--------|
| 🗄️ Kết nối MongoDB | ❌ **Không bắt buộc** | App vẫn chạy được với dữ liệu mẫu |
| 🌐 Deploy lên internet | ❌ **Không bắt buộc** | App mobile hoạt động offline với dữ liệu tĩnh |
| 🛠️ Cài Android Studio / Xcode | ✅ **Bắt buộc** | Cần để build file APK / IPA |

### 11.2. Giải Thích Chi Tiết

#### Trường hợp 1: Build app mobile KHÔNG CẦN MongoDB & Deploy

Bạn hoàn toàn **có thể build app mobile ngay** mà không cần kết nối MongoDB hay deploy website. Khi đó:

- ✅ App hiển thị đầy đủ giao diện (trang chủ, sản phẩm, giỏ hàng, tư vấn AI...)
- ✅ Dữ liệu sản phẩm lấy từ **dữ liệu mẫu** (mock data) đã có sẵn trong code
- ✅ Tính năng giỏ hàng, đặt hàng hoạt động (nhưng đơn hàng không lưu vào database thật)
- ⚠️ Đăng nhập / đăng ký sẽ ở chế độ **mô phỏng** (không lưu thật)
- ⚠️ Đơn hàng chỉ hiển thị trên app, không có backend xử lý

**Phù hợp khi:** Bạn muốn xem thử app trên điện thoại, demo cho đối tác, hoặc kiểm tra giao diện.

```
npm run build:mobile
npm run cap:android
```

#### Trường hợp 2: Build app mobile CÓ MongoDB nhưng CHƯA Deploy

- ✅ Dữ liệu sản phẩm thật từ database
- ⚠️ App chỉ hoạt động đầy đủ khi **điện thoại cùng mạng WiFi** với máy tính đang chạy server
- ⚠️ Không thể dùng ngoài nhà (vì server đang chạy trên máy tính cá nhân)

**Phù hợp khi:** Test với dữ liệu thật trong mạng nội bộ.

#### Trường hợp 3: Build app mobile CÓ MongoDB VÀ ĐÃ Deploy (✅ Đầy đủ nhất)

Đây là trường hợp tốt nhất để **publish lên Google Play / App Store**:

- ✅ Dữ liệu sản phẩm thật từ MongoDB
- ✅ Đăng nhập / đăng ký hoạt động thật
- ✅ Đơn hàng được lưu và xử lý trên server
- ✅ App hoạt động ở mọi nơi có internet
- ✅ Admin có thể quản lý từ website

**Thứ tự thực hiện khuyến nghị:**

```
1. Kết nối MongoDB (Mục 8)     → Có dữ liệu thật
2. Deploy lên Vercel (Mục 9)   → Website online
3. Cập nhật URL server trong   → App gọi API đến server thật
   capacitor.config.ts               
4. Build mobile (Mục 10)       → App hoàn chỉnh
```

### 11.3. Sơ Đồ Quyết Định

```
🤔 Bạn muốn gì?
│
├── 📲 Chỉ xem thử app trên điện thoại?
│   └── ✅ Build ngay: npm run build:mobile
│       (Không cần MongoDB, không cần Deploy)
│
├── 🧪 Test với dữ liệu thật trong nhà?
│   └── ⚠️ Cần: MongoDB + chạy server local
│       (Chưa cần Deploy)
│
└── 🚀 Publish lên Store cho khách dùng?
    └── ✅ Cần cả 3: MongoDB + Deploy + Build mobile
```

---

## 12. Cập Nhật Nội Dung Sau Khi Triển Khai

Sau khi đã deploy website và/hoặc build app mobile, bạn vẫn có thể cập nhật nội dung bất cứ lúc nào.

### 12.1. Cập Nhật Website (Đã Deploy Trên Vercel)

#### Trường hợp A: Sửa nội dung tĩnh (text, hình ảnh, giá cả trong code)

**Bước 1** — Sửa file trên máy tính:
- Mở thư mục `D:\yen-sao-store` bằng Visual Studio Code
- Sửa nội dung cần thay đổi (xem bảng bên dưới)
- Lưu file (`Ctrl + S`)

**Bước 2** — Kiểm tra trên máy trước:
```
npm run dev
```
- Mở `http://localhost:3000` để xem thay đổi
- Đảm bảo mọi thứ hiển thị đúng

**Bước 3** — Đẩy code lên GitHub:
```
git add .
git commit -m "Cập nhật nội dung"
git push
```

**Bước 4** — Vercel tự động cập nhật:
- Vercel sẽ **tự động phát hiện** thay đổi trên GitHub
- Website sẽ được **build lại và deploy** trong khoảng 1-3 phút
- Bạn không cần làm gì thêm! ✅

> 💡 **Mẹo:** Bạn có thể vào [https://vercel.com](https://vercel.com) → Dashboard → xem trạng thái deploy mới nhất.

#### Trường hợp B: Sửa dữ liệu sản phẩm (khi đã có MongoDB)

Khi đã kết nối MongoDB, việc thay đổi dữ liệu **không cần sửa code**:

1. Mở website quản trị: `https://your-domain.vercel.app/admin`
2. Đăng nhập bằng tài khoản admin
3. Vào **Sản phẩm** → Sửa / Thêm / Xóa sản phẩm
4. ✅ Thay đổi có hiệu lực **ngay lập tức** (không cần deploy lại)

> 📌 Tương tự cho: Đơn hàng, Khách hàng, Mã giảm giá — tất cả quản lý qua Admin Dashboard.

### 12.2. Cập Nhật App Mobile (Đã Build)

#### Trường hợp A: App dùng dữ liệu từ server (đã Deploy)

- Nếu bạn chỉ sửa **dữ liệu** (sản phẩm, giá, khuyến mãi) qua Admin Dashboard → **App tự động cập nhật** (vì app gọi API từ server)
- Bạn **không cần build lại app**

#### Trường hợp B: Sửa giao diện app (màu sắc, bố cục, thêm trang mới)

Nếu sửa giao diện hoặc thêm tính năng mới, cần build lại:

**Bước 1** — Sửa code trên máy tính

**Bước 2** — Build lại bản mobile:
```
npm run build:mobile
```

**Bước 3** — Mở Android Studio / Xcode:
```
npm run cap:android
```

**Bước 4** — Build APK/IPA mới và cài lại trên điện thoại

**Bước 5** (nếu đã lên Store) — Upload bản mới lên Google Play / App Store:
- Tăng version trong `android/app/build.gradle` (Android) hoặc Xcode (iOS)
- Build bản release
- Upload lên Store Console
- Chờ Google/Apple review (thường 1-3 ngày)

> ⚠️ **Lưu ý:** Mỗi lần upload lên Store cần **tăng version code**. Ví dụ: 1.0.0 → 1.0.1 → 1.1.0

### 12.3. Bảng Tham Chiếu: Sửa Nội Dung Ở Đâu?

| Muốn sửa | File cần sửa | Cần deploy lại? | Cần build lại app? |
|-----------|-------------|-----------------|--------------------|
| 🏪 **Tên thương hiệu** | `src/lib/constants.ts` → `APP_NAME` | ✅ Có | ✅ Có |
| 📞 **SĐT, Email, Địa chỉ** | `src/lib/constants.ts` → `CONTACT_INFO` | ✅ Có | ✅ Có |
| 🎨 **Màu sắc website** | `tailwind.config.ts` → `colors` | ✅ Có | ✅ Có |
| 📝 **Nội dung blog** | `src/lib/mockData.ts` → `mockBlogPosts` | ✅ Có | ✅ Có |
| 🏠 **Nội dung trang chủ** | `src/app/page.tsx` hoặc `src/components/home/` | ✅ Có | ✅ Có |
| 📜 **Trang Về chúng tôi** | `src/app/about/page.tsx` | ✅ Có | ✅ Có |
| 🛡️ **Trang Cam kết chất lượng** | `src/app/quality/page.tsx` | ✅ Có | ✅ Có |
| 📍 **Google Maps (vị trí)** | `src/lib/constants.ts` → `mapQuery` | ✅ Có | ✅ Có |
| 🛒 **Sản phẩm** (có DB) | Admin Dashboard → Sản phẩm | ❌ Không | ❌ Không |
| 📦 **Đơn hàng** (có DB) | Admin Dashboard → Đơn hàng | ❌ Không | ❌ Không |
| 🎫 **Mã giảm giá** (có DB) | Admin Dashboard → Khuyến mãi | ❌ Không | ❌ Không |
| 🛒 **Sản phẩm** (chưa có DB) | `src/lib/mockData.ts` → `mockProducts` | ✅ Có | ✅ Có |
| 🖼️ **Logo** | Thay file `public/logo.png` (giữ nguyên tên) | ✅ Có | ✅ Có |
| 📸 **Hình sản phẩm** (chưa có DB) | Thay file trong `public/` hoặc sửa URL trong `mockData.ts` | ✅ Có | ✅ Có |

### 12.4. Quy Trình Cập Nhật Tóm Tắt

```
📝 Sửa code trên máy
    ↓
🔍 npm run dev → Kiểm tra trên localhost
    ↓
✅ Ổn rồi?
    ↓
┌─── Website ──────────────────────┐   ┌─── App Mobile ────────────────────┐
│ git add .                        │   │ npm run build:mobile              │
│ git commit -m "Cập nhật"         │   │ npm run cap:android (hoặc ios)    │
│ git push                         │   │ Build APK/IPA trong Studio/Xcode  │
│ → Vercel tự deploy (~2 phút) ✅  │   │ → Cài lại trên điện thoại ✅      │
└──────────────────────────────────┘   └───────────────────────────────────┘
```

---

## 13. Câu Hỏi Thường Gặp (FAQ)

### ❓ Website có hoạt động trên điện thoại không?

✅ **Có!** Website được thiết kế **mobile-first**, tự động điều chỉnh giao diện cho mọi kích thước màn hình: điện thoại, máy tính bảng, máy tính.

### ❓ Khách hàng có thể thanh toán online không?

Hiện tại hỗ trợ **COD (thanh toán khi nhận hàng)**. Cấu trúc code đã sẵn sàng để tích hợp VNPay và MoMo trong tương lai.

### ❓ Dữ liệu sản phẩm ở đâu?

Hiện tại dùng **dữ liệu mẫu** trong file `src/lib/mockData.ts`. Khi kết nối MongoDB, dữ liệu sẽ lưu trong database thật.

### ❓ Làm sao để thêm sản phẩm mới?

**Cách 1 (tạm thời):** Mở file `src/lib/mockData.ts` và thêm sản phẩm vào mảng `mockProducts`.

**Cách 2 (khi có DB):** Dùng trang Admin → Sản phẩm → Thêm sản phẩm.

### ❓ Làm sao thay đổi màu sắc website?

Mở file `tailwind.config.ts`, tìm mục `colors` trong `theme.extend`. Thay đổi mã màu tại đây.

### ❓ Làm sao thay đổi thông tin liên hệ (SĐT, email, địa chỉ)?

Mở file `src/lib/constants.ts`, tìm biến `CONTACT_INFO` và sửa các giá trị. Thông tin sẽ tự động cập nhật trên toàn bộ website (Footer, trang Liên hệ, CTA,...).

```typescript
export const CONTACT_INFO = {
  phone: "0982 812 936",          // Số điện thoại
  phoneHref: "tel:0982812936",    // Link gọi điện
  email: "annguyen.lamviec@gmail.com",  // Email
  emailHref: "mailto:annguyen.lamviec@gmail.com",
  address: "63 Thống Nhất, Xã Thanh Sơn, Tỉnh Phú Thọ",  // Địa chỉ
  mapQuery: "63+Thống+Nhất,+Thanh+Sơn,+Phú+Thọ",  // Cho Google Maps
};
```

### ❓ Làm sao thay đổi tên thương hiệu?

Mở file `src/lib/constants.ts`, sửa biến `APP_NAME` và `APP_DESCRIPTION` ở đầu file.

### ❓ Làm sao thay đổi nội dung blog?

Mở file `src/lib/mockData.ts`, tìm mảng `mockBlogPosts` và chỉnh sửa nội dung.

### ❓ Có thể dùng tiếng Anh không?

Website hiện tại dùng **tiếng Việt**. Cấu trúc code đã được chuẩn bị để hỗ trợ song ngữ (vi/en) trong tương lai.

### ❓ App mobile khác gì website?

App mobile **giống y hệt** website về giao diện và tính năng. Ưu điểm: cài đặt trên màn hình chính, mở nhanh hơn, có thể publish lên Google Play / App Store.

### ❓ Có cần MongoDB và Deploy trước khi build app mobile không?

**Không bắt buộc!** Bạn có thể build app mobile ngay với dữ liệu mẫu. Xem chi tiết tại [Mục 11](#11-mối-quan-hệ-giữa-mongodb-deploy-và-mobile-app).

### ❓ Sau khi deploy, sửa nội dung website thế nào?

Sửa code → `git push` → Vercel tự động deploy lại. Nếu đã có MongoDB, sửa dữ liệu sản phẩm qua Admin Dashboard (không cần deploy lại). Xem chi tiết tại [Mục 12](#12-cập-nhật-nội-dung-sau-khi-triển-khai).

### ❓ Sau khi build app, sửa app thế nào?

Nếu chỉ sửa dữ liệu (sản phẩm, giá) qua Admin → App tự cập nhật. Nếu sửa giao diện → cần chạy `npm run build:mobile` rồi build lại APK. Xem chi tiết tại [Mục 12](#12-cập-nhật-nội-dung-sau-khi-triển-khai).

---

## 14. Xử Lý Sự Cố

### 🔴 Lỗi: "npm is not recognized"

**Nguyên nhân:** Node.js chưa được cài đặt.
**Cách sửa:** Cài Node.js từ [https://nodejs.org](https://nodejs.org), sau đó khởi động lại Command Prompt.

### 🔴 Lỗi: "Module not found"

**Nguyên nhân:** Chưa cài đặt thư viện.
**Cách sửa:** Chạy lệnh `npm install` rồi thử lại.

### 🔴 Lỗi: "Port 3000 is already in use"

**Nguyên nhân:** Có một phiên website khác đang chạy.
**Cách sửa:**
- Tắt tất cả cửa sổ Command Prompt
- Mở lại và chạy `npm run dev`
- Hoặc chạy trên port khác: `npm run dev -- --port 3001`

### 🔴 Lỗi: "ECONNREFUSED" khi kết nối database

**Nguyên nhân:** Connection string MongoDB không đúng, hoặc chưa cho phép IP.
**Cách sửa:** Kiểm tra lại file `.env` và cài đặt Network Access trên MongoDB Atlas.

### 🔴 Website không hiện giao diện đẹp (chỉ chữ trắng trên nền trắng)

**Nguyên nhân:** TailwindCSS chưa được cấu hình đúng.
**Cách sửa:**
1. Dừng server (Ctrl + C)
2. Xóa thư mục `.next`: mở File Explorer, vào `D:\yen-sao-store`, xóa thư mục `.next`
3. Chạy lại `npm run dev`

### 🔴 Trang admin không hiện

**Cách sửa:** Đảm bảo đã đăng nhập bằng tài khoản admin trước (email: `admin@yensao.vn`).

### 🔴 Lỗi build:mobile: "output: export" errors

**Nguyên nhân:** Một số route không tương thích với static export.
**Cách sửa:** Đảm bảo tất cả API routes có `export const dynamic = "force-static"` và dynamic routes có `generateStaticParams()`.

---

## 15. Tài Khoản Demo

| Loại | Email | Mật khẩu | Quyền |
|------|-------|----------|-------|
| 👑 **Admin** | `admin@yensao.vn` | `admin123` | Quản trị toàn bộ |
| 👤 **Khách hàng** | `user@test.com` | `user123` | Xem sản phẩm, đặt hàng |

> ⚠️ **Lưu ý:** Tài khoản demo chỉ hoạt động khi đã kết nối MongoDB và seed dữ liệu. Hiện tại ở chế độ mock, chức năng đăng nhập mô phỏng.

---

## 16. Liên Hệ Hỗ Trợ

Nếu gặp vấn đề trong quá trình sử dụng, bạn có thể:

- 📧 **Email:** annguyen.lamviec@gmail.com
- 📱 **Điện thoại:** 0982 812 936
- 💬 **Chat:** Sử dụng chatbot trên website

---

## 📝 Ghi Chú Thêm

### Các lệnh hay dùng (tham khảo nhanh)

| Mục đích | Lệnh | Ghi chú |
|----------|-------|---------|
| Cài đặt thư viện | `npm install` | Chỉ cần chạy 1 lần |
| Chạy website | `npm run dev` | Mở http://localhost:3000 |
| Tắt website | `Ctrl + C` | Trong cửa sổ Command Prompt |
| Build production | `npm run build` | Tạo bản chính thức (web) |
| Chạy production | `npm start` | Sau khi build |
| **Build app mobile** | `npm run build:mobile` | Tạo bản cho Android/iOS |
| **Mở Android Studio** | `npm run cap:android` | Sau khi build:mobile |
| **Mở Xcode (Mac)** | `npm run cap:ios` | Sau khi build:mobile |
| Kiểm tra lỗi code | `npm run lint` | Kiểm tra chất lượng code |
| Tạo Prisma client | `npx prisma generate` | Sau khi sửa schema |
| Đồng bộ database | `npx prisma db push` | Sau khi kết nối MongoDB |

### Phím tắt hữu ích

| Phím tắt | Chức năng |
|----------|-----------|
| `Ctrl + C` | Dừng server đang chạy |
| `F5` | Refresh trình duyệt |
| `Ctrl + Shift + I` | Mở DevTools (cho developer) |
| `Ctrl + L` | Chọn thanh địa chỉ trình duyệt |


---

## 17. Hướng Dẫn Tính Năng Mới (Cập nhật 16/04/2026)

### 17.1. Trang Tài Khoản Người Dùng (Account Hub)

Sau khi đăng nhập, khách hàng có thể truy cập **http://localhost:3000/account** để quản lý toàn bộ tài khoản.

#### Các trang trong Account Hub:

| Trang | Địa chỉ | Chức năng |
|-------|---------|-----------|
| 🏠 Tổng quan | `/account` | Menu nhanh, tóm tắt điểm và đơn hàng |
| 👤 Thông tin cá nhân | `/account/profile` | Sửa tên, SĐT, ngày sinh, giới tính |
| 📦 Đơn hàng | `/account/orders` | Xem tất cả đơn hàng + tracking timeline |
| 📍 Địa chỉ | `/account/addresses` | Thêm/sửa/xóa địa chỉ nhận hàng |
| ❤️ Yêu thích | `/account/wishlist` | Danh sách sản phẩm đã lưu |
| 🏆 Điểm tích lũy | `/account/loyalty` | Xem điểm, lịch sử, hạng thành viên |
| 🔔 Thông báo | `/account/notifications` | Cài đặt thông báo đơn hàng / khuyến mãi |
| 🔐 Đổi mật khẩu | `/account/change-password` | Cập nhật mật khẩu |

---

### 17.2. Hệ Thống Điểm Tích Lũy & Hạng Thành Viên

#### Cách tích điểm:
- Mỗi đơn hàng hoàn thành: **1.000đ chi tiêu = 1 điểm**
- Ví dụ: Đơn 500.000đ → +500 điểm

#### Cách dùng điểm (giảm giá):
- **1 điểm = 50đ giảm giá**
- Tối đa dùng điểm cho **20% giá trị đơn hàng**
- Ví dụ: Đơn 1.000.000đ → có thể dùng tối đa điểm tương đương 200.000đ (= 4.000 điểm)

#### Hạng thành viên:

| Hạng | Icon | Điểm cần | Bonus điểm |
|------|------|----------|-----------|
| Đồng | 🥉 | 0+ điểm | +0% |
| Bạc | 🥈 | 1.000+ điểm | +5% |
| Vàng | 🥇 | 5.000+ điểm | +10% |
| Kim Cương | 💎 | 20.000+ điểm | +15% |

---

### 17.3. Dùng Điểm Khi Thanh Toán

Tại trang thanh toán `/checkout`, bước 2 có **2 ô giảm giá nằm cạnh nhau**:

**Ô trái — Mã giảm giá:** Nhập mã → Nhấn "Áp dụng"

**Ô phải — Dùng điểm tích lũy:**
- Hệ thống tự tải điểm hiện có sau khi đăng nhập
- Dùng nút "−" và "+" để chọn số điểm (bước 100)
- Nhấn "Dùng tất" để dùng tối đa cho phép
- Thấy ngay số tiền giảm tương ứng
- Nhấn "Bỏ" để hủy sử dụng điểm

---

### 17.4. Quản Lý Mã Giảm Giá (Admin)

#### Mã giảm giá hiện có:

| Mã | Loại | Giá trị | Đơn tối thiểu |
|----|------|---------|--------------|
| `YENSAO10` | Giảm % | 10% | 500.000đ |
| `FREESHIP` | Giảm cố định | 30.000đ | 300.000đ |
| `WELCOME20` | Giảm % | 20% | 1.000.000đ |

#### Cách thêm mã giảm giá mới:

1. Mở file: `src\app\checkout\page.tsx`
2. Tìm đoạn code trong hàm `applyDiscount` (khoảng dòng 98-103):
   ```
   const discounts = {
     YENSAO10: { type: "percent", value: 10, min: 500000 },
     FREESHIP: { type: "fixed", value: 30000, min: 300000 },
     WELCOME20: { type: "percent", value: 20, min: 1000000 },
   };
   ```
3. Thêm dòng mới (ví dụ mã giảm 15% cho đơn từ 700.000đ):
   ```
   TETHOLIDAY: { type: "percent", value: 15, min: 700000 },
   ```
4. Lưu file → Push GitHub → Vercel tự deploy

#### Cách xóa mã giảm giá:
- Xóa dòng tương ứng trong đoạn code trên → lưu → push GitHub

#### Giải thích các trường:
| Trường | Ý nghĩa | Ví dụ |
|--------|---------|-------|
| `type: "percent"` | Giảm theo % | `value: 10` = giảm 10% |
| `type: "fixed"` | Giảm số tiền cố định | `value: 30000` = giảm 30.000đ |
| `min` | Đơn hàng tối thiểu (đồng) | `500000` = đơn từ 500.000đ |

---

### 17.5. Tính Năng Yêu Thích (Wishlist)

- Mỗi card sản phẩm có **nút ❤️** góc trên bên phải
- Nhấn ❤️ → Sản phẩm được lưu vào Yêu thích (icon chuyển đỏ/hồng)
- Xem danh sách tại: `/account/wishlist`
- Yêu cầu đăng nhập. Nếu chưa đăng nhập, nhấn ❤️ sẽ chuyển đến trang đăng nhập

---

### 17.6. Admin Dashboard Nâng Cấp

Trang `/admin` đã được nâng cấp:

- **4 thẻ thống kê** có thể nhấn vào → dẫn tới trang tương ứng
- **Biểu đồ thanh** thể hiện đơn hàng theo từng trạng thái
- **Đơn hàng mới nhất** — xem chi tiết sản phẩm trong từng đơn
- **Tài khoản mới nhất** — danh sách user đăng ký gần đây

Trang `/admin/accounts` — Quản lý tài khoản:
- Xem hạng thành viên + điểm tích lũy của từng user
- Badge màu theo hạng (Đồng/Bạc/Vàng/Kim Cương)

#### Mã đơn hàng mới:
Format: **`YS-YYMMDD-XXXX`** (ví dụ: `YS-260416-A1B2`)

---

### 17.7. Xử Lý Lỗi Thường Gặp Sau Cập Nhật

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|---------|
| Điểm hiển thị 0 dù đã mua hàng | Dữ liệu chưa đồng bộ | Truy cập `/account/loyalty` — hệ thống tự đồng bộ khi vào trang |
| Đăng nhập lỗi "server error" | API auth bị static | Đã vá — push code mới nhất lên GitHub |
| Giỏ hàng báo "dữ liệu cũ" | ID sản phẩm cũ lưu trong cache | Xóa cache trình duyệt (Ctrl+Shift+Delete) hoặc mở tab ẩn danh |

---

> 🎉 **Chúc bạn kinh doanh thành công với Yến Sào Bình An!**
>
> Website được thiết kế với ❤️ dành cho khách hàng Việt Nam.
