module.exports = {
    root: true,
    extends: [
        // 'plugin:vue/recommended',
        'eslint:recommended',
        'plugin:vue/base'
    ],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    plugins: ["vue", "prettier"],
    rules: {
        "prettier/prettier": [
            "warn",
            {
                "arrowParens": "avoid",
                "semi": true,
                "trailingComma": "none",
                "endOfLine": "lf",
                "tabWidth": 2,
                "useTabs": false,
                "singleQuote": true,
                "printWidth": 120,
            }
        ],
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
    }
}
