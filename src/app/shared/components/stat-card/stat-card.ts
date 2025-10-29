import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-stat-card',
  imports: [
    MatIconModule, 
    RouterLink,
    CommonModule
  ],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCard {
  @Input() title!: string;
  @Input() value!: number;
  @Input() icon!: string;
  @Input() description!: string;
  @Input() href?: string;
}
