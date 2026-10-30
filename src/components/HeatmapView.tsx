import React from 'react';
import { Flame, MapPin, TrendingUp, BarChart3, Shield } from 'lucide-react';
import { Shipment, Governorate } from '../types';

interface HeatmapViewProps {
  shipments: Shipment[];
  governorates: Governorate[];
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({ shipments, governorates }) => {
  // Count shipments per governorate
  const counts: Record<string, number> = {};
  shipments.forEach(s => {
    const gov = s.destination_governorate;
    counts[gov] = (counts[gov] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(counts), 1);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">الخريطة الحرارية لكثافة الشحنات (Heatmap)</h3>
            <p className="text-xs text-slate-500">التوزيع الجغرافي وحجم الطلب عبر المحافظات العراقية لتسهيل التخطيط اللوجستي وتوزيع فروع أم قصر الـ 76</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>تغطية 18 محافظة عراقية</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {governorates.map((gov) => {
          const count = counts[gov.name_ar] || 0;
          const percentage = Math.round((count / maxCount) * 100);
          
          let heatColor = 'bg-slate-100 text-slate-700 border-slate-200';
          let intensityText = 'منخفض';
          if (count >= 3) {
            heatColor = 'bg-gradient-to-l from-rose-500 to-amber-500 text-white border-transparent shadow-lg shadow-rose-900/20';
            intensityText = 'كثافة عالية 🔥';
          } else if (count >= 1) {
            heatColor = 'bg-gradient-to-l from-emerald-600 to-teal-500 text-white border-transparent shadow-md shadow-emerald-900/20';
            intensityText = 'نشط ⚡';
          }

          return (
            <div 
              key={gov.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${heatColor}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 opacity-80" />
                  {gov.name_ar}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-mono font-bold">
                  {intensityText}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs opacity-90">
                  <span>عدد الطلبات:</span>
                  <span className="font-mono font-black text-base">{count} شحنات</span>
                </div>
                <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500" 
                    style={{ width: `${Math.max(percentage, 10)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
