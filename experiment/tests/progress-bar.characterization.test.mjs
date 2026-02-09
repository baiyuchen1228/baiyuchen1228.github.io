import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadLegacyScript } from './helpers/load-legacy-script.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const progressBarScriptPath = path.resolve(__dirname, '../js/progress_bar.js');

let progressCtx;

describe('progress_bar.js characterization', () => {
	beforeEach(() => {
		document.body.innerHTML = '<div id="myBar" style="width: 0%"></div>';
		vi.useFakeTimers();
		progressCtx = loadLegacyScript(progressBarScriptPath, {
			document,
			setInterval,
			clearInterval,
		});
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('move animates to 100 then resets width back to 0%', () => {
		const bar = document.getElementById('myBar');

		progressCtx.move();
		vi.advanceTimersByTime(1200);

		expect(bar.style.width).toBe('0%');

		progressCtx.move();
		vi.advanceTimersByTime(10);
		expect(bar.style.width).toBe('1%');
	});

	it('second move call while running is ignored by guard', () => {
		const bar = document.getElementById('myBar');

		progressCtx.move();
		progressCtx.move();
		vi.advanceTimersByTime(10);

		expect(bar.style.width).toBe('1%');
	});
});
