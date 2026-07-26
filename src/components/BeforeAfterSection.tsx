import React, { useState } from 'react';
import { beforeAfterCases as defaultCases } from '../data/initialData';
import { BeforeAfterCase } from '../types';
import { Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface BeforeAfterSectionProps {
  cases?: BeforeAfterCase[];
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ cases = defaultCases }) => {
  const [activeCaseId, setActiveCaseId] = useState<string>(() => (cases[0] ? cases[0].id : ''));
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100%

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0] || {
    id: 'empty',
    title: 'Chưa có hình ảnh',
    category: 'N/A',
    beforeImg: '',
    afterImg: '',
    description: '',
    timeTaken: '0h'
  };

  return (
    <section id="hinh-thuc-te" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold mb-3 border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Kết Quả Thực Tế 100%</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hình Ảnh Thực Tế Trước & Sau Khi Nguyễn Duy Vệ Sinh
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Kéo thanh trượt bên dưới để xem sự biến đổi kinh ngạc của không gian sống sau khi được đội ngũ chuyên nghiệp Nguyễn Duy làm sạch sâu.
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseId(c.id);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeCaseId === c.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{c.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 border border-slate-800">
          <div className="relative h-[320px] sm:h-[450px] rounded-2xl overflow-hidden select-none touch-none">
            {/* After Image (Background) */}
            <img
              src={activeCase.afterImg}
              alt="Sau khi vệ sinh Nguyễn Duy"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
              ✨ SAU KHI NGUYỄN DUY DỌN SẠCH
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={activeCase.beforeImg}
                alt="Trước khi vệ sinh"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider border border-slate-700">
                ⚠️ TRƯỚC KHI VỆ SINH
              </div>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white text-slate-900 rounded-full shadow-2xl flex items-center justify-center font-bold text-xs border-2 border-blue-600">
                ↔
              </div>
            </div>

            {/* Slider Range Control Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
            />
          </div>

          {/* Description below comparison */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white pt-4 border-t border-slate-800">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-lg font-bold text-blue-300">{activeCase.title}</div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {activeCase.description}
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-center shrink-0">
              <div className="text-[11px] text-slate-400">Thời gian làm sạch:</div>
              <div className="text-sm font-extrabold text-emerald-400 flex items-center gap-1.5 justify-center">
                <Clock className="w-4 h-4" />
                <span>{activeCase.timeTaken}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
