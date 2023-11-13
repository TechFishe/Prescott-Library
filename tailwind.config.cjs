/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			height: {
				'fullscreen': "calc(100vh - 8rem)",
				'fullscreen-1/3': "calc((100vh - 8rem - 16.666667vw) / 3)",
				'fullscreen-2/3': "calc(2 * (100vh - 8rem - 16.666667vw) / 3)"
			},
			minHeight: {
				'fullscreen': "calc(100vh - 8rem)",
				"1/2": "50%"
			},
			maxHeight: {
				'fullscreen': "calc(100vh - 8rem)"
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
				
			},
			screens: {
				"mdTall": "896px",
				"3xl": "1792px"
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}
