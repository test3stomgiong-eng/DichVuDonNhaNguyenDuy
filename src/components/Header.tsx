import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Sparkles, Menu, X, ShieldCheck, Clock, Settings, Users, Lock } from 'lucide-react';
import { CompanyConfig } from '../types';

interface HeaderProps {
  config: CompanyConfig;
  onOpenBookingModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenLeadModal: () => void;
  onOpenAdminModal: () => void;
  leadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenBookingModal,
  onOpenSettingsModal,
  onOpenLeadModal,
  onOpenAdminModal,
  leadCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang Chủ', href: '#trang-chu' },
    { label: 'Dịch Vụ', href: '#dich-vu' },
    { label: 'Tính Giá', href: '#tinh-gia' },
    { label: 'Quy Trình', href: '#quy-trinh' },
    { label: 'Bảng Giá', href: '#bang-gia' },
    { label: 'Hình Thực Tế', href: '#hinh-thuc-te' },
    { label: 'Đánh Giá', href: '#danh-gia' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Notification Bar for Ads urgency */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 font-medium">
            <span className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
              HOT ADS
            </span>
            <span className="truncate max-w-md">{config.promoTitle}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Phục vụ 24/7: {config.operatingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-900'
            : 'bg-white py-4 text-slate-900 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#trang-chu" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-lg sm:text-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              ND
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base lg:text-lg leading-tight text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors whitespace-nowrap">
                DỌN NHÀ NGUYỄN DUY
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium flex items-center gap-1 whitespace-nowrap">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Chuyên Nghiệp • Uy Tín • Giá Tốt</span>
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 text-xs xl:text-sm font-semibold text-slate-700 whitespace-nowrap shrink-0 mx-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-600 transition-colors py-1 relative whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0 whitespace-nowrap">
            <a
              href={`tel:${config.hotline}`}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-sm font-bold transition-all"
            >
              <Phone className="w-4 h-4 text-red-600 animate-pulse" />
              <span>{config.hotlineDisplay}</span>
            </a>

            <a
              href={`https://zalo.me/${config.zaloNumber}`}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 px-3 py-2 rounded-xl text-sm font-bold transition-all"
            >
              <MessageCircle className="w-4 h-4 text-sky-600" />
              <span>Zalo</span>
            </a>

            <button
              type="button"
              onClick={onOpenBookingModal}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-extrabold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Đặt Lịch Ngay</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              Đặt Lịch
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-50 text-slate-800 hover:bg-blue-50 hover:text-blue-600"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="w-full bg-slate-900 text-white font-black py-2.5 rounded-xl text-center flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <Lock className="w-4 h-4 text-amber-300" />
                <span>Trang Quản Trị Admin Chuyên Sâu</span>
              </button>

              <a
                href={`tel:${config.hotline}`}
                className="w-full bg-red-600 text-white font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi Hotline {config.hotlineDisplay}</span>
              </a>

              <a
                href={`https://zalo.me/${config.zaloNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-sky-500 text-white font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo Báo Giá</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
