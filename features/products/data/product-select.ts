export const productSelect = `
  id,
  category_id,
  name,
  slug,
  description,
  short_description,
  price,
  compare_at_price,
  sku,
  weight_grams,
  estimated_print_time,
  stock,
  status,
  is_featured,
  is_customizable,
  allow_file_upload,
  points_reward,
  brand,
  gtin,
  mpn,
  seo_title,
  seo_description,
  product_images (
    id,
    product_id,
    variant_id,
    url,
    alt,
    sort_order
  ),
  product_variants (
    id,
    product_id,
    sku,
    color,
    material,
    size,
    finish,
    price_modifier,
    stock,
    active
  ),
  product_tags (
    tags (
      id,
      name,
      slug
    )
  ),
  categories (
    id,
    name,
    slug
  )
`;
