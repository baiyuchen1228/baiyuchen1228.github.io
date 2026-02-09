import { readFileSync } from 'node:fs';
import vm from 'node:vm';

export function loadLegacyScript(scriptPath, extraContext = {}, postlude = '') {
	const source = `${readFileSync(scriptPath, 'utf8')}\n${postlude}`;
	const context = {
		console,
		Math,
		...extraContext,
	};

	context.globalThis = context;
	vm.createContext(context);
	new vm.Script(source, { filename: scriptPath }).runInContext(context);
	return context;
}
