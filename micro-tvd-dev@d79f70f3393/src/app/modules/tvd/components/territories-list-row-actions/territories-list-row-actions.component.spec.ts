import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoriesListRowActionsComponent } from './territories-list-row-actions.component';

describe('TerritoriesListRowActionsComponent', () => {
  let component: TerritoriesListRowActionsComponent;
  let fixture: ComponentFixture<TerritoriesListRowActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritoriesListRowActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoriesListRowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
