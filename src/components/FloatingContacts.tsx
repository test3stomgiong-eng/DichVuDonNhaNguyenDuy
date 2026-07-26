import React from 'react';
import { Phone, MessageCircle, Facebook, Calendar, Sparkles } from 'lucide-react';
import { CompanyConfig } from '../types';

interface FloatingContactsProps {
  config: CompanyConfig;
  onOpenBookingModal: () => void;
}

export const FloatingContacts: React.FC<FloatingContactsProps> = ({ config, onOpenBookingModal }) => {
  return (
    <>
      {/* Desktop Floating Action Stack (Right side) */}
      <div className="hidden md:flex flex-col gap-3 fixed bottom-6 right-6 z-50">
        {/* Quick Booking Button */}
        <button
          onClick={onOpenBookingModal}
          className="group relative bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
          title="Đặt Lịch Nhanh"
        >
          <Calendar className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-bold pr-1">
            Đặt Lịch Giảm {config.promoDiscountPercent}%
          </span>
        </button>

        {/* Facebook Messenger */}
        <a
          href={config.facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
          title="Chat Facebook Messenger"
        >
          <Facebook className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-bold pr-1">
            Chat Facebook
          </span>
        </a>

        {/* Zalo Button */}
        <a
          href={`https://zalo.me/${config.zaloNumber}`}
          target="_blank"
          rel="noreferrer"
          className="group relative bg-sky-500 hover:bg-sky-400 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105 ring-4 ring-sky-500/20"
          title="Chat Zalo Tư Vấn"
        >
          {/* Custom Zalo icon badge */}
          <div className="w-6 h-6 font-black text-xs flex items-center justify-center bg-white text-sky-600 rounded-full border border-sky-400">
            Zalo
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-bold pr-1">
            Chat Zalo ngay ({config.zaloNumber})
          </span>
        </a>

        {/* Phone Call Hot Hotline */}
        <a
          href={`tel:${config.hotline}`}
          className="group relative bg-red-600 hover:bg-red-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
          title="Gọi Hotline Tư Vấn"
        >
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-red-400 animate-ping opacity-75" />
            <Phone className="w-6 h-6 relative z-10" />
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-extrabold pr-1">
            Gọi {config.hotlineDisplay}
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar (Fixed at bottom for smartphones) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 p-2 shadow-2xl">
        <div className="grid grid-cols-4 gap-1.5 items-center max-w-lg mx-auto">
          {/* Phone call */}
          <a
            href={`tel:${config.hotline}`}
            className="flex flex-col items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-1 rounded-xl text-center shadow-md active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5 animate-bounce" />
            <span className="text-[11px] font-bold mt-0.5 whitespace-nowrap">Gọi Ngay</span>
          </a>

          {/* Zalo */}
          <a
            href={`https://zalo.me/${config.zaloNumber}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center bg-sky-500 hover:bg-sky-600 text-white py-2 px-1 rounded-xl text-center shadow-md active:scale-95 transition-transform"
          >
            <div className="w-5 h-5 bg-white text-sky-600 font-extrabold text-[10px] rounded-full flex items-center justify-center">
              Zalo
            </div>
            <span className="text-[11px] font-bold mt-0.5 whitespace-nowrap">Chat Zalo</span>
          </a>

          {/* Facebook */}
          <a
            href={config.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-1 rounded-xl text-center shadow-md active:scale-95 transition-transform"
          >
            <Facebook className="w-5 h-5" />
            <span className="text-[11px] font-bold mt-0.5 whitespace-nowrap">Facebook</span>
          </a>

          {/* Booking CTA */}
          <button
            onClick={onOpenBookingModal}
            className="flex flex-col items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-1 rounded-xl text-center shadow-md active:scale-95 transition-transform font-bold"
          >
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span className="text-[11px] font-black mt-0.5 whitespace-nowrap text-yellow-200">Đặt Lịch</span>
          </button>
        </div>
      </div>
    </>
  );
};
