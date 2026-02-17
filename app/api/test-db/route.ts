import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        // Get counts from each table
        const tables = ['quran_surahs', 'duas', 'mosques', 'namaz_steps', 'dhikr_collection'];
        const results: any = {};

        for (const table of tables) {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            results[table] = {
                count: count || 0,
                error: error?.message || null
            };

            // Also get a sample record
            if (count && count > 0) {
                const { data } = await supabase
                    .from(table)
                    .select('*')
                    .limit(1);
                results[table].sample = data?.[0] || null;
            }
        }

        const totalRecords = Object.values(results).reduce((sum: number, table: any) => sum + (table.count || 0), 0);

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            tables: results,
            summary: {
                totalRecords,
                expectedRecords: 179,
                importComplete: totalRecords === 179,
                percentComplete: Math.round((totalRecords / 179) * 100)
            }
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
