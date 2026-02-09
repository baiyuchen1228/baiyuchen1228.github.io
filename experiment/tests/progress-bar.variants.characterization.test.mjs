import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadLegacyScript } from './helpers/load-legacy-script.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const variantScripts = [
	'../shared/js/progress_bar.js',
	'../exp3/js/progress_bar.js',
	'../exp5/js/progress_bar.js',
	'../exp6/js/progress_bar.js',
];

function runVariant(relPath) {
	document.body.innerHTML = '<div id="myBar" style="width: 0%"></div>';
	const scriptPath = path.resolve(__dirname, relPath);
	const ctx = loadLegacyScript(scriptPath, {
		document,
		setInterval,
		clearInterval,
	});
	const bar = document.getElementById('myBar');

	ctx.move();
	vi.advanceTimersByTime(1200);
	expect(bar.style.width).toBe('0%');

	ctx.move();
	vi.advanceTimersByTime(10);
	expect(bar.style.width).toBe('1%');
}

describe('progress bar script variants', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	for (const relPath of variantScripts) {
		it(`keeps the same animation guard behavior: ${relPath}`, () => {
			runVariant(relPath);
		});
	}
});
