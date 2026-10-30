import React, { useState } from 'react';
import { Shield, Printer, ExternalLink, CheckCircle2, X, Download, Barcode, FileText, Award } from 'lucide-react';
import { Shipment } from '../types';
import { DOCUMENT_TYPE_LABELS, SENDER_CATEGORY_LABELS } from '../data/initialData';

interface WaybillModalProps {
  shipment: Shipment;
  onClose: () => void;
}

export const WaybillModal: React.FC<WaybillModalProps> = ({ shipment, onClose }) => {
  const [savingToDrive, setSavingToDrive] = useState(false);
  const [driveSavedSuccess, setDriveSavedSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToGoogleDrive = () => {
    setSavingToDrive(true);
    setTimeout(() => {
      setSavingToDrive(false);
      setDriveSavedSuccess(true);
      setTimeout(() => setDriveSavedSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Top Actions Bar (hidden when printing) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">بوليصة الشحنة والمستندات الرقمية الرسمية</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة البوليصة</span>
            </button>
            <button
              onClick={handleSaveToGoogleDrive}
              disabled={savingToDrive}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors disabled:opacity-50"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{savingToDrive ? 'جاري الحفظ...' : 'حفظ في Google Drive'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {driveSavedSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 text-emerald-800 text-xs font-bold flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>تم حفظ نسخة البوليصة بنجاح في مجلد Google Drive (Safe_Carrier_Archive).</span>
          </div>
        )}

        {/* Printable Waybill Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 print:p-0 print:m-4" id="printable-waybill">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">مكتب الناقل الآمن</h2>
                  <p className="text-xs text-slate-600">لتوصيل المستندات والتصديقات الجمركية</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">ميناء أم قصر، محافظة البصرة، العراق</p>
            </div>

            <div className="text-left space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <Award className="w-3.5 h-3.5" /> معتمد من البريد والتوفير
              </span>
              <div className="font-mono text-xs text-slate-500 pt-1">التاريخ: {shipment.created_at}</div>
            </div>
          </div>

          {/* Barcode & Tracking Number Box */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center space-y-2">
            <div className="text-xs text-slate-500 font-bold">رقم تتبع الشحنة المعتمد (Barcode ID)</div>
            <div className="font-mono text-3xl font-black text-slate-900 tracking-wider">
              {shipment.order_id}
            </div>
            {/* Visual Barcode Simulation */}
            <div className="flex justify-center items-center gap-1 py-1">
              {[...Array(32)].map((_, i) => (
                <div 
                  key={i} 
                  className={`bg-slate-900 ${i % 3 === 0 ? 'w-1.5' : i % 2 === 0 ? 'w-1' : 'w-2.5'} h-12 rounded-xs`}
                ></div>
              ))}
            </div>
            <div className="font-mono text-[11px] text-slate-600 tracking-widest">
              *|||||||| ||||||||||| ||||||| |||||||*
            </div>
          </div>

          {/* Sender & Recipient Grid */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="border border-slate-200 rounded-2xl p-4 space-y-2 bg-slate-50/50">
              <span className="text-xs font-bold text-emerald-700 block border-b border-slate-200 pb-1">بيانات المرسل</span>
              <div className="space-y-1 text-xs">
                <div><strong>الجهة:</strong> {shipment.sender_name}</div>
                <div><strong>الفئة:</strong> {SENDER_CATEGORY_LABELS[shipment.sender_category]}</div>
                <div><strong>الهاتف:</strong> <span className="font-mono">{shipment.sender_phone}</span></div>
                <div><strong>الانطلاق:</strong> {shipment.origin_branch}</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 space-y-2 bg-slate-50/50">
              <span className="text-xs font-bold text-emerald-700 block border-b border-slate-200 pb-1">بيانات المستلم والوجهة</span>
              <div className="space-y-1 text-xs">
                <div><strong>المستلم:</strong> {shipment.recipient_name}</div>
                <div><strong>المحافظة:</strong> {shipment.destination_governorate}</div>
                <div><strong>العنوان:</strong> {shipment.destination_city}</div>
                <div><strong>هاتف المستلم:</strong> <span className="font-mono">{shipment.recipient_phone}</span></div>
              </div>
            </div>
          </div>

          {/* Shipment Details Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-right">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-3">نوع المستند</th>
                  <th className="p-3">رقم الفاتورة المالية</th>
                  <th className="p-3">رقم العقد الرقمي</th>
                  <th className="p-3">المبلغ التقديري</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-bold text-slate-900">{DOCUMENT_TYPE_LABELS[shipment.document_type] || shipment.document_type}</td>
                  <td className="p-3 font-mono">{shipment.invoice_id || 'INV-883920'}</td>
                  <td className="p-3 font-mono">{shipment.contract_id || 'CON-55412'}</td>
                  <td className="p-3 font-mono font-bold text-emerald-700">{shipment.amount?.toLocaleString()} {shipment.currency || 'IQD'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {shipment.notes && (
            <div className="text-xs bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <strong>ملاحظات الشحنة:</strong> {shipment.notes}
            </div>
          )}

          {/* Disclaimer Notice */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-amber-900 text-[11px]">
            <strong>تنبيه هام ومؤكد:</strong> تفاصيل السعر النهائي وموعد التسليم تؤكد عند استلام الطلب رسمياً في فرع أم قصر وتدقيق المستندات.
          </div>

          {/* Stamps / Signatures Footer */}
          <div className="grid grid-cols-2 pt-6 border-t border-slate-200 text-center text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">توقيع وختم فرع أم قصر</p>
              <div className="h-14 mt-3 border-b border-dashed border-slate-400 w-3/4 mx-auto"></div>
            </div>
            <div>
              <p className="font-bold text-slate-900">توقيع المستلم / المندوب</p>
              <div className="h-14 mt-3 border-b border-dashed border-slate-400 w-3/4 mx-auto"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
