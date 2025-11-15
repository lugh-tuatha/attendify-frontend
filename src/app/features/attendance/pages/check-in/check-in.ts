import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTableModule } from '@angular/cdk/table';

import { CornerDownLeft, LucideAngularModule, SearchCheck } from 'lucide-angular';
import { WebcamImage, WebcamModule } from 'ngx-webcam';

import { AttendanceService } from '@/app/core/attendance/services/attendance';
import { AttendeesService } from '@/app/core/attendees/services/attendees';
import { EventsService } from '@/app/core/events/services/events';
import { CheckInAttendeeDto } from '@/app/core/attendance/dto/check-in-attendee.dto';
import { EventModel } from '@/app/core/events/models/event.model';
import { Button } from '@/app/shared/ui/button/button'; 
import { ErrorHandlerService } from '@/app/core/services/error-handler';
import { environment } from '@/environments/environment';

@Component({
  selector: 'app-check-in',
  imports: [  
    LucideAngularModule,
    CdkTableModule,
    RouterLink,
    Button,
    WebcamModule,
    MatPaginator
],
  templateUrl: './check-in.html',
  styleUrl: './check-in.css'
})
export class CheckIn {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly SNACKBAR_DURATION_MS = 5000;
  readonly SearchCheck = SearchCheck;
  readonly CornerDownLeft = CornerDownLeft;

  readonly organizationId = environment.organizationId;

  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  private attendanceService = inject(AttendanceService);
  private attendeesService = inject(AttendeesService);
  private eventsService = inject(EventsService);
  private errorHandlerService = inject(ErrorHandlerService);

  slug = this.route.snapshot.paramMap.get('slug');

  previewImage: string | null = null;
  event: EventModel | null = null;
  isEventLoading = false;
  isCheckInLoading = false;
  isCheckInByFaceLoading = false;
  
  displayedColumns: string[] = ['fullName',  'memberStatus', 'primaryLeader', 'actions'];
  attendeesDataSource = new MatTableDataSource<any>([]);
  attendees = {
    totalCount: 0,
    loading: false,
    errorMessage: null,
  }

  private trigger = new Subject<void>();
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  private destroy$ = new Subject<void>();

  currentSearchTerm: string | undefined = undefined;

  currentPage = 1;
  pageLimit = 10;  

  ngOnInit(): void {
    if (!this.slug) return;
    
    this.loadEvent(this.slug);
    this.loadAttendees();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  captureImage() {
    this.trigger.next()
  }

  snapshot(event: WebcamImage) {
    this.previewImage = event.imageAsDataUrl;
    this.checkInByFace(event.imageAsDataUrl);
  }

  private loadEvent(slug: string) {
    this.isEventLoading = true;

    this.eventsService.getEventBySlug(slug).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.event = response.data;
        this.isEventLoading = false;
        console.log(this.event)
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.isEventLoading = false;
      }
    })
  }

  private loadAttendees(page: number = 1, limit: number = 10, searchTerm?: string): void {
    this.attendees.loading = true;
    this.attendees.errorMessage = null; 

    this.attendeesService.getAttendees(this.organizationId, page, limit, searchTerm).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.attendeesDataSource.data = response.data;
        this.attendees.totalCount = response.meta.total;
        this.attendees.loading = false;

        this.attendeesService.prefetchNextPage(
          this.organizationId,
          this.currentPage,
          this.pageLimit,
          this.attendees.totalCount,
          this.currentSearchTerm
        );
      },
      error: (error) => {
        console.error('Error loading attendees:', error);
        this.attendees.loading = false;
        this.attendees.errorMessage = error?.error?.message ?? 'An unknown error occurred.';
        this.attendees.totalCount = 0;
        this.attendeesDataSource.data = [];
      }
    })
  }

  private checkInByFace(imageAsDataUrl: string) {
    if (!this.event) return;
    this.isCheckInByFaceLoading = true;
    const isLate = new Date().getTime() > new Date(this.event.startTime).getTime();
    
    const dto = {
      imageAsDataUrl: imageAsDataUrl,
      isLate: isLate,
      eventId: this.event.id,
      organizationId: this.event.organization.id,
    }

    this.attendanceService.checkInByFace(dto).pipe(
      finalize(() => {
        this.isCheckInByFaceLoading = false;
      })
    ).subscribe({
      next: (response) => {
        console.log(response);
        if (response.data.message == "checked-in") {
          this.showSnackbar(`Presence Marked, Welcome ${response.data.attendanceRecord.attendee.firstName}!`);
        } else {
          this.showSnackbar(`Check-in failed: ${response.data.message}`);
        }
      },
      error: (err) => {
        const status = err.status;
        if (status === 409 || status === 502) {
          this.errorHandlerService.showErrorModal(status, err.error?.message);
        } else { 
          this.showSnackbar(`Check-in failed: ${err.error?.message || 'Server error'}`);
        }
      }
    })
  }

  manualCheckIn(attendeeId: string, firstName: string) {
    if (!this.slug) return;
    if (!this.event) return;
    this.isCheckInLoading = true;

    const isLate = new Date().getTime() > new Date(this.event.startTime).getTime();

    const dto: CheckInAttendeeDto = {
      isLate: isLate,
      attendeeId: attendeeId,
      eventId: this.event.id,
      organizationId: this.organizationId,
    }

    this.attendanceService.checkInAttendee(dto).pipe(
      finalize(() => {
        this.isCheckInLoading = false;
      })
    ).subscribe({
      next: (response) => {
        console.log('Checked In', response);
        this.showSnackbar(`Presence Marked, Welcome ${firstName}!`);
      },
      error: (err) => {
        const status = err.status;
        if (status === 409 || status === 502) {
          this.errorHandlerService.showErrorModal(status, err.error?.message);
        } else { 
          this.showSnackbar(`Check-in failed: ${err.error?.message || 'Server error'}`);
        }
      }
    })
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageLimit = event.pageSize;
    this.loadAttendees(this.currentPage, this.pageLimit, this.currentSearchTerm)
  }

  onSearchAttendanceRecord(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm === this.currentSearchTerm) return;
    this.currentSearchTerm = searchTerm ? searchTerm : undefined;

    if (this.paginator && this.paginator.pageIndex !== 0) {
      this.paginator.firstPage();
    }else {
      this.loadAttendees(1, this.pageLimit, searchTerm ? searchTerm : undefined);
    }
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: this.SNACKBAR_DURATION_MS,
    });
  }
}