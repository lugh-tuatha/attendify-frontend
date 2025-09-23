import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistration } from './event-registration';

describe('EventRegistration', () => {
  let component: EventRegistration;
  let fixture: ComponentFixture<EventRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
