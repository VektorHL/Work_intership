import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotStatusComponent } from './plot-status.component';

describe('PlotStatusComponent', () => {
  let component: PlotStatusComponent;
  let fixture: ComponentFixture<PlotStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
