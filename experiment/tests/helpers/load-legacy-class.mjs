import { readFileSync } from 'node:fs';
import vm from 'node:vm';

export function loadLegacyClass(scriptPath, className, extraContext = {}) {
	const source = `${readFileSync(scriptPath, 'utf8')}\n;globalThis.__legacyExport = ${className};`;
	const context = {
		console,
		Math,
		...extraContext,
	};

	context.globalThis = context;
	vm.createContext(context);
	new vm.Script(source, { filename: scriptPath }).runInContext(context);

	if (!context.__legacyExport)
		throw new Error(`Failed to load ${className} from ${scriptPath}`);

	return context.__legacyExport;
}
