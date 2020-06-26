module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    semi: ['error', 'always'],
    indent: ['error', 4],
    'arrow-parens': [2, 'as-needed'],
    'operator-linebreak': ['error', 'after'],
    'comma-dangle': ['error', {
      objects: 'always'
    }],
  },
};
