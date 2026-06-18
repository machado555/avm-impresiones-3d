# Etapa 2.4 - Catalogo conectado a Supabase

## Alcance

La tienda queda preparada para leer catalogo real desde Supabase con Server Components y mappers de dominio.

## Capa de datos

- `getCategories()`
- `getCategoryBySlug()`
- `getProducts()`
- `getProductBySlug()`
- `getFeaturedProducts()`
- `getProductsByCategory()`
- `searchProducts()`
- `getRelatedProducts()`

## Modelo preparado

Productos:

- `sku`
- `short_description`
- `weight_grams`
- `estimated_print_time`
- `status`: `draft`, `active`, `out_of_stock`, `archived`
- `is_customizable`
- `allow_file_upload`
- `brand`
- `gtin`
- `mpn`

Variantes:

- color
- material
- size
- finish
- price_modifier
- stock
- active

## Storage

Buckets preparados:

- `product-images`
- `product-files`
- `custom-request-files`
- `avatars`
- `blog-images`

## SEO

Cada producto tiene metadata dinamica y JSON-LD Product preparado con brand, gtin, mpn, precio, disponibilidad, imagenes y URL canonica.

## Admin futuro

Servicios preparados con capabilities:

- `createProduct()`
- `updateProduct()`
- `deleteProduct()`
- `createCategory()`
- `updateCategory()`
- `deleteCategory()`
