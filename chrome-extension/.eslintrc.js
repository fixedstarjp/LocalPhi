module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "webextensions": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": "warn",
        "no-console": "off"
    },
    "globals": {
        "chrome": "readonly"
    }
};