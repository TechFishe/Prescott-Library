/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			height: {
				'fullscreen': "calc(100vh - 7rem)"
			},
			minHeight: {
				'fullscreen': "calc(100vh - 7rem)"
			},
			colors: {
				'burgundy': {
					'50': '#fff1f3',
					'100': '#ffdfe4',
					'200': '#ffc4cd',
					'300': '#ff9aaa',
					'400': '#ff617a',
					'500': '#ff2f50',
					'600': '#f21034',
					'700': '#cc0928',
					'800': '#a80c25',
					'900': '#720e1e', //Normal
					'950': '#4c030f',
				},
				
			}
		},
	},
	plugins: [],
}
