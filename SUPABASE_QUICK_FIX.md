# 🔑 Quick Supabase Setup - Copy & Paste Guide

## Your Current .env.local:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://bjwdoqfacddvcogdkmbt.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ **Your credentials look correct!**

---

## 🚨 MOST IMPORTANT STEP: Restart Dev Server

**After changing .env.local, you MUST restart:**

1. **Stop Server:**
   - Terminal → Press `Ctrl+C`
   - Press again if needed
   - Wait for "Process terminated"

2. **Start Again:**
   ```bash
   npm run dev
   ```

3. **Test:**
   - Visit: http://localhost:3000/test-db
   - Should see ✅ green checkmarks

---

## Quick 3-Step Fix:

### Step 1: Get Your REAL Keys from Supabase

1. Go to: https://supabase.com/dashboard
2. Click your project
3. Settings (⚙️) → **API**
4. Copy:
   - **Project URL**
   - **anon public key**

### Step 2: Update .env.local

Replace with YOUR keys:
```bash
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL_HERE
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=YOUR_ANON_KEY_HERE
```

### Step 3: Restart & Test

```bash
# Stop server (Ctrl+C)
# Then run:
npm run dev

# Visit:
http://localhost:3000/test-db
```

---

## ✅ What Success Looks Like:

### In /test-db page:
- ✅ SUPABASE_URL: **Set**
- ✅ SUPABASE_PUBLISHABLE_DEFAULT_KEY: **Set**
- 🔵 "Connected (No Data Yet)" ← This is good!

OR

- ✅ "Connected Successfully!" ← Even better!

---

## ❌ Common Errors & Fixes:

### Error: "Cannot find module '@supabase/ssr'"
**Fix:** Run: `npm install`

### Error: Variables show "Missing"
**Fix:** 
1. Check `.env.local` is in root folder
2. **Restart dev server** (very important!)

### Error: "Connection Failed"
**Fix:**
1. Verify keys are correct (no typos)
2. Restart server
3. Check Supabase project is active

---

## 📞 Need Help?

1. Open: `/test-db` in browser
2. Take screenshot
3. Share the error message

---

**Full detailed guide:** See `SUPABASE_CONNECTION_GUIDE.md`
