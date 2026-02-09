function mathLib() {
	return globalThis.math ?? Math;
}

function waveRef() {
	return globalThis.wg ?? { type: 'sin_wave', frequency: 1 };
}

function checkCircuitFn() {
	return globalThis.checkCircuit ?? (() => ({}));
}

function jqueryFn() {
	return globalThis.$ ?? (() => ({ css() {} }));
}

function checkFn() {
	return globalThis.check ?? (() => {});
}

export class OscillatorCore {
	constructor() {
		this._power = 0;
		this._vertical_v = [1, 1];
		this._vertical_offset = [0, 0];
		this._datapoints0 = [];
		this._datapoints1 = [];
		this._time_mul = 2 / 300;
		this._time_offset = 0;
		this._WAVE_DATA_COUNT = 1000;
		this._vertical_AC_GND_DC = ['AC', 'AC'];
		this._vaild = false;
		this._phasor = [];
		this._loop = 100;
		this._level = 0.00005;
		this._slope = 1;
		this._reference = 'CH1';
		this._show_mode = 'CH1';
		this._init = false;
		this._SWP = 1;
		this._begin = -1;
	}

	set_SWP(val) {
		this._SWP = val;
	}

	set_init(val) {
		this._init = val;
	}

	set_slope(val) {
		this._slope = val;
	}

	set_level(val) {
		this._level = val;
	}

	set_refernece(val) {
		this._reference = val;
	}

	set_show_mode(val) {
		this._show_mode = val;
	}

	set_vertical_v(i, val) {
		this._vertical_v[i] = val;
	}

	set_vertical_offset(i, val) {
		this._vertical_offset[i] = val;
	}

	set_time_mul(val) {
		this._time_mul = val;
	}

	set_time_offset(val) {
		this._time_offset = val;
	}

	set_vertical_AC_GND_DC(i, val) {
		this._vertical_AC_GND_DC[i] = val;
	}

	get init() {
		return this._init;
	}

	get slope() {
		return this._slope;
	}

	get level() {
		return this._level;
	}

	get reference() {
		return this._reference;
	}

	get show_mode() {
		return this._show_mode;
	}

	get vertical_v() {
		return this._vertical_v;
	}

	get vertical_offset() {
		return this._vertical_offset;
	}

	get time_mul() {
		return this._time_mul;
	}

	get time_offset() {
		return this._time_offset;
	}

	get vertical_AC_GND_DC() {
		return this._vertical_AC_GND_DC;
	}

	get SWP() {
		return this._SWP;
	}

	get_res() {
		const math = mathLib();
		const wg = waveRef();
		const checkCircuit = checkCircuitFn();
		const type = wg.type;
		const loop = this._loop;
		if (type == 'square_wave') {
			for (let i = 0; i < loop; i++) {
				const omega = (2 * i + 1) * 2 * math.PI * wg.frequency * 1000;
				this._phasor[i] = checkCircuit(omega);
			}
		} else if (type == 'sin_wave') {
			const omega = 2 * math.PI * wg.frequency * 1000;
			this._phasor[0] = checkCircuit(omega);
		} else if (type == 'triangle_wave') {
			for (let i = 0; i < loop; i++) {
				const omega = (2 * i + 1) * 2 * math.PI * wg.frequency * 1000;
				this._phasor[i] = checkCircuit(omega);
			}
		}
	}

	power_control() {
		const $ = jqueryFn();
		if (this._power == 0) {
			this._power = 1;
			$('#oscilloscope_power').css('backgroundColor', 'green');
		} else {
			this._power = 0;
			$('#oscilloscope_power').css('backgroundColor', 'white');
		}
		checkFn()();
	}
}

export default OscillatorCore;
