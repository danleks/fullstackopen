module.exports = {
  'env': {
    'commonjs': true,
    'browser': true,
    'es2021': true,
    'jest/globals': true,
    'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    "plugin:jest/recommended",
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'cypress'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'react/react-in-jsx-scope': 'off'
  }
}
