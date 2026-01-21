import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Facebook, LucideAngularModule, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [
    LucideAngularModule, 
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  readonly MapPin = MapPin;
  readonly Facebook = Facebook;
}
