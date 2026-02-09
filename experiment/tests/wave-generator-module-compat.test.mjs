import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { loadLegacyClass } from './helpers/load-legacy-class.mjs';
import { WaveGeneratorCore } from '../shared/js/core/wave-generator-core.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const legacyPath = path.resolve(__dirname, '../shared/js/WaveGenerator.js');

const LegacyWaveGenerator = loadLegacyClass(legacyPath, 'WaveGenerator', {
	math: Math,
	pow: Math.pow,
});

function nearlyEqual(actual, expected, epsilon = 1e-9) {
	expect(Math.abs(actual - expected)).toBeLessThanOrEqual(epsilon);
}

describe('WaveGenerator module compatibility', () => {
	it('default values match legacy class', () => {
		const legacy = new LegacyWaveGenerator();
		const modern = new WaveGeneratorCore();

		expect(modern.power).toBe(legacy.power);
		expect(modern.frequency).toBe(legacy.frequency);
		expect(modern.amplitude).toBe(legacy.amplitude);
		expect(modern.inv).toBe(legacy.inv);
		expect(modern.type).toBe(legacy.type);
		expect(modern.offset_on).toBe(legacy.offset_on);
	});

	it('phase and amplitude calculations match legacy outputs', () => {
		const legacy = new LegacyWaveGenerator();
		const modern = new WaveGeneratorCore();
		const res = {
			voltage1: { re: -2, im: 3 },
			voltage2: { re: 4, im: -1 },
		};

		nearlyEqual(modern.calculate_phase(res, 0), legacy.calculate_phase(res, 0));
		nearlyEqual(modern.calculate_phase(res, 1), legacy.calculate_phase(res, 1));
		nearlyEqual(modern.calculate_amplitude(res, 0), legacy.calculate_amplitude(res, 0));
		nearlyEqual(modern.calculate_amplitude(res, 1), legacy.calculate_amplitude(res, 1));
	});

	it('voltage outputs match legacy across waveform types', () => {
		const legacy = new LegacyWaveGenerator();
		const modern = new WaveGeneratorCore();

		const t = 18;
		const coefficient = 7;
		const omega = 5.2;
		const phase = 0.35;
		const amplitude = 1.25;

		for (const type of ['sin_wave', 'square_wave', 'triangle_wave']) {
			legacy.set_type(type);
			modern.set_type(type);
			nearlyEqual(
				modern.voltage(t, coefficient, omega, phase, amplitude),
				legacy.voltage(t, coefficient, omega, phase, amplitude)
			);
		}
	});

	it('frequency and amplitude mutators keep the same derived state', () => {
		const legacy = new LegacyWaveGenerator();
		const modern = new WaveGeneratorCore();

		legacy.set_frequency(2500);
		modern.set_frequency(2500);
		legacy.set_amplitude(3.2);
		modern.set_amplitude(3.2);
		legacy.set_inv(-1);
		modern.set_inv(-1);

		expect(modern.frequency).toBe(legacy.frequency);
		expect(modern.amplitude).toBe(legacy.amplitude);
		expect(modern.inv).toBe(legacy.inv);
	});
});
