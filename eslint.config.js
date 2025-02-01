import antfu from '@antfu/eslint-config';

export default antfu(
	{
		// Type of the project. 'lib' for libraries, the default is 'app'
		type: 'lib',

		// Enable stylistic formatting rules
		// stylistic: true,

		// Or customize the stylistic rules
		stylistic: {
			indent: 'tab', // 4
			quotes: 'single', // or 'double'
			semi: true,
		},

		// TypeScript and Vue are autodetected, you can also explicitly enable them:
		typescript: true,
		vue: true,

		// Disable jsonc and yaml support
		jsonc: false,
		yaml: false,
		ignores: ['experiment/module/*'],

		rules: {
			'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'no-unused-vars': 'off',
			'unused-imports/no-unused-vars': 'off', // should be 'error'
			'eqeqeq': 'off', // should be 'error'
			'no-console': 'off',
			'no-undef': 'off',
			'object-curly-newline': 'off',
			'no-alert': 'off', // should be 'error'
			'block-scoped-var': 'off',
			'unicorn/prefer-number-properties': 'off',
			'no-var': 'off', // should be 'error'
			'vars-on-top': 'off', // should be 'error'
			'no-redeclare': 'off', // should be 'error'
			'no-use-before-define': 'off', // should be 'error'
		},
	},
);

// {
// 	files: ["**/*.js"],
// 	ignores: ["experiment/module/*"],
// 	rules: {
// 		indent: ["error", "tab"],
// 		"no-console": "off",
// 		"no-undef": "off",
// 		"array-element-newline": ["error", { multiline: true, minItems: 7 }]
// 	}
// }
