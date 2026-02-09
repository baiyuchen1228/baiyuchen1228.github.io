import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function hashFile(relPath) {
	const abs = path.join(rootDir, relPath);
	const content = readFileSync(abs);
	return createHash('sha1').update(content).digest('hex');
}

function expectSameHash(group, label) {
	const hashes = group.map((f) => ({ file: f, hash: hashFile(f) }));
	const first = hashes[0].hash;
	for (const entry of hashes) {
		expect(entry.hash, `${label}: ${entry.file}`).toBe(first);
	}
}

describe('duplication groups characterization', () => {
	it('progress bar implementations in exp3/5/6 remain identical', () => {
		expectSameHash(
			['exp3/js/progress_bar.js', 'exp5/js/progress_bar.js', 'exp6/js/progress_bar.js'],
			'progress_bar group'
		);
	});

	it('exp5.css copies used by exp3/exp5/exp6 remain identical', () => {
		expectSameHash(
			['exp3/css/exp5.css', 'exp5/css/exp5.css', 'exp6/css/exp5.css'],
			'exp5.css group'
		);
	});

	it('exp2.css and exp11.css can diverge after targeted UX tweaks', () => {
		const exp2Hash = hashFile('exp2/css/exp2.css');
		const exp11Hash = hashFile('exp11/css/exp11.css');
		expect(exp2Hash).not.toBe(exp11Hash);
	});
});
