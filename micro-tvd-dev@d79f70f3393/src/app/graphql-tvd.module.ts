import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client/core';
import { authLink, responseErrorLink } from '@cikrf/gas-components';

@NgModule({
  exports: [HttpClientModule],
})
export class GraphqlTvdModule {
  public constructor(apollo: Apollo) {
    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    };

    const link = authLink.concat(responseErrorLink);

    apollo.createNamed('tvdClient', {
      defaultOptions,
      link: link.concat(
        createHttpLink({
          uri: `${window.env.TERRITORY_REGISTRY_HOST}/graphql`,
        }),
      ),
      cache: new InMemoryCache(),
    });

    apollo.createNamed('campaignClient', {
      defaultOptions,
      link: link.concat(
        createHttpLink({
          uri: `${window.env.CAMPAIGN_REGISTRY_HOST}/graphql`,
        }),
      ),
      cache: new InMemoryCache(),
    });

    apollo.createNamed('nsiClient', {
      defaultOptions,
      link: link.concat(
        createHttpLink({
          uri: `${window.env.NSI_REGISTRY_HOST}/graphql`,
        }),
      ),
      cache: new InMemoryCache(),
    });
  }
}
