export type Language = 'de' | 'fr';

export type Gearbox = 'manual' | 'automatic';

export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

export type PurchaseTimeline = 'asap' | 'one_month' | 'three_months' | 'not_sure' | '';

export type LeadFormData = {
  brand: string;
  otherBrand?: string;
  model?: string;
  vehicleTypeOrModel?: string;
  minYear?: number;
  maxMileage?: number;
  budget?: number;
  gearbox?: Gearbox[];
  fuel?: FuelType[];
  fullName: string;
  email?: string;
  phone: string;
  purchaseTimeline?: PurchaseTimeline;
  notesOrListingLink?: string;
  privacyConsent?: boolean;
  language: Language;
  createdAt?: string;
};

export type LeadFormDraft = Omit<LeadFormData, 'fullName' | 'phone' | 'language'> & {
  fullName?: string;
  phone?: string;
  language: Language;
};

export interface LeadRequestRecord {
  id: string;
  report_token: string;
  internal_report_url: string;
  request_status: 'new' | 'in_review' | 'contacted' | 'closed';
  full_name: string;
  email: string | null;
  phone: string;
  language: Language;
  brand: string;
  other_brand: string | null;
  model: string | null;
  vehicle_type_or_model: string | null;
  min_year: number | null;
  max_mileage: number | null;
  budget: number | null;
  gearbox: string[] | null;
  fuel: string[] | null;
  purchase_timeline: string | null;
  notes_or_listing_link: string | null;
  report_text: string;
  email_delivery_status: 'sent' | 'failed';
  email_delivery_error: string | null;
  created_at: string;
}
