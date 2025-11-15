import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceVip } from './attendance-vip';

describe('AttendanceVip', () => {
  let component: AttendanceVip;
  let fixture: ComponentFixture<AttendanceVip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceVip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceVip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
