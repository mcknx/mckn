/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "rgb(0 4 15 / var(--tw-bg-opacity))",
				secondary: {
					100: "#E2E2D5",
					200: "#888883",
				},
			},
		},
	},
	variants: {},
	plugins: [],
};
