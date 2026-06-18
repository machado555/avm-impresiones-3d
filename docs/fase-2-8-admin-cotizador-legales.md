# Etapa 2.8 - Admin, cotizador y legales

## Panel admin

Se agrego un panel dark/glass en `/admin` con metricas operativas:

- solicitudes pendientes
- solicitudes urgentes
- solicitudes sin cotizar
- pedidos activos
- pedidos pendientes de pago
- ingresos estimados
- ingresos del mes
- usuarios registrados
- nuevos usuarios del mes
- productos sin stock
- ultimas solicitudes
- ultimos pedidos

## Modulos

- `/admin/solicitudes`
- `/admin/productos`
- `/admin/pedidos`
- `/admin/usuarios`
- `/admin/materiales`
- `/admin/configuracion`

## Solicitudes

Admin puede:

- filtrar solicitudes
- ver detalle
- descargar archivos mediante URL firmada
- cambiar estado
- agregar nota interna
- marcar urgente
- crear cotizacion
- duplicar cotizacion
- reenviar cotizacion, preparado para email futuro

## Cotizador manual

`custom_request_quotes` soporta multiples versiones:

- `currency`
- `version`
- `is_active`
- `valid_until`
- `sent_at`
- `accepted_at`
- `rejected_at`

Calculo:

```text
subtotal = material_cost + labor_cost + machine_cost
final_price = subtotal + margen
```

## Configuracion

`store_settings` permite administrar datos del negocio:

- nombre comercial
- WhatsApp
- email soporte
- direccion
- redes sociales
- logo/favicon
- moneda
- envios
- solicitudes personalizadas
- mantenimiento
- AdSense

## Legales

Se agregaron:

- `/terminos-y-condiciones`
- `/politica-de-privacidad`
- `/politica-de-cookies`

El formulario de solicitud guarda aceptaciones legales y declaracion de titularidad de archivos.
