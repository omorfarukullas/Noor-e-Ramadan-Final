-- Noor e Ramadan - Complete Database Schema
-- Created for PostgreSQL (Supabase)
-- Execute this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- USER PREFERENCES TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  preferred_language VARCHAR(5) DEFAULT 'bn' CHECK (preferred_language IN ('bn', 'en')),
  theme VARCHAR(10) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  calculation_method VARCHAR(50) DEFAULT 'Karachi',
  madhab VARCHAR(10) DEFAULT 'Hanafi' CHECK (madhab IN ('Hanafi', 'Shafi')),
  location_lat DECIMAL(10, 8) DEFAULT 23.8103,
  location_lng DECIMAL(11, 8) DEFAULT 90.4125,
  location_city VARCHAR(100) DEFAULT 'Dhaka',
  location_country VARCHAR(100) DEFAULT 'Bangladesh',
  notification_enabled BOOLEAN DEFAULT true,
  notification_minutes_before INTEGER DEFAULT 15 CHECK (notification_minutes_before IN (5, 10, 15, 30)),
  adhan_sound_enabled BOOLEAN DEFAULT true,
  default_quran_reciter VARCHAR(100) DEFAULT 'Abdul_Basit_Murattal_192kbps',
  quran_font_size VARCHAR(10) DEFAULT 'medium' CHECK (quran_font_size IN ('small', 'medium', 'large', 'xlarge', 'xxlarge')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- WORSHIP LOGS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS worship_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- Prayer tracking
  fajr_prayed BOOLEAN DEFAULT false,
  dhuhr_prayed BOOLEAN DEFAULT false,
  asr_prayed BOOLEAN DEFAULT false,
  maghrib_prayed BOOLEAN DEFAULT false,
  isha_prayed BOOLEAN DEFAULT false,
  
  -- Quran tracking
  quran_pages INTEGER DEFAULT 0 CHECK (quran_pages >= 0 AND quran_pages <= 604),
  quran_time_minutes INTEGER DEFAULT 0 CHECK (quran_time_minutes >= 0),
  quran_surah_from INTEGER CHECK (quran_surah_from >= 1 AND quran_surah_from <= 114),
  quran_ayah_from INTEGER,
  quran_surah_to INTEGER CHECK (quran_surah_to >= 1 AND quran_surah_to <= 114),
  quran_ayah_to INTEGER,
  
  -- Other worship
  dhikr_count INTEGER DEFAULT 0 CHECK (dhikr_count >= 0),
  dua_read BOOLEAN DEFAULT false,
  charity_given BOOLEAN DEFAULT false,
  
  -- Ramadan specific
  fasted BOOLEAN DEFAULT false,
  iftar_at_mosque BOOLEAN DEFAULT false,
  taraweeh_prayed BOOLEAN DEFAULT false,
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, date)
);

-- ==============================================
-- QURAN SURAHS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS quran_surahs (
  id INTEGER PRIMARY KEY CHECK (id >= 1 AND id <= 114),
  number INTEGER NOT NULL UNIQUE,
  name_arabic VARCHAR(100) NOT NULL,
  name_bangla VARCHAR(100) NOT NULL,
  name_english VARCHAR(100) NOT NULL,
  name_transliteration VARCHAR(100),
  revelation_type VARCHAR(20) CHECK (revelation_type IN ('Meccan', 'Medinan')),
  revelation_type_bangla VARCHAR(20) CHECK (revelation_type_bangla IN ('মক্কী', 'মাদানী')),
  total_ayahs INTEGER NOT NULL CHECK (total_ayahs > 0),
  description_bangla TEXT,
  description_english TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- QURAN AYAHS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS quran_ayahs (
  id SERIAL PRIMARY KEY,
  surah_id INTEGER REFERENCES quran_surahs(id) ON DELETE CASCADE,
  ayah_number INTEGER NOT NULL CHECK (ayah_number > 0),
  ayah_number_in_quran INTEGER NOT NULL UNIQUE CHECK (ayah_number_in_quran >= 1 AND ayah_number_in_quran <= 6236),
  text_arabic TEXT NOT NULL,
  text_bangla_transliteration TEXT,
  text_english_transliteration TEXT,
  translation_bangla TEXT NOT NULL,
  translation_english TEXT NOT NULL,
  juz_number INTEGER CHECK (juz_number >= 1 AND juz_number <= 30),
  page_number INTEGER CHECK (page_number >= 1 AND page_number <= 604),
  audio_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(surah_id, ayah_number)
);

-- ==============================================
-- USER QURAN BOOKMARKS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS user_quran_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  surah_id INTEGER REFERENCES quran_surahs(id) ON DELETE CASCADE,
  ayah_number INTEGER NOT NULL,
  note TEXT,
  highlight_color VARCHAR(20) DEFAULT 'yellow' CHECK (highlight_color IN ('yellow', 'green', 'blue', 'pink', 'purple')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, surah_id, ayah_number)
);

-- ==============================================
-- USER QURAN PROGRESS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS user_quran_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  surah_id INTEGER REFERENCES quran_surahs(id) ON DELETE CASCADE,
  last_ayah_read INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, surah_id)
);

-- ==============================================
-- DUAS COLLECTION TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS duas (
  id SERIAL PRIMARY KEY,
  title_bangla VARCHAR(200) NOT NULL,
  title_english VARCHAR(200) NOT NULL,
  title_arabic VARCHAR(200),
  category_bangla VARCHAR(100) NOT NULL,
  category_english VARCHAR(100) NOT NULL,
  dua_arabic TEXT NOT NULL,
  dua_bangla_transliteration TEXT,
  dua_english_transliteration TEXT,
  translation_bangla TEXT NOT NULL,
  translation_english TEXT NOT NULL,
  reference_bangla VARCHAR(200),
  reference_english VARCHAR(200),
  benefits_bangla TEXT,
  benefits_english TEXT,
  audio_url VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- USER FAVORITE DUAS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS user_favorite_duas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dua_id INTEGER REFERENCES duas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, dua_id)
);

-- ==============================================
-- DHIKR COLLECTION TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS dhikr_collection (
  id SERIAL PRIMARY KEY,
  title_bangla VARCHAR(200) NOT NULL,
  title_english VARCHAR(200) NOT NULL,
  title_arabic VARCHAR(200) NOT NULL,
  dhikr_text_arabic TEXT NOT NULL,
  bangla_transliteration TEXT,
  english_transliteration TEXT,
  translation_bangla TEXT NOT NULL,
  translation_english TEXT NOT NULL,
  count_recommendation INTEGER CHECK (count_recommendation > 0),
  category_bangla VARCHAR(100),
  category_english VARCHAR(100),
  benefits_bangla TEXT,
  benefits_english TEXT,
  reference_bangla VARCHAR(200),
  reference_english VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- USER DHIKR LOGS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS user_dhikr_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dhikr_id INTEGER REFERENCES dhikr_collection(id) ON DELETE CASCADE,
  count INTEGER NOT NULL CHECK (count > 0),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- MOSQUES TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS mosques (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_bangla VARCHAR(200) NOT NULL,
  name_english VARCHAR(200),
  address_bangla TEXT,
  address_english TEXT,
  city VARCHAR(100) NOT NULL,
  city_bangla VARCHAR(100),
  area_bangla VARCHAR(100),
  area_english VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Bangladesh',
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone VARCHAR(20),
  website VARCHAR(200),
  iftar_time TIME,
  taraweeh_time TIME,
  facilities JSONB DEFAULT '{}',
  description_bangla TEXT,
  description_english TEXT,
  image_url VARCHAR(500),
  verified BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- USER FAVORITE MOSQUES TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS user_favorite_mosques (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mosque_id UUID REFERENCES mosques(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, mosque_id)
);

-- ==============================================
-- PRAYER TIME CACHE TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS prayer_time_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  date DATE NOT NULL,
  calculation_method VARCHAR(50) NOT NULL,
  madhab VARCHAR(10),
  timings JSONB NOT NULL,
  hijri_date JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(latitude, longitude, date, calculation_method, madhab)
);

-- ==============================================
-- NAMAZ STEPS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS namaz_steps (
  id SERIAL PRIMARY KEY,
  prayer_name_bangla VARCHAR(50) NOT NULL,
  prayer_name_english VARCHAR(50) NOT NULL,
  step_number INTEGER NOT NULL CHECK (step_number > 0),
  step_title_bangla VARCHAR(200) NOT NULL,
  step_title_english VARCHAR(200) NOT NULL,
  step_description_bangla TEXT NOT NULL,
  step_description_english TEXT NOT NULL,
  arabic_text TEXT,
  bangla_transliteration TEXT,
  english_transliteration TEXT,
  translation_bangla TEXT,
  translation_english TEXT,
  image_url VARCHAR(500),
  video_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- CREATE INDEXES
-- ==============================================
CREATE INDEX IF NOT EXISTS idx_worship_logs_user_date ON worship_logs(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_quran_ayahs_surah ON quran_ayahs(surah_id, ayah_number);
CREATE INDEX IF NOT EXISTS idx_duas_category ON duas(category_english);
CREATE INDEX IF NOT EXISTS idx_prayer_cache_date ON prayer_time_cache(date DESC);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks ON user_quran_bookmarks(user_id, surah_id);

-- ==============================================
-- CREATE UPDATED_AT TRIGGER FUNCTION
-- ==============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at 
  BEFORE UPDATE ON user_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_worship_logs_updated_at ON worship_logs;
CREATE TRIGGER update_worship_logs_updated_at 
  BEFORE UPDATE ON worship_logs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_mosques_updated_at ON mosques;
CREATE TRIGGER update_mosques_updated_at 
  BEFORE UPDATE ON mosques 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================

-- Enable RLS on user tables
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE worship_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quran_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quran_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorite_duas ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_dhikr_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorite_mosques ENABLE ROW LEVEL SECURITY;

-- User Preferences Policies
DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
CREATE POLICY "Users can view own preferences" ON user_preferences FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;
CREATE POLICY "Users can insert own preferences" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
CREATE POLICY "Users can update own preferences" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- Worship Logs Policies
DROP POLICY IF EXISTS "Users can view own worship logs" ON worship_logs;
CREATE POLICY "Users can view own worship logs" ON worship_logs FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own worship logs" ON worship_logs;
CREATE POLICY "Users can insert own worship logs" ON worship_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own worship logs" ON worship_logs;
CREATE POLICY "Users can update own worship logs" ON worship_logs FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own worship logs" ON worship_logs;
CREATE POLICY "Users can delete own worship logs" ON worship_logs FOR DELETE USING (auth.uid() = user_id);

-- Quran Bookmarks Policies
DROP POLICY IF EXISTS "Users can view own bookmarks" ON user_quran_bookmarks;
CREATE POLICY "Users can view own bookmarks" ON user_quran_bookmarks FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own bookmarks" ON user_quran_bookmarks;
CREATE POLICY "Users can insert own bookmarks" ON user_quran_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own bookmarks" ON user_quran_bookmarks;
CREATE POLICY "Users can delete own bookmarks" ON user_quran_bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Quran Progress Policies
DROP POLICY IF EXISTS "Users can view own progress" ON user_quran_progress;
CREATE POLICY "Users can view own progress" ON user_quran_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON user_quran_progress;
CREATE POLICY "Users can insert own progress" ON user_quran_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON user_quran_progress;
CREATE POLICY "Users can update own progress" ON user_quran_progress FOR UPDATE USING (auth.uid() = user_id);

-- Favorite Duas Policies
DROP POLICY IF EXISTS "Users can view own favorite duas" ON user_favorite_duas;
CREATE POLICY "Users can view own favorite duas" ON user_favorite_duas FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own favorite duas" ON user_favorite_duas;
CREATE POLICY "Users can insert own favorite duas" ON user_favorite_duas FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own favorite duas" ON user_favorite_duas;
CREATE POLICY "Users can delete own favorite duas" ON user_favorite_duas FOR DELETE USING (auth.uid() = user_id);

-- Dhikr Logs Policies
DROP POLICY IF EXISTS "Users can view own dhikr logs" ON user_dhikr_logs;
CREATE POLICY "Users can view own dhikr logs" ON user_dhikr_logs FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own dhikr logs" ON user_dhikr_logs;
CREATE POLICY "Users can insert own dhikr logs" ON user_dhikr_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Favorite Mosques Policies
DROP POLICY IF EXISTS "Users can view own favorite mosques" ON user_favorite_mosques;
CREATE POLICY "Users can view own favorite mosques" ON user_favorite_mosques FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own favorite mosques" ON user_favorite_mosques;
CREATE POLICY "Users can insert own favorite mosques" ON user_favorite_mosques FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own favorite mosques" ON user_favorite_mosques;
CREATE POLICY "Users can delete own favorite mosques" ON user_favorite_mosques FOR DELETE USING (auth.uid() = user_id);

-- Public read access for reference data
DROP POLICY IF EXISTS "Anyone can view surahs" ON quran_surahs;
CREATE POLICY "Anyone can view surahs" ON quran_surahs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view ayahs" ON quran_ayahs;
CREATE POLICY "Anyone can view ayahs" ON quran_ayahs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view duas" ON duas;
CREATE POLICY "Anyone can view duas" ON duas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view dhikr" ON dhikr_collection;
CREATE POLICY "Anyone can view dhikr" ON dhikr_collection FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view mosques" ON mosques;
CREATE POLICY "Anyone can view mosques" ON mosques FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view namaz steps" ON namaz_steps;
CREATE POLICY "Anyone can view namaz steps" ON namaz_steps FOR SELECT USING (true);

-- Authenticated users can add mosques
DROP POLICY IF EXISTS "Authenticated users can add mosques" ON mosques;
CREATE POLICY "Authenticated users can add mosques" ON mosques FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ==============================================
-- SCHEMA COMPLETE
-- ==============================================
-- All tables, indexes, triggers, and security policies created successfully!
