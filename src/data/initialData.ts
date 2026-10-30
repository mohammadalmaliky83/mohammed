import { Governorate, Shipment, ContactSettings } from '../types';

export const IRAQI_GOVERNORATES: Governorate[] = [
  { id: 1, name_ar: 'البصرة (أم قصر - المقر الرئيسي)', base_fee: 15000 },
  { id: 2, name_ar: 'بغداد', base_fee: 30000 },
  { id: 3, name_ar: 'أربيل', base_fee: 45000 },
  { id: 4, name_ar: 'السليمانية', base_fee: 45000 },
  { id: 5, name_ar: 'دهوك', base_fee: 50000 },
  { id: 6, name_ar: 'كركوك', base_fee: 35000 },
  { id: 7, name_ar: 'نينوى (الموصل)', base_fee: 40000 },
  { id: 8, name_ar: 'صلاح الدين (تكريت)', base_fee: 35000 },
  { id: 9, name_ar: 'الأنبار (الرمادي)', base_fee: 35000 },
  { id: 10, name_ar: 'ديالى (بعقوبة)', base_fee: 30000 },
  { id: 11, name_ar: 'بابل (الحلة)', base_fee: 30000 },
  { id: 12, name_ar: 'كربلاء المقدسة', base_fee: 30000 },
  { id: 13, name_ar: 'النجف الأشرف', base_fee: 30000 },
  { id: 14, name_ar: 'الديوانية (القادسية)', base_fee: 32000 },
  { id: 15, name_ar: 'المثنى (السماوة)', base_fee: 35000 },
  { id: 16, name_ar: 'ذي قار (الناصرية)', base_fee: 32000 },
  { id: 17, name_ar: 'ميسان (العمارة)', base_fee: 30000 },
  { id: 18, name_ar: 'واسط (الكوت)', base_fee: 30000 },
];

export const INITIAL_CONTACT_SETTINGS: ContactSettings = {
  primaryPhone: '+964 7710819390',
  secondaryPhone: '+964 7865070017',
  whatsappNumber: '+9647710819390',
  email: 'Mohammadalmaliky75@gmail.com',
  address: 'ميناء أم قصر، محافظة البصرة، العراق (معتمد من الشركة العامة للبريد والتوفير)'
};

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    order_id: 'ORD-102938',
    status: 'in_transit',
    sender_name: 'شركة النخبة للتخليص الجمركي',
    sender_category: 'customs_broker',
    sender_phone: '+964 7801234567',
    recipient_name: 'الشركة العامة للتجارة والاستيراد',
    recipient_phone: '+964 7909876543',
    origin_branch: 'Branch-04 (ميناء أم قصر الجنوبي)',
    destination_governorate: 'بغداد',
    destination_city: 'الكرادة - شارع الاستقلال',
    document_type: 'customs_declaration',
    notes: 'مستندات تصديق جمركي عاجلة تتطلب عناية خاصة وتسليم باليد',
    communication_method: 'whatsapp',
    created_at: '2026-10-28 14:30:00',
    invoice_id: 'INV-883920',
    amount: 30000,
    currency: 'IQD',
    payment_status: 'settled',
    contract_id: 'CON-55412',
    valid_until: '2027-12-31',
    signature_token: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    order_id: 'ORD-204911',
    status: 'received',
    sender_name: 'محمد عبد الله التميمي',
    sender_category: 'merchant',
    sender_phone: '+964 7712345678',
    recipient_name: 'مؤسسة النور التجارية',
    recipient_phone: '+964 7811122233',
    origin_branch: 'Branch-01 (أم قصر الرئيسي)',
    destination_governorate: 'البصرة',
    destination_city: 'العشار - السوق التجاري',
    document_type: 'commercial_invoice',
    notes: 'فواتير تجارية مطابقة للمانيفست',
    communication_method: 'phone',
    created_at: '2026-10-29 09:15:00',
    invoice_id: 'INV-883921',
    amount: 15000,
    currency: 'IQD',
    payment_status: 'pending',
    contract_id: 'CON-55413',
    valid_until: '2027-12-31',
    signature_token: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef'
  },
  {
    order_id: 'ORD-305822',
    status: 'delivered',
    sender_name: 'مكتب الرافدين للتجارة',
    sender_category: 'company',
    sender_phone: '+964 7509988776',
    recipient_name: 'شركة الفرات للاستثمار',
    recipient_phone: '+964 7722233445',
    origin_branch: 'Branch-02 (أم قصر الشمالي)',
    destination_governorate: 'أربيل',
    destination_city: 'عنكاوا - شارع البنوك',
    document_type: 'certificate_of_origin',
    notes: 'شهادات منشأ مصدقة',
    communication_method: 'whatsapp',
    created_at: '2026-10-25 11:00:00',
    invoice_id: 'INV-883922',
    amount: 45000,
    currency: 'IQD',
    payment_status: 'settled',
    contract_id: 'CON-55414',
    valid_until: '2027-12-31',
    signature_token: 'f9e8d7c6b5a43210fedcba9876543210fedcba9876543210fedcba9876543210'
  }
];

export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  customs_declaration: 'بوليصة / بيان جمركي',
  commercial_invoice: 'فاتورة تجارية',
  certificate_of_origin: 'شهادة منشأ',
  official_letter: 'خطاب رسمي حكومي',
  contract: 'عقد تجاري / اتفاقية',
  other: 'مستندات عامة أخرى'
};

export const SENDER_CATEGORY_LABELS: Record<string, string> = {
  company: 'شركة تجارية',
  customs_broker: 'مخلص جمركي معتمد',
  individual: 'فرد / مواطن',
  merchant: 'تاجر / مستورد'
};

export const STATUS_LABELS: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  new: { label: 'طلب جديد', bg: 'bg-blue-50', text: 'text-blue-700', icon: 'Clock' },
  received: { label: 'تم الاستلام بأم قصر', bg: 'bg-indigo-50', text: 'text-indigo-700', icon: 'Package' },
  in_transit: { label: 'قيد التوصيل للمحافظة', bg: 'bg-amber-50', text: 'text-amber-700', icon: 'Truck' },
  delivered: { label: 'تم التسليم بنجاح', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'CheckCircle2' },
  cancelled: { label: 'ملغى', bg: 'bg-rose-50', text: 'text-rose-700', icon: 'X' }
};
