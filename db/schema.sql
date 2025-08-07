create table if not exists public.waitlist_leads (
  id bigserial primary key,
  email text not null,
  city text,
  segment text,
  timeline text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_waitlist_leads_email on public.waitlist_leads (lower(email));
create index if not exists idx_waitlist_leads_created_at on public.waitlist_leads (created_at desc);


