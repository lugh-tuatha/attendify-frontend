import { Component, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { AddEventDialog } from './components/add-event-dialog/add-event-dialog';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-events',
  imports: [Button],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  private dialog = inject(Dialog);

  openAddEventDialog() {
    this.dialog.open(AddEventDialog);
  }
}
