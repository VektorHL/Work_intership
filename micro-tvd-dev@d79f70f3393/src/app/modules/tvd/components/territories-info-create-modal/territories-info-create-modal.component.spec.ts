import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoriesInfoCreateModalComponent } from './territories-info-create-modal.component';

describe('TerritoriesInfoCreateModalComponent', () => {
  let component: TerritoriesInfoCreateModalComponent;
  let fixture: ComponentFixture<TerritoriesInfoCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritoriesInfoCreateModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoriesInfoCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
