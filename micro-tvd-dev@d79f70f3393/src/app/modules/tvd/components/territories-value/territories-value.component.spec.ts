import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoriesValueComponent } from './territories-value.component';

describe('TerritoriesValueComponent', () => {
  let component: TerritoriesValueComponent;
  let fixture: ComponentFixture<TerritoriesValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritoriesValueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoriesValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
