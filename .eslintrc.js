module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-tabs": "off",
        "indent": ["error", "tab"],
        "@typescript-eslint/indent": ["error", "tab"],
        "@typescript-eslint/semi": "off",
        "@typescript-eslint/comma-dangle": "off",
        '@typescript-eslint/brace-style': "off",
        "@typescript-eslint/non-nullable-type-assertion-style": "off"
    }
}
