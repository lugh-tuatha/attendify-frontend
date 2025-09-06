import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventDialog } from './add-event-dialog';

describe('AddEventDialog', () => {
  let component: AddEventDialog;
  let fixture: ComponentFixture<AddEventDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
