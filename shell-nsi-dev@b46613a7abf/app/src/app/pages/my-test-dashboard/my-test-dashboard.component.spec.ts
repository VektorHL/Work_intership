import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestDashboardComponent } from './my-test-dashboard.component';

describe('MyTestDashboardComponent', () => {
  let component: MyTestDashboardComponent;
  let fixture: ComponentFixture<MyTestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTestDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
