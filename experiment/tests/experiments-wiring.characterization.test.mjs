import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const expIds = [2, 3, 5, 6, 7, 10, 11];

function extractRefs(html) {
	const refs = [];
	const regex = /(href|src)="([^"]+)"/g;
	let match;
	while ((match = regex.exec(html)) !== null) {
		refs.push(match[2]);
	}
	return refs;
}

function isLocalRef(ref) {
	return !(
		ref.startsWith('http://')
		|| ref.startsWith('https://')
		|| ref.startsWith('mailto:')
		|| ref.startsWith('javascript:')
		|| ref.startsWith('#')
		|| ref.startsWith('data:')
	);
}

describe('experiment page wiring characterization', () => {
	it('every exp has main and test html', () => {
		for (const id of expIds) {
			expect(existsSync(path.join(rootDir, `exp${id}`, `exp${id}.html`))).toBe(true);
			expect(existsSync(path.join(rootDir, `exp${id}`, `exp${id}_test.html`))).toBe(true);
		}
	});

	it('all local href/src in exp pages resolve to existing files', () => {
		const htmlFiles = [];
		for (const id of expIds) {
			htmlFiles.push(path.join(rootDir, `exp${id}`, `exp${id}.html`));
			htmlFiles.push(path.join(rootDir, `exp${id}`, `exp${id}_test.html`));
		}

		for (const htmlFile of htmlFiles) {
			const content = readFileSync(htmlFile, 'utf8');
			const refs = extractRefs(content).filter(isLocalRef);
			for (const ref of refs) {
				const resolved = path.resolve(path.dirname(htmlFile), ref);
				expect(existsSync(resolved), `${path.relative(rootDir, htmlFile)} -> ${ref}`).toBe(true);
			}
		}
	});

	it('exp2/7/10/11 pages use shared osc/wave/progress scripts', () => {
		for (const id of [2, 7, 10, 11]) {
			const mainHtml = readFileSync(path.join(rootDir, `exp${id}`, `exp${id}.html`), 'utf8');
			expect(mainHtml.includes('../shared/js/WaveGenerator.js')).toBe(true);
			expect(mainHtml.includes('../shared/js/Oscillator.js')).toBe(true);

			const testHtml = readFileSync(path.join(rootDir, `exp${id}`, `exp${id}_test.html`), 'utf8');
			expect(testHtml.includes('../shared/js/WaveGenerator.js')).toBe(true);
			expect(testHtml.includes('../shared/js/Oscillator.js')).toBe(true);
			expect(testHtml.includes('../shared/js/progress_bar.js')).toBe(true);
		}
	});

	it('guard: deduped scripts are only kept in shared/js', () => {
		expect(existsSync(path.join(rootDir, 'shared/js/WaveGenerator.js'))).toBe(true);
		expect(existsSync(path.join(rootDir, 'shared/js/Oscillator.js'))).toBe(true);
		expect(existsSync(path.join(rootDir, 'shared/js/progress_bar.js'))).toBe(true);

		for (const id of [2, 7, 10, 11]) {
			expect(existsSync(path.join(rootDir, `exp${id}/js/WaveGenerator.js`))).toBe(false);
			expect(existsSync(path.join(rootDir, `exp${id}/js/Oscillator.js`))).toBe(false);
			expect(existsSync(path.join(rootDir, `exp${id}/js/progress_bar.js`))).toBe(false);
		}
	});
});
