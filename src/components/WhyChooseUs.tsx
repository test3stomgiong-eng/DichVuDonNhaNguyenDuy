import React from 'react';
import { ShieldCheck, UserCheck, Wrench, Banknote, Sparkles, Award, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      title: 'Đội Ngũ Nhân Viên Lý Lịch Minh Bạch',
      desc: '100% nhân viên dọn dẹp đều được xác minh căn cước công dân, khám sức khỏe định kỳ, có thái độ trung thực, nhiệt tình và đào tạo bài bản.',
      icon: UserCheck,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Thiết Bị & Hóa Chất An Toàn ISO',
      desc: 'Sử dụng máy hút bụi công nghiệp 3000W, máy chà sàn, máy phun hơi nước nóng 100°C cùng hóa chất sinh học không độc hại, an toàn cho trẻ nhỏ.',
      icon: Wrench,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Bảo Hiểm 100% Giá Trị Tài Sản',
      desc: 'Nguyễn Duy cam kết chịu trách nhiệm bồi thường 100% giá trị tài sản nếu trong quá trình vệ sinh xảy ra hư hỏng hoặc mất mát đồ đạc.',
      icon: ShieldCheck,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Báo Giá Trọn Gói - Không Phát Sinh',
      desc: 'Khảo sát và báo giá công khai trước khi làm. Chốt số tiền nào thanh toán số tiền đó, không đòi thêm tiền boa hay bất kỳ phụ phí giấu ẩn nào.',
      icon: Banknote,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      title: 'Phục Vụ Nhanh 24/7 Toàn TPHCM',
      desc: 'Có mặt ngay sau 15-30 phút kể từ khi nhận yêu cầu. Làm việc tất cả các ngày trong tuần, Lễ Tết và có nhận làm ca đêm cho văn phòng.',
      icon: Clock,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Nghiệm Thu Hài Lòng Mới Thu Tiền',
      desc: 'Gia chủ trực tiếp đi kiểm tra từng ngóc ngách, vết bẩn nào chưa ưng ý sẽ được làm lại ngay lập tức đến khi hoàn toàn hài lòng mới thanh toán.',
      icon: Award,
      color: 'text-sky-600 bg-sky-50',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold mb-3 border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>TẠI SAO CHỌN NGUYỄN DUY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            6 Lý Do Hơn 10.000 Khách Hàng Tin Chọn Dọn Nhà Nguyễn Duy
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Uy tín tạo nên thương hiệu. Tận tâm trong từng ngóc ngách ngôi nhà bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, idx) => {
            const IconComp = r.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${r.color} flex items-center justify-center mb-4 font-bold shadow-sm group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
