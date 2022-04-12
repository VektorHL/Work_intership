import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Apollo, Query } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, DefaultOptions } from '@apollo/client/core';
import { map, take } from 'rxjs/operators';
import { IAppState } from '../store/state/app.state';
import { TerritoryById } from './queries/territories';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class TerritoryService {
  public loading$ = new BehaviorSubject<boolean>(false);

  private endpoint = `${window.env.TERRITORY_REGISTRY_HOST}`;

  private constructor(
    private _apollo: Apollo,
    private _store: Store<IAppState>,
    private _httpClient: HttpClient,
    private _httpLink: HttpLink,
  ) {
    this.initApollo();
  }

  public createTerritory(params: any): Observable<Object> {
    return this._httpClient.post(`${this.endpoint}/document/Territory`, [params]);
  }

  public fetchTerritoryById(id: string): Observable<any | null> {
    try {
      const client = this._apollo.use('tvdClient').watchQuery<typeof Query>({
        query: TerritoryById({ id }),
      });
      return client.valueChanges.pipe(
        take(1),
        map((value: any) => {
          this.loading$.next(false);
          return value.data?.TerritoryById || null;
        }),
      );
    } catch (error) {
      console.error('При формировании запроса на сущность Territory возникла ошибка', error);
      return new Observable<null>();
    }
  }

  private initApollo(): void {
    if (this._apollo.use('gatewayClient')) {
      return;
    }

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

    this._apollo.createNamed('gatewayClient', {
      defaultOptions,
      link: this._httpLink.create({
        uri: `${window.env.APOLLO_SERVER_HOST}/graphql`,
      }),
      cache: new InMemoryCache(),
    });
  }
}
