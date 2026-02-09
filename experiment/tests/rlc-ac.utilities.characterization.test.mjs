import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadLegacyScript } from './helpers/load-legacy-script.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.resolve(__dirname, '../shared/js/rlc-ac.js');

function createComplex(re, im) {
	return {
		re,
		im,
		add(other) {
			return createComplex(this.re + other.re, this.im + other.im);
		},
		mul(other) {
			return createComplex(
				this.re * other.re - this.im * other.im,
				this.re * other.im + this.im * other.re,
			);
		},
	};
}

function createJqMock() {
	const calls = [];
	const attrStore = new Map();
	const lineStore = {
		wire: [],
		alligator: [],
		resistance: [],
		capacitance: [],
		inductance: [],
	};
	const instance = {
		length: 0,
		0: { value: '' },
		selector: null,
		css(prop, value) {
			calls.push({ fn: 'css', prop, value });
			return this;
		},
		text(value) {
			calls.push({ fn: 'text', value });
			return this;
		},
		remove() {
			calls.push({ fn: 'remove' });
			return this;
		},
		removeClass(value) {
			calls.push({ fn: 'removeClass', value });
			return this;
		},
		addClass(value) {
			calls.push({ fn: 'addClass', value });
			return this;
		},
		mousedown() { return this; },
		mouseup() { return this; },
		click() { return this; },
		keydown() { return this; },
		append() { return this; },
		ready() { return this; },
		get() { return [{ getContext: () => ({}) }]; },
		val() { return ''; },
		prop() { return this; },
		removeAttr() { return this; },
		attr(name, value) {
			const key = this.selector ?? '';
			if (typeof value !== 'undefined') {
				const next = attrStore.get(key) ?? {};
				next[name] = value;
				attrStore.set(key, next);
				return this;
			}
			return attrStore.get(key)?.[name];
		},
		on() { return this; },
		off() { return this; },
		hover() { return this; },
	};
	const makeSelection = (selector) => {
		if (selector === "line[id^='wire']") {
			return lineStore.wire;
		}
		if (selector === "line[id^='alligator']") {
			return lineStore.alligator;
		}
		if (selector === "line[id^='resistance']") {
			return lineStore.resistance;
		}
		if (selector === "line[id^='capacitance']") {
			return lineStore.capacitance;
		}
		if (selector === "line[id^='inductance']") {
			return lineStore.inductance;
		}
		return null;
	};
	const $ = (selector) => {
		const lineSelection = typeof selector === 'string' ? makeSelection(selector) : null;
		if (lineSelection) {
			return lineSelection;
		}
		instance.selector = typeof selector === 'string' ? selector : null;
		return instance;
	};
	$.calls = calls;
	$.map = (collection, mapper) => {
		const out = [];
		for (let i = 0; i < collection.length; i += 1) {
			out.push(mapper(collection[i], i));
		}
		return out;
	};
	$.setLineCollection = (kind, lines) => {
		lineStore[kind] = lines;
	};
	$.setAttr = (selector, kv) => {
		attrStore.set(selector, { ...kv });
	};
	return $;
}

function createDocumentMock() {
	const node = {
		style: {},
		appendChild() {},
		remove() {},
	};
	return {
		onmousemove: null,
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

function loadRlcAc() {
	const $ = createJqMock();
	const context = {
		document: createDocumentMock(),
		window: {},
		jQuery: { inArray: () => -1 },
		$: $,
		Chart: { getChart: () => undefined },
		WaveGenerator: class {},
		math: {
			complex: (re, im) => createComplex(re, im),
		},
		Oscillator: class {
			constructor() {
				this._SWP = 1;
				this._vaild = true;
				this.level = 0;
				this.slope = 1;
				this.init = false;
				this.vertical_offset = [0, 0];
				this.time_offset = 0;
				this.drawCount = 0;
			}
			set_vertical_v(ch, value) { this.lastVerticalV = [ch, value]; }
			set_refernece(value) { this.reference = value; }
			set_level(v) { this.level = v; }
			set_vertical_offset(ch, value) {
				this.vertical_offset[ch] = value;
			}
			set_time_mul(value) { this.timeMul = value; }
			set_time_offset(value) { this.time_offset = value; }
			set_vertical_AC_GND_DC(ch, mode) { this.verticalMode = [ch, mode]; }
			set_show_mode(mode) { this.showMode = mode; }
			set_slope(value) { this.slope = value; }
			set_init() { this.init = !this.init; }
			draw() { this.drawCount += 1; }
		},
		navigator: {},
		alert: () => {},
		check: () => {},
	};
	const postlude = `
globalThis.__rlcState = {
	get generator_duty() { return generator_duty; },
	set generator_duty(v) { generator_duty = v; },
	get generator_output_on() { return generator_output_on; },
	set generator_output_on(v) { generator_output_on = v; },
	get drawAlligator() { return drawAlligator; },
	set drawAlligator(v) { drawAlligator = v; },
	get deletemode() { return deletemode; },
	set deletemode(v) { deletemode = v; },
	get delALLalligator() { return delALLalligator; },
	get AlligatorX1() { return AlligatorX1; },
	get AlligatorY1() { return AlligatorY1; },
	get colorNo() { return colorNo; },
	set resistanceOn(v) { resistanceOn = v; },
	set inductanceOn(v) { inductanceOn = v; },
	set capacitanceOn(v) { capacitanceOn = v; },
	get drawResistance() { return drawResistance; },
	set drawResistance(v) { drawResistance = v; },
	get drawWire() { return drawWire; },
	set drawWire(v) { drawWire = v; },
	get drawInductance() { return drawInductance; },
	set drawInductance(v) { drawInductance = v; },
	get drawCapacitance() { return drawCapacitance; },
	set drawCapacitance(v) { drawCapacitance = v; },
	get osi() { return osi; },
	get v_outer_ind_1() { return v_outer_ind_1; },
	set v_outer_ind_1(v) { v_outer_ind_1 = v; },
	get v_outer_ind_2() { return v_outer_ind_2; },
	set v_outer_ind_2(v) { v_outer_ind_2 = v; },
	get time_mul_ind() { return time_mul_ind; },
	set time_mul_ind(v) { time_mul_ind = v; },
	get vertical_ch1_input_on() { return vertical_ch1_input_on; },
	get vertical_ch2_input_on() { return vertical_ch2_input_on; },
	set edge_list(v) { edge_list = v; },
	get wg() { return wg; },
	set startbool(v) { startbool = v; },
	get linestack() { return linestack; },
	set linestack(v) { linestack = v; },
	get pointarray() { return pointarray; },
	set pointarray(v) { pointarray = v; },
	get Edge() { return Edge; }
};
`;
	const ctx = loadLegacyScript(scriptPath, context, postlude);
	return { ctx, $ };
}

describe('rlc-ac utilities characterization', () => {
	let ctx;
	let $;

	beforeEach(() => {
		const loaded = loadRlcAc();
		ctx = loaded.ctx;
		$ = loaded.$;
	});

	it('approx_x rounds to breadboard grid as implemented', () => {
		expect(ctx.approx_x(0)).toBe(5);
		expect(ctx.approx_x(21)).toBe(25);
		expect(ctx.approx_x(-1)).toBe(-15);
	});

	it('deleteRow removes row without mutating input array', () => {
		const arr = [1, 2, 3, 4];
		const out = ctx.deleteRow(arr, 1);
		expect(out).toEqual([1, 3, 4]);
		expect(arr).toEqual([1, 2, 3, 4]);
	});

	it('abs and pow keep legacy numeric behavior', () => {
		expect(ctx.abs(-8)).toBe(8);
		expect(ctx.abs(3)).toBe(3);
		expect(ctx.pow(2, 3)).toBe(8);
		expect(ctx.pow(2, -2)).toBe(0.25);
		expect(ctx.pow(7, 0)).toBe(1);
	});

	it('generator duty controls respect hard bounds', () => {
		ctx.__rlcState.generator_duty = 0.5;
		ctx.minus_generator_duty();
		expect(ctx.__rlcState.generator_duty).toBe(0.5);

		ctx.add_generator_duty();
		expect(ctx.__rlcState.generator_duty).toBeCloseTo(0.55, 12);

		ctx.__rlcState.generator_duty = 0.96;
		ctx.add_generator_duty();
		expect(ctx.__rlcState.generator_duty).toBe(0.96);

		ctx.__rlcState.generator_duty = 0.6;
		ctx.minus_generator_duty();
		expect(ctx.__rlcState.generator_duty).toBeCloseTo(0.55, 12);
	});

	it('generator_output_switch is one-way and updates class once', () => {
		ctx.__rlcState.generator_output_on = false;
		ctx.generator_output_switch();
		expect(ctx.__rlcState.generator_output_on).toBe(true);

		const before = $.calls.length;
		ctx.generator_output_switch();
		expect($.calls.length).toBe(before);
		expect($.calls.some((c) => c.fn === 'removeClass' && c.value === 'generator_bg0')).toBe(true);
		expect($.calls.some((c) => c.fn === 'addClass' && c.value === 'generator_bg1')).toBe(true);
	});

	it('getRandomInteger returns integer in [0, max)', () => {
		const spy = vi.spyOn(Math, 'random').mockReturnValue(0.999);
		expect(ctx.getRandomInteger(10)).toBe(9);
		spy.mockRestore();
	});

	it('turnOffMode clears active drawing modes and applies expected button colors', () => {
		ctx.__rlcState.resistanceOn = 1;
		ctx.__rlcState.inductanceOn = 0;
		ctx.__rlcState.capacitanceOn = 1;
		ctx.turnOffMode();

		expect(ctx.__rlcState.deletemode).toBe(0);
		expect(ctx.__rlcState.drawResistance).toBe(0);
		expect(ctx.__rlcState.drawWire).toBe(0);
		expect(ctx.__rlcState.drawInductance).toBe(0);
		expect(ctx.__rlcState.drawCapacitance).toBe(0);
		expect($.calls.some((c) => c.fn === 'css' && c.prop === 'background-color' && c.value === 'gray')).toBe(true);
	});

	it('generator and vertical drawline helpers set anchor coordinates and delete targets', () => {
		ctx.drawDashedLine2 = () => 'mousemove-handler';
		ctx.__rlcState.drawAlligator = 1;
		ctx.__rlcState.deletemode = 1;

		ctx.generator_drawline1();
		expect(ctx.__rlcState.colorNo).toBe(0);
		expect(ctx.__rlcState.AlligatorX1).toBe(430);
		expect(ctx.__rlcState.AlligatorY1).toBe(400);
		expect(ctx.document.onmousemove).toBe('mousemove-handler');
		expect(ctx.__rlcState.delALLalligator).toEqual([430, 400]);

		ctx.vertical_drawline4();
		expect(ctx.__rlcState.colorNo).toBe(6);
		expect(ctx.__rlcState.AlligatorX1).toBe(1390);
		expect(ctx.__rlcState.AlligatorY1).toBe(530);
		expect(ctx.__rlcState.delALLalligator).toEqual([1390, 530]);
	});

	it('vertical scale and horizontal time controls update oscillator state with bounds', () => {
		ctx.__rlcState.v_outer_ind_1 = 2;
		ctx.minus_vertical_v_outer1();
		expect(ctx.__rlcState.v_outer_ind_1).toBe(1);
		expect(ctx.__rlcState.osi.lastVerticalV).toEqual([0, 2]);

		ctx.__rlcState.v_outer_ind_1 = 0;
		const beforeDraw = ctx.__rlcState.osi.drawCount;
		ctx.minus_vertical_v_outer1();
		expect(ctx.__rlcState.v_outer_ind_1).toBe(0);
		expect(ctx.__rlcState.osi.drawCount).toBe(beforeDraw);

		ctx.__rlcState.time_mul_ind = 7;
		ctx.add_horizonal_time();
		expect(ctx.__rlcState.time_mul_ind).toBe(8);
		expect(ctx.__rlcState.osi.timeMul).toBeCloseTo(1 / 300, 12);
	});

	it('channel input and trigger controls keep one-way/toggle behavior', () => {
		ctx.vertical_ch1_input();
		expect(ctx.__rlcState.vertical_ch1_input_on).toBe(1);
		ctx.vertical_ch1_input();
		expect(ctx.__rlcState.vertical_ch1_input_on).toBe(1);

		ctx.trigger_slope();
		expect(ctx.__rlcState.osi.slope).toBe(-1);
		expect($.calls.some((c) => c.fn === 'text' && c.value === 'SLOPE－')).toBe(true);
		ctx.trigger_slope();
		expect(ctx.__rlcState.osi.slope).toBe(1);

		ctx.minus_trigger_level();
		expect(ctx.__rlcState.osi.level).toBe(-0.5);
		expect($.calls.some((c) => c.fn === 'css' && c.prop === 'top')).toBe(true);
		ctx.add_trigger_level();
		expect(ctx.__rlcState.osi.level).toBe(0);

		ctx.trigger_ch1();
		expect(ctx.__rlcState.osi.reference).toBe('CH1');
		ctx.trigger_ch2();
		expect(ctx.__rlcState.osi.reference).toBe('CH2');
	});

	it('oscilloscope init and SWP controls enforce boundaries and snapping', () => {
		ctx.oscillosocope_init();
		expect(ctx.__rlcState.osi.init).toBe(true);
		ctx.oscillosocope_init();
		expect(ctx.__rlcState.osi.init).toBe(false);

		ctx.__rlcState.osi._SWP = 0.76;
		ctx.minus_horizonal_SWP();
		expect(ctx.__rlcState.osi._SWP).toBe(0.76);

		ctx.__rlcState.osi._SWP = 0.98;
		ctx.add_horizonal_SWP();
		expect(ctx.__rlcState.osi._SWP).toBe(1);

		ctx.__rlcState.osi._SWP = 1.24;
		ctx.add_horizonal_SWP();
		expect(ctx.__rlcState.osi._SWP).toBe(1.24);
	});

	it('toggle buttons keep mutually exclusive draw modes and one-click off behavior', () => {
		ctx.toggleWireButton();
		expect(ctx.__rlcState.drawWire).toBe(1);
		ctx.toggleResistanceButton();
		expect(ctx.__rlcState.drawWire).toBe(0);
		expect(ctx.__rlcState.drawResistance).toBe(1);
		ctx.toggleResistanceButton();
		expect(ctx.__rlcState.drawResistance).toBe(0);

		ctx.__rlcState.inductanceOn = 0;
		ctx.toggleInductanceButton();
		expect(ctx.__rlcState.drawInductance).toBe(0);
		ctx.__rlcState.inductanceOn = 1;
		ctx.toggleInductanceButton();
		expect(ctx.__rlcState.drawInductance).toBe(1);

		ctx.__rlcState.capacitanceOn = 0;
		ctx.toggleCapacitanceButton();
		expect(ctx.__rlcState.drawCapacitance).toBe(0);
		ctx.__rlcState.capacitanceOn = 1;
		ctx.toggleCapacitanceButton();
		expect(ctx.__rlcState.drawCapacitance).toBe(1);

		ctx.toggleAlligatorButton();
		expect(ctx.__rlcState.drawAlligator).toBe(1);
		expect(ctx.__rlcState.drawCapacitance).toBe(0);
	});

	it('delete mode toggle switches on/off and clears tracked alligator target', () => {
		ctx.__rlcState.drawWire = 1;
		ctx.toggleDelButton();
		expect(ctx.__rlcState.drawWire).toBe(0);
		expect(ctx.__rlcState.deletemode).toBe(1);

		ctx.toggleDelButton();
		expect(ctx.__rlcState.deletemode).toBe(0);
		expect(ctx.__rlcState.delALLalligator).toBe(null);
	});

	it('vertical coupling and display mode buttons set oscillator mode consistently', () => {
		ctx.vertical_AC1();
		expect(ctx.__rlcState.osi.verticalMode).toEqual([0, 'AC']);
		ctx.vertical_GND1();
		expect(ctx.__rlcState.osi.verticalMode).toEqual([0, 'GND']);
		ctx.vertical_DC1();
		expect(ctx.__rlcState.osi.verticalMode).toEqual([0, 'DC']);

		ctx.vertical_AC2();
		expect(ctx.__rlcState.osi.verticalMode).toEqual([1, 'AC']);
		ctx.vertical_GND2();
		expect(ctx.__rlcState.osi.verticalMode).toEqual([1, 'GND']);
		ctx.vertical_DC2();
		expect(ctx.__rlcState.osi.verticalMode).toEqual([1, 'DC']);

		ctx.vertical_mode_ch1();
		expect(ctx.__rlcState.osi.showMode).toBe('CH1');
		ctx.vertical_mode_ch2();
		expect(ctx.__rlcState.osi.showMode).toBe('CH2');
		ctx.vertical_mode_dual();
		expect(ctx.__rlcState.osi.showMode).toBe('DUAL');
		ctx.vertical_mode_add();
		expect($.calls.some((c) => c.fn === 'css' && c.value === 'green')).toBe(true);
	});

	it('channel-2 input and horizontal position controls follow legacy updates', () => {
		ctx.vertical_ch2_input();
		expect(ctx.__rlcState.vertical_ch2_input_on).toBe(1);
		ctx.vertical_ch2_input();
		expect(ctx.__rlcState.vertical_ch2_input_on).toBe(1);

		ctx.minus_horizonal_position();
		expect(ctx.__rlcState.osi.time_offset).toBe(-20);
		ctx.add_horizonal_position();
		expect(ctx.__rlcState.osi.time_offset).toBe(0);
	});

	it('placeholder trigger helpers still call alert with legacy messages', () => {
		const spy = vi.fn();
		ctx.alert = spy;
		ctx.trigger_line();
		ctx.trigger_ext();
		ctx.unimplemented();
		expect(spy).toHaveBeenCalledTimes(3);
		expect(spy).toHaveBeenCalledWith('LINE function is unimplement!');
		expect(spy).toHaveBeenCalledWith('EXT function is unimplement!');
		expect(spy).toHaveBeenCalledWith('This function is unimplement!');
	});

	it('findNodeNum maps alligator and breadboard coordinates to legacy node ids', () => {
		expect(ctx.findNodeNum(430, 400)).toBe(0);
		expect(ctx.findNodeNum(1390, 530)).toBe(5);
		expect(ctx.findNodeNum(45, 999)).toBe(20);
		expect(ctx.findNodeNum(65, 999)).toBe(21);
		expect(ctx.findNodeNum(285, 999)).toBe(22);
		expect(ctx.findNodeNum(305, 999)).toBe(23);
		expect(ctx.findNodeNum(100, 87)).toBe(27);
		expect(ctx.findNodeNum(200, 87)).toBe(50);
		expect(ctx.findNodeNum(999, 999)).toBeUndefined();
	});

	it('getWires returns geometry and computed node endpoints', () => {
		$.setLineCollection('wire', [
			{
				id: 'wire01',
				x1: { baseVal: { value: 430 } },
				y1: { baseVal: { value: 400 } },
				x2: { baseVal: { value: 480 } },
				y2: { baseVal: { value: 400 } },
			},
		]);
		const wires = ctx.getWires();
		expect(wires).toEqual([
			{
				id: 'wire01',
				x1: 430,
				y1: 400,
				x2: 480,
				y2: 400,
				node1: 0,
				node2: 1,
			},
		]);
	});

	it('getAlligator applies scope offset and computes shifted nodes', () => {
		$.setLineCollection('alligator', [
			{
				id: 'alligator01',
				x1: { baseVal: { value: 430 } },
				y1: { baseVal: { value: 400 } },
				x2: { baseVal: { value: 580 } },
				y2: { baseVal: { value: 820 } },
			},
		]);
		const alligators = ctx.getAlligator();
		expect(alligators).toEqual([
			{
				id: 'alligator01',
				x1: 430,
				y1: 400,
				x2: 480,
				y2: 400,
				node1: 0,
				node2: 1,
			},
		]);
	});

	it('getResistance reads dataohm and converts to math.complex value', () => {
		$.setLineCollection('resistance', [
			{
				id: 'resistance01',
				x1: { baseVal: { value: 430 } },
				y1: { baseVal: { value: 400 } },
				x2: { baseVal: { value: 480 } },
				y2: { baseVal: { value: 400 } },
			},
		]);
		$.setAttr('#resistance01', { dataohm: '220' });
		const resistances = ctx.getResistance();
		expect(resistances).toHaveLength(1);
		expect(resistances[0]).toMatchObject({
			id: 'resistance01',
			x1: 430,
			y1: 400,
			x2: 480,
			y2: 400,
			node1: 0,
			node2: 1,
		});
		expect(resistances[0].val).toMatchObject({ re: 220, im: 0 });
	});

	it('getCapacitances converts uF attribute into capacitive impedance', () => {
		$.setLineCollection('capacitance', [
			{
				id: 'capacitance01',
				x1: { baseVal: { value: 430 } },
				y1: { baseVal: { value: 400 } },
				x2: { baseVal: { value: 480 } },
				y2: { baseVal: { value: 400 } },
			},
		]);
		$.setAttr('#capacitance01', { dataufarad: '0.5' });
		const capacitances = ctx.getCapacitances(10);
		expect(capacitances).toHaveLength(1);
		expect(capacitances[0]).toMatchObject({
			id: 'capacitance01',
			node1: 0,
			node2: 1,
		});
		expect(capacitances[0].val.re).toBe(0);
		expect(capacitances[0].val.im).toBeCloseTo(-0.2, 12);
	});

	it('getInductances converts henry attribute into inductive impedance', () => {
		$.setLineCollection('inductance', [
			{
				id: 'inductance01',
				x1: { baseVal: { value: 430 } },
				y1: { baseVal: { value: 400 } },
				x2: { baseVal: { value: 480 } },
				y2: { baseVal: { value: 400 } },
			},
		]);
		$.setAttr('#inductance01', { datahenry: '0.3' });
		const inductances = ctx.getInductances(10);
		expect(inductances).toHaveLength(1);
		expect(inductances[0]).toMatchObject({
			id: 'inductance01',
			node1: 0,
			node2: 1,
		});
		expect(inductances[0].val.re).toBe(0);
		expect(inductances[0].val.im).toBeCloseTo(3, 12);
	});

	it('Edge tracks endpoints and returns correct direction-dependent parameters', () => {
		const ohm = createComplex(5, 2);
		const edge = new ctx.__rlcState.Edge(11, 12, 'resistance', ohm);

		expect(edge.node1).toBe(11);
		expect(edge.node2).toBe(12);
		expect(edge.type).toBe('resistance');
		expect(edge.ohm).toBe(ohm);
		expect(edge.go_next(11)).toBe(12);
		expect(edge.go_next(12)).toBe(11);
		expect(edge.go_next(99)).toBe(-1);
		expect(edge.get_par(11)).toBe(ohm);
		expect(edge.get_par(12)).toMatchObject({ re: -5, im: -2 });
	});

	it('checkMeter currently always returns true', () => {
		expect(ctx.checkMeter([])).toBe(true);
		expect(ctx.checkMeter([1, 2, 3])).toBe(true);
	});

	it('checkResitanceBurn reports burn only when resistor power threshold is exceeded', () => {
		const errorSpy = vi.fn();
		ctx.show_error = errorSpy;
		ctx.__rlcState.edge_list = [
			{ id: 0, type: 'wire', ohm: 1000 },
			{ id: 1, type: 'resistance', ohm: 10 },
		];

		expect(ctx.checkResitanceBurn([0, 0.1])).toBe(false);
		expect(errorSpy).not.toHaveBeenCalled();

		expect(ctx.checkResitanceBurn([0, 0.2])).toBe(true);
		expect(errorSpy).toHaveBeenCalledWith('電阻燒壞了<br> at least one resistor burned');
	});

	it('checkConnected follows graph reachability and ignores direct meter short edges', () => {
		const makeEdge = (a, b) => ({
			go_next(node) {
				if (node === a)
					return b;
				if (node === b)
					return a;
				return -1;
			},
		});
		const makeGraph = () => Array.from({ length: 101 }, () => []);

		const g0 = makeGraph();
		g0[2].push(makeEdge(2, 3)); // should be ignored by legacy condition

		const g1 = makeGraph();
		g1[4].push(makeEdge(4, 8));
		g1[8].push(makeEdge(4, 8), makeEdge(8, 5));
		g1[5].push(makeEdge(8, 5));

		const fullGraphStub = vi.fn((meterIdx) => {
			if (meterIdx === 0) {
				return { graph: g0 };
			}
			return { graph: g1 };
		});
		ctx.getFullGraphVoltageVoltage = fullGraphStub;

		const res = ctx.checkConnected();
		expect(res).toEqual({ voltage1: 0, voltage2: 1 });
		expect(fullGraphStub).toHaveBeenCalledTimes(2);
		expect(fullGraphStub).toHaveBeenNthCalledWith(1, 0, 1, true);
		expect(fullGraphStub).toHaveBeenNthCalledWith(2, 1, 1, true);
	});

	it('getFullGraphVoltageVoltage builds filtered graph and marks voltmeter edge id', () => {
		ctx.getWires = () => [{ node1: 20, node2: 21 }];
		ctx.getAlligator = () => [
			{ node1: 4, node2: 30 }, // filtered out when meter_idx = 0
			{ node1: 2, node2: 31 },
		];
		ctx.getResistance = () => [{ node1: 21, node2: 22, val: createComplex(10, 0) }];
		ctx.getCapacitances = () => [{ node1: 22, node2: 23, val: createComplex(0, -1) }];
		ctx.getInductances = () => [{ node1: 23, node2: 24, val: createComplex(0, 1) }];

		const out = ctx.getFullGraphVoltageVoltage(0, 10, true);
		expect(out.voltage_edgeid).toBe(6);
		expect(out.graph[4]).toEqual([]);
		expect(out.graph[2].some((e) => e.type === 'voltmeter' && e.go_next(2) === 3)).toBe(true);
		expect(out.graph[20].some((e) => e.type === 'wire' && e.go_next(20) === 21)).toBe(true);
		expect(out.graph[2].some((e) => e.type === 'wire' && e.go_next(2) === 31)).toBe(true);
	});

	it('getFullGraphVoltageVoltage adds legacy short wires when checkUser is false', () => {
		ctx.getWires = () => [];
		ctx.getAlligator = () => [{ node1: 4, node2: 33 }];
		ctx.getResistance = () => [];
		ctx.getCapacitances = () => [];
		ctx.getInductances = () => [];

		const out = ctx.getFullGraphVoltageVoltage(1, 10, false);
		expect(out.graph[3].some((e) => e.type === 'wire' && e.go_next(3) === 5)).toBe(true);
		expect(out.graph[1].some((e) => e.type === 'wire' && e.go_next(1) === 5)).toBe(true);
		expect(out.graph[4].some((e) => e.type === 'wire' && e.go_next(4) === 33)).toBe(true);
		expect(out.graph[4].some((e) => e.type === 'voltmeter' && e.go_next(4) === 5)).toBe(true);
	});

	it('checkCircuit computes meter voltages from solved edge currents when power is on', () => {
		ctx.__rlcState.wg.power = true;
		ctx.__rlcState.edge_list = [
			{},
			{},
			{ ohm: createComplex(5, 0) },
			{ ohm: createComplex(7, 0) },
		];
		const eqSpy = vi.fn((meterIdx) => {
			if (meterIdx === 0) {
				return {
					FullGraph: { voltage_edgeid: 2 },
					ans: [createComplex(0, 0), createComplex(0, 0), createComplex(2, 0)],
				};
			}
			return {
				FullGraph: { voltage_edgeid: 3 },
				ans: [createComplex(0, 0), createComplex(0, 0), createComplex(0, 0), createComplex(3, 0)],
			};
		});
		ctx.equationVoltageVoltage = eqSpy;

		const res = ctx.checkCircuit(99);
		expect(res.voltage1).toMatchObject({ re: 10, im: 0 });
		expect(res.voltage2).toMatchObject({ re: 21, im: 0 });
		expect(eqSpy).toHaveBeenNthCalledWith(1, 0, 99);
		expect(eqSpy).toHaveBeenNthCalledWith(2, 1, 99);
	});

	it('checkCircuit returns zero voltages and reports power-off error', () => {
		ctx.__rlcState.wg.power = false;
		ctx.__rlcState.edge_list = [{ ohm: createComplex(1, 0) }];
		ctx.equationVoltageVoltage = () => ({
			FullGraph: { voltage_edgeid: 0 },
			ans: [createComplex(9, 0)],
		});
		const showSpy = vi.fn();
		ctx.show_error = showSpy;

		const res = ctx.checkCircuit(1);
		expect(res.voltage1).toMatchObject({ re: 0, im: 0 });
		expect(res.voltage2).toMatchObject({ re: 0, im: 0 });
		expect(showSpy).toHaveBeenCalledWith('波型產生器的 power 沒有打開');
	});

	it('check enforces startbool gate and updates oscillator validity flag', () => {
		const alertSpy = vi.fn();
		ctx.alert = alertSpy;
		ctx.__rlcState.startbool = false;
		ctx.check();
		expect(alertSpy).toHaveBeenCalledTimes(1);
		expect(ctx.__rlcState.osi._vaild).toBe(true);

		ctx.__rlcState.startbool = true;
		const before = ctx.__rlcState.osi.drawCount;
		ctx.check();
		expect(ctx.__rlcState.osi._vaild).toBe(false);
		expect(ctx.__rlcState.osi.drawCount).toBe(before + 1);
	});

	it('undo returns immediately on empty stack and removes latest wire entry', () => {
		ctx.__rlcState.linestack = [];
		ctx.__rlcState.pointarray = [];
		ctx.undo();
		expect(ctx.__rlcState.linestack).toEqual([]);

		ctx.__rlcState.pointarray = [[1, 1], [2, 2]];
		ctx.__rlcState.linestack = ['wire01'];
		ctx.undo();
		expect(ctx.__rlcState.linestack).toEqual([]);
		expect(ctx.__rlcState.pointarray).toEqual([]);
		expect($.calls.filter((c) => c.fn === 'remove').length).toBeGreaterThanOrEqual(3);
	});

	it('handleMediaStreamError logs error using legacy message', () => {
		const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		const err = new Error('camera denied');
		ctx.handleMediaStreamError(err);
		expect(logSpy).toHaveBeenCalledWith('navigator.getUserMedia error: ', err);
		logSpy.mockRestore();
	});
});
