import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/tracker';
    // Clean up next path to avoid double slashes if getURL returns trailing slash
    const nextPath = next.startsWith('/') ? next.slice(1) : next;

    if (code) {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            console.log('✅ Auth success, FORCE redirecting to tracker');
            // Resolve the origin dynamically from the request URL to keep session cookies working
            const requestUrl = new URL(request.url);
            const target = `${requestUrl.origin}/tracker`;
            console.log('Target URL:', target);
            return NextResponse.redirect(target);
        } else {
            console.error('❌ Auth error during exchange:', error);
        }
    } else {
        console.error('❌ No code found in callback URL');
    }

    // return the user to an error page with instructions
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error`);
}
