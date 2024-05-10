import { defineConfig } from 'vite';

import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import biomePlugin from 'vite-plugin-biome';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		// testing on other devices in the network
		host: '0.0.0.0',
		proxy: {
			"/api": {
				target: 'http://localhost:3920',
				changeOrigin: true,
			},
		},
	},
	plugins: [
		react(),
		biomePlugin(),
		TanStackRouterVite({
			quoteStyle: 'single',
		}),
	],
	resolve: {
		alias: {
			'@': '/src',
			'@components': '/src/components',
			'@routes': '/src/routes',
			'@utils': '/src/utils',
			'@modals': '/src/modals',
			'@assets': '/src/assets',
			'@models': '/src/models',
		},
	},
});
