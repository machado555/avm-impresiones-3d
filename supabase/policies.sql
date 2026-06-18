alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.print_materials enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.tags enable row level security;
alter table public.product_tags enable row level security;
alter table public.favorites enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.cart_discounts enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.order_events enable row level security;
alter table public.points_transactions enable row level security;
alter table public.rewards enable row level security;
alter table public.reward_redemptions enable row level security;
alter table public.custom_requests enable row level security;
alter table public.custom_request_files enable row level security;
alter table public.custom_request_events enable row level security;
alter table public.quote_rules enable row level security;
alter table public.custom_request_quotes enable row level security;
alter table public.store_settings enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.activity_logs enable row level security;

create policy "profiles_select_own_or_admin" on public.profiles
for select using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
for insert with check (auth.uid() = id);

create policy "profiles_superadmin_manage" on public.profiles
for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy "categories_public_active_select" on public.categories
for select using (is_active = true or public.is_admin());

create policy "categories_admin_manage" on public.categories
for all using (public.is_admin()) with check (public.is_admin());

create policy "materials_public_active_select" on public.print_materials
for select using (is_active = true or public.is_admin());

create policy "materials_admin_manage" on public.print_materials
for all using (public.is_admin()) with check (public.is_admin());

create policy "products_public_active_select" on public.products
for select using (status = 'active' or public.is_admin());

create policy "products_admin_manage" on public.products
for all using (public.is_admin()) with check (public.is_admin());

create policy "variants_public_active_select" on public.product_variants
for select using (
  active = true
  and exists (select 1 from public.products where products.id = product_variants.product_id and products.status = 'active')
  or public.is_admin()
);

create policy "variants_admin_manage" on public.product_variants
for all using (public.is_admin()) with check (public.is_admin());

create policy "product_images_public_active_select" on public.product_images
for select using (
  exists (select 1 from public.products where products.id = product_images.product_id and products.status = 'active')
  or public.is_admin()
);

create policy "product_images_admin_manage" on public.product_images
for all using (public.is_admin()) with check (public.is_admin());

create policy "tags_public_select" on public.tags
for select using (true);

create policy "tags_admin_manage" on public.tags
for all using (public.is_admin()) with check (public.is_admin());

create policy "product_tags_public_select" on public.product_tags
for select using (true);

create policy "product_tags_admin_manage" on public.product_tags
for all using (public.is_admin()) with check (public.is_admin());

create policy "favorites_own_select" on public.favorites
for select using (auth.uid() = user_id);

create policy "favorites_own_insert" on public.favorites
for insert with check (auth.uid() = user_id);

create policy "favorites_own_delete" on public.favorites
for delete using (auth.uid() = user_id);

create policy "carts_own_select" on public.carts
for select using (auth.uid() = user_id or public.is_admin());

create policy "carts_own_insert" on public.carts
for insert with check (auth.uid() = user_id or user_id is null);

create policy "carts_own_update" on public.carts
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "cart_items_own_select" on public.cart_items
for select using (
  exists (select 1 from public.carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
  or public.is_admin()
);

create policy "cart_items_own_manage" on public.cart_items
for all using (
  exists (select 1 from public.carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
) with check (
  exists (select 1 from public.carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);

create policy "cart_discounts_own_select" on public.cart_discounts
for select using (
  exists (select 1 from public.carts where carts.id = cart_discounts.cart_id and carts.user_id = auth.uid())
  or public.is_admin()
);

create policy "cart_discounts_admin_manage" on public.cart_discounts
for all using (public.is_admin()) with check (public.is_admin());

create policy "orders_own_or_admin_select" on public.orders
for select using (auth.uid() = user_id or public.is_admin());

create policy "orders_own_insert" on public.orders
for insert with check (auth.uid() = user_id);

create policy "orders_own_cancel_update" on public.orders
for update using (auth.uid() = user_id and status in ('draft', 'pending_payment', 'payment_processing'))
with check (auth.uid() = user_id);

create policy "orders_admin_manage" on public.orders
for all using (public.is_admin()) with check (public.is_admin());

create policy "order_items_own_or_admin_select" on public.order_items
for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
  or public.is_admin()
);

create policy "order_items_admin_manage" on public.order_items
for all using (public.is_admin()) with check (public.is_admin());

create policy "order_items_own_insert" on public.order_items
for insert with check (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);

create policy "payments_own_or_admin_select" on public.payments
for select using (
  exists (select 1 from public.orders where orders.id = payments.order_id and orders.user_id = auth.uid())
  or public.is_admin()
);

create policy "payments_admin_manage" on public.payments
for all using (public.is_admin()) with check (public.is_admin());

create policy "payments_own_insert" on public.payments
for insert with check (
  exists (select 1 from public.orders where orders.id = payments.order_id and orders.user_id = auth.uid())
);

create policy "order_events_own_or_admin_select" on public.order_events
for select using (
  exists (select 1 from public.orders where orders.id = order_events.order_id and orders.user_id = auth.uid())
  or public.is_admin()
);

create policy "order_events_admin_insert" on public.order_events
for insert with check (public.is_admin());

create policy "order_events_own_insert" on public.order_events
for insert with check (
  exists (select 1 from public.orders where orders.id = order_events.order_id and orders.user_id = auth.uid())
);

create policy "points_own_or_admin_select" on public.points_transactions
for select using (auth.uid() = user_id or public.is_admin());

create policy "points_admin_manage" on public.points_transactions
for all using (public.is_admin()) with check (public.is_admin());

create policy "rewards_public_active_select" on public.rewards
for select using (is_active = true or public.is_admin());

create policy "rewards_admin_manage" on public.rewards
for all using (public.is_admin()) with check (public.is_admin());

create policy "reward_redemptions_own_or_admin_select" on public.reward_redemptions
for select using (auth.uid() = user_id or public.is_admin());

create policy "reward_redemptions_own_insert" on public.reward_redemptions
for insert with check (auth.uid() = user_id);

create policy "reward_redemptions_admin_manage" on public.reward_redemptions
for all using (public.is_admin()) with check (public.is_admin());

create policy "custom_requests_own_or_admin_select" on public.custom_requests
for select using (auth.uid() = user_id or public.is_admin());

create policy "custom_requests_public_insert" on public.custom_requests
for insert with check (user_id is null or auth.uid() = user_id);

create policy "custom_requests_own_update" on public.custom_requests
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "custom_requests_admin_manage" on public.custom_requests
for all using (public.is_admin()) with check (public.is_admin());

create policy "custom_request_files_own_or_admin_select" on public.custom_request_files
for select using (
  exists (select 1 from public.custom_requests where custom_requests.id = custom_request_files.request_id and custom_requests.user_id = auth.uid())
  or public.is_admin()
);

create policy "custom_request_files_own_insert" on public.custom_request_files
for insert with check (
  exists (select 1 from public.custom_requests where custom_requests.id = custom_request_files.request_id and (custom_requests.user_id = auth.uid() or custom_requests.user_id is null))
);

create policy "custom_request_files_admin_manage" on public.custom_request_files
for all using (public.is_admin()) with check (public.is_admin());

create policy "custom_request_events_own_or_admin_select" on public.custom_request_events
for select using (
  exists (select 1 from public.custom_requests where custom_requests.id = custom_request_events.request_id and custom_requests.user_id = auth.uid())
  or public.is_admin()
);

create policy "custom_request_events_public_insert" on public.custom_request_events
for insert with check (true);

create policy "custom_request_events_admin_manage" on public.custom_request_events
for all using (public.is_admin()) with check (public.is_admin());

create policy "quote_rules_admin_select" on public.quote_rules
for select using (public.is_admin());

create policy "quote_rules_admin_manage" on public.quote_rules
for all using (public.is_admin()) with check (public.is_admin());

create policy "request_quotes_own_or_admin_select" on public.custom_request_quotes
for select using (
  exists (
    select 1 from public.custom_requests
    where custom_requests.id = custom_request_quotes.request_id
    and custom_requests.user_id = auth.uid()
  )
  or public.is_admin()
);

create policy "request_quotes_admin_manage" on public.custom_request_quotes
for all using (public.is_admin()) with check (public.is_admin());

create policy "store_settings_public_select" on public.store_settings
for select using (true);

create policy "store_settings_admin_manage" on public.store_settings
for all using (public.is_admin()) with check (public.is_admin());

create policy "blog_categories_public_select" on public.blog_categories
for select using (true);

create policy "blog_categories_admin_manage" on public.blog_categories
for all using (public.is_admin()) with check (public.is_admin());

create policy "blog_posts_public_published_select" on public.blog_posts
for select using (status = 'published' or public.is_admin());

create policy "blog_posts_admin_manage" on public.blog_posts
for all using (public.is_admin()) with check (public.is_admin());

create policy "activity_logs_admin_select" on public.activity_logs
for select using (public.is_admin());

create policy "activity_logs_admin_insert" on public.activity_logs
for insert with check (public.is_admin());
