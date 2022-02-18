module.exports = {
  root: true,

  env: {
    node: true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },

  plugins: [
    'import',
    'vue',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],

  rules: {
    // TODO https://github.com/benmosher/eslint-plugin-import/issues/1479
    'import/no-duplicates': 'off',

    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: false,
      },
    }],

    // Copied from @vue/airbnb config (but that one uses webpack)
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],

    'no-param-reassign': ['error', {
      props: false,
    }],

    'import/prefer-default-export': ['off'],

    // Additional Vue rules that aren't in any rulesets
    'vue/block-tag-newline': ['error'],
    'vue/component-name-in-template-casing': ['error'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/html-comment-content-newline': ['error'],
    'vue/html-comment-content-spacing': ['error'],
    'vue/html-comment-indent': ['error'],
    'vue/match-component-file-name': ['error'],
    'vue/new-line-between-multi-line-property': ['error'],
    'vue/next-tick-style': ['error'],
    'vue/no-boolean-default': ['error'],
    'vue/no-duplicate-attr-inheritance': ['error'],
    'vue/no-empty-component-block': ['error'],
    'vue/no-reserved-component-names': ['error'],
    'vue/no-unsupported-features': ['error'],
    'vue/no-unused-properties': ['error'],
    'vue/no-useless-mustaches': ['error'],
    'vue/no-useless-v-bind': ['error'],
    'vue/padding-line-between-blocks': ['error'],
    // TODO does not work with defineComponent
    //      'vue/require-direct-export': ['error'],
    // TODO also checks non-vue files, kinda bad
    //      'vue/sort-keys': ['error'],
    'vue/v-for-delimiter-style': ['error'],
    'vue/v-on-event-hyphenation': ['error'],
    'vue/v-on-function-call': ['error'],
    'vue/valid-next-tick': ['error'],

    'vue/no-multiple-objects-in-class': ['warn'],
    'vue/no-potential-component-option-typo': ['warn'],
    'vue/no-template-target-blank': ['warn'],
    'vue/no-unregistered-components': ['warn', {
      ignorePatterns: ['router-link', 'router-view'],
    }],

    // Extension rules
    'vue/array-bracket-newline': ['error'],
    'vue/array-bracket-spacing': ['error'],
    'vue/arrow-spacing': ['error'],
    'vue/block-spacing': ['error'],
    'vue/brace-style': ['error'],
    'vue/camelcase': ['error'],
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/comma-spacing': ['error'],
    'vue/comma-style': ['error'],
    'vue/dot-location': ['error'],
    'vue/dot-notation': ['error'],
    'vue/eqeqeq': ['error'],
    'vue/func-call-spacing': ['error'],
    'vue/key-spacing': ['error'],
    'vue/keyword-spacing': ['error'],
    'vue/no-constant-condition': ['error'],
    'vue/no-empty-pattern': ['error'],
    'vue/no-extra-parens': ['error'],
    'vue/no-irregular-whitespace': ['error'],
    'vue/no-restricted-syntax': ['error'],
    'vue/no-sparse-arrays': ['error'],
    'vue/no-useless-concat': ['error'],
    'vue/object-curly-newline': ['error'],
    'vue/object-curly-spacing': ['error'],
    'vue/object-property-newline': ['error'],
    'vue/operator-linebreak': ['error', 'before'],
    'vue/prefer-template': ['error'],
    'vue/space-in-parens': ['error'],
    'vue/space-infix-ops': ['error'],
    'vue/space-unary-ops': ['error'],
    'vue/template-curly-spacing': ['error'],

    'vue/max-len': ['warn', {
      ignoreComments: true,
      ignoreStrings: true,
      ignoreUrls: true,
      ignoreHTMLAttributeValues: true,
    }],

    // Overwrites
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unsafe-assignment': ['off'],
    '@typescript-eslint/restrict-template-expressions': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': [
      'warn',
      {
        allowHigherOrderFunctions: true,
      },
    ],

    // https://github.com/typescript-eslint/typescript-eslint/issues/1824#issuecomment-841905919
    '@typescript-eslint/indent': ['error', 2, {
      ignoredNodes: ['TSTypeParameterInstantiation'],
      SwitchCase: 1,
    }],

    'max-len': ['off'],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': '*', 'next': ['return', 'continue', 'break'] },
      { 'blankLine': 'always', 'prev': 'block-like', 'next': '*' },
      { 'blankLine': 'any', 'prev': 'case', 'next': '*' },
    ],
    'curly': ['error', 'all'],
    'space-in-parens': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
    'padded-blocks': ['error', 'never'],
  },
};
