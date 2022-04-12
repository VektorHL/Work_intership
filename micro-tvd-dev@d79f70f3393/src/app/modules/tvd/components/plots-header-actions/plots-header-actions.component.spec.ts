import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsHeaderActionsComponent } from './plots-header-actions.component';

describe('PlotsHeaderActionsComponent', () => {
  let component: PlotsHeaderActionsComponent;
  let fixture: ComponentFixture<PlotsHeaderActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotsHeaderActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsHeaderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
