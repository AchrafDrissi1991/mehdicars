create extension if not exists "pgcrypto";

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  appointment_date date not null,
  appointment_time time not null,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'refunded', 'failed')),
  booking_status text not null default 'pending' check (booking_status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.availability_blocks (
  id uuid primary key default gen_random_uuid(),
  start_datetime timestamptz not null,
  end_datetime timestamptz not null,
  reason text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint availability_blocks_range_check check (end_datetime > start_datetime)
);

create table if not exists public.consultation_schedule_windows (
  id uuid primary key default gen_random_uuid(),
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_duration_minutes integer not null default 30 check (slot_duration_minutes in (15, 20, 30, 45, 60)),
  label text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  constraint consultation_schedule_windows_range_check check (end_time > start_time)
);

create table if not exists public.lead_requests (
  id uuid primary key default gen_random_uuid(),
  report_token text not null unique,
  internal_report_url text not null,
  request_status text not null default 'new' check (request_status in ('new', 'in_review', 'contacted', 'closed')),
  full_name text not null,
  email text,
  phone text not null,
  language text not null check (language in ('de', 'fr')),
  brand text not null,
  other_brand text,
  model text,
  vehicle_type_or_model text,
  min_year integer,
  max_mileage integer,
  budget integer,
  gearbox text[] default '{}'::text[],
  fuel text[] default '{}'::text[],
  purchase_timeline text,
  notes_or_listing_link text,
  report_text text not null,
  email_delivery_status text not null default 'failed' check (email_delivery_status in ('sent', 'failed')),
  email_delivery_error text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists consultations_appointment_idx
  on public.consultations (appointment_date, appointment_time);

create index if not exists availability_blocks_range_idx
  on public.availability_blocks (start_datetime, end_datetime);

create index if not exists consultation_schedule_windows_day_idx
  on public.consultation_schedule_windows (day_of_week, is_active, start_time);

create index if not exists lead_requests_created_idx
  on public.lead_requests (created_at desc);

alter table public.lead_requests
  add column if not exists request_status text not null default 'new';

alter table public.consultations enable row level security;
alter table public.availability_blocks enable row level security;
alter table public.consultation_schedule_windows enable row level security;
alter table public.lead_requests enable row level security;

create or replace function public.get_public_consultation_slots(start_date date, end_date date)
returns table (
  appointment_date date,
  appointment_time time,
  booking_status text
)
language sql
security definer
set search_path = public
as $$
  select c.appointment_date, c.appointment_time, c.booking_status
  from public.consultations as c
  where c.appointment_date between start_date and end_date
    and c.booking_status <> 'cancelled';
$$;

drop policy if exists "public can insert consultations" on public.consultations;
create policy "public can insert consultations"
on public.consultations
for insert
to anon, authenticated
with check (true);

drop policy if exists "public can read availability blocks" on public.availability_blocks;
create policy "public can read availability blocks"
on public.availability_blocks
for select
to anon, authenticated
using (true);

drop policy if exists "public can read consultation schedule windows" on public.consultation_schedule_windows;
create policy "public can read consultation schedule windows"
on public.consultation_schedule_windows
for select
to anon, authenticated
using (is_active = true or auth.role() = 'authenticated');

grant execute on function public.get_public_consultation_slots(date, date) to anon, authenticated;

drop policy if exists "authenticated admins can manage consultations" on public.consultations;
create policy "authenticated admins can manage consultations"
on public.consultations
for select
to authenticated
using (true);

drop policy if exists "authenticated admins can update consultations" on public.consultations;
create policy "authenticated admins can update consultations"
on public.consultations
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated admins can delete consultations" on public.consultations;
create policy "authenticated admins can delete consultations"
on public.consultations
for delete
to authenticated
using (true);

drop policy if exists "authenticated admins can manage availability blocks" on public.availability_blocks;
create policy "authenticated admins can manage availability blocks"
on public.availability_blocks
for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated admins can manage consultation schedule windows" on public.consultation_schedule_windows;
create policy "authenticated admins can manage consultation schedule windows"
on public.consultation_schedule_windows
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public can insert lead requests" on public.lead_requests;
create policy "public can insert lead requests"
on public.lead_requests
for insert
to anon, authenticated
with check (true);

drop policy if exists "authenticated admins can read lead requests" on public.lead_requests;
create policy "authenticated admins can read lead requests"
on public.lead_requests
for select
to authenticated
using (true);

drop policy if exists "authenticated admins can update lead requests" on public.lead_requests;
create policy "authenticated admins can update lead requests"
on public.lead_requests
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated admins can delete lead requests" on public.lead_requests;
create policy "authenticated admins can delete lead requests"
on public.lead_requests
for delete
to authenticated
using (true);

insert into public.consultation_schedule_windows (day_of_week, start_time, end_time, slot_duration_minutes, label, is_active)
select day_of_week, '09:00'::time, '12:00'::time, 30, 'Morning default', true
from generate_series(0, 6) as day_of_week
where not exists (
  select 1
  from public.consultation_schedule_windows existing
  where existing.day_of_week = day_of_week
    and existing.start_time = '09:00'::time
    and existing.end_time = '12:00'::time
    and existing.slot_duration_minutes = 30
);
