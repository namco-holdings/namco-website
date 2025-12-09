-- Add font selection to site_settings
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS font_family TEXT DEFAULT 'Inter' CHECK (font_family IN (
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Playfair Display',
  'Merriweather',
  'Source Sans Pro',
  'Nunito',
  'Ubuntu',
  'Crimson Text',
  'Lora',
  'PT Sans'
));



