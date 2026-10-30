import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  X, 
  Trash2, 
  Database, 
  FileText, 
  User, 
  LogOut,
  RefreshCw,
  Plus
} from 'lucide-react';
import { Shipment, ShipmentStatus } from '../types';
import { STATUS_LABELS, SENDER_CATEGORY_LABELS, DOCUMENT_TYPE_LABELS } from '../data/initialData';
import { WaybillModal } from './WaybillModal';
import { HeatmapView } from './HeatmapView';
import { AnalyticsCharts } from './AnalyticsCharts';
import { IRAQI_GOVERNORATES } from '../data/initialData';

interface AdminDashboardProps {
  shipments: Shipment[];
  notifications: any[];
  onUpdateShipmentStatus: (orderId: string, status: ShipmentStatus) => void;
  onDeleteShipment: (orderId: string) => void;
  onAddShipment: (newShipment: Shipment) => void;
  onOpenApiDocs: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (loggedIn: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  shipments,
  notifications,
  onUpdateShipmentStatus,
  onDeleteShipment,
  onAddShipment,
  onOpenApiDocs,
  isAdminLoggedIn,
  setIsAdminLoggedIn
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAdminTab, setActiveAdminTab] = useState<'shipments' | 'heatmap' | 'analytics' | 'notifications'>('shipments');
  const [selectedWaybillShipment, setSelectedWaybillShipment] = useState<Shipment | null>(null);

  const exportToCsv = () => {
    const headers = ['رقم التتبع', 'اسم المرسل', 'فئة المرسل', 'هاتف المرسل', 'اسم المستلم', 'هاتف المستلم', 'فرع الانطلاق', 'محافظة الوجهة', 'المدينة', 'نوع المستند', 'الحالة', 'المبلغ (IQD)', 'تاريخ الإنشاء'];
    
    const rows = filteredShipments.map(s => [
      s.order_id,
      `"${s.sender_name}"`,
      s.sender_category,
      s.sender_phone,
      `"${s.recipient_name}"`,
      s.recipient_phone,
      `"${s.origin_branch}"`,
      `"${s.destination_governorate}"`,
      `"${s.destination_city}"`,
      s.document_type,
      s.status,
      s.amount || 0,
      `"${s.created_at}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `safe_carrier_shipments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'safe2026') {
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة. (اسم المستخدم: admin، كلمة المرور: safe2026)');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const filteredShipments = shipments.filter(s => {
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchesSearch = 
      s.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sender_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sender_phone.includes(searchQuery) ||
      s.recipient_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCount = shipments.length;
  const newCount = shipments.filter(s => s.status === 'new').length;
  const transitCount = shipments.filter(s => s.status === 'in_transit' || s.status === 'received').length;
  const deliveredCount = shipments.filter(s => s.status === 'delivered').length;

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">لوحة الإدارة المحمية</h2>
            <p className="text-xs text-slate-500">سجل الدخول لإدارة الشحنات وتحديث الحالات والبيانات</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم المستخدم</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">كلمة المرور</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-200">
              💡 بيانات التجربة الافتراضية:<br />
              اسم المستخدم: <code className="font-bold text-slate-700">admin</code><br />
              كلمة المرور: <code className="font-bold text-slate-700">safe2026</code>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 transition-colors"
            >
              تسجيل الدخول للوحة الإدارة
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black">لوحة إدارة الناقل الآمن</h1>
            <p className="text-xs text-slate-400">إدارة طلبات شحن المستندات وتحديث الحالات والربط مع قاعدة البيانات</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenApiDocs}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Database className="w-4 h-4" />
            <span>وثيقة الـ API ومخطط القاعدة</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold border border-rose-500/30 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <span className="text-xs text-slate-500 block mb-1">إجمالي الطلبات</span>
          <span className="text-3xl font-black text-slate-900">{totalCount}</span>
        </div>
        <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-200">
          <span className="text-xs text-blue-700 block mb-1">طلبات جديدة</span>
          <span className="text-3xl font-black text-blue-900">{newCount}</span>
        </div>
        <div className="bg-amber-50 rounded-2xl p-5 shadow-sm border border-amber-200">
          <span className="text-xs text-amber-700 block mb-1">قيد التوصيل / الاستلام</span>
          <span className="text-3xl font-black text-amber-900">{transitCount}</span>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-5 shadow-sm border border-emerald-200">
          <span className="text-xs text-emerald-700 block mb-1">تم التسليم بنجاح</span>
          <span className="text-3xl font-black text-emerald-900">{deliveredCount}</span>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex gap-3 border-b border-slate-200 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('shipments')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
            activeAdminTab === 'shipments'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          📦 إدارة الشحنات والطلبات ({shipments.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('heatmap')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeAdminTab === 'heatmap'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>🔥 الخريطة الحرارية (Heatmap)</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeAdminTab === 'analytics'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>📈 الرسوم البيانية والتحليلات</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('notifications')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeAdminTab === 'notifications'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>✉️ سجل التنبيهات والبريد الإلكتروني التلقائي</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs">{notifications.length}</span>
        </button>
      </div>

      {activeAdminTab === 'shipments' ? (
        <>
          {/* Filter & Search Bar + Export Button */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث برقم التتبع أو اسم المرسل أو الهاتف..."
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                onClick={exportToCsv}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors whitespace-nowrap"
              >
                <span>📥 تصدير جدول الطلبات (CSV / Excel)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'new', label: 'جديد' },
                { id: 'received', label: 'تم الاستلام' },
                { id: 'in_transit', label: 'قيد التوصيل' },
                { id: 'delivered', label: 'تم التسليم' },
                { id: 'cancelled', label: 'ملغى' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    filterStatus === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shipments Table */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-4">رقم التتبع</th>
                    <th className="py-4 px-4">المرسل / الفئة</th>
                    <th className="py-4 px-4">المستلم والوجهة</th>
                    <th className="py-4 px-4">نوع المستند</th>
                    <th className="py-4 px-4">الحالة الحالية</th>
                    <th className="py-4 px-4">تحديث الحالة</th>
                    <th className="py-4 px-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((s) => {
                      const statusInfo = STATUS_LABELS[s.status] || STATUS_LABELS['new'];
                      return (
                        <tr key={s.order_id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-slate-900">
                            {s.order_id}
                            <span className="block text-[11px] text-slate-400 font-sans">{s.created_at}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-900">{s.sender_name}</div>
                            <div className="text-xs text-emerald-700 font-semibold">{SENDER_CATEGORY_LABELS[s.sender_category]}</div>
                            <div className="text-xs text-slate-500 font-mono">{s.sender_phone}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-900">{s.recipient_name}</div>
                            <div className="text-xs text-slate-600">إلى: {s.destination_governorate}</div>
                            <div className="text-[11px] text-slate-400">{s.destination_city}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
                              {DOCUMENT_TYPE_LABELS[s.document_type] || s.document_type}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusInfo.bg} ${statusInfo.text}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              <span>{statusInfo.label}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={s.status}
                              onChange={(e) => onUpdateShipmentStatus(s.order_id, e.target.value as ShipmentStatus)}
                              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:outline-none focus:border-emerald-500"
                            >
                              <option value="new">جديد</option>
                              <option value="received">تم الاستلام بأم قصر</option>
                              <option value="in_transit">قيد التوصيل</option>
                              <option value="delivered">تم التسليم</option>
                              <option value="cancelled">ملغى</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setSelectedWaybillShipment(s)}
                                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                                title="طباعة وعرض البوليصة والباركود"
                              >
                                🖨️
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`هل أنت متأكد من حذف الشحنة ${s.order_id}؟`)) {
                                    onDeleteShipment(s.order_id);
                                  }
                                }}
                                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                title="حذف الشحنة"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500">
                        لا توجد شحنات مطابقة لخيارات البحث أو الفلترة الحالية.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : activeAdminTab === 'heatmap' ? (
        <HeatmapView shipments={shipments} governorates={IRAQI_GOVERNORATES} />
      ) : activeAdminTab === 'analytics' ? (
        <AnalyticsCharts shipments={shipments} />
      ) : (
        /* Notifications Log View */
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">سجل التنبيهات والبريد الإلكتروني التلقائي</h3>
              <p className="text-xs text-slate-500">عند تغيير حالة أي طلب في لوحة التحكم، يقوم النظام تلقائياً بإرسال تنبيه البريد والواتساب للعميل وتسجيله هنا.</p>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div key={n.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                        {n.order_id}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600">{n.message}</p>
                  </div>
                  <div className="text-xs text-slate-400 font-mono shrink-0">
                    {n.created_at}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500">
                لا توجد إشعارات مسجلة حتى الآن.
              </div>
            )}
          </div>
        </div>
      )}
      {selectedWaybillShipment && (
        <WaybillModal
          shipment={selectedWaybillShipment}
          onClose={() => setSelectedWaybillShipment(null)}
        />
      )}
    </div>
  );
};
