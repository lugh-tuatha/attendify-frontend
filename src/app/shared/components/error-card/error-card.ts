import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-card',
  imports: [],
  templateUrl: './error-card.html',
  styleUrl: './error-card.css'
})
export class ErrorCard {
  @Input() statusCode: number | string = 'Unknown';
  @Input() title: string = 'Error';
  @Input() message: string = 'Something went wrong';
  @Input() imageUrl?: string;
}
