-- Spring Blooms Decor - Supabase Schema
-- Run this in Supabase SQL Editor to initialize the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- CAROUSEL IMAGES
-- ============================================================
create table if not exists carousel_images (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  storage_path text not null,
  caption text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz default now()
);

alter table carousel_images enable row level security;

create policy "Public can read active carousel images"
  on carousel_images for select
  using (active = true);

create policy "Authenticated users can manage carousel images"
  on carousel_images for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
create table if not exists gallery_images (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  storage_path text not null,
  caption text,
  category text not null default 'general',
  display_order integer not null default 0,
  created_at timestamptz default now()
);

alter table gallery_images enable row level security;

create policy "Public can read gallery images"
  on gallery_images for select
  using (true);

create policy "Authenticated users can manage gallery images"
  on gallery_images for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- SERVICES
-- ============================================================
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  icon_name text not null default 'Flower2',
  features text[] not null default '{}',
  display_order integer not null default 0,
  created_at timestamptz default now()
);

alter table services enable row level security;

create policy "Public can read services"
  on services for select
  using (true);

create policy "Authenticated users can manage services"
  on services for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- PRICING PACKAGES
-- ============================================================
create table if not exists pricing_packages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price_label text not null,
  description text not null,
  features text[] not null default '{}',
  is_popular boolean not null default false,
  event_type text not null default 'wedding',
  display_order integer not null default 0,
  created_at timestamptz default now()
);

alter table pricing_packages enable row level security;

create policy "Public can read pricing packages"
  on pricing_packages for select
  using (true);

create policy "Authenticated users can manage pricing packages"
  on pricing_packages for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  wedding_date text,
  location text,
  review text not null,
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  image_url text,
  display_order integer not null default 0,
  created_at timestamptz default now()
);

alter table testimonials enable row level security;

create policy "Public can read testimonials"
  on testimonials for select
  using (true);

create policy "Authenticated users can manage testimonials"
  on testimonials for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- FAQs
-- ============================================================
create table if not exists faqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  category text not null default 'general',
  display_order integer not null default 0,
  created_at timestamptz default now()
);

alter table faqs enable row level security;

create policy "Public can read faqs"
  on faqs for select
  using (true);

create policy "Authenticated users can manage faqs"
  on faqs for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- SITE SETTINGS (contact info, social links, etc.)
-- ============================================================
create table if not exists site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table site_settings enable row level security;

create policy "Public can read site settings"
  on site_settings for select
  using (true);

create policy "Authenticated users can manage site settings"
  on site_settings for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- STORAGE BUCKETS (run separately or via Supabase dashboard)
-- ============================================================
-- insert into storage.buckets (id, name, public) values ('carousel', 'carousel', true);
-- insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true);

-- ============================================================
-- SEED DEFAULT SITE SETTINGS
-- ============================================================
insert into site_settings (key, value) values
  ('contact', '{"phone": "+1 (555) 123-4567", "email": "info@springbloomsdecor.com", "address": "123 Blossom Lane, Irving, TX 75063", "hours": "Mon–Sat: 9 AM – 7 PM"}'),
  ('social', '{"instagram": "https://instagram.com/springbloomsdecor", "facebook": "https://facebook.com/springbloomsdecor", "pinterest": "https://pinterest.com/springbloomsdecor"}'),
  ('about', '{"tagline": "Crafting Timeless Indian Wedding Dreams in America", "story": "Spring Blooms Decor brings the vibrant traditions of Indian weddings to life across the United States. With over a decade of experience, we specialize in breathtaking mandap setups, lush floral arrangements, and immersive event design that seamlessly blends Indian heritage with modern elegance."}')
on conflict (key) do nothing;

-- ============================================================
-- SEED SAMPLE SERVICES
-- ============================================================
insert into services (title, description, icon_name, features, display_order) values
  ('Mandap & Ceremonial Decor', 'Stunning mandap setups that blend traditional Indian artistry with elegant floral designs, creating the perfect sacred space for your wedding ceremony.', 'Flower2', ARRAY['Custom mandap design', 'Fresh floral arrangements', 'Fabric draping & lighting', 'Traditional motifs', 'Setup & teardown included'], 1),
  ('Floral Arrangements', 'From bridal garlands to table centerpieces, our expert florists craft exquisite arrangements using seasonal blooms and traditional Indian flowers.', 'Leaf', ARRAY['Bridal & groom garlands', 'Table centerpieces', 'Ceremony florals', 'Reception arrangements', 'Marigold & rose decor'], 2),
  ('Reception & Banquet Decor', 'Transform your reception venue into a magical space with our comprehensive decor packages including lighting, table settings, and stage design.', 'Sparkles', ARRAY['Stage & backdrop design', 'Table centerpieces', 'Ambient lighting', 'Entrance decor', 'Sweetheart table setup'], 3),
  ('Mehndi & Sangeet Decor', 'Vibrant and festive decorations for your pre-wedding celebrations, featuring bright colors, traditional patterns, and a joyful atmosphere.', 'Star', ARRAY['Colorful draping', 'Photobooth setup', 'Cushion seating areas', 'Floral installations', 'LED & fairy lights'], 4),
  ('Haldi Ceremony Decor', 'Bright yellow and marigold themed decorations that bring the auspicious energy of the Haldi ceremony to life.', 'Sun', ARRAY['Marigold flower walls', 'Yellow & orange draping', 'Petal rangoli', 'Traditional urns & decor', 'Natural elements'], 5),
  ('Baraat Decor', 'Make a grand entrance with beautifully decorated horse carriages, dhols, and procession arrangements that create an unforgettable Baraat experience.', 'Crown', ARRAY['Decorated horse/elephant', 'Flower petals & garlands', 'Dhol & band coordination', 'Umbrella & fan bearers', 'Processional florals'], 6)
on conflict do nothing;

-- ============================================================
-- SEED SAMPLE PRICING PACKAGES
-- ============================================================
insert into pricing_packages (name, price_label, description, features, is_popular, event_type, display_order) values
  ('Silver Blossoms', 'Starting at $2,500', 'Perfect for intimate ceremonies and smaller celebrations with elegant essential decor.', ARRAY['Mandap setup (basic)', 'Bridal & groom garlands', 'Table centerpieces (10 tables)', 'Entrance floral arrangement', 'Setup & breakdown'], false, 'wedding', 1),
  ('Golden Marigold', 'Starting at $5,500', 'Our most popular package for mid-size weddings with comprehensive decor services.', ARRAY['Custom mandap design', 'Full floral package', 'Table centerpieces (25 tables)', 'Stage & backdrop', 'Ambient lighting', 'Entrance & aisle decor', 'Sweetheart table', 'Setup & breakdown'], true, 'wedding', 2),
  ('Royal Heritage', 'Starting at $10,000', 'The ultimate luxury experience with bespoke design, premium florals, and full-service coordination.', ARRAY['Fully custom mandap', 'Premium floral throughout', 'Unlimited tables', 'Grand entrance design', 'Crystal chandelier lighting', 'Lounge areas', 'Photo wall & installations', 'Day-of coordination', 'Setup & breakdown'], false, 'wedding', 3),
  ('Celebration Package', 'Starting at $1,200', 'Great for Sangeet, Mehndi, Birthday, and other celebrations.', ARRAY['Colorful draping', 'Stage backdrop', 'Table centerpieces (10 tables)', 'Photobooth corner', 'Basic lighting'], false, 'event', 4)
on conflict do nothing;

-- ============================================================
-- SEED SAMPLE TESTIMONIALS
-- ============================================================
insert into testimonials (client_name, wedding_date, location, review, rating, display_order) values
  ('Priya & Rahul Sharma', 'October 2024', 'Dallas, TX', 'Spring Blooms Decor turned our wedding into an absolute fairy tale! The mandap was breathtaking and every floral arrangement was more beautiful than we imagined. Our guests are still talking about it months later!', 5, 1),
  ('Ananya & Vikram Patel', 'August 2024', 'Houston, TX', 'We hired Spring Blooms for our entire wedding weekend — Mehndi, Sangeet, and Reception. Each event was uniquely decorated yet cohesive. Absolutely worth every penny. Professional, creative, and so easy to work with!', 5, 2),
  ('Deepika & Arjun Nair', 'June 2024', 'Irving, TX', 'The team was incredible from start to finish. They understood our vision for a modern-traditional fusion and executed it flawlessly. The floral installations were Instagram-worthy and the setup was seamless.', 5, 3),
  ('Sunita & Karan Mehta', 'March 2024', 'Frisco, TX', 'Exceptional service and stunning decor! We had a very specific vision with peacock motifs and marigold themes and Spring Blooms brought it to life beyond our expectations. Highly recommend!', 5, 4)
on conflict do nothing;

-- ============================================================
-- SEED SAMPLE FAQs
-- ============================================================
insert into faqs (question, answer, category, display_order) values
  ('How far in advance should I book?', 'We recommend booking at least 6–12 months in advance for wedding packages, especially for peak season (October–April). For smaller events, 2–3 months notice is usually sufficient.', 'booking', 1),
  ('Do you travel outside of Texas?', 'Yes! While we are based in the Dallas–Fort Worth area, we travel throughout the United States. Travel and accommodation fees apply for events outside a 100-mile radius.', 'booking', 2),
  ('Can we customize our package?', 'Absolutely! All our packages are fully customizable. We encourage a consultation to understand your vision, cultural preferences, and budget so we can create a bespoke proposal just for you.', 'services', 3),
  ('What flowers do you typically use?', 'We specialize in traditional Indian flowers including marigolds, roses, jasmine, and tuberose, combined with premium blooms like orchids, peonies, and ranunculus. We source fresh flowers from local and specialty growers.', 'services', 4),
  ('Do you provide a day-of coordinator?', 'Our Royal Heritage package includes a day-of coordinator. For other packages, day-of coordination can be added for an additional fee. We always have a team lead on-site during setup and teardown.', 'services', 5),
  ('What is your payment policy?', 'We require a 30% deposit to secure your date, with 50% due 60 days before the event and the remaining balance 7 days before the event. We accept all major credit cards, bank transfers, and Zelle.', 'payment', 6),
  ('What happens if I need to cancel?', 'Cancellations made more than 90 days before the event receive a full refund minus the deposit. Cancellations within 60–90 days forfeit 50% of payments made. Cancellations within 60 days are non-refundable.', 'payment', 7),
  ('Do you work with venue coordinators?', 'Yes, we work closely with venue staff and other vendors to ensure seamless setup. We have established relationships with many venues in the DFW area and are happy to coordinate directly with your venue team.', 'logistics', 8)
on conflict do nothing;
