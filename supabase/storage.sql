insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('product-files', 'product-files', false, 52428800, array['model/stl', 'application/octet-stream', 'application/pdf', 'image/jpeg', 'image/png']),
  ('blog-images', 'blog-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp']),
  ('custom-request-files', 'custom-request-files', false, 52428800, array['model/stl', 'model/3mf', 'application/octet-stream', 'application/zip', 'application/x-zip-compressed', 'image/jpeg', 'image/png']),
  ('quote-files', 'quote-files', false, 52428800, array['application/pdf', 'model/stl', 'model/3mf', 'application/octet-stream', 'application/zip', 'image/jpeg', 'image/png']),
  ('site-assets', 'site-assets', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
on conflict (id) do nothing;

create policy "public_read_public_assets"
on storage.objects for select
using (bucket_id in ('product-images', 'blog-images', 'avatars', 'site-assets'));

create policy "admins_manage_product_files"
on storage.objects for all
using (bucket_id = 'product-files' and public.is_admin())
with check (bucket_id = 'product-files' and public.is_admin());

create policy "authenticated_upload_custom_request_files"
on storage.objects for insert
with check (
  bucket_id = 'custom-request-files'
  and auth.role() in ('authenticated', 'anon')
);

create policy "users_read_own_custom_request_files"
on storage.objects for select
using (
  bucket_id = 'custom-request-files'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "admins_manage_storage"
on storage.objects for all
using (public.is_admin())
with check (public.is_admin());
