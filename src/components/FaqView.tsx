import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Shield, Clock, FileText, Truck, Award } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FaqView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqList: FaqItem[] = [
    {
      category: 'hours',
      question: 'ما هي مواعيد العمل الرسمية في مكتب الناقل الآمن وفروعنا؟',
      answer: 'يعمل مكتبنا الرئيسي في ميناء أم قصر (البصرة) وكافة فروعنا الـ 76 في المحافظات العراقية طيلة أيام الأسبوع من السبت إلى الخميس، من الساعة 8:00 صباحاً وحتى 4:00 عصراً. كما تتوفر خدمة الطوارئ وتتبع الشحنات عبر المنصة الرقمية وواتساب على مدار 24 ساعة.'
    },
    {
      category: 'authentication',
      question: 'ما هي طرق التوثيق والتصديقات الجمركية المعتمدة لديكم؟',
      answer: 'نحن مكتب معتمد رسمياً من قبل الشركة العامة للبريد والتوفير. نتولى نقل وتسليم البوالص والبيانات الجمركية، الفواتير التجارية، وشهادات المنشأ مع اعتماد عقود رقمية مؤمنة برموز تحقق فريدة (Signature Tokens) ومطابقة لمعايير قواعد البيانات الآمنة (PDO).'
    },
    {
      category: 'security',
      question: 'ما هي سياسة التعامل مع المستندات والحقائب الحساسة؟',
      answer: 'نطبق سياسة سرية صارمة للغاية؛ حيث يتم وضع المستندات في حقائب أمنية مغلقة ومختومة برقم تسلسلي لا يمكن فتحه إلا من قبل المستلم المخول. جميع المعاملات مسجلة ومشفرة عبر النظام الآلي لمنع أي وصول غير مصرح به.'
    },
    {
      category: 'delivery',
      question: 'كم تستغرق مدة التوصيل من أم قصر إلى المحافظات الأخرى؟',
      answer: 'تتراوح مدة التوصيل العادي للمستندات بين 24 إلى 48 ساعة حسب المحافظة والوجهة (محافظات الفرات الأوسط والجنوب خلال 24 ساعة، وبغداد وإقليم كردستان والمحافظات الشمالية والغربية خلال 24-48 ساعة). تفاصيل الموعد النهائي تؤكد عند استلام الشحنة رسمياً.'
    },
    {
      category: 'pricing',
      question: 'كيف يتم احتساب رسوم التوصيل، ومتى يؤكد السعر النهائي؟',
      answer: 'تبدأ الرسوم الأساسية للتوصيل من 15,000 دينار عراقي لمحافظة البصرة وتتفاوت حسب المسافة لباقي المحافظات الـ 18. تنبيه هام: تفاصيل السعر وموعد التسليم النهائي تؤكد عند استلام الطلب رسمياً في الفرع وتدقيق حجم وحساسية المستندات.'
    },
    {
      category: 'tracking',
      question: 'كيف يمكنني تتبع حالة شحنة المستندات الخاصة بي؟',
      answer: 'بمجرد إرسال طلبك عبر المنصة، سيصدر النظام رقم تتبع فريد (مثل ORD-102938). يمكنك إدخال هذا الرقم في صفحة "تتبع الشحنة" للاطلاع الفوري على خط سير الشحنة ومرحلتها الحالية (جديد، تم الاستلام، قيد التوصيل، تم التسليم).'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqList 
    : faqList.filter(f => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>المرجع الشامل للخدمات والإرشادات</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">الأسئلة الشائعة (FAQ)</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          إجابات تفصيلية حول مواعيد العمل، طرق التوثيق الجمركي، وسياسة التعامل مع المستندات الحساسة في مكتب الناقل الآمن.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'جميع الأسئلة' },
          { id: 'hours', label: 'مواعيد العمل' },
          { id: 'authentication', label: 'طرق التوثيق' },
          { id: 'security', label: 'المستندات الحساسة' },
          { id: 'delivery', label: 'مواعيد التوصيل' },
          { id: 'pricing', label: 'الأسعار والرسوم' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-sm ${
                isOpen ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-5 text-right flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    ؟
                  </span>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform ${isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : ''}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-2 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Footer Card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-emerald-950">لم تجد إجابة لسؤالك؟</h3>
        <p className="text-emerald-900/80 text-sm max-w-xl mx-auto">
          فريق خدمة العملاء ومسؤولو الفروع في أم قصر وباقي المحافظات مستعدون للإجابة على كافة استفساراتكم على مدار الساعة.
        </p>
        <div className="pt-2">
          <a
            href="tel:+9647710819390"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
          >
            <span>اتصل بنا الآن</span>
          </a>
        </div>
      </div>
    </div>
  );
};
