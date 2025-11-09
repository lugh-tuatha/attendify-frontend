import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVip } from './event-vip';

describe('EventVip', () => {
  let component: EventVip;
  let fixture: ComponentFixture<EventVip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventVip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventVip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
