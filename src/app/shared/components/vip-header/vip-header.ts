import { Component } from '@angular/core';
import { CornerDownLeft, Handshake, LucideAngularModule, Sparkles, User } from 'lucide-angular';

@Component({
  selector: 'app-vip-header',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './vip-header.html',
  styleUrl: './vip-header.css'
})
export class VipHeader {
  readonly CornerDownLeft = CornerDownLeft;
  readonly Sparkles = Sparkles;
  readonly User = User;
  readonly Handshake = Handshake;
}
