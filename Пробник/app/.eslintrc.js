module.exports = {
  root: true,
  rules: {
    'max-len': [2, { code: 100, ignorePattern: '^import .*' }],
  },
  extends: '@cikrf/eslint-config-gas',
};
