/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f1e8',
        sage: '#dce6c8',
        olive: '#b7bea5',
        charcoal: '#3a3a3a',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'ui-serif', 'serif'],
        body: ['Montserrat', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
