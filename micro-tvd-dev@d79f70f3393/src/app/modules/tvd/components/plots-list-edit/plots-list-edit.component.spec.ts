import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsListEditComponent } from './plots-list-edit.component';

describe('PlotsListEditComponent', () => {
  let component: PlotsListEditComponent;
  let fixture: ComponentFixture<PlotsListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotsListEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
