import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Scopes } from '@cikrf/gas-components';

@UntilDestroy()
@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserInfoModalComponent implements OnInit {
  @Input()
  public visible: boolean = false;

  @Output()
  public logoutEvent = new EventEmitter();

  @Output()
  public closeEvent = new EventEmitter();

  public userRole!: string;

  public get userName(): string {
    return JSON.parse(localStorage['arm_auth_user'] ?? '{}')?.profile?.name ?? '';
  }

  public ngOnInit() {
    this.initRole();
  }

  public logout(): void {
    this.logoutEvent.emit();
  }

  private initRole(): void {
    const scopes = ((JSON.parse(localStorage['arm_auth_user'] ?? '{}')?.scope as string) ?? '').split(' ');
    switch (true) {
      case scopes.includes(Scopes.nsiAdmin): {
        this.userRole = 'Администратор НСИ';
        break;
      }
      case scopes.includes(Scopes.dictAdmin): {
        this.userRole = 'Администратор справочников НСИ';
        break;
      }
      case scopes.includes(Scopes.dictOperator): {
        this.userRole = 'Пользователь НСИ';
        break;
      }
      default: {
        this.userRole = 'Пользователь НСИ';
        break;
      }
    }
  }
}
