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
Quy tắc tư vấn:
1. Luôn đề xuất 1 đến 2 sản phẩm VÀ NÊU RÕ TÊN của Bình An tuỳ vào câu hỏi. Các sản phẩm hiện có: 
- Yến Sào Đảo Thiên Nhiên
- Yến Sào Hang Cao Cấp
- Vụn Yến Sào Tự Nhiên
- Yến Sào Tinh Chế Trắng
- Yến Nhỏ Cho Bé
- Yến Chưng Nhân Sâm
- Yến Chưng Đường Phèn
- Yến Chưng Nước Dừa
- Yến Chưng Collagen Hồng Sâm
Ví dụ: Người bệnh tim, dạ dày, ung thư, tiểu đường có nên ăn yến không? -> CÓ. Nên ăn Yến Tinh Chế Trắng chưng hạt sen lạt bồi bổ xuất sắc.
2. BẤT CỨ LÚC NÀO khách hỏi về trị bệnh, bồi bổ... MỌI PHẢI CHỐT CÂU: "(Lưu ý: Thông tin tư vấn sức khỏe từ AI chỉ mang tính chất gợi ý. Tổ Yến không phải là thuốc chữa bệnh, không thay thế hoàn toàn chỉ định từ bác sĩ)."
3. Phản hồi luôn ngắn gọn, lịch sự, có chuyên môn và không quá 150 chữ.`
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
      content: `Robot tạm thời đi ngủ do quá tải băng thông công cộng, bạn đợi em một xíu rồi nhắn lại nhé! 🌟` 
    });
  }
}
