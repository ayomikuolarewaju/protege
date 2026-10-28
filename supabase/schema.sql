-- Protege Schools website schema. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  description text check (description is null or char_length(description) <= 500),
  image_url text not null check (char_length(image_url) <= 2048),
  category text not null default 'Learning' check (char_length(category) between 1 and 50),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 1 and 100),
  email text not null check (char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 30),
  subject text not null check (char_length(subject) between 1 and 100),
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'new' check (status in ('new','in_progress','resolved')),
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.gallery_items enable row level security;
alter table public.contact_inquiries enable row level security;

-- SECURITY DEFINER avoids recursive RLS evaluation on the admins table.
create or replace function public.is_protege_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_protege_admin() from public;
grant execute on function public.is_protege_admin() to authenticated;

create policy "Admins can read their own admin row"
on public.admins for select to authenticated
using (user_id = auth.uid());

create policy "Anyone can view gallery"
on public.gallery_items for select to anon, authenticated
using (true);
create policy "Admins can add gallery items"
on public.gallery_items for insert to authenticated
with check (public.is_protege_admin());
create policy "Admins can delete gallery items"
on public.gallery_items for delete to authenticated
using (public.is_protege_admin());
create policy "Admins can update gallery items"
on public.gallery_items for update to authenticated
using (public.is_protege_admin()) with check (public.is_protege_admin());

-- Public visitors can submit an enquiry, but cannot read or update any enquiries.
create policy "Visitors can submit enquiries"
on public.contact_inquiries for insert to anon, authenticated
with check (
  status = 'new'
  and char_length(full_name) between 1 and 100
  and char_length(email) between 3 and 254
  and char_length(message) between 10 and 5000
);
create policy "Admins can read enquiries"
on public.contact_inquiries for select to authenticated
using (public.is_protege_admin());
create policy "Admins can update enquiries"
on public.contact_inquiries for update to authenticated
using (public.is_protege_admin()) with check (public.is_protege_admin());

grant select on public.gallery_items to anon, authenticated;
grant insert, update, delete on public.gallery_items to authenticated;
grant insert on public.contact_inquiries to anon, authenticated;
grant select, update on public.contact_inquiries to authenticated;
grant select on public.admins to authenticated;

-- After creating an administrator under Supabase Authentication > Users,
-- replace the UUID below with that user's UUID and run this insert:
-- insert into public.admins (user_id) values ('YOUR-AUTH-USER-UUID');
