import React from 'react';
import { customerReviews as defaultReviews } from '../data/initialData';
import { CustomerReview } from '../types';
import { Star, CheckCircle, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  reviews?: CustomerReview[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews = defaultReviews }) => {
  return (
    <section id="danh-gia" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs sm:text-sm font-bold mb-3 border border-yellow-500/30">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>99.8% KHÁCH HÀNG HÀI LÒNG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Khách Hàng Nói Gì Về Dịch Vụ Dọn Nhà Nguyễn Duy?
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Đánh giá thực tế từ người dùng đã trải nghiệm dịch vụ dọn nhà, vệ sinh công nghiệp tại TPHCM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative"
            >
              <Quote className="w-10 h-10 text-slate-700/50 absolute top-4 right-4 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" title="Xác minh chính chủ" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">{rev.role}</div>
                  <div className="text-[10px] text-blue-400 font-semibold mt-0.5">
                    Đã dùng: {rev.serviceUsed} • {rev.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
