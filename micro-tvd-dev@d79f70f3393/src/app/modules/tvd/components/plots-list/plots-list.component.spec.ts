import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsListComponent } from './plots-list.component';

describe('CandidateFormButtonsComponent', () => {
  let component: PlotsListComponent;
  let fixture: ComponentFixture<PlotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
