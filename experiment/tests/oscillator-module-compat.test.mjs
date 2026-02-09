import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { loadLegacyClass } from './helpers/load-legacy-class.mjs';
import { OscillatorCore } from '../shared/js/core/oscillator-core.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const legacyPath = path.resolve(__dirname, '../shared/js/Oscillator.js');

function buildPair({ waveType = 'sin_wave', frequency = 1 } = {}) {
	const checkCircuitCallsLegacy = [];
	const checkCircuitCallsModern = [];
	const cssCallsLegacy = [];
	const cssCallsModern = [];
	let checkCallsLegacy = 0;
	let checkCallsModern = 0;

	const LegacyOscillator = loadLegacyClass(legacyPath, 'Oscillator', {
		math: Math,
		wg: { type: waveType, frequency },
		checkCircuit: (omega) => {
			checkCircuitCallsLegacy.push(omega);
			return { omega };
		},
		$: (selector) => ({
			css: (prop, value) => {
				cssCallsLegacy.push({ selector, prop, value });
			},
		}),
		check: () => {
			checkCallsLegacy += 1;
		},
	});

	globalThis.math = Math;
	globalThis.wg = { type: waveType, frequency };
	globalThis.checkCircuit = (omega) => {
		checkCircuitCallsModern.push(omega);
		return { omega };
	};
	globalThis.$ = (selector) => ({
		css: (prop, value) => {
			cssCallsModern.push({ selector, prop, value });
		},
	});
	globalThis.check = () => {
		checkCallsModern += 1;
	};

	return {
		legacy: new LegacyOscillator(),
		modern: new OscillatorCore(),
		checkCircuitCallsLegacy,
		checkCircuitCallsModern,
		cssCallsLegacy,
		cssCallsModern,
		getCheckCallsLegacy: () => checkCallsLegacy,
		getCheckCallsModern: () => checkCallsModern,
	};
}

describe('Oscillator module compatibility', () => {
	it('default values and setters/getters match legacy', () => {
		const { legacy, modern } = buildPair();

		expect(modern.init).toBe(legacy.init);
		expect(modern.slope).toBe(legacy.slope);
		expect(modern.level).toBe(legacy.level);
		expect(modern.reference).toBe(legacy.reference);
		expect(modern.show_mode).toBe(legacy.show_mode);
		expect(modern.vertical_v).toEqual(legacy.vertical_v);
		expect(modern.vertical_offset).toEqual(legacy.vertical_offset);
		expect(modern.time_mul).toBe(legacy.time_mul);
		expect(modern.time_offset).toBe(legacy.time_offset);
		expect(modern.vertical_AC_GND_DC).toEqual(legacy.vertical_AC_GND_DC);
		expect(modern.SWP).toBe(legacy.SWP);

		legacy.set_init(2);
		modern.set_init(2);
		legacy.set_slope(-1);
		modern.set_slope(-1);
		legacy.set_level(0.5);
		modern.set_level(0.5);
		legacy.set_refernece('CH2');
		modern.set_refernece('CH2');
		legacy.set_show_mode('DUAL');
		modern.set_show_mode('DUAL');
		legacy.set_vertical_v(0, 2);
		modern.set_vertical_v(0, 2);
		legacy.set_vertical_offset(1, -0.5);
		modern.set_vertical_offset(1, -0.5);
		legacy.set_time_mul(0.25);
		modern.set_time_mul(0.25);
		legacy.set_time_offset(3);
		modern.set_time_offset(3);
		legacy.set_vertical_AC_GND_DC(0, 'GND');
		modern.set_vertical_AC_GND_DC(0, 'GND');
		legacy.set_SWP(2);
		modern.set_SWP(2);

		expect(modern.init).toBe(legacy.init);
		expect(modern.slope).toBe(legacy.slope);
		expect(modern.level).toBe(legacy.level);
		expect(modern.reference).toBe(legacy.reference);
		expect(modern.show_mode).toBe(legacy.show_mode);
		expect(modern.vertical_v).toEqual(legacy.vertical_v);
		expect(modern.vertical_offset).toEqual(legacy.vertical_offset);
		expect(modern.time_mul).toBe(legacy.time_mul);
		expect(modern.time_offset).toBe(legacy.time_offset);
		expect(modern.vertical_AC_GND_DC).toEqual(legacy.vertical_AC_GND_DC);
		expect(modern.SWP).toBe(legacy.SWP);
	});

	it('get_res for sin_wave matches legacy calls and phasor output', () => {
		const { legacy, modern, checkCircuitCallsLegacy, checkCircuitCallsModern } = buildPair({
			waveType: 'sin_wave',
			frequency: 2,
		});

		legacy.get_res();
		modern.get_res();

		expect(checkCircuitCallsModern).toEqual(checkCircuitCallsLegacy);
		expect(modern._phasor[0]).toEqual(legacy._phasor[0]);
	});

	it('get_res for square/triangle waves keeps same odd-harmonic sequence', () => {
		{
			const pair = buildPair({ waveType: 'square_wave', frequency: 3 });
			pair.legacy.get_res();
			pair.modern.get_res();
			expect(pair.checkCircuitCallsModern).toEqual(pair.checkCircuitCallsLegacy);
		}

		{
			const pair = buildPair({ waveType: 'triangle_wave', frequency: 4 });
			pair.legacy.get_res();
			pair.modern.get_res();
			expect(pair.checkCircuitCallsModern).toEqual(pair.checkCircuitCallsLegacy);
		}
	});

	it('power_control side effects match legacy behavior', () => {
		const {
			legacy,
			modern,
			cssCallsLegacy,
			cssCallsModern,
			getCheckCallsLegacy,
			getCheckCallsModern,
		} = buildPair();

		legacy.power_control();
		modern.power_control();
		expect(modern._power).toBe(legacy._power);
		expect(cssCallsModern[0]).toEqual(cssCallsLegacy[0]);
		expect(getCheckCallsModern()).toBe(getCheckCallsLegacy());

		legacy.power_control();
		modern.power_control();
		expect(modern._power).toBe(legacy._power);
		expect(cssCallsModern[1]).toEqual(cssCallsLegacy[1]);
		expect(getCheckCallsModern()).toBe(getCheckCallsLegacy());
	});
});
