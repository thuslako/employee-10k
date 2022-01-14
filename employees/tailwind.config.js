module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: [
    './src/**/*.{ts,html}'
  ]},
  content: ['./src/**/*.{ts,html}'],
  prefix: 'tw',
  theme: {
    extend: {},
  },
  plugins: [],
}
