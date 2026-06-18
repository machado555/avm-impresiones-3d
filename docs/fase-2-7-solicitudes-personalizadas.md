# Etapa 2.7 - Solicitudes personalizadas

## Alcance

Se implementa el flujo para solicitudes personalizadas de impresion 3D, tanto para guests como para usuarios autenticados.

## Flujo

```text
/solicitar-diseno
  -> formulario con datos de contacto obligatorios
  -> carga opcional de archivos
  -> custom_requests
  -> custom_request_files
  -> custom_request_events
```

Usuarios autenticados pueden ver historial y detalle en:

```text
/solicitudes
/solicitudes/[requestNumber]
```

## Estados

- `pending`
- `reviewing`
- `quoted`
- `approved`
- `printing`
- `ready`
- `delivered`
- `rejected`
- `cancelled`

## Tipos de solicitud

- `custom_model`
- `existing_model_print`
- `lithophane`
- `replacement_part`
- `other`

## Archivos permitidos

- STL
- OBJ
- 3MF
- JPG
- PNG
- ZIP

Buckets:

- `custom-request-files`
- `quote-files`

## Seguridad

- Guest puede crear solicitudes con `user_id = null`.
- Usuarios autenticados crean solicitudes con `user_id = auth.uid()`.
- Usuarios autenticados solo leen sus propias solicitudes.
- Admin gestiona todas.
- Timeline preparado con `actor_type` y `actor_id`.

## Cotizador futuro

Queda preparada la estructura para cotizaciones futuras mediante:

- `estimated_price`
- `quoted_at`
- `approved_at`
- `quote-files`
- eventos de timeline
