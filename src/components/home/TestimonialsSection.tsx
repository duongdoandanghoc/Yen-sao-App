"use client";

import { Star, Quote } from "lucide-react";

interface Review {
  rating: number;
  comment: string;
  userName: string;
}

export default function TestimonialsSection() {
  const reviews: Review[] = [
    { rating: 5, comment: "Yến rất ngon, sợi dày dai. Gia đình mình rất hài lòng!", userName: "Nguyễn Thanh Hoa" },
    { rating: 5, comment: "Mua làm quà biếu Tết, bao bì sang trọng, người nhận rất thích.", userName: "Trần Văn Minh" },
    { rating: 4, comment: "Chất lượng tốt, giao hàng nhanh. Sẽ mua lại lần sau.", userName: "Lê Thị Mai" },
    { rating: 5, comment: "Dùng cho bà bầu 3 tháng rất tốt, da đẹp lên nhiều.", userName: "Phạm Thị Hồng" },
    { rating: 4, comment: "Yến chưng sẵn tiện lợi, vị ngon tự nhiên.", userName: "Hoàng Đức Anh" },
    { rating: 5, comment: "Mua cho mẹ dùng hàng tháng, sức khỏe cải thiện rõ rệt.", userName: "Võ Minh Tuấn" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Khách Hàng Nói Gì</h2>
          <p className="section-subtitle">
            Hàng ngàn khách hàng tin dùng sản phẩm yến sào của chúng tôi
          </p>
          <div className="gold-divider mt-4" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="card p-6 relative"
            >
              <Quote size={32} className="text-primary-200 mb-3" />
              
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= review.rating ? "fill-primary-500 text-primary-500" : "text-cream-300"}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-brown-600 text-sm leading-relaxed mb-4">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-cream-200">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-700">
                    {review.userName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-brown-900">
                    {review.userName}
                  </p>
                  <p className="text-xs text-brown-400">Khách hàng</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
