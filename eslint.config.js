export default [
	{
		files: ["**/*.js"],
		ignores: ["experiment/module/*"],
		rules: {
			indent: ["error", "tab"],
			"no-console": "off",
			"no-undef": "off",
			"array-element-newline": ["error", { multiline: true, minItems: 7 }]
		}
	}
];