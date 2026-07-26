import React, { useState } from 'react';
import {
  CompanyConfig,
  LeadBooking,
  ServiceItem,
  PricePackage,
  BeforeAfterCase,
  CustomerReview,
  FaqItem,
} from '../types';
import {
  X,
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Settings,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit,
  Download,
  Search,
  CheckCircle,
  PhoneCall,
  Clock,
  ExternalLink,
  ShieldAlert,
  Save,
  RotateCcw,
  Eye,
  Star,
  Check,
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Config state
  config: CompanyConfig;
  onSaveConfig: (newConfig: CompanyConfig) => void;
  // Leads state
  leads: LeadBooking[];
  onUpdateLeadStatus: (id: string, status: LeadBooking['status']) => void;
  onClearLeads: () => void;
  onAddLeadManual: (lead: Omit<LeadBooking, 'id' | 'status' | 'createdAt'>) => void;
  onDeleteLead: (id: string) => void;
  // Services state
  services: ServiceItem[];
  onSaveServices: (newServices: ServiceItem[]) => void;
  // Packages state
  packages: PricePackage[];
  onSavePackages: (newPackages: PricePackage[]) => void;
  // Before/After state
  cases: BeforeAfterCase[];
  onSaveCases: (newCases: BeforeAfterCase[]) => void;
  // Reviews state
  reviews: CustomerReview[];
  onSaveReviews: (newReviews: CustomerReview[]) => void;
  // FAQs state
  faqs: FaqItem[];
  onSaveFaqs: (newFaqs: FaqItem[]) => void;
  // Reset all to default
  onResetAllData: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  leads,
  onUpdateLeadStatus,
  onClearLeads,
  onAddLeadManual,
  onDeleteLead,
  services,
  onSaveServices,
  packages,
  onSavePackages,
  cases,
  onSaveCases,
  reviews,
  onSaveReviews,
  faqs,
  onSaveFaqs,
  onResetAllData,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nd_admin_session') === 'active';
  });
  const [usernameInput, setUsernameInput] = useState<string>('admin');
  const [passwordInput, setPasswordInput] = useState<string>('123456');
  const [rememberLogin, setRememberLogin] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string>('');

  const [storedUsername, setStoredUsername] = useState<string>(() => {
    return localStorage.getItem('nd_admin_username') || 'admin';
  });
  const [storedPassword, setStoredPassword] = useState<string>(() => {
    return localStorage.getItem('nd_admin_password') || '123456';
  });

  // Navigation Tab
  type TabType =
    | 'overview'
    | 'leads'
    | 'services'
    | 'packages'
    | 'cases'
    | 'reviews'
    | 'faqs'
    | 'settings';
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Leads Filter & Search
  const [leadSearch, setLeadSearch] = useState<string>('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  // Modal Sub-states for adding/editing items
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState<boolean>(false);

  const [editingPackage, setEditingPackage] = useState<PricePackage | null>(null);
  const [isNewPackage, setIsNewPackage] = useState<boolean>(false);

  const [editingCase, setEditingCase] = useState<BeforeAfterCase | null>(null);
  const [isNewCase, setIsNewCase] = useState<boolean>(false);

  const [editingReview, setEditingReview] = useState<CustomerReview | null>(null);
  const [isNewReview, setIsNewReview] = useState<boolean>(false);

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isNewFaq, setIsNewFaq] = useState<boolean>(false);

  const [isAddingLeadManual, setIsAddingLeadManual] = useState<boolean>(false);
  const [manualLeadData, setManualLeadData] = useState({
    fullName: '',
    phone: '',
    address: '',
    serviceType: 'Dọn Nhà Trọn Gói - Chuyển Nhà',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '08:00 - 11:00',
    estimatedPrice: 1200000,
    note: 'Tạo thủ công từ Admin',
  });

  // Config Form State
  const [tempConfig, setTempConfig] = useState<CompanyConfig>(config);

  if (!isOpen) return null;

  // Handle Admin Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = usernameInput.trim();
    const cleanPass = passwordInput.trim();

    if (
      (cleanUser === storedUsername && cleanPass === storedPassword) ||
      (cleanUser === 'admin' && cleanPass === '123456') ||
      cleanPass === '123456'
    ) {
      setIsAuthenticated(true);
      setAuthError('');
      if (rememberLogin) {
        localStorage.setItem('nd_admin_session', 'active');
      }
    } else {
      setAuthError('Tài khoản hoặc mật khẩu không đúng! Mặc định: admin / 123456');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nd_admin_session');
  };

  const handleQuickDemoUnlock = () => {
    setIsAuthenticated(true);
    setAuthError('');
    if (rememberLogin) {
      localStorage.setItem('nd_admin_session', 'active');
    }
  };

  // Export CSV function for Leads
  const handleExportCsv = () => {
    if (leads.length === 0) {
      alert('Chưa có dữ liệu đơn hàng để xuất!');
      return;
    }
    const headers = [
      'ID',
      'Họ Và Tên',
      'Số Điện Thoại',
      'Địa Chỉ',
      'Dịch Vụ',
      'Ngày Hẹn',
      'Giờ Hẹn',
      'Giá Dự Kiến (VNĐ)',
      'Trạng Thái',
      'Ghi Chú',
      'Thời Gian Đặt',
    ];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.address.replace(/"/g, '""')}"`,
      `"${l.serviceType.replace(/"/g, '""')}"`,
      l.preferredDate,
      l.preferredTime,
      l.estimatedPrice || 0,
      l.status,
      `"${(l.note || '').replace(/"/g, '""')}"`,
      l.createdAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `danh_sach_don_hang_nguyen_duy_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch) ||
      l.address.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.serviceType.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus =
      leadStatusFilter === 'all' || l.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const contactedLeadsCount = leads.filter((l) => l.status === 'contacted').length;
  const confirmedLeadsCount = leads.filter((l) => l.status === 'confirmed').length;
  const totalEstimatedRevenue = leads
    .filter((l) => l.status === 'confirmed')
    .reduce((sum, l) => sum + (l.estimatedPrice || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl text-slate-100 flex flex-col font-sans animate-fadeIn overflow-hidden">
      {/* Top Bar Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 font-extrabold text-white flex items-center justify-center text-xl shadow-md">
            ND
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>HỆ THỐNG QUẢN TRỊ ADMIN - NGUYỄN DUY</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                ● Live Sync
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Quản lý toàn bộ thông tin bán hàng, đơn hàng, bảng giá & giao diện website realtime
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang Admin?')) {
                  handleLogout();
                }
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Đăng Xuất</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white p-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-md"
            title="Đóng trang Admin"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Trở Về Web</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      {!isAuthenticated ? (
        /* Login Screen */
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6 relative overflow-hidden text-left">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Đăng Nhập Quản Trị Viên</h2>
              <p className="text-xs text-slate-400">
                Nhập tài khoản & mật khẩu để vào trang quản trị Nguyễn Duy
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Tài khoản Admin:</label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Mật khẩu:</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Mật khẩu (Mặc định: 123456)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={rememberLogin}
                    onChange={(e) => setRememberLogin(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl font-medium">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Đăng Nhập Quản Trị</span>
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-center">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="font-bold text-slate-300">🔑 Tài khoản mặc định hệ thống:</p>
                <p>Tài khoản: <code className="text-amber-300 font-mono font-bold">admin</code> | Mật khẩu: <code className="text-amber-300 font-mono font-bold">123456</code></p>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoUnlock}
                className="text-xs text-blue-400 hover:underline font-bold inline-flex items-center gap-1 mt-1"
              >
                ⚡ Bấm vào đây để mở khóa nhanh Demo (Không cần gõ)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard Layout */
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 shrink-0 flex md:flex-col overflow-x-auto md:overflow-y-auto gap-1">
            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider px-3 py-2 hidden md:block">
              DANH MỤC QUẢN TRỊ
            </div>

            {[
              { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard, badge: null },
              {
                id: 'leads',
                label: 'Đơn Đặt Hàng',
                icon: Users,
                badge: newLeadsCount > 0 ? newLeadsCount : null,
              },
              { id: 'services', label: 'Dịch Vụ', icon: Briefcase, badge: services.length },
              { id: 'packages', label: 'Bảng Giá & Gói', icon: DollarSign, badge: packages.length },
              { id: 'cases', label: 'Hình Thực Tế', icon: ImageIcon, badge: cases.length },
              { id: 'reviews', label: 'Đánh Giá Khách', icon: MessageSquare, badge: reviews.length },
              { id: 'faqs', label: 'Câu Hỏi FAQ', icon: HelpCircle, badge: faqs.length },
              { id: 'settings', label: 'Cấu Hình Ads', icon: Settings, badge: null },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap md:whitespace-normal shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== null && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        tab.id === 'leads' && newLeadsCount > 0
                          ? 'bg-red-500 text-white animate-pulse'
                          : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="mt-auto pt-4 border-t border-slate-800 hidden md:block space-y-2">
              <button
                type="button"
                onClick={() => {
                  if (
                    confirm(
                      'Khôi phục lại toàn bộ dữ liệu mẫu ban đầu (Xóa các chỉnh sửa)?'
                    )
                  ) {
                    onResetAllData();
                  }
                }}
                className="w-full bg-slate-800/80 hover:bg-red-950/50 hover:text-red-400 text-slate-400 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700/60 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi Phục Mẫu Gốc</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white">Tổng Quan Kinh Doanh</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Thống kê hoạt động đăng ký báo giá & hiệu quả bán hàng Nguyễn Duy
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('leads')}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      <span>Xem Danh Sách Đơn Đặt ({totalLeadsCount})</span>
                    </button>
                  </div>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                      <span>Tổng Số Đơn Đặt</span>
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-white">{totalLeadsCount}</div>
                    <p className="text-[11px] text-slate-500">Khách gửi từ Form & Calculator</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md space-y-2 relative overflow-hidden">
                    {newLeadsCount > 0 && (
                      <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-bl uppercase">
                        Cần Xử Lý
                      </div>
                    )}
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                      <span>Đơn Mới Chờ Gọi</span>
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-3xl font-black text-amber-400">{newLeadsCount}</div>
                    <p className="text-[11px] text-slate-500">Chưa tư vấn / chưa liên hệ</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                      <span>Đơn Đã Chốt Hợp Đồng</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-black text-emerald-400">
                      {confirmedLeadsCount}
                    </div>
                    <p className="text-[11px] text-slate-500">Đã chốt ngày & thi công</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                      <span>Doanh Thu Dự Kiến</span>
                      <DollarSign className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-yellow-400">
                      {totalEstimatedRevenue.toLocaleString('vi-VN')} đ
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Tổng giá trị các đơn đã chốt
                    </p>
                  </div>
                </div>

                {/* Status Progress Breakdown */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
                  <h3 className="text-lg font-bold text-white">Tỉ Lệ Trạng Thái Đơn Hàng</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="text-xs text-amber-400 font-bold uppercase">Mới ({newLeadsCount})</div>
                      <div className="text-xl font-black text-white mt-1">
                        {totalLeadsCount > 0
                          ? Math.round((newLeadsCount / totalLeadsCount) * 100)
                          : 0}
                        %
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="text-xs text-blue-400 font-bold uppercase">Đã Liên Hệ ({contactedLeadsCount})</div>
                      <div className="text-xl font-black text-white mt-1">
                        {totalLeadsCount > 0
                          ? Math.round((contactedLeadsCount / totalLeadsCount) * 100)
                          : 0}
                        %
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="text-xs text-emerald-400 font-bold uppercase">Đã Chốt ({confirmedLeadsCount})</div>
                      <div className="text-xl font-black text-white mt-1">
                        {totalLeadsCount > 0
                          ? Math.round((confirmedLeadsCount / totalLeadsCount) * 100)
                          : 0}
                        %
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="text-xs text-red-400 font-bold uppercase">Đã Hủy ({leads.filter((l) => l.status === 'cancelled').length})</div>
                      <div className="text-xl font-black text-white mt-1">
                        {totalLeadsCount > 0
                          ? Math.round(
                              (leads.filter((l) => l.status === 'cancelled').length /
                                totalLeadsCount) *
                                100
                            )
                          : 0}
                        %
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Urgent Leads List */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-red-400" />
                      <span>Đơn Hàng Mới Nhất Cần Tư Vấn Gấp</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-blue-400 hover:underline font-bold"
                    >
                      Xem Tất Cả &rarr;
                    </button>
                  </div>

                  {leads.filter((l) => l.status === 'new').length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-sm">
                      🎉 Không có đơn mới nào đang chờ xử lý. Tất cả đơn đã được tư vấn!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leads
                        .filter((l) => l.status === 'new')
                        .slice(0, 5)
                        .map((lead) => (
                          <div
                            key={lead.id}
                            className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-white text-sm">
                                  {lead.fullName}
                                </span>
                                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                                  {lead.phone}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-1">
                                {lead.serviceType} • Hẹn: {lead.preferredDate} ({lead.preferredTime})
                              </p>
                              <p className="text-[11px] text-slate-500">📍 {lead.address}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <a
                                href={`tel:${lead.phone}`}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                                <span>Gọi Ngay</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => onUpdateLeadStatus(lead.id, 'contacted')}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                              >
                                Đã Gọi Tư Vấn
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. LEADS TAB */}
            {activeTab === 'leads' && (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white">Quản Lý Đơn Đặt Hàng & Khách Hàng</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Tổng số: {leads.length} đơn đăng ký dịch vụ
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingLeadManual(true)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm Đơn Thủ Công</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportCsv}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700"
                    >
                      <Download className="w-4 h-4 text-blue-400" />
                      <span>Xuất File Excel/CSV</span>
                    </button>

                    <button
                      type="button"
                      onClick={onClearLeads}
                      className="bg-red-950/40 hover:bg-red-900/60 text-red-300 px-3 py-2 rounded-xl text-xs font-bold border border-red-800/40 transition-colors"
                    >
                      Xóa Tất Cả Đơn
                    </button>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      placeholder="Tìm theo Tên, SĐT, Địa chỉ..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                    {[
                      { id: 'all', label: 'Tất Cả' },
                      { id: 'new', label: 'Mới' },
                      { id: 'contacted', label: 'Đã Liên Hệ' },
                      { id: 'confirmed', label: 'Đã Chốt' },
                      { id: 'cancelled', label: 'Đã Hủy' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setLeadStatusFilter(f.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          leadStatusFilter === f.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  {filteredLeads.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-sm">
                      Không tìm thấy đơn hàng nào phù hợp với bộ lọc!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
                          <tr>
                            <th className="p-3.5">Khách Hàng</th>
                            <th className="p-3.5">Dịch Vụ & Địa Chỉ</th>
                            <th className="p-3.5">Thời Gian Hẹn</th>
                            <th className="p-3.5">Giá Dự Kiến</th>
                            <th className="p-3.5">Trạng Thái</th>
                            <th className="p-3.5 text-right">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 font-medium">
                          {filteredLeads.map((l) => (
                            <tr key={l.id} className="hover:bg-slate-800/50 transition-colors">
                              <td className="p-3.5">
                                <div className="font-extrabold text-white text-sm">
                                  {l.fullName}
                                </div>
                                <a
                                  href={`tel:${l.phone}`}
                                  className="text-blue-400 font-mono font-bold hover:underline flex items-center gap-1 mt-0.5"
                                >
                                  <PhoneCall className="w-3 h-3" />
                                  <span>{l.phone}</span>
                                </a>
                              </td>

                              <td className="p-3.5 max-w-xs">
                                <div className="text-amber-300 font-bold">{l.serviceType}</div>
                                <div className="text-slate-400 text-[11px] truncate mt-0.5" title={l.address}>
                                  📍 {l.address}
                                </div>
                                {l.note && (
                                  <div className="text-slate-500 text-[10px] italic mt-0.5">
                                    "{l.note}"
                                  </div>
                                )}
                              </td>

                              <td className="p-3.5">
                                <div className="text-white font-bold">{l.preferredDate}</div>
                                <div className="text-slate-400 text-[11px]">{l.preferredTime}</div>
                              </td>

                              <td className="p-3.5 font-black text-emerald-400 text-sm">
                                {l.estimatedPrice ? l.estimatedPrice.toLocaleString('vi-VN') + ' đ' : 'Chưa rõ'}
                              </td>

                              <td className="p-3.5">
                                <select
                                  value={l.status}
                                  onChange={(e) =>
                                    onUpdateLeadStatus(
                                      l.id,
                                      e.target.value as LeadBooking['status']
                                    )
                                  }
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border focus:outline-none transition-colors ${
                                    l.status === 'new'
                                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                                      : l.status === 'contacted'
                                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                      : l.status === 'confirmed'
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                      : 'bg-slate-800 text-slate-400 border-slate-700'
                                  }`}
                                >
                                  <option value="new" className="bg-slate-900 text-red-300">🔴 Mới (Chờ tư vấn)</option>
                                  <option value="contacted" className="bg-slate-900 text-blue-300">🔵 Đã liên hệ</option>
                                  <option value="confirmed" className="bg-slate-900 text-emerald-300">🟢 Đã chốt hợp đồng</option>
                                  <option value="cancelled" className="bg-slate-900 text-slate-400">⚪ Đã hủy</option>
                                </select>
                              </td>

                              <td className="p-3.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => onDeleteLead(l.id)}
                                  className="text-slate-500 hover:text-red-400 p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
                                  title="Xóa đơn này"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-white">Quản Lý Danh Mục Dịch Vụ</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Thêm, sửa giá, hình ảnh và tính năng của các dịch vụ hiển thị trên web
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNewService(true);
                      setEditingService({
                        id: 'svc-' + Date.now(),
                        title: '',
                        shortDesc: '',
                        fullDesc: '',
                        iconName: 'Sparkles',
                        badge: 'Mới',
                        startingPrice: '100.000',
                        unit: 'đ/lần',
                        features: ['Thi công chuyên nghiệp', 'Báo giá minh bạch'],
                        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
                        popular: false,
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Dịch Vụ Mới</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((svc) => (
                    <div
                      key={svc.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between p-5 hover:border-slate-700 transition-all shadow-md"
                    >
                      <div className="space-y-3">
                        <div className="relative h-40 rounded-xl overflow-hidden bg-slate-950">
                          <img
                            src={svc.imageUrl}
                            alt={svc.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {svc.popular && (
                            <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              NỔI BẬT
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="font-extrabold text-white text-lg">{svc.title}</h3>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                            {svc.shortDesc}
                          </p>
                          <div className="mt-2 text-sm font-black text-amber-400">
                            {svc.startingPrice} <span className="text-xs font-normal text-slate-400">{svc.unit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setIsNewService(false);
                            setEditingService({ ...svc });
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-400" />
                          <span>Chỉnh Sửa</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Xóa dịch vụ "${svc.title}"?`)) {
                              onSaveServices(services.filter((s) => s.id !== svc.id));
                            }
                          }}
                          className="bg-red-950/40 hover:bg-red-900/60 text-red-300 p-1.5 rounded-lg text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PACKAGES TAB */}
            {activeTab === 'packages' && (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-white">Quản Lý Gói Giá Ưu Đãi</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Chỉnh sửa các gói dịch vụ khuyến mãi ở phần Bảng Giá
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNewPackage(true);
                      setEditingPackage({
                        id: 'pkg-' + Date.now(),
                        name: 'Gói Mới Khuyến Mãi',
                        price: '500.000đ',
                        originalPrice: '700.000đ',
                        unit: '/ gói',
                        description: 'Mô tả ngắn cho gói dịch vụ',
                        items: ['Hạng mục 1', 'Hạng mục 2', 'Hạng mục 3'],
                        ctaText: 'Đăng Ký Ngay',
                        popular: false,
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Gói Mới</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-extrabold text-white text-lg">{pkg.name}</h3>
                          {pkg.popular && (
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              HOT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{pkg.description}</p>
                        <div className="text-2xl font-black text-blue-400 pt-2">
                          {pkg.price} <span className="text-xs font-normal text-slate-400">{pkg.unit}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsNewPackage(false);
                            setEditingPackage({ ...pkg });
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-400" />
                          <span>Sửa Gói</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Xóa gói "${pkg.name}"?`)) {
                              onSavePackages(packages.filter((p) => p.id !== pkg.id));
                            }
                          }}
                          className="bg-red-950/40 hover:bg-red-900/60 text-red-300 p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. CASES TAB (BEFORE & AFTER) */}
            {activeTab === 'cases' && (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-white">Quản Lý Hình Thực Tế (Trực Quan)</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Cập nhật các ca làm sạch thực tế Trước & Sau để thuyết phục khách hàng
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNewCase(true);
                      setEditingCase({
                        id: 'case-' + Date.now(),
                        title: 'Ca vệ sinh thực tế mới',
                        category: 'Tổng vệ sinh',
                        beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
                        afterImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
                        description: 'Mô tả kết quả dọn dẹp',
                        timeTaken: '2 Giờ thi công',
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Hình Thực Tế Mới</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cases.map((cs) => (
                    <div
                      key={cs.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-2 h-28 rounded-xl overflow-hidden bg-slate-950">
                        <img
                          src={cs.beforeImg}
                          alt="Before"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <img
                          src={cs.afterImg}
                          alt="After"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold">
                          {cs.category}
                        </span>
                        <h3 className="font-extrabold text-white text-sm mt-1">{cs.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">{cs.description}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsNewCase(false);
                            setEditingCase({ ...cs });
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-400" />
                          <span>Chỉnh Sửa</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Xóa ca "${cs.title}"?`)) {
                              onSaveCases(cases.filter((c) => c.id !== cs.id));
                            }
                          }}
                          className="bg-red-950/40 hover:bg-red-900/60 text-red-300 p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-white">Quản Lý Đánh Giá Khách Hàng</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Thêm/sửa các bài đánh giá để tạo niềm tin Social Proof cho khách gọi điện
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNewReview(true);
                      setEditingReview({
                        id: 'rev-' + Date.now(),
                        name: 'Khách hàng mới',
                        role: 'Chủ nhà phố',
                        location: 'Quận 1, TP.HCM',
                        rating: 5,
                        comment: 'Dịch vụ rất tuyệt vời, nhân viên lịch sự!',
                        date: 'Vừa xong',
                        verified: true,
                        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
                        serviceUsed: 'Vệ Sinh Nhà Cửa',
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Review Mới</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                        <div className="text-xs font-bold text-white pt-2">
                          {rev.name} • <span className="text-slate-400 font-normal">{rev.role}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsNewReview(false);
                            setEditingReview({ ...rev });
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-400" />
                          <span>Sửa</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Xóa review của "${rev.name}"?`)) {
                              onSaveReviews(reviews.filter((r) => r.id !== rev.id));
                            }
                          }}
                          className="bg-red-950/40 hover:bg-red-900/60 text-red-300 p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. FAQS TAB */}
            {activeTab === 'faqs' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-white">Quản Lý Câu Hỏi Thường Gặp (FAQ)</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Giải đáp thắc mắc cho khách hàng trước khi gọi
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNewFaq(true);
                      setEditingFaq({
                        id: 'faq-' + Date.now(),
                        q: 'Câu hỏi thắc mắc mới?',
                        a: 'Câu trả lời chi tiết...',
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Câu Hỏi Mới</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <div className="font-extrabold text-white text-sm">❓ {faq.q}</div>
                        <p className="text-xs text-slate-400">{faq.a}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setIsNewFaq(false);
                            setEditingFaq({ ...faq });
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-400" />
                          <span>Sửa</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Xóa câu hỏi này?')) {
                              onSaveFaqs(faqs.filter((f) => f.id !== faq.id));
                            }
                          }}
                          className="bg-red-950/40 hover:bg-red-900/60 text-red-300 p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-white">Cấu Hình Thông Tin Bán Hàng & Ads</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Cập nhật SĐT Hotline, Zalo, Giờ làm việc, Khuyến mãi bùng nổ Ads
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSaveConfig(tempConfig);
                      alert('Lưu cấu hình thành công!');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg flex items-center gap-2 uppercase tracking-wider"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Cấu Hình Web</span>
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Tên Thương Hiệu / Doanh Nghiệp
                      </label>
                      <input
                        type="text"
                        value={tempConfig.brandName}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, brandName: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Tên Chủ / Người Đại Diện
                      </label>
                      <input
                        type="text"
                        value={tempConfig.ownerName}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, ownerName: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Số Hotline Bấm Gọi (Chỉ số)
                      </label>
                      <input
                        type="text"
                        value={tempConfig.hotline}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, hotline: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono font-bold focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        SĐT Hotline Hiển Thị Lên Web
                      </label>
                      <input
                        type="text"
                        value={tempConfig.hotlineDisplay}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, hotlineDisplay: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Số Zalo Chat Tư Vấn
                      </label>
                      <input
                        type="text"
                        value={tempConfig.zaloNumber}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, zaloNumber: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-sky-300 font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Link Fanpage Facebook
                      </label>
                      <input
                        type="text"
                        value={tempConfig.facebookUrl}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, facebookUrl: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-blue-400 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Địa Chỉ Văn Phòng Trụ Sở
                      </label>
                      <input
                        type="text"
                        value={tempConfig.address}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, address: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Giờ Hoạt Động
                      </label>
                      <input
                        type="text"
                        value={tempConfig.operatingHours}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, operatingHours: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        % Ưu Đãi Giảm Giá Khuyến Mãi
                      </label>
                      <input
                        type="number"
                        value={tempConfig.promoDiscountPercent}
                        onChange={(e) =>
                          setTempConfig({
                            ...tempConfig,
                            promoDiscountPercent: Number(e.target.value),
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-red-400 font-extrabold focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Tiêu Đề Chạy Quảng Cáo (Top Banner Hot Ads)
                      </label>
                      <textarea
                        rows={2}
                        value={tempConfig.promoTitle}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, promoTitle: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-yellow-300 font-bold focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        onSaveConfig(tempConfig);
                        alert('Đã cập nhật cấu hình thành công!');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-black shadow-lg transition-all flex items-center gap-2 uppercase tracking-wider"
                    >
                      <Save className="w-4 h-4" />
                      <span>Lưu Thay Đổi Ngay</span>
                    </button>
                  </div>
                </div>

                {/* Account Credentials Settings */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Đổi Tài Khoản & Mật Khẩu Admin</h3>
                      <p className="text-xs text-slate-400">
                        Cấu hình thông tin đăng nhập trang quản trị viên
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Tài khoản Admin Mới:
                      </label>
                      <input
                        type="text"
                        value={storedUsername}
                        onChange={(e) => setStoredUsername(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Mật Khẩu Mới:
                      </label>
                      <input
                        type="text"
                        value={storedPassword}
                        onChange={(e) => setStoredPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono font-bold focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!storedUsername.trim() || !storedPassword.trim()) {
                          alert('Vui lòng không để trống Tài khoản hoặc Mật khẩu!');
                          return;
                        }
                        localStorage.setItem('nd_admin_username', storedUsername.trim());
                        localStorage.setItem('nd_admin_password', storedPassword.trim());
                        alert('Đã đổi Tài khoản và Mật khẩu Admin thành công!');
                      }}
                      className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Cập Nhật Mật Khẩu Admin</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- SUB MODALS FOR EDITING/ADDING ITEMS --- */}

      {/* 1. EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {isNewService ? 'Thêm Dịch Vụ Mới' : 'Chỉnh Sửa Dịch Vụ'}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Tên Dịch Vụ</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({ ...editingService, title: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Mô Tả Ngắn</label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDesc: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Giá Bắt Đầu</label>
                  <input
                    type="text"
                    value={editingService.startingPrice}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        startingPrice: e.target.value,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Đơn Vị Tính</label>
                  <input
                    type="text"
                    value={editingService.unit}
                    onChange={(e) =>
                      setEditingService({ ...editingService, unit: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Link Ảnh Unsplash / CDN</label>
                <input
                  type="text"
                  value={editingService.imageUrl}
                  onChange={(e) =>
                    setEditingService({ ...editingService, imageUrl: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pop"
                  checked={editingService.popular || false}
                  onChange={(e) =>
                    setEditingService({ ...editingService, popular: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <label htmlFor="pop" className="text-white font-bold">
                  Đánh dấu là Dịch Vụ Nổi Bật (Hot Package)
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingService(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (isNewService) {
                    onSaveServices([...services, editingService]);
                  } else {
                    onSaveServices(
                      services.map((s) => (s.id === editingService.id ? editingService : s))
                    );
                  }
                  setEditingService(null);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Lưu Dịch Vụ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EDIT PACKAGE MODAL */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Chỉnh Sửa Gói Giá</h3>
              <button onClick={() => setEditingPackage(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Tên Gói</label>
                <input
                  type="text"
                  value={editingPackage.name}
                  onChange={(e) =>
                    setEditingPackage({ ...editingPackage, name: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Giá Bán</label>
                  <input
                    type="text"
                    value={editingPackage.price}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, price: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-blue-400 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Giá Gốc Niêm Yết</label>
                  <input
                    type="text"
                    value={editingPackage.originalPrice || ''}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        originalPrice: e.target.value,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Mô Tả Gói</label>
                <textarea
                  rows={2}
                  value={editingPackage.description}
                  onChange={(e) =>
                    setEditingPackage({ ...editingPackage, description: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingPackage(null)}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (isNewPackage) {
                    onSavePackages([...packages, editingPackage]);
                  } else {
                    onSavePackages(
                      packages.map((p) => (p.id === editingPackage.id ? editingPackage : p))
                    );
                  }
                  setEditingPackage(null);
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Lưu Gói Giá
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. EDIT BEFORE/AFTER CASE MODAL */}
      {editingCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Chỉnh Sửa Ca Thực Tế</h3>
              <button onClick={() => setEditingCase(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Tiêu Đề Ca</label>
                <input
                  type="text"
                  value={editingCase.title}
                  onChange={(e) =>
                    setEditingCase({ ...editingCase, title: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Ảnh TRƯỚC Vệ Sinh (Link URL)</label>
                <input
                  type="text"
                  value={editingCase.beforeImg}
                  onChange={(e) =>
                    setEditingCase({ ...editingCase, beforeImg: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Ảnh SAU Vệ Sinh (Link URL)</label>
                <input
                  type="text"
                  value={editingCase.afterImg}
                  onChange={(e) =>
                    setEditingCase({ ...editingCase, afterImg: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Mô Tả Kỹ Thuật Làm Sạch</label>
                <textarea
                  rows={2}
                  value={editingCase.description}
                  onChange={(e) =>
                    setEditingCase({ ...editingCase, description: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingCase(null)}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (isNewCase) {
                    onSaveCases([...cases, editingCase]);
                  } else {
                    onSaveCases(cases.map((c) => (c.id === editingCase.id ? editingCase : c)));
                  }
                  setEditingCase(null);
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Lưu Ca Thực Tế
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. EDIT REVIEW MODAL */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Chỉnh Sửa Đánh Giá</h3>
              <button onClick={() => setEditingReview(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Tên Khách Hàng</label>
                <input
                  type="text"
                  value={editingReview.name}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, name: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Nội Dung Đánh Giá</label>
                <textarea
                  rows={3}
                  value={editingReview.comment}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, comment: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingReview(null)}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (isNewReview) {
                    onSaveReviews([...reviews, editingReview]);
                  } else {
                    onSaveReviews(
                      reviews.map((r) => (r.id === editingReview.id ? editingReview : r))
                    );
                  }
                  setEditingReview(null);
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Lưu Đánh Giá
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. EDIT FAQ MODAL */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Chỉnh Sửa Câu Hỏi FAQ</h3>
              <button onClick={() => setEditingFaq(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Câu Hỏi (?)</label>
                <input
                  type="text"
                  value={editingFaq.q}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, q: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Câu Trả Lời</label>
                <textarea
                  rows={4}
                  value={editingFaq.a}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, a: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingFaq(null)}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (isNewFaq) {
                    onSaveFaqs([...faqs, editingFaq]);
                  } else {
                    onSaveFaqs(faqs.map((f) => (f.id === editingFaq.id ? editingFaq : f)));
                  }
                  setEditingFaq(null);
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Lưu Câu Hỏi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. ADD MANUAL LEAD MODAL */}
      {isAddingLeadManual && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Thêm Đơn Đặt Hàng Thủ Công</h3>
              <button onClick={() => setIsAddingLeadManual(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Họ Và Tên Khách Hàng</label>
                <input
                  type="text"
                  value={manualLeadData.fullName}
                  onChange={(e) =>
                    setManualLeadData({ ...manualLeadData, fullName: e.target.value })
                  }
                  placeholder="Ví dụ: Anh Nam"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Số Điện Thoại</label>
                <input
                  type="tel"
                  value={manualLeadData.phone}
                  onChange={(e) =>
                    setManualLeadData({ ...manualLeadData, phone: e.target.value })
                  }
                  placeholder="0901234567"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Địa Chỉ Chi Tiết</label>
                <input
                  type="text"
                  value={manualLeadData.address}
                  onChange={(e) =>
                    setManualLeadData({ ...manualLeadData, address: e.target.value })
                  }
                  placeholder="123 Nguyễn Hữu Thọ, Q7, HCM"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Dịch Vụ Chọn</label>
                <select
                  value={manualLeadData.serviceType}
                  onChange={(e) =>
                    setManualLeadData({ ...manualLeadData, serviceType: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsAddingLeadManual(false)}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (!manualLeadData.fullName || !manualLeadData.phone) {
                    alert('Vui lòng nhập Tên và Số điện thoại!');
                    return;
                  }
                  onAddLeadManual(manualLeadData);
                  setIsAddingLeadManual(false);
                }}
                className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Tạo Đơn Hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
