import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc: jsdoc
        },
        extends: "standard",
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