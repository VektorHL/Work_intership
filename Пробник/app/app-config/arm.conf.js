// Данный конфиг генерируется только из переменных env по ключам, которые указаны в дефолтном конфиге
const defaultConfig = require('./env').environment;

const result = {};
Object.keys(defaultConfig).forEach((key) => {
  const envValue = process.env[key];
  const defaultValue = defaultConfig[key];
  result[key] = envValue || defaultValue;
});

module.exports = {
  config: result,
};
