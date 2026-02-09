import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';

export function loadLegacyScript(scriptPath, extraContext = {}, postlude = '') {
	const bootstrapPath = path.resolve(process.cwd(), 'shared/js/rlc-bootstrap.js');
	const bootstrapSource = existsSync(bootstrapPath) && path.resolve(scriptPath) !== bootstrapPath
		? `${readFileSync(bootstrapPath, 'utf8')}\n`
		: '';
	const source = `${bootstrapSource}${readFileSync(scriptPath, 'utf8')}\n${postlude}`;
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
