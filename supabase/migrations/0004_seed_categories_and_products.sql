-- AVM-Impresiones 3D - Seed data: categories + products
-- Run after 0001_initial_schema.sql through 0003_cms_tables.sql

-- ── Categories ─────────────────────────────────────────────────────────────

INSERT INTO public.categories (id, name, slug, description, sort_order, is_active)
VALUES
  (gen_random_uuid(), 'Impresiones 3D',   'impresiones-3d',          'Piezas decorativas, funcionales, prototipos y accesorios a pedido.', 1, true),
  (gen_random_uuid(), 'Electronica',      'electronica',             'Gadgets, modulos, accesorios inteligentes y soluciones practicas.',  2, true),
  (gen_random_uuid(), 'Pequenos electrodomesticos', 'pequenos-electrodomesticos', 'Productos compactos para mejorar rutinas y espacios cotidianos.',   3, true),
  (gen_random_uuid(), 'Diseno personalizado',       'diseno-personalizado',       'Modelado, reparacion digital, prototipos y produccion a medida.',   4, true)
ON CONFLICT (slug) DO NOTHING;

-- ── Products ───────────────────────────────────────────────────────────────

-- Impresiones 3D (slug: impresiones-3d)
WITH cat AS (SELECT id FROM public.categories WHERE slug = 'impresiones-3d' LIMIT 1)
INSERT INTO public.products (category_id, name, slug, description, short_description, price, compare_at_price, stock, status, is_featured, points_reward)
VALUES
  ((SELECT id FROM cat), 'Soporte modular AVM-X',    'soporte-modular-avm-x',    'Soporte modular impreso en PLA+ de alta resistencia. Disenado para organizar escritorios tech con estilo industrial moderno. Compatible con monitores, tablets y perifericos.', 'Organizador premium impreso en PLA+, ideal para escritorio y setups tech.', 18900, 22900, 50, 'active', true, 180),
  ((SELECT id FROM cat), 'Portalapices Hexagon',     'portalapices-hexagon',     'Portalapices de diseno hexagonal con compartimentos modulares. Impreso en PETG con acabado mate.', 'Portalapices hexagonal modular con acabado mate premium.', 8900, NULL, 100, 'active', true, 80),
  ((SELECT id FROM cat), 'Soporte laptop plegable',  'soporte-laptop-plegable',  'Soporte ergonomico plegable para notebooks de hasta 16". Fabricado en PLA+ reforzado con patron de panal de abeja para maximizar ventilacion.', 'Soporte ergonomico plegable para notebooks de hasta 16".', 12900, 14900, 75, 'active', true, 120),
  ((SELECT id FROM cat), 'Maceta geometrica Zen',    'maceta-geometrica-zen',    'Maceta de diseno geometrico con drenaje integrado. Ideal para plantas suculentas y cactus. Incluye bandeja recolectora impresa a juego.', 'Maceta geometrica con drenaje integrado para suculentas.', 7500, NULL, 60, 'active', false, 70),
  ((SELECT id FROM cat), 'Organizador de cables Pro', 'organizador-cables-pro',  'Pack de 10 organizadores de cables adhesivos con diseno minimalista. Mantene ordenados los cables de escritorio, TV o vehiculo.', 'Pack de 10 organizadores de cables adhesivos minimalistas.', 4500, 5900, 200, 'active', false, 40);

-- Electronica (slug: electronica)
WITH cat AS (SELECT id FROM public.categories WHERE slug = 'electronica' LIMIT 1)
INSERT INTO public.products (category_id, name, slug, description, short_description, price, compare_at_price, stock, status, is_featured, points_reward)
VALUES
  ((SELECT id FROM cat), 'Kit sensores Maker',       'kit-sensores-maker',       'Kit inicial con 8 sensores compatibles con Arduino y ESP32: temperatura, humedad, ultrasonido, PIR, luz, gas, boton y potenciometro. Incluye shield de conexion y guia rapida.', 'Pack inicial para proyectos IoT, prototipos y automatizacion casera.', 32500, NULL, 30, 'active', true, 320),
  ((SELECT id FROM cat), 'Hub USB-C 4 puertos',      'hub-usb-c-4-puertos',     'Hub USB-C con 4 puertos USB 3.0, lector de microSD, HDMI 4K y carga PD 100W. Carcasa impresa en PLA+ con diseno compacto.', 'Hub USB-C 4 puertos con HDMI 4K y carga PD 100W.', 24900, 29900, 45, 'active', true, 240),
  ((SELECT id FROM cat), 'Llavero RFID programable',  'llavero-rfid-programable', 'Llavero con chip RFID/NFC reescriptible. Compatible con sistemas de control de acceso, tarjetas de proximidad y automatizacion.', 'Llavero RFID/NFC reescriptible para control de acceso.', 3500, NULL, 150, 'active', false, 30);

-- Pequenos electrodomesticos (slug: pequenos-electrodomesticos)
WITH cat AS (SELECT id FROM public.categories WHERE slug = 'pequenos-electrodomesticos' LIMIT 1)
INSERT INTO public.products (category_id, name, slug, description, short_description, price, compare_at_price, stock, status, is_featured, points_reward)
VALUES
  ((SELECT id FROM cat), 'Mini selladora compacta',   'mini-selladora-compacta',  'Selladora portatil recargable por USB-C. Sella bolsas plasticas hasta 0.3mm de espesor. Ideal para cocina, taller y packaging de pequenos productos.', 'Solucion portatil para cocina, taller y packaging.', 24200, NULL, 40, 'active', true, 240),
  ((SELECT id FROM cat), 'Ventilador USB silencioso', 'ventilador-usb-silencioso', 'Ventilador mini USB de 120mm con aspa impresa en PETG. Tres velocidades, rotacion silenciosa (<25dB) y base antideslizante.', 'Ventilador mini USB silencioso de 120mm con base antideslizante.', 15900, 18900, 55, 'active', false, 150),
  ((SELECT id FROM cat), 'Base magnetica smartphone', 'base-magnetica-smartphone', 'Base adhesiva con iman de neodimio N52 para soporte magnetico de smartphone en escritorio, vehiculo o cocina. Incluye anillo metalico adhesivo.', 'Base magnetica con iman N52 para soporte de smartphone.', 6800, NULL, 80, 'active', false, 60);
