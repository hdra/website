// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://hendra.dev',
	vite: {
		server: {
			allowedHosts: ['.ts.net'],
		},
	},
});
