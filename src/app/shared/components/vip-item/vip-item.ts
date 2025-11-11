import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vip-item',
  imports: [],
  templateUrl: './vip-item.html',
  styleUrl: './vip-item.css'
})
export class VipItem {
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() invitedBy!: string;
}
