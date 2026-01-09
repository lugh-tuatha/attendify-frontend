import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, Subject, takeUntil } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { environment } from '@/environments/environment';
import { DashboardService } from '@/app/features/dashboard/services/dashboard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getLastTwoMonthDate } from '@/app/shared/utils/date';
import { LeadersAttendeesTrends } from '@/app/core/mocks/leaders-attendees-trends';
import { LucideAngularModule, TrendingUp, Users } from 'lucide-angular';
import { ServiceComparison } from '@/app/core/mocks/service-comparison';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatDatepickerModule, 
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    LucideAngularModule,
  ],
  providers: [provideMomentDateAdapter()],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  readonly Users = Users;
  readonly TrendingUp = TrendingUp;

  private dashboardService = inject(DashboardService);

  private destroy$ = new Subject<void>();

  readonly organizationId = environment.organizationId;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(getLastTwoMonthDate()),
    end: new FormControl<Date | null>(new Date()),
  });

  ngOnInit(): void {
    this.setView();

    const start = this.range.value.start!;
    const end = this.range.value.end!;

    this.range.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      if (val.start && val.end) {
        this.getAttendanceTrendsByTimeframe(val.start, val.end);
      }
    })

    this.getAttendanceTrendsByTimeframe(start, end);
    this.getAttendeesOverview()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  view: [number, number] = [0, 0];
  single: any[] = [];
  attendanceTrends: any[] = [];
  leadersAttendeesTrends = LeadersAttendeesTrends;
  serviceComparison = ServiceComparison;

  getAttendanceTrendsByTimeframe(from: Date, to: Date): void {
    this.dashboardService.getTrendsByTimeframe(from, to, this.organizationId, '8757623d-1714-409c-a05d-f3896d44b5cf').pipe(
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

  getAttendeesOverview(): void {
    this.dashboardService.getAttendeesOverview(this.organizationId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.single = response.data;
      },
      error: (error) => {
        console.error('Error loading attendance trends:', error);
      }
    })
  }

  setView() {
    const width = window.innerWidth * 0.77; 
    const height = 250;
    this.view = [width, height];
  }
}
  