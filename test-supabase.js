// Test Supabase connection
import { createClient } from './utils/supabase/client';

const supabase = createClient();

async function testSupabaseConnection() {
    console.log('Testing Supabase connection...');

    try {
        // Test database connection by querying a table
        const { data, error } = await supabase
            .from('quran_surahs')
            .select('count')
            .limit(1);

        if (error) {
            console.error('❌ Connection failed:', error.message);
            return false;
        }

        console.log('✅ Supabase connection successful!');
        console.log('Database is ready.');
        return true;
    } catch (err) {
        console.error('❌ Connection error:', err);
        return false;
    }
}

// Run test if executed directly
if (require.main === module) {
    testSupabaseConnection();
}

export { testSupabaseConnection };
