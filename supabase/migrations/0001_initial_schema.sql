-- AVM-Impresiones 3D - Supabase schema v2.
-- Designed for PostgreSQL + Supabase Auth + Storage + RLS.

create extension if not exists pgcrypto;

create type public.user_role as enum ('guest', 'customer', 'moderator', 'admin', 'superadmin');
create type public.profile_status as enum ('active', 'inactive', 'suspended');
create type public.product_status as enum ('draft', 'active', 'out_of_stock', 'archived');
create type public.cart_status as enum ('active', 'converted', 'abandoned');
create type public.order_status as enum ('draft', 'pending_payment', 'payment_processing', 'paid', 'processing', 'printing', 'ready_for_pickup', 'shipped', 'delivered', 'cancelled', 'refunded');
create type public.payment_status as enum ('pending', 'processing', 'approved', 'rejected', 'refunded');
create type public.delivery_method as enum ('pickup', 'shipping');
create type public.order_event_actor_type as enum ('customer', 'system', 'admin');
create type public.points_transaction_type as enum ('earn', 'redeem', 'adjustment', 'expiration');
create type public.discount_type as enum ('fixed', 'percentage', 'free_shipping');
create type public.reward_redemption_status as enum ('active', 'used', 'expired', 'cancelled');
create type public.custom_request_type as enum ('custom_model', 'existing_model_print', 'lithophane', 'replacement_part', 'other');
create type public.custom_request_status as enum ('pending', 'reviewing', 'quoted', 'approved', 'printing', 'ready', 'delivered', 'rejected', 'cancelled');
create type public.custom_request_priority as enum ('normal', 'urgent');
create type public.custom_request_file_type as enum ('stl', 'obj', '3mf', 'jpg', 'png', 'zip');
create type public.custom_request_actor_type as enum ('guest', 'customer', 'system', 'admin');
create type public.custom_request_uploaded_by as enum ('guest', 'customer', 'admin');
create type public.print_material_type as enum ('PLA', 'PETG', 'ABS', 'TPU', 'Resin', 'Other');
create type public.blog_post_status as enum ('draft', 'published', 'archived');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  avatar_url text,
  role public.user_role not null default 'customer',
  status public.profile_status not null default 'active',
  points_balance integer not null default 0 check (points_balance >= 0),
  is_active boolean not null default true,
  last_login_at timestamptz,
  terms_accepted boolean not null default false,
  terms_accepted_at timestamptz,
  privacy_accepted boolean not null default false,
  privacy_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and role in ('admin', 'superadmin')
    and status = 'active'
    and is_active = true
  );
$$;

create or replace function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and role = 'superadmin'
    and status = 'active'
    and is_active = true
  );
$$;

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
    phone = coalesce(public.profiles.phone, excluded.phone),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url);

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.prevent_profile_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() = old.id and not public.is_superadmin() then
    new.role = old.role;
    new.status = old.status;
    new.points_balance = old.points_balance;
    new.is_active = old.is_active;
  end if;

  return new;
end;
$$;

create trigger trg_prevent_profile_privilege_escalation
before update on public.profiles
for each row execute function public.prevent_profile_privilege_escalation();

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.print_materials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  type public.print_material_type not null default 'PLA',
  cost_per_gram numeric(12, 4) not null default 0,
  price_per_gram numeric(12, 4) not null default 0,
  default_margin_percentage numeric(6, 2) not null default 35,
  color_options jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  price numeric(12, 2) not null check (price >= 0),
  compare_at_price numeric(12, 2) check (compare_at_price is null or compare_at_price >= 0),
  sku text,
  weight_grams numeric(12, 2) check (weight_grams is null or weight_grams >= 0),
  estimated_print_time integer check (estimated_print_time is null or estimated_print_time >= 0),
  stock integer not null default 0 check (stock >= 0),
  status public.product_status not null default 'draft',
  is_featured boolean not null default false,
  is_customizable boolean not null default false,
  allow_file_upload boolean not null default false,
  points_reward integer not null default 0 check (points_reward >= 0),
  brand text,
  gtin text,
  mpn text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text,
  color text,
  material text,
  size text,
  finish text,
  price_modifier numeric(12, 2) not null default 0,
  stock integer not null default 0 check (stock >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.product_tags (
  product_id uuid not null references public.products(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (product_id, tag_id)
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text,
  status public.cart_status not null default 'active',
  last_activity_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (user_id is not null or session_id is not null)
);

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete set null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  product_name text not null,
  product_slug text not null,
  product_image text,
  variant_snapshot jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cart_id, product_id, variant_id)
);

create table public.cart_discounts (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  type text not null,
  value numeric(12, 2) not null default 0,
  description text,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  cart_id uuid references public.carts(id) on delete set null,
  order_number text not null unique,
  status public.order_status not null default 'pending_payment',
  payment_status public.payment_status not null default 'pending',
  currency text not null default 'ARS',
  subtotal numeric(12, 2) not null default 0,
  discounts numeric(12, 2) not null default 0,
  shipping numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  estimated_points integer not null default 0,
  shipping_snapshot jsonb not null default '{}'::jsonb,
  contact_snapshot jsonb not null default '{}'::jsonb,
  delivery_method public.delivery_method not null default 'pickup',
  notes text,
  points_awarded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  product_name text not null,
  product_slug text not null,
  product_image text,
  variant_snapshot jsonb,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  status public.payment_status not null default 'pending',
  amount numeric(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  event text not null,
  actor_type public.order_event_actor_type not null default 'system',
  actor_id uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.points_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  type public.points_transaction_type not null,
  points integer not null,
  description text,
  created_at timestamptz not null default now()
);

create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  points_cost integer not null check (points_cost > 0),
  discount_type public.discount_type not null,
  discount_value numeric(12, 2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reward_redemptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reward_id uuid not null references public.rewards(id) on delete restrict,
  points_spent integer not null check (points_spent > 0),
  code text not null unique,
  status public.reward_redemption_status not null default 'active',
  created_at timestamptz not null default now(),
  used_at timestamptz
);

create table public.custom_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  request_number text not null unique,
  status public.custom_request_status not null default 'pending',
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  request_type public.custom_request_type not null,
  priority public.custom_request_priority not null default 'normal',
  project_name text not null,
  description text not null,
  quantity integer not null default 1 check (quantity > 0),
  material text,
  color text,
  quality text,
  estimated_size text,
  estimated_price numeric(12, 2) check (estimated_price is null or estimated_price >= 0),
  estimated_date date,
  notes text,
  internal_notes text,
  is_urgent boolean not null default false,
  quoted_at timestamptz,
  approved_at timestamptz,
  last_status_change_at timestamptz,
  terms_accepted boolean not null default false,
  terms_accepted_at timestamptz,
  privacy_accepted boolean not null default false,
  privacy_accepted_at timestamptz,
  file_ownership_accepted boolean not null default false,
  file_ownership_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.custom_request_files (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.custom_requests(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_type public.custom_request_file_type not null,
  file_size integer check (file_size is null or file_size > 0),
  is_quote_file boolean not null default false,
  uploaded_by public.custom_request_uploaded_by not null default 'guest',
  created_at timestamptz not null default now()
);

create table public.custom_request_events (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.custom_requests(id) on delete cascade,
  event text not null,
  metadata jsonb not null default '{}'::jsonb,
  actor_type public.custom_request_actor_type not null default 'system',
  actor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.quote_rules (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  machine_hour_rate numeric(12, 2) not null default 0,
  electricity_hour_rate numeric(12, 2) not null default 0,
  labor_hour_rate numeric(12, 2) not null default 0,
  default_margin_percentage numeric(6, 2) not null default 35,
  minimum_price numeric(12, 2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.custom_request_quotes (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.custom_requests(id) on delete cascade,
  material text not null,
  estimated_weight_grams numeric(12, 2) not null,
  estimated_print_time_minutes integer not null,
  material_cost numeric(12, 2) not null,
  labor_cost numeric(12, 2) not null,
  machine_cost numeric(12, 2) not null,
  margin_percentage numeric(6, 2) not null default 0,
  subtotal numeric(12, 2) not null,
  final_price numeric(12, 2) not null,
  currency text not null default 'ARS',
  version integer not null default 1,
  is_active boolean not null default true,
  valid_until date,
  sent_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (request_id, version)
);

create table public.store_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'AVM-Impresiones 3D',
  whatsapp_number text not null default '',
  support_email text not null default '',
  address text,
  instagram_url text,
  facebook_url text,
  logo_url text,
  favicon_url text,
  default_currency text not null default 'ARS',
  shipping_enabled boolean not null default true,
  custom_requests_enabled boolean not null default true,
  maintenance_mode boolean not null default false,
  maintenance_message text,
  adsense_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  category_id uuid references public.blog_categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text,
  status public.blog_post_status not null default 'draft',
  seo_title text,
  seo_description text,
  adsense_ready boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  actor_role public.user_role,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index idx_products_status on public.products(status);
create index idx_products_category on public.products(category_id);
create index idx_products_featured on public.products(is_featured) where is_featured = true;
create index idx_product_variants_product on public.product_variants(product_id);
create index idx_product_images_product on public.product_images(product_id);
create index idx_favorites_user on public.favorites(user_id);
create index idx_carts_user_status on public.carts(user_id, status);
create unique index idx_cart_items_unique_product_variant
on public.cart_items (cart_id, product_id, coalesce(variant_id, '00000000-0000-0000-0000-000000000000'::uuid));
create index idx_orders_user_created on public.orders(user_id, created_at desc);
create index idx_payments_order_created on public.payments(order_id, created_at desc);
create index idx_order_events_order_created on public.order_events(order_id, created_at asc);
create index idx_points_user_created on public.points_transactions(user_id, created_at desc);
create index idx_custom_requests_user_created on public.custom_requests(user_id, created_at desc);
create index idx_custom_requests_status_priority on public.custom_requests(status, priority);
create index idx_custom_request_events_request_created on public.custom_request_events(request_id, created_at asc);
create index idx_blog_posts_status_published on public.blog_posts(status, published_at desc);
create index idx_activity_logs_created on public.activity_logs(created_at desc);

create trigger trg_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger trg_categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
create trigger trg_favorites_updated_at before update on public.favorites for each row execute function public.set_updated_at();
create trigger trg_print_materials_updated_at before update on public.print_materials for each row execute function public.set_updated_at();
create trigger trg_products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger trg_product_variants_updated_at before update on public.product_variants for each row execute function public.set_updated_at();
create trigger trg_carts_updated_at before update on public.carts for each row execute function public.set_updated_at();
create trigger trg_cart_items_updated_at before update on public.cart_items for each row execute function public.set_updated_at();
create trigger trg_orders_updated_at before update on public.orders for each row execute function public.set_updated_at();
create trigger trg_payments_updated_at before update on public.payments for each row execute function public.set_updated_at();
create trigger trg_rewards_updated_at before update on public.rewards for each row execute function public.set_updated_at();
create trigger trg_custom_requests_updated_at before update on public.custom_requests for each row execute function public.set_updated_at();
create trigger trg_store_settings_updated_at before update on public.store_settings for each row execute function public.set_updated_at();
create trigger trg_quote_rules_updated_at before update on public.quote_rules for each row execute function public.set_updated_at();
create trigger trg_blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();
