import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';

import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

import { ReportsService } from '@/app/core/reports/services/reports';
import { DEFAULT_DATE_FORMAT } from '@/app/shared/utils/date-format';
import { ReportSkeleton } from "@/app/shared/components/report-skeleton/report-skeleton";
import { AttendanceByHierarchyModel } from '@/app/core/reports/models/attendance-by-hierarchy.model';
import { EventsService } from '@/app/core/events/services/events';
import { EventModel } from '@/app/core/events/models/event.model';
import { ErrorCard } from "@/app/shared/components/error-card/error-card";

@Component({
  selector: 'app-leaders-attendance-summary',
  imports: [
    DatePipe,
    NgClass,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterLink,
    MatSelectModule,
    ReportSkeleton,
    ErrorCard
],
  templateUrl: './leaders-attendance-summary.html',
  providers: [provideMomentDateAdapter(DEFAULT_DATE_FORMAT)],
  styleUrl: './leaders-attendance-summary.css'
})
export class LeadersAttendanceSummary {
  readonly date = new FormControl(moment(), { nonNullable: true });
  selectedEvent: string = "8757623d-1714-409c-a05d-f3896d44b5cf";
  
  private destroy$ = new Subject<void>();
  private reportService = inject(ReportsService);
  private eventsService = inject(EventsService);

  events: EventModel[] = [];
  leaderAttendanceListData: AttendanceByHierarchyModel[] = [];
  leaderAttendanceList = {
    isLoading: false,
    isEmpty: false,
  }

  ngOnInit() {
    const lastSunday = moment().day(0);
    this.date.setValue(lastSunday);

    this.date.valueChanges.subscribe(() => {
      this.loadAttendanceByHierarchy();
    })

    this.loadAttendanceByHierarchy();
    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAttendanceByHierarchy() {
    this.leaderAttendanceList.isLoading = true;
    this.leaderAttendanceList.isEmpty = false;
    const formattedDate = this.date.value.format('YYYY-MM-DD');

    this.reportService.getAttendanceByHierarchy(this.selectedEvent, formattedDate, 'PRIMARY_LEADER').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.leaderAttendanceListData = response.data;
        this.leaderAttendanceList.isEmpty = !this.leaderAttendanceListData.some(record => record.attendance.length > 0);
        this.leaderAttendanceList.isLoading = false;
        console.log(this.leaderAttendanceListData)
      },
      error: (error) => {
        this.leaderAttendanceList.isLoading = false;
        console.error('Error loading attendance by hierarchy:', error);
      }
    });
  }

  loadEvents() {
    this.eventsService.getEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        console.log(this.events)
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    })
  }

  onSelectionChange(event: any) {
    this.loadAttendanceByHierarchy();
  }
}
