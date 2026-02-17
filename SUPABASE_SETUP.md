# Supabase Setup Instructions

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Enter the following details:
   - **Name:** noor-e-ramadan
   - **Database Password:** Omor.Ayesha.16.21.
   - **Region:** Singapore (closest to Bangladesh)
5. Click "Create new project" and wait 2-3 minutes

## Step 2: Run Database Schema

1. Once your project is created, go to **SQL Editor** from the left sidebar
2. Open the file `supabase/schema.sql` from this project
3. Copy the ENTIRE SQL content
4. Paste it into the Supabase SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for success message: "Success. No rows returned"
7. Go to **Table Editor** to verify all 14 tables were created:
   - user_preferences
   - worship_logs
   - quran_surahs
   - quran_ayahs
   - user_quran_bookmarks
   - user_quran_progress
   - duas
   - user_favorite_duas
   - dhikr_collection
   - user_dhikr_logs
   - mosques
   - user_favorite_mosques
   - prayer_time_cache
   - namaz_steps

## Step 3: Get API Keys

1. Go to **Settings** → **API** in Supabase dashboard
2. Copy the following values:

```
Project URL: https://[your-project-ref].supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc... (keep this secret!)
```

## Step 4: Configure Environment Variables

1. Create a file named `.env.local` in the project root
2. Add the following (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

3. Save the file

## Step 5: Enable Authentication

1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Email** provider
3. Under **URL Configuration**:
   - Site URL: `http://localhost:3000` (for development)
   - Redirect URLs: `http://localhost:3000/auth/callback`

## Step 6: Set up Storage (Optional)

1. Go to **Storage** in Supabase
2. Create bucket: `mosque-images` (public)
3. Create bucket: `user-avatars` (private)

## Step 7: Verify Setup

Run these SQL queries in SQL Editor to verify:

```sql
-- Check table count
SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';
-- Should return 14

-- Check RLS is enabled
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;
-- Should list 7 tables

-- Check policies exist
SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public';
-- Should be > 20
```

## Done!

Your Supabase backend is now ready. Next step is to seed the database with initial data (Quran, Duas, Mosques, etc.)

## Troubleshooting

**Error: "relation already exists"**
- This means you're running the schema twice. The schema uses `CREATE TABLE IF NOT EXISTS` so it should work, but if you modified it, you may need to drop tables first.

**Error: "permission denied"**
- Make sure RLS policies are created correctly
- Verify auth.uid() function is available

**Can't connect from Next.js:**
- Check `.env.local` file exists and has correct values
- Restart your dev server after adding .env.local
- Verify environment variable names start with `NEXT_PUBLIC_` for client-side access
