import { Component, Input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { Button } from '../../../../shared/ui/button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  imports: [RouterLink, Button, MatIconModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {
  @Input() id!: string;
  @Input() name!: string;
  @Input() tagline!: string;
  @Input() organization!: string;
  @Input() description!: string;
  // @Input() image!: string;
  @Input() location!: string;
  @Input() startDate!: string;
  @Input() endDate?: string;
  @Input() startTime!: string;
  @Input() endTime!: string;
}
