import React, { useState } from 'react';
import { CompanyConfig } from '../types';
import { X, Save, RefreshCw, Settings, Phone, MessageCircle, Facebook, MapPin, Tag } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onSaveConfig: (updated: CompanyConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<CompanyConfig>({ ...config });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-slate-200">
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold">Cấu Hình Chiến Dịch Ads & Liên Hệ</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="text-xs text-slate-500 bg-blue-50 p-3 rounded-xl border border-blue-200">
            ℹ️ Thay đổi SĐT Hotline, Zalo, Facebook ở đây để đồng bộ tất cả các nút kết nối nổi trên toàn bộ Landing Page!
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tên Thương Hiệu:</label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-red-600" /> Số Hotline Gọi (viết liền):
              </label>
              <input
                type="text"
                value={formData.hotline}
                onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                SĐT Hiển Thị Bàn Phím:
              </label>
              <input
                type="text"
                value={formData.hotlineDisplay}
                onChange={(e) => setFormData({ ...formData, hotlineDisplay: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-sky-500" /> Số Zalo Tiếp Nhận:
              </label>
              <input
                type="text"
                value={formData.zaloNumber}
                onChange={(e) => setFormData({ ...formData, zaloNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Facebook className="w-3.5 h-3.5 text-blue-600" /> Link Trang Facebook:
              </label>
              <input
                type="text"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-500" /> Phần Trăm Giảm Giá (%):
            </label>
            <input
              type="number"
              value={formData.promoDiscountPercent}
              onChange={(e) => setFormData({ ...formData, promoDiscountPercent: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tiêu Đề Khuyến Mãi Banner Top:
            </label>
            <input
              type="text"
              value={formData.promoTitle}
              onChange={(e) => setFormData({ ...formData, promoTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Địa Chỉ Trụ Sở Hiển Thị:
            </label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 outline-none"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Cấu Hình Chiến Dịch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
