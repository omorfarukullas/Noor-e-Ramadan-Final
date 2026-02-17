# Supabase Database Setup Guide

## Quick Setup (5 minutes)

### Step 1: Access Your Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Open your **Noor e Ramadan** project

### Step 2: Run the Database Schema
1. Click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file: `supabase/schema.sql` from your project
4. **Copy all the SQL code** (it's ~440 lines)
5. **Paste it** into the Supabase SQL editor
6. Click **RUN** button

**Expected result:** You'll see "Success" message and 14 new tables created.

### Step 3: Verify Tables Created
Click **Table Editor** in sidebar. You should see these 14 tables:

✅ Tables Created:
- `user_preferences`
- `worship_logs`
- `quran_surahs`
- `quran_ayahs`
- `user_quran_bookmarks`
- `user_quran_progress`
- `duas`
- `user_favorite_duas`
- `dhikr_collection`
- `user_dhikr_logs`
- `mosques`
- `user_favorite_mosques`
- `prayer_time_cache`
- `namaz_steps`

### Step 4: Check Row Level Security (RLS)
1. Click any table (e.g., `user_preferences`)
2. Look for 🔒 icon indicating RLS is enabled
3. All user tables should have RLS policies

---

## What the Schema Includes

### Core Features
- **Quran Data**: 114 surahs, 6,236 ayahs
- **Duas Collection**: 150+ authentic duas
- **Mosques**: Bangladesh mosque database
- **Worship Tracking**: Prayer logs, Quran progress
- **User Preferences**: All settings and customizations

### Security
- ✅ Row Level Security (RLS) on all tables
- ✅ User-specific data protection
- ✅ Proper foreign key constraints
- ✅ Indexes for performance

---

## Optional: Seed Sample Data

After running the schema, you can add sample data:

### Add Sample Duas (Optional)
```sql
INSERT INTO duas (category, title_en, title_bn, arabic, transliteration, translation_en, translation_bn)
VALUES 
('Daily Life', 'Before eating', 'খাওয়ার আগে', 'بِسْمِ اللهِ', 'Bismillah', 'In the name of Allah', 'আল্লাহর নামে'),
('Daily Life', 'After eating', 'খাওয়ার পরে', 'الْحَمْدُ لِلَّهِ', 'Alhamdulillah', 'Praise be to Allah', 'সমস্ত প্রশংসা আল্লাহ');
```

### Add Famous Bangladesh Mosques (Optional)
```sql
INSERT INTO mosques (name, name_bn, address, city, latitude, longitude, is_verified)
VALUES 
('Baitul Mukarram', 'বায়তুল মোকাররম', 'Paltan', 'Dhaka', 23.7341, 90.4073, TRUE),
('Star Mosque', 'তারা মসজিদ', 'Armanitola', 'Dhaka', 23.7145, 90.4222, TRUE);
```

---

## Troubleshooting

### ❌ Error: "relation already exists"
**Solution:** Tables already created. Skip this step or drop tables first.

### ❌ Error: "permission denied"
**Solution:** Make sure you're project owner or have admin access.

### ❌ RLS preventing data access
**Solution:** RLS policies require authenticated users. Test with authentication enabled.

---

## Next Steps After Database Setup

1. ✅ Database schema is ready
2. 🔄 (Optional) Add sample data
3. 🔄 Enable Supabase Authentication
4. 🔄 Test API calls from your app
5. 🔄 Deploy to production

---

## Connection Info

Your app is already configured! Check `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

**The database is ready to use once the schema is run!**

---

**Need help?** Check `SUPABASE_SETUP.md` or contact support.
