import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

import { ReportsService } from '@/app/core/reports/services/reports';
import { DEFAULT_DATE_FORMAT } from '@/app/shared/utils/date-format';
import { ReportSkeleton } from "@/app/shared/components/report-skeleton/report-skeleton";
import { DiscipleModel } from '@/app/core/reports/models/attendance-by-primary-leader.model';
import { ErrorCard } from "@/app/shared/components/error-card/error-card";

@Component({
  selector: 'app-cell-member-attendance-summary',
  imports: [
    NgClass,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReportSkeleton,
    ErrorCard
],
  providers: [provideMomentDateAdapter(DEFAULT_DATE_FORMAT)],
  templateUrl: './cell-member-attendance-summary.html',
  styleUrl: './cell-member-attendance-summary.css'
})
export class CellMemberAttendanceSummary {
  private route = inject(ActivatedRoute);
  private reportService = inject(ReportsService);
  private destroy$ = new Subject<void>();

  readonly date = new FormControl(moment(), { nonNullable: true });
  selectedValue: string = "Sunday Service";

  attendeeId = this.route.snapshot.paramMap.get('attendeeId');
  primaryLeader: {firstName: string, lastName: string } | null = null;
  disciples: DiscipleModel[] = [];
  isDisciplesDataLoading = false;
  isDisciplesDataEmpty = false;
  
  ngOnInit(): void {
    const lastSunday = moment().day(0);
    this.date.setValue(lastSunday);

    this.date.valueChanges.subscribe(() => {
      this.loadAttendanceByPrimaryLeader();
    })

    this.loadAttendanceByPrimaryLeader();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get primaryLeaderFullName(): string {
    if (this.primaryLeader) {
      return `${this.primaryLeader.firstName} ${this.primaryLeader.lastName}`;
    }
    return '';
  }

  loadAttendanceByPrimaryLeader() {
    if (!this.attendeeId) return;
    this.isDisciplesDataLoading = true;
    this.isDisciplesDataEmpty = false;
    const formattedDate = this.date.value.format('YYYY-MM-DD');

    this.reportService.getAttendanceByPrimaryLeader('8757623d-1714-409c-a05d-f3896d44b5cf', formattedDate, this.attendeeId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.primaryLeader = response.data.primaryLeader;
        this.disciples = response.data.disciples;
        this.isDisciplesDataLoading = false;
        this.isDisciplesDataEmpty = this.disciples.length === 0;
        console.log(response)
      },
      error: (error) => {
        console.error('Error loading attendance by primary leader:', error);
      }
    })
  }

  loadPrimaryLeadersList() {

  }
}
