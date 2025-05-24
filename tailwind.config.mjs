import { defineConfig } from 'tailwindcss';

export default defineConfig({
    content: ['./src/**/*.{astro,html,js,ts}'],
    theme: {
        extend: {
            colors: {
                bg: 'var(--color-bg)',
                text: 'var(--color-text)',
                primary: 'var(--color-primary)',
                'primary-hover': 'var(--color-primary-hover)',
                border: 'var(--color-border)',
                muted: 'var(--color-muted)',
            },
        },
    },
});
