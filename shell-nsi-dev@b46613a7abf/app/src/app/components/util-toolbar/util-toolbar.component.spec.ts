import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilToolbarComponent } from './util-toolbar.component';

describe('UtilToolbarComponent', () => {
  let component: UtilToolbarComponent;
  let fixture: ComponentFixture<UtilToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
