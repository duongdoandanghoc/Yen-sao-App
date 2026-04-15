import { Link } from "next-view-transitions";
import { APP_NAME, FOOTER_LINKS, CONTACT_INFO } from "@/lib/constants";
import { Phone, Mail, MapPin } from "lucide-react";
import InstallPWA from "@/components/pwa/InstallPWA";

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-cream-200">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-gold-glow flex items-center justify-center bg-white">
                <img src="/favicon.ico" alt="Logo" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">{APP_NAME}</h3>
                <p className="text-xs text-cream-400">Yến sào cao cấp</p>
              </div>
            </div>
            <p className="text-sm text-cream-400 leading-relaxed mb-4">
              Chuyên cung cấp yến sào nguyên chất từ Khánh Hòa. 
              Cam kết 100% tự nhiên, chất lượng hàng đầu Việt Nam.
            </p>
            <InstallPWA />
            <div className="flex flex-col gap-3 text-sm text-cream-400 mt-6">
              <a href={CONTACT_INFO.phoneHref} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Phone size={16} />
                {CONTACT_INFO.phone}
              </a>
              <a href={CONTACT_INFO.emailHref} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Mail size={16} />
                {CONTACT_INFO.email}
              </a>
              <a href="https://maps.app.goo.gl/KgMsfHu9vcYKWHwL8" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-primary-400 transition-colors">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span className="leading-snug">{CONTACT_INFO.address}</span>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Sản phẩm</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-cream-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Công ty</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-cream-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brown-800">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream-400">
            © {new Date().getFullYear()} {APP_NAME}. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4 text-sm text-cream-400">
            <Link href="#" className="hover:text-primary-400 transition-colors">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-primary-400 transition-colors">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
