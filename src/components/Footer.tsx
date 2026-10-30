import React from 'react';
import { Shield, Phone, Mail, MapPin, Database, Award } from 'lucide-react';
import { ContactSettings } from '../types';

interface FooterProps {
  contactSettings: ContactSettings;
  setCurrentTab: (tab: string) => void;
  onOpenApiDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ contactSettings, setCurrentTab, onOpenApiDocs }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Certification */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">الناقل الآمن</h3>
                <p className="text-xs text-emerald-400 font-medium">لتوصيل المستندات والتصديقات الجمركية</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              مكتب معتمد من قبل الشركة العامة للبريد والتوفير. نتولى نقل وتوصيل المستندات الرسمية، البوالص الجمركية، والفواتير من ميناء أم قصر (البصرة) إلى جميع محافظات العراق الـ 18 بكفاءة وأمان تام.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-semibold">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>معتمد رسمياً من البريد والتوفير العراقية</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-b border-slate-800 pb-2">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-emerald-400 transition-colors">
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('request')} className="hover:text-emerald-400 transition-colors">
                  طلب شحنة مستندات جديدة
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('track')} className="hover:text-emerald-400 transition-colors">
                  تتبع حالة الشحنة برقم التتبع
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-emerald-400 transition-colors">
                  تواصل مع خدمة العملاء
                </button>
              </li>
              <li>
                <button onClick={onOpenApiDocs} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-300">
                  <Database className="w-3.5 h-3.5" /> وثيقة النظام وقاعدة البيانات
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Target Audience */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-b border-slate-800 pb-2">فئات المستفيدين</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>الشركات التجارية والملاحية</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>المخلصون الجمركيون المعتمدون</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>التجار والمستوردون</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>الأفراد وأصحاب المعاملات الرسمية</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-b border-slate-800 pb-2">معلومات الاتصال</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>{contactSettings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{contactSettings.primaryPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{contactSettings.secondaryPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs">{contactSettings.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
          <p>جميع الحقوق محفوظة © 2026 - مكتب الناقل الآمن لتوصيل المستندات والتصديقات الجمركية من أم قصر إلى عموم العراق.</p>
          <p className="text-amber-400/90 font-medium">
            تنبيه قانوني: تفاصيل السعر وموعد التسليم النهائي تؤكد عند استلام الطلب رسمياً في الفرع.
          </p>
        </div>
      </div>
    </footer>
  );
};
