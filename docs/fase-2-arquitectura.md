# Fase 2 - Arquitectura

## Objetivo

Preparar AVM-Impresiones 3D para operar como tienda real con Supabase, roles, catalogo dinamico, carrito persistente, favoritos, puntos, solicitudes personalizadas, cotizador 3D y panel administrativo.

## Capas

```text
app/           rutas y layouts
components/    piezas visuales reutilizables
features/      logica por dominio
lib/           infraestructura, seguridad, constantes, stores y helpers
types/         contratos TypeScript centrales
messages/      base multi-idioma
supabase/      schema, storage, seeds y RLS
```

## Estado global preparado

- `authStore`: usuario, rol y estado de sesion.
- `cartStore`: carrito persistente y totales.
- `favoritesStore`: favoritos por producto.
- `pointsStore`: saldo, recompensas y movimientos.
- `localeStore`: idioma activo.

## Roles

- `guest`: visitante anonimo.
- `customer`: cliente registrado.
- `admin`: operador de tienda.
- `superadmin`: gestion total, usuarios y permisos.
- `moderator`: rol intermedio preparado para operaciones limitadas futuras.

Los componentes no deberian validar roles directamente. La autorizacion se centraliza mediante capabilities/permisos en `lib/security/roles.ts`.

## Supabase

La carpeta `supabase/` contiene:

- `migrations/0001_initial_schema.sql`: tablas, relaciones, enums, indices y triggers.
- `policies.sql`: politicas RLS.
- `storage.sql`: buckets y reglas de Storage.
- `seed.sql`: categorias, materiales, regla base de cotizacion y recompensas.

## Blog y AdSense

El blog queda preparado con `adsense_ready` y slots reservados en configuracion, pero los anuncios no se implementan todavia.
