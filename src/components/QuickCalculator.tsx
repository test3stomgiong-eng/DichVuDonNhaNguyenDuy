import React, { useState } from 'react';
import { Calculator, Check, Sparkles, PhoneCall, MessageCircle } from 'lucide-react';
import { CompanyConfig } from '../types';

interface QuickCalculatorProps {
  config: CompanyConfig;
  onSelectEstimatedBooking: (details: {
    serviceType: string;
    areaSize: number;
    propertyType: string;
    estimatedPrice: number;
    note: string;
  }) => void;
}

export const QuickCalculator: React.FC<QuickCalculatorProps> = ({ config, onSelectEstimatedBooking }) => {
  const [propertyType, setPropertyType] = useState<string>('Chung cư');
  const [areaSize, setAreaSize] = useState<number>(70);
  const [cleaningDepth, setCleaningDepth] = useState<'co-ban' | 'sau-xay-dung' | 'dinh-ky'>('co-ban');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['sofa']);

  const propertyTypes = [
    { id: 'Chung cư', name: 'Căn Hộ / Chung Cư', multiplier: 1.0, icon: '🏢' },
    { id: 'Nhà phố', name: 'Nhà Phố / Tầng Lầu', multiplier: 1.1, icon: '🏠' },
    { id: 'Biệt thự', name: 'Biệt Thự / Penthouse', multiplier: 1.25, icon: '🏰' },
    { id: 'Văn phòng', name: 'Văn Phòng / Cửa Hàng', multiplier: 0.95, icon: '🏬' },
  ];

  const cleaningDepthOptions = [
    { id: 'co-ban', name: 'Dọn dẹp tổng thể cơ bản', pricePerM2: 12000, desc: 'Lau bụi, hút bụi sàn, toilet, kính trong' },
    { id: 'sau-xay-dung', name: 'Tổng vệ sinh sau xây dựng/sửa chữa', pricePerM2: 18000, desc: 'Tẩy sơn, xi măng, keo, hút bụi công nghiệp 3000W' },
    { id: 'dinh-ky', name: 'Dọn nhà duy trì theo giờ (3h)', pricePerM2: 8000, desc: 'Nhân viên chuyên cần lau dọn hằng tuần' },
  ];

  const addonsList = [
    { id: 'sofa', name: 'Giặt 01 Bộ Sofa Nỉ/Da', price: 250000 },
    { id: 'nem', name: 'Giặt 01 Nệm Cao Su/Bông Ép', price: 250000 },
    { id: 'kinh-ngoai', name: 'Lau kính đu dây/kính ngoài ban công', price: 200000 },
    { id: 'khu-khuan', name: 'Phun khử khuẩn Nano Bạc toàn nhà', price: 150000 },
  ];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Calculate Base Price
  const depthObj = cleaningDepthOptions.find((d) => d.id === cleaningDepth) || cleaningDepthOptions[0];
  const propObj = propertyTypes.find((p) => p.id === propertyType) || propertyTypes[0];

  let rawTotal = areaSize * depthObj.pricePerM2 * propObj.multiplier;
  
  // Addons
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = addonsList.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  let grandTotal = Math.round((rawTotal + addonsTotal) / 1000) * 1000;
  if (grandTotal < 400000) grandTotal = 400000; // Minimum order baseline

  const discountedTotal = Math.round((grandTotal * (100 - config.promoDiscountPercent)) / 100);

  const handleApplyEstimate = () => {
    const addonNames = selectedAddons
      .map((id) => addonsList.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    onSelectEstimatedBooking({
      serviceType: `Tổng vệ sinh ${propertyType} (${depthObj.name})`,
      areaSize,
      propertyType,
      estimatedPrice: discountedTotal,
      note: `Dịch vụ đính kèm: ${addonNames || 'Không'}. Ước tính diện tích: ${areaSize}m².`,
    });
  };

  return (
    <section id="tinh-gia" className="py-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-3 border border-blue-500/30">
            <Calculator className="w-4 h-4 text-blue-400" />
            <span>Dự Toán Chi Phí Tự Động</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Công Cụ Tính Giá Dọn Nhà Nhanh Chỉ Trong 10 Giây
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Minh bạch chi phí, không phát sinh. Giảm ngay <span className="text-yellow-400 font-bold">{config.promoDiscountPercent}%</span> khi đăng ký trực tuyến hôm nay.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls column */}
          <div className="lg:col-span-7 bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Step 1: Property Type */}
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
                1. Chọn loại hình bất động sản:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPropertyType(type.id)}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
                      propertyType === type.id
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400'
                        : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-xs sm:text-sm font-semibold">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  2. Diện tích sàn cần dọn dẹp:
                </label>
                <div className="bg-blue-950 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-lg text-lg font-extrabold">
                  {areaSize} m²
                </div>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="5"
                value={areaSize}
                onChange={(e) => setAreaSize(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>30 m² (Căn hộ studio)</span>
                <span>100 m² (Nhà 2-3 tầng)</span>
                <span>300 m² (Biệt thự/Kho)</span>
              </div>
            </div>

            {/* Step 3: Cleaning Depth */}
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
                3. Mức độ vệ sinh mong muốn:
              </label>
              <div className="space-y-2.5">
                {cleaningDepthOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setCleaningDepth(opt.id as any)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      cleaningDepth === opt.id
                        ? 'bg-blue-900/40 border-blue-500 text-white shadow-md'
                        : 'bg-slate-700/40 border-slate-600 text-slate-300 hover:bg-slate-700/80'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      cleaningDepth === opt.id ? 'border-blue-400 bg-blue-500 text-white' : 'border-slate-500'
                    }`}>
                      {cleaningDepth === opt.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-100">{opt.name}</div>
                      <div className="text-xs text-slate-300 mt-0.5">{opt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Addons */}
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2.5 uppercase tracking-wider">
                4. Dịch vụ cộng thêm (Tùy chọn):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between text-xs sm:text-sm transition-all ${
                        isChecked
                          ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-medium'
                          : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{addon.name}</span>
                      <span className="font-bold text-emerald-400 text-xs">+{addon.price.toLocaleString('vi-VN')}đ</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results & CTA Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900/90 to-slate-900 border border-blue-500/40 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative">
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase animate-pulse">
              Ưu đãi giảm {config.promoDiscountPercent}%
            </div>

            <h3 className="text-xl font-extrabold text-blue-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Kết Quả Dự Toán Chi Phí
            </h3>

            <div className="space-y-3 text-sm text-slate-300 border-b border-slate-700/80 pb-4 mb-4">
              <div className="flex justify-between">
                <span>Loại bất động sản:</span>
                <span className="font-semibold text-white">{propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span>Diện tích ước tính:</span>
                <span className="font-semibold text-white">{areaSize} m²</span>
              </div>
              <div className="flex justify-between">
                <span>Gói dịch vụ chính:</span>
                <span className="font-semibold text-white">{depthObj.name}</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex justify-between text-xs text-emerald-300">
                  <span>Dịch vụ cộng thêm ({selectedAddons.length}):</span>
                  <span className="font-semibold">+{(addonsTotal).toLocaleString('vi-VN')}đ</span>
                </div>
              )}
            </div>

            {/* Price display */}
            <div className="bg-slate-900/80 rounded-xl p-4 mb-6 border border-slate-700 text-center">
              <div className="text-xs text-slate-400 line-through mb-1">
                Giá niêm yết: {grandTotal.toLocaleString('vi-VN')} VNĐ
              </div>
              <div className="text-3xl sm:text-4xl font-black text-yellow-400 tracking-tight">
                {discountedTotal.toLocaleString('vi-VN')} <span className="text-lg text-yellow-200 font-semibold">VNĐ</span>
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-1">
                ✓ Đã áp dụng voucher giảm {config.promoDiscountPercent}% và tặng xịt thơm thảo mộc
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleApplyEstimate}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all text-base uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Giữ Giá Ưu Đãi & Đặt Lịch
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${config.hotline}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Gọi Hotline</span>
                </a>

                <a
                  href={`https://zalo.me/${config.zaloNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Zalo Báo Giá</span>
                </a>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
              * Giá trên là mức dự toán chính xác 95%. Kỹ thuật viên Nguyễn Duy sẽ xác nhận lại chi tiết trước khi triển khai.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
