import { ProductType, BlogPostType } from "@/types";

export const mockProducts: Omit<ProductType, "id" | "createdAt">[] = [
  // === RAW NEST ===
  {
    name: "Yến Sào Đảo Thiên Nhiên",
    slug: "yen-sao-dao-thien-nhien",
    description: "Bên những vách đá dựng đứng của hòn đảo ngọc tít tắp khơi xa, nơi quanh năm đón gió biển mặn mòi và những con sóng tung bọt trắng xóa, loài chim yến hoàng gia đã dệt nên những tổ yến diệu kỳ. Yến Sào Đảo Thiên Nhiên là kết tinh của nắng gió và đại dương mênh mông, mang hàm lượng khoáng chất quý giá vượt trội. Mỗi tổ yến được những người thợ đu dây mạo hiểm thu hoạch bằng cả tâm huyết, giữ trọn vẹn hình dáng nguyên sơ và mùi hương của biển trời.\n\nSợi yến dày, đanh, dai đặc trưng, mang màu trắng ngà tụ khí tự nhiên. Đây không chỉ là món quà tặng thượng hạng cho đối tác, người thân mà còn là lời chúc sức khỏe dồi dào, thọ tỷ nam sơn.",
    shortDescription: "Tác phẩm nghệ thuật của đại dương. Sợi dày sụn, đanh dai dệt nên từ những vách đá cheo leo.",
    price: 2800000,
    originalPrice: 3200000,
    images: ["/images/products/raw-island-1.png"],
    category: "RAW",
    benefits: ["Phục hồi nguyên khí", "Cân bằng âm dương, dưỡng phổi", "Chứa nhiều khoáng chất kẽm, canxi từ vách đá", "Bồi bổ sức đề kháng"],
    usage: "Cách Thưởng Thức Trọn Vẹn Tinh Hoa:\n1. Giai đoạn Đánh thức (Ngâm yến): Sử dụng thố sứ dưỡng sinh. Rót nước tinh khiết nhiệt độ thường, nhẹ nhàng thả tổ yến vào đánh thức trong 3-4 tiếng. Cảm nhận tổ yến từ từ bung nở như một đóa hoa hàm tiếu.\n2. Giai đoạn Thanh lọc (Nhặt lông): Dùng kẹp chuyên dụng tỉ mỉ lấy đi những sợi lông tơ mỏng mảnh, rửa nhẹ qua rây dưới vòi nước chảy nhẹ nhàng để không làm nát sợi ngọc.\n3. Giai đoạn Thăng hoa (Chưng yến): Đặt yến vào thố chưng cách thủy. Hãy để lửa liu riu, như hơi thở bình an của thiền định trong 30 phút. Khoảng 5 phút trước khi tắt bếp, mới khẽ gõ vài viên đường phèn lóng lánh và vài thát lát gừng tươi hâm ấm dạ dày. Trải nghiệm chén yến thanh ngọt bung tỏa sụn dai trong khoang miệng.",
    tags: ["premium", "island", "natural", "gift"],
    stock: 50,
    averageRating: 4.8,
    reviewCount: 45,
    featured: true,
    active: true,
    weight: "100g",
    origin: "Đảo Yến, Khánh Hòa",
  },
  {
    name: "Yến Sào Hang Cao Cấp",
    slug: "yen-sao-hang-cao-cap",
    description: "Sâu thẳm trong những hang động u tịch hàng trăm năm tuổi, nơi ánh sáng hiếm hoi xuyên qua những kẽ đá rêu phong, Yến Sào Hang Cổ hấp thụ trọn vẹn linh khí giao hòa của Đất và Nước. Những phân tử vi lượng từ thạch nhũ hàng ngàn năm nhỏ giọt đã thẩm thấu vào từng tơ yến, tạo nên một loại thần dược cực kỳ quý hiếm với sản lượng vô cùng ít ỏi.\n\nMỗi tổ yến hang ngả màu vàng nhạt vương giả, dày mình, toát lên sự tĩnh lặng của thời gian. Hàm lượng Acid Sialic vươn tới mức cực đại, giúp tái tạo tế bào một cách thần kỳ. Đây là sự lựa chọn duy nhất cho giới sành điệu, dành riêng cho những trải nghiệm vương giả bậc nhất.",
    shortDescription: "Kết tinh từ hang động trăm năm, chứa đựng vi lượng thạch nhũ hiếm có. Sản lượng siêu giới hạn.",
    price: 4500000,
    originalPrice: 5000000,
    images: ["/images/products/raw-cave-1.png"],
    category: "RAW",
    benefits: ["Hàm lượng acid sialic vô cực", "Tái tạo tế bào trẻ hoá chuyên sâu", "Tăng cường năng lượng sống mạnh mẽ", "Khôi phục sinh lý ngũ tạng"],
    usage: "Bí Dụng Hấp Thu Dưỡng Chất:\nVì bản chất đanh thép của yến hang do hấp thụ khoáng đá, quá trình đánh thức (ngâm) cần sự kiên nhẫn. Hãy để yến ngâm mình trong dòng nước thanh mát tự nhiên từ 4 đến 5 tiếng. Khi chưng, nhiệt độ không được vượt quá 85 độ C (chưng cách thủy) trong vòng 40 phút để đứt gãy cầu nối peptide tinh túy. Tuyệt đối không dùng nước sôi dội trực tiếp. Một nhúm tuyết nhĩ đỏ hoặc kỷ tử thượng hạng chưng kèm vào phút cuối sẽ kích hoạt toàn bộ công năng của Yến Hang Cổ.",
    tags: ["premium", "cave", "rare", "health"],
    stock: 20,
    averageRating: 4.9,
    reviewCount: 28,
    featured: true,
    active: true,
    weight: "100g",
    origin: "Vách hang đá, Bình Thuận",
  },
  {
    name: "Yến Sào Lông Nguyên Chất",
    slug: "yen-sao-long-nguyen-chat",
    description: "Dành cho những tâm hồn trân quý sự nguyên bản và mộc mạc nhất từ đôi bàn tay Mẹ Thiên Nhiên. Yến sào lông nguyên chất giữ nguyên vẹn 100% hình thái của chiếc nôi xinh xắn mà chim bố mẹ cất công dệt trong những đêm ròng rã. Mọi tạp chất, từ những sợi lông vũ mỏng manh li ti, đều tựa một thước phim quay chậm quay về nguồn cội.\n\nPhù hợp với những bậc phụ huynh, những người con hiếu thảo có niềm đam mê tự tay chăm chút, kiên nhẫn tỉ mẩn lặt từng cọng lông cho người mình yêu thương bằng tất cả tấm chân tình.",
    shortDescription: "Vẹn nguyên hình thái mộc mạc nhất từ Thiên nhiên. Thích hợp cho người dùng yêu sự tỉ mỉ.",
    price: 1800000,
    originalPrice: 2200000,
    images: ["/images/products/raw-feather-1.png"],
    category: "RAW",
    benefits: ["Giữ nguyên 100% axit amin nguyên bản", "Vị tanh đặc trưng hương của biển", "Không can thiệp bất kỳ quy trình xịt ẩm nào"],
    usage: "Thử Thách Kiên Nhẫn Yêu Thương:\n1. Chọn thời điểm thư giãn nhất trong ngày, vặn một bản nhạc thiền êm ái.\n2. Ngâm tề chỉnh tổ yến vào âu nước trong 4-6 tiếng.\n3. Đặt một thấu kính lúp nhỏ dọi ánh sáng mạnh. Dùng chiếc nhíp gắp vi mạch chuyên dụng, kiên trì rút đi từng sợi tơ lông, nhẹ nhàng nhúng qua bát nước trong để lông rơi ra. Thao tác mất khoảng 30-45 phút cho mỗi tổ.\n4. Sau khi đã tự tay rũ sạch cặn bẩn, cho vào chưng cách thủy lửa nhỏ 35 phút. Thành quả là bát yến óng ánh, thấm đẫm tình yêu thương của người chế biến.",
    tags: ["natural", "affordable", "health"],
    stock: 80,
    averageRating: 4.5,
    reviewCount: 62,
    featured: false,
    active: true,
    weight: "100g",
    origin: "Nha Trang, Khánh Hòa",
  },
  {
    name: "Vụn Yến Sào Tự Nhiên",
    slug: "vun-yen-sao-tu-nhien",
    description: "Vụn Yến không phải là những mảnh vỡ bỏ đi, mà là những viên ngọc thô được phân tách từ quá trình xử lý bắp tổ yến nguyên vẹn. Chúng mang trong mình sự tinh túy y hệt những tổ yến hoàng gia đắt đỏ nhưng ẩn mình dưới dáng dấp bình dị khiêm nhường hơn.\n\nVới kết cấu mỏng, dễ ngấm nước, Vụn Yến là lựa chọn 'Smart Choice' cho những gia đình chú trọng thực dưỡng đều đặn mỗi ngày mong muốn một mức chi phí thông minh mà không hề thỏa hiệp về giá trị dinh dưỡng cao cấp.",
    shortDescription: "Chi phí thông minh, dinh dưỡng vẹn nguyên. Giải pháp sử dụng tẩm bổ đều đặn mỗi ngày.",
    price: 900000,
    originalPrice: 1200000,
    images: ["/images/products/raw-broken-1.png"],
    category: "RAW",
    benefits: ["Tiết kiệm kinh tế xuất sắc", "Thời gian ăn cực kỳ dễ dàng cho người già và trẻ nhỏ", "Mềm mịn, tan ngay trong miệng"],
    usage: "Chế biến cực kỳ nhanh gọn:\nVì là những mảng vụn mỏng, bạn không cần phải đợi chờ những mòn mỏi. Chỉ việc ngâm nước trong 20 phút là yến đã no nước và bung nở hoàn toàn.\nVụn yến ngậm nước rất dễ dầm nhỏ, vô cùng thích hợp nấu đan xen cùng cháo bồ câu non, cháo cá lóc để bồi bổ cho trẻ trong độ tuổi ăn dặm. Tuy nhiên, lưu ý chỉ nêm yến vào thố cháo ở bước TẮT BẾP để nhiệt dư ủ chín yến kéo dài 10 phút, tránh để sôi ùng ục làm phai mờ hàm lượng chất vi lượng.",
    tags: ["affordable", "daily", "family"],
    stock: 150,
    averageRating: 4.3,
    reviewCount: 89,
    featured: false,
    active: true,
    weight: "100g",
    origin: "Nha Trang, Khánh Hòa",
  },

  // === REFINED ===
  {
    name: "Yến Sào Tinh Chế Trắng",
    slug: "yen-sao-tinh-che-trang",
    description: "Được nhào nặn dưới đôi bàn tay điêu luyện của hơn 50 nghệ nhân lâu năm, thông qua quy trình 'nhặt lông tạo hình tinh xảo' ròng rã hàng chục giờ - Yến Sào Tinh Chế Trắng mang trong mình vẻ đẹp của một nàng thơ tuyết ưu nhã. Toàn bộ hình thái dáng thuyền cong vút được ép khuôn cẩn thận, màu trắng ngà tự nhiên trong veo 100% vắng bóng bất kì cặn tạp chất nào.\n\nĐây là câu trả lời xuất sắc tôn vinh giá trị của thời đại mới: Đẳng cấp thanh lịch và tốc độ, sẵn sàng biến thành cực phẩm bàn tiệc tẩm bổ chỉ bằng thao tác xé bao bì mộc mạc.",
    shortDescription: "Bản giao hưởng của nghệ nhân nhặt lông thủ công. Dáng thuyền tuyệt mỹ, sạch muốt 100%.",
    price: 3500000,
    originalPrice: 4000000,
    images: ["/images/products/refined-white-1.png"],
    category: "REFINED",
    benefits: ["Không tốn thời gian dọn rửa", "Thẩm mĩ cực kỳ cao, sợi yến dài nối mạch", "Hoàn toàn sạch trong tuyệt đối an toàn"],
    usage: "Nghệ Thuật Cất Cánh Hương Vị:\nBạn chỉ cần lấy một tổ yến xinh xắn (tầm 10g), thả vào chén nước ngâm 30 phút. Sợi yến tinh chế rất mau phục hồi đàn hồi.\nChúng tôi khuyên dùng công thức 'Lục Phẩm Tiến Vua' để thăng hoa cùng Yến Trắng: Hạt Sen xứ Huế (luộc mềm trước), Táo Đỏ Tân Cương, Long Nhãn Hưng Yên, Hạt Chia, Kỷ Tử vàng, chưng cùng Yến trong 25 phút. Vị chát thanh của lá sen, ngọt lịm của táo, giòn dai của bạch yến hòa quyện tạo nên thức uống làm nao lòng mọi giác quan.",
    tags: ["premium", "clean", "gift", "convenience"],
    stock: 60,
    averageRating: 4.7,
    reviewCount: 56,
    featured: true,
    active: true,
    weight: "100g",
    origin: "Nhà Yến Ninh Thuận",
  },
  {
    name: "Sợi Yến Vàng Cao Cấp",
    slug: "soi-yen-vang-cao-cap",
    description: "Nếu Yến Trắng là Nàng thơ tuyết, thì Sợi Yến Vàng chính là Nữ hoàng mặt trời rực rỡ. Rất hiếm hoi trong tự nhiên mới có những con chim yến già, sinh tồn ở môi trường giàu vi khoáng kẽm oxit và sắt, nôn ra những dãi yến mang màu cam vàng cực kỳ tráng lệ hong lên dưới nắng. Yến Sào Bình An đã phải lùng sục bao mùa yến mới chắt lọc được những tổ yến vàng với sản lượng ít hơn 5% tổng thu hoạch.\n\nSợi yến ngả sắc hoàng kim, kết cấu cộm độ dày và dai sức dẻo dai khó tả. Hương vị đậm đà ngầy ngậy, chỉ dành riêng cho tầng lớp thượng tầng am hiểu.",
    shortDescription: "Món quà quý ngả ráng chiều hoàng kim, vị đậm đà sâu thẳm cực hiếm gặp.",
    price: 5200000,
    originalPrice: 5800000,
    images: ["/images/products/refined-golden-1.png"],
    category: "REFINED",
    benefits: ["Hàm lượng sắt và khoáng thạch vượt bậc", "Hỗ trợ sản sinh hồng cầu tốt nhât", "Hương vị đượm lâu dai nhách"],
    usage: "Chinh Phục Nữ Hoàng Mặt Trời:\nMàu vàng óng của sợi yến sẽ không phai trong quá trình ngâm rửa. Hãy ngâm 40 phút.\nVì sợi yến rất to, nảy và cứng cộm, hãy áp dụng chiến thuật lửa hai tầng: 15 phút đầu chưng nước cách thủy nhiệt cao để đánh xụp cấu trúc biểu bì gai, 20 phút sau hạ lửa nhỏ rim mật để yến nở bung trọn vẹn. Ngay cả khi để chưng qua đêm trong tủ mát, khi dùng, sợi yến vàng vẫn giữ nguyên độ 'sồn sột' giòn ruộm vô cùng vương vấn.",
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
    description: "Nhìn những thiên thần nhỏ biếng ăn, suy nhược là nỗi đau đáu của người làm mẹ. Yến Nhỏ Cho Bé mang trọn trái tim và sự thấu cảm, được làm từ những sợi yến bụng tơ mềm mại nhất, đúc kết thành những đồng xu nhỏ xinh như cúc áo.\n\nSợi yến đã được cắt ngắn tinh vi, đảm bảo hệ tiêu hóa còn non nớt của trẻ dễ dàng nghiền nát và hấp thu toàn bộ kháng thể Sialic Acid quý báu mà không gây trở ngại dạ dày. Một viên yến nhỏ, đổi lấy một nụ cười rạng rỡ của con béo khỏe.",
    shortDescription: "Đồng xu yến nhỏ mềm mại tựa tình mẫu tử, sinh ra cho dạ dày bé bỏng.",
    price: 2000000,
    originalPrice: 2400000,
    images: ["/images/products/refined-baby-1.png"],
    category: "REFINED",
    benefits: ["Siêu mềm, dạng cắt vụn tự nhiên dể tiêu", "Hỗ trợ kháng sinh tự nhiên bảo vệ hô hấp", "Định lượng tiêu chuẩn vóc viên nhỏ"],
    usage: "Công Thức Cho Miệng Xinh Chúm Chím:\nMỗi đồng xu vóc nhỏ (khoảng 1.5g) tương ứng đúng chuẩn chỉ định cho 1 khẩu phần em bé 1-3 tuổi mỗi 2 ngày. Ba mẹ chỉ cần ngâm viên yến trong nước ấm 15 phút là yến đã rời rạc bung tuyết mượt.\nNếu bé chưa quen uống yến đá phèn, hãy xay nhẹ bí đỏ, hạt sen thành nước sốt cream, sau đó hấp viên yến này vào hòa quyện. Vị bùi béo của bí đỏ hạt sen lấn át mùi tanh biển đặc trưng của tổ yến tơ, khiến bé thích mê háu ăn tới tận hạt cuối cùng.",
    tags: ["baby", "safe", "immunity", "brain"],
    stock: 70,
    averageRating: 4.6,
    reviewCount: 73,
    featured: false,
    active: true,
    weight: "50g",
    origin: "Nha Trang, Khánh Hòa",
  },
  {
    name: "Hộp Quà Yến Sào Premium",
    slug: "hop-qua-yen-sao-premium",
    description: "Không đơn thuần là gửi gắm món ăn, việc trao món Yến Sào đại diện cho lời chúc 'Phúc Thọ An Khang'. Hộp quà Premium mở ra tựa như một bảo vật hoàng cung với chất liệu vỏ sơn mài bóng mờ vương giả, dát vàng tinh tế điểm xuyết họa tiết vảy mây thịnh vượng.\n\nBên trong được lót gấm nhung tuyết sẫm, khoe sắc 100g yến dáng mỹ nhân tuyệt đẹp, đính kèm đôi hũ yến chưng pha sẵn thượng hạng từ đầu bếp tinh hoa. Đây là một bộ khí chất uy nghiêm nhất, đập tan mọi phân vân về món quà ân tình ngoại giao vượt chuẩn.",
    shortDescription: "Bảo chứng uy quyền khí chất người tặng. Tôn vinh đẳng cấp người nhận.",
    price: 4800000,
    originalPrice: 5500000,
    images: ["/images/products/refined-giftbox-1.png"],
    category: "REFINED",
    benefits: ["Nâng tầm giá trị hình ảnh uy quyền", "Đại diện trọn vẹn sức khỏe toàn diện", "Set combo hoàn hảo đầy đủ phụ kiện táo, đường"],
    usage: "Nghệ thuật trao tặng:\nVì đây là Set kết hợp hoàn hảo, người nhận có thể lập tức tận hưởng sự tươi tỉnh từ 2 hũ yến chưng uống liền, và có thời gian thư thái tự chưng nấu trong tuần tiếp theo với thố yến khô. Bạn có thể sử dụng ngay chiếc thiệp mạ kim cao cấp đính kèm trong hộp để viết vài dòng thi pháp hoặc một lời chúc chân phương, đặt bên dưới nút gài lụa, trao tận tay đối tác/người trân quý để hoàn thành trọn vẹn nghi thức.",
    tags: ["gift", "premium", "combo", "holiday"],
    stock: 30,
    averageRating: 4.8,
    reviewCount: 34,
    featured: true,
    active: true,
    weight: "Combo 100g khô + 2 hũ chưng",
    origin: "Việt Nam",
  },

  // === READY TO EAT ===
  {
    name: "Yến Chưng Nhân Sâm",
    slug: "yen-chung-nhan-sam",
    description: "Tiết trời chùng chình làm thể lực con người đi rớt một nhịp não nề. Khi đó, sự bùng nổ của Nhân Sâm Hàn Quốc trứ danh kết hợp cùng nền Yến Sào đậm đặc tạo nên mảng giao thoa sức mạnh 'Phục Khí Nhanh Chóng'.\n\nHương ngai ngái hăng nồng mãnh liệt từ những lát sâm tươi đắm mình trong nền yến đảo sánh mịn màng, rực lên một sắc vàng hổ phách óng ánh trong hũ thủy tinh mờ mộng ảo. Bạn không chỉ uống, bạn đang hấp thu dòng chảy sinh khí cuồn cuộn vào huyết quản.",
    shortDescription: "Đại nộ phục nguyên từ Nhân Sâm Hàn Quốc - đánh thức dòng máu ấm sâu thẳm.",
    price: 180000,
    originalPrice: 220000,
    images: ["/images/products/readytoeat-ginseng-1.png"],
    category: "READY_TO_EAT",
    benefits: ["Trị dứt chứng suy hao mỏi cơ, yếu não", "Phục hồi tức tốc thần trí chao đảo", "Làm ấm thân nhiệt ngay lập tức"],
    usage: "Sạc Đầy Năng Lượng Thần Y:\nChỉ với một động tác vặn nắp pop sắc gọn, bạn hãy nghiêng hũ chậm rãi cảm nhận dòng sâm ngấm từ từ qua vòm họng. Lời khuyên vàng: TUYỆT ĐỐI HỮU DỤNG nhất là khi sử dụng vào lúc 9 giờ sáng hoặc trước giờ tập Trung/Thuyết trình/Hợp đồng gay cấn 30 phút. Tránh dùng vào tối mịt trước khi đi ngủ vì năng lượng mãnh liệt của Bạch sâm và Yến có thể khiến đầu óc bạn quá đỗi minh mẫn trằn trọc thâu đêm.",
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
    description: "Trong một thế giới đầy những gia vị pha tạp, Yến chưng đường phèn đứng vững như một bức tượng đài cổ kính không thể hạ bệ. Hạt đường phèn tinh khiết chưng nấu chậm rãi rỉ tiết sự ngọt ngào thanh tao mây khói, ôm ấp nhẹ nhàng và bồng bềnh lấy từng sợi yến sào nguyên bản trong suốt trôi bềnh bồng.\n\nSản phẩm là hiện thân của sự tối giản thuần khiết nhất – 'Less is More'. Không ồn ào mãnh liệt, chỉ đơn thuần mang dòng nước thần lách nhè nhẹ vào để xoa dịu những cơn ho hen, những trưa hè oi nóng hầm hập nhiệt lượng.",
    shortDescription: "Tượng đài cổ điển tối giản tinh khôi - xoa dịu mọi cơn khát khô tàn trong nội tạng.",
    price: 150000,
    originalPrice: 180000,
    images: ["/images/products/readytoeat-sugar-1.png"],
    category: "READY_TO_EAT",
    benefits: ["Chữa viêm xưng hầu họng dịu kỳ", "Giải nhiệt thanh mát, đào thải hóa chất", "Dễ uống tuyệt đối cho mọi người không kén vị"],
    usage: "Mẹo Tận Hưởng Thanh Tao Lão Tử:\nHãy bỏ hũ yến chưng đường phèn vào ngăn mát tủ lạnh khoảng 2 tiếng trước khi sử dụng. Vào một buổi tối tĩnh mịch sau ngày dài bộn bề, mở nắp và từ từ trút ra một chén thủy tinh miệng nhỏ. Đừng uống ực một lần. Hãy dùng chiếc thìa bằng sứ, húp từng ngụm bé tý, miết những vụn yến lên vòm miệng để cảm nhận vị giòn sần sật đang thanh tẩy mọi muộn phiền cặn bã trong gan phổi bạn.",
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
    description: "Một sự khiêu vũ táo bạo của hai 'vua giải khát' vùng nhiệt đới: Nước dừa xiêm bến tre ngọt lịm phảng phất tinh dầu dừa beo béo, đan quyện đắm say cùng Yến Sào đại dương mát lành.\n\nMọi muộn phiền oi ả của cuộc sống đô thị lập tức tan chảy khi bạn đưa hũ yến chưng độc đáo này chạm lên môi. Có một độ sánh dẻo hơi nhám của cùi dừa non bào mỏng quyện dính lấy tổ yến dai dai mượt mà, tạo nên một bản hòa tấu giải nhiệt thanh tân vô tiền khoáng hậu làm chị em phụ nữ đê mê.",
    shortDescription: "Bản giao hưởng nhiệt đới béo ngậy thanh tao - Thức uống yêu kiều nâng niu nhan sắc phái đẹp.",
    price: 170000,
    originalPrice: 200000,
    images: ["/images/products/readytoeat-coconut-1.png"],
    category: "READY_TO_EAT",
    benefits: ["Khoáng mát thần kỳ bù nước tế bào", "Bơm căng độ đàn hồi da và kích mọc tóc dầy", "Hương vị beo béo gây nghiện ngay lần chạm môi"],
    usage: "Cocktail Thanh Xuân Nữ Hoàng:\nTuyệt chiêu cho ngày hè rạng rỡ: Đổ hũ yến nước dừa ra ly pha lê cao, vò nhẹ vài ba nhánh lá dứa dập nát (hoặc lá bạc hà tươi) thả hờ vào, nhét thêm vài ba viên đá bi tinh khiết xóc nhẹ lên. Bạn vừa tự tay biến nó thành một ly Cocktail Dưỡng Nhan thần tốc. Dùng hằng đêm trước khi ru vào giấc ngủ nhan sắc, đảm bảo hôm sau da dẻ căng mọng sương sớm, phấn điệp tự phai mờ.",
    tags: ["beauty", "coconut", "collagen", "women"],
    stock: 180,
    averageRating: 4.7,
    reviewCount: 98,
    featured: false,
    active: true,
    weight: "70ml x 1 hũ",
    origin: "Ninh Thuận x Bến Tre",
  },
  {
    name: "Yến Chưng Collagen Hồng Sâm",
    slug: "yen-chung-collagen-hong-sam",
    description: "Tuyệt đỉnh nhan sắc và nội năng bộc phát từ hũ yến quyền lực mang Sắc Màu Đỏ Tía. Hồng Sâm 6 năm tuổi luyện cao đắng chắt, gặp ngay rào chắn peptide thủy phân siêu nhỏ của Collagen tự nhiên, kết bện vào Yến Sào tạo thành mạng lưới nâng đỡ cấu trúc mô sụn tế bào chằng chịt vô hình.\n\nNhư một dòng chất lỏng kiêu kỳ thâm xì màu mận, nó kích thích vị giác bằng vị nhẫn đắng ban đầu trên đầu lưỡi, nhưng lập tức bùng vỡ ra một sự ngọt ngào cuống quýt từ dạ dày dội ngược lên thanh quản. Sản phẩm sinh ra để đẩy lùi kim đồng hồ thời gian.",
    shortDescription: "Đẩy lùi kim thời gian lão hoá cực mạnh bằng bộ 3 chiến thần: Yến Sào, Collagen & Hồng Sâm 6 tuổi.",
    price: 250000,
    originalPrice: 300000,
    images: ["/images/products/readytoeat-collagen-1.png"],
    category: "READY_TO_EAT",
    benefits: ["Xóa mờ rãnh nhăn xệ cơ siêu tốc", "Huy động nội tiết tố âm hồi sinh mãnh liệt", "Định hình lại đường viền jawline săn chắc"],
    usage: "Liệu Trình Xóa Dấu Vết Thời Gian:\nMột hũ ma thuật chứa quá nhiều tinh túy như thế này KHÔNG CẦN DÙNG MỖI NGÀY. Hãy coi nó là một buổi vi kim Collagen hạng nặng. Tuần chỉ 2 lần (sau khi kết thúc chu kỳ sinh lí nữ là khoảng thời gian tuyệt hảo 100%). Sáng sớm vươn vai vừa ngủ dậy, bụng réo đói trống rỗng, hãy mở nắp và uống từng tấc trọn vẹn sự tinh túy để dòng collagen vi mạch phóng thích thẳng vào thành dạ dày rỗng tuếch thẩm thấu ngay lên da dẻ.",
    tags: ["beauty", "anti-aging", "collagen", "premium", "women"],
    stock: 100,
    averageRating: 4.8,
    reviewCount: 67,
    featured: true,
    active: true,
    weight: "70ml x 1 hũ",
    origin: "Việt Nam x Hàn Quốc",
  },
];

export const mockBlogPosts: Omit<BlogPostType, "id" | "createdAt">[] = [
  {
    title: "Cách Chưng Yến Sào Đúng Chuẩn Xưa Tại Nhà",
    slug: "cach-chung-yen-sao-dung-chuan",
    content: `# Bí Quyết Chưng Yến Cách Tường: Âm Hưởng Hoàng Cung Chậm Rãi

Giữa cuộc sống vội vã hối hả, có một khoảnh khắc bạn đứng lại bên gian bếp nhỏ, nâng niu đóa hoa yến trắng ngà, thả nhẹ vào thố men rạn màu lam ngọc. Chưng yến - đó không chỉ là thao tác bật bếp. Nó là một nghệ thuật tu tập tính nhẫn nại, tĩnh tâm, được truyền đời từ những yến bào chốn Ngự Thiện Phòng triều Nguyễn.

## Chương 1: Đánh Thức Nữ Thần Biển (Quá trình ngâm)
Đừng bao giờ dội nước sôi vào yến! Nó tàn nhẫn như việc phá tan những chuỗi peptide tinh túy nhạy cảm sinh học. Hãy rót nước tinh khiết ủ lạnh hoặc nhiệt độ phòng mơn man ngâm yến.
Sự chờ đợi có thể lê thê từ 30 phút đến vài giờ tùy theo độ cộm của yến thô. Nhẹ nhàng ngắm phiến yến bở tơi mềm mại, bung tỏa thành những dải lụa mỏng tang dập dềnh trong thố nước pha lê.

## Chương 2: Làm Sạch Lông Mang Cả Trái Tim
Nếu đó là yến còn lông, thì chiếc nhíp tinh vi và đôi mắt điềm đạm là vũ khí. Bạn đang gạt bỏ tạp niệm của bản thân khi gắp từng chiếc lông tơ đen nhẻm vướng víu vào tơ trắng xốp. Một cái rây nếp xả trực diện dưới dòng lệ trong veo từ vòi nước sẽ giúp làm trôi sạch lớp rêu mục bám đáy yến. Rửa vừa đủ dịu dàng để không đứt ruột yến ngọc.

## Chương 3: Cuộc Giao Tranh Chậm Rãi Trên Bếp Lửa
Tuyệt chiêu chưng Yến nằm ở cụm từ: **Cách Thủy Rung Động Nhẹ**.
- Cho đóa yến no nước vào thố sứ có nắp nhỏ lọt thỏm. Đổ nước vừa xăm xắp cách đỉnh yến 1 đốt tay.
- Đặt thố sâu vào một chiếc nồi lớn đang thầm thì reo nước hâm hấp 85 độ C.
- Đừng để nước ngoài nồi sùng sục trào bọt tung toé, chỉ giữ lửa nhỏ li ti. Đóng nắp kín bưng để phong tỏa nhiệt hơi.

Khoảng thời gian 25 - 30 phút cạn kiệt, hương tỏa thơm lừng mùi thanh thanh ngai ngái mùi trứng. Ngay lúc đó, hãy xắn hạt đường phèn Quảng Ngãi xốp rỗng rắc vào cùng vài vệt gừng thái chỉ. Đóng nắp đun sập thêm 5 phút cuối.

Nhấc chén ngọc ra. Đặt khẽ nếm một thìa. Một dòng ấm dẻo quánh tan lấp vào thực quản, sự thanh tĩnh của đại dương tràn ngập bao tử rỗng tuếch. Cảm ơn thiên nhiên hoang dã.`,
    excerpt: "Nghệ thuật chưng yến cung đình - Gỡ bỏ mọi sai lầm nấu nướng làm đứt gãy mạch dưỡng chất quý giá của món quà tinh túy này.",
    coverImage: "/images/blog/blog-cooking.png",
    tags: ["hướng dẫn", "chưng yến", "mẹo hay", "ẩm thực"],
    published: true,
  },
  {
    title: "10 Lợi Ích Sức Khỏe Tuyệt Vời Của Yến Sào - Thần Dược Huyền Bí Giữa Lòng Khơi Xa",
    slug: "loi-ich-suc-khoe-yen-sao",
    content: `# Phá Bỏ Nút Thắt Sinh Tử Cuộc Đời Nhờ Tinh Chất Giọt Sương Rơi
 
Xưa kia, các vua chúa vì khao khát trường sinh bất lão đã cho quân lính trèo treo leo bên vách núi dựng đứng đánh cược cả sinh mạng chỉ để mang về những chiếc tổ làm từ bọt dãi chim yến nhỏ xíu rỉ máu. Tại sao lại trả cái giá đắt nhường ấy? Hôm nay khoa học đã khám phá 10 mã gen cực phẩm bị giấu kín trong đó:
 
## 1. Nguồn Bơm Năng Lượng Miễn Dịch Bất Bại
Axit Sialic chiếm cực kỳ cao - đó là "bức tường khiên khiên bọc" hoàn hảo cản lại cả rổ vi khuẩn, vi trùng tấn công xâm nhập đường hô hấp mà người xưa ngợi ca là Dưỡng Vệ Khí Hoàn Mỹ.
 
## 2. EGF - Chìa Khóa Cải Lão Hoàn Đồng Cho Phụ Nữ
Epidermal Growth Factor - nhân tố vàng giúp lớp biểu bì tái tạo tốc độ gấp 3 lần bình thường. Chuỗi tế bào sừng chai vỡ ra, lộ làn da mỏng manh tươi trẻ tuổi 18 căng bóng mượt sương khói bay bay.
 
## 3. Quét Sạch Phổi Giấy - Chữa Ho Viêm Ho khan
Vị ngọt thanh bình sảng khoái tính hàn của loại dãi yến đánh trực diện vào đờm nhầy kẹt sâu trong thanh quản con người, dọn dẹp sạch sẽ phế nang tổn thương sau các cơn hậu phẫu hô hấp viêm nhiễm kéo dài não nề.
 
## 4. Nuôi Dưỡng Thánh Thể (Cho Bà Bầu)
Phụ nữ cạn kiệt canxi thai nghén được tưới tắm lượng cực khủng Amino axit hỗ trợ bào thai tăng sinh xương chậu thần tốc từ trong bụng không mảy may gánh nặng gan thận.
 
## 5. Đánh Rơi Stress Lên Chín Ngàn Dặm Mây Xanh
Các chuỗi Threonine kéo não khỏi mệt mỏi cùng cực của những canh khuya mất ngủ, thả thần trí nhẹ bồng bềnh êm xui tựa dải sương mù.
 
## 6. Món Ăn Dạ Dày Yêu Thích 
Trẻ nhỏ ốm yếu còi cọt thường đào thải thức ăn thịt cá thô rắn. Yến vào dạ dày dễ tiêu bốc khói thành tinh chất siêu vi lập tức lách qua thành ruột ngấm vào máu không tốn năng lượng tiêu hóa dạ dày bóp bao nhiêu tẹo nào.
 
## 7. Đẩy Cửa Hồi Sinh Trí Nhớ 
Pheylalanine, vi lượng đồng và kẽm thúc đẩy sự truyền dẫn qua hệ nơ-ron điện thần kinh tăng vọt - Người bệnh Alzheimer hay giới mọt sách căng não thi sẽ phải khâm phục sát bệ phóng logic bộ não khi được uống hũ yến chưng đều đặn ròng.
 
## 8. Cứu Vương Cơ Đắp Vào Thân Mòn
Người sau hoá trị hóa chất độc địa, sụp cơ tay cơ cẳng - yến đưa valine và Isoleucine bồi phục lại những bó cơ bắp cứng đơ mệt rũ hồi sinh lại.
 
## 9. Huyết Áp Yêu Dấu Nhu Hòa Lại Tim Vàng
Hạ nhiệt sự nổi loạn của những dòng máu phừng phực bơm sai nhịp tim vỡ nát, để cholesterol xấu tự động bị cuốn trôi vô thanh.
 
## 10. Chặn Đứng Kim Đồng Hồ Oxy Hóa Nếp Nhăn
Màng chống oxy hóa vô hình rình rập diệt gốc tự do hoành hành ngang ngược.`,
    excerpt: "Bạn đang sở hữu điều diệu kỳ gì bên trong từng chén súp trong suốt ấy? Tại sao Yến Sào lại được săn lùng ngàn năm trường kỳ?",
    coverImage: "/images/blog/blog-health.png",
    tags: ["sức khỏe", "yến sào", "dinh dưỡng", "khoa học"],
    published: true,
  },
  {
    title: "Yến Sào Cho Bà Bầu: Chặng Đường Nuôi Con Từ Trái Tim Huyết Mãnh",
    slug: "yen-sao-cho-ba-bau",
    content: `# Hành Trình Tôn Thờ Thiên Chức Nuôi Dưỡng Mần Hạt Của Mẹ Biển Cả
 
Làm mẹ - là lúc cơ thể mong manh rút kiệt từng mẩu thanh xuân để kiến tạo nên hình dáng giọt máu lấp lánh sinh động. Nhiều bà mẹ bị bào mòn với chứng buồn nôn lả người ở kỳ thai nghén héo hắt nhợt nhạt. Tổ Yến lúc này không phải là "đồ đắt tiền chưng mua trọc phú" - mà là chiếc rễ ma mộc neo giữ sự kiên trì sinh mệnh thần thánh.
 
## "Em Bé Thông Minh Phá Dớp - Từ Nguồn Axit Sialic"
Các nghiên cứu khoa học Thụy Sỹ đã đổ gục thừa nhận rằng: Lượng Sialic dào dạt tích tụ trong yến đảo là viên gạch tiên phong xếp chồng thành mô cấu trúc Nơ-Ron Thần Kinh Thai Nhi Tối Đa Nhất. Ăn yến từ kỳ diệu thứ tháng 4, đứa bé cựa quậy đạp bung bụng mẹ bằng một trí não sáng rực khổng lồ tiềm ẩn. Phả hơi thở tinh khiết vào sự sống mới.
 
## Ánh Chớp Trong Tam Cá Nguyệt Cấm Kỵ 3 Tháng Đầu
"TIN ĐỒN HUYỀN BÍ: 3 tháng đầu mỏng manh nên không được đụng Yến tẩm bổ lạnh dạ?" 
Sự thật ngã ngửa: Trong tam cá nguyệt đầu, mọi sự dập dồn xô bồ, nghén bủng rủng nôn mửa là cơn ám ảnh kinh hãi bòn rút dạ dày. Yến tính hàn lạnh - Sự khôn khéo tinh tế là hãy đun yến nhừ nát đặc kẹo lỏng với 2 lát gừng già mỏng. Một ly yến súp nóng hổi sẽ áp chế sóng dạ dày cuộn trào mà vẫn bơm được protein đỉnh của tinh túy, nạp lực mà không sợ thai lưu!
 
## Lộ Trình Hoàn Mỹ Tuyệt Kỹ Bồi Thai:
- Tháng thứ 4 -> Cuối tháng 7: Cứ 3 đêm ròng lại bật bếp đun 3-4 gam yến vàng ruộm chưng táo tàu ngọt lịm. Bé béo tròn bụ bẫm tăng ký cái vèo.
- Tháng 8 -> Cận sát ngày đẻ rên la: Bà mẹ húp tổ yến đều đặn để chuẩn bị nội công vươn mình rặn đau giếng biển và hồi phục chống sa dạ con rách nát sau sanh đẻ cấp kì nhờ EGF liền mô!
 
Sợi chỉ dai giòn đó không đơn giản là thức ăn - Nó là dải băng bó dịu êm thắt chặt sợi dây liên kết máu mủ vô thời hạn.`,
    excerpt: "Sự thật đằng sau những quan niệm cấm kỵ 3 tháng đầu thai nhi. Phép màu thần đồng thông minh não bộ cho bé ngay từ lúc nằm phôi thai nôi ấm mẹ biển cả.",
    coverImage: "/images/blog/blog-pregnancy.png",
    tags: ["bà bầu", "thai kỳ", "dinh dưỡng mẹ và bé"],
    published: true,
  },
  {
    title: "Hướng Dẫn Tránh Sập Bẫy Mua Yến Gỉa Bằng Đôi Mắt Kim Giác Của Bậc Thầy Sành Ăn",
    slug: "huong-dan-chon-yen-sao-chat-luong",
    content: `# Chuyến Phiêu Lưu Trừ Tà Định Nhan Khám Phá Nghệ Thuật Chọn Yến Đỉnh Cao
 
Cầm hộp Yến giá chục triệu, cảm giác run rẩy sợ hãi nơm nớp trong ngực: "Liệu có dính bẫy nấm rong biển hồ tinh ngâm hóa chất cộp mác vua yến dối gian chăng?". Trong thương trường hỗn loạn phồn hoa này, hàng triệu tổ yến chắp vá bằng keo da bì da mủ nhan nhản khơi mào đại cục rác hôi thối. 
Hãy là vị thám tử quyền uy bóc trần đường dây mánh mung này!
 
## Mánh Mung Đội Lột Mặt Nạ "Keo Pha Túi Gói Trắng Phau"
Yến giả công nghiệp siêu ngụy trang: Người ta mua vụn vi bột yến pha dán sệt với agar rau câu, tinh bột khoai mì, thoa vuốt ve thành hình vóc cánh nôi tuyệt đẹp cứng đờ. Phơi nắng lên một mẻ "cực bóng loáng rợn người", trắng bóc vô tri mù quáng không tì vết. Ngâm vào nước 20 phút - lập tức bấy hầy vỡ tan tành hồ nhão nứt không hình hài mạch lạc.
 
## Khai Nhãn Lực - Ánh Sáng Chắp Vá 
Lấy ngay chiếc đèn pin di động soi từ ánh ngược: Nếu từng sợi xớ chằng chéo rối ren đong vào có tia tia không đều đặn vồng uốn lồng, màu hơi ố kem trứng nham nhở - Xin chúc mừng, Mẹ tự nhiên đang mỉm cười với bạn chân ái.
Cắn ngẫu nhiên 1 góc tổ khô cứng: Vị giòn vụn kêu vỡ rốp như mảnh kính xé - là yến chuẩn. Còn hơi bị bẻ dai nhách dẻo dẻo kẹo kéo uốn cạy khó khăn - Rõ ràng bị xịt đường giữ ẩm ăn gian trọng lượng chục gam nặng cân thu tiền ác liệt!
 
## Thử Quỳ Tím - Vua Lửa Dặm Mặt Yến Yêu Ma 
Tàn sát lửa khò tàn khốc: Cầm 1 ngẫu nhiên nhón nhỏ quăng bật lửa đốt. Mùi bánh gai, hồ bột khen khét lẹm mũi tro xỉ đen - yến rác giả nhựa.
Mùi đặc quánh khét cháy hữu cơ sừng lông của sừng tê nai - đấy chính là sảnh điện đanh tự nhiên của tinh hoa thật chuẩn quốc hồn quốc túy vạn vạn năm ròng.
 
Người tiêu dùng sành điệu là thanh kiếm thép phán quyết cuối cùng loại bỏ mọi chiêu trò trên thánh đường sức khoẻ.`,
    excerpt: "Lột trần mánh lới độn keo, ép mủ, phủ bột trắng phau tại các xưởng gia công đen tối. Trang bị khả năng soi tia thấu thị đâm thủng đồ giả lừa phỉnh ngay trong ánh mắt liếc nhìn 3 giây đầu.",
    coverImage: "/images/blog/blog-quality.png",
    tags: ["hướng dẫn", "chọn yến", "chất lượng", "cảnh báo"],
    published: true,
  },
  {
    title: "Sự Tích Huyết Yến Cùng Lời Đồn Về Giọt Máu Bi Thương Đam Mê Của Loài Chim Ngốc Lễ",
    slug: "su-tich-huyet-yen-va-loi-don",
    content: `# Tiếng Kêu Rỉ Máu Ban Đêm, Vọng Khắp Hang Sâu Lý Sơn Nước Lặng

Nhân gian xưa kể một trong những giai thoại xót xa và đẹp bậc nhất giới tự nhiên. Rằng loài chim Yến hằng đêm mải miết xây mạn tổ cho vợ con tị nạn gió vách cheo leo trên các hòn đảo tít tắp ngất trời. Tiết trời ác khắc bào mòn, nước bọt kiệt quệ ráo trơn. Chim bố gồng cổ họng lên nức nở khạc ho ra máu pha dãi đơm để cố gắn vá víu phần tổ nham nhở cho xong rạng rạng sáng ban mai. Những giọt huyết bầm quánh lại hằng tháng, khô nhuộm cả vạt bọt trắng ngà thành một màu đỏ thâm mận bí ẩn... 
Đó là sự mở đầu ly kỳ bi diệu về Huyền thoại Huyết Yến.
 
## Đập Tan Mytos (Sự Thật Kế Tiếp) Khoa Học Trần Trụi Giáng Đòn 
Sự thật có mĩ miều đau lòng đến chừng mực ấy không? 
Thật mỉa mai lẫn thú vị: Chim Yến KHÔNG HỀ khạc rỉ máu để xịt xây tổ nào cả. Giọt máu rỉ nứt cuống họng khi kết tổ cứng dính là truyền thuyết mị dân huyễn hoặc do dân buôn thêu dệt đẩy giá Huyết Yến lên trăm triệu đồng/lạng chục phân!
 
Sân khấu thật sự xảy ra ở các hang động tối ẩm rêu xanh ngấm đá xỉ tro đen. Phân hóa học chuỗi phản ứng cực độc quyền ở dưới đáy hang mịt mù bốc lên hàm lượng Nitrit/Amoniac siêu cực mạnh bốc hơi ngấm quệ vào tảng thạch cao nơi chim bấu ngự. Vài chục ngàn năm, vạt yến trắng ngấm men hơi khí này ủ mầm lên men rực lửa chuyển sắc đổi cam thẫm rồi đỏ mận uy nghiêm.
 
## Quyền Năng Của Sự Tái Sinh Quả Tim 
Nhưng tại sao Huyết Yến (Yến Cầm Huyết) không bị phá giá đào thải?
Tuy không là giọt máu nghĩa khí bi thương, nhưng sự ủ men vách động tự nhiên tùng vạn năm đã ban cho Huyết Yến một hàm lượng sắt Oxit Iron Fe2+ siêu siêu đậm đặc ngấm lên gấp 50 lần sợi yến đảo thông thường. Yến hấp thụ linh khí thổ địa và trở thành một phương thuốc thần cường cực cường não - bổ dương và trị những chứng bệnh u thâm ung nhọt do cạn máu di truyền khốc liệt tận cốt tủy.
 
Bạn có dám uống chén yến rực đỏ này dầm chìm trong chén cổ men rạn đời nhà Minh để kết nối cùng nhịp thời gian xưa?`,
    excerpt: "Chim Yến ho lao tự khạc máu xây tổ để lại những dòng nước bọt ám ảnh đỏ quánh lộng lẫy? Đập tan màn sương mù mờ ảo và chạm đến lời giải khoa học chân ái giật mình phía sau hòn đá rêu phong Huyết Yến Tôn Quý Bậc Nhất Đế Vương.",
    coverImage: "/images/blog/blog-rednest.png",
    tags: ["khoáng thạch", "huyết yến", "truyền thuyết", "khám phá"],
    published: true,
  },
  {
    title: "Hành Trình Sinh Tử Mạo Hiểm Bước Chân Gọi Yến Về Đảo Quần Thể Lạnh Lẽo Ly Sơn",
    slug: "hanh-trinh-sinh-tu-goi-yen-dao-ly-son",
    content: `# Rơi Tự Do Xuống Rặng Đá San Hô Găm Mũi Căm - Cái Giá Của Vua Đảo
 
Gió rít bạt mạng quật từng cơn rung đứt đoạn những mảng lưới dây rợ vươn lơ lững bám vách núi dựng đứng nhọn hoắt gặm đầy lưỡi cưa rong mặn chát của đảo hoang. Đứng tận dưới này, con người chỉ là con kiến đen bám chênh vênh ở độ cao hàng chục mét xé mây mờ. 

## Cọng Thép Đung Đưa Và Sào Trúc Phơi Linh Hồn 
Nghề thu hái vách yến đảo không dành cho người gầy thân thần kinh yếu đuối. Mỗi năm hai mùa khắc nghiệt sóng dữ bão chồm, dàn xà tre mong manh chằng chống mấp mô đóng vào khe kẽ chông chênh nham thạch đá núi. Dây thừng thắt chặt hông căng đứt lựt mạch máu cơ bụng bấu ghịt. 
Người thợ đu người treo lơ lửng, tay cầm kẹp cong, nhãn mạn xịt xịt soi đèn pin vào sâu hút con mắt động hang tối sầm ngực lạnh lẽo tiếng dơi rít để móc từng tảng bạch ngà cẩn thận nguyên vẹn cho vào lưới vải bố đeo hông. Sảy chân - 1 giây định nghĩa vĩnh biệt!

## Quyết Tâm Xây Lãnh Địa Nhử Loài Chim Lang Thang Kiêu Ngạo Trở Về Lập Tổ Dựng Xây Cộng Đồng 
Làng đảo Lý Sơn đang dần mất chim về vùng khai thác hỗn loạn khép đục. Đám thanh niên quyết chí mở sừng bám biển. Một hành trình khàn rã cổ tái thiết hang vách giả lập mọc đầy thiết bị loa sóng tần số vang nhại lại tiếng cạ xù xịt chít chít văng vọng trong đêm khuya rùng rợn thanh thanh hút hút. Ròng rã suốt 5 năm, mùi phân vương bạt chim ủ kỹ, mùi bầy đàn êm ấm sưởi lửa được giả mạn đánh bật. 

Rồi phép màu xuất hiện! Hằng hà sa số đám bụi đen mịt trời từ đằng biển khơi xa xăm hàng hải đùn xô bay vút vào miệng hang rộng ồm oàm há hố. Quần thể phục hưng! Những sợi yến dày uỳnh phết lên mép xiềng đá lạnh lại chói dội mọc san sát.
Khi thưởng thức chén chè yến đảo thơm lừng đặc dẻo, nào mấy ai biết đằng sau một mùi tanh man mác kiêu ngạo ấy là nước gân bắp thịt vã ra đổ mồ hôi liều cược tính phận con vượn khổng lồ trần gian hoang dại trần trụi ngoài khơi bão khốc mịt mờ!
`,
    excerpt: "Cận cảnh trải nghiệm đẫm mồ hôi, sinh tử lơ lửng vách đá lưỡi cưa sâu không lối thoát để đánh cược lấy vài gam tinh chất tổ chim trong đêm tối mù khơi gió thét.",
    coverImage: "/images/blog/blog-origin.png",
    tags: ["nghề biển", "yến đảo thiên nhiên", "câu chuyện", "hành trình"],
    published: true,
  }
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
