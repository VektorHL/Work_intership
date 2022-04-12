import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvdMainComponent } from './tvd-main.component';

describe('CandidatesMainComponent', () => {
  let component: TvdMainComponent;
  let fixture: ComponentFixture<TvdMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvdMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvdMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
