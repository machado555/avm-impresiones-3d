-- CMS tables for visual content management
-- Run this in your Supabase SQL editor

-- Table for CMS images (hero, banners, logos, etc.)
CREATE TABLE IF NOT EXISTS cms_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section, key)
);

-- Table for CMS editable texts
CREATE TABLE IF NOT EXISTS cms_texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section, key)
);

-- Enable RLS
ALTER TABLE cms_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_texts ENABLE ROW LEVEL SECURITY;

-- RLS: allow authenticated users with admin role to manage CMS
CREATE POLICY "Admins can manage cms_images"
  ON cms_images
  USING (true)
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (profiles.role = 'admin' OR profiles.role = 'superadmin')
    )
  );

CREATE POLICY "Admins can manage cms_texts"
  ON cms_texts
  USING (true)
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (profiles.role = 'admin' OR profiles.role = 'superadmin')
    )
  );

-- Allow public read access for CMS content
CREATE POLICY "Public can read cms_images"
  ON cms_images FOR SELECT
  USING (true);

CREATE POLICY "Public can read cms_texts"
  ON cms_texts FOR SELECT
  USING (true);

-- Insert default CMS entries
INSERT INTO cms_images (section, key, url, alt) VALUES
  ('home', 'hero_main', '', 'Hero principal'),
  ('home', 'hero_banner', '', 'Banner principal'),
  ('global', 'logo', '', 'Logo del sitio'),
  ('global', 'favicon', '', 'Favicon')
ON CONFLICT (section, key) DO NOTHING;

INSERT INTO cms_texts (section, key, value) VALUES
  ('home', 'hero_title', 'Impresion 3D, electronica y diseño personalizado'),
  ('home', 'hero_subtitle', 'Productos premium con experiencia futurista'),
  ('home', 'hero_cta', 'Ver productos'),
  ('home', 'promo_title', 'Servicio personalizado'),
  ('home', 'promo_text', 'Solicita tu diseño a medida'),
  ('footer', 'contact_info', 'Contactanos por WhatsApp para consultas y presupuestos'),
  ('footer', 'copyright', '© 2024 AVM-Impresiones 3D. Todos los derechos reservados.')
ON CONFLICT (section, key) DO NOTHING;

-- Enable auto-update for updated_at
CREATE TRIGGER set_cms_images_updated_at
  BEFORE UPDATE ON cms_images
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_cms_texts_updated_at
  BEFORE UPDATE ON cms_texts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
