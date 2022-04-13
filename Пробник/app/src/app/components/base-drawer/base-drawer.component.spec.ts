import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDrawerComponent } from './base-drawer.component';

describe('BaseDrawerComponent', () => {
  let component: BaseDrawerComponent;
  let fixture: ComponentFixture<BaseDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseDrawerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
