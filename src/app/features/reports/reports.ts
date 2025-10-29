import { Component } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-reports',
  imports: [LucideAngularModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  readonly Star = Star;
}
