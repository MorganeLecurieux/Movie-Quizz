module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',

    // prettier config will turn rules off according to prettier, it should always be at the end
    'prettier/@typescript-eslint',
    'prettier',
    'prettier/react',
  ],
  ecmaFeature: {
    modules: true,
    spread: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
}
