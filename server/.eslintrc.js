module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    elasit: 'writable'
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
  },
};
