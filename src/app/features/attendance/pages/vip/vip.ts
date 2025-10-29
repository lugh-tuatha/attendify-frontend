import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { CornerDownLeft, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-vip',
  imports: [
    MatTabsModule,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './vip.html',
  styleUrl: './vip.css'
})
export class Vip {
  readonly CornerDownLeft = CornerDownLeft;

}
