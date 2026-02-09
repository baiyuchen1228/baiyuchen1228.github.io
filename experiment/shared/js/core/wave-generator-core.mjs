function mathLib() {
	return globalThis.math ?? Math;
}

function powLib() {
	return globalThis.pow ?? Math.pow;
}

function checkFn() {
	return globalThis.check ?? (() => {});
}

function jqueryFn() {
	return globalThis.$ ?? (() => ({ css() {}, text() {} }));
}

function oscilloscopeRef() {
	return globalThis.osi ?? { draw() {} };
}

function waveGeneratorRef(self) {
	return globalThis.wg ?? self;
}

export class WaveGeneratorCore {
	constructor() {
		this._power = false;

		this._AMPL_base = 1;
		this._AMPL_pow = 0;
		this._AMPL_switch_on = false;
		this._AMPL_20db_on = false;

		this._frequency_base = 1;
		this._frequency_pow = 3;

		this._inv = 1;
		this._offset = 0;
		this._cycle = 100000;
		this._type = '';
		this._offset_on = false;

		this._frequency = 1000;
		this._amplitude = 1;
	}

	static get square_wave() {
		return 'square_wave';
	}

	static get sin_wave() {
		return 'sin_wave';
	}

	static get triangle_wave() {
		return 'triangle_wave';
	}

	set_power(val) {
		this._power = val;
	}

	set_frequency(freq_val) {
		this._frequency = freq_val / 1000.0;
		this._cycle = 1 / this._frequency;
	}

	set_amplitude(val) {
		this._amplitude = val;
	}

	set_inv(val) {
		this._inv = val;
	}

	set_offset(val) {
		this._offset = val;
	}

	set_type(val) {
		this._type = val;
	}

	set_offset_on(val) {
		this._offset_on = val;
	}

	set_AMPL_base(val) {
		this._AMPL_base = val;
	}

	get power() {
		return this._power;
	}

	get frequency() {
		return this._frequency;
	}

	get amplitude() {
		return this._amplitude;
	}

	get inv() {
		return this._inv;
	}

	get offset() {
		return this._offset;
	}

	get type() {
		return this._type;
	}

	get offset_on() {
		return this._offset_on;
	}

	calculate_phase(res, index) {
		const math = mathLib();
		let a;
		let b;
		let phase;
		if (index == 0) {
			a = res.voltage1.re;
			b = res.voltage1.im;
		} else {
			a = res.voltage2.re;
			b = res.voltage2.im;
		}
		if (a > 0) {
			phase = Math.atan(b / a);
		} else if (a < 0) {
			phase = Math.atan(b / a);
			phase += Math.PI;
		} else {
			if (b > 0)
				phase = math.PI / 2;
			if (b <= 0)
				phase = (math.PI * 3) / 2;
		}
		if (phase < 0)
			phase += 2 * math.PI;
		return phase;
	}

	calculate_amplitude(res, index) {
		const math = mathLib();
		let a;
		let b;
		if (index == 0) {
			a = res.voltage1.re;
			b = res.voltage1.im;
		} else {
			a = res.voltage2.re;
			b = res.voltage2.im;
		}
		return math.sqrt(a * a + b * b);
	}

	voltage(t, coefficient, omega, phase, amplitude) {
		const math = mathLib();
		const inv = this._inv;
		const type = this._type;
		t *= 0.003;
		if (type == 'square_wave') {
			let result = 0;
			result += amplitude * (1 / coefficient) * math.sin(omega * t + phase);
			result *= 4 / Math.PI;
			result *= inv;
			return result;
		}
		if (type == 'sin_wave')
			return inv * amplitude * Math.sin(omega * t + phase);
		if (type == 'triangle_wave') {
			let result = 0;
			result += amplitude * (1 / coefficient) * math.sin(omega * t + phase);
			result *= 8 / Math.PI / Math.PI;
			result *= inv;
			return result;
		}
		return 0;
	}

	voltage_at(t, coefficient, omega, phase, amplitude) {
		return this.voltage(t, coefficient, omega, phase, amplitude);
	}

	evaluate_AMPL() {
		this.set_amplitude(this._AMPL_base * powLib()(10, this._AMPL_pow));
		checkFn()();
	}

	add_AMPL() {
		if (this._AMPL_base < 14)
			this._AMPL_base += 0.5;
		this.evaluate_AMPL();
	}

	minus_AMPL() {
		if (this._AMPL_base > 0)
			this._AMPL_base -= 0.5;
		this.evaluate_AMPL();
	}

	AMPL_switch() {
		const $ = jqueryFn();
		if (this._AMPL_switch_on) {
			this._AMPL_pow += 1;
			$('#generator_AMPL_switch').css('backgroundColor', 'white');
			this._AMPL_switch_on = false;
		} else {
			this._AMPL_pow -= 1;
			$('#generator_AMPL_switch').css('backgroundColor', 'green');
			this._AMPL_switch_on = true;
		}
		this.evaluate_AMPL();
	}

	AMPL_20db() {
		const $ = jqueryFn();
		if (this._AMPL_20db_on) {
			this._AMPL_pow += 1;
			$('#generator_AMPL1').css('backgroundColor', 'white');
			this._AMPL_20db_on = false;
		} else {
			this._AMPL_pow -= 1;
			$('#generator_AMPL1').css('backgroundColor', 'green');
			this._AMPL_20db_on = true;
		}
		this.evaluate_AMPL();
	}

	evaluate_frequency() {
		const $ = jqueryFn();
		this._frequency = this._frequency_base.toFixed(2) * powLib()(10, this._frequency_pow.toFixed(0));
		$('#generator_frequency').text(this._frequency_base.toFixed(2));
		$('#generator_frequency_menu').text(`10^${this._frequency_pow.toFixed(0)}`);
		this.set_frequency(this._frequency_base.toFixed(2) * powLib()(10, this._frequency_pow.toFixed(0)));
		checkFn()();
	}

	clear_frequency() {
		const $ = jqueryFn();
		$('#generator_frequency6').css('backgroundColor', 'white');
		$('#generator_frequency5').css('backgroundColor', 'white');
		$('#generator_frequency4').css('backgroundColor', 'white');
		$('#generator_frequency3').css('backgroundColor', 'white');
		$('#generator_frequency2').css('backgroundColor', 'white');
		$('#generator_frequency1').css('backgroundColor', 'white');
		$('#generator_frequency0').css('backgroundColor', 'white');
	}

	minus_frequency(val = 0.1) {
		if (this._frequency_base < 0.2)
			return;
		this._frequency_base -= val;
		this.evaluate_frequency();
	}

	add_frequency(val = 0.1) {
		if (this._frequency_base > 2)
			return;
		this._frequency_base += val;
		this.evaluate_frequency();
	}

	frequency_pow(pw) {
		const $ = jqueryFn();
		this.clear_frequency();
		$(`#generator_frequency${pw}`).css('backgroundColor', 'green');
		this._frequency_pow = pw;
		this.evaluate_frequency();
	}

	generator_power() {
		const $ = jqueryFn();
		if (this._power) {
			$('#generator_power').css('backgroundColor', 'white');
			this._power = false;
		} else {
			$('#generator_power').css('backgroundColor', 'green');
			this._power = true;
		}
		checkFn()();
	}

	clear_generator_wave() {
		const $ = jqueryFn();
		$('#generator_square').css('backgroundColor', 'white');
		$('#generator_triangle').css('backgroundColor', 'white');
		$('#generator_sin').css('backgroundColor', 'white');
	}

	generator_type(t) {
		const $ = jqueryFn();
		this.clear_generator_wave();
		$(`#generator_${t}`).css('backgroundColor', 'green');
		const wave_type = `${t}_wave`;
		$('#generator_wave_text').text(wave_type);
		this.set_type(wave_type);
		checkFn()();
	}

	generator_inv() {
		const $ = jqueryFn();
		this.set_inv(this._inv * -1);
		if (this._inv == 1)
			$('#generator_inv').css('backgroundColor', 'white');
		else
			$('#generator_inv').css('backgroundColor', 'green');
		checkFn()();
	}

	minus_offset() {
		const osi = oscilloscopeRef();
		if (this._offset_on) {
			if (this._offset < -30) {
				osi.draw();
				return;
			}
			this.set_offset(this._offset - 0.1);
		}
		osi.draw();
	}

	add_offset() {
		const osi = oscilloscopeRef();
		if (this._offset_on) {
			if (this._offset > 30) {
				osi.draw();
				return;
			}
			waveGeneratorRef(this).set_offset(this._offset + 0.1);
		}
		osi.draw();
	}

	generator_offset_on() {
		const $ = jqueryFn();
		const osi = oscilloscopeRef();
		if (this._offset_on) {
			$('#generator_offset_switch').css('backgroundColor', 'white');
			this.set_offset_on(false);
		} else {
			$('#generator_offset_switch').css('backgroundColor', 'green');
			this.set_offset(0);
			this.set_offset_on(true);
		}
		osi.draw();
	}
}

export default WaveGeneratorCore;
