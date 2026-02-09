import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { loadLegacyClass } from './helpers/load-legacy-class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const waveGeneratorPath = path.resolve(__dirname, '../js/WaveGenerator.js');

const WaveGenerator = loadLegacyClass(waveGeneratorPath, 'WaveGenerator', {
	math: Math,
	pow: Math.pow,
});

function nearlyEqual(actual, expected, epsilon = 1e-9) {
	expect(Math.abs(actual - expected)).toBeLessThanOrEqual(epsilon);
}

describe('WaveGenerator characterization', () => {
	it('default state', () => {
		const wg = new WaveGenerator();
		expect(wg.power).toBe(false);
		expect(wg.frequency).toBe(1000);
		expect(wg.amplitude).toBe(1);
		expect(wg.inv).toBe(1);
		expect(wg.type).toBe('');
		expect(wg.offset_on).toBe(false);
	});

	it('calculate_phase keeps existing quadrant logic', () => {
		const wg = new WaveGenerator();
		const phaseQ1 = wg.calculate_phase({ voltage1: { re: 1, im: 1 }, voltage2: { re: 0, im: 0 } }, 0);
		const phaseQ2 = wg.calculate_phase({ voltage1: { re: -1, im: 1 }, voltage2: { re: 0, im: 0 } }, 0);
		const phaseQ4 = wg.calculate_phase({ voltage1: { re: 1, im: -1 }, voltage2: { re: 0, im: 0 } }, 0);
		const phaseYAxisDown = wg.calculate_phase({ voltage1: { re: 0, im: -2 }, voltage2: { re: 0, im: 0 } }, 0);

		nearlyEqual(phaseQ1, Math.PI / 4);
		nearlyEqual(phaseQ2, (3 * Math.PI) / 4);
		nearlyEqual(phaseQ4, (7 * Math.PI) / 4);
		nearlyEqual(phaseYAxisDown, (3 * Math.PI) / 2);
	});

	it('calculate_amplitude uses sqrt(re^2 + im^2)', () => {
		const wg = new WaveGenerator();
		const amplitude = wg.calculate_amplitude({ voltage1: { re: 3, im: 4 }, voltage2: { re: 0, im: 0 } }, 0);
		expect(amplitude).toBe(5);
	});

	it('sin voltage formula is stable', () => {
		const wg = new WaveGenerator();
		wg.set_type('sin_wave');
		wg.set_inv(-1);
		const t = 10;
		const omega = 5;
		const phase = 0.2;
		const amplitude = 2.5;

		const expected = -1 * amplitude * Math.sin(omega * (t * 0.003) + phase);
		const actual = wg.voltage(t, 1, omega, phase, amplitude);
		nearlyEqual(actual, expected);
	});

	it('square and triangle keep coefficient formulas', () => {
		const wg = new WaveGenerator();
		const t = 20;
		const omega = 3;
		const phase = 0.1;
		const amplitude = 1.6;
		const coefficient = 5;
		const s = Math.sin(omega * (t * 0.003) + phase);

		wg.set_type('square_wave');
		const square = wg.voltage(t, coefficient, omega, phase, amplitude);
		nearlyEqual(square, amplitude * (1 / coefficient) * s * (4 / Math.PI));

		wg.set_type('triangle_wave');
		const triangle = wg.voltage(t, coefficient, omega, phase, amplitude);
		nearlyEqual(triangle, amplitude * (1 / coefficient) * s * (8 / Math.PI / Math.PI));
	});
});
