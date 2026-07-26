import React from 'react';
import { PhoneCall, FileText, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Tiếp Nhận Thông Tin',
      desc: 'Quý khách đăng ký qua Form, gọi Hotline hoặc nhắn Zalo. Nguyễn Duy tư vấn gói dịch vụ phù hợp nhất.',
      icon: PhoneCall,
      color: 'bg-blue-500',
    },
    {
      num: '02',
      title: 'Khảo Sát & Báo Giá',
      desc: 'Kỹ thuật viên đến tận nơi đo đạc diện tích, đánh giá vết bẩn và báo giá trọn gói miễn phí sau 15-30 phút.',
      icon: FileText,
      color: 'bg-indigo-500',
    },
    {
      num: '03',
      title: 'Thi Công Vệ Sinh',
      desc: 'Đội ngũ mang máy móc hiện đại, hóa chất an toàn ISO đến làm sạch đúng tiến độ và tiêu chuẩn cam kết.',
      icon: Wrench,
      color: 'bg-emerald-500',
    },
    {
      num: '04',
      title: 'Nghiệm Thu & Bảo Hành',
      desc: 'Gia chủ kiểm tra hài lòng 100% mới tiến hành thanh toán. Nguyễn Duy bảo hành chu đáo hậu dịch vụ.',
      icon: ShieldCheck,
      color: 'bg-amber-500',
    },
  ];

  return (
    <section id="quy-trinh" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-bold mb-3 border border-blue-500/30">
            <span>QUY TRÌNH CHUẨN ISO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quy Trình Phục Vụ 4 Bước Chuyên Nghiệp & Nhanh Chóng
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Minh bạch, an toàn và tối ưu thời gian tối đa cho quý khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div
                key={s.num}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 relative flex flex-col justify-between hover:border-blue-500 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${s.color} text-white flex items-center justify-center font-bold shadow-lg`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-600 group-hover:text-blue-400 transition-colors">
                      {s.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{s.desc}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
