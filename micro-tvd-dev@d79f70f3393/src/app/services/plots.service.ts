import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Apollo, Query } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, DefaultOptions } from '@apollo/client/core';
import { IAppState } from '@store/state/app.state';
import { PlotById } from './queries/plots';
import { IPlot } from '@/app/modules/tvd/types/plots.interface';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class PlotsService {
  public loading$ = new BehaviorSubject<boolean>(false);

  private endpoint = `${window.env.TERRITORY_REGISTRY_HOST}`;

  public constructor(
    private _apollo: Apollo,
    private _store: Store<IAppState>,
    private _httpClient: HttpClient,
    private _httpLink: HttpLink,
  ) {
    this.initApollo();
  }

  public fetchPlotById(id: string): Observable<any | null> {
    try {
      this.loading$.next(true);
      const client = this._apollo.use('gatewayClient').watchQuery<typeof Query>({
        query: PlotById({ id }),
      });
      return client.valueChanges.pipe(
        take(1),
        map((value: any) => {
          this.loading$.next(false);
          return value.data?.PlotById || null;
        }),
      );
    } catch (error) {
      console.error('При формировании запроса на сущность Plot возникла ошибка', error);
      this.loading$.next(false);
      return new Observable<null>();
    }
  }

  public patchPlot(payload: any): Observable<Object> {
    return this._httpClient.put(`${this.endpoint}/document/Plot`, [payload]);
  }

  public patchPlots(payload: Partial<IPlot>[]): Observable<Object> {
    return this._httpClient.put(`${this.endpoint}/document/Plot`, payload);
  }

  public deletePlot(id: string): Observable<Object> {
    return this._httpClient.delete(`${this.endpoint}/document/Plot/${id}`);
  }

  public createPlot(params: any): Observable<Object> {
    return this._httpClient.post(`${this.endpoint}/document/Plot`, [params]);
  }

  public allowStdPlot(plotId: string, body: any): Observable<Object> {
    return this._httpClient.put(`${this.endpoint}/plot/${plotId}/allowed-std`, body);
  }

  public deleteAllowedStdPlot(plotId: string, body: any): Observable<Object> {
    return this._httpClient.delete(`${this.endpoint}/plot/${plotId}/allowed-std`, { body });
  }

  public savePlotsBatchFormation(start: number | string, end: number | string, body: any): Observable<Object> {
    return this._httpClient.post(`${this.endpoint}/plot/batch?start=${start}&end=${end}`, body);
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
