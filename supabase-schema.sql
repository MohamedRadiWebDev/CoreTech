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

create policy if not exists "Public read blog_posts"
on blog_posts for select using (true);

create policy if not exists "Public read portfolio"
on portfolio for select using (true);

create policy if not exists "Public read services"
on services for select using (true);

create policy if not exists "Public read testimonials"
on testimonials for select using (true);
