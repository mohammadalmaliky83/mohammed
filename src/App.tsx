import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { NewShipmentForm } from './components/NewShipmentForm';
import { TrackingView } from './components/TrackingView';
import { ContactView } from './components/ContactView';
import { FaqView } from './components/FaqView';
import { CourierPortal } from './components/CourierPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { ApiDocsModal } from './components/ApiDocsModal';
import { 
  IRAQI_GOVERNORATES, 
  INITIAL_CONTACT_SETTINGS, 
  INITIAL_SHIPMENTS 
} from './data/initialData';
import { Shipment, ContactSettings, ShipmentStatus } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  // Persistent shipments
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem('safe_carrier_shipments_iq');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SHIPMENTS;
  });

  // Persistent notifications
  const [notifications, setNotifications] = useState<any[]>(() => {
    const saved = localStorage.getItem('safe_carrier_notifications_iq');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'notif-1',
        order_id: 'ORD-102938',
        title: 'تحديث حالة الشحنة',
        message: 'تم تحديث حالة الشحنة ORD-102938 إلى: قيد التوصيل للمحافظة. تم إرسال البريد والإشعار بنجاح.',
        created_at: '2026-10-28 15:00:00',
        read: false
      }
    ];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistent contact settings
  const [contactSettings, setContactSettings] = useState<ContactSettings>(() => {
    const saved = localStorage.getItem('safe_carrier_contact_iq');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CONTACT_SETTINGS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');
  const [showApiDocsModal, setShowApiDocsModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('safe_carrier_shipments_iq', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('safe_carrier_notifications_iq', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('safe_carrier_contact_iq', JSON.stringify(contactSettings));
  }, [contactSettings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddShipment = (newShipment: Shipment) => {
    setShipments([newShipment, ...shipments]);
    showToast(`تم إنشاء الطلب ${newShipment.order_id} وإرسال إشعار التأكيد بنجاح.`);
  };

  const handleUpdateShipmentStatus = (orderId: string, status: ShipmentStatus) => {
    setShipments(shipments.map(s => s.order_id === orderId ? { ...s, status } : s));
    
    // Arabic label for status
    const statusLabelsArabic: Record<string, string> = {
      new: 'طلب جديد',
      received: 'تم الاستلام في فرع أم قصر',
      in_transit: 'قيد التوصيل إلى المحافظة',
      delivered: 'تم تسليم الشحنة بنجاح',
      cancelled: 'ملغى'
    };

    const statusText = statusLabelsArabic[status] || status;
    const newNotif = {
      id: 'notif-' + Date.now(),
      order_id: orderId,
      title: 'إشعار تحديث حالة الشحنة',
      message: `تم تحديث حالة الشحنة (${orderId}) إلى: "${statusText}". تم إرسال تنبيه البريد الإلكتروني والواتساب تلقائياً للعميل.`,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      read: false
    };

    setNotifications([newNotif, ...notifications]);
    showToast(`تم تحديث الحالة وإرسال إشعار تلقائي للعميل بنجاح (${orderId})`);
  };

  const handleDeleteShipment = (orderId: string) => {
    setShipments(shipments.filter(s => s.order_id !== orderId));
    showToast(`تم حذف الشحنة ${orderId}`);
  };

  const handleTrackSearchFromHome = (orderId: string) => {
    setActiveTrackingId(orderId);
    setCurrentTab('track');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-950 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'admin') {
            setCurrentTab('admin');
          } else {
            setCurrentTab(tab);
          }
        }}
        contactSettings={contactSettings}
        onOpenAdmin={() => setCurrentTab('admin')}
        onOpenApiDocs={() => setShowApiDocsModal(true)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <Home
            setCurrentTab={setCurrentTab}
            governorates={IRAQI_GOVERNORATES}
            shipments={shipments}
            contactSettings={contactSettings}
            onTrackSearch={handleTrackSearchFromHome}
          />
        )}

        {currentTab === 'request' && (
          <NewShipmentForm
            governorates={IRAQI_GOVERNORATES}
            onAddShipment={handleAddShipment}
            onGoToTrack={(orderId) => {
              setActiveTrackingId(orderId);
              setCurrentTab('track');
            }}
          />
        )}

        {currentTab === 'track' && (
          <TrackingView
            shipments={shipments}
            initialTrackingId={activeTrackingId}
          />
        )}

        {currentTab === 'courier' && (
          <CourierPortal
            shipments={shipments}
            onUpdateShipmentStatus={handleUpdateShipmentStatus}
          />
        )}

        {currentTab === 'faq' && (
          <FaqView />
        )}

        {currentTab === 'contact' && (
          <ContactView
            contactSettings={contactSettings}
            onUpdateContactSettings={setContactSettings}
            isAdmin={isAdminLoggedIn}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            shipments={shipments}
            notifications={notifications}
            onUpdateShipmentStatus={handleUpdateShipmentStatus}
            onDeleteShipment={handleDeleteShipment}
            onAddShipment={handleAddShipment}
            onOpenApiDocs={() => setShowApiDocsModal(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
          />
        )}
      </main>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-emerald-400 px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-sm font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* API Documentation Modal */}
      {showApiDocsModal && (
        <ApiDocsModal onClose={() => setShowApiDocsModal(false)} />
      )}

      {/* Footer */}
      <Footer
        contactSettings={contactSettings}
        setCurrentTab={setCurrentTab}
        onOpenApiDocs={() => setShowApiDocsModal(true)}
      />
    </div>
  );
}
