module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    "rules": {
        "no-undef": 0,
        "new-cap": 0,
        "space-before-function-paren": 0,
        "semi": 0,
        "no-unneeded-ternary": 0,
        "keyword-spacing": 0,
        "eqeqeq": 0,
        "space-before-blocks": 0,
        "no-multiple-empty-lines": 0,
        "no-unused-vars": 0,
        "eol-last": 0,
        "indent": 0,
        "no-extra-boolean-cast": 0,
        "no-useless-escape": 0,
        "comma-spacing": 0
            // "no-trailing-spaces": 0
    },
    globals: {}
}