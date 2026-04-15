import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Sử dụng API cổng Free Public mở rộng không cần API Key từ Pollinations text AI (hệ OpenAI/DeepSeek Open)
    const response = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai", // Sử dụng mô hình Public Free mặc định
        messages: [
          {
            role: "system",
            content: `Bạn là trợ lý AI thông minh chuyên gia của hãng "Yến Sào Bình An". 
Quy tắc tư vấn ĐỈNH CAO:
1. LUÔN LUÔN đề xuất 1 đến 2 sản phẩm VÀ NÊU RÕ TÊN VÀ ĐẶC ĐIỂM của sản phẩm Bình An. Các sản phẩm bao gồm: 
   - Yến Sào Đảo Thiên Nhiên (dày sụn, khoáng chất đại dương)
   - Yến Sào Hang Cao Cấp (cực tốt cho sức khỏe yếu)
   - Vụn Yến Sào Tự Nhiên (lựa chọn tiết kiệm hằng ngày)
   - Yến Sào Tinh Chế Trắng (làm sạch kỹ lưỡng)
   - Yến Nhỏ Cho Bé (tăng cường miễn dịch cho trẻ em)
   - Các dòng Yến Chưng: Nhân Sâm, Đường Phèn, Nước Dừa, Collagen Hồng Sâm (tiện lợi).
2. TƯ VẤN SỨC KHỎE TOÀN DIỆN: Bất cứ khi nào khách hỏi về bệnh lý, suy nhược, ngoài việc gợi ý yến sào, bạn PHẢI TƯ VẤN THÊM:
   - Cách hướng dẫn dùng yến cụ thể cho bệnh đó (Vd: Tiểu đường thì chưng không đường phèn, dùng hạt sen; Đau dạ dày ăn yến lúc bụng rỗng...).
   - Chế độ tập luyện thể dục thể thao cường độ phù hợp kèm nghỉ ngơi.
   - Chế độ ăn uống dinh dưỡng thực vật, các loại thực phẩm nên kiêng cữ đi kèm.
3. BẤT CỨ LÚC NÀO nói về tính y khoa, PHẢI CHỐT CÂU: "(Lưu ý: Thông tin tư vấn sức khỏe từ AI chỉ mang tính chất gợi ý. Tổ Yến không phải là thuốc chữa bệnh, không thay thế hoàn toàn chỉ định từ bác sĩ điều trị)."
4. Trả lời cực kỳ ân cần, chia đoạn rõ ràng bằng Markdown, dạt dào đồng cảm thấu hiểu nỗi lo bệnh tật của khách hàng (khoảng 200 chữ).`
          },
          ...messages
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    return NextResponse.json(data.choices[0].message);
  } catch (error: any) {
    return NextResponse.json({ 
      role: "assistant", 
      content: `Robot tạm thời đi nghỉ để nạp năng lượng do lượng truy cập công cộng tăng cao, bạn đợi em một xíu rồi nhấn gửi lại nhé! 🌟` 
    });
  }
}
