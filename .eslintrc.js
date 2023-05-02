module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 'off',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
    }],
    'no-underscore-dangle': ['error', { allow: ['_render'] }],
  },
};
