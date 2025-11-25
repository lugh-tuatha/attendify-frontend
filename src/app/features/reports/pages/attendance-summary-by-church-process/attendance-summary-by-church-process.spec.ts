import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSummaryByChurchProcess } from './attendance-summary-by-church-process';

describe('AttendanceSummaryByChurchProcess', () => {
  let component: AttendanceSummaryByChurchProcess;
  let fixture: ComponentFixture<AttendanceSummaryByChurchProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceSummaryByChurchProcess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceSummaryByChurchProcess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
