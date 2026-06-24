-- Add extra profile fields for complete registration flow

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists address text,
  add column if not exists confirm_email_sent_at timestamptz;

-- Update handle_new_user to populate first_name and last_name
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    first_name,
    last_name,
    phone,
    avatar_url,
    role,
    status,
    is_active,
    terms_accepted,
    terms_accepted_at,
    privacy_accepted,
    privacy_accepted_at
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'avatar_url',
    'customer',
    'active',
    true,
    coalesce((new.raw_user_meta_data ->> 'terms_accepted')::boolean, false),
    case when coalesce((new.raw_user_meta_data ->> 'terms_accepted')::boolean, false) then now() else null end,
    coalesce((new.raw_user_meta_data ->> 'privacy_accepted')::boolean, false),
    case when coalesce((new.raw_user_meta_data ->> 'privacy_accepted')::boolean, false) then now() else null end
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    first_name = coalesce(public.profiles.first_name, excluded.first_name),
    last_name = coalesce(public.profiles.last_name, excluded.last_name),
    phone = coalesce(public.profiles.phone, excluded.phone),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
    address = coalesce(public.profiles.address, excluded.address);

  return new;
end;
$$;
