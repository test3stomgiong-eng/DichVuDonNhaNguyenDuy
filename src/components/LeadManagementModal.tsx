import React from 'react';
import { LeadBooking, CompanyConfig } from '../types';
import { X, Trash2, Phone, MessageCircle, Copy, Download, CheckCircle, Calendar, MapPin } from 'lucide-react';

interface LeadManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadBooking[];
  onClearLeads: () => void;
  onUpdateStatus: (id: string, status: LeadBooking['status']) => void;
  config: CompanyConfig;
}

export const LeadManagementModal: React.FC<LeadManagementModalProps> = ({
  isOpen,
  onClose,
  leads,
  onClearLeads,
  onUpdateStatus,
  config,
}) => {
  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã sao chép SĐT/thông tin vào bộ nhớ tạm!');
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Họ Tên', 'SĐT', 'Địa Chỉ', 'Dịch Vụ', 'Ngày Đặt', 'Khung Giờ', 'Ghi Chú', 'Trạng Thái', 'Thời Gian Gửi'];
    const rows = leads.map((l) => [
      l.fullName,
      l.phone,
      l.address,
      l.serviceType,
      l.preferredDate,
      l.preferredTime,
      l.note || '',
      l.status,
      l.createdAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((x) => `"${x}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_don_nha_nguyen_duy_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>Danh Sách Đơn Khách Hàng Từ Ads</span>
              <span className="bg-blue-600 text-white text-xs px-2.5 py-0.5 rounded-full font-black">
                {leads.length} đơn
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Quản lý danh sách khách hàng để lại SĐT trên Landing Page.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {leads.length > 0 && (
              <button
                type="button"
                onClick={handleExportCSV}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất CSV / Excel</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Table */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 font-extrabold text-xl">
                0
              </div>
              <p className="text-sm font-semibold">Chưa có đơn hàng nào từ Form đăng ký.</p>
              <p className="text-xs text-slate-400">
                Khi khách hàng nhập SĐT ở Form banner hoặc Modal, đơn hàng sẽ lập tức hiển thị ở đây!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-blue-300 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-base">{lead.fullName}</span>
                      <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-sm border border-blue-200">
                        {lead.phone}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(lead.phone)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                        title="Copy SĐT"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          lead.status === 'new'
                            ? 'bg-red-100 text-red-700 border border-red-300 animate-pulse'
                            : lead.status === 'contacted'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {lead.status === 'new' ? '• Đơn Mới' : lead.status === 'contacted' ? 'Đã Gọi Tư Vấn' : 'Đã Chốt Lịch'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                      <span className="font-bold text-slate-800">Dịch vụ: {lead.serviceType}</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3" /> {lead.address}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3 h-3" /> {lead.preferredDate} ({lead.preferredTime})
                      </span>
                    </div>

                    {lead.note && (
                      <p className="text-xs text-slate-500 bg-white p-2 rounded-lg border border-slate-200 mt-1 italic">
                        "{lead.note}"
                      </p>
                    )}

                    <div className="text-[10px] text-slate-400 pt-1">
                      Thời gian gửi: {new Date(lead.createdAt).toLocaleString('vi-VN')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                    <a
                      href={`tel:${lead.phone}`}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Gọi Khách</span>
                    </a>

                    <a
                      href={`https://zalo.me/${lead.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Zalo</span>
                    </a>

                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value as any)}
                      className="bg-white border border-slate-300 text-xs font-semibold rounded-xl px-2 py-2 text-slate-700 outline-none"
                    >
                      <option value="new">Mới</option>
                      <option value="contacted">Đã liên hệ</option>
                      <option value="confirmed">Đã chốt</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {leads.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={onClearLeads}
              className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa Tất Cả Đơn Mẫu</span>
            </button>

            <span className="text-slate-500">Tự động lưu vào bộ nhớ trình duyệt</span>
          </div>
        )}
      </div>
    </div>
  );
};
