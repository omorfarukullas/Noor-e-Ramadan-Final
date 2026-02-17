# Database Seed Data - Complete Guide

## 📊 What's Included

We've created comprehensive seed data for your Noor e Ramadan database:

### ✅ Completed Seed Files

| File | Records | Description |
|------|---------|-------------|
| `quran_surahs_seed.sql` | 114 surahs | All Quran chapters with Arabic, Bangla & English names, revelation types, ayah counts, descriptions |
| `duas_seed.sql` | 21 duas | Authentic duas across 6 categories with full Arabic text, transliterations, translations, references |
| `mosques_seed.sql` | 13 mosques | Famous Bangladesh mosques including UNESCO sites with GPS coordinates and facilities |
| `namaz_steps_seed.sql` | 21 steps | Complete Wudu procedure (11 steps) and Fajr prayer guide (10 steps) |
| `dhikr_collection_seed.sql` | 10 dhikr | Common dhikr with recommended counts, benefits, and references |

**Total: 179 database records ready to import!**

---

## 🚀 How to Import Seed Data

### Method 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the content from each seed file **in this order**:
   - `quran_surahs_seed.sql` (run first)
   - `duas_seed.sql`
   - `mosques_seed.sql`
   - `namaz_steps_seed.sql`
   - `dhikr_collection_seed.sql`
5. Click **Run** button for each file
6. Verify success message appears

### Method 2: Command Line

```bash
# Make sure you have the schema already created
# Then run each seed file

psql -U postgres -d your_database -f utils/supabase/seeds/quran_surahs_seed.sql
psql -U postgres -d your_database -f utils/supabase/seeds/duas_seed.sql
psql -U postgres -d your_database -f utils/supabase/seeds/mosques_seed.sql
psql -U postgres -d your_database -f utils/supabase/seeds/namaz_steps_seed.sql
psql -U postgres -d your_database -f utils/supabase/seeds/dhikr_collection_seed.sql
```

---

## 📋 Seed Data Details

### 1. Quran Surahs (114 records)

**Fields included:**
- Arabic names (الفَاتِحَة, البَقَرَة, etc.)
- Bangla names (আল-ফাতিহা, আল-বাকারা, etc.)
- English names & transliterations
- Revelation type (Meccan/Medinan) in both languages
- Total ayah counts
- Detailed descriptions in Bangla & English

**Example:** Surah Al-Fatihah, Al-Baqarah, Yasin, Al-Mulk, etc.

### 2. Duas Collection (21 records)

**Categories:**
- **Daily Life** (6 duas): Before eating, after eating, sleeping, waking, leaving/entering home
- **Prayer** (4 duas): Opening prayer, Ruku, Sujood, between sujood
- **Morning/Evening** (2 duas): Ayatul Kursi, morning dhikr
- **Protection** (2 duas): From calamity, evil eye
- **Gratitude** (2 duas): Praise of Allah, constant remembrance
- **Ramadan** (2 duas): Breaking fast, Laylatul Qadr
- **Special Occasions** (3 duas): Travel, marriage, for the sick

**Each dua includes:**
- Arabic text with proper diacritics
- Bangla & English transliterations
- Bangla & English translations
- Hadith/Quran references
- Benefits/virtues

### 3. Mosques (13 records)

**Featured mosques:**
- **Baitul Mukarram** (National Mosque, Dhaka)
- **Star Mosque / Tara Masjid** (Historic, Dhaka)
- **Sixty Dome Mosque** (UNESCO World Heritage, Bagerhat)
- **Chawk Mosque** (Mughal-era, Dhaka)
- **Atia Mosque** (Tangail)
- And 8 more across Bangladesh

**Data includes:**
- Bangla & English names
- Full addresses
- GPS coordinates (latitude/longitude)
- Contact information
- Iftar and Taraweeh times
- Facilities (parking, AC, wheelchair access, etc.)
- Historical and descriptive information

### 4. Namaz Steps (21 records)

**Wudu (11 steps):**
1. Intention
2. Bismillah
3. Wash hands
4. Rinse mouth
5. Clean nose
6. Wash face
7. Wash arms
8. Wipe head
9. Wipe ears
10. Wash feet
11. Dua after wudu

**Fajr Prayer (10 steps):**
1. Takbir Tahrimah
2. Recite Sana
3. Surah Fatiha
4. Quranic verses
5. Ruku
6. Sujood
7. Second rakah
8. Tashahhud
9. Durood
10. Salam

### 5. Dhikr Collection (10 records)

**Common dhikr:**
- SubhanAllah (33x)
- Alhamdulillah (33x)
- Allahu Akbar (34x)
- La ilaha illallah (100x)
- Complete Tawhid statement (10x)
- Astaghfirullah (100x)
- Sayyidul Istighfar (1x)
- Durood Sharif (10x)
- La hawla wa la quwwata (7x)
- SubhanAllahil Azim (10x)

---

## ✅ Verification

After running the seed files, verify the data:

```sql
-- Check all tables
SELECT COUNT(*) as quran_surahs FROM quran_surahs;
SELECT COUNT(*) as duas FROM duas;
SELECT COUNT(*) as mosques FROM mosques;
SELECT COUNT(*) as namaz_steps FROM namaz_steps;
SELECT COUNT(*) as dhikr FROM dhikr_collection;

-- Expected counts:
-- quran_surahs: 114
-- duas: 21
-- mosques: 13
-- namaz_steps: 21
-- dhikr: 10
```

---

## 🔄 Next Steps

After importing seed data:

1. ✅ Verify all records imported correctly
2. 🔄 Update React components to fetch from Supabase
3. 🔄 Test each feature with real data
4. 🔄 Add more duas (goal: 150+)
5. 🔄 Add full Quran ayahs
6. 🔄 Add more mosques from different cities

---

## 📝 Notes

- All seed files use `ON CONFLICT DO NOTHING` to prevent duplicate entries
- Data is fully bilingual (Bangla & English)
- All Arabic text includes proper diacritical marks
- GPS coordinates are accurate for mosque locations
- References are from authentic Hadith collections

---

**Your database is now ready with comprehensive Islamic content!** 🌙
