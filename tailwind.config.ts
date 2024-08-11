import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					50: "var(--pv-primary-50)",
					100: "var(--pv-primary-100)",
					200: "var(--pv-primary-200)",
					300: "var(--pv-primary-300)",
					400: "var(--pv-primary-400)",
					500: "var(--pv-primary-500)",
					600: "var(--pv-primary-600)",
					700: "var(--pv-primary-700)",
					800: "var(--pv-primary-800)",
					900: "var(--pv-primary-900)",
					950: "var(--pv-primary-950)",
				},
				surface: {
					0: "var(--pv-surface-0)",
					50: "var(--pv-surface-50)",
					100: "var(--pv-surface-100)",
					200: "var(--pv-surface-200)",
					300: "var(--pv-surface-300)",
					400: "var(--pv-surface-400)",
					500: "var(--pv-surface-500)",
					600: "var(--pv-surface-600)",
					700: "var(--pv-surface-700)",
					800: "var(--pv-surface-800)",
					900: "var(--pv-surface-900)",
					950: "var(--pv-surface-950)",
				},
				danger: "var(--pv-red-500)",
				success: "var(--pv-green-500)",
			},
		},
		fontFamily: {
			body: ["Inter", "sans-serif"],
			sans: ["Inter", "sans-serif"],
		},
	},
	plugins: [],
};

export default config;
