import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrations } from './event-registrations';

describe('EventRegistrations', () => {
  let component: EventRegistrations;
  let fixture: ComponentFixture<EventRegistrations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRegistrations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRegistrations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
