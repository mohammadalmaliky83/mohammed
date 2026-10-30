import React, { useState } from 'react';
import { 
  Truck, 
  Shield, 
  FileText, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { Governorate, Shipment, SenderCategory, DocumentType } from '../types';
import { DOCUMENT_TYPE_LABELS, SENDER_CATEGORY_LABELS } from '../data/initialData';

interface NewShipmentFormProps {
  governorates: Governorate[];
  onAddShipment: (newShipment: Shipment) => void;
  onGoToTrack: (orderId: string) => void;
}

export const NewShipmentForm: React.FC<NewShipmentFormProps> = ({
  governorates,
  onAddShipment,
  onGoToTrack
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderCategory, setSenderCategory] = useState<SenderCategory>('customs_broker');
  const [senderPhone, setSenderPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [originBranch] = useState('Branch-01 (ميناء أم قصر الرئيسي - البصرة)');
  const [destinationGovernorate, setDestinationGovernorate] = useState(governorates[1]?.name_ar || 'بغداد');
  const [destinationCity, setDestinationCity] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('customs_declaration');
  const [notes, setNotes] = useState('');
  const [communicationMethod, setCommunicationMethod] = useState<'phone' | 'whatsapp' | 'sms'>('whatsapp');

  // Success Modal State
  const [createdOrder, setCreatedOrder] = useState<Shipment | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone || !recipientName || !recipientPhone || !destinationCity) {
      alert('يرجى ملء جميع الحقول الإلزامية المطلوبة.');
      return;
    }

    const randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const invoiceId = 'INV-' + Math.floor(100000 + Math.random() * 900000);
    const contractId = 'CON-' + Math.floor(10000 + Math.random() * 90000);

    const selectedGovObj = governorates.find(g => g.name_ar === destinationGovernorate);
    const amount = selectedGovObj ? selectedGovObj.base_fee : 25000;

    const newShipment: Shipment = {
      order_id: randomId,
      status: 'new',
      sender_name: senderName,
      sender_category: senderCategory,
      sender_phone: senderPhone,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
      origin_branch: originBranch,
      destination_governorate: destinationGovernorate,
      destination_city: destinationCity,
      document_type: documentType,
      notes: notes,
      communication_method: communicationMethod,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      invoice_id: invoiceId,
      amount: amount,
      currency: 'IQD',
      payment_status: 'pending',
      contract_id: contractId,
      valid_until: '2027-12-31',
      signature_token: 'token_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    };

    onAddShipment(newShipment);
    setCreatedOrder(newShipment);
  };

  const copyTrackingNumber = () => {
    if (createdOrder) {
      navigator.clipboard.writeText(createdOrder.order_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <Truck className="w-4 h-4 text-emerald-400" />
          <span>خدمة النقل والتصديق الجمركي</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">نموذج طلب شحنة مستندات رسمية</h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
          أرسل مستنداتك وبوالصك الجمركية بأمان من ميناء أم قصر (البصرة) إلى جميع المحافظات العراقية. يرجى ملء النموذج أدناه بدقة.
        </p>
      </div>

      {/* Price & Delivery Disclaimer Notice */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-amber-900 text-sm flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">تنبيه هام ومؤكد:</strong> تفاصيل السعر النهائي وموعد التسليم تؤكد عند استلام الطلب رسمياً في الفرع وتدقيق المستندات.
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-8">
        {/* Section 1: Sender Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>بيانات المرسل</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">فئة المرسل</label>
              <select
                value={senderCategory}
                onChange={(e) => setSenderCategory(e.target.value as SenderCategory)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm bg-white"
              >
                <option value="company">شركة تجارية</option>
                <option value="customs_broker">مخلص جمركي معتمد</option>
                <option value="merchant">تاجر / مستورد</option>
                <option value="individual">فرد / مواطن</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم المرسل / الجهة المرسلة *</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="مثال: شركة النخبة للتخليص"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم هاتف المرسل *</label>
              <input
                type="tel"
                required
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="+964 7800000000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Recipient Info & Cost Estimator */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>بيانات المستلم ووجهة التوصيل</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم المستلم / الجهة المستلمة *</label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="مثال: مؤسسة الفرات التجارية"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم هاتف المستلم *</label>
              <input
                type="tel"
                required
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="+964 7900000000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">محافظة وجهة التوصيل *</label>
              <select
                value={destinationGovernorate}
                onChange={(e) => setDestinationGovernorate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm bg-white"
              >
                {governorates.map((g) => (
                  <option key={g.id} value={g.name_ar}>
                    {g.name_ar} (تقديري: {g.base_fee.toLocaleString()} د.ع)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">المدينة والمنطقة والعنوان التفصيلي *</label>
              <input
                type="text"
                required
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                placeholder="مثال: بغداد - الكرادة - شارع الاستقلال"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>
          </div>

          {/* Live Estimated Cost Box */}
          {(() => {
            const selectedGovObj = governorates.find(g => g.name_ar === destinationGovernorate);
            const estFee = selectedGovObj ? selectedGovObj.base_fee : 25000;
            return (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <div className="space-y-1 text-right w-full sm:w-auto">
                  <span className="text-xs text-emerald-800 font-bold block">حاسبة التكلفة التقديرية الفورية:</span>
                  <span className="text-xs text-slate-600 block">
                    بناءً على المحافظة المختصرة (<strong className="text-slate-900">{destinationGovernorate}</strong>) من نقطة الانطلاق في أم قصر.
                  </span>
                </div>
                <div className="text-left w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="font-mono text-xl font-black text-emerald-700">
                    {estFee.toLocaleString()} د.ع
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Section 3: Shipment Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>تفاصيل المستندات وطريقة التواصل</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">نوع المستند *</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as DocumentType)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm bg-white"
              >
                {Object.entries(DOCUMENT_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">طريقة التواصل المفضلة</label>
              <select
                value={communicationMethod}
                onChange={(e) => setCommunicationMethod(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm bg-white"
              >
                <option value="whatsapp">تطبيق واتساب (WhatsApp)</option>
                <option value="phone">مكالمة هاتفيّة مباشرة</option>
                <option value="sms">رسائل نصية SMS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">ملاحظات إضافية حول الشحنة أو التوصيل</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي تعليمات خاصة بتسليم المستندات أو أختام التصديق..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm"
            ></textarea>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
          >
            <Truck className="w-5 h-5" />
            <span>تأكيد وإنشاء طلب شحنة المستندات</span>
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {createdOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 space-y-6 animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">تم إنشاء طلب الشحنة بنجاح!</h3>
              <p className="text-xs text-slate-500">تم إصدار رقم التتبع والعقد والفاتورة المبدئية بنجاح عبر النظام الآلي</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <span className="text-xs text-slate-500 block">رقم التتبع الخاص بك (احفظه جيداً):</span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-black text-emerald-700 tracking-wider">
                  {createdOrder.order_id}
                </span>
                <button
                  onClick={copyTrackingNumber}
                  className="px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-amber-50 border border-amber-200 rounded-xl p-3 text-right">
              <strong>تنبيه السعر:</strong> السعر التقديري للشحنة ({createdOrder.amount?.toLocaleString()} {createdOrder.currency}) وموعد التسليم تؤكد نهائياً عند استلام الطلب في فرع أم قصر.
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  onGoToTrack(createdOrder.order_id);
                }}
                className="flex-1 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors"
              >
                الذهاب لصفحة التتبع
              </button>
              <button
                onClick={() => setCreatedOrder(null)}
                className="flex-1 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                إنشاء طلب جديد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
