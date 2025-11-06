import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadersAttendanceSummary } from './leaders-attendance-summary';

describe('LeadersAttendanceSummary', () => {
  let component: LeadersAttendanceSummary;
  let fixture: ComponentFixture<LeadersAttendanceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadersAttendanceSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadersAttendanceSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
