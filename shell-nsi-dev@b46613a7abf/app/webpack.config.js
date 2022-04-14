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
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '>=11.0.0' },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: '>=11.0.0' },
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '>=11.0.0' },
        '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '>=11.0.0' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '>=11.0.0' },
        // '@apollo/client': { singleton: true, strictVersion: true, requiredVersion: '>=11.0.0' },
        '@cikrf/gas-components': { singleton: true, strictVersion: true, requiredVersion: '>=1.0.6' },
        '@cikrf/gas-ui-kit': { singleton: true, strictVersion: true, requiredVersion: '>=2.1.188' },
        '@cikrf/gas-utils': { singleton: true, strictVersion: true, requiredVersion: '>=2.0.15' },
        '@ngneat/until-destroy': { singleton: true, strictVersion: true, requiredVersion: '>=8.1.1' },
        '@ngrx/store': { singleton: true, strictVersion: true, requiredVersion: '>=12.3.0' },
        '@ngrx/store-devtools': { singleton: true, strictVersion: true, requiredVersion: '>=12.3.0' },
        // 'apollo-angular': { singleton: true, strictVersion: true, requiredVersion: '>=2.6.0' },
        'date-fns': { singleton: true, strictVersion: true, requiredVersion: '>=2.22.1' },
        'graphql': { singleton: true, strictVersion: true, requiredVersion: '>=15.5.1' },
        'js-base64': { singleton: true, strictVersion: true, requiredVersion: '>=3.7.0' },
        'lodash': { singleton: true, strictVersion: true, requiredVersion: '>=4.17.21' },
        'ng-dynamic-component': { singleton: true, strictVersion: true, requiredVersion: '>=8.0.1' },
        'rxjs': { singleton: true, strictVersion: true, requiredVersion: '>=6.6.0' },
        'rxjs/operators': { singleton: true, strictVersion: true, requiredVersion: '>=6.6.0' },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
