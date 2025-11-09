import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';

import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { Users, LucideAngularModule } from 'lucide-angular';

import { SummaryCategoryModel } from '@/app/core/reports/models/attendance-summary.model';
import { ReportSkeleton } from "@/app/shared/components/report-skeleton/report-skeleton";
import { ReportsService } from '@/app/core/reports/services/reports';
import { DEFAULT_DATE_FORMAT } from '@/app/shared/utils/date-format';
import { ErrorCard } from "@/app/shared/components/error-card/error-card";

@Component({
  selector: 'app-attendance-summary',
  imports: [
    LucideAngularModule,
    ReportSkeleton,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    DatePipe,
    ErrorCard
],
  providers: [provideMomentDateAdapter(DEFAULT_DATE_FORMAT)],
  templateUrl: './attendance-summary.html',
  styleUrl: './attendance-summary.css'
})

export class AttendanceSummary {
  readonly Users = Users;

  private reportService = inject(ReportsService);

  readonly date = new FormControl(moment(), { nonNullable: true });
  selectedValue: string = "Sunday Service";

  isAttendanceSummaryLoading = false;
  isAttendanceSummaryEmpty = false;
  regularAttendees: SummaryCategoryModel[] = [];
  totalRegulars: number = 0;
  vipAttendees: SummaryCategoryModel[] = [];
  totalVips: number = 0;
  
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    const lastSunday = moment().day(0);
    this.date.setValue(lastSunday);

    this.date.valueChanges.subscribe(() => {
      this.loadAttendanceSummary();
    })
    
    this.loadAttendanceSummary();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAttendanceSummary() {
    this.isAttendanceSummaryLoading = true;
    this.isAttendanceSummaryEmpty = false;
    const formattedDate = this.date.value.format('YYYY-MM-DD');

    this.reportService.getAttendanceSummary('8757623d-1714-409c-a05d-f3896d44b5cf', formattedDate).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.isAttendanceSummaryLoading = false;
        this.isAttendanceSummaryEmpty = response.data.summary.totalAttendees === 0;
        const { attendees, vips } = response.data.summary;

        this.regularAttendees = attendees.categories;
        this.totalRegulars = attendees.total;
        this.vipAttendees = vips.categories;
        this.totalVips = vips.total;
      },
      error: (error) => {
        this.isAttendanceSummaryLoading = false;
        console.error('Error loading initial data:', error);
      }
    })
  }
}
