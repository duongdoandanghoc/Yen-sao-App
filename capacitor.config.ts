import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yensaobinhan.app',
  appName: 'Yến Sào Bình An',
  webDir: 'out',
  server: {
    // Sử dụng HTTPS scheme cho Android (bắt buộc cho API hiện đại)
    androidScheme: 'https',
  },
  // Cấu hình native
  android: {
    // Cho phép mixed content (HTTP + HTTPS) trong development
    allowMixedContent: true,
  },
  ios: {
    // Cho phép WebView scroll tự nhiên trên iOS
    contentInset: 'automatic',
  },
};

export default config;
