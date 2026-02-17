import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Islamic Green Palette
                primary: {
                    DEFAULT: '#059669',
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    200: '#A7F3D0',
                    300: '#6EE7B7',
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065F46',
                    900: '#064E3B',
                },
                // Neutral Colors
                background: {
                    light: '#F9FAFB',
                    dark: '#111827',
                },
                card: {
                    light: '#FFFFFF',
                    dark: '#1F2937',
                },
                border: {
                    light: '#E5E7EB',
                    dark: '#374151',
                },
                status: {
                    success: '#10B981',
                    warning: '#F59E0B',
                    error: '#EF4444',
                    info: '#3B82F6',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'var(--font-hind-siliguri)', 'system-ui', 'sans-serif'],
                bengali: ['var(--font-hind-siliguri)', 'sans-serif'],
                arabic: ['var(--font-amiri)', 'serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
