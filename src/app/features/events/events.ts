import { Component, inject } from '@angular/core';

import { Dialog } from '@angular/cdk/dialog';

import { Button } from '../../shared/ui/button/button';

import { AddEventDialog } from './components/add-event-dialog/add-event-dialog';
import { EventCard } from './components/event-card/event-card';

import { EventsService } from './services/events';

import { EventModel } from './models/event.model';

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

  openAddEventDialog(): void {  
    const dialogRef = this.dialog.open(AddEventDialog);
  }
}
