import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-feature-card',
  imports: [
    MatIconModule, 
  ],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.css'
})
export class FeatureCard {
  @Input() type!: string;
  @Input() icon!: string;
  @Input() title!: string;
  @Input() description!: string;
}
