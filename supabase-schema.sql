-- CoreTech CMS schema for Supabase
create table if not exists blog_posts (
  id text primary key,
  slug text unique,
  content jsonb not null,
  created_at timestamp default now()
);

create table if not exists portfolio (
  id text primary key,
  slug text unique,
  content jsonb not null,
  created_at timestamp default now()
);

create table if not exists services (
  id text primary key,
  content jsonb not null
);

create table if not exists testimonials (
  id text primary key,
  content jsonb not null
);

alter table blog_posts enable row level security;
alter table portfolio enable row level security;
alter table services enable row level security;
alter table testimonials enable row level security;

-- Public read policies
create policy if not exists "Public read blog_posts"
on blog_posts for select using (true);

create policy if not exists "Public read portfolio"
on portfolio for select using (true);

create policy if not exists "Public read services"
on services for select using (true);

create policy if not exists "Public read testimonials"
on testimonials for select using (true);

-- Temporary public write policies for integration testing only.
-- Replace with authenticated/role-based policies before production.
create policy if not exists "Public write blog_posts"
on blog_posts for all using (true) with check (true);

create policy if not exists "Public write portfolio"
on portfolio for all using (true) with check (true);

create policy if not exists "Public write services"
on services for all using (true) with check (true);

create policy if not exists "Public write testimonials"
on testimonials for all using (true) with check (true);
