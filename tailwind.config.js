/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khamoun: {
          primary: '#8241b0', // Purple
          secondary: '#d62839', // Red
          accent: '#6fb041', // Green
        },
        "on-primary-container": "#003e58",
        "surface-container-high": "#eae8e4",
        "surface-container-low": "#f5f3ef",
        "on-primary": "#ffffff",
        "primary": "#00658d",
        "on-secondary-fixed-variant": "#930100",
        "secondary-container": "#eb0000",
        "secondary": "#bc0100",
        "on-error-container": "#93000a",
        "on-surface-variant": "#3e4850",
        "on-primary-fixed": "#001e2d",
        "inverse-on-surface": "#f2f0ed",
        "surface-dim": "#dbdad6",
        "on-secondary-fixed": "#410000",
        "error": "#ba1a1a",
        "on-surface": "#1b1c1a",
        "primary-container": "#00aeef",
        "inverse-primary": "#82cfff",
        "surface-bright": "#fbf9f5",
        "surface-container-lowest": "#ffffff",
        "on-tertiary": "#ffffff",
        "on-secondary-container": "#fffbff",
        "on-secondary": "#ffffff",
        "on-background": "#1b1c1a",
        "background": "#fbf9f5",
        "on-tertiary-container": "#572f00",
        "primary-fixed-dim": "#82cfff",
        "surface-container-highest": "#e4e2de",
        "inverse-surface": "#30312e",
        "tertiary": "#8d4f00",
        "on-tertiary-fixed-variant": "#6b3b00",
        "surface": "#fbf9f5",
        "tertiary-fixed-dim": "#ffb876",
        "primary-fixed": "#c6e7ff",
        "tertiary-container": "#ea8c21",
        "secondary-fixed-dim": "#ffb4a8",
        "error-container": "#ffdad6",
        "on-primary-fixed-variant": "#004c6b",
        "secondary-fixed": "#ffdad4",
        "surface-variant": "#e4e2de",
        "tertiary-fixed": "#ffdcc0",
        "on-error": "#ffffff",
        "on-tertiary-fixed": "#2d1600",
        "surface-tint": "#00658d",
        "surface-container": "#efeeea",
        "outline-variant": "#bdc8d1",
        "outline": "#6e7881"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      boxShadow: {
        'soft-ink': '0px 20px 40px rgba(27, 28, 26, 0.06)',
      }
    },
  },
  plugins: [],
}
