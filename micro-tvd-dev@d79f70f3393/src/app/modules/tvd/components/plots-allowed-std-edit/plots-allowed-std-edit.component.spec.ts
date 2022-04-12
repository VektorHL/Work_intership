import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsAllowedStdEditComponent } from './plots-allowed-std-edit.component';

describe('PlotsAllowedStdEditcomponent', () => {
  let component: PlotsAllowedStdEditComponent;
  let fixture: ComponentFixture<PlotsAllowedStdEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotsAllowedStdEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsAllowedStdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
