import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsListRowActionsComponent } from './plots-list-row-actions.component';

describe('PlotsListRowActionsComponent', () => {
  let component: PlotsListRowActionsComponent;
  let fixture: ComponentFixture<PlotsListRowActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotsListRowActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsListRowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
