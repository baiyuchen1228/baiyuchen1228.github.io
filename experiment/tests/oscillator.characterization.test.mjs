import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { loadLegacyClass } from './helpers/load-legacy-class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const oscillatorPath = path.resolve(__dirname, '../js/Oscillator.js');

function buildOscillatorWithStubs({ waveType = 'sin_wave', frequency = 1 } = {}) {
	const checkCircuitCalls = [];
	const cssCalls = [];
	let checkCalls = 0;

	const Oscillator = loadLegacyClass(oscillatorPath, 'Oscillator', {
		math: Math,
		wg: { type: waveType, frequency },
		checkCircuit: (omega) => {
			checkCircuitCalls.push(omega);
			return { omega };
		},
		$: (selector) => ({
			css: (prop, value) => {
				cssCalls.push({ selector, prop, value });
			},
		}),
		check: () => {
			checkCalls += 1;
		},
	});

	return { Oscillator, checkCircuitCalls, cssCalls, getCheckCalls: () => checkCalls };
}

describe('Oscillator characterization', () => {
	it('default state and setters/getters stay stable', () => {
		const { Oscillator } = buildOscillatorWithStubs();
		const osi = new Oscillator();

		expect(osi.init).toBe(false);
		expect(osi.slope).toBe(1);
		expect(osi.level).toBe(0.00005);
		expect(osi.reference).toBe('CH1');
		expect(osi.show_mode).toBe('CH1');
		expect(osi.vertical_v).toEqual([1, 1]);
		expect(osi.vertical_offset).toEqual([0, 0]);
		expect(osi.time_mul).toBe(2 / 300);
		expect(osi.time_offset).toBe(0);
		expect(osi.vertical_AC_GND_DC).toEqual(['AC', 'AC']);
		expect(osi.SWP).toBe(1);

		osi.set_init(2);
		osi.set_slope(-1);
		osi.set_level(0.5);
		osi.set_refernece('CH2');
		osi.set_show_mode('DUAL');
		osi.set_vertical_v(0, 2);
		osi.set_vertical_offset(1, -0.5);
		osi.set_time_mul(0.25);
		osi.set_time_offset(3);
		osi.set_vertical_AC_GND_DC(0, 'GND');
		osi.set_SWP(2);

		expect(osi.init).toBe(2);
		expect(osi.slope).toBe(-1);
		expect(osi.level).toBe(0.5);
		expect(osi.reference).toBe('CH2');
		expect(osi.show_mode).toBe('DUAL');
		expect(osi.vertical_v).toEqual([2, 1]);
		expect(osi.vertical_offset).toEqual([0, -0.5]);
		expect(osi.time_mul).toBe(0.25);
		expect(osi.time_offset).toBe(3);
		expect(osi.vertical_AC_GND_DC).toEqual(['GND', 'AC']);
		expect(osi.SWP).toBe(2);
	});

	it('get_res for sin_wave calls checkCircuit once with base omega', () => {
		const frequency = 2;
		const { Oscillator, checkCircuitCalls } = buildOscillatorWithStubs({
			waveType: 'sin_wave',
			frequency,
		});
		const osi = new Oscillator();

		osi.get_res();

		expect(checkCircuitCalls).toHaveLength(1);
		expect(checkCircuitCalls[0]).toBeCloseTo(2 * Math.PI * frequency * 1000, 12);
		expect(osi._phasor[0]).toEqual({ omega: checkCircuitCalls[0] });
	});

	it('get_res for square_wave scans odd harmonics across loop size', () => {
		const frequency = 3;
		const { Oscillator, checkCircuitCalls } = buildOscillatorWithStubs({
			waveType: 'square_wave',
			frequency,
		});
		const osi = new Oscillator();

		osi.get_res();

		expect(checkCircuitCalls).toHaveLength(100);
		expect(checkCircuitCalls[0]).toBeCloseTo(1 * 2 * Math.PI * frequency * 1000, 12);
		expect(checkCircuitCalls[1]).toBeCloseTo(3 * 2 * Math.PI * frequency * 1000, 12);
		expect(checkCircuitCalls[99]).toBeCloseTo(199 * 2 * Math.PI * frequency * 1000, 12);
	});

	it('get_res for triangle_wave uses same odd harmonic sequence', () => {
		const frequency = 4;
		const { Oscillator, checkCircuitCalls } = buildOscillatorWithStubs({
			waveType: 'triangle_wave',
			frequency,
		});
		const osi = new Oscillator();

		osi.get_res();

		expect(checkCircuitCalls).toHaveLength(100);
		expect(checkCircuitCalls[0]).toBeCloseTo(1 * 2 * Math.PI * frequency * 1000, 12);
		expect(checkCircuitCalls[1]).toBeCloseTo(3 * 2 * Math.PI * frequency * 1000, 12);
		expect(checkCircuitCalls[99]).toBeCloseTo(199 * 2 * Math.PI * frequency * 1000, 12);
	});

	it('power_control toggles power state, button color, and check()', () => {
		const { Oscillator, cssCalls, getCheckCalls } = buildOscillatorWithStubs();
		const osi = new Oscillator();

		osi.power_control();
		expect(osi._power).toBe(1);
		expect(cssCalls[0]).toEqual({
			selector: '#oscilloscope_power',
			prop: 'backgroundColor',
			value: 'green',
		});
		expect(getCheckCalls()).toBe(1);

		osi.power_control();
		expect(osi._power).toBe(0);
		expect(cssCalls[1]).toEqual({
			selector: '#oscilloscope_power',
			prop: 'backgroundColor',
			value: 'white',
		});
		expect(getCheckCalls()).toBe(2);
	});
});
