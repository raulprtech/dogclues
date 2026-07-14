-- Initial Schema for Campeche360
-- Note: Row Level Security (RLS) is minimal here for prototyping purposes.
-- A full production system should implement strict RLS policies.

CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE awards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT
);

CREATE TABLE sponsors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('main', 'category', 'launch'))
);

CREATE TABLE places (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id),
  zone TEXT NOT NULL,
  description TEXT NOT NULL,
  footprints INTEGER CHECK (footprints >= 1 AND footprints <= 3),
  image_url TEXT NOT NULL,
  address TEXT,
  is_sponsored BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE place_awards (
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  award_id UUID REFERENCES awards(id) ON DELETE CASCADE,
  PRIMARY KEY (place_id, award_id)
);

CREATE TABLE guide_editions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  cover_image_url TEXT NOT NULL,
  sponsor_id UUID REFERENCES sponsors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE guide_places (
  guide_edition_id UUID REFERENCES guide_editions(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  PRIMARY KEY (guide_edition_id, place_id)
);

CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  category_id UUID REFERENCES categories(id),
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  read_time_minutes INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  content TEXT NOT NULL,
  courtesy_declaration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE article_related_places (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, place_id)
);

CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Basic RLS setup (Read-only for public)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON categories FOR SELECT USING (true);

ALTER TABLE places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON places FOR SELECT USING (true);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON articles FOR SELECT USING (true);

ALTER TABLE guide_editions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON guide_editions FOR SELECT USING (true);
