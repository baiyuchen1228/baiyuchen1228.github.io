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
	});

	it('switchMenu opens hidden submenu', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');

		menuCtx.switchMenu(menu1, 'SubMenu1');

		expect(subMenu1.style.display).toBe('block');
		expect(subMenu1.style.minWidth).toBe('120');
	});

	it('switchMenu toggles open submenu to hidden on click', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');

		menuCtx.switchMenu(menu1, 'SubMenu1');
		menuCtx.switchMenu(menu1, 'SubMenu1');

		expect(subMenu1.style.display).toBe('none');
	});

	it('switchMenu keeps submenu visible on MouseOver when already visible menu', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');

		menuCtx.switchMenu(menu1, 'SubMenu1');
		menuCtx.switchMenu(menu1, 'SubMenu1', 'MouseOver');

		expect(subMenu1.style.display).toBe('block');
	});

	it('hideMenu hides current VisibleMenu and clears pointer', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');
		menuCtx.switchMenu(menu1, 'SubMenu1');

		menuCtx.hideMenu();

		expect(subMenu1.style.display).toBe('none');
	});

	it('document click outside menu closes submenu', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');
		menuCtx.switchMenu(menu1, 'SubMenu1');

		document.getElementById('outside').dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

		expect(subMenu1.style.display).toBe('none');
	});

	it('document click on menu button does not close submenu', () => {
		const menu1 = document.getElementById('menu1');
		const subMenu1 = document.getElementById('SubMenu1');
		menuCtx.switchMenu(menu1, 'SubMenu1');

		menu1.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

		expect(subMenu1.style.display).toBe('block');
	});

	it('opening one submenu closes the other submenu', () => {
		const menu1 = document.getElementById('menu1');
		const menu2 = document.getElementById('menu2');
		const subMenu1 = document.getElementById('SubMenu1');
		const subMenu2 = document.getElementById('SubMenu2');

		menuCtx.switchMenu(menu1, 'SubMenu1');
		expect(subMenu1.style.display).toBe('block');
		expect(subMenu2.style.display).toBe('none');

		menuCtx.switchMenu(menu2, 'SubMenu2');
		expect(subMenu1.style.display).toBe('none');
		expect(subMenu2.style.display).toBe('block');
	});
});
