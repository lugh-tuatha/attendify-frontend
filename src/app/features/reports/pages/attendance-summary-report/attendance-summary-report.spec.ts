import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSummaryReport } from './attendance-summary-report';

describe('AttendanceSummaryReport', () => {
  let component: AttendanceSummaryReport;
  let fixture: ComponentFixture<AttendanceSummaryReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceSummaryReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceSummaryReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
