module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript"
  ],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
}
}