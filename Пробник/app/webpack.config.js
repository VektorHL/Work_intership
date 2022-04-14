const { share, SharedMappings } = require('@angular-architects/module-federation/webpack');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const sharedMappings = new SharedMappings();

sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: 'shell',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
      '@interfaces': path.resolve(__dirname, 'src/app/interfaces/'),
      '@shared': path.resolve(__dirname, 'src/app/shared/'),
      '@modules': path.resolve(__dirname, 'src/app/modules/'),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        auth: 'auth@https://auth.gas.apps.dev.devsun.ru/remoteEntry.js',
      },
      shared: share({
        rxjs: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        'rxjs/operators': { singleton: true, strictVersion: true, requiredVersion: '~6.6.0' },
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@ngrx/store': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@ngrx/store-devtools': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
