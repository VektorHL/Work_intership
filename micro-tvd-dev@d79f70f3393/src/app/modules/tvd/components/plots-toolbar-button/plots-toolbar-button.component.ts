import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { IAppState } from '@/app/store/state/app.state';
import {
  editModeFormSelector,
  formChangedSelector,
  hideButtonsSelector,
} from '@/app/store/selectors/plots.basicInfoForm.selectors';
import {
  setEditMode,
  setSaveFormState,
  setResetFormState,
  setFormChanged,
  setCreateMode,
  setHideButtonsState,
} from '@/app/store/actions/plots.basicInfoForm.actions';

@UntilDestroy()
@Component({
  selector: 'app-plots-toolbar-button',
  templateUrl: './plots-toolbar-button.component.html',
  styleUrls: ['./plots-toolbar-button.component.scss'],
})
export class PlotsToolbarButtonComponent implements OnInit {
  public createPage: boolean = false;

  public formationPage: boolean = false;

  public listEditPage: boolean = false;

  public buttonsVisible: boolean = false;

  // Подписка на открытие формы на редактирование
  public editMode$ = this.store.pipe(select(editModeFormSelector));

  // Подписываемся на флаг того, что форма изменнена
  public formUnchanged$ = this.store.pipe(
    select(formChangedSelector),
    map((v) => !v),
  );

  // Подписываемся на флаг сокрытия кнопок
  public show$ = this.store.pipe(
    select(hideButtonsSelector),
    map((v) => !v),
  );

  public constructor(private store: Store<IAppState>, private ref: ChangeDetectorRef, private router: Router) {}

  public ngOnInit(): void {
    this.checkVisibility(this.router.url);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        untilDestroyed(this),
      )
      .subscribe((event) => {
        const { urlAfterRedirects } = event as NavigationEnd;
        this.checkVisibility(urlAfterRedirects);
        if (this.createPage) {
          this.store.dispatch(setCreateMode({ createMode: true }));
        } else {
          this.store.dispatch(setCreateMode({ createMode: false }));
          this.resetStore();
        }
      });
  }

  public onClickEdit() {
    this.store.dispatch(setEditMode({ editMode: true }));
  }

  public onClickReset() {
    this.store.dispatch(setResetFormState({ resetForm: true }));
    this.resetStore();
  }

  public onClickSave() {
    this.store.dispatch(setSaveFormState({ saveForm: true }));
    this.store.dispatch(setSaveFormState({ saveForm: false }));
  }

  private resetStore() {
    this.store.dispatch(setResetFormState({ resetForm: false }));
    this.store.dispatch(setCreateMode({ createMode: false }));
    this.store.dispatch(setEditMode({ editMode: false }));
    this.store.dispatch(setSaveFormState({ saveForm: false }));
    this.store.dispatch(setFormChanged({ formChanged: false }));
    this.store.dispatch(setFormChanged({ formChanged: false }));
    this.store.dispatch(setHideButtonsState({ hide: false }));
  }

  private checkVisibility(url: string) {
    this.createPage = url.endsWith('plots/create');
    this.formationPage = url.endsWith('plots/formation');
    this.listEditPage = url.endsWith('plots/list-edit');
    this.buttonsVisible = this.createPage || url.endsWith('/basic') || this.formationPage || this.listEditPage;
  }
}
