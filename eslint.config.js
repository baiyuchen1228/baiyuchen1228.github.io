export default [
    {
      ignores: ["node_modules/**"],
    },
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        indent: ["error", 4],
        "no-console": "off",
        "no-undef": "off",
        "linebreak-style": "off",
        "array-element-newline": ["error", { multiline: true, minItems: 5 }],
      },
    },
  ];