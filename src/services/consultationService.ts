import dayjs from 'dayjs';
import { getSupabaseClient } from '../lib/supabase';
import type {
  AvailabilityBlockRecord,
  BookingStatus,
  ConsultationRecord,
  ConsultationSlotRecord,
  PaymentStatus,
  ScheduleWindowRecord,
} from '../types/consultation';

export interface CreateConsultationInput {
  name: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  paymentStatus?: PaymentStatus;
  bookingStatus?: BookingStatus;
}

export interface ConsultationUpdateInput {
  bookingStatus?: BookingStatus;
  notes?: string;
  paymentStatus?: PaymentStatus;
}

export interface CreateAvailabilityBlockInput {
  startDatetime: string;
  endDatetime: string;
  reason?: string;
}

export interface CreateScheduleWindowInput {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  label?: string;
}

const CONSULTATION_SELECT =
  'id, name, email, phone, appointment_date, appointment_time, payment_status, booking_status, notes, created_at';
const AVAILABILITY_SELECT = 'id, start_datetime, end_datetime, reason, created_at';
const SCHEDULE_WINDOW_SELECT =
  'id, day_of_week, start_time, end_time, slot_duration_minutes, label, is_active, created_at';

function requireSupabase() {
  const client = getSupabaseClient();

  if (!client) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  return client;
}

function mapSupabaseSetupError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (
    message.includes('404') ||
    message.includes('get_public_consultation_slots') ||
    message.includes('availability_blocks') ||
    message.includes('consultations') ||
    message.includes('relation') ||
    message.includes('function')
  ) {
    return new Error('Supabase setup incomplete. Please run supabase/schema.sql in the Supabase SQL Editor.');
  }

  return error instanceof Error ? error : new Error(message);
}

export async function createConsultation(input: CreateConsultationInput) {
  const supabase = requireSupabase();
  const payload = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    appointment_date: input.appointmentDate,
    appointment_time: input.appointmentTime,
    payment_status: input.paymentStatus ?? 'pending',
    booking_status: input.bookingStatus ?? 'pending',
    notes: input.notes?.trim() || null,
  };

  const { error } = await supabase.from('consultations').insert(payload);

  if (error) {
    throw mapSupabaseSetupError(error);
  }

  return payload;
}

export async function listConsultations() {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from('consultations')
    .select(CONSULTATION_SELECT)
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true });

  if (error) {
    throw mapSupabaseSetupError(error);
  }

  return (data ?? []) as ConsultationRecord[];
}

export async function updateConsultation(id: string, updates: ConsultationUpdateInput) {
  const supabase = requireSupabase();
  const payload: Record<string, string | null> = {};

  if (updates.bookingStatus) {
    payload.booking_status = updates.bookingStatus;
  }

  if (typeof updates.paymentStatus === 'string') {
    payload.payment_status = updates.paymentStatus;
  }

  if (typeof updates.notes === 'string') {
    payload.notes = updates.notes.trim() || null;
  }

  const { data, error } = await supabase
    .from('consultations')
    .update(payload)
    .eq('id', id)
    .select(CONSULTATION_SELECT)
    .single();

  if (error) {
    throw mapSupabaseSetupError(error);
  }

  return data as ConsultationRecord;
}

export async function deleteConsultation(id: string) {
  const supabase = requireSupabase();
  const { error } = await supabase.from('consultations').delete().eq('id', id);

  if (error) {
    throw mapSupabaseSetupError(error);
  }
}

export async function listAvailabilityBlocks() {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from('availability_blocks')
    .select(AVAILABILITY_SELECT)
    .order('start_datetime', { ascending: true });

  if (error) {
    throw mapSupabaseSetupError(error);
  }

  return (data ?? []) as AvailabilityBlockRecord[];
}

export async function createAvailabilityBlock(input: CreateAvailabilityBlockInput) {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from('availability_blocks')
    .insert({
      start_datetime: input.startDatetime,
      end_datetime: input.endDatetime,
      reason: input.reason?.trim() || null,
    })
    .select(AVAILABILITY_SELECT)
    .single();

  if (error) {
    throw mapSupabaseSetupError(error);
  }

  return data as AvailabilityBlockRecord;
}

export async function deleteAvailabilityBlock(id: string) {
  const supabase = requireSupabase();
  const { error } = await supabase.from('availability_blocks').delete().eq('id', id);

  if (error) {
    throw mapSupabaseSetupError(error);
  }
}

export async function listScheduleWindows(includeInactive = false) {
  const supabase = requireSupabase();
  let query = supabase
    .from('consultation_schedule_windows')
    .select(SCHEDULE_WINDOW_SELECT)
    .order('day_of_week', { ascending: true })
    .order('start_time', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    throw mapSupabaseSetupError(error);
  }

  return (data ?? []) as ScheduleWindowRecord[];
}

export async function createScheduleWindow(input: CreateScheduleWindowInput) {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from('consultation_schedule_windows')
    .insert({
      day_of_week: input.dayOfWeek,
      start_time: input.startTime,
      end_time: input.endTime,
      slot_duration_minutes: input.slotDurationMinutes,
      label: input.label?.trim() || null,
      is_active: true,
    })
    .select(SCHEDULE_WINDOW_SELECT)
    .single();

  if (error) {
    throw mapSupabaseSetupError(error);
  }

  return data as ScheduleWindowRecord;
}

export async function deleteScheduleWindow(id: string) {
  const supabase = requireSupabase();
  const { error } = await supabase.from('consultation_schedule_windows').delete().eq('id', id);

  if (error) {
    throw mapSupabaseSetupError(error);
  }
}

export async function getBookingAvailabilityWindow(startDate: string, endDate: string) {
  const supabase = requireSupabase();
  const startIso = dayjs(`${startDate}T00:00:00`).toISOString();
  const endIso = dayjs(`${endDate}T23:59:59`).toISOString();

  const [
    { data: consultations, error: consultationError },
    { data: blocks, error: blockError },
    { data: windows, error: windowsError },
  ] = await Promise.all([
    supabase.rpc('get_public_consultation_slots', {
      start_date: startDate,
      end_date: endDate,
    }),
    supabase
      .from('availability_blocks')
      .select(AVAILABILITY_SELECT)
      .lte('start_datetime', endIso)
      .gte('end_datetime', startIso),
    supabase.from('consultation_schedule_windows').select(SCHEDULE_WINDOW_SELECT).eq('is_active', true),
  ]);

  if (consultationError) {
    throw mapSupabaseSetupError(consultationError);
  }

  if (blockError) {
    throw mapSupabaseSetupError(blockError);
  }

  if (windowsError) {
    throw mapSupabaseSetupError(windowsError);
  }

  return {
    consultations: (consultations ?? []) as ConsultationSlotRecord[],
    blocks: (blocks ?? []) as AvailabilityBlockRecord[],
    windows: (windows ?? []) as ScheduleWindowRecord[],
  };
}

export function buildSlotRangeLabel(time: string) {
  const normalizedTime = normalizeTimeValue(time);
  const end = dayjs(`2000-01-01T${normalizedTime}`).add(30, 'minute').format('HH:mm');
  return `${normalizedTime} - ${end}`;
}

export function normalizeTimeValue(time: string) {
  return time.slice(0, 5);
}

export function isSlotBlocked({
  appointmentDate,
  appointmentTime,
  consultations,
  blocks,
}: {
  appointmentDate: string;
  appointmentTime: string;
  consultations: ConsultationSlotRecord[];
  blocks: AvailabilityBlockRecord[];
}) {
  const slotStart = dayjs(`${appointmentDate}T${appointmentTime}`);
  const slotEnd = slotStart.add(30, 'minute');
  const normalizedTime = normalizeTimeValue(appointmentTime);

  const booked = consultations.some(
    (consultation) =>
      consultation.appointment_date === appointmentDate &&
      normalizeTimeValue(consultation.appointment_time) === normalizedTime &&
      consultation.booking_status !== 'cancelled',
  );

  if (booked) {
    return true;
  }

  return blocks.some((block) => {
    const blockStart = dayjs(block.start_datetime);
    const blockEnd = dayjs(block.end_datetime);

    return slotStart.isBefore(blockEnd) && slotEnd.isAfter(blockStart);
  });
}

export function buildSlotsFromWindows(date: Date, windows: ScheduleWindowRecord[]) {
  const dayOfWeek = dayjs(date).day();
  const matchingWindows = windows.filter((window) => window.day_of_week === dayOfWeek && window.is_active);

  return matchingWindows.flatMap((window) => {
    const slots: string[] = [];
    let cursor = dayjs(`2000-01-01T${normalizeTimeValue(window.start_time)}`);
    const end = dayjs(`2000-01-01T${normalizeTimeValue(window.end_time)}`);

    while (cursor.add(window.slot_duration_minutes, 'minute').valueOf() <= end.valueOf()) {
      slots.push(cursor.format('HH:mm'));
      cursor = cursor.add(window.slot_duration_minutes, 'minute');
    }

    return slots;
  });
}
