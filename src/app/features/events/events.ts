import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { EventCard } from '@/app/shared/components/event-card/event-card'; 
import { EventsService } from '@/app/features/events/services/events';
import { EventModel } from '@/app/features/events/models/event.model';
import { EventCardSkeleton } from "@/app/shared/components/event-card-skeleton/event-card-skeleton";

@Component({
  selector: 'app-events',
  imports: [
    EventCard,
    EventCardSkeleton,
    MatButtonModule
  ],
  templateUrl: './events.html',
  styleUrl: './events.css',
})

export class Events {
  private eventsService = inject(EventsService);
  private destroy$ = new Subject<void>();

  events: EventModel[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadEvents();
    console.log(this.isLoading)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEvents(): void {
    this.isLoading = true;
    
    this.eventsService.getEventsByCategory('SPECIAL').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.events = response.data;
        this.isLoading = false;
        console.log(response)
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.isLoading = false;
      }
    })
  }
}
