import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        role: "assistant",
        content: `*(Hệ thống AI chưa được cung cấp DeepSeek API Key)*\nChào bạn, hiện tại tôi đang dùng cơ chế phản hồi tự động cơ bản. Nếu bạn bị các bệnh lý như tim mạch hay tiểu đường, chúng tôi gợi ý dòng **Yến Sào Tinh Chế Trắng** hoặc **Vụn Yến Sào Tự Nhiên**, khi chưng không bỏ đường phèn mà kết hợp với hạt sen. \n\n*(Lưu ý: Thông tin tư vấn sức khỏe từ hệ thống AI chỉ mang tính chất gợi ý và tham khảo. Tổ Yến không phải là thuốc, không thay thế hoàn toàn được các chỉ định y khoa từ bác sĩ điều trị).*`,
      });
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `Bạn là trợ lý ảo AI cao cấp của hãng "Yến Sào Bình An". 
Quy tắc tư vấn:
1. Luôn đề xuất 1 đến 2 sản phẩm cụ thể của Bình An tuỳ vào nhu cầu người dùng. Các sản phẩm bao gồm: 
- Yến Sào Đảo Thiên Nhiên (thô, nguyên chất)
- Yến Sào Hang Cao Cấp (thô, rất hiếm, khoáng cao)
- Vụn Yến Sào Tự Nhiên (tiết kiệm, ăn hằng ngày)
- Yến Sào Tinh Chế Trắng (làm sạch 100%, biếu tặng)
- Yến Nhỏ Cho Bé (cho trẻ em)
- Yến Chưng Nhân Sâm / Đường Phèn / Nước Dừa / Collagen Hồng Sâm (tiện lợi).
2. Khi khách hỏi bệnh lý (như tim mạch, ung thư, tiểu đường, ốm, mang thai), LUÔN LUÔN VÀ BẮT BUỘC chốt câu này ở cuối tin nhắn: "*(Lưu ý: Thông tin tư vấn sức khỏe từ hệ thống AI chỉ mang tính chất gợi ý và tham khảo. Tổ Yến không phải là thuốc, không thay thế hoàn toàn được các chỉ định y khoa từ bác sĩ điều trị).*"
3. Viết giọng điệu chuyên nghiệp, y khoa, có chuyên môn và ngắn gọn, súc tích (dưới 150 chữ).`
          },
          ...messages
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    
    if (data.error) {
       return NextResponse.json({
         role: "assistant", 
         content: `Lỗi kết nối API DeepSeek: ${data.error.message}`
       });
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error: any) {
    return NextResponse.json({ 
      role: "assistant", 
      content: `Có lỗi trong quá trình nhúng AI: ${error.message}` 
    });
  }
}
