import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatSelectModule, 
    MatInputModule, 
    FormsModule, 
    NgxChartsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  value: string = "First Half of 2025 (Jan - Jun)";
  cardColor = '#3A445D';
  single = [
    { 
      name: 'Germany', 
      
      value: 8940000,
    },
    { name: 'Japan', value: 12313 },
    { name: 'Hatdog', value: 12313 },
    { name: 'Hatdog', value: 12313 },
    { name: 'pase', value: 12313 },
  ]
}
