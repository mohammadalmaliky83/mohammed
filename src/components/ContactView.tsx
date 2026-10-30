import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Shield, Send, CheckCircle2, Award } from 'lucide-react';
import { ContactSettings } from '../types';

interface ContactViewProps {
  contactSettings: ContactSettings;
  onUpdateContactSettings: (settings: ContactSettings) => void;
  isAdmin: boolean;
}

export const ContactView: React.FC<ContactViewProps> = ({
  contactSettings,
  onUpdateContactSettings,
  isAdmin
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [primaryPhone, setPrimaryPhone] = useState(contactSettings.primaryPhone);
  const [secondaryPhone, setSecondaryPhone] = useState(contactSettings.secondaryPhone);
  const [whatsappNumber, setWhatsappNumber] = useState(contactSettings.whatsappNumber);
  const [email, setEmail] = useState(contactSettings.email);
  const [address, setAddress] = useState(contactSettings.address);

  // Inquiry form
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContactSettings({
      primaryPhone,
      secondaryPhone,
      whatsappNumber,
      email,
      address
    });
    setIsEditing(false);
    alert('تم تحديث بيانات الاتصال بنجاح.');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone || !inquiryMessage) return;
    setSentSuccess(true);
    setSenderName('');
    setSenderPhone('');
    setInquiryMessage('');
    setTimeout(() => setSentSuccess(false), 4000);
  };

  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>مكتب معتمد من الشركة العامة للبريد والتوفير</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">تواصل مع مكتب الناقل الآمن</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          نحن في خدمتك على مدار الساعة للإجابة على استفساراتك حول توصيل المستندات والتصديقات الجمركية من أم قصر إلى جميع المحافظات.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Cards & WhatsApp Integration */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-600" />
              <span>أرقام الهواتف الرسمية وخدمة العملاء</span>
            </h2>

            <div className="space-y-4">
              {/* Primary Phone */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-emerald-700 font-bold block">الرقم الرئيسي الأول</span>
                  <span className="font-mono text-xl font-black text-slate-900">{contactSettings.primaryPhone}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${contactSettings.primaryPhone}`}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>اتصال</span>
                  </a>
                  <a
                    href={`https://wa.me/${cleanWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>

              {/* Secondary Phone */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-bold block">الرقم الفرعي الثاني</span>
                  <span className="font-mono text-xl font-black text-slate-900">{contactSettings.secondaryPhone}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${contactSettings.secondaryPhone}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>اتصال</span>
                  </a>
                  <a
                    href={`https://wa.me/${cleanWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Email */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{contactSettings.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-mono">{contactSettings.email}</span>
              </div>
            </div>

            {isAdmin && (
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                >
                  <span>{isEditing ? 'إلغاء التعديل' : '⚙️ تعديل أرقام التواصل (خاص بالإدارة)'}</span>
                </button>

                {isEditing && (
                  <form onSubmit={handleSaveSettings} className="mt-4 space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">الرقم الرئيسي</label>
                      <input
                        type="text"
                        value={primaryPhone}
                        onChange={(e) => setPrimaryPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">الرقم الثاني</label>
                      <input
                        type="text"
                        value={secondaryPhone}
                        onChange={(e) => setSecondaryPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">رقم الواتساب (بدون رموز)</label>
                      <input
                        type="text"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">العنوان</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      حفظ التعديلات
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Inquiry Form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" />
              <span>إرسال استفسار مباشر</span>
            </h2>

            {sentSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>تم إرسال استفسارك بنجاح! سيتم الرد عليك في أقرب وقت.</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكريم</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="اسمك أو اسم الشركة"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف</label>
                <input
                  type="tel"
                  required
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="+964 7700000000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">نص الاستفسار أو الرسالة</label>
                <textarea
                  required
                  rows={4}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="اكتب استفسارك حول الشحنات أو التصديقات الجمركية..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
