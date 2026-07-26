import React from 'react';
import { CompanyConfig } from '../types';
import { MapPin, Phone, Mail, Clock, Lock, Heart } from 'lucide-react';

interface FooterProps {
  config: CompanyConfig;
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdminModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                ND
              </div>
              <span className="font-extrabold text-lg text-white">DỌN NHÀ NGUYỄN DUY</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Thương hiệu dịch vụ dọn nhà, dọn vệ sinh công nghiệp trọn gói uy tín hàng đầu tại TPHCM. Cam kết mang đến không gian sống và làm việc sạch sẽ, an toàn tuyệt đối.
            </p>

            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Trụ sở chính:</strong> {config.address}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Hotline 24/7:</strong> <a href={`tel:${config.hotline}`} className="text-emerald-400 font-bold hover:underline">{config.hotlineDisplay}</a></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>Email hỗ trợ:</strong> {config.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Giờ làm việc:</strong> {config.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Dịch Vụ Vệ Sinh
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#dich-vu" className="hover:text-blue-400 transition-colors">Dọn nhà trọn gói - Chuyển nhà giá rẻ</a></li>
              <li><a href="#dich-vu" className="hover:text-blue-400 transition-colors">Vệ sinh công nghiệp sau xây dựng</a></li>
              <li><a href="#dich-vu" className="hover:text-blue-400 transition-colors">Dọn dẹp nhà cửa theo giờ linh hoạt</a></li>
              <li><a href="#dich-vu" className="hover:text-blue-400 transition-colors">Giặt ghế Sofa, nệm, thảm tại nhà</a></li>
              <li><a href="#dich-vu" className="hover:text-blue-400 transition-colors">Vệ sinh văn phòng & cửa hàng định kỳ</a></li>
              <li><a href="#dich-vu" className="hover:text-blue-400 transition-colors">Lau kính nhà cao tầng & Phun khử khuẩn</a></li>
            </ul>
          </div>

          {/* Col 3: Areas Served & SEO Tags */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Khu Vực Phục Vụ Nhanh (15-30 Phút)
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {config.areasServed.map((area, idx) => (
                <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                  📍 {area}
                </span>
              ))}
            </div>

            <div className="pt-3">
              <div className="text-xs font-bold text-slate-400 mb-1.5">Từ khóa tìm kiếm hot:</div>
              <p className="text-[11px] text-slate-500 leading-normal">
                don nha nguyen duy, dich vu don nha tphcm, ve sinh cong nghiep gia re, giat sofa tai nha, giat nem kymdan, dich vu don nha theo gio, ve sinh sau xay dung, chuyen nha tron goi tphcm.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span>© 2026 {config.brandName}. Tất cả quyền được bảo lưu.</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Đồng hành cùng không gian sạch mát của bạn</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
