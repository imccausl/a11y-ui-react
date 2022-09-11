const BABEL_ENV = process.env.BABEL_ENV
const isCommonJS = BABEL_ENV !== undefined && BABEL_ENV === 'cjs'
const isESM = BABEL_ENV !== undefined && BABEL_ENV === 'esm'

module.exports = function (api) {
  api.cache(true)

  const presets = [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: "> 0.25%, not dead",
      },
    ],
    '@babel/preset-react',

  ]

  const plugins = [['module-resolver', { root: ['./packages'] }]]

  const ignore = ['packages/**/*.test.js', '**/__tests__']

  return {
    presets,
    plugins,
    ignore,
  }
}
