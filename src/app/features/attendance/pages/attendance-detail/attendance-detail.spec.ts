import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDetail } from './attendance-detail';

describe('AttendanceDetail', () => {
  let component: AttendanceDetail;
  let fixture: ComponentFixture<AttendanceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
