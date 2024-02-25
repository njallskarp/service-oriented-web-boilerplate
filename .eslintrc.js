module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "standard-with-typescript",
        "prettier", // Ensure this is "prettier" to avoid conflicts
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                ".eslintrc.{js,cjs}",
            ],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "prettier", // Ensure Prettier plugin is correctly referred
    ],
    rules: {
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/brace-style": "off",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "prettier/prettier": "error", // Enable Prettier rules to report as ESLint errors
        "@typescript-eslint/no-misused-promises": "off"
    },
};
