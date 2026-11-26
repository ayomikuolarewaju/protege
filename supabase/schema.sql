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
  category text not null default 'Classroom' check (char_length(category) between 1 and 50),
  video_url text check (video_url is null or char_length(video_url) <= 2048),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  created_at timestamptz not null default now(),
  constraint gallery_items_category_allowed_check
    check (category in ('Classroom', 'Competitions', 'Events', 'Activities', 'Community', 'Our school'))
);

alter table public.gallery_items alter column category set default 'Classroom';
alter table public.gallery_items add column if not exists video_url text check (video_url is null or char_length(video_url) <= 2048);
alter table public.gallery_items add column if not exists width integer check (width is null or width > 0);
alter table public.gallery_items add column if not exists height integer check (height is null or height > 0);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.gallery_items'::regclass
      and conname = 'gallery_items_category_allowed_check'
  ) then
    alter table public.gallery_items
      add constraint gallery_items_category_allowed_check
      check (category in ('Classroom', 'Competitions', 'Events', 'Activities', 'Community', 'Our school'))
      not valid;
  end if;
end
$$;

insert into public.gallery_items (id, title, description, image_url, category, video_url, width, height)
values
  ('00000000-0000-4000-8000-000000000001', 'Science practical', 'Pupils carry out a hands-on experiment in the laboratory.', '/images/gallery/science-lab-poster.jpg', 'Classroom', '/media/science-lab.mp4', 360, 640),
  ('00000000-0000-4000-8000-000000000002', 'Graduation and awards day', 'Graduands celebrate at the annual awarding and graduation ceremony.', '/images/gallery/graduation.jpg', 'Events', null, 960, 1280),
  ('00000000-0000-4000-8000-000000000003', 'Computer lab', 'Hands-on ICT practice, with teachers guiding every step.', '/images/gallery/computer-lab.jpg', 'Classroom', null, 1080, 1080),
  ('00000000-0000-4000-8000-000000000004', 'Colour and culture', 'Pupils pose in front of a painted portrait in traditional dress.', '/images/gallery/mural-pupils.jpg', 'Events', null, 607, 1080),
  ('00000000-0000-4000-8000-000000000005', 'National finalist, SSS 1', 'Chosen as a Lagos State national finalist at the 17th Spelling Leaders Competition.', '/images/gallery/finalist-sss1.jpg', 'Competitions', null, 1080, 1080),
  ('00000000-0000-4000-8000-000000000006', 'Mid-term quiz winners', 'Joint winners of the mid-term quiz with their prizes.', '/images/gallery/quiz-winners.jpg', 'Competitions', null, 1280, 960),
  ('00000000-0000-4000-8000-000000000007', 'Music lesson', 'Pupils learn to play melodies on the keyboard.', '/images/gallery/music-lesson.jpg', 'Classroom', null, 1080, 630),
  ('00000000-0000-4000-8000-000000000008', 'Ready to spell', 'A pupil with her contestant badge at the Spell Africa competition.', '/images/gallery/spelling-contestant.jpg', 'Competitions', null, 611, 1080),
  ('00000000-0000-4000-8000-000000000009', 'Medals and smiles', 'Pupils celebrate with medals beside the Spell Africa banner.', '/images/gallery/spelling-medals.jpg', 'Competitions', null, 1080, 810),
  ('00000000-0000-4000-8000-000000000010', 'National finalist, JSS 2', 'Chosen as a Lagos State national finalist at the 17th Spelling Leaders Competition.', '/images/gallery/finalist-jss2.jpg', 'Competitions', null, 1080, 1080),
  ('00000000-0000-4000-8000-000000000011', 'Backpacks and books', 'Pupils with new school bags and books from Street Kid Africa.', '/images/gallery/backpacks-books.jpg', 'Community', null, 1080, 1080),
  ('00000000-0000-4000-8000-000000000012', 'Bright and bold', 'Pupils gather in front of a colourful banner at a school event.', '/images/gallery/colour-banner-pupils.jpg', 'Events', null, 607, 1080),
  ('00000000-0000-4000-8000-000000000013', 'Pupils and staff together', 'The school community gathers in the compound.', '/images/gallery/compound-group.jpg', 'Community', null, 1280, 960),
  ('00000000-0000-4000-8000-000000000014', 'Spelling contestants', 'Contestants at the Spelling Leaders Competition.', '/images/gallery/spelling-contestants.jpg', 'Competitions', null, 1080, 1080),
  ('00000000-0000-4000-8000-000000000015', 'Welcome to Protege', 'The sign at our school entrance.', '/images/gallery/school-sign.jpg', 'Our school', null, 960, 501),
  ('00000000-0000-4000-8000-000000000016', 'National finalist, Basic 5', 'Chosen as a Lagos State national finalist at the 17th Spelling Leaders Competition.', '/images/gallery/finalist-basic5.jpg', 'Competitions', null, 1080, 1080),
  ('00000000-0000-4000-8000-000000000017', 'A lively contest', 'Classmates gather around the table for an in-school challenge.', '/images/gallery/contest-day.jpg', 'Activities', null, 1080, 599),
  ('00000000-0000-4000-8000-000000000018', 'Winners with their prize', 'A winning team shows off its prize box after the contest.', '/images/gallery/winners-prize.jpg', 'Activities', null, 1080, 603),
  ('00000000-0000-4000-8000-000000000019', 'In the school garden', 'Bougainvillea in bloom at the school.', '/images/gallery/bougainvillea.jpg', 'Our school', null, 960, 1280),
  ('00000000-0000-4000-8000-000000000020', 'The whole school family', 'Pupils and staff gather in the school compound.', '/images/gallery/compound-wide.jpg', 'Community', null, 1280, 960)
on conflict (id) do nothing;

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

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  slug text not null unique check (char_length(slug) between 1 and 180),
  excerpt text not null check (char_length(excerpt) between 1 and 500),
  content text not null check (char_length(content) between 1 and 50000),
  cover_image_url text check (cover_image_url is null or char_length(cover_image_url) <= 2048),
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 100),
  author_email text not null check (char_length(author_email) between 3 and 254),
  content text not null check (char_length(content) between 1 and 3000),
  status text not null default 'pending' check (status in ('pending','approved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.home_page_content (
  id smallint primary key default 1 check (id = 1),
  heading text not null check (char_length(heading) between 1 and 160),
  tagline text not null check (char_length(tagline) between 1 and 500)
);

insert into public.home_page_content (id, heading, tagline)
values (
  1,
  'Big dreams begin with little steps.',
  'At Protege Schools, we nurture curious minds, kind hearts, and confident learners, one discovery at a time.'
)
on conflict (id) do nothing;

alter table public.admins enable row level security;
alter table public.gallery_items enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_comments enable row level security;
alter table public.home_page_content enable row level security;

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
grant execute on function public.is_protege_admin() to anon;

drop policy if exists "Admins can read their own admin row" on public.admins;
create policy "Admins can read their own admin row"
on public.admins for select to authenticated
using (user_id = auth.uid());

drop policy if exists "Anyone can view gallery" on public.gallery_items;
create policy "Anyone can view gallery"
on public.gallery_items for select to anon, authenticated
using (true);
drop policy if exists "Admins can add gallery items" on public.gallery_items;
create policy "Admins can add gallery items"
on public.gallery_items for insert to authenticated
with check (public.is_protege_admin());
drop policy if exists "Admins can delete gallery items" on public.gallery_items;
create policy "Admins can delete gallery items"
on public.gallery_items for delete to authenticated
using (public.is_protege_admin());
drop policy if exists "Admins can update gallery items" on public.gallery_items;
create policy "Admins can update gallery items"
on public.gallery_items for update to authenticated
using (public.is_protege_admin()) with check (public.is_protege_admin());

-- Public visitors can submit an enquiry, but cannot read or update any enquiries.
drop policy if exists "Visitors can submit enquiries" on public.contact_inquiries;
create policy "Visitors can submit enquiries"
on public.contact_inquiries for insert to anon, authenticated
with check (
  status = 'new'
  and char_length(full_name) between 1 and 100
  and char_length(email) between 3 and 254
  and char_length(message) between 10 and 5000
);
drop policy if exists "Admins can read enquiries" on public.contact_inquiries;
create policy "Admins can read enquiries"
on public.contact_inquiries for select to authenticated
using (public.is_protege_admin());
drop policy if exists "Admins can update enquiries" on public.contact_inquiries;
create policy "Admins can update enquiries"
on public.contact_inquiries for update to authenticated
using (public.is_protege_admin()) with check (public.is_protege_admin());

drop policy if exists "Anyone can view published blog posts" on public.blog_posts;
create policy "Anyone can view published blog posts"
on public.blog_posts for select to anon, authenticated
using (status = 'published' or public.is_protege_admin());
drop policy if exists "Admins can add blog posts" on public.blog_posts;
create policy "Admins can add blog posts"
on public.blog_posts for insert to authenticated
with check (public.is_protege_admin());
drop policy if exists "Admins can update blog posts" on public.blog_posts;
create policy "Admins can update blog posts"
on public.blog_posts for update to authenticated
using (public.is_protege_admin()) with check (public.is_protege_admin());
drop policy if exists "Admins can delete blog posts" on public.blog_posts;
create policy "Admins can delete blog posts"
on public.blog_posts for delete to authenticated
using (public.is_protege_admin());

drop policy if exists "Anyone can view approved blog comments" on public.blog_comments;
create policy "Anyone can view approved blog comments"
on public.blog_comments for select to anon, authenticated
using (
  status = 'approved'
  and exists (select 1 from public.blog_posts where id = post_id and status = 'published')
  or public.is_protege_admin()
);
drop policy if exists "Visitors can submit pending blog comments" on public.blog_comments;
create policy "Visitors can submit pending blog comments"
on public.blog_comments for insert to anon, authenticated
with check (
  status = 'pending'
  and char_length(author_name) between 1 and 100
  and char_length(author_email) between 3 and 254
  and char_length(content) between 1 and 3000
  and exists (select 1 from public.blog_posts where id = post_id and status = 'published')
);
drop policy if exists "Admins can update blog comments" on public.blog_comments;
create policy "Admins can update blog comments"
on public.blog_comments for update to authenticated
using (public.is_protege_admin()) with check (public.is_protege_admin());
drop policy if exists "Admins can delete blog comments" on public.blog_comments;
create policy "Admins can delete blog comments"
on public.blog_comments for delete to authenticated
using (public.is_protege_admin());

drop policy if exists "Anyone can view home page content" on public.home_page_content;
create policy "Anyone can view home page content"
on public.home_page_content for select to anon, authenticated
using (true);
drop policy if exists "Admins can update home page content" on public.home_page_content;
create policy "Admins can update home page content"
on public.home_page_content for update to authenticated
using (public.is_protege_admin()) with check (public.is_protege_admin());

grant select on public.gallery_items to anon, authenticated;
grant insert, update, delete on public.gallery_items to authenticated;
grant insert on public.contact_inquiries to anon, authenticated;
grant select, update on public.contact_inquiries to authenticated;
grant select on public.admins to authenticated;
grant select on public.blog_posts, public.blog_comments to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;
grant insert on public.blog_comments to anon, authenticated;
grant update, delete on public.blog_comments to authenticated;
grant select on public.home_page_content to anon, authenticated;
grant update on public.home_page_content to authenticated;

-- After creating the user under Supabase Authentication > Users, grant admin access:
-- insert into public.admins (user_id)
-- select id from auth.users where lower(email) = lower('ADMIN-EMAIL')
-- on conflict (user_id) do nothing;
