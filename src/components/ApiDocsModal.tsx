import React from 'react';
import { Database, X, Shield, Code, Server } from 'lucide-react';

interface ApiDocsModalProps {
  onClose: () => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-200 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">وثيقة البنية التحتية وقاعدة البيانات (MySQL & PDO API)</h3>
              <p className="text-xs text-slate-400">توثيق محرك API المركزي ومخطط الجداول المستخرج من وثيقة الناقل الآمن</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm font-mono leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>1. البنية التحتية ومؤشرات الأداء (Infrastructure & Latency)</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <li>التغطية الجغرافية: تغطية شاملة لـ 18 محافظة عراقية.</li>
              <li>الانتشار التشغيلي: 76 فرعاً موزاباً استراتيجياً لتقليل الاختناقات.</li>
              <li>مؤشر الأداء: زمن استجابة مستهدف أقل من 10 ملي ثانية (&lt; 10ms) عبر التخزين المؤقت (In-Memory Caching) وموازنة الأحمال (Load Balancing).</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>2. أمان البيانات وقواعد البيانات (MySQL & PDO)</span>
            </div>
            <p className="text-xs text-slate-300">
              لتجنب ثغرات الحقن (SQL Injection) المجهزة PDO تعتمد المنصة حصرياً على استعلامات Prepared Statements لضمان السرية التامة للمستندات الجمركية.
            </p>
            <pre className="bg-slate-950 p-4 rounded-xl text-emerald-300 text-xs overflow-x-auto border border-slate-800">
{`CREATE DATABASE IF NOT EXISTS safe_carrier_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE safe_carrier_db;

-- جدول المحافظات (18 محافظة عراقية)
CREATE TABLE IF NOT EXISTS governorates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_ar VARCHAR(100) NOT NULL,
  base_fee DECIMAL(10,2) NOT NULL DEFAULT 25000.00
);

-- جدول الفروع (76 فرعاً)
CREATE TABLE IF NOT EXISTS branches (
  branch_id VARCHAR(50) PRIMARY KEY,
  governorate_id INT,
  branch_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (governorate_id) REFERENCES governorates(id)
);

-- جدول الشحنات والطلبات (ORD)
CREATE TABLE IF NOT EXISTS shipments (
  order_id VARCHAR(50) PRIMARY KEY,
  status VARCHAR(50) NOT NULL DEFAULT 'processing',
  origin_branch VARCHAR(50) NOT NULL,
  destination_governorate VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الفواتير المالية (INV)
CREATE TABLE IF NOT EXISTS invoices (
  invoice_id VARCHAR(50) PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'IQD',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  FOREIGN KEY (order_id) REFERENCES shipments(order_id) ON DELETE CASCADE
);

-- جدول العقود والتصديقات الرقمية (CON)
CREATE TABLE IF NOT EXISTS contracts (
  contract_id VARCHAR(50) PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  valid_until DATE NOT NULL,
  signature_token VARCHAR(255) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES shipments(order_id) ON DELETE CASCADE
);`}
            </pre>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>3. محرك API المركزي (safe_carrier_api.php)</span>
            </div>
            <pre className="bg-slate-950 p-4 rounded-xl text-emerald-300 text-xs overflow-x-auto border border-slate-800">
{`// هيكلية الطرد الرقمي (Payload Anatomy) عبر بروتوكول POST
{
  "ORD": {
    "order_id": "ORD-102938",
    "status": "in_transit",
    "origin_branch": "Branch-04",
    "destination_governorate": "Basra"
  },
  "INV": {
    "invoice_id": "INV-883920",
    "amount": 25000,
    "currency": "IQD",
    "payment_status": "settled"
  },
  "CON": {
    "contract_id": "CON-55412",
    "valid_until": "2027-12-31",
    "signature_token": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-800 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
          >
            إغلاق الوثيقة
          </button>
        </div>
      </div>
    </div>
  );
};
