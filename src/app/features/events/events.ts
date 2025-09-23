import { Component, inject } from '@angular/core';

import { Dialog } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

import { Button } from '../../shared/ui/button/button';

import { AddEventDialog } from './components/add-event-dialog/add-event-dialog';
import { EventCard } from './components/event-card/event-card';

@Component({
  selector: 'app-events',
  imports: [Button, EventCard, OverlayModule],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  private dialog = inject(Dialog);
  
  isEventFilterOpen = false;

  openAddEventDialog() {  
    this.dialog.open(AddEventDialog);
  }
}
