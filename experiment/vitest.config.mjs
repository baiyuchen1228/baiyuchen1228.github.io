import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['tests/**/*.test.mjs'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html'],
			include: ['exp*/js/*.js', 'shared/js/*.{js,mjs}', 'shared/js/core/*.{js,mjs}', 'module/menu.js', 'js/progress_bar.js'],
		},
	},
});
