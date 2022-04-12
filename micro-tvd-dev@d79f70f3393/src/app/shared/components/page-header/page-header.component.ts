import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@/app/store/state/app.state';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input()
  public title?: string;

  @Input()
  public backUrl?: string;

  public constructor(private store: Store<IAppState>) {}
}
