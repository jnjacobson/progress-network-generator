module.exports = {
  extends: [
    '../.eslintrc.js'
  ],

  parserOptions: {
    project: 'docs/tsconfig.json',
  },

  rules: {
    "import/no-extraneous-dependencies": ["off"]
  }
};
