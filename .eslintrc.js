module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'next',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'no-plusplus': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/no-array-index-key': 'off',
    'react/no-danger': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'only-multiline'],
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-cycle': [
      0,
      {
        ignoreExternal: true,
      },
    ],
    'prefer-const': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true,
      },
    ],
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-shadow': 'off',
    'consistent-return': 'off',
    'react/jsx-no-useless-fragment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'react/no-unstable-nested-components': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@next/next/no-img-element': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['pages/_app.tsx', 'pages/_document.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['src/components/Code/Code.tsx'],
      rules: {
        'no-underscore-dangle': 'off',
      },
    },
    {
      files: ['src/types/*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['src/utils/handleActionErrors.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['next.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
