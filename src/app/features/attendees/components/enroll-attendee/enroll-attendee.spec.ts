import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollAttendee } from './enroll-attendee';

describe('EnrollAttendee', () => {
  let component: EnrollAttendee;
  let fixture: ComponentFixture<EnrollAttendee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollAttendee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollAttendee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
