import React, { useState } from 'react';
import { servicesList } from '../data/initialData';
import { ServiceItem, CompanyConfig } from '../types';
import { Check, Sparkles, ArrowRight, Shield, Clock } from 'lucide-react';

interface ServicesSectionProps {
  config: CompanyConfig;
  services?: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ config, services = servicesList, onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => {
        if (activeCategory === 'don-nha') return s.id.includes('don-nha');
        if (activeCategory === 've-sinh') return s.id.includes('ve-sinh');
        if (activeCategory === 'giat-sofa') return s.id.includes('giat-sofa');
        return true;
      });

  return (
    <section id="dich-vu" className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold mb-3 border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Dịch Vụ Vệ Sinh Hàng Đầu TPHCM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Các Dịch Vụ Dọn Nhà & Vệ Sinh Chuyên Nghiệp Nguyễn Duy
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Đội ngũ được đào tạo bài bản, máy móc hiện đại, bảng giá minh bạch công khai. Đáp ứng mọi nhu cầu vệ sinh từ hộ gia đình đến doanh nghiệp.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Tất Cả Dịch Vụ' },
            { id: 'don-nha', label: 'Dọn Nhà & Chuyển Nhà' },
            { id: 've-sinh', label: 'Vệ Sinh Công Nghiệp' },
            { id: 'giat-sofa', label: 'Giặt Sofa & Nệm' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group ${
                service.popular ? 'ring-2 ring-blue-500/80 relative' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Gói Bán Chạy
                </div>
              )}

              {/* Service Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white flex justify-between items-end">
                  {service.badge && (
                    <span className="bg-blue-600/90 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      {service.badge}
                    </span>
                  )}
                  <div className="text-right">
                    <span className="text-xs text-slate-200">Chỉ từ</span>
                    <div className="text-xl font-extrabold text-yellow-300">
                      {service.startingPrice} <span className="text-xs font-normal text-white">{service.unit}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Nhận Báo Giá Dịch Vụ</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner Callout */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Cần Khảo Sát & Báo Giá Công Trình Lớn Hoặc Tòa Nhà?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Kỹ thuật viên Nguyễn Duy sẽ đến tận nơi đo đạc diện tích, lên phương án thi công và báo giá chi tiết hoàn toàn miễn phí sau 15-30 phút!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${config.hotline}`}
              className="bg-red-600 hover:bg-red-700 text-white font-black py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Gọi Khảo Sát Tận Nơi</span>
            </a>

            <a
              href={`https://zalo.me/${config.zaloNumber}`}
              target="_blank"
              rel="noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Gửi Ảnh Cần Dọn Qua Zalo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
