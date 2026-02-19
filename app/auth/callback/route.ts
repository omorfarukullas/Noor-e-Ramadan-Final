import { createClient } from '@/utils/supabase/server';
import { getURL } from '@/utils/get-url';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/';
    // Clean up next path to avoid double slashes if getURL returns trailing slash
    const nextPath = next.startsWith('/') ? next.slice(1) : next;

    if (code) {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${getURL()}${nextPath}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${getURL()}auth/auth-code-error`);
}
