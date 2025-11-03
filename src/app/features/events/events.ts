import { Component, inject } from '@angular/core';

import { Dialog } from '@angular/cdk/dialog';

import { Button } from '@/app/shared/ui/button/button'; 
import { EventCard } from '@/app/shared/components/event-card/event-card'; 
import { AddEventDialog } from './components/add-event-dialog/add-event-dialog';
import { EventsService } from '@/app/core/events/services/events';
import { EventModel } from '@/app/core/events/models/event.model';

@Component({
  selector: 'app-events',
  imports: [Button, EventCard],
  templateUrl: './events.html',
  styleUrl: './events.css',
})

export class Events {
  private dialog = inject(Dialog);
  private eventsService = inject(EventsService);

  events: EventModel[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.isLoading = true;
    
    this.eventsService.getEventsByCategory('SPECIAL').subscribe({
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

  openAddEventDialog(): void {  
    const dialogRef = this.dialog.open(AddEventDialog);
  }
}
