import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSummary } from './attendance-summary';

describe('AttendanceSummary', () => {
  let component: AttendanceSummary;
  let fixture: ComponentFixture<AttendanceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
