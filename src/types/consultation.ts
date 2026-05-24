export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface ConsultationRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  payment_status: PaymentStatus;
  booking_status: BookingStatus;
  notes: string | null;
  created_at: string;
}

export interface ConsultationSlotRecord {
  appointment_date: string;
  appointment_time: string;
  booking_status: BookingStatus;
}

export interface AvailabilityBlockRecord {
  id: string;
  start_datetime: string;
  end_datetime: string;
  reason: string | null;
  created_at: string;
}
