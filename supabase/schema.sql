-- JavaScript Mastery — Supabase schema
-- Apply in the Supabase SQL editor (or `supabase db push`).
-- Every table is protected by RLS: a user can only read and write their own rows.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles: one row per auth user.
-- ---------------------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  study_time_preference text check (study_time_preference in ('morning', 'afternoon', 'evening')),
  timezone text default 'Europe/Rome',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Progress
-- ---------------------------------------------------------------------------
create table if not exists public.user_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  week_id text not null,
  lesson_id text not null,
  exercise_id text,
  status text not null check (status in ('completed', 'in_progress')),
  attempts integer not null default 0,
  last_attempt_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, week_id, lesson_id, coalesce(exercise_id, 'lesson'))
);

create index if not exists user_progress_user_idx on public.user_progress (user_id, updated_at desc);

create table if not exists public.user_quiz_results (
  user_id uuid not null references auth.users (id) on delete cascade,
  quiz_id text not null,
  lesson_id text not null,
  week_id text not null,
  answer integer not null,
  is_correct boolean not null default false,
  attempts integer not null default 1,
  answered_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, quiz_id)
);

create table if not exists public.user_explain_results (
  user_id uuid not null references auth.users (id) on delete cascade,
  explain_id text not null,
  lesson_id text not null,
  content text not null default '',
  matched_keywords text[] not null default '{}',
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, explain_id)
);

create table if not exists public.user_notes (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  content text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- ---------------------------------------------------------------------------
-- Gamification
-- ---------------------------------------------------------------------------
create table if not exists public.user_streaks (
  user_id uuid primary key references auth.users (id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_study_date date,
  freezes_used date[] not null default '{}',
  recovery_until timestamptz,
  recovery_value integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_achievements (
  user_id uuid not null references auth.users (id) on delete cascade,
  achievement_id text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

create table if not exists public.user_activity (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  minutes integer not null default 0,
  exercises_completed integer not null default 0,
  lessons_completed integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

create table if not exists public.user_sessions (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  week_id text not null,
  seconds integer not null default 0,
  last_lesson_id text,
  last_scroll_ratio double precision not null default 0,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- ---------------------------------------------------------------------------
-- Spaced repetition (SM-2, constrained to the 1/3/7/14/30/90 ladder)
-- ---------------------------------------------------------------------------
create table if not exists public.user_spaced_repetition (
  user_id uuid not null references auth.users (id) on delete cascade,
  concept_id text not null,
  easiness_factor double precision not null default 2.5,
  interval_days integer not null default 0,
  repetitions integer not null default 0,
  next_review_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  lapses integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, concept_id)
);

create index if not exists user_spaced_due_idx on public.user_spaced_repetition (user_id, next_review_at);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  theme text not null default 'system' check (theme in ('light', 'dark', 'system')),
  font_size text not null default 'md' check (font_size in ('sm', 'md', 'lg')),
  sound boolean not null default false,
  reminders boolean not null default false,
  study_time text check (study_time in ('morning', 'afternoon', 'evening')),
  onboarded boolean not null default false,
  display_name text,
  updated_at timestamptz not null default now()
);

-- Computed totals: one row per user, always consistent with the source tables.
create table if not exists public.user_stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  total_time_minutes integer not null default 0,
  exercises_completed integer not null default 0,
  lessons_completed integer not null default 0,
  weeks_completed integer not null default 0
);

-- ---------------------------------------------------------------------------
-- Keep user_stats in sync (queries stay cheap, dashboard stays correct)
-- ---------------------------------------------------------------------------
create or replace function public.refresh_user_stats(target uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_stats (user_id, total_time_minutes, exercises_completed, lessons_completed)
  values (
    target,
    coalesce((select sum(minutes) from public.user_activity where user_id = target), 0),
    coalesce((select count(*) from public.user_progress where user_id = target and exercise_id is not null and status = 'completed'), 0),
    coalesce((select count(*) from public.user_progress where user_id = target and exercise_id is null and status = 'completed'), 0)
  )
  on conflict (user_id) do update set
    total_time_minutes = excluded.total_time_minutes,
    exercises_completed = excluded.exercises_completed,
    lessons_completed = excluded.lessons_completed;
end;
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.users enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_quiz_results enable row level security;
alter table public.user_explain_results enable row level security;
alter table public.user_notes enable row level security;
alter table public.user_streaks enable row level security;
alter table public.user_achievements enable row level security;
alter table public.user_activity enable row level security;
alter table public.user_sessions enable row level security;
alter table public.user_spaced_repetition enable row level security;
alter table public.user_settings enable row level security;
alter table public.user_stats enable row level security;

-- Users: read/update only their own profile row.
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own" on public.users for select using (auth.uid() = id);
drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own" on public.users for insert with check (auth.uid() = id);
drop policy if exists "users_update_own" on public.users;
create policy "users_update_own" on public.users for update using (auth.uid() = id) with check (auth.uid() = id);

-- Helper: the same four policies for every user_id-owned table.
do $$
declare
  table_name text;
  tables text[] := array[
    'user_progress',
    'user_quiz_results',
    'user_explain_results',
    'user_notes',
    'user_streaks',
    'user_achievements',
    'user_activity',
    'user_sessions',
    'user_spaced_repetition',
    'user_settings',
    'user_stats'
  ];
begin
  foreach table_name in array tables loop
    execute format('drop policy if exists "%s_select_own" on public.%I', table_name, table_name);
    execute format('create policy "%s_select_own" on public.%I for select using (auth.uid() = user_id)', table_name, table_name);
    execute format('drop policy if exists "%s_insert_own" on public.%I', table_name, table_name);
    execute format('create policy "%s_insert_own" on public.%I for insert with check (auth.uid() = user_id)', table_name, table_name);
    execute format('drop policy if exists "%s_update_own" on public.%I', table_name, table_name);
    execute format('create policy "%s_update_own" on public.%I for update using (auth.uid() = user_id) with check (auth.uid() = user_id)', table_name, table_name);
    execute format('drop policy if exists "%s_delete_own" on public.%I', table_name, table_name);
    execute format('create policy "%s_delete_own" on public.%I for delete using (auth.uid() = user_id)', table_name, table_name);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- New auth user → profile + settings + stats rows
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email) values (new.id, new.email) on conflict (id) do nothing;
  insert into public.user_settings (user_id) values (new.id) on conflict (user_id) do nothing;
  insert into public.user_streaks (user_id) values (new.id) on conflict (user_id) do nothing;
  insert into public.user_stats (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Realtime: broadcast changes for the tables the UI watches.
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table public.user_progress;
alter publication supabase_realtime add table public.user_quiz_results;
alter publication supabase_realtime add table public.user_explain_results;
alter publication supabase_realtime add table public.user_streaks;
alter publication supabase_realtime add table public.user_spaced_repetition;
alter publication supabase_realtime add table public.user_achievements;
alter publication supabase_realtime add table public.user_activity;
alter publication supabase_realtime add table public.user_sessions;
alter publication supabase_realtime add table public.user_settings;
