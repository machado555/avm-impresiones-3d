# Etapa 2.5 - Favoritos y carrito persistente

## Favoritos

- Favoritos autenticados en Supabase.
- Helpers: `getFavorites`, `getFavoriteProductIds`, `isFavorite`.
- Actions: `addFavorite`, `removeFavorite`, `toggleFavorite`.
- UI: boton favorito, contador y pagina `/favoritos`.

## Carrito

Dos modos:

- `guest`: local, persistido en `localStorage`.
- `authenticated`: Supabase como fuente de verdad.

## Datos ampliados

`carts`:

- `last_activity_at`
- `expires_at`

`cart_items`:

- `unit_price`
- `product_name`
- `product_slug`
- `product_image`
- `variant_snapshot`

`cart_discounts` queda preparado para cupones, descuentos, puntos y checkout.

## Reglas

- Producto debe tener `status = active`.
- Variante debe tener `active = true`.
- Stock debe ser mayor a cero.
- La cantidad se ajusta automaticamente si supera el stock disponible.
- Mismo producto con distinta variante es un item diferente.

## Preparacion futura

El carrito queda preparado para pedidos, puntos confirmados, cupones, checkout, Mercado Pago e historial de compras.
