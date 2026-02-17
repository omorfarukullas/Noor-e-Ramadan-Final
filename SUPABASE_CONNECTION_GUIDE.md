# Complete Supabase Connection Guide

## 🔑 How to Get Your Supabase Anon Key (Step-by-Step)

### Step 1: Access Your Supabase Dashboard

1. **Go to Supabase**
   - Visit: https://supabase.com
   - Click **"Sign In"**
   - Log in with your account

2. **Select Your Project**
   - You should see your project: **"Noor e Ramadan"** (or similar)
   - Click on the project to open it

### Step 2: Get Your API Credentials

1. **Open Project Settings**
   - Look at the **left sidebar**
   - Click on the ⚙️ **Settings** icon (bottom of sidebar)
   - Click **"API"** in the settings menu

2. **Copy Your Credentials**
   
   You'll see two important sections:

   **A. Project URL**
   - Look for: "Project URL" or "API Settings"
   - Copy the URL (looks like: `https://xxxxx.supabase.co`)
   
   **B. Project API Keys**
   - You'll see multiple keys:
     - ✅ **anon/public key** - This is what we need!
     - 🔐 service_role key - Don't use this in frontend
   
   - Copy the **anon public** key (long string starting with `eyJ...`)

### Step 3: Update Your .env.local File

1. **Open `.env.local`** in your project root

2. **Replace with your actual credentials:**

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_ANON_KEY
```

**Replace:**
- `YOUR_PROJECT_ID.supabase.co` with your actual URL
- `eyJhbGciOi...YOUR_ANON_KEY` with your actual anon key

3. **Save the file** (Ctrl+S or Cmd+S)

### Step 4: Restart Your Development Server

**IMPORTANT:** Environment variables only load when the server starts!

1. **Stop the current server:**
   - Go to your terminal
   - Press `Ctrl+C` (twice if needed)
   - Wait until it fully stops

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Wait for it to compile** (should see "Ready" message)

### Step 5: Verify Connection

1. **Open your browser**
   - Visit: http://localhost:3000/test-db

2. **Check the results:**
   
   ✅ **Success Signs:**
   - Green checkmark for SUPABASE_URL
   - Green checkmark for SUPABASE_PUBLISHABLE_DEFAULT_KEY
   - "Connected (No Data Yet)" or "Connected Successfully!"

   ❌ **Error Signs:**
   - Red X for environment variables
   - "Connection Failed" message
   - Error text in red box

---

## 🔍 Troubleshooting

### Problem 1: Environment Variables Show "❌ Missing"

**Solution:**
1. Make sure `.env.local` is in the **root directory** (same level as `package.json`)
2. File must be named **exactly** `.env.local` (with the dot at the start)
3. No spaces in the key names
4. **Restart the dev server** after saving

### Problem 2: "Connection Failed" Error

**Possible Causes:**

1. **Wrong Key Name**
   - ❌ `NEXT_PUBLIC_SUPABASE_ANON_KEY` (old name)
   - ✅ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (correct name)

2. **Invalid Credentials**
   - Check if you copied the full key (it's very long!)
   - Make sure there are no extra spaces
   - Verify URL has `https://` at the start

3. **Database Not Set Up**
   - The connection works, but tables don't exist yet
   - See "Step 6: Run Database Schema" below

### Problem 3: Tables Don't Exist

**Error:** `relation "user_preferences" does not exist`

**Solution:** You need to run the database schema!

---

## 📊 Step 6: Run Database Schema (First Time Only)

1. **Go to Supabase Dashboard**
   - Click your project
   - Click **"SQL Editor"** in left sidebar

2. **Create New Query**
   - Click **"+ New Query"** button

3. **Copy the Schema**
   - Open `supabase/schema.sql` from your project
   - **Select ALL** the content (Ctrl+A)
   - **Copy** it (Ctrl+C)

4. **Paste and Run**
   - **Paste** into the SQL Editor (Ctrl+V)
   - Click **"Run"** button (or press Ctrl+Enter)
   - Wait for completion (~5-10 seconds)

5. **Verify Success**
   - Should see: ✅ "Success. No rows returned"
   - Click **"Table Editor"** in sidebar
   - Should see **14 tables** created

---

## ✅ Final Verification Checklist

- [ ] Copied URL from Supabase dashboard
- [ ] Copied anon key from Supabase dashboard
- [ ] Updated `.env.local` with real credentials
- [ ] Saved `.env.local` file
- [ ] **Restarted dev server** (npm run dev)
- [ ] Visited http://localhost:3000/test-db
- [ ] See green checkmarks for both variables
- [ ] (Optional) Ran database schema
- [ ] See success message or "No Data Yet"

---

## 📸 Visual Guide

### Where to Find Your Keys in Supabase:

```
Supabase Dashboard
├─ 🏠 Home
├─ 📊 Table Editor
├─ 🔧 SQL Editor
└─ ⚙️ Settings (Click Here!)
    ├─ General
    ├─ Database
    ├─ ➡️ API (Click Here!)  <--- YOUR KEYS ARE HERE
    ├─ Authentication
    └─ Storage
```

In the API page you'll see:

```
Project URL
┌─────────────────────────────────────────┐
│ https://xxxxx.supabase.co               │  <-- Copy this
└─────────────────────────────────────────┘

Project API keys
┌─────────────────────────────────────────┐
│ anon public                              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...  │  <-- Copy this
│ [Reveal/Copy button]                     │
└─────────────────────────────────────────┘
```

---

## 🎯 Quick Test Commands

After setting everything up, test in your browser console (F12):

```javascript
// Check if env vars are loaded
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
// Should output: "https://xxxxx.supabase.co"

console.log(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)
// Should output: "eyJhbG..." (your key)
```

---

## 💡 Common Mistakes to Avoid

1. ❌ Using the **service_role** key instead of **anon** key
2. ❌ Forgetting to **restart the server** after changing .env.local
3. ❌ Having **spaces** before or after the = sign
4. ❌ Using quotes around the values (not needed)
5. ❌ Wrong file name (.env instead of .env.local)
6. ❌ Trying to use keys without running the database schema

---

## 📞 Still Having Issues?

1. **Check the console logs:**
   - Open browser DevTools (F12)
   - Look for red errors
   - Share the error message

2. **Verify your .env.local format:**
   ```bash
   # Correct format:
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGci...
   
   # No quotes, no spaces, just KEY=value
   ```

3. **Test the connection separately:**
   - Visit: http://localhost:3000/test-db
   - Take a screenshot of the page
   - Share what you see

---

**Once you complete these steps, your Supabase connection will be working! 🎉**
