/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.04em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.03em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '600' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '600' }],
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0em', fontWeight: '700' }],
                '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '800' }],
                '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '900' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.05em', fontWeight: '900' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.06em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.07em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: ["system-ui", "-apple-system", "sans-serif"],
                paragraph: ["system-ui", "-apple-system", "sans-serif"],
                roboto: ["roboto", "sans-serif"],
                montserrat: ["montserrat", "sans-serif"]
            },
            colors: {
                // Contiki brand colors
                primary: '#FF6B35',
                'primary-dark': '#E55A2B',
                'primary-light': '#FF8C5A',
                secondary: '#00A8E8',
                'secondary-dark': '#0088B8',
                'secondary-light': '#33BFFF',
                accent: '#9D4EDD',
                'accent-light': '#C77DFF',
                success: '#06D6A0',
                warning: '#FFB703',
                destructive: '#FF3366',
                destructiveforeground: '#ffffff',
                background: '#FFFFFF',
                foreground: '#1A1A1A',
                cardbackground: '#F8F9FA',
                'secondary-foreground': '#262626',
                'primary-foreground': '#FFFFFF',
                border: '#E5E7EB',
                muted: '#6B7280',
                'muted-foreground': '#9CA3AF',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
