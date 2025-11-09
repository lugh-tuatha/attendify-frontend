import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardSkeleton } from './event-card-skeleton';

describe('EventCardSkeleton', () => {
  let component: EventCardSkeleton;
  let fixture: ComponentFixture<EventCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
