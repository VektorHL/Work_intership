module.exports = {
  root: true,
  rules: {
    'max-len': [2, { code: 120, ignorePattern: '^import .*' }],
  },
  extends: '@cikrf/eslint-config-gas',
};