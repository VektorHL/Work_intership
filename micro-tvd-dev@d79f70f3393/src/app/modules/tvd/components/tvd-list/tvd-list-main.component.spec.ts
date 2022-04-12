import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvdListMainComponent } from './tvd-list-main.component';

describe('CandidatesCardMainComponent', () => {
  let component: TvdListMainComponent;
  let fixture: ComponentFixture<TvdListMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvdListMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvdListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
