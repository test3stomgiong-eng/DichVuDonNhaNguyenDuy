import React, { useState } from 'react';
import { ShieldCheck, Clock, CheckCircle2, PhoneCall, Sparkles, Send, Award, Star, MapPin } from 'lucide-react';
import { CompanyConfig, LeadBooking } from '../types';

interface HeroSectionProps {
  config: CompanyConfig;
  onSubmitLead: (leadData: Omit<LeadBooking, 'id' | 'status' | 'createdAt'>) => void;
  onOpenBookingModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onSubmitLead, onOpenBookingModal }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Vệ Sinh Sau Xây Dựng & Dọn Nhà');
  const [district, setDistrict] = useState('Tất cả các quận TPHCM');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitQuickForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    onSubmitLead({
      fullName: fullName || 'Khách hàng Ads',
      phone,
      address: district,
      serviceType,
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Càng sớm càng tốt',
      note: 'Đăng ký nhanh từ Form Banner Hero',
    });

    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 5000);
  };

  return (
    <section id="trang-chu" className="pt-28 sm:pt-36 pb-12 sm:pb-20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle Glow Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Benefits */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-300">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>TOP 1 Dịch Vụ Dọn Nhà & Vệ Sinh Công Nghiệp Uy Tín</span>
            </div>

            {/* H1 SEO Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-none">
              DỊCH VỤ DỌN NHÀ & VỆ SINH <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-emerald-300 to-sky-300">
                NGUYỄN DUY TRỌN GÓI
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Sạch bóng không tì vết từ trần đến sàn! Đội ngũ nhân viên giàu kinh nghiệm, máy móc hiện đại ISO. <span className="text-yellow-300 font-bold">Khảo sát & báo giá miễn phí sau 15 phút.</span>
            </p>

            {/* Key Value Points Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5 bg-slate-800/60 border border-slate-700/80 p-3 rounded-xl">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100">Có Mặt Sau 15-30 Phút</div>
                  <div className="text-[11px] text-slate-400">Phục vụ 24/7 toàn bộ TPHCM</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-800/60 border border-slate-700/80 p-3 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100">Bảo Hiểm 100% Tài Sản</div>
                  <div className="text-[11px] text-slate-400">Cam kết đền bù nếu hư hỏng</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-800/60 border border-slate-700/80 p-3 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100">Nghiệm Thu Mới Thanh Toán</div>
                  <div className="text-[11px] text-slate-400">Hài lòng 100% mới nhận tiền</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-800/60 border border-slate-700/80 p-3 rounded-xl">
                <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100">Giá Rẻ Công Khai</div>
                  <div className="text-[11px] text-slate-400">Không phát sinh chi phí</div>
                </div>
              </div>
            </div>

            {/* Social proof bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Avatar" className="w-7 h-7 rounded-full border-2 border-slate-900" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Avatar" className="w-7 h-7 rounded-full border-2 border-slate-900" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" alt="Avatar" className="w-7 h-7 rounded-full border-2 border-slate-900" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="font-extrabold text-white">10.000+</span> Đã dọn nhà sạch
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5</span> (2.400+ Đánh giá)
              </div>
            </div>
          </div>

          {/* Right Column: High Converting Quick Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl relative border-2 border-yellow-400">
              {/* Promo badge header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold text-center py-2 px-4 -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 rounded-t-2xl text-xs sm:text-sm tracking-wide uppercase shadow-md flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Đăng Ký Đặt Lịch - Giảm Ngay 20%</span>
              </div>

              <div className="text-center mt-5 mb-5">
                <h3 className="text-xl font-extrabold text-slate-900">
                  NHẬN BÁO GIÁ DỌN NHÀ MIỄN PHÍ
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Nhập số điện thoại, Nguyễn Duy gọi lại tư vấn chỉ sau <span className="font-bold text-red-600">2 phút</span>!
                </p>
              </div>

              {submittedSuccess ? (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-extrabold text-lg text-emerald-900">Đăng Ký Thành Công!</h4>
                  <p className="text-xs text-emerald-700">
                    Cảm ơn quý khách! Đội ngũ tư vấn Dọn Nhà Nguyễn Duy sẽ liên hệ lại số <span className="font-bold">{phone}</span> ngay lập tức.
                  </p>
                  <a
                    href={`https://zalo.me/${config.zaloNumber}?text=${encodeURIComponent(`Chào Dọn Nhà Nguyễn Duy, tôi vừa đăng ký tư vấn dịch vụ: ${serviceType}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl w-full"
                  >
                    <span>Mở Zalo nhắn tin trực tiếp với Nguyễn Duy</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuickForm} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Họ và Tên của bạn:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Anh Nam / Chị Thảo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-800 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số Điện Thoại Nhận Báo Giá <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại Zalo..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-800 outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Loại Dịch Vụ Cần Dọn:
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-800 outline-none bg-white font-medium"
                    >
                      <option value="Dọn Nhà Trọn Gói - Chuyển Nhà">Dọn Nhà Trọn Gói - Chuyển Nhà</option>
                      <option value="Vệ Sinh Sau Xây Dựng & Dọn Nhà">Vệ Sinh Sau Xây Dựng & Dọn Nhà</option>
                      <option value="Dọn Nhà Theo Giờ / Định Kỳ">Dọn Nhà Theo Giờ / Định Kỳ</option>
                      <option value="Giặt Sofa - Nệm - Thảm - Rèm">Giặt Sofa - Nệm - Thảm - Rèm</option>
                      <option value="Vệ Sinh Văn Phòng - Cửa Hàng">Vệ Sinh Văn Phòng - Cửa Hàng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Khu Vực Dọn Dẹp:
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Nhập Quận/Huyện (VD: Quận 7, Thủ Đức...)"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/30 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>GỬI YÊU CẦU - BÁO GIÁ NGAY</span>
                  </button>
                </form>
              )}

              <div className="mt-4 pt-3 border-t border-slate-100 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
                <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                <span>Hoặc gọi nhanh: <a href={`tel:${config.hotline}`} className="font-extrabold text-red-600 hover:underline">{config.hotlineDisplay}</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
