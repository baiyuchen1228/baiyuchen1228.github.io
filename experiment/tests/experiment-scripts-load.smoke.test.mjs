import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { loadLegacyScript } from './helpers/load-legacy-script.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
	'../exp2/js/exp2.js',
	'../exp2/js/exp2_test.js',
	'../exp3/js/exp3.js',
	'../exp3/js/exp3_test.js',
	'../exp5/js/exp5.js',
	'../exp5/js/exp5_test.js',
	'../exp6/js/exp6.js',
	'../exp6/js/exp6_test.js',
	'../exp7/js/exp7_test.js',
	'../exp10/js/exp10.js',
	'../exp10/js/exp10_test.js',
	'../exp11/js/exp11_test.js',
];

function createJqMock() {
	const instance = {
		length: 0,
		0: { value: '', getContext: () => ({}) },
		css() { return this; },
		text() { return this; },
		remove() { return this; },
		removeClass() { return this; },
		addClass() { return this; },
		append() { return this; },
		attr() { return this; },
		prop() { return this; },
		val() { return ''; },
		mousedown() { return this; },
		mouseup() { return this; },
		click() { return this; },
		keydown() { return this; },
		change() { return this; },
		hover() { return this; },
		ready() { return this; },
		get() { return [{ getContext: () => ({}) }]; },
	};
	return () => instance;
}

function createDocumentMock() {
	const node = {
		style: {},
		appendChild() {},
		remove() {},
		getContext: () => ({}),
	};
	return {
		onmousemove: null,
		body: { innerHTML: '' },
		querySelector() {
			return { innerHTML: '' };
		},
		getElementById() {
			return node;
		},
		createElementNS() {
			return {
				innerHTML: '',
				firstChild: { firstChild: null },
			};
		},
		createDocumentFragment() {
			return { appendChild() {} };
		},
		addEventListener() {},
	};
}

function createContext() {
	const $ = createJqMock();
	const mediaDevices = {
		getUserMedia: () => Promise.resolve({}),
	};
	const legacyGlobals = {};
	for (let i = 1; i <= 18; i += 1) {
		legacyGlobals[`powersupply${i}`] = `#powersupply${i}`;
	}

	return {
		document: createDocumentMock(),
		window: {
			URL: {
				createObjectURL: () => 'blob:mock',
			},
		},
		jQuery: { inArray: () => -1 },
		$: $,
		Chart: class {
			static getChart() { return undefined; }
			destroy() {}
		},
		math: {
			...Math,
			complex: (re, im) => ({ re, im }),
		},
		WaveGenerator: class {
			constructor() {
				this.frequency = 1;
				this.amplitude = 1;
				this.offset = 0;
				this.offset_on = false;
				this.type = 'sin_wave';
				this.inv = 1;
			}
			set_amplitude(v) { this.amplitude = v; }
			set_frequency(v) { this.frequency = v / 1000; }
			set_offset_on(v) { this.offset_on = v; }
			set_offset(v) { this.offset = v; }
			set_power() {}
			set_type(v) { this.type = v; }
			calculate_phase() { return 0; }
			calculate_amplitude() { return 1; }
			voltage() { return 0; }
		},
		Oscillator: class {
			constructor() {
				this._SWP = 1;
				this.level = 0;
			}
			set_vertical_v() {}
			set_refernece() {}
			set_level(v) { this.level = v; }
			set_show_mode() {}
			set_vertical_AC_GND_DC() {}
			set_time_mul() {}
			set_time_offset() {}
			set_init() {}
			draw() {}
		},
		checkCircuit: () => ({ voltage1: { re: 0, im: 0 }, voltage2: { re: 0, im: 0 } }),
		checkConnected: () => ({ voltage1: 1, voltage2: 1 }),
		show_error: () => {},
		check: () => {},
		alert: () => {},
		confirm: () => true,
		prompt: () => '1',
		navigator: { mediaDevices },
		setInterval,
		clearInterval,
		...legacyGlobals,
	};
}

describe('experiment script smoke load', () => {
	for (const relPath of scripts) {
		it(`loads without runtime exception: ${relPath}`, () => {
			const scriptPath = path.resolve(__dirname, relPath);
			const ctx = loadLegacyScript(scriptPath, createContext());
			expect(ctx).toBeTruthy();
		});
	}
});
