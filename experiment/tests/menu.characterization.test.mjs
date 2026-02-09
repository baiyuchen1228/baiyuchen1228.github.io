import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { loadLegacyScript } from './helpers/load-legacy-script.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const menuScriptPath = path.resolve(__dirname, '../module/menu.js');

let menuCtx;

function setupDom() {
	document.body.innerHTML = `
		<div id="menu1"></div>
		<div id="menu2"></div>
		<ul id="SubMenu1" style="display: none"></ul>
		<ul id="SubMenu2" style="display: none"></ul>
		<div id="outside"></div>
	`;
	Object.defineProperty(document.getElementById('menu1'), 'clientWidth', {
		value: 120,
		configurable: true,
	});
}

describe('menu.js characterization', () => {
	beforeAll(() => {
		setupDom();
		menuCtx = loadLegacyScript(menuScriptPath, { document, window });
	});

	beforeEach(() => {
		setupDom();
		menuCtx.VisibleMenu = '';
	});

	it('switchMenu opens hidden submenu and sets VisibleMenu', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');

		menuCtx.switchMenu(menu1, 'SubMenu1');

		expect(subMenu1.style.display).toBe('block');
		expect(subMenu1.style.minWidth).toBe('120');
		expect(menuCtx.VisibleMenu).toBe('SubMenu1');
	});

	it('switchMenu toggles open submenu to hidden on click', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');

		subMenu1.style.display = 'block';
		menuCtx.VisibleMenu = 'SubMenu1';
		menuCtx.switchMenu(menu1, 'SubMenu1');

		expect(subMenu1.style.display).toBe('none');
		expect(menuCtx.VisibleMenu).toBe('');
	});

	it('switchMenu keeps submenu visible on MouseOver when already visible menu', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');

		subMenu1.style.display = 'block';
		menuCtx.VisibleMenu = 'SubMenu1';
		menuCtx.switchMenu(menu1, 'SubMenu1', 'MouseOver');

		expect(subMenu1.style.display).toBe('block');
		expect(menuCtx.VisibleMenu).toBe('SubMenu1');
	});

	it('hideMenu hides current VisibleMenu and clears pointer', () => {
		const subMenu1 = document.getElementById('SubMenu1');
		subMenu1.style.display = 'block';
		menuCtx.VisibleMenu = 'SubMenu1';

		menuCtx.hideMenu();

		expect(subMenu1.style.display).toBe('none');
		expect(menuCtx.VisibleMenu).toBe('');
	});

	it('document click outside menu closes submenu', () => {
		const subMenu1 = document.getElementById('SubMenu1');
		subMenu1.style.display = 'block';
		menuCtx.VisibleMenu = 'SubMenu1';

		document.getElementById('outside').dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

		expect(subMenu1.style.display).toBe('none');
		expect(menuCtx.VisibleMenu).toBe('');
	});

	it('document click on menu button does not close submenu', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');
		subMenu1.style.display = 'block';
		menuCtx.VisibleMenu = 'SubMenu1';

		menu1.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

		expect(subMenu1.style.display).toBe('block');
		expect(menuCtx.VisibleMenu).toBe('SubMenu1');
	});
});
