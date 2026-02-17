# 🚀 Quick Import Guide - Supabase Seed Data

Follow these steps to import all 179 records into your database.

---

## ⏱️ Quick Version (5 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to: **https://kvmvfcoviozxmtmbovgl.supabase.co**
2. Sign in to your account
3. Click **SQL Editor** in the left sidebar
4. Click **New Query** button

### Step 2: Import Files in Order

Copy and paste each file's content, then click **Run** (or press Ctrl+Enter):

#### 1️⃣ Quran Surahs (114 records)
- Open: `utils/supabase/seeds/quran_surahs_seed.sql`
- Copy ALL content (Ctrl+A, Ctrl+C)
- Paste into Supabase SQL Editor
- Click **Run**
- ✅ Should see: "Success. No rows returned"

#### 2️⃣ Duas Collection (21 records)
- Open: `utils/supabase/seeds/duas_seed.sql`
- Copy ALL content
- Paste into SQL Editor (clear previous query first)
- Click **Run**
- ✅ Should see success message

#### 3️⃣ Mosques (13 records)
- Open: `utils/supabase/seeds/mosques_seed.sql`
- Copy ALL content
- Paste and Run
- ✅ Should see success

#### 4️⃣ Namaz Steps (21 records)
- Open: `utils/supabase/seeds/namaz_steps_seed.sql`
- Copy ALL content
- Paste and Run
- ✅ Should see success

#### 5️⃣ Dhikr Collection (10 records)
- Open: `utils/supabase/seeds/dhikr_collection_seed.sql`
- Copy ALL content
- Paste and Run
- ✅ Should see success

### Step 3: Verify Import

Paste this verification query and run it:

```sql
SELECT 
  (SELECT COUNT(*) FROM quran_surahs) as surahs,
  (SELECT COUNT(*) FROM duas) as duas,
  (SELECT COUNT(*) FROM mosques) as mosques,
  (SELECT COUNT(*) FROM namaz_steps) as steps,
  (SELECT COUNT(*) FROM dhikr_collection) as dhikr;
```

**Expected Result:**
```
surahs: 114
duas: 21
mosques: 13
steps: 21
dhikr: 10
```

**Total: 179 records** ✅

---

## 📊 Alternative: Test From Your App

After importing, refresh this URL to see the updated counts:
```
http://localhost:3000/api/test-db
```

You should see all tables with their counts > 0.

---

## ⚠️ Troubleshooting

### "Relation does not exist" error
- Make sure you ran the main `schema.sql` file first
- Go to **SQL Editor** → Run `utils/supabase/schema.sql`

### "Duplicate key value" error
- Data is already imported (this is safe to ignore)
- The seed files use `ON CONFLICT DO NOTHING`

### Connection timeout
- Try smaller files first (dhikr, namaz_steps)
- Then run larger files (quran_surahs, duas)

---

## ✅ After Import

Once all data is imported:

1. **Verify** tables in Supabase Dashboard → **Table Editor**
2. **Update** React components to fetch from database
3. **Test** each feature with real data

---

**Import time:** ~5 minutes total  
**Ready to start? Begin with Step 1!** 🚀
