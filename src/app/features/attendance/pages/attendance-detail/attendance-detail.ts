import { Component, inject, ViewChild } from '@angular/core';

import { CdkTableModule } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AttendanceService } from '../../../../core/attendance/services/attendance';
import { CornerDownLeft, LucideAngularModule, SearchCheck } from 'lucide-angular';
import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { DatePipe, NgClass } from '@angular/common';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-attendance-detail',
  imports: [
    RouterLink,
    DatePipe,
    StatCard,
    CdkTableModule,
    MatFormFieldModule,
    MatInputModule,
    LucideAngularModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginator,
    NgClass
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './attendance-detail.html',
  styleUrl: './attendance-detail.css'
})

export class AttendanceDetail {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$ = new Subject<void>();

  readonly CornerDownLeft = CornerDownLeft;
  readonly SearchCheck = SearchCheck;

  private route = inject(ActivatedRoute);
  private attendanceService = inject(AttendanceService);

  private readonly organizationId = '9d9f4139-ac7d-4aa6-a2ef-bcb941e3ea96';
  slug = this.route.snapshot.paramMap.get('slug');

  displayedColumns: string[] = ['fullName', 'primaryLeader', 'churchProcess', 'memberStatus', 'arival'];
  attendanceDataSource = new MatTableDataSource<any>([]);
  currentSearchTerm: string | undefined = undefined;
  attendance = {
    totalCount: 0,
    loading: false,
    errorMessage: null,
    empty: false,
  }

  readonly date = new FormControl(moment(), { nonNullable: true });

  currentPage = 1;
  pageLimit = 10;  

  ngOnInit(): void {
    if (!this.slug) return;

    const lastSunday = moment().day(0);
    this.date.setValue(lastSunday);

    this.date.valueChanges.subscribe(() => {
      this.paginator.firstPage();
      this.loadAttendanceRecord();
    })

    this.loadAttendanceRecord();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAttendanceRecord(page: number = 1, limit: number = 10, searchTerm?: string): void {
    if (!this.slug) return;

    this.attendance.loading = true;
    this.attendance.errorMessage = null; 
    this.attendance.empty = false;
    const formattedDate = this.date.value.format('YYYY-MM-DD');

    this.attendanceService.getAttendanceRecord(this.organizationId, this.slug, formattedDate, page, limit, searchTerm).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.attendanceDataSource.data = response.data;
        this.attendance.totalCount = response.meta.total;
        this.attendance.loading = false;
        this.attendance.empty = response.data.length === 0;
        console.log(response.data)

        this.attendanceService.prefetchNextPage(
          this.organizationId,
          this.slug!,
          formattedDate,
          this.currentPage,
          this.pageLimit,
          this.attendance.totalCount,
          this.currentSearchTerm
        );
      },
      error: (error) => {
        console.error('Error loading attendance record:', error);
        this.attendance.loading = false;
        this.attendance.errorMessage = error?.error?.message ?? 'An unknown error occurred.';
        this.attendance.totalCount = 0;
        this.attendanceDataSource.data = [];
      }
    })
  }

  onSearchAttendanceRecord(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.currentSearchTerm = searchTerm ? searchTerm : undefined;

    if (this.paginator && this.paginator.pageIndex !== 0) {
      this.paginator.firstPage();
    }else {
      this.loadAttendanceRecord(1, this.pageLimit, searchTerm ? searchTerm : undefined);
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    console.log('page-change', this.currentPage);
    this.pageLimit = event.pageSize;
    this.loadAttendanceRecord(this.currentPage, this.pageLimit, this.currentSearchTerm)
  }
}
