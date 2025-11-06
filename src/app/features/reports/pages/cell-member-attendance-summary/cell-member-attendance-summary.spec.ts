import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellMemberAttendanceSummary } from './cell-member-attendance-summary';

describe('CellMemberAttendanceSummary', () => {
  let component: CellMemberAttendanceSummary;
  let fixture: ComponentFixture<CellMemberAttendanceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellMemberAttendanceSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellMemberAttendanceSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
