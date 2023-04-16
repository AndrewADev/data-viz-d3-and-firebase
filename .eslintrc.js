const isProd = process.env.NODE_ENV === 'production'
const warnOnlyInDev = () => isProd ? 'error' : 'warn'

module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off',
    // Warn only for dev for now, because errors will keep app from running, and that is too disruptive for some rules
    'no-unused-vars': warnOnlyInDev(),
    'no-multiple-empty-lines': warnOnlyInDev(),
    'no-trailing-spaces': warnOnlyInDev(),
    'comma-dangle': warnOnlyInDev(),
    'eol-last': warnOnlyInDev()
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
