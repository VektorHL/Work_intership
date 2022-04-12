/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const envConfig = require('./arm.conf').config;
// const commitHash = require('./gitInfo').getGitHashCommitShort();

const targetFolder = process.argv[2];
assert(
  targetFolder,
  'Не задан позиционный аргумент: целевая директория конфигурационного файла. Пример запуска $ node ./createConfig.js ./public',
);

// Конфиг приложения. Переданные из-вне свойства, которые не учтены тут работать не будут.
// const appConfig = {
//     ...envConfig,
//     // HASH_COMMIT: commitHash
// }
let script = '';
script += '(function(window) {\n';
script += '  window.env = window.env || {};\n';
Object.entries(envConfig).forEach(([key, val]) => {
  script += `  window.env.${key} = '${val}';\n`;
});
script += '})(this);';

console.log('createConfig.js run with args:', process.argv);
console.log('createConfig.js generated config:', envConfig);
fs.writeFileSync(path.resolve(targetFolder, 'assets', 'env.js'), script);
// подмена html
const html = fs.readFileSync(path.resolve(targetFolder, 'index.html'), { encoding: 'utf8' });
let replaceValue = `<script src="assets/env.js?version=${new Date().getTime()}"></script>`;
const formatted = html.replace('<script src="assets/env.js"></script>', replaceValue);
fs.writeFileSync(path.resolve(targetFolder, 'index.html'), formatted);
