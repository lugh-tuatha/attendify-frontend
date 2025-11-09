import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttendeeDialog } from './edit-attendee-dialog';

describe('EditAttendeeDialog', () => {
  let component: EditAttendeeDialog;
  let fixture: ComponentFixture<EditAttendeeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAttendeeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAttendeeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
