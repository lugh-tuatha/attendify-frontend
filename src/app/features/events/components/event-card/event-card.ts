import { Component, inject } from '@angular/core';

import { Button } from '../../../../shared/ui/button/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-event-card',
  imports: [RouterLink, Button],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {

}
