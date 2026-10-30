import React, { useState } from 'react';
import { Truck, Shield, CheckCircle2, User, Phone, MapPin, Send, Lock, Clock, Calendar, Navigation } from 'lucide-react';
import { Shipment, ShipmentStatus } from '../types';
import { STATUS_LABELS } from '../data/initialData';

interface CourierPortalProps {
  shipments: Shipment[];
  onUpdateShipmentStatus: (orderId: string, status: ShipmentStatus, courierNote?: string) => void;
}

export const CourierPortal: React.FC<CourierPortalProps> = ({ shipments, onUpdateShipmentStatus }) => {
  const [courierPin, setCourierPin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('in_transit');
  const [courierNote, setCourierNote] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeCourierTab, setActiveCourierTab] = useState<'tasks' | 'update'>('tasks');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (courierPin === '7710' || courierPin === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('رمز المندوب غير صحيح. استخدم الرمز التجريبي: 7710 أو 1234');
    }
  };

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) {
      alert('يرجى اختيار الشحنة المطلوبة.');
      return;
    }

    onUpdateShipmentStatus(selectedOrder, newStatus, courierNote);
    setSuccessMsg(`تم إرسال إشعار المندوب بنجاح إلى العملاء والمكتب للطلب ${selectedOrder}`);
    setCourierNote('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <Truck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">بوابة مناديب التوصيل والمكتب</h2>
            <p className="text-xs text-slate-500">تسجيل دخول المندوب للاطلاع على الجدول الزمني للمهام ومسار التوصيل المقترح</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رمز PIN الخاص بالمندوب</label>
              <input
                type="password"
                required
                value={courierPin}
                onChange={(e) => setCourierPin(e.target.value)}
                placeholder="أدخل الرمز (مثال: 7710)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-mono text-center tracking-widest text-lg"
              />
            </div>

            <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              💡 رمز التجربة السريع للمندوب: <code className="font-bold text-slate-700">7710</code>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 transition-colors"
            >
              دخول بوابة المندوب
            </button>
          </form>
        </div>
      </div>
    );
  }

  const activeShipments = shipments.filter(s => s.status !== 'delivered' && s.status !== 'cancelled');

  // Simulated daily schedule tasks grouped by zone
  const scheduledTasks = [
    { time: '09:00 ص - 10:30 ص', zone: 'ميناء أم قصر الرئيسي (فرع 01)', task: 'استلام بوالص جمركية عاجلة', status: 'مكتمل' },
    { time: '11:00 ص - 01:00 م', zone: 'محافظة البصرة (العشار والسوق)', task: 'تسليم فواتير تجارية للشركة العامة', status: 'قيد التنفيذ' },
    { time: '01:30 م - 04:00 م', zone: 'محافظة بغداد (الكرادة وشارع الاستقلال)', task: 'توزيع مستندات تصديق لشركات الاستيراد', status: 'مجدول' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Truck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black">بوابة المندوب الميداني والجدول الزمني</h1>
            <p className="text-xs text-slate-300">إدارة المهام الميدانية الجغرافية ومسارات التوصيل المقترحة من أم قصر لعموم المحافظات</p>
          </div>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
        >
          خروج
        </button>
      </div>

      {/* Courier Nav Tabs */}
      <div className="flex gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveCourierTab('tasks')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeCourierTab === 'tasks'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          📅 الجدول الزمني للمهام اليومية ومسار الخريطة
        </button>
        <button
          onClick={() => setActiveCourierTab('update')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeCourierTab === 'update'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          ⚡ تحديث حالة شحنة ميدانياً
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {activeCourierTab === 'tasks' ? (
        <div className="space-y-8">
          {/* Schedule Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>الجدول الزمني للمهام اليومية (حسب المناطق الجغرافية)</span>
              </h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                اليوم: الخميس (أكتوبر 2026)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-900 text-white text-xs font-bold uppercase">
                  <tr>
                    <th className="py-3.5 px-4">الوقت المجدول</th>
                    <th className="py-3.5 px-4">المنطقة الجغرافية / الفرع</th>
                    <th className="py-3.5 px-4">طبيعة المهمة</th>
                    <th className="py-3.5 px-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {scheduledTasks.map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{t.time}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{t.zone}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{t.task}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          t.status === 'مكتمل' ? 'bg-emerald-100 text-emerald-800' :
                          t.status === 'قيد التنفيذ' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Suggested Route Map */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-slate-700 pb-4">
              <Navigation className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span>مسار التوصيل المقترح على الخريطة اللوجستية</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-xs text-emerald-400 font-bold block">المحطة 01</span>
                <div className="font-bold text-sm">ميناء أم قصر (الفرع الرئيسي)</div>
                <div className="text-[11px] text-slate-400">استلام وتحميل المستندات</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-xs text-emerald-400 font-bold block">المحطة 02</span>
                <div className="font-bold text-sm">محطة الفرز الجمركي بالبصرة</div>
                <div className="text-[11px] text-slate-400">تدقيق الأختام والتصديقات</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-xs text-emerald-400 font-bold block">المحطة 03</span>
                <div className="font-bold text-sm">طريق العبور السريع (بغداد/المحافظات)</div>
                <div className="text-[11px] text-slate-400">نقل آمن بحقائب مشفرة</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-xs text-emerald-400 font-bold block">المحطة 04</span>
                <div className="font-bold text-sm">فرع المحافظة وجهة التسليم</div>
                <div className="text-[11px] text-slate-400">التسليم للعميل وتوقيع الإيصال</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Status Update Form */
        <form onSubmit={handleStatusUpdate} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-600" />
            <span>تحديث حالة شحنة وإرسال إشعار فوري للعميل والمكتب</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">اختر الشحنة الميدانية *</label>
              <select
                required
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">-- اختر رقم التتبع أو العميل --</option>
                {activeShipments.map((s) => (
                  <option key={s.order_id} value={s.order_id}>
                    {s.order_id} - المرسل: {s.sender_name} إلى {s.destination_governorate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الحالة الميدانية الجديدة *</label>
              <select
                required
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-500 font-bold"
              >
                <option value="received">تم الاستلام من قبل المندوب / فرع أم قصر</option>
                <option value="in_transit">قيد التوصيل في الطريق إلى المحافظة</option>
                <option value="delivered">تم التسليم بنجاح للعميل</option>
                <option value="cancelled">تعذر التسليم / ملغى</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">ملاحظات المندوب الميدانية (ترسل كإشعار للعميل والمكتب)</label>
            <textarea
              rows={3}
              value={courierNote}
              onChange={(e) => setCourierNote(e.target.value)}
              placeholder="مثال: تم استلام المستندات وتدقيقها من قبل المندوب أحمد - في الطريق لتسليمها للعميل..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-900/20 transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-5 h-5" />
            <span>تحديث الحالة وإرسال الإشعارات الفورية (للعملاء + المكتب)</span>
          </button>
        </form>
      )}
    </div>
  );
};
