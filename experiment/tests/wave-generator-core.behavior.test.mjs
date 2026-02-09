import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { WaveGeneratorCore } from '../shared/js/core/wave-generator-core.mjs';

const savedGlobals = {};

function backupGlobal(key) {
	savedGlobals[key] = globalThis[key];
}

function restoreGlobal(key) {
	if (savedGlobals[key] === undefined)
		delete globalThis[key];
	else
		globalThis[key] = savedGlobals[key];
}

describe('WaveGeneratorCore behavior', () => {
	beforeEach(() => {
		for (const key of ['math', 'pow', 'check', '$', 'osi', 'wg'])
			backupGlobal(key);
	});

	afterEach(() => {
		for (const key of ['math', 'pow', 'check', '$', 'osi', 'wg'])
			restoreGlobal(key);
	});

	it('works with fallback globals when none are provided', () => {
		delete globalThis.math;
		delete globalThis.pow;
		delete globalThis.check;
		delete globalThis.$;
		delete globalThis.osi;
		delete globalThis.wg;

		const wg = new WaveGeneratorCore();
		wg.set_type('sin_wave');
		wg.evaluate_AMPL();
		wg.clear_generator_wave();
		wg.minus_offset();
		wg.set_offset_on(true);
		wg.set_offset(1);
		wg.add_offset();

		expect(wg.offset).toBeCloseTo(1.1, 12);
		expect(wg.amplitude).toBe(1);
		expect(wg.voltage(10, 1, 5, 0.3, 2)).toBeTypeOf('number');
	});

	it('AMPL controls update pow, colors, and call check', () => {
		const cssCalls = [];
		let checkCount = 0;
		globalThis.$ = (selector) => ({
			css: (prop, value) => cssCalls.push({ selector, prop, value }),
			text: () => {},
		});
		globalThis.check = () => {
			checkCount += 1;
		};
		globalThis.pow = Math.pow;

		const wg = new WaveGeneratorCore();
		wg._AMPL_base = 13.5;
		wg._AMPL_pow = 0;
		wg.add_AMPL();
		expect(wg.amplitude).toBe(14);
		wg.add_AMPL();
		expect(wg._AMPL_base).toBe(14);

		wg.minus_AMPL();
		expect(wg._AMPL_base).toBe(13.5);
		wg._AMPL_base = 0;
		wg.minus_AMPL();
		expect(wg._AMPL_base).toBe(0);

		wg.AMPL_switch();
		expect(wg._AMPL_switch_on).toBe(true);
		wg.AMPL_switch();
		expect(wg._AMPL_switch_on).toBe(false);

		wg.AMPL_20db();
		expect(wg._AMPL_20db_on).toBe(true);
		wg.AMPL_20db();
		expect(wg._AMPL_20db_on).toBe(false);

		expect(cssCalls.some((c) => c.selector === '#generator_AMPL_switch' && c.value === 'green')).toBe(true);
		expect(cssCalls.some((c) => c.selector === '#generator_AMPL_switch' && c.value === 'white')).toBe(true);
		expect(cssCalls.some((c) => c.selector === '#generator_AMPL1' && c.value === 'green')).toBe(true);
		expect(cssCalls.some((c) => c.selector === '#generator_AMPL1' && c.value === 'white')).toBe(true);
		expect(checkCount).toBeGreaterThan(0);
	});

	it('frequency controls update display, bounds, and highlight', () => {
		const cssCalls = [];
		const textCalls = [];
		globalThis.$ = (selector) => ({
			css: (prop, value) => cssCalls.push({ selector, prop, value }),
			text: (value) => textCalls.push({ selector, value }),
		});
		globalThis.check = () => {};
		globalThis.pow = Math.pow;

		const wg = new WaveGeneratorCore();
		wg._frequency_base = 1;
		wg._frequency_pow = 3;
		wg.evaluate_frequency();
		expect(wg.frequency).toBe(1);

		wg._frequency_base = 0.1;
		wg.minus_frequency();
		expect(wg._frequency_base).toBe(0.1);

		wg._frequency_base = 2.1;
		wg.add_frequency();
		expect(wg._frequency_base).toBe(2.1);

		wg._frequency_base = 1;
		wg.add_frequency();
		expect(wg._frequency_base).toBe(1.1);
		wg.minus_frequency();
		expect(wg._frequency_base).toBe(1);

		wg.frequency_pow(5);
		expect(wg._frequency_pow).toBe(5);

		expect(cssCalls.some((c) => c.selector === '#generator_frequency5' && c.value === 'green')).toBe(true);
		expect(textCalls.some((c) => c.selector === '#generator_frequency_menu')).toBe(true);
	});

	it('power/type/inv controls toggle expected UI state', () => {
		const cssCalls = [];
		const textCalls = [];
		let checkCount = 0;
		globalThis.$ = (selector) => ({
			css: (prop, value) => cssCalls.push({ selector, prop, value }),
			text: (value) => textCalls.push({ selector, value }),
		});
		globalThis.check = () => {
			checkCount += 1;
		};

		const wg = new WaveGeneratorCore();
		wg.generator_power();
		expect(wg.power).toBe(true);
		wg.generator_power();
		expect(wg.power).toBe(false);

		wg.generator_type('sin');
		expect(wg.type).toBe('sin_wave');

		wg.generator_inv();
		expect(wg.inv).toBe(-1);
		wg.generator_inv();
		expect(wg.inv).toBe(1);

		expect(cssCalls.some((c) => c.selector === '#generator_power' && c.value === 'green')).toBe(true);
		expect(cssCalls.some((c) => c.selector === '#generator_power' && c.value === 'white')).toBe(true);
		expect(cssCalls.some((c) => c.selector === '#generator_sin' && c.value === 'green')).toBe(true);
		expect(textCalls.some((c) => c.selector === '#generator_wave_text' && c.value === 'sin_wave')).toBe(true);
		expect(checkCount).toBeGreaterThanOrEqual(4);
	});

	it('offset controls use draw calls and branch guards', () => {
		let drawCount = 0;
		const cssCalls = [];
		globalThis.osi = { draw: () => { drawCount += 1; } };
		globalThis.$ = (selector) => ({
			css: (prop, value) => cssCalls.push({ selector, prop, value }),
			text: () => {},
		});

		const wg = new WaveGeneratorCore();
		wg.set_offset_on(true);

		wg.set_offset(-31);
		wg.minus_offset();
		expect(wg.offset).toBe(-31);

		wg.set_offset(-1);
		wg.minus_offset();
		expect(wg.offset).toBeCloseTo(-1.1, 12);

		wg.set_offset(31);
		wg.add_offset();
		expect(wg.offset).toBe(31);

		const externalWg = { value: 0, set_offset(v) { this.value = v; } };
		globalThis.wg = externalWg;
		wg.set_offset(1);
		wg.add_offset();
		expect(externalWg.value).toBeCloseTo(1.1, 12);

		wg.generator_offset_on();
		expect(wg.offset_on).toBe(false);
		wg.generator_offset_on();
		expect(wg.offset_on).toBe(true);
		expect(wg.offset).toBe(0);

		expect(cssCalls.some((c) => c.selector === '#generator_offset_switch' && c.value === 'green')).toBe(true);
		expect(cssCalls.some((c) => c.selector === '#generator_offset_switch' && c.value === 'white')).toBe(true);
		expect(drawCount).toBeGreaterThan(0);
	});
});
