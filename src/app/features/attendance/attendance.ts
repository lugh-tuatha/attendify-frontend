import { EventCard } from '@/app/shared/components/event-card/event-card';
import { Button } from '@/app/shared/ui/button/button';
import { Component, inject } from '@angular/core';
import { EventsService } from '@/app/core/events/services/events';
import { EventModel } from '@/app/core/events/models/event.model';

@Component({
  selector: 'app-attendance',
  imports: [Button, EventCard],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class Attendance {
  private eventsService = inject(EventsService);

  events: EventModel[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.isLoading = true;
    
    this.eventsService.getEvents().subscribe({
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
