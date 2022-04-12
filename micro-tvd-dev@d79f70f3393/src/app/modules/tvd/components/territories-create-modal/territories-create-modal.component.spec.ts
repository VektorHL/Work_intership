import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoriesCreateModalComponent } from './territories-create-modal.component';

describe('TerritoriesCreateModalComponent', () => {
  let component: TerritoriesCreateModalComponent;
  let fixture: ComponentFixture<TerritoriesCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritoriesCreateModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoriesCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
