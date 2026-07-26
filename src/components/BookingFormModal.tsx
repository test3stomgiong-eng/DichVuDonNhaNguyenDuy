import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Phone, Calendar, Clock, MapPin, User, MessageSquare } from 'lucide-react';
import { CompanyConfig, LeadBooking } from '../types';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onSubmitLead: (leadData: Omit<LeadBooking, 'id' | 'status' | 'createdAt'>) => void;
  initialData?: Partial<Omit<LeadBooking, 'id' | 'status' | 'createdAt'>>;
}

export const BookingFormModal: React.FC<BookingFormModalProps> = ({
  isOpen,
  onClose,
  config,
  onSubmitLead,
  initialData,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [serviceType, setServiceType] = useState(initialData?.serviceType || 'Vệ Sinh Sau Xây Dựng & Dọn Nhà');
  const [district, setDistrict] = useState(initialData?.address || '');
  const [preferredDate, setPreferredDate] = useState(
    initialData?.preferredDate || new Date().toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState(initialData?.preferredTime || '08:00 sáng');
  const [note, setNote] = useState(initialData?.note || '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    onSubmitLead({
      fullName: fullName || 'Khách Hàng Đặt Lịch',
      phone,
      address: district || 'Chưa cung cấp địa chỉ',
      serviceType,
      preferredDate,
      preferredTime,
      note,
      estimatedPrice: initialData?.estimatedPrice,
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-7 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-slate-900 text-xs font-black uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ưu Đãi Giảm {config.promoDiscountPercent}% Hôm Nay</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            ĐẶT LỊCH DỌN NHÀ NGUYỄN DUY
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Nhân viên khảo sát & báo giá tận nơi sau 15 phút hoàn toàn miễn phí!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-extrabold text-slate-900">Đăng Ký Đặt Lịch Thành Công!</h4>
              
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Thông tin của quý khách đã được chuyển đến bộ phận CSKH Dọn Nhà Nguyễn Duy. Chúng tôi sẽ gọi tới số <span className="font-extrabold text-blue-600">{phone}</span> trong vòng 2 phút.
              </p>

              <div className="pt-3 space-y-2.5">
                <a
                  href={`https://zalo.me/${config.zaloNumber}?text=${encodeURIComponent(
                    `Chào Dọn Nhà Nguyễn Duy, tôi vừa đặt lịch dịch vụ: ${serviceType} ngày ${preferredDate}. SĐT của tôi: ${phone}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Nhắn Trực Tiếp Qua Zalo Nguyễn Duy</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs"
                >
                  Đóng Cửa Sổ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ & Tên khách hàng:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Anh/Chị..."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số Điện Thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="Nhập SĐT Zalo..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 outline-none font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loại Dịch Vụ Cần Dọn:
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 outline-none font-medium bg-white"
                >
                  <option value="Dọn Nhà Trọn Gói - Chuyển Nhà">Dọn Nhà Trọn Gói - Chuyển Nhà</option>
                  <option value="Vệ Sinh Sau Xây Dựng & Dọn Nhà">Vệ Sinh Sau Xây Dựng & Dọn Nhà</option>
                  <option value="Dọn Nhà Theo Giờ / Định Kỳ">Dọn Nhà Theo Giờ / Định Kỳ</option>
                  <option value="Giặt Sofa - Nệm - Thảm - Rèm">Giặt Sofa - Nệm - Thảm - Rèm</option>
                  <option value="Vệ Sinh Văn Phòng - Cửa Hàng">Vệ Sinh Văn Phòng - Cửa Hàng</option>
                  <option value="Lau Kính Tòa Nhà & Khử Khuẩn">Lau Kính Tòa Nhà & Khử Khuẩn</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa Chỉ Cụ Thể (Quận/Huyện):
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Số nhà, Tên đường, Quận..."
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ngày Dọn Muốn Làm:
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Khung Giờ Khảo Sát:
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 outline-none bg-white font-medium"
                    >
                      <option value="Càng sớm càng tốt (15-30 phút)">Càng sớm càng tốt (15-30 phút)</option>
                      <option value="08:00 sáng">08:00 sáng</option>
                      <option value="10:00 sáng">10:00 sáng</option>
                      <option value="14:00 chiều">14:00 chiều</option>
                      <option value="17:00 chiều">17:00 chiều</option>
                      <option value="Khung giờ tối">Khung giờ tối (Sau 18:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ghi Chú Yêu Cầu (Tùy chọn):
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Nhà 2 tầng, dọn dẹp phòng bếp và giặt bộ sofa nỉ..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              {initialData?.estimatedPrice && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl text-center">
                  <span className="text-xs text-slate-600">Giá dự toán đã chọn:</span>
                  <div className="text-lg font-black text-red-600">
                    {initialData.estimatedPrice.toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/30 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>XÁC NHẬN ĐẶT LỊCH - GIỮ MÃ GIẢM 20%</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
