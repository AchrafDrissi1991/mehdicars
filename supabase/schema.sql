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

create index if not exists consultations_appointment_idx
  on public.consultations (appointment_date, appointment_time);

create index if not exists availability_blocks_range_idx
  on public.availability_blocks (start_datetime, end_datetime);

alter table public.consultations enable row level security;
alter table public.availability_blocks enable row level security;

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

create policy "public can insert consultations"
on public.consultations
for insert
to anon, authenticated
with check (true);

create policy "public can read availability blocks"
on public.availability_blocks
for select
to anon, authenticated
using (true);

grant execute on function public.get_public_consultation_slots(date, date) to anon, authenticated;

create policy "authenticated admins can manage consultations"
on public.consultations
for select
to authenticated
using (true);

create policy "authenticated admins can update consultations"
on public.consultations
for update
to authenticated
using (true)
with check (true);

create policy "authenticated admins can manage availability blocks"
on public.availability_blocks
for all
to authenticated
using (true)
with check (true);
