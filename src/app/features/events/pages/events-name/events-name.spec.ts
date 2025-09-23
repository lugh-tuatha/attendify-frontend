import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsName } from './events-name';

describe('EventsName', () => {
  let component: EventsName;
  let fixture: ComponentFixture<EventsName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsName]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
