import React, { useState } from 'react';
import { 
  Shield, 
  Truck, 
  Search, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  User, 
  Star, 
  ArrowLeft, 
  FileText, 
  Clock,
  ExternalLink,
  MessageSquare,
  Plus
} from 'lucide-react';
import { Governorate, Shipment, ContactSettings } from '../types';
import { SENDER_CATEGORY_LABELS } from '../data/initialData';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  governorates: Governorate[];
  shipments: Shipment[];
  contactSettings: ContactSettings;
  onTrackSearch: (orderId: string) => void;
}

interface Testimonial {
  id: string;
  name: string;
  category: 'company' | 'customs_broker' | 'individual' | 'merchant';
  text: string;
  rating: number;
  date: string;
}

export const Home: React.FC<HomeProps> = ({
  setCurrentTab,
  governorates,
  shipments,
  contactSettings,
  onTrackSearch
}) => {
  const [trackingInput, setTrackingInput] = useState('');
  const [selectedGov, setSelectedGov] = useState<Governorate | null>(governorates[1] || null); // default Baghdad
  
  // Testimonials state with initial trustworthy feedback
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'أحمد الساعدي',
      category: 'customs_broker',
      text: 'مكتب الناقل الآمن أثبت كفاءة عالية في نقل البوالص والبيانات الجمركية من ميناء أم قصر إلى بغداد وسرعة تسليم لا مثيل لها.',
      rating: 5,
      date: '2026-10-25'
    },
    {
      id: '2',
      name: 'شركة الفرات للتجارة والاستيراد',
      category: 'company',
      text: 'خدمة معتمدة وموثوقة جداً. ساعدتنا في تصديق وإيصال المستندات التجارية لجميع فروعنا في المحافظات بكل أمان وسرية.',
      rating: 5,
      date: '2026-10-26'
    },
    {
      id: '3',
      name: 'حيدر الكرخي',
      category: 'merchant',
      text: 'التعامل احترافي للغاية ونظام التتبع الدقيق يمنحنا راحة البال. أنصح جميع التجار بالاعتماد عليهم.',
      rating: 5,
      date: '2026-10-28'
    }
  ]);

  const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false);
  const [newTestName, setNewTestName] = useState('');
  const [newTestCategory, setNewTestCategory] = useState<'company' | 'customs_broker' | 'individual' | 'merchant'>('company');
  const [newTestText, setNewTestText] = useState('');

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestName.trim() || !newTestText.trim()) return;

    const newT: Testimonial = {
      id: Date.now().toString(),
      name: newTestName,
      category: newTestCategory,
      text: newTestText,
      rating: 5,
      date: new Date().toISOString().split('T')[0]
    };

    setTestimonials([newT, ...testimonials]);
    setNewTestName('');
    setNewTestText('');
    setShowAddTestimonialModal(false);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onTrackSearch(trackingInput.trim());
      setCurrentTab('track');
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-emerald-900/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-semibold">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>مكتب معتمد من الشركة العامة للبريد والتوفير</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              منصة الناقل الآمن الرقمية <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                لتوصيل المستندات والتصديقات الجمركية
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              الانطلاق الحصري من ميناء أم قصر (البصرة) إلى جميع محافظات العراق الـ 18 عبر 76 فرعاً تشغيلياً. نخدم الشركات، المخلصين الجمركيين، التجار، والأفراد بكفاءة وسرية تامة.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setCurrentTab('request')}
                className="px-6.5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2.5 shadow-lg shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5"
              >
                <Truck className="w-5 h-5" />
                <span>طلب شحنة مستندات جديدة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTab('track')}
                className="px-6.5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold border border-slate-700 flex items-center gap-2.5 transition-all"
              >
                <Search className="w-5 h-5 text-emerald-400" />
                <span>تتبع شحنتك الحالية</span>
              </button>
            </div>

            {/* Price disclaimer banner */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-amber-200 text-xs sm:text-sm flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>تنبيه هام:</strong> تفاصيل السعر وموعد التسليم النهائي تؤكد عند استلام الطلب رسمياً في الفرع.
              </span>
            </div>
          </div>

          {/* Quick Tracking Widget in Hero */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">تتبع سريع للطرد أو المستند</h3>
                <p className="text-xs text-slate-400">أدخل رقم التتبع (مثل ORD-102938) لمعرفة الحالة الفورية</p>
              </div>

              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">رقم تتبع الشحنة</label>
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="مثال: ORD-102938"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono text-center text-lg tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث عن حالة الطلب</span>
                </button>
              </form>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>نقطة الانطلاق: ميناء أم قصر</span>
                <span className="text-emerald-400 font-medium">18 محافظة عراقية</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Trust Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">18 محافظة</div>
              <div className="text-xs text-slate-500">تغطية جاملة لعموم العراق</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">76 فرعاً</div>
              <div className="text-xs text-slate-500">انتشار استراتيجي لتقليل الاختناقات</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">حماية تامة</div>
              <div className="text-xs text-slate-500">تشفير مستندات ومعايير PDO أمنية</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">معتمد رسمياً</div>
              <div className="text-xs text-slate-500">الشركة العامة للبريد والتوفير</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map & Coverage Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>خريطة التغطية الجغرافية</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">خريطة ومحافظات التوصيل من أم قصر</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            انقر على أي محافظة أدناه أو مرر مؤشر الماوس لاستعراض تفاصيل التغطية الجغرافية والفروع ونطاق الخدمة المعتمد.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Governorate Grid / Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {governorates.map((gov) => {
              const isSelected = selectedGov?.id === gov.id;
              const isUmmQasr = gov.id === 1;
              return (
                <div
                  key={gov.id}
                  onClick={() => setSelectedGov(gov)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20'
                      : isUmmQasr
                      ? 'bg-amber-50 border-amber-200 text-slate-900 hover:border-amber-400'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : isUmmQasr ? 'text-amber-600' : 'text-emerald-600'}`} />
                      {gov.name_ar}
                    </span>
                    {isUmmQasr && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-white font-bold">
                        قطب الانطلاق
                      </span>
                    )}
                  </div>
                  <div className={`text-xs flex justify-between items-center ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                    <span>الرسوم الأساسية التقديرية:</span>
                    <span className="font-mono font-bold">{gov.base_fee.toLocaleString()} د.ع</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Governorate Detail Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700 sticky top-28 space-y-6">
            {selectedGov ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <span className="text-xs text-emerald-400 font-semibold">محافظة مختارة للتوصيل</span>
                    <h3 className="text-2xl font-black text-white mt-0.5">{selectedGov.name_ar}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex justify-between items-center bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                    <span>نقطة الانطلاق الرئيسية:</span>
                    <span className="font-bold text-white">ميناء أم قصر (البصرة)</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                    <span>الرسوم الأساسية المبدئية:</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedGov.base_fee.toLocaleString()} د.ع</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                    <span>حالة التغطية التشغيلية:</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                      متاحة وفورية 100%
                    </span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-amber-200 text-xs">
                  <strong>ملاحظة هامة:</strong> تفاصيل السعر وموعد التسليم النهائي تؤكد عند استلام الطلب رسمياً في الفرع.
                </div>

                <button
                  onClick={() => setCurrentTab('request')}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>إرسال مستند إلى {selectedGov.name_ar}</span>
                </button>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400">
                اختر محافظة من القائمة لعرض تفاصيل التغطية
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>آراء العملاء والمستفيدين</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">ماذا يقول عملاؤنا والمخلصون الجمركيون؟</h2>
          </div>
          <button
            onClick={() => setShowAddTestimonialModal(true)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold flex items-center gap-2 shadow-md transition-colors w-fit"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>أضف رأيك أو تقييمك</span>
          </button>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      {SENDER_CATEGORY_LABELS[t.category] || t.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900">{t.name}</span>
                  <span className="font-mono">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm">لا توجد تقييمات مضافة حتى الآن. كن أول من يشاركنا رأيه في الخدمة!</p>
          </div>
        )}
      </section>

      {/* Add Testimonial Modal */}
      {showAddTestimonialModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">إضافة رأي أو تقييم جديد</h3>
              <button 
                onClick={() => setShowAddTestimonialModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكريم</label>
                <input
                  type="text"
                  required
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                  placeholder="مثال: محمد عبد الله"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الفئة</label>
                <select
                  value={newTestCategory}
                  onChange={(e) => setNewTestCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm bg-white"
                >
                  <option value="company">شركة تجارية</option>
                  <option value="customs_broker">مخلص جمركي معتمد</option>
                  <option value="merchant">تاجر / مستورد</option>
                  <option value="individual">فرد / مواطن</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">رأيك في الخدمة</label>
                <textarea
                  required
                  rows={4}
                  value={newTestText}
                  onChange={(e) => setNewTestText(e.target.value)}
                  placeholder="اكتب تقييمك حول سرعة وموثوقية توصيل المستندات..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTestimonialModal(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
                >
                  نشر التقييم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
