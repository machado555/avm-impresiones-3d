insert into public.categories (name, slug, description, sort_order)
values
  ('Impresiones 3D', 'impresiones-3d', 'Piezas decorativas, funcionales, prototipos y accesorios a pedido.', 10),
  ('Electronica', 'electronica', 'Gadgets, modulos, accesorios inteligentes y soluciones practicas.', 20),
  ('Pequenos electrodomesticos', 'pequenos-electrodomesticos', 'Productos compactos para rutinas y espacios cotidianos.', 30),
  ('Diseno personalizado', 'diseno-personalizado', 'Modelado, reparacion digital, prototipos y produccion a medida.', 40)
on conflict (slug) do nothing;

insert into public.print_materials (name, slug, type, cost_per_gram, price_per_gram, default_margin_percentage, color_options)
values
  ('PLA+', 'pla-plus', 'PLA', 18.00, 38.00, 45, '["negro", "blanco", "gris", "azul", "violeta"]'::jsonb),
  ('PETG', 'petg', 'PETG', 24.00, 48.00, 45, '["negro", "transparente", "blanco"]'::jsonb),
  ('TPU flexible', 'tpu-flexible', 'TPU', 42.00, 84.00, 55, '["negro", "blanco"]'::jsonb),
  ('Resina standard', 'resina-standard', 'Resin', 36.00, 76.00, 55, '["gris", "translucido"]'::jsonb)
on conflict (slug) do nothing;

insert into public.quote_rules (name, machine_hour_rate, electricity_hour_rate, labor_hour_rate, default_margin_percentage, minimum_price, is_active)
values ('Regla base AVM', 850.00, 120.00, 1800.00, 45, 3500.00, true);

insert into public.rewards (name, description, points_cost, discount_type, discount_value)
values
  ('Descuento inicial', 'Canje de bienvenida para compras seleccionadas.', 500, 'fixed', 2500),
  ('Envio bonificado', 'Beneficio para pedidos que cumplan condiciones comerciales.', 900, 'free_shipping', 0),
  ('10% OFF maker', 'Descuento porcentual para productos destacados.', 1200, 'percentage', 10);

insert into public.store_settings (business_name, whatsapp_number, support_email, default_currency, shipping_enabled, custom_requests_enabled)
values ('AVM-Impresiones 3D', '5491100000000', 'soporte@avm-impresiones3d.com', 'ARS', true, true);
