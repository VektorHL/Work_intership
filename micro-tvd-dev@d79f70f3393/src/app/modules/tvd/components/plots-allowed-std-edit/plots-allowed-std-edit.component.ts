import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  convertObjSchemaResponse,
  EFormMode,
  FormGeneratorComponent,
  IBaseTableColumn,
  IBaseTableServicePagination,
  MetaClassSchema,
  TFormMode,
  ToastNotificationsService,
  ToastPositions,
  ToastTypes,
} from '@cikrf/gas-components';
import { Apollo, Query } from 'apollo-angular';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { nsiPagingQuery } from '@/app/services/queries/schema';
import { PlotsService } from '@/app/services/plots.service';
import { IPlot } from '@/app/modules/tvd/types/plots.interface';
import { stdEditSchema } from '@/app/modules/tvd/schemas/plot.schema';
import { plotsQuery } from '@/app/modules/tvd/components/plots-list/plotsQuery';
import { columns } from '@/app/modules/tvd/components/plots-allowed-std-edit/plots-allowed-std-edit.columns';

@Component({
  selector: 'app-plots-allowed-std-edit',
  templateUrl: './plots-allowed-std-edit.component.html',
  styleUrls: ['./plots-allowed-std-edit.component.scss'],
})
export class PlotsAllowedStdEditComponent implements OnInit, AfterViewInit {
  @ViewChild(FormGeneratorComponent)
  public formGeneratorComponent!: FormGeneratorComponent;

  public subordinateStdPlots!: IPlot[];

  public pagination: IBaseTableServicePagination = {
    perPage: 1000,
    rowsNumber: 0,
  };

  public nsiEndpoint = 'NSI940';

  public loading$ = new BehaviorSubject(false);

  public tableColumns: Array<IBaseTableColumn> = columns;

  public mainStdList: any[] = [];

  public mainStdPlots: any[] = [];

  public mainStdSelectedPlots: any[] = [];

  public subordinateStdSelectedPlots: any[] = [];

  public subordinateStdPlotsBeforeSave: any[] = [];

  public form: FormGroup = new FormGroup({});

  public fgSchemaBaseFilter!: MetaClassSchema;

  public fgMode: TFormMode = EFormMode.Edit;

  public constructor(
    private plotsService: PlotsService,
    private apollo: Apollo,
    private toastNotificationsService: ToastNotificationsService,
  ) {}

  public ngOnInit(): void {
    this.fetchStdList();

    this.fgSchemaBaseFilter = convertObjSchemaResponse(stdEditSchema);
  }

  public ngAfterViewInit() {
    this.form = this.formGeneratorComponent.form;

    this.form.valueChanges.subscribe((values) => {
      if (values.stdIdIn === values.stdIdOut) {
        this.showNotification(ToastTypes.Error, 'Выбраны одинаковые СТД', '');
        this.subordinateStdPlots = [];
        this.subordinateStdPlotsBeforeSave = [];
        return;
      }

      if (values.stdIdIn) {
        this.fetchMainPlots(`std.STDID==${values.stdIdIn} and plotsType!='temporary'`);
      }

      if (!values.stdIdIn) {
        this.mainStdPlots = [];
        this.subordinateStdPlotsBeforeSave = [];
        this.subordinateStdPlots = [];
      }

      if (!values.stdIdOut) {
        this.subordinateStdPlotsBeforeSave = [];
        this.subordinateStdPlots = [];
      }

      if (values.stdIdOut && values.stdIdIn) {
        this.fetchSecondPlots(`std.STDID==${values.stdIdIn} and allowedStd.STDID=include=${values.stdIdOut}`);
      }
    });
  }

  public fetchMainPlots(filter = '') {
    this.setLoading(true);

    // const user = getUser();
    // if (user) {
    //   const type = getUserCommissionType(user);
    //   if (type === EUserCommissionType.IKSRF) {
    //     filter['subjectRF.SUBJCOD'] = user.profile.SUBJCOD;
    //   } else if (type === EUserCommissionType.TIK) {
    //     filter['std.STDID'] = user.profile.std;
    //   }
    // }

    const client = this.apollo.use('tvdClient').watchQuery<typeof Query>({
      query: plotsQuery({
        page: 1,
        perPage: 1000,
        filter,
      }),
    });
    client.valueChanges
      .pipe(take(1))
      .pipe(map((resp: { data: any }) => resp.data.PlotPaging))
      .subscribe((resp) => {
        this.mainStdPlots = resp.documents;
        this.setLoading(false);
      });
  }

  public fetchSecondPlots(filter = '') {
    this.setLoading(true);

    // const user = getUser();
    // if (user) {
    //   const type = getUserCommissionType(user);
    //   if (type === EUserCommissionType.IKSRF) {
    //     filter['subjectRF.SUBJCOD'] = user.profile.SUBJCOD;
    //   } else if (type === EUserCommissionType.TIK) {
    //     filter['std.STDID'] = user.profile.std;
    //   }
    // }

    const client = this.apollo.use('tvdClient').watchQuery<typeof Query>({
      query: plotsQuery({
        page: 1,
        perPage: 1000,
        filter,
      }),
    });
    client.valueChanges
      .pipe(take(1))
      .pipe(map((resp: { data: any }) => resp.data.PlotPaging))
      .subscribe((resp) => {
        this.subordinateStdPlots = resp.documents;
        this.subordinateStdPlotsBeforeSave = [...this.subordinateStdPlots];

        this.setLoading(false);
      });
  }

  public transferStdToAllow() {
    const existPlotsBeforeSave = this.subordinateStdPlotsBeforeSave.map((plot) => plot.id);
    const existPlots = this.subordinateStdPlots.map((plot) => plot.id);
    this.subordinateStdPlots = [
      ...this.subordinateStdPlots,
      ...this.mainStdSelectedPlots.filter(
        (plot) => !existPlots.includes(plot.id) && existPlotsBeforeSave.includes(plot.id),
      ),
      ...this.mainStdSelectedPlots
        .filter((plot) => !existPlots.includes(plot.id) && !existPlotsBeforeSave.includes(plot.id))
        .map((plot) => ({
          ...plot,
          toSave: true,
        })),
    ];
    this.mainStdPlots = [...this.mainStdPlots];
  }

  public transferStdToDisallow() {
    const plotIds = this.subordinateStdSelectedPlots.map((plot) => plot.id);
    this.subordinateStdPlots = this.subordinateStdPlots.filter((plot) => !plotIds.includes(plot.id));
  }

  public allowStdPlot(plots: any[]) {
    const std = [{ STDID: this.form.value.stdIdOut }];
    const subscribes: any[] = [];

    plots.forEach((plot) => {
      subscribes.push(this.plotsService.allowStdPlot(plot.id, std));
    });

    return forkJoin(subscribes);
  }

  public deleteAllowedStd(plots: any[]) {
    const std = [{ STDID: this.form.value.stdIdOut }];
    const subscribes: any[] = [];
    plots.forEach((plot) => {
      subscribes.push(this.plotsService.deleteAllowedStdPlot(plot.id, std));
    });

    return forkJoin(subscribes);
  }

  public apply() {
    const existBeforeIds = this.subordinateStdPlotsBeforeSave.map((plot) => plot.id);
    const existIds = this.subordinateStdPlots.map((plot) => plot.id);

    const toAllow = this.subordinateStdPlots.filter((plot) => !existBeforeIds.includes(plot.id));
    const toDisallow = this.subordinateStdPlotsBeforeSave.filter((plot) => !existIds.includes(plot.id));

    const actions = [];

    if (toAllow.length > 0) {
      actions.push(this.allowStdPlot(toAllow));
    }
    if (toDisallow.length > 0) {
      actions.push(this.deleteAllowedStd(toDisallow));
    }

    forkJoin(actions).subscribe(() => {
      this.subordinateStdPlots = [];
      this.mainStdPlots = [];
      this.subordinateStdPlotsBeforeSave = [];

      this.fetchMainPlots(`std.STDID==${this.form.value['stdIdIn']} and plotsType!='temporary'`);
      this.fetchSecondPlots(
        `std.STDID==${this.form.value['stdIdIn']} and allowedStd.STDID=include=${this.form.value['stdIdOut']}`,
      );
    });
  }

  public reset() {
    this.mainStdPlots = [...this.mainStdPlots];
    this.subordinateStdPlots = [...this.subordinateStdPlotsBeforeSave];
  }

  private fetchStdList(): void {
    const client = this.apollo.use('nsiClient').watchQuery<typeof Query>({
      query: nsiPagingQuery({
        schema: this.nsiEndpoint,
        attrList: 'id',
        page: 0,
        perPage: 1000,
      }),
    });
    client.valueChanges
      .pipe(take(1))
      .pipe(map((resp: { data: any }) => resp.data.NSI940Paging))
      .subscribe((resp) => {
        this.mainStdList = resp.documents;
        this.setLoading(false);
      });
  }

  private setLoading(loading: boolean) {
    this.loading$.next(loading);
  }

  private showNotification(type: ToastTypes, title: string, description: string) {
    this.toastNotificationsService.push({
      position: ToastPositions.BottomRight,
      duration: 5000,
      type,
      title,
      description,
    });
  }
}
