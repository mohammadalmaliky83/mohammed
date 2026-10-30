export type ShipmentStatus = 'new' | 'received' | 'in_transit' | 'delivered' | 'cancelled';

export type SenderCategory = 'company' | 'customs_broker' | 'individual' | 'merchant';

export type DocumentType = 
  | 'customs_declaration' 
  | 'commercial_invoice' 
  | 'certificate_of_origin' 
  | 'official_letter' 
  | 'contract' 
  | 'other';

export interface Governorate {
  id: number;
  name_ar: string;
  base_fee: number;
}

export interface Branch {
  branch_id: string;
  governorate_id: number;
  branch_name: string;
}

export interface Shipment {
  order_id: string;
  status: ShipmentStatus;
  sender_name: string;
  sender_category: SenderCategory;
  sender_phone: string;
  recipient_name: string;
  recipient_phone: string;
  origin_branch: string;
  destination_governorate: string;
  destination_city: string;
  document_type: DocumentType;
  notes?: string;
  communication_method: 'phone' | 'whatsapp' | 'sms';
  created_at: string;
  // Invoice & contract info
  invoice_id?: string;
  amount?: number;
  currency?: string;
  payment_status?: 'pending' | 'settled';
  contract_id?: string;
  valid_until?: string;
  signature_token?: string;
}

export interface ContactSettings {
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
}

export interface SystemNotification {
  id: string;
  order_id: string;
  title: string;
  message: string;
  recipient_phone: string;
  created_at: string;
  read: boolean;
}

