# AVM-Impresiones 3D

Aplicacion Next.js para tienda online de impresiones 3D, electronica, pequenos electrodomesticos y servicios personalizados.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase Auth, PostgreSQL y Storage
- Vercel

## Ejecutar

```bash
cd apps/avm-store
npm install
npm run dev
```

Abrir `http://localhost:3001`.

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=5491100000000
```

## Estado

Fase 1 implementada como interfaz funcional con datos mock y preparacion para Supabase.

Fase 2 en progreso:

- Tipos TypeScript centralizados por dominio.
- Tema global centralizado en `lib/theme/tokens.ts`.
- Stores preparados para auth, carrito, favoritos, puntos e idioma.
- Roles y permisos preparados.
- Auth real con Supabase preparado mediante Server Actions, middleware, guards y capabilities.
- Base multi-idioma inicial en `messages/`.
- SQL completo de Supabase con schema, RLS, Storage y seeds.
- Blog preparado para AdSense futuro sin anuncios activos.
- Catalogo conectado a Supabase mediante Server Components, mappers, filtros, galerias con `next/image`, metadata dinamica y JSON-LD Product.
- Favoritos y carrito dual implementados: guest local y authenticated con Supabase, drawer global, totales y estructura futura para descuentos/cupones.
- Pedidos y checkout preparados: conversion de carrito a pedido, order items congelados, payments desacoplado, timeline de eventos y estados listos para Mercado Pago/envios/puntos.
- Solicitudes personalizadas implementadas para guests y usuarios autenticados, con archivos, request_number, timeline, RLS y base para cotizador futuro.
- Panel admin, cotizador manual, configuracion del negocio y paginas legales agregadas con capabilities, Server Actions y estilo dark/glass.
