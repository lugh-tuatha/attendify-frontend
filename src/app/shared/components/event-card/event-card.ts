import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-event-card',
  imports: [
    RouterLink, 
    MatButtonModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {
  @Input() id!: string;
  @Input() name!: string;
  @Input() tagline!: string;
  @Input() href!: string;
  @Input() organization!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() location!: string;
  @Input() startDate!: string;
  @Input() endDate?: string;
  @Input() startTime!: string;
  @Input() endTime!: string;
}
