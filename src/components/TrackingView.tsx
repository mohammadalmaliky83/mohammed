import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Truck, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  FileText, 
  Phone, 
  User, 
  Building2,
  AlertCircle
} from 'lucide-react';
import { Shipment } from '../types';
import { STATUS_LABELS, DOCUMENT_TYPE_LABELS, SENDER_CATEGORY_LABELS } from '../data/initialData';
import { WaybillModal } from './WaybillModal';
import { RouteMap } from './RouteMap';

interface TrackingViewProps {
  shipments: Shipment[];
  initialTrackingId?: string;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ shipments, initialTrackingId }) => {
  const [searchTerm, setSearchTerm] = useState(initialTrackingId || '');
  const [searchedShipment, setSearchedShipment] = useState<Shipment | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showWaybill, setShowWaybill] = useState(false);

  useEffect(() => {
    if (initialTrackingId) {
      setSearchTerm(initialTrackingId);
      const found = shipments.find(s => s.order_id.toLowerCase() === initialTrackingId.toLowerCase());
      if (found) {
        setSearchedShipment(found);
        setErrorMessage('');
      } else {
        setSearchedShipment(null);
        setErrorMessage('رقم التتبع غير مسجل في النظام. يرجى التأكد من الرقم المدخل.');
      }
    }
  }, [initialTrackingId, shipments]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const query = searchTerm.trim();
    const found = shipments.find(s => s.order_id.toLowerCase() === query.toLowerCase());

    if (found) {
      setSearchedShipment(found);
      setErrorMessage('');
    } else {
      setSearchedShipment(null);
      setErrorMessage('رقم التتبع غير مسجل في النظام. يرجى التحقق من الرقم والمحاولة مجدداً.');
    }
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'new': return 1;
      case 'received': return 2;
      case 'in_transit': return 3;
      case 'delivered': return 4;
      case 'cancelled': return -1;
      default: return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
          <Search className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black">تتبع شحنة المستندات الرسمية</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            أدخل رقم التتبع الفريد الخاص بك (مثل ORD-102938) لمعرفة الحالة والمرحلة التشغيلية الحالية بدقة تامة.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="أدخل رقم التتبع (مثال: ORD-102938)"
            className="flex-1 px-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono text-lg tracking-wider"
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-lg flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>تتبع</span>
          </button>
        </form>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Shipment Result */}
      {searchedShipment && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-8 animate-in fade-in duration-200">
          {/* Status Badge & ID */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs text-slate-500 block mb-1">رقم التتبع الفريد</span>
              <span className="font-mono text-2xl font-black text-slate-900">{searchedShipment.order_id}</span>
            </div>
            <div>
              {(() => {
                const info = STATUS_LABELS[searchedShipment.status] || STATUS_LABELS['new'];
                return (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${info.bg} ${info.text} border border-current/20`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    <span>{info.label}</span>
                  </span>
                );
              })()}
            </div>
          </div>

          {/* Timeline Stepper */}
          {searchedShipment.status !== 'cancelled' ? (
            <div className="py-6">
              <h3 className="text-sm font-bold text-slate-700 mb-6">مراحل سير الشحنة:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { step: 1, label: 'طلب جديد', desc: 'تم تسجيل الطلب بالنظام' },
                  { step: 2, label: 'تم الاستلام', desc: 'الاستلام في فرع أم قصر' },
                  { step: 3, label: 'قيد التوصيل', desc: 'في الطريق للمحافظة' },
                  { step: 4, label: 'تم التسليم', desc: 'التسليم للمستلم بنجاح' },
                ].map((s) => {
                  const currentIdx = getStepIndex(searchedShipment.status);
                  const isDone = currentIdx >= s.step;
                  const isCurrent = currentIdx === s.step;
                  return (
                    <div 
                      key={s.step}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrent 
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20' 
                          : isDone 
                          ? 'bg-slate-50 border-emerald-300' 
                          : 'bg-white border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {s.step}
                        </span>
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{s.label}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 text-center font-bold text-sm">
              عذراً، هذه الشحنة ملغاة.
            </div>
          )}

          {/* Interactive Route Map */}
          {searchedShipment.status !== 'cancelled' && (
            <RouteMap shipment={searchedShipment} />
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 text-sm">
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <User className="w-4 h-4 text-emerald-600" />
                <span>معلومات المرسل والمنشأ</span>
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-500">المرسل:</span>
                <span className="font-bold text-slate-900">{searchedShipment.sender_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">الفئة:</span>
                <span className="font-semibold text-emerald-700">{SENDER_CATEGORY_LABELS[searchedShipment.sender_category]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">فرع الانطلاق:</span>
                <span className="font-bold text-slate-900">{searchedShipment.origin_branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">تاريخ الإنشاء:</span>
                <span className="font-mono text-xs">{searchedShipment.created_at}</span>
              </div>
            </div>

            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>معلومات المستلم والوجهة</span>
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-500">المستلم:</span>
                <span className="font-bold text-slate-900">{searchedShipment.recipient_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">المحافظة:</span>
                <span className="font-bold text-slate-900">{searchedShipment.destination_governorate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">العنوان التفصيلي:</span>
                <span className="font-semibold text-slate-900">{searchedShipment.destination_city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">نوع المستند:</span>
                <span className="font-semibold text-emerald-700">{DOCUMENT_TYPE_LABELS[searchedShipment.document_type] || searchedShipment.document_type}</span>
              </div>
            </div>
          </div>

          {/* Invoice & Contract Details */}
          {(searchedShipment.invoice_id || searchedShipment.contract_id) && (
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-emerald-300 flex items-center gap-2 border-b border-emerald-900/60 pb-2">
                <FileText className="w-4 h-4" />
                <span>الفاتورة والعقد الرقمي الموثق وبوليصة الشحن مع الباركود</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs items-center">
                <div>
                  <span className="text-slate-400 block">رقم الفاتورة:</span>
                  <span className="font-mono font-bold text-white text-sm">{searchedShipment.invoice_id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">المبلغ الإجمالي التقديري:</span>
                  <span className="font-mono font-bold text-emerald-300 text-sm">{searchedShipment.amount?.toLocaleString()} {searchedShipment.currency}</span>
                </div>
                <div>
                  <button
                    onClick={() => setShowWaybill(true)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 w-full"
                  >
                    <span>🖨️ طباعة وعرض البوليصة والباركود</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {showWaybill && (
            <WaybillModal
              shipment={searchedShipment}
              onClose={() => setShowWaybill(false)}
            />
          )}

          {/* Disclaimer Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>تنبيه:</strong> السعر وموعد التسليم النهائي يؤكد عند استلام الشحنة في الفرع.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
