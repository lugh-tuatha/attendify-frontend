import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManage } from './event-manage';

describe('EventManage', () => {
  let component: EventManage;
  let fixture: ComponentFixture<EventManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventManage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventManage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
