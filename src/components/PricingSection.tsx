import React, { useState, useEffect } from 'react';
import { pricePackages } from '../data/initialData';
import { CompanyConfig, PricePackage } from '../types';
import { Check, Sparkles, Clock, ShieldCheck, Tag } from 'lucide-react';

interface PricingSectionProps {
  config: CompanyConfig;
  packages?: PricePackage[];
  onSelectPackage: (pkg: PricePackage) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ config, packages = pricePackages, onSelectPackage }) => {
  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const priceTableData = [
    { name: 'Căn Hộ Chung Cư (50 - 70m²)', price: '600.000đ - 900.000đ', duration: '3 - 4 Giờ', staff: '2 - 3 Nhân viên' },
    { name: 'Căn Hộ Chung Cư (80 - 120m²)', price: '950.000đ - 1.400.000đ', duration: '4 - 5 Giờ', staff: '3 - 4 Nhân viên' },
    { name: 'Nhà Phố 2 - 3 Tầng (150 - 250m²)', price: '1.500.000đ - 2.500.000đ', duration: '5 - 7 Giờ', staff: '4 - 5 Nhân viên' },
    { name: 'Biệt Thự / Penthouse (> 300m²)', price: 'Khảo sát báo giá trực tiếp', duration: '1 Ngày', staff: '6 - 10 Nhân viên' },
    { name: 'Giặt Ghế Sofa Nỉ / Da / Vải', price: '250.000đ / Bộ', duration: '45 Phút', staff: '1 Kỹ thuật viên' },
    { name: 'Giặt Nệm Kymdan / Bông Ép', price: '250.000đ / Tấm', duration: '45 Phút', staff: '1 Kỹ thuật viên' },
    { name: 'Dọn Dẹp Theo Giờ Linh Hoạt', price: '60.000đ / Giờ', duration: 'Tối thiểu 3h', staff: '1 Nhân viên' },
  ];

  return (
    <section id="bang-gia" className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs sm:text-sm font-bold mb-3 border border-red-200">
            <Tag className="w-4 h-4 text-red-600" />
            <span>BẢNG GIÁ MINH BẠCH - KHÔNG PHÁT SINH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bảng Giá Dịch Vụ Dọn Nhà Nguyễn Duy Năm 2026
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Khảo sát miễn phí, cam kết giá cạnh tranh nhất thị trường TPHCM.
          </p>
        </div>

        {/* Promo Urgency Banner */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="bg-yellow-400 text-slate-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Khuyến Mãi Hạn Giờ Cho Khách Ads
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              GIẢM NGAY {config.promoDiscountPercent}% KHI ĐẶT LỊCH TRONG HÔM NAY!
            </h3>
            <p className="text-red-100 text-xs sm:text-sm">
              Áp dụng cho 20 khách hàng đầu tiên trong ngày. Tặng kèm gói xịt thơm diệt khuẩn trị giá 150.000đ.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 shrink-0 z-10">
            <div className="text-center bg-slate-900/80 backdrop-blur px-3 py-2 rounded-xl border border-red-400/30 min-w-[60px]">
              <div className="text-2xl font-black text-yellow-300">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-[10px] text-slate-300 uppercase">Giờ</div>
            </div>
            <span className="text-2xl font-black text-white">:</span>
            <div className="text-center bg-slate-900/80 backdrop-blur px-3 py-2 rounded-xl border border-red-400/30 min-w-[60px]">
              <div className="text-2xl font-black text-yellow-300">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-[10px] text-slate-300 uppercase">Phút</div>
            </div>
            <span className="text-2xl font-black text-white">:</span>
            <div className="text-center bg-slate-900/80 backdrop-blur px-3 py-2 rounded-xl border border-red-400/30 min-w-[60px]">
              <div className="text-2xl font-black text-yellow-300">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-[10px] text-slate-300 uppercase">Giây</div>
            </div>
          </div>
        </div>

        {/* Feature Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'border-blue-500 ring-2 ring-blue-500/80 shadow-2xl scale-102'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                  Gói Được Chọn Nhiều Nhất
                </div>
              )}

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{pkg.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{pkg.description}</p>

                <div className="my-6 pt-4 border-t border-slate-100">
                  {pkg.originalPrice && (
                    <span className="text-xs text-slate-400 line-through block">
                      Giá niêm yết: {pkg.originalPrice}
                    </span>
                  )}
                  <div className="text-3xl font-black text-blue-600 tracking-tight">
                    {pkg.price}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">{pkg.unit}</div>
                </div>

                <div className="space-y-3 pt-2">
                  {pkg.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all shadow-md ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {pkg.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reference Price Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Bảng Tham Khảo Theo Quy Mô Căn Hộ</h3>
              <p className="text-xs text-slate-500">Mức giá thực tế tùy thuộc vào mức độ bụi bẩn và yêu cầu phát sinh</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
              Cập nhật mới nhất 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Loại Hình / Công Việc</th>
                  <th className="p-3.5">Giá Tham Khảo</th>
                  <th className="p-3.5">Thời Gian Thi Công</th>
                  <th className="p-3.5 rounded-r-xl">Nhân Lực Cung Cấp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {priceTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{row.name}</td>
                    <td className="p-3.5 font-bold text-blue-600">{row.price}</td>
                    <td className="p-3.5 text-slate-600">{row.duration}</td>
                    <td className="p-3.5 text-slate-600">{row.staff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
