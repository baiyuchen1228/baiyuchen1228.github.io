import js from "@eslint/js";
export default [
    {
        extends: js.configs.recommended,
        files: ["**/*.js"],
        env: {
            browser: true
        },
        rules: {
            indent: ["error", 4],
            "no-console": "off",
            "no-undef": "off",
            "linebreak-style": "off",
            "array-element-newline": ["error", { multiline: true, minItems: 5 }]
        }
    }
];