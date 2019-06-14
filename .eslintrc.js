module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    'react-app',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    "no-console": "warn",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-extra-semi": "off",
    "react/prop-types": 0,
    "no-unused-vars": ["error", {"argsIgnorePattern": "^_"}]
  },
}
