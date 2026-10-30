import React from 'react';
import { MapPin, Truck, Shield, CheckCircle2, Navigation } from 'lucide-react';
import { Shipment } from '../types';

interface RouteMapProps {
  shipment: Shipment;
}

export const RouteMap: React.FC<RouteMapProps> = ({ shipment }) => {
  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'new': return 15;
      case 'received': return 40;
      case 'in_transit': return 75;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 20;
    }
  };

  const progress = getProgressPercentage(shipment.status);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h3 className="text-base sm:text-lg font-bold">خريطة ومسار الشحنة التفاعلي</h3>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
          تتبع مباشر عبر شبكة الـ 76 فرعاً
        </span>
      </div>

      {/* Visual Route Representation */}
      <div className="relative py-8 px-2 sm:px-6">
        {/* Connecting Line background */}
        <div className="absolute top-1/2 left-8 right-8 h-2 bg-slate-700 -translate-y-1/2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Route Nodes */}
        <div className="relative z-10 flex justify-between items-center text-center">
          {/* Node 1: Origin */}
          <div className="space-y-2 flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg ${
              progress >= 15 ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/20' : 'bg-slate-700 text-slate-400'
            }`}>
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-white">ميناء أم قصر</div>
            <div className="text-[10px] text-slate-400">قطب الانطلاق الرئيسي</div>
          </div>

          {/* Node 2: Hub */}
          <div className="space-y-2 flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg ${
              progress >= 40 ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/20' : 'bg-slate-700 text-slate-400'
            }`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-white">محطة التدقيق</div>
            <div className="text-[10px] text-slate-400">تدقيق المستندات والرسوم</div>
          </div>

          {/* Node 3: Transit */}
          <div className="space-y-2 flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg ${
              progress >= 75 ? 'bg-amber-600 text-white ring-4 ring-amber-500/20 animate-bounce' : 'bg-slate-700 text-slate-400'
            }`}>
              <Truck className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-white">طريق النقل العابر</div>
            <div className="text-[10px] text-slate-400">إلى {shipment.destination_governorate}</div>
          </div>

          {/* Node 4: Destination */}
          <div className="space-y-2 flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg ${
              progress >= 100 ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/20' : 'bg-slate-700 text-slate-400'
            }`}>
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-white">{shipment.destination_governorate}</div>
            <div className="text-[10px] text-slate-400">وجهة التسليم النهائية</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl p-4 text-xs text-slate-300 flex items-center justify-between border border-slate-700">
        <span>📍 مسار الشحنة من أم قصر إلى <strong>{shipment.destination_governorate}</strong> ({shipment.destination_city})</span>
        <span className="font-mono text-emerald-400 font-bold">{progress}% مكتمل</span>
      </div>
    </div>
  );
};
