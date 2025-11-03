import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-reports',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  readonly Star = Star;
}
