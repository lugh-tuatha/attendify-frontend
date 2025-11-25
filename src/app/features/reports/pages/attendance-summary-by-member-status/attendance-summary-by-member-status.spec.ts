import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSummaryByMemberStatus } from './attendance-summary-by-member-status';

describe('AttendanceSummaryByMemberStatus', () => {
  let component: AttendanceSummaryByMemberStatus;
  let fixture: ComponentFixture<AttendanceSummaryByMemberStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceSummaryByMemberStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceSummaryByMemberStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
