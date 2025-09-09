import { Component, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { Button } from '../../../../shared/ui/button/button';

import { SelectModelDialog } from '../select-model-dialog/select-model-dialog';

@Component({
  selector: 'app-event-card',
  imports: [Button],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {
  private dialog = inject(Dialog);

  openSelectModelDialog() {
    this.dialog.open(SelectModelDialog);
  }
}
