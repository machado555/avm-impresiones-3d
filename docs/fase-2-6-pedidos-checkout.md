# Etapa 2.6 - Pedidos y checkout

## Alcance

Se implementa la conversion de carrito autenticado a pedido, dejando el flujo preparado para pagos, envios, cupones, facturacion y puntos confirmados.

## Flujo

```text
carrito autenticado
  -> checkout
  -> createOrderFromCart()
  -> orders
  -> order_items congelados
  -> payments placeholder
  -> order_events timeline
  -> cart.status = converted
```

## Reglas

- No se confia en datos del cliente para precios, stock ni producto.
- Se valida stock nuevamente antes de crear pedido.
- La informacion del producto queda congelada en `order_items`.
- El stock se descuenta unicamente cuando el pago sea aprobado en una etapa futura.
- Los puntos quedan como `estimated_points`.
- Los puntos se acreditaran unicamente cuando el pedido este `delivered`.

## Modelo

`orders` incluye:

- `cart_id`
- `payment_status`
- `currency`
- `delivery_method`
- `contact_snapshot`
- `shipping_snapshot`
- `points_awarded_at`

`payments` queda desacoplado del pedido y preparado para Mercado Pago.

`order_events` incluye:

- `actor_type`
- `actor_id`
- `metadata`

## Estados

- `draft`
- `pending_payment`
- `payment_processing`
- `paid`
- `processing`
- `printing`
- `ready_for_pickup`
- `shipped`
- `delivered`
- `cancelled`
- `refunded`
