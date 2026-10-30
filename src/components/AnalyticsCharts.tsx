import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend 
} from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Shield } from 'lucide-react';
import { Shipment } from '../types';

interface AnalyticsChartsProps {
  shipments: Shipment[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ shipments }) => {
  // Aggregate data by status
  const statusCounts: Record<string, number> = {
    new: 0,
    received: 0,
    in_transit: 0,
    delivered: 0,
    cancelled: 0
  };

  shipments.forEach(s => {
    if (statusCounts[s.status] !== undefined) {
      statusCounts[s.status] += 1;
    } else {
      statusCounts[s.status] = 1;
    }
  });

  const statusPieData = [
    { name: 'طلب جديد', value: statusCounts.new, color: '#3b82f6' },
    { name: 'تم الاستلام بأم قصر', value: statusCounts.received, color: '#6366f1' },
    { name: 'قيد التوصيل', value: statusCounts.in_transit, color: '#f59e0b' },
    { name: 'تم التسليم', value: statusCounts.delivered, color: '#10b981' },
    { name: 'ملغى', value: statusCounts.cancelled, color: '#f43f5e' },
  ].filter(item => item.value > 0);

  // Daily/Weekly trend simulation data
  const dailyTrendData = [
    { day: 'السبت', shipments: 12, revenue: 360000 },
    { day: 'الأحد', shipments: 19, revenue: 570000 },
    { day: 'الإثنين', shipments: 15, revenue: 450000 },
    { day: 'الثلاثاء', shipments: 22, revenue: 660000 },
    { day: 'الأربعاء', shipments: 28, revenue: 840000 },
    { day: 'الخميس', shipments: 25, revenue: 750000 },
    { day: 'الجمعة', shipments: 8, revenue: 240000 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1', '#f43f5e'];

  return (
    <div className="space-y-8">
      {/* Top Stats Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">التحليلات المرئية والرسوم البيانية (Recharts)</h3>
            <p className="text-xs text-slate-500">إحصائيات الشحنات اليومية، الأسبوعية، وتوزيع الحالات بوضوح تام لتسهيل الإدارة والقرارات</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-900 text-emerald-400">
          <TrendingUp className="w-4 h-4" />
          <span>معدل نمو الأداء: +18.4%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Daily Trend Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>حجم الشحنات اليومية خلال الأسبوع الحالي</span>
          </h4>
          <div className="h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', color: '#fff', borderRadius: '12px', border: 'none' }}
                />
                <Bar dataKey="shipments" fill="#10b981" radius={[8, 8, 0, 0]} name="عدد الشحنات" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown Pie Chart */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <PieIcon className="w-5 h-5 text-emerald-600" />
            <span>توزيع حالات الشحنات</span>
          </h4>
          <div className="h-72 w-full flex items-center justify-center" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#0f172a', color: '#fff', borderRadius: '12px', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {statusPieData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600 font-medium">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
