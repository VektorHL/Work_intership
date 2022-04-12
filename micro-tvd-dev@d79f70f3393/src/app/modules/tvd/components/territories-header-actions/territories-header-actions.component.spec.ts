import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoriesHeaderActionsComponent } from './territories-header-actions.component';

describe('TerritoriesHeaderActionsComponent', () => {
  let component: TerritoriesHeaderActionsComponent;
  let fixture: ComponentFixture<TerritoriesHeaderActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritoriesHeaderActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoriesHeaderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
