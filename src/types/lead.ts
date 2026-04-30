export type Language = 'de' | 'fr';

export type Gearbox = 'manual' | 'automatic' | '';

export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric' | '';

export type PurchaseTimeline = 'asap' | 'one_month' | 'three_months' | 'not_sure' | '';

export type LeadFormData = {
  brand: string;
  otherBrand?: string;
  model?: string;
  vehicleTypeOrModel?: string;
  minYear?: number;
  maxMileage?: number;
  budget?: number;
  gearbox?: Gearbox;
  fuel?: FuelType;
  fullName: string;
  email?: string;
  phone: string;
  purchaseTimeline?: PurchaseTimeline;
  notesOrListingLink?: string;
  language: Language;
  createdAt?: string;
};

export type LeadFormDraft = Omit<LeadFormData, 'fullName' | 'phone' | 'language'> & {
  fullName?: string;
  phone?: string;
  language: Language;
};
