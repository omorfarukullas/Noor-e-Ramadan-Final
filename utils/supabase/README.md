# Supabase Utilities

Organized Supabase utilities for the Noor e Ramadan application.

## 📂 Folder Structure

```
utils/supabase/
├── index.ts           # Main export file (import from here)
├── client.ts          # Browser/client-side Supabase client
├── server.ts          # Server-side Supabase client
├── middleware.ts      # Middleware Supabase client
├── database.ts        # Database helper functions
├── types.ts           # TypeScript types for all tables
└── schema.sql         # Database schema (run in Supabase dashboard)
```

## 🚀 Usage

### Import Everything from Index

```typescript
// Recommended: Import from index
import { 
  createBrowserClient,
  createServerClient,
  getUserPreferences,
  type UserPreferences
} from '@/utils/supabase'
```

### Or Import Individually

```typescript
// Browser client (use in 'use client' components)
import { createClient } from '@/utils/supabase/client'

// Server client (use in server components/API routes)
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// Middleware client (use in middleware.ts)
import { createClient } from '@/utils/supabase/middleware'
```

## 📖 Examples

### Server Component Example

```typescript
import { createServerClient, getUserPreferences } from '@/utils/supabase'
import { cookies } from 'next/headers'

export default async function Page() {
  // Direct database query
  const cookieStore = await cookies()
  const supabase = createServerClient(cookieStore)
  const { data } = await supabase.from('table').select()
  
  // Or use helper function
  const { data: prefs } = await getUserPreferences('user-id')
  
  return <div>{/* ... */}</div>
}
```

### Client Component Example

```typescript
'use client'
import { createBrowserClient } from '@/utils/supabase'

const supabase = createBrowserClient()
const { data } = await supabase.from('table').select()
```

### Using Database Helpers

```typescript
import { 
  getUserPreferences,
  getWorshipLogs,
  getDuas,
  getMosques 
} from '@/utils/supabase'

// Get user preferences
const { data, error } = await getUserPreferences(userId)

// Get worship logs for a specific date
const { data: logs } = await getWorshipLogs(userId, '2024-01-15')

// Get duas by category
const { data: duas } = await getDuas('Daily Life')

// Get nearby mosques
const { data: mosques } = await getNearbyMosques(23.8103, 90.4125, 5)
```

### Using TypeScript Types

```typescript
import type { UserPreferences, Mosque, Dua } from '@/utils/supabase'

const preferences: UserPreferences = {
  user_id: 'abc123',
  location_city: 'Dhaka',
  calculation_method: 1,
  // ... other fields
}
```

## 🗂️ Available Database Helpers

### User Preferences
- `getUserPreferences(userId)` - Get user preferences
- `updateUserPreferences(userId, preferences)` - Update preferences

### Worship Logs
- `getWorshipLogs(userId, date?)` - Get worship logs
- `createWorshipLog(userId, logData)` - Create new log

### Duas
- `getDuas(category?)` - Get all duas or by category
- `getFavoriteDuas(userId)` - Get user's favorite duas

### Quran
- `getSurahs()` - Get all surahs
- `getAyahs(surahNumber)` - Get ayahs for a surah

### Mosques
- `getMosques(city?)` - Get mosques
- `getNearbyMosques(lat, lng, radiusKm)` - Get nearby mosques

### Prayer Times
- `getCachedPrayerTimes(city, date)` - Get cached prayer times
- `cachePrayerTimes(city, date, timesData)` - Cache prayer times

## 📝 TypeScript Types

All database table types are available:

- `UserPreferences`
- `WorshipLog`
- `QuranSurah`
- `QuranAyah`
- `Dua`
- `Mosque`
- `PrayerTimeCache`
- `NamazStep`
- `Database` (complete database type)

## 💾 Database Setup

### Run the Schema

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Open your project → **SQL Editor**
3. Click **New Query**
4. Copy all content from `utils/supabase/schema.sql`
5. Paste and click **Run**
6. ✅ Creates 14 tables with proper security

### Verify Tables

Click **Table Editor** to see:
- `user_preferences`, `worship_logs`
- `quran_surahs`, `quran_ayahs`
- `duas`, `mosques`
- And 8 more tables!

## 🔐 Environment Variables

Required in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key
```

## 📚 Documentation

For more information:
- See `SUPABASE_CONNECTION_GUIDE.md` for setup
- See `DATABASE_SETUP.md` for detailed schema info
- See `SUPABASE_STRUCTURE.md` for overview
