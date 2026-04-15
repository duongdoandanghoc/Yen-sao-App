"use client";

import { useEffect, useState } from "react";

const TRACKING_KEY = "yen_sao_viewed_categories";

export function useTracking() {
  const [viewedCategories, setViewedCategories] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRACKING_KEY);
      if (stored) {
        setViewedCategories(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const trackCategory = (category: string) => {
    try {
      const stored = localStorage.getItem(TRACKING_KEY);
      let categories: string[] = stored ? JSON.parse(stored) : [];
      
      // Đưa category mới nhất lên đầu, giữ lại tối đa 3 loại gần nhất
      const updated = [category, ...categories.filter(c => c !== category)].slice(0, 3);
      
      localStorage.setItem(TRACKING_KEY, JSON.stringify(updated));
      setViewedCategories(updated);
    } catch (e) {
      console.error("Lỗi ghi nhớ lịch sử:", e);
    }
  };

  return { viewedCategories, trackCategory };
}
