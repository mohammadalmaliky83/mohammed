import React, { useState } from 'react';
import { Shield, Truck, Search, Phone, Lock, Menu, X, FileText, Database, HelpCircle, UserCheck } from 'lucide-react';
import { ContactSettings } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  contactSettings: ContactSettings;
  onOpenAdmin: () => void;
  onOpenApiDocs: () => void;
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  contactSettings,
  onOpenAdmin,
  onOpenApiDocs,
  language,
  setLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = language === 'ar' ? {
    home: 'الرئيسية',
    request: 'طلب شحنة مستندات',
    track: 'تتبع الشحنة',
    courier: 'بوابة المندوب',
    faq: 'الأسئلة الشائعة',
    contact: 'تواصل معنا',
    admin: 'لوحة الإدارة',
    apiDocs: 'وثيقة النظام والـ API',
    topBanner: 'مكتب معتمد من الشركة العامة للبريد والتوفير - الانطلاق الرئيسي من ميناء أم قصر (البصرة) إلى جميع محافظات العراق',
    certified: 'مكتب معتمد'
  } : {
    home: 'Home',
    request: 'Request Shipment',
    track: 'Track Shipment',
    courier: 'Courier Portal',
    faq: 'FAQ',
    contact: 'Contact Us',
    admin: 'Admin Dashboard',
    apiDocs: 'System & API Docs',
    topBanner: 'Certified Office by General Company for Post & Savings - Umm Qasr Port (Basra) to all Iraqi Governorates',
    certified: 'Certified Office'
  };

  const navItems = [
    { id: 'home', label: t.home, icon: Shield },
    { id: 'request', label: t.request, icon: Truck },
    { id: 'track', label: t.track, icon: Search },
    { id: 'courier', label: t.courier, icon: UserCheck },
    { id: 'faq', label: t.faq, icon: HelpCircle },
    { id: 'contact', label: t.contact, icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-lg border-b border-slate-800">
      {/* Top emergency / info bar */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-700 font-bold text-emerald-100 text-[11px]">
              مكتب معتمد
            </span>
            <span>الشركة العامة للبريد والتوفير - الانطلاق الرئيسي من ميناء أم قصر (البصرة) إلى جميع محافظات العراق</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${contactSettings.primaryPhone}`} 
              className="hover:underline flex items-center gap-1 font-mono"
            >
              <Phone className="w-3.5 h-3.5" /> {contactSettings.primaryPhone}
            </a>
            <span className="hidden md:inline">|</span>
            <button 
              onClick={onOpenApiDocs}
              className="hover:underline flex items-center gap-1 text-emerald-200"
            >
              <Database className="w-3.5 h-3.5" /> وثيقة النظام والـ API
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-emerald-400/30">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                <span>الناقل الآمن</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30">
                  للتوصيل والتصديقات
                </span>
              </div>
              <p className="text-xs text-slate-400">مكتب أم قصر - البصرة (18 محافظة عراقية)</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Toggle & Admin Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="تغيير اللغة / Change Language"
            >
              <span>🌐</span>
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'لوحة الإدارة' : 'Admin'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700"
              title="لوحة الإدارة"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onOpenApiDocs();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              <Database className="w-5 h-5 text-emerald-400" />
              <span>وثيقة النظام وقاعدة البيانات (API)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
