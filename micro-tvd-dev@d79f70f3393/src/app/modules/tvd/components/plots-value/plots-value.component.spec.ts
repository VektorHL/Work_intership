import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsValueComponent } from './plots-value.component';

describe('PlotsValueComponent', () => {
  let component: PlotsValueComponent;
  let fixture: ComponentFixture<PlotsValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotsValueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
