import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  imports: [MatSelectModule, MatInputModule, FormsModule, StatCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  value: string = "First Half of 2025 (Jan - Jun)";
}
