import { DashboardService } from '@/app/core/dashboard/services/dashboard';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { environment } from '@/environments/environment';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, Subject, takeUntil } from 'rxjs';

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
  private dashboardService = inject(DashboardService);

  private destroy$ = new Subject<void>();

  readonly organizationId = environment.organizationId;

  ngOnInit(): void {
    this.getAttendanceTrendsByTimeframe('YEARLY', '2025', this.organizationId, '8757623d-1714-409c-a05d-f3896d44b5cf');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  attendanceTrends: any[] = [];

  getAttendanceTrendsByTimeframe(timeframe: string, year: string, organizationId: string, eventId: string): void {
    this.dashboardService.getTrendsByTimeframe(timeframe, year, organizationId, eventId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.attendanceTrends = response.data;
      },
      error: (error) => {
        console.error('Error loading attendance trends:', error);
      }
    })
  }
}
  